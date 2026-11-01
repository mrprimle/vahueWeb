'use client'

// Scale module 140914 (chunk 0hh8x7qynpa7m.js): the hero's three.js scene. Logic is verbatim; only asset paths come
// from content. Module state stays at module level, as on Scale: there is one hero per page.
import * as THREE from 'three'
import { gsap } from '@/components/site/lib/gsap'
import { mapRange } from '@/components/site/lib/math'
import type { ThreeRuntime, ThreeScene } from '@/components/site/shared/ThreeCanvas'
import { useHomeHeroStore as store } from './homeHeroStore'
import {
  DOTS_BACK_FRAGMENT,
  DOTS_BACK_VERTEX,
  DOTS_FRONT_FRAGMENT,
  DOTS_FRONT_VERTEX,
  ICONS_FRAGMENT,
  ICONS_VERTEX,
  LINE_FRAGMENT_BACK,
  LINE_FRAGMENT_FRONT,
  LINE_FRAGMENT_MID,
  LINE_FRAGMENT_THIRD,
  LINE_VERTEX,
  NUMBERS_FRAGMENT,
  NUMBERS_VERTEX,
  OUTLINE_FRAGMENT_FRONT,
  OUTLINE_FRAGMENT_MID,
  PLANE_VERTEX,
  SPHERE_FRAGMENT,
  SPHERE_VERTEX,
  VIDEO_FRAGMENT,
  VIDEO_VERTEX,
  WIRES_FRAGMENT,
  WIRES_VERTEX,
} from './homeHeroShaders'

declare global {
  interface Window {
    __homeHeroVideoTextureReady?: boolean
  }
}

type Uniform = { value: number }

// Scale module 637160 ("f" of 667997): rounded rectangle polyline.
function roundedFrame(options: { count?: number; radius?: number; width?: number; height?: number; offset?: number[] } = {}) {
  const { count, radius, width, height, offset } = { count: 256, radius: 0.075, width: 1, height: 1, offset: [0, 0, 0], ...options }
  const out: number[] = []
  const at = { x: -radius, y: -radius }
  let first = { x: 0, y: 0, z: 0 }
  for (let i = 0; i < count; i++) {
    if (i === (count / 4) * 1) at.x -= width - 2 * radius
    if (i === (count / 4) * 2) at.y -= height - 2 * radius
    if (i === (count / 4) * 3) at.x += width - 2 * radius
    const a = (i / count) * Math.PI * 2
    const x = Math.cos(a) * radius + at.x + 0.5 * width + offset[0]
    const y = Math.sin(a) * radius + at.y + 0.5 * height + offset[1]
    const z = 0 + offset[2]
    out.push(x, y, z)
    if (i === 0) first = { x, y, z }
  }
  out.push(first.x, first.y, first.z)
  return out
}

// Scale module 637160: cursor-arrow polyline used by the dotted "front" markers.
function cursorArrow(options: { cornerRadius?: number; cornerResolution?: number; width?: number; height?: number; offset?: number[] } = {}) {
  const { cornerRadius: t, cornerResolution: r, width: n, height: i, offset } = { cornerRadius: 0.1, cornerResolution: 7, width: 1, height: 1, offset: [0, 0, 0], ...options }
  const o: number[] = []
  const a = { x: 0, y: 0, z: 0 }
  let s = { ...a }
  a.y -= 0.175 * i
  a.x -= 0.175 * n
  a.x += 0.5 * n
  a.y -= 0.5 * i - t
  let l = { ...a }
  l.x -= t
  for (let k = 0; k < r; k++) {
    const g = (k / (r - 1)) * Math.PI * 0.75 - 0.75 * Math.PI
    a.x = Math.cos(g) * t + l.x + offset[0]
    a.y = Math.sin(g) * t + l.y + offset[1]
    o.push(a.x, a.y, a.z)
    if (k === 0) s = { ...a }
  }
  a.y += 0.5 * i - t
  o.push(a.x, a.y, a.z)
  a.y += 0.5 * i - t
  l = { ...a }
  l.x -= t
  for (let k = 0; k < r; k++) {
    const g = (k / (r - 1)) * Math.PI * 0.5
    a.x = Math.cos(g) * t + l.x + offset[0]
    a.y = Math.sin(g) * t + l.y + offset[1]
    o.push(a.x, a.y, a.z)
  }
  a.x -= 0.5 * n - t
  o.push(a.x, a.y, a.z)
  a.x -= 0.5 * n - t
  l = { ...a }
  l.y -= t
  for (let k = 0; k < r; k++) {
    const g = (k / (r - 1)) * Math.PI * 0.75 + 0.5 * Math.PI
    a.x = Math.cos(g) * t + l.x + offset[0]
    a.y = Math.sin(g) * t + l.y + offset[1]
    o.push(a.x, a.y, a.z)
  }
  o.push(s.x, s.y, s.z)
  return o
}

