'use client'

import { useEffect, useRef } from 'react'
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
 *   on "top 80%" enter: quote AnimatedText intro (lines) delay 0.35, name delay 0.5
 */

const SLATE = '#839CB2'
const CASE = getCaseStudy('exaware-governed-noc-agents')!
const NAME = CASE.client
const ROLE = CASE.disclosure
const QUOTE = `${CASE.summary} ${CASE.outcomes[2]}.`

function TabButton({ mobile = false }: { mobile?: boolean }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected="true"
      className={`relative box-border flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-solid border-black p-3 lg:p-4 ${mobile ? 'max-w-20' : 'max-w-[152px]'}`}
      style={{ color: SLATE }}
      aria-label={`Show result from ${NAME}`}
    >
      <div className="absolute -z-10 h-full w-full bg-black" />
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
      if (name.current) texts.push(createAnimatedText(name.current, 'lines'))
      let played = false
      const play = () => {
        if (played) return
        played = true
        texts[0]?.animateIn({ delay: 0.35 })
        texts[1]?.animateIn({ delay: 0.5 })
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
    <div ref={root} className="relative bg-[#f9fafb] pb-16 pt-20 text-black md:pb-20 md:pt-20">
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
                <TabButton />
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
                    className="mt-0.5 inline-block overflow-hidden rounded-sm bg-white p-1 px-2 font-mono text-[10px] uppercase leading-snug"
                    style={{ color: SLATE }}
                  >
                    <div className="text-nowrap">
                      <CornerGlyph className="mr-1 inline-block" />
                      <div className="inline-block text-nowrap">{ROLE}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2 lg:hidden" role="tablist">
              <TabButton mobile />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
