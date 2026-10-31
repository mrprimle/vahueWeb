'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './animatedText'
import s from './healthcare.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com ClientTestimonials, "metrics" variant (chunk 3x8z3_0hhtdcb.js, module 685963), one testimonial,
 * colorTheme cloud-slate #839CB2, contrast #010101.
 *   backdrop   width 90% -> 100%, 1.15s power3.out scrubbed, trigger = inner wrapper, "top bottom" -> "bottom 75%"
 *              (sampled 1253px = 0.9 x 1392 before, 1378 mid, 1392 after)
 *   activate   trigger = section, "top 80%": active index -1 -> 0
 *     logo tab background  y 100% -> 0%, 0.3s
 *     quote                3D flip-up (customAnimation), delay 0.35
 *     client name          flip-up, delay 0.5
 *     metric value / label flip-up, setTimeout 350ms / 450ms
 *     title tag            animateToText: width -> 20px 0.5s power3.out (delay 0.05), set text,
 *                          opacity -> 1 0.5s, width -> text + 26px 0.5s power3.out
 *   (sampled before activation: lines matrix3d rotationX -90 / translateY 43.2px = 108% of 40px; tag 26px wide;
 *    logo layer translateY 106.656px = 100%)
 */

export type TestimonialContent = {
  color: string
  contrast: string
  quote: string
  metricValue: string
  metricLabel: string
  name: string
  title: string
  logo?: ReactNode
}

