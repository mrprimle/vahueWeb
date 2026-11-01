import * as THREE from 'three'
import gsap from 'gsap'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { HeroFrameSource } from './content'

/*
 * scale.com homeHeroScene on three r181 (chunk 0hh8x7qynpa7m.js sha256 5b65efba…, module 140914; runtime 955774 in
 * 3rls9s4y8-e83.js sha256 ac4814e5…; helpers 637160 / 667997 / 19490 / 897133 in 058pnujclak3f.js). Same geometry, uniforms,
 * ranges and timeline; the shaders below keep the source's maths with the shared parts factored out.
 *
 * Runtime: PerspectiveCamera(23, aspect, .01, 200), renderer antialias + alpha, pixel ratio min(dpr, 1.5), ticks on
 * gsap.ticker only while the container intersects the viewport, resize debounced 200ms, window pointermove / touchmove.
 *
 * Scroll: progress = clamp(scrollY / (innerHeight * (max-width 768 ? 2.15 : 4.7))) scrubs a paused timeline of length 1:
 *   group.rotation.y -.6 -> -1 (0..1), uColorMix 0 -> 1 (0...1), uTransition1 0 -> 1 (0...2), group.scale.z 0 -> 1 (0...1),
 *   uAlpha 1 -> 0 (.8..1); calls at .05 / .299 / .3 / .599 / .6 start 1s cubic.inOut tweens of uTransition2 and 3.
 * Sections: 0 visible while .1 <= p < .3, 1 while .3 <= p < .6, 2 while .6 <= p < .85 (.997 while scrolling back).
 * Heading: visible while p <= .035.
 * Pointer: camera target (map(x, 0..gazeW, -1..1) * strength * 4, map(y, 0..gazeH, -1..1) * strength * 2), lerp .06, strength =
 * map(uTransition1, .2..1, 0...15). Camera zoom and gaze window from `gaze()` below (band layout under 1450).
 *
 * The only deliberate difference: the phone nav pad is 88px, not 72, because the Vahue bar is 88px tall at every width.
 */

export type HeroSceneOptions = {
  source?: HeroFrameSource
  onSectionVisible: (index: number, visible: boolean) => void
  onHeading: (visible: boolean) => void
  onFrameReady: () => void
}

const NAV_PAD = '88.0'

const HEAD = /* glsl */ `
uniform float uTime;
uniform vec2 uResolution;
uniform float uHomeHeroPullApartBand;
uniform float uHomeHeroPhoneSceneY;
uniform float uHomeHeroTabletSceneY;
uniform float uHomeHeroTabletSceneScale;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uAlpha;
uniform float uColorMix;
`

const VERT_LIB = /* glsl */ `
float homeHeroIsPhone(vec2 res) { return 1.0 - step(768.0, res.x); }
float homeHeroIsTablet(vec2 res) { return step(768.0, res.x) * (1.0 - step(1450.0, res.x)); }
float homeHeroPhoneFinalPosY(float transition2, float isMobile) {
  float isPhone = homeHeroIsPhone(uResolution);
  float isTablet = homeHeroIsTablet(uResolution);
  float yReach = isTablet > 0.5 ? 1.0 : isMobile;
  return mix(1.0, 1.95, transition2) * yReach + uHomeHeroPhoneSceneY * isPhone + uHomeHeroTabletSceneY * isTablet;
}
void homeHeroScaleBandWorldPos(inout vec3 wp, float transition2, float isMobile, float verticalAspect) {
  float isTablet = homeHeroIsTablet(uResolution);
  float t = mix(transition2, 0.0, isMobile);
  wp *= mix(1.0, 0.9, t);
  wp = mix(wp, wp / (verticalAspect + 0.25), isMobile);
  wp *= mix(1.0, uHomeHeroTabletSceneScale, isTablet * transition2);
}
mat2 rotate2d(float a) { float s = sin(a); float c = cos(a); return mat2(c, s, -s, c); }
vec4 verticallyCenter(vec4 pos, float topPad, float bottomPad, vec2 resolution) {
  pos.xy /= pos.w;
  float scaleBias = resolution.x > resolution.y + 200.0 ? 1.5 : 1.0;
  pos.xy *= scaleBias;
  float scale = (resolution.y - bottomPad - topPad) / resolution.y;
  pos.y -= 1.0;
  pos.xy *= scale;
  pos.y += 1.0;
  pos.y -= topPad * (2.0 / resolution.y);
  pos.xy *= pos.w;
  return pos;
}
float gIsMobile; float gIsDesktop; float gLateral; float gVertical;
void initMode() {
  gIsMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
  gIsDesktop = 1.0 - gIsMobile;
  if (uResolution.x >= 768.0 && uResolution.x < 1450.0) { gIsMobile = 0.8; gIsDesktop = 0.0; }
  gLateral = gIsDesktop * (1.0 - uHomeHeroPullApartBand);
  gVertical = uResolution.y / uResolution.x;
}
// world position -> clip space, mixed with the full-screen position
void finish(vec4 worldPos, vec4 fullScreenPos) {
  homeHeroScaleBandWorldPos(worldPos.xyz, uTransition2, gIsMobile, gVertical);
  float angle = mix(0.0, 0.35, uTransition2);
  worldPos.yz = rotate2d(angle) * worldPos.yz;
  vec4 finalPos = projectionMatrix * viewMatrix * worldPos;
  finalPos.x += uTransition2 * 1.4 * (1.0 - uTransition3) * gLateral;
  finalPos.x -= uTransition3 * 1.5 * gLateral;
  finalPos.y += homeHeroPhoneFinalPosY(uTransition2, gIsMobile);
  gl_Position = mix(fullScreenPos, finalPos, uTransition1);
  gl_Position = mix(gl_Position, verticallyCenter(gl_Position, 88.0, 250.0, uResolution), uTransition1 * (1.0 - uTransition2) * gLateral);
}
`

