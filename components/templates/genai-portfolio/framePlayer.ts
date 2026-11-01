import gsap from 'gsap'

/*
 * Stand-in for Scale's "active-frame" player (WebCodecs VideoDecoder over a custom length-prefixed H.264/H.265
 * container, frames uploaded into a three.js RawShaderMaterial). The clone ships the same streams remuxed to
 * plain MP4 (GOP 5, no B-frames, so seeks stay cheap) and seeks a <video> element frame by frame.
 *
 * Timecodes are Scale's "SS:FF" strings (seconds:frames), e.g. "03:03" = 3 * fps + 3.
 * playRange tweens a frame counter with ease "none" over |to - from| / fps seconds, like Scale's playRange.
 */

export type Edge = {
  activeStepIndex?: number
  timelineStartPercent?: number
  timelineEndPercent?: number
  fromIndex: number
  toIndex: number
  fromMs: string
  toMs: string
  autoNext?: boolean
  loop?: boolean
  scrollable?: boolean
  awaitComplete?: boolean
  loopBackConditional?: string
  useActualPreviousEdge?: boolean
}

export class FramePlayer {
  frame = 0
  private target = -1
  private seeking = false
  tween: gsap.core.Tween | null = null
  private videos: HTMLVideoElement[]
  readonly ready: Promise<void>

  constructor(
    videos: HTMLVideoElement | HTMLVideoElement[],
    readonly fps: number,
    readonly total: number,
  ) {
    this.videos = Array.isArray(videos) ? videos : [videos]
    this.ready = Promise.all(
      this.videos.map(
        (v) =>
          new Promise<void>((res) => {
            if (v.readyState >= 1) return res()
            v.addEventListener('loadedmetadata', () => res(), { once: true })
          }),
      ),
    ).then(() => undefined)
    this.videos.forEach((v) => v.addEventListener('seeked', this.onSeeked))
  }

  toFrame(code: string) {
    const [s, f] = code.split(':').map(Number)
    return s * this.fps + f
  }

  private onSeeked = () => {
    this.seeking = false
    if (this.target !== -1 && Math.abs(this.videos[0].currentTime * this.fps - this.target) > 0.5) this.apply()
  }

  private apply() {
    const t = (this.target + 0.5) / this.fps
    this.seeking = true
    this.videos.forEach((v) => {
      v.currentTime = t
    })
  }

  setFrame(n: number) {
    const f = Math.max(0, Math.min(this.total - 1, Math.round(n)))
    if (f === this.target) return
    this.target = f
    // Coalesce: while a seek is in flight, the latest target is applied on "seeked".
    if (!this.seeking) this.apply()
  }

  playRange(from: number, to: number, o: { loop?: boolean; onComplete?: () => void; onRepeat?: () => void } = {}) {
    this.tween?.kill()
    const duration = Math.abs(to - from) / this.fps
    this.frame = from
    this.tween = gsap.fromTo(
      this,
      { frame: from },
      {
        frame: to,
        duration,
        ease: 'none',
        repeat: o.loop ? -1 : 0,
        onUpdate: () => this.setFrame(this.frame),
        onRepeat: o.onRepeat,
        onComplete: o.onComplete,
      },
    )
    return this.tween
  }

  playCodes(from: string, to: string, o: { loop?: boolean; backwards?: boolean; onComplete?: () => void } = {}) {
    let a = this.toFrame(from)
    let b = this.toFrame(to)
    if (o.backwards) [a, b] = [b, a]
    return this.playRange(a, b, o)
  }

  stop() {
    this.tween?.kill()
    this.tween = null
  }

  destroy() {
    this.stop()
    this.videos.forEach((v) => v.removeEventListener('seeked', this.onSeeked))
  }
}

/**
 * Port of Scale's edge controller (class P): apply(from,to) plays the edge between two frame indices;
 * autoNext chains into the following edge, loop edges repeat, loopBackConditional jumps back to an earlier edge.
 */
export class EdgeController {
  private previous: Edge | null = null
  constructor(
    private edges: Record<string, Edge>,
    private player: FramePlayer,
  ) {}

  lookup(a: number, b: number) {
    return a === b ? null : (this.edges[`${a},${b}`] ?? null)
  }

  apply(a: number, b: number, o: { backwards?: boolean; noBackwards?: boolean } = {}) {
    const edge = this.lookup(a, b)
    if (!edge) return
    this.previous = edge
    const back = !!o.backwards && !o.noBackwards
    const next = () => {
      if (edge.autoNext) {
        const na = back ? b - 2 : b
        const nb = back ? b - 1 : b + 1
        this.apply(na, nb, o)
      }
      if (edge.loopBackConditional) {
        const [x, y] = edge.loopBackConditional.split(',').map(Number)
        if (this.lookup(x, y)) this.apply(x, y)
      }
    }
    this.player.playCodes(edge.fromMs, edge.toMs, { loop: !!edge.loop, backwards: back, onComplete: next })
  }
}
