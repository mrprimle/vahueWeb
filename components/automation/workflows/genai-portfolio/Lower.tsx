'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from 'react'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, mapRange, onEnter, prefersReducedMotion, type AnimatedText } from './motion'
import { ClipScroll, Eyebrow } from './Sections'
import FlatCta from './FlatCta'
import s from './styles.module.css'

gsap.registerPlugin(ScrollTrigger)

const useMobile = () => {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const f = () => setMobile(mq.matches)
    f()
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  return mobile
}

/* ====================== SgpSecurity -> integrations ====================== */

/*
 * Template SgpSecurity on Vahue dark: heading column 5-8 + link, badge column 10-11 (here the workflow's systems),
 * then a 360px media row in a ClipScroll (start 10, scale 1.2). Scale's photo is replaced by a dot-texture panel
 * carrying the deployment statement.
 */
export function Integrations({
  eyebrow,
  title,
  link,
  badges,
  panel,
}: {
  eyebrow: string
  title: string
  link: { href: string; label: string }
  badges: string[]
  panel: { eyebrow: string; title: string; body: string }
}) {
  const root = useRef<HTMLElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const mobile = useMobile()
  useEffect(() => {
    const t = createAnimatedText(h.current as HTMLElement)
    const st = onEnter(root.current as Element, 'top bottom-=20%', () => t.animateIn())
    return () => {
      st.kill()
      t.revert()
    }
  }, [])
  return (
    <section ref={root} className="relative border-t border-border-soft bg-[#0b0b0c] pb-16 pt-16 text-white md:pt-28">
      <div className={`${s.grid} w-full !gap-y-16 md:!gap-y-28`}>
        <div className="col-span-full flex flex-col gap-6 md:col-span-4 md:col-start-5 md:row-start-1 md:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 ref={h} className={`${s.header3} ${s.pending} text-balance text-white`}>
              {title}
            </h2>
          </div>
          <a href={link.href} className="group/link relative w-max text-sm font-medium leading-[21px] tracking-normal text-white transition-colors">
            {link.label}
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-in-out group-hover/link:scale-x-100" />
          </a>
        </div>
        <ul aria-label={eyebrow} className="col-span-full flex flex-col items-start gap-2 md:col-span-2 md:col-start-10 md:row-start-1 md:content-start">
          {badges.map((b) => (
            <li key={b} className="inline-flex w-fit max-w-full items-center rounded-lg border border-border-strong px-3 py-1 text-sm leading-[21px] tracking-normal text-white/85">
              {b}
            </li>
          ))}
        </ul>
        <div className="col-span-full md:row-start-2">
          <ClipScroll startPercentage={10} startScale={1.2} radius={mobile ? 0.5 : 1} backdrop="#0b0b0c">
            <div className="hero-texture relative flex h-[312px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border-soft bg-[#121214] p-6 md:h-[360px] md:p-10">
              <Eyebrow>{panel.eyebrow}</Eyebrow>
              <div className="flex max-w-3xl flex-col gap-3">
                <p className={`${s.header3} text-white`}>{panel.title}</p>
                <p className="text-base leading-6 text-white/55">{panel.body}</p>
              </div>
            </div>
          </ClipScroll>
        </div>
      </div>
    </section>
  )
}

/* ====================== ClientTestimonials -> results ====================== */

export type ResultItem = { quote: string; name: string; note: string; metric: string; href: string }