const FRAG_LIB = /* glsl */ `
float sdRoundedBox(vec2 p, vec2 b, vec4 _r) {
  vec4 r = vec4(0.0);
  r.xy = (p.x > 0.0) ? _r.xy : _r.zw;
  r.x = (p.y > 0.0) ? _r.x : _r.y;
  vec2 q = abs(p) - b + r.x;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
}
float aastep(float threshold, float value) {
  float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
  return smoothstep(threshold - afwidth, threshold + afwidth, value);
}
`

// ---- frames (Line) ---------------------------------------------------------------------------------------------
const FRAME_VERT = /* glsl */ `${HEAD}${VERT_LIB}
uniform float uContainerAspect;
void main() {
  initMode();
  float aspect = uResolution.x / uResolution.y;
  vec4 fs = vec4(position, 1.0);
  float heightPx = 1.0 / uResolution.y * 2.0;
  float widthPx = 1.0 / uResolution.x * 2.0;
  float borderPad = mix(33.0, 24.0, gIsMobile);
  float navBarPad = ${NAV_PAD} * heightPx;
  float sideMask = step(0.0, position.x) * 2.0 - 1.0;
  float upMask = step(0.0, position.y);
  float downMask = 1.0 - upMask;
  fs.x -= 0.5 * sideMask;
  fs.x /= aspect;
  fs.x += (sideMask - borderPad * widthPx * sideMask);
  fs.y += upMask * (0.5 - navBarPad);
  fs.y -= downMask * (0.5 - borderPad * heightPx);
  vec4 worldPos = vec4(position, 1.0);
  worldPos.x -= sideMask * 0.5;
  worldPos.x += uContainerAspect * sideMask * 0.5;
  worldPos = modelMatrix * worldPos;
  finish(worldPos, fs);
}`

const frameFrag = (body: string) => /* glsl */ `${HEAD}
void main() {
  vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);
  float fade = smoothstep(0.0, 0.3, uTransition1);
  float alpha = 1.0;
  ${body}
  gl_FragColor = vec4(color, alpha);
}`
const F_FRONT = frameFrag('alpha = mix(alpha, 0.25, uTransition3); alpha *= fade; alpha *= 0.75; alpha *= uAlpha;')
const F_BACK = frameFrag('alpha = mix(1.0, 0.25, uTransition2); alpha = mix(alpha, 1.0, uTransition3); alpha *= fade; alpha *= 0.75; alpha *= uAlpha;')
const F_BACK_ECHO = frameFrag('alpha *= fade; alpha *= uAlpha; alpha *= uTransition3; alpha *= 0.25; alpha *= uAlpha;')
const F_FRONT_ECHO = frameFrag('alpha *= fade; alpha *= uTransition2; alpha *= (1.0 - uTransition3); alpha *= 0.25; alpha *= uAlpha;')

// ---- picture plane + outline planes ----------------------------------------------------------------------------
const planeVert = (borderA: string, borderB: string, extra = '') => /* glsl */ `${HEAD}${VERT_LIB}
uniform sampler2D tMap;
varying vec2 vUv;
varying float vNavBarPad;
varying float vFrameOffset;
void main() {
  vUv = uv;
  initMode();
  float aspect = uResolution.x / uResolution.y;
  ${extra}
  vec4 fs = vec4(position, 1.0);
  float heightPx = 1.0 / uResolution.y * 2.0;
  float widthPx = 1.0 / uResolution.x * 2.0;
  float borderPad = mix(${borderA}, ${borderB}, gIsMobile);
  float navBarPad = ${NAV_PAD} * heightPx;
  vNavBarPad = navBarPad;
  float sideMask = step(0.0, position.x) * 2.0 - 1.0;
  float upMask = step(0.0, position.y);
  float downMask = 1.0 - upMask;
  fs.x -= 0.5 * sideMask;
  fs.x /= aspect;
  fs.x += (sideMask - borderPad * widthPx * sideMask);
  fs.y += upMask * (0.5 - navBarPad);
  fs.y -= downMask * (0.5 - borderPad * heightPx);
  vec4 finalPos = vec4(position, 1.0);
  finalPos.x *= 1.77;
  finish(modelMatrix * finalPos, fs);
}`

const IMAGE_FRAG = /* glsl */ `${HEAD}${FRAG_LIB}
uniform sampler2D tMap;
uniform float uImageIntroZoom;
varying vec2 vUv;
varying float vNavBarPad;
varying float vFrameOffset;
void main() {
  vec2 uv = vUv;
  uv -= 0.5;
  ivec2 texSize = textureSize(tMap, 0);
  float imageAspect = float(texSize.x) / float(texSize.y);
  float screenAspect = uResolution.x / uResolution.y;
  float containerAspect = uResolution.x / (uResolution.y - vNavBarPad * uResolution.y * 0.5);
  float invContainerAspect = (uResolution.y - vNavBarPad * uResolution.y * 0.5) / uResolution.x;
  float verticalAspect = uResolution.y / uResolution.x;
  bool isPortrait = screenAspect < imageAspect;
  vec2 scale = vec2(isPortrait ? 1.0 / verticalAspect / imageAspect : 1.0, isPortrait ? 1.0 : invContainerAspect * imageAspect);
  scale = mix(scale, vec2(imageAspect * 0.5, 1.0), uTransition1);
  uv *= scale;
  uv += 0.5;
  uv *= 0.8;
  if (uResolution.y > uResolution.x) uv.x -= invContainerAspect * 0.5 * 0.2 * vFrameOffset * (1.0 - uTransition1);
  uv = 0.5 + (uv - 0.5) / max(uImageIntroZoom, 0.0001);
  vec3 color = texture2D(tMap, uv).rgb;
  vec3 black = mix(vec3(0.0), vec3(0.2), uTransition1);
  color = mix(color, black, 0.4);
  float finalCornerRadius = mix(16.0 * (1.0 / uResolution.y), 0.078, uTransition1);
  containerAspect = mix(containerAspect, 1.77, uTransition1);
  float alpha = sdRoundedBox((vUv - 0.5) * vec2(containerAspect, 1.0), vec2(0.5 * containerAspect, 0.5), vec4(finalCornerRadius));
  alpha = 1.0 - aastep(0.0, alpha);
  alpha *= mix(1.0, 0.5, uTransition2);
  alpha *= uAlpha;
  gl_FragColor = vec4(color, alpha);
}`

