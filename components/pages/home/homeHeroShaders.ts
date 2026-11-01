// Scale module 140914 (chunk 0hh8x7qynpa7m.js): the hero's GLSL, verbatim. PRE repeats in each of Scale's strings.
const PRE = `uniform float uTime;
uniform float uDelta;
uniform vec2 uResolution;
uniform float uDPR;
/** 1 when home hero pull-apart is in band layout (max-width 3xl); set from \`homeHeroScene\` only. */
uniform float uHomeHeroPullApartBand;
/** Phone-only clip-space Y add for pull-apart scene verts (\`finalPos.y\`); set from \`homeHeroScene\`. */
uniform float uHomeHeroPhoneSceneY;
/** Tablet (\`md\`–below-\`3xl\`) clip-space Y add; set from \`homeHeroScene\`. */
uniform float uHomeHeroTabletSceneY;
/** Tablet world-space scale at full pull-apart (\`uTransition2\`); set from \`homeHeroScene\`. */
uniform float uHomeHeroTabletSceneScale;

float homeHeroIsPhone(vec2 res) {
  return 1.0 - step(768.0, res.x);
}

float homeHeroIsTablet(vec2 res) {
  return step(768.0, res.x) * (1.0 - step(1450.0, res.x));
}

/** Pull-apart scene Y in clip space (after projection). Tablet band uses \`isMobile=0.8\` — boost Y there. */
float homeHeroPhoneFinalPosY(float transition2, float isMobile) {
  float isPhone = homeHeroIsPhone(uResolution);
  float isTablet = homeHeroIsTablet(uResolution);
  float yReach = isTablet > 0.5 ? 1.0 : isMobile;
  return mix(1.0, 1.95, transition2) * yReach
    + uHomeHeroPhoneSceneY * isPhone
    + uHomeHeroTabletSceneY * isTablet;
}

/** World-space band scale (phone/tablet shrink + tablet product scale). */
void homeHeroScaleBandWorldPos(inout vec3 wp, float transition2, float isMobile, float verticalAspect) {
  float isTablet = homeHeroIsTablet(uResolution);
  float mobilePad = 0.25;
  float t = mix(transition2, 0.0, isMobile);
  wp *= mix(1.0, 0.9, t);
  wp = mix(wp, wp / (verticalAspect + mobilePad), isMobile);
  wp *= mix(1.0, uHomeHeroTabletSceneScale, isTablet * transition2);
}
`

export const LINE_VERTEX = PRE + `uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uAlpha;
uniform float uContainerAspect;

float cubicInOut(float t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

mat2 rotate2d(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, s, -s, c);
}

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

void main() {
  float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
  float isDesktop = 1.0 - isMobile;
  if(uResolution.x >= 768.0 && uResolution.x < 1450.0) {
    isMobile = 0.8; 
    isDesktop = 0.0;
  }
  // Full desktop lateral only at 3xl+; band layout matches \`readHomeHeroPullApartMobileLayout\` via uniform.
  float wideDesktopLateral = isDesktop * (1.0 - uHomeHeroPullApartBand);
  float containerAspect = uContainerAspect;
  float aspect = uResolution.x / uResolution.y;
  float verticalAspect = uResolution.y / uResolution.x;

  // full screen vertex pos
  vec4 fullScreenPos = vec4(position, 1.0);
  float heightPx = 1.0 / uResolution.y * 2.0;
  float widthPx = 1.0 / uResolution.x * 2.0;
  float borderPad = mix(33.0, 24.0, isMobile);
  float padx = borderPad * widthPx;
  float pady = borderPad * heightPx;
  // Scale leaves isMobile at 0.8 here, so its frame starts at 75px between 768 and 1449 and the 88px header
  // cuts the rounded top. We keep 88 at those widths; phone stays 72.
  float navBarPad = mix(88.0, 72.0, step(0.9, isMobile)) * heightPx;

  float sideMask = step(0.0, position.x) * 2.0 - 1.0;
  float upMask = step(0.0, position.y);
  float downMask = 1.0 - upMask;

  fullScreenPos.x -= 0.5 * sideMask; 
  fullScreenPos.x /= aspect;
  fullScreenPos.x += (sideMask - padx * sideMask);

  fullScreenPos.y += upMask * (0.5 - navBarPad);
  fullScreenPos.y -= downMask * (0.5 - pady);

  vec4 worldPos = vec4(position, 1.0);
  worldPos.x -= sideMask * 0.5;
  worldPos.x += containerAspect * sideMask * 0.5;
  worldPos = modelMatrix * worldPos;

  // final scene pos
  vec4 finalPos = vec4(position, 1.0);

  homeHeroScaleBandWorldPos(worldPos.xyz, uTransition2, isMobile, verticalAspect);

  // tilt
  float angle = mix(0.0, 0.35, uTransition2);
  worldPos.yz = rotate2d(angle) * worldPos.yz;

  finalPos = projectionMatrix * viewMatrix * worldPos;
  finalPos.x += uTransition2 * 1.4 * (1.0 - uTransition3) * wideDesktopLateral;
  finalPos.x -= uTransition3 * 1.5 * wideDesktopLateral;
  // finalPos.y += uTransition1 * 0.2 * isDesktop;

  finalPos.y += homeHeroPhoneFinalPosY(uTransition2, isMobile);

  gl_Position = mix(fullScreenPos, finalPos, uTransition1);

  // scale to fit within top/bottom padding
  gl_Position = mix(gl_Position, verticallyCenter(gl_Position, 88.0, 250.0, uResolution), uTransition1 * (1.0 - uTransition2) * wideDesktopLateral);

}
`

