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

const pillars = [
  {
    label: 'Systems',
    description: 'replace repetitive work with agents and workflows that run your operations',
  },
  {
    label: 'Enablement',
    description: 'enable your team to use AI mindfully with hands-on training',
  },
  {
    label: 'Talent',
    description: 'embed AI-native engineers into your team to accelerate delivery and execution',
  },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col bg-dark overflow-hidden">
      <div className="absolute inset-0 hero-texture opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, transparent 25%, rgba(3, 137, 244, 0.07) 45%, rgba(132, 52, 233, 0.06) 55%, transparent 75%)',
        }}
      />

      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-16">
          <div className="max-w-2xl">
            <h1
              className={`text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.0] tracking-tight ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '100ms' : '0ms',
              }}
            >
              <span className="gradient-text-shine">10x</span> your team&apos;s output
            </h1>

            <p
              className={`text-white text-lg md:text-xl leading-relaxed mt-5 mb-7 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '250ms' : '0ms',
              }}
            >
              with production-ready AI systems and multi-agent workflows that drive real business results.
            </p>

            <div
              className={`flex flex-col gap-3 mb-7 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '400ms' : '0ms',
              }}
            >
              {pillars.map((pillar) => (
                <p key={pillar.label} className="text-white text-sm md:text-base">
                  <span className="font-bold">{pillar.label}</span>
                  {' — '}
                  <span>{pillar.description}</span>
                </p>
              ))}
            </div>

            <p
              className={`text-white text-sm ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '500ms' : '0ms',
              }}
            >
              Everything you need to maximize AI impact across your business
            </p>

            <div
              className={`mt-7 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '600ms' : '0ms',
              }}
            >
              <Link
                href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-dark font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full"
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

      {/* Company Logos — glassy wrapper */}
      <div className="relative z-10 pb-12 md:pb-16">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div
            className={`bg-[#1a1a2e] rounded-2xl md:rounded-3xl p-4 md:p-6 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: mounted ? '600ms' : '0ms',
            }}
          >
            <div className="grid grid-cols-3 md:grid-cols-8 gap-4 md:gap-6 items-center justify-items-center">
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
