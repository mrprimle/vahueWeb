import * as THREE from 'three'
import gsap from 'gsap'

/*
 * Recreation of scale.com's LogoCloud scene (chunk 0sni47mcvnqwg, module 151755; tile shader 830333/282513 and
 * scrolling-band line material 391355 in chunk 3x8z3_0hhtdcb) on three r181. Inputs and ranges match Scale's:
 *
 * Camera: PerspectiveCamera(23, aspect, .01, 200), z = 8 (6 under 769px). Group h > group x (scale .36, fitted on
 *   resize so the bounding box stays inside the frustum).
 * Layout: tiles 0..17 on a Fibonacci sphere of radius 3, extra tiles random in a .36..2.64 shell (seeded LCG 12).
 *   Each tile links to its 3 nearest neighbours. x.rotation starts at (.3, .5).
 * Tiles: 0.48 planes billboarded to the camera; scale eases (0.04/frame) to .4 + t * 3.3 with t = (worldZ + 3) / 6;
 *   colour = white * smoothstep(0, .4, max(z, ~.31)), so tiles at the back go light grey; 6px rounded corners.
 * Lines: grey (#8F8F8F * 1.5) at 55..100% alpha across the stroke, with a black band (length 3.2) travelling along
 *   each line (speed 3.2, repeat 28).
 * Drag (pointerdown/move/up on the canvas): rotation.y += .004 * dx, rotation.x += .004 * dy; on release the spin
 *   target becomes .02 * the last per-move delta (inertia). Idle spin per frame eases (0.03) to target
 *   (x 8e-5, y 35e-5); the pointer anywhere on the page steers the target: y = 35e-5 + (mx - .5) * 24e-5,
 *   x = 8e-5 - (my - .5) * 24e-5 (my measured bottom-up).
 * Scroll: section progress ("top bottom" -> "top center", clamped >= .5) eases into x.position.y = -.5 + .5p and
 *   h.scale = map(p, 0..1, .8..1); page scroll sets h.rotation.y target = .82 * (scrollY / (docH - innerH) - .5).
 *
 * Customer logos are not reproduced: tiles render as neutral blank tiles, or with page-supplied text labels.
 * Theme hooks (CSS custom properties read from the container, Scale's values as defaults):
 *   --ent-cloud-tile (#fff), --ent-cloud-ink (#000, label text), --ent-cloud-line (#c4c4c4), --ent-cloud-band (#000).
 */

export type LogoCloudHandle = { setScrollProgress: (p: number) => void; destroy: () => void }

