/*
 * Vahue visuals for the full-bleed hero and pre-footer cards (in place of Scale's photography):
 * the dark dot-texture panel plus thin white line art, drawn in a 1440x720 box that covers the card.
 * Text sits bottom-left over a fade to #020202, so the drawing keeps to the upper and right areas.
 * Static SVG: the 1.25 -> 1 scroll scale of the media layer is the only motion. Phones show the texture only,
 * since the copy fills the card there.
 */

const line = 'rgba(255,255,255,0.22)'
const faint = 'rgba(255,255,255,0.1)'
const fill = 'rgba(255,255,255,0.03)'

function Doc({ x, y, rows }: { x: number; y: number; rows: number[] }) {
  return (
    <g>
      <rect x={x} y={y} width={150} height={196} rx={8} fill={fill} stroke={line} />
      <rect x={x + 18} y={y + 20} width={64} height={8} rx={2} fill="rgba(255,255,255,0.28)" />
      {rows.map((w, i) => (
        <rect key={i} x={x + 18} y={y + 44 + i * 18} width={w} height={5} rx={2} fill={faint} />
      ))}
    </g>
  )
}

/* Hero: documents (left) -> agent (middle) -> structured record and review queue (right). */
export function HeroVisual() {
  const fields = ['Document type', 'Source', 'Requested service', 'Priority', 'Date', 'Reference']
  return (
    <div className="hero-texture absolute inset-0 rounded-3xl border border-border-soft bg-surface">
      <svg className="absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g transform="translate(820 52) scale(0.76)">
          <Doc x={0} y={40} rows={[110, 96, 114, 80, 104, 70, 98]} />
          <Doc x={26} y={20} rows={[104, 114, 88, 110, 76, 100, 92]} />
          <Doc x={52} y={0} rows={[112, 90, 106, 84, 114, 96, 72]} />

          <path d="M210 98 H330" stroke={line} strokeDasharray="4 6" />
          <circle cx={360} cy={98} r={30} fill={fill} stroke={line} />
          <circle cx={360} cy={98} r={6} fill="rgba(255,255,255,0.6)" />
          <text x={360} y={152} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={12} fontFamily="ui-monospace, monospace" letterSpacing="0.06em">
            AGENT
          </text>
          <path d="M390 98 H470" stroke={line} strokeDasharray="4 6" />

          <rect x={470} y={0} width={300} height={258} rx={10} fill={fill} stroke={line} />
          <text x={492} y={34} fill="rgba(255,255,255,0.7)" fontSize={14} fontFamily="ui-sans-serif, system-ui">
            Record
          </text>
          {fields.map((f, i) => (
            <g key={f} transform={`translate(492 ${58 + i * 32})`}>
              <text y={12} fill="rgba(255,255,255,0.4)" fontSize={11} fontFamily="ui-sans-serif, system-ui">
                {f}
              </text>
              <rect x={128} y={4} width={i === 4 ? 70 : 112} height={6} rx={2} fill={i === 4 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.22)'} />
              {i === 4 ? (
                <rect x={206} y={-2} width={52} height={18} rx={4} fill="none" stroke="rgba(255,255,255,0.45)" />
              ) : (
                <path d={`M248 6 l4 4 l8 -8`} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.5} />
              )}
            </g>
          ))}

          <path d="M620 258 V320" stroke={line} strokeDasharray="4 6" />
          <rect x={520} y={320} width={200} height={64} rx={8} fill={fill} stroke={line} />
          <text x={540} y={348} fill="rgba(255,255,255,0.6)" fontSize={12} fontFamily="ui-sans-serif, system-ui">
            Review queue
          </text>
          <rect x={540} y={360} width={120} height={5} rx={2} fill={faint} />
        </g>
      </svg>
    </div>
  )
}

/* Pre-footer: the three phases on one line, Audit -> Pilot -> Operate. */
export function PrefooterVisual({ phases }: { phases: { name: string; length: string }[] }) {
  return (
    <div className="hero-texture absolute inset-0 rounded-3xl border border-border-soft bg-surface">
      <svg className="absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g transform="translate(760 150)">
          <path d="M40 60 H560" stroke={line} />
          {phases.map((p, i) => (
            <g key={p.name} transform={`translate(${40 + i * 260} 60)`}>
              <circle r={i === 2 ? 14 : 9} fill={i === 2 ? 'rgba(255,255,255,0.75)' : '#0b0b0b'} stroke="rgba(255,255,255,0.5)" />
              <text y={-30} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize={18} fontFamily="ui-sans-serif, system-ui">
                {p.name}
              </text>
              <text y={44} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={12} fontFamily="ui-monospace, monospace" letterSpacing="0.06em">
                {p.length.toUpperCase()}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
