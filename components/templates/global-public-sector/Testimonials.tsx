'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText, { type AnimatedTextHandle } from '@/components/templates/physical-ai/AnimatedText'
import type { TestimonialItem as Item, TestimonialsContent } from './content'

type Theme = { hex: string; contrast: string }
const transparent = (c: string) => {
  const [r, g, b] = gsap.utils.splitColor(c) as number[]
  return `rgba(${r}, ${g}, ${b}, 0)`
}

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com ClientTestimonials, default variant (module 685963, chunk 2xfd582q915vr.js sha256 a640704c…). Copied from
 * the evaluation-model-developers port and adapted for the count-dependent branches of 685963: with one testimonial
 * (TestimonialSection, page chunk 25a4rb779kpr2.js module 763867) there are no arrow buttons, the tab column is
 * `lg:justify-end`, the quote wrapper has no `grid lg:max-h-[8lh]` clamp and an unselected quote/name is `lg:absolute`
 * (so the quote block is 0 tall until "top 80%" selects index 0, then grows). /global-public-sector passes no colorTheme, so Scale's default applies: cloud-slate
 * #839CB2 with contrastColor "#000000". Only "#010101" maps the class colour to black, so text classes resolve to white
 * (heading, quote, name, chip background) while the inline styles use #000000 (tile border / fill / inactive text, arrow
 * border and icon). No logos: the tile shows the client name (text-xs, medium, truncate).
 *
 * - Panel background width 90% -> 100% (power3.out, scrub: true, trigger panel, "top bottom" -> "bottom 75%").
 * - "top 80%" onEnter selects testimonial 0. Changing index: old quote flips out (rotationX 90), new quote flips in
 *   after 0.35s; old name out at 0.5s, new name in at 0.5s; role chip shrinks to 20px (0.5s power3.out), swaps text,
 *   fades it in (0.5s) and grows to text width + 26px.
 * - Tiles: the contrast fill slides in along y (desktop) / x (mobile) over 0.3s from the side of the previous tile.
 * - Arrow buttons: hover fills the contrast colour with a theme-hex icon over 0.3s. Arrow and tile clicks scroll the
 *   section into view via Lenis (offset -24) before changing the index.
 */


type LenisLike = { scrollTo: (target: HTMLElement, o?: { offset?: number }) => void }

type ChipHandle = { animateToText: (o: { text: string; delay?: number }) => Promise<void> }

const RoleChip = forwardRef<ChipHandle, { theme: Theme }>(function RoleChip({ theme }, ref) {
  const box = useRef<HTMLDivElement>(null)
  const txt = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => ({
    async animateToText({ text, delay = 0 }) {
      if (!box.current || !txt.current) return
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
      await gsap.to(box.current, { width: 20, duration: reduce ? 0 : 0.5, ease: 'power3.out', delay })
      txt.current.textContent = text.trim()
      const w = txt.current.getBoundingClientRect().width
      await new Promise((r) => setTimeout(r, 10))
      gsap.to(txt.current, { opacity: 1, duration: reduce ? 0 : 0.5, ease: 'none' })
      await gsap.to(box.current, { width: w + 26, duration: reduce ? 0 : 0.5, ease: 'power3.out' })
    },
  }))
  return (
    <div ref={box} className="inline-block overflow-hidden rounded-sm p-1 px-2 font-mono text-[10px] uppercase leading-[1.375]" style={{ color: theme.hex, background: theme.contrast === '#010101' ? '#000' : '#fff' }}>
      <div className="text-nowrap">
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="mr-1 inline-block" aria-hidden>
          <path
            d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z"
            fill="currentColor"
          />
        </svg>
        <div ref={txt} className="inline-block text-nowrap" style={{ color: theme.hex }} />
      </div>
    </div>
  )
})