export const PLANE_VERTEX = PRE + `uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;

varying vec2 vUv;
varying float vNavBarPad;

float cubicInOut(float t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

mat2 rotate2d(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, s, -s, c);
}

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

void main() {
  vUv = uv;
  float containerAspect = 1.77;
  float aspect = uResolution.x / uResolution.y;
  float verticalAspect = uResolution.y / uResolution.x;

  // full screen vertex pos
  vec4 fullScreenPos = vec4(position, 1.0);
  float heightPx = 1.0 / uResolution.y * 2.0;
  float widthPx = 1.0 / uResolution.x * 2.0;
  float padx = 33.0 * widthPx;
  float pady = 33.0 * heightPx;
  float navBarPad = 88.0 * heightPx;

  vNavBarPad = navBarPad;

  float sideMask = step(0.0, position.x) * 2.0 - 1.0;
  float upMask = step(0.0, position.y);
  float downMask = 1.0 - upMask;

  fullScreenPos.x -= 0.5 * sideMask; 
  fullScreenPos.x /= aspect;
  fullScreenPos.x += (sideMask - padx * sideMask);

  fullScreenPos.y += upMask * (0.5 - navBarPad);
  fullScreenPos.y -= downMask * (0.5 - pady);

  // final scene pos
  vec4 finalPos = vec4(position, 1.0);
  finalPos.x *= containerAspect;

  vec4 worldPos = modelMatrix * finalPos;

  float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
  float isDesktop = 1.0 - isMobile;
  if(uResolution.x >= 768.0 && uResolution.x < 1450.0) {
    isMobile = 0.8; 
    isDesktop = 0.0;
  }
  float wideDesktopLateral = isDesktop * (1.0 - uHomeHeroPullApartBand);
  homeHeroScaleBandWorldPos(worldPos.xyz, uTransition2, isMobile, verticalAspect);

  // tilt
  float angle = mix(0.0, 0.35, uTransition2);
  worldPos.yz = rotate2d(angle) * worldPos.yz;

  finalPos = projectionMatrix * viewMatrix * worldPos;
  finalPos.x += uTransition2 * 1.4 * (1.0 - uTransition3) * wideDesktopLateral;
  finalPos.x -= uTransition3 * 1.5 * wideDesktopLateral;
  // finalPos.y += uTransition1 * 0.2 * isDesktop;

  finalPos.y += homeHeroPhoneFinalPosY(uTransition2, isMobile);

  gl_Position = mix(fullScreenPos, finalPos, uTransition1);

  // scale to fit within top/bottom padding
  gl_Position = mix(gl_Position, verticallyCenter(gl_Position, 88.0, 250.0, uResolution), uTransition1 * (1.0 - uTransition2) * wideDesktopLateral);

}
`

export const SPHERE_VERTEX = PRE + `void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const SPHERE_FRAGMENT = PRE + `uniform float uAlpha;
uniform float uColorMix;

varying vec2 vUv;
void main() {
  vec3 color = mix(vec3(1.0), vec3(0.0), uColorMix);

  gl_FragColor = vec4(color, 1.0);
}
`

export const LINE_FRAGMENT_FRONT = PRE + `uniform float uAlpha;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uColorMix;

void main() {
    vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);

    float fullScreenTransitionFade = smoothstep(0.0, 0.3, uTransition1);

    float alpha = 1.0;

    // animated transitions
    alpha = mix(alpha, 0.25, uTransition3);

    // adjustments
    alpha *= fullScreenTransitionFade;
    alpha *= 0.75;

    alpha *= uAlpha;

    gl_FragColor = vec4(color, alpha);
}
`

export const LINE_FRAGMENT_BACK = PRE + `uniform float uAlpha;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uColorMix;

void main() {
    vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);

    float fullScreenTransitionFade = smoothstep(0.0, 0.3, uTransition1);

    float alpha = 1.0;

    // animated transitions
    alpha = mix(1.0, 0.25, uTransition2);
    alpha = mix(alpha, 1.0, uTransition3);

    // adjustments
    alpha *= fullScreenTransitionFade;

    alpha *= 0.75;
    
    alpha *= uAlpha;

    gl_FragColor = vec4(color, alpha);
}
`

export const LINE_FRAGMENT_THIRD = PRE + `uniform float uAlpha;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uColorMix;

void main() {
    vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);

    float fullScreenTransitionFade = smoothstep(0.0, 0.3, uTransition1);

    // composite alpha
    float alpha = 1.0;
    alpha *= fullScreenTransitionFade;
    alpha *= uAlpha;
    alpha *= uTransition3;

    alpha *= 0.25;

    alpha *= uAlpha;

    gl_FragColor = vec4(color, alpha);
}
`

export const LINE_FRAGMENT_MID = PRE + `uniform float uAlpha;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uColorMix;

void main() {
    vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);

    float fullScreenTransitionFade = smoothstep(0.0, 0.3, uTransition1);

    // composite alpha
    float alpha = 1.0;
    alpha *= fullScreenTransitionFade;
    alpha *= uTransition2;
    alpha *= (1.0 - uTransition3);

    alpha *= 0.25;
    
    alpha *= uAlpha;

    gl_FragColor = vec4(color, alpha);
}
`

export const VIDEO_VERTEX = PRE + `uniform sampler2D tMap;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;

varying vec2 vUv;
varying float vNavBarPad;
varying float vFrameOffset;

float cubicInOut(float t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

mat2 rotate2d(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, s, -s, c);
}

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

