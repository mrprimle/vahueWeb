'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import type { CaseStudy } from '@/lib/case-studies'
import styles from './styles.module.css'

// Template Resources carousel (Keen Slider options copied from scale.com). Cards are Vahue's
// verified cases; the image area carries the case metric instead of a cover image.
export default function CaseSlider({ cases }: { cases: CaseStudy[] }) {
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
  })

  return (
    <div className="relative z-0">
      <div aria-hidden className={`${styles.glow} pointer-events-none absolute inset-0 -bottom-[20%] -top-[80%] select-none opacity-30`} />
      <div className="overflow-x-hidden">
        <div ref={ref} className={`keen-slider !overflow-visible h-full cursor-grab transition-opacity duration-300 ease-in-out ${ready ? 'opacity-100' : 'opacity-0'}`}>
          {cases.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}/`} draggable={false} className="keen-slider__slide group block">
              <div className="relative z-10 flex aspect-[389/243] flex-col justify-between overflow-hidden rounded-lg border border-border-soft bg-surface p-6 transition-colors duration-300 ease-out group-hover:border-border-strong">
                <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-white/45">{c.service}</p>
                <p className="font-display text-[clamp(1.5rem,1rem+1.5vw,2.5rem)] font-light leading-[1.15] tracking-[-0.01em] text-white">{c.metric}</p>
              </div>
              <div className="relative z-20 pt-6">
                <p className="text-[14px] font-medium leading-[1.71] tracking-[-0.01em] text-[#D1AAD7]">{c.client}</p>
                <h3 className="mt-1 line-clamp-2 font-display text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-white">{c.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
