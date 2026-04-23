'use client'

import { useState } from 'react'

const items = [
  {
    q: 'Is this for beginners or experienced?',
    a: 'For anyone who wants to create AI products. Beginners will learn the Vahue Method from scratch. Experienced operators will accelerate their work and stay current with the industry. If you\'re a beginner, the “Founder” plan also unlocks recordings of Vahue\'s flagship AI Transformation course so you can level up fast.',
  },
  {
    q: 'Do you need to know how to program?',
    a: 'No. Vahue Pilot works without coding. Modern tools and the Vahue Method let you go from idea to working product without deep technical knowledge.',
  },
  {
    q: 'How is this different from a one-off course or workshop?',
    a: 'A course teaches the methodology in depth (one-time training). The community gives you tools, cases, and an ongoing environment (subscription). Both are possible — and Founder-tier members get a discount on the course as well.',
  },
  {
    q: "What if I can't participate in the events?",
    a: 'All events are recorded. Watch whenever it\'s convenient.',
  },
  {
    q: 'Is there offline?',
    a: 'Yes — we run regular meetups in London, and we organize meetings in other cities at the request of participants.',
  },
]

export default function IncubatorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16">
          <div>
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] text-white">
              Frequently asked{' '}
              <span className="text-white/55">questions</span>
            </h2>
          </div>

          <div className="divide-y divide-border-soft border-y border-border-soft">
            {items.map((item, index) => {
              const open = openIndex === index
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="w-full flex items-center justify-between gap-6 py-5 md:py-6 text-left group"
                  >
                    <span className="text-base md:text-lg font-medium text-white pr-2 group-hover:text-white/80 transition-colors">
                      {item.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full border border-border-mid flex items-center justify-center transition-transform ${
                        open ? 'rotate-45' : ''
                      }`}
                    >
                      <svg
                        className="w-4 h-4 text-white/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      open ? 'max-h-[500px] pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="text-white/65 text-sm md:text-[15px] leading-relaxed pr-12">
                      {item.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
