import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import gsap from 'gsap'

/*
 * Vahue hero scene.
 *
 * One WebGL canvas behind the hero. A "packed" video drives everything:
 *   - bottom-left 80% of the frame: the colour video shown on the main plane
 *   - top-left 20% tile: a black/white mask of the same shot; its edges are
 *     drawn as white wireframe outlines on the floating layers
 *   - top-right pixel: red minus green = horizontal framing offset on portrait
 *
 * Scroll drives three transitions (all 0..1):
 *   T1  full-bleed frame  ->  3D object                (scrubbed, progress 0..0.2)
 *   T2  object pulls apart and tilts                  (timed, stage 2 and later)
 *   T3  object swings to the other side, grid layers  (timed, stage 3)
 * Progress = scrollY / (viewport height * 4.7), or 2.15 on phones.
 */

export type HeroSceneOptions = {
  videoSrc: string
  onSectionChange: (visible: [boolean, boolean, boolean]) => void
  onHeadingChange: (show: boolean) => void
  onVideoReady: () => void
}

const SCROLL_LENGTH_DESKTOP = 4.7
const SCROLL_LENGTH_PHONE = 2.15
const CONTAINER_ASPECT = 1.77

// ---------------------------------------------------------------------------
// GLSL
// ---------------------------------------------------------------------------

const COMMON = /* glsl */ `
uniform float uTime;
uniform vec2 uResolution;
uniform float uBand;        // 1 below the 1450px wide layout
uniform float uPhoneY;      // clip-space lift on phones
uniform float uTabletY;     // clip-space lift on tablets
uniform float uTabletScale; // tablet scale at full pull-apart
uniform float uT1;
uniform float uT2;
uniform float uT3;
uniform float uAlpha;
uniform float uColorMix;

float vIsPhone() { return 1.0 - step(768.0, uResolution.x); }
float vIsTablet() { return step(768.0, uResolution.x) * (1.0 - step(1450.0, uResolution.x)); }

// mobile: 1 phone, 0.8 tablet, 0 desktop. lateral: 1 only on the wide desktop layout.
void vLayout(out float mobile, out float lateral) {
  mobile = uResolution.x < 768.0 ? 1.0 : 0.0;
  float desktop = 1.0 - mobile;
  if (uResolution.x >= 768.0 && uResolution.x < 1450.0) { mobile = 0.8; desktop = 0.0; }
  lateral = desktop * (1.0 - uBand);
}

mat2 vRot(float a) { float s = sin(a); float c = cos(a); return mat2(c, s, -s, c); }

float vRoundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

`

const VERT_LIB = /* glsl */ `
void vBandScale(inout vec3 wp, float mobile) {
  float tablet = vIsTablet();
  float verticalAspect = uResolution.y / uResolution.x;
  wp *= mix(1.0, 0.9, mix(uT2, 0.0, mobile));
  wp = mix(wp, wp / (verticalAspect + 0.25), mobile);
  wp *= mix(1.0, uTabletScale, tablet * uT2);
}

float vSceneLift(float mobile) {
  float tablet = vIsTablet();
  float reach = tablet > 0.5 ? 1.0 : mobile;
  return mix(1.0, 1.95, uT2) * reach + uPhoneY * vIsPhone() + uTabletY * tablet;
}

// Squeezes the object between the nav (88px) and a 250px band at the bottom.
vec4 vFitBetweenBars(vec4 p) {
  p.xy /= p.w;
  p.xy *= uResolution.x > uResolution.y + 200.0 ? 1.5 : 1.0;
  float s = (uResolution.y - 250.0 - 88.0) / uResolution.y;
  p.y -= 1.0;
  p.xy *= s;
  p.y += 1.0;
  p.y -= 88.0 * (2.0 / uResolution.y);
  p.xy *= p.w;
  return p;
}

// World position -> clip position of the assembled 3D object.
vec4 vScenePos(vec4 worldPos, bool banded) {
  float mobile; float lateral; vLayout(mobile, lateral);
  if (banded) vBandScale(worldPos.xyz, mobile);
  worldPos.yz = vRot(mix(0.0, 0.35, uT2)) * worldPos.yz;
  vec4 p = projectionMatrix * viewMatrix * worldPos;
  if (banded) {
    p.x += uT2 * 1.4 * (1.0 - uT3) * lateral;
    p.x -= uT3 * 1.5 * lateral;
  }
  p.y += vSceneLift(mobile);
  return p;
}

vec4 vCompose(vec4 fullScreen, vec4 scene, bool banded) {
  float mobile; float lateral; vLayout(mobile, lateral);
  vec4 p = mix(fullScreen, scene, uT1);
  if (banded) p = mix(p, vFitBetweenBars(p), uT1 * (1.0 - uT2) * lateral);
  return p;
}

// Unit quad / rounded rect corner -> inset frame under the nav.
vec4 vFramePos(vec3 pos, float border, float nav) {
  float aspect = uResolution.x / uResolution.y;
  vec4 p = vec4(pos, 1.0);
  float side = step(0.0, pos.x) * 2.0 - 1.0;
  float up = step(0.0, pos.y);
  float padx = border * 2.0 / uResolution.x;
  float pady = border * 2.0 / uResolution.y;
  float navPad = nav * 2.0 / uResolution.y;
  p.x -= 0.5 * side;
  p.x /= aspect;
  p.x += side - padx * side;
  p.y += up * (0.5 - navPad);
  p.y -= (1.0 - up) * (0.5 - pady);
  return p;
}

`

