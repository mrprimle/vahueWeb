// labs.scale.com hero: grid-bg.wgsl plus the @vgpu/wgsl-std functions it links (simplex2d, gradDot2, gradIndex2, pcg2d, saturate),
// read from chunk 10l5gu25zzpir.js, module 539120. Comments trimmed, code unchanged. The vertex stage is vgpu's fullscreen triangle.
export const HERO_GRID_WGSL = /* wgsl */ `
struct VgpuFullscreenVertexOut {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};
@vertex fn vgpu_fullscreen_vs(@builtin(vertex_index) vi: u32) -> VgpuFullscreenVertexOut {
  var pos = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var uv = array<vec2f, 3>(vec2f(0.0, 1.0), vec2f(2.0, 1.0), vec2f(0.0, -1.0));
  var out: VgpuFullscreenVertexOut;
  out.position = vec4f(pos[vi], 0.0, 1.0);
  out.uv = uv[vi];
  return out;
}

struct Params {
  resolution: vec2f,
  mouse: vec2f,
  time: f32,
  mouse_radius: f32,
  mouse_strength: f32,
};

@group(0) @binding(0) var<uniform> params: Params;

const TAU: f32 = 6.28318530718;

fn soft_cell(local: vec2f) -> f32 {
  let e = 0.16;
  let mx = smoothstep(0.0, e, local.x) * smoothstep(0.0, e, 1.0 - local.x);
  let my = smoothstep(0.0, e, local.y) * smoothstep(0.0, e, 1.0 - local.y);
  return mx * my;
}

@fragment fn main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let res = max(params.resolution, vec2f(1.0, 1.0));
  let px = uv * res;

  let cols = max(1.0, round(res.x / 80.0));
  let rows = max(1.0, round(res.y / 80.0));
  let cell = vec2f(res.x / cols, res.y / rows);

  let gid = floor(px / cell);
  let local = fract(px / cell);

  let t = params.time;

  let n1 = simplex2d(gid * 0.14 + vec2f(t * 0.06, t * -0.045));
  let n2 = simplex2d(gid * 0.52 + vec2f(t * -0.03, t * 0.02));
  let field = n1 * 0.75 + n2 * 0.25;

  var activation = smoothstep(0.55, 0.96, field);

  let phase = fract(dot(gid, vec2f(0.13, 0.07)));
  let breathe = 0.55 + 0.45 * sin(t * 0.6 + phase * TAU);
  activation *= breathe;

  let to_pointer = px - params.mouse;
  let pd = length(to_pointer);
  let radius = max(params.mouse_radius, 1.0);
  let spot = params.mouse_strength * exp(-(pd * pd) / (2.0 * radius * radius));

  activation = saturate(activation + spot * smoothstep(0.18, 0.9, field) * 1.25);

  let peak = 0.09;
  let fill_alpha = activation * soft_cell(local) * peak;

  let edge = min(local, 1.0 - local) * cell;
  let dl = min(edge.x, edge.y);
  let line = 1.0 - smoothstep(0.0, 1.0, dl);
  var line_alpha = line * 0.05;
  line_alpha += spot * line * 0.10;
  line_alpha = min(line_alpha, 0.16);

  let alpha = fill_alpha + line_alpha * (1.0 - fill_alpha);
  return vec4f(0.0, 0.0, 0.0, alpha);
}

const simplexF2: f32 = 0.36602540378443865;
const simplexG2: f32 = 0.21132486540518713;
const simplexG2Twice: f32 = 0.42264973081037427;

fn simplexKernel2(cell: vec2i, d: vec2f) -> f32 {
  let t = 0.5 - dot(d, d);
  if (t <= 0.0) { return 0.0; }
  let t2 = t * t;
  return t2 * t2 * gradDot2(gradIndex2(cell), d);
}

fn simplex2d(position: vec2f) -> f32 {
  let skew = (position.x + position.y) * simplexF2;
  let base = floor(position + vec2f(skew));
  let cell = vec2i(base);
  let unskew = (base.x + base.y) * simplexG2;
  let d0 = position - (base - vec2f(unskew));
  let second = select(vec2f(0.0, 1.0), vec2f(1.0, 0.0), d0.x > d0.y);
  let d1 = d0 - second + vec2f(simplexG2);
  let d2 = d0 - vec2f(1.0) + vec2f(simplexG2Twice);
  var total = simplexKernel2(cell, d0);
  total = total + simplexKernel2(cell + vec2i(second), d1);
  total = total + simplexKernel2(cell + vec2i(1, 1), d2);
  return 98.0 * total;
}

const noiseInvSqrt2: f32 = 0.7071067811865476;

fn gradIndex2(cell: vec2i) -> u32 { return pcg2d(bitcast<vec2u>(cell)).x & 7u; }

fn gradDot2(index: u32, d: vec2f) -> f32 {
  let axis = select(d.x, d.y, (index & 2u) != 0u);
  let axisDot = select(axis, -axis, (index & 1u) != 0u);
  let sx = select(d.x, -d.x, (index & 1u) != 0u);
  let sy = select(d.y, -d.y, (index & 2u) != 0u);
  return select(axisDot, noiseInvSqrt2 * (sx + sy), index >= 4u);
}

fn pcg2d(value: vec2u) -> vec2u {
  var hashed = value * 1664525u + 1013904223u;
  hashed.x = hashed.x + hashed.y * 1664525u;
  hashed.y = hashed.y + hashed.x * 1664525u;
  hashed = hashed ^ (hashed >> vec2u(16u));
  hashed.x = hashed.x + hashed.y * 1664525u;
  hashed.y = hashed.y + hashed.x * 1664525u;
  hashed = hashed ^ (hashed >> vec2u(16u));
  return hashed;
}
`
