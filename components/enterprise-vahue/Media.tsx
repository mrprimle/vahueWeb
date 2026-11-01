import type { CSSProperties, ReactNode } from 'react'
import styles from './media.module.css'

/*
 * Own visuals for the enterprise layout's media slots on Vahue pages (/operations, industry pages). Static SVG/HTML
 * on the site's dot texture, monochrome, decorative (aria-hidden), and with no figures: mock screens show labels and
 * shapes only. Loops run only without prefers-reduced-motion (media.module.css). Defaults are the /operations rows.
 */

export const W = (o: number) => `rgba(255,255,255,${o})`

export function Panel({ children }: { children?: ReactNode }) {
  return (
    <div aria-hidden className={styles.panel}>
      {children}
    </div>
  )
}

// Abstract sparkline (no values): y offsets on a 0..1 scale across the tile width.
const spark = (x: number, y: number, w: number, h: number, pts: number[]) =>
  pts.map((v, i) => `${i ? 'L' : 'M'}${(x + (i / (pts.length - 1)) * w).toFixed(1)} ${(y + h - v * h).toFixed(1)}`).join(' ')

/** Race (16:9): the monthly report, four tiles with trend shapes against a dashed baseline. */
export function MonthlyReport() {
  const tiles = [
    { label: 'Items handled', x: 92, y: 144, pts: [0.2, 0.28, 0.25, 0.4, 0.46, 0.52, 0.6, 0.66, 0.74, 0.8] },
    { label: 'Hours returned', x: 484, y: 144, pts: [0.15, 0.2, 0.3, 0.34, 0.42, 0.5, 0.55, 0.62, 0.7, 0.76] },
    { label: 'Exceptions', x: 92, y: 320, pts: [0.8, 0.72, 0.7, 0.6, 0.52, 0.5, 0.42, 0.38, 0.34, 0.3] },
    { label: 'Accuracy', x: 484, y: 320, pts: [0.55, 0.6, 0.64, 0.66, 0.7, 0.72, 0.74, 0.75, 0.77, 0.78] },
  ]
  return (
    <Panel>
      <svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" className={styles.svg}>
        <rect x={60} y={50} width={840} height={440} rx={18} fill="#101010" stroke={W(0.12)} />
        <text x={92} y={98} fontSize={18} fill={W(0.9)}>
          Monthly report
        </text>
        <text x={868} y={98} fontSize={13} fill={W(0.45)} textAnchor="end" letterSpacing="0.05em">
          AGAINST BASELINE
        </text>
        <line x1={60} y1={120} x2={900} y2={120} stroke={W(0.1)} />
        {tiles.map((t) => (
          <g key={t.label}>
            <rect x={t.x} y={t.y} width={384} height={152} rx={10} fill="#141414" stroke={W(0.08)} />
            <text x={t.x + 20} y={t.y + 32} fontSize={13} fill={W(0.55)} letterSpacing="0.05em">
              {t.label.toUpperCase()}
            </text>
            <line x1={t.x + 20} y1={t.y + 112} x2={t.x + 364} y2={t.y + 112} stroke={W(0.25)} strokeDasharray="4 5" />
            <path d={spark(t.x + 20, t.y + 50, 344, 80, t.pts)} fill="none" stroke={W(0.85)} strokeWidth={2} strokeLinejoin="round" />
          </g>
        ))}
      </svg>
    </Panel>
  )
}

