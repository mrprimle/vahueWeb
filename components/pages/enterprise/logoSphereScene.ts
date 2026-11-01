// Scale module 151755, `Y`: logos on a Fibonacci sphere, joined by lines. Drag to rotate with a little inertia,
// the pointer steers the idle spin, scroll drifts it. Line material: module 391355. Shaders: 830333, 282513.
import * as THREE from 'three'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { create } from 'zustand'
import { gsap } from '@/components/site/lib/gsap'
import type { ThreeRuntime, ThreeScene } from '@/components/site/shared/ThreeCanvas'
import type { EnterpriseLogo } from './types'

export const useLogoSphereStore = create<{ scrollProgress: number; setScrollProgress: (v: number) => void }>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (v) => set({ scrollProgress: v }),
}))

const lineVert = `
uniform float linewidth;
uniform vec2 resolution;
uniform float dashScale;

attribute vec3 instanceStart;
attribute vec3 instanceEnd;
attribute float instanceDistanceStart;
attribute float instanceDistanceEnd;

varying vec2 vUv;
varying float vLineDistance;

void trimSegment( in vec4 start, inout vec4 end ) {
	float a = projectionMatrix[ 2 ][ 2 ];
	float b = projectionMatrix[ 3 ][ 2 ];
	float nearEst = -0.5 * b / a;
	float t = ( nearEst - start.z ) / ( end.z - start.z );
	end.xyz = mix( start.xyz, end.xyz, t );
}

void main() {
	vLineDistance = ( position.y < 0.5 )
		? dashScale * instanceDistanceStart
		: dashScale * instanceDistanceEnd;
	vUv = uv;

	float aspect = resolution.x / resolution.y;

	vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
	vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

	bool perspective = ( projectionMatrix[ 2 ][ 3 ] == -1.0 );
	if ( perspective ) {
		if ( start.z < 0.0 && end.z >= 0.0 ) {
			trimSegment( start, end );
		} else if ( end.z < 0.0 && start.z >= 0.0 ) {
			trimSegment( end, start );
		}
	}

	vec4 clipStart = projectionMatrix * start;
	vec4 clipEnd = projectionMatrix * end;
	vec3 ndcStart = clipStart.xyz / clipStart.w;
	vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

	vec2 dir = ndcEnd.xy - ndcStart.xy;
	dir.x *= aspect;
	dir = normalize( dir );

	vec2 offset = vec2( dir.y, -dir.x );
	dir.x /= aspect;
	offset.x /= aspect;
	if ( position.x < 0.0 ) {
		offset *= -1.0;
	}
	if ( position.y < 0.0 ) {
		offset += -dir;
	} else if ( position.y > 1.0 ) {
		offset += dir;
	}
	offset *= linewidth;
	offset /= resolution.y;

	vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;
	offset *= clip.w;
	clip.xy += offset;

	gl_Position = clip;
}
`

const lineFrag = `
uniform vec3 uColor;
uniform vec3 uScrollBandColor;
uniform float uOpacity;
uniform float uTime;
uniform float uScrollSpeed;
uniform float uRepeatLen;
uniform float uBandLen;
uniform float uBandFeather;

varying vec2 vUv;
varying float vLineDistance;

void main() {
	if ( abs( vUv.x ) > 1.0 ) {
		discard;
	}
	if ( abs( vUv.y ) > 1.0 ) {
		float ax = vUv.x;
		float by = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
		if ( ax * ax + by * by > 1.0 ) {
			discard;
		}
	}

	float period = max( uRepeatLen, 1.0e-4 );
	float dist = vLineDistance - uTime * uScrollSpeed;
	float u = mod( dist, period );
	float w = max( uBandFeather, 1.0e-4 );
	float band = smoothstep( 0.0, w, u ) * ( 1.0 - smoothstep( uBandLen - w, uBandLen, u ) );

	vec3 rgb = mix( uColor * 1.5, uScrollBandColor, band );
	float a = uOpacity;
	float across = abs( vUv.x );
	a *= mix( 0.55, 1.0, 1.0 - smoothstep( 0.78, 1.0, across ) );

	gl_FragColor = vec4( rgb, a );
}
`

