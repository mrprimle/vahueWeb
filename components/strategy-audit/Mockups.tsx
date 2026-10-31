import type { ReactNode } from 'react'
import { PHASES } from '@/lib/automation-content'
import type { MockupKind } from './content'

/*
 * Vahue-styled mock UI drawn in SVG, in place of the clone's product screenshots.
 * The How-it-works frames use the clone's image ratio (1920×1281 → viewBox 640×427) and the
 * solution media its 1920×1160 ratio (640×387), so the layout measures the same as the template.
 * Labels only, no figures: the audit records each client's own numbers.
 */

const W = 640
const H = 427

const C = {
  panel: '#0e0e10',
  card: 'rgba(255,255,255,0.04)',
  cardHi: 'rgba(255,255,255,0.07)',
  line: 'rgba(255,255,255,0.08)',
  lineMid: 'rgba(255,255,255,0.14)',
  lineStrong: 'rgba(255,255,255,0.3)',
  text: '#ffffff',
  t70: 'rgba(255,255,255,0.7)',
  t55: 'rgba(255,255,255,0.55)',
  t40: 'rgba(255,255,255,0.4)',
  /* single soft lavender accent (DESIGN.md: single hue, low alpha) */
  accent: '#b8b8ff',
  accentWash: 'rgba(184,184,255,0.1)',
}

