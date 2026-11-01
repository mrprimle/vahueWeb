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

/* ====================== SgpPlatformDifferentiators ====================== */

export type Mark = 'A' | 'P' | 'N' // applicable / partialApplicable / notApplicable
export type Cell = { m: Mark; note?: string }

export type DiffRow = { label: string; cells: Cell[] }

const Check = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
const Cross = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)
const Minus = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
  </svg>
)

const markBox = (m: Mark, hasNote: boolean) =>
  m === 'A' ? 'bg-[#193a29]' : m === 'P' ? `bg-[#c7c7c7] ${hasNote ? 'group-hover/card:bg-black' : ''}` : 'bg-transparent'
const markIcon = (m: Mark) =>
  m === 'A' ? (
    <Check className="relative size-4 shrink-0 text-white" />
  ) : m === 'P' ? (
    <Check className="relative size-4 shrink-0 text-black" />
  ) : (
    <Cross className="relative size-4 shrink-0 text-[#929292]" />
  )

/*
 * Desktop tooltip (cells with a note): clip-path inset(0 100% 100% 0 round 10px) -> inset(0 round 4px) 0.4s power1.out,
 * note opacity 0 / scale .8 -> 1 0.3s power1.out at "<0.1"; mouseleave reverses. Last column opens to the left.
 * Phones (<769): tapping a partial cell with a note opens a full-screen card (opacity 0.3s).
 */
