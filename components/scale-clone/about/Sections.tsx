'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './animatedText'
import { useRevealText } from './useRevealText'
import { MdIcon } from './icons'
import type { AboutContent, AboutLogo } from './content'
import s from './about.module.css'

gsap.registerPlugin(ScrollTrigger)

const power2out = gsap.parseEase('power2.out')
const mapRange = (v: number, a: number, b: number, c: number, d: number) =>
  c + (d - c) * gsap.utils.clamp(0, 1, (v - a) / (b - a))

/** BaseCardScroll stagger (chunk 2k1qlgdxlbmz1.js module 598042): r = min(.1, .85/(n-1)), window [i r, i r + 1 - (n-1) r]. */
function stagger(p: number, i: number, n: number) {
  if (n <= 1) return p
  const r = Math.min(0.1, 0.85 / Math.max(1, n - 1))
  const a = i * r
  return mapRange(p, a, a + (1 - (n - 1) * r), 0, 1)
}

/** useScrollTrigger (module 210104) onEnter with retroactiveOnEnter: fires once progress > 0 or scroll >= start - 1 on refresh. */
function retroEnter(trigger: Element, start: string, onEnter: () => void) {
  const st = ScrollTrigger.create({ trigger, start, end: 'bottom 20%', onEnter })
  const retro = () => {
    if (st.progress > 0 || st.scroll() >= st.start - 1) onEnter()
  }
  ScrollTrigger.addEventListener('refresh', retro)
  retro()
  return () => {
    ScrollTrigger.removeEventListener('refresh', retro)
    st.kill()
  }
}

/* ---------------------------------------------------------------------------------------------------------------
 * 2 · Mission: CMS Section (module 698764 in 0sni47mcvnqwg.js: marginVertical "medium" = py-16 md:py-32, contentWidth
 * "medium" = md col 2-11 / xl col 3-10) > HeadlineWithCta (module 925107): headerTag h1, header3-regular, centred,
 * `flex flex-col gap-6 py-6 grid-padding`. Intro: IntersectionObserver on the root, rootMargin "0px 0px -15% 0px",
 * headline delay 0.5, subtitle delay 1. No hover or pointer handlers.
 * --------------------------------------------------------------------------------------------------------------- */