const TILE_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
}`

const TILE_FRAG = /* glsl */ `
uniform vec2 uMeshSize;
uniform float uSeed;
uniform vec3 uTile;
uniform vec3 uInk;
uniform sampler2D tLabel;
uniform float uHasLabel;
varying vec2 vUv;
varying vec3 vPosition;
float roundedInside(float radius, vec2 uv, vec2 res) {
  float m = max(res.x, res.y);
  vec2 ratio = res / m;
  vec2 p = (2.0 * uv - 1.0) * ratio;
  float r = 2.0 * (radius / m);
  vec2 q = abs(p) - (ratio - vec2(r));
  float d = min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  float w = fwidth(d);
  return 1.0 - smoothstep(-w, w, d);
}
void main() {
  float floorZ = 0.31;
  float zSoft = mix(floorZ, vPosition.z, smoothstep(floorZ - 0.04, floorZ + 0.04, vPosition.z));
  float ramp = smoothstep(0.0, 0.4, zSoft);
  // Placeholder mark: a faint centred bar where Scale draws the client logo. TODO: client logos.
  vec2 c = abs(vUv - 0.5);
  float bar = step(c.x, 0.22) * step(c.y, 0.045);
  vec3 col = uTile * ramp;
  if (uHasLabel > 0.5) col = mix(col, uInk, texture2D(tLabel, vUv).a);
  else col = mix(col, col * 0.86, bar * smoothstep(0.2, 0.5, ramp));
  float inside = roundedInside(6.0, vUv, uMeshSize * 100.0);
  gl_FragColor = vec4(col, inside);
}`

const LINE_VERT = /* glsl */ `
attribute float lineDistance;
attribute float across;
varying float vDist;
varying float vAcross;
void main() {
  vDist = lineDistance;
  vAcross = across;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const LINE_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uBand;
uniform float uTime;
varying float vDist;
varying float vAcross;
void main() {
  float period = 28.0;
  float u = mod(vDist * 10.0 - uTime * 3.2, period);
  float w = 0.6;
  float band = smoothstep(0.0, w, u) * (1.0 - smoothstep(3.2 - w, 3.2, u));
  vec3 rgb = mix(uColor, uBand, band);
  gl_FragColor = vec4(rgb, mix(0.55, 1.0, band));
}`

function labelTexture(text: string, font: string): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')!
  g.fillStyle = '#fff'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  const words = text.split(' ')
  const lines = words.length > 1 && text.length > 10 ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')] : [text]
  let size = 44
  g.font = `400 ${size}px ${font}`
  const widest = () => Math.max(...lines.map((l) => g.measureText(l).width))
  while (size > 18 && widest() > 196) {
    size -= 2
    g.font = `400 ${size}px ${font}`
  }
  lines.forEach((l, i) => g.fillText(l, 128, 128 + (i - (lines.length - 1) / 2) * size * 1.1))
  const t = new THREE.CanvasTexture(c)
  t.needsUpdate = true
  return t
}

export function createLogoCloudScene(container: HTMLElement, tileCount = 10, labels?: string[]): LogoCloudHandle | null {
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  const canvas = renderer.domElement
  canvas.style.display = 'block'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.touchAction = 'none'
  container.appendChild(canvas)

  const css = getComputedStyle(container)
  const token = (name: string, fallback: string) => new THREE.Color(css.getPropertyValue(name).trim() || fallback)
  const tileColor = token('--ent-cloud-tile', '#ffffff')
  const inkColor = token('--ent-cloud-ink', '#000000')
  if (labels?.length) tileCount = labels.length
  const font = css.fontFamily || 'sans-serif'

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(23, 1, 0.01, 200)
  let small = window.innerWidth < 769
  camera.position.z = small ? 6 : 8

  const h = new THREE.Group()
  scene.add(h)
  const x = new THREE.Group()
  x.scale.setScalar(0.36)
  h.add(x)

  // Layout
  let seed = 12
  const lcg = () => ((seed = (16807 * seed) % 2147483647) - 1) / 2147483646
  const sphereCount = Math.min(tileCount, 18)
  const pts: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < sphereCount; i++) {
    const n = ((i + 0.5) / sphereCount) * 2 - 1
    const yy = 1 - 2 * (0.5 + Math.sign(n) * Math.abs(n) * 0.5)
    const r = 3 * Math.sqrt(Math.max(0, 1 - yy * yy))
    pts.push(new THREE.Vector3(Math.cos(golden * i) * r, Math.sin(golden * i) * r, 3 * yy))
  }
  while (pts.length < tileCount) {
    const a = (2 * lcg() - 1) * 3
    const b = (2 * lcg() - 1) * 3
    const c = (2 * lcg() - 1) * 3
    const d = Math.sqrt(a * a + b * b + c * c)
    if (d < 2.64 && d > 0.36) pts.push(new THREE.Vector3(a, b, c))
  }

  const disposables: { dispose: () => void }[] = []
  const tileGeo = new THREE.PlaneGeometry(0.48, 0.48)
  disposables.push(tileGeo)
  const tiles = pts.map((p, i) => {
    const label = labels?.[i] ? labelTexture(labels[i], font) : null
    if (label) disposables.push(label)
    const mat = new THREE.ShaderMaterial({
      vertexShader: TILE_VERT,
      fragmentShader: TILE_FRAG,
      transparent: true,
      uniforms: {
        uMeshSize: { value: new THREE.Vector2(1, 1) },
        uSeed: { value: i },
        uTile: { value: tileColor },
        uInk: { value: inkColor },
        tLabel: { value: label },
        uHasLabel: { value: label ? 1 : 0 },
      },
    })
    disposables.push(mat)
    const mesh = new THREE.Mesh(tileGeo, mat)
    mesh.renderOrder = 1
    const g = new THREE.Group()
    g.position.copy(p)
    g.add(mesh)
    x.add(g)
    const t = Math.max(0, Math.min(1, (p.z + 3) / 6))
    return { group: g, curT: t, curScale: 0.4 + t * 3.3 }
  })

  // Nearest-3 links
  const seen = new Set<string>()
  const linePos: number[] = []
  const lineDist: number[] = []
  const lineAcross: number[] = []
  pts.forEach((a, i) => {
    pts
      .map((b, j) => ({ j, d: a.distanceTo(b) }))
      .filter((e) => e.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const k = `${Math.min(i, j)}-${Math.max(i, j)}`
        if (seen.has(k)) return
        seen.add(k)
        const b = pts[j]
        linePos.push(a.x, a.y, a.z, b.x, b.y, b.z)
        lineDist.push(0, a.distanceTo(b))
        lineAcross.push(0, 0)
      })
  })
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
  lineGeo.setAttribute('lineDistance', new THREE.Float32BufferAttribute(lineDist, 1))
  lineGeo.setAttribute('across', new THREE.Float32BufferAttribute(lineAcross, 1))
  const lineMat = new THREE.ShaderMaterial({
    vertexShader: LINE_VERT,
    fragmentShader: LINE_FRAG,
    transparent: true,
    uniforms: { uColor: { value: token('--ent-cloud-line', '#c4c4c4') }, uBand: { value: token('--ent-cloud-band', '#000000') }, uTime: { value: 0 } },
  })
  disposables.push(lineGeo, lineMat)
  const lines = new THREE.LineSegments(lineGeo, lineMat)
  lines.renderOrder = 0
  x.add(lines)
  x.rotation.x = 0.3
  x.rotation.y = 0.5
  const box = new THREE.Box3().setFromObject(x)

  // Motion state
  let targetX = 8e-5
  let targetY = 35e-5
  let spinX = 0
  let spinY = 0
  let dragging = false
  let lastX = 0
  let lastY = 0
  let dX = 0
  let dY = 0
  let scrollTarget = 0.5
  let scrollEased = 0.5
  let rotTarget = 0
  let rotEased = 0
  const q = new THREE.Quaternion()
  const v = new THREE.Vector3()

  const local = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const down = (e: PointerEvent) => {
    if (e.button !== undefined && e.button !== 0) return
    dragging = true
    const p = local(e)
    lastX = p.x
    lastY = p.y
    dX = 0
    dY = 0
    canvas.style.cursor = 'grabbing'
    canvas.setPointerCapture?.(e.pointerId)
  }
  const moveDrag = (e: PointerEvent) => {
    if (!dragging) return
    const p = local(e)
    dX = p.x - lastX
    dY = p.y - lastY
    x.rotation.y += 4e-3 * dX
    x.rotation.x += 4e-3 * dY
    lastX = p.x
    lastY = p.y
  }
  const up = (e: PointerEvent) => {
    if (!dragging) return
    dragging = false
    canvas.style.cursor = ''
    canvas.releasePointerCapture?.(e.pointerId)
    spinX = 4e-3 * dY
    spinY = 4e-3 * dX
    if (Math.sqrt(spinX * spinX + spinY * spinY) > 3e-4) {
      targetX = 0.02 * spinX
      targetY = 0.02 * spinY
    }
  }
  canvas.addEventListener('pointerdown', down)
  canvas.addEventListener('pointermove', moveDrag)
  canvas.addEventListener('pointerup', up)
  canvas.addEventListener('pointercancel', up)

  const onWinMove = (e: PointerEvent) => {
    if (dragging) return
    const mx = e.clientX / window.innerWidth
    const my = 1 - e.clientY / window.innerHeight
    targetY = 35e-5 + (mx - 0.5) * 24e-5
    targetX = 8e-5 - (my - 0.5) * 24e-5
  }
  window.addEventListener('pointermove', onWinMove, { passive: true })

  const onScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    rotTarget = -(-0.82 * (window.scrollY / max - 0.5))
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  const fit = () => {
    const size = box.getSize(new THREE.Vector3())
    const visH = 2 * camera.position.distanceTo(x.position) * Math.tan((camera.fov * Math.PI) / 180 / 2)
    const visW = visH * camera.aspect
    const s = Math.min(1, Math.min(size.x > 0 ? visW / size.x : 1, size.y > 0 ? visH / size.y : 1))
    x.scale.setScalar(0.36 * s)
  }
  const resize = () => {
    const w = container.clientWidth || 1
    const hh = container.clientHeight || 1
    camera.aspect = w / hh
    small = window.innerWidth < 769
    camera.position.z = small ? 6 : 8
    camera.updateProjectionMatrix()
    renderer.setSize(w, hh, false)
    fit()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(container)

  const timer = new THREE.Timer()
  const tick = () => {
    timer.update()
    lineMat.uniforms.uTime.value = timer.getElapsed()
    scrollEased = gsap.utils.interpolate(scrollEased, scrollTarget, 0.06)
    x.position.y = -0.5 + 0.5 * scrollEased
    h.scale.setScalar(gsap.utils.mapRange(0, 1, 0.8, 1, scrollEased))
    rotEased = gsap.utils.interpolate(rotEased, rotTarget, 0.06)
    h.rotation.y = rotEased
    if (!dragging) {
      spinX += (targetX - spinX) * 0.03
      spinY += (targetY - spinY) * 0.03
      x.rotation.x += spinX
      x.rotation.y += spinY
    }
    h.updateMatrixWorld()
    x.updateMatrixWorld()
    x.getWorldQuaternion(q)
    q.invert()
    tiles.forEach((t) => {
      t.group.quaternion.multiplyQuaternions(q, camera.quaternion)
      t.group.getWorldPosition(v)
      const z = Math.max(0, Math.min(1, (v.z + 3) / 6))
      t.curT += (z - t.curT) * 0.04
      t.curScale += (0.4 + z * 3.3 - t.curScale) * 0.04
      t.group.scale.setScalar(t.curScale)
    })
    renderer.render(scene, camera)
  }
  let running = false
  const io = new IntersectionObserver(([e]) => {
    const on = !!e?.isIntersecting
    if (on === running) return
    running = on
    if (on) gsap.ticker.add(tick)
    else gsap.ticker.remove(tick)
  })
  io.observe(container)

  return {
    setScrollProgress(p: number) {
      scrollTarget = Math.max(0.5, Math.min(1, p))
    },
    destroy() {
      io.disconnect()
      ro.disconnect()
      gsap.ticker.remove(tick)
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', moveDrag)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
      window.removeEventListener('pointermove', onWinMove)
      window.removeEventListener('scroll', onScroll)
      disposables.forEach((d) => d.dispose())
      timer.dispose()
      renderer.dispose()
      canvas.remove()
    },
  }
}
