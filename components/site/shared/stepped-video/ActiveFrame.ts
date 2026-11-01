// Scale module 154479, class `c`: scrubbable video frames from a bin (concatenated H.264/H.265 chunks and a JSON
// manifest in the tail), decoded with WebCodecs. `frame` is tweened by gsap, so it stays a public field.
import { gsap } from '../../lib/gsap'

type Frame = { i: number; t: number; o: number; l: number; ty: 'key' | 'delta'; data: Uint8Array }
type Manifest = { codec: string; width: number; height: number; description: string; fps?: number; totalFrames: number; frames: Frame[] }
type Loaded = { manifest: Manifest; data: ArrayBuffer }
type Deferred = Promise<void> & { resolve: () => void; reject: (e?: unknown) => void }
export type FrameSink = (frame: VideoFrame, index: number | null) => void | Promise<void>

export function deferred(): Deferred {
  let res!: () => void
  let rej!: (e?: unknown) => void
  const p = new Promise<void>((a, b) => {
    res = a
    rej = b
  }) as Deferred
  p.resolve = res
  p.reject = rej
  return p
}

const cache = new Map<string, Promise<Loaded>>()

export type PlayOptions = {
  durationMultiplier?: number
  ease?: string
  loop?: boolean
  delay?: number
  isTransitioningBackwards?: boolean
  noBackwardsTransition?: boolean
  onRepeat?: () => void
  onComplete?: () => void
  awaitComplete?: boolean
  autoNext?: boolean
  loopBackConditional?: string | boolean
}

export class ActiveFrame {
  file: string | null
  manifest: Manifest | null = null
  data: ArrayBuffer | null = null
  decoder: VideoDecoder | null = null
  frame: number | null = null
  desideredFrame = 0
  enabled = true
  framesByTimestamp = new Map<number, number>()
  frameProcessed: number | null = null
  loading = deferred()
  process: FrameSink | null
  lastTween: gsap.core.Tween | null = null
  isTransitioning = false
  hardwareAcceleration: HardwareAcceleration
  logIndex: boolean
  decoderReady = false
  config: VideoDecoderConfig | null = null
  private pendingFrame: number | null = null
  private rangeRaf: number | null = null
  private rangePlaying = false

  constructor(
    file: string,
    { process = () => {}, logIndex = false, hardwareAcceleration = 'prefer-hardware' }: { process?: FrameSink; logIndex?: boolean; hardwareAcceleration?: HardwareAcceleration },
  ) {
    this.process = process
    this.hardwareAcceleration = hardwareAcceleration
    this.logIndex = logIndex
    this.file = file
    void this.init()
  }

  async init() {
    cache.set(this.file!, this.loadBinary(this.file!))
    const { manifest, data } = await cache.get(this.file!)!
    this.manifest = manifest
    this.data = data
    this.manifest.frames.forEach((f) => {
      f.data = new Uint8Array(this.data!, f.o, f.l)
      this.framesByTimestamp.set(f.t, f.i)
    })
    await this.initDecoder()
    this.loading.resolve()
  }

  private static h264Check: Promise<VideoDecoderSupport> | null = null
  static async isH264Supported() {
    try {
      if (!this.h264Check) this.h264Check = VideoDecoder.isConfigSupported({ codec: 'avc1.42c033' })
      return (await this.h264Check).supported
    } catch (e) {
      console.error('H264 not supported', e)
      return false
    }
  }

  private static h265Check: Promise<VideoDecoderSupport> | null = null
  static async isH265Supported() {
    try {
      if (!this.h265Check) this.h265Check = VideoDecoder.isConfigSupported({ codec: 'hvc1.1.6.L93.90' })
      return (await this.h265Check).supported
    } catch (e) {
      console.error('H265 not supported', e)
      return false
    }
  }

  async loadBinary(file: string): Promise<Loaded> {
    const res = await fetch(file)
    const data = await res.arrayBuffer()
    const start = new DataView(data, data.byteLength - 4).getUint32(0, true)
    const tail = new Uint8Array(data, start, data.byteLength - 4 - start)
    return { manifest: JSON.parse(new TextDecoder().decode(tail)), data }
  }

  decodeDescription(b64: string) {
    const bin = atob(b64)
    const out = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
    return out
  }