const outlineFrag = (echo: boolean) => /* glsl */ `${HEAD}${FRAG_LIB}
uniform sampler2D tMap;
varying vec2 vUv;
varying float vNavBarPad;
float getOutline(vec2 uv, sampler2D map) {
  vec2 offset = 1.0 / vec2(textureSize(map, 0));
  offset *= 0.5 * 0.25;
  float r = texture2D(map, uv).r;
  float afwidth = length(vec2(dFdx(r), dFdy(r))) * 0.70710678118654757;
  float bck = 0.5 - afwidth;
  float fwd = 0.5 + afwidth;
  float tl = smoothstep(bck, fwd, texture2D(map, uv + vec2(-1.0, 1.0) * offset).r);
  float tr = smoothstep(bck, fwd, texture2D(map, uv + vec2(1.0, 1.0) * offset).r);
  float bl = smoothstep(bck, fwd, texture2D(map, uv + vec2(-1.0, -1.0) * offset).r);
  float br = smoothstep(bck, fwd, texture2D(map, uv + vec2(1.0, -1.0) * offset).r);
  float d1 = tl - br;
  float d2 = tr - bl;
  return sqrt(d1 * d1 + d2 * d2);
}
void main() {
  ${echo ? 'if (uTransition2 < 0.0001 || (1.0 - uTransition3) < 0.0001) discard;' : ''}
  vec2 uv = vUv;
  uv -= 0.5;
  ivec2 texSize = textureSize(tMap, 0);
  float imageAspect = float(texSize.x) / float(texSize.y);
  float screenAspect = uResolution.x / uResolution.y;
  float containerAspect = uResolution.x / (uResolution.y - vNavBarPad * uResolution.y * 0.5);
  float verticalAspect = uResolution.y / uResolution.x;
  bool isPortrait = screenAspect < imageAspect;
  vec2 scale = vec2(isPortrait ? 1.0 / verticalAspect / imageAspect : 1.0, isPortrait ? 1.0 : verticalAspect * imageAspect);
  scale = mix(scale, vec2(imageAspect * 0.5, 1.0), uTransition1);
  uv *= scale;
  uv += 0.5;
  vec2 outlineUv = uv;
  outlineUv *= 0.2;
  outlineUv.y += 0.8;
  float edge = getOutline(outlineUv, tMap);
  ${echo ? '' : 'edge = clamp(edge * 2.0, 0.0, 1.0);'}
  vec3 color = ${echo ? 'mix(vec3(0.0), vec3(1.0), uColorMix)' : 'vec3(1.0)'};
  float finalCornerRadius = mix(16.0 * (1.0 / uResolution.y), 0.078, uTransition1);
  containerAspect = mix(containerAspect, 1.77, uTransition1);
  float alpha = sdRoundedBox((vUv - 0.5) * vec2(containerAspect, 1.0), vec2(0.5 * containerAspect, 0.5), vec4(finalCornerRadius));
  alpha = 1.0 - aastep(0.0, alpha);
  ${echo ? '' : 'alpha *= mix(1.0, 0.25, uTransition3);'}
  alpha *= edge;
  alpha *= uTransition1;
  ${echo ? 'alpha *= uTransition2; alpha *= (1.0 - uTransition3); alpha *= 0.25;' : 'alpha *= 0.75; alpha *= uAlpha;'}
  gl_FragColor = vec4(color, alpha);
}`