export default function Testimonial({ color, contrast, quote: QUOTE, metricValue, metricLabel, name: NAME, title: TITLE, logo }: TestimonialContent) {
  const section = useRef<HTMLDivElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const quote = useRef<HTMLDivElement>(null)
  const value = useRef<HTMLParagraphElement>(null)
  const label = useRef<HTMLParagraphElement>(null)
  const name = useRef<HTMLParagraphElement>(null)
  const tag = useRef<HTMLDivElement>(null)
  const tagText = useRef<HTMLDivElement>(null)
  const logoLayers = useRef<HTMLDivElement[]>([])
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = matchMedia('(max-width: 768px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    const root = section.current
    if (!root) return
    const reduced = prefersReducedMotion()
    const texts: AnimatedText[] = []
    const timers: ReturnType<typeof setTimeout>[] = []

    const ctx = gsap.context(() => {
      const layers = logoLayers.current.filter(Boolean)
      if (reduced) {
        gsap.set(bg.current, { width: '100%' })
        if (tagText.current) tagText.current.textContent = TITLE
        gsap.set(layers, { x: '0%', y: '0%' })
        return
      }
      gsap.fromTo(
        bg.current,
        { width: '90%' },
        { width: '100%', duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom 75%', scrub: true } },
      )

      const q = quote.current && createAnimatedText(quote.current, { type: 'lines', variant: 'flip' })
      const v = value.current && createAnimatedText(value.current, { type: 'lines', variant: 'flip' })
      const l = label.current && createAnimatedText(label.current, { type: 'lines', variant: 'flip' })
      const n = name.current && createAnimatedText(name.current, { type: 'lines', variant: 'flip' })
      ;[q, v, l, n].forEach((t) => t && texts.push(t))
      gsap.set(layers, mobile ? { x: '100%', y: '0%' } : { x: '0%', y: '100%' })

      const animateToText = async () => {
        const box = tag.current
        const txt = tagText.current
        if (!box || !txt) return
        await gsap.to(box, { width: 20, duration: 0.5, ease: 'power3.out', delay: 0.05 })
        txt.textContent = TITLE
        const w = txt.getBoundingClientRect().width
        await new Promise((r) => setTimeout(r, 10))
        gsap.to(txt, { opacity: 1, duration: 0.5, ease: 'none' })
        await gsap.to(box, { width: w + 26, duration: 0.5, ease: 'power3.out' })
      }

      let active = false
      const activate = () => {
        if (active) return
        active = true
        gsap.fromTo(layers, mobile ? { x: '100%' } : { y: '100%' }, mobile ? { x: '0%', duration: 0.3 } : { y: '0%', duration: 0.3 })
        q?.animateIn({ delay: 0.35 })
        n?.animateIn({ delay: 0.5 })
        timers.push(setTimeout(() => v?.animateIn(), 350))
        timers.push(setTimeout(() => l?.animateIn(), 450))
        animateToText()
      }
      ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        onEnter: activate,
        onRefresh: (self) => {
          if (self.progress > 0) activate()
        },
      })
    }, root)

    return () => {
      timers.forEach(clearTimeout)
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [mobile, TITLE])

  const logoTile = (i: number, size: string) => (
    <button
      type="button"
      role="tab"
      aria-selected="true"
      aria-label={`Show testimonial from ${NAME}`}
      className={`relative box-border flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-solid ${size}`}
      style={{ color, borderColor: contrast }}
    >
      <div
        ref={(el) => {
          if (el) logoLayers.current[i] = el
        }}
        className="absolute -z-10 h-full w-full"
        style={{ background: contrast }}
      />
      <div className="relative flex h-full w-full items-center justify-center">
        {/* customer logo; a neutral placeholder tile when none is given (Scale shows the Mayo Clinic mark) */}
        {logo ?? <div className="h-[60%] w-[70%] rounded-[4px] bg-current opacity-50" />}
      </div>
    </button>
  )

  return (
    <div ref={section} className="ClientTestimonials relative scroll-mt-28 bg-white pb-16 pt-20 text-black md:pb-20 md:pt-20">
      <div className="px-3 lg:px-6">
        <div ref={wrap} className="relative isolate min-w-0">
          <div ref={bg} aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-0 -translate-x-1/2 rounded-2xl " style={{ width: '100%', background: color }} />
          <div className={`relative z-10 ${s.tGrid}`}>
            <div className="relative z-20 flex w-full flex-row items-start justify-between gap-8 text-left md:items-center md:justify-start lg:col-span-4 lg:col-start-2 lg:row-start-1 lg:flex-col lg:items-start lg:gap-4" role="tablist" aria-label="Client testimonials">
              <div className={`${s.tTabs} w-full`}>{logoTile(0, 'max-w-[152px] p-4')}</div>
            </div>
            <div aria-hidden="true" className={s.tDivider} />
            <div className={`relative ${s.tPanel}`} role="tabpanel" aria-label={`Testimonial from ${NAME}`}>
              <div className={`relative w-full ${s.tQuote}`}>
                <div className="relative z-10">
                  <div ref={quote} className={`${s.quote} ${s.pending} max-w-none pr-2.5 font-display font-normal text-black`}>
                    {QUOTE}
                  </div>
                </div>
              </div>
              <div className={`grid ${s.tMetrics}`}>
                <div className="relative z-10 flex flex-col gap-4 self-start [grid-area:1/1]">
                  <p ref={value} className={`${s.metric} ${s.pending} font-display font-normal text-black`}>
                    {metricValue}
                  </p>
                  <p ref={label} className={`${s.header5} ${s.pending} max-w-80 font-display font-normal text-black`} style={{ textWrap: 'pretty' }}>
                    {metricLabel}
                  </p>
                </div>
              </div>
              <div className={`relative shrink-0 text-left ${s.tName}`}>
                <div className="relative z-10">
                  <p ref={name} className={`${s.pending} font-display text-base font-medium leading-[1.25] tracking-[-0.01em] text-black lg:text-lg lg:leading-[1.25]`}>
                    {NAME}
                  </p>
                </div>
                <div
                  ref={tag}
                  aria-label={TITLE}
                  className="inline-block overflow-hidden rounded-[4px] bg-black px-2 py-1 font-mono text-[10px] uppercase leading-[1.375]"
                  style={{ color, background: contrast }}
                >
                  <div className="whitespace-nowrap">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden="true" className="mr-1 inline-block">
                      <path
                        d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z"
                        fill="currentColor"
                      />
                    </svg>
                    <div ref={tagText} className="inline-block whitespace-nowrap" style={{ color }} />
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex w-full gap-2 ${s.tMobileTabs}`} role="tablist" aria-label="Client testimonials">
              {logoTile(1, 'max-w-[80px] p-3')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
