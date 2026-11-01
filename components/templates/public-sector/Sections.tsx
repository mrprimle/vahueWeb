import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import Marquee from '../evaluation-public-sector/Marquee'
import eps from '../evaluation-public-sector/eps.module.css'
import type { Cta, PublicSectorContent } from './content'
import { FeatureIcon, MdCheck } from './icons'
import s from './ps.module.css'

// The body sections are static on scale.com/public-sector: REA inspect_web_event_listeners found no listeners on the
// section roots (ev_e9c0b9d8…), the use-case media (ev_f4962ae8…) or the St. Louis banner (ev_808c5275…); none carries
// AnimatedText or a ScrollTrigger. The pointer effects are CSS hovers on the glass "Learn more" buttons (React click +
// HubSpot mousedown only, ev_1e514706…) and the Keen resources slider (Resources.tsx).
// Section shell: Section `py-18 lg:py-20 bg-transparent !py-12` (or `relative py-12 overflow-hidden` for the two slices
// with the white radial wash), Tailwind `container` (max 1280, px 1.5rem -> 2rem from 1024).

type C = PublicSectorContent

function Shell({ wash, children }: { wash?: boolean; children: ReactNode }) {
  return (
    <section className={`${wash ? 'relative overflow-hidden' : 'bg-transparent'} py-12`}>
      <div className={`${eps.container} relative${wash ? ' z-10' : ''}`}>{children}</div>
      {/* `_5fl2pa_background-white` opacity 25: two white radial gradients (#ffffff0a / #ffffff14) — white on white,
          invisible on this page, kept as an empty layer for structure. */}
      {wash ? <div aria-hidden className="pointer-events-none absolute inset-0 z-0 select-none opacity-25" /> : null}
    </section>
  )
}

// SectionHeader, align center: wrapper `mb-10 md:mb-20 md:mt-12 max-w-3xl` (mb overridden per slice: Capabilities
// !mb-12, Why Scale / Resources !mb-10); eyebrow geist-mono 12/24 +1px uppercase #525252 mb-5; h3 30/1.375 -> md 40 ->
// lg 48/1.25 balance; p mt-4 lg:mt-2 16 -> lg 20 / 1.6 black/70 balance.
export function SectionHeader({ eyebrow, title, body, mb }: { eyebrow: string; title: string; body?: string; mb: string }) {
  return (
    <div className={`mx-auto flex max-w-3xl flex-col items-center justify-center text-center md:mt-12 ${mb}`}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-[var(--ps-muted)]">
            <span>{eyebrow}</span>
          </div>
          <h3 className="text-balance text-[30px] font-normal leading-[1.375] text-[var(--ps-fg)] md:text-[40px] lg:text-[48px] lg:leading-[1.25]">
            {title}
          </h3>
        </div>
        {body ? (
          <p className="mt-4 block w-full text-balance text-[16px] font-normal leading-[1.6] text-[var(--ps-soft)] lg:mt-2 lg:text-[20px]">{body}</p>
        ) : null}
      </div>
    </div>
  )
}