  async initDecoder() {
    this.decoderReady = false
    const m = this.manifest!
    const base: VideoDecoderConfig = {
      codec: m.codec,
      codedWidth: m.width,
      codedHeight: m.height,
      colorSpace: { primaries: 'bt709', transfer: 'bt709', matrix: 'bt709', fullRange: false },
      description: this.decodeDescription(m.description),
    }
    const tries: VideoDecoderConfig[] = [
      { ...base, hardwareAcceleration: this.hardwareAcceleration, optimizeForLatency: true },
      { ...base, hardwareAcceleration: this.hardwareAcceleration },
      { ...base, optimizeForLatency: true },
      { ...base },
    ]
    this.config = null
    for (const c of tries) {
      if ((await VideoDecoder.isConfigSupported(c)).supported) {
        this.config = c
        break
      }
    }
    if (!this.config) throw Error('Decoder not supported')
    this.decoder = new VideoDecoder({
      output: this.outputFrame.bind(this),
      error: (e) => {
        console.error('Decoder error:', e)
      },
    })
    this.decoder.configure(this.config)
    this.decoderReady = true
  }

  async outputFrame(f: VideoFrame) {
    if (!this.enabled) {
      f.close()
      return
    }
    const index = this.framesByTimestamp.get(f.timestamp)
    if (this.desideredFrame !== index) {
      f.close()
      return
    }
    this.frame = index
    if (this.process) {
      let logged: number | null = null
      if (this.logIndex) logged = this.manifest!.frames.findIndex((x) => x.i === index)
      await this.process(f, logged)
    }
    this.frameProcessed = index
    f.close()
  }

  setFrame(value: number | string) {
    if (!this.manifest || !this.enabled || !this.decoderReady) return
    let n = Math.round(Number(value))
    const last = Math.max(0, this.manifest.totalFrames - 1)
    n = Math.min(Math.max(n, 0), last)
    this.desideredFrame = n
    if (this.desideredFrame === this.frame || this.desideredFrame === this.pendingFrame) return
    this.pendingFrame = n
    const target = this.manifest.frames[this.desideredFrame]
    if (!target) return
    const decoder = this.decoder!
    if (decoder.decodeQueueSize > 0 || decoder.state !== 'configured') {
      if (decoder.state === 'closed') {
        void this.initDecoder()
        return
      }
      decoder.configure(this.config!)
    }
    if (this.frame !== null && this.desideredFrame === this.frame + 1 && target.ty === 'delta') {
      decoder.decode(new EncodedVideoChunk({ type: target.ty, timestamp: target.t, data: target.data }))
      return
    }
    if (target.ty === 'key') {
      decoder.decode(new EncodedVideoChunk({ type: target.ty, timestamp: target.t, data: target.data }))
      return
    }
    let key: Frame | null = null
    for (let i = this.desideredFrame; i >= 0; i--) {
      const f = this.manifest.frames[i]
      if (f.ty === 'key') {
        key = f
        break
      }
    }
    if (!key || !key.data) {
      console.error('No key frame found')
      return
    }
    decoder.decode(new EncodedVideoChunk({ type: key.ty, timestamp: key.t, data: key.data }))
    for (let i = key.i + 1; i <= this.desideredFrame; i++) {
      const f = this.manifest.frames[i]
      if (f.ty !== 'delta') break
      decoder.decode(new EncodedVideoChunk({ type: f.ty, timestamp: f.t, data: f.data }))
    }
  }

  stop() {
    this.rangePlaying = false
    if (this.rangeRaf != null) {
      cancelAnimationFrame(this.rangeRaf)
      this.rangeRaf = null
    }
  }

  cancelPlayback() {
    this.stop()
    this.lastTween?.kill()
    this.lastTween = null
    this.isTransitioning = false
  }

  timestampToFrameIndex(ts: string) {
    const [s, f] = ts.split(':').map(Number)
    return s * (this.manifest!.fps || 30) + f
  }

  playRangeTime(from: string, to: string, o: PlayOptions = {}) {
    if (!this.manifest || !this.enabled) return
    let a = this.timestampToFrameIndex(from)
    let b = this.timestampToFrameIndex(to)
    if (o.isTransitioningBackwards && !o.noBackwardsTransition) [a, b] = [b, a]
    return this.playRange(a, b, o)
  }

