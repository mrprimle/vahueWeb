'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { WheelControls } from '../public-sector-data-engine/keenWheel'
import eps from '../evaluation-public-sector/eps.module.css'
import type { PublicSectorContent } from './content'
import { SectionHeader } from './Sections'
import s from './ps.module.css'

// scale.com ResourcesSlider (module 382790, now in chunk 3t7eetekne0nm.js sha256 55e032ae…; same code as the copy in
// 30w17vppvfdah.js read on public-sector-data-engine): Keen Slider initial 0, rubberband off, base perView 1.05 /
// spacing 24 / snap; >=640 1.4 free; >=768 2 free; >=1280 2.8 free. Plugin = WheelControls (module 29713, non-passive
// wheel on .keen-slider, REA ev_9c00205a…). Track opacity 50% -> 100% (0.3s ease-in-out) once created (1s fallback);
// cursor grab / grabbing; keydown Tab / Shift+Tab -> next() / prev() and focusin on the first / last slide ->
// moveToIdx(minIdx / maxIdx) on the overflow wrapper (REA ev_1ab0bdfc…).
export default function Resources({ content }: { content: PublicSectorContent['resources'] }) {
  const [ready, setReady] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: 'snap',
      rubberband: false,
      slides: { perView: 1.05, spacing: 24 },
      breakpoints: {
        '(min-width: 640px)': { mode: 'free', slides: { perView: 1.4, spacing: 24 } },
        '(min-width: 768px)': { mode: 'free', slides: { perView: 2, spacing: 24 } },
        '(min-width: 1280px)': { mode: 'free', slides: { perView: 2.8, spacing: 24 } },
      },
      dragStarted: (k) => {
        k.container.style.cursor = 'grabbing'
      },
      dragEnded: (k) => {
        k.container.style.cursor = 'grab'
      },
      created: () => setReady(true),
      destroyed: () => setReady(false),
    },
    [WheelControls],
  )

  useEffect(() => {
    if (ready) return
    const t = window.setTimeout(() => setReady(true), 1000)
    return () => window.clearTimeout(t)
  }, [ready])

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (!slider.current || e.key !== 'Tab') return
      if (e.shiftKey) slider.current.prev()
      else slider.current.next()
    }
    const onFocus = (e: FocusEvent) => {
      const k = slider.current
      if (!k?.slides?.length || !k.track?.details) return
      if (e.target === k.slides[0]) k.moveToIdx(k.track.details.minIdx)
      if (e.target === k.slides[k.slides.length - 1]) k.moveToIdx(k.track.details.maxIdx)
    }
    el.addEventListener('keydown', onKey)
    el.addEventListener('focusin', onFocus)
    return () => {
      el.removeEventListener('keydown', onKey)
      el.removeEventListener('focusin', onFocus)
    }
  }, [slider])

  return (
    <section className="bg-transparent py-12">
      <div className="relative">
        <div className={eps.container}>
          <SectionHeader eyebrow={content.eyebrow} title={content.title} mb="mb-10" />
        </div>
        <div className="relative z-0 pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {/* `_5fl2pa_background-white` (-top-[80%] -bottom-[20%], opacity 30): white radial wash, invisible on white. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -bottom-[20%] -top-[80%] select-none opacity-30" />
          <div ref={wrap} data-qa="res-wrap" className="overflow-x-hidden">
            <div
              ref={sliderRef}
              className={`keen-slider ${s.keen} h-full cursor-grab ${ready ? 'opacity-100' : 'opacity-50'}`}
              style={{ visibility: 'visible', transition: 'opacity 0.3s ease-in-out' }}
            >
              {content.items.map((r) => (
                <Link key={r.title} href={r.href} className="keen-slider__slide block">
                  <div className="relative z-10 aspect-[389/243] overflow-hidden rounded-lg bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.image} alt={r.title} width={640} height={402} loading="lazy" className="h-full w-full rounded-lg object-cover" />
                  </div>
                  <div className="relative z-20 pt-6">
                    <p className="text-[14px] font-medium leading-[1.71] text-[var(--ps-tag)]">{r.tag}</p>
                    <h5 className="mt-1 line-clamp-2 text-[24px] font-normal leading-[1.33] text-[var(--ps-fg)]">{r.title}</h5>
                    <p className="line-clamp-5 leading-[1.5] text-zinc-400 lg:mt-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
