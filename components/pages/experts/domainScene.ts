// Scale module 558779 (chunk 3z_q0c19dxjc-.js): the logo graph behind the "best minds" tabs. Module state as on Scale.
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import * as THREE from 'three'
import { gsap } from '@/components/site/lib/gsap'
import type { ThreeRuntime, ThreeScene } from '@/components/site/shared/ThreeCanvas'
import { LINE_FRAGMENT, LINE_VERTEX, TILE_FRAGMENT, TILE_VERTEX } from './shaders'

type Logo = { src: string }
type Item = { innerGroup: THREE.Group; curT: number; curScale: number }

let root: THREE.Group | null = null
let graph: THREE.Group | null = null
let items: Item[] | null = null
let worldPos: THREE.Vector3 | null = null
let invQuat: THREE.Quaternion | null = null
let box: THREE.Box3 | null = null
let lineMat: THREE.ShaderMaterial | null = null
let textures: { tex: THREE.Texture; aspect: number }[] = []
let targetX = 8e-5
let targetY = 35e-5
let velX = 0
let velY = 0
let dragging = false
let lastX = 0
let lastY = 0
let dx = 0
let dy = 0
let rotY = 0
let rotYTarget = 0
let introduced = false
let removeListeners: (() => void) | null = null

function placeholder(size: number) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(c)
  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function logoTexture(img: HTMLImageElement) {
  const w = img.naturalWidth || img.width
  const h = img.naturalHeight || img.height
  const aspect = w / Math.max(h, 1)
  const fit = Math.min(196 / w, 196 / h)
  const k = aspect > 1.8 ? Math.min(0.35 * aspect * 0.7, 0.94) : 0.7
  const dw = w * fit * k
  const dh = h * fit * k
  const mask = document.createElement('canvas')
  mask.width = 256
  mask.height = 256
  const m = mask.getContext('2d')
  if (!m) return placeholder(256)
  m.drawImage(img, (256 - dw) / 2, (256 - dh) / 2, dw, dh)
  m.globalCompositeOperation = 'source-in'
  m.fillStyle = '#000000'
  m.fillRect(0, 0, 256, 256)
  const out = document.createElement('canvas')
  out.width = 256
  out.height = 256
  const o = out.getContext('2d')
  if (!o) return placeholder(256)
  o.fillStyle = '#ffffff'
  o.fillRect(0, 0, 256, 256)
  o.drawImage(mask, 0, 0)
  const t = new THREE.CanvasTexture(out)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function makeLineMaterial() {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      linewidth: { value: 1 },
      resolution: { value: new THREE.Vector2(1, 1) },
      dashScale: { value: 1 },
      uColor: { value: new THREE.Color(9408399).convertLinearToSRGB() },
      uScrollBandColor: { value: new THREE.Color(0).convertLinearToSRGB() },
      uOpacity: { value: 1 },
      uTime: { value: 0 },
      uScrollSpeed: { value: 3.2 },
      uRepeatLen: { value: 28 },
      uBandLen: { value: 3.2 },
      uBandFeather: { value: 0.8 },
    },
    vertexShader: LINE_VERTEX,
    fragmentShader: LINE_FRAGMENT,
    transparent: true,
    depthWrite: false,
    clipping: false,
  })
  Object.defineProperty(mat, 'linewidth', {
    get: () => mat.uniforms.linewidth.value,
    set(v: number) {
      mat.uniforms.linewidth.value = v
    },
  })
  Object.defineProperty(mat, 'resolution', {
    get: () => mat.uniforms.resolution.value,
    set(v: THREE.Vector2) {
      mat.uniforms.resolution.value.copy(v)
    },
  })
  Object.defineProperty(mat, 'worldUnits', { get: () => false, set() {} })
  return mat
}