// ---- arrows, grid targets, connecting lines --------------------------------------------------------------------
const ANIM_OFFSET = /* glsl */ `
  vec3 animatedOffset = offset;
  animatedOffset.x *= containerAspect;
  animatedOffset.x += uTime * 0.125 * 0.1;
  animatedOffset.x += sin(uTime * 1.314119 + offset.x * 14.7 + offset.y * 3.75) * 0.025;
  animatedOffset.y += sin(uTime * 1.2853 + offset.y * 21.1415 + offset.x * 5.94) * 0.025;
  animatedOffset.x = fract(animatedOffset.x / containerAspect) * containerAspect - containerAspect * 0.5;
  animatedOffset.y = animatedOffset.y + sin(uTime * 0.4 + offset.x * 4.0) * 0.1;
  animatedOffset.y = fract(animatedOffset.y) - 0.5;
`
const arrowVert = (snap: boolean) => /* glsl */ `${HEAD}${VERT_LIB}
attribute vec3 offset;
void main() {
  initMode();
  float aspect = uResolution.x / uResolution.y;
  aspect = mix(aspect, 1.0, uTransition1);
  float containerAspect = 1.77;
  ${ANIM_OFFSET}
  ${snap ? `float gx = 3.0; float gy = 4.0;
  animatedOffset = vec3((floor(animatedOffset.x * gx * 0.65) / gx + (1.0 / gx) * 0.5) * 1.25, floor(animatedOffset.y * gy * 0.65) / gy + (1.0 / gy) * 0.5, 0.0);` : ''}
  float pad = 0.1;
  float scale = 0.02;
  vec3 localPos = position * scale;
  localPos.x /= aspect * 0.5;
  vec4 fs = vec4((localPos + animatedOffset) / vec3(containerAspect, 1.0, 1.0) * (2.0 - pad), 1.0);
  vec4 worldPos = vec4(position * scale, 1.0);
  worldPos.xyz += animatedOffset;
  finish(modelMatrix * worldPos, fs);
}`
const ARROW_FRONT_FRAG = /* glsl */ `${HEAD}
void main() {
  vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);
  float alpha = mix(1.0, 0.25, uTransition3);
  alpha *= smoothstep(0.0, 0.5, uTransition1);
  alpha *= uAlpha * uAlpha;
  alpha *= 0.75;
  gl_FragColor = vec4(color, alpha);
}`
const ARROW_BACK_FRAG = /* glsl */ `${HEAD}
void main() {
  vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);
  float alpha = mix(1.0, 0.0, uTransition2 * (1.0 - uTransition3));
  alpha *= smoothstep(0.0, 0.75, uTransition1);
  alpha *= uAlpha * uAlpha;
  alpha *= 0.5;
  gl_FragColor = vec4(color, alpha);
}`
const LINK_VERT = /* glsl */ `${HEAD}${VERT_LIB}
attribute vec3 offset;
varying float vWorldHeight;
varying float vDist;
varying vec3 vWorldPos;
vec3 pointOnLine(vec3 a, vec3 b, float t) { return a - ((a - b) * t); }
void main() {
  initMode();
  float aspect = uResolution.x / uResolution.y;
  aspect = mix(aspect, 1.0, uTransition1);
  float containerAspect = 1.77;
  ${ANIM_OFFSET}
  float size = 0.5;
  vec3 origin = vec3(animatedOffset.x, animatedOffset.y, size);
  float gx = 3.0; float gy = 4.0;
  vec3 target = vec3((floor(animatedOffset.x * gx * 0.65) / gx + (1.0 / gx) * 0.5) * 1.25, floor(animatedOffset.y * gy * 0.65) / gy + (1.0 / gy) * 0.5, -size);
  float pad = 0.1;
  float t = -position.z;
  vec3 localPos = position;
  localPos.x /= aspect;
  vec4 fs = vec4((localPos + mix(origin, target, t)) / vec3(containerAspect, 1.0, 1.0) * (2.0 - pad), 1.0);
  vDist = distance(origin.xy, target.xy);
  vec3 c1 = vec3(origin.x, origin.y, -size * 0.2);
  vec3 c2 = vec3(origin.x, origin.y, -size * 0.75);
  vec3 c3 = vec3(target.x, target.y, -size * 0.25);
  vec3 c4 = vec3(target.x, target.y, -size * 0.8);
  vec3 posa = pointOnLine(c1, c2, t);
  vec3 posb = pointOnLine(c2, c3, t);
  vec3 posc = pointOnLine(c3, c4, t);
  vec3 posd = pointOnLine(posa, posb, t);
  vec3 pose = pointOnLine(posb, posc, t);
  vec3 pos = pointOnLine(posd, pose, t);
  float eps = 0.01;
  if (t < eps) pos = origin;
  if (t > 1.0 - eps) pos = target;
  vec4 worldPos = vec4(pos, 1.0);
  vWorldPos = worldPos.xyz;
  vWorldHeight = -worldPos.z;
  finish(modelMatrix * worldPos, fs);
}`
const LINK_FRAG = /* glsl */ `${HEAD}
varying float vWorldHeight;
varying vec3 vWorldPos;
varying float vDist;
void main() {
  vec3 color = vec3(1.0);
  float dottedMask = 1.0 - step(0.3, fract(vWorldHeight * 30.0));
  dottedMask = mix(dottedMask, 1.0, step(0.0, vWorldHeight));
  float fade = smoothstep(0.0, 1.0, uTransition1);
  float frontValue = mix(1.0, 0.25, uTransition3);
  float backValue = mix(1.0, 0.0, uTransition2 * (1.0 - uTransition3));
  float alpha = mix(frontValue, backValue, smoothstep(0.1 - uTransition3 * 0.2 + uTransition2 * 0.1, -0.2 - uTransition3 * 0.2 + uTransition2 * 0.1, vWorldPos.z));
  alpha *= dottedMask;
  alpha *= fade;
  alpha *= uAlpha * uAlpha;
  alpha *= 0.75;
  gl_FragColor = vec4(color, alpha);
}`
const NUM_VERT = /* glsl */ `${HEAD}${VERT_LIB}
varying vec2 vUv;
varying vec3 vPos;
void main() {
  vUv = uv;
  initMode();
  float aspect = uResolution.x / uResolution.y;
  aspect = mix(aspect, 1.0, uTransition1);
  float containerAspect = 1.77;
  float pad = 0.1;
  vec3 localPos = position;
  localPos.x /= aspect * 0.5;
  vec4 fs = vec4(localPos / vec3(containerAspect, 1.0, 1.0) * (2.0 - pad), 1.0);
  vec4 worldPos = vec4(position, 1.0);
  vPos = worldPos.xyz;
  finish(modelMatrix * worldPos, fs);
}`
const NUM_FRAG = /* glsl */ `${HEAD}
uniform sampler2D tMap;
varying vec2 vUv;
varying vec3 vPos;
float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec2 uv = vUv;
  uv.x = fract(uv.x * 4.0);
  float charOffset = floor(vUv.x * 4.0) / 4.0;
  float charOffsetWorld = charOffset + floor(vPos.y * 4.0) * 3.14;
  charOffsetWorld += floor(vPos.x * 4.0) * 7.89;
  float randOffset = rand(vec2(charOffset, charOffsetWorld));
  uv.x /= 2.0;
  vec3 color = vec3(1.0);
  float alpha = mix(1.0, 0.25, uTransition2);
  alpha = mix(alpha, 1.0, uTransition3);
  alpha *= smoothstep(0.0, 0.75, uTransition1);
  alpha *= uAlpha;
  float animOffset = sin(uTime * 6.14 + randOffset * 2.0 + charOffset * 2.0) * 0.5 + 0.5;
  animOffset = floor(animOffset * 2.0);
  uv.x += 0.5 * animOffset;
  alpha *= texture2D(tMap, uv).r;
  float mask = 1.0 - charOffset;
  mask += sin(uTime * 0.74 + floor(vPos.x * 3.0 + vPos.y * 4.0) * 3.14) * 0.5;
  mask += sin(uTime * 1.45 + floor(vPos.x * 3.0 + vPos.y * 4.0) * 1.43) * 0.5;
  mask += 0.5;
  mask = pow(mask, 2.0);
  mask = floor(mask);
  mask = clamp(mask, 0.0, 1.0);
  alpha *= mask;
  float d = length(dFdx(uv));
  d = max(d, length(dFdy(uv)));
  alpha -= step(0.2, d);
  alpha = clamp(alpha, 0.0, 1.0);
  gl_FragColor = vec4(color, alpha);
}`
const SQUARE_VERT = /* glsl */ `${HEAD}${VERT_LIB}
attribute vec3 offset;
void main() {
  initMode();
  float containerAspect = 1.77;
  float pad = 0.1;
  vec3 localPos = position;
  float a = 1.0;
  a += sin(uTime * 2.74 + floor(offset.x * 3.0 + offset.y * 4.0) * 3.14) * 0.5;
  a += sin(uTime * 3.45 + floor(offset.x * 3.0 + offset.y * 4.0) * 1.43) * 0.5;
  a += 0.5;
  a = pow(a, 2.0);
  a = floor(a);
  a = clamp(a, 0.0, 1.0);
  a *= 3.14159 * 0.25;
  localPos.xy = rotate2d(a) * localPos.xy;
  vec4 fs = vec4((localPos * 1.25 * vec3(1.0 / containerAspect, 1.0, 1.0) + offset / vec3(containerAspect, 1.0, 1.0) * (2.0 - pad)), 1.0);
  vec4 worldPos = vec4(localPos, 1.0);
  worldPos.xyz += offset;
  finish(modelMatrix * worldPos, fs);
}`
const SKY_VERT = /* glsl */ `void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`
const SKY_FRAG = /* glsl */ `uniform float uColorMix; void main() { gl_FragColor = vec4(mix(vec3(1.0), vec3(0.0), uColorMix), 1.0); }`

