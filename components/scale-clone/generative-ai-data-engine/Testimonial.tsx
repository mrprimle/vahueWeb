'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fontsReady, prepareText, reduced, type Reveal } from './motion'

// TODO: Vahue copy
const QUOTE =
  'Specialist knowledge is the new compute. The leading labs are pouring serious budgets, really serious budgets, into higher-value tokens, whether by paying specialists to write them or by working with data partners like us or others.'
const NAME = 'Jordan Avery'
const ROLE = 'Founder, Investor'

const Triangle = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="mr-1 inline-block" aria-hidden>
    <path d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z" fill="currentColor" />
  </svg>
)

const LogoButton = ({ mobile = false }: { mobile?: boolean }) => (
  <button
    type="button"
    aria-label={`Show testimonial from ${NAME}`}
    className={`relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-solid border-white transition-all duration-150 ${
      mobile ? 'max-w-[80px] p-3' : 'max-w-[152px] p-4'
    }`}
  >
    <div className="absolute -z-10 h-full w-full bg-white" />
    <div className="relative z-10 max-w-28 truncate text-center text-[12px] font-medium leading-[1.5] text-[#193A29]">{NAME}</div>
  </button>
)

// ClientTestimonials (scale.com):
//  - evergreen panel width 90% -> 100%, scrub, "top bottom" -> "bottom 75%"
//  - section "top 80%": quote lines flip up (delay 0.35), name (delay 0.5), role tag types in
export default function Testimonial() {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelWrapRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const roleRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (reduced()) {
      gsap.set(panelRef.current, { width: '100%' })
      return
    }
    const reveals: Reveal[] = []
    let alive = true
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { width: '90%' },
        { width: '100%', duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: panelWrapRef.current, start: 'top bottom', end: 'bottom 75%', scrub: true } },
      )
      if (roleRef.current) roleRef.current.textContent = ''
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
              quote?.play(0.35)
              name?.play(0.5)
              const tag = roleRef.current
              if (tag) {
                const state = { n: 0 }
                gsap.to(state, {
                  n: ROLE.length,
                  duration: ROLE.length * 0.03,
                  delay: 0.05,
                  ease: 'none',
                  onUpdate: () => {
                    tag.textContent = ROLE.slice(0, Math.round(state.n))
                  },
                })
              }
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
      if (roleRef.current) roleRef.current.textContent = ROLE
    }
  }, [])

  return (
    <div>
      <div ref={rootRef} className="relative scroll-mt-28 bg-white pb-16 pt-20 text-black md:pb-20">
        <div className="grid grid-cols-8 gap-2 px-3 text-white lg:grid-cols-12 lg:px-6">
          <div ref={panelWrapRef} className="relative isolate col-span-full min-w-0">
            <div ref={panelRef} aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-full -translate-x-1/2 rounded-2xl bg-[#193A29]" />
            <div className="relative z-10 col-span-full flex flex-col gap-8 p-8 lg:grid lg:grid-cols-12 lg:gap-2 lg:px-0 lg:py-20">
              <div className="col-span-full flex w-full flex-row items-start justify-between gap-8 text-left md:items-center md:justify-start lg:col-span-1 lg:col-start-2 lg:flex-col lg:items-stretch lg:justify-end">
                {/* TODO: Vahue copy */}
                <p className="col-span-full w-1/2 whitespace-pre-line font-mono text-[12px] font-medium uppercase leading-[1.375] tracking-[-0.01em] text-white lg:w-full">
                  Hear it from the people we work with
                </p>
                <div className="mb-2 hidden flex-col gap-2 lg:flex">
                  <LogoButton />
                </div>
              </div>

              <div className="relative col-span-4 row-start-2 lg:col-span-7 lg:col-start-5 lg:row-start-1">
                <div className="flex h-full min-h-0 flex-col justify-between gap-16">
                  <div className="relative w-full leading-7 lg:leading-[56px]">
                    <div className="relative z-10">
                      {/* TODO: Vahue copy */}
                      <div
                        ref={quoteRef}
                        className="max-w-none pr-2.5 text-[24px] font-normal leading-7 tracking-[-0.05em] text-white lg:text-[40px] lg:leading-[44px]"
                      >
                        <span className="inline-block w-[100px] lg:w-40"> </span>“{QUOTE}”
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-8 shrink-0 text-left lg:mt-0 lg:text-right">
                    <div className="relative z-10">
                      <p ref={nameRef} className="text-[16px] font-medium leading-tight tracking-[-0.01em] text-white lg:text-[18px]">
                        {NAME}
                      </p>
                    </div>
                    <div className="inline-block overflow-hidden rounded-[4px] bg-white px-2 py-1 font-mono text-[10px] uppercase leading-[1.375] text-[#193A29]">
                      <div className="text-nowrap">
                        <Triangle />
                        <span ref={roleRef} className="inline-block text-nowrap">
                          {ROLE}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full gap-2 lg:hidden">
                <LogoButton mobile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
