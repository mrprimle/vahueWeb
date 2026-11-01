import * as THREE from 'three'
import gsap from 'gsap'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import type { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LINE_FRAG, LINE_VERT, TILE_FRAG, TILE_VERT } from './sphereShaders'
import type { Logo } from './content'

/*
 * scale.com/experts DomainExpertise logo sphere, on three r181. Two layers, both reproduced:
 *
 * Runtime (chunk 3rls9s4y8-e83.js sha256 ac4814e5…, module 955774 mountThreeRuntime):
 *   PerspectiveCamera(23, aspect, .01, 200); WebGLRenderer({ antialias, alpha, powerPreference "high-performance" }),
 *   pixel ratio min(dpr, 2), setSize(w, h, true). OrbitControls exist but the scene disables them (only inert
 *   pointerdown/pointercancel/contextmenu/wheel listeners, none of which preventDefault while disabled).
 *   Ticks on the GSAP ticker only while the container intersects the viewport (IO threshold 0 + rect check).
 *   window resize -> 200ms debounce -> setSize + scene onResize (only once ready and visible; also once at boot).
 *   window pointermove / touchmove (passive) -> onMouseMove({ x: clientX / innerWidth, y: 1 - clientY / innerHeight }).
 *   Lenis "scroll" -> onScroll({ scrollY: lenis.scroll, documentScrollHeight: lenis.dimensions.scrollHeight }).
 *
 * Scene (page chunk 3z_q0c19dxjc-.js sha256 054ace61…, module 558779, createScene D):
 *   camera z 8; group y > group v (scale .36, refit on resize so the box fits the frustum); y.scale 0 -> 1 on the first
 *   onResize (0.7s power2.out).
 *   tiles: one per logo; first min(n, 18) on a Fibonacci sphere of radius 3, the rest random in a .36..2.64 shell
 *   (seeded LCG 12); each 0.48 plane is billboarded and scaled to .9 + 1.5 t (t = (worldZ + 3) / 6, eased .04/frame).
 *   lines: each tile to its 3 nearest neighbours, LineSegments2 + the scrolling-band material (#8F8F8F * 1.5, black
 *   band, speed 3.2, repeat 28, band 3.2, feather .8, linewidth 1px).
 *   v.rotation starts (.3, .5). Drag on the canvas (left button, pointer capture, cursor "grabbing"): rotation.y +=
 *   .004 dx, rotation.x += .004 dy; on release, if |spin| > 3e-4, the idle target becomes .02 * the last delta.
 *   Idle spin eases .03/frame to the target (x 8e-5, y 35e-5); the pointer anywhere on the page steers it:
 *   y = 35e-5 + (x - .5) * 24e-5, x = 8e-5 - (y - .5) * 24e-5 (ignored while dragging).
 *   page scroll: target z = .82 * (scrollY / (docH - innerH) - .5); y.rotation.y eases to it (.06/frame).
 *   Textures: each logo is drawn black (source-in) at 196 * fit * k px (k = .7, or min(.35 * aspect * .7, .94) for
 *   aspect > 1.8) centred on a white 256 canvas. Logos are not shipped in the clone: without `src` the tile draws the
 *   logo's name in black inside the same box.
 * Scale remounts the whole scene when the domain tab changes (React key), so a tab switch replays the intro.
 */

export type LogoSphereHandle = { destroy: () => void }

type LenisLike = {
  scroll: number
  dimensions: { scrollHeight: number }
  on: (e: 'scroll', cb: () => void) => void
  off: (e: 'scroll', cb: () => void) => void
}

const box = (w: number, h: number) => {
  const aspect = w / Math.max(h, 1)
  const fit = Math.min(196 / w, 196 / h)
  const k = aspect > 1.8 ? Math.min(0.35 * aspect * 0.7, 0.94) : 0.7
  return { w: w * fit * k, h: h * fit * k, aspect }
}