function NavButton({ direction, theme, onClick }: { direction: 'left' | 'right'; theme: Theme; onClick: () => void }) {
  const c = theme.contrast
  const c0 = transparent(c)
  const el = useRef<HTMLButtonElement>(null)
  const [hover, setHover] = useState(false)
  useLayoutEffect(() => {
    gsap.set(el.current, { backgroundColor: c0, color: c, borderColor: c })
  }, [c, c0])
  useEffect(() => {
    gsap.to(el.current, hover ? { backgroundColor: c, color: theme.hex, borderColor: c0, duration: 0.3 } : { backgroundColor: c0, color: c, borderColor: c, duration: 0.3 })
  }, [hover, c, c0, theme.hex])
  return (
    <button
      ref={el}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={direction === 'left' ? 'Previous testimonial' : 'Next testimonial'}
      className="flex aspect-square w-10 cursor-pointer items-center justify-center rounded-md border border-solid border-white text-white lg:w-full"
    >
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden>
        {direction === 'left' ? (
          <path
            d="M5.55088 11.3838C5.70709 11.54 5.96036 11.54 6.11657 11.3838L6.5863 10.914C6.74251 10.7578 6.74251 10.5046 6.5863 10.3483L2.68994 6.45199C2.34823 6.11028 2.34823 5.55626 2.68994 5.21455L6.5863 1.3182C6.74251 1.16199 6.74251 0.908723 6.5863 0.752513L6.11657 0.282781C5.96036 0.126572 5.70709 0.126572 5.55088 0.282782L0.619108 5.21455C0.2774 5.55626 0.277399 6.11028 0.619108 6.45199L5.55088 11.3838Z"
            fill="currentColor"
          />
        ) : (
          <path
            d="M2.44912 11.3838C2.29291 11.54 2.03964 11.54 1.88343 11.3838L1.4137 10.914C1.25749 10.7578 1.25749 10.5046 1.4137 10.3483L5.31006 6.45199C5.65177 6.11028 5.65177 5.55626 5.31006 5.21455L1.4137 1.3182C1.25749 1.16199 1.25749 0.908723 1.4137 0.752513L1.88343 0.282781C2.03964 0.126572 2.29291 0.126572 2.44912 0.282782L7.38089 5.21455C7.7226 5.55626 7.7226 6.11028 7.38089 6.45199L2.44912 11.3838Z"
            fill="currentColor"
          />
        )}
      </svg>
    </button>
  )
}

function Tile({
  item,
  index,
  isActive,
  prevIndex,
  activeIndex,
  total,
  isMobile,
  theme,
  onSelect,
}: {
  theme: Theme
  item: Item
  index: number
  isActive: boolean
  prevIndex: number
  activeIndex: number
  total: number
  isMobile: boolean
  onSelect: () => void
}) {
  const fill = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (isMobile) gsap.set(fill.current, isActive ? { x: '0%', y: '0%' } : { x: '100%', y: '0%' })
    else gsap.set(fill.current, isActive ? { x: '0%', y: '0%' } : { x: '0%', y: '100%' })
  }, [isActive, isMobile])
  useEffect(() => {
    if (prevIndex !== index && !isActive) return
    let from = 0
    if (isActive) {
      from = prevIndex > index ? 100 : -100
      from = index === 0 ? 100 : from
    }
    let to = prevIndex > index ? -100 : 100
    to = index === total - 1 ? -100 : to
    to = activeIndex === 0 ? -100 : to
    const axis = isMobile ? 'x' : 'y'
    if (isActive) gsap.fromTo(fill.current, { [axis]: `${from}%` }, { [axis]: '0%', duration: 0.3 })
    else gsap.fromTo(fill.current, { [axis]: '0%' }, { [axis]: `${to}%`, duration: 0.3 })
  }, [isActive, prevIndex, index, activeIndex, total, isMobile])
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onSelect}
      aria-label={`Show testimonial from ${item.name}`}
      className="relative box-border flex aspect-square w-full max-w-20 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-solid p-3 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 lg:max-w-[152px] lg:p-4"
      style={{ color: isActive ? theme.hex : theme.contrast, borderColor: theme.contrast }}
    >
      <div ref={fill} className="absolute -z-10 h-full w-full" style={{ background: theme.contrast }} />
      <div className="relative z-10 max-w-28 truncate text-center text-[12px] font-medium leading-4">{item.name}</div>
    </button>
  )
}