// Scale module 19490: camera parallax rig.
class Gaze {
  lookAt = new THREE.Vector3(0, 5, 5)
  camera: THREE.Camera
  innerGroup = new THREE.Group()
  group = new THREE.Group()
  windowSize: { width: number; height: number }
  strength = { v: 0.5 }
  _move = new THREE.Vector3()
  moveXY = new THREE.Vector2(4, 2)
  position = new THREE.Vector3(0, 0, 0)
  lerpSpeed = 0.06
  lerpSpeed2 = 1
  enabled = true
  constructor(camera: THREE.Camera, size: { width: number; height: number }) {
    this.camera = camera
    this.innerGroup.add(camera)
    this.windowSize = size
    this.group.add(this.innerGroup)
    this.group.position.set(0, 0, 5)
  }
  loop(p: { x: number; y: number }, cam: THREE.Camera) {
    if (this.enabled) {
      this._move.x = this.position.x + mapRange(p.x, 0, this.windowSize.width, -1, 1, true) * this.strength.v * this.moveXY.x
      this._move.y = this.position.y + mapRange(p.y, 0, this.windowSize.height, -1, 1, true) * this.strength.v * this.moveXY.y
      cam.position.lerp(this._move, this.lerpSpeed)
    }
    cam.lookAt(this.lookAt)
  }
}

let lastScroll: number | undefined
let lastProgress: number | undefined
let group: THREE.Group | null = null
let videoMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null = null
let videoEl: HTMLVideoElement | null = null
let sphere: THREE.Mesh | null = null
let timeline: gsap.core.Timeline | null = null
let t1: Uniform = { value: 0 }
let t2: Uniform = { value: 0 }
let t3: Uniform = { value: 0 }
let alphaU: Uniform = { value: 1 }
let colorMix: Uniform = { value: 0 }
type Textures = { perlin: THREE.Texture | null; numbers: THREE.Texture | null; video: THREE.Texture | null; videoFallback: THREE.Texture | null }
let textures: Textures = { perlin: null, numbers: null, video: null, videoFallback: null }
let outlineUniforms: Record<string, { value: unknown }> | null = null
let fallbackActive = false
const videoFallback: Uniform = { value: 0 }
let removeUnlock: () => void = () => {}
let introPlayed = false
let phone = false
let unsubscribePhone: () => void = () => {}
const introZoom: Uniform = { value: 1 }
let gaze: Gaze | null = null
let pointerTarget = { x: 0, y: 0 }
let hostSize: { w: number; h: number } | null = null

function setVideoReady(v: boolean) {
  window.__homeHeroVideoTextureReady = v
  if (v) window.dispatchEvent(new Event('homeHeroVideoTextureReady'))
}

function scrollSpan() {
  return phone ? 2.15 : 4.7
}

export function playHomeHeroIntro(options: { skipImageZoom?: boolean } = {}) {
  const { skipImageZoom = false } = options
  introPlayed = true
  lastScroll = undefined
  lastProgress = undefined
  if (timeline) {
    timeline.progress(0.01)
    store.getState().fireHomeHeroHeadingIntro(true)
  }
  if (!skipImageZoom) {
    gsap.killTweensOf(introZoom)
    introZoom.value = 1.2
    gsap.to(introZoom, { value: 1, duration: 1.8, delay: 0.3, ease: 'power3.out' })
  }
}