function tileCanvas(draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')!
  draw(g)
  g.globalCompositeOperation = 'source-in'
  g.fillStyle = '#000000'
  g.fillRect(0, 0, 256, 256)
  const out = document.createElement('canvas')
  out.width = out.height = 256
  const o = out.getContext('2d')!
  o.fillStyle = '#ffffff'
  o.fillRect(0, 0, 256, 256)
  o.drawImage(c, 0, 0)
  const t = new THREE.CanvasTexture(out)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function textTexture(logo: Logo, font: string) {
  const b = box(logo.width, logo.height)
  return tileCanvas((g) => {
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillStyle = '#000'
    const words = logo.alt.split(' ')
    // tall marks (aspect < 1.8) get two lines when the name has several words
    const lines = b.aspect < 1.8 && words.length > 1 ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')] : [logo.alt]
    let size = Math.min(64, b.h / lines.length / 1.1)
    const set = () => (g.font = `500 ${size}px ${font}`)
    set()
    const widest = () => Math.max(...lines.map((l) => g.measureText(l).width))
    while (size > 8 && widest() > b.w) {
      size -= 1
      set()
    }
    lines.forEach((l, i) => g.fillText(l, 128, 128 + (i - (lines.length - 1) / 2) * size * 1.1))
  })
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const im = new Image()
    im.crossOrigin = 'anonymous'
    im.onload = () => res(im)
    im.onerror = rej
    im.src = src
  })
}

