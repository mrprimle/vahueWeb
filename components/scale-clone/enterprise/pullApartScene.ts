import * as THREE from 'three'
import gsap from 'gsap'

/*
 * Recreation of scale.com's EnterprisePullApart three.js scene (chunk 0sni47mcvnqwg, module 322473) on three r181.
 * Shaders are re-written here to approximate the original look; inputs and ranges match Scale's:
 *
 * Runtime (module 955774): PerspectiveCamera(fov 23, near .01, far 200) at z 5, renderer antialias + alpha,
 *   pixel ratio min(dpr, 2), ticks on gsap.ticker only while the canvas intersects the viewport.
 * Scroll: progress = clamp(scrollY / (4.5 * innerHeight)) drives a paused, 1s-long timeline:
 *   group.scale     1.75 -> 0.275   t 0   .. 0.9  cubic.inOut
 *   group.rotation  (0,0) -> (x .5, y .6) t 0.2 .. 0.9  cubic.inOut
 *   uProgress       0 -> 1          t 0.2 .. 1.0  linear
 *   group.y         0 -> 0.165      t 0.7 .. 1.0  cubic.inOut
 *   text 0 visible while progress is in [.15, .35], text 1 in [.65, 1].
 * Pointer: window pointermove -> camera target (map(x, 0..w, -1..1) * .25 * 4, map(y, 0..h, -1..1) * .25 * 2),
 *   camera.position lerps to it at 0.06 per frame and keeps looking at the scene origin.
 * Layers (all white): rounded "video" card 1.77:1 at 0.4 scale with alpha .65 and film grain, a mark that scales in
 *   with cubicOut(clamp(uProgress * 2.5)); 32 mini arrows + a wandering bezier line (fade out by uProgress .4);
 *   115 curves (first 9 draw first), rounded-rect frames and arrow heads at the curve ends, arrow particles that
 *   travel each curve (uTime * .1). Phone (< 768px) shrinks layers in clip space (.65 / .75 / .9).
 *
 * Not reproduced: Scale's background stock video (iStock) inside the card and Scale's logo texture; the card uses
 * procedural grain and a neutral chevron mark instead.
 */

export type PullApartSceneOptions = {
  curvesUrl: string
  /**
   * Optional footage inside the card (Scale plays a licensed iStock clip here, not shipped). Sampled like Scale's
   * shader: uv x scaled by imageAspect * 0.5, contrast 0.8 around mid-grey, + film grain. Without it the card
   * falls back to the procedural vignette + grain.
   */
  cardVideoUrl?: string
  onSectionVisible: (index: 0 | 1, visible: boolean) => void
}

const COMMON = /* glsl */ `
uniform float uTime;
uniform vec2 uResolution;
uniform float uProgress;
float isPhone() { return uResolution.x < 768.0 ? 1.0 : 0.0; }
float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453); }
float groupProgress(float id, float r, float k1, float k2) {
  float g1 = id < 8.5 ? 1.0 : 0.0;
  float p = (uProgress * k1 - r * 0.25) * g1;
  p += (1.0 - g1) * clamp(uProgress * 3.0 - 1.0 - r * k2, 0.0, 1.0);
  return clamp(p, 0.0, 1.0);
}
`

const WHITE_FRAG = /* glsl */ `
uniform float uFade;
void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, uFade); }
`

