// Scale module 322473, `H`: the pull-apart WebGL scene. Scrubbed by absolute scroll over 4.5 viewports.
// Curves come from module 972890 (public/enterprise/pull-apart-curves.json). Helpers: 637160, 667997, 19490.
import * as THREE from 'three'
import { create } from 'zustand'
import { gsap } from '@/components/site/lib/gsap'
import { mapRange } from '@/components/site/lib/math'
import type { ThreeRuntime, ThreeScene } from '@/components/site/shared/ThreeCanvas'
import {
  curveDotFrag,
  curveDotVert,
  curveFrag,
  curveParticleFrag,
  curveParticleVert,
  curveSquareFrag,
  curveSquareVert,
  curveVert,
  miniLineFrag,
  miniLineVert,
  miniParticleFrag,
  miniParticleVert,
  videoFrag,
  videoVert,
} from './pullApartShaders'

export const usePullApartStore = create<{ sectionVisibleByIndex: Record<number, boolean>; setSectionVisible: (i: number, v: boolean) => void }>((set) => ({
  sectionVisibleByIndex: {},
  setSectionVisible: (i, v) => set((s) => (s.sectionVisibleByIndex[i] === v ? s : { sectionVisibleByIndex: { ...s.sectionVisibleByIndex, [i]: v } })),
}))

/** Module 667997 (exported first in that chunk): rounded rectangle outline as a closed polyline. */
function roundedSquareLine(o: { count?: number; radius?: number; width?: number; height?: number; offset?: number[] } = {}) {
  const { count, radius, width, height, offset } = { count: 256, radius: 0.075, width: 1, height: 1, offset: [0, 0, 0], ...o }
  const a: number[] = []
  const s = { x: -radius, y: -radius }
  let first = { x: 0, y: 0, z: 0 }
  for (let i = 0; i < count; i++) {
    if (i === (count / 4) * 1) s.x -= width - 2 * radius
    if (i === (count / 4) * 2) s.y -= height - 2 * radius
    if (i === (count / 4) * 3) s.x += width - 2 * radius
    const u = (i / count) * Math.PI * 2
    const x = Math.cos(u) * radius + s.x + 0.5 * width + offset[0]
    const y = Math.sin(u) * radius + s.y + 0.5 * height + offset[1]
    const z = 0 + offset[2]
    a.push(x, y, z)
    if (i === 0) first = { x, y, z }
  }
  a.push(first.x, first.y, first.z)
  return a
}

/** Module 19490: camera parallax rig. */
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

