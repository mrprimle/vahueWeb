// Scale module 322473 shaders, in the order the scene adds them. Generated from the chunk.

export const PREAMBLE = "uniform float uTime;\nuniform float uDelta;\nuniform vec2 uResolution;\nuniform float uDPR;\n/** 1 when home hero pull-apart is in band layout (max-width 3xl); set from `homeHeroScene` only. */\nuniform float uHomeHeroPullApartBand;\n/** Phone-only clip-space Y add for pull-apart scene verts (`finalPos.y`); set from `homeHeroScene`. */\nuniform float uHomeHeroPhoneSceneY;\n/** Tablet (`md`\u2013below-`3xl`) clip-space Y add; set from `homeHeroScene`. */\nuniform float uHomeHeroTabletSceneY;\n/** Tablet world-space scale at full pull-apart (`uTransition2`); set from `homeHeroScene`. */\nuniform float uHomeHeroTabletSceneScale;\n\nfloat homeHeroIsPhone(vec2 res) {\n  return 1.0 - step(768.0, res.x);\n}\n\nfloat homeHeroIsTablet(vec2 res) {\n  return step(768.0, res.x) * (1.0 - step(1450.0, res.x));\n}\n\n/** Pull-apart scene Y in clip space (after projection). Tablet band uses `isMobile=0.8` \u2014 boost Y there. */\nfloat homeHeroPhoneFinalPosY(float transition2, float isMobile) {\n  float isPhone = homeHeroIsPhone(uResolution);\n  float isTablet = homeHeroIsTablet(uResolution);\n  float yReach = isTablet > 0.5 ? 1.0 : isMobile;\n  return mix(1.0, 1.95, transition2) * yReach\n    + uHomeHeroPhoneSceneY * isPhone\n    + uHomeHeroTabletSceneY * isTablet;\n}\n\n/** World-space band scale (phone/tablet shrink + tablet product scale). */\nvoid homeHeroScaleBandWorldPos(inout vec3 wp, float transition2, float isMobile, float verticalAspect) {\n  float isTablet = homeHeroIsTablet(uResolution);\n  float mobilePad = 0.25;\n  float t = mix(transition2, 0.0, isMobile);\n  wp *= mix(1.0, 0.9, t);\n  wp = mix(wp, wp / (verticalAspect + mobilePad), isMobile);\n  wp *= mix(1.0, uHomeHeroTabletSceneScale, isTablet * transition2);\n}\n"

export const videoVert = PREAMBLE + `uniform float uProgress;

varying vec2 vUv;

void main() {
  vUv = uv;

  float containerAspect = 1.77;
  vec3 pos = position;
  pos.x *= containerAspect;

  pos *= 0.4;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
  gl_Position.xyz *= mix(1.0, 0.65, isMobile);

}
`

export const videoFrag = PREAMBLE + `uniform sampler2D tMap;
uniform sampler2D tLogo;
uniform float uProgress;
uniform float uAlpha;

varying vec2 vUv;

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

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float cubicInOut(float t) {
    return t < 0.5
        ? 4.0 * t * t * t
        : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

float cubicOut(float t) {
  float f = t - 1.0;
  return f * f * f + 1.0;
}

void main() {
    
  vec2 uv = vUv;

  // scale image to fit depending on aspect ratio
  uv -= 0.5;
  ivec2 texSize = textureSize(tMap, 0);
  float imageAspect = float(texSize.x) / float(texSize.y);
  vec2 scale = vec2(imageAspect * 0.5, 1.0);
  uv *= scale;
  uv += 0.5;

  vec3 color = texture2D(tMap, uv).rgb;
  color = color * 2.0 - 1.0;
  color *= 0.8;
  color = color * 0.5 + 0.5;

  // blend between corner radius sizes for full screen transition
  float cornerRadius = 0.078;

  // blend between aspect ratios for corners so they don't get stretched
  float containerAspect = 1.77;

  // create rounded rectangle mask
  float alpha = sdRoundedBox((vUv - 0.5) * vec2(containerAspect, 1.0), vec2(0.5 * containerAspect, 0.5), vec4(cornerRadius));
  alpha = 1.0 - aastep(0.0, alpha);

  float noise = rand(vUv + fract(uTime)) * 2.0 - 1.0;
  color += noise * 0.04;

  // logo
  vec2 logoUv = vUv;
  float animatedScale = cubicOut(clamp(uProgress * 2.5, 0.0, 1.0));
  logoUv -= 0.5;
  logoUv.x *= containerAspect;
  logoUv *= 4.0;
  logoUv *= 1.0 / animatedScale;
  logoUv += 0.05;
  logoUv += 0.5;
  float logo = texture2D(tLogo, logoUv).r;
  logo = aastep(0.5, logo);
  logo *= smoothstep(0.05, 0.1, uProgress);
  color = mix(color, vec3(1.0), logo);

  alpha *= 0.65;
  alpha *= uAlpha;

  alpha = mix(alpha, 1.0, logo);

  gl_FragColor = vec4(color, alpha);
}
`

