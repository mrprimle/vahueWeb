'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const companies = [
  { name: 'Shopify', logo: '/img/shopify.svg' },
  { name: 'Audi', logo: '/img/audi-logo.svg' },
  { name: 'Deloitte', logo: '/img/deloitte.svg' },
  { name: 'Leafworks', logo: '/img/leafworks.svg' },
  { name: 'Tracesafe', logo: '/img/tracesafe.svg' },
  { name: 'Carmen', logo: '/img/carmen.svg' },
  { name: 'BringLiesel', logo: '/img/bringliesel.svg' },
  { name: 'Quilk', logo: '/img/quilk.svg' },
]

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
                Transform your company into{' '}
                <span className="gradient-text-animated">AI‑Native</span>
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
                We drive full lifecycle transformation — modernizing platforms,
                data, talent, workflows and processes — and leverage AI as your
                unique strategic advantage.
              </p>

              {/* CTA Links */}
              <div className="flex flex-col gap-0">
                <Link
                  href="/teams"
                  className="group flex items-center justify-between py-5 border-t border-white/15 transition-colors hover:border-white/30"
                >
                  <span className="text-sm md:text-base font-mono uppercase tracking-widest text-white">
                    AI Strategy &amp; Team Training
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
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group flex items-center justify-between py-5 border-t border-b border-white/15 transition-colors hover:border-white/30"
                >
                  <span className="text-sm md:text-base font-mono uppercase tracking-widest text-white">
                    Enterprise-ready AI
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By — Company logos */}
      <div className="relative z-10 pb-12 md:pb-16">
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
            className={`bg-[#1a1a2e] rounded-2xl md:rounded-3xl p-4 md:p-6 ${
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
            <div className="grid grid-cols-3 md:grid-cols-8 gap-4 md:gap-6 items-center justify-items-center">
              {/* Mobile: first 3 logos */}
              {companies.slice(0, 3).map((company) => (
                <div
                  key={`mobile-${company.name}`}
                  className="flex items-center justify-center md:hidden"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={40}
                    className="h-8 w-auto brightness-0 invert opacity-50"
                  />
                </div>
              ))}
              {/* Desktop: all logos */}
              {companies.map((company) => (
                <div
                  key={company.name}
                  className="hidden md:flex items-center justify-center"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={40}
                    className="h-8 w-auto brightness-0 invert opacity-50"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
