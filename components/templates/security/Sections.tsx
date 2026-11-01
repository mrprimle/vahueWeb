import FlatCta from './FlatCta'
import s from './security.module.css'

const ASSET = '/templates/security'

/* Material Design icons (react-icons md/*), as on scale.com: lock, shield (security), public. */
export const MdLock = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style={{ color }} aria-hidden="true">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
)
export const MdSecurity = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style={{ color }} aria-hidden="true">
    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
  </svg>
)
export const MdPublic = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style={{ color }} aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)

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
  sub?: string
  dark?: boolean
  className?: string
}) {
  return (
    <div className={`flex flex-col justify-center text-center md:items-start md:text-left ${className}`}>
      <div className="flex w-full flex-col md:flex-row md:items-end md:gap-6">
        <div className="flex flex-col md:flex-1">
          {/* TODO: Vahue copy */}
          <div className={`${s.overtitle} font-mono ${dark ? 'text-white' : 'text-[#525252]'}`}>
            <span>{over}</span>
          </div>
          {/* TODO: Vahue copy */}
          <h2 className={`${s.sectionTitle} font-display font-normal ${dark ? 'text-white' : 'text-black'}`}>{title}</h2>
        </div>
        {sub ? (
          /* TODO: Vahue copy */
          <p className={`${s.sectionSub} block font-display font-normal md:flex-1 md:self-end ${dark ? 'text-white/70' : 'text-black/70'}`}>
            {sub}
          </p>
        ) : null}
      </div>
    </div>
  )
}

/* Compliance: 2x2 grid of bordered glass cards on the black ScrollReveal panel. */
const certs = [
  {
    title: 'Placeholder Audit Report',
    body: 'Placeholder paragraph describing an independent attestation, the body that issues it and the controls it covers. The report demonstrates a commitment to protecting customer data through security, availability and confidentiality controls aligned with the published trust services criteria for this placeholder framework, reviewed every year by an outside firm.',
  },
  {
    title: 'Placeholder Standard',
    body: 'Placeholder paragraph describing an international management-system standard and how the platform and services are certified against it, by an accredited auditor, with the current certificate and its scope statement available for download from the Trust Center for every customer.',
  },
  {
    title: 'Placeholder Provisional Authorization',
    body: 'Placeholder paragraph describing a government authorization, the agency that grants it and the security requirements guide a cloud service has to meet before it can host sensitive workloads for defense customers, as defined in the requirements guide (SRG).',
  },
  {
    title: 'Placeholder Program Authorized',
    body: 'Placeholder paragraph describing a government-wide program that standardizes security assessment, authorization and continuous monitoring for all cloud products and services used by federal agencies across the whole of the government.',
  },
]

export function Compliance() {
  return (
    <div className="py-[72px] text-white md:py-[120px]">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader
          dark
          over="Placeholder"
          title="Placeholder Compliance Title"
          sub="Placeholder subtitle about the certifications, frameworks and compliance programs in place. To access the latest security compliance certifications and reports, please visit the Trust Center."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {certs.map((c) => (
            <article
              key={c.title}
              className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 sm:flex-row sm:items-start md:p-10"
            >
              <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-white/10">
                {/* TODO: certification badge (neutral placeholder tile, Scale's badges not shipped) */}
                <div className="h-10 w-10 rounded-[4px] bg-white/15" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-3">
                {/* TODO: Vahue copy */}
                <h3 className={`${s.header5} font-display font-normal text-white`}>{c.title}</h3>
                {/* TODO: Vahue copy */}
                <p className={`${s.body3} font-display text-white/70`}>
                  {c.body}
                  <br />
                  <br />
                  Placeholder pointer to the most recent report in{' '}
                  <a className="text-white/70 underline" href="#">
                    the Trust Center.
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

/* Two slate promo cards with an outlined arrow CTA and a 288px image pinned bottom-right. */
const promos = [
  {
    over: 'Placeholder',
    title: 'Placeholder Sector Title',
    body: 'Placeholder sentence about programs delivered for public sector partners across agencies.',
    cta: 'Learn more',
    external: false,
    image: `${ASSET}/capitol.webp`,
    fit: 'object-cover object-top',
  },
  {
    over: 'Placeholder',
    title: 'Placeholder title on how we protect ourselves and customers',
    body: 'Placeholder sentence about programs delivered across defense, intelligence and civilian agencies, kept to similar length.',
    cta: 'Visit the Trust Center',
    external: true, // trust.scale.com: CMSLink external branch, no focus outline
    image: `${ASSET}/shield.webp`,
    fit: 'object-contain',
  },
]

export function Promos() {
  return (
    <section className="bg-[#f2f2f2] py-[72px] md:py-[120px]">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="grid w-full gap-6 md:grid-cols-2">
          {promos.map((p) => (
            <div
              key={p.title}
              className="relative flex min-h-[600px] flex-col overflow-hidden rounded-2xl border border-[#839cb2] bg-[#839cb2]"
            >
              <div className="flex flex-col gap-5 p-10">
                {/* TODO: Vahue copy */}
                <span className={`${s.detailMono} font-mono text-black/50`}>{p.over}</span>
                {/* TODO: Vahue copy */}
                <h2 className={`${s.header3} font-display font-normal text-black`}>{p.title}</h2>
                {/* TODO: Vahue copy */}
                <p className={`${s.body2} font-display text-black/70`}>{p.body}</p>
                <FlatCta href="#" variant="borderArrow" theme="black" external={p.external} className="font-display">
                  {p.cta}
                </FlatCta>
              </div>
              <div className="absolute bottom-0 right-0 h-72 w-72">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt="" loading="lazy" className={`absolute inset-0 h-full w-full ${p.fit}`} />
              </div>
            </div>
          ))}
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
          {/* TODO: Vahue copy */}
          <span className={`${s.detailMono} font-mono text-[#929292]`}>Placeholder Disclosure</span>
          {/* TODO: Vahue copy */}
          <h2 className={`${s.header2} max-w-xl font-display font-normal text-black`}>Found a security issue to share?</h2>
          {/* TODO: Vahue copy */}
          <p className={`${s.body1} max-w-md font-display text-[#929292]`}>
            Placeholder line inviting reports to the disclosure team by emailing{' '}
            <a className="underline" href="#">
              security@example.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