// module 667997: closed rounded rectangle outline
function roundedRect({ count = 256, radius = 0.075, width = 1, height = 1 } = {}) {
  const out: number[] = []
  const c = { x: -radius, y: -radius }
  let first: number[] = []
  for (let i = 0; i < count; i++) {
    if (i === (count / 4) * 1) c.x -= width - 2 * radius
    if (i === (count / 4) * 2) c.y -= height - 2 * radius
    if (i === (count / 4) * 3) c.x += width - 2 * radius
    const u = (i / count) * Math.PI * 2
    const x = Math.cos(u) * radius + c.x + 0.5 * width
    const y = Math.sin(u) * radius + c.y + 0.5 * height
    out.push(x, y, 0)
    if (i === 0) first = [x, y, 0]
  }
  out.push(...first)
  return out
}

// module 637160: arrow glyph (cornerRadius .1, cornerResolution 7, unit box)
function arrowGlyph(cornerRadius = 0.1, res = 7, width = 1, height = 1) {
  const out: number[] = []
  const p = { x: 0, y: 0, z: 0 }
  let start = { ...p }
  p.y -= 0.175 * height
  p.x -= 0.175 * width
  p.x += 0.5 * width
  p.y -= 0.5 * height - cornerRadius
  let c = { ...p }
  c.x -= cornerRadius
  for (let i = 0; i < res; i++) {
    const a = (i / (res - 1)) * Math.PI * 0.75 - 0.75 * Math.PI
    p.x = Math.cos(a) * cornerRadius + c.x
    p.y = Math.sin(a) * cornerRadius + c.y
    out.push(p.x, p.y, p.z)
    if (i === 0) start = { ...p }
  }
  p.y += 0.5 * height - cornerRadius
  out.push(p.x, p.y, p.z)
  p.y += 0.5 * height - cornerRadius
  c = { ...p }
  c.x -= cornerRadius
  for (let i = 0; i < res; i++) {
    const a = (i / (res - 1)) * Math.PI * 0.5
    p.x = Math.cos(a) * cornerRadius + c.x
    p.y = Math.sin(a) * cornerRadius + c.y
    out.push(p.x, p.y, p.z)
  }
  p.x -= 0.5 * width - cornerRadius
  out.push(p.x, p.y, p.z)
  p.x -= 0.5 * width - cornerRadius
  c = { ...p }
  c.y -= cornerRadius
  for (let i = 0; i < res; i++) {
    const a = (i / (res - 1)) * Math.PI * 0.75 + 0.5 * Math.PI
    p.x = Math.cos(a) * cornerRadius + c.x
    p.y = Math.sin(a) * cornerRadius + c.y
    out.push(p.x, p.y, p.z)
  }
  out.push(start.x, start.y, start.z)
  return out
}

// Scale loads textures/numbers.png; the same two-glyph atlas is drawn here (read through the red channel).
function numbersTexture() {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 64
  const x = c.getContext('2d')
  if (x) {
    x.fillStyle = '#000'
    x.fillRect(0, 0, 128, 64)
    x.fillStyle = '#fff'
    x.font = '56px ui-monospace, Menlo, monospace'
    x.textAlign = 'center'
    x.textBaseline = 'middle'
    x.fillText('0', 32, 34)
    x.fillText('1', 96, 34)
  }
  const t = new THREE.CanvasTexture(c)
  t.generateMipmaps = false
  t.minFilter = THREE.LinearFilter
  return t
}

const mapClamp = (v: number, a: number, b: number, c: number, d: number) => {
  const r = ((v - a) * (d - c)) / (b - a) + c
  return Math.min(Math.max(r, Math.min(c, d)), Math.max(c, d))
}