void main() {
  vUv = uv;
  float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
  float isDesktop = 1.0 - isMobile;
  if(uResolution.x >= 768.0 && uResolution.x < 1450.0) {
    isMobile = 0.8; 
    isDesktop = 0.0;
  }
  float wideDesktopLateral = isDesktop * (1.0 - uHomeHeroPullApartBand);

  float containerAspect = 1.77;
  float aspect = uResolution.x / uResolution.y;
  float verticalAspect = uResolution.y / uResolution.x;

  // calculate left/right offset
  vFrameOffset = dot(texture2D(tMap, vec2(1.0, 1.0)).rg, vec2(1.0, -1.0));

  // full screen vertex pos
  vec4 fullScreenPos = vec4(position, 1.0);
  float heightPx = 1.0 / uResolution.y * 2.0;
  float widthPx = 1.0 / uResolution.x * 2.0;
  float borderPad = mix(24.0, 16.0, isMobile);
  float padx = borderPad * widthPx;
  float pady = borderPad * heightPx;
  // Scale leaves isMobile at 0.8 here, so its frame starts at 75px between 768 and 1449 and the 88px header
  // cuts the rounded top. We keep 88 at those widths; phone stays 72.
  float navBarPad = mix(88.0, 72.0, step(0.9, isMobile)) * heightPx;

  vNavBarPad = navBarPad;

  float sideMask = step(0.0, position.x) * 2.0 - 1.0;
  float upMask = step(0.0, position.y);
  float downMask = 1.0 - upMask;

  fullScreenPos.x -= 0.5 * sideMask; 
  fullScreenPos.x /= aspect;
  fullScreenPos.x += (sideMask - padx * sideMask);

  fullScreenPos.y += upMask * (0.5 - navBarPad);
  fullScreenPos.y -= downMask * (0.5 - pady);

  // final scene pos
  vec4 finalPos = vec4(position, 1.0);
  finalPos.x *= containerAspect;

  
  vec4 worldPos = modelMatrix * finalPos;
  homeHeroScaleBandWorldPos(worldPos.xyz, uTransition2, isMobile, verticalAspect);

  float angle = mix(0.0, 0.35, uTransition2);
  worldPos.yz = rotate2d(angle) * worldPos.yz;

  finalPos = projectionMatrix * viewMatrix * worldPos;
  finalPos.x += uTransition2 * 1.4 * (1.0 - uTransition3) * wideDesktopLateral;
  finalPos.x -= uTransition3 * 1.5 * wideDesktopLateral;
  // finalPos.y += uTransition1 * 0.2 * isDesktop;

  finalPos.y += homeHeroPhoneFinalPosY(uTransition2, isMobile);
  // finalPos.y += mix(1.0, 1.6, uTransition2) * isTablet;

  gl_Position = mix(fullScreenPos, finalPos, uTransition1);

  // scale to fit within top/bottom padding
  gl_Position = mix(gl_Position, verticallyCenter(gl_Position, 88.0, 250.0, uResolution), uTransition1 * (1.0 - uTransition2) * wideDesktopLateral);

}
`

export const VIDEO_FRAGMENT = PRE + `uniform sampler2D tMap;
uniform float uVideoFallback;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uAlpha;
uniform float uImageIntroZoom;

varying vec2 vUv;
varying float vNavBarPad;
varying float vFrameOffset;

float sdRoundedBox( vec2 p, vec2 b, vec4 _r ) {
  vec4 r = vec4(0.0);
  r.xy = (p.x>0.0)?_r.xy : _r.zw;
  r.x  = (p.y>0.0)?_r.x  : _r.y;
  vec2 q = abs(p)-b+r.x;
  return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}

float aastep(float threshold, float value) {
  float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
  return smoothstep(threshold-afwidth, threshold+afwidth, value);
}

void main() {
    
  // scale image to fit depending on aspect ratio
  vec2 uv = vUv;
  uv -= 0.5;
  ivec2 texSize = textureSize(tMap, 0);
  float imageAspect = float(texSize.x) / float(texSize.y);
  float screenAspect = uResolution.x / uResolution.y;
  float containerAspect = uResolution.x / (uResolution.y - vNavBarPad * uResolution.y * 0.5);
  float invContainerAspect = (uResolution.y - vNavBarPad * uResolution.y * 0.5) / uResolution.x;
  float verticalAspect = uResolution.y / uResolution.x;
  bool isPortrait = screenAspect < imageAspect;
  vec2 scale = vec2(
      isPortrait ? 1.0 / verticalAspect / imageAspect : 1.0,
      isPortrait ? 1.0 : invContainerAspect * imageAspect 
  );
  scale = mix(scale, vec2(imageAspect * 0.5, 1.0), uTransition1);
  uv *= scale;
  uv += 0.5;

  if (isPortrait && uVideoFallback > 0.5) {
    uv.x += max(0.0, (1.0 - scale.x) * 0.5);
  }

  // scale for packed video
  uv *= 0.8;

  // left/right offset for mobile
  if (uResolution.y > uResolution.x && uVideoFallback < 0.5) {
    uv.x -= invContainerAspect * 0.5 * 0.2 * vFrameOffset * (1.0 - uTransition1);
  }

  uv = 0.5 + (uv - 0.5) / max(uImageIntroZoom, 0.0001);

  vec3 color = texture2D(tMap, uv).rgb;
  vec3 black = mix(vec3(0.0), vec3(0.2), uTransition1);
  color = mix(color, black, 0.4);

  // blend between corner radius sizes for full screen transition
  float finalCornerRadius = 0.078;
  float screenCornerRadius = 16.0 * (1.0 / uResolution.y);
  finalCornerRadius = mix(screenCornerRadius, finalCornerRadius, uTransition1);

  // blend between aspect ratios for corners so they don't get stretched
  containerAspect = mix(containerAspect, 1.77, uTransition1);

  // create rounded rectangle mask
  float alpha = sdRoundedBox((vUv - 0.5) * vec2(containerAspect, 1.0), vec2(0.5 * containerAspect, 0.5), vec4(finalCornerRadius));
  alpha = 1.0 - aastep(0.0, alpha);

  alpha *= mix(1.0, 0.5, uTransition2);

  alpha *= uAlpha;

  gl_FragColor = vec4(color, alpha);
}
`

export const OUTLINE_FRAGMENT_FRONT = PRE + `uniform sampler2D tMap;
uniform float uVideoFallback;
uniform sampler2D tNoise;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uAlpha;
uniform float uColorMix;

varying vec2 vUv;
varying float vNavBarPad;

float sdRoundedBox( vec2 p, vec2 b, vec4 _r ) {
  vec4 r = vec4(0.0);
  r.xy = (p.x>0.0)?_r.xy : _r.zw;
  r.x  = (p.y>0.0)?_r.x  : _r.y;
  vec2 q = abs(p)-b+r.x;
  return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}

float aastep(float threshold, float value) {
  float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
  return smoothstep(threshold-afwidth, threshold+afwidth, value);
}