const FRAG_LIB = /* glsl */ `
float vAAStep(float threshold, float value) {
  float w = length(vec2(dFdx(value), dFdy(value))) * 0.70710678;
  return smoothstep(threshold - w, threshold + w, value);
}
`

// Floating particles share this drift so triangles, curves and grid agree.
const DRIFT = /* glsl */ `
vec3 vDrift(vec3 o) {
  vec3 a = o;
  a.x *= ${CONTAINER_ASPECT.toFixed(2)};
  a.x += uTime * 0.0125;
  a.x += sin(uTime * 1.314119 + o.x * 14.7 + o.y * 3.75) * 0.025;
  a.y += sin(uTime * 1.2853 + o.y * 21.1415 + o.x * 5.94) * 0.025;
  a.x = fract(a.x / ${CONTAINER_ASPECT.toFixed(2)}) * ${CONTAINER_ASPECT.toFixed(2)} - ${(CONTAINER_ASPECT / 2).toFixed(3)};
  a.y = a.y + sin(uTime * 0.4 + o.x * 4.0) * 0.1;
  a.y = fract(a.y) - 0.5;
  return a;
}
vec3 vSnap(vec3 a) {
  return vec3(
    (floor(a.x * 3.0 * 0.65) / 3.0 + (1.0 / 3.0) * 0.5) * 1.25,
    floor(a.y * 4.0 * 0.65) / 4.0 + (1.0 / 4.0) * 0.5,
    0.0
  );
}
`