export const miniParticleVert = PREAMBLE + `attribute vec3 offset;

void main() { 
    vec3 pos = position;

    vec3 off = offset;
    off.x += sin(uTime * 1.14 + off.x * 24.0) * 0.01;
    off.y += cos(uTime * 1.1 + off.y * 28.0) * 0.01;
    
    pos *= 0.01;
    pos += off;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
    gl_Position.xyz *= mix(1.0, 0.75, isMobile);
}
`

export const miniParticleFrag = PREAMBLE + `uniform float uProgress;

void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);
    float alpha = 1.0;

    alpha *= smoothstep(0.4, 0.2, uProgress);

    gl_FragColor = vec4(color, alpha);
}
`

export const miniLineVert = PREAMBLE + `attribute float curveu;

uniform sampler2D tPoints;
uniform float uProgress;

varying vec3 vColor;

float cubicInOut(float t) {
    return t < 0.5
        ? 4.0 * t * t * t
        : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

void main() {
    vec3 pos = position;

    if (uProgress < 0.4) {
      // get two points
      float timeoffset = sin(uTime * 3.1415 * 0.5) * 0.1;
      float t = floor(fract(uTime * 0.05 + timeoffset) * 32.0);
      int u1 = int(floor(t + (curveu * 7.0))) + 0;
      int u2 = int(floor(t + (curveu * 7.0))) + 1;
      vec3 pos1 = texelFetch(tPoints, ivec2(u1, 0), 0).xyz;
      vec3 pos2 = texelFetch(tPoints, ivec2(u2, 0), 0).xyz;

      // animate points to match other shader
      pos1.x += sin(uTime * 1.14 + pos1.x * 24.0) * 0.01;
      pos2.x += sin(uTime * 1.14 + pos2.x * 24.0) * 0.01;
      pos1.y += cos(uTime * 1.1 + pos1.y * 28.0) * 0.01;
      pos2.y += cos(uTime * 1.1 + pos2.y * 28.0) * 0.01;

      // draw line
      float dist = distance(pos1, pos2);
      vec3 tangent = normalize(pos2 - pos1);
      vec3 normal = cross(tangent, vec3(0.0, 0.0, 1.0));
      float sectionCurveu = fract(curveu * 7.0);
      pos = mix(pos1, pos2, sectionCurveu);

      // bend line outwards in the middle
      float mask = 1.0 - abs(sectionCurveu - 0.5) * 2.0;
      mask = smoothstep(0.0, 1.0, pow(mask, 0.45));
      float curveStrength = sin(sectionCurveu * 2.0 + uTime * 2.5 + timeoffset * 2.0 + float(u1) * 500.0) * 0.5 + 0.5;
      curveStrength *= 0.3;
      pos += normal * mask * dist * curveStrength;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
    gl_Position.xyz *= mix(1.0, 0.75, isMobile);
}
`

export const miniLineFrag = PREAMBLE + `uniform float uProgress;

void main() {
    vec3 color = vec3(1.0);
    float alpha = 1.0;

    alpha *= smoothstep(0.4, 0.2, uProgress);

    gl_FragColor = vec4(color, alpha);
}
`

export const curveVert = PREAMBLE + `attribute float curveu;
attribute float id;

varying float vCurveu;
varying float vRand;
varying float vId;

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() { 
    vCurveu = curveu;
    vRand = rand(vec2(id + 200.0));
    vId = id;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
    gl_Position.xyz *= mix(1.0, 0.9, isMobile);
}
`

export const curveFrag = PREAMBLE + `uniform float uProgress;

varying float vCurveu;
varying float vRand;
varying float vId;

float cubicInOut(float t) {
    return t < 0.5
        ? 4.0 * t * t * t
        : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

void main() { 
    vec3 color = vec3(1.0);

    // group first n lines so they appear first
    float group1 = vId < 8.5 ? 1.0 : 0.0;
    float group2 = 1.0 - group1;

    float progress = 0.0;

    // mask first group
    progress += (uProgress * 1.5 - vRand * 0.25) * group1;

    // mask second group
    progress += group2 * clamp(uProgress * 3.0 - 1.0 - vRand * 0.5, 0.0, 1.0);
    progress = clamp(progress, 0.0, 1.0);

    progress *= smoothstep(0.1, 0.4, progress);

    // animate in
    if (vCurveu > progress) discard;

    float alpha = 1.0;

    gl_FragColor = vec4(color, alpha); 
}
`

