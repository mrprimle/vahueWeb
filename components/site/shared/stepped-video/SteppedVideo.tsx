'use client'

// Scale module 154479 (chunk 0sni47mcvnqwg.js): SgpIntro and SgpFlywheel, the pinned scenes that scrub or play frames of
// a WebCodecs bin into a three.js quad. Timings, triggers and frame edges are verbatim. The same module serves the static
// image layouts (`stepsOnly`, `headingPinned`, step images); those branches are ported but no page drives them yet.
import { useLenis } from 'lenis/react'
import Link from 'next/link'
import { forwardRef, startTransition, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import type * as THREE from 'three'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { cn } from '../../lib/cn'
import { gsap, useGSAP } from '../../lib/gsap'
import { mapRange } from '../../lib/math'
import { useReadyStore } from '../../lib/readyStore'
import { useInViewTrigger } from '../../lib/useInViewTrigger'
import { useMediaQuery } from '../../lib/useMediaQuery'
import { useScrubTrigger } from '../../lib/useScrubTrigger'
import { AnimatedText, softRiseAnimation, type AnimatedTextHandle } from '../AnimatedText'
import { ResponsiveImage, type ImageAsset } from '../ResponsiveImage'
import { RichText, type RichBlock } from '../RichText'
import { ThreeCanvas, type ThreeRuntime, type ThreeScene } from '../ThreeCanvas'
import { ActiveFrame, FrameEdgeController, type FrameEdges } from './ActiveFrame'
import { FLYWHEEL_EDGES, INTRO_EDGES } from './edges'
import { FLYWHEEL_FRAGMENT, INTRO_FRAGMENT, QUAD_VERTEX } from './shaders'

const CONFIG_BASE = '/static/stepped-video/'
const FRAME_BASE = '/static/video/active-frame/'

export type SteppedVideoStep = {
  _key?: string
  title: string
  description?: RichBlock[]
  image?: ImageAsset
  link?: { text?: string; url?: string; href?: string }[]
}

export type SteppedVideoProps = {
  componentName?: 'SgpIntro' | 'SgpFlywheel'
  configFilePath?: string
  introHeadline?: string
  introBody?: RichBlock[]
  introImage?: ImageAsset
  hideProcessLabel?: boolean
  introLabel?: string
  layout?: 'stepsOnly' | 'headingPinned'
  counterLabel?: string
  steps?: SteppedVideoStep[]
  className?: string
  pinSpacing?: boolean
  /** Fixed strings in Scale's module, carried as props so a filled page can change them. */
  scrollLabel?: string
  flywheelLabels?: { performance: string; process: string }
}

type Sink = RefObject<((frame: VideoFrame) => void) | null>

function configUrl(path?: string | null) {
  if (path == null || typeof path !== 'string') return null
  const t = path.trim()
  return t ? (t.startsWith('/') ? t : `${CONFIG_BASE}${t.replace(/^\/+/, '')}`) : null
}

async function codec() {
  const [h264, h265] = await Promise.all([ActiveFrame.isH264Supported(), ActiveFrame.isH265Supported()])
  if (!h264 && !h265) return null
  let name: 'h264' | 'h265' = h265 ? 'h265' : 'h264'
  let hw: HardwareAcceleration = 'prefer-hardware'
  if (/\bAndroid\b/i.test(navigator.userAgent)) {
    name = 'h264'
    hw = 'prefer-software'
  }
  return { name, hw }
}

const FADE_IN = Object.freeze({ duration: 0.85, ease: 'power2.out' })
const FADE_OUT = Object.freeze({ duration: 0.35, ease: 'power2.in' })

// Scale module 890803.
function TextArrowLink({ href, text }: { href?: string; text: string }) {
  const cls = 'group inline-flex items-center gap-1 transition-colors duration-300 text-inherit hover:opacity-70 text-base'
  const inner = (
    <>
      <span className="font-medium">{text}</span>
      <span className="transition-transform duration-300 ease-out inline-block arrow font-unicode group-hover:translate-x-1" aria-hidden="true">
        →
      </span>
    </>
  )
  return href ? (
    <Link href={href} className={cls} aria-label={text}>
      {inner}
    </Link>
  ) : (
    <span className={cls} aria-label={text} aria-disabled="true">
      {inner}
    </span>
  )
}

type StepHandle = { animateIn: () => void | Promise<void>; animateOut: () => void | Promise<void> }

const FlywheelStepCard = forwardRef<
  StepHandle,
  SteppedVideoStep & { index: number; current?: number; total?: number; align?: 'center' | 'top' }
>(function FlywheelStepCard({ title, description, link, index, current = 0, total = 0, align = 'center' }, ref) {
  const top = align === 'top'
  const heading = useRef<AnimatedTextHandle>(null)
  const body = useRef<(AnimatedTextHandle | null)[]>([])
  const triangle = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLDivElement>(null)
  const run = useRef(0)
  const first = link?.length ? link[0] : null
  const href = first?.url ?? first?.href ?? undefined
  useImperativeHandle(
    ref,
    () => ({
      async animateIn() {
        const id = ++run.current
        const all = [heading.current, ...body.current].filter(Boolean)
        await Promise.all(all.map((t) => t?.ready?.()))
        if (id !== run.current) return
        heading.current?.animateIn?.()
        gsap.fromTo(triangle.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
        await Promise.all(body.current.filter(Boolean).map((t) => t!.animateIn({ delay: 0.2 })))
        if (id === run.current && linkRef.current) gsap.fromTo(linkRef.current, { yPercent: 100, opacity: 0 }, { ...FADE_IN, yPercent: 0, opacity: 1, overwrite: 'auto' })
      },
      async animateOut() {
        const all = [heading.current, ...body.current].filter(Boolean)
        await Promise.all(all.map((t) => t?.ready?.()))
        heading.current?.animateOut?.()
        body.current.forEach((t) => t?.animateOut?.({ delay: 0.2 }))
        run.current += 1
        if (linkRef.current) gsap.to(linkRef.current, { ...FADE_OUT, yPercent: -100, opacity: 0, overwrite: 'auto' })
        gsap.fromTo(triangle.current, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out' })
      },
    }),
    [],
  )
  const color = top ? 'text-scale-gray-30' : ({ 1: 'text-archive-purple', 2: 'text-foundry-tan', 3: 'text-evergreen', 4: 'text-cloud-slate' } as Record<number, string>)[Math.min(current, total)]
  return (
    <div className={cn('absolute top-0 left-0 flex flex-col w-full h-full gap-16 p-8 pb-32 xl:p-16', top ? 'justify-start' : 'justify-end xl:justify-center', index == null || index === current ? 'pointer-events-auto' : 'pointer-events-none')}>
      <div className="flex flex-col gap-4 xl:gap-6">
        <div className="flex items-center gap-2">
          <div ref={triangle} className={cn('opacity-0', color)}>
            <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="12" height="12" rx="1" fill="currentColor" />
            </svg>
          </div>
          <AnimatedText ref={heading} tagName="p" className="leading-none detail-mono text-scale-gray-30">
            {title}
          </AnimatedText>
        </div>
        {(description ?? []).map((block, i) => (
          <RichText
            key={i}
            animatedTextClassName="leading-none"
            blockClassNames={{ h4: 'leading-9' }}
            value={[block]}
            animatedTextRef={(el) => {
              body.current[i] = el
            }}
            className={cn(i > 0 && 'mt-6')}
          />
        ))}
        {first?.text ? (
          <div className="mt-2">
            <div className="overflow-clip py-[0.12em] my-[-0.12em]">
              <div ref={linkRef} className="opacity-0">
                <TextArrowLink text={first.text} href={href} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
})

type IntroStore = {
  introScrollProgress: number
  setIntroScrollProgress: (p: number) => void
  resetIntroScrollProgress: () => void
  videoCrossfade: number
  activeStepIndex: number | null
  setActiveStepIndex: (i: number | null) => void
  setVideoCrossfade: (v: number) => void
}

const useIntroStore = create<IntroStore>()(
  subscribeWithSelector((set) => ({
    introScrollProgress: 0,
    setIntroScrollProgress: (introScrollProgress) => set({ introScrollProgress }),
    resetIntroScrollProgress: () => set({ introScrollProgress: 0 }),
    videoCrossfade: 0,
    activeStepIndex: null,
    setActiveStepIndex: (activeStepIndex) => set({ activeStepIndex }),
    setVideoCrossfade: (v) => set({ videoCrossfade: Math.min(1, Math.max(0, v)) }),
  })),
)

type Quad = THREE.Mesh<THREE.PlaneGeometry, THREE.RawShaderMaterial>
const QUAD = '_steppedVideoQuad'
const OFFSET_TWEEN = '_sgpStepOffsetTween'
const STORE_UNSUB = '_steppedVideoPlayStoreUnsub'

function orthoCamera(rt: ThreeRuntime) {
  const { THREE: T } = rt
  const camera = new T.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.set(0, 0, 5)
  camera.lookAt(0, 0, 0)
  // Scale replaces the runtime's camera the same way.
  ;(rt as unknown as { camera: THREE.Camera }).camera = camera
}

function bindSink(rt: ThreeRuntime, sink: Sink | undefined, tex: THREE.Texture) {
  if (!sink) return
  sink.current = (frame) => {
    if (!frame) return
    tex.image = frame
    tex.needsUpdate = true
    rt.renderer.initTexture(tex)
  }
}

function resizeOrtho(rt: ThreeRuntime, width: number, height: number) {
  const mesh = rt.scene.userData[QUAD] as Quad | undefined
  const camera = rt.camera as unknown as THREE.OrthographicCamera
  if (!mesh || !camera.isOrthographicCamera) return null
  const aspect = width / Math.max(height, 1)
  camera.left = -aspect
  camera.right = aspect
  camera.top = 1
  camera.bottom = -1
  camera.updateProjectionMatrix()
  mesh.material.uniforms.uMeshSize.value.set(aspect, 1)
  mesh.scale.set(aspect, 1, 1)
  return mesh
}

function disposeQuad(rt: ThreeRuntime, sinks: Sink[]) {
  const unsub = rt.scene.userData[STORE_UNSUB]
  if (typeof unsub === 'function') unsub()
  delete rt.scene.userData[STORE_UNSUB]
  sinks.forEach((s) => {
    s.current = null
  })
  const mesh = rt.scene.userData[QUAD] as Quad | undefined
  if (!mesh) return
  ;['uMap', 'uMapB', 'uMapMask'].forEach((k) => (mesh.material.uniforms[k]?.value as THREE.Texture | undefined)?.dispose())
  mesh.geometry.dispose()
  mesh.material.dispose()
  rt.scene.remove(mesh)
  delete rt.scene.userData[QUAD]
}

function flywheelScene(sink: Sink): ThreeScene {
  return {
    setup(rt) {
      const { scene, THREE: T, controls } = rt
      controls.enabled = false
      orthoCamera(rt)
      const tex = new T.Texture()
      tex.generateMipmaps = false
      const material = new T.RawShaderMaterial({
        vertexShader: QUAD_VERTEX,
        fragmentShader: FLYWHEEL_FRAGMENT,
        glslVersion: T.GLSL3,
        transparent: true,
        uniforms: {
          uMap: { value: tex },
          uCrossfade: { value: 0 },
          uMeshSize: { value: new T.Vector2(2, 2) },
          uScale: { value: new T.Vector2(0.8, 0.8) },
          uOffset: { value: new T.Vector2(1, 0.5) },
        },
      })
      const mesh = new T.Mesh(new T.PlaneGeometry(2, 2), material)
      mesh.position.set(0, 0, 0)
      scene.add(mesh)
      scene.userData[QUAD] = mesh
      bindSink(rt, sink, tex)
    },
    onTick() {},
    onResize(rt, { width, height }) {
      resizeOrtho(rt, width, height)
    },
    onDestroy(rt) {
      disposeQuad(rt, [sink])
    },
  }
}

const isPhoneWidth = () => window.innerWidth <= 768

function introScene(a: Sink, b: Sink, mask: Sink): ThreeScene {
  return {
    setup(rt) {
      const { scene, THREE: T, controls } = rt
      controls.enabled = false
      orthoCamera(rt)
      const make = () => {
        const t = new T.Texture()
        t.generateMipmaps = false
        return t
      }
      const texA = make()
      const texB = make()
      const texM = make()
      const material = new T.RawShaderMaterial({
        vertexShader: QUAD_VERTEX,
        fragmentShader: INTRO_FRAGMENT,
        glslVersion: T.GLSL3,
        transparent: true,
        uniforms: {
          uMap: { value: texA },
          uMapB: { value: texB },
          uMapMask: { value: texM },
          uCrossfade: { value: 0 },
          uMeshSize: { value: new T.Vector2(2, 2) },
          uScale: { value: new T.Vector2(0.8, 0.8) },
          uOffset: { value: new T.Vector2(1, 0.75) },
        },
      })
      const mesh = new T.Mesh(new T.PlaneGeometry(2, 2), material)
      mesh.position.set(0, 0, 0)
      scene.add(mesh)
      scene.userData[QUAD] = mesh
      bindSink(rt, a, texA)
      bindSink(rt, b, texB)
      bindSink(rt, mask, texM)
      const moveOffset = (step: number | null) => {
        if (!isPhoneWidth()) return
        ;(mesh.userData[OFFSET_TWEEN] as gsap.core.Tween | undefined)?.kill()
        const to = [{ x: 0, y: 1 }, { x: 0.5, y: 0.5 }, { x: 1.5, y: 0.5 }, { x: 0.5, y: 1.5 }][(step as number) - 1]
        mesh.userData[OFFSET_TWEEN] = gsap.to(material.uniforms.uOffset.value, { duration: 0.5, ease: 'power2.out', ...to, overwrite: true })
      }
      const state = useIntroStore.getState()
      material.uniforms.uCrossfade.value = state.videoCrossfade ?? 0
      if (isPhoneWidth()) moveOffset(state.activeStepIndex)
      const offCross = useIntroStore.subscribe(
        (s) => s.videoCrossfade,
        (v) => {
          material.uniforms.uCrossfade.value = v ?? 0
        },
      )
      const offStep = useIntroStore.subscribe((s) => s.activeStepIndex, moveOffset)
      scene.userData[STORE_UNSUB] = () => {
        offCross()
        offStep()
        ;(mesh.userData[OFFSET_TWEEN] as gsap.core.Tween | undefined)?.kill()
        delete mesh.userData[OFFSET_TWEEN]
      }
    },
    onTick() {},
    onResize(rt, { width, height }) {
      const mesh = resizeOrtho(rt, width, height)
      if (!mesh) return
      const w = window.innerWidth
      const c = gsap.utils.clamp(0.75, 1, gsap.utils.mapRange(1024, 1728, 0.75, 1, w))
      const { uScale, uOffset } = mesh.material.uniforms
      if (w <= 768) {
        uScale.value.set(2, 2)
        uOffset.value.set(0.5, 0.5)
      } else if (w <= 1280) {
        uScale.value.set(c, c)
        uOffset.value.set(0.5, 0.5)
      } else {
        uScale.value.set(c, c)
        uOffset.value.set(1, 0)
      }
    },
    onDestroy(rt) {
      disposeQuad(rt, [a, b, mask])
    },
  }
}

function useMarkReady(id: string) {
  const register = useReadyStore((s) => s.register)
  const signal = useReadyStore((s) => s.signal)
  useEffect(() => {
    register(id)
  }, [id, register])
  return useCallback(() => signal(id), [id, signal])
}

type FlywheelConfig = { files?: string[] }

/** Flywheel timeline and bin loader (Scale's inner hook). */
function useFlywheelFrames({
  configFilePath,
  stepCount,
  frameSink,
  onFramesReady,
  pinSpacing = false,
  pin = true,
  pinEnd,
}: {
  configFilePath?: string
  stepCount: number
  frameSink: Sink
  onFramesReady: () => void
  pinSpacing?: boolean
  pin?: boolean
  pinEnd: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const count = Math.max(1, stepCount) + 1 + 1
  const [config, setConfig] = useState<FlywheelConfig | null>(null)
  const [activeFrameInstance, setInstance] = useState<ActiveFrame | null>(null)
  const ready = useRef(onFramesReady)
  ready.current = onFramesReady
  const url = useMemo(() => configUrl(configFilePath), [configFilePath])
  useEffect(() => {
    if (!config) return
    let cancelled = false
    let player: ActiveFrame | null = null
    void (async () => {
      const c = await codec()
      if (!c || !config.files) return
      const file = c.name === 'h264' ? config.files[0] : config.files[1]
      player = new ActiveFrame(FRAME_BASE + file, {
        hardwareAcceleration: c.hw,
        logIndex: true,
        process: (frame) => {
          frameSink.current?.(frame)
        },
      })
      setInstance(player)
      await Promise.all([player.loading])
      player.setFrame(0)
      if (cancelled) player.destroy()
      else ready.current?.()
    })()
    return () => {
      cancelled = true
      player?.destroy()
    }
  }, [config, frameSink])
  useGSAP(
    () => {
      const el = pinRef.current
      if (!el) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: () => `${pinEnd}`, scrub: true, pin, markers: false, pinSpacing: !!pin && !!pinSpacing },
      })
      for (let i = 0; i < count; i += 1) tl.to({}, { duration: 1, ease: 'none' })
      return () => {
        tl.kill()
      }
    },
    { scope: containerRef, dependencies: [pinSpacing, pin] },
  )
  useEffect(() => {
    if (!url) {
      startTransition(() => setConfig(null))
      return
    }
    let cancelled = false
    fetch(url)
      .then((r) => {
        if (!r.ok) throw Error(`Failed to load ${url} (${r.status})`)
        return r.json()
      })
      .then((j) => {
        if (!cancelled) setConfig(j)
      })
      .catch(() => {
        if (!cancelled) setConfig(null)
      })
    return () => {
      cancelled = true
    }
  }, [url])
  return { containerRef, pinRef, activeFrameInstance }
}

const LabelMark = () => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="12" height="12" rx="1" fill="currentColor" />
  </svg>
)

const FlywheelArrow = forwardRef<{ animateIn: (o: { delay?: number }) => void; animateOut: (o: { delay?: number }) => void }, { direction?: 'left'; onClick: () => void; disabled?: boolean }>(function FlywheelArrow({ direction, onClick, disabled }, ref) {
  const btn = useRef<HTMLButtonElement>(null)
  useImperativeHandle(
    ref,
    () => ({
      animateIn: ({ delay = 0 }) => {
        if (btn.current) gsap.fromTo(btn.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay })
      },
      animateOut: ({ delay = 0 }) => {
        if (btn.current) gsap.fromTo(btn.current, { opacity: 1, scale: 1 }, { opacity: 1, scale: 0.9, duration: 0.5, ease: 'power3.out', delay })
      },
    }),
    [],
  )
  return (
    <button
      ref={btn}
      type="button"
      onClick={onClick}
      className={cn('relative flex items-center justify-center w-12 transition-all bg-black cursor-pointer rounded-sm aspect-square group/button overflow-clip transition-colors duration-300', disabled ? 'text-scale-gray-60 bg-scale-gray-30 pointer-events-none' : 'pointer-events-auto text-white')}
    >
      <div className="absolute top-0 left-0 w-full h-full transition-transform duration-300 origin-bottom scale-y-0 bg-scale-gray-30 group-hover/button:scale-y-100" />
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
        {direction === 'left' ? (
          <path d="M5.55088 11.3838C5.70709 11.54 5.96036 11.54 6.11657 11.3838L6.5863 10.914C6.74251 10.7578 6.74251 10.5046 6.5863 10.3483L2.68994 6.45199C2.34823 6.11028 2.34823 5.55626 2.68994 5.21455L6.5863 1.3182C6.74251 1.16199 6.74251 0.908723 6.5863 0.752513L6.11657 0.282781C5.96036 0.126572 5.70709 0.126572 5.55088 0.282782L0.619108 5.21455C0.2774 5.55626 0.277399 6.11028 0.619108 6.45199L5.55088 11.3838Z" fill="currentColor" />
        ) : (
          <path d="M2.44912 11.3838C2.29291 11.54 2.03964 11.54 1.88343 11.3838L1.4137 10.914C1.25749 10.7578 1.25749 10.5046 1.4137 10.3483L5.31006 6.45199C5.65177 6.11028 5.65177 5.55626 5.31006 5.21455L1.4137 1.3182C1.25749 1.16199 1.25749 0.908723 1.4137 0.752513L1.88343 0.282781C2.03964 0.126572 2.29291 0.126572 2.44912 0.282782L7.38089 5.21455C7.7226 5.55626 7.7226 6.11028 7.38089 6.45199L2.44912 11.3838Z" fill="currentColor" />
        )}
      </svg>
    </button>
  )
})

function SgpFlywheel({
  configFilePath,
  introHeadline,
  introBody,
  introImage,
  hideProcessLabel,
  introLabel,
  layout,
  steps,
  className,
  flywheelLabels = { performance: 'PERFORMANCE OVER TIME', process: 'THE FLYWHEEL PROCESS' },
}: SteppedVideoProps) {
  const total = steps?.length ?? 0
  const stepsOnly = layout === 'stepsOnly'
  const stepsOnlyRef = useRef(stepsOnly)
  stepsOnlyRef.current = stepsOnly
  const hasImages = !!introImage?.path || (steps ?? []).some((s) => s?.image?.path)
  const bgEl = useRef<HTMLDivElement>(null)
  const introCol = useRef<HTMLDivElement>(null)
  const stepsCol = useRef<HTMLDivElement>(null)
  const headline = useRef<AnimatedTextHandle>(null)
  const bodyRefs = useRef<(AnimatedTextHandle | null)[]>([])
  const media = useRef<HTMLDivElement>(null)
  const appliedStep = useRef(1)
  const prevStep = useRef(1)
  const chip = useRef<HTMLDivElement>(null)
  const chipA = useRef<HTMLSpanElement>(null)
  const chipB = useRef<HTMLSpanElement>(null)
  const counter = useRef<HTMLParagraphElement>(null)
  const arrows = useRef<HTMLDivElement>(null)
  const introWrap = useRef<HTMLDivElement>(null)
  const labelTriangle = useRef<HTMLSpanElement>(null)
  const label = useRef<AnimatedTextHandle>(null)
  const prevBtn = useRef<{ animateIn: (o: { delay?: number }) => void; animateOut: (o: { delay?: number }) => void }>(null)
  const nextBtn = useRef<{ animateIn: (o: { delay?: number }) => void; animateOut: (o: { delay?: number }) => void }>(null)
  const playerRef = useRef<ActiveFrame | null>(null)
  const [step, setStep] = useState(+!!stepsOnly)
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  openRef.current = open
  const markReady = useMarkReady('stepped-video-sgp-flywheel')
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined
    const f = () => {
      clearTimeout(t)
      t = setTimeout(() => setIsMobile(window.innerWidth < 1280), 50)
    }
    window.addEventListener('resize', f)
    f()
    return () => window.removeEventListener('resize', f)
  }, [])
  const PIN_END = 'bottom bottom-=50%'
  const progress = useRef({ progress: 0 })
  const paint = () => {
    const bg = bgEl.current
    const m = media.current
    const col = introCol.current
    const wrap = introWrap.current
    if (!bg || !m || !col || !wrap) return
    const inset = (1 - m.clientWidth / bg.clientWidth) * 100
    const insetTop = stepsOnlyRef.current ? (1 - m.clientHeight / bg.clientHeight) * 100 : ((col.offsetTop + wrap.offsetHeight + 32) / bg.clientHeight) * 100
    const { width, height } = bg.getBoundingClientRect()
    const half = height / 2
    const p = progress.current.progress
    const d = mapRange(p, 0, 1, isMobile ? insetTop : inset, 0, true)
    const reveal = mapRange(p, 0.2, 1, 100, 0, true)
    const mediaY = mapRange(p, 0, 1, 0.65 * half, 0, true)
    const introY = mapRange(p, 0, 1, 0, -100, true)
    const introYm = mapRange(p, 0, 1, 0, -600, true)
    const chipX = mapRange(p, 0, 1, (width / 2) * 0.9, 0, true)
    const chipY = mapRange(p, 0, 1, 0.9 * half, 0, true)
    const out = mapRange(p, 0, 1, 1, 0, true)
    if (isMobile) {
      gsap.set(bg, { clipPath: `inset(${d}% 0% 0% 0% round 16px)` })
      gsap.set(stepsCol.current, { clipPath: `inset(${reveal}% 0% 0% 0% round 16px)` })
      gsap.set(m, { y: `${mediaY}px` })
      gsap.set(col, { y: `${introYm}px` })
      gsap.set(chip.current, { x: '0px', y: `${chipY}px` })
      gsap.set(chipA.current, { y: `-${100 * p}%` })
      gsap.set(chipB.current, { y: `${100 * out}%` })
    } else {
      gsap.set(bg, { clipPath: `inset(0% 0% 0% ${d}% round 16px)` })
      gsap.set(stepsCol.current, { clipPath: `inset(0% 0% 0% ${reveal}% round 16px)` })
      gsap.set(chip.current, { x: `${chipX}px`, y: '0px' })
      gsap.set(chipA.current, { y: `-${100 * p}%` })
      gsap.set(chipB.current, { y: `${100 * out}%` })
      gsap.set(m, { y: '0%' })
      gsap.set(col, { y: `${introY}px` })
    }
    gsap.set(arrows.current, { opacity: `${p}` })
    gsap.set(counter.current, { y: `${100 * out}%` })
  }
  const showIntro = async () => {
    gsap.killTweensOf(progress.current)
    gsap.to(progress.current, { progress: 0, duration: 2, ease: 'power3.out', onUpdate: paint })
    ;[prevBtn.current, nextBtn.current].forEach((b, i) => {
      b?.animateOut({ delay: 0.1 * i + 1 })
    })
    if (labelTriangle.current) gsap.fromTo(labelTriangle.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 1 })
    const texts = [label.current, headline.current, ...bodyRefs.current].filter(Boolean) as AnimatedTextHandle[]
    await Promise.all(texts.map((t) => t.ready()))
    await Promise.all(texts.map((t, i) => t.animateIn({ delay: 1 + 0.1 * i })))
  }
  const showSteps = async () => {
    gsap.killTweensOf(progress.current)
    gsap.to(progress.current, { progress: 1, duration: 2, ease: 'power3.out', onUpdate: paint })
    ;[prevBtn.current, nextBtn.current].forEach((b, i) => {
      b?.animateIn({ delay: 0.1 * i + 1 })
    })
    if (labelTriangle.current) gsap.fromTo(labelTriangle.current, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out' })
    const texts = [label.current, headline.current, ...bodyRefs.current].filter(Boolean) as AnimatedTextHandle[]
    await Promise.all(texts.map((t) => t.ready()))
    await Promise.all(texts.map((t, i) => t.animateOut({ delay: 0.1 * i })))
  }
  const shownStep = useRef(-1)
  const userStepped = useRef(false)
  const currentCard = useRef<StepHandle | null>(null)
  const cards = useRef<(StepHandle | null)[]>([])
  const frameSink = useRef<((frame: VideoFrame) => void) | null>(null)
  const scrubbing = useRef(false)
  const { containerRef, pinRef, activeFrameInstance } = useFlywheelFrames({
    configFilePath,
    stepCount: total,
    frameSink,
    onFramesReady: markReady,
    pin: !stepsOnly,
    pinSpacing: true,
    pinEnd: PIN_END,
  })
  playerRef.current = activeFrameInstance
  const graph = useMemo(() => new FrameEdgeController({ edges: FLYWHEEL_EDGES, start: '00:00', end: '32:12' }), [])
  const scrubIntro = useCallback(
    (p: number) => {
      scrubbing.current = true
      graph.currentTween?.kill?.()
      const r = playerRef.current?.getFrameRange('00:00', '02:02')
      if (r) playerRef.current?.setFrame(Math.round(r.from + p * (r.to - r.from)))
    },
    [graph],
  )
  useScrubTrigger(containerRef, {
    timelineVersion: false,
    start: 'top center-=15%',
    end: 'top top+=1%',
    pin: stepsOnly ? undefined : (pinRef.current ?? undefined),
    pinSpacing: !stepsOnly,
    pinReparent: !stepsOnly,
    onUpdate: (self) => {
      scrubIntro(self.progress)
    },
    onComplete: () => {
      scrubbing.current = false
    },
    onLeave: (self) => {
      self.kill()
    },
  } as Parameters<typeof useScrubTrigger>[1])
  const openProgress = useRef({ progress: 0 })
  const openTween = useRef<gsap.core.Tween | null>(null)
  const tweenOpen = useCallback((to: number, duration = 2) => {
    openTween.current?.kill?.()
    openTween.current = gsap.to(openProgress.current, { progress: to, duration, ease: 'Sine.inOut' })
  }, [])
  const enter = useCallback(() => {
    tweenOpen(1, 2)
    setOpen(true)
    setStep((s) => (s > 0 ? s : 1))
  }, [tweenOpen])
  const leave = useCallback(() => {
    if (stepsOnlyRef.current) return
    tweenOpen(0, 2)
    setOpen(false)
    setStep(0)
  }, [tweenOpen])
  useScrubTrigger(containerRef, {
    start: 'top top',
    end: PIN_END,
    pin: stepsOnly ? undefined : (pinRef.current ?? undefined),
    pinSpacing: !stepsOnly,
    pinReparent: !stepsOnly,
    onEnter: () => {
      if (!stepsOnlyRef.current) enter()
    },
    onEnterBack: () => {
      if (!stepsOnlyRef.current) enter()
    },
    onLeaveBack: () => {
      if (!stepsOnlyRef.current) leave()
    },
  })
  useInViewTrigger(containerRef, {
    start: 'top bottom-=25%',
    retroactiveOnEnter: true,
    onEnter: () => {
      if (stepsOnlyRef.current && !openRef.current) enter()
    },
  })
  useEffect(() => {
    if (stepsOnly && !open) return
    const fromUser = userStepped.current
    userStepped.current = false
    appliedStep.current = Math.min(step, total)
    const backwards = appliedStep.current < prevStep.current
    if (appliedStep.current === 1 && !fromUser) void graph.apply(playerRef.current, 0, 1)
    if (prevStep.current === 1 && appliedStep.current === 0 && !fromUser) void graph.apply(playerRef.current, 0, 1, { isTransitioningBackwards: true })
    prevStep.current = appliedStep.current
    if (shownStep.current !== appliedStep.current) {
      if (fromUser) {
        const o = { isTransitioningBackwards: backwards, noBackwardsTransition: true }
        if (appliedStep.current === 1) void graph.apply(playerRef.current, 1, 2, o)
        if (appliedStep.current === 2) void graph.apply(playerRef.current, 2, 3, o)
        if (appliedStep.current === 3) void graph.apply(playerRef.current, 6, 7, o)
        if (appliedStep.current === 4) void graph.apply(playerRef.current, 8, 9, o)
      }
      void currentCard.current?.animateOut?.()
      void cards.current[appliedStep.current - 1]?.animateIn?.()
      currentCard.current = cards.current[appliedStep.current - 1]
    }
    // Scale's dependency list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, total, stepsOnly, open])
  useEffect(() => {
    if (open) {
      void showSteps()
      gsap.set(chip.current, { pointerEvents: 'auto' })
      gsap.set(arrows.current, { pointerEvents: 'auto' })
    } else {
      void showIntro()
      gsap.set(chip.current, { pointerEvents: 'none' })
      gsap.set(arrows.current, { pointerEvents: 'none' })
    }
    // Scale's dependency list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isMobile])
  const next = () => {
    const n = Math.min(step + 1, total)
    if (n !== step) userStepped.current = true
    setStep(n)
  }
  const prev = () => {
    const n = Math.max(step - 1, 1)
    if (n !== step) userStepped.current = true
    setStep(n)
  }
  const scene = useMemo(() => flywheelScene(frameSink), [])
  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') next()
        else if (e.key === 'ArrowLeft') prev()
      }}
      ref={containerRef}
      className={cn('SgpFlywheel bg-white text-black relative w-full overflow-clip', className)}
      style={stepsOnly ? undefined : { height: '150vh' }}
    >
      <div ref={pinRef} className="w-full min-h-0 h-dvh oml:h-[200vh] !py-6 md:!py-24 grid-layout-mobile md:grid-layout-desktop">
        <div className="relative flex flex-col w-full h-full xl:flex-row col-span-full md:col-span-10 md:col-start-2">
          <div ref={bgEl} className="absolute top-0 left-0 z-10 w-full h-full Background bg-scale-gray-90" />
          <div className="absolute w-full h-full p-8 xl:w-[36%] xl:p-12 -z-10">
            <div ref={introCol} className="flex flex-col justify-start w-full h-full xl:justify-center">
              <div ref={introWrap} className="intro-wrapper">
                {introLabel ? (
                  <div className="mb-4 flex items-center justify-center gap-2 xl:justify-start">
                    <span ref={labelTriangle} className="text-scale-gray-30 opacity-0" aria-hidden>
                      <LabelMark />
                    </span>
                    <AnimatedText ref={label} tagName="p" className="leading-none detail-mono text-scale-gray-30">
                      {introLabel}
                    </AnimatedText>
                  </div>
                ) : null}
                {introHeadline ? (
                  <AnimatedText ref={headline} tagName="h4" className="col-span-2 col-start-2 mb-6 leading-none text-center header4-regular text-balance xl:text-left">
                    {introHeadline}
                  </AnimatedText>
                ) : null}
                {(introBody ?? []).map((block, i) => (
                  <RichText
                    key={i}
                    value={[block]}
                    animatedTextRef={(el) => {
                      bodyRefs.current[i] = el
                    }}
                    blockClassNames={{ h4: 'leading-9' }}
                    className={cn('max-sm:text-sm leading-snug col-span-3 col-start-2 text-center xl:text-left', i > 0 && 'mt-6')}
                  />
                ))}
              </div>
            </div>
          </div>
          <div ref={chip} className={cn('px-2 py-1 text-black bg-white rounded-sm detail-mono w-fit translate-x-[400%] absolute top-6! md:top-16! left-6! md:left-16! z-10', hideProcessLabel && 'hidden')}>
            <p className="relative flex flex-col items-center overflow-clip detail-mono">
              <span className="block" ref={chipA}>
                {flywheelLabels.performance}
              </span>
              <span className="absolute block translate-y-full" ref={chipB}>
                {flywheelLabels.process}
              </span>
            </p>
          </div>
          <div className="absolute p-6! xl:p-16! right-6! xl:right-16! z-10 h-full flex items-end xl:items-start">
            <div className="mb-6 text-black rounded-sm xl:mb-0 detail-mono w-fit overflow-clip">
              <p ref={counter} className="relative flex flex-col items-center translate-y-full overflow-clip detail-mono">
                {`${step.toString().padStart(2, '0')} | ${total.toString().padStart(2, '0')}`}
              </p>
            </div>
          </div>
          <div ref={stepsCol} className="absolute z-20 flex-1 w-full h-full p-8 xl:p-12 xl:relative">
            <div className="absolute top-0 left-0 flex flex-col justify-end w-full h-full p-8 xl:p-16">
              {(steps ?? []).map((s, i) => (
                <FlywheelStepCard
                  {...s}
                  key={i}
                  ref={(el) => {
                    cards.current[i] = el
                  }}
                  align={stepsOnly ? 'top' : 'center'}
                  index={i + 1}
                  current={step}
                  total={total}
                />
              ))}
              <div ref={arrows} className="relative z-20 flex gap-2 opacity-0">
                <FlywheelArrow ref={prevBtn} direction="left" onClick={prev} disabled={step <= 1} />
                <FlywheelArrow ref={nextBtn} onClick={next} disabled={step >= total} />
              </div>
            </div>
          </div>
          <div ref={media} className="relative min-w-0 z-10 flex items-center justify-center p-8 xl:flex-[1.3] h-[60%] xl:h-full mix-blend-darken translate-y-[80%] xl:translate-y-0">
            <div className={cn('h-full w-full', hasImages && 'hidden')}>
              <ThreeCanvas className="relative h-full w-full" scene={scene} />
            </div>
            {hasImages ? (
              <div className="relative h-full w-full">
                {[introImage, ...(steps ?? []).map((s) => s?.image)].map((img, i) => {
                  if (!img?.path) return null
                  const shown = stepsOnly ? step === i : i === 0 ? !open : open && step === i
                  return (
                    <div key={i} aria-hidden={!shown} className={cn('absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none', shown ? 'opacity-100' : 'opacity-0')}>
                      <ResponsiveImage asset={img} fill noBackground sizes="(max-width: 1280px) 100vw, 60vw" alt={img.alt ?? ''} className="[&_img]:object-contain" />
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

const STEP_CHIP: Record<number, string> = { 1: 'bg-atlas-blue', 2: 'bg-evergreen', 3: 'bg-foundry-tan', 4: 'bg-archive-purple' }

const IntroStepCard = forwardRef<StepHandle, SteppedVideoStep & { current?: number; total?: number; counterLabel?: string; counterSeparator?: string; counterFixedColor?: string }>(function IntroStepCard(
  { title, description, current = 0, total = 0, counterLabel, counterSeparator, counterFixedColor },
  ref,
) {
  const heading = useRef<AnimatedTextHandle>(null)
  const body = useRef<AnimatedTextHandle>(null)
  const chip = useRef<HTMLDivElement>(null)
  const tri = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLParagraphElement>(null)
  useImperativeHandle(
    ref,
    () => ({
      animateIn() {
        heading.current?.animateIn?.()
        body.current?.animateIn?.({ delay: 0.2 })
        gsap.fromTo(chip.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
        if (!counterFixedColor) {
          chip.current!.classList.remove(...Object.values(STEP_CHIP))
          chip.current!.classList.add(STEP_CHIP[Math.min(current, total)])
        }
        if (counterFixedColor || current > 2) {
          count.current!.classList.remove('text-scale-gray-80')
          count.current!.classList.add('text-black')
          tri.current!.classList.remove('bg-white')
          tri.current!.classList.add('bg-black')
        } else {
          count.current!.classList.remove('text-black')
          count.current!.classList.add('text-scale-gray-80')
          tri.current!.classList.remove('bg-black')
          tri.current!.classList.add('bg-white')
        }
      },
      animateOut() {
        heading.current?.animateOut?.()
        body.current?.animateOut?.({ delay: 0.2 })
        gsap.fromTo(chip.current, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out' })
      },
    }),
    // Empty list as on Scale. The parent passes a new ref callback each render, so React still rebuilds the handle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  return (
    <div className="absolute inset-0 w-full overflow-y-auto oml:h-full oml:pt-5 overscroll-y-contain items-end pb-30 md:items-start md:inset-auto md:top-0 md:overflow-visible grid-layout-mobile md:grid-layout-desktop">
      <div className="flex flex-col gap-4 mb-8 col-span-full h-fit md:mb-0 md:col-start-2 md:col-span-5 xl:col-start-2 xl:col-span-3">
        <div ref={chip} className={`flex items-center gap-3 opacity-0 index ${counterFixedColor ?? 'bg-atlas-blue'} w-fit py-1.5 md:py-2 px-1.5 md:px-3 rounded`}>
          <div ref={tri} className={`w-2 h-2 ${counterFixedColor ? 'bg-black' : 'bg-white'}`} />
          <p ref={count} className={`tracking-wider detail-mono ${counterFixedColor ? 'text-black' : 'text-scale-gray-80'}`}>
            {`${counterLabel ?? 'SGP'} ${Math.min(current, total)} ${counterSeparator ?? 'of'} ${total}`}
          </p>
        </div>
        <AnimatedText ref={heading} tagName="h2" className="leading-none header3-regular">
          {title}
        </AnimatedText>
        <RichText value={description ?? []} animatedTextRef={body} className="h-fit text-sm text-[#C7C7C7] oml:max-w-1/2" />
      </div>
    </div>
  )
})

function StepArrow({ variant, onClick, className, disabled }: { variant: 'previous' | 'next'; onClick: () => void; className?: string; disabled?: boolean }) {
  const previous = variant === 'previous'
  return (
    <button disabled={disabled} type="button" className={cn('arrow-control-button bg-[#212121] w-10 h-10 rounded-lg cursor-pointer flex items-center justify-center ', disabled && 'cursor-default!', disabled && 'opacity-50!', className)} onClick={onClick} aria-label={previous ? 'Previous step' : 'Next step'}>
      {previous ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none" aria-hidden>
          <path d="M7.26381 15.7054C7.48251 15.9241 7.83708 15.9241 8.05577 15.7054L8.7134 15.0478C8.93209 14.8291 8.93209 14.4745 8.7134 14.2558L3.2585 8.80094C2.78011 8.32255 2.78011 7.54692 3.2585 7.06853L8.71339 1.61363C8.93209 1.39494 8.93209 1.04036 8.7134 0.82167L8.05577 0.164046C7.83708 -0.0546478 7.48251 -0.0546474 7.26381 0.164046L0.359331 7.06853C-0.119061 7.54692 -0.119061 8.32255 0.359331 8.80094L7.26381 15.7054Z" fill="white" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none" aria-hidden>
          <path d="M1.61314 15.7054C1.39445 15.9241 1.03988 15.9241 0.821182 15.7054L0.163558 15.0478C-0.055136 14.8291 -0.0551357 14.4745 0.163558 14.2558L5.61846 8.80094C6.09685 8.32255 6.09685 7.54692 5.61846 7.06853L0.163558 1.61363C-0.0551354 1.39494 -0.0551357 1.04036 0.163558 0.82167L0.821182 0.164046C1.03988 -0.0546478 1.39445 -0.0546474 1.61314 0.164046L8.51762 7.06853C8.99601 7.54692 8.99601 8.32255 8.51762 8.80094L1.61314 15.7054Z" fill="white" />
        </svg>
      )}
    </button>
  )
}

type IntroConfig = { files?: { lines: string[]; tris: string[]; trisMask: string[] } }

/** Intro timeline and bin loader (Scale's inner hook). Three players: lines, tris and tris mask. */
function useIntroFrames({
  configFilePath,
  stepCount,
  sinkA,
  sinkB,
  sinkMask,
  onScrubProgress,
  onFramesReady,
  staticImages = false,
  viewportsPerStep = 1,
}: {
  configFilePath?: string
  stepCount: number
  sinkA: Sink
  sinkB: Sink
  sinkMask: Sink
  onScrubProgress: (p: number, raw: number) => void
  onFramesReady: () => void
  staticImages?: boolean
  viewportsPerStep?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const segments = Math.max(1, stepCount)
  const edges = segments + 1
  const tweens = edges + 1
  const scrubViewports = edges * (viewportsPerStep > 0 ? viewportsPerStep : 1)
  const span = scrubViewports + 1 + 1
  const [config, setConfig] = useState<IntroConfig | null>(null)
  const [transitions, setTransitions] = useState<ActiveFrame | null>(null)
  const [loops, setLoops] = useState<ActiveFrame | null>(null)
  const scrub = useRef(onScrubProgress)
  scrub.current = onScrubProgress
  const ready = useRef(onFramesReady)
  ready.current = onFramesReady
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const moved = useRef(false)
  const url = useMemo(() => configUrl(configFilePath), [configFilePath])
  useEffect(() => {
    if (!config) return
    let cancelled = false
    let lines: ActiveFrame | null = null
    let tris: ActiveFrame | null = null
    let mask: ActiveFrame | null = null
    void (async () => {
      const c = await codec()
      if (!c || !config.files) return
      const i = c.name === 'h264' ? 0 : 1
      const player = (file: string, sink: Sink) => new ActiveFrame(FRAME_BASE + file, { hardwareAcceleration: c.hw, logIndex: true, process: (f) => sink.current?.(f) })
      lines = player(config.files.lines[i], sinkA)
      mask = player(config.files.trisMask[i], sinkMask)
      tris = new ActiveFrame(FRAME_BASE + config.files.tris[i], {
        hardwareAcceleration: c.hw,
        logIndex: true,
        process: async (f) => {
          sinkB.current?.(f)
          if (mask) mask.setFrame(tris!.frame!)
        },
      })
      setTransitions(lines)
      setLoops(tris)
      await Promise.all([lines.loading, tris.loading, mask.loading])
      lines.setFrame(0)
      tris.setFrame(0)
      mask.setFrame(0)
      if (cancelled) {
        lines.destroy()
        tris.destroy()
        mask.destroy()
        return
      }
      ready.current?.()
    })()
    return () => {
      cancelled = true
      lines?.destroy()
      tris?.destroy()
      mask?.destroy()
    }
  }, [config, sinkA, sinkB, sinkMask])
  useGSAP(
    () => {
      const el = pinRef.current
      if (!el) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${window.innerHeight * span}`, scrub: true, pin: true, markers: false, pinSpacing: false },
        async onUpdate() {
          const raw = this.progress()
          // Strict Mode rebuilds this timeline in dev and it renders once at 0 with events on. Scale never reports before the first scroll.
          if (raw > 0) moved.current = true
          if (!moved.current) return
          const t = scrubViewports / span
          scrub.current?.(raw <= t ? raw / t : 1, raw)
        },
      })
      timelineRef.current = tl
      for (let i = 0; i < tweens; i += 1) tl.to({}, { duration: 1, ease: 'none' })
      return () => {
        timelineRef.current = null
        tl.kill()
      }
    },
    { scope: containerRef },
  )
  useEffect(() => {
    if (staticImages || !url) {
      startTransition(() => setConfig(null))
      return
    }
    let cancelled = false
    fetch(url)
      .then((r) => {
        if (!r.ok) throw Error(`Failed to load ${url} (${r.status})`)
        return r.json()
      })
      .then((j) => {
        if (!cancelled) setConfig(j)
      })
      .catch(() => {
        if (!cancelled) setConfig(null)
      })
    return () => {
      cancelled = true
    }
  }, [url, staticImages])
  return { containerRef, pinRef, scrubViewports, transitions, loops, timelineRef }
}

function SgpIntro({ configFilePath, introHeadline, introBody, introImage, steps, className, layout, counterLabel, scrollLabel = 'Scroll to explore' }: SteppedVideoProps) {
  const pinned = layout === 'headingPinned'
  const total = steps?.length ?? 0
  const hasImages = (steps ?? []).some((s) => s?.image?.path)
  const carried: (ImageAsset | undefined)[] = []
  ;(steps ?? []).forEach((s, i) => {
    carried[i] = s?.image?.path ? s.image : carried[i - 1]
  })
  const headingBlock = useRef<HTMLDivElement>(null)
  const stepsWrap = useRef<HTMLDivElement>(null)
  const headline = useRef<AnimatedTextHandle>(null)
  const bodyRef = useRef<AnimatedTextHandle>(null)
  const sinkA = useRef<((f: VideoFrame) => void) | null>(null)
  const sinkB = useRef<((f: VideoFrame) => void) | null>(null)
  const sinkMask = useRef<((f: VideoFrame) => void) | null>(null)
  const transitionsRef = useRef<ActiveFrame | null>(null)
  const loopsRef = useRef<ActiveFrame | null>(null)
  const active = useIntroStore((s) => s.activeStepIndex)
  const first = introImage?.path ? introImage : null
  const images = first ? [first, ...carried] : carried
  const shownImage = first ? Math.min(active ?? 0, images.length - 1) : Math.max(0, (active ?? 1) - 1)
  const setActive = useIntroStore((s) => s.setActiveStepIndex)
  const lock = useRef(false)
  const lastStep = useRef<number | null>(null)
  const dots = useRef<(HTMLSpanElement | null)[]>([])
  const lenis = useLenis()
  const phone = useMediaQuery('(max-width: 767px)')
  const lead = phone ? 0.02 : 0.06
  const edges = useMemo<FrameEdges>(() => {
    if (!pinned) return INTRO_EDGES
    return Object.fromEntries(
      Object.entries(INTRO_EDGES).map(([k, e]) => (e?.activeStepIndex === 0 ? [k, { ...e, timelineEndPercent: 10 }] : e?.activeStepIndex === 1 ? [k, { ...e, timelineStartPercent: 10, fromMs: '04:09' }] : [k, e])),
    )
  }, [pinned])
  const ranges = useMemo(() => {
    if (hasImages) {
      const part = 1 / (total + 1)
      return Array.from({ length: total }, (_, i) => ({ step: i + 1, start: (i + 1) * part, end: i + 2 === total + 1 ? 1 : (i + 2) * part }))
    }
    const list = Object.values(edges ?? {})
      .filter((e) => typeof e?.activeStepIndex === 'number' && e.activeStepIndex! > 0)
      .map((e) => ({ step: e.activeStepIndex!, start: (e.timelineStartPercent ?? 0) / 100 }))
      .sort((a, b) => a.start - b.start || a.step - b.step)
    return list.map((r, i) => ({ ...r, end: i + 1 < list.length ? list[i + 1].start : 1 }))
  }, [edges, hasImages, total])
  const hideAt = useMemo(() => {
    if (!pinned) return 0.1
    const s = ranges[0]?.start
    return typeof s !== 'number' ? 0.1 : Math.max(0.02, s - lead)
  }, [pinned, ranges, lead])
  const stepAt = useCallback(
    (p: number) => {
      let s = 0
      ranges.forEach((r) => {
        if (p >= r.start) s = r.step
      })
      return s
    },
    [ranges],
  )
  useLayoutEffect(() => {
    const pin = pinEl.current
    if (!pin || typeof ResizeObserver === 'undefined') return
    const measure = () => {
      const top = pin.getBoundingClientRect().top
      let bottom = 0
      ;[stepsWrap.current, headingBlock.current].forEach((box) => {
        if (!box) return
        box.querySelectorAll(':scope > *').forEach((c) => {
          const r = c.getBoundingClientRect()
          if (r.height > 0) bottom = Math.max(bottom, r.bottom - top)
        })
      })
      if (bottom > 0) pin.style.setProperty('--ns-art-top', `${Math.round(bottom + 16)}px`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ;[stepsWrap.current, headingBlock.current, pin].forEach((e) => e && ro.observe(e))
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
    // Runs once, as on Scale.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const markReady = useMarkReady('stepped-video-sgp-intro')
  const pinnedRef = useRef(false)
  const hidden = useRef(false)
  const shown = useRef(false)
  pinnedRef.current = pinned
  const reveal = async () => {
    const texts = [headline.current, bodyRef.current].filter(Boolean) as AnimatedTextHandle[]
    await Promise.all(texts.map((t) => t.ready()))
    const delays = pinnedRef.current ? [0.2, 0.5] : [0, 0.1]
    await Promise.all(texts.map((t, i) => t.animateIn({ delay: delays[i] ?? 0.1 * i })))
  }
  const conceal = async () => {
    const texts = [headline.current, bodyRef.current].filter(Boolean) as AnimatedTextHandle[]
    await Promise.all(texts.map((t) => t.ready()))
    await Promise.all(texts.map((t, i) => t.animateOut({ delay: 0.1 * i })))
  }
  const progressBar = useRef<HTMLDivElement>(null)
  const graph = useMemo(() => new FrameEdgeController({ edges, start: '03:03', end: '15:03' }), [])
  const frames = useIntroFrames({
    configFilePath,
    stepCount: total,
    sinkA,
    sinkB,
    sinkMask,
    onScrubProgress: async (p) => {
      if (p > hideAt) {
        if (!hidden.current) {
          if (shown.current) void conceal()
          hidden.current = true
          shown.current = false
        }
      } else if (!shown.current) {
        void reveal()
        shown.current = true
        hidden.current = false
      }
      if (hasImages) {
        const t = Math.max(0, Math.min(1, p))
        const s = stepAt(t)
        if (s !== lastStep.current) {
          lastStep.current = s
          setActive(s)
        }
        ranges.forEach((r, i) => {
          const dot = dots.current[i]
          if (!dot) return
          const len = r.end - r.start
          const n = len > 0 ? (t - r.start) / len : 0
          dot.style.transform = `scaleX(${Math.max(0, Math.min(1, n))})`
        })
        return
      }
      if (!transitionsRef.current || graph.isresizing) return
      await transitionsRef.current.loading
      await loopsRef.current?.loading
      if (lock.current) return
      const t = Math.max(0, Math.min(1, p))
      const lines = transitionsRef.current
      const tris = loopsRef.current
      void graph.setProgress(p, lines, lenis)
      const lr = lines.getFrameRange('03:03', '15:03')
      const tr = tris?.getFrameRange('03:00', '15:03')
      if (lr && tr && Math.round(lr.from + t * (lr.to - lr.from)) < 160) tris?.setFrame(0)
      if (progressBar.current) progressBar.current.style.transform = `scaleX(${t})`
    },
    onFramesReady: markReady,
    staticImages: hasImages,
    viewportsPerStep: hasImages ? 0.35 : 1,
  })
  const pinEl = frames.pinRef
  const root = frames.containerRef
  useEffect(() => {
    if (hasImages) markReady()
  }, [hasImages, markReady])
  useInViewTrigger(headingBlock, {
    start: 'top bottom-=5%',
    retroactiveOnEnter: true,
    onEnter: () => {
      if (!pinnedRef.current || shown.current || hidden.current) return
      shown.current = true
      void reveal()
    },
  })
  useScrubTrigger(root, {
    start: 'top bottom-=30%',
    end: 'top top',
    pinSpacing: false,
    markers: false,
    onStart: () => {
      useIntroStore.getState().setIntroScrollProgress(0)
    },
    onUpdate: (self) => {
      const p = self.progress
      const lines = transitionsRef.current
      if (!lines) return
      const r = lines.getFrameRange('00:00', '03:03')
      if (r) {
        const f = Math.round(r.from + p * (r.to - r.from))
        requestAnimationFrame(() => {
          lines.setFrame(f)
        })
      }
      useIntroStore.getState().setIntroScrollProgress(p)
    },
  } as Parameters<typeof useScrubTrigger>[1])
  transitionsRef.current = frames.transitions
  loopsRef.current = frames.loops
  const shownCard = useRef(-1)
  const currentCard = useRef<StepHandle | null>(null)
  const cards = useRef<(StepHandle | null)[]>([])
  const appliedStep = useRef<number | null>(active)
  const footer = useRef<HTMLDivElement>(null)
  const setSectionTheme = (el: HTMLElement | null, theme: string) => el?.setAttribute('data-theme', theme)
  const scrollToStep = (step: number) => {
    const el = root.current
    const target = (() => {
      if (!el) return lenis?.scroll ?? 0
      let t: number
      if (hasImages) {
        const r = ranges.find((x) => x.step === step)
        if (r) t = (r.start + r.end) / 2
        else {
          if (step > 0) return lenis?.scroll ?? 0
          t = 0
        }
      } else {
        const e = Object.values(edges).find((x) => x.activeStepIndex === step)
        if (!e) return lenis?.scroll ?? 0
        t = (e.timelineStartPercent! + e.timelineEndPercent!) / 200
      }
      t = Math.max(0, Math.min(1, t))
      return Math.max(0, Math.min(el.getBoundingClientRect().top + (lenis?.scroll ?? window.scrollY) + t * Math.max(0, el.offsetHeight - window.innerHeight), document.documentElement.scrollHeight - window.innerHeight))
    })()
    lenis?.scrollTo(target)
    requestAnimationFrame(() => {
      setActive(Math.max(0, Math.min(total, step)))
    })
  }
  const stepBy = (d: number) => {
    if (active !== null) scrollToStep(active + d)
  }
  const lenisRef = useRef(lenis)
  lenisRef.current = lenis
  useEffect(() => {
    graph.onLoopEdgeStart = (e, back) => {
      if (back) void graph.apply(loopsRef.current, e.fromIndex, e.toIndex)
    }
    graph.onTransitionEdgeStart = (e, back) => {
      void graph.apply(loopsRef.current, e.fromIndex, e.toIndex, { isTransitioningBackwards: back ?? false })
    }
    graph.onActiveStepIndex = (s) => {
      setActive(s)
    }
    const onResize = () => graph.onResize([transitionsRef.current, loopsRef.current].filter(Boolean) as ActiveFrame[], lenisRef.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [graph, setActive])
  useEffect(() => {
    appliedStep.current = Math.min(active as number, total)
    if (shownCard.current !== appliedStep.current) {
      void currentCard.current?.animateOut?.()
      if (frames.transitions) shownCard.current = appliedStep.current
      void cards.current[appliedStep.current - 1]?.animateIn?.()
      currentCard.current = cards.current[appliedStep.current - 1]
    }
    // Scale's dependency list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, frames.transitions, frames.loops, graph])
  useEffect(() => {
    setSectionTheme(root.current, 'dark')
    // Mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(
    () => () => {
      useIntroStore.getState().setActiveStepIndex(null)
    },
    [],
  )
  const scene = useMemo(() => introScene(sinkA, sinkB, sinkMask), [])
  const end0 = edges['0,0'].timelineEndPercent!
  return (
    <div
      role="region"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') stepBy(1)
        else if (e.key === 'ArrowLeft') stepBy(-1)
      }}
      ref={root}
      className={cn('SgpIntro bg-black text-white relative w-full', className)}
      style={{ height: `${(1 + frames.scrubViewports) * 100}vh` }}
    >
      <div ref={pinEl} className="relative flex h-dvh w-full flex-col overflow-hidden md:block oml:block">
        <div className="relative z-0 h-[50dvh] min-h-0 w-full shrink-0 md:absolute md:inset-0 md:z-0 md:h-full oml:absolute oml:inset-0 oml:z-0 oml:h-full">
          {hasImages ? null : (
            <div className="h-full w-full">
              <ThreeCanvas className="relative h-full w-full" scene={scene} />
            </div>
          )}
          {hasImages ? (
            <div className="absolute inset-0 z-[1] max-md:inset-x-6 md:top-[var(--ns-art-top,max(22%,22rem))] md:bottom-[3%] md:max-h-[50vh] md:mx-auto md:max-w-[1472px] md:px-6">
              {images.map((img, i) =>
                img ? (
                  <div key={i} aria-hidden={i !== shownImage} className={'absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ' + (i === shownImage ? 'opacity-100' : 'opacity-0')}>
                    <ResponsiveImage asset={img} fill noBackground sizes="100vw" alt={img.alt ?? ''} className="[&_img]:object-contain [&_img]:object-center md:[&_img]:object-top" />
                  </div>
                ) : null,
              )}
            </div>
          ) : null}
        </div>
        <div
          ref={stepsWrap}
          className={cn(
            'relative z-10 flex h-[50dvh] oml:h-full min-h-0 w-full shrink-0 flex-col justify-start overflow-y-auto px-4 pt-4 pb-32 max-md:min-h-0 grid-layout-mobile md:absolute md:left-0 md:right-0 md:z-10 md:h-auto md:min-h-0 md:overflow-visible md:px-0 md:pt-0 md:pb-0 md:grid-layout-desktop',
            'md:top-28',
          )}
        >
          {(steps ?? []).map((s, i) => (
            <IntroStepCard
              {...s}
              key={i}
              ref={(el) => {
                cards.current[i] = el
              }}
              counterLabel={counterLabel}
              counterSeparator={pinned ? 'to' : undefined}
              counterFixedColor={pinned ? 'bg-foundry-tan' : undefined}
              current={active ?? 0}
              total={total}
            />
          ))}
        </div>
        <div
          ref={headingBlock}
          className={cn('md:grid md:absolute z-10 w-full md:top-32 grid-layout-mobile md:grid-layout-desktop oml:grid oml:absolute oml:top-10 oml:grid-layout-desktop', pinned ? 'max-md:grid max-md:absolute max-md:bottom-0 max-md:left-0 max-md:pb-30' : 'hidden')}
        >
          {introHeadline ? (
            <AnimatedText
              ref={headline}
              tagName="h4"
              className={cn('col-span-6 col-start-2 oml:col-start-1 mb-6 leading-none text-center oml:text-left md:col-start-2 md:col-span-5 xl:col-start-2 xl:col-span-3 text-balance md:text-left', pinned && 'max-md:col-span-full max-md:col-start-1 max-md:text-left', pinned ? 'header3-regular' : 'header4-regular')}
            >
              {introHeadline}
            </AnimatedText>
          ) : null}
          <RichText
            value={introBody ?? []}
            animatedTextRef={bodyRef}
            className={cn('col-span-6 col-start-2 oml:col-start-1 text-center oml:text-left md:col-start-2 md:col-span-5 xl:col-start-2 xl:col-span-3 md:text-left', pinned && 'max-md:col-span-full max-md:col-start-1 max-md:text-left', pinned && 'body1 text-scale-gray-60 md:col-span-8 xl:col-span-6')}
            customAnimation={softRiseAnimation}
          />
        </div>
        <div className={cn('md:grid-layout-desktop grid-layout-mobile absolute bottom-0 left-0 z-20 w-full flex-col gap-4 px-6 pb-5 md:px-6 md:pb-6', 'flex')}>
          <div ref={footer} className="col-span-10 col-start-2 transition-opacity duration-300 opacity-100" aria-hidden={!hasImages || undefined}>
            <div className="controls-container flex gap-2 oml:justify-end">
              <StepArrow disabled={(active as number) <= 1} variant="previous" onClick={() => stepBy(-1)} />
              <StepArrow disabled={(active as number) >= total} variant="next" onClick={() => stepBy(1)} />
            </div>
            {hasImages ? (
              <nav aria-label="Challenges" className="mt-2 flex w-full gap-2 md:mb-6">
                {(steps ?? []).map((s, i) => {
                  const n = i + 1
                  const current = active === n
                  return (
                    <button key={i} type="button" onClick={() => scrollToStep(n)} aria-current={current ? 'step' : undefined} className={cn('flex flex-1 cursor-pointer flex-col gap-2 text-left transition-opacity duration-300', 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white', current ? 'opacity-100' : 'opacity-55 hover:opacity-100')}>
                      <span className={cn('text-[11px] leading-tight tracking-wide md:truncate md:text-xs', current ? 'text-white' : 'text-scale-gray-60')}>{s.title}</span>
                      <span className="h-0.5 w-full overflow-hidden rounded-full bg-[#212121]">
                        <span
                          ref={(el) => {
                            dots.current[i] = el
                          }}
                          className="block h-full w-full origin-left rounded-full bg-[#575757] will-change-transform"
                          style={{ transform: 'scaleX(0)' }}
                        />
                      </span>
                    </button>
                  )
                })}
              </nav>
            ) : (
              <>
                <div className="mx-auto mb-0 md:mb-10 flex items-end justify-end gap-3 text-[10px] font-medium uppercase tracking-wider text-[#575757]">
                  <span>{scrollLabel}</span>
                </div>
                <div
                  className="relative mt-2 h-0.5 w-full overflow-hidden rounded-full bg-[#212121]"
                  style={{ clipPath: `inset(0% 0% 0% ${end0}%)`, transformOrigin: 'left center', transform: `scaleX(${100 / (100 - end0)}) translateX(-${end0}%)` }}
                >
                  <div ref={progressBar} className="h-full flex justify-between items-center w-full origin-left rounded-full bg-[#575757] will-change-transform" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }} />
                  {Object.values(edges).map((e, i) => (
                    <div key={i} className="absolute z-10 top-0 left-0 w-2 h-100 bg-black translate-x-[-50%]" style={{ left: `${e.timelineStartPercent}%` }} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SteppedVideo({ componentName, ...props }: SteppedVideoProps): ReactNode {
  return componentName === 'SgpFlywheel' ? <SgpFlywheel {...props} /> : <SgpIntro {...props} />
}