const logoVert = `varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vec3 pos = position;
  vec3 rampedScale = vec3(1.0);
  pos *= rampedScale;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
}
`

const logoFrag = `uniform sampler2D uTexture;
uniform float alphaTest;
uniform float uSelected;
uniform vec2 uMeshSize;
uniform vec3 uTint;
uniform float uInvertLogoWhite;
uniform float uInvertLogoBlack;
varying vec2 vUv;
varying vec3 vPosition;

vec3 greyscale(vec3 color) {
  return vec3(dot(color, vec3(0.299, 0.587, 0.114)));
}

float roundedBorder(float thickness, float radius, vec2 uv, vec2 resolution, out float inside) {
    float multiplier = max(resolution.x, resolution.y);
    vec2 ratio = resolution / multiplier;
    vec2 squareUv = (2.0 * uv - 1.0) * ratio; // -1.0 .. 1.0

    float squareThickness = (thickness / multiplier);
    float squareRadius = 2.0 * (radius / multiplier);
    vec2 size = ratio - vec2(squareRadius + squareThickness);


    vec2 q = abs(squareUv) - size;
    float d = min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - squareRadius;
    float dist = abs(d);
    float delta = fwidth(dist);
    float border = 1.0 - smoothstep(-delta, delta, dist - squareThickness);

    delta = fwidth(d);
    float limit = squareThickness * 0.5;
    inside = 1.0 - smoothstep(-delta, delta, d - limit);

    return border;
}

float roundedBorder(float thickness, float radius, vec2 uv, vec2 resolution) {
    float inside;
    return roundedBorder(thickness, radius, uv, resolution, inside);
}

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold-afwidth, threshold+afwidth, value);
}

float aastep(float threshold, float value, float padding) {
    return smoothstep(threshold - padding, threshold + padding, value);
}

vec2 aastep(vec2 threshold, vec2 value) {
    return vec2(
        aastep(threshold.x, value.x),
        aastep(threshold.y, value.y)
    );
}

vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

vec3 blendDifference(vec3 base, vec3 blend) {
    return abs(base-blend);
}

vec3 blendMultiply(vec3 base, vec3 blend) {
    return base*blend;
}

float blendScreen(float base, float blend) {
    return 1.0-((1.0-base)*(1.0-blend));
}
vec3 blendScreen(vec3 base, vec3 blend) {
    return vec3(blendScreen(base.r, blend.r), blendScreen(base.g, blend.g), blendScreen(base.b, blend.b));
}

void main() {
  vec2 st = vUv;
  vec4 color = texture2D(uTexture, st);
  vec3 colorLight = rgb2hsb(color.rgb);
  colorLight.z += 0.7;
  colorLight.rgb = hsb2rgb(colorLight.rgb);
  color.rgb = mix(mix(greyscale(colorLight.rgb), color.rgb, uSelected), vec3(1.0), 1.0 - color.a);
  colorLight.rgb = mix(colorLight.rgb, vec3(1.0), 1.0 - color.a);
  float depthFloor = 0.31;
  float depthFloorSoftness = 0.04;
  float zSoftFloor = mix(
    depthFloor,
    vPosition.z,
    smoothstep(
      depthFloor - depthFloorSoftness,
      depthFloor + depthFloorSoftness,
      vPosition.z
    )
  );
  vec3 rampedDepth = vec3(smoothstep(0.0, 0.4, zSoftFloor));
  vec3 rampedDepthNonClamped = vec3(smoothstep(0.0, 0.4, vPosition.z));

  vec4 logo = texture2D(uTexture, st);
  vec3 logoWhite = vec3(mix(vec3(0.0), vec3(1.0), logo.a));
  logoWhite = blendScreen(logoWhite, uTint);

  vec3 logoBlack = vec3(mix(vec3(0.0), vec3(1.0), 1.0 - logo.a));
  logoBlack = blendMultiply(logoBlack, uTint);
  vec3 mixedColor = mix(greyscale(colorLight.rgb) * rampedDepth, color.rgb * rampedDepth, rampedDepthNonClamped);

  float inside;
  float border = aastep(1.0, roundedBorder(6.0, 6.0, st, uMeshSize * 100.0, inside));
  vec4 finalColor = vec4(mixedColor, inside);
  finalColor.rgb *= uTint;

  float alpha = aastep(0.4, logo.a);
  finalColor.rgb = mix(finalColor.rgb, mix(uTint, logoWhite, alpha), uInvertLogoWhite);
  finalColor.rgb = mix(finalColor.rgb, mix(uTint, logoBlack, alpha), uInvertLogoBlack);
  gl_FragColor = finalColor;
}
`

