'use client'

import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Reveal from '@/components/motion/Reveal'
import { caseStudies } from '@/lib/case-studies'

// Draggable case-study strip. Slides run past the container edge (overflow visible) so
// the next card is always half in view; drag or swipe, with free-snap momentum.
export default function CaseStrip() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    mode: 'free-snap',
    rubberband: true,
    slides: { perView: 'auto', spacing: 8 },
  })

  return (
    <section className="overflow-x-clip py-24 max-md:py-12">
      <div className="mx-auto max-w-shell px-6">
        <div className="grid grid-cols-12 gap-2 pb-12 max-md:pb-8">
          <p className="col-span-12 font-mono text-[11px] uppercase tracking-[0.05em] text-white/55 md:col-span-3">
            Delivery outcomes
          </p>
          <Reveal as="h2" className="col-span-12 font-display text-section font-light text-white md:col-span-7">
            Measured in production, not in pilots.
          </Reveal>
          <div className="col-span-12 flex items-end justify-end gap-2 max-md:hidden md:col-span-2">
            {(['prev', 'next'] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                aria-label={dir === 'prev' ? 'Previous case study' : 'Next case study'}
                onClick={() => (dir === 'prev' ? slider.current?.prev() : slider.current?.next())}
                className="flex size-10 items-center justify-center rounded-lg border border-border-mid text-white transition-[background-color,transform] duration-300 ease-out hover:bg-white/[0.06] active:scale-95"
              >
                <svg className={`size-4 ${dir === 'prev' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div ref={sliderRef} className="keen-slider !overflow-visible cursor-grab active:cursor-grabbing">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              draggable={false}
              className="keen-slider__slide group flex !min-w-[340px] !max-w-[340px] flex-col justify-between rounded-2xl border border-border-soft bg-surface p-6 transition-colors duration-300 ease-out hover:border-border-strong max-md:!min-w-[280px] max-md:!max-w-[280px]"
              style={{ minHeight: 372 }}
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-white/45">{c.service}</p>
                <p className="mt-8 font-display text-lead font-light text-white">{c.metric}</p>
              </div>
              <div>
                <p className="text-card font-medium text-white">{c.title}</p>
                <p className="mt-3 text-sm leading-normal text-white/55">{c.client}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