function useFallbackImage() {
  if (fallbackActive) return
  const image = textures.videoFallback
  if (!image) return
  fallbackActive = true
  removeUnlock()
  const current = textures.video as THREE.VideoTexture | null
  if (current?.isVideoTexture) current.dispose()
  textures.video = image
  try {
    if (videoEl) {
      videoEl.pause()
      videoEl.removeAttribute('src')
      videoEl.load()
      videoEl.remove()
    }
  } catch {}
  videoEl = null
  if (videoMesh?.material?.uniforms?.tMap) videoMesh.material.uniforms.tMap.value = image
  if (outlineUniforms?.tMap) outlineUniforms.tMap.value = image
  videoFallback.value = 1
  image.needsUpdate = true
  setVideoReady(true)
}

function isBand() {
  return window.matchMedia('(max-width: 1449px)').matches
}
function isTablet(w: number) {
  return w >= 768 && w <= 1449
}
function bandPx(h: number, f: number) {
  return Math.max(1, h * f - 32)
}
function applyBand(rt: ThreeRuntime) {
  const u = rt.commonUniforms.uHomeHeroPullApartBand
  if (u) u.value = +isBand()
}
function applySceneOffsets(rt: ThreeRuntime) {
  const { uHomeHeroPhoneSceneY: py, uHomeHeroTabletSceneY: ty, uHomeHeroTabletSceneScale: ts } = rt.commonUniforms
  if (!py && !ty && !ts) return
  const w = hostSize?.w ?? window.innerWidth
  const tablet = isTablet(w)
  if (py) py.value = 0.7 * +(w <= 767)
  if (ty) ty.value = 0.7 * +tablet
  if (ts) ts.value = tablet ? 1.2 : 1
}
function compact() {
  return (hostSize?.w ?? window.innerWidth) <= 1449
}
function fitSphere(w?: number, h?: number) {
  if (!sphere) return
  const a = Math.max(1, w ?? 1)
  const b = Math.max(1, h ?? 1)
  sphere.scale.setScalar(40 * Math.max(1, (a / b) * 0.55 + 1.05))
}
function fovRatio(a = 23, b = 58) {
  const r = Math.PI / 180
  return Math.tan(0.5 * a * r) / Math.tan(0.5 * b * r)
}
function gazeMetrics() {
  const w = Math.max(1, hostSize?.w ?? window.innerWidth)
  const h = Math.max(1, hostSize?.h ?? window.innerHeight)
  if (!compact()) return { gazeWidth: w, gazeHeight: h, cameraZoom: 1, parallaxSpan: w, gazeBandPx: h }
  if (w <= 767) {
    const band = bandPx(h, 0.45)
    const s = Math.min(w, band)
    return { gazeWidth: s, gazeHeight: s, cameraZoom: Math.max(s / w, fovRatio()), parallaxSpan: s, gazeBandPx: band }
  }
  if (isTablet(w)) {
    const band = bandPx(h, 0.5)
    const s = Math.min(w, band)
    return { gazeWidth: s, gazeHeight: s, cameraZoom: Math.max(s / w, fovRatio()), parallaxSpan: s, gazeBandPx: band }
  }
  const s = Math.min(w, h)
  return { gazeWidth: s, gazeHeight: s, cameraZoom: Math.max(s / w, fovRatio()), parallaxSpan: s, gazeBandPx: s }
}
function centerGaze(m: ReturnType<typeof gazeMetrics>) {
  if (!gaze) return
  const w = Math.max(1, hostSize?.w ?? window.innerWidth)
  const h = Math.max(1, hostSize?.h ?? window.innerHeight)
  if (w <= 767 || isTablet(w)) {
    const band = m.gazeBandPx ?? (w <= 767 ? bandPx(h, 0.45) : bandPx(h, 0.5))
    pointerTarget.x = 0.5 * m.parallaxSpan
    pointerTarget.y = 0.5 * band
  }
}
function applySectionVisibility(p: number, previous?: number) {
  const third = p >= 0.6 && p < (previous !== undefined && p < previous ? 0.997 : 0.85)
  const s = store.getState()
  s.setSectionVisible(0, p >= 0.1 && p < 0.3)
  s.setSectionVisible(1, p >= 0.3 && p < 0.6)
  s.setSectionVisible(2, third)
}
function applyHeading(played: boolean, p: number) {
  if (!played) return
  const show = p <= 0.035
  if (show !== store.getState().showHeading) store.getState().fireHomeHeroHeadingIntro(show)
}

