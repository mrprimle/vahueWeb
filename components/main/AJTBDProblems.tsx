'use client'

import { useState } from 'react'
import Link from 'next/link'
import { POSITIONING, WORKFLOWS } from '@/lib/automation-content'

export default function AJTBDProblems() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = WORKFLOWS[activeIndex]

  return (
    <section id="workflows" className="relative py-12 md:py-24 scroll-mt-20">
      <div className="max-w-shell mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-display text-section font-light">
            Six workflows,
            <br />
            <span className="text-white/55">run by agents.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">
            {POSITIONING.forWho}
          </p>
        </div>

        {/* Interactive layout: Left workflow list + Right workflow detail */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] rounded-3xl border border-border-soft bg-surface overflow-hidden">
          {/* Left: workflows */}
          <div className="bg-white/[0.03] border-b lg:border-b-0 lg:border-r border-border-soft p-7 md:p-8">
            <p className="eyebrow mb-6">Workflows</p>
            <div className="flex flex-col gap-1">
              {WORKFLOWS.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={item.slug}
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
                    <span className="text-base font-semibold">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: workflow detail */}
          <div className="p-8 md:p-10 lg:p-12">
            <p className="eyebrow mb-8">{active.label}</p>
            <div className="space-y-8">
              <div>
                <h4 className="text-xl md:text-2xl font-semibold text-white mb-3 leading-tight">
                  {active.headline}
                </h4>
                <p className="text-[15px] md:text-base text-white/75 leading-relaxed">
                  {active.summary}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { title: 'Before', items: active.before },
                  { title: 'After', items: active.after },
                ].map((col) => (
                  <div key={col.title}>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-3">
                      {col.title}
                    </p>
                    <ul className="space-y-2">
                      {col.items.map((line) => (
                        <li key={line} className="text-[15px] text-white/75 leading-relaxed">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link
                href={`/automations/${active.slug}`}
                className="group/link inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/70 transition-colors hover:text-white"
              >
                <span>See {active.label.toLowerCase()}</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