const SPHERE_VERT = /* glsl */ `
void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
const SPHERE_FRAG = /* glsl */ `
uniform float uColorMix;
void main() { gl_FragColor = vec4(mix(vec3(1.0), vec3(0.0), uColorMix), 1.0); }
`

// Rounded-rect outline frames (front and back of the object).
const FRAME_VERT = /* glsl */ `
${COMMON}
${VERT_LIB}
void main() {
  float mobile; float lateral; vLayout(mobile, lateral);
  vec4 full = vFramePos(position, mix(33.0, 24.0, mobile), mix(88.0, 72.0, mobile));
  float side = step(0.0, position.x) * 2.0 - 1.0;
  vec4 world = vec4(position, 1.0);
  world.x += side * 0.5 * (${CONTAINER_ASPECT.toFixed(2)} - 1.0);
  world = modelMatrix * world;
  gl_Position = vCompose(full, vScenePos(world, true), true);
}
`
const frameFrag = (alphaExpr: string) => /* glsl */ `
${COMMON}
${FRAG_LIB}
void main() {
  vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);
  float fade = smoothstep(0.0, 0.3, uT1);
  float alpha = ${alphaExpr};
  gl_FragColor = vec4(color, alpha);
}
`
// front outline, back outline, back echoes, front echoes
const FRAME_FRONT = frameFrag('mix(1.0, 0.25, uT3) * fade * 0.75 * uAlpha')
const FRAME_BACK = frameFrag('mix(mix(1.0, 0.25, uT2), 1.0, uT3) * fade * 0.75 * uAlpha')
const FRAME_BACK_ECHO = frameFrag('fade * uAlpha * uT3 * 0.25 * uAlpha')
const FRAME_FRONT_ECHO = frameFrag('fade * uT2 * (1.0 - uT3) * 0.25 * uAlpha')

// Main video plane.
const VIDEO_VERT = /* glsl */ `
${COMMON}
${VERT_LIB}
uniform sampler2D tMap;
varying vec2 vUv;
varying float vNavPad;
varying float vFrameOffset;
void main() {
  vUv = uv;
  float mobile; float lateral; vLayout(mobile, lateral);
  vFrameOffset = dot(texture2D(tMap, vec2(1.0, 1.0)).rg, vec2(1.0, -1.0));
  float nav = mix(88.0, 72.0, mobile);
  vNavPad = nav * 2.0 / uResolution.y;
  vec4 full = vFramePos(position, mix(24.0, 16.0, mobile), nav);
  vec4 world = modelMatrix * vec4(position.x * ${CONTAINER_ASPECT.toFixed(2)}, position.yz, 1.0);
  gl_Position = vCompose(full, vScenePos(world, true), true);
}
`
const VIDEO_FRAG = /* glsl */ `
${COMMON}
${FRAG_LIB}
uniform sampler2D tMap;
varying vec2 vUv;
varying float vNavPad;
varying float vFrameOffset;
void main() {
  vec2 uv = vUv - 0.5;
  ivec2 size = textureSize(tMap, 0);
  float imageAspect = float(size.x) / float(size.y);
  float screenAspect = uResolution.x / uResolution.y;
  float usableH = uResolution.y - vNavPad * uResolution.y * 0.5;
  float frameAspect = uResolution.x / usableH;
  float invFrameAspect = usableH / uResolution.x;
  bool portrait = screenAspect < imageAspect;
  vec2 fit = vec2(
    portrait ? screenAspect / imageAspect : 1.0,
    portrait ? 1.0 : invFrameAspect * imageAspect
  );
  fit = mix(fit, vec2(imageAspect * 0.5, 1.0), uT1);
  uv = uv * fit + 0.5;
  uv *= 0.8; // colour region of the packed frame
  if (uResolution.y > uResolution.x) uv.x -= invFrameAspect * 0.1 * vFrameOffset * (1.0 - uT1);

  vec3 color = texture2D(tMap, uv).rgb;
  color = mix(color, mix(vec3(0.0), vec3(0.2), uT1), 0.4);

  float radius = mix(16.0 / uResolution.y, 0.078, uT1);
  float boxAspect = mix(frameAspect, ${CONTAINER_ASPECT.toFixed(2)}, uT1);
  float d = vRoundedBox((vUv - 0.5) * vec2(boxAspect, 1.0), vec2(0.5 * boxAspect, 0.5), radius);
  float alpha = 1.0 - vAAStep(0.0, d);
  alpha *= mix(1.0, 0.5, uT2) * uAlpha;
  gl_FragColor = vec4(color, alpha);
}
`

// Wireframe drawn from the mask tile of the packed video.
const OUTLINE_VERT = /* glsl */ `
${COMMON}
${VERT_LIB}
varying vec2 vUv;
varying float vNavPad;
void main() {
  vUv = uv;
  vNavPad = 88.0 * 2.0 / uResolution.y;
  vec4 full = vFramePos(position, 33.0, 88.0);
  vec4 world = modelMatrix * vec4(position.x * ${CONTAINER_ASPECT.toFixed(2)}, position.yz, 1.0);
  gl_Position = vCompose(full, vScenePos(world, true), true);
}
`
const outlineFrag = (front: boolean) => /* glsl */ `
${COMMON}
${FRAG_LIB}
uniform sampler2D tMap;
varying vec2 vUv;
varying float vNavPad;
float edgeAt(vec2 uv) {
  vec2 o = 0.125 / vec2(textureSize(tMap, 0));
  float r = texture2D(tMap, uv).r;
  float w = length(vec2(dFdx(r), dFdy(r))) * 0.70710678;
  float a = smoothstep(0.5 - w, 0.5 + w, texture2D(tMap, uv + vec2(-1.0, 1.0) * o).r);
  float b = smoothstep(0.5 - w, 0.5 + w, texture2D(tMap, uv + vec2(1.0, 1.0) * o).r);
  float c = smoothstep(0.5 - w, 0.5 + w, texture2D(tMap, uv + vec2(-1.0, -1.0) * o).r);
  float e = smoothstep(0.5 - w, 0.5 + w, texture2D(tMap, uv + vec2(1.0, -1.0) * o).r);
  return length(vec2(a - e, b - c));
}
void main() {
  ${front ? '' : 'if (uT2 < 0.0001 || (1.0 - uT3) < 0.0001) discard;'}
  vec2 uv = vUv - 0.5;
  ivec2 size = textureSize(tMap, 0);
  float imageAspect = float(size.x) / float(size.y);
  float screenAspect = uResolution.x / uResolution.y;
  float frameAspect = uResolution.x / (uResolution.y - vNavPad * uResolution.y * 0.5);
  float verticalAspect = uResolution.y / uResolution.x;
  bool portrait = screenAspect < imageAspect;
  vec2 fit = vec2(portrait ? screenAspect / imageAspect : 1.0, portrait ? 1.0 : verticalAspect * imageAspect);
  fit = mix(fit, vec2(imageAspect * 0.5, 1.0), uT1);
  uv = uv * fit + 0.5;
  vec2 tileUv = uv * 0.2 + vec2(0.0, 0.8); // mask tile of the packed frame
  float edge = edgeAt(tileUv);
  ${front ? 'edge = clamp(edge * 2.0, 0.0, 1.0);' : ''}

  float radius = mix(16.0 / uResolution.y, 0.078, uT1);
  float boxAspect = mix(frameAspect, ${CONTAINER_ASPECT.toFixed(2)}, uT1);
  float d = vRoundedBox((vUv - 0.5) * vec2(boxAspect, 1.0), vec2(0.5 * boxAspect, 0.5), radius);
  float alpha = (1.0 - vAAStep(0.0, d)) * edge * uT1;
  ${
    front
      ? 'vec3 color = vec3(1.0); alpha *= mix(1.0, 0.25, uT3) * 0.75 * uAlpha;'
      : 'vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix); alpha *= uT2 * (1.0 - uT3) * 0.25;'
  }
  gl_FragColor = vec4(color, alpha);
}
`

// Small rounded triangles drifting across the front (and snapped to a grid at the back).
const triangleVert = (snapped: boolean) => /* glsl */ `
${COMMON}
${VERT_LIB}
${DRIFT}
attribute vec3 offset;
void main() {
  float aspect = mix(uResolution.x / uResolution.y, 1.0, uT1);
  vec3 drift = vDrift(offset);
  ${snapped ? 'drift = vSnap(drift);' : ''}
  vec3 local = position * 0.02;
  local.x /= aspect * 0.5;
  vec4 full = vec4((local + drift) / vec3(${CONTAINER_ASPECT.toFixed(2)}, 1.0, 1.0) * 1.9, 1.0);
  vec4 world = modelMatrix * vec4(position * 0.02 + drift, 1.0);
  gl_Position = vCompose(full, vScenePos(world, true), true);
}
`
const TRIANGLE_FRONT_FRAG = /* glsl */ `
${COMMON}
${FRAG_LIB}
void main() {
  vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);
  float alpha = mix(1.0, 0.25, uT3) * smoothstep(0.0, 0.5, uT1) * uAlpha * uAlpha * 0.75;
  gl_FragColor = vec4(color, alpha);
}
`
const TRIANGLE_BACK_FRAG = /* glsl */ `
${COMMON}
${FRAG_LIB}
void main() {
  vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);
  float alpha = mix(1.0, 0.0, uT2 * (1.0 - uT3)) * smoothstep(0.0, 0.75, uT1) * uAlpha * uAlpha * 0.5;
  gl_FragColor = vec4(color, alpha);
}
`

// Dotted bezier curves joining each front particle to its grid cell at the back.
const CURVE_VERT = /* glsl */ `
${COMMON}
${VERT_LIB}
${DRIFT}
attribute vec3 offset;
varying float vDepth;
varying float vDist;
varying vec3 vWorld;
vec3 lerp3(vec3 a, vec3 b, float t) { return a - (a - b) * t; }
void main() {
  float aspect = mix(uResolution.x / uResolution.y, 1.0, uT1);
  vec3 drift = vDrift(offset);
  vec3 origin = vec3(drift.xy, 0.5);
  vec3 target = vec3(vSnap(drift).xy, -0.5);
  float t = -position.z;
  vec3 local = position;
  local.x /= aspect;
  vec4 full = vec4((local + mix(origin, target, t)) / vec3(${CONTAINER_ASPECT.toFixed(2)}, 1.0, 1.0) * 1.9, 1.0);
  vDist = distance(origin.xy, target.xy);
  vec3 c1 = vec3(origin.xy, -0.1);
  vec3 c2 = vec3(origin.xy, -0.375);
  vec3 c3 = vec3(target.xy, -0.125);
  vec3 c4 = vec3(target.xy, -0.4);
  vec3 a = lerp3(c1, c2, t);
  vec3 b = lerp3(c2, c3, t);
  vec3 c = lerp3(c3, c4, t);
  vec3 pos = lerp3(lerp3(a, b, t), lerp3(b, c, t), t);
  if (t < 0.01) pos = origin;
  if (t > 0.99) pos = target;
  vWorld = pos;
  vDepth = -pos.z;
  vec4 world = modelMatrix * vec4(pos, 1.0);
  gl_Position = vCompose(full, vScenePos(world, true), true);
}
`
const CURVE_FRAG = /* glsl */ `
${COMMON}
${FRAG_LIB}
varying float vDepth;
varying float vDist;
varying vec3 vWorld;
void main() {
  float dots = 1.0 - step(0.3, fract(vDepth * 30.0));
  dots = mix(dots, 1.0, step(0.0, vDepth));
  float front = mix(1.0, 0.25, uT3);
  float back = mix(1.0, 0.0, uT2 * (1.0 - uT3));
  float side = smoothstep(0.1 - uT3 * 0.2 + uT2 * 0.1, -0.2 - uT3 * 0.2 + uT2 * 0.1, vWorld.z);
  float alpha = mix(front, back, side) * dots * smoothstep(0.0, 1.0, uT1) * uAlpha * uAlpha * 0.75;
  gl_FragColor = vec4(vec3(1.0), alpha);
}
`

// Flickering 4-digit labels on the back grid.
const LABEL_VERT = /* glsl */ `
${COMMON}
${VERT_LIB}
varying vec2 vUv;
varying vec3 vPos;
void main() {
  vUv = uv;
  float aspect = mix(uResolution.x / uResolution.y, 1.0, uT1);
  vec3 local = position;
  local.x /= aspect * 0.5;
  vec4 full = vec4(local / vec3(${CONTAINER_ASPECT.toFixed(2)}, 1.0, 1.0) * 1.9, 1.0);
  vPos = position;
  vec4 world = modelMatrix * vec4(position, 1.0);
  gl_Position = vCompose(full, vScenePos(world, true), true);
}
`
const LABEL_FRAG = /* glsl */ `
${COMMON}
${FRAG_LIB}
uniform sampler2D tMap;
varying vec2 vUv;
varying vec3 vPos;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec2 uv = vUv;
  uv.x = fract(uv.x * 4.0);
  float slot = floor(vUv.x * 4.0) / 4.0;
  float seed = slot + floor(vPos.y * 4.0) * 3.14 + floor(vPos.x * 4.0) * 7.89;
  float r = hash(vec2(slot, seed));
  uv.x *= 0.5;
  float alpha = mix(mix(1.0, 0.25, uT2), 1.0, uT3) * smoothstep(0.0, 0.75, uT1) * uAlpha;
  float flip = floor((sin(uTime * 6.14 + r * 2.0 + slot * 2.0) * 0.5 + 0.5) * 2.0);
  uv.x += 0.5 * flip;
  alpha *= texture2D(tMap, uv).r;
  float cell = floor(vPos.x * 3.0 + vPos.y * 4.0);
  float m = 1.0 - slot + sin(uTime * 0.74 + cell * 3.14) * 0.5 + sin(uTime * 1.45 + cell * 1.43) * 0.5 + 0.5;
  alpha *= clamp(floor(m * m), 0.0, 1.0);
  float d = max(length(dFdx(uv)), length(dFdy(uv)));
  alpha = clamp(alpha - step(0.2, d), 0.0, 1.0);
  gl_FragColor = vec4(vec3(1.0), alpha);
}
`

// Small rounded squares stacked three deep on the back grid, ticking 45 degrees.
const SQUARE_VERT = /* glsl */ `
${COMMON}
${VERT_LIB}
attribute vec3 offset;
void main() {
  vec3 local = position;
  float cell = floor(offset.x * 3.0 + offset.y * 4.0);
  float m = 1.0 + sin(uTime * 2.74 + cell * 3.14) * 0.5 + sin(uTime * 3.45 + cell * 1.43) * 0.5 + 0.5;
  local.xy = vRot(clamp(floor(m * m), 0.0, 1.0) * 0.785398) * local.xy;
  vec4 full = vec4(local * 1.25 * vec3(1.0 / ${CONTAINER_ASPECT.toFixed(2)}, 1.0, 1.0) + offset / vec3(${CONTAINER_ASPECT.toFixed(2)}, 1.0, 1.0) * 1.9, 1.0);
  vec4 world = modelMatrix * vec4(local + offset, 1.0);
  gl_Position = vCompose(full, vScenePos(world, true), true);
}
`
const SQUARE_FRAG = frameFrag('fade * uAlpha * uT3 * 0.25 * uAlpha')

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

/** Closed rounded rectangle outline, centred on the origin. */
function roundedRectPoints({ count = 256, radius = 0.075, width = 1, height = 1 } = {}) {
  const out: number[] = []
  const corner = { x: -radius, y: -radius }
  let first: [number, number] | null = null
  for (let i = 0; i < count; i++) {
    if (i === count / 4) corner.x -= width - 2 * radius
    if (i === count / 2) corner.y -= height - 2 * radius
    if (i === (count / 4) * 3) corner.x += width - 2 * radius
    const a = (i / count) * Math.PI * 2
    const x = Math.cos(a) * radius + corner.x + width / 2
    const y = Math.sin(a) * radius + corner.y + height / 2
    out.push(x, y, 0)
    if (!first) first = [x, y]
  }
  out.push(first![0], first![1], 0)
  return out
}

/** Small right-angled rounded triangle outline used for particles. */
function roundedTrianglePoints(radius = 0.1, steps = 7, w = 1, h = 1) {
  const out: number[] = []
  const p = { x: 0.5 * w - 0.175 * w, y: -0.175 * h - (0.5 * h - radius) }
  let c = { x: p.x - radius, y: p.y }
  let start = { x: 0, y: 0 }
  for (let i = 0; i < steps; i++) {
    const a = (i / (steps - 1)) * Math.PI * 0.75 - 0.75 * Math.PI
    p.x = Math.cos(a) * radius + c.x
    p.y = Math.sin(a) * radius + c.y
    out.push(p.x, p.y, 0)
    if (i === 0) start = { ...p }
  }
  p.y += 0.5 * h - radius
  out.push(p.x, p.y, 0)
  p.y += 0.5 * h - radius
  c = { x: p.x - radius, y: p.y }
  for (let i = 0; i < steps; i++) {
    const a = (i / (steps - 1)) * Math.PI * 0.5
    p.x = Math.cos(a) * radius + c.x
    p.y = Math.sin(a) * radius + c.y
    out.push(p.x, p.y, 0)
  }
  p.x -= 0.5 * w - radius
  out.push(p.x, p.y, 0)
  p.x -= 0.5 * w - radius
  c = { x: p.x, y: p.y - radius }
  for (let i = 0; i < steps; i++) {
    const a = (i / (steps - 1)) * Math.PI * 0.75 + 0.5 * Math.PI
    p.x = Math.cos(a) * radius + c.x
    p.y = Math.sin(a) * radius + c.y
    out.push(p.x, p.y, 0)
  }
  out.push(start.x, start.y, 0)
  return out
}

/** Two-glyph texture for the flickering labels (left half / right half). */
function makeGlyphTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, 256, 128)
  ctx.fillStyle = '#fff'
  ctx.font = '500 104px ui-monospace, Menlo, monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('0', 64, 68)
  ctx.fillText('1', 192, 68)
  const tex = new THREE.CanvasTexture(canvas)
  tex.minFilter = THREE.LinearFilter
  return tex
}

const range = (v: number, a: number, b: number, c: number, d: number) =>
  Math.min(Math.max(((v - a) * (d - c)) / (b - a) + c, Math.min(c, d)), Math.max(c, d))

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------

export function createHeroScene(container: HTMLElement, opts: HeroSceneOptions) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.display = 'block'
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(23, 1, 0.01, 200)
  camera.position.set(0, 0, 5)

  const T1 = { value: 0 }
  const T2 = { value: 0 }
  const T3 = { value: 0 }
  const alpha = { value: 1 }
  const colorMix = { value: 0 }
  const common = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uBand: { value: 0 },
    uPhoneY: { value: 0 },
    uTabletY: { value: 0 },
    uTabletScale: { value: 1 },
    uT1: T1,
    uT2: T2,
    uT3: T3,
    uAlpha: alpha,
    uColorMix: colorMix,
  }

  // Video texture (packed layout, see top of file).
  const video = document.createElement('video')
  video.src = opts.videoSrc
  video.muted = true
  video.loop = true
  video.playsInline = true
  video.autoplay = true
  video.preload = 'auto'
  video.setAttribute('playsinline', '')
  video.setAttribute('muted', '')
  const videoTex = new THREE.VideoTexture(video)
  videoTex.colorSpace = THREE.SRGBColorSpace
  let videoReady = false
  const checkVideo = () => {
    if (!videoReady && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA && video.currentTime >= 0.08) {
      videoReady = true
      opts.onVideoReady()
    }
  }
  ;['loadeddata', 'canplay', 'playing', 'timeupdate'].forEach((e) => video.addEventListener(e, checkVideo))
  const tryPlay = () => video.play().catch(() => {})
  tryPlay()
  document.addEventListener('touchstart', tryPlay, { passive: true, once: true })
  document.addEventListener('click', tryPlay, { once: true })

  const glyphTex = makeGlyphTexture()

  // Background sphere: white -> black as the scene opens up.
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.ShaderMaterial({
      uniforms: { uColorMix: colorMix },
      vertexShader: SPHERE_VERT,
      fragmentShader: SPHERE_FRAG,
      side: THREE.BackSide,
      depthTest: false,
      depthWrite: false,
    }),
  )
  sphere.renderOrder = -1000
  scene.add(sphere)

  const group = new THREE.Group()
  group.rotation.y = -0.2 * Math.PI
  group.scale.z = 0
  scene.add(group)

  const mat = (vertexShader: string, fragmentShader: string, extra: Record<string, THREE.IUniform> = {}) =>
    new THREE.ShaderMaterial({
      uniforms: { ...common, ...extra },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
    })

  // Outline frames
  const rectGeo = new THREE.BufferGeometry()
  rectGeo.setAttribute('position', new THREE.Float32BufferAttribute(roundedRectPoints(), 3))
  const frameFront = mat(FRAME_VERT, FRAME_FRONT)
  const frameBack = mat(FRAME_VERT, FRAME_BACK)
  const frameBackEcho = mat(FRAME_VERT, FRAME_BACK_ECHO)
  const frameFrontEcho = mat(FRAME_VERT, FRAME_FRONT_ECHO)
  const frames = [
    { m: frameFront, z: 0.5 },
    { m: frameFrontEcho, z: 0.4 },
    { m: frameFrontEcho, z: 0.3 },
    { m: frameBack, z: -0.5 },
    { m: frameBackEcho, z: -0.4 },
    { m: frameBackEcho, z: -0.3 },
  ].map(({ m, z }) => {
    const line = new THREE.Line(rectGeo, m)
    line.position.z = z
    return line
  })

  // Video plane
  const videoPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat(VIDEO_VERT, VIDEO_FRAG, { tMap: { value: videoTex } }))

  // Wireframe outline planes
  const outlineFront = mat(OUTLINE_VERT, outlineFrag(true), { tMap: { value: videoTex } })
  const outlineEcho = mat(OUTLINE_VERT, outlineFrag(false), { tMap: { value: videoTex } })
  const planeGeo = new THREE.PlaneGeometry(1, 1)
  const outlines = [
    { m: outlineFront, z: 0.5 },
    { m: outlineEcho, z: 0.4 },
    { m: outlineEcho, z: 0.3 },
  ].map(({ m, z }) => {
    const mesh = new THREE.Mesh(planeGeo, m)
    mesh.position.z = z
    return mesh
  })

  // Particles: 30 random anchor points shared by triangles and curves.
  const anchors: number[] = []
  for (let i = 0; i < 30; i++) anchors.push((Math.random() * 2 - 1) * 0.5, (Math.random() * 2 - 1) * 0.5, 0)
  const tri = roundedTrianglePoints()
  const triPos: number[] = []
  const triOff: number[] = []
  for (let a = 0; a < anchors.length / 3; a++) {
    const [ox, oy, oz] = anchors.slice(a * 3, a * 3 + 3)
    for (let i = 0; i < tri.length / 3 - 1; i++) {
      triPos.push(...tri.slice(i * 3, i * 3 + 6))
      triOff.push(ox, oy, oz, ox, oy, oz)
    }
  }
  const triGeo = new THREE.BufferGeometry()
  triGeo.setAttribute('position', new THREE.Float32BufferAttribute(triPos, 3))
  triGeo.setAttribute('offset', new THREE.Float32BufferAttribute(triOff, 3))
  const trianglesFront = new THREE.LineSegments(triGeo, mat(triangleVert(false), TRIANGLE_FRONT_FRAG))
  trianglesFront.position.z = 0.5
  const trianglesBack = new THREE.LineSegments(triGeo, mat(triangleVert(true), TRIANGLE_BACK_FRAG))
  trianglesBack.position.z = -0.5

  const curvePos: number[] = []
  const curveOff: number[] = []
  for (let a = 0; a < anchors.length / 3; a++) {
    for (let s = 0; s < 32; s++) {
      curvePos.push(0, 0, -s / 32, 0, 0, -(s + 1) / 32)
      curveOff.push(anchors[a * 3], anchors[a * 3 + 1], 0, anchors[a * 3], anchors[a * 3 + 1], 0)
    }
  }
  const curveGeo = new THREE.BufferGeometry()
  curveGeo.setAttribute('position', new THREE.Float32BufferAttribute(curvePos, 3))
  curveGeo.setAttribute('offset', new THREE.Float32BufferAttribute(curveOff, 3))
  const curves = new THREE.LineSegments(curveGeo, mat(CURVE_VERT, CURVE_FRAG))

  // Back grid: digit labels and stacked squares (4 x 4 cells).
  const labelGeos: THREE.BufferGeometry[] = []
  for (let x = 0; x < 4; x++)
    for (let y = 0; y < 4; y++) {
      const g = new THREE.PlaneGeometry()
      g.scale(0.06, 0.015, 1)
      g.translate((x / 4 - 0.375) * 1.6815 + 0.075, (y / 4 - 0.375) * 1.0125 + 0.045, 0)
      labelGeos.push(g)
    }
  const labels = new THREE.Mesh(mergeGeometries(labelGeos), mat(LABEL_VERT, LABEL_FRAG, { tMap: { value: glyphTex } }))
  labels.position.z = -0.5

  const sq = roundedRectPoints({ width: 0.05, height: 0.05, radius: 0.01 })
  const sqPos: number[] = []
  const sqOff: number[] = []
  for (let x = 0; x < 4; x++)
    for (let y = 0; y < 4; y++) {
      const ox = (x / 4 - 0.375) * 1.6815
      const oy = (y / 4 - 0.375) * 1
      for (let i = 0; i < sq.length / 3 - 1; i++) {
        for (const depth of [0, 0.1, 0.2]) {
          sqPos.push(...sq.slice(i * 3, i * 3 + 6))
          sqOff.push(ox, oy, depth, ox, oy, depth)
        }
      }
    }
  const sqGeo = new THREE.BufferGeometry()
  sqGeo.setAttribute('position', new THREE.Float32BufferAttribute(sqPos, 3))
  sqGeo.setAttribute('offset', new THREE.Float32BufferAttribute(sqOff, 3))
  const squares = new THREE.LineSegments(sqGeo, mat(SQUARE_VERT, SQUARE_FRAG))
  squares.position.z = -0.5

  const ordered: THREE.Object3D[] = [
    videoPlane,
    ...frames,
    curves,
    trianglesFront,
    trianglesBack,
    ...outlines,
    labels,
    squares,
  ]
  ordered.forEach((o, i) => {
    o.renderOrder = i
    group.add(o)
  })

  // -------------------------------------------------------------------------
  // Scroll timeline (progress is set directly every frame)
  // -------------------------------------------------------------------------
  const timeline = gsap.timeline({ paused: true })
  timeline
    .fromTo(group.rotation, { y: -0.6 }, { y: -1, duration: 1, ease: 'none' }, 0)
    .to(colorMix, { value: 1, duration: 0.1, ease: 'power2.inOut' }, 0)
    .to(T1, { value: 1, duration: 0.2, ease: 'power2.inOut' }, 0)
    .to(group.scale, { z: 1, duration: 0.1, ease: 'sine.inOut' }, 0)
    .fromTo(alpha, { value: 1 }, { value: 0, duration: 0.2, ease: 'power2.inOut' }, 0.8)
    .set({}, {}, 1)

  // T2 and T3 are timed (1s) tweens fired when progress crosses 0.3 / 0.6.
  let t2Target = 0
  let t3Target = 0
  const setTransitions = (p: number) => {
    const n2 = p >= 0.3 ? 1 : 0
    const n3 = p >= 0.6 ? 1 : 0
    if (n2 !== t2Target) {
      t2Target = n2
      gsap.to(T2, { value: n2, duration: 1, ease: 'power2.inOut', overwrite: true })
    }
    if (n3 !== t3Target) {
      t3Target = n3
      gsap.to(T3, { value: n3, duration: 1, ease: 'power2.inOut', overwrite: true })
    }
  }

  let lastProgress: number | undefined
  let lastVisible = ''
  let headingShown: boolean | null = null
  const applyProgress = (p: number) => {
    const scrollingUp = lastProgress !== undefined && p < lastProgress
    timeline.progress(p)
    setTransitions(p)
    const visible: [boolean, boolean, boolean] = [
      p >= 0.1 && p < 0.3,
      p >= 0.3 && p < 0.6,
      p >= 0.6 && p < (scrollingUp ? 0.997 : 0.85),
    ]
    const key = visible.join()
    if (key !== lastVisible) {
      lastVisible = key
      opts.onSectionChange(visible)
    }
    const show = p <= 0.035
    if (show !== headingShown) {
      headingShown = show
      opts.onHeadingChange(show)
    }
    lastProgress = p
  }

  // -------------------------------------------------------------------------
  // Layout: camera zoom on narrow screens, sphere size, band uniforms
  // -------------------------------------------------------------------------
  let width = 1
  let height = 1
  const gazeTarget = { x: 0, y: 0 }
  const gazeBox = { w: 1, h: 1 }
  const zoomFloor = Math.tan((11.5 * Math.PI) / 180) / Math.tan((29 * Math.PI) / 180)
  const gazeFor = () => {
    if (width > 1449) return { w: width, h: height, zoom: 1, band: height }
    const band = Math.max(1, height * (width <= 767 ? 0.45 : 0.5) - 32)
    const size = Math.min(width, band)
    return { w: size, h: size, zoom: Math.max(size / width, zoomFloor), band }
  }

  const resize = () => {
    width = Math.max(1, container.clientWidth)
    height = Math.max(1, container.clientHeight)
    camera.aspect = width / height
    const g = gazeFor()
    camera.zoom = g.zoom
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, true)
    common.uResolution.value.set(width, height)
    const tablet = width >= 768 && width <= 1449
    common.uBand.value = width <= 1449 ? 1 : 0
    common.uPhoneY.value = width <= 767 ? 0.7 : 0
    common.uTabletY.value = tablet ? 0.7 : 0
    common.uTabletScale.value = tablet ? 1.2 : 1
    sphere.scale.setScalar(40 * Math.max(1, (width / height) * 0.55 + 1.05))
    gazeBox.w = g.w
    gazeBox.h = g.h
    if (width <= 1449) {
      gazeTarget.x = g.w * 0.5
      gazeTarget.y = g.band * 0.5
    } else if (!pointerSeen) {
      gazeTarget.x = width * 0.5
      gazeTarget.y = height * 0.5
    }
    applyProgress(progressFromScroll())
  }

  let pointerSeen = false
  const onPointer = (e: PointerEvent | TouchEvent) => {
    pointerSeen = true
    const pt = 'touches' in e ? e.touches[0] : e
    if (!pt) return
    const px = pt.clientX
    const py = height - pt.clientY
    if (width <= 1449) {
      const g = gazeFor()
      gazeTarget.x = Math.min(g.w, Math.max(0, px - (width - g.w) * 0.5))
      gazeTarget.y = Math.min(g.band, Math.max(0, py))
    } else {
      gazeTarget.x = px
      gazeTarget.y = py
    }
  }

  const progressFromScroll = () => {
    const len = window.matchMedia('(max-width: 768px)').matches ? SCROLL_LENGTH_PHONE : SCROLL_LENGTH_DESKTOP
    return Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight * len)))
  }

  // Camera drifts toward the pointer once the object has formed (max strength 0.15).
  const gazeMove = new THREE.Vector3()
  const origin = new THREE.Vector3(0, 0, 0)
  let lastScroll = -1
  const clock = new THREE.Timer()
  const tick = () => {
    clock.update()
    common.uTime.value = clock.getElapsed()
    const strength = range(T1.value, 0.2, 1, 0, 0.15)
    gazeMove.set(
      range(gazeTarget.x, 0, gazeBox.w, -1, 1) * strength * 4,
      range(gazeTarget.y, 0, gazeBox.h, -1, 1) * strength * 2,
      5,
    )
    camera.position.lerp(gazeMove, 0.06)
    camera.lookAt(origin)
    if (window.scrollY !== lastScroll) {
      lastScroll = window.scrollY
      applyProgress(progressFromScroll())
    }
    renderer.render(scene, camera)
  }

  // Only render while the canvas is on screen.
  let running = false
  const setRunning = (on: boolean) => {
    if (on === running) return
    running = on
    if (on) gsap.ticker.add(tick)
    else gsap.ticker.remove(tick)
  }
  const io = new IntersectionObserver(([entry]) => setRunning(!!entry?.isIntersecting), { threshold: 0 })
  io.observe(container)

  const ro = new ResizeObserver(() => resize())
  ro.observe(container)
  window.addEventListener('pointermove', onPointer, { passive: true })
  window.addEventListener('touchmove', onPointer, { passive: true })
  resize()
  applyProgress(progressFromScroll())
  setRunning(true)

  return {
    destroy() {
      setRunning(false)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('touchmove', onPointer)
      gsap.killTweensOf([T2, T3])
      timeline.kill()
      video.pause()
      video.removeAttribute('src')
      video.load()
      videoTex.dispose()
      glyphTex.dispose()
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose()
        ;(m.material as THREE.Material | undefined)?.dispose?.()
      })
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
