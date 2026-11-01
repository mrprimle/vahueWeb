'use client'

// Scale module 955774 (chunk 3rls9s4y8-e83.js): three.js runtime for a section. Driven by the gsap ticker,
// paused off screen by an IntersectionObserver. OrbitControls stay attached to the canvas exactly as on Scale.
import { useLenis } from 'lenis/react'
import { useEffect, useId, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { gsap } from '../lib/gsap'
import { useReadyStore } from '../lib/readyStore'

export type ThreeRuntime = {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  timer: THREE.Timer
  commonUniforms: Record<string, { value: unknown }>
  controls: OrbitControls
  BufferGeometryUtils: typeof BufferGeometryUtils
  THREE: typeof THREE
}

type ScrollInfo = { scrollY: number; documentScrollHeight: number; animatedScrollY: number }

export type ThreeScene = {
  // `props`: Scale's component forwards its remaining props to these three (`sceneProps` here).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preload?: (rt: ThreeRuntime, props?: any) => Promise<void> | void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup: (rt: ThreeRuntime, props?: any) => Promise<void> | void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onReady?: (rt: ThreeRuntime, props?: any) => Promise<void> | void
  onDestroy?: (rt: ThreeRuntime) => void
  onTick?: (rt: ThreeRuntime, s: ScrollInfo & { delta: number; elapsed: number; width: number; height: number }) => void
  onResize?: (rt: ThreeRuntime, s: ScrollInfo & { width: number; height: number }) => void
  onScroll?: (rt: ThreeRuntime, s: ScrollInfo) => void
  onMouseMove?: (rt: ThreeRuntime, p: { x: number; y: number }) => void
}

type LenisLike = { animatedScroll: number; scroll: number; dimensions: { scrollHeight: number }; on: (e: 'scroll', f: () => void) => void; off: (e: 'scroll', f: () => void) => void }

function scrollInfo(l: LenisLike | undefined): ScrollInfo {
  return l ? { animatedScrollY: l.animatedScroll, scrollY: l.scroll, documentScrollHeight: l.dimensions.scrollHeight } : { scrollY: 0, documentScrollHeight: 0, animatedScrollY: 0 }
}

function onScreen(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth
}

function disposeTree(obj: THREE.Object3D) {
  obj.traverse((o) => {
    const m = o as THREE.Mesh
    if (m.geometry) m.geometry.dispose()
    if (m.material) for (const mat of Array.isArray(m.material) ? m.material : [m.material]) mat.dispose()
  })
}

function clearScene(scene: THREE.Object3D) {
  while (scene.children.length > 0) {
    const c = scene.children[0]
    scene.remove(c)
    disposeTree(c)
  }
}

function mountThreeRuntime(
  host: HTMLElement,
  {
    lenis,
    preload,
    setup,
    onReady,
    onDestroy,
    onTick,
    onResize,
    onScroll,
    onMouseMove,
    onRuntimeReady,
    maxPixelRatio = 2,
  }: ThreeScene & { lenis?: LenisLike; onRuntimeReady?: (rt: ThreeRuntime | null) => void; maxPixelRatio?: number },
) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(23, 1, 0.01, 200)
  camera.position.set(0, 0, 5)
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch (err) {
    console.error('mountThreeRuntime: WebGL renderer unavailable', err)
    onRuntimeReady?.(null)
    return () => {}
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio))
  host.appendChild(renderer.domElement)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  const timer = new THREE.Timer()
  if (typeof document !== 'undefined') timer.connect(document)
  const commonUniforms = {
    uTime: { value: 0 },
    uDelta: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uDPR: { value: 1 },
    uHomeHeroPullApartBand: { value: 0 },
    uHomeHeroPhoneSceneY: { value: 0 },
    uHomeHeroTabletSceneY: { value: 0 },
    uHomeHeroTabletSceneScale: { value: 1 },
  }
  const rt: ThreeRuntime = { scene, camera, renderer, timer, commonUniforms, controls, BufferGeometryUtils, THREE }
  let width = 1
  let height = 1
  let ready = false
  let destroyed = false
  let visible = false
  let io: IntersectionObserver | null = null
  let resizeTimer: ReturnType<typeof setTimeout> | null = null
  const resize = () => {
    width = host.clientWidth
    height = host.clientHeight
    const cam = rt.camera
    cam.aspect = width / Math.max(height, 1)
    cam.updateProjectionMatrix()
    renderer.setSize(width, height, true)
    if (ready && visible && typeof onResize === 'function') onResize(rt, { width, height, ...scrollInfo(lenis) })
  }
  const scheduleResize = () => {
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(resize, 200)
  }
  const emitScroll = () => {
    if (!ready || !visible || typeof onScroll !== 'function') return
    onScroll(rt, scrollInfo(lenis))
  }
  let offScroll: (() => void) | null = null
  const pointer = (e: PointerEvent | TouchEvent) => {
    if (!ready || !visible || typeof onMouseMove !== 'function') return
    const touches = (e as TouchEvent).touches
    const cx = touches && touches.length > 0 ? touches[0].clientX : (e as PointerEvent).clientX
    const cy = touches && touches.length > 0 ? touches[0].clientY : (e as PointerEvent).clientY
    onMouseMove(rt, { x: cx / window.innerWidth, y: 1 - cy / window.innerHeight })
  }
  const tick = () => {
    if (!ready || !visible) return
    timer.update()
    const delta = timer.getDelta()
    const elapsed = timer.getElapsed()
    const dpr = renderer.getPixelRatio()
    commonUniforms.uTime.value = elapsed
    commonUniforms.uDelta.value = delta
    commonUniforms.uResolution.value.set(width, height)
    commonUniforms.uDPR.value = dpr
    if (typeof onTick === 'function') onTick(rt, { delta, elapsed, width, height, ...scrollInfo(lenis) })
    controls.update()
    renderer.render(scene, rt.camera)
  }
  let ticking = false
  const setTicking = (on: boolean) => {
    if (on === ticking) return
    ticking = on
    if (on) gsap.ticker.add(tick)
    else gsap.ticker.remove(tick)
  }
  if (typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        const was = visible
        visible = entry.isIntersecting || onScreen(host)
        if (ready && !destroyed) {
          if (visible && !was) {
            scheduleResize()
            emitScroll()
            setTicking(true)
          } else if (!visible && was) setTicking(false)
        }
      },
      { root: null, threshold: 0 },
    )
    io.observe(host)
  } else visible = true
  window.addEventListener('resize', scheduleResize)
  scheduleResize()
  void (async () => {
    try {
      if (typeof preload === 'function') await preload(rt)
      if (destroyed) return
      if (typeof setup === 'function') await Promise.resolve(setup(rt))
      if (destroyed) return
      controls.object = rt.camera
      if (typeof onReady === 'function') await Promise.resolve(onReady(rt))
      if (destroyed) return
      ready = true
      visible = typeof IntersectionObserver === 'undefined' || onScreen(host)
      if (io) {
        io.unobserve(host)
        io.observe(host)
      }
      scheduleResize()
      emitScroll()
      if (lenis && typeof onScroll === 'function') {
        const f = () => emitScroll()
        lenis.on('scroll', f)
        offScroll = () => lenis.off('scroll', f)
      }
      if (typeof onMouseMove === 'function') {
        window.addEventListener('pointermove', pointer, { passive: true })
        window.addEventListener('touchmove', pointer, { passive: true })
      }
      setTicking(visible)
      if (typeof onRuntimeReady === 'function') onRuntimeReady(rt)
    } catch (err) {
      console.error('mountThreeRuntime: bootstrap failed', err)
    }
  })()
  return () => {
    destroyed = true
    ready = false
    gsap.ticker.remove(tick)
    if (io) {
      io.disconnect()
      io = null
    }
    if (resizeTimer !== null) {
      clearTimeout(resizeTimer)
      resizeTimer = null
    }
    window.removeEventListener('resize', scheduleResize)
    offScroll?.()
    if (typeof onMouseMove === 'function') {
      window.removeEventListener('pointermove', pointer)
      window.removeEventListener('touchmove', pointer)
    }
    if (typeof onDestroy === 'function') onDestroy(rt)
    clearScene(scene)
    timer.dispose()
    controls.dispose()
    renderer.dispose()
    if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
  }
}