function createLineMaterial() {
  const m = new THREE.ShaderMaterial({
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
    vertexShader: lineVert,
    fragmentShader: lineFrag,
    transparent: true,
    depthWrite: false,
    clipping: false,
  })
  Object.defineProperty(m, 'linewidth', {
    get: () => m.uniforms.linewidth.value,
    set(v) {
      m.uniforms.linewidth.value = v
    },
  })
  Object.defineProperty(m, 'resolution', {
    get: () => m.uniforms.resolution.value,
    set(v) {
      m.uniforms.resolution.value.copy(v)
    },
  })
  Object.defineProperty(m, 'worldUnits', { get: () => false, set() {} })
  return m
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image()
    i.crossOrigin = 'anonymous'
    i.onload = () => resolve(i)
    i.onerror = reject
    i.src = src
  })
}

function logoTexture(T: typeof THREE, img: HTMLImageElement) {
  const c = document.createElement('canvas')
  c.width = c.height = 512
  const ctx = c.getContext('2d') as CanvasRenderingContext2D
  ctx.clearRect(0, 0, 512, 512)
  const w = img.naturalWidth || img.width
  const h = img.naturalHeight || img.height
  const k = Math.min(452 / w, 452 / h)
  const dw = w * k * 0.7
  const dh = h * k * 0.7
  ctx.drawImage(img, (512 - dw) / 2, (512 - dh) / 2, dw, dh)
  const t = new T.CanvasTexture(c)
  t.colorSpace = T.SRGBColorSpace
  return t
}

