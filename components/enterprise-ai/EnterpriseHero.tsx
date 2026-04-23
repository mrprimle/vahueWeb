'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DISCOVERY_CALL_URL } from '@/lib/links'

export default function EnterpriseHero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="relative bg-bg overflow-hidden">
      <div className="absolute inset-0 hero-texture opacity-50" />

      <div className="relative z-10 w-full max-w-wide mx-auto px-6 md:px-8 pt-24 md:pt-36 pb-24 md:pb-36">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`flex justify-center mb-8 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{
              transition: 'opacity 700ms ease, transform 700ms ease',
            }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-border-mid bg-white/[0.04] backdrop-blur-md">
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/80">
                Vahue&rsquo;s AI Platform &amp; Methodology
              </span>
            </span>
          </div>

          <h1
            className={`font-display text-[2.7rem] font-light leading-none md:leading-tight xl:leading-[80px] lg:text-6xl xl:text-7xl -tracking-[0.01em] text-balance text-white ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition:
                'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: mounted ? '120ms' : '0ms',
            }}
          >
            The AI core of{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Vahue&rsquo;s digital DNA
            </span>
          </h1>

          <p
            className={`mt-6 md:mt-8 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              transition: 'opacity 800ms ease, transform 800ms ease',
              transitionDelay: mounted ? '240ms' : '0ms',
            }}
          >
            Vahue AI Hub is our enterprise platform — pre-configured, secure,
            and fully customized agents that turn complex business challenges
            into production-ready AI solutions.
          </p>

          <div
            className={`mt-10 flex flex-wrap items-center justify-center gap-3 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              transition: 'opacity 800ms ease, transform 800ms ease',
              transitionDelay: mounted ? '360ms' : '0ms',
            }}
          >
            <Link
              href={DISCOVERY_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 md:gap-3 bg-white text-bg font-medium text-[11px] md:text-sm uppercase tracking-wider px-4 py-2.5 md:px-6 md:py-3.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Discover Your Next AI Breakthrough
              <svg
                className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />
    </section>
  )
}