/** Pillars (square): the three phases on one track; Operate repeats monthly. */
export function PhaseTrack() {
  const rows = [
    { name: 'Audit', length: '2 weeks', y: 112, x: 40, w: 64, o: 0.9 },
    { name: 'Pilot', length: '4 to 6 weeks', y: 196, x: 104, w: 132, o: 0.6 },
    { name: 'Operate', length: 'Monthly', y: 280, x: 236, w: 124, o: 0.4 },
  ]
  return (
    <Panel>
      <svg viewBox="0 0 400 400" className={styles.svg}>
        {rows.map((r) => (
          <g key={r.name}>
            <text x={40} y={r.y} fontSize={12} fill={W(0.7)} letterSpacing="0.05em">
              {r.name.toUpperCase()}
            </text>
            <line x1={40} y1={r.y + 22} x2={360} y2={r.y + 22} stroke={W(0.1)} />
            {r.name === 'Operate' ? (
              <>
                {Array.from({ length: 5 }).map((_, k) => (
                  <rect key={k} x={r.x + k * 25.6} y={r.y + 17} width={20} height={10} rx={2} fill={W(r.o)} />
                ))}
                <circle cx={r.x + 4} cy={r.y + 22} r={4} fill="white" className={styles.travel} style={{ '--travel': '112px' } as CSSProperties} />
              </>
            ) : (
              <rect x={r.x} y={r.y + 17} width={r.w} height={10} rx={2} fill={W(r.o)} />
            )}
            <text x={r.x} y={r.y + 50} fontSize={11} fill={W(0.45)} letterSpacing="0.05em">
              {r.length.toUpperCase()}
            </text>
          </g>
        ))}
        <path d="M104 139 V 196 M236 223 V 280" stroke={W(0.18)} strokeDasharray="2 4" />
      </svg>
    </Panel>
  )
}

/** PoweredBy (16:9): a review queue, uncertain items held for a person. */
export type QueueRow = { doc: string; status: string; fill: number; hot?: boolean }
const QUEUE: QueueRow[] = [
  { doc: 'Supplier invoice', status: 'Posted', fill: 0.7 },
  { doc: 'Claim form', status: 'Needs review', fill: 0.4, hot: true },
  { doc: 'Purchase order', status: 'Approved', fill: 0.85 },
  { doc: 'Packing slip', status: 'Posted', fill: 0.6 },
  { doc: 'Credit note', status: 'Awaiting approval', fill: 0.5 },
]

export function ReviewQueue({ rows = QUEUE }: { rows?: QueueRow[] }) {
  return (
    <Panel>
      <svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" className={styles.svg}>
        <rect x={80} y={48} width={800} height={444} rx={18} fill="#101010" stroke={W(0.12)} />
        <text x={112} y={96} fontSize={18} fill={W(0.9)}>
          Review queue
        </text>
        <line x1={80} y1={118} x2={880} y2={118} stroke={W(0.1)} />
        {rows.map((r, i) => {
          const y = 158 + i * 64
          return (
            <g key={r.doc}>
              <text x={112} y={y + 5} fontSize={15} fill={W(0.85)}>
                {r.doc}
              </text>
              <rect x={380} y={y - 4} width={220} height={8} rx={4} fill={W(0.1)} />
              <rect x={380} y={y - 4} width={220 * r.fill} height={8} rx={4} fill={W(r.hot ? 0.9 : 0.35)} />
              <rect x={680} y={y - 15} width={168} height={30} rx={15} fill={r.hot ? 'white' : 'none'} stroke={W(r.hot ? 1 : 0.28)} />
              <text x={764} y={y + 4} fontSize={11} textAnchor="middle" fill={r.hot ? '#020202' : W(0.7)} letterSpacing="0.05em">
                {r.status.toUpperCase()}
              </text>
              {i < rows.length - 1 ? <line x1={112} y1={y + 32} x2={848} y2={y + 32} stroke={W(0.06)} /> : null}
            </g>
          )
        })}
      </svg>
    </Panel>
  )
}

/** Audit log line: time, actor, action, detail. */
export type LogLine = [string, string, string, string]
const LOG: LogLine[] = [
  ['09:14:02', 'document-intake', 'read', 'supplier invoice, page 1'],
  ['09:14:03', 'document-intake', 'check', 'total matches purchase order'],
  ['09:14:03', 'document-intake', 'queue', 'tax code below threshold, sent to review'],
  ['09:16:40', 'reviewer', 'approve', 'tax code confirmed'],
  ['09:16:41', 'document-intake', 'post', 'record written to ERP'],
  ['09:21:12', 'back-office-sync', 'match', 'order matched across CRM and ERP'],
  ['09:21:13', 'back-office-sync', 'propose', 'credit note, awaiting approval'],
  ['09:24:55', 'finance lead', 'approve', 'credit note'],
  ['09:24:56', 'back-office-sync', 'write', 'credit note posted'],
  ['09:30:07', 'support-agent', 'resolve', 'order status request'],
  ['09:31:48', 'support-agent', 'hand off', 'refund request, summary attached'],
  ['09:40:00', 'monitor', 'sample', 'accuracy review drawn'],
]

