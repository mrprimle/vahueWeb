'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTROL_FEATURES } from '@/lib/automation-content'
import { createAnimatedText, prefersReducedMotion } from './animatedText'
import s from './hub.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * Guardrails. Clone: ClientTestimonials panel (Testimonial.tsx); Vahue shows no borrowed quotes, so the
 * quote slot carries the control statement and the name slot the six controls.
 *   panel width 90% -> 100%, power3.out, scrub, trigger panel wrapper "top bottom" -> "bottom 75%"
 *   on "top 80%" enter: statement AnimatedText intro (lines) delay 0.35
 */

const PANEL = '#141518'
const STATEMENT =
  'Agents propose. Your team approves anything that moves money, customers or data, and every input, decision and action is on the record.'

export default function Guardrails() {
  const root = useRef<HTMLDivElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const quote = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!root.current) return
    const reduced = prefersReducedMotion()
    const texts: ReturnType<typeof createAnimatedText>[] = []
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(panel.current, { width: '100%' })
        return
      }
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
      if (quote.current) texts.push(createAnimatedText(quote.current, 'lines', true))
      let played = false
      const play = () => {
        if (played) return
        played = true
        texts[0]?.animateIn({ delay: 0.35 })
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
    <section ref={root} aria-labelledby="hub-guardrails" className="relative pb-16 pt-20 text-white md:pb-20 md:pt-20">
      <div className="px-3 lg:px-6">
        <div ref={wrap} className="relative isolate min-w-0">
          <div
            ref={panel}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-full -translate-x-1/2 rounded-2xl border border-border-soft"
            style={{ background: PANEL }}
          />
          <div className="relative z-10 flex flex-col gap-8 p-8 lg:grid lg:grid-cols-12 lg:gap-x-2 lg:px-0 lg:py-20">
            <div className="col-span-full flex w-full flex-row items-start justify-between gap-8 text-left md:items-center md:justify-start lg:col-span-1 lg:col-start-2 lg:flex-col lg:items-stretch lg:justify-start">
              <h2
                id="hub-guardrails"
                className="w-1/2 whitespace-pre-line font-mono text-[12px] font-medium uppercase leading-[1.375] tracking-[-0.01em] text-white lg:w-full"
              >
                {'Guardrails\nyou keep control'}
              </h2>
            </div>
            <div className="relative col-span-4 lg:col-span-7 lg:col-start-5 lg:row-start-1">
              <div className="flex h-full min-h-0 flex-col justify-between gap-16">
                <div className="relative w-full">
                  <p ref={quote} className={`${s.quote} ${s.pending} max-w-none pr-2.5 font-display font-normal text-white`}>
                    <span className="indent inline-block w-[100px] lg:w-40"> </span>
                    {STATEMENT}
                  </p>
                </div>
                <ul className="relative mt-8 grid shrink-0 gap-x-8 gap-y-8 text-left sm:grid-cols-2 lg:mt-0 lg:grid-cols-3">
                  {CONTROL_FEATURES.map((f) => (
                    <li key={f.title} className="border-t border-border-mid pt-4">
                      <h3 className="text-[16px] font-medium leading-tight tracking-[-0.01em] text-white lg:text-[18px]">{f.title}</h3>
                      <p className={`${s.body2} mt-2 text-white/60`}>{f.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