// Rounded triangle "arrow" outline, roughly unit sized, pointing to the lower right like Scale's glyph.
function arrowShape(r = 0.12, res = 6): number[] {
  const pts: [number, number][] = [
    [-0.5, 0.5],
    [0.5, 0.5],
    [0.5, -0.5],
  ]
  const out: number[] = []
  for (let i = 0; i < 3; i++) {
    const p = pts[i]
    const prev = pts[(i + 2) % 3]
    const next = pts[(i + 1) % 3]
    const a = new THREE.Vector2(prev[0] - p[0], prev[1] - p[1]).normalize()
    const b = new THREE.Vector2(next[0] - p[0], next[1] - p[1]).normalize()
    for (let k = 0; k <= res; k++) {
      const t = k / res
      // quadratic corner from p + a*r to p + b*r through p
      const ax = p[0] + a.x * r
      const ay = p[1] + a.y * r
      const bx = p[0] + b.x * r
      const by = p[1] + b.y * r
      const x = (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * p[0] + t * t * bx
      const y = (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * p[1] + t * t * by
      out.push(x, y, 0)
    }
  }
  out.push(out[0], out[1], out[2])
  return out
}

// Rounded rectangle outline (Scale's helper uses 256 points, radius .075, width 1.77, height 1).
function roundedRect(width: number, height: number, radius = 0.075, perCorner = 10): number[] {
  const out: number[] = []
  const cx = [width / 2 - radius, -width / 2 + radius, -width / 2 + radius, width / 2 - radius]
  const cy = [height / 2 - radius, height / 2 - radius, -height / 2 + radius, -height / 2 + radius]
  for (let c = 0; c < 4; c++) {
    for (let k = 0; k <= perCorner; k++) {
      const a = (c * Math.PI) / 2 + (k / perCorner) * (Math.PI / 2)
      out.push(cx[c] + Math.cos(a) * radius, cy[c] + Math.sin(a) * radius, 0)
    }
  }
  out.push(out[0], out[1], out[2])
  return out
}

function stripToSegments(strip: number[]): number[] {
  const seg: number[] = []
  for (let i = 0; i < strip.length / 3 - 1; i++) seg.push(strip[i * 3], strip[i * 3 + 1], strip[i * 3 + 2], strip[i * 3 + 3], strip[i * 3 + 4], strip[i * 3 + 5])
  return seg
}

function markTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')!
  g.clearRect(0, 0, 256, 256)
  // Neutral chevron mark (placeholder for Scale's logo texture). TODO: Vahue mark.
  g.fillStyle = '#ffffff'
  g.beginPath()
  g.moveTo(78, 92)
  g.lineTo(104, 92)
  g.lineTo(128, 150)
  g.lineTo(152, 92)
  g.lineTo(178, 92)
  g.lineTo(140, 176)
  g.lineTo(116, 176)
  g.closePath()
  g.fill()
  const t = new THREE.CanvasTexture(c)
  t.needsUpdate = true
  return t
}

// gsap's "cubic" ease is power2, so Scale's cubic.inOut tweens use power2.inOut here.

export function createPullApartScene(container: HTMLElement, opts: PullApartSceneOptions) {
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch {
    return () => {}
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(23, 1, 0.01, 200)
  camera.position.set(0, 0, 5)
  const lookTarget = new THREE.Vector3(0, 0, 0)

  const common = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uProgress: { value: 0 },
  }

  const group = new THREE.Group()
  scene.add(group)
  const disposables: { dispose: () => void }[] = []
  const track = <T extends { dispose: () => void }>(o: T) => (disposables.push(o), o)

  // 1. Card ("video" plane) + mark --------------------------------------------------------------
  const mark = track(markTexture())
  let cardVideo: HTMLVideoElement | null = null
  let cardTex: THREE.VideoTexture | null = null
  if (opts.cardVideoUrl) {
    cardVideo = document.createElement('video')
    Object.assign(cardVideo, { src: opts.cardVideoUrl, muted: true, defaultMuted: true, loop: true, playsInline: true, autoplay: true, preload: 'auto' })
    cardVideo.setAttribute('playsinline', '')
    cardVideo.setAttribute('muted', '')
    cardVideo.play().catch(() => {})
    cardTex = track(new THREE.VideoTexture(cardVideo))
  }
  const card = new THREE.Mesh(
    track(new THREE.PlaneGeometry(1, 1)),
    track(
      new THREE.ShaderMaterial({
        uniforms: { ...common, tMark: { value: mark }, tMap: { value: cardTex }, uHasMap: { value: cardTex ? 1 : 0 }, uMapAspect: { value: 16 / 9 } },
        transparent: true,
        depthTest: false,
        vertexShader: /* glsl */ `
          ${COMMON}
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.x *= 1.77;
            pos *= 0.4;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_Position.xyz *= mix(1.0, 0.65, isPhone());
          }`,
        fragmentShader: /* glsl */ `
          ${COMMON}
          uniform sampler2D tMark;
          uniform sampler2D tMap;
          uniform float uHasMap;
          uniform float uMapAspect;
          varying vec2 vUv;
          float sdRoundBox(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r; }
          float aastep(float th, float v) { float w = length(vec2(dFdx(v), dFdy(v))) * 0.7071; return smoothstep(th - w, th + w, v); }
          void main() {
            float aspect = 1.77;
            vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
            float d = sdRoundBox(p, vec2(0.5 * aspect, 0.5), 0.078);
            float alpha = 1.0 - aastep(0.0, d);
            // Procedural stand-in for the darkened background footage: soft vignette + film grain.
            float shade = 0.2 - 0.05 * length(p);
            float noise = rand(vUv + fract(uTime)) * 2.0 - 1.0;
            vec3 color = vec3(shade) + noise * 0.04;
            if (uHasMap > 0.5) {
              vec2 uv = (vUv - 0.5) * vec2(uMapAspect * 0.5, 1.0) + 0.5;
              vec3 v = texture2D(tMap, uv).rgb;
              v = (v * 2.0 - 1.0) * 0.8 * 0.5 + 0.5;
              color = v + noise * 0.04;
            }
            float s = clamp(uProgress * 2.5, 0.0, 1.0);
            float scaleIn = 1.0 - pow(1.0 - s, 3.0);
            vec2 luv = vUv - 0.5;
            luv.x *= aspect;
            luv *= 4.0 / max(scaleIn, 1e-3);
            luv += 0.5;
            float m = 0.0;
            if (luv.x > 0.0 && luv.x < 1.0 && luv.y > 0.0 && luv.y < 1.0) m = texture2D(tMark, luv).a;
            m = aastep(0.5, m) * smoothstep(0.05, 0.1, uProgress);
            color = mix(color, vec3(1.0), m);
            alpha *= 0.65;
            alpha = mix(alpha, 1.0, m);
            gl_FragColor = vec4(color, alpha);
          }`,
        blending: THREE.AdditiveBlending,
      }),
    ),
  )
  if (cardVideo) {
    const v = cardVideo
    v.addEventListener('loadedmetadata', () => {
      if (v.videoWidth && v.videoHeight) (card.material as THREE.ShaderMaterial).uniforms.uMapAspect.value = v.videoWidth / v.videoHeight
    })
  }
  card.renderOrder = -1
  group.add(card)

  // 2. Mini arrows (32) and the wandering line between them -------------------------------------
  const arrow = arrowShape()
  const arrowSeg = stripToSegments(arrow)
  const miniPts: THREE.Vector3[] = []
  const miniPos: number[] = []
  const miniOff: number[] = []
  for (let i = 0; i < 32; i++) {
    const x = (2 * Math.random() - 1) * 0.2655
    const y = (2 * Math.random() - 1) * 0.15
    miniPts.push(new THREE.Vector3(x, y, 0))
    for (let k = 0; k < arrowSeg.length; k += 3) {
      miniPos.push(arrowSeg[k], arrowSeg[k + 1], arrowSeg[k + 2])
      miniOff.push(x, y, 0)
    }
  }
  const fadeOut = { value: 1 }
  const miniGeo = track(new THREE.BufferGeometry())
  miniGeo.setAttribute('position', new THREE.Float32BufferAttribute(miniPos, 3))
  miniGeo.setAttribute('offset', new THREE.Float32BufferAttribute(miniOff, 3))
  const miniArrows = new THREE.LineSegments(
    miniGeo,
    track(
      new THREE.ShaderMaterial({
        uniforms: { ...common, uFade: fadeOut },
        transparent: true,
        vertexShader: /* glsl */ `
          ${COMMON}
          attribute vec3 offset;
          void main() {
            vec3 off = offset;
            off.x += sin(uTime * 1.14 + off.x * 24.0) * 0.01;
            off.y += cos(uTime * 1.1 + off.y * 28.0) * 0.01;
            vec3 pos = position * 0.01 + off;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_Position.xyz *= mix(1.0, 0.75, isPhone());
          }`,
        fragmentShader: WHITE_FRAG,
      }),
    ),
  )
  group.add(miniArrows)

  const LINE_VERTS = 224
  const lineGeo = track(new THREE.BufferGeometry())
  const lineU: number[] = []
  for (let i = 0; i < LINE_VERTS; i++) lineU.push(i / (LINE_VERTS - 1))
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Array(LINE_VERTS * 3).fill(0), 3))
  lineGeo.setAttribute('curveu', new THREE.Float32BufferAttribute(lineU, 1))
  const miniLine = new THREE.Line(
    lineGeo,
    track(
      new THREE.ShaderMaterial({
        uniforms: { ...common, uFade: fadeOut, uPoints: { value: miniPts } },
        transparent: true,
        vertexShader: /* glsl */ `
          ${COMMON}
          attribute float curveu;
          uniform vec3 uPoints[32];
          vec3 wobble(vec3 p) {
            p.x += sin(uTime * 1.14 + p.x * 24.0) * 0.01;
            p.y += cos(uTime * 1.1 + p.y * 28.0) * 0.01;
            return p;
          }
          void main() {
            float timeoffset = sin(uTime * 3.1415 * 0.5) * 0.1;
            float t = floor(fract(uTime * 0.05 + timeoffset) * 32.0);
            int u1 = int(mod(floor(t + curveu * 7.0), 32.0));
            int u2 = int(mod(floor(t + curveu * 7.0) + 1.0, 32.0));
            vec3 p1 = wobble(uPoints[u1]);
            vec3 p2 = wobble(uPoints[u2]);
            float dist = distance(p1, p2);
            vec3 tangent = normalize(p2 - p1 + 1e-5);
            vec3 normal = cross(tangent, vec3(0.0, 0.0, 1.0));
            float sc = fract(curveu * 7.0);
            vec3 pos = mix(p1, p2, sc);
            float mask = 1.0 - abs(sc - 0.5) * 2.0;
            mask = smoothstep(0.0, 1.0, pow(mask, 0.45));
            float strength = (sin(sc * 2.0 + uTime * 2.5 + timeoffset * 2.0 + float(u1) * 500.0) * 0.5 + 0.5) * 0.3;
            pos += normal * mask * dist * strength;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_Position.xyz *= mix(1.0, 0.75, isPhone());
          }`,
        fragmentShader: WHITE_FRAG,
      }),
    ),
  )
  group.add(miniLine)

  // 3. Curves, end frames, end arrows, travelling particles (needs the curve data) ----------------
  let curvesTex: THREE.DataTexture | null = null
  let disposed = false
  fetch(opts.curvesUrl)
    .then((r) => r.json() as Promise<number[][]>)
    .then((curves) => {
      if (disposed || !curves.length) return
      const N = curves.length
      const L = curves[0].length / 3

      const cPos: number[] = []
      const cU: number[] = []
      const cId: number[] = []
      curves.forEach((c, id) => {
        const segs = c.length / 3 - 1
        for (let i = 0; i < segs; i++) {
          cPos.push(c[i * 3], c[i * 3 + 1], c[i * 3 + 2], c[i * 3 + 3], c[i * 3 + 4], c[i * 3 + 5])
          cU.push(i / segs, (i + 1) / segs)
          cId.push(id, id)
        }
      })
      const cGeo = track(new THREE.BufferGeometry())
      cGeo.setAttribute('position', new THREE.Float32BufferAttribute(cPos, 3))
      cGeo.setAttribute('curveu', new THREE.Float32BufferAttribute(cU, 1))
      cGeo.setAttribute('id', new THREE.Float32BufferAttribute(cId, 1))
      group.add(
        new THREE.LineSegments(
          cGeo,
          track(
            new THREE.ShaderMaterial({
              uniforms: { ...common },
              transparent: true,
              vertexShader: /* glsl */ `
                ${COMMON}
                attribute float curveu;
                attribute float id;
                varying float vCurveu;
                varying float vId;
                varying float vRand;
                void main() {
                  vCurveu = curveu; vId = id; vRand = rand(vec2(id + 200.0));
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  gl_Position.xyz *= mix(1.0, 0.9, isPhone());
                }`,
              fragmentShader: /* glsl */ `
                ${COMMON}
                varying float vCurveu;
                varying float vId;
                varying float vRand;
                void main() {
                  float g1 = vId < 8.5 ? 1.0 : 0.0;
                  float p = (uProgress * 1.5 - vRand * 0.25) * g1;
                  p += (1.0 - g1) * clamp(uProgress * 3.0 - 1.0 - vRand * 0.5, 0.0, 1.0);
                  p = clamp(p, 0.0, 1.0);
                  p *= smoothstep(0.1, 0.4, p);
                  if (vCurveu > p) discard;
                  gl_FragColor = vec4(1.0);
                }`,
            }),
          ),
        ),
      )

      // End points
      const ends: number[] = curves.map((c) => [c[c.length - 3], c[c.length - 2], c[c.length - 1]]).flat()

      const instanced = (shape: number[], vert: string) => {
        const seg = stripToSegments(shape)
        const pos: number[] = []
        const off: number[] = []
        const ids: number[] = []
        for (let e = 0; e < N; e++) {
          for (let k = 0; k < seg.length; k += 3) {
            pos.push(seg[k], seg[k + 1], seg[k + 2])
            off.push(ends[e * 3], ends[e * 3 + 1], ends[e * 3 + 2])
            ids.push(e)
          }
        }
        const geo = track(new THREE.BufferGeometry())
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
        geo.setAttribute('offset', new THREE.Float32BufferAttribute(off, 3))
        geo.setAttribute('id', new THREE.Float32BufferAttribute(ids, 1))
        return new THREE.LineSegments(
          geo,
          track(new THREE.ShaderMaterial({ uniforms: { ...common, tCurves: { value: null as THREE.DataTexture | null } }, vertexShader: vert, fragmentShader: 'void main(){ gl_FragColor = vec4(1.0); }' })),
        )
      }

      // Rounded-rect frames at curve ends: scale mix(.07, .2, rand(offset.xy)), grow with smoothstep(.6, 1, p)
      group.add(
        instanced(
          roundedRect(1.77, 1),
          /* glsl */ `
          ${COMMON}
          attribute vec3 offset;
          attribute float id;
          void main() {
            float scale = mix(0.07, 0.2, rand(offset.xy));
            float p = groupProgress(id, rand(vec2(id + 200.0)), 2.0, 0.5);
            vec3 pos = position * scale * smoothstep(0.6, 1.0, p) + offset;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_Position.xyz *= mix(1.0, 0.75, isPhone());
          }`,
        ),
      )

      // Arrow heads at curve ends: scale .05 * cubicInOut(smoothstep(.5, 1, p))
      group.add(
        instanced(
          arrow,
          /* glsl */ `
          ${COMMON}
          attribute vec3 offset;
          attribute float id;
          void main() {
            float p = groupProgress(id, rand(vec2(id + 200.0)), 2.0, 0.5);
            float s = smoothstep(0.5, 1.0, p);
            s = s < 0.5 ? 4.0 * s * s * s : 1.0 - pow(-2.0 * s + 2.0, 3.0) / 2.0;
            vec3 pos = position * 0.05 * s + offset;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_Position.xyz *= mix(1.0, 0.9, isPhone());
          }`,
        ),
      )

      // Travelling particles: curve texture (L x N, RGBA float), one arrow per curve.
      const data = new Float32Array(L * N * 4)
      curves.forEach((c, id) => {
        for (let i = 0; i < L; i++) {
          const o = (id * L + i) * 4
          data[o] = c[i * 3]
          data[o + 1] = c[i * 3 + 1]
          data[o + 2] = c[i * 3 + 2]
          data[o + 3] = 1
        }
      })
      curvesTex = new THREE.DataTexture(data, L, N, THREE.RGBAFormat, THREE.FloatType)
      curvesTex.needsUpdate = true
      track(curvesTex)
      const particles = instanced(
        arrow,
        /* glsl */ `
        ${COMMON}
        attribute vec3 offset;
        attribute float id;
        uniform sampler2D tCurves;
        void main() {
          float r = rand(vec2(id + 200.0));
          float g1 = id < 8.5 ? 1.0 : 0.0;
          float p = (uProgress * 2.0 - r * 0.25) * g1;
          p += (1.0 - g1) * clamp(uProgress * 3.0 - 1.0 - r, 0.0, 1.0);
          p = clamp(p, 0.0, 1.0);
          float len = float(textureSize(tCurves, 0).x);
          float lt = fract(uTime * 0.1 + r - r * 10.0);
          float vP = lt;
          lt *= len - 1.0;
          float b = fract(lt);
          vec3 a0 = texelFetch(tCurves, ivec2(int(lt), int(id)), 0).rgb;
          vec3 a1 = texelFetch(tCurves, ivec2(min(int(lt) + 1, int(len) - 1), int(id)), 0).rgb;
          vec3 o = mix(a0, a1, b);
          float s = 0.03;
          s *= smoothstep(0.01, 0.05, vP);
          s *= smoothstep(0.99, 0.95, vP);
          s *= smoothstep(0.0, -0.025, vP - p);
          s *= smoothstep(0.1, 0.75, uProgress);
          vec3 pos = position * s + o;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_Position.xyz *= mix(1.0, 0.75, isPhone());
        }`,
      )
      ;(particles.material as THREE.ShaderMaterial).uniforms.tCurves.value = curvesTex
      group.add(particles)
    })
    .catch(() => {})

  // Scroll timeline -----------------------------------------------------------------------------
  const tl = gsap.timeline({ paused: true })
  let vis0 = false
  let vis1 = false
  tl.fromTo(
    group.rotation,
    { x: 0, y: 0 },
    {
      x: 0.5,
      y: 0.6,
      duration: 0.7,
      ease: 'power2.inOut',
      onUpdate: () => {
        const p = tl.progress()
        const v0 = p >= 0.15 && p <= 0.35
        const v1 = p >= 0.65 && p <= 1
        if (v0 !== vis0) opts.onSectionVisible(0, (vis0 = v0))
        if (v1 !== vis1) opts.onSectionVisible(1, (vis1 = v1))
      },
    },
    0.2,
  )
  tl.fromTo(group.scale, { x: 1.75, y: 1.75, z: 1.75 }, { x: 0.275, y: 0.275, z: 0.275, duration: 0.9, ease: 'power2.inOut' }, 0)
  tl.to(common.uProgress, { value: 1, duration: 0.8, ease: 'none' }, 0.2)
  tl.fromTo(group.position, { y: 0 }, { y: 0.165, duration: 0.3, ease: 'power2.inOut' }, 0.7)
  tl.set({}, {}, 1)
  tl.progress(0.01)

  // Pointer camera rig --------------------------------------------------------------------------
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  const move = new THREE.Vector3()
  const clampMap = (v: number, a: number, b: number) => Math.min(1, Math.max(-1, ((v - a) * 2) / (b - a) - 1))
  const onPointer = (e: PointerEvent | TouchEvent) => {
    const t = 'touches' in e && e.touches.length ? e.touches[0] : (e as PointerEvent)
    mouse.x = t.clientX
    mouse.y = t.clientY
  }
  window.addEventListener('pointermove', onPointer, { passive: true })
  window.addEventListener('touchmove', onPointer, { passive: true })

  // Size / visibility ---------------------------------------------------------------------------
  const resize = () => {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
    common.uResolution.value.set(w, h)
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(container)

  const clock = new THREE.Timer()
  let running = false
  const tick = () => {
    clock.update()
    common.uTime.value = clock.getElapsed()
    const prog = Math.min(1, Math.max(0, window.scrollY / Math.max(1, 4.5 * window.innerHeight)))
    tl.progress(prog)
    fadeOut.value = THREE.MathUtils.smoothstep(0.4 - common.uProgress.value, 0, 0.2)
    move.set(clampMap(mouse.x, 0, window.innerWidth) * 0.25 * 4, clampMap(mouse.y, 0, window.innerHeight) * 0.25 * 2, 5)
    camera.position.lerp(move, 0.06)
    camera.lookAt(lookTarget)
    renderer.render(scene, camera)
  }
  const io = new IntersectionObserver(
    ([e]) => {
      const on = !!e?.isIntersecting
      if (on === running) return
      running = on
      if (on) gsap.ticker.add(tick)
      else gsap.ticker.remove(tick)
    },
    { threshold: 0 },
  )
  io.observe(container)

  return () => {
    disposed = true
    io.disconnect()
    ro.disconnect()
    gsap.ticker.remove(tick)
    window.removeEventListener('pointermove', onPointer)
    window.removeEventListener('touchmove', onPointer)
    tl.kill()
    disposables.forEach((d) => d.dispose())
    clock.dispose()
    renderer.dispose()
    renderer.domElement.remove()
    if (cardVideo) {
      cardVideo.pause()
      cardVideo.removeAttribute('src')
      cardVideo.load()
    }
  }
}
