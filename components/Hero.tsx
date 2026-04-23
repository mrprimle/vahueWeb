'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DISCOVERY_CALL_URL } from '@/lib/links'

const pillars = [
  {
    label: 'Talent',
    description: 'extend your team with Vahue\'s AI-Native engineers to ship 10x faster',
  },
  {
    label: 'Training',
    description: 'supercharge your team with domain-specific workshops to use AI mindfully',
  },
  {
    label: 'Systems',
    description: 'Deploy reliable agents that learn your unique enterprise data, tools, and skills',
  },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative flex flex-col bg-bg overflow-hidden">
      {/* Subtle dot texture */}
      <div className="absolute inset-0 hero-texture opacity-60" />

      {/* Bottom fade to seamless blend */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

      <div className="relative z-10">
        <div className="w-full max-w-wide mx-auto px-6 md:px-8 pt-10 md:pt-24 pb-20 md:pb-28">
          <div className="max-w-3xl">
            {/* Mobile-only notification pill (replaces announcement bar) */}
            <div
              className={`md:hidden flex justify-center mb-6 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transition:
                  'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '60ms' : '0ms',
              }}
            >
              <Link
                href="/events"
                className="group/pill inline-flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-white/85 text-xs font-medium hover:bg-white/[0.09] hover:border-white/15 transition-colors"
              >
                <span>
                  Vahue Momentum
                  <span className="text-white/40 mx-1.5">|</span>
                  SF 2026
                </span>
                <svg
                  className="w-3.5 h-3.5 text-white/70 transition-transform duration-200 group-hover/pill:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.25}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <h1
              className={`font-display text-[2.7rem] font-light leading-none md:leading-tight xl:leading-[80px] lg:text-6xl xl:text-7xl -tracking-[0.01em] max-w-2xl xl:max-w-4xl text-balance text-left text-white ${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transition:
                  'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '120ms' : '0ms',
              }}
            >
              <span className="text-[#BBDEF2]">Accelerate</span> your{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AI
              </span>{' '}
              Transformation
            </h1>

            <p
              className={`text-white/70 text-lg md:text-xl leading-relaxed mt-6 mb-8 max-w-2xl ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition:
                  'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '260ms' : '0ms',
              }}
            >
              with AI-Native team extensions, hands-on trainings, and enterprise-ready AI systems for startups and Fortune 500 companies.
            </p>

            <div
              className={`flex flex-col gap-2.5 mb-8 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition:
                  'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '400ms' : '0ms',
              }}
            >
              {pillars.map((pillar) => (
                <p
                  key={pillar.label}
                  className="text-white/85 text-sm md:text-base"
                >
                  <span className="font-semibold text-white">
                    {pillar.label}
                  </span>
                  <span className="text-white/55"> — </span>
                  <span className="text-white/75">{pillar.description}</span>
                </p>
              ))}
            </div>

            <p
              className={`eyebrow mb-7 text-white/70 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition:
                  'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '500ms' : '0ms',
              }}
            >
              Everything you need so you&apos;re not left alone in the AI
              transition
            </p>

            <div
              className={`flex flex-wrap items-center gap-3 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition:
                  'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '580ms' : '0ms',
              }}
            >
              <Link
                href={DISCOVERY_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-bg font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors"
              >
                Book a Discovery Call
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
