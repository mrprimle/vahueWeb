/*
 * Own visuals for Vahue /careers on the scale.com/careers layout (no Scale imagery): 88px monochrome line art for the
 * values cards (the clone's credo slot) and a small globe used in place of country flags in the open-roles list.
 * Decorative only (aria-hidden). Dark strokes on the clone's #F2F2F2 credo cards (Scale's own art is white, inverted
 * by --car-credo-filter, so it reads the same).
 */

const stroke = 'rgba(0,0,0,0.85)'
const faint = 'rgba(0,0,0,0.35)'

function Art({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 88 88" width={88} height={88} fill="none" aria-hidden="true" className="h-full w-full">
      {children}
    </svg>
  )
}

/** Mindset of respect: two equal circles overlapping. */
export function RespectArt() {
  return (
    <Art>
      <circle cx={34} cy={44} r={22} stroke={stroke} strokeWidth={1.25} />
      <circle cx={54} cy={44} r={22} stroke={stroke} strokeWidth={1.25} />
      <path d="M44 24.4a22 22 0 0 1 0 39.2a22 22 0 0 1 0-39.2Z" fill="rgba(0,0,0,0.06)" />
    </Art>
  )
}

/** Think like an owner: a task box with an arrow leaving it. */
export function OwnerArt() {
  return (
    <Art>
      <rect x={14} y={30} width={44} height={44} rx={4} stroke={faint} strokeWidth={1.25} strokeDasharray="3 4" />
      <path d="M36 52 72 16" stroke={stroke} strokeWidth={1.25} strokeLinecap="round" />
      <path d="M52 16h20v20" stroke={stroke} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={36} cy={52} r={3} fill={stroke} />
    </Art>
  )
}

/** Flexibility: three waves of different rhythm. */
export function FlexArt() {
  return (
    <Art>
      <path d="M10 30c8.5-10 17-10 25.5 0s17 10 25.5 0 13-8 17-4" stroke={faint} strokeWidth={1.25} strokeLinecap="round" />
      <path d="M10 46c6-12 12-12 18 0s12 12 18 0 12-12 18 0 9 9 14 4" stroke={stroke} strokeWidth={1.25} strokeLinecap="round" />
      <path d="M10 62c11-8 22-8 33 0s22 8 35 0" stroke={faint} strokeWidth={1.25} strokeLinecap="round" />
    </Art>
  )
}

/** Share what you know: one node passing to three. */
export function ShareArt() {
  return (
    <Art>
      <path d="M22 44 64 18M22 44h42M22 44l42 26" stroke={faint} strokeWidth={1.25} />
      <circle cx={22} cy={44} r={7} fill="#f2f2f2" stroke={stroke} strokeWidth={1.25} />
      <circle cx={22} cy={44} r={2.5} fill={stroke} />
      {[18, 44, 70].map((y) => (
        <circle key={y} cx={66} cy={y} r={5} fill="#f2f2f2" stroke={stroke} strokeWidth={1.25} />
      ))}
    </Art>
  )
}

/** Evidence before assertion: a claim resting on a stack of records. */
export function EvidenceArt() {
  return (
    <Art>
      {[52, 60, 68].map((y, i) => (
        <rect key={y} x={18} y={y} width={52} height={6} rx={2} stroke={i === 0 ? stroke : faint} strokeWidth={1.25} />
      ))}
      <path d="M44 46V18" stroke={faint} strokeWidth={1.25} strokeDasharray="2 3" />
      <circle cx={44} cy={16} r={6} stroke={stroke} strokeWidth={1.25} />
      <path d="m41.5 16 1.8 1.8 3.4-3.6" stroke={stroke} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
    </Art>
  )
}

/** Measure from day one: a dashed baseline and a line climbing away from it. */
export function MeasureArt() {
  return (
    <Art>
      <path d="M14 70h60M14 18v52" stroke={faint} strokeWidth={1.25} />
      <path d="M14 56h60" stroke={faint} strokeWidth={1.25} strokeDasharray="3 4" />
      <path d="M18 56l12-4 10 2 12-12 10-4 10-14" stroke={stroke} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={18} cy={56} r={3} fill={stroke} />
    </Art>
  )
}

/** 20x14 globe for location rows ("Fully remote"); passed to the list as an image URL. */
export const GLOBE_ICON = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" fill="none" stroke="#929292" stroke-width="1">' +
    '<circle cx="10" cy="7" r="6"/><ellipse cx="10" cy="7" rx="2.6" ry="6"/><path d="M4 7h12"/></svg>',
)}`