export function createHomeHeroScene(assets: { video: string; perlin: string; numbers: string; fallback: string }): ThreeScene {
  return {
    async preload() {
      setVideoReady(false)
      const video = document.createElement('video')
      videoEl = video
      video.src = assets.video
      video.autoplay = true
      video.muted = true
      video.defaultMuted = true
      video.loop = true
      video.playsInline = true
      video.setAttribute('playsinline', '')
      video.setAttribute('muted', '')
      video.preload = 'auto'
      video.style.height = '0'
      video.style.visibility = 'hidden'
      document.body.appendChild(video)
      const play = () => video.play().catch(() => {})
      play()
      const unlock = () => {
        play()
        removeUnlock()
      }
      removeUnlock = () => {
        document.removeEventListener('touchstart', unlock)
        document.removeEventListener('click', unlock)
      }
      document.addEventListener('touchstart', unlock, { passive: true })
      document.addEventListener('click', unlock)
      textures.video = new THREE.VideoTexture(video)
      const check = () => {
        if (videoEl && videoEl.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA && videoEl.currentTime >= 0.08) {
          videoEl.removeEventListener('loadeddata', check)
          videoEl.removeEventListener('canplay', check)
          videoEl.removeEventListener('playing', check)
          videoEl.removeEventListener('timeupdate', check)
          setVideoReady(true)
        }
      }
      video.addEventListener('loadeddata', check)
      video.addEventListener('canplay', check)
      video.addEventListener('playing', check)
      video.addEventListener('timeupdate', check)
      check()
      const loader = new THREE.TextureLoader()
      const [perlin, numbers, fallback] = await Promise.all([loader.loadAsync(assets.perlin), loader.loadAsync(assets.numbers), loader.loadAsync(assets.fallback)])
      fallback.colorSpace = THREE.SRGBColorSpace
      textures = { ...textures, perlin, numbers, videoFallback: fallback }
      video.addEventListener('error', () => useFallbackImage(), { once: true })
      if (video.error) useFallbackImage()
    },

    setup(rt) {
      const parent = rt.renderer?.domElement?.parentElement
      hostSize = parent && parent.clientWidth > 0 && parent.clientHeight > 0 ? { w: parent.clientWidth, h: parent.clientHeight } : { w: Math.max(1, window.innerWidth), h: Math.max(1, window.innerHeight) }
      const { scene, commonUniforms: l, BufferGeometryUtils } = rt
      const { ShaderMaterial, BufferAttribute, BufferGeometry, PlaneGeometry, Line, Group, Mesh, LineSegments, SphereGeometry, BackSide } = THREE
      sphere = new Mesh(
        new SphereGeometry(),
        new ShaderMaterial({
          uniforms: { ...l, uColorMix: colorMix, uAlpha: alphaU, uTransition1: t1, uTransition2: t2, uTransition3: t3 },
          vertexShader: SPHERE_VERTEX,
          fragmentShader: SPHERE_FRAGMENT,
          side: BackSide,
          depthTest: false,
          depthWrite: false,
        }),
      )
      sphere.renderOrder = -1e3
      fitSphere(hostSize?.w ?? 1, hostSize?.h ?? 1)

      const frameAttr = new BufferAttribute(new Float32Array(roundedFrame()), 3)
      const frameGeo = new BufferGeometry()
      frameGeo.setAttribute('position', frameAttr)
      const lineU = { ...l, uContainerAspect: { value: 1.77 }, uColorMix: colorMix, uAlpha: alphaU, uTransition1: t1, uTransition2: t2, uTransition3: t3 }
      const lineMat = (fragmentShader: string) => new ShaderMaterial({ uniforms: lineU, vertexShader: LINE_VERTEX, fragmentShader, transparent: true })
      const frontMat = lineMat(LINE_FRAGMENT_FRONT)
      const backMat = lineMat(LINE_FRAGMENT_BACK)
      const thirdMat = lineMat(LINE_FRAGMENT_THIRD)
      const midMat = lineMat(LINE_FRAGMENT_MID)
      group = new Group()
      const d = new Line(frameGeo, frontMat)
      const h = new Line(frameGeo, midMat)
      const v = new Line(frameGeo, midMat)
      const b = new Line(frameGeo, backMat)
      const x = new Line(frameGeo, thirdMat)
      const P = new Line(frameGeo, thirdMat)
      d.position.z = 0.5
      h.position.z = d.position.z - 0.1
      v.position.z = h.position.z - 0.1
      b.position.z = -0.5
      x.position.z = b.position.z + 0.1
      P.position.z = x.position.z + 0.1

      videoMesh = new Mesh(
        new PlaneGeometry(1, 1),
        new ShaderMaterial({
          uniforms: { ...l, tMap: { value: textures.video }, uVideoFallback: videoFallback, uImageIntroZoom: introZoom, uContainerAspect: { value: 1.77 }, uColorMix: colorMix, uAlpha: alphaU, uTransition1: t1, uTransition2: t2, uTransition3: t3 },
          vertexShader: VIDEO_VERTEX,
          fragmentShader: VIDEO_FRAGMENT,
          transparent: true,
          depthTest: false,
        }),
      )

      const planeGeo = new PlaneGeometry(1, 1)
      const planeU = { ...l, tMap: { value: textures.video }, uVideoFallback: videoFallback, tNoise: { value: textures.perlin }, uContainerAspect: { value: 1.77 }, uColorMix: colorMix, uAlpha: alphaU, uTransition1: t1, uTransition2: t2, uTransition3: t3 }
      const outlineFront = new ShaderMaterial({ uniforms: planeU, vertexShader: PLANE_VERTEX, fragmentShader: OUTLINE_FRAGMENT_FRONT, transparent: true, depthTest: false })
      const outlineMid = new ShaderMaterial({ uniforms: planeU, vertexShader: PLANE_VERTEX, fragmentShader: OUTLINE_FRAGMENT_MID, transparent: true, depthTest: false })
      const g = new Mesh(planeGeo, outlineFront)
      const M = new Mesh(planeGeo, outlineMid)
      const R = new Mesh(planeGeo, outlineMid)
      outlineUniforms = planeU
      g.position.z = 0.5
      M.position.z = g.position.z - 0.1
      R.position.z = M.position.z - 0.1

      const points: number[] = []
      for (let i = 0; i < 30; i++) points.push((2 * Math.random() - 1) * 0.5, (2 * Math.random() - 1) * 0.5, 0)

      const arrowPos: number[] = []
      const arrowOff: number[] = []
      const arrow = cursorArrow()
      for (let e = 0; e < points.length / 3; e++) {
        const ox = points[3 * e]
        const oy = points[3 * e + 1]
        const oz = points[3 * e + 2]
        for (let k = 0; k < arrow.length / 3 - 1; k++) {
          arrowPos.push(arrow[3 * k], arrow[3 * k + 1], arrow[3 * k + 2], arrow[(k + 1) * 3], arrow[(k + 1) * 3 + 1], arrow[(k + 1) * 3 + 2])
          arrowOff.push(ox, oy, oz, ox, oy, oz)
        }
      }
      const arrowGeo = new BufferGeometry()
      arrowGeo.setAttribute('position', new BufferAttribute(new Float32Array(arrowPos), 3))
      arrowGeo.setAttribute('offset', new BufferAttribute(new Float32Array(arrowOff), 3))
      const dotsU = () => ({ ...l, uColorMix: colorMix, uAlpha: alphaU, uTransition1: t1, uTransition2: t2, uTransition3: t3 })
      const T = new LineSegments(arrowGeo, new ShaderMaterial({ uniforms: dotsU(), transparent: true, depthTest: false, vertexShader: DOTS_FRONT_VERTEX, fragmentShader: DOTS_FRONT_FRAGMENT }))
      T.position.z = 0.5
      const H = new LineSegments(arrowGeo, new ShaderMaterial({ uniforms: dotsU(), transparent: true, depthTest: false, vertexShader: DOTS_BACK_VERTEX, fragmentShader: DOTS_BACK_FRAGMENT }))
      H.position.z = -0.5

      const wirePos: number[] = []
      const wireOff: number[] = []
      for (let e = 0; e < points.length / 3; e++) {
        for (let n = 0; n < 32; n++) {
          const a = n / 32
          const c = (n + 1) / 32
          const ox = points[3 * e]
          const oy = points[3 * e + 1]
          wirePos.push(0, 0, -a, 0, 0, -c)
          wireOff.push(ox, oy, 0, ox, oy, 0)
        }
      }
      const wireGeo = new BufferGeometry()
      wireGeo.setAttribute('position', new BufferAttribute(new Float32Array(wirePos), 3))
      wireGeo.setAttribute('offset', new BufferAttribute(new Float32Array(wireOff), 3))
      const w = new LineSegments(wireGeo, new ShaderMaterial({ uniforms: dotsU(), transparent: true, depthTest: false, vertexShader: WIRES_VERTEX, fragmentShader: WIRES_FRAGMENT }))

      const numberPlanes: THREE.PlaneGeometry[] = []
      for (let e = 0; e < 4; e++) {
        for (let n = 0; n < 4; n++) {
          const p = new PlaneGeometry()
          const px = (e / 4 - 0.375) * 1.6815
          const py = (n / 4 - 0.375) * 1.0125
          p.scale(0.06, 0.015, 1)
          p.translate(px, py, 0)
          p.translate(0.075, 0.045, 0)
          numberPlanes.push(p)
        }
      }
      const A = new Mesh(
        BufferGeometryUtils.mergeGeometries(numberPlanes),
        new ShaderMaterial({ uniforms: { ...l, tMap: { value: textures.numbers }, uColorMix: colorMix, uAlpha: alphaU, uTransition1: t1, uTransition2: t2, uTransition3: t3 }, transparent: true, depthTest: false, vertexShader: NUMBERS_VERTEX, fragmentShader: NUMBERS_FRAGMENT }),
      )
      A.position.z = -0.5

      const iconPos: number[] = []
      const iconOff: number[] = []
      for (let e = 0; e < 4; e++) {
        for (let n = 0; n < 4; n++) {
          const ox = (e / 4 - 0.375) * 1.6815
          const oy = (n / 4 - 0.375) * 1
          const box = roundedFrame({ width: 0.05, height: 0.05, radius: 0.01 })
          for (let k = 0; k < box.length / 3 - 1; k++) {
            const seg = [box[3 * k], box[3 * k + 1], box[3 * k + 2], box[3 * k + 3], box[3 * k + 4], box[3 * k + 5]]
            for (const f of [0, 0.1, 0.2]) {
              iconPos.push(...seg)
              iconOff.push(ox, oy, f, ox, oy, f)
            }
          }
        }
      }
      const iconGeo = new BufferGeometry()
      iconGeo.setAttribute('position', new BufferAttribute(new Float32Array(iconPos), 3))
      iconGeo.setAttribute('offset', new BufferAttribute(new Float32Array(iconOff), 3))
      const Y = new LineSegments(iconGeo, new ShaderMaterial({ uniforms: { ...dotsU(), uContainerAspect: { value: 1 } }, transparent: true, depthTest: false, vertexShader: ICONS_VERTEX, fragmentShader: ICONS_FRAGMENT }))
      Y.position.z = -0.5

      videoMesh.renderOrder = 0
      d.renderOrder = 1
      h.renderOrder = 2
      v.renderOrder = 3
      b.renderOrder = 4
      x.renderOrder = 5
      P.renderOrder = 6
      w.renderOrder = 7
      T.renderOrder = 8
      H.renderOrder = 9
      g.renderOrder = 10
      M.renderOrder = 11
      R.renderOrder = 12
      A.renderOrder = 13
      Y.renderOrder = 14
      group.rotation.y = -(0.2 * Math.PI)
      group.add(videoMesh, d, h, v, b, x, P, w, T, H, g, M, R, A, Y)
      group.scale.z = 0
      scene.add(sphere)
      scene.add(group)

      const m = gazeMetrics()
      pointerTarget = { x: (hostSize?.w ?? window.innerWidth) * 0.5, y: (hostSize?.h ?? window.innerHeight) * 0.5 }
      gaze = new Gaze(rt.camera, { width: m.gazeWidth, height: m.gazeHeight })
      if (rt.camera?.isPerspectiveCamera) {
        rt.camera.zoom = m.cameraZoom
        rt.camera.updateProjectionMatrix()
      }
      centerGaze(m)
      scene.add(gaze.group)
      isBand()
      applyBand(rt)
      applySceneOffsets(rt)
      unsubscribePhone()
      const mq = window.matchMedia('(max-width: 768px)')
      const onPhone = () => {
        if (phone !== mq.matches) {
          phone = mq.matches
          lastScroll = undefined
        }
      }
      onPhone()
      mq.addEventListener('change', onPhone)
      unsubscribePhone = () => mq.removeEventListener('change', onPhone)
    },

    onReady() {
      if (!group) return
      const s = store.getState()
      s.resetSectionVisibility()
      if (s.showHeading) {
        s.fireHomeHeroHeadingIntro(false)
        requestAnimationFrame(() => {
          store.getState().fireHomeHeroHeadingIntro(true)
        })
      }
      isBand()
      const show = (i: number) => store.getState().setSectionVisible(i, true)
      const hide = (i: number) => store.getState().setSectionVisible(i, false)
      const tl = gsap.timeline({ paused: true })
      timeline = tl
      tl.fromTo(group.rotation, { y: -0.6 }, { y: -1, duration: 1, ease: 'linear' }, 0)
      tl.to(colorMix, { value: 1, duration: 0.1, ease: 'cubic.inOut' }, 0)
      tl.to(t1, { value: 1, duration: 0.2, ease: 'cubic.inOut' }, 0)
      tl.to(group.scale, { z: 1, duration: 0.1, ease: 'sine.inOut' }, 0)
      tl.call(hide, [0], 0.099)
      tl.call(show, [0], 0.1)
      tl.call(() => {
        gsap.to(t2, { value: 0, duration: 1, ease: 'cubic.inOut' })
      }, undefined, 0.05)
      tl.call(show, [0], 0.299)
      tl.call(hide, [0], 0.3)
      tl.call(hide, [1], 0.299)
      tl.call(show, [1], 0.3)
      tl.call(() => {
        gsap.to(t2, { value: 0, duration: 1, ease: 'cubic.inOut' })
        gsap.to(t3, { value: 0, duration: 1, ease: 'cubic.inOut' })
      }, undefined, 0.299)
      tl.call(() => {
        gsap.to(t2, { value: 1, duration: 1, ease: 'cubic.inOut' })
        gsap.to(t3, { value: 0, duration: 1, ease: 'cubic.inOut' })
      }, undefined, 0.3)
      tl.call(show, [1], 0.599)
      tl.call(hide, [1], 0.6)
      tl.call(hide, [2], 0.599)
      tl.call(show, [2], 0.6)
      tl.call(() => {
        gsap.to(t2, { value: 1, duration: 1, ease: 'cubic.inOut' })
        gsap.to(t3, { value: 0, duration: 1, ease: 'cubic.inOut' })
      }, undefined, 0.599)
      tl.call(() => {
        gsap.to(t3, { value: 1, duration: 1, ease: 'cubic.inOut' })
      }, undefined, 0.6)
      tl.call(show, [2], 0.799)
      tl.call(hide, [2], 0.85)
      tl.fromTo(alphaU, { value: 1 }, { value: 0, duration: 0.2, ease: 'cubic.inOut' }, 0.8)
      tl.set({}, {}, 1)
      tl.progress(0.01)
      applySectionVisibility(0.01, undefined)
      playHomeHeroIntro({ skipImageZoom: true })
    },

    onMouseMove(_rt, { x, y }) {
      const w = Math.max(1, hostSize?.w ?? window.innerWidth)
      const h = Math.max(1, hostSize?.h ?? window.innerHeight)
      const px = x * w
      const py = (1 - y) * h
      if (compact()) {
        const { parallaxSpan, gazeBandPx } = gazeMetrics()
        const bandH = gazeBandPx ?? parallaxSpan
        const full = Math.max(1, hostSize?.w ?? window.innerWidth)
        pointerTarget.x = Math.min(parallaxSpan, Math.max(0, px - (full - parallaxSpan) * 0.5))
        pointerTarget.y = Math.min(bandH, Math.max(0, py))
      } else {
        pointerTarget.x = px
        pointerTarget.y = py
      }
    },

    onDestroy(rt) {
      const parent = rt?.renderer?.domElement?.parentElement
      if (parent) gsap.killTweensOf(parent)
      if (timeline) {
        timeline.kill()
        timeline = null
      }
      gsap.killTweensOf(introZoom)
      introZoom.value = 1
      removeUnlock()
      setVideoReady(false)
      if (videoEl?.parentNode) videoEl.remove()
      videoEl = null
      textures.perlin?.dispose()
      textures.video?.dispose()
      if (textures.videoFallback && textures.videoFallback !== textures.video) textures.videoFallback.dispose()
      textures = { perlin: null, numbers: null, video: null, videoFallback: null }
      outlineUniforms = null
      fallbackActive = false
      videoFallback.value = 0
      group = null
      videoMesh = null
      sphere = null
      t1 = { value: 0 }
      t2 = { value: 0 }
      t3 = { value: 0 }
      alphaU = { value: 1 }
      colorMix = { value: 0 }
      lastScroll = undefined
      lastProgress = undefined
      gaze = null
      introPlayed = false
      unsubscribePhone()
      unsubscribePhone = () => {}
      phone = false
      store.getState().fireHomeHeroHeadingIntro(false)
      store.getState().resetSectionVisibility()
      hostSize = null
    },

    onTick(rt, { animatedScrollY }) {
      applyBand(rt)
      applySceneOffsets(rt)
      if (gaze) {
        gaze.loop(pointerTarget, rt.camera)
        gaze.strength.v = mapRange(t1.value, 0.2, 1, 0, 0.15, true)
      }
      if (animatedScrollY === lastScroll) return
      lastScroll = animatedScrollY
      const p = Math.min(1, Math.max(0, animatedScrollY / Math.max(1, window.innerHeight * scrollSpan())))
      const previous = lastProgress
      timeline?.progress(p)
      applySectionVisibility(p, previous)
      lastProgress = p
      applyHeading(introPlayed, p)
    },

    onScroll() {},

    onResize(rt, { width, height, animatedScrollY }) {
      hostSize = { w: Math.max(1, width), h: Math.max(1, height) }
      isBand()
      applyBand(rt)
      applySceneOffsets(rt)
      const m = gazeMetrics()
      if (gaze) {
        gaze.windowSize.width = m.gazeWidth
        gaze.windowSize.height = m.gazeHeight
      }
      if (rt.camera?.isPerspectiveCamera) {
        rt.camera.zoom = m.cameraZoom
        rt.camera.updateProjectionMatrix()
      }
      centerGaze(m)
      fitSphere(width, height)
      const previous = lastProgress
      const scroll = typeof animatedScrollY === 'number' ? animatedScrollY : 0
      const p = Math.min(1, Math.max(0, (scroll ?? 0) / Math.max(1, window.innerHeight * scrollSpan())))
      timeline?.progress(p)
      applySectionVisibility(p, previous)
      lastScroll = scroll
      lastProgress = p
      applyHeading(introPlayed, p)
    },
  }
}

export const HOME_HERO_VIDEO_MARKER = 'packed.mp4'
