/* eslint-disable @next/next/no-img-element */
import type { GlobalPublicSectorContent, SectionHeaderContent } from './content'
import s from './gps.module.css'

// Page container used by every hand-built section on scale.com/global-public-sector (module 858675 `f`).
export const CONTAINER = 'mx-auto w-full max-w-[1472px] ps-6 pe-6'

/*
 * SectionHeader (module 1900) with theme "light", titleAs "h3", no CTA. align "center" -> items-center mx-auto max-w-3xl
 * text-center; align "left" -> md:items-start md:text-left text-center and a md:flex-row title/body row.
 * The overtitle div renders even when the CMS string is empty (an empty span: 0 tall, but its mb-5 still counts).
 * No animation (plain markup, no AnimatedText).
 */
export function SectionHeader({
  content,
  align = 'center',
  className = '',
  showEyebrow = true,
}: {
  content: SectionHeaderContent
  align?: 'center' | 'left'
  className?: string
  showEyebrow?: boolean
}) {
  const left = align === 'left'
  return (
    <div
      className={`mb-10 flex flex-col justify-center md:mb-20 md:mt-12 ${left ? 'text-center md:items-start md:text-left' : 'mx-auto max-w-3xl items-center text-center'} ${className}`}
    >
      <div className={`flex flex-col ${left ? 'w-full md:flex-row md:items-end md:gap-6' : ''}`}>
        <div className={`flex flex-col ${left ? 'md:flex-1' : ''}`}>
          {showEyebrow ? (
            <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-[#525252]">
              <span>{content.eyebrow ?? ''}</span>
            </div>
          ) : null}
          <h3 className={`${s.shTitle} font-display`}>{content.title}</h3>
        </div>
        {content.body ? (
          <p className={`${s.shBody} mt-4 block font-display lg:mt-2 ${left ? 'md:mt-0 md:flex-1 md:self-end lg:mt-2' : 'w-full'}`}>{content.body}</p>
        ) : null}
      </div>
    </div>
  )
}

/*
 * "Trusted AI…": section.py-24 > SectionHeader align left (!mb-0) > cloud-slate panel
 *   `p-16 pt-0 md:pt-16 md:pb-32 md:pr-36 md:pl-36 rounded-3xl mt-36` > FeatureList (module 497052, items with
 *   image.plain: a bare next/image `w-full h-auto`), `space-y-14 md:space-y-24 pt-16`, article
 *   `grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16`; text column max-w-[440px] space-y-5, h4 24 -> md 30 semibold
 *   leading-tight, p 16 leading-relaxed text-black/70. Static: no listeners, no motion.
 */
export function Trusted({ content }: { content: NonNullable<GlobalPublicSectorContent['trusted']> }) {
  return (
    <section className="py-24">
      <div className={CONTAINER}>
        <SectionHeader content={content.header} align="left" className="!mb-0" />
        <div className="mt-36 rounded-3xl bg-[var(--gps-panel)] p-16 pt-0 md:px-36 md:pb-32 md:pt-16">
          <div className="space-y-14 pt-16 md:space-y-24">
            {content.items.map((it) => (
              <article key={it.title} className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className="max-w-[440px] space-y-5">
                  <h4 className="font-display text-2xl font-semibold leading-[1.25] text-black md:text-3xl md:leading-[1.25]">{it.title}</h4>
                  <p className="font-display text-base leading-relaxed text-black/70">{it.description}</p>
                </div>
                <img src={it.image.src} alt={it.image.alt} width={it.image.width} height={it.image.height} loading="lazy" decoding="async" className="h-auto w-full" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/*
 * "The foundations of…": section.relative.py-20.overflow-hidden, container z-10, SectionHeader (!mb-24 !max-w-[840px]),
 * a bordered gray-95 strip (`rounded-2xl border-scale-gray-80 flex-col sm:flex-row`), three columns each with an app
 * screenshot SVG rendered `scale-[1.4] origin-top-left invert` under two fades (bottom h-2/5, right w-1/5, to gray-95),
 * then header5-regular title + body2-regular line; 1px gray-80 dividers. Background: _5fl2pa_background-white at
 * opacity .25 (two faint white radial gradients). Static.
 */
export function Foundations({ content }: { content: NonNullable<GlobalPublicSectorContent['foundations']> }) {
  return (
    <section className="relative overflow-hidden py-20">
      <div className={`${CONTAINER} relative z-10`}>
        <SectionHeader content={content.header} className="!mb-24 !max-w-[840px]" />
        <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--gps-line)] bg-[var(--gps-card)] sm:flex-row">
          {content.columns.map((c, i) => (
            <div key={c.title} className="contents">
              {i > 0 ? <div className="h-px shrink-0 bg-[var(--gps-line)] sm:h-auto sm:w-px" /> : null}
              <div className="flex flex-1 flex-col overflow-hidden">
                <div className="relative overflow-hidden">
                  <img src={c.image.src} alt={c.image.alt} width={800} height={500} loading="lazy" decoding="async" className="h-auto w-full origin-top-left scale-[1.4] invert" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--gps-card)] to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[var(--gps-card)] to-transparent" />
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <h4 className={`${s.header5} font-display text-[var(--gps-fg-1)]`}>{c.title}</h4>
                  <p className={`${s.body2} font-display text-[var(--gps-fg-3)]`}>{c.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${s.glow} pointer-events-none absolute inset-0 z-0 select-none opacity-25`} />
    </section>
  )
}
