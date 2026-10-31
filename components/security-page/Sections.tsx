import Link from 'next/link'
import { PHASES, WORKFLOWS } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import FlatCta from './FlatCta'
import s from './security.module.css'

/*
 * Static sections of Vahue /security, on the layout of the security clone
 * (components/scale-clone/security/Sections.tsx, spec reference-snapshots/scale-clone/security.md).
 * Scale's light surfaces are inverted to Vahue dark; sizes, spacing and radii are unchanged.
 */

export const CONTACT_EMAIL = 'human@vahue.ai'

/* Material Design icons (react-icons md/*), 32px, same paths and size as the clone. */
const Icon = ({ color, d }: { color: string; d: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style={{ color }} aria-hidden="true">
    <path d={d} />
  </svg>
)
const P = {
  inbox:
    'M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z',
  check:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  lock:
    'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
  history:
    'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
  cloud:
    'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z',
  chart: 'M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z',
  shield:
    'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
  public:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
}

/* The clone's three icon tints (#79648C, #A8927C, #839CB2), lifted for contrast on dark surfaces. */
const TINT = ['#B3A3C2', '#CDB9A5', '#A9BED0']

/** Icon per CONTROL_FEATURES title (order as in lib/automation-content.ts). */
export const CONTROL_ICONS: Record<string, React.ReactNode> = {
  'Review queues': <Icon color={TINT[0]} d={P.inbox} />,
  'Approvals and dry runs': <Icon color={TINT[1]} d={P.check} />,
  'Role-based access': <Icon color={TINT[2]} d={P.lock} />,
  'Audit log': <Icon color={TINT[0]} d={P.history} />,
  'Your cloud or ours': <Icon color={TINT[1]} d={P.cloud} />,
  'Results dashboard': <Icon color={TINT[2]} d={P.chart} />,
}

/* CMS SectionHeader: mono overtitle, 30/42/48 title, optional right-hand subtitle (md:flex-row, items-end). */
export function SectionHeader({
  over,
  title,
  sub,
  className = 'mb-10 md:mb-20 md:mt-12',
}: {
  over: string
  title: string
  sub?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col justify-center text-center md:items-start md:text-left ${className}`}>
      <div className="flex w-full flex-col md:flex-row md:items-end md:gap-6">
        <div className="flex flex-col md:flex-1">
          <div className={`${s.overtitle} font-mono text-white/55`}>
            <span>{over}</span>
          </div>
          <h2 className={`${s.sectionTitle} font-display font-normal text-white`}>{title}</h2>
        </div>
        {sub ? (
          <p className={`${s.sectionSub} block font-display font-normal text-white/70 md:flex-1 md:self-end`}>{sub}</p>
        ) : null}
      </div>
    </div>
  )
}

/*
 * Data handling: the clone's compliance-badge grid on the ScrollReveal panel.
 * Only claims the site already makes elsewhere: ISO 27001 certification and GDPR compliance
 * (components/PainRecognition.tsx, app/ai-native-engineering/expertise/[slug]/page.tsx), plus
 * deployment and code-ownership practices stated in CONTROL_FEATURES, WORKFLOWS and the expertise FAQ.
 */
const dataCards: {
  title: string
  body: string
  badge: React.ReactNode
  link: { pre: string; label: string; href: string }
}[] = [
  {
    title: 'ISO 27001',
    body: 'Vahue is ISO 27001 certified for information security management. Controls over people, access and client data are part of how every engagement runs, not something added before go-live.',
    // eslint-disable-next-line @next/next/no-img-element
    badge: <img src="/img/iso.png" alt="ISO 27001 certified" width={40} height={40} className="h-10 w-10 rounded-full bg-white" />,
    link: { pre: 'For the current certificate, write to ', label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  },
  {
    title: 'GDPR',
    body: 'Personal data is processed only for the workflow it was shared for. Pipelines use the fields a task needs, redact personal data before it reaches a model where they can, and keep data in the regions you approve.',
    badge: <Icon color={TINT[2]} d={P.public} />,
    link: { pre: 'How we handle personal data on this site: ', label: 'privacy policy', href: '/privacy-policy/' },
  },
  {
    title: 'Data stays where you decide',
    body: 'Agents run in your VPC or on-premises when data cannot leave, or in our cloud when it can. Knowledge agents keep the permissions your systems already have, so nobody sees an answer they could not open themselves.',
    badge: <Icon color={TINT[1]} d={P.cloud} />,
    link: { pre: 'How deployment works in a pilot: ', label: 'how we operate', href: '/operations/' },
  },
  {
    title: 'Your code and data stay yours',
    body: 'Engineers sign NDAs and IP assignment agreements. Code stays in your repositories, and we never reuse client code or share it between projects.',
    badge: <Icon color={TINT[0]} d={P.shield} />,
    link: { pre: 'Questions about a specific setup: ', label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  },
]

export function DataHandling() {
  return (
    <div className="py-[72px] text-white md:py-[120px]">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader
          over="Data handling"
          title="How we handle your data"
          sub={
            <>
              Vahue is ISO 27001 certified and works to GDPR. For certificates or questions about how a pilot would
              handle your data, write to{' '}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {dataCards.map((c) => (
            <article
              key={c.title}
              className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 sm:flex-row sm:items-start md:p-10"
            >
              <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-white/10">{c.badge}</div>
              <div className="flex flex-col gap-3">
                <h3 className={`${s.header5} font-display font-normal text-white`}>{c.title}</h3>
                <p className={`${s.body3} font-display text-white/70`}>
                  {c.body}
                  <br />
                  <br />
                  {c.link.pre}
                  <a className="text-white/70 underline hover:text-white" href={c.link.href}>
                    {c.link.label}
                  </a>
                  .
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

/*
 * Guardrails per workflow (WORKFLOWS[].guardrails). Not in the clone: added between the data-handling
 * panel and the promo cards, in the clone's container, SectionHeader and hairline-card language.
 */
export function WorkflowGuardrails() {
  return (
    <section className="bg-[#0e0e10] pt-[72px] md:pt-[120px]">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader
          over="Guardrails"
          title="The limits each workflow ships with"
          sub="On top of the controls above, every workflow we run has its own guardrails, agreed in the audit and checked in the pilot."
          className="mb-10 md:mb-16"
        />
        <ul className="border-t border-border-soft">
          {WORKFLOWS.map((w) => (
            <li key={w.slug} className="grid gap-4 border-b border-border-soft py-6 md:grid-cols-12 md:gap-2 md:py-8">
              <div className="md:col-span-4">
                <Link
                  href={`/automations/${w.slug}/`}
                  className={`${s.header5} font-display font-normal text-white underline-offset-4 hover:underline`}
                >
                  {w.label}
                </Link>
              </div>
              <ul className="flex flex-col gap-3 md:col-span-8 md:flex-row md:gap-2">
                {w.guardrails.map((g) => (
                  <li key={g} className={`${s.body2} flex flex-1 items-start gap-3 font-display text-white/70`}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" aria-hidden="true" />
                    {g}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/*
 * Two promo cards (clone: slate cards with a 288px image bottom-right). The images are Scale's, so the
 * 288px slot carries type instead: the rollout phases, and the Exaware result.
 */
export function Promos() {
  const exaware = getCaseStudy('exaware-governed-noc-agents')
  return (
    <section className="bg-[#0e0e10] py-[72px] md:py-[120px]">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="grid w-full gap-6 md:grid-cols-2">
          <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-2xl border border-border-mid bg-surface-2">
            <div className="flex flex-col gap-5 p-10">
              <span className={`${s.detailMono} font-mono text-white/50`}>Rollout</span>
              <h2 className={`${s.header3} font-display font-normal text-white`}>Scope grows only after accuracy holds</h2>
              <p className={`${s.body2} font-display text-white/70`}>
                The audit sets the target and the point at which we stop. In the pilot a person on your team checks every
                output on real volume. Once we operate, accuracy is reviewed every month against the baseline.
              </p>
              <FlatCta href="/operations/" variant="borderArrow" theme="white" className="font-display">
                See how we operate
              </FlatCta>
            </div>
            <ol className="absolute bottom-0 right-0 flex h-72 w-72 flex-col justify-end gap-3 p-10" aria-label="Phases">
              {PHASES.map((ph, i) => (
                <li key={ph.name} className="flex items-baseline justify-between gap-4 border-t border-border-mid pt-3">
                  <span className={`${s.body2} font-display text-white`}>
                    <span className="mr-3 font-mono text-white/45">0{i + 1}</span>
                    {ph.name}
                  </span>
                  <span className={`${s.detailMono} font-mono text-white/50`}>{ph.length}</span>
                </li>
              ))}
            </ol>
          </div>
          {exaware ? (
            <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-2xl border border-border-mid bg-surface-2">
              <div className="flex flex-col gap-5 p-10">
                <span className={`${s.detailMono} font-mono text-white/50`}>
                  Case study · {exaware.client} · {exaware.disclosure}
                </span>
                <h2 className={`${s.header3} font-display font-normal text-white`}>
                  Zero unauthorized execution in UAT and staging
                </h2>
                <p className={`${s.body2} font-display text-white/70`}>{exaware.summary}</p>
                <FlatCta href={`/case-studies/${exaware.slug}/`} variant="borderArrow" theme="white" className="font-display">
                  Read the case
                </FlatCta>
              </div>
              <div className="absolute bottom-0 right-0 flex h-72 w-72 flex-col items-end justify-end p-10 text-right">
                <span className={`${s.header3} whitespace-nowrap font-display font-light text-white`}>{exaware.metric}</span>
                <span className={`${s.detailMono} mt-3 font-mono text-white/50`}>Resolution time, repeatable incidents</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/* Centered disclosure block. */
export function Disclosure() {
  return (
    <section className="py-[72px] md:py-[120px]">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className={`${s.detailMono} font-mono text-white/55`}>Security questions</span>
          <h2 className={`${s.header2} max-w-xl font-display font-normal text-white`}>Found a security issue to share?</h2>
          <p className={`${s.body1} max-w-md font-display text-white/55`}>
            Tell us at{' '}
            <a className="underline hover:text-white" href={`mailto:${CONTACT_EMAIL}?subject=Security`}>
              {CONTACT_EMAIL}
            </a>
            . The same address answers questions about a pilot’s access, data or deployment.
          </p>
        </div>
      </div>
    </section>
  )
}