  frameToTime(i: number) {
    return this.manifest!.frames[i].t
  }

  getFrameRange(from: string, to: string) {
    if (!this.manifest || !this.enabled) return
    return { from: this.timestampToFrameIndex(from), to: this.timestampToFrameIndex(to) }
  }

  playRange(from: number, to: number, o: PlayOptions = {}) {
    if (!this.manifest || !this.enabled) return
    this.isTransitioning = true
    const duration = (Math.abs(to - from) / (this.manifest.fps || 30)) * (o.durationMultiplier ?? 1)
    this.lastTween?.kill()
    this.lastTween = gsap.fromTo(
      this,
      { frame: from },
      {
        frame: to,
        duration,
        ease: o.ease ? o.ease : 'none',
        repeat: o.loop ? -1 : 0,
        delay: o.delay ?? 0,
        onRepeat: () => {
          o.onRepeat?.()
        },
        onComplete: () => {
          this.isTransitioning = false
          o.onComplete?.()
        },
        onUpdate: () => {
          this.setFrame(this.frame!)
        },
      },
    )
    return this.lastTween
  }

  loopRange(from: number, to: number, o: PlayOptions = {}) {
    this.playRange(from, to, { ...o, loop: true })
  }

  destroy() {
    cache.delete(this.file!)
    this.stop()
    this.decoder?.close()
    this.decoder = null
    this.data = null
    this.manifest = null
    this.file = null
    this.process = null
    this.frameProcessed = null
    this.enabled = false
    this.framesByTimestamp.clear()
  }
}

export type FrameEdge = {
  activeStepIndex?: number
  timelineStartPercent?: number
  timelineEndPercent?: number
  fromIndex: number
  toIndex: number
  fromMs: string
  toMs: string
  autoNext?: boolean
  scrollable?: boolean
  loop?: boolean
  awaitComplete?: boolean
  useActualPreviousEdge?: boolean
  loopBackConditional?: string
}
export type FrameEdges = Record<string, FrameEdge>
type ApplyOptions = { isTransitioningBackwards?: boolean; noBackwardsTransition?: boolean; durationMultiplier?: number; delay?: number }

/** Scale module 154479, class `P`: maps scroll progress and step changes to edges of the frame graph. */
export class FrameEdgeController {
  edges: FrameEdges
  currentTween: gsap.core.Tween | null | undefined = null
  scrubTimelineEdge: FrameEdge | null = null
  activeStepIndex: number | null = null
  lastFrame = 0
  private lastProgress = 0
  private debounceId: ReturnType<typeof setTimeout> | undefined
  private resizeDebounceMs = 500
  isresizing = false
  start: string
  end: string
  previousEdgeActual: FrameEdge | null = null
  private applyDebounceMs = 1500
  private timeSinceLastApply = 0
  isQuickUpdate = false
  onActiveStepIndex?: (step: number) => void
  onTransitionEdgeStart?: (edge: FrameEdge, backwards: boolean) => void
  onLoopEdgeStart?: (edge: FrameEdge, backwards: boolean) => void

  constructor({ edges, start = '00:00', end = '15:03' }: { edges: FrameEdges; start?: string; end?: string }) {
    this.edges = edges
    this.start = start
    this.end = end
  }

  lookup(a: number | string, b: number | string) {
    return a === b ? null : (this.edges[`${a},${b}`] ?? null)
  }

  getActiveStepIndexFromScrubProgress(progress: number, player: ActiveFrame) {
    const range = player.getFrameRange(this.start, this.end)
    if (!range) return 0
    const span = range.to - range.from
    if (span <= 0) return 0
    const p = Math.max(0, Math.min(1, progress))
    const list = Object.values(this.edges)
      .filter((e) => typeof e.activeStepIndex === 'number')
      .map((e) => ({ step: e.activeStepIndex!, p0: (player.timestampToFrameIndex(e.fromMs) - range.from) / span }))
      .sort((a, b) => a.p0 - b.p0 || a.step - b.step)
    if (list.length === 0) return 0
    let step = list[0].step
    for (let i = 0; i < list.length; i++) if (p >= list[i].p0) step = list[i].step
    return step
  }

