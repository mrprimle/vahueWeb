'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { WheelControls } from '@/components/scale-clone/data-engine/keenWheel'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import { SectionHeader } from './StaticSections'
import s from './hub.module.css'

/*
 * Results: verified Vahue cases (lib/case-studies.ts). Clone: Resources block (Resources.tsx).
 * 4-up grid from lg (2 cols) / xl (4 cols); below lg a Keen Slider with Scale's options:
 * snap, perView 1.05, spacing 24, rubberband off; free mode from 640 (1.4), 768 (2), 1280 (2.8).
 * The black image tile carries the case metric instead of a thumbnail; tag + 2-line title as on the clone.
 */

const SLUGS = ['rfi-response-automation', 'exaware-governed-noc-agents', 'docplanner-voicebot-recovery', 'piogroup-employee-assistant']
const CARDS = SLUGS.map((slug) => caseStudies.find((c) => c.slug === slug)).filter((c): c is CaseStudy => Boolean(c))

function Card({ c, className = '' }: { c: CaseStudy; className?: string }) {
  return (
    <Link href={`/case-studies/${c.slug}/`} className={`group block ${className}`}>
      <div className="relative z-10 flex aspect-[389/243] flex-col justify-between overflow-hidden rounded-lg bg-black p-6">
        <p className={`${s.detailMono} font-mono text-white/60`}>{c.client}</p>
        <p className="font-display text-[40px] font-normal leading-[1.05] tracking-[-0.01em] text-white">{c.metric}</p>
      </div>
      <div className="relative z-20 pt-6">
        <p className="text-[14px] font-medium leading-[1.71] tracking-[-0.01em] text-[#D1AAD7]">Case Study</p>
        <h3 className="mt-1 line-clamp-2 font-display text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-black">{c.title}</h3>
      </div>
    </Link>
  )
}

export default function Results() {
  const [ready, setReady] = useState(false)
  const [ref] = useKeenSlider<HTMLDivElement>({
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
    dragStarted: (sl) => {
      sl.container.style.cursor = 'grabbing'
    },
    dragEnded: (sl) => {
      sl.container.style.cursor = 'grab'
    },
  }, [WheelControls])

  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader className="mb-10" over="Results" title="Read More About Our Results" />
        <div className="relative z-0">
          <div className={`${s.glow} pointer-events-none absolute inset-0 -bottom-[20%] -top-[80%] select-none opacity-30`} />
          <div className="overflow-x-hidden lg:hidden">
            <div
              ref={ref}
              className={`keen-slider h-full cursor-grab !overflow-visible ${ready ? 'opacity-100' : 'opacity-50'}`}
              style={{ transition: 'opacity 0.3s ease-in-out' }}
            >
              {CARDS.map((c) => (
                <Card key={c.slug} c={c} className="keen-slider__slide" />
              ))}
            </div>
          </div>
          <div className="hidden gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-4">
            {CARDS.map((c) => (
              <Card key={c.slug} c={c} className="h-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