float getOutline(vec2 uv, sampler2D tMap)
{   
    ivec2 size = ivec2(textureSize(tMap, 0));
    vec2 offset = 1.0 / vec2(textureSize(tMap, 0));
    offset *= 0.5 * 0.25;

    float miplevel = 0.0;
    float r = texture2D(tMap, uv).r;
    float afwidth = length(vec2(dFdx(r), dFdy(r))) * 0.70710678118654757;
    float scan = 0.5;
    float bcksample = scan - afwidth;
    float fwdsample = scan + afwidth;
    float tl = smoothstep(bcksample, fwdsample, texture2D(tMap, uv + vec2(-1.0, 1.0) * offset).r);
    float tr = smoothstep(bcksample, fwdsample, texture2D(tMap, uv + vec2( 1.0, 1.0) * offset).r);
    float bl = smoothstep(bcksample, fwdsample, texture2D(tMap, uv + vec2(-1.0,  -1.0) * offset).r);
    float br = smoothstep(bcksample, fwdsample, texture2D(tMap, uv + vec2( 1.0,  -1.0) * offset).r);

    float difference_1 = tl - br;
    float difference_2 = tr - bl;
    return sqrt(difference_1*difference_1 + difference_2*difference_2);
}

void main() {
    
    // scale image to fit depending on aspect ratio
    vec2 uv = vUv;
    uv -= 0.5;
    ivec2 texSize = textureSize(tMap, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float screenAspect = uResolution.x / uResolution.y;
    float containerAspect = uResolution.x / (uResolution.y - vNavBarPad * uResolution.y * 0.5);
    float verticalAspect = uResolution.y / uResolution.x;
    bool isPortrait = screenAspect < imageAspect;
    vec2 scale = vec2(
        isPortrait ? 1.0 / verticalAspect / imageAspect : 1.0,
        isPortrait ? 1.0 : verticalAspect * imageAspect
    );
    scale = mix(scale, vec2(imageAspect * 0.5, 1.0), uTransition1);
    uv *= scale;
    uv += 0.5;
    if (isPortrait && uVideoFallback > 0.5) {
      uv.x += max(0.0, (1.0 - scale.x) * 0.5);
    }

    // scale for packed video
    vec2 outlineUv = uv;
    outlineUv *= 0.2;
    outlineUv.y += 0.8;
    float edge = getOutline(outlineUv, tMap);
    edge = clamp(edge * 2.0, 0.0, 1.0);
    // edge *= smoothstep(0.0025, 0.005, 1.0 - length(abs(vUv - 0.5) * 2.0));

    vec3 color = vec3(1.0);

    // blend between corner radius sizes for full screen transition
    float finalCornerRadius = 0.078;
    float screenCornerRadius = 16.0 * (1.0 / uResolution.y);
    finalCornerRadius = mix(screenCornerRadius, finalCornerRadius, uTransition1);

    // blend between aspect ratios for corners so they don't get stretched
    containerAspect = mix(containerAspect, 1.77, uTransition1);

    // create rounded rectangle mask
    float alpha = sdRoundedBox((vUv - 0.5) * vec2(containerAspect, 1.0), vec2(0.5 * containerAspect, 0.5), vec4(finalCornerRadius));
    alpha = 1.0 - aastep(0.0, alpha);
    alpha *= mix(1.0, 0.25, uTransition3);
    alpha *= edge;
    alpha *= uTransition1;

    alpha *= 0.75;

    alpha *= uAlpha;

    gl_FragColor = vec4(color, alpha);
}
`

export const OUTLINE_FRAGMENT_MID = PRE + `uniform sampler2D tMap;
uniform float uVideoFallback;
uniform sampler2D tNoise;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uColorMix;

varying vec2 vUv;
varying float vNavBarPad;

float sdRoundedBox( vec2 p, vec2 b, vec4 _r ) {
  vec4 r = vec4(0.0);
  r.xy = (p.x>0.0)?_r.xy : _r.zw;
  r.x  = (p.y>0.0)?_r.x  : _r.y;
  vec2 q = abs(p)-b+r.x;
  return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}

float aastep(float threshold, float value) {
  float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
  return smoothstep(threshold-afwidth, threshold+afwidth, value);
}

float getOutline(vec2 uv, sampler2D tMap)
{   
    ivec2 size = ivec2(textureSize(tMap, 0));
    vec2 offset = 1.0 / vec2(textureSize(tMap, 0));
    offset *= 0.5 * 0.25;

    float miplevel = 0.0;
    float r = texture2D(tMap, uv).r;
    float afwidth = length(vec2(dFdx(r), dFdy(r))) * 0.70710678118654757;
    float scan = 0.5;
    float bcksample = scan - afwidth;
    float fwdsample = scan + afwidth;
    float tl = smoothstep(bcksample, fwdsample, texture2D(tMap, uv + vec2(-1.0, 1.0) * offset).r);
    float tr = smoothstep(bcksample, fwdsample, texture2D(tMap, uv + vec2( 1.0, 1.0) * offset).r);
    float bl = smoothstep(bcksample, fwdsample, texture2D(tMap, uv + vec2(-1.0,  -1.0) * offset).r);
    float br = smoothstep(bcksample, fwdsample, texture2D(tMap, uv + vec2( 1.0,  -1.0) * offset).r);

    float difference_1 = tl - br;
    float difference_2 = tr - bl;
    return sqrt(difference_1*difference_1 + difference_2*difference_2);
}

void main() {

    if (uTransition2 < 0.0001 || (1.0 - uTransition3) < 0.0001) discard;
    
    // scale image to fit depending on aspect ratio
    vec2 uv = vUv;
    uv -= 0.5;
    ivec2 texSize = textureSize(tMap, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float screenAspect = uResolution.x / uResolution.y;
    float containerAspect = uResolution.x / (uResolution.y - vNavBarPad * uResolution.y * 0.5);
    float verticalAspect = uResolution.y / uResolution.x;
    bool isPortrait = screenAspect < imageAspect;
    vec2 scale = vec2(
        isPortrait ? 1.0 / verticalAspect / imageAspect : 1.0,
        isPortrait ? 1.0 : verticalAspect * imageAspect
    );
    scale = mix(scale, vec2(imageAspect * 0.5, 1.0), uTransition1);
    uv *= scale;
    uv += 0.5;
    if (isPortrait && uVideoFallback > 0.5) {
      uv.x += max(0.0, (1.0 - scale.x) * 0.5);
    }

    // scale for packed video
    vec2 outlineUv = uv;
    outlineUv *= 0.2;
    outlineUv.y += 0.8;
    float edge = getOutline(outlineUv, tMap);
    // edge *= smoothstep(0.0025, 0.005, 1.0 - length(abs(vUv - 0.5) * 2.0));

    vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);

    // blend between corner radius sizes for full screen transition
    float finalCornerRadius = 0.078;
    float screenCornerRadius = 16.0 * (1.0 / uResolution.y);
    finalCornerRadius = mix(screenCornerRadius, finalCornerRadius, uTransition1);

    // blend between aspect ratios for corners so they don't get stretched
    containerAspect = mix(containerAspect, 1.77, uTransition1);

    // create rounded rectangle mask
    float alpha = sdRoundedBox((vUv - 0.5) * vec2(containerAspect, 1.0), vec2(0.5 * containerAspect, 0.5), vec4(finalCornerRadius));
    alpha = 1.0 - aastep(0.0, alpha);
    alpha *= edge;
    alpha *= uTransition1;
    alpha *= uTransition2;
    alpha *= (1.0 - uTransition3);

    alpha *= 0.25;

    gl_FragColor = vec4(color, alpha);
}
`

export const DOTS_FRONT_VERTEX = PRE + `attribute vec3 offset;

uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;

varying float vHeight;
varying float vWorldHeight;
varying float vDist;
varying float vEdgeFade;

vec3 pointOnLine(vec3 a, vec3 b, float t) {
    return a - ((a - b) * t);
}

mat2 rotate2d(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, s, -s, c);
}

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