export const curveSquareVert = PREAMBLE + `attribute vec3 offset;
  attribute float id;

  uniform float uProgress;

  varying float vRandom;
  varying float vId;

  mat2 rotate2d(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, s, -s, c);
  }

  float rand(vec2 co){
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float cubicInOut(float t) {
      return t < 0.5
          ? 4.0 * t * t * t
          : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
  }

  void main() { 
      float scale = mix(0.07, 0.2, rand(offset.xy));
      vec3 pos = position;
      pos *= scale;

      // animated scale
      float r = rand(vec2(id + 200.0));

      // group first n lines so they appear first
      float group1 = id < 8.5 ? 1.0 : 0.0;
      float group2 = 1.0 - group1;

      float progress = 0.0;

      // mask first group
      progress += (uProgress * 2.0 - r * 0.25) * group1;

      // mask second group
      progress += group2 * clamp(uProgress * 3.0 - 1.0 - r * 0.5, 0.0, 1.0);
      progress = clamp(progress, 0.0, 1.0);

      pos *= smoothstep(0.6, 1.0, progress);

      pos += offset;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

      float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
      gl_Position.xyz *= mix(1.0, 0.75, isMobile);
  }
`

export const curveSquareFrag = PREAMBLE + `void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);
    float alpha = 1.0;

    gl_FragColor = vec4(color, alpha);
}
`

export const curveParticleVert = PREAMBLE + `attribute vec3 offset;
attribute float id;

uniform sampler2D tCurves;
uniform float uProgress;

varying float vMask;
varying float vProgress;

mat2 rotate2d(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, s, -s, c);
}

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float cubicInOut(float t) {
    return t < 0.5
        ? 4.0 * t * t * t
        : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

void main() { 
    vec3 pos = position;
    float r = rand(vec2(id + 200.0));

    // group first n lines so they appear first
    float group1 = id < 8.5 ? 1.0 : 0.0;
    float group2 = 1.0 - group1;
    float progress = 0.0;

    // mask first group
    progress += (uProgress * 2.0 - r * 0.25) * group1;

    // mask second group
    progress += group2 * clamp(uProgress * 3.0 - 1.0 - r, 0.0, 1.0);
    progress = clamp(progress, 0.0, 1.0);
    
    float t = uTime * 0.1 + r;
    float curveLength = float(textureSize(tCurves, 0).x);
    float loopedTime = fract(t - r * 10.0);
    vProgress = loopedTime;
    loopedTime *= curveLength;
    float blend = fract(loopedTime);
    vec3 prevpos = texelFetch(tCurves, ivec2(int(loopedTime), int(id)), 0).rgb;
    vec3 nextpos = texelFetch(tCurves, ivec2(int(loopedTime) + 1, int(id)), 0).rgb;
    vec3 offset = mix(prevpos, nextpos, blend);

    float pscale = 0.03;
    pscale *= smoothstep(0.01, 0.05, vProgress);
    pscale *= smoothstep(0.99, 0.95, vProgress);
    pscale *= smoothstep(0.0, -0.025, vProgress - progress);
    pscale *= smoothstep(0.1, 0.75, uProgress);

    pos *= pscale;
    pos += offset;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
    gl_Position.xyz *= mix(1.0, 0.75, isMobile);
}
`

export const curveParticleFrag = PREAMBLE + `varying float vCurveu;

void main() { 
    vec3 color = vec3(1.0);

    gl_FragColor = vec4(color, 1.0); 
}
`

export const curveDotVert = PREAMBLE + `attribute vec3 offset;
attribute float id;

uniform float uProgress;

mat2 rotate2d(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, s, -s, c);
}

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float cubicInOut(float t) {
    return t < 0.5
        ? 4.0 * t * t * t
        : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

void main() { 
    float scale = 0.05;
    vec3 pos = position;
    pos *= scale;
    
    // animated scale
    float r = rand(vec2(id + 200.0));

    // group first n lines so they appear first
    float group1 = id < 8.5 ? 1.0 : 0.0;
    float group2 = 1.0 - group1;

    float progress = 0.0;

    // mask first group
    progress += (uProgress * 2.0 - r * 0.25) * group1;

    // mask second group
    progress += group2 * clamp(uProgress * 3.0 - 1.0 - r * 0.5, 0.0, 1.0);
    progress = clamp(progress, 0.0, 1.0);

    pos *= cubicInOut(smoothstep(0.5, 1.0, progress));

    pos += offset;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    float isMobile = uResolution.x < 768.0 ? 1.0 : 0.0;
    gl_Position.xyz *= mix(1.0, 0.9, isMobile);
}
`

export const curveDotFrag = PREAMBLE + `varying float vCurveu;

void main() { 
    vec3 color = vec3(1.0);
    gl_FragColor = vec4(color, 1.0); 
}
`
