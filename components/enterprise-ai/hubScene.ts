import * as THREE from 'three'

/*
 * AI Hub object: a sphere of nodes joined by their nearest neighbours, with a few
 * brighter "agent" nodes. White on the page background, no colour.
 *
 * Input:
 *   - drag (pointerdown on the canvas, move/up on window) spins it, with inertia
 *   - cursor anywhere on the page tilts it slightly toward the pointer
 *   - it idles with a slow spin when untouched
 */

const NODES = 220
const LINKS_PER_NODE = 3
const AGENTS = 9

export function createHubScene(host: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  host.appendChild(renderer.domElement)
  renderer.domElement.style.touchAction = 'pan-y'
  renderer.domElement.style.cursor = 'grab'

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50)
  camera.position.set(0, 0, 6.2)
  const group = new THREE.Group()
  scene.add(group)

  // Fibonacci sphere: even node spacing without clumping at the poles
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < NODES; i++) {
    const y = 1 - (i / (NODES - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = i * Math.PI * (3 - Math.sqrt(5))
    pts.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(1.6))
  }

  const linePos: number[] = []
  const seen = new Set<string>()
  pts.forEach((p, i) => {
    pts
      .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, LINKS_PER_NODE)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (seen.has(key)) return
        seen.add(key)
        linePos.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z)
      })
  })
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.14 })
  group.add(new THREE.LineSegments(lineGeo, lineMat))

  const nodeGeo = new THREE.BufferGeometry().setFromPoints(pts)
  const nodeMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.028, transparent: true, opacity: 0.55, sizeAttenuation: true })
  group.add(new THREE.Points(nodeGeo, nodeMat))

  // Agent nodes: larger instanced spheres, spread through the set
  const agentMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.045, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    AGENTS,
  )
  const m = new THREE.Matrix4()
  for (let k = 0; k < AGENTS; k++) {
    m.setPosition(pts[Math.floor((k + 0.5) * (NODES / AGENTS))])
    agentMesh.setMatrixAt(k, m)
  }
  group.add(agentMesh)

  // Input state
  let dragging = false
  let lastX = 0
  let lastY = 0
  let velX = 0.0016 // idle spin, radians per frame around Y
  let velY = 0
  const tilt = { x: 0, y: 0, tx: 0, ty: 0 }

  const onDown = (e: PointerEvent) => {
    dragging = true
    lastX = e.clientX
    lastY = e.clientY
    renderer.domElement.style.cursor = 'grabbing'
  }
  const onMove = (e: PointerEvent) => {
    tilt.tx = (e.clientY / innerHeight - 0.5) * 0.25
    tilt.ty = (e.clientX / innerWidth - 0.5) * 0.35
    if (!dragging) return
    velX = (e.clientX - lastX) * 0.005
    velY = (e.clientY - lastY) * 0.005
    lastX = e.clientX
    lastY = e.clientY
  }
  const onUp = () => {
    dragging = false
    renderer.domElement.style.cursor = 'grab'
  }
  renderer.domElement.addEventListener('pointerdown', onDown)
  addEventListener('pointermove', onMove, { passive: true })
  addEventListener('pointerup', onUp)

  const resize = () => {
    const { width, height } = host.getBoundingClientRect()
    renderer.setSize(width, height, false)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    camera.aspect = width / Math.max(height, 1)
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(host)
  resize()

  // Only render while on screen
  let visible = true
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
  io.observe(host)

  let raf = 0
  const frame = () => {
    raf = requestAnimationFrame(frame)
    if (!visible) return
    if (!dragging) {
      // Inertia settles back to the idle spin
      velX += (0.0016 - velX) * 0.04
      velY *= 0.94
    }
    group.rotation.y += reduced ? 0 : velX
    group.rotation.x = THREE.MathUtils.clamp(group.rotation.x + velY, -0.9, 0.9)
    tilt.x += (tilt.tx - tilt.x) * 0.06
    tilt.y += (tilt.ty - tilt.y) * 0.06
    scene.rotation.set(tilt.x, tilt.y, 0)
    renderer.render(scene, camera)
  }
  frame()

  return {
    destroy() {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onDown)
      removeEventListener('pointermove', onMove)
      removeEventListener('pointerup', onUp)
      lineGeo.dispose()
      nodeGeo.dispose()
      agentMesh.geometry.dispose()
      ;[lineMat, nodeMat, agentMesh.material as THREE.Material].forEach((mat) => mat.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