const MatrixCell = forwardRef<HTMLButtonElement, { cell: Cell; last: boolean; mobile: boolean }>(function MatrixCell({ cell, last, mobile }, ref) {
  const tip = useRef<HTMLDivElement>(null)
  const note = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const [open, setOpen] = useState(false)
  const sheet = useRef<HTMLDivElement>(null)
  // Phones: the note card mounts on tap and fades in (opacity 0 -> 1, 0.3s power2.out); closing unmounts it at once.
  useEffect(() => {
    if (open && sheet.current) gsap.fromTo(sheet.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
  }, [open])
  useEffect(() => {
    const el = tip.current
    if (!el) return
    gsap.set(el, { clipPath: last ? 'inset(0% 0% 100% 100% round 10px)' : 'inset(0% 100% 100% 0% round 10px)' })
    gsap.set(note.current, { opacity: 0, scale: 0.8, transformOrigin: last ? 'right top' : 'left top' })
    const t = gsap.timeline({ paused: true })
    t.to(el, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 0.4, ease: 'power1.out' })
    t.to(note.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power1.out' }, '<0.1')
    tl.current = t
    return () => {
      t.kill()
    }
  }, [last, mobile])
  return (
    <div className="flex flex-1 items-center justify-center px-2 py-3 md:px-3" role="cell">
      <div
        onMouseEnter={() => tl.current?.play()}
        onMouseLeave={() => tl.current?.reverse()}
        className="group/card relative cursor-pointer"
      >
        <button
          ref={ref}
          type="button"
          onClick={() => mobile && setOpen(true)}
          aria-label={cell.m === 'N' ? 'Not included' : 'Included'}
          className={`relative z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm ${markBox(cell.m, !!cell.note)}`}
        >
          {markIcon(cell.m)}
        </button>
        {cell.note && !mobile ? (
          <div
            ref={tip}
            data-qa="tip"
            className={`pointer-events-none absolute -top-6 z-20 flex w-[228px] flex-col gap-4 rounded-md bg-[#eaeaea] p-6 ${last ? '-right-6 items-end' : '-left-6 items-baseline'}`}
          >
            <div className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-sm ${markBox(cell.m, false)}`}>
              <Minus className="relative size-4 shrink-0 text-white" />
            </div>
            <div ref={note} className="text-base leading-6 text-black">
              {cell.note}
            </div>
          </div>
        ) : null}
        {cell.note && mobile && cell.m === 'P' && open ? (
          <div ref={sheet} data-qa="tip-m" className="pointer-events-none fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/20 p-10">
            <div className="flex flex-col gap-4 rounded-md bg-[#eaeaea] p-6">
              <div className="flex w-full justify-between">
                <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-sm bg-black">
                  <Minus className="relative size-5 shrink-0 text-white" />
                </div>
                <button type="button" onClick={() => setOpen(false)} className="pointer-events-auto cursor-pointer" aria-label="Close">
                  <Cross className="relative size-5 shrink-0 text-[#929292]" />
                </button>
              </div>
              <div className="text-base leading-6 text-black">{cell.note}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
})

/*
 * Heading animates in on "top 80%". Table on "top center+=20%": row dividers scaleX 0 -> 1 (stagger .25, 1.2s
 * power2.out), header + row labels AnimatedText (delay .1*i), mark buttons scale 0 -> 1 (1.2s, delay .1*row + .1*col).
 */
export function Differentiators({ title, capability, categories, rows: ROWS }: { title: string; capability: string; categories: string[]; rows: DiffRow[] }) {
  const root = useRef<HTMLElement>(null)
  const table = useRef<HTMLDivElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const capHead = useRef<HTMLDivElement>(null)
  const dividers = useRef<(HTMLSpanElement | null)[]>([])
  const labels = useRef<(HTMLParagraphElement | null)[]>([])
  const buttons = useRef<(HTMLButtonElement | null)[][]>(ROWS.map(() => []))
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    let t = 0
    const r = () => {
      clearTimeout(t)
      t = window.setTimeout(() => setMobile(window.innerWidth < 769), 50)
    }
    window.addEventListener('resize', r)
    r()
    return () => window.removeEventListener('resize', r)
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const heading = createAnimatedText(h.current as HTMLElement)
    const head = createAnimatedText(capHead.current as HTMLElement)
    const rowTexts: AnimatedText[] = labels.current.filter(Boolean).map((l) => createAnimatedText(l as HTMLElement, { type: 'lines' }))
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(dividers.current, { scaleX: 1 })
        return
      }
      const btns = buttons.current.flat().filter(Boolean)
      gsap.set(btns, { scale: 0 })
      onEnter(el, 'top 80%', () => heading.animateIn())
      onEnter(table.current as Element, 'top center+=20%', () => {
        gsap.fromTo(dividers.current, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', stagger: 0.25, duration: 1.2, ease: 'power2.out' })
        head.animateIn()
        rowTexts.forEach((t, i) => t.animateIn({ delay: 0.1 * i }))
        buttons.current.forEach((row, ri) =>
          row.forEach((b, ci) => b && gsap.fromTo(b, { scale: 0 }, { scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.1 * ri + 0.1 * ci })),
        )
      })
    }, el)
    return () => {
      heading.revert()
      head.revert()
      rowTexts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [])

  return (
    <section ref={root} data-qa="diff" className="relative flex min-h-full items-end justify-center bg-white pb-16 text-black md:py-20">
      <div className="flex w-full flex-col gap-24 md:gap-[120px]">
        <div className={s.grid}>
          <h4 ref={h} className={`${s.header2} ${s.pending} col-span-5 col-start-4 text-balance md:col-span-4 md:col-start-8 md:!text-5xl xl:!text-[4rem]`}>
            {title}
          </h4>
        </div>
        <div className="w-full overflow-x-clip">
          <div ref={table} className="relative w-full" role="table" aria-label="Platform differentiators">
            <div className={`${s.grid} mb-8`} role="row">
              <div ref={capHead} className={`${s.pending} col-span-3 flex items-center bg-white text-sm leading-[1.35] tracking-normal text-[#212121] md:text-base md:leading-6`} role="columnheader">
                {capability}
              </div>
              <div className="col-span-5 col-start-4 flex gap-0.5 md:col-start-8 md:gap-1.5">
                {categories.map((c, i) => (
                  <div key={c} className="flex-1">
                    <div
                      className={`flex h-full items-center justify-center rounded-md p-0.5 py-2 text-center text-[10px] capitalize leading-tight tracking-[0.025em] md:p-2 md:text-sm md:leading-[21px] ${
                        i === 0 ? 'bg-black text-white' : 'bg-[#eaeaea] text-black'
                      }`}
                      role="columnheader"
                    >
                      {c}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {ROWS.map((row, ri) => (
              <div key={row.label} className={`${s.grid} relative ${ri % 2 === 0 ? 'bg-white' : 'bg-[#f2f2f2]'}`} role="row">
                <span
                  ref={(el) => {
                    dividers.current[ri] = el
                  }}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 right-0 top-0 z-[1] block h-px origin-left scale-x-0 bg-[#c7c7c7] will-change-transform"
                />
                <p
                  ref={(el) => {
                    labels.current[ri] = el
                  }}
                  className={`${s.body1} ${s.pending} col-span-3 flex items-center py-6 text-black`}
                >
                  {row.label}
                </p>
                <div className="col-span-5 col-start-4 flex gap-1.5 md:col-start-8">
                  {row.cells.map((cell, ci) => (
                    <MatrixCell
                      key={ci}
                      ref={(el) => {
                        buttons.current[ri][ci] = el
                      }}
                      cell={cell}
                      last={ci === row.cells.length - 1}
                      mobile={mobile}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ====================== SgpSecurity -> integrations ====================== */

/*
 * Template SgpSecurity in the clone's colours (#c7c7c7): heading column 5-8 + link, 4 badges in column 10-11, then a
 * 360px media row in a ClipScroll (start 10, scale 1.2) holding our own photo on the clone's #ab8167.
 */
export function Integrations({
  title,
  link,
  badges,
  image,
}: {
  title: string
  link: { href: string; label: string }
  badges: string[]
  image: string
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
    <section ref={root} data-qa="security" className="relative bg-[#c7c7c7] pb-16 pt-16 text-neutral-900 md:pt-28">
      <div className={`${s.grid} w-full !gap-y-16 md:!gap-y-28`}>
        <div className="col-span-full flex flex-col gap-6 md:col-span-4 md:col-start-5 md:row-start-1 md:gap-16">
          <h2 ref={h} className={`${s.header3} ${s.pending} text-balance !text-black`}>
            {title}
          </h2>
          <a
            href={link.href}
            className="group/link relative w-max text-sm font-medium leading-[21px] tracking-normal text-[#212121] decoration-[#212121]/60 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60 focus:outline focus:outline-1 focus:[outline-color:currentColor]"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-in-out group-hover/link:scale-x-100 group-hover/link:bg-white" />
          </a>
        </div>
        <ul aria-label="Controls" className="col-span-full flex flex-col items-start gap-2 md:col-span-2 md:col-start-10 md:row-start-1 md:content-start">
          {badges.map((b) => (
            <li key={b} className="inline-flex w-fit max-w-full items-center rounded-lg border border-[#212121] px-3 py-1 text-sm leading-[21px] tracking-normal text-[#212121]">
              {b}
            </li>
          ))}
        </ul>
        <div className="col-span-full md:row-start-2">
          <ClipScroll startPercentage={10} startScale={1.2} radius={mobile ? 0.5 : 1} backdrop="#c7c7c7">
            <div className="relative aspect-video h-[312px] w-full overflow-hidden rounded-2xl bg-[#ab8167] md:h-[360px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            </div>
          </ClipScroll>
        </div>
      </div>
    </section>
  )
}

/* ====================== ClientTestimonials -> results ====================== */

export type ResultItem = { quote: string; name: string; note: string; metric: string; href: string }

type QuoteHandle = { in: (d?: number) => void; out: (d?: number) => void }
const QuoteBlock = forwardRef<QuoteHandle, { quote: string; active: boolean }>(function QuoteBlock({ quote, active }, ref) {
  const el = useRef<HTMLDivElement>(null)
  const t = useRef<AnimatedText | null>(null)
  useEffect(() => {
    t.current = createAnimatedText(el.current as HTMLElement, { type: 'lines', variant: 'flip' })
    return () => t.current?.revert()
  }, [])
  useImperativeHandle(ref, () => ({ in: (d = 0) => t.current?.animateIn({ delay: d }), out: (d = 0) => t.current?.animateOut({ delay: d }) }))
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
  useImperativeHandle(ref, () => ({ in: (d = 0) => t.current?.animateIn({ delay: d }), out: (d = 0) => t.current?.animateOut({ delay: d }) }))
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
type LenisLike = { scrollTo: (t: Element, o?: { offset?: number }) => void }
const scrollToSection = (el: Element | null) => {
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
  if (el && lenis) lenis.scrollTo(el, { offset: -24 })
}

/** The template's ClientName chip (animateToText): width -> 20px (0.5s power3.out, +delay), swap text, width -> text + 26. */
const RoleChip = forwardRef<{ animateToText: (text: string, delay?: number) => void }>(function RoleChip(_, ref) {
  const box = useRef<HTMLDivElement>(null)
  const txt = useRef<HTMLDivElement>(null)
  const run = useRef(0)
  useImperativeHandle(ref, () => ({
    async animateToText(text: string, delay = 0) {
      const b = box.current
      const t = txt.current
      if (!b || !t) return
      const id = ++run.current
      if (prefersReducedMotion()) {
        t.textContent = text.trim()
        return
      }
      await gsap.to(b, { width: 20, duration: 0.5, ease: 'power3.out', delay })
      if (id !== run.current) return
      t.textContent = text.trim()
      const w = t.getBoundingClientRect().width
      await new Promise((r) => setTimeout(r, 10))
      gsap.to(t, { opacity: 1, duration: 0.5, ease: 'none' })
      await gsap.to(b, { width: w + 26, duration: 0.5, ease: 'power3.out' })
    },
  }))
  return (
    <div ref={box} data-qa="chip" className="inline-block overflow-hidden rounded-sm bg-black p-1 px-2 font-mono text-[10px] uppercase leading-snug text-[#a8927c]">
      <div className="text-nowrap">
        <span className="mr-1 inline-block h-[6px] w-[6px] bg-[#a8927c] align-middle" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
        <div ref={txt} className="inline-block text-nowrap text-[#a8927c]" />
      </div>
    </div>
  )
})

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
  const lastMobile = useRef<boolean | null>(null)
  const chip = useRef<{ animateToText: (text: string, delay?: number) => void }>(null)
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
    const mobileChanged = lastMobile.current !== mobile
    if (from === active && !mobileChanged) return
    lastMobile.current = mobile
    if (from === active) {
      // breakpoint switch only: Scale's per-tab effect re-applies the rest positions
      ;(mobile ? fillsMob : fillsDesk).current.forEach((f, i) => {
        if (f) gsap.set(f, i === active ? { x: '0%', y: '0%' } : { x: mobile ? '100%' : '0%', y: mobile ? '0%' : '100%' })
      })
      return
    }
    prev.current = active
    if (from >= 0) {
      quotes.current[from]?.out()
      names.current[from]?.out(0.5)
    }
    quotes.current[active]?.in(0.35)
    names.current[active]?.in(0.5)
    chip.current?.animateToText(items[active]?.note ?? '', 0.05)
    // tab fills (template LogoTab rules): active enters from -100% (+100% coming from a later tab, always for tab 0);
    // the previous tab leaves to +100% (-100% if it is the last tab or the new one is tab 0).
    const n = items.length
    ;(mobile ? fillsMob : fillsDesk).current.forEach((f, i) => {
      if (!f) return
      const prop = mobile ? 'x' : 'y'
      if (i === active) {
        const e = i === 0 ? 100 : from > i ? 100 : -100
        gsap.fromTo(f, { [prop]: `${e}%` }, { [prop]: '0%', duration: 0.3 })
      } else if (i === from) {
        let t = from > i ? -100 : 100
        if (i === n - 1) t = -100
        if (active === 0) t = -100
        gsap.fromTo(f, { [prop]: '0%' }, { [prop]: `${t}%`, duration: 0.3 })
      } else if (mobileChanged) gsap.set(f, { x: mobile ? '100%' : '0%', y: mobile ? '0%' : '100%' })
      // uninvolved tabs keep wherever their last tween left them (Scale's per-tab effects only run when that tab's
      // active flag or the breakpoint changes)
    })
  }, [active, mobile, items])

  if (!items.length) return null
  const go = (dir: -1 | 1) => {
    scrollToSection(wrap.current)
    setActive((a) => (dir < 0 ? (a <= 0 ? items.length - 1 : a - 1) : a >= items.length - 1 ? 0 : a + 1))
  }
  const pick = (i: number) => {
    scrollToSection(wrap.current)
    setActive(i)
  }
  const cur = Math.max(0, active)

  const Arrow = ({ dir }: { dir: -1 | 1 }) => (
    <button
      type="button"
      onClick={() => go(dir)}
      onMouseEnter={(e) => gsap.to(e.currentTarget, { backgroundColor: '#010101', color: '#a8927c', borderColor: 'rgba(1, 1, 1, 0)', duration: 0.3 })}
      onMouseLeave={(e) => gsap.to(e.currentTarget, { backgroundColor: 'rgba(1, 1, 1, 0)', color: '#010101', borderColor: '#010101', duration: 0.3 })}
      aria-label={dir < 0 ? 'Previous result' : 'Next result'}
      className="flex aspect-square w-10 cursor-pointer items-center justify-center rounded-md border border-solid border-[#010101] bg-[rgba(1,1,1,0)] text-[#010101] lg:w-full"
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
    <div ref={wrap} data-qa="testimonials" className="relative scroll-mt-28 bg-white pb-16 pt-20 text-black md:pb-20 md:pt-20">
      <div className="grid grid-cols-8 gap-2 px-3 lg:grid-cols-[repeat(12,minmax(0,150px))] lg:justify-center lg:px-6">
        <div ref={sizer} className="relative isolate col-span-full min-w-0">
          <div ref={panel} className="pointer-events-none absolute inset-y-0 left-1/2 z-0 -translate-x-1/2 rounded-2xl bg-[#a8927c]" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-8 p-8 lg:grid lg:grid-cols-[repeat(12,minmax(0,150px))] lg:justify-center lg:gap-x-2 lg:px-0 lg:py-20">
            <div className="col-span-full flex w-full flex-row items-start justify-between gap-8 text-left md:items-center md:justify-start lg:col-span-1 lg:col-start-2 lg:flex-col lg:items-stretch lg:justify-between">
              <div className="flex flex-col gap-8">
                <p className="w-full whitespace-pre-line font-mono text-xs font-medium uppercase leading-snug tracking-[-0.01em] max-lg:w-auto">{label}</p>
                <div className="hidden flex-col gap-2 lg:flex" role="tablist">
                  {items.map((q, i) => (
                    <Tab
                      key={i}
                      active={i === cur}
                      label={q.name}
                      metric={q.metric}
                      onClick={() => pick(i)}
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
              <div className="grid" data-qa="quotes">
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
                <div className="relative min-w-0 text-left lg:text-right" data-qa="names">
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
                    <RoleChip ref={chip} />
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
                  onClick={() => pick(i)}
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
      className={`relative isolate box-border flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-solid border-black p-2 ${small ? 'max-w-20' : 'max-w-[152px] lg:p-3'}`}
    >
      <div ref={fillRef} className="absolute -z-10 h-full w-full bg-black" style={{ transform: active ? 'none' : small ? 'translateX(100%)' : 'translateY(100%)' }} />
      <span className={`relative z-10 block text-balance text-center font-display leading-[1.1] tracking-[-0.02em] transition-colors duration-300 ${small ? 'text-[11px]' : 'text-[13px] xl:text-[15px]'} ${active ? 'text-[#a8927c]' : 'text-black/60'}`}>
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
    let ro: ResizeObserver | null = null
    const ctx = gsap.context(() => {
      place(null)
      if (prefersReducedMotion()) return
      // Template: cards are only placed in onUpdate (a body ResizeObserver resets them to the idle layout), so before
      // the section enters they sit in the idle layout and jump to the scroll layout on entry.
      ro = new ResizeObserver(() => place(null))
      ro.observe(document.body)
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom bottom', onUpdate: (self) => place(self.progress) })
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
        if (arrow) t.to(arrow, { x: 0, duration: 0.85, ease: 'power3.inOut' }, 0)
        if (label) t.to(label, { opacity: 1 }, 0.85 - 0.1)
      })
    }, el)
    return () => {
      ro?.disconnect()
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [])
  return (
    <section ref={root} data-qa="demo" className="relative isolate h-screen min-h-screen w-full overflow-hidden bg-black text-white">
      <div className={`${s.grid} relative z-10 h-full min-h-dvh w-full content-center md:min-h-screen`}>
        <div className="order-2 col-span-full flex flex-col pb-[25vw] max-md:justify-center md:order-1 md:col-span-3 md:col-start-2 md:self-center md:pb-[15vh]">
          <div className="flex flex-col items-center gap-6 md:items-start">
            <h2 ref={h} className={`${s.header3} ${s.pending} w-full text-center !leading-none md:text-left`}>
              {title}
            </h2>
            <div ref={p} className={`${s.pending} w-full max-w-xl text-center text-sm leading-[21px] tracking-normal text-[#929292] md:max-w-none md:text-left md:text-base md:leading-6`}>
              {body}
            </div>
            <FlatCta ref={ctaRef} href={cta.href} variant="arrow" theme="white" className="max-md:mx-auto" external>
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
                  <div className="absolute inset-0 flex flex-col justify-between bg-[#212121] p-4 md:p-8">
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
  const [full, setFull] = useState(0)
  // Template: a ResizeObserver keeps the target height at the answer's scrollHeight; open tweens to it, closed to 0 (0.5s).
  useEffect(() => {
    const el = body.current
    if (!el) return
    const ro = new ResizeObserver(() => setFull(el.scrollHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    const el = body.current
    if (!el) return
    if (first.current) {
      first.current = false
      el.style.height = open ? 'auto' : '0px'
      return
    }
    gsap.to(el, { height: open ? full || el.scrollHeight : 0, duration: prefersReducedMotion() ? 0 : 0.5 })
  }, [open, full])
  return (
    <li className="border-b border-[#01010160] last:border-b-0">
      <div className="grid grid-cols-8 items-center gap-2 px-0 py-6 md:grid-cols-[repeat(12,minmax(0,150px))] md:items-start md:justify-center">
        <button
          type="button"
          onClick={() => active !== index && setActive(index)}
          aria-expanded={open}
          className="col-span-full row-start-1 grid h-full cursor-pointer grid-cols-8 items-center gap-0 border-none bg-transparent p-0 text-left md:grid-cols-12 md:items-start"
        >
          <div aria-hidden="true" className="col-start-1 flex h-8 select-none items-center justify-start md:justify-center">
            <div className={`absolute h-[2px] w-4 origin-center scale-x-[1.2] bg-black transition-all duration-300 ${open ? '' : 'rotate-90'}`} />
            <div className="absolute h-[2px] w-4 origin-center scale-x-[1.2] bg-black" />
          </div>
          <h3 className="col-span-6 col-start-3 text-left text-base !font-bold leading-[22px] !text-black md:col-span-3 md:col-start-5 md:text-2xl md:!font-medium md:leading-9">
            {item.q}
          </h3>
        </button>
        <div ref={body} className="col-span-6 col-start-3 row-start-2 overflow-clip md:col-span-3 md:col-start-9 md:row-start-1">
          <div className="flex flex-col gap-4" aria-hidden={!open}>
            <div className="flex flex-col gap-3 text-sm leading-[21px] text-black md:text-base md:leading-6">{item.a}</div>
            <FlatCta href={cta.href} variant="border" theme="black" className="mb-3">
              {cta.label}
            </FlatCta>
          </div>
        </div>
      </div>
    </li>
  )
}

/* FAQ card inside a ClipScroll (black backdrop, startPercentage 8, startScale .9, progressOffset .4, radius 1 / .5). */
export function Faqs({ title, items, cta }: { title: string; items: FaqItemData[]; cta: { href: string; label: string } }) {
  const [active, setActive] = useState(0)
  const mobile = useMobile()
  return (
    <div data-qa="faqs" className="bg-black">
      <ClipScroll startPercentage={8} startScale={0.9} radius={mobile ? 0.5 : 1} backdrop="#000" progressOffset={0.4} className={s.grid} clipClassName="col-span-full">
        <section className="relative scroll-mt-28 rounded-l-lg bg-[#f2f2f2] px-0 pt-6 text-black md:rounded-2xl">
          <div className={`${s.grid} w-full !gap-y-10 md:!gap-y-12`}>
            <h2 className={`${s.header2} col-span-full text-balance !text-black`}>{title}</h2>
            <ul className="col-span-full flex list-none flex-col gap-0 border-t border-[#01010160] p-0">
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

/* ====================== BlogPreview ====================== */

const Brand = ({ bg }: { bg: string }) => (
  <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[5px] shadow-sm" style={{ backgroundColor: bg }} aria-hidden="true">
    <svg className="block size-[8px] text-white" width={12} height={12} viewBox="0 0 12 12" fill="none">
      <path
        d="M10.6884 0H0.652204C0.0720246 0 -0.218065 0.700892 0.192105 1.11106L10.2283 11.1473C10.6385 11.5575 11.3394 11.2667 11.3394 10.6872V0.650964C11.3394 0.291354 11.048 0 10.6884 0Z"
        fill="currentColor"
      />
    </svg>
  </span>
)

/*
 * One bento tile (template BlogPreviewTile inside BaseCardViewportEntrance, scaleDir "none"):
 *  - entrance: an IntersectionObserver on the slot (threshold 0.12, rootMargin "0px 0px -6% 0px") flips it visible;
 *    the card goes opacity 0 / y 16 -> 1 / 0, 0.6s cubic-bezier(.23,1,.32,1), delay 0.05 * min(index, 3). A card
 *    already on screen at mount starts visible.
 *  - title (AnimatedText) animates in with delay 0.05 once the tile is visible.
 *  - image wrapper: scrubbed "top bottom" -> "center center" of the card, scale 1.08 -> 1 (origin 50% 50%).
 *  - hover on the image wrapper: img scale 1.05, 1000ms ease-out.
 */
function Tile({ children, index, href, className = '' }: { children: ReactNode; index: number; href: string; className?: string }) {
  const card = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const t = card.current
    const slot = t?.parentElement
    if (!t || !slot) return
    const reduced = prefersReducedMotion()
    const title = t.querySelector<HTMLElement>('h3')
    const text = title ? createAnimatedText(title) : null
    const img = t.querySelector<HTMLElement>('[data-qa=blog-img]')
    let st: ScrollTrigger | null = null
    if (img) {
      gsap.set(img, { transformOrigin: '50% 50%' })
      if (reduced) gsap.set(img, { scale: 1 })
      else {
        const set = (p: number) => gsap.set(img, { scale: mapRange(p, 0, 1, 1.08, 1) })
        st = ScrollTrigger.create({
          trigger: t,
          start: 'top bottom',
          end: 'center center',
          invalidateOnRefresh: true,
          onToggle: (self) => (img.style.willChange = self.isActive ? 'transform' : 'auto'),
          onUpdate: (self) => set(self.progress),
        })
        set(st.progress)
      }
    }
    if (reduced) return () => st?.kill()
    const r = t.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) gsap.set(t, { scale: 1, opacity: 1, x: 0, y: 0 })
    else gsap.set(t, { scale: 1, opacity: 0, x: 0, y: 16 })
    let tween: gsap.core.Tween | null = null
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return
        io.disconnect()
        tween = gsap.to(t, { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.6, delay: 0.05 * Math.min(index, 3), ease: 'cubic-bezier(0.23, 1, 0.32, 1)', overwrite: 'auto' })
        text?.animateIn({ delay: 0.05 })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(slot)
    return () => {
      io.disconnect()
      tween?.kill()
      st?.kill()
      text?.revert()
    }
  }, [index])
  return (
    <div ref={card} data-qa="blog-card" className="h-full w-full min-h-0">
      <a href={href} className={`block h-full w-full overflow-hidden rounded-2xl ${className}`}>
        {children}
      </a>
    </div>
  )
}

/*
 * BlogPreview bento (col 2-11): left column = text tile (304) over image+caption tile (407); right = full-bleed image
 * (468) over two square-ish tiles (243). Single column with 16px gaps on phones. Tiles enter on intersection:
 * scale .96 / opacity 0 -> 1, 0.6s cubic-bezier(.23,1,.32,1), delay .05*min(i,3). Heading animates in at "top 80%".
 */
export type BlogPost = { href: string; title: string; tag?: string; image?: string }

/** Vahue posts in the clone's five bento slots: [text tile, image + caption, full-bleed image, image, image + tag + caption]. */
export function Blog({ heading, posts }: { heading: string; posts: [BlogPost, BlogPost, BlogPost, BlogPost, BlogPost] }) {
  const [t1, t2, t3, t4, t5] = posts
  const h = useRef<HTMLHeadingElement>(null)
  const head = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const t = createAnimatedText(h.current as HTMLElement)
    const st = onEnter(head.current as Element, 'top 80%', () => t.animateIn({ delay: 0.05 }))
    return () => {
      st.kill()
      t.revert()
    }
  }, [])
  const caption = `${s.pending} text-pretty text-left text-base !font-medium leading-[22px] !tracking-[-0.025em] !text-white`
  return (
    <section data-qa="blog" data-nav-theme="dark" className="isolate w-full scroll-mt-28 overflow-hidden bg-black py-12 md:py-16">
      <div className={s.grid}>
        <div className="col-span-full md:col-span-10 md:col-start-2">
          <div ref={head} className="mb-8 md:mb-20">
            <h2 ref={h} className={`${s.pending} text-balance text-center text-[32px] font-normal leading-[1.05] !text-white lg:text-[4rem]`}>
              {heading}
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-2">
            <div className="flex flex-col gap-4 max-md:contents md:flex-1 md:gap-2">
              <div data-qa="blog-slot" className="max-md:order-1 md:h-[304px]">
                <Tile index={0} href={t1.href} className="bg-white/5">
                  <div className="relative flex h-full min-h-[115px] w-full flex-col p-4 text-white lg:p-5">
                    <div className="inline-flex items-center gap-1.5">
                      <Brand bg="#575757" />
                      <span className="truncate font-mono text-[11px] uppercase leading-none tracking-[0.05em] text-white/90">{t1.tag}</span>
                    </div>
                    <div className="mt-auto flex w-full flex-col items-start pb-0.5">
                      <h3 className={`${s.pending} text-balance text-left text-[24px] font-normal leading-[1.25] !text-white lg:text-[2.5rem]`}>{t1.title}</h3>
                    </div>
                  </div>
                </Tile>
              </div>
              <div data-qa="blog-slot" className="h-[312px] max-md:order-3 md:h-[407px]">
                <Tile index={2} href={t2.href} className="bg-white/5">
                  <div className="flex h-full flex-col gap-5 p-4 lg:p-5">
                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg">
                      <div data-qa="blog-img" className="group/img absolute inset-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t2.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover/img:scale-105" loading="lazy" />
                      </div>
                    </div>
                    <h3 className={caption}>{t2.title}</h3>
                  </div>
                </Tile>
              </div>
            </div>
            <div className="flex flex-col gap-4 max-md:contents md:flex-1 md:gap-2">
              <div data-qa="blog-slot" className="h-[280px] max-md:order-2 md:h-[468px]">
                <Tile index={1} href={t3.href} className="relative bg-neutral-900">
                  <div data-qa="blog-img" className="group/img absolute inset-0 bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t3.image} alt={t3.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover/img:scale-105" loading="lazy" />
                  </div>
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0)_40%),linear-gradient(0deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.14)_38%,rgba(0,0,0,0)_68%)]" />
                </Tile>
              </div>
              <div className="flex flex-col gap-4 max-md:contents md:h-[243px] md:flex-row md:gap-2">
                <div data-qa="blog-slot" className="h-[220px] max-md:order-4 md:h-full md:flex-1">
                  <Tile index={3} href={t4.href} className="bg-white/5">
                    <div className="h-full p-4 lg:p-5">
                      <div className="relative h-full overflow-hidden rounded-lg">
                        <div data-qa="blog-img" className="group/img absolute inset-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={t4.image} alt={t4.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover/img:scale-105" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </Tile>
                </div>
                <div data-qa="blog-slot" className="h-[260px] max-md:order-5 md:h-full md:flex-1">
                  <Tile index={4} href={t5.href} className="bg-white/5">
                    <div className="flex h-full flex-col gap-5 p-4 lg:p-5">
                      <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg">
                        <div data-qa="blog-img" className="group/img absolute inset-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={t5.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover/img:scale-105" loading="lazy" />
                        </div>
                        <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5">
                          <Brand bg="#86bff2" />
                          <span className="font-mono text-[11px] uppercase leading-none tracking-[0.05em] text-white">{t5.tag}</span>
                        </div>
                      </div>
                      <h3 className={caption}>{t5.title}</h3>
                    </div>
                  </Tile>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
