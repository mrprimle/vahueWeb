'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import AwardsSlider from '@/components/engineering/AwardsSlider'
import Press from '@/components/engineering/Press'
import Testimonials from '@/components/engineering/Testimonials'
import BlogSection from '@/components/engineering/BlogSection'
import CaseStudies from '@/components/CaseStudies'
import FounderAndTeam from '@/components/main/FounderAndTeam'
import ClientsStrip from '@/components/main/ClientsStrip'
import ContactDynamic from '@/components/main/ContactDynamic'
import type { SegmentContent } from './types'

export default function SegmentLanding({ content }: { content: SegmentContent }) {
  return (
    <>
      <SegmentHero content={content} />
      <ClientsStrip />
      <SegmentCoreJob content={content} />
      <SegmentAhas content={content} />
      <SegmentValues content={content} />
      <AwardsSlider />
      <SegmentSelfRecognition content={content} />
      <SegmentHowWeDeliver content={content} />
      <Press />
      <SegmentPointB content={content} />
      <SegmentBarriers content={content} />
      <SegmentCompetitors content={content} />
      <CaseStudies />
      <FounderAndTeam />
      <Testimonials />
      <BlogSection />
      <ContactDynamic />
    </>
  )
}

/* =========================
   1. Hero — oneliner
   ========================= */
function SegmentHero({ content }: { content: SegmentContent }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <section className="relative min-h-[85vh] flex flex-col bg-bg overflow-hidden">
      <div className="absolute inset-0 hero-texture opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-wide mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-16">
          <div className="max-w-3xl xl:max-w-4xl">
            <h1
              className={`font-display text-[2.7rem] font-light leading-none md:leading-tight xl:leading-[80px] lg:text-6xl xl:text-7xl -tracking-[0.01em] max-w-2xl xl:max-w-4xl text-balance text-white transition-all duration-700 ${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: mounted ? '100ms' : '0ms' }}
            >
              {content.title}
            </h1>

            <p
              className={`text-white/70 text-lg md:text-xl leading-relaxed mt-6 mb-8 max-w-2xl transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: mounted ? '220ms' : '0ms' }}
            >
              {content.oneLiner}
            </p>

            <p
              className={`text-white/55 text-base leading-relaxed mb-8 max-w-2xl transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: mounted ? '320ms' : '0ms' }}
            >
              {content.heroIntro}
            </p>

            <div
              className={`flex flex-wrap items-center gap-3 transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: mounted ? '420ms' : '0ms' }}
            >
              <Link
                href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-bg font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors"
              >
                {content.coreJob.ctaLabel}
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </Link>
              <a
                href="#how"
                className="btn-outline text-sm uppercase tracking-wider px-6 py-3.5"
              >
                See how we deliver
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================
   2. Core job + feature list + CTA
   ========================= */
