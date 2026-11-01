// GLSL from scale.com/experts (chunk 3lbyg5foru4s_.js sha256 b61a4fb5…): the logo-tile shader pair (modules
// 830333 / 282513) and the scrolling-band LineSegments2 material (module 391355). Copied verbatim.

export const TILE_VERT = /* glsl */ `varying vec2 vUv;
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

export const TILE_FRAG = /* glsl */ `uniform sampler2D uTexture;
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

//  Function from Inigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
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

export const LINE_VERT = /* glsl */ `
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

export const LINE_FRAG = /* glsl */ `
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