export function createPullApartScene(assets: { video: string; logoTexture: string; curves: string }): ThreeScene {
  let group: THREE.Group | null = null
  let videoEl: HTMLVideoElement | null = null
  let alpha = { value: 1 }
  let progress = { value: 0 }
  let timeline: gsap.core.Timeline | null = null
  let curves: { position: number[] }[] | null = null
  let textures: { miniParticlePosition: THREE.DataTexture | null; curves: THREE.DataTexture | null; video: THREE.VideoTexture | null; logo: THREE.Texture | null } = {
    miniParticlePosition: null,
    curves: null,
    video: null,
    logo: null,
  }
  let gaze: Gaze | null = null
  let pointer = { x: 0, y: 0 }
  return {
    async preload(rt: ThreeRuntime) {
      const res = await fetch(assets.curves)
      curves = ((await res.json()) as { curves: { position: number[] }[] }).curves
      const v = document.createElement('video')
      videoEl = v
      v.src = assets.video
      v.autoplay = true
      v.muted = true
      v.defaultMuted = true
      v.loop = true
      v.playsInline = true
      v.setAttribute('playsinline', '')
      v.setAttribute('muted', '')
      v.preload = 'auto'
      v.style.visibility = 'hidden'
      v.style.height = '0'
      const play = () => v.play().catch(() => {})
      play()
      const unlock = () => {
        play()
        document.removeEventListener('touchstart', unlock)
        document.removeEventListener('click', unlock)
      }
      document.addEventListener('touchstart', unlock, { passive: true })
      document.body.appendChild(v)
      textures.video = new rt.THREE.VideoTexture(v)
      const logo = await new rt.THREE.TextureLoader().loadAsync(assets.logoTexture)
      textures = { ...textures, logo }
    },
    setup(rt: ThreeRuntime) {
      const { scene, THREE: T, commonUniforms: common, controls } = rt
      const { BufferGeometry, PlaneGeometry, Mesh, LineSegments, ShaderMaterial, BufferAttribute, Group, RGBAFormat, FloatType, UVMapping, ClampToEdgeWrapping, NearestFilter, LinearFilter, DataTexture, Line, AdditiveBlending } = T
      controls.enabled = false
      const data = curves as { position: number[] }[]
      group = new Group()
      const plane = new Mesh(
        new PlaneGeometry(1, 1),
        new ShaderMaterial({
          uniforms: { ...common, tMap: { value: textures.video }, tLogo: { value: textures.logo }, uAlpha: alpha, uProgress: progress },
          vertexShader: videoVert,
          fragmentShader: videoFrag,
          transparent: true,
          depthTest: false,
          blending: AdditiveBlending,
        }),
      )
      // Small particles and the lines that hop between them.
      const points: number[] = []
      const miniPos: number[] = []
      const miniOffset: number[] = []
      const square = roundedSquareLine({ count: 24, radius: 0.1 })
      for (let e = 0; e < 32; e++) {
        const px = (2 * Math.random() - 1) * 0.2655
        const py = (2 * Math.random() - 1) * 0.15
        points.push(px, py, 0, 1)
        for (let r = 0; r < square.length / 3 - 1; r++) {
          miniPos.push(square[3 * r], square[3 * r + 1], square[3 * r + 2], square[3 * (r + 1)], square[3 * (r + 1) + 1], square[3 * (r + 1) + 2])
          miniOffset.push(px, py, 0, px, py, 0)
        }
      }
      const miniGeo = new BufferGeometry()
      miniGeo.setAttribute('position', new BufferAttribute(new Float32Array(miniPos), 3))
      miniGeo.setAttribute('offset', new BufferAttribute(new Float32Array(miniOffset), 3))
      miniGeo.setAttribute('id', new BufferAttribute(new Float32Array([]), 1))
      // Scale builds this view with `new Float32Array(list, 3)` on a plain array, which copies and ignores the 3.
      textures.miniParticlePosition = new DataTexture(new Float32Array(points), 32, 1, RGBAFormat, FloatType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, NearestFilter, NearestFilter)
      textures.miniParticlePosition.needsUpdate = true
      const miniParticles = new LineSegments(miniGeo, new ShaderMaterial({ uniforms: { ...common, uProgress: progress }, transparent: true, vertexShader: miniParticleVert, fragmentShader: miniParticleFrag }))
      const linePos: number[] = []
      const lineU: number[] = []
      for (let e = 0; e < 224; e++) {
        linePos.push(0, 0, 0)
        lineU.push(e / 223)
      }
      const lineGeo = new BufferGeometry()
      lineGeo.setAttribute('position', new BufferAttribute(new Float32Array(linePos), 3))
      lineGeo.setAttribute('curveu', new BufferAttribute(new Float32Array(lineU), 1))
      const miniLine = new Line(lineGeo, new ShaderMaterial({ uniforms: { ...common, tPoints: { value: textures.miniParticlePosition }, uProgress: progress }, transparent: true, vertexShader: miniLineVert, fragmentShader: miniLineFrag }))
      // The curves that pull out of the plane.
      const curvePos: number[] = []
      const curveU: number[] = []
      const curveId: number[] = []
      data.forEach((c, t) => {
        const r = c.position
        const n = (r.length - 3) / 3
        for (let e = 0; e < n; e++) {
          curvePos.push(r[3 * e], r[3 * e + 1], r[3 * e + 2], r[3 * e + 3], r[3 * e + 4], r[3 * e + 5])
          curveU.push(e / n, (e + 1) / n)
          curveId.push(t, t)
        }
      })
      const curveGeo = new BufferGeometry()
      curveGeo.setAttribute('position', new BufferAttribute(new Float32Array(curvePos), 3))
      curveGeo.setAttribute('curveu', new BufferAttribute(new Float32Array(curveU), 1))
      curveGeo.setAttribute('id', new BufferAttribute(new Float32Array(curveId), 1))
      const curveLines = new LineSegments(curveGeo, new ShaderMaterial({ uniforms: { ...common, uProgress: progress }, transparent: true, vertexShader: curveVert, fragmentShader: curveFrag }))
      // Markers at each curve's far end.
      const ends: number[] = []
      data.forEach(({ position: t }) => ends.push(t[t.length - 3], t[t.length - 2], t[t.length - 1]))
      const sqPos: number[] = []
      const sqOffset: number[] = []
      const sqId: number[] = []
      const marker = roundedSquareLine({ width: 1.77 })
      for (let e = 0; e < ends.length / 3; e++) {
        const [x, y, z] = [ends[3 * e], ends[3 * e + 1], ends[3 * e + 2]]
        for (let l = 0; l < marker.length / 3 - 1; l++) {
          sqPos.push(marker[3 * l], marker[3 * l + 1], marker[3 * l + 2], marker[3 * (l + 1)], marker[3 * (l + 1) + 1], marker[3 * (l + 1) + 2])
          sqOffset.push(x, y, z, x, y, z)
          sqId.push(e, e)
        }
      }
      const sqGeo = new BufferGeometry()
      sqGeo.setAttribute('position', new BufferAttribute(new Float32Array(sqPos), 3))
      sqGeo.setAttribute('offset', new BufferAttribute(new Float32Array(sqOffset), 3))
      sqGeo.setAttribute('id', new BufferAttribute(new Float32Array(sqId), 1))
      const squares = new LineSegments(sqGeo, new ShaderMaterial({ uniforms: { ...common, uAlpha: alpha, uProgress: progress }, vertexShader: curveSquareVert, fragmentShader: curveSquareFrag }))
      // Curve data as a texture for the travelling particles.
      const curveLen = data[0].position.length / 3
      const curveCount = data.length
      const tex = new Float32Array(curveLen * curveCount * 4)
      data.forEach(({ position: r }, t) => {
        for (let e = 0; e < r.length; e++) {
          const base = t * (r.length / 3) * 4
          tex[base + 4 * e] = r[3 * e]
          tex[base + 4 * e + 1] = r[3 * e + 1]
          tex[base + 4 * e + 2] = r[3 * e + 2]
          tex[base + 4 * e + 3] = 1
        }
      })
      textures.curves = new DataTexture(tex, curveLen, curveCount, RGBAFormat, FloatType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, LinearFilter)
      textures.curves.needsUpdate = true
      const travelPos: number[] = []
      const travelId: number[] = []
      for (let e = 0; e < ends.length / 3; e++) {
        for (let t = 0; t < square.length / 3 - 1; t++) {
          travelPos.push(square[3 * t], square[3 * t + 1], square[3 * t + 2], square[3 * (t + 1)], square[3 * (t + 1) + 1], square[3 * (t + 1) + 2])
          travelId.push(e, e)
        }
      }
      const travelGeo = new BufferGeometry()
      travelGeo.setAttribute('position', new BufferAttribute(new Float32Array(travelPos), 3))
      travelGeo.setAttribute('offset', new BufferAttribute(new Float32Array([]), 3))
      travelGeo.setAttribute('id', new BufferAttribute(new Float32Array(travelId), 1))
      const travel = new LineSegments(travelGeo, new ShaderMaterial({ uniforms: { ...common, tCurves: { value: textures.curves }, uProgress: progress }, vertexShader: curveParticleVert, fragmentShader: curveParticleFrag }))
      // Round dots at each curve's far end.
      const dotPos: number[] = []
      const dotOffset: number[] = []
      const dotId: number[] = []
      for (let e = 0; e < ends.length / 3; e++) {
        const [t, r, a] = [ends[3 * e], ends[3 * e + 1], ends[3 * e + 2]]
        for (let l = 0; l < square.length / 3 - 1; l++) {
          dotPos.push(square[3 * l], square[3 * l + 1], square[3 * l + 2], square[3 * (l + 1)], square[3 * (l + 1) + 1], square[3 * (l + 1) + 2])
          dotOffset.push(t, r, a, t, r, a)
          dotId.push(e, e)
        }
      }
      const dotGeo = new BufferGeometry()
      dotGeo.setAttribute('position', new BufferAttribute(new Float32Array(dotPos), 3))
      dotGeo.setAttribute('offset', new BufferAttribute(new Float32Array(dotOffset), 3))
      dotGeo.setAttribute('id', new BufferAttribute(new Float32Array(dotId), 1))
      const dots = new LineSegments(dotGeo, new ShaderMaterial({ uniforms: { ...common, uProgress: progress }, vertexShader: curveDotVert, fragmentShader: curveDotFrag }))
      group.add(plane, curveLines, squares, miniParticles, miniLine, travel, dots)
      scene.add(group)
      const visible = usePullApartStore.getState().setSectionVisible
      const g = group
      timeline = gsap.timeline({ paused: true })
      timeline.fromTo(
        g.rotation,
        { y: 0, x: 0 },
        {
          y: 0.6,
          x: 0.5,
          duration: 0.7,
          ease: 'cubic.inOut',
          onUpdate: () => {
            const e = timeline ? timeline.progress() : 0
            visible(0, e >= 0.15 && e <= 0.35)
            visible(1, e >= 0.65 && e <= 1)
          },
        },
        0.2,
      )
      timeline.fromTo(g.scale, { x: 1.75, y: 1.75, z: 1.75 }, { x: 0.275, y: 0.275, z: 0.275, duration: 0.9, ease: 'cubic.inOut' }, 0)
      timeline.to(progress, { value: 1, duration: 0.8, ease: 'linear' }, 0.2)
      timeline.fromTo(g.position, { y: 0 }, { y: 0.165, duration: 0.3, ease: 'cubic.inOut' }, 0.7)
      timeline.set({}, {}, 1)
      timeline.progress(0.01)
      pointer = { x: 0.5 * window.innerWidth, y: 0.5 * window.innerHeight }
      gaze = new Gaze(rt.camera, { width: window.innerWidth, height: window.innerHeight })
      gaze.strength.v = 0.25
      scene.add(gaze.group)
    },
    onMouseMove(_rt, { x, y }) {
      pointer.x = x * window.innerWidth
      pointer.y = (1 - y) * window.innerHeight
    },
    onDestroy() {
      timeline?.kill()
      timeline = null
      textures.miniParticlePosition?.dispose()
      textures.curves?.dispose()
      textures.video?.dispose()
      textures.logo?.dispose()
      textures = { miniParticlePosition: null, curves: null, video: null, logo: null }
      videoEl?.remove()
      videoEl = null
      group = null
      alpha = { value: 1 }
      progress = { value: 0 }
      curves = null
    },
    onTick(rt, { animatedScrollY }) {
      if (!timeline) return
      timeline.progress(Math.min(1, Math.max(0, animatedScrollY / Math.max(1, 4.5 * window.innerHeight))))
      gaze?.loop(pointer, rt.camera)
    },
    onResize() {
      if (gaze) {
        gaze.windowSize.width = window.innerWidth
        gaze.windowSize.height = window.innerHeight
      }
    },
  }
}
