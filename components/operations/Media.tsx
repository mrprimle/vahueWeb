import styles from '@/components/enterprise-vahue/media.module.css'

/*
 * /operations-only visual for the enterprise layout's bridge slot. The shared visuals (monthly report, phase track,
 * review queue, audit log, rings) live in components/enterprise-vahue/Media.tsx.
 */

const W = (o: number) => `rgba(255,255,255,${o})`

/** Bridge (square, on the inset panel): the Operate loop around the baseline. */
export function OperateLoop() {
  const c = 200
  const r = 128
  const items = [
    { label: 'Monitoring', x: c, y: c - r },
    { label: 'Exceptions', x: c + r, y: c },
    { label: 'Accuracy reviews', x: c, y: c + r },
    { label: 'Model updates', x: c - r, y: c },
  ]
  return (
    <div aria-hidden className="relative h-full w-full">
      <svg viewBox="0 0 400 400" className={styles.svg}>
        <circle cx={c} cy={c} r={r} fill="none" stroke={W(0.16)} strokeDasharray="2 6" />
        <g className={styles.spin}>
          <circle cx={c} cy={c} r={r} fill="none" stroke={W(0.85)} strokeWidth={1.5} strokeDasharray={`90 ${2 * Math.PI * r - 90}`} strokeLinecap="round" />
        </g>
        {items.map((it) => (
          <line key={`l-${it.label}`} x1={c} y1={c} x2={it.x} y2={it.y} stroke={W(0.1)} />
        ))}
        <circle cx={c} cy={c} r={46} fill="#161616" stroke={W(0.2)} />
        <text x={c} y={c + 4} textAnchor="middle" fontSize={12} fill={W(0.85)} letterSpacing="0.05em">
          BASELINE
        </text>
        {items.map((it) => (
          <g key={it.label}>
            <rect x={it.x - 64} y={it.y - 15} width={128} height={30} rx={6} fill="#121212" stroke={W(0.22)} />
            <text x={it.x} y={it.y + 4} textAnchor="middle" fontSize={11} fill={W(0.8)} letterSpacing="0.05em">
              {it.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
