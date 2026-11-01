import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import type { EvaluationPublicSectorContent } from './content'
import { Glyph, TrafficLights } from './icons'
import Marquee from './Marquee'
import s from './eps.module.css'

// The body sections are static on scale.com: REA inspect_web_event_listeners found no listeners on the technique cards,
// the Why Scale articles, the marquee container or the section roots, and none of them carries AnimatedText or a
// ScrollTrigger. The only pointer effects are CSS hovers (customers link, Read more button).
// Section shell: Section (module in 059q_ihpcslaa.js) `py-18 lg:py-20 bg-transparent` overridden to `!py-12` (logo strip)
// or `!py-16` (every other slice); container `max-w-[1472px] ps-6 pe-6`.

type C = EvaluationPublicSectorContent

function Shell({ py, children }: { py: 'py-12' | 'py-16'; children: ReactNode }) {
  return (
    <section className={`bg-transparent ${py}`}>
      <div className="relative mx-auto w-full max-w-[1472px] px-6">{children}</div>
    </section>
  )
}

// SectionHeader, align "center", with description: wrapper `mb-10 md:mt-12` (md:mb-20 is forced back to mb-10),
// max-w-3xl centred; eyebrow geist-mono 12/24 +1px uppercase #525252 mb-5; h2 30/1.375 -> md 40 -> lg 48/1.25, balance;
// p mt-4 lg:mt-2, 16 -> lg 20 / 1.6, black/70, balance.
function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mt-12">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-[var(--eps-muted)]">
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-balance text-[30px] font-normal leading-[1.375] text-[var(--eps-fg)] md:text-[40px] lg:text-[48px] lg:leading-[1.25]">
            {title}
          </h2>
        </div>
        <p className="mt-4 block w-full text-balance text-[16px] font-normal leading-[1.6] text-[var(--eps-fg)] opacity-70 lg:mt-2 lg:text-[20px]">
          {body}
        </p>
      </div>
    </div>
  )
}