void main() {
    // full screen position
    float aspect = uResolution.x / uResolution.y;
    aspect = mix(aspect, 1.0, uTransition1);
    float verticalAspect = uResolution.y / uResolution.x;
    float containerAspect = 1.77;

    vec3 animatedOffset = offset;
    animatedOffset.x *= containerAspect;
    animatedOffset.x += uTime * 0.125 * 0.1;
    animatedOffset.x += sin(uTime * 1.314119 + offset.x * 14.7 + offset.y * 3.75) * 0.025;
    animatedOffset.y += sin(uTime * 1.2853 + offset.y * 21.1415 + offset.x * 5.94) * 0.025;
    animatedOffset.x = fract(animatedOffset.x / containerAspect) * containerAspect - containerAspect * 0.5;
    animatedOffset.y = animatedOffset.y + sin(uTime * 0.4 + offset.x * 4.0) * 0.1;
    animatedOffset.y = fract(animatedOffset.y) - 0.5;

    float pad = 0.1;
    float scale = 0.02;
    vec3 localPos = position;
    localPos *= scale;
    localPos.x /= aspect * 0.5;

    vec4 fullScreenPos = vec4((localPos + animatedOffset) / vec3(containerAspect, 1.0, 1.0) * (2.0 - pad), 1.0);

    // final scene position
    vec4 worldPos = vec4(position * scale, 1.0);
    worldPos.xyz += animatedOffset;
    vec3 offsetPos = worldPos.xyz;
    worldPos = modelMatrix * worldPos;

    // final scene pos
    vec4 finalPos = vec4(position, 1.0);

    float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
    float isDesktop = 1.0 - isMobile;
    if(uResolution.x >= 768.0 && uResolution.x < 1450.0) {
      isMobile = 0.8; 
      isDesktop = 0.0;
    }
    float wideDesktopLateral = isDesktop * (1.0 - uHomeHeroPullApartBand);
    homeHeroScaleBandWorldPos(worldPos.xyz, uTransition2, isMobile, verticalAspect);

    // tilt
    float angle = mix(0.0, 0.35, uTransition2);
    worldPos.yz = rotate2d(angle) * worldPos.yz;

    finalPos = projectionMatrix * viewMatrix * worldPos;
    finalPos.x += uTransition2 * 1.4 * (1.0 - uTransition3) * wideDesktopLateral;
    finalPos.x -= uTransition3 * 1.5 * wideDesktopLateral;
    // finalPos.y += uTransition1 * 0.2 * isDesktop;

    finalPos.y += homeHeroPhoneFinalPosY(uTransition2, isMobile);

    gl_Position = mix(fullScreenPos, finalPos, uTransition1);

    vEdgeFade = smoothstep(1.77 * 0.5, 1.5 * 0.5, abs(offsetPos.x));
    vEdgeFade *= smoothstep(1.0, 0.9, abs(offsetPos.y));

    // scale to fit within top/bottom padding
    gl_Position = mix(gl_Position, verticallyCenter(gl_Position, 88.0, 250.0, uResolution), uTransition1 * (1.0 - uTransition2) * wideDesktopLateral);

}
`

export const DOTS_FRONT_FRAGMENT = PRE + `uniform float uAlpha;
uniform vec3 uColor;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uColorMix;

varying float vHeight;
varying float vWorldHeight;
varying float vEdgeFade;

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}

void main() {
    vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);

    float fullScreenTransitionFade = smoothstep(0.0, 0.5, uTransition1);
    
    // composite alpha
    float alpha = 1.0;
    alpha = mix(1.0, 0.25, uTransition3);
    alpha *= fullScreenTransitionFade;
    // alpha *= vEdgeFade;
    alpha *= uAlpha * uAlpha;
    
    alpha *= 0.75;

    gl_FragColor = vec4(color, alpha);
}
`

export const DOTS_BACK_VERTEX = PRE + `attribute vec3 offset;

uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;

varying float vHeight;
varying float vWorldHeight;
varying float vDist;
varying float vEdgeFade;

vec3 pointOnLine(vec3 a, vec3 b, float t) {
    return a - ((a - b) * t);
}

mat2 rotate2d(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, s, -s, c);
}

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

