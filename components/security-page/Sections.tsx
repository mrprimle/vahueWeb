import { PHASES } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import FlatCta from './FlatCta'
import s from './security.module.css'

/*
 * Static sections of Vahue /security, in strict parity with the security clone
 * (components/scale-clone/security/Sections.tsx, spec reference-snapshots/scale-clone/security.md): the same
 * sections, element roles, counts and Scale's own colours; only the copy is Vahue's. Each line is about the length
 * of Scale's line in that slot. Lines written for this page (not in lib/automation-content.ts or
 * lib/case-studies.ts) are marked "page copy" for copy review.
 */

export const CONTACT_EMAIL = 'human@vahue.ai'

/* Material Design icons (react-icons md/*), 32px, same paths and size as the clone. */
const Icon = ({ color, d }: { color: string; d: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style={{ color }} aria-hidden="true">
    <path d={d} />
  </svg>
)
const P = {
  lock: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
  shield:
    'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
  public:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
}

/*
 * Commitment cards (Scale: 3 cards, a short Title Case claim ending in a full stop, then 20 to 40 words).
 * Bodies are CONTROL_FEATURES lines joined to Scale's lengths; icons and tints are Scale's (lock, shield, public).
 */
export const COMMITMENT = {
  over: 'Our Controls', // page copy
  title: 'Controls built into every workflow', // page copy
  cards: [
    {
      icon: <Icon color="#79648C" d={P.lock} />,
      title: 'Protect Our Clients’ Data.', // page copy
      // CONTROL_FEATURES: Role-based access + Review queues + Audit log
      body: 'Agents see only what the role they act for can see. Anything below the confidence threshold goes to a person before it touches a system of record, and every input, decision and action is recorded.',
    },
    {
      icon: <Icon color="#A8927C" d={P.shield} />,
      title: 'Keep People in Control.', // page copy
      // CONTROL_FEATURES: Approvals and dry runs (+ "after a dry run")
      body: 'Agents propose; your team approves the actions that move money, customers or data, after a dry run.',
    },
    {
      icon: <Icon color="#839CB2" d={P.public} />,
      title: 'Run Where Your Data Lives.', // page copy
      // CONTROL_FEATURES: Your cloud or ours; WORKFLOWS guardrails (code in your repositories, explanations stored)
      body: 'We deploy in your VPC or on-premises when data cannot leave, and in our cloud when it can. Code stays in your repositories, explanations are stored with each decision, and accuracy is reviewed against the baseline every month.',
    },
  ],
}

/* CMS SectionHeader: mono overtitle, 30/42/48 title, optional right-hand subtitle (md:flex-row, items-end). */
export function SectionHeader({
  over,
  title,
  sub,
  dark = false,
  className = 'mb-10 md:mb-20 md:mt-12',
}: {
  over: string
  title: string
  sub?: React.ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <div className={`flex flex-col justify-center text-center md:items-start md:text-left ${className}`}>
      <div className="flex w-full flex-col md:flex-row md:items-end md:gap-6">
        <div className="flex flex-col md:flex-1">
          <div className={`${s.overtitle} font-mono ${dark ? 'text-white' : 'text-[#525252]'}`}>
            <span>{over}</span>
          </div>
          <h2 className={`${s.sectionTitle} font-display font-normal ${dark ? 'text-white' : 'text-black'}`}>{title}</h2>
        </div>
        {sub ? (
          <p className={`${s.sectionSub} block font-display font-normal md:flex-1 md:self-end ${dark ? 'text-white/70' : 'text-black/70'}`}>
            {sub}
          </p>
        ) : null}
      </div>
    </div>
  )
}

/*
 * Compliance: 2x2 grid of bordered glass cards on the black ScrollReveal panel (Scale: SOC 2, ISO 27001, DoD IL4,
 * FedRAMP, each ~40 to 50 words plus a pointer to the latest report). Only claims the site already makes:
 * ISO 27001 certification and GDPR (components/PainRecognition.tsx, the expertise pages), plus deployment and
 * code-ownership practices from CONTROL_FEATURES, WORKFLOWS and the expertise FAQ. Badge slots hold text tiles
 * (no third-party marks as images).
 */
const certs: {
  title: string
  badge: string
  body: string
  link: { pre: string; label: string; href: string }
}[] = [
  {
    title: 'ISO 27001',
    badge: 'ISO',
    body: 'ISO/IEC 27001 is the international standard for information security management, set by the International Organization for Standardization. Vahue is ISO 27001 certified, so controls over people, access and client data are part of how every engagement runs, from the audit through the pilot to the agents we operate every day, not something added just before go-live.', // page copy
    link: { pre: 'For the current certificate, write to ', label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  },
  {
    title: 'GDPR',
    badge: 'GDPR',
    body: 'The General Data Protection Regulation sets how personal data is processed. Vahue works to GDPR: personal data is used only for the workflow it was shared for, redacted before it reaches a model where possible, and kept only in the regions you approve for that workflow.', // page copy
    link: { pre: 'How we handle personal data on this site: ', label: 'our privacy policy', href: '/privacy-policy/' },
  },
  {
    title: 'Deployment in Your Cloud or Ours',
    badge: 'VPC',
    body: 'Agents run in your VPC or on-premises when data cannot leave, or in our cloud when it can. Knowledge agents keep the permissions your systems already have, so nobody sees an answer they could not open themselves, and client data stays in the regions you approve.', // page copy (CONTROL_FEATURES + knowledge-agents guardrail)
    link: { pre: 'How deployment works in a pilot: ', label: 'how we operate', href: '/operations/' },
  },
  {
    title: 'Your Code Stays Yours',
    badge: 'IP',
    body: 'Engineers sign NDAs and IP assignment agreements before they see your systems. Code stays in your own repositories, every agent input, decision and action goes to a searchable audit log, and we never reuse client code or share it between projects.', // page copy
    link: { pre: 'Questions about a specific setup or contract: ', label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  },
]

export function Compliance() {
  return (
    <div className="py-[72px] text-white md:py-[120px]">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader
          dark
          over="Compliance"
          title="Certifications and Compliance"
          sub={
            <>
              Learn about Vahue’s certifications, data handling and deployment options. For the latest certificate or a
              question about how a pilot would handle your data, write to{' '}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {certs.map((c) => (
            <article
              key={c.title}
              className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 sm:flex-row sm:items-start md:p-10"
            >
              <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-white/10">
                {/* Text tile in the 40px badge slot (no third-party certification marks). */}
                <span className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-white/15 font-mono text-[10px] uppercase leading-none tracking-[0.02em] text-white">
                  {c.badge}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className={`${s.header5} font-display font-normal text-white`}>{c.title}</h3>
                <p className={`${s.body3} font-display text-white/70`}>
                  {c.body}
                  <br />
                  <br />
                  {c.link.pre}
                  <a className="text-white/70 underline" href={c.link.href}>
                    {c.link.label}.
                  </a>
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
 * Two slate promo cards with an outlined arrow CTA and a 288px visual pinned bottom-right (Scale: "Scale for Public
 * Sector" and the Trust Center card). The 288px slot holds own type-set visuals instead of Scale's images: the three
 * phases, and the Exaware result.
 */
export function Promos() {
  const exaware = getCaseStudy('exaware-governed-noc-agents')
  return (
    <section className="bg-[#f2f2f2] py-[72px] md:py-[120px]">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="grid w-full gap-6 md:grid-cols-2">
          <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-2xl border border-[#839cb2] bg-[#839cb2]">
            <div className="flex flex-col gap-5 p-10">
              <span className={`${s.detailMono} font-mono text-black/50`}>Operations</span>
              <h2 className={`${s.header3} font-display font-normal text-black`}>Vahue for Operations Teams</h2>
              <p className={`${s.body2} font-display text-black/70`}>
                We run the agents day to day after launch: monitoring, exceptions and model updates, with a monthly report against the baseline.
              </p>
              <FlatCta href="/operations/" variant="borderArrow" theme="black" className="font-display">
                Learn more
              </FlatCta>
            </div>
            <ol className="absolute bottom-0 right-0 flex h-72 w-72 flex-col justify-end gap-3 p-10" aria-label="Phases">
              {PHASES.map((ph, i) => (
                <li key={ph.name} className="flex items-baseline justify-between gap-4 border-t border-black/20 pt-3">
                  <span className={`${s.body2} font-display text-black`}>
                    <span className="mr-3 font-mono text-black/50">0{i + 1}</span>
                    {ph.name}
                  </span>
                  <span className={`${s.detailMono} font-mono text-black/50`}>{ph.length}</span>
                </li>
              ))}
            </ol>
          </div>
          {exaware ? (
            <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-2xl border border-[#839cb2] bg-[#839cb2]">
              <div className="flex flex-col gap-5 p-10">
                <span className={`${s.detailMono} font-mono text-black/50`}>Case Study</span>
                <h2 className={`${s.header3} font-display font-normal text-black`}>
                  Learn how Exaware runs governed agents in production
                </h2>
                <p className={`${s.body2} font-display text-black/70`}>{exaware.summary}</p>
                <FlatCta href={`/case-studies/${exaware.slug}/`} variant="borderArrow" theme="black" className="font-display">
                  Read the Exaware case
                </FlatCta>
              </div>
              <div className="absolute bottom-0 right-0 flex h-72 w-72 flex-col items-end justify-end p-10 text-right">
                <span className={`${s.header3} whitespace-nowrap font-display font-normal text-black`}>{exaware.metric}</span>
                <span className={`${s.detailMono} mt-3 font-mono text-black/50`}>Repeatable incidents</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/* Centered responsible-disclosure block. */
export function Disclosure() {
  return (
    <section className="py-[72px] md:py-[120px]">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className={`${s.detailMono} font-mono text-[#929292]`}>Responsible Disclosure</span>
          <h2 className={`${s.header2} max-w-xl font-display font-normal text-black`}>Need to report a vulnerability?</h2>
          <p className={`${s.body1} max-w-md font-display text-[#929292]`}>
            Get in touch with our security team by emailing{' '}
            <a className="underline" href={`mailto:${CONTACT_EMAIL}?subject=Security`}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
