// Scale module 194624.
export function clamp(v: number, a = 0, b = 1) {
  return Math.min(Math.max(v, Math.min(a, b)), Math.max(a, b))
}

export function mapRange(v: number, inMin = -1, inMax = 1, outMin = 0, outMax = 1, clamped?: boolean) {
  const o = ((v - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  return clamped ? clamp(o, Math.min(outMin, outMax), Math.max(outMin, outMax)) : o
}
