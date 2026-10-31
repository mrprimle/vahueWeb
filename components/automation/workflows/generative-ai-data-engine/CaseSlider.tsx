'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import { WheelControls } from './keenWheel'
import 'keen-slider/keen-slider.min.css'
import type { CaseStudy } from '@/lib/case-studies'
import styles from './styles.module.css'

// Template Resources carousel (scale.com chunk 30w17vppvfdah.js, module 382790; Keen Slider options copied).
// Cards are Vahue's verified cases; the black image area carries the case metric instead of a cover image.
//  - track at opacity 0.5 until Keen is created (or a 1s fallback), then 1 (opacity 0.3s ease-in-out)
//  - keydown Tab on the wrapper: next slide (Shift+Tab: previous); focusin on the first/last card moves the
//    track to its min/max index
export default function CaseSlider({ cases }: { cases: CaseStudy[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: 'snap',
    rubberband: false,
    slides: { perView: 1.05, spacing: 24 },
    breakpoints: {
      '(min-width: 640px)': { mode: 'free', slides: { perView: 1.4, spacing: 24 } },
      '(min-width: 768px)': { mode: 'free', slides: { perView: 2, spacing: 24 } },
      '(min-width: 1280px)': { mode: 'free', slides: { perView: 2.8, spacing: 24 } },
    },
    dragStarted: () => {
      if (slider.current) slider.current.container.style.cursor = 'grabbing'
    },
    dragEnded: () => {
      if (slider.current) slider.current.container.style.cursor = 'grab'
    },
    created: () => setReady(true),
    destroyed: () => setReady(false),
  }, [WheelControls])

  useEffect(() => {
    if (!cases.length || ready) return
    const t = setTimeout(() => setReady(true), 1000)
    return () => clearTimeout(t)
  }, [cases.length, ready])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || !slider.current) return
    const onKey = (e: KeyboardEvent) => {
      if (!slider.current || e.key !== 'Tab') return
      if (e.shiftKey) slider.current.prev()
      else slider.current.next()
    }
    const onFocus = (e: FocusEvent) => {
      const s = slider.current
      if (!s?.slides?.length || !s.track?.details) return
      if (e.target === s.slides[0]) s.moveToIdx(s.track.details.minIdx)
      if (e.target === s.slides[s.slides.length - 1]) s.moveToIdx(s.track.details.maxIdx)
    }
    el.addEventListener('keydown', onKey)
    el.addEventListener('focusin', onFocus)
    return () => {
      el.removeEventListener('keydown', onKey)
      el.removeEventListener('focusin', onFocus)
    }
  }, [cases.length, slider])

  return (
    <div className="relative z-0">
      <div aria-hidden className={`${styles.glow} pointer-events-none absolute inset-0 -bottom-[20%] -top-[80%] select-none opacity-30`} />
      <div ref={wrapRef} className="overflow-x-hidden">
        <div
          ref={ref}
          className={`keen-slider !overflow-visible h-full cursor-grab ${ready ? 'opacity-100' : 'opacity-50'}`}
          style={{ visibility: 'visible', transition: 'opacity 0.3s ease-in-out' }}
        >
          {cases.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}/`} draggable={false} className="keen-slider__slide group block">
              <div className="relative z-10 flex aspect-[389/243] flex-col justify-between overflow-hidden rounded-lg bg-black p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-white/60">{c.client}</p>
                <p className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.01em] text-white">{c.metric}</p>
              </div>
              <div className="relative z-20 pt-6">
                <p className="text-[14px] font-medium leading-[1.71] tracking-[-0.01em] text-[#D1AAD7]">Case Study</p>
                <h3 className="mt-1 line-clamp-2 font-display text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-black">Client Story: {c.client}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
