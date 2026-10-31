'use client'

import { useEffect, useRef, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { resources } from './content'
import { CONTAINER, SECTION, SectionHeader } from './StaticSections'
import styles from './styles.module.css'

// scale.com ResourcesSlider (chunk 30w17vppvfdah.js): Keen Slider, rubberband off,
//   base perView 1.05 / spacing 24 / snap; >=640 1.4 free; >=768 2 free; >=1280 2.8 free.
//   Track fades 50% -> 100% (0.3s ease-in-out) once created; grab / grabbing cursor;
//   Tab / Shift+Tab step slides.
export default function Resources() {
  const [ready, setReady] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: 'snap',
    rubberband: false,
    slides: { perView: 1.05, spacing: 24 },
    breakpoints: {
      '(min-width: 640px)': { mode: 'free', slides: { perView: 1.4, spacing: 24 } },
      '(min-width: 768px)': { mode: 'free', slides: { perView: 2, spacing: 24 } },
      '(min-width: 1280px)': { mode: 'free', slides: { perView: 2.8, spacing: 24 } },
    },
    dragStarted: (s) => {
      s.container.style.cursor = 'grabbing'
    },
    dragEnded: (s) => {
      s.container.style.cursor = 'grab'
    },
    created: () => setReady(true),
    destroyed: () => setReady(false),
  })

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1000)
    const el = wrap.current
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !slider.current) return
      if (e.shiftKey) slider.current.prev()
      else slider.current.next()
    }
    el?.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      el?.removeEventListener('keydown', onKey)
    }
  }, [slider])

  return (
    <section className={SECTION}>
      <div className="relative">
        <div className={CONTAINER}>
          <SectionHeader eyebrow={resources.eyebrow} title={resources.title} />
        </div>
        <div className="relative z-0 pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {/* Scale's white radial wash (opacity 30) sits here; it is invisible on a white page and is omitted. */}
          <div ref={wrap} className="overflow-x-hidden">
            <div
              ref={sliderRef}
              className={`keen-slider ${styles.keen} h-full cursor-grab ${ready ? 'opacity-100' : 'opacity-50'}`}
              style={{ visibility: 'visible', transition: 'opacity 0.3s ease-in-out' }}
            >
              {resources.items.map((r) => (
                <a key={r.title} href="#" className="keen-slider__slide block">
                  {/* TODO: Vahue resource image (source thumbnails carry Scale and partner marks) */}
                  <div className="relative z-10 aspect-[389/243] overflow-hidden rounded-lg bg-black" />
                  <div className="relative z-20 pt-6">
                    {/* TODO: Vahue copy */}
                    <p className="text-[14px] font-medium leading-[1.71] tracking-[-0.01em] text-[#D1AAD7]">{r.tag}</p>
                    <h5 className="mt-1 line-clamp-2 text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-black">{r.title}</h5>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