void main() {
    // full screen position
    float aspect = uResolution.x / uResolution.y;
    aspect = mix(aspect, 1.0, uTransition1);
    float verticalAspect = uResolution.y / uResolution.x;
    float containerAspect = 1.77;

    vec3 animatedOffset = offset;
    animatedOffset.x *= containerAspect;
    animatedOffset.x += uTime * 0.125 * 0.1;
    animatedOffset.x += sin(uTime * 1.314119 + offset.x * 14.7 + offset.y * 3.75) * 0.025;
    animatedOffset.y += sin(uTime * 1.2853 + offset.y * 21.1415 + offset.x * 5.94) * 0.025;
    animatedOffset.x = fract(animatedOffset.x / containerAspect) * containerAspect - containerAspect * 0.5;
    animatedOffset.y = animatedOffset.y + sin(uTime * 0.4 + offset.x * 4.0) * 0.1;
    animatedOffset.y = fract(animatedOffset.y) - 0.5;

    float x = 3.0;
    float y = 4.0;
    animatedOffset = vec3(
        (floor(animatedOffset.x * x * 0.65) / x + (1.0 / x) * 0.5) * 1.25, 
        floor(animatedOffset.y * y * 0.65) / y + (1.0 / y) * 0.5, 
        0.0
    );

    float pad = 0.1;
    float scale = 0.02;
    vec3 localPos = position;
    localPos *= scale;
    localPos.x /= aspect * 0.5;

    vec4 fullScreenPos = vec4((localPos + animatedOffset) / vec3(containerAspect, 1.0, 1.0) * (2.0 - pad), 1.0);

    vec4 worldPos = vec4(position * scale, 1.0);
    worldPos.xyz += animatedOffset;
    vec3 offsetPos = worldPos.xyz;
    worldPos = modelMatrix * worldPos;

    // final scene pos
    vec4 finalPos = vec4(position, 1.0);

    float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
    float isDesktop = 1.0 - isMobile;
    if(uResolution.x >= 768.0 && uResolution.x < 1450.0) {
      isMobile = 0.8; 
      isDesktop = 0.0;
    }
    float wideDesktopLateral = isDesktop * (1.0 - uHomeHeroPullApartBand);
    homeHeroScaleBandWorldPos(worldPos.xyz, uTransition2, isMobile, verticalAspect);

    // tilt
    float angle = mix(0.0, 0.35, uTransition2);
    worldPos.yz = rotate2d(angle) * worldPos.yz;

    finalPos = projectionMatrix * viewMatrix * worldPos;
    finalPos.x += uTransition2 * 1.4 * (1.0 - uTransition3) * wideDesktopLateral;
    finalPos.x -= uTransition3 * 1.5 * wideDesktopLateral;
    // finalPos.y += uTransition1 * 0.2 * isDesktop;

    finalPos.y += homeHeroPhoneFinalPosY(uTransition2, isMobile);

    gl_Position = mix(fullScreenPos, finalPos, uTransition1);

    vEdgeFade = smoothstep(1.77 * 0.5, 1.5 * 0.5, abs(offsetPos.x));
    vEdgeFade *= smoothstep(1.0, 0.9, abs(offsetPos.y));

    // scale to fit within top/bottom padding
    gl_Position = mix(gl_Position, verticallyCenter(gl_Position, 88.0, 250.0, uResolution), uTransition1 * (1.0 - uTransition2) * wideDesktopLateral);

}
`

export const DOTS_BACK_FRAGMENT = PRE + `uniform float uAlpha;
uniform vec3 uColor;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uColorMix;

varying float vHeight;
varying float vWorldHeight;
varying float vEdgeFade;

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}

void main() {
    vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);

    float fullScreenTransitionFade = smoothstep(0.0, 0.75, uTransition1);
    
    // composite alpha
    float alpha = 1.0;
    alpha = mix(1.0, 0.0, uTransition2 * (1.0 - uTransition3));
    alpha *= fullScreenTransitionFade;
    alpha *= uAlpha * uAlpha;

    alpha *= 0.5;

    gl_FragColor = vec4(color, alpha);
}
`

export const WIRES_VERTEX = PRE + `attribute vec3 offset;

uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;

varying float vHeight;
varying float vWorldHeight;
varying float vDist;
varying vec3 vWorldPos;

vec3 pointOnLine(vec3 a, vec3 b, float t) {
    return a - ((a - b) * t);
}

mat2 rotate2d(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, s, -s, c);
}

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

