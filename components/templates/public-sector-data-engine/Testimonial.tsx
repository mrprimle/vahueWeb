'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { PublicSectorDataEngineContent } from './content'
import { Triangle } from './icons'
import { gsap, ScrollTrigger, playFlip, prepareFlip, reducedMotion, type SplitText } from './motion'

const SLATE = '#839CB2'

type LenisLike = { scrollTo: (target: HTMLElement, o?: { offset?: number }) => void }

// Scale's useLenis().scrollTo(root, { offset: -24 }); Lenis also subtracts the root's scroll-mt-28.
function scrollToTestimonial(el: HTMLElement | null) {
  if (!el) return
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
  if (lenis) return lenis.scrollTo(el, { offset: -24 })
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24 - margin, behavior: reducedMotion() ? 'auto' : 'smooth' })
}

// scale.com ClientTestimonials, default variant, one testimonial (chunk 3_bsw0kgw5l_w.js, module 685963; same
// code as data-engine's 1a9k8nwrsxal6.js copy, only minifier names differ):
//   panel:  width 90% -> 100%, power3.out, scrub, trigger inner column, top bottom -> bottom 75%
//   select: index -1 -> 0 on the wrapper's "top 80%" onEnter (useScrollTrigger, not retroactive) or on a tile click.
//           quote lines flip up (delay 0.35), name lines flip up (delay 0.5), and the role chip runs
//           ClientName.animateToText (delay 0.05): width -> 20 (0.5s power3.out), set the text, wait 10ms,
//           text opacity -> 1 (0.5s none), width -> textWidth + 26 (0.5s power3.out). It renders empty until then.
//   tile:   inactive = label #000 on a black fill parked at y 100% (x 100% at <=768px); active = label #839CB2,
//           fill slides 100% -> 0 on that axis (0.3s, GSAP default ease). Click: Lenis scrollTo(root, offset -24),
//           then select. focus-visible: 2px white/80 outline, offset 2.
//   flip:   transformPerspective 900, origin 50% 100%, rotationX -90 / yPercent 108 -> 0,
//           0.48s power2.out, stagger 0.05
export default function Testimonial({ content: testimonial }: { content: PublicSectorDataEngineContent['testimonial'] }) {
  const { role } = testimonial
  const wrap = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const quote = useRef<HTMLDivElement>(null)
  const names = useRef<HTMLParagraphElement[]>([])
  const fills = useRef<HTMLDivElement[]>([])
  const chip = useRef<HTMLDivElement>(null)
  const chipText = useRef<HTMLDivElement>(null)
  const playRef = useRef<() => void>(() => {})
  const [active, setActive] = useState(false)

  const select = useCallback(() => {
    playRef.current()
    setActive(true)
  }, [])

  // Tile fill: parked off-axis while inactive, slides in when the testimonial becomes active.
  useEffect(() => {
    const narrow = matchMedia('(max-width: 768px)').matches
    const axis = narrow ? 'x' : 'y'
    fills.current.forEach((el) => {
      if (!el) return
      if (!active || reducedMotion()) {
        gsap.set(el, { x: '0%', y: '0%', [axis]: active ? '0%' : '100%' })
        return
      }
      gsap.fromTo(el, { x: '0%', y: '0%', [axis]: '100%' }, { [axis]: '0%', duration: 0.3 })
    })
  }, [active])

  useLayoutEffect(() => {
    let played = false
    if (reducedMotion()) {
      gsap.set(panel.current, { width: '100%' })
      playRef.current = () => {
        if (played) return
        played = true
        if (chipText.current) chipText.current.textContent = role
      }
      const st = ScrollTrigger.create({ trigger: wrap.current, start: 'top 80%', onEnter: select })
      return () => st.kill()
    }
    let cancelled = false
    const splits: { revert: () => void }[] = []
    let q: SplitText | null = null
    let n: SplitText[] = []
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
    playRef.current = () => {
      if (played) return
      played = true
      animateToText(role, 0.05)
      // AnimatedText.ready(): the splits exist once fonts are in; if they are not yet, play when they are.
      document.fonts.ready.then(() => {
        if (cancelled) return
        if (q) playFlip(q, 0.35)
        n.forEach((sp) => playFlip(sp, 0.5))
      })
    }
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
      // useScrollTrigger: start `top 80%`, end `bottom 20%`; onEnter selects index 0 while nothing is selected.
      ScrollTrigger.create({ trigger: wrap.current, start: 'top 80%', end: 'bottom 20%', onEnter: select })
    })
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx.add(() => {
        if (played) return
        q = quote.current ? prepareFlip(quote.current) : null
        n = names.current.filter(Boolean).map((el) => prepareFlip(el))
        if (q) splits.push(q)
        splits.push(...n)
      })
    })
    return () => {
      cancelled = true
      ctx.revert()
      splits.forEach((sp) => sp.revert())
    }
  }, [select, role])

  const tile = (size: string, i: number) => (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      onClick={() => {
        scrollToTestimonial(wrap.current)
        select()
      }}
      aria-label={`Show testimonial from ${testimonial.name}`}
      className={`relative box-border flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-solid p-3 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 lg:p-4 ${size}`}
      style={{ color: active ? SLATE : '#000000', borderColor: '#000' }}
    >
      <div
        ref={(el) => {
          if (el) fills.current[i] = el
        }}
        className="absolute -z-10 h-full w-full"
        style={{ background: '#000', transform: 'translateY(100%)' }}
      />
      <div className="relative z-10 max-w-[112px] truncate text-center text-[12px] font-medium leading-[1.5]">{testimonial.tileLabel ?? testimonial.name}</div>
    </button>
  )

  return (
    <div className="pb-10 pt-8 md:pt-10">
      <div ref={wrap} data-qa="tm" className="relative scroll-mt-28 bg-white pb-16 pt-20 text-black md:pb-20">
        <div className="grid grid-cols-8 gap-2 px-3 lg:grid-cols-[repeat(12,minmax(0,150px))] lg:justify-center lg:px-6">
          <div ref={inner} data-qa="tm-inner" className="relative isolate col-span-full min-w-0">
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
                <p className="col-span-full w-1/2 whitespace-pre-line font-mono text-[12px] font-medium uppercase leading-[1.375] tracking-[-0.01em] text-white lg:w-full">
                  {testimonial.eyebrow}
                </p>
                <div className="mb-2 hidden flex-col gap-2 lg:flex">{tile('max-w-[80px] lg:max-w-[152px]', 0)}</div>
              </div>
              <div className="relative col-span-4 row-start-2 lg:col-span-7 lg:col-start-5 lg:row-start-1" role="tabpanel">
                <div className="flex h-full min-h-0 flex-col justify-between gap-16">
                  <div className="relative w-full leading-7 lg:leading-[2.75rem]">
                    {/* Unselected (index -1, before the "top 80%" enter) Scale renders the quote and name collapsed:
                        quote `overflow-hidden lg:absolute lg:inset-0`, name `absolute inset-0 overflow-hidden`, so the
                        panel grows when the testimonial is selected (measured 518 -> 772px at 1440). */}
                    <div
                      aria-hidden={!active}
                      className={active ? 'relative z-10' : 'pointer-events-none relative z-0 overflow-hidden lg:absolute lg:inset-0'}
                    >
                      <div
                        ref={quote}
                        className="max-w-none pr-2.5 text-[24px] font-normal leading-7 tracking-[-0.05em] text-white lg:text-[40px] lg:leading-[2.75rem]"
                      >
                        <span className="inline-block w-[100px] lg:w-[160px]">&nbsp;</span>
                        {testimonial.plainText ? testimonial.quote : `“${testimonial.quote}”`}
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-8 shrink-0 text-left lg:mt-0 lg:text-right">
                    <div
                      aria-hidden={!active}
                      className={active ? 'relative z-10' : 'pointer-events-none absolute inset-0 z-0 overflow-hidden'}
                    >
                      <p
                        ref={(el) => {
                          if (el) names.current[0] = el
                        }}
                        className="text-[16px] font-medium leading-[1.25] tracking-[-0.01em] text-white lg:text-[18px]"
                      >
                        {testimonial.name}
                      </p>
                    </div>
                    <div ref={chip} data-qa="tm-chip" className="inline-block overflow-hidden rounded-[4px] bg-white px-2 py-1 font-mono text-[10px] uppercase leading-[1.375]" style={{ color: SLATE }}>
                      <div className="text-nowrap">
                        <Triangle />
                        <div ref={chipText} className="inline-block text-nowrap" style={{ color: SLATE }}>
                          {/* Scale renders the chip with no title until animateToText fills it in. */}
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