export function Mission({ content }: { content: AboutContent['mission'] }) {
  const root = useRef<HTMLDivElement>(null)
  const h1 = useRef<HTMLHeadingElement>(null)
  const sub = useRef<HTMLDivElement>(null)
  useRevealText([h1, sub], { mode: 'io', delays: [0.5, 1], trigger: root })
  return (
    <div className={`Section ${s.gridLayout} relative isolate overflow-hidden bg-white py-16 text-black md:py-32`} data-text-theme="black">
      <div className="relative isolate col-span-full rounded-3xl md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3">
        <div ref={root} className="HeadlineWithCta flex flex-col items-center gap-6 px-6 py-6">
          <h1 ref={h1} className={`${s.header3} ${s.pending} w-full text-center font-display font-normal text-inherit`}>
            {content.headline}
          </h1>
          <div ref={sub} className={`RichText ${s.missionSub} ${s.pending} w-full text-center font-display text-inherit`}>
            <p>{content.body}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* 3 · Headquarters photo: static server markup (next/image, priority) + detail-mono caption. */
export function Headquarters({ content }: { content: AboutContent['headquarters'] }) {
  return (
    <section className="bg-white pb-[72px] pt-6 lg:pt-8">
      <div className="mx-auto max-w-[1216px] px-4 lg:px-6">
        <div className="overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.image} alt={content.alt} width={content.width} height={content.height} className="block h-auto w-full" />
        </div>
        <p className={`${s.detailMono} mt-3 text-center font-mono text-[var(--abt-muted)]`}>{content.caption}</p>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------------------------------------------
 * 4 · Trusted by: SectionHeader (server markup, no intro) + LogoCloud (module 970272 in 0orpgukdq33u3.js) with
 * carousel false, showCopy false. md+: `ul.container flex justify-between items-center gap-8 sm:min-h-[52px]`, logos
 * `brightness-0` at their served box size. <md: react-fast-marquee (module 922998) defaults: speed 50 px/s, left,
 * no gradient, no pause; two copies of the row, each min-width 100%, duration = row width / 50 (10.64s at 390); items
 * `ml-12`. No listeners on the logos (static, no links).
 * --------------------------------------------------------------------------------------------------------------- */
function LogoTile({ logo }: { logo: AboutLogo }) {
  return logo.src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo.src} alt={logo.name} width={logo.width} height={logo.height} className="brightness-0" style={{ width: logo.width, height: logo.height }} />
  ) : (
    <span role="img" aria-label={logo.name} className="block rounded-[4px] bg-black/10" style={{ width: logo.width, height: logo.height }} />
  )
}

function LogoMarquee({ logos }: { logos: AboutLogo[] }) {
  const root = useRef<HTMLDivElement>(null)
  const row = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = root.current
    const r = row.current
    if (!el || !r) return
    // react-fast-marquee: duration = (child width < container ? container : child) / speed
    const set = () => el.style.setProperty('--rfm-duration', `${Math.max(el.offsetWidth, r.scrollWidth) / 50}s`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    ro.observe(r)
    return () => ro.disconnect()
  }, [])
  const group = (key: string) => (
    <div key={key} ref={key === 'a' ? row : undefined} className={`rfm-marquee ${s.marqueeGroup} z-[1] flex min-w-full shrink-0 flex-row items-center`} aria-hidden={key === 'b'}>
      {logos.map((l) => (
        <div key={l.name} className="rfm-child">
          <div className="ml-12 flex flex-col items-center justify-center gap-3">
            <div className="relative">
              <LogoTile logo={l} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
  return (
    <div ref={root} className="rfm-marquee-container relative flex w-full flex-row overflow-x-hidden">
      {group('a')}
      {group('b')}
    </div>
  )
}

export function TrustedBy({ content }: { content: AboutContent['trusted'] }) {
  const n = content.logos.length
  return (
    <section className="bg-white py-[72px] md:py-[120px]">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center">
          <div className="flex flex-col">
            <div className={`${s.overtitle} font-mono text-[var(--abt-over)]`}>
              <span>{content.overtitle}</span>
            </div>
            <h2 className={`${s.sectionTitle} font-display font-normal text-black`}>{content.title}</h2>
          </div>
        </div>
        <div>
          <div className="hidden md:block">
            <ul className={`${s.container} flex items-center gap-8 sm:min-h-[52px] md:gap-y-16 ${n < 4 ? 'justify-around' : 'justify-between'}`}>
              {content.logos.map((l) => (
                <li key={l.name} className="flex flex-col items-center justify-center gap-3">
                  <div className="relative">
                    <LogoTile logo={l} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:hidden">
            <LogoMarquee logos={content.logos} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------------------------------------------
 * 5 · What we do: ScrollRevealSection (module 756386 in 268a4ug0aebtb.js) with backdropClassName
 * `bg-scale-gray-90 md:bg-transparent`, white panel, wrapping CardGrid (module 540409) heading "What we do"
 * (headerSize md = h3 header3-regular), 3 linkCards (LinkCard 874328), animationDirection "up", iconSize md.
 *   panel, trigger = section "top bottom" -> "top top": l = map(p, .5..1), scaleX = map(l, 0..0.8, 1 - 2*gutter/w .. 1)
 *     (gutter 24, 12 under 768), top radii 16 -> 0 px
 *   cards (BaseCardScroll 598042): trigger = card "top bottom" -> "top 50%", staggered + power2.out,
 *     scale .96 -> 1, opacity 0 -> 1
 *   intro (CardGrid onEnter "top bottom", retroactive; deferred while document.hidden): heading animateIn(.125);
 *     LinkCard s = .05 i + .125: icon box clip inset(0 100% 0 0 round 10px) -> 0 (.5s power1.out, delay s), glyph
 *     opacity (1s power1.out, s + .05), title AnimatedText (s + .16), description (s + .34)
 *   LinkCards carry no link and no hoveredColor on this page: no hover, focus or pointer listeners (REA: none).
 * --------------------------------------------------------------------------------------------------------------- */
function ScrollReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = root.current
    const bg = panel.current
    if (!el || !bg) return
    if (prefersReducedMotion()) {
      gsap.set(bg, { scaleX: 1, borderTopLeftRadius: 0, borderTopRightRadius: 0 })
      return
    }
    const setX = gsap.quickSetter(bg, 'scaleX')
    const setTL = gsap.quickSetter(bg, 'borderTopLeftRadius', 'px')
    const setTR = gsap.quickSetter(bg, 'borderTopRightRadius', 'px')
    const apply = (p: number) => {
      const w = el.offsetWidth
      if (!w) return
      const start = Math.max(0.01, 1 - (2 * (window.innerWidth < 768 ? 12 : 24)) / w)
      const l = mapRange(p, 0.5, 1, 0, 1)
      setX(mapRange(l, 0, 0.8, start, 1))
      const r = 16 * (1 - mapRange(l, 0, 0.8, 0, 1))
      setTL(r)
      setTR(r)
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'top top',
      onUpdate: ({ progress }) => apply(progress),
      onRefresh: ({ progress }) => apply(progress),
    })
    apply(st.progress)
    return () => st.kill()
  }, [])
  return (
    <div ref={root} className="ScrollRevealSection relative isolate w-full bg-[var(--abt-line)] md:bg-transparent">
      <div
        ref={panel}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full origin-top overflow-hidden bg-white"
        style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />
      <div className="relative z-[1] isolate min-h-[60vh]">{children}</div>
    </div>
  )
}

export function WhatWeDo({ content }: { content: AboutContent['pillars'] }) {
  const section = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const root = section.current
    if (!root) return
    const reduced = prefersReducedMotion()
    const texts: AnimatedText[][] = []
    let headText: AnimatedText | null = null
    let onVisible: (() => void) | null = null
    let offRetro = () => {}

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]', root)
      const n = cards.length
      if (heading.current) headText = createAnimatedText(heading.current)
      cards.forEach((card) => {
        const title = card.querySelector<HTMLElement>('[data-title]')
        const body = card.querySelector<HTMLElement>('[data-body]')
        texts.push([...(title ? [createAnimatedText(title)] : []), ...(body ? [createAnimatedText(body)] : [])])
      })
      if (reduced) return

      cards.forEach((card, i) => {
        const apply = (p: number) => {
          const l = power2out(stagger(p, i, n))
          gsap.set(card, { scale: 0.96 + 0.04 * l, opacity: l })
        }
        ScrollTrigger.create({
          trigger: card,
          start: 'top bottom',
          end: 'top 50%',
          onUpdate: ({ progress }) => apply(progress),
          onRefresh: ({ progress }) => apply(progress),
        })
        const box = card.querySelector('[data-icon-box]')
        const icon = card.querySelector('[data-icon]')
        if (box) gsap.set(box, { clipPath: 'inset(0% 100% 0% 0% round 10px)' })
        if (icon) gsap.set(icon, { opacity: 0 })
      })

      let played = false
      let wanted = false
      const play = () => {
        if (played) return
        wanted = true
        if (document.hidden) return
        played = true
        headText?.animateIn({ delay: 0.125 })
        cards.forEach((card, i) => {
          const d = 0.05 * i + 0.125
          const box = card.querySelector('[data-icon-box]')
          const icon = card.querySelector('[data-icon]')
          if (box) gsap.to(box, { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: d })
          if (icon) gsap.to(icon, { opacity: 1, duration: 1, ease: 'power1.out', delay: d + 0.05 })
          texts[i]?.forEach((t, k) => t.animateIn({ delay: d + 0.16 + 0.18 * k }))
        })
      }
      onVisible = () => {
        if (document.visibilityState === 'visible' && wanted && !played) play()
      }
      document.addEventListener('visibilitychange', onVisible)
      offRetro = retroEnter(root, 'top bottom', play)
    }, root)

    return () => {
      offRetro()
      if (onVisible) document.removeEventListener('visibilitychange', onVisible)
      headText?.revert()
      texts.flat().forEach((t) => t.revert())
      ctx.revert()
    }
  }, [])

  return (
    <ScrollReveal>
      <div className={s.gridLayout}>
        <div className="col-span-full min-w-0 md:col-span-10 md:col-start-2" style={{ color: 'var(--abt-ink)' }}>
          <section ref={section} className="CardGrid w-full scroll-mt-28 py-12 xl:py-24">
            <div className="mx-auto w-full">
              <h3 ref={heading} className={`${s.header3} ${s.pending} mb-[48px] w-4/5 text-left font-display font-normal text-inherit max-sm:mx-auto md:w-full xl:mb-16`}>
                {content.heading}
              </h3>
              <div className={`CardGridContainer ${s.cardGrid}`}>
                {content.cards.map((c) => (
                  <div key={c.title} data-card className="BaseCard" style={{ transformOrigin: 'center center' }}>
                    <div className="LinkCard group/card relative h-full overflow-clip rounded-[8px] bg-[var(--abt-card)] text-black xl:rounded-2xl">
                      <div className="CMSLink h-full">
                        <div className="relative z-10 flex h-full flex-col justify-between gap-5 p-6 md:gap-6 xl:gap-16 xl:p-10">
                          <div className="flex items-center gap-2">
                            <div
                              data-icon-box
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.06] md:h-16 md:w-16"
                              style={{ clipPath: 'inset(0% round 10px)' }}
                            >
                              <span data-icon className="flex items-center justify-center">
                                <MdIcon name={c.icon} size={32} className="text-black/70" />
                              </span>
                            </div>
                          </div>
                          <h5 data-title className={`${s.cardTitle} ${s.pending} font-display font-normal text-black`}>
                            {c.title}
                          </h5>
                          <div className="flex flex-1 flex-col justify-end gap-4">
                            <div className="CardGridDescription text-[var(--abt-fg-2)]">
                              <div data-body className={`RichText ${s.body16} ${s.pending} font-display text-[var(--abt-fg-2)]`}>
                                <p>{c.body}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </ScrollReveal>
  )
}

/* ---------------------------------------------------------------------------------------------------------------
 * 6 · Scale at a glance: CMS Section (module 698764) black, pageThemeOverride dark (setSectionTheme -> the header turns
 * dark over it; see SectionTheme.tsx), marginVertical none, contentWidth medium, parallaxFadeOut true > CardGrid headerSize "lg" (h2 32/1.05
 * -> md 40/44), fluidLayout (grid-cols-6, rows of 3 + 2, `@container` cells with lg:min-h-[calc(100cqw*268/320)] /
 * [calc(100cqw*218/485)]), animationDirection "down", directionalEntrance true, iconSize sm, plain `card`s.
 *   parallaxFadeOut: timeline scrubbed on the Section, "bottom 100%" -> "bottom top": Section yPercent 0 -> 20
 *     (power3.in, duration 1, at 0) and the content column opacity 1 -> 0 (ease none, duration .75, at .15)
 *   cards (BaseCardScroll, scaleDir "down"): "top bottom" -> "top 50%", staggered + power2.out, scale 1.06 -> 1,
 *     opacity 0 -> 1, y 48 -> 0, x row-edge -160 / +160 -> 0 with transform-origin right / left centre from 1024px
 *     (0 and centre below)
 *   intro (onEnter "top bottom", retroactive): heading animateIn(.125); Card i: icon clip (.5s power1.out,
 *     delay .1 i + .125), glyph opacity (1s, +.1), RichText animateIn(.1 i + .125)
 *   No pointer handlers (REA: none on .Section).
 * --------------------------------------------------------------------------------------------------------------- */
function entrance(i: number, n: number) {
  let idx: number
  let count: number
  if (i < 3) {
    idx = i
    count = Math.min(3, n)
  } else {
    const start = 3 + 2 * Math.floor((i - 3) / 2)
    count = Math.min(2, n - start)
    idx = i - start
  }
  if (count <= 1) return { origin: 'center center', x: 0 }
  if (idx === 0) return { origin: 'right center', x: -160 }
  if (idx === count - 1) return { origin: 'left center', x: 160 }
  return { origin: 'center center', x: 0 }
}

export function Stats({ content }: { content: AboutContent['stats'] }) {
  const root = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = root.current
    const grid = section.current
    if (!el || !grid) return
    const reduced = prefersReducedMotion()
    const texts: AnimatedText[] = []
    let headText: AnimatedText | null = null
    let offRetro = () => {}
    const ctx = gsap.context(() => {
      if (heading.current) headText = createAnimatedText(heading.current)
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]', grid)
      const n = cards.length
      cards.forEach((c) => {
        const copy = c.querySelector<HTMLElement>('[data-copy]')
        if (copy) texts.push(createAnimatedText(copy, { descender: false })) // RichText: no lineMaskDescenderCompensation (measured 100px, not 101.67)
      })
      if (reduced) return

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'bottom 100%', end: 'bottom top', scrub: true } })
        .to(el, { yPercent: 20, duration: 1, ease: 'power3.in' }, 0)
        .fromTo(inner.current, { opacity: 1 }, { opacity: 0, duration: 0.75, ease: 'none' }, 0.15)

      const lg = matchMedia('(min-width: 1024px)').matches
      cards.forEach((card, i) => {
        const ent = lg ? entrance(i, n) : { origin: 'center center', x: 0 }
        card.style.transformOrigin = ent.origin
        const apply = (p: number) => {
          const q = power2out(stagger(p, i, n))
          gsap.set(card, { scale: 1.06 - 0.06 * q, opacity: q, x: ent.x * (1 - q), y: 48 * (1 - q) })
        }
        ScrollTrigger.create({
          trigger: card,
          start: 'top bottom',
          end: 'top 50%',
          onUpdate: ({ progress }) => apply(progress),
          onRefresh: ({ progress }) => apply(progress),
        })
        const box = card.querySelector('[data-icon-box]')
        const icon = card.querySelector('[data-icon]')
        if (box) gsap.set(box, { clipPath: 'inset(0% 100% 0% 0% round 10px)' })
        if (icon) gsap.set(icon, { opacity: 0 })
      })

      let played = false
      const play = () => {
        if (played) return
        played = true
        headText?.animateIn({ delay: 0.125 })
        cards.forEach((card, i) => {
          const d = 0.1 * i + 0.125
          const box = card.querySelector('[data-icon-box]')
          const icon = card.querySelector('[data-icon]')
          if (box) gsap.to(box, { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: d })
          if (icon) gsap.to(icon, { opacity: 1, duration: 1, ease: 'power1.out', delay: d + 0.1 })
          texts[i]?.animateIn({ delay: d })
        })
      }
      offRetro = retroEnter(grid, 'top bottom', play)
    }, el)
    return () => {
      offRetro()
      headText?.revert()
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [])

  return (
    <div ref={root} data-section-theme="dark" data-text-theme="white" className={`Section ${s.gridLayout} relative isolate overflow-hidden bg-[var(--abt-dark)] text-white`}>
      <div ref={inner} className="relative isolate col-span-full rounded-3xl md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3">
        <section ref={section} className="CardGrid w-full scroll-mt-28 py-12 xl:py-24">
          <div className="mx-auto w-full">
            <h2 ref={heading} className={`${s.headerLg} ${s.pending} mb-[48px] w-4/5 text-left font-display font-normal text-inherit max-sm:mx-auto md:w-full xl:mb-16`}>
              {content.heading}
            </h2>
            <div className={`CardGridContainer ${s.cardGrid} ${s.cardGridFluid}`}>
              {content.cards.map((c, i) => (
                <div key={c.label} className={`${s.fluidCell} flex min-h-0 flex-col ${i < 3 ? 'col-span-full lg:col-span-2' : 'col-span-full lg:col-span-3'}`}>
                  <div data-card className={`BaseCard flex min-h-0 w-full flex-1 flex-col ${i < 3 ? s.fluidThird : s.fluidHalf}`} style={{ transformOrigin: 'center center' }}>
                    <div className="Card flex min-h-0 flex-1 flex-col rounded-[8px] bg-white/[0.13] text-white xl:rounded-2xl">
                      <div className="flex min-h-0 flex-1 flex-col justify-between gap-5 p-6 md:gap-16 xl:p-8">
                        <div className="flex flex-col gap-5 md:gap-16">
                          <div className="flex items-center gap-2">
                            <div
                              data-icon-box
                              className="flex h-8 w-8 items-center justify-center rounded-md"
                              style={{ backgroundColor: 'var(--abt-accent)', clipPath: 'inset(0% round 10px)' }}
                            >
                              <span data-icon className="flex items-center justify-center">
                                <MdIcon name={c.icon} size={16} className="text-white" />
                              </span>
                            </div>
                            <p className="font-mono text-sm uppercase leading-[1.5] text-[var(--abt-muted)]">{c.label}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div data-copy className={`RichText ${s.pending} min-h-16 font-display`}>
                            <h2 className={`${s.statValue} font-normal text-white`}>{c.value}</h2>
                            {c.body ? (
                              <p className={s.body16}>
                                <span className="text-[var(--abt-muted)]">{c.body}</span>
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------------------------------------------
 * 7 · Office gallery: VideoWithImages (module 939985 in 0orpgukdq33u3.js, showVideo false) on Keen Slider 6
 * (`useKeenSlider`, no plugins: no wheel, no autoplay, no arrows). Options, verbatim:
 *   loop true; breakpoints
 *     (min-width: 1px) and (max-width: 589px)     loop false, perView 1.4, spacing 8
 *     (min-width: 590px) and (max-width: 1023px)  loop true,  perView 2.5, spacing 8
 *     (min-width: 1024px) and (max-width: 1440px) loop true,  perView 3.3, spacing 12
 *     (min-width: 1441px)                         loop true,  perView 4,   spacing 12
 *   dragStarted -> cursor "grabbing", dragEnded -> "grab" (inline style on the slider).
 * Keen's own listeners on .keen-slider (REA ev_94804481…): mousedown/move/up/leave, touchstart (passive)/move/end/
 * cancel, dragstart, click (capture-suppress after a drag), ksDrag*. Slides: figure.video-container aspect-video, the
 * image inset 4px (calc(100% - 8px)) with radius 12.
 * --------------------------------------------------------------------------------------------------------------- */
export function Gallery({ images }: { images: AboutContent['gallery'] }) {
  const [cursor, setCursor] = useState<'grab' | 'grabbing'>('grab')
  const [ref] = useKeenSlider<HTMLDivElement>({
    dragStarted: () => setCursor('grabbing'),
    dragEnded: () => setCursor('grab'),
    loop: true,
    breakpoints: {
      '(min-width: 1px) and (max-width: 589px)': { loop: false, slides: { perView: 1.4, spacing: 8 } },
      '(min-width: 590px) and (max-width: 1023px)': { loop: true, slides: { perView: 2.5, spacing: 8 } },
      '(min-width: 1024px) and (max-width: 1440px)': { loop: true, slides: { perView: 3.3, spacing: 12 } },
      '(min-width: 1441px)': { loop: true, slides: { perView: 4, spacing: 12 } },
    },
  })
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="flex w-full flex-col items-center justify-stretch overflow-hidden">
        <div className="relative my-0 w-full max-w-[1792px]">
          <div ref={ref} style={{ cursor }} className="keen-slider flex w-full">
            {images.map((im, i) => (
              <figure key={i} className={`${s.videoContainer} keen-slider__slide relative aspect-video max-w-[420px] overflow-hidden`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={im.src} alt={im.alt} loading="eager" draggable={false} className={s.galleryImg} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