export const domainScene: ThreeScene = {
  async preload(_rt: ThreeRuntime, props?: { logos?: Logo[] }) {
    textures = []
    const list = (props?.logos ?? []).filter((l) => l?.src)
    if (list.length === 0) {
      textures.push({ tex: placeholder(128), aspect: 1 })
      return
    }
    try {
      const settled = await Promise.allSettled(
        list.map(
          (l) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image()
              img.crossOrigin = 'anonymous'
              img.onload = () => resolve(img)
              img.onerror = reject
              img.src = l.src
            }),
        ),
      )
      textures = settled
        .filter((s): s is PromiseFulfilledResult<HTMLImageElement> => s.status === 'fulfilled')
        .map((s) => {
          const img = s.value
          return { tex: logoTexture(img), aspect: (img.naturalWidth || img.width) / Math.max(img.naturalHeight || img.height, 1) }
        })
      if (textures.length === 0) textures = [{ tex: placeholder(128), aspect: 1 }]
    } catch {
      textures = [{ tex: placeholder(128), aspect: 1 }]
    }
  },
  setup(rt) {
    const { scene, camera, renderer, controls } = rt
    camera.position.z = 8
    ;(camera as THREE.PerspectiveCamera & { basePosition?: THREE.Vector3 }).basePosition = camera.position.clone()
    controls.enabled = false
    worldPos = new THREE.Vector3()
    invQuat = new THREE.Quaternion()
    root = new THREE.Group()
    scene.add(root)
    const group = new THREE.Group()
    graph = group
    group.scale.setScalar(0.36)
    root.add(group)
    const total = Math.max(1, textures.length)
    const onSphere = Math.min(total, 18)
    const inside = Math.max(0, total - onSphere)
    let seed = 12
    const random = () => ((seed = (16807 * seed) % 0x7fffffff) - 1) / 0x7ffffffe
    const points: THREE.Vector3[] = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < onSphere; i++) {
      const t = (i + 0.5) / onSphere
      const n = 2 * t - 1
      const s = 1 - 2 * t
      const o = Math.sqrt(Math.max(0, 1 - s * s))
      points.push(new THREE.Vector3(Math.cos(golden * i) * o * 3, Math.sin(golden * i) * o * 3, 3 * n))
    }
    if (inside > 0) {
      const extra: THREE.Vector3[] = []
      while (extra.length < inside) {
        const x = (2 * random() - 1) * 3
        const y = (2 * random() - 1) * 3
        const z = (2 * random() - 1) * 3
        const d = Math.sqrt(x * x + y * y + z * z)
        if (d < 2.64 && d > 0.36) extra.push(new THREE.Vector3(x, y, z))
      }
      points.push(...extra)
    }
    items = []
    points.forEach((p, i) => {
      const material = new THREE.ShaderMaterial({
        vertexShader: TILE_VERTEX,
        fragmentShader: TILE_FRAGMENT,
        transparent: true,
        side: THREE.FrontSide,
        uniforms: {
          uTexture: { value: textures[i].tex },
          alphaTest: { value: 0.02 },
          uTint: { value: new THREE.Color(0xffffff) },
          uMeshSize: { value: new THREE.Vector2(1, 1) },
          uSelected: { value: 1 },
        },
      })
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.48), material)
      mesh.renderOrder = 1
      const inner = new THREE.Group()
      inner.position.copy(p)
      inner.add(mesh)
      group.add(inner)
      const t = Math.max(0, Math.min(1, (p.z + 3) / 6))
      items!.push({ innerGroup: inner, curT: t, curScale: 0.9 + 1.5 * t })
    })
    const positions: number[] = []
    const seen = new Set<string>()
    points.forEach((p, i) => {
      points
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((e) => e.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
        .forEach(({ j }) => {
          const key = `${Math.min(i, j)}-${Math.max(i, j)}`
          if (!seen.has(key)) {
            seen.add(key)
            positions.push(p.x, p.y, p.z, points[j].x, points[j].y, points[j].z)
          }
        })
    })
    const geometry = new LineSegmentsGeometry()
    geometry.setPositions(positions)
    lineMat = makeLineMaterial()
    const lines = new LineSegments2(geometry, lineMat as unknown as ConstructorParameters<typeof LineSegments2>[1])
    lines.computeLineDistances()
    lines.renderOrder = 0
    group.add(lines)
    group.rotation.x = 0.3
    group.rotation.y = 0.5
    root.scale.setScalar(0)
    box = new THREE.Box3().setFromObject(group)
    const el = renderer.domElement
    const at = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const down = (e: PointerEvent) => {
      if (e.button !== undefined && e.button !== 0) return
      dragging = true
      const { x, y } = at(e)
      lastX = x
      lastY = y
      dx = 0
      dy = 0
      el.style.cursor = 'grabbing'
      el.setPointerCapture?.(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      const { x, y } = at(e)
      dx = x - lastX
      dy = y - lastY
      group.rotation.y += 0.004 * dx
      group.rotation.x += 0.004 * dy
      lastX = x
      lastY = y
    }
    const up = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      el.style.cursor = ''
      el.releasePointerCapture?.(e.pointerId)
      velX = 0.004 * dy
      velY = 0.004 * dx
      if (Math.sqrt(velX * velX + velY * velY) > 3e-4) {
        targetX = 0.02 * velX
        targetY = 0.02 * velY
      }
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    removeListeners = () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      el.style.cursor = ''
    }
  },
  onReady() {},
  onMouseMove(_rt, { x, y }) {
    if (!root || !graph || dragging) return
    targetY = 35e-5 + (x - 0.5) * 24e-5
    targetX = 8e-5 - (y - 0.5) * 24e-5
  },
  onTick(rt, { elapsed = 0 }) {
    if (!root || !graph || !items || !invQuat || !worldPos) return
    const { camera } = rt
    if (lineMat?.uniforms?.uTime) lineMat.uniforms.uTime.value = elapsed
    rotY = gsap.utils.interpolate(rotY, rotYTarget, 0.06)
    root.rotation.y = rotY
    if (!dragging) {
      velX += (targetX - velX) * 0.03
      velY += (targetY - velY) * 0.03
      graph.rotation.x += velX
      graph.rotation.y += velY
    }
    root.updateMatrixWorld()
    graph.updateMatrixWorld()
    graph.getWorldQuaternion(invQuat)
    invQuat.invert()
    for (const item of items) {
      const { innerGroup } = item
      innerGroup.quaternion.multiplyQuaternions(invQuat, camera.quaternion)
      innerGroup.getWorldPosition(worldPos)
      const t = Math.max(0, Math.min(1, (worldPos.z + 3) / 6))
      item.curT += (t - item.curT) * 0.04
      item.curScale += (0.9 + 1.5 * t - item.curScale) * 0.04
      innerGroup.scale.setScalar(item.curScale)
    }
  },
  onScroll(_rt, { scrollY, documentScrollHeight }) {
    rotYTarget = -(-0.82 * (scrollY / Math.max(1, documentScrollHeight - window.innerHeight) - 0.5))
  },
  onResize(rt) {
    if (!box || !graph || !root) return
    const camera = rt.camera
    const size = box.getSize(new THREE.Vector3())
    const viewH = 2 * camera.position.distanceTo(graph.position) * Math.tan((camera.fov * Math.PI) / 180 / 2)
    const viewW = viewH * camera.aspect
    const fitH = size.y > 0 ? viewH / size.y : 1
    const fit = Math.min(size.x > 0 ? viewW / size.x : 1, fitH)
    graph.scale.setScalar(0.36 * Math.min(1, fit))
    if (!introduced) {
      introduced = true
      gsap.to(root.scale, { x: 1, y: 1, z: 1, duration: 0.7, ease: 'power2.out' })
    }
  },
  onDestroy(rt) {
    introduced = false
    if (root) gsap.killTweensOf(root.scale)
    removeListeners?.()
    removeListeners = null
    if (rt?.controls) rt.controls.enabled = true
    for (const { tex } of textures) tex?.dispose?.()
    textures = []
    lineMat?.dispose?.()
    lineMat = null
    root = null
    graph = null
    items = null
    worldPos = null
    invQuat = null
    box = null
    velX = 0
    velY = 0
    dragging = false
    rotY = 0
    rotYTarget = 0
    targetX = 8e-5
    targetY = 35e-5
  },
}