export function ThreeCanvas({
  className = '',
  scene,
  fixedBackground,
  maxPixelRatio = 2,
  sceneProps,
}: {
  className?: string
  scene: ThreeScene
  fixedBackground?: boolean
  maxPixelRatio?: number
  sceneProps?: Record<string, unknown>
}) {
  const host = useRef<HTMLDivElement>(null)
  const latest = useRef(scene)
  const lenis = useLenis() as unknown as LenisLike | undefined
  const id = useId()
  const readyKey = `three-canvas-${id}`
  const register = useReadyStore((s) => s.register)
  const signal = useReadyStore((s) => s.signal)
  useEffect(() => {
    register(readyKey)
  }, [readyKey, register])
  useEffect(() => {
    latest.current = scene
  })
  useEffect(() => {
    const el = host.current
    if (!el) return
    const s = latest.current
    return mountThreeRuntime(el, {
      lenis,
      preload: typeof s.preload === 'function' ? (rt) => latest.current.preload?.(rt, sceneProps) : undefined,
      maxPixelRatio,
      setup: (rt) => latest.current.setup(rt, sceneProps),
      onReady: typeof s.onReady === 'function' ? (rt) => latest.current.onReady?.(rt, sceneProps) : undefined,
      onRuntimeReady: () => signal(readyKey),
      onDestroy: typeof s.onDestroy === 'function' ? (rt) => latest.current.onDestroy?.(rt) : undefined,
      onTick: typeof s.onTick === 'function' ? (rt, a) => latest.current.onTick?.(rt, a) : undefined,
      onResize: (rt, a) => latest.current.onResize?.(rt, a),
      onScroll: (rt, a) => latest.current.onScroll?.(rt, a),
      onMouseMove: typeof s.onMouseMove === 'function' ? (rt, a) => latest.current.onMouseMove?.(rt, a) : undefined,
    })
    // Scale's effect depends on the Lenis instance only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis])
  return (
    <div
      ref={host}
      className={[fixedBackground ? 'pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full' : '', className].filter(Boolean).join(' ')}
      style={fixedBackground ? { touchAction: 'auto' } : { touchAction: 'none' }}
    />
  )
}