function SegmentCoreJob({ content }: { content: SegmentContent }) {
  return (
    <section id="core-job" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="max-w-wide mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16">
          <div>
            <p className="eyebrow mb-4">The mandate</p>
            <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-6">
              {content.coreJob.title}
            </h2>
            <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-xl">
              {content.coreJob.body}
            </p>
          </div>
          <div className="rounded-3xl border border-border-soft bg-surface p-7 md:p-8">
            <p className="eyebrow mb-5">What you get</p>
            <ul className="flex flex-col gap-3">
              {content.coreJob.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm md:text-base text-white/85"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/45 flex-shrink-0" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 btn-outline text-xs uppercase tracking-widest font-mono"
            >
              {content.coreJob.ctaLabel}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================
   3. Why it works (2-3 cards)
   ========================= */
function SegmentAhas({ content }: { content: SegmentContent }) {
  return (
    <section id="aha" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="max-w-wide mx-auto px-6 md:px-8">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow mb-4">Why it works</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05]">
            Why this approach <span className="text-white/55">wins.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {content.ahas.map((a, i) => (
            <div
              key={a.title}
              className="rounded-3xl border border-border-soft bg-surface p-7 md:p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-4">
                {String(i + 1).padStart(2, '0')} · Principle
              </p>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 leading-tight">
                {a.title}
              </h3>
              <p className="text-sm md:text-[15px] text-white/65 leading-relaxed">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================
   4. Outcomes (metric strip)
   ========================= */
function SegmentValues({ content }: { content: SegmentContent }) {
  return (
    <section className="relative py-14 md:py-20">
      <div className="max-w-wide mx-auto px-6 md:px-8">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Outcomes</p>
          <h2 className="text-display font-display text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            The outcomes we commit to.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {content.values.map((v) => (
            <div
              key={v.label}
              className="border-l border-border-mid pl-5"
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight leading-none mb-2 text-white">
                {v.metric}
              </p>
              <p className="text-xs md:text-sm text-white/55 font-mono uppercase tracking-widest">
                {v.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================
   5. Pain points (3 columns: what's happening / how it feels / where it hurts)
   ========================= */
function SegmentSelfRecognition({ content }: { content: SegmentContent }) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-wide mx-auto px-6 md:px-8">
        <div className="mb-12 md:mb-14 max-w-2xl">
          <p className="eyebrow mb-4">Pain points</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05]">
            Do you recognize <span className="text-white/55">your team?</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <RecognitionColumn label="What's happening" items={content.triggers} />
          <RecognitionColumn label="How it feels" items={content.emotions} />
          <RecognitionColumn label="Where it hurts" items={content.pains} />
        </div>
      </div>
    </section>
  )
}

function RecognitionColumn({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-border-soft bg-surface p-7 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-widest text-white/50 mb-6">
        {label}
      </p>
      <ul className="flex flex-col gap-4">
        {items.map((i) => (
          <li
            key={i}
            className="text-[15px] text-white/85 leading-relaxed border-l border-white/10 pl-4"
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* =========================
   6. What we ship — workstreams → value
   ========================= */
function SegmentHowWeDeliver({ content }: { content: SegmentContent }) {
  return (
    <section id="how" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="max-w-wide mx-auto px-6 md:px-8">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow mb-4">What we ship</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05]">
            Workstreams, real artifacts, measurable outcomes.
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg max-w-xl">
            Every engagement decomposes into clear workstreams you can ship
            and measure. Here&apos;s the playbook for this segment.
          </p>
        </div>

        <div className="rounded-3xl border border-border-mid overflow-hidden">
          <div className="grid grid-cols-12 px-6 md:px-8 py-4 bg-white/[0.03] border-b border-border-mid font-mono text-[11px] uppercase tracking-widest text-white/50">
            <div className="col-span-12 md:col-span-3">Workstream</div>
            <div className="hidden md:block md:col-span-4">What it does</div>
            <div className="hidden md:block md:col-span-3">Deliverables</div>
            <div className="hidden md:block md:col-span-2">Outcome</div>
          </div>
          <div className="divide-y divide-border-soft">
            {content.microJobs.map((mj, idx) => (
              <div
                key={mj.key}
                className="grid grid-cols-12 px-6 md:px-8 py-6 gap-4 items-start hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-12 md:col-span-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-1">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <p className="text-white font-semibold text-base">
                    {mj.title}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 text-sm text-white/70 leading-relaxed">
                  {mj.oneLiner}
                </div>
                <div className="col-span-12 md:col-span-3">
                  <ul className="flex flex-col gap-1.5">
                    {mj.deliverables.map((d) => (
                      <li
                        key={d}
                        className="text-xs text-white/60 flex items-start gap-2"
                      >
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-12 md:col-span-2 text-sm font-semibold text-white">
                  {mj.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================
   7. After-state — emotions + snapshot + what becomes possible
   ========================= */
function SegmentPointB({ content }: { content: SegmentContent }) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-wide mx-auto px-6 md:px-8">
        <div className="relative rounded-3xl border border-border-mid overflow-hidden">
          <div className="relative bg-surface p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            <div>
              <p className="eyebrow mb-4">After-state</p>
              <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-5">
                What changes <span className="text-white/55">on the other side.</span>
              </h2>
              <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8">
                {content.pointB.snapshot}
              </p>
              <p className="eyebrow mb-3">How it feels</p>
              <div className="flex flex-wrap gap-2">
                {content.pointB.emotions.map((e) => (
                  <span
                    key={e}
                    className="inline-flex items-center px-3 py-1 rounded-full border border-border-soft bg-white/[0.03] text-xs text-white/80"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-5">What becomes possible</p>
              <ul className="flex flex-col gap-4">
                {content.pointB.bigJobs.map((j, i) => (
                  <li
                    key={j}
                    className="flex items-start gap-4 rounded-2xl border border-border-soft bg-white/[0.03] p-5"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/40 mt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/85 text-[15px] leading-relaxed">
                      {j}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================
   8. Concerns, answered
   ========================= */
function SegmentBarriers({ content }: { content: SegmentContent }) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-wide mx-auto px-6 md:px-8">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow mb-4">Concerns, answered</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05]">
            The usual <span className="text-white/55">concerns</span> — handled.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {content.barriers.map((b, i) => (
            <div
              key={b.objection}
              className="rounded-3xl border border-border-soft bg-surface p-7 md:p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-3">
                Concern {String(i + 1).padStart(2, '0')}
              </p>
              <p className="text-lg md:text-xl font-semibold text-white mb-3 leading-snug">
                &ldquo;{b.objection}&rdquo;
              </p>
              <p className="text-sm md:text-[15px] text-white/65 leading-relaxed">
                {b.response}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================
   9. Alternatives — why us, not...
   ========================= */
function SegmentCompetitors({ content }: { content: SegmentContent }) {
  if (!content.competitors || content.competitors.length === 0) return null
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-wide mx-auto px-6 md:px-8">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <p className="eyebrow mb-4">Alternatives</p>
          <h2 className="text-display font-display text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            Why us and <span className="text-white/55">not&hellip;</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {content.competitors.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-border-soft bg-surface p-6"
            >
              <p className="text-white font-semibold mb-2">{c.name}</p>
              <p className="text-sm text-white/60 leading-relaxed">{c.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
