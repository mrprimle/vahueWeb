'use client'

import { useLayoutEffect, useRef } from 'react'
import { testimonial } from './content'
import { Triangle } from './icons'
import { gsap, ScrollTrigger, playFlip, prepareFlip, reducedMotion } from './motion'

const SLATE = '#839CB2'

// scale.com ClientTestimonials, default variant, one testimonial (chunk 3_bsw0kgw5l_w.js):
//   panel:  width 90% -> 100%, power3.out, scrub, trigger inner column, top bottom -> bottom 75%
//   enter:  wrapper "top 80%" selects item 0 -> quote lines flip up (delay 0.35),
//           name lines flip up (delay 0.5), active tile fill slides y 100% -> 0 (0.3s),
//           role label types in after ~0.35s
//   flip:   transformPerspective 900, origin 50% 100%, rotationX -90 / yPercent 108 -> 0,
//           0.48s power2.out, stagger 0.05
export default function Testimonial() {
  const wrap = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const quote = useRef<HTMLDivElement>(null)
  const names = useRef<HTMLParagraphElement[]>([])
  const fills = useRef<HTMLDivElement[]>([])
  const role = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) {
      gsap.set(panel.current, { width: '100%' })
      return
    }
    let cancelled = false
    const splits: { revert: () => void }[] = []
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.current,
        { width: '90%' },
        {
          width: '100%',
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: inner.current, start: 'top bottom', end: 'bottom 75%', scrub: true },
        },
      )
      gsap.set(fills.current, { y: '100%' })
      gsap.set(role.current, { clipPath: 'inset(0 100% 0 0)' })
    })
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx.add(() => {
        const q = quote.current && prepareFlip(quote.current)
        const n = names.current.filter(Boolean).map((el) => prepareFlip(el))
        if (q) splits.push(q)
        splits.push(...n)
        ScrollTrigger.create({
          trigger: wrap.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (q) playFlip(q, 0.35)
            n.forEach((s) => playFlip(s, 0.5))
            gsap.to(fills.current, { y: '0%', duration: 0.3 })
            gsap.to(role.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.out', delay: 0.35 })
          },
        })
      })
    })
    return () => {
      cancelled = true
      ctx.revert()
      splits.forEach((s) => s.revert())
    }
  }, [])

  const tile = (size: string, i: number) => (
    <button
      type="button"
      role="tab"
      aria-selected
      aria-label={`Show testimonial from ${testimonial.name}`}
      className={`relative box-border flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-solid p-3 transition-all lg:p-4 ${size}`}
      style={{ color: SLATE, borderColor: '#000' }}
    >
      <div
        ref={(el) => {
          if (el) fills.current[i] = el
        }}
        className="absolute -z-10 h-full w-full"
        style={{ background: '#000' }}
      />
      {/* TODO: client logo */}
      <div className="relative z-10 max-w-[112px] truncate text-center text-[12px] font-medium leading-[1.5]">{testimonial.name}</div>
    </button>
  )

  return (
    <div className="pb-10 pt-8 md:pt-10">
      <div ref={wrap} className="relative scroll-mt-28 bg-white pb-16 pt-20 text-black md:pb-20">
        <div className="grid grid-cols-8 gap-2 px-3 lg:grid-cols-[repeat(12,minmax(0,150px))] lg:justify-center lg:px-6">
          <div ref={inner} className="relative isolate col-span-full min-w-0">
            <div
              ref={panel}
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 z-0 -translate-x-1/2 rounded-2xl"
              style={{ background: SLATE }}
            />
            <div className="relative z-10 col-span-full flex flex-col gap-8 p-8 lg:grid lg:grid-cols-[repeat(12,minmax(0,1fr))] lg:gap-2 lg:px-0 lg:py-20">
              <div
                className="col-span-full flex w-full flex-row items-start justify-between gap-8 text-left md:items-center md:justify-start lg:col-span-1 lg:col-start-2 lg:flex-col lg:items-stretch lg:justify-end"
                role="tablist"
                aria-label="Client testimonials"
              >
                {/* TODO: Vahue copy */}
                <p className="col-span-full w-1/2 whitespace-pre-line font-mono text-[12px] font-medium uppercase leading-[1.375] tracking-[-0.01em] text-white lg:w-full">
                  {testimonial.eyebrow}
                </p>
                <div className="mb-2 hidden flex-col gap-2 lg:flex">{tile('max-w-[80px] lg:max-w-[152px]', 0)}</div>
              </div>
              <div className="relative col-span-4 row-start-2 lg:col-span-7 lg:col-start-5 lg:row-start-1" role="tabpanel">
                <div className="flex h-full min-h-0 flex-col justify-between gap-16">
                  <div className="relative w-full leading-7 lg:leading-[2.75rem]">
                    <div className="relative z-10">
                      {/* TODO: Vahue copy */}
                      <div
                        ref={quote}
                        className="max-w-none pr-2.5 text-[24px] font-normal leading-7 tracking-[-0.05em] text-white lg:text-[40px] lg:leading-[2.75rem]"
                      >
                        <span className="inline-block w-[100px] lg:w-[160px]">&nbsp;</span>
                        “{testimonial.quote}”
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-8 shrink-0 text-left lg:mt-0 lg:text-right">
                    <div className="relative z-10">
                      <p
                        ref={(el) => {
                          if (el) names.current[0] = el
                        }}
                        className="text-[16px] font-medium leading-[1.25] tracking-[-0.01em] text-white lg:text-[18px]"
                      >
                        {testimonial.name}
                      </p>
                    </div>
                    <div className="inline-block overflow-hidden rounded-[4px] bg-white px-2 py-1 font-mono text-[10px] uppercase leading-[1.375]" style={{ color: SLATE }}>
                      <div ref={role} className="text-nowrap">
                        <Triangle />
                        <div className="inline-block text-nowrap" style={{ color: SLATE }}>
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-2 lg:hidden" role="tablist" aria-label="Client testimonials">
                {tile('max-w-[80px]', 1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