export function createLogoSphere(container: HTMLElement, logos: Logo[]): LogoSphereHandle {
  let destroyed = false
  let ready = false
  let visible = false
  let running = false
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch {
    return { destroy() {} }
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const canvas = renderer.domElement
  canvas.style.touchAction = 'none'
  container.appendChild(canvas)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(23, 1, 0.01, 200)
  camera.position.set(0, 0, 8)
  const timer = new THREE.Timer()
  timer.connect(document)

  const y = new THREE.Group()
  scene.add(y)
  const v = new THREE.Group()
  v.scale.setScalar(0.36)
  y.add(v)
  y.scale.setScalar(0)

  let targetX = 8e-5
  let targetY = 35e-5
  let spinX = 0
  let spinY = 0
  let dragging = false
  let lastX = 0
  let lastY = 0
  let dX = 0
  let dY = 0
  let rot = 0
  let rotTarget = 0
  let introDone = false
  let bounds: THREE.Box3 | null = null
  let lineMat: THREE.ShaderMaterial | null = null
  const q = new THREE.Quaternion()
  const wp = new THREE.Vector3()
  const tiles: { group: THREE.Group; curT: number; curScale: number }[] = []
  const textures: THREE.Texture[] = []

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
  const move = (e: PointerEvent) => {
    if (!dragging) return
    const p = local(e)
    dX = p.x - lastX
    dY = p.y - lastY
    v.rotation.y += 4e-3 * dX
    v.rotation.x += 4e-3 * dY
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

  const onMouse = (e: PointerEvent | TouchEvent) => {
    if (!ready || !visible || dragging) return
    const pt = 'touches' in e && e.touches.length ? e.touches[0] : (e as PointerEvent)
    const mx = pt.clientX / window.innerWidth
    const my = 1 - pt.clientY / window.innerHeight
    targetY = 35e-5 + (mx - 0.5) * 24e-5
    targetX = 8e-5 - (my - 0.5) * 24e-5
  }

  const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis
  const onScroll = () => {
    if (!ready || !visible) return
    const l = lenis()
    const sy = l ? l.scroll : window.scrollY
    const dh = l ? l.dimensions.scrollHeight : document.documentElement.scrollHeight
    rotTarget = 0.82 * (sy / Math.max(1, dh - window.innerHeight) - 0.5)
  }

  const onResize = () => {
    if (!bounds) return
    const size = bounds.getSize(new THREE.Vector3())
    const visH = 2 * camera.position.distanceTo(v.position) * Math.tan((camera.fov * Math.PI) / 180 / 2)
    const visW = visH * camera.aspect
    const sy = size.y > 0 ? visH / size.y : 1
    const s = Math.min(size.x > 0 ? visW / size.x : 1, sy)
    v.scale.setScalar(0.36 * Math.min(1, s))
    if (!introDone) {
      introDone = true
      gsap.to(y.scale, { x: 1, y: 1, z: 1, duration: 0.7, ease: 'power2.out' })
    }
  }
  const measure = () => {
    const w = container.clientWidth
    const h = container.clientHeight
    camera.aspect = w / Math.max(h, 1)
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, true)
    if (ready && visible) onResize()
  }
  let resizeTimer: ReturnType<typeof setTimeout> | null = null
  const debounced = () => {
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(measure, 200)
  }

  const tick = () => {
    if (!ready || !visible) return
    timer.update()
    if (lineMat) lineMat.uniforms.uTime.value = timer.getElapsed()
    rot = gsap.utils.interpolate(rot, rotTarget, 0.06)
    y.rotation.y = rot
    if (!dragging) {
      spinX += (targetX - spinX) * 0.03
      spinY += (targetY - spinY) * 0.03
      v.rotation.x += spinX
      v.rotation.y += spinY
    }
    y.updateMatrixWorld()
    v.updateMatrixWorld()
    v.getWorldQuaternion(q)
    q.invert()
    for (const t of tiles) {
      t.group.quaternion.multiplyQuaternions(q, camera.quaternion)
      t.group.getWorldPosition(wp)
      const z = Math.max(0, Math.min(1, (wp.z + 3) / 6))
      t.curT += (z - t.curT) * 0.04
      t.curScale += (0.9 + 1.5 * z - t.curScale) * 0.04
      t.group.scale.setScalar(t.curScale)
    }
    renderer.render(scene, camera)
  }
  const setRunning = (on: boolean) => {
    if (on === running) return
    running = on
    if (on) gsap.ticker.add(tick)
    else gsap.ticker.remove(tick)
  }
  const inView = () => {
    const r = container.getBoundingClientRect()
    return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth
  }
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e) return
      const was = visible
      visible = e.isIntersecting || inView()
      if (!ready || destroyed) return
      if (visible && !was) {
        debounced()
        onScroll()
        setRunning(true)
      } else if (!visible && was) setRunning(false)
    },
    { threshold: 0 },
  )
  io.observe(container)
  window.addEventListener('resize', debounced)
  debounced()

  const build = async () => {
    const font = getComputedStyle(container).fontFamily || 'sans-serif'
    const list = logos.length ? logos : []
    const settled = await Promise.allSettled(
      list.map(async (l) => {
        if (!l.src) return { tex: textTexture(l, font), aspect: l.width / Math.max(l.height, 1) }
        const im = await loadImage(l.src)
        const w = im.naturalWidth || im.width
        const h = im.naturalHeight || im.height
        const b = box(w, h)
        return { tex: tileCanvas((g) => g.drawImage(im, (256 - b.w) / 2, (256 - b.h) / 2, b.w, b.h)), aspect: w / Math.max(h, 1) }
      }),
    )
    if (destroyed) return
    let texs = settled.filter((r): r is PromiseFulfilledResult<{ tex: THREE.CanvasTexture; aspect: number }> => r.status === 'fulfilled').map((r) => r.value)
    if (!texs.length) {
      const c = document.createElement('canvas')
      c.width = c.height = 128
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      texs = [{ tex: t, aspect: 1 }]
    }
    texs.forEach((t) => textures.push(t.tex))

    // layout
    const n = Math.max(1, texs.length)
    const onSphere = Math.min(n, 18)
    const extra = Math.max(0, n - onSphere)
    let seed = 12
    const rnd = () => ((seed = (16807 * seed) % 2147483647) - 1) / 2147483646
    const golden = Math.PI * (3 - Math.sqrt(5))
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < onSphere; i++) {
      const t = (i + 0.5) / onSphere
      const z = 2 * t - 1
      const yy = 1 - 2 * t
      const r = Math.sqrt(Math.max(0, 1 - yy * yy))
      pts.push(new THREE.Vector3(Math.cos(golden * i) * r * 3, Math.sin(golden * i) * r * 3, 3 * z))
    }
    while (pts.length < onSphere + extra) {
      const a = (2 * rnd() - 1) * 3
      const b = (2 * rnd() - 1) * 3
      const c = (2 * rnd() - 1) * 3
      const d = Math.sqrt(a * a + b * b + c * c)
      if (d < 2.64 && d > 0.36) pts.push(new THREE.Vector3(a, b, c))
    }

    const geo = new THREE.PlaneGeometry(0.48, 0.48)
    pts.forEach((p, i) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader: TILE_VERT,
        fragmentShader: TILE_FRAG,
        transparent: true,
        side: THREE.FrontSide,
        uniforms: {
          uTexture: { value: texs[i].tex },
          alphaTest: { value: 0.02 },
          uTint: { value: new THREE.Color(0xffffff) },
          uMeshSize: { value: new THREE.Vector2(1, 1) },
          uSelected: { value: 1 },
        },
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.renderOrder = 1
      const g = new THREE.Group()
      g.position.copy(p)
      g.add(mesh)
      v.add(g)
      const t = Math.max(0, Math.min(1, (p.z + 3) / 6))
      tiles.push({ group: g, curT: t, curScale: 0.9 + 1.5 * t })
    })

    const pos: number[] = []
    const seen = new Set<string>()
    pts.forEach((a, i) => {
      pts
        .map((b, j) => ({ j, d: a.distanceTo(b) }))
        .filter((e) => e.j !== i)
        .sort((p1, p2) => p1.d - p2.d)
        .slice(0, 3)
        .forEach(({ j }) => {
          const k = `${Math.min(i, j)}-${Math.max(i, j)}`
          if (seen.has(k)) return
          seen.add(k)
          pos.push(a.x, a.y, a.z, pts[j].x, pts[j].y, pts[j].z)
        })
    })
    const lineGeo = new LineSegmentsGeometry()
    lineGeo.setPositions(pos)
    lineMat = new THREE.ShaderMaterial({
      uniforms: {
        linewidth: { value: 1 },
        resolution: { value: new THREE.Vector2(1, 1) },
        dashScale: { value: 1 },
        uColor: { value: new THREE.Color(0x8f8f8f).convertLinearToSRGB() },
        uScrollBandColor: { value: new THREE.Color(0x000000).convertLinearToSRGB() },
        uOpacity: { value: 1 },
        uTime: { value: 0 },
        uScrollSpeed: { value: 3.2 },
        uRepeatLen: { value: 28 },
        uBandLen: { value: 3.2 },
        uBandFeather: { value: 0.8 },
      },
      vertexShader: LINE_VERT,
      fragmentShader: LINE_FRAG,
      transparent: true,
      depthWrite: false,
      clipping: false,
    })
    const lines = new LineSegments2(lineGeo, lineMat as unknown as LineMaterial)
    lines.computeLineDistances()
    lines.renderOrder = 0
    v.add(lines)
    v.rotation.x = 0.3
    v.rotation.y = 0.5
    bounds = new THREE.Box3().setFromObject(v)

    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)

    ready = true
    visible = inView()
    io.unobserve(container)
    io.observe(container)
    debounced()
    onScroll()
    const l = lenis()
    if (l) l.on('scroll', onScroll)
    else window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onMouse, { passive: true })
    window.addEventListener('touchmove', onMouse, { passive: true })
    setRunning(visible)
  }
  build()

  return {
    destroy() {
      destroyed = true
      ready = false
      setRunning(false)
      io.disconnect()
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('resize', debounced)
      const l = lenis()
      l?.off('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMouse)
      window.removeEventListener('touchmove', onMouse)
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
      canvas.style.cursor = ''
      gsap.killTweensOf(y.scale)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose()
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : []
        mats.forEach((x) => x.dispose())
      })
      textures.forEach((t) => t.dispose())
      timer.dispose()
      renderer.dispose()
      canvas.remove()
    },
  }
}