void main() {
    // full screen position
    float aspect = uResolution.x / uResolution.y;
    aspect = mix(aspect, 1.0, uTransition1);
    float verticalAspect = uResolution.y / uResolution.x;
    float containerAspect = 1.77;

    vec3 animatedOffset = offset;
    animatedOffset.x *= containerAspect;
    animatedOffset.x += uTime * 0.125 * 0.1;
    animatedOffset.x += sin(uTime * 1.314119 + offset.x * 14.7 + offset.y * 3.75) * 0.025;
    animatedOffset.y += sin(uTime * 1.2853 + offset.y * 21.1415 + offset.x * 5.94) * 0.025;
    animatedOffset.x = fract(animatedOffset.x / containerAspect) * containerAspect - containerAspect * 0.5;
    animatedOffset.y = animatedOffset.y + sin(uTime * 0.4 + offset.x * 4.0) * 0.1;
    animatedOffset.y = fract(animatedOffset.y) - 0.5;

    // interpolate curves
    float size = 0.5;

    vec3 origin = vec3(
        animatedOffset.x, 
        animatedOffset.y, 
        size);

    float x = 3.0;
    float y = 4.0;
    vec3 target = vec3(
        (floor(animatedOffset.x * x * 0.65) / x + (1.0 / x) * 0.5) * 1.25, 
        floor(animatedOffset.y * y * 0.65) / y + (1.0 / y) * 0.5, 
        -size
    );

    float pad = 0.1;
    float t = -position.z;
    vec3 localPos = position;
    localPos.x /= aspect;
    vec4 fullScreenPos = vec4((localPos + mix(origin, target, t)) / vec3(containerAspect, 1.0, 1.0) * (2.0 - pad), 1.0);

    vDist = distance(origin.xy, target.xy);

    vec3 controlpoint1 = vec3(origin.x, origin.y, -size * 0.2);
    vec3 controlpoint2 = vec3(origin.x, origin.y, -size * 0.75);
    vec3 controlpoint3 = vec3(target.x, target.y, -size * 0.25);
    vec3 controlpoint4 = vec3(target.x, target.y, -size * 0.8);

    vec3 posa = pointOnLine(controlpoint1, controlpoint2, t);
    vec3 posb = pointOnLine(controlpoint2, controlpoint3, t);
    vec3 posc = pointOnLine(controlpoint3, controlpoint4, t);

    vec3 posd = pointOnLine(posa, posb, t);
    vec3 pose = pointOnLine(posb, posc, t);

    vec3 pos = pointOnLine(posd, pose, t);

    // extend start/end points of line to reach origin/target
    float eps = 0.01;

    if (t < eps) {
        pos = origin;
    }

    if (t > 1.0 - eps) {
        pos = target;
    }

    vHeight = -position.z;

    // final scene position
    vec4 worldPos = vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    vWorldHeight = -worldPos.z;
    worldPos = modelMatrix * worldPos;

    // final scene pos
    vec4 finalPos = vec4(position, 1.0);

    float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
    float isDesktop = 1.0 - isMobile;
    if(uResolution.x >= 768.0 && uResolution.x < 1450.0) {
      isMobile = 0.8; 
      isDesktop = 0.0;
    }
    float wideDesktopLateral = isDesktop * (1.0 - uHomeHeroPullApartBand);
    homeHeroScaleBandWorldPos(worldPos.xyz, uTransition2, isMobile, verticalAspect);

    // tilt
    float angle = mix(0.0, 0.35, uTransition2);
    worldPos.yz = rotate2d(angle) * worldPos.yz;

    finalPos = projectionMatrix * viewMatrix * worldPos;
    finalPos.x += uTransition2 * 1.4 * (1.0 - uTransition3) * wideDesktopLateral;
    finalPos.x -= uTransition3 * 1.5 * wideDesktopLateral;
    // finalPos.y += uTransition1 * 0.2 * isDesktop;

    finalPos.y += homeHeroPhoneFinalPosY(uTransition2, isMobile);

    gl_Position = mix(fullScreenPos, finalPos, uTransition1);

    // scale to fit within top/bottom padding
    gl_Position = mix(gl_Position, verticallyCenter(gl_Position, 88.0, 250.0, uResolution), uTransition1 * (1.0 - uTransition2) * wideDesktopLateral);
}
`

export const WIRES_FRAGMENT = PRE + `uniform float uAlpha;
uniform vec3 uColor;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;

varying float vHeight;
varying float vWorldHeight;
varying vec3 vWorldPos;
varying float vDist;

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}

void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);

    // fade in solid line at frontal angle, to prevent flickering caused by dots
    vec3 cameraDir = normalize(cameraPosition);
    float cosTheta = dot(cameraDir, vec3(0.0, 0.0, 1.0));
    cosTheta = abs(cosTheta);
    cosTheta = smoothstep(0.8, 1.0, cosTheta);

    // create dotted line
    float dottedMask = 1.0 - step(0.3, fract(vWorldHeight * 30.0));
    dottedMask = mix(dottedMask, 1.0, step(0.0, vWorldHeight));

    // fade in when transitioning out of fullscreen
    float fullScreenTransitionFade = smoothstep(0.0, 1.0, uTransition1);
    
    // fade out lines that are at distance threshold, to prevent snapping
    float distFade = clamp(vDist * 4.0, 0.0, 1.0);
    distFade = smoothstep(1.0, 0.9, distFade);

    // fade at boundary edges
    float edgeFade = smoothstep(1.77 * 0.5, 1.5 * 0.5, abs(vWorldPos.x));
    edgeFade *= smoothstep(1.0, 0.9, abs(vWorldPos.y));
    
    // composite alpha
    float alpha = 1.0;
    float frontValue = mix(1.0, 0.25, uTransition3);
    float backValue = mix(1.0, 0.0, uTransition2 * (1.0 - uTransition3));
    alpha = mix(frontValue, backValue, smoothstep(0.1 - uTransition3 * 0.2 + uTransition2 * 0.1, -0.2 - uTransition3 * 0.2 + uTransition2 * 0.1, vWorldPos.z));
    
    alpha *= dottedMask;
    alpha *= fullScreenTransitionFade;
    alpha *= uAlpha * uAlpha;

    alpha *= 0.75;

    gl_FragColor = vec4(color, alpha);
}
`

export const NUMBERS_VERTEX = PRE + `attribute vec3 offset;

uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;

varying float vHeight;
varying float vWorldHeight;
varying float vDist;
varying float vEdgeFade;
varying vec2 vUv;
varying vec3 vPos;

vec3 pointOnLine(vec3 a, vec3 b, float t) {
    return a - ((a - b) * t);
}

mat2 rotate2d(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, s, -s, c);
}

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