// LogoStrip (module in 2oqqgjzhyolwf.js): lead `max-w-[698px] mb-12 px-4` 16/1.65 text-gray-700, link text-link 500 with
// a `group-hover:translate-x-1` arrow (300ms ease-out). Its `hover:text-blue-700` never shows on Scale: the unlayered
// `.text-link{color:#008eff}` beats the layered hover utility (measured: colour stays rgb(0,142,255) on hover).
// >= 768: `ul.container justify-around gap-8 sm:min-h-[52px]`, li col-span-2; < 768: react-fast-marquee (speed 50px/s,
// duration = container width / 50 -> 6.84s at 390), li `ml-12`. Logos are `brightness-0` images at 79×22 / 65×45.
// Customer logos aren't shipped: same-size neutral tiles stand in unless `src` is given.
export function LogoStrip({ content }: { content: C['logos'] }) {
  const Item = ({ l }: { l: C['logos']['items'][number] }) =>
    l.src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={l.src} alt={l.alt} width={l.width} height={l.height} className="brightness-0" style={{ width: l.width, height: l.height }} />
    ) : (
      <span role="img" aria-label={l.alt} className="block rounded-[3px] bg-black/15" style={{ width: l.width, height: l.height }} />
    )
  return (
    <Shell py="py-12">
      <p className="mx-auto mb-12 w-full max-w-[698px] text-balance px-4 text-center text-[16px] leading-[1.65] text-[var(--eps-lead)]">
        <span className="mr-2">{content.lead}</span>
        <span className="inline">
          <Link
            href={content.link.href}
            className="group inline-flex items-center gap-1 text-[16px] text-[var(--eps-link)] transition-colors duration-300"
          >
            <span className="font-medium">{content.link.label}</span>
            <span className={`${s.unicodeArrow} inline-block transition-transform duration-300 ease-out group-hover:translate-x-1`}>→</span>
          </Link>
        </span>
      </p>
      <div className="hidden md:block">
        <ul className={`${s.container} flex items-center justify-around gap-8 sm:min-h-[52px] md:gap-y-16`}>
          {content.items.map((l) => (
            <li key={l.alt} className="flex flex-col items-center justify-center gap-3">
              <div className="relative">
                <Item l={l} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:hidden">
        <Marquee>
          {content.items.map((l) => (
            <div key={l.alt} className={s.rfmChild}>
              <div className="ml-12 flex flex-col items-center justify-center gap-3">
                <div className="relative">
                  <Item l={l} />
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </Shell>
  )
}

// "Test Diverse SI Techniques": grid 1 / md 2, gap-6; card flex-col rounded-2xl border black/10 bg black/5 h-full;
// media `p-4 pb-0`, image h-[320px] w-full rounded-xl object-cover; body p-6: h4 18/1.65 600, p mt-2 14/1.625 black/70.
export function Techniques({ content }: { content: C['techniques'] }) {
  return (
    <Shell py="py-16">
      <SectionHeader eyebrow={content.eyebrow} title={content.title} body={content.body} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {content.cards.map((card) => (
          <div key={card.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--eps-line)] bg-[var(--eps-card)]">
            <div className="p-4 pb-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.image.src} alt={card.image.alt ?? card.title} width={card.image.width} height={card.image.height} loading="lazy" className="h-[320px] w-full rounded-xl object-cover" />
            </div>
            <div className="p-6">
              <h4 className="text-[18px] font-semibold leading-[1.65] text-[var(--eps-fg)]">{card.title}</h4>
              <p className="mt-2 text-[14px] leading-[1.625] text-[var(--eps-fg)] opacity-70">{card.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

// FeaturesWithIcons (module 460138), light theme: `!flex flex-wrap gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14`; item grow,
// basis-full md:max-w-[368px] lg:basis-1/4; figure 44×44 r8 bg black/9 + 1px black/10, glyph 22 in a 24 span;
// h4 24/1.5 mt-6 whitespace-pre-line; p 16/1.5 #525252 mt-4.
export function WhyTest({ content }: { content: C['why'] }) {
  return (
    <Shell py="py-16">
      <SectionHeader eyebrow={content.eyebrow} title={content.title} body={content.body} />
      <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
        {content.items.map((item) => (
          <div key={item.title} className="shrink-0 grow basis-full text-[var(--eps-fg)] md:max-w-[368px] lg:basis-1/4">
            <div>
              <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-[var(--eps-line)] bg-[var(--eps-tile)]">
                <span className="flex h-6 w-6 items-center justify-center">
                  <Glyph name={item.icon} size={22} />
                </span>
              </figure>
            </div>
            <div>
              <h4 className="relative mt-6 whitespace-pre-line text-[24px] font-normal leading-[1.5]">{item.title}</h4>
              <p className="relative mt-4 text-[16px] leading-[1.5] text-[var(--eps-muted)]">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

// "Test & Evaluation Methodology": ChecklistWithMedia (module 872447) with a BrowserMockup (module 720912) as media:
// row `flex-col md:flex-row gap-[54px] mt-12 items-center max-w-[1216px] mx-auto`; media md:w-7/12; mockup r16, 1px
// white/10, bg #0b0b0b, bar `px-3 py-2 gap-2` border-b white/10 + dots + URL 12/1.5 white/40, image rounded-xl h-auto.
// List md:w-5/12 flex-col gap-6: h3 `text-3xl heading` 30/1.5; items title-only (the empty 14px body <p> still renders,
// so each item is title + gap-2); tick 22 round black/9 + 1px black/10, MdCheck 12 black/70 mt-0.5, gap-4.
// CTA: legacy TdsvaW_button--primary --black "Read more →" (bg #333 -> #000 on hover, 0.3s; arrow translate-x-1).
export function Methodology({ content }: { content: C['methodology'] }) {
  return (
    <Shell py="py-16">
      <SectionHeader eyebrow={content.eyebrow} title={content.title} body={content.body} />
      <div className="mx-auto mt-12 flex max-w-[1216px] flex-col items-center gap-[54px] md:flex-row">
        <div className="w-full md:w-7/12">
          <div className="w-full overflow-hidden rounded-2xl border border-white/10" style={{ background: 'var(--eps-mock)' }}>
            <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
              <TrafficLights />
              <span className="text-[12px] leading-[1.5] text-white/40">{content.mockupUrl}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content.image.src} alt={content.image.alt ?? ''} width={content.image.width} height={content.image.height} loading="lazy" className="h-auto w-full rounded-xl object-cover" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 md:w-5/12">
          <h3 className="text-[30px] font-normal leading-[1.5] text-[var(--eps-fg)]">{content.heading}</h3>
          {content.items.map((item) => (
            <div key={item}>
              <div className="flex flex-row items-start gap-4">
                <div className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-[var(--eps-line)] bg-[var(--eps-tile)]">
                  <Glyph name="check" size={12} className="h-3 w-3 opacity-70" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[16px] font-medium leading-[1.5] text-[var(--eps-fg)]">{item}</p>
                  <p className="text-[14px] leading-[1.5] opacity-70" />
                </div>
              </div>
            </div>
          ))}
          <div>
            <Link href={content.cta.href} className={`${s.legacyLink} relative inline-block rounded-xl`} style={{ WebkitTapHighlightColor: 'transparent' } as CSSProperties}>
              <div className={s.legacyBtn}>
                {content.cta.label}
                <span className={s.legacyArrow}>→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Shell>
  )
}

// "Why Scale": grid 1 / md 2 / lg 3, gap-6; article min-h-[310px] flex-col rounded-2xl border black/10 bg black/5 p-6;
// icon box `mb-12 flex-1 center` black/70 with a 72px Material glyph; h4 18/1.65 600; p mt-3 14/1.625 black/70.
export function WhyScale({ content }: { content: C['whyScale'] }) {
  return (
    <Shell py="py-16">
      <SectionHeader eyebrow={content.eyebrow} title={content.title} body={content.body} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.cards.map((card) => (
          <article key={card.title} className="flex min-h-[310px] flex-col rounded-2xl border border-[var(--eps-line)] bg-[var(--eps-card)] p-6">
            <div className="mb-12 flex flex-1 items-center justify-center opacity-70">
              <Glyph name={card.icon} size={72} />
            </div>
            <div>
              <h4 className="text-[18px] font-semibold leading-[1.65] text-[var(--eps-fg)]">{card.title}</h4>
              <p className="mt-3 text-[14px] leading-[1.625] text-[var(--eps-fg)] opacity-70">{card.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Shell>
  )
}
