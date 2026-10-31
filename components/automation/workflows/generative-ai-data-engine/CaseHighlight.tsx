'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CaseStudy } from '@/lib/case-studies'
import { animateToText, fontsReady, prepareText, reduced, tabAxis, type Reveal } from './motion'

const Triangle = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="mr-1 inline-block" aria-hidden>
    <path d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z" fill="currentColor" />
  </svg>
)

const THEME = '#193A29'

// Template logo tab: white outline + white label while inactive, its white fill parked off the tile; on
// activation the fill slides in (0.3s) and the label turns evergreen (transition-all 150ms), as on Scale.
// It links to the case study (Scale's single tab does nothing on click).
const ClientTile = ({ c, mobile = false, active }: { c: CaseStudy; mobile?: boolean; active: boolean }) => (
  <Link
    href={`/case-studies/${c.slug}/`}
    aria-label={`Read the ${c.client} case study`}
    className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-solid transition-all duration-150 ${
      mobile ? 'max-w-[80px] p-3' : 'max-w-[152px] p-4'
    }`}
    style={{ color: active ? THEME : '#fff', borderColor: '#fff' }}
  >
    <div data-tab-fill className="absolute -z-10 h-full w-full" style={{ background: '#fff' }} />
    <div className={`relative z-10 max-w-28 text-center ${mobile ? "line-clamp-4 text-[10px]" : "line-clamp-3 text-[12px]"} font-medium leading-[1.5]`}>{c.client}</div>
  </Link>
)

// Template ClientTestimonials, carrying a verified Vahue case instead of a quote:
//  - panel width 90% -> 100%, scrub, "top bottom" -> "bottom 75%"
//  - section "top 80%": the client tile activates (fill slides in), statement lines flip up (delay 0.35),
//    client (delay 0.5), metric tag runs animateToText (delay 0.05)
export default function CaseHighlight({ caseStudy: c }: { caseStudy: CaseStudy }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelWrapRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const roleRef = useRef<HTMLSpanElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const tag = c.metric

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const fills = root.querySelectorAll<HTMLElement>('[data-tab-fill]')
    if (reduced()) {
      gsap.set(panelRef.current, { width: '100%' })
      setActive(true)
      return
    }
    const axis = tabAxis()
    const reveals: Reveal[] = []
    let alive = true
    const roleEl = roleRef.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { width: '90%' },
        { width: '100%', duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: panelWrapRef.current, start: 'top bottom', end: 'bottom 75%', scrub: true } },
      )
      gsap.set(fills, { [axis]: '100%' })
      if (roleEl) roleEl.textContent = ''
      gsap.set([quoteRef.current, nameRef.current], { opacity: 0 })
      fontsReady().then(() => {
        if (!alive) return
        ctx.add(() => {
          gsap.set([quoteRef.current, nameRef.current], { opacity: 1 })
          const quote = quoteRef.current ? prepareText(quoteRef.current, 'flip') : null
          const name = nameRef.current ? prepareText(nameRef.current, 'flip') : null
          if (quote) reveals.push(quote)
          if (name) reveals.push(name)
          ScrollTrigger.create({
            trigger: root,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              setActive(true)
              gsap.fromTo(fills, { [axis]: '100%' }, { [axis]: '0%', duration: 0.3 })
              quote?.play(0.35)
              name?.play(0.5)
              if (tagRef.current && roleEl) animateToText(tagRef.current, roleEl, tag, 0.05)
            },
          })
          ScrollTrigger.refresh()
        })
      })
    }, root)
    return () => {
      alive = false
      ctx.revert()
      reveals.forEach((r) => r.revert())
      if (roleEl) roleEl.textContent = tag
    }
  }, [tag])

  return (
    <div>
      <div ref={rootRef} data-qa="testimonial" className="relative scroll-mt-28 bg-white pb-16 pt-20 text-black md:pb-20">
        <div className="grid grid-cols-8 gap-2 px-3 text-white lg:grid-cols-12 lg:px-6">
          <div ref={panelWrapRef} className="relative isolate col-span-full min-w-0">
            <div ref={panelRef} aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-full -translate-x-1/2 rounded-2xl bg-[#193A29]" />
            <div className="relative z-10 col-span-full flex flex-col gap-8 p-8 lg:grid lg:grid-cols-12 lg:gap-2 lg:px-0 lg:py-20">
              <div className="col-span-full flex w-full flex-row items-start justify-between gap-8 text-left md:items-center md:justify-start lg:col-span-1 lg:col-start-2 lg:flex-col lg:items-stretch lg:justify-end">
                <p className="col-span-full w-1/2 whitespace-pre-line font-mono text-[12px] font-medium uppercase leading-[1.375] tracking-[-0.01em] text-white lg:w-full">
                  Results from the teams we work with
                </p>
                <div className="mb-2 hidden flex-col gap-2 lg:flex">
                  <ClientTile c={c} active={active} />
                </div>
              </div>

              <div className="relative col-span-4 row-start-2 lg:col-span-7 lg:col-start-5 lg:row-start-1">
                <div className="flex h-full min-h-0 flex-col justify-between gap-16">
                  <div className="relative w-full leading-7 lg:leading-[56px]">
                    <div className="relative z-10">
                      <div
                        ref={quoteRef}
                        className="max-w-none pr-2.5 font-display text-[24px] font-normal leading-7 tracking-[-0.05em] text-white lg:text-[40px] lg:leading-[44px]"
                      >
                        <span className="inline-block w-[100px] lg:w-40"> </span>
                        {c.summary}
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-8 shrink-0 text-left lg:mt-0 lg:text-right">
                    <div className="relative z-10">
                      <p ref={nameRef} className="text-[16px] font-medium leading-tight tracking-[-0.01em] text-white lg:text-[18px]">
                        {c.client}
                      </p>
                    </div>
                    <div ref={tagRef} data-qa="role-tag" className="inline-block overflow-hidden rounded-[4px] bg-white px-2 py-1 font-mono text-[10px] uppercase leading-[1.375] text-[#193A29]">
                      <div className="text-nowrap">
                        <Triangle />
                        <span ref={roleRef} data-qa="role-text" className="inline-block text-nowrap">
                          {tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full gap-2 lg:hidden">
                <ClientTile c={c} mobile active={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