void main() {
    vUv = uv;

    // full screen position
    float aspect = uResolution.x / uResolution.y;
    aspect = mix(aspect, 1.0, uTransition1);
    float verticalAspect = uResolution.y / uResolution.x;
    float containerAspect = 1.77;

    float pad = 0.1;
    vec3 localPos = position;
    localPos.x /= aspect * 0.5;

    vec4 fullScreenPos = vec4((localPos) / vec3(containerAspect, 1.0, 1.0) * (2.0 - pad), 1.0);

    // final scene position
    vec4 worldPos = vec4(position, 1.0);
    vec3 offsetPos = worldPos.xyz;
    vPos = worldPos.xyz;
    worldPos = modelMatrix * worldPos;

    // final scene pos
    vec4 finalPos = vec4(position, 1.0);

    float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
    float isDesktop = 1.0 - isMobile;
    if(uResolution.x >= 768.0 && uResolution.x < 1450.0) {
      isMobile = 0.8; 
      isDesktop = 0.0;
    }
    float wideDesktopLateral = isDesktop * (1.0 - uHomeHeroPullApartBand);
    homeHeroScaleBandWorldPos(worldPos.xyz, uTransition2, isMobile, verticalAspect);

    // tilt
    float angle = mix(0.0, 0.35, uTransition2);
    worldPos.yz = rotate2d(angle) * worldPos.yz;

    finalPos = projectionMatrix * viewMatrix * worldPos;
    finalPos.x += uTransition2 * 1.4 * (1.0 - uTransition3) * wideDesktopLateral;
    finalPos.x -= uTransition3 * 1.5 * wideDesktopLateral;
    // finalPos.y += uTransition1 * 0.2 * isDesktop;

    finalPos.y += homeHeroPhoneFinalPosY(uTransition2, isMobile);

    gl_Position = mix(fullScreenPos, finalPos, uTransition1);

    // scale to fit within top/bottom padding
    gl_Position = mix(gl_Position, verticallyCenter(gl_Position, 88.0, 250.0, uResolution), uTransition1 * (1.0 - uTransition2) * wideDesktopLateral);

}
`

export const NUMBERS_FRAGMENT = PRE + `uniform float uAlpha;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform sampler2D tMap;
varying vec2 vUv;
varying vec3 vPos;

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vUv;
    uv.x = fract(uv.x * 4.0);

    float charOffset = floor(vUv.x * 4.0) / 4.0;
    float charOffsetWorld = charOffset + floor(vPos.y * 4.0) * 3.14;
    charOffsetWorld += floor(vPos.x * 4.0) * 7.89;

    float randOffset = rand(vec2(charOffset, charOffsetWorld));

    uv.x /= 2.0;

    vec3 color = vec3(1.0);
    float fullScreenTransitionFade = smoothstep(0.0, 0.75, uTransition1);
    float alpha = 1.0;

    // animated transitions
    alpha = mix(1.0, 0.25, uTransition2);
    alpha = mix(alpha, 1.0, uTransition3);

    // adjustments
    alpha *= fullScreenTransitionFade;
    alpha *= uAlpha;

    // animated text
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

    // hide artifacts caused by fract() operation
    float d = length(dFdx(uv));
    d = max(d, length(dFdy(uv)));

    alpha -= step(0.2, d);
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
}
`

export const ICONS_VERTEX = PRE + `attribute vec3 offset;

uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;

varying float vHeight;
varying float vWorldHeight;
varying float vDist;
varying float vEdgeFade;

vec3 pointOnLine(vec3 a, vec3 b, float t) {
    return a - ((a - b) * t);
}

mat2 rotate2d(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, s, -s, c);
}

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

void main() {
    float aspect = uResolution.x / uResolution.y;
    aspect = mix(aspect, 1.0, uTransition1);
    float verticalAspect = uResolution.y / uResolution.x;
    float containerAspect = 1.77;

    // rotation animation
    float pad = 0.1;
    vec3 localPos = position;
    float animatedAngle = 1.0;
    animatedAngle += sin(uTime * 2.74 + floor(offset.x * 3.0 + offset.y * 4.0) * 3.14) * 0.5;
    animatedAngle += sin(uTime * 3.45 + floor(offset.x * 3.0 + offset.y * 4.0) * 1.43) * 0.5;
    animatedAngle += 0.5;
    animatedAngle = pow(animatedAngle, 2.0);
    animatedAngle = floor(animatedAngle);
    animatedAngle = clamp(animatedAngle, 0.0, 1.0);
    animatedAngle *= 3.14159 * 0.25;
    localPos.xy = rotate2d(animatedAngle) * localPos.xy;

    vec4 fullScreenPos = vec4((localPos * 1.25 * vec3(1.0 / containerAspect, 1.0, 1.0) + offset / vec3(containerAspect, 1.0, 1.0) * (2.0 - pad)), 1.0);

    // final scene position
    vec4 worldPos = vec4(localPos, 1.0);
    worldPos.xyz += offset;
    vec3 offsetPos = worldPos.xyz;
    worldPos = modelMatrix * worldPos;

    // final scene pos
    vec4 finalPos = vec4(position, 1.0);

    float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
    float isDesktop = 1.0 - isMobile;
    if(uResolution.x >= 768.0 && uResolution.x < 1450.0) {
      isMobile = 0.8; 
      isDesktop = 0.0;
    }
    float wideDesktopLateral = isDesktop * (1.0 - uHomeHeroPullApartBand);
    homeHeroScaleBandWorldPos(worldPos.xyz, uTransition2, isMobile, verticalAspect);

    // tilt
    float angle = mix(0.0, 0.35, uTransition2);
    worldPos.yz = rotate2d(angle) * worldPos.yz;

    finalPos = projectionMatrix * viewMatrix * worldPos;
    finalPos.x += uTransition2 * 1.4 * (1.0 - uTransition3) * wideDesktopLateral;
    finalPos.x -= uTransition3 * 1.5 * wideDesktopLateral;
    // finalPos.y += uTransition1 * 0.2 * isDesktop;

    finalPos.y += homeHeroPhoneFinalPosY(uTransition2, isMobile);

    gl_Position = mix(fullScreenPos, finalPos, uTransition1);

    // scale to fit within top/bottom padding
    gl_Position = mix(gl_Position, verticallyCenter(gl_Position, 88.0, 250.0, uResolution), uTransition1 * (1.0 - uTransition2) * wideDesktopLateral);

}
`

export const ICONS_FRAGMENT = PRE + `uniform float uAlpha;
uniform float uTransition1;
uniform float uTransition2;
uniform float uTransition3;
uniform float uColorMix;

void main() {
    vec3 color = mix(vec3(0.0), vec3(1.0), uColorMix);

    float fullScreenTransitionFade = smoothstep(0.0, 0.3, uTransition1);

    // composite alpha
    float alpha = 1.0;
    alpha *= fullScreenTransitionFade;
    alpha *= uAlpha;
    alpha *= uTransition3;

    alpha *= 0.25;

    alpha *= uAlpha;

    gl_FragColor = vec4(color, alpha);
}
`
