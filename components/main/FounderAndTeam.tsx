'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '100+', label: 'people trained' },
  { value: '20+', label: 'companies transformed' },
  { value: '9.4/10', label: 'avg. workshop rating' },
  { value: '96%', label: 'AI adoption in 7 days' },
]

export default function FounderAndTeam() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="team"
      ref={ref}
      className="relative py-20 md:py-28 scroll-mt-20"
    >
      <div className="max-w-wide mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow mb-4">Founder & team</p>
          <h2 className="text-display font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
            Senior humans,
            <br />
            <span className="text-white/55">AI-native craft.</span>
          </h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-16 md:mb-20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`border-l border-border-mid pl-5 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 80}ms` : '0ms' }}
            >
              <p className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-none mb-2 gradient-text-scale">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-white/55 font-mono uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Founder card */}
        <div className="relative rounded-3xl border border-border-mid overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-70"
            style={{
              background:
                'radial-gradient(80% 80% at 80% 0%, rgba(3,137,244,0.15) 0%, rgba(132,52,233,0.10) 40%, transparent 75%)',
            }}
          />
          <div className="relative bg-surface p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="flex flex-col">
              <p className="eyebrow mb-4">Talk to the founder</p>
              <h3 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-5">
                Mike Doroshenko
              </h3>
              <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-xl mb-6">
                Product strategist and AI consultant with 10+ years of digital
                product strategy and AI transformation. Author of corporate
                training programs used by leading companies.
              </p>

              <div className="rounded-2xl border border-border-soft bg-white/[0.03] p-5 mb-8 max-w-md">
                <p className="text-sm font-semibold text-white mb-1">
                  Supported by 30+ experts
                </p>
                <p className="text-xs text-white/55">
                  from McKinsey, Google, and top tech companies.
                </p>
              </div>

              <Link
                href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-bg font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors w-fit"
              >
                Book a call with Mike
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

            <div className="relative w-full max-w-md mx-auto lg:max-w-sm">
              <Image
                src="/img/mikecut.avif"
                alt="Mike — Founder of Vahue"
                width={500}
                height={600}
                className="relative z-10 w-full h-auto object-contain"
              />
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, #0a0a14 0%, rgba(10,10,20,0.8) 6%, transparent 35%, transparent 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
