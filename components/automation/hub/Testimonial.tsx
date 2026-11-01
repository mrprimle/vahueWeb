'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion } from './animatedText'
import { CornerGlyph } from './icons'
import { getCaseStudy } from '@/lib/case-studies'
import s from './hub.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * Data-engine clone's ClientTestimonials panel (single testimonial, cloud-slate #839CB2), same markup, colours and motion.
 * Vahue has no client quotes to show, so the quote slot carries a verified case result from lib/case-studies.ts in the
 * case's own words (no quotation marks), the name slot the client and the chip its disclosure.
 *   panel width 90% -> 100%, power3.out, scrub, trigger panel wrapper "top bottom" -> "bottom 75%"
 *   on "top 80%" enter (state -1 -> 0, chunk 1a9k8nwrsxal6.js module 685963):
 *     quote / name: AnimatedText with the testimonial customAnimation ('flip': rotationX -90 -> 0, yPercent 108 -> 0,
 *       0.48s power2.out, stagger 0.05, perspective 900, origin 50% 100%), delay 0.35 / 0.5
 *     role chip: ClientName.animateToText (delay 0.05): width -> 20 (0.5s power3.out), set text, opacity -> 1
 *       (0.5s none), width -> textWidth + 26 (0.5s power3.out). The chip renders empty until then.
 *     tab button: inactive (fill y 100%, label black) -> active (fill y 100% -> 0, 0.3s; x on <=768px), label #839CB2
 *   tab click: Lenis scrollTo(testimonial root, { offset: -24 }), then select (already selected here). The root keeps
 *     Scale's scroll-mt-28, which Lenis subtracts too, so the section lands at 24 + 112 = 136px from the top.
 */

const SLATE = '#839CB2'
const CASE = getCaseStudy('exaware-governed-noc-agents')!
const NAME = CASE.client
const ROLE = CASE.disclosure
const QUOTE = `${CASE.summary} ${CASE.outcomes[2]}.`

type LenisLike = { scrollTo: (target: HTMLElement, o?: { offset?: number }) => void }

function scrollToTestimonial(el: HTMLElement | null) {
  if (!el) return
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
  if (lenis) return lenis.scrollTo(el, { offset: -24 })
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24 - margin, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

function TabButton({ mobile = false, active, onSelect }: { mobile?: boolean; active: boolean; onSelect: () => void }) {
  const fill = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  useEffect(() => {
    const el = fill.current
    if (!el) return
    const narrow = matchMedia('(max-width: 768px)').matches
    const axis = narrow ? 'x' : 'y'
    if (first.current || !active || prefersReducedMotion()) {
      first.current = false
      gsap.set(el, { x: '0%', y: '0%', [axis]: active ? '0%' : '100%' })
      return
    }
    // index 0: enters from +100%, 0.3s, GSAP default ease (power1.out)
    gsap.fromTo(el, { x: '0%', y: '0%', [axis]: '100%' }, { [axis]: '0%', duration: 0.3 })
  }, [active])
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      onClick={onSelect}
      className={`relative box-border flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-solid border-black p-3 transition-all lg:p-4 ${mobile ? 'max-w-20' : 'max-w-[152px]'}`}
      style={{ color: active ? SLATE : '#000000' }}
      aria-label={`Show result from ${NAME}`}
    >
      <div ref={fill} className="absolute -z-10 h-full w-full bg-black" style={{ transform: mobile ? 'translateX(100%)' : 'translateY(100%)' }} />
      <div className="relative z-10 max-w-28 truncate text-center text-[12px] font-medium leading-[1.5]">{NAME}</div>
    </button>
  )
}

export default function Testimonial() {
  const root = useRef<HTMLDivElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const quote = useRef<HTMLDivElement>(null)
  const name = useRef<HTMLParagraphElement>(null)
  const chip = useRef<HTMLDivElement>(null)
  const chipText = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const select = useCallback(() => {
    scrollToTestimonial(root.current)
    setActive(true)
  }, [])

  useEffect(() => {
    if (!root.current) return
    const reduced = prefersReducedMotion()
    const texts: ReturnType<typeof createAnimatedText>[] = []
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(panel.current, { width: '100%' })
        ScrollTrigger.create({ trigger: root.current, start: 'top 80%', once: true, onEnter: () => setActive(true) })
        return
      }
      // The chip is empty until the testimonial is selected (Scale renders no initial title).
      if (chipText.current) chipText.current.textContent = ''
      gsap.fromTo(
        panel.current,
        { width: '90%' },
        {
          width: '100%',
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom 75%', scrub: true },
        },
      )
      if (quote.current) texts.push(createAnimatedText(quote.current, 'lines', true, 'flip'))
      if (name.current) texts.push(createAnimatedText(name.current, 'lines', true, 'flip'))
      const animateToText = async (text: string, delay: number) => {
        const box = chip.current
        const label = chipText.current
        if (!box || !label) return
        await gsap.to(box, { width: 20, duration: 0.5, ease: 'power3.out', delay })
        label.textContent = text.trim()
        const w = label.getBoundingClientRect().width
        await new Promise((r) => setTimeout(r, 10))
        gsap.to(label, { opacity: 1, duration: 0.5, ease: 'none' })
        await gsap.to(box, { width: w + 26, duration: 0.5, ease: 'power3.out' })
      }
      let played = false
      const play = () => {
        if (played) return
        played = true
        setActive(true)
        texts[0]?.animateIn({ delay: 0.35 })
        texts[1]?.animateIn({ delay: 0.5 })
        animateToText(ROLE, 0.05)
      }
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 80%',
        once: true,
        onEnter: play,
        onRefresh: (self) => {
          if (self.progress > 0) play()
        },
      })
    }, root)
    return () => {
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [])

  return (
    <div ref={root} className="relative scroll-mt-28 bg-[#f9fafb] pb-16 pt-20 text-black md:pb-20 md:pt-20">
      <div className="px-3 lg:px-6">
        <div ref={wrap} className="relative isolate min-w-0">
          <div
            ref={panel}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-full -translate-x-1/2 rounded-2xl"
            style={{ background: SLATE }}
          />
          <div className="relative z-10 flex flex-col gap-8 p-8 lg:grid lg:grid-cols-12 lg:gap-x-2 lg:px-0 lg:py-20">
            <div className="col-span-full flex w-full flex-row items-start justify-between gap-8 text-left md:items-center md:justify-start lg:col-span-1 lg:col-start-2 lg:flex-col lg:items-stretch lg:justify-end">
              <h2 className="w-1/2 whitespace-pre-line font-mono text-[12px] font-medium uppercase leading-[1.375] tracking-[-0.01em] text-white lg:w-full">
                {'Results from\na named client'}
              </h2>
              <div className="mb-2 hidden flex-col gap-2 lg:flex" role="tablist">
                <TabButton active={active} onSelect={select} />
              </div>
            </div>
            <div className="relative col-span-4 lg:col-span-7 lg:col-start-5 lg:row-start-1" role="tabpanel">
              <div className="flex h-full min-h-0 flex-col justify-between gap-16">
                <div className="relative w-full">
                  <div ref={quote} className={`${s.quote} ${s.pending} max-w-none pr-2.5 font-display font-normal text-white`}>
                    <span className="indent inline-block w-[100px] lg:w-40"> </span>
                    {QUOTE}
                  </div>
                </div>
                <div className="relative mt-8 shrink-0 text-left lg:mt-0 lg:text-right">
                  <p ref={name} className={`${s.pending} text-[16px] font-medium leading-tight tracking-[-0.01em] text-white lg:text-[18px]`}>
                    {NAME}
                  </p>
                  <div
                    ref={chip}
                    className="mt-0.5 inline-block overflow-hidden rounded-sm bg-white p-1 px-2 font-mono text-[10px] uppercase leading-snug"
                    style={{ color: SLATE }}
                  >
                    <div className="text-nowrap">
                      <CornerGlyph className="mr-1 inline-block" />
                      <div ref={chipText} className="inline-block text-nowrap">
                        {ROLE}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2 lg:hidden" role="tablist">
              <TabButton mobile active={active} onSelect={select} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
