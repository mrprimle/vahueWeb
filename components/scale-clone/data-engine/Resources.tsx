'use client'

import { useEffect, useRef, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { WheelControls } from './keenWheel'
import 'keen-slider/keen-slider.min.css'
import { SectionHeader } from './StaticSections'
import s from './dataEngine.module.css'

/*
 * Resources: 4-up grid from lg (2 cols) / xl (4 cols); below lg a Keen Slider with Scale's options:
 * snap, perView 1.05, spacing 24, rubberband off; free mode from 640 (1.4), 768 (2), 1280 (2.8).
 * Plugins: WheelControls (trackpad deltaX -> ksDrag). As on Scale (chunk 0pxfxpo1hc-6g.js, module 382790):
 * keydown Tab / Shift+Tab on the overflow wrapper -> slider.next() / prev() (focus still moves);
 * focusin on the first / last slide -> moveToIdx(minIdx / maxIdx); `ready` (opacity 50 -> 100) on created,
 * false on destroyed, forced after 1s.
 */

const ASSET = '/scale-clone/data-engine'

// TODO: Vahue copy + links. Card 1 on Scale shows a third-party brand mark: placeholder tile instead.
const CARDS = [
  { tag: 'Blog', title: 'Why Do Chat Models Feel So Capable?', image: null },
  { tag: 'Guide', title: 'A Guide To Data Labelling', image: `${ASSET}/resource-02.png` },
  { tag: 'Guide', title: 'Guide: Seeing Machines', image: `${ASSET}/resource-03.png` },
  { tag: 'Guide', title: 'Guide: Training & Shipping Models', image: `${ASSET}/resource-04.png` },
]

function Card({ c, className = '' }: { c: (typeof CARDS)[number]; className?: string }) {
  return (
    <a href="#" className={`block ${className}`}>
      <div className="relative z-10 aspect-[389/243] overflow-hidden rounded-lg bg-black">
        {c.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.image} alt="" width={640} height={402} loading="lazy" className="h-full w-full rounded-lg object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
            <span className="block h-[96px] w-[96px] rounded-2xl bg-black/10" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="relative z-20 pt-6">
        <p className="text-[14px] font-medium leading-[1.71] tracking-[-0.01em] text-[#D1AAD7]">{c.tag}</p>
        <h5 className="mt-1 line-clamp-2 font-display text-[24px] leading-[1.33] tracking-[-0.01em] text-black">{c.title}</h5>
      </div>
    </a>
  )
}

export default function Resources() {
  const [ready, setReady] = useState(false)
  const wrapper = useRef<HTMLDivElement>(null)
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
    created: () => setReady(true),
    destroyed: () => setReady(false),
    dragStarted: (sl) => {
      sl.container.style.cursor = 'grabbing'
    },
    dragEnded: (sl) => {
      sl.container.style.cursor = 'grab'
    },
  }, [WheelControls])

  useEffect(() => {
    if (ready) return
    const t = setTimeout(() => setReady(true), 1000)
    return () => clearTimeout(t)
  }, [ready])

  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (slider.current && e.key === 'Tab') {
        if (e.shiftKey) slider.current.prev()
        else slider.current.next()
      }
    }
    const onFocus = (e: FocusEvent) => {
      const sl = slider.current
      if (!sl?.slides?.length || !sl.track?.details) return
      if (e.target === sl.slides[0]) sl.moveToIdx(sl.track.details.minIdx)
      if (e.target === sl.slides[sl.slides.length - 1]) sl.moveToIdx(sl.track.details.maxIdx)
    }
    el.addEventListener('keydown', onKey)
    el.addEventListener('focusin', onFocus)
    return () => {
      el.removeEventListener('keydown', onKey)
      el.removeEventListener('focusin', onFocus)
    }
  }, [slider])

  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader className="mb-10" over="Resources" title="Read More About The Engine" />
        <div className="relative z-0">
          <div className={`${s.glow} pointer-events-none absolute inset-0 -bottom-[20%] -top-[80%] select-none opacity-30`} />
          <div ref={wrapper} className="overflow-x-hidden lg:hidden">
            <div
              ref={ref}
              className={`keen-slider h-full cursor-grab !overflow-visible ${ready ? 'opacity-100' : 'opacity-50'}`}
              style={{ transition: 'opacity 0.3s ease-in-out' }}
            >
              {CARDS.map((c, i) => (
                <Card key={i} c={c} className="keen-slider__slide" />
              ))}
            </div>
          </div>
          <div className="hidden gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-4">
            {CARDS.map((c, i) => (
              <Card key={i} c={c} className="h-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