export function createHeroScene(container: HTMLElement, opts: HeroSceneOptions) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(23, 1, 0.01, 200)
  camera.position.set(0, 0, 5)
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch {
    opts.onFrameReady()
    return () => {}
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  container.appendChild(renderer.domElement)

  const common = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uHomeHeroPullApartBand: { value: 0 },
    uHomeHeroPhoneSceneY: { value: 0 },
    uHomeHeroTabletSceneY: { value: 0 },
    uHomeHeroTabletSceneScale: { value: 1 },
  }
  const t1 = { value: 0 }
  const t2 = { value: 0 }
  const t3 = { value: 0 }
  const alpha = { value: 1 }
  const colorMix = { value: 0 }
  const zoom = { value: 1 }
  const shared = { ...common, uColorMix: colorMix, uAlpha: alpha, uTransition1: t1, uTransition2: t2, uTransition3: t3 }

  // packed frame -------------------------------------------------------------------------------------------------
  const src = opts.source ?? {}
  let frameTex: THREE.Texture
  let video: HTMLVideoElement | null = null
  let drawCanvas: { ctx: CanvasRenderingContext2D; w: number; h: number; draw: NonNullable<HeroFrameSource['draw']> } | null = null
  if (src.video) {
    video = document.createElement('video')
    video.src = src.video
    video.autoplay = true
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.preload = 'auto'
    video.style.cssText = 'height:0;visibility:hidden'
    document.body.appendChild(video)
    video.play().catch(() => {})
    frameTex = new THREE.VideoTexture(video)
    const ready = () => {
      if ((video?.readyState ?? 0) >= HTMLMediaElement.HAVE_FUTURE_DATA && (video?.currentTime ?? 0) >= 0.08) {
        video?.removeEventListener('timeupdate', ready)
        opts.onFrameReady()
      }
    }
    video.addEventListener('timeupdate', ready)
  } else {
    const c = document.createElement('canvas')
    c.width = src.width ?? 1280
    c.height = src.height ?? 720
    const ctx = c.getContext('2d') as CanvasRenderingContext2D
    const draw = src.draw ?? ((x, w, h) => { x.fillStyle = '#111'; x.fillRect(0, 0, w, h) })
    draw(ctx, c.width, c.height, 0)
    drawCanvas = { ctx, w: c.width, h: c.height, draw }
    const tex = new THREE.CanvasTexture(c)
    tex.generateMipmaps = false
    tex.minFilter = THREE.LinearFilter
    frameTex = tex
    requestAnimationFrame(() => opts.onFrameReady())
  }
  const numbers = numbersTexture()

  // scene graph ---------------------------------------------------------------------------------------------------
  const geos: THREE.BufferGeometry[] = []
  const mats: THREE.Material[] = []
  const g = <T extends THREE.BufferGeometry>(x: T) => (geos.push(x), x)
  const m = (o: THREE.ShaderMaterialParameters) => {
    const mat = new THREE.ShaderMaterial(o)
    mats.push(mat)
    return mat
  }

  const sky = new THREE.Mesh(g(new THREE.SphereGeometry()), m({ uniforms: { uColorMix: colorMix }, vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, side: THREE.BackSide, depthTest: false, depthWrite: false }))
  sky.renderOrder = -1000
  const setSky = (w: number, h: number) => sky.scale.setScalar(40 * Math.max(1, (Math.max(1, w) / Math.max(1, h)) * 0.55 + 1.05))

  const frameGeo = g(new THREE.BufferGeometry())
  frameGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(roundedRect()), 3))
  const frameUniforms = { ...shared, uContainerAspect: { value: 1.77 } }
  const frameMat = (f: string) => m({ uniforms: frameUniforms, vertexShader: FRAME_VERT, fragmentShader: f, transparent: true })
  const mFront = frameMat(F_FRONT)
  const mFrontEcho = frameMat(F_FRONT_ECHO)
  const mBack = frameMat(F_BACK)
  const mBackEcho = frameMat(F_BACK_ECHO)

  const group = new THREE.Group()
  const lineAt = (mat: THREE.Material, z: number, order: number) => {
    const l = new THREE.Line(frameGeo, mat)
    l.position.z = z
    l.renderOrder = order
    group.add(l)
  }
  const plane = g(new THREE.PlaneGeometry(1, 1))
  const image = new THREE.Mesh(plane, m({
    uniforms: { ...shared, tMap: { value: frameTex }, uImageIntroZoom: zoom },
    vertexShader: planeVert('24.0', '16.0', 'vFrameOffset = dot(texture2D(tMap, vec2(1.0, 1.0)).rg, vec2(1.0, -1.0));'),
    fragmentShader: IMAGE_FRAG,
    transparent: true,
    depthTest: false,
  }))
  image.renderOrder = 0
  group.add(image)
  lineAt(mFront, 0.5, 1)
  lineAt(mFrontEcho, 0.4, 2)
  lineAt(mFrontEcho, 0.3, 3)
  lineAt(mBack, -0.5, 4)
  lineAt(mBackEcho, -0.4, 5)
  lineAt(mBackEcho, -0.3, 6)

  const outlineUniforms = { ...shared, tMap: { value: frameTex } }
  const outlineVert = planeVert('33.0', '33.0')
  const outline = m({ uniforms: outlineUniforms, vertexShader: outlineVert, fragmentShader: outlineFrag(false), transparent: true, depthTest: false })
  const outlineEcho = m({ uniforms: outlineUniforms, vertexShader: outlineVert, fragmentShader: outlineFrag(true), transparent: true, depthTest: false })
  const addPlane = (mat: THREE.Material, z: number, order: number) => {
    const p = new THREE.Mesh(plane, mat)
    p.position.z = z
    p.renderOrder = order
    group.add(p)
  }
  addPlane(outline, 0.5, 10)
  addPlane(outlineEcho, 0.4, 11)
  addPlane(outlineEcho, 0.3, 12)

  // 30 random anchors shared by the arrows and the connecting lines
  const anchors: number[] = []
  for (let i = 0; i < 30; i++) anchors.push((2 * Math.random() - 1) * 0.5, (2 * Math.random() - 1) * 0.5, 0)
  const glyph = arrowGlyph()
  const arrowPos: number[] = []
  const arrowOff: number[] = []
  for (let i = 0; i < anchors.length / 3; i++) {
    const [a, b, c] = [anchors[3 * i], anchors[3 * i + 1], anchors[3 * i + 2]]
    for (let k = 0; k < glyph.length / 3 - 1; k++) {
      arrowPos.push(glyph[3 * k], glyph[3 * k + 1], glyph[3 * k + 2], glyph[3 * (k + 1)], glyph[3 * (k + 1) + 1], glyph[3 * (k + 1) + 2])
      arrowOff.push(a, b, c, a, b, c)
    }
  }
  const arrowGeo = g(new THREE.BufferGeometry())
  arrowGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(arrowPos), 3))
  arrowGeo.setAttribute('offset', new THREE.BufferAttribute(new Float32Array(arrowOff), 3))
  const arrowsFront = new THREE.LineSegments(arrowGeo, m({ uniforms: shared, transparent: true, depthTest: false, vertexShader: arrowVert(false), fragmentShader: ARROW_FRONT_FRAG }))
  arrowsFront.position.z = 0.5
  arrowsFront.renderOrder = 8
  const arrowsBack = new THREE.LineSegments(arrowGeo, m({ uniforms: shared, transparent: true, depthTest: false, vertexShader: arrowVert(true), fragmentShader: ARROW_BACK_FRAG }))
  arrowsBack.position.z = -0.5
  arrowsBack.renderOrder = 9

  const linkPos: number[] = []
  const linkOff: number[] = []
  for (let i = 0; i < anchors.length / 3; i++) {
    for (let k = 0; k < 32; k++) {
      linkPos.push(0, 0, -k / 32, 0, 0, -(k + 1) / 32)
      const a = anchors[3 * i]
      const b = anchors[3 * i + 1]
      linkOff.push(a, b, 0, a, b, 0)
    }
  }
  const linkGeo = g(new THREE.BufferGeometry())
  linkGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linkPos), 3))
  linkGeo.setAttribute('offset', new THREE.BufferAttribute(new Float32Array(linkOff), 3))
  const links = new THREE.LineSegments(linkGeo, m({ uniforms: shared, transparent: true, depthTest: false, vertexShader: LINK_VERT, fragmentShader: LINK_FRAG }))
  links.renderOrder = 7

  const numGeos: THREE.BufferGeometry[] = []
  for (let a = 0; a < 4; a++)
    for (let b = 0; b < 4; b++) {
      const p = new THREE.PlaneGeometry()
      p.scale(0.06, 0.015, 1)
      p.translate((a / 4 - 0.375) * 1.6815, (b / 4 - 0.375) * 1.0125, 0)
      p.translate(0.075, 0.045, 0)
      numGeos.push(p)
    }
  const numMerged = g(mergeGeometries(numGeos))
  numGeos.forEach((p) => p.dispose())
  const nums = new THREE.Mesh(numMerged, m({ uniforms: { ...shared, tMap: { value: numbers } }, transparent: true, depthTest: false, vertexShader: NUM_VERT, fragmentShader: NUM_FRAG }))
  nums.position.z = -0.5
  nums.renderOrder = 13

  const sqPos: number[] = []
  const sqOff: number[] = []
  const sq = roundedRect({ width: 0.05, height: 0.05, radius: 0.01 })
  for (let a = 0; a < 4; a++)
    for (let b = 0; b < 4; b++) {
      const ox = (a / 4 - 0.375) * 1.6815
      const oy = (b / 4 - 0.375) * 1
      for (let k = 0; k < sq.length / 3 - 1; k++) {
        for (const f of [0, 0.1, 0.2]) {
          sqPos.push(sq[3 * k], sq[3 * k + 1], sq[3 * k + 2], sq[3 * k + 3], sq[3 * k + 4], sq[3 * k + 5])
          sqOff.push(ox, oy, f, ox, oy, f)
        }
      }
    }
  const sqGeo = g(new THREE.BufferGeometry())
  sqGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(sqPos), 3))
  sqGeo.setAttribute('offset', new THREE.BufferAttribute(new Float32Array(sqOff), 3))
  const squares = new THREE.LineSegments(sqGeo, m({ uniforms: shared, transparent: true, depthTest: false, vertexShader: SQUARE_VERT, fragmentShader: F_BACK_ECHO }))
  squares.position.z = -0.5
  squares.renderOrder = 14

  group.add(links, arrowsFront, arrowsBack, nums, squares)
  group.rotation.y = -(0.2 * Math.PI)
  group.scale.z = 0
  scene.add(sky, group)

  // camera rig (19490 + the runtime's OrbitControls.update, which keeps it aimed at the origin) --------------------
  let size = { w: Math.max(1, container.clientWidth || innerWidth), h: Math.max(1, container.clientHeight || innerHeight) }
  const rig = new THREE.Group()
  rig.position.set(0, 0, 5)
  rig.add(camera)
  scene.add(rig)
  const isBand = () => size.w <= 1449
  const isTablet = (w: number) => w >= 768 && w <= 1449
  const bandPx = (h: number, f: number) => Math.max(1, h * f - 32)
  const minZoom = Math.tan(0.5 * 23 * (Math.PI / 180)) / Math.tan(0.5 * 58 * (Math.PI / 180))
  const gaze = () => {
    const { w, h } = size
    if (!isBand()) return { w, h, zoom: 1, span: w, band: h }
    if (w <= 767 || isTablet(w)) {
      const band = bandPx(h, w <= 767 ? 0.45 : 0.5)
      const t = Math.min(w, band)
      return { w: t, h: t, zoom: Math.max(t / w, minZoom), span: t, band }
    }
    const o = Math.min(w, h)
    return { w: o, h: o, zoom: Math.max(o / w, minZoom), span: o, band: o }
  }
  let gz = gaze()
  const pointer = { x: size.w * 0.5, y: size.h * 0.5 }
  const recenter = () => {
    if (size.w <= 767 || isTablet(size.w)) {
      pointer.x = 0.5 * gz.span
      pointer.y = 0.5 * gz.band
    }
  }
  const applyLayout = () => {
    common.uHomeHeroPullApartBand.value = matchMedia('(max-width: 1449px)').matches ? 1 : 0
    common.uHomeHeroPhoneSceneY.value = size.w <= 767 ? 0.7 : 0
    common.uHomeHeroTabletSceneY.value = isTablet(size.w) ? 0.7 : 0
    common.uHomeHeroTabletSceneScale.value = isTablet(size.w) ? 1.2 : 1
    gz = gaze()
    camera.zoom = gz.zoom
    camera.updateProjectionMatrix()
  }
  applyLayout()
  recenter()
  setSky(size.w, size.h)

  const onPointer = (e: PointerEvent | TouchEvent) => {
    const p = 'touches' in e && e.touches.length ? e.touches[0] : (e as PointerEvent)
    const x = p.clientX
    const y = p.clientY
    if (isBand()) {
      pointer.x = Math.min(gz.span, Math.max(0, x - (size.w - gz.span) * 0.5))
      pointer.y = Math.min(gz.band, Math.max(0, y))
    } else {
      pointer.x = x
      pointer.y = y
    }
  }
  window.addEventListener('pointermove', onPointer, { passive: true })
  window.addEventListener('touchmove', onPointer, { passive: true })

  // scroll timeline ---------------------------------------------------------------------------------------------
  const tl = gsap.timeline({ paused: true })
  tl.fromTo(group.rotation, { y: -0.6 }, { y: -1, duration: 1, ease: 'none' }, 0)
  tl.to(colorMix, { value: 1, duration: 0.1, ease: 'cubic.inOut' }, 0)
  tl.to(t1, { value: 1, duration: 0.2, ease: 'cubic.inOut' }, 0)
  tl.to(group.scale, { z: 1, duration: 0.1, ease: 'sine.inOut' }, 0)
  const tween = (o: { value: number }, value: number) => gsap.to(o, { value, duration: 1, ease: 'cubic.inOut' })
  tl.call(() => { tween(t2, 0) }, undefined, 0.05)
  tl.call(() => { tween(t2, 0); tween(t3, 0) }, undefined, 0.299)
  tl.call(() => { tween(t2, 1); tween(t3, 0) }, undefined, 0.3)
  tl.call(() => { tween(t2, 1); tween(t3, 0) }, undefined, 0.599)
  tl.call(() => { tween(t3, 1) }, undefined, 0.6)
  tl.fromTo(alpha, { value: 1 }, { value: 0, duration: 0.2, ease: 'cubic.inOut' }, 0.8)
  tl.set({}, {}, 1)
  tl.progress(0.01)

  const vis = [false, false, false]
  let heading = true
  let prevProgress: number | undefined
  let lastY: number | undefined
  const setVis = (i: number, on: boolean) => {
    if (vis[i] === on) return
    vis[i] = on
    opts.onSectionVisible(i, on)
  }
  const applySections = (p: number, prev: number | undefined) => {
    setVis(0, p >= 0.1 && p < 0.3)
    setVis(1, p >= 0.3 && p < 0.6)
    setVis(2, p >= 0.6 && p < (prev !== undefined && p < prev ? 0.997 : 0.85))
  }
  const applyHeading = (p: number) => {
    const show = p <= 0.035
    if (show !== heading) {
      heading = show
      opts.onHeading(show)
    }
  }
  const progressAt = (y: number) => Math.min(1, Math.max(0, y / Math.max(1, innerHeight * (matchMedia('(max-width: 768px)').matches ? 2.15 : 4.7))))

  // runtime -----------------------------------------------------------------------------------------------------
  const resize = () => {
    size = { w: Math.max(1, container.clientWidth), h: Math.max(1, container.clientHeight) }
    camera.aspect = size.w / size.h
    camera.updateProjectionMatrix()
    renderer.setSize(size.w, size.h, true)
    applyLayout()
    recenter()
    setSky(size.w, size.h)
    const p = progressAt(scrollY)
    tl.progress(p)
    applySections(p, prevProgress)
    prevProgress = p
    lastY = scrollY
    applyHeading(p)
  }
  let resizeTimer: ReturnType<typeof setTimeout> | undefined
  const debounced = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(resize, 200)
  }
  camera.aspect = size.w / size.h
  camera.updateProjectionMatrix()
  renderer.setSize(size.w, size.h, true)
  common.uResolution.value.set(size.w, size.h)
  window.addEventListener('resize', debounced)

  const clock = new THREE.Timer()
  const move = new THREE.Vector3()
  const origin = new THREE.Vector3()
  let drawn = -1
  const tick = () => {
    clock.update()
    const seconds = clock.getElapsed()
    common.uTime.value = seconds
    common.uResolution.value.set(size.w, size.h)
    if (drawCanvas && !document.hidden && seconds - drawn >= 1 / 30) {
      drawn = seconds
      drawCanvas.draw(drawCanvas.ctx, drawCanvas.w, drawCanvas.h, seconds)
      frameTex.needsUpdate = true
    }
    const strength = mapClamp(t1.value, 0.2, 1, 0, 0.15)
    move.set(mapClamp(pointer.x, 0, gz.w, -1, 1) * strength * 4, mapClamp(pointer.y, 0, gz.h, -1, 1) * strength * 2, 0)
    camera.position.lerp(move, 0.06)
    camera.lookAt(origin)
    const y = scrollY
    if (y !== lastY) {
      lastY = y
      const p = progressAt(y)
      tl.progress(p)
      applySections(p, prevProgress)
      prevProgress = p
      applyHeading(p)
    }
    renderer.render(scene, camera)
  }
  let running = false
  const io = new IntersectionObserver(([e]) => {
    const on = !!e?.isIntersecting
    if (on === running) return
    running = on
    if (on) gsap.ticker.add(tick)
    else gsap.ticker.remove(tick)
  }, { threshold: 0 })
  io.observe(container)

  return () => {
    io.disconnect()
    clearTimeout(resizeTimer)
    window.removeEventListener('resize', debounced)
    window.removeEventListener('pointermove', onPointer)
    window.removeEventListener('touchmove', onPointer)
    gsap.ticker.remove(tick)
    gsap.killTweensOf([t1, t2, t3, alpha, colorMix, zoom])
    tl.kill()
    geos.forEach((x) => x.dispose())
    mats.forEach((x) => x.dispose())
    frameTex.dispose()
    numbers.dispose()
    clock.dispose()
    renderer.dispose()
    renderer.domElement.remove()
    if (video) {
      video.pause()
      video.removeAttribute('src')
      video.load()
      video.remove()
    }
  }
}