type QuoteHandle = { in: (d?: number) => void; out: () => void }
const QuoteBlock = forwardRef<QuoteHandle, { quote: string; active: boolean }>(function QuoteBlock({ quote, active }, ref) {
  const el = useRef<HTMLDivElement>(null)
  const t = useRef<AnimatedText | null>(null)
  useEffect(() => {
    t.current = createAnimatedText(el.current as HTMLElement, { type: 'lines', variant: 'flip' })
    return () => t.current?.revert()
  }, [])
  useImperativeHandle(ref, () => ({ in: (d = 0) => t.current?.animateIn({ delay: d }), out: () => t.current?.animateOut() }))
  return (
    <div className={`[grid-area:1/1] ${active ? 'relative z-10' : 'pointer-events-none relative z-0 overflow-hidden lg:absolute lg:inset-0'}`} aria-hidden={!active}>
      <div
        ref={el}
        className={`${s.pending} max-w-none pr-2.5 text-[24px] font-normal leading-7 tracking-[-0.05em] lg:line-clamp-8 lg:text-[40px] lg:leading-[44px]`}
      >
        <span className="inline-block w-[100px] lg:w-40">{' '}</span>
        {quote}
      </div>
    </div>
  )
})

const NameBlock = forwardRef<QuoteHandle, { name: string; active: boolean }>(function NameBlock({ name, active }, ref) {
  const el = useRef<HTMLParagraphElement>(null)
  const t = useRef<AnimatedText | null>(null)
  useEffect(() => {
    t.current = createAnimatedText(el.current as HTMLElement, { type: 'lines', variant: 'flip' })
    return () => t.current?.revert()
  }, [])
  useImperativeHandle(ref, () => ({ in: (d = 0) => t.current?.animateIn({ delay: d }), out: () => t.current?.animateOut() }))
  return (
    <div className={active ? 'relative z-10' : 'pointer-events-none absolute inset-0 z-0 overflow-hidden'} aria-hidden={!active}>
      <p ref={el} className={`${s.pending} text-base font-medium leading-tight lg:text-lg`}>
        {name}
      </p>
    </div>
  )
})

/*
 * Template ClientTestimonials on Vahue dark: the panel (Scale's foundry-tan, here a dark surface) widens 90% -> 100%
 * (scrub "top bottom" -> "bottom 75%", power3.out). First item shows on "top 80%". Switching: old summary/name flip
 * out (rotationX 90, yPercent -108), new one flips in at +0.35 / name +0.5. Tabs (metric in place of a customer
 * logo): fill slides 100% -> 0 (y on desktop, x on phones, 0.3s). Arrow buttons fill on hover (0.3s).
 */