// LogoCloud (module 970272 in 3t7eetekne0nm.js): 7 logos -> columns g = 4, so >= 768 renders
// `ul.items-center md:gap-y-16 sm:min-h-[52px] gap-8 flex justify-between grid` with gridTemplateColumns repeat(8, 1fr),
// each li col-span-2 and the 5th (index g, odd count < 10) `col-start-2`; < 768 react-fast-marquee (speed 50,
// duration = content width / 50 -> 16.54s for the 827px row at 390), li `ml-12`. Logos are `brightness-0` images.
// Customer logos aren't shipped: same-size neutral tiles stand in unless `src` is given.
export function LogoCloud({ logos }: { logos: C['logos'] }) {
  const cols = logos.length < 6 ? logos.length : logos.length === 6 ? 6 : logos.length <= 8 ? 4 : 5
  const Item = ({ l }: { l: C['logos'][number] }) =>
    l.src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={l.src} alt={l.alt} width={l.width} height={l.height} className="brightness-0" style={{ width: l.width, height: l.height }} />
    ) : (
      <span role="img" aria-label={l.alt} className="block rounded-[3px] bg-black/15" style={{ width: l.width, height: l.height }} />
    )
  return (
    <section className="bg-transparent py-12">
      <div className={`${eps.container} relative`}>
        <div>
          <div>
            <div className="hidden md:block">
              <ul
                className="grid items-center justify-between gap-8 sm:min-h-[52px] md:gap-y-16"
                style={{ gridTemplateColumns: `repeat(${2 * cols}, minmax(0, 1fr))` }}
              >
                {logos.map((l, i) => (
                  <li
                    key={l.alt}
                    className={`${i === cols && logos.length < 10 && logos.length % 2 !== 0 ? 'col-start-2 ' : ''}col-span-2 flex flex-col items-center justify-center gap-3`}
                  >
                    <div className="relative">
                      <Item l={l} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:hidden">
              <Marquee>
                {logos.map((l) => (
                  <div key={l.alt} className={eps.rfmChild}>
                    <div className="ml-12 flex flex-col items-center justify-center gap-3">
                      <div className="relative">
                        <Item l={l} />
                      </div>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// "Use Cases": FeatureGrid (module 450359 in 2sv-38wn0i7kh.js): `grid relative items-start grid-cols-1 md:grid-cols-2
// gap-14 md:gap-6 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14`; media `.PrXvJq_feature aspect-[4/3]` (r12 + 1px #fff3 inner
// border), img object-cover rounded-lg; title p `mt-8 text-2xl lg:mt-12` 24/1.5; empty subtitle p `mt-3` (its margin
// collapses into the list's mt-8); bullets `ul mt-8 space-y-4`, li flex text-lg: tick picture 18 round black/9 + 1px
// black/10 `translate-y-0.5` with a 10×8 white/70 check, text 16/24 black/70 `translate-x-3`.
export function UseCases({ content }: { content: C['useCases'] }) {
  return (
    <Shell wash>
      <SectionHeader eyebrow={content.eyebrow} title={content.title} body={content.body} mb="mb-10 md:mb-20" />
      <div className="relative grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14">
        {content.cards.map((card) => (
          <div key={card.title}>
            <div className={`${s.feature} aspect-[4/3]`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.image.src} alt={card.image.alt ?? card.title} width={card.image.width} height={card.image.height} loading="lazy" className="h-full w-full rounded-lg object-cover" />
            </div>
            <p className="relative mt-8 text-[24px] leading-[1.5] text-[var(--ps-fg)] lg:mt-12">{card.title}</p>
            <p className="relative mt-3 text-[16px] leading-[1.5] text-[var(--ps-soft)]" />
            <ul className="mt-8 space-y-4">
              {card.bullets.map((b) => (
                <li key={b} className="flex items-start text-[18px]">
                  <picture className="relative flex h-[18px] w-[18px] shrink-0 translate-y-0.5 items-center justify-center rounded-full border border-[var(--ps-line)] bg-[var(--ps-tile)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/templates/public-sector/check.svg" alt="" width={10} height={8} />
                  </picture>
                  <p className="flex-1 translate-x-3 text-[16px] leading-6 text-[var(--ps-soft)]">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Shell>
  )
}

// Glass button (module 225913): CSS-only hover/active states, see ps.module.css.
export function GlassButton({ cta }: { cta: Cta }) {
  return (
    <div className="flex flex-wrap items-center">
      <div className={s.glass}>
        <Link href={cta.href} className={s.glassLink} style={{ WebkitTapHighlightColor: 'transparent' } as CSSProperties}>
          <div className={s.glassBtn}>
            {cta.label}
            <span className={s.glassArrow}>→</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

// "Capabilities": two ChecklistWithMedia rows (module 872447, `dividers` off): row `flex-col md:flex-row gap-[54px]
// mt-12 items-center max-w-[1216px] mx-auto` (+ mb-16 on the first); media `flex justify-center w-full p-2 md:w-7/12`
// img `w-full h-auto` (no mockup); list `md:w-5/12 gap-6`: h3 `text-3xl heading` 30/1.5; item tick 22 round black/9 +
// 1px black/10 + MdCheck 12 black/70 `mt-0.5`, gap-4; title 16/24 500; body 14/1.5 black/70 (gap-2); children = glass CTA.
// Row 1 has the media left (DOM order media, list), row 2 right (list, media), on mobile too.
export function Capabilities({ content }: { content: C['capabilities'] }) {
  return (
    <Shell wash>
      <SectionHeader eyebrow={content.eyebrow} title={content.title} body={content.body} mb="mb-12" />
      {content.rows.map((row, i) => {
        const media = (
          <div className="flex w-full justify-center p-2 md:w-7/12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={row.image.src} alt={row.image.alt ?? row.heading} width={row.image.width} height={row.image.height} loading="lazy" className="h-auto w-full" />
          </div>
        )
        const list = (
          <div className="flex w-full flex-col gap-6 md:w-5/12">
            <h3 className="text-[30px] font-normal leading-[1.5] text-[var(--ps-fg)]">{row.heading}</h3>
            {row.items.map((item) => (
              <div key={item.title}>
                <div className="flex flex-row items-start gap-4">
                  <div className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-[var(--ps-line)] bg-[var(--ps-tile)]">
                    <MdCheck className="h-3 w-3 text-[var(--ps-soft)]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[16px] font-medium leading-[1.5] text-[var(--ps-fg)]">{item.title}</p>
                    <p className="text-[14px] leading-[1.5] text-[var(--ps-soft)]">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <GlassButton cta={row.cta} />
            </div>
          </div>
        )
        return (
          <div key={row.heading} className={`mx-auto mt-12 flex max-w-[1216px] flex-col items-center gap-[54px] md:flex-row${i === 0 ? ' mb-16' : ''}`}>
            {i === 0 ? (
              <>
                {media}
                {list}
              </>
            ) : (
              <>
                {list}
                {media}
              </>
            )}
          </div>
        )
      })}
    </Shell>
  )
}

// "Why Scale": FeaturesWithIcons (module 460138), light theme: `!flex flex-wrap gap-16 md:gap-y-20 md:gap-x-6
// xl:gap-x-14`; item grow, basis-full md:max-w-[368px] lg:basis-1/4; figure 44×44 r8 black/9 + 1px black/10, glyph 22
// in a 24 span; h4 24/1.5 mt-6 whitespace-pre-line; p 16/1.5 #525252 mt-4.
export function WhyScale({ content }: { content: C['whyScale'] }) {
  return (
    <Shell>
      <SectionHeader eyebrow={content.eyebrow} title={content.title} body={content.body} mb="mb-10" />
      <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
        {content.items.map((item) => (
          <div key={item.title} className="shrink-0 grow basis-full text-[var(--ps-fg)] md:max-w-[368px] lg:basis-1/4">
            <div>
              <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-[var(--ps-line)] bg-[var(--ps-tile)]">
                <span className="flex h-6 w-6 items-center justify-center">
                  <FeatureIcon name={item.icon} size={22} />
                </span>
              </figure>
            </div>
            <div>
              <h4 className="relative mt-6 whitespace-pre-line text-[24px] font-normal leading-[1.5]">{item.title}</h4>
              <p className="relative mt-4 text-[16px] leading-[1.5] text-[var(--ps-muted)]">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

// St. Louis banner (CMS "CTA banner"): card `max-w-[440px] mx-auto lg:max-w-none lg:h-[440px] flex items-center
// bg-black/10 px-10 py-0 rounded-2xl overflow-hidden md:overflow-visible`; row `flex-col gap-8 lg:flex-row
// lg:items-center lg:gap-16`; text `lg:w-1/2 gap-6`: h3 `text-3xl heading md:text-4xl text-balance` (30/1.5 -> 36/1.25),
// p 20/1.5 black/70, glass CTA; media `lg:w-1/2` img `w-full rounded-xl` (h auto, natural 1:1).
export function StLouisBanner({ content }: { content: C['banner'] }) {
  return (
    <Shell>
      <div>
        <div className="relative z-10 mx-auto flex max-w-[440px] items-center overflow-hidden rounded-2xl bg-[var(--ps-banner)] px-10 py-0 md:overflow-visible lg:h-[440px] lg:max-w-none lg:items-center">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex flex-col gap-6 lg:w-1/2">
              <h3 className="text-balance text-[30px] font-normal leading-[1.5] text-[var(--ps-fg)] md:text-[36px] md:leading-[1.25]">{content.title}</h3>
              <p className="text-[20px] leading-[1.5] text-[var(--ps-soft)]">{content.body}</p>
              <GlassButton cta={content.cta} />
            </div>
            <div className="lg:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={content.image.src} alt={content.image.alt ?? ''} width={content.image.width} height={content.image.height} loading="lazy" className="h-auto w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}
