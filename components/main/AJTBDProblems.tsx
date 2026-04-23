'use client'

import { useState } from 'react'

type Solution = {
  title: string
  description: string
}

type PainItem = {
  pain: string
  solutions: Solution[]
}

const painItems: PainItem[] = [
  {
    pain: 'Slow & Costly Development',
    solutions: [
      {
        title: 'AI Software Delivery',
        description:
          'AI delivers the most value when it is applied intentionally within the software development lifecycle (SDLC). We embed AI into selected SDLC stages or across the full process to accelerate delivery, improve cost efficiency, and catch quality or security issues early, adjusting the balance between human-led and AI-native development based on your project requirements.',
      },
      {
        title: 'Competency Reinforcement',
        description:
          'Sustainable AI adoption depends on skills evolving alongside technology. We support continuous learning through our tech academy and internal L&D, and provide tailored upskilling programs for both tech and non-tech teams when deeper capability building is needed.',
      },
    ],
  },
  {
    pain: 'Context-Blind AI',
    solutions: [
      {
        title: 'Operation-Aware Design',
        description:
          'AI systems ensure value when they are grounded in how data is produced, decisions are made, and outcomes are measured in real environments. By designing around domain context and operational realities, AI solutions remain usable, trustworthy, and effective beyond initial deployment.',
      },
      {
        title: 'Custom AI Development',
        description:
          'Tailored AI solutions are often essential when off-the-shelf models cannot accommodate specific data, constraints, or operating conditions. Time-series analytics, computer vision, NLP, RPA, and more — our team is ready to build a product aligned with your strategic business goals and industry standards.',
      },
    ],
  },
  {
    pain: 'Data Quality Issues',
    solutions: [
      {
        title: 'Data Readiness by Design',
        description:
          'Data quality is an ongoing condition shaped by sources, workflows, and governance. By addressing bias, access, and provenance early, and by working with specialized data partners where needed, data pipelines remain usable, trustworthy, and ready to support AI systems over time.',
      },
      {
        title: 'Responsible Data Solutions',
        description:
          'Reliable AI depends on data that is consistent, accessible, and fit for its intended use. We design and build data pipelines — from lightweight to enterprise-grade — that handle cleaning, labeling, and structuring with the right level of rigor.',
      },
    ],
  },
  {
    pain: 'Security, Compliance & Trust Risks',
    solutions: [
      {
        title: 'Responsible Data Practices',
        description:
          'Handling sensitive data responsibly is a prerequisite for deploying AI systems that can be trusted in real operations. With ISO 27001 certification and GDPR compliance, we apply responsible data handling, security-first frameworks, and robust access control.',
      },
      {
        title: 'Diverse & Inclusive Teams',
        description:
          'AI outcomes are shaped by the assumptions built into data, models, and design decisions. To deliver our artificial intelligence solutions, we involve experts with varied backgrounds and perspectives to help debias and broaden your space for innovation.',
      },
    ],
  },
]

const whyUs = [
  {
    title: 'AI Maturity Assessment Framework',
    body: 'To assess your readiness across technology, data, and people, creating a hyper-personalized roadmap.',
  },
  {
    title: 'Outcome-Focused Delivery',
    body: 'We wire agents into real tools, APIs, apps, and data, and measure task completion. Iterative releases improve accuracy, latency, and cost, turning pilots into stable, production-ready operations.',
  },
  {
    title: 'Secure by Design',
    body: "Security isn't an add-on. We build with enhanced governance, compliance, and control baked in from Day One, meeting SOC2, GDPR, and HIPAA standards.",
  },
]

export default function AJTBDProblems() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = painItems[activeIndex]

  return (
    <section id="problems" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="max-w-wide mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-display font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
            Struggling to extract real ROI
            <br />
            <span className="text-white/55">from the AI race?</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">
            We turn fragmented AI tools into structured workflows,
            data-connected automations, and agentic systems that cut costs and
            increase speed and output.
          </p>
        </div>

        {/* Interactive layout: Left pain list + Right solution detail */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] rounded-3xl border border-border-soft bg-surface overflow-hidden">
          {/* Left: Sounds familiar? */}
          <div className="bg-white/[0.03] border-b lg:border-b-0 lg:border-r border-border-soft p-7 md:p-8">
            <p className="eyebrow mb-6">Sounds familiar?</p>
            <div className="flex flex-col gap-1">
              {painItems.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={item.pain}
                    onClick={() => setActiveIndex(index)}
                    className={`group text-left py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      isActive
                        ? 'bg-white/[0.06] text-white'
                        : 'text-white/80 hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    <span
                      className="w-5 h-5 flex-shrink-0 flex items-center justify-start"
                      aria-hidden
                    >
                      <svg
                        className={`w-5 h-5 transition-all duration-200 ${
                          isActive
                            ? 'text-[#b99dff] translate-x-1'
                            : 'text-white/40 group-hover:text-[#b99dff]/70 group-hover:translate-x-0.5'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                    <span className="text-base font-semibold">{item.pain}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Solution detail */}
          <div className="p-8 md:p-10 lg:p-12">
            <p className="eyebrow mb-8">Our Solution</p>
            <div className="space-y-8">
              {active.solutions.map((solution) => (
                <div key={solution.title}>
                  <h4 className="text-xl md:text-2xl font-semibold text-white mb-3 leading-tight">
                    {solution.title}
                  </h4>
                  <p className="text-[15px] md:text-base text-white/75 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why us contrast panel */}
        <div className="relative mt-12 md:mt-16 rounded-3xl border border-border-mid overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-80"
            style={{
              background:
                'radial-gradient(120% 80% at 50% 0%, rgba(3,137,244,0.10) 0%, rgba(132,52,233,0.08) 40%, transparent 75%)',
            }}
          />
          <div className="relative p-8 md:p-12 bg-surface">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="eyebrow mb-3">Why us?</p>
                <h3 className="text-display font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                  Assessment. Delivery. Security.
                  <br />
                  <span className="text-white/55">
                    Built for outcomes, from Day One.
                  </span>
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {whyUs.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-2xl bg-white/[0.03] border border-border-soft p-6"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {s.title}
                  </h4>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
