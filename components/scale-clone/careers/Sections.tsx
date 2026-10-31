import FlatCta from './FlatCta'
import type { CareersContent } from './content'
import s from './careers.module.css'

/*
 * Static sections of scale.com/careers. The page is a hand-built route (not CMS slices): these blocks are server-
 * rendered with no scroll or reveal animation on scale.com (no AnimatedText / ScrollTrigger on them; only the two
 * FullBleedMediaSections animate). Hover states: FlatCta (news cards) and the mission links.
 */

const container = 'mx-auto w-full max-w-[1472px] px-6'

/** CMS SectionHeader, centred variant: `flex flex-col justify-center mb-10 md:mb-20 md:mt-12 items-center mx-auto max-w-3xl text-center` + per-section overrides. */
export function SectionHeader({ over, title, sub, className = '' }: { over: string; title: string; sub?: string; className?: string }) {
  return (
    <div className={`mx-auto flex max-w-3xl flex-col items-center justify-center text-center ${className}`}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className={`${s.overtitle} font-mono text-[color:var(--car-over,#525252)]`}>
            <span>{over}</span>
          </div>
          <h2 className={`${s.sectionTitle} font-display font-normal text-[color:var(--car-fg,#000)]`}>{title}</h2>
        </div>
        {sub ? <p className={`${s.sectionSub} block w-full font-display font-normal text-[color:var(--car-sub,rgba(0,0,0,0.7))]`}>{sub}</p> : null}
      </div>
    </div>
  )
}

/** "In The News": NewsCards (module 756380), grid md:grid-cols-2 gap-4, cards p-8 md:p-10 rounded-2xl min-h-220. */
export function News({ news }: { news: CareersContent['news'] }) {
  return (
    <section className="py-[72px] md:py-[120px]">
      <div className={container}>
        <SectionHeader over={news.overtitle} title={news.title} className="mb-10" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {news.items.map((item) => (
            <div key={item.href} className="flex min-h-[220px] flex-col justify-between gap-8 rounded-2xl p-8 md:p-10" style={{ background: item.bg }}>
              <p className={`${s.detailMono} font-mono text-white/60`}>{item.label}</p>
              <h3 className={`${s.header5} font-display font-normal text-white`} style={{ textWrap: 'pretty' }}>
                {item.title}
              </h3>
              <div>
                <FlatCta href={item.href} variant="borderArrow" theme="white">
                  {news.ctaLabel}
                </FlatCta>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** "Our Mission": two columns `flex-col sm:flex-row gap-[72px]`, each `sm:w-1/2 gap-6`. */
export function Mission({ mission }: { mission: CareersContent['mission'] }) {
  const body = `${s.body2} font-display text-[color:var(--car-fg-3,#575757)]`
  return (
    <section className="py-[72px] md:py-[120px]">
      <div className={container}>
        <div className="flex flex-col gap-16">
          <SectionHeader over={mission.overtitle} title={mission.title} className="md:mt-12" />
          <div className="flex flex-col gap-[72px] sm:flex-row">
            <div className="flex w-full flex-col gap-6 sm:w-1/2">
              <p className={`${s.body1} font-display text-[color:var(--car-fg-2,#212121)]`} style={{ textWrap: 'pretty' }}>
                {mission.lead}
              </p>
              {mission.left.map((p, i) => (
                <p key={i} className={body}>
                  {p}
                </p>
              ))}
            </div>
            <div className="flex w-full flex-col gap-6 sm:w-1/2">
              {mission.right.map((p, i) => (
                <p key={i} className={body}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** "Our Internal Core Values": grid sm:grid-cols-2 gap-6 mt-16; cards p-8 sm:p-10 rounded-2xl gray-95, 88px inverted line art. */
export function Credos({ credos }: { credos: CareersContent['credos'] }) {
  return (
    <section className="overflow-hidden py-[72px] md:py-[120px]">
      <div className={container}>
        <div className="flex flex-col items-center">
          <SectionHeader over={credos.overtitle} title={credos.title} sub={credos.subtitle} className="md:mt-12" />
          <div className="mt-16 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {credos.items.map((c) => (
              <div key={c.title} className="relative flex flex-col gap-8 overflow-hidden rounded-2xl bg-[var(--car-card,#f2f2f2)] p-8 sm:p-10">
                <div className="relative h-[88px] w-[88px]">
                  {c.iconNode ??
                    (c.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.icon} alt="" width={88} height={88} className="h-full w-full" style={{ filter: 'var(--car-credo-filter, invert(1))' }} />
                    ) : null)}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className={`${s.header6} font-display font-normal text-[color:var(--car-fg-2,#212121)]`}>{c.title}</h3>
                  <p className={`${s.body2} font-display text-[color:var(--car-fg-3,#575757)]`}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** "Supporting You To Do Your Best Work": FeatureCards (module 15518) columns 2, variant borderless. */
export function Benefits({ benefits }: { benefits: CareersContent['benefits'] }) {
  return (
    <section className="py-[72px] md:py-[120px]">
      <div className={container}>
        <div className="flex flex-col items-center gap-16">
          <SectionHeader over={benefits.overtitle} title={benefits.title} sub={benefits.subtitle} className="md:mt-12" />
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            {benefits.items.map((b) => (
              <div key={b.title} className="flex flex-col gap-8">
                {b.media ??
                  (b.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={b.image}
                      alt={b.title}
                      width={576}
                      height={320}
                      loading="lazy"
                      className="h-[320px] w-full rounded-lg object-cover"
                      style={{ boxShadow: 'var(--car-shadow, 0 4px 16px 0 rgba(0,0,0,0.2))' }}
                    />
                  ) : null)}
                <div className="flex flex-col gap-2">
                  <h3 className={`${s.benefitTitle} font-display font-normal text-[color:var(--car-fg,#000)]`}>{b.title}</h3>
                  <p className={`${s.benefitBody} font-display text-[color:var(--car-sub,rgba(0,0,0,0.7))]`}>{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
