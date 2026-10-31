'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from '@/components/scale-clone/enterprise-healthcare/animatedText'
import { MdArrowForward } from '@/components/scale-clone/enterprise-healthcare/icons'
import s from '@/components/scale-clone/enterprise-healthcare/healthcare.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * Vahue dark copy of the clone's ClientTestimonials "metrics" variant
 * (components/scale-clone/enterprise-healthcare/Testimonial.tsx), same motion:
 *   backdrop   width 90% -> 100%, 1.15s power3.out scrubbed, "top bottom" -> "bottom 75%"
 *   activate   "top 80%": icon tile layer y 100% -> 0 (0.3s), summary flip-up delay 0.35, name 0.5,
 *              metric value / label at 350 / 450ms, tag animateToText (width -> 20, text, -> text + 26)
 * Vahue changes: it shows a verified case from lib/case-studies.ts, not a quote. The summary is the case's
 * own summary text (no quotation marks), the tile carries an icon instead of a client logo, and a link
 * goes to the full case.
 */

export type CaseSpotlightContent = {
  /** backdrop */
  color: string
  /** icon tile + tag background */
  contrast: string
  summary: string
  metricValue: string
  metricLabel: string
  client: string
  tag: string
  icon: ReactNode
  link: { label: string; href: string }
}

export default function CaseSpotlight({ color, contrast, summary: SUMMARY, metricValue, metricLabel, client: CLIENT, tag: TAG, icon, link }: CaseSpotlightContent) {
  const section = useRef<HTMLDivElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const quote = useRef<HTMLDivElement>(null)
  const value = useRef<HTMLParagraphElement>(null)
  const label = useRef<HTMLParagraphElement>(null)
  const name = useRef<HTMLParagraphElement>(null)
  const tag = useRef<HTMLDivElement>(null)
  const tagText = useRef<HTMLDivElement>(null)
  const iconLayers = useRef<HTMLDivElement[]>([])
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
      const layers = iconLayers.current.filter(Boolean)
      if (reduced) {
        gsap.set(bg.current, { width: '100%' })
        if (tagText.current) tagText.current.textContent = TAG
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
        txt.textContent = TAG
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
  }, [mobile, TAG])

  const iconTile = (i: number, size: string) => (
    <div
      className={`relative box-border flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-solid ${size}`}
      style={{ color, borderColor: contrast }}
    >
      <div
        ref={(el) => {
          if (el) iconLayers.current[i] = el
        }}
        className="absolute -z-10 h-full w-full"
        style={{ background: contrast }}
      />
      <div className="relative flex h-full w-full items-center justify-center">{icon}</div>
    </div>
  )

  return (
    <div ref={section} className="relative scroll-mt-28 bg-bg pb-16 pt-20 text-white md:pb-20 md:pt-20">
      <div className="px-3 lg:px-6">
        <div ref={wrap} className="relative isolate min-w-0">
          <div
            ref={bg}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 z-0 -translate-x-1/2 rounded-2xl border border-border-soft"
            style={{ width: '100%', background: color }}
          />
          <div className={`relative z-10 ${s.tGrid}`}>
            <div className="relative z-20 flex w-full flex-row items-start justify-between gap-8 text-left md:items-center md:justify-start lg:col-span-4 lg:col-start-2 lg:row-start-1 lg:flex-col lg:items-start lg:gap-4">
              <div className={`${s.tTabs} w-full`} aria-hidden="true">
                {iconTile(0, 'max-w-[152px] p-4')}
              </div>
            </div>
            <div aria-hidden="true" className={s.tDivider} style={{ background: '#fff', opacity: 0.15 }} />
            <div className={`relative ${s.tPanel}`}>
              <div className={`relative w-full ${s.tQuote}`}>
                <div className="relative z-10">
                  <div ref={quote} className={`${s.quote} ${s.pending} max-w-none pr-2.5 font-display font-normal text-white`}>
                    {SUMMARY}
                  </div>
                </div>
              </div>
              <div className={`grid ${s.tMetrics}`}>
                <div className="relative z-10 flex flex-col gap-4 self-start [grid-area:1/1]">
                  <p ref={value} className={`${s.metric} ${s.pending} font-display font-light text-white`}>
                    {metricValue}
                  </p>
                  <p ref={label} className={`${s.header5} ${s.pending} max-w-80 font-display font-normal text-white/85`} style={{ textWrap: 'pretty' }}>
                    {metricLabel}
                  </p>
                </div>
              </div>
              <div className={`relative shrink-0 text-left ${s.tName}`}>
                <div className="relative z-10">
                  <p ref={name} className={`${s.pending} font-display text-base font-medium leading-[1.25] tracking-[-0.01em] text-white lg:text-lg lg:leading-[1.25]`}>
                    {CLIENT}
                  </p>
                </div>
                <div
                  ref={tag}
                  aria-label={TAG}
                  className="inline-block overflow-hidden rounded-[4px] px-2 py-1 font-mono text-[10px] uppercase leading-[1.375]"
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
                <a href={link.href} className={`${s.body2} mt-6 flex w-fit items-center gap-2 font-display text-white transition-opacity hover:opacity-70`}>
                  {link.label}
                  <MdArrowForward size={18} />
                </a>
              </div>
            </div>
            <div className={`flex w-full gap-2 ${s.tMobileTabs}`} aria-hidden="true">
              {iconTile(1, 'max-w-[80px] p-3')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