function Frame({ label, children, h = H }: { label: string; children: ReactNode; h?: number }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${h}`}
      role="img"
      aria-label={label}
      className="block h-auto w-full rounded-xl font-display"
      style={{ background: C.panel }}
    >
      {children}
    </svg>
  )
}

function Header({ title, sub, right }: { title: string; sub: string; right?: ReactNode }) {
  return (
    <g>
      <text x={24} y={36} fontSize={15} fill={C.text}>
        {title}
      </text>
      <text x={24} y={54} fontSize={10} fill={C.t55}>
        {sub}
      </text>
      {right}
    </g>
  )
}

/** Pill with an estimated width (≈5.6px per char at 9.5px). */
function Chip({ x, y, label, tone = 'muted', anchor = 'start' }: { x: number; y: number; label: string; tone?: 'muted' | 'accent' | 'solid'; anchor?: 'start' | 'end' }) {
  const w = Math.round(label.length * 5.6 + 18)
  const x0 = anchor === 'end' ? x - w : x
  const fill = tone === 'accent' ? C.accentWash : tone === 'solid' ? '#ffffff' : C.card
  const stroke = tone === 'accent' ? 'rgba(184,184,255,0.35)' : tone === 'solid' ? '#ffffff' : C.lineMid
  const color = tone === 'accent' ? C.accent : tone === 'solid' ? '#020202' : C.t70
  return (
    <g>
      <rect x={x0} y={y} width={w} height={20} rx={10} fill={fill} stroke={stroke} />
      <text x={x0 + w / 2} y={y + 13.5} fontSize={9.5} textAnchor="middle" fill={color}>
        {label}
      </text>
    </g>
  )
}

function Tick({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={8} fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.12)" />
      <path d={`M${cx - 3.5} ${cy} l2.4 2.4 l4.8 -4.8`} stroke={C.t70} strokeWidth={1.4} fill="none" strokeLinecap="round" />
    </g>
  )
}

function Arrow({ d, dashed }: { d: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={dashed ? 'rgba(184,184,255,0.55)' : C.lineStrong}
      strokeWidth={1.2}
      strokeDasharray={dashed ? '4 4' : undefined}
      markerEnd={dashed ? 'url(#sa-arrow-accent)' : 'url(#sa-arrow)'}
    />
  )
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="sa-arrow" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={7} markerHeight={7} orient="auto">
        <path d="M0 0 L8 4 L0 8 z" fill={C.lineStrong} />
      </marker>
      <marker id="sa-arrow-accent" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={7} markerHeight={7} orient="auto">
        <path d="M0 0 L8 4 L0 8 z" fill="rgba(184,184,255,0.55)" />
      </marker>
    </defs>
  )
}

function Node({ x, y, title, sub, exception }: { x: number; y: number; title: string; sub: string; exception?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={112}
        height={54}
        rx={8}
        fill={exception ? C.accentWash : C.card}
        stroke={exception ? 'rgba(184,184,255,0.4)' : C.lineMid}
        strokeDasharray={exception ? '4 3' : undefined}
      />
      <text x={x + 12} y={y + 23} fontSize={12} fill={exception ? C.accent : C.text}>
        {title}
      </text>
      <text x={x + 12} y={y + 40} fontSize={9.5} fill={C.t55}>
        {sub}
      </text>
    </g>
  )
}

function WorkflowMap() {
  return (
    <Frame label="Workflow map: items arrive, triage, data entry and approval, with exceptions routed to manual follow-up">
      <ArrowDefs />
      <Header title="Workflow map" sub="One workflow, end to end, as it runs today" right={<Chip x={616} y={26} label="Audit" anchor="end" />} />
      <rect x={24} y={76} width={592} height={276} rx={12} fill="none" stroke={C.line} />
      <Node x={44} y={110} title="Items arrive" sub="Inbox and portal" />
      <Node x={186} y={110} title="Triage" sub="Operations team" />
      <Node x={328} y={110} title="Data entry" sub="ERP" />
      <Node x={470} y={110} title="Approval" sub="Finance" />
      <Arrow d="M156 137 H184" />
      <Arrow d="M298 137 H326" />
      <Arrow d="M440 137 H468" />
      <Node x={186} y={262} title="Exceptions" sub="Missing or unclear" exception />
      <Node x={328} y={262} title="Follow-up" sub="Email, spreadsheet" />
      <Node x={470} y={262} title="Posted" sub="System of record" />
      <Arrow d="M242 166 V260" dashed />
      <Arrow d="M298 289 H326" />
      <Arrow d="M384 260 V166" />
      <Arrow d="M526 166 V260" />
      <text x={252} y={218} fontSize={9.5} fill={C.accent}>
        exception
      </text>
      <text x={394} y={218} fontSize={9.5} fill={C.t55}>
        rework
      </text>
      {/* legend */}
      <g fontSize={10} fill={C.t55}>
        <rect x={24} y={378} width={14} height={10} rx={3} fill={C.card} stroke={C.lineMid} />
        <text x={46} y={387}>Step</text>
        <path d="M92 383 H116" stroke={C.lineStrong} strokeWidth={1.2} />
        <text x={124} y={387}>Handoff</text>
        <path d="M184 383 H208" stroke="rgba(184,184,255,0.55)" strokeWidth={1.2} strokeDasharray="4 4" />
        <text x={216} y={387}>Exception path</text>
        <text x={616} y={387} textAnchor="end">
          Mapped with your team
        </text>
      </g>
    </Frame>
  )
}

const BASELINE_ROWS = [
  ['Volume', 'Items per week', 'Inbox and ERP export'],
  ['Minutes per item', 'Timed sample of real items', 'Team observation'],
  ['Error rate', 'Items reworked or returned', 'Ticket history'],
  ['Cost', 'Hours and tool spend', 'Finance'],
]

function BaselineTable() {
  const cols = [24, 172, 368, 532]
  return (
    <Frame label="Baseline table: volume, minutes per item, error rate and cost, each recorded from your own data">
      <Header title="Baseline" sub="Recorded during the audit, on your own data" right={<Chip x={616} y={26} label="Audit" anchor="end" />} />
      <rect x={24} y={76} width={592} height={30} rx={6} fill={C.card} />
      <g fontSize={9.5} fill={C.t40} letterSpacing={0.6}>
        <text x={cols[0] + 12} y={95}>MEASURE</text>
        <text x={cols[1]} y={95}>HOW WE RECORD IT</text>
        <text x={cols[2]} y={95}>SOURCE</text>
        <text x={cols[3]} y={95}>STATUS</text>
      </g>
      {BASELINE_ROWS.map(([measure, how, source], i) => {
        const y = 106 + i * 58
        return (
          <g key={measure}>
            <text x={cols[0] + 12} y={y + 34} fontSize={13} fill={C.text}>
              {measure}
            </text>
            <text x={cols[1]} y={y + 34} fontSize={11} fill={C.t70}>
              {how}
            </text>
            <text x={cols[2]} y={y + 34} fontSize={11} fill={C.t55}>
              {source}
            </text>
            <Chip x={cols[3]} y={y + 20} label="Recorded" />
            <path d={`M24 ${y + 58} H616`} stroke={C.line} />
          </g>
        )
      })}
      <text x={24} y={378} fontSize={10.5} fill={C.t55}>
        Every pilot result and monthly report is compared with this baseline.
      </text>
    </Frame>
  )
}

function Field({ x, y, label, value }: { x: number; y: number; label: string; value: string }) {
  return (
    <g>
      <text x={x} y={y} fontSize={9} fill={C.t40} letterSpacing={0.6}>
        {label.toUpperCase()}
      </text>
      <text x={x} y={y + 19} fontSize={13} fill={C.text}>
        {value}
      </text>
    </g>
  )
}

function TargetSheet() {
  return (
    <Frame label="Target and stop point, agreed and signed off before the pilot">
      <Header title="Target and stop point" sub="Agreed in writing before any agent runs" right={<Chip x={616} y={26} label="Audit" anchor="end" />} />
      {[
        { x: 24, title: 'Target', fields: [['Measure', 'Minutes per item'], ['Compared with', 'The recorded baseline'], ['Checked', 'Weekly during the pilot']] },
        { x: 330, title: 'Stop point', fields: [['Condition', 'Accuracy does not hold'], ['Decision', 'Stop, or narrow the scope'], ['Owner', 'Your operations lead']] },
      ].map((card) => (
        <g key={card.title}>
          <rect x={card.x} y={76} width={286} height={206} rx={12} fill={C.card} stroke={C.lineMid} />
          <text x={card.x + 20} y={104} fontSize={14} fill={C.text}>
            {card.title}
          </text>
          {card.fields.map(([label, value], i) => (
            <Field key={label} x={card.x + 20} y={136 + i * 48} label={label} value={value} />
          ))}
        </g>
      ))}
      <rect x={24} y={298} width={592} height={96} rx={12} fill="none" stroke={C.line} />
      <text x={44} y={324} fontSize={9} fill={C.t40} letterSpacing={0.6}>
        SIGN-OFF
      </text>
      {['Operations lead', 'Finance lead', 'Vahue'].map((who, i) => {
        const x = 44 + i * 196
        return (
          <g key={who}>
            <Tick cx={x + 8} cy={358} />
            <text x={x + 24} y={362} fontSize={12} fill={C.text}>
              {who}
            </text>
            <text x={x + 24} y={378} fontSize={9.5} fill={C.t55}>
              Agreed
            </text>
          </g>
        )
      })}
    </Frame>
  )
}

const QUEUE = [
  { title: 'Supplier invoice', action: 'Proposed: post to ERP', fill: 0.86, low: false },
  { title: 'Address change request', action: 'Proposed: update CRM record', fill: 0.78, low: false },
  { title: 'Purchase order match', action: 'Proposed: match and approve', fill: 0.34, low: true },
  { title: 'Refund request', action: 'Proposed: route to finance', fill: 0.82, low: false },
  { title: 'Contract renewal', action: 'Proposed: draft renewal notice', fill: 0.4, low: true },
]

function ReviewQueue() {
  return (
    <Frame label="Review queue: a person on your team approves, edits or escalates every agent output during the pilot">
      <Header title="Review queue" sub="Every output checked by your team until accuracy holds" right={<Chip x={616} y={26} label="Pilot" anchor="end" tone="accent" />} />
      <g fontSize={11}>
        <text x={24} y={84} fill={C.text}>
          Pending
        </text>
        <path d="M24 92 H70" stroke="#ffffff" strokeWidth={1.5} />
        <text x={92} y={84} fill={C.t40}>
          Approved
        </text>
        <text x={166} y={84} fill={C.t40}>
          Escalated
        </text>
      </g>
      <path d="M24 92.5 H616" stroke={C.line} />
      {QUEUE.map((row, i) => {
        const y = 100 + i * 58
        return (
          <g key={row.title}>
            {row.low ? <rect x={24} y={y + 4} width={592} height={50} rx={8} fill={C.accentWash} /> : null}
            {row.low ? <rect x={24} y={y + 4} width={2.5} height={50} rx={1} fill={C.accent} /> : null}
            <text x={40} y={y + 26} fontSize={12.5} fill={C.text}>
              {row.title}
            </text>
            <text x={40} y={y + 43} fontSize={10} fill={C.t55}>
              {row.action}
            </text>
            <rect x={300} y={y + 20} width={96} height={4} rx={2} fill="rgba(255,255,255,0.1)" />
            <rect x={300} y={y + 20} width={96 * row.fill} height={4} rx={2} fill={row.low ? C.accent : 'rgba(255,255,255,0.6)'} />
            <text x={300} y={y + 42} fontSize={9.5} fill={row.low ? C.accent : C.t55}>
              {row.low ? 'Below threshold' : 'Above threshold'}
            </text>
            {row.low ? (
              <>
                <Chip x={600} y={y + 19} label="Escalate" anchor="end" />
                <Chip x={530} y={y + 19} label="Review" anchor="end" tone="solid" />
              </>
            ) : (
              <>
                <Chip x={600} y={y + 19} label="Edit" anchor="end" />
                <Chip x={556} y={y + 19} label="Approve" anchor="end" tone="solid" />
              </>
            )}
            {!row.low && i < QUEUE.length - 1 && !QUEUE[i + 1].low ? <path d={`M24 ${y + 58} H616`} stroke={C.line} /> : null}
          </g>
        )
      })}
    </Frame>
  )
}

const TILES = [
  { label: 'Items handled', d: 'M0 30 L18 26 L36 27 L54 20 L72 18 L90 12 L108 9' },
  { label: 'Hours returned', d: 'M0 32 L18 28 L36 24 L54 22 L72 15 L90 13 L108 8' },
  { label: 'Exceptions', d: 'M0 10 L18 14 L36 13 L54 20 L72 22 L90 26 L108 27' },
  { label: 'Accuracy', d: 'M0 22 L18 18 L36 16 L54 14 L72 12 L90 11 L108 10' },
]

function ResultsDashboard() {
  return (
    <Frame label="Results dashboard: items handled, hours returned, exceptions and accuracy, reported monthly against the baseline">
      <Header title="Monthly report" sub="Reported against the audit baseline" right={<Chip x={616} y={26} label="Operate" anchor="end" tone="accent" />} />
      {TILES.map((t, i) => {
        const x = 24 + i * 152
        return (
          <g key={t.label}>
            <rect x={x} y={72} width={136} height={100} rx={10} fill={C.card} stroke={C.lineMid} />
            <text x={x + 14} y={94} fontSize={10.5} fill={C.t70}>
              {t.label}
            </text>
            <g transform={`translate(${x + 14} ${104})`}>
              <path d={t.d} fill="none" stroke="#ffffff" strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
            </g>
            <text x={x + 14} y={158} fontSize={9.5} fill={C.t55}>
              vs baseline
            </text>
          </g>
        )
      })}
      <rect x={24} y={186} width={592} height={212} rx={12} fill={C.card} stroke={C.lineMid} />
      <text x={44} y={212} fontSize={12} fill={C.text}>
        Minutes per item
      </text>
      <rect x={250} y={226} width={346} height={126} fill="rgba(255,255,255,0.02)" />
      <path d="M250 226 V352" stroke={C.line} />
      <text x={56} y={240} fontSize={9} fill={C.t40} letterSpacing={0.6}>
        BEFORE
      </text>
      <text x={262} y={240} fontSize={9} fill={C.t40} letterSpacing={0.6}>
        PILOT AND OPERATE
      </text>
      <path d="M44 270 H596" stroke={C.accent} strokeOpacity={0.55} strokeDasharray="5 5" />
      <text x={596} y={262} fontSize={9.5} fill={C.accent} textAnchor="end">
        Baseline
      </text>
      <path
        d="M44 272 L80 266 L116 274 L152 268 L188 271 L224 267 L250 270 L286 292 L322 306 L358 318 L394 326 L430 331 L466 334 L502 336 L538 337 L574 338 L596 338"
        fill="none"
        stroke="#ffffff"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <text x={44} y={378} fontSize={9.5} fill={C.t55}>
        Exceptions, accuracy reviews and model updates logged each month
      </text>
    </Frame>
  )
}

export function AuditMockup({ kind }: { kind: MockupKind }) {
  switch (kind) {
    case 'map':
      return <WorkflowMap />
    case 'baseline':
      return <BaselineTable />
    case 'target':
      return <TargetSheet />
    case 'review':
      return <ReviewQueue />
    case 'results':
      return <ResultsDashboard />
  }
}

const PHASE_STEPS: Record<string, string[]> = {
  Audit: ['Map the workflow', 'Record the baseline', 'Set target and stop point'],
  Pilot: ['Your data, real volume', 'Every output checked', 'Run until accuracy holds'],
  Operate: ['Agents run day to day', 'Exceptions and updates', 'Monthly report vs baseline'],
}

/** Solution media: the three phases with the audit highlighted (ratio of the clone's 1920×1160 image). */
export function PhaseTimeline() {
  const h = 387
  const colW = (W - 48 - 32) / 3
  return (
    <Frame label="Three phases: a two-week audit, a four to six week pilot, then monthly operation" h={h}>
      <defs>
        <pattern id="sa-dots" width={24} height={24} patternUnits="userSpaceOnUse">
          <circle cx={1} cy={1} r={1} fill="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width={W} height={h} fill="url(#sa-dots)" />
      <path d={`M${24 + colW / 2} 64 H${W - 24 - colW / 2}`} stroke={C.lineMid} />
      {PHASES.map((p, i) => {
        const x = 24 + i * (colW + 16)
        const active = i === 0
        return (
          <g key={p.name}>
            <circle cx={x + colW / 2} cy={64} r={active ? 7 : 5} fill={active ? '#ffffff' : C.panel} stroke={active ? '#ffffff' : C.lineStrong} />
            {active ? <circle cx={x + colW / 2} cy={64} r={13} fill="none" stroke="rgba(255,255,255,0.25)" /> : null}
            <rect
              x={x}
              y={100}
              width={colW}
              height={250}
              rx={14}
              fill={active ? C.cardHi : C.card}
              stroke={active ? 'rgba(255,255,255,0.32)' : C.line}
            />
            <text x={x + 18} y={132} fontSize={9} fill={C.t40} letterSpacing={0.6}>
              {`PHASE ${['ONE', 'TWO', 'THREE'][i]}`}
            </text>
            <text x={x + 18} y={160} fontSize={20} fill={C.text}>
              {p.name}
            </text>
            <text x={x + 18} y={180} fontSize={11} fill={C.t55}>
              {p.length}
            </text>
            <path d={`M${x + 18} 198 H${x + colW - 18}`} stroke={C.line} />
            {(PHASE_STEPS[p.name] ?? []).map((step, j) => (
              <g key={step}>
                <circle cx={x + 21} cy={224 + j * 30} r={2.5} fill={active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)'} />
                <text x={x + 32} y={228 + j * 30} fontSize={10.5} fill={active ? C.t70 : C.t55}>
                  {step}
                </text>
              </g>
            ))}
            {active ? <Chip x={x + 18} y={314} label="Starts here" tone="solid" /> : null}
          </g>
        )
      })}
    </Frame>
  )
}
