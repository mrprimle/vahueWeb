'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col bg-dark overflow-hidden">
      {/* Background texture / pattern */}
      <div className="absolute inset-0 hero-texture opacity-40" />

      {/* Subtle diagonal light streak */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, transparent 30%, rgba(59, 94, 255, 0.06) 50%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Big headline */}
            <div>
              <h1
                className={`text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold text-white leading-[1.05] tracking-tight ${
                  mounted
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transition:
                    'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: mounted ? '100ms' : '0ms',
                }}
              >
                Helping people and teams use AI mindfully
              </h1>
            </div>

            {/* Right: Description + links */}
            <div
              className={`${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition:
                  'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '300ms' : '0ms',
              }}
            >
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10">
                In three years, AI literacy will be as essential as reading or
                using a computer. You can start making that shift today.
              </p>

              {/* CTA Links */}
              <div className="flex flex-col gap-0">
                <Link
                  href="/teams"
                  className="group flex items-center justify-between py-5 border-t border-white/15 transition-colors hover:border-white/30"
                >
                  <span className="text-sm md:text-base font-mono uppercase tracking-widest text-white">
                    Team Training
                  </span>
                  <svg
                    className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 7l-10 10M17 7H7m10 0v10"
                    />
                  </svg>
                </Link>
                <Link
                  href="/automations"
                  className="group flex items-center justify-between py-5 border-t border-b border-white/15 transition-colors hover:border-white/30"
                >
                  <span className="text-sm md:text-base font-mono uppercase tracking-widest text-white">
                    Custom AI Automations
                  </span>
                  <svg
                    className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 7l-10 10M17 7H7m10 0v10"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By */}
      <div className="relative z-10 pb-16 md:pb-20">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <p
            className={`text-white/40 text-sm mb-6 ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{
              transition:
                'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: mounted ? '500ms' : '0ms',
            }}
          >
            Trusted by
          </p>
          <div
            className={`flex flex-wrap items-center gap-8 md:gap-12 ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{
              transition:
                'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: mounted ? '600ms' : '0ms',
            }}
          >
            {/* Placeholder company logos - white text style */}
            {['epic growth', 'HAOM', 'SMSTRETCHING'].map(
              (company) => (
                <span
                  key={company}
                  className="text-white/50 text-lg md:text-xl font-bold tracking-wide"
                  style={{
                    fontStyle:
                      company === 'SMSTRETCHING'
                        ? 'italic'
                        : 'normal',
                  }}
                >
                  {company}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
