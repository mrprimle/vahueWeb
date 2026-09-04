'use client'

import { useState } from 'react'
import Link from 'next/link'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'

function OutcomeCardView({ outcome }: { outcome: CaseStudy }) {
  return (
    <article className="relative mb-4 flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.035] p-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(circle at 5% 0%, rgba(59,130,246,.15), transparent 40%), radial-gradient(circle at 100% 100%, rgba(139,92,246,.12), transparent 42%)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-7 flex items-start justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
            {outcome.service}
          </span>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
            Vahue case study
          </span>
        </div>

        <p className="mb-5 font-display text-3xl font-light leading-none text-white md:text-[2rem]">
          {outcome.metric}
        </p>

        <p className="flex-grow text-[15px] leading-[1.6] text-white/82">
          {outcome.summary}
        </p>

        <div className="mt-7 border-t border-white/10 pt-5">
          <p className="text-base font-semibold text-white">{outcome.client}</p>
          <p className="mt-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/45">
            {outcome.service}
          </p>

          <div className="mt-5">
            <Link
              href={`/case-studies/${outcome.slug}`}
              className="text-xs text-white/70 transition-colors hover:text-white"
            >
              View case study →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function AnimatedColumn({
  outcomes,
  speed,
}: {
  outcomes: CaseStudy[]
  speed: number
}) {
  const [isPaused, setIsPaused] = useState(false)
  const items = [...outcomes, ...outcomes]

  return (
    <div
      className="relative h-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="animate-scroll-up"
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {items.map((outcome, index) => (
          <OutcomeCardView key={`${outcome.slug}-${index}`} outcome={outcome} />
        ))}
      </div>
    </div>
  )
}

function MobileSlider({ outcomes }: { outcomes: CaseStudy[] }) {
  return (
    <div
      className="scrollbar-hide flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-6 select-none"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {outcomes.map((outcome) => (
        <div
          key={outcome.slug}
          className="flex w-[300px] flex-shrink-0 snap-start"
        >
          <OutcomeCardView outcome={outcome} />
        </div>
      ))}
    </div>
  )
}

export default function DeliveryOutcomes() {
  const column1 = caseStudies.filter((card) => card.column === 1)
  const column2 = caseStudies.filter((card) => card.column === 2)
  const column3 = caseStudies.filter((card) => card.column === 3)

  return (
    <section
      id="delivery-outcomes"
      className="relative scroll-mt-20 border-b border-border-soft py-20 md:py-28"
    >
      <div>
        <div className="mx-auto w-full max-w-wide px-6 md:px-8">
          <div className="mb-12 max-w-2xl md:mb-16">
            <h2 className="text-display font-display text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-6xl">
              Delivery outcomes.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
              Measurable results from products and AI systems delivered by Vahue.
            </p>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-24 bg-gradient-to-b from-bg to-transparent" />
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-24 bg-gradient-to-t from-bg to-transparent" />

          <div className="mx-auto w-full max-w-wide px-6 md:px-8">
            <div className="grid h-[700px] grid-cols-3 gap-6 overflow-hidden">
              <AnimatedColumn outcomes={column1} speed={48} />
              <AnimatedColumn outcomes={column2} speed={56} />
              <AnimatedColumn outcomes={column3} speed={64} />
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <MobileSlider outcomes={caseStudies} />
        </div>
      </div>
    </section>
  )
}