  async apply(player: ActiveFrame | null | undefined, from: number, to: number, o: ApplyOptions = {}) {
    if (!player) return
    const edge = this.lookup(from, to)
    if (edge) {
      void this.executeApply(player, from, to, o)
      this.previousEdgeActual = edge
    }
  }

  async setProgress(progress: number, player: ActiveFrame, lenis?: { direction?: number } | null) {
    if (!player || !this.edges || this.isresizing) return
    const range = player.getFrameRange(this.start, this.end)
    if (!range) return
    const p = Math.max(0, Math.min(1, progress))
    this.lastProgress = p
    const step = this.getActiveStepIndexFromScrubProgress(p, player)
    if (this.activeStepIndex !== step) {
      this.onActiveStepIndex?.(step)
      this.activeStepIndex = step
    }
    const frame = Math.round(range.from + p * (range.to - range.from))
    if (frame !== this.lastFrame) {
      this.lastFrame = frame
      requestAnimationFrame(() => {
        player.setFrame(frame)
      })
    }
    const edge =
      Object.values(this.edges).find((e) => {
        const a = player.timestampToFrameIndex(e.fromMs)
        const b = player.timestampToFrameIndex(e.toMs)
        return frame >= a && frame <= b
      }) ?? null
    const prev = this.scrubTimelineEdge
    const same = (edge === null && prev === null) || (edge != null && prev != null && edge.fromIndex === prev.fromIndex && edge.toIndex === prev.toIndex)
    this.scrubTimelineEdge = edge
    if (!same && edge) {
      const back = lenis?.direction === -1
      if (edge.scrollable) {
        if (edge.activeStepIndex === 0) return
        this.onTransitionEdgeStart?.(edge, back)
      } else this.onLoopEdgeStart?.(edge, back)
    }
  }

  onResize(players: ActiveFrame[], lenis?: { direction?: number } | null) {
    clearTimeout(this.debounceId)
    this.isresizing = true
    this.debounceId = setTimeout(() => {
      players.forEach((p) => {
        void this.setProgress(this.lastProgress, p, lenis)
      })
      this.isresizing = false
    }, this.resizeDebounceMs)
  }

  async executeApply(player: ActiveFrame, from: number, to: number, o: ApplyOptions = {}) {
    const edge = this.lookup(from, to)
    if (!edge) return
    await player.loading
    const now = performance.now()
    this.isQuickUpdate = now - this.timeSinceLastApply < this.applyDebounceMs
    this.timeSinceLastApply = now
    const prevEdge = edge.useActualPreviousEdge ? this.previousEdgeActual : this.lookup(from - 1, to - 1)
    if ((this.isQuickUpdate || !edge.awaitComplete || o.isTransitioningBackwards) && this.currentTween?.kill) this.currentTween.kill()
    const opts = { awaitComplete: edge.awaitComplete ?? false, autoNext: edge.autoNext ?? false, durationMultiplier: o.durationMultiplier ?? 1, delay: o.delay ?? 0 }
    const gate = deferred()
    if (edge.awaitComplete && this.currentTween && !o.isTransitioningBackwards && o.noBackwardsTransition && !this.isQuickUpdate) {
      if (prevEdge?.loop) this.currentTween.eventCallback('onRepeat', () => gate.resolve())
      else this.currentTween.eventCallback('onComplete', () => gate.resolve())
    } else gate.resolve()
    await gate
    const done = () => {
      if (edge.autoNext) {
        const a = o.isTransitioningBackwards && !o.noBackwardsTransition ? to - 2 : to
        const b = o.isTransitioningBackwards && !o.noBackwardsTransition ? to - 1 : to + 1
        void this.apply(player, a, b, { isTransitioningBackwards: o.isTransitioningBackwards, noBackwardsTransition: o.noBackwardsTransition })
      }
      if (edge.loopBackConditional) {
        const [a, b] = edge.loopBackConditional.split(',')
        if (this.lookup(a, b)) void this.apply(player, parseInt(a), parseInt(b))
      }
    }
    this.currentTween = player.playRangeTime(edge.fromMs, edge.toMs, {
      ...opts,
      loop: edge.loop ?? false,
      loopBackConditional: edge.loopBackConditional ?? false,
      isTransitioningBackwards: o.isTransitioningBackwards ?? false,
      noBackwardsTransition: o.noBackwardsTransition ?? false,
      onComplete: done,
    })
  }
}