/** Built to be trusted (tall photo area): a scrolling audit log behind the glass card. */
export function AuditLog({ lines = LOG }: { lines?: LogLine[] }) {
  return (
    <Panel>
      <div className="absolute inset-0 overflow-hidden px-[12%] pt-[14%]">
        <div className={styles.scroll}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="font-mono text-[12px] uppercase leading-[2.4] tracking-[0.05em] text-white/30 md:text-[14px]">
              {lines.map(([t, who, act, what], i) => (
                <li key={i} className="flex gap-6 whitespace-nowrap">
                  <span className="text-white/20">{t}</span>
                  <span className="w-[11rem] shrink-0">{who}</span>
                  <span className="w-[6rem] shrink-0 text-white/50">{act}</span>
                  <span>{what}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Panel>
  )
}

/** Pre-footer (full bleed): concentric rings around the Vahue circle mark. */
export function Rings() {
  return (
    <Panel>
      <svg viewBox="0 0 1600 720" preserveAspectRatio="xMidYMid slice" className={styles.svg}>
        {[90, 170, 260, 360, 470, 590].map((r, i) => (
          <circle key={r} cx={1180} cy={300} r={r} fill="none" stroke={W(0.09 - i * 0.012)} />
        ))}
        <circle cx={1180} cy={300} r={12} fill="white" className={styles.pulse} />
      </svg>
    </Panel>
  )
}

/**
 * Bridge (square, on the inset panel): incoming items flow into the agent, clean ones go on to the system of
 * record and uncertain ones drop to a review queue. Three short input labels and one target label.
 */
export function Pipeline({ inputs, target }: { inputs: [string, string, string]; target: string }) {
  const ys = [112, 200, 288]
  const ax = 222
  const ay = 200
  return (
    <div aria-hidden className="relative h-full w-full">
      <svg viewBox="0 0 400 400" className={styles.svg}>
        {ys.map((y, i) => {
          const d = `M150 ${y} C 186 ${y}, 172 ${ay}, ${ax - 32} ${ay}`
          return (
            <g key={inputs[i]}>
              <path d={d} fill="none" stroke={W(0.16)} />
              <path d={d} fill="none" stroke={W(0.75)} strokeDasharray="3 9" className={styles.flow} />
              <rect x={20} y={y - 16} width={130} height={32} rx={6} fill="#121212" stroke={W(0.22)} />
              <text x={85} y={y + 4} textAnchor="middle" fontSize={10.5} fill={W(0.8)} letterSpacing="0.05em">
                {inputs[i].toUpperCase()}
              </text>
            </g>
          )
        })}
        <path d={`M${ax + 32} ${ay} H 268`} fill="none" stroke={W(0.16)} />
        <path d={`M${ax + 32} ${ay} H 268`} fill="none" stroke={W(0.75)} strokeDasharray="3 9" className={styles.flow} />
        <path d={`M${ax} ${ay + 32} V 300`} fill="none" stroke={W(0.16)} strokeDasharray="2 4" />
        <circle cx={ax} cy={ay} r={32} fill="#161616" stroke={W(0.3)} />
        <circle cx={ax} cy={ay} r={32} fill="none" stroke={W(0.85)} strokeWidth={1.5} strokeDasharray="40 161" strokeLinecap="round" className={styles.orbit} />
        <text x={ax} y={ay + 4} textAnchor="middle" fontSize={11} fill={W(0.85)} letterSpacing="0.05em">
          AGENT
        </text>
        <rect x={268} y={ay - 16} width={116} height={32} rx={6} fill="white" />
        <text x={326} y={ay + 4} textAnchor="middle" fontSize={10.5} fill="#020202" letterSpacing="0.05em">
          {target.toUpperCase()}
        </text>
        <rect x={ax - 52} y={300} width={104} height={30} rx={15} fill="none" stroke={W(0.28)} />
        <text x={ax} y={319} textAnchor="middle" fontSize={10.5} fill={W(0.7)} letterSpacing="0.05em">
          REVIEW
        </text>
      </svg>
    </div>
  )
}
