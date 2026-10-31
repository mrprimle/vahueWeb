import { INTEGRATIONS, POSITIONING } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import FlatCta from './FlatCta'
import { CornerGlyph } from './icons'
import s from './hub.module.css'

/*
 * Static blocks of the /automations hub, on the data-engine clone's layout
 * (components/scale-clone/data-engine/StaticSections.tsx), inverted to Vahue dark.
 */

/* ---------- Integrations strip (clone: customer logo strip; no customer logos on Vahue) ---------- */
const HALF = Math.ceil(INTEGRATIONS.length / 2)
const ROWS = [INTEGRATIONS.slice(0, HALF), INTEGRATIONS.slice(HALF)]

export function IntegrationStrip() {
  return (
    <section className="pb-14 pt-10 md:pb-20 md:pt-10" aria-labelledby="hub-integrations">
      <div className="mx-auto w-full px-6">
        <p id="hub-integrations" className={`${s.detailMono} mb-8 text-center font-mono text-white/55`}>
          Integrations · Runs inside the tools you already use
        </p>
        {/* Two rows of seven, each laid out like the clone's seven-logo strip. */}
        <div className="w-full space-y-6 overflow-x-auto md:space-y-8">
          {ROWS.map((row, r) => (
            <ul key={r} className="flex min-w-max items-center justify-around gap-12 md:min-w-0 md:gap-10">
              {row.map((name) => (
                <li key={name} className="flex shrink-0 items-center justify-center">
                  <span className="font-display text-[18px] leading-none tracking-[-0.01em] text-white/55">{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Flow illustration (clone: the-business.webp line illustration) ---------- */
function FlowIllustration() {
  const box = { fill: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.18)', strokeWidth: 1.5 }
  const line = { stroke: 'rgba(255,255,255,0.35)', strokeWidth: 1.5, fill: 'none' }
  const label = { fontSize: 22, fill: '#fff' }
  const small = { fontSize: 15, fill: 'rgba(255,255,255,0.55)' }
  return (
    <svg
      viewBox="0 0 760 520"
      className="h-auto w-full max-w-[760px] font-display"
      role="img"
      aria-label="Incoming work goes to an agent; confident results are written to your systems, uncertain ones go to a person for review."
    >
      <defs>
        <marker id="hub-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 1 L9 5 L0 9 z" fill="rgba(255,255,255,0.45)" />
        </marker>
      </defs>
      {/* incoming items */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={10 + i * 10} y={190 + i * 10} width="180" height="100" rx="14" {...box} />
      ))}
      <text x="120" y="250" textAnchor="middle" {...label}>
        Incoming work
      </text>
      <text x="120" y="274" textAnchor="middle" {...small}>
        email, portals, systems
      </text>
      <path d="M212 250 H286" {...line} markerEnd="url(#hub-flow-arrow)" />
      {/* agent */}
      <rect x="292" y="180" width="170" height="140" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <text x="377" y="246" textAnchor="middle" {...label}>
        Agent
      </text>
      <text x="377" y="272" textAnchor="middle" {...small}>
        reads, checks, acts
      </text>
      {/* branches */}
      <path d="M462 220 C520 220 520 120 576 120" {...line} markerEnd="url(#hub-flow-arrow)" />
      <path d="M462 280 C520 280 520 380 576 380" {...line} strokeDasharray="6 6" markerEnd="url(#hub-flow-arrow)" />
      <text x="519" y="160" textAnchor="middle" {...small}>
        confident
      </text>
      <text x="519" y="352" textAnchor="middle" {...small}>
        unsure
      </text>
      <rect x="582" y="72" width="160" height="96" rx="14" {...box} />
      <text x="662" y="114" textAnchor="middle" {...label}>
        Your systems
      </text>
      <text x="662" y="138" textAnchor="middle" {...small}>
        ERP, CRM, finance
      </text>
      <rect x="582" y="332" width="160" height="96" rx="14" {...box} strokeDasharray="6 5" />
      <text x="662" y="374" textAnchor="middle" {...label}>
        Review queue
      </text>
      <text x="662" y="398" textAnchor="middle" {...small}>
        a person decides
      </text>
      <path d="M662 332 V176" {...line} strokeDasharray="6 6" markerEnd="url(#hub-flow-arrow)" />
    </svg>
  )
}

/* ---------- Who it's for: intro + illustration, 2x2 value cards (clone: "Best in the business") ---------- */
const VALUES = [
  {
    title: 'Measured from day one',
    color: 'rgba(255,255,255,0.6)',
    body: 'Before anything is built we record the baseline: volume, minutes per item, error rate and cost. Every report is read against it.',
  },
  {
    title: 'Inside your tools',
    color: 'rgba(255,255,255,0.45)',
    body: 'Agents work in the email, ERP, CRM and chat your team already uses. No new system for anyone to learn.',
  },
  {
    title: 'People stay in control',
    color: 'rgba(255,255,255,0.6)',
    body: 'Anything uncertain, or anything that moves money, customers or data, waits for a person on your team.',
  },
  {
    title: 'We run it',
    color: 'rgba(255,255,255,0.45)',
    body: 'After the pilot we operate the agents day to day: monitoring, exceptions, accuracy reviews and model updates.',
  },
]

export function WhoItsFor() {
  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto w-full px-6">
        <div className="rounded-2xl border border-border-soft bg-white/[0.03] p-6 md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(560px,1.05fr)] lg:items-stretch">
            <div className="flex flex-col justify-between gap-10">
              <div className="max-w-[460px]">
                <p className={`${s.detailMono} mb-4 font-mono text-white/55`}>Who it&apos;s for</p>
                <h2 className={`${s.header3} font-normal text-white`}>When the volume has outgrown the team</h2>
                <p className={`${s.body2} mt-4 text-white/60`}>{POSITIONING.forWho}</p>
              </div>
              <div className="flex min-h-[360px] items-center justify-center lg:min-h-[560px]">
                <FlowIllustration />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
              {VALUES.map((v) => (
                <article
                  key={v.title}
                  className="flex min-h-[200px] flex-col justify-between gap-8 rounded-xl border border-border-soft bg-white/[0.04] p-6 md:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <h3 className={`${s.header5} font-normal text-white`}>{v.title}</h3>
                    <div className="h-[17px] w-[17px] shrink-0" style={{ color: v.color }}>
                      <CornerGlyph className="inline-block h-full w-full align-top" />
                    </div>
                  </div>
                  <p className={`${s.body2} text-white/60`}>{v.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Featured case (clone: customer case study; brand panel -> metric panel) ---------- */
const FEATURED_SLUG = 'amerit-repair-order-ai'

export function FeaturedCase() {
  const c = getCaseStudy(FEATURED_SLUG)
  if (!c) return null
  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto w-full px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.15fr)]">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border-mid bg-white/[0.06] md:min-h-[420px]">
            <div className="flex h-full min-h-[280px] flex-col items-start justify-between gap-10 p-10 md:min-h-[420px]">
              <p className={`${s.detailMono} font-mono text-white/55`}>
                {c.client} · {c.disclosure}
              </p>
              <p className={`${s.header2} font-display font-normal text-white`}>{c.metric}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-12 p-6 md:p-10 lg:p-12">
            <div>
              <p className={`${s.detailMono} font-mono text-white/55`}>Results · Scoring and decisions</p>
              <h2 className={`${s.header3} mt-4 font-normal text-white`}>{c.summary}</h2>
            </div>
            <FlatCta href={`/case-studies/${c.slug}/`} variant="fill" theme="white">
              Read the case study
            </FlatCta>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Centered section header (overtitle / title / subtitle) ---------- */
export function SectionHeader({
  over,
  title,
  sub,
  className = '',
  id,
}: {
  over: string
  title: string
  sub?: string
  className?: string
  id?: string
}) {
  return (
    <div className={`mx-auto flex max-w-3xl flex-col items-center justify-center text-center ${className}`}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className={`${s.overtitle} font-mono`}>
            <span>{over}</span>
          </div>
          <h2 id={id} className={`${s.sectionTitle} font-display font-normal`}>
            {title}
          </h2>
        </div>
        {sub ? <p className={`${s.sectionSub} block w-full font-normal`}>{sub}</p> : null}
      </div>
    </div>
  )
}