export default function Testimonials({ content }: { content: TestimonialsContent }) {
  const { heading, items, theme } = content
  const multi = items.length > 1
  const [active, setActive] = useState(-1)
  const quoteRefs = useRef<(AnimatedTextHandle | null)[]>([])
  const nameRefs = useRef<(AnimatedTextHandle | null)[]>([])
  const chip = useRef<ChipHandle>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const prev = useRef(-1)
  const [isMobile, setIsMobile] = useState(false)

  // Scale: safeIndex = min(index, n - 1), so nothing is selected (-1) until the section enters at "top 80%".
  const safe = items.length ? Math.min(active, items.length - 1) : 0

  useEffect(() => {
    const mq = matchMedia('(max-width: 768px)')
    const on = () => setIsMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Index change choreography.
  useEffect(() => {
    if (active < 0) return
    if (prev.current === active) return
    const e = prev.current
    prev.current = active
    const oldQ = e >= 0 ? quoteRefs.current[e] : null
    const newQ = quoteRefs.current[active]
    const oldN = e >= 0 ? nameRefs.current[e] : null
    const newN = nameRefs.current[active]
    oldQ?.animateOut()
    newQ?.ready().then(() => newQ.animateIn({ delay: 0.35 }))
    oldN?.animateOut({ delay: 0.5 })
    newN?.ready().then(() => newN.animateIn({ delay: 0.5 }))
    chip.current?.animateToText({ text: items[active]?.title ?? '', delay: 0.05 })
  }, [active, items])

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => setActive((i) => (i === -1 ? 0 : i)),
      })
      if (reduce) {
        gsap.set(bg.current, { width: '100%' })
        return
      }
      gsap.fromTo(
        bg.current,
        { width: '90%' },
        { width: '100%', duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: panel.current, start: 'top bottom', end: 'bottom 75%', scrub: true } },
      )
    })
    return () => ctx.revert()
  }, [])

  // Arrow / tile clicks first scroll the section into view through Lenis (offset -24; the root's scroll-mt-28 is
  // subtracted too, so it lands at 136px), as Scale's useLenis().scrollTo does.
  const scrollIntoPlace = useCallback(() => {
    const el = sectionRef.current
    if (!el) return
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
    if (lenis) return lenis.scrollTo(el, { offset: -24 })
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24 - margin, behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  const go = useCallback(
    (dir: 'left' | 'right') => {
      scrollIntoPlace()
      setActive((i) => {
        if (dir === 'left') return i <= 0 ? items.length - 1 : i - 1
        return i >= items.length - 1 ? 0 : i + 1
      })
    },
    [items.length, scrollIntoPlace],
  )

  const tiles = () =>
    items.map((it, i) => (
      <Tile
        key={i}
        item={it}
        index={i}
        isActive={i === safe}
        prevIndex={prev.current}
        activeIndex={active}
        total={items.length}
        isMobile={isMobile}
        theme={theme}
        onSelect={() => {
          scrollIntoPlace()
          setActive(i)
        }}
      />
    ))

  return (
    <div ref={sectionRef} className="ClientTestimonials relative scroll-mt-28 bg-white pb-16 pt-20 text-black md:pb-20 md:pt-20">
      <div className="grid grid-cols-8 gap-2 px-3 text-white lg:grid-cols-12 lg:px-6">
        <div ref={panel} className="relative isolate col-span-full min-w-0">
          <div ref={bg} aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-0 -translate-x-1/2 rounded-2xl" style={{ width: '90%', background: theme.hex }} />
          <div className="relative z-10 col-span-full flex flex-col gap-8 p-8 lg:grid lg:grid-cols-12 lg:gap-2 lg:px-0 lg:py-20">
            <div
              className={`col-span-full flex w-full flex-row items-start justify-between gap-8 text-left md:items-center md:justify-start lg:col-span-1 lg:col-start-2 lg:flex-col lg:items-stretch ${multi ? 'lg:justify-between' : 'lg:justify-end'}`}
              role="tablist"
              aria-label="Client testimonials"
            >
              <p className="col-span-full w-1/2 whitespace-pre-line font-mono text-[12px] font-medium uppercase leading-[1.375] tracking-[-0.01em] text-white lg:w-full">{heading}</p>
              <div className="mb-2 hidden flex-col gap-2 lg:flex">{tiles()}</div>
              {multi ? (
                <div className="flex justify-between gap-2">
                  <NavButton direction="left" theme={theme} onClick={() => go('left')} />
                  <NavButton direction="right" theme={theme} onClick={() => go('right')} />
                </div>
              ) : null}
            </div>
            <div className="relative col-span-4 row-start-2 lg:col-span-7 lg:col-start-5 lg:row-start-1" role="tabpanel" aria-live="polite" aria-atomic="true">
              <div className="flex h-full min-h-0 flex-col justify-between gap-16">
                <div className={`relative w-full leading-7 lg:leading-[56px] ${multi ? 'grid lg:block lg:max-h-[8lh] lg:min-h-0 lg:overflow-y-clip' : ''}`}>
                  {items.map((it, i) => {
                    const on = i === safe
                    return (
                      <div
                        key={i}
                        aria-hidden={!on}
                        className={`${multi ? '[grid-area:1/1]' : ''} ${on ? 'relative z-10' : 'pointer-events-none relative z-0 overflow-hidden lg:absolute lg:inset-0'}`}
                      >
                        <AnimatedText
                          ref={(h) => {
                            quoteRefs.current[i] = h
                          }}
                          variant="flip"
                          maskCompensation
                          className="max-w-none pr-2.5 text-[24px] font-normal leading-7 tracking-[-0.05em] text-white lg:text-[40px] lg:leading-[44px]"
                        >
                          <span className="inline-block w-[100px] lg:w-40"> </span>
                          {`“${it.quote}”`}
                        </AnimatedText>
                      </div>
                    )
                  })}
                </div>
                <div className="relative mt-8 shrink-0 text-left lg:mt-0 lg:text-right">
                  {items.map((it, i) => {
                    const on = i === safe
                    return (
                      <div key={i} aria-hidden={!on} className={on ? 'relative z-10' : 'pointer-events-none absolute inset-0 z-0 overflow-hidden'}>
                        <AnimatedText
                          ref={(h) => {
                            nameRefs.current[i] = h
                          }}
                          as="p"
                          variant="flip"
                          maskCompensation
                          className="text-[16px] font-medium leading-[1.25] tracking-[-0.01em] text-white lg:text-[18px]"
                        >
                          {it.name}
                        </AnimatedText>
                      </div>
                    )
                  })}
                  <RoleChip ref={chip} theme={theme} />
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2 lg:hidden" role="tablist" aria-label="Client testimonials">
              {tiles()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