export function Results({ label, items }: { label: string; items: ResultItem[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const sizer = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const quotes = useRef<(QuoteHandle | null)[]>([])
  const names = useRef<(QuoteHandle | null)[]>([])
  const fillsDesk = useRef<(HTMLDivElement | null)[]>([])
  const fillsMob = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(-1)
  const prev = useRef(-1)
  const mobile = useMobile()

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const ctx = gsap.context(() => {
      onEnter(el, 'top 80%', () => setActive((a) => (a === -1 ? 0 : a)))
      if (prefersReducedMotion()) {
        gsap.set(panel.current, { width: '100%' })
        return
      }
      gsap.fromTo(
        panel.current,
        { width: '90%' },
        { width: '100%', duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: sizer.current, start: 'top bottom', end: 'bottom 75%', scrub: true } },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (active < 0) return
    const from = prev.current
    if (from === active) return
    prev.current = active
    if (from >= 0) {
      quotes.current[from]?.out()
      names.current[from]?.out()
    }
    quotes.current[active]?.in(0.35)
    names.current[active]?.in(from === -1 ? 0.35 : 0.5)
    ;(mobile ? fillsMob : fillsDesk).current.forEach((f, i) => {
      if (!f) return
      const prop = mobile ? 'x' : 'y'
      if (i === active) gsap.fromTo(f, { [prop]: from > i ? '100%' : '-100%' }, { [prop]: '0%', duration: 0.3 })
      else if (i === from) gsap.fromTo(f, { [prop]: '0%' }, { [prop]: from > active ? '-100%' : '100%', duration: 0.3 })
      else gsap.set(f, { x: mobile ? '100%' : '0%', y: mobile ? '0%' : '100%' })
    })
  }, [active, mobile])

  if (!items.length) return null
  const go = (dir: -1 | 1) => setActive((a) => (Math.max(0, a) + dir + items.length) % items.length)
  const cur = Math.max(0, active)

  const Arrow = ({ dir }: { dir: -1 | 1 }) => (
    <button
      type="button"
      onClick={() => go(dir)}
      aria-label={dir < 0 ? 'Previous result' : 'Next result'}
      className="flex aspect-square w-10 cursor-pointer items-center justify-center rounded-md border border-white/60 text-white transition-colors duration-300 hover:bg-white hover:text-bg lg:w-full"
    >
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true" style={dir > 0 ? { transform: 'scaleX(-1)' } : undefined}>
        <path
          d="M5.55088 11.3838C5.70709 11.54 5.96036 11.54 6.11657 11.3838L6.5863 10.914C6.74251 10.7578 6.74251 10.5046 6.5863 10.3483L2.68994 6.45199C2.34823 6.11028 2.34823 5.55626 2.68994 5.21455L6.5863 1.3182C6.74251 1.16199 6.74251 0.908723 6.5863 0.752513L6.11657 0.282781C5.96036 0.126572 5.70709 0.126572 5.55088 0.282782L0.619108 5.21455C0.2774 5.55626 0.277399 6.11028 0.619108 6.45199L5.55088 11.3838Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )

  return (
    <div ref={wrap} className="relative scroll-mt-28 bg-bg pb-16 pt-20 text-white md:pb-20 md:pt-20">
      <div className="grid grid-cols-8 gap-2 px-3 lg:grid-cols-[repeat(12,minmax(0,150px))] lg:justify-center lg:px-6">
        <div ref={sizer} className="relative isolate col-span-full min-w-0">
          <div ref={panel} className="hero-texture pointer-events-none absolute inset-y-0 left-1/2 z-0 -translate-x-1/2 rounded-2xl border border-border-soft bg-[#121214]" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-8 p-8 lg:grid lg:grid-cols-[repeat(12,minmax(0,150px))] lg:justify-center lg:gap-x-2 lg:px-0 lg:py-20">
            <div className="col-span-full flex w-full flex-row items-start justify-between gap-8 text-left md:items-center md:justify-start lg:col-span-1 lg:col-start-2 lg:flex-col lg:items-stretch lg:justify-between">
              <div className="flex flex-col gap-8">
                <p className="w-full whitespace-pre-line font-mono text-xs font-medium uppercase leading-snug tracking-[0.05em] text-white/70 max-lg:w-auto">{label}</p>
                <div className="hidden flex-col gap-2 lg:flex" role="tablist">
                  {items.map((q, i) => (
                    <Tab
                      key={i}
                      active={i === cur}
                      label={q.name}
                      metric={q.metric}
                      onClick={() => setActive(i)}
                      fillRef={(el) => {
                        fillsDesk.current[i] = el
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 lg:mt-10 lg:grid lg:grid-cols-2">
                <Arrow dir={-1} />
                <Arrow dir={1} />
              </div>
            </div>
            <div className="col-span-full flex min-h-[320px] flex-col justify-between lg:col-span-7 lg:col-start-5">
              <div className="grid">
                {items.map((q, i) => (
                  <QuoteBlock
                    key={i}
                    ref={(el) => {
                      quotes.current[i] = el
                    }}
                    quote={q.quote}
                    active={i === cur}
                  />
                ))}
              </div>
              <div className="mt-8 flex shrink-0 items-center gap-3 lg:mt-0 lg:justify-end lg:gap-4">
                <div className="relative min-w-0 text-left lg:text-right">
                  {items.map((q, i) => (
                    <NameBlock
                      key={i}
                      ref={(el) => {
                        names.current[i] = el
                      }}
                      name={q.name}
                      active={i === cur}
                    />
                  ))}
                  <div className="mt-1 flex flex-wrap items-center gap-3 lg:justify-end">
                    <div className="inline-block rounded-sm bg-white p-1 px-2 font-mono text-[10px] uppercase leading-snug text-bg">
                      <span className="mr-1 inline-block h-[6px] w-[6px] bg-bg align-middle" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
                      <span className="inline-block text-nowrap">{items[cur].note}</span>
                    </div>
                    <a href={items[cur].href} className="flex items-center gap-1 text-sm font-medium leading-[21px] text-white transition-colors duration-300 hover:text-white/70">
                      Read the case study
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 lg:hidden" role="tablist">
              {items.map((q, i) => (
                <Tab
                  key={i}
                  active={i === cur}
                  label={q.name}
                  metric={q.metric}
                  onClick={() => setActive(i)}
                  fillRef={(el) => {
                    fillsMob.current[i] = el
                  }}
                  small
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Tab({ active, label, metric, onClick, fillRef, small }: { active: boolean; label: string; metric: string; onClick: () => void; fillRef: (el: HTMLDivElement | null) => void; small?: boolean }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={`Show result from ${label}`}
      onClick={onClick}
      className={`relative isolate box-border flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-solid border-white/60 p-2 ${small ? 'max-w-20' : 'max-w-[152px] lg:p-3'}`}
    >
      <div ref={fillRef} className="absolute -z-10 h-full w-full bg-white" style={{ transform: active ? 'none' : small ? 'translateX(100%)' : 'translateY(100%)' }} />
      <span className={`relative z-10 block text-balance text-center font-display leading-[1.1] tracking-[-0.02em] transition-colors duration-300 ${small ? 'text-[11px]' : 'text-[13px] xl:text-[15px]'} ${active ? 'text-bg' : 'text-white/70'}`}>
        {metric}
      </span>
    </button>
  )
}

/* ====================== SgpDemo -> how we start ====================== */

const DESK = { stackTopPx: 34, baseOffsetXPx: 200, baseOffsetYScrollPx: 90, parallaxXPerProgress: 1.3, parallaxYPerProgress: 1.4, skewDeg: 18, mapProgressToMax: 50 }
const PHONE = { stackTopPx: 34, baseOffsetXPx: 80, baseOffsetYScrollPx: 50, parallaxXPerProgress: 1.3, parallaxYPerProgress: 1.4, skewDeg: 18, mapProgressToMax: 50 }
const vw = (px: number, base: number) => (100 * px) / base

export type DemoCard = { eyebrow: string; title: string; body: string }

/*
 * Template SgpDemo on Vahue dark: three skewed cards (skewY 18deg, z-stack, top i*34px, margin-top 8vh) parallax with
 * scroll ("top bottom" -> "bottom bottom"): x = i*200 + p*1.3*(i+1), y = i*90 + p*1.4*(i+1), p = progress*50, in vw
 * of 1520 (phones: 80 / 50, base 390). Copy animates in at "top bottom-=50%": headline 0, subtitle .5, CTA 1.
 * Scale's product screenshots become dot-texture cards, one per engagement phase.
 */
export function Demo({
  eyebrow,
  title,
  body,
  cta,
  cards,
}: {
  eyebrow: string
  title: string
  body: string
  cta: { href: string; label: string }
  cards: DemoCard[]
}) {
  useRefreshOnPageGrow()
  const root = useRef<HTMLElement>(null)
  const cardEls = useRef<(HTMLDivElement | null)[]>([])
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const texts = [createAnimatedText(h.current as HTMLElement), createAnimatedText(p.current as HTMLElement)]
    const place = (progress: number | null) => {
      const phone = window.innerWidth < 768
      const c = phone ? PHONE : DESK
      const base = phone ? 390 : 1520
      const l = progress === null ? 0 : mapRange(progress, 0, 1, c.mapProgressToMax, 0)
      cardEls.current.forEach((card, i) => {
        if (!card) return
        const x = i * c.baseOffsetXPx + l * c.parallaxXPerProgress * (i + 1)
        const y = i * c.baseOffsetYScrollPx + l * c.parallaxYPerProgress * (i + 1)
        gsap.set(card, { top: i * c.stackTopPx, transform: `translate(${vw(x, base)}vw, -${vw(y, base)}vw) skewY(${c.skewDeg}deg)` })
      })
    }
    const ctx = gsap.context(() => {
      place(null)
      if (prefersReducedMotion()) return
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom bottom', onUpdate: (self) => place(self.progress), onRefresh: (self) => place(self.progress) })
      // CTA "filledWhiteArrow" intro
      const a = ctaRef.current
      const counter = a?.querySelector<HTMLElement>('[data-cta-counter]')
      const label = a?.querySelector<HTMLElement>('[data-cta-text]')
      const arrow = a?.querySelector<HTMLElement>('[data-cta-arrow]')
      gsap.set(a, { autoAlpha: 0, scaleX: 0, borderRadius: 0, transformOrigin: 'left center' })
      gsap.set(counter ?? [], { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(arrow ?? [], { x: -6 })
      gsap.set(label ?? [], { opacity: 0 })
      onEnter(el, 'top bottom-=50%', () => {
        texts[0].animateIn({ delay: 0 })
        texts[1].animateIn({ delay: 0.5 })
        const t = gsap.timeline({ delay: 1 })
        t.to(a, { autoAlpha: 1, scaleX: 1, borderRadius: 8, duration: 0.85, ease: 'power3.out' }, 0)
        if (counter) t.to(counter, { scaleX: 1, duration: 0.85, ease: 'power3.out' }, 0.1)
        if (arrow) t.to(arrow, { x: 0, duration: 0.85, ease: 'power3.inOut' }, 0.1)
        if (label) t.to(label, { opacity: 1, duration: 0.85, ease: 'power3.out' }, 0.75)
      })
    }, el)
    return () => {
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [])
  return (
    <section ref={root} className="relative isolate h-screen min-h-screen w-full overflow-hidden bg-bg text-white">
      <div className={`${s.grid} relative z-10 h-full min-h-dvh w-full content-center md:min-h-screen`}>
        <div className="order-2 col-span-full flex flex-col pb-[25vw] max-md:justify-center md:order-1 md:col-span-3 md:col-start-2 md:self-center md:pb-[15vh]">
          <div className="flex flex-col items-center gap-6 md:items-start">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 ref={h} className={`${s.header3} ${s.pending} w-full text-balance text-center !leading-none md:text-left`}>
              {title}
            </h2>
            <div ref={p} className={`${s.pending} w-full max-w-xl text-center text-sm leading-[21px] tracking-normal text-white/55 md:max-w-none md:text-left md:text-base md:leading-6`}>
              {body}
            </div>
            <FlatCta ref={ctaRef} href={cta.href} variant="arrow" theme="white" className="max-md:mx-auto">
              {cta.label}
            </FlatCta>
          </div>
        </div>
        <div className="pointer-events-none order-1 col-span-6 col-start-2 min-h-0 py-14 pt-[14vh] max-md:w-full md:order-2 md:col-span-4 md:col-start-6 md:block md:self-center md:py-0">
          <div className="relative flex h-auto w-full items-center justify-end md:h-full">
            <div className="relative h-[min(420px,52vh)] w-full">
              {cards.slice(0, 3).map((c, i) => (
                <div
                  key={c.title}
                  ref={(el) => {
                    cardEls.current[i] = el
                  }}
                  className={`${s.ortho} absolute aspect-[1.5] w-full overflow-hidden rounded-lg shadow-[0_28px_90px_rgba(0,0,0,0.5)] ring-1 ring-white/10 md:rounded-2xl`}
                  style={{ zIndex: 3 - i, perspective: '1000px' }}
                >
                  <div className="hero-texture absolute inset-0 flex flex-col justify-between bg-[#121214] p-4 md:p-8">
                    <div className="flex items-center justify-between">
                      <Eyebrow>{c.eyebrow}</Eyebrow>
                      <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-white/45 md:text-[13px]">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="flex flex-col gap-2 md:gap-3">
                      <p className="text-[22px] leading-none tracking-[-0.02em] text-white md:text-[40px]">{c.title}</p>
                      <p className="line-clamp-3 text-[11px] leading-[1.35] text-white/55 md:text-sm md:leading-[21px]">{c.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ====================== Faqs ====================== */

export type FaqItemData = { q: string; a: ReactNode }

function FaqItem({ item, index, active, setActive, cta }: { item: FaqItemData; index: number; active: number; setActive: (i: number) => void; cta: { href: string; label: string } }) {
  const body = useRef<HTMLDivElement>(null)
  const open = active === index
  const first = useRef(true)
  useEffect(() => {
    const el = body.current
    if (!el) return
    if (first.current) {
      first.current = false
      el.style.height = open ? 'auto' : '0px'
      return
    }
    gsap.to(el, { height: open ? el.scrollHeight : 0, duration: prefersReducedMotion() ? 0 : 0.5 })
  }, [open])
  return (
    <li className="border-b border-border-mid last:border-b-0">
      <div className="grid grid-cols-8 items-center gap-2 px-0 py-6 md:grid-cols-[repeat(12,minmax(0,150px))] md:items-start md:justify-center">
        <button
          type="button"
          onClick={() => active !== index && setActive(index)}
          aria-expanded={open}
          className="col-span-full row-start-1 grid h-full cursor-pointer grid-cols-8 items-center gap-0 border-none bg-transparent p-0 text-left md:grid-cols-12 md:items-start"
        >
          <div aria-hidden="true" className="col-start-1 flex h-8 select-none items-center justify-start md:justify-center">
            <div className={`absolute h-[2px] w-4 origin-center scale-x-[1.2] bg-white transition-all duration-300 ${open ? '' : 'rotate-90'}`} />
            <div className="absolute h-[2px] w-4 origin-center scale-x-[1.2] bg-white" />
          </div>
          <h3 className="col-span-6 col-start-3 text-left text-base !font-bold leading-[22px] text-white md:col-span-3 md:col-start-5 md:text-2xl md:!font-medium md:leading-9">
            {item.q}
          </h3>
        </button>
        <div ref={body} className="col-span-6 col-start-3 row-start-2 overflow-clip md:col-span-3 md:col-start-9 md:row-start-1">
          <div className="flex flex-col gap-4" aria-hidden={!open}>
            <div className="flex flex-col gap-3 text-sm leading-[21px] text-white/70 md:text-base md:leading-6">{item.a}</div>
            <FlatCta href={cta.href} variant="border" theme="white" className="mb-3">
              {cta.label}
            </FlatCta>
          </div>
        </div>
      </div>
    </li>
  )
}

/* FAQ card inside a ClipScroll (dark backdrop, startPercentage 8, startScale .9, progressOffset .4, radius 1 / .5). */
export function Faqs({ title, items, cta }: { title: string; items: FaqItemData[]; cta: { href: string; label: string } }) {
  const [active, setActive] = useState(0)
  const mobile = useMobile()
  return (
    <div className="bg-bg pb-16">
      <ClipScroll startPercentage={8} startScale={0.9} radius={mobile ? 0.5 : 1} backdrop="#020202" progressOffset={0.4} className={s.grid} clipClassName="col-span-full">
        <section className="relative scroll-mt-28 rounded-l-lg border border-border-soft bg-[#121214] px-0 pt-6 text-white md:rounded-2xl">
          <div className={`${s.grid} w-full !gap-y-10 md:!gap-y-12`}>
            <h2 className={`${s.header2} col-span-full text-balance text-white`}>{title}</h2>
            <ul className="col-span-full flex list-none flex-col gap-0 border-t border-border-mid p-0">
              {items.map((f, i) => (
                <FaqItem key={i} item={f} index={i} active={active} setActive={setActive} cta={cta} />
              ))}
            </ul>
          </div>
        </section>
      </ClipScroll>
    </div>
  )
}