/** Filled pages: the neutral "Logo" tile, drawn at the box a logo takes on the sphere. */
function tileTexture(T: typeof THREE, label: string) {
  const c = document.createElement('canvas')
  c.width = c.height = 512
  const ctx = c.getContext('2d') as CanvasRenderingContext2D
  ctx.clearRect(0, 0, 512, 512)
  const w = 316
  const h = 126
  const x = (512 - w) / 2
  const y = (512 - h) / 2
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, 14)
  ctx.stroke()
  ctx.fillStyle = '#000'
  ctx.font = `64px ${getComputedStyle(document.body).fontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, 256, 256)
  const t = new T.CanvasTexture(c)
  t.colorSpace = T.SRGBColorSpace
  return t
}

function fibonacci(n: number) {
  const out: THREE.Vector3[] = []
  const a = Math.PI * (3 - Math.sqrt(5))
  for (let l = 0; l < n; l++) {
    const k = ((l + 0.5) / n) * 2 - 1
    const i = 1 - 2 * (0.5 + Math.sign(k) * Math.pow(Math.abs(k), 1) * 0.5)
    const s = 3 * Math.sqrt(Math.max(0, 1 - i * i))
    out.push(new THREE.Vector3(Math.cos(a * l) * s, Math.sin(a * l) * s, 3 * i))
  }
  return out
}

function scatter(n: number, rand: () => number) {
  const out: THREE.Vector3[] = []
  while (out.length < n) {
    const x = (2 * rand() - 1) * 3
    const y = (2 * rand() - 1) * 3
    const z = (2 * rand() - 1) * 3
    const d = Math.sqrt(x * x + y * y + z * z)
    if (d < 2.64 && d > 0.36) out.push(new THREE.Vector3(x, y, z))
  }
  return out
}

export function createLogoSphereScene(logos: EnterpriseLogo[]): ThreeScene {
  let outer: THREE.Group | null = null
  let cloud: THREE.Group | null = null
  let items: { mesh: THREE.Mesh; innerGroup: THREE.Group; curT: number; curScale: number }[] | null = null
  let vec: THREE.Vector3 | null = null
  let quat: THREE.Quaternion | null = null
  let box: THREE.Box3 | null = null
  let phone = false
  let spinX = 8e-5
  let spinY = 35e-5
  let velX = 0
  let velY = 0
  let dragging = false
  let lastX = 0
  let lastY = 0
  let dx = 0
  let dy = 0
  let scrollTurn = 0
  let reveal = 0.5
  let revealTarget = 0.5
  let turn = 0
  let removeListeners: (() => void) | null = null
  let material: THREE.ShaderMaterial | null = null
  let textures: THREE.Texture[] = []
  let hasLogos = false
  let unsubscribe: (() => void) | null = null
  return {
    async preload(rt: ThreeRuntime) {
      const T = rt.THREE
      textures = []
      hasLogos = false
      if (logos.length === 0) return
      try {
        textures = await Promise.all(logos.map(async (l) => (l.src ? logoTexture(T, await loadImage(l.src)) : tileTexture(T, 'Logo'))))
        hasLogos = true
      } catch {
        textures = [tileTexture(T, 'Logo')]
      }
    },
    setup(rt: ThreeRuntime) {
      const { scene, camera, THREE: T, renderer, controls } = rt
      phone = window.innerWidth < 769
      camera.position.z = phone ? 6 : 8
      ;(camera as THREE.PerspectiveCamera & { basePosition?: THREE.Vector3 }).basePosition = camera.position.clone()
      controls.enabled = false
      vec = new T.Vector3()
      quat = new T.Quaternion()
      outer = new T.Group()
      scene.add(outer)
      cloud = new T.Group()
      cloud.scale.setScalar(0.36)
      outer.add(cloud)
      let seed = 12
      const rand = () => {
        seed = (16807 * seed) % 0x7fffffff
        return (seed - 1) / 0x7ffffffe
      }
      const total = Math.max(1, textures.length)
      const onSphere = Math.min(total, 18)
      const inside = Math.max(0, total - onSphere)
      const positions = [...fibonacci(onSphere), ...(inside > 0 ? scatter(inside, rand) : [])]
      items = []
      const list = items
      const alphaTest = hasLogos ? 0.02 : 0.5
      const c = cloud
      positions.forEach((p) => {
        const i = list.length
        const mat = new T.ShaderMaterial({
          vertexShader: logoVert,
          fragmentShader: logoFrag,
          transparent: true,
          side: T.FrontSide,
          uniforms: {
            uTexture: { value: textures[i] },
            alphaTest: { value: alphaTest },
            uTint: { value: new T.Color(0xffffff) },
            uInvertLogoWhite: { value: 0 },
            uInvertLogoBlack: { value: 0 },
            uMeshSize: { value: new T.Vector2(1, 1) },
            uSelected: { value: 1 },
          },
        })
        const mesh = new T.Mesh(new T.PlaneGeometry(0.48, 0.48), mat)
        mesh.renderOrder = 1
        const g = new T.Group()
        c.add(g)
        g.position.copy(p)
        g.add(mesh)
        const t = Math.max(0, Math.min(1, (p.z + 3) / 6))
        list.push({ mesh, innerGroup: g, curT: t, curScale: 0.4 + t * (3.7 - 0.4) })
      })
      const segments: number[] = []
      const seen = new Set<string>()
      positions.forEach((p, i) => {
        positions
          .map((q, j) => ({ j, d: p.distanceTo(q) }))
          .filter((e) => e.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 3)
          .forEach(({ j }) => {
            const key = `${Math.min(i, j)}-${Math.max(i, j)}`
            if (!seen.has(key)) {
              seen.add(key)
              segments.push(p.x, p.y, p.z, positions[j].x, positions[j].y, positions[j].z)
            }
          })
      })
      const geo = new LineSegmentsGeometry()
      geo.setPositions(segments)
      material = createLineMaterial()
      const lines = new LineSegments2(geo, material as never)
      lines.computeLineDistances()
      lines.renderOrder = 0
      c.add(lines)
      c.rotation.x = 0.3
      c.rotation.y = 0.5
      box = new T.Box3().setFromObject(c)
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
        c.rotation.y += 0.004 * dx
        c.rotation.x += 0.004 * dy
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
          spinX = 0.02 * velX
          spinY = 0.02 * velY
        }
      }
      el.addEventListener('pointerdown', down)
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerup', up)
      el.addEventListener('pointercancel', up)
      unsubscribe = useLogoSphereStore.subscribe((s) => {
        revealTarget = Math.max(0.5, Math.min(1, s.scrollProgress))
      })
      removeListeners = () => {
        el.removeEventListener('pointerdown', down)
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerup', up)
        el.removeEventListener('pointercancel', up)
        el.style.cursor = ''
      }
    },
    onMouseMove(_rt, { x, y }) {
      if (outer && cloud && !dragging) {
        spinY = 35e-5 + (x - 0.5) * 24e-5
        spinX = 8e-5 - (y - 0.5) * 24e-5
      }
    },
    onTick(rt, { elapsed = 0 }) {
      if (!outer || !cloud || !items || !quat || !vec) return
      const { camera } = rt
      if (material?.uniforms?.uTime) material.uniforms.uTime.value = elapsed
      reveal = gsap.utils.interpolate(reveal, revealTarget, 0.06)
      cloud.position.y = -0.5 + 0.5 * reveal
      outer.scale.setScalar(gsap.utils.mapRange(0, 1, 0.8, 1, reveal))
      turn = gsap.utils.interpolate(turn, scrollTurn, 0.06)
      outer.rotation.y = turn
      if (!dragging) {
        velX += (spinX - velX) * 0.03
        velY += (spinY - velY) * 0.03
        cloud.rotation.x += velX
        cloud.rotation.y += velY
      }
      outer.updateMatrixWorld()
      cloud.updateMatrixWorld()
      cloud.getWorldQuaternion(quat)
      quat.invert()
      const q = quat
      const v = vec
      items.forEach((e) => {
        const { innerGroup: g } = e
        g.quaternion.multiplyQuaternions(q, camera.quaternion)
        g.getWorldPosition(v)
        const t = Math.max(0, Math.min(1, (v.z + 3) / 6))
        e.curT += (t - e.curT) * 0.04
        e.curScale += (0.4 + t * (3.7 - 0.4) - e.curScale) * 0.04
        g.scale.setScalar(e.curScale)
      })
    },
    onScroll(_rt, { scrollY, documentScrollHeight }) {
      scrollTurn = -(-0.82 * (scrollY / Math.max(1, documentScrollHeight - window.innerHeight) - 0.5))
    },
    onResize(rt) {
      const { THREE: T, camera } = rt
      phone = window.innerWidth < 769
      camera.position.z = phone ? 6 : 8
      if (!box || !cloud) return
      const size = box.getSize(new T.Vector3())
      const h = 2 * camera.position.distanceTo(cloud.position) * Math.tan((camera.fov * Math.PI) / 180 / 2)
      const w = h * camera.aspect
      const kh = size.y > 0 ? h / size.y : 1
      const k = Math.min(1, Math.min(size.x > 0 ? w / size.x : 1, kh))
      cloud.scale.setScalar(0.36 * k)
    },
    onDestroy(rt) {
      unsubscribe?.()
      unsubscribe = null
      removeListeners?.()
      removeListeners = null
      rt.controls.enabled = true
      textures.forEach((t) => t.dispose())
      textures = []
      outer = null
      cloud = null
      items = null
      vec = null
      quat = null
      material = null
      velX = 0
      velY = 0
      dragging = false
      turn = 0
      scrollTurn = 0
    },
  }
}
