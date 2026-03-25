'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SubpageBenefits from '@/components/shared/SubpageBenefits'
import SubpageApproach from '@/components/shared/SubpageApproach'
import SubpageWhyUs from '@/components/shared/SubpageWhyUs'
import SubpageIndustries from '@/components/shared/SubpageIndustries'
import SubpageFAQ from '@/components/shared/SubpageFAQ'
import BlogSection from '@/components/engineering/BlogSection'
import ContactContainer from '@/components/engineering/ContactContainer'

/* ─── 1. HERO ─── */
function TeamsHero() {
  const logos = ['epic growth', 'LANCET', 'SMSTRETCHING', 'nubes']

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #f97316 0%, #ea580c 25%, #dc2626 45%, #f59e0b 65%, #84cc16 85%, #22d3ee 100%)',
        }}
      />
      <div className="absolute inset-0 backdrop-blur-[80px]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 60%, rgba(249,115,22,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(234,179,8,0.3) 0%, transparent 50%)',
        }}
      />

      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold text-white leading-[1.05] tracking-tight">
              Your Entire Team Using AI in 7&nbsp;Days
            </h1>

            <div>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-10">
                96% of our training participants start using AI tools within
                7&nbsp;days. Not because we lecture&nbsp;&mdash; because we
                build. Every program is hands-on, role-specific, and designed
                around your actual workflows.
              </p>

              <Link
                href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-dark font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/90 transition-colors w-full"
              >
                Book a Training Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-16 md:pb-20">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <p className="text-white/40 text-sm mb-6">Trusted by</p>
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {logos.map((name) => (
              <span
                key={name}
                className="text-white/50 text-lg md:text-xl font-bold tracking-wide"
                style={{
                  fontStyle: name === 'SMSTRETCHING' ? 'italic' : 'normal',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 3. SERVICES — draggable carousel ─── */
const products = [
  {
    title: 'AI Diagnostics',
    description: 'Quick audit of tasks, teams, and processes.',
    bullets: [
      'Up to 30% increase in process efficiency',
      'Faster pilot launch',
      'Tailored AI roadmap',
    ],
    icon: (
      <svg className="w-10 h-10 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
  },
  {
    title: 'AI Workshops (Intro & Applied)',
    description:
      'Hands-on sessions where teams learn and immediately apply GenAI tools to their actual work.',
    bullets: [
      'Custom exercises for your industry',
      'Role-specific prompt libraries',
      'Post-workshop action plan',
    ],
    icon: (
      <svg className="w-10 h-10 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: 'AI Skills for Teams',
    description:
      'Structured multi-week program that builds lasting AI habits across departments.',
    bullets: [
      'Role-based curriculum',
      'Personal AI agents built by each participant',
      'Team-level adoption dashboard',
    ],
    icon: (
      <svg className="w-10 h-10 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    title: 'AI Advisor for Leadership',
    description:
      'Ongoing advisory track for CEO and top teams to build a shared AI language.',
    bullets: [
      'Bi-weekly strategic sessions',
      'Leadership AI playbook',
      'Organization-wide adoption tracking',
    ],
    icon: (
      <svg className="w-10 h-10 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: 'AI Champions Program',
    description:
      'Identify and empower internal AI advocates who drive adoption after training ends.',
    bullets: [
      'Champion selection framework',
      'Advanced training track',
      'Internal knowledge-sharing templates',
    ],
    icon: (
      <svg className="w-10 h-10 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5A6.75 6.75 0 007.5 9.75v4.5m9 4.5H7.5m4.5-15a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2.25l.44 1.356a2.25 2.25 0 001.454 1.454L15.25 5.5l-1.356.44a2.25 2.25 0 00-1.454 1.454L12 8.75l-.44-1.356a2.25 2.25 0 00-1.454-1.454L8.75 5.5l1.356-.44a2.25 2.25 0 001.454-1.454L12 2.25z" />
      </svg>
    ),
  },
]

function OurProducts() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollStartRef = useRef(0)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 1)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -380 : 380,
        behavior: 'smooth',
      })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDraggingRef.current = true
    setIsDragging(true)
    startXRef.current = e.pageX
    scrollStartRef.current = scrollRef.current.scrollLeft
    scrollRef.current.style.scrollBehavior = 'auto'
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return
    e.preventDefault()
    scrollRef.current.scrollLeft =
      scrollStartRef.current - (e.pageX - startXRef.current)
  }
  const handleMouseUp = () => {
    isDraggingRef.current = false
    setIsDragging(false)
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = ''
  }
  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      setIsDragging(false)
      if (scrollRef.current) scrollRef.current.style.scrollBehavior = ''
    }
  }

  return (
    <section id="services" className="bg-white py-16 md:py-24 lg:py-28 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark">
            Our Products
          </h2>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'border-dark/20 hover:border-dark/40 text-dark/60'
                  : 'border-dark/10 text-dark/20 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'border-dark/20 hover:border-dark/40 text-dark/60'
                  : 'border-dark/10 text-dark/20 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="relative">
          <div
            className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onScroll={checkScroll}
            className={`flex gap-5 overflow-x-auto scrollbar-hide select-none snap-x snap-mandatory md:snap-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {products.map((product) => (
              <div
                key={product.title}
                className="flex-shrink-0 w-[300px] md:w-[340px] snap-start"
              >
                <div className="card-neu h-full">
                  <div className="card-neu-inner flex flex-col min-h-[420px]">
                    <div className="mb-5 pointer-events-none">{product.icon}</div>
                    <h3 className="text-lg md:text-xl font-bold text-dark mb-2 pointer-events-none">
                      {product.title}
                    </h3>
                    <p className="text-[#86868b] text-sm leading-relaxed mb-auto pointer-events-none">
                      {product.description}
                    </p>
                    <ul className="mt-8 space-y-2.5 pointer-events-none">
                      {product.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[#86868b] text-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]/40 mt-1.5 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 7. RESULTS IN NUMBERS ─── */
const resultsStats = [
  {
    value: '2500+',
    description: 'Specialists trained',
    icon: (
      <svg className="w-5 h-5 text-dark/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    value: '9.4/10',
    description: 'Average participant satisfaction',
    icon: (
      <svg className="w-5 h-5 text-dark/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    value: '96%',
    description:
      'of employees started using AI tools within 7 days after the training',
    icon: (
      <svg className="w-5 h-5 text-dark/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
]

function ResultsInNumbers() {
  return (
    <section id="results" className="bg-white py-20 md:py-28 lg:py-36">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6 leading-tight">
              Results in Numbers
            </h2>
            <p className="text-dark/60 text-base md:text-lg leading-relaxed">
              We&apos;ve helped businesses make AI a working tool&nbsp;&mdash;
              not just a buzzword.
            </p>
          </div>
          <div className="flex flex-col">
            {resultsStats.map((stat, index) => (
              <div
                key={index}
                className="min-h-[28vh] md:min-h-[35vh] flex flex-col justify-center"
              >
                <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-[#ea580c] leading-[0.9] mb-4 tracking-tight">
                  {stat.value}
                </p>
                <div className="flex items-start gap-3 max-w-sm">
                  <span className="[&>svg]:w-8 [&>svg]:h-8">{stat.icon}</span>
                  <p className="text-dark/40 text-base md:text-lg leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 8. FOUNDER + TEAM ─── */
function OurTeam() {
  return (
    <section id="team" className="bg-white py-16 md:py-24 lg:py-28">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-12 md:mb-16">
          Our Team
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="card-neu">
            <div className="card-neu-inner grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-center">
              <div className="relative w-[200px] h-[260px] md:w-[240px] md:h-[320px] rounded-2xl overflow-hidden">
                <Image
                  src="/img/mikecut.avif"
                  alt="Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-dark mb-1">
                  Mike Doroshenko
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-[#86868b] mb-6">
                  Founder, Product Strategist, AI Consultant
                </p>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  10+ years of experience in digital product strategy and AI
                  transformation. Author of corporate training programs used by
                  leading companies.
                </p>
              </div>
            </div>
          </div>
          <div className="card-neu">
            <div className="card-neu-inner flex flex-col justify-center">
              <svg
                className="w-10 h-10 text-[#ea580c] mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              <p className="text-lg md:text-xl font-bold text-dark mb-2">
                Supported by 30+ experts
              </p>
              <p className="text-[#86868b] text-sm leading-relaxed">
                from McKinsey, Google, and top tech companies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 9. CLIENT CASES (dark glassmorphism) ─── */
function ClientCases() {
  return (
    <section id="cases" className="bg-white scroll-mt-20">
      <div className="section-dark-top py-16 md:py-24 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16">
            Client Cases
          </h2>
          <div className="card-glass">
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 lg:gap-12">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
                  Client
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  Wealth Management Company
                </h3>
              </div>
              <div>
                <div className="mb-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
                    Objective
                  </p>
                  <p className="text-white/70 text-base leading-relaxed">
                    The goal was to integrate AI tools into everyday work across
                    all roles and increase overall productivity.
                  </p>
                </div>
                <div className="mb-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
                    Results
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        v: '85%',
                        d: 'of employees use AI tools daily in workflows',
                      },
                      {
                        v: '70%',
                        d: 'of routine queries resolved via GPT assistant within the first 2 weeks',
                      },
                      {
                        v: '5 min',
                        d: 'average response time reduced from 1 hour to 5 minutes',
                      },
                      {
                        v: '52',
                        d: 'ready-to-use prompts created for key scenarios (finance, presale, legal, HR)',
                      },
                      {
                        v: '12',
                        d: 'AI agents deployed for quality, sales, finance, and executive dashboards',
                      },
                      {
                        v: '100%',
                        d: 'prompts reviewed for data security compliance',
                      },
                    ].map((r, i) => (
                      <div key={i} className="border-t border-white/10 pt-4">
                        <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                          {r.v}
                        </p>
                        <p className="text-white/40 text-sm leading-relaxed">
                          {r.d}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
                    Stack
                  </p>
                  <p className="text-white/40 text-sm leading-relaxed">
                    ChatGPT Enterprise, n8n, Cursor, RAGDB (vector database),
                    Power BI + Bloomberg GPT, Miro, Whisper / Coqui
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── EXPORT ─── */
export default function TeamsPage() {
  return (
    <>
      {/* 1. Hero */}
      <TeamsHero />

      {/* 2. Benefits */}
      <SubpageBenefits
        title="What changes when your team gets AI-fluent"
        benefits={[
          {
            title: 'From overwhelmed to confident',
            description:
              'Your team stops drowning in AI noise and starts using the right tools for the right tasks.',
          },
          {
            title: 'From hours to minutes',
            description:
              'Routine tasks that take hours collapse to minutes. Reports, research, emails, data analysis.',
          },
          {
            title: 'From resistance to enthusiasm',
            description:
              'When people see AI work on their actual tasks, adoption happens naturally.',
          },
          {
            title: 'From scattered tools to unified workflow',
            description:
              'One coherent AI workflow instead of 15 disconnected experiments.',
          },
        ]}
      />

      {/* 3. Services — draggable carousel */}
      <OurProducts />

      {/* 4. Approach */}
      <SubpageApproach
        frameworkName="The Vahue AI Fluency Method"
        title="How we get your team there"
        steps={[
          {
            title: 'Diagnose',
            description:
              "Audit your team's AI readiness, current tools, and biggest opportunities",
          },
          {
            title: 'Design',
            description:
              'Custom program tailored to your roles, workflows, and industry',
          },
          {
            title: 'Deliver',
            description:
              '80% hands-on practice with your real tasks. No abstract theory.',
          },
          {
            title: 'Deploy',
            description:
              'Prompt libraries, AI agents, and templates your team keeps forever',
          },
          {
            title: 'Measure',
            description:
              'Track adoption, time saved, and ROI. Adjust and iterate.',
          },
        ]}
      />

      {/* 5. Why Us */}
      <SubpageWhyUs
        title="Why teams choose Vahue"
        items={[
          {
            title: 'Not theory. Practice.',
            description:
              '80% of every session is hands-on with your real documents, emails, and workflows.',
          },
          {
            title: 'Founder-led',
            description:
              'Mike personally designs and leads programs. No junior trainers, no layers.',
          },
          {
            title: 'Results you can measure',
            description:
              '96% of participants use AI daily within 7 days. We track it.',
          },
          {
            title: 'Beyond the workshop',
            description:
              'Prompt libraries, agent templates, and ongoing support. Your team keeps growing.',
          },
        ]}
      />

      {/* 6. Industries */}
      <SubpageIndustries />

      {/* 7. Stats */}
      <ResultsInNumbers />

      {/* 8. Founder + Team */}
      <OurTeam />

      {/* 9. Case Studies */}
      <ClientCases />

      {/* 10. Blog */}
      <BlogSection />

      {/* 11. Contact Form */}
      <ContactContainer />

      {/* 12. FAQ */}
      <SubpageFAQ
        items={[
          {
            q: 'How is Vahue different from agencies or large consulting firms?',
            a: 'We combine deep AI expertise with hands-on implementation. Unlike large firms, we work directly with your team, not through layers of consultants. Our programs are practical, not theoretical.',
          },
          {
            q: 'What kind of problems do you solve?',
            a: 'We help teams automate routine tasks, build AI-powered workflows, improve decision-making with data, and develop internal AI competency across all departments.',
          },
          {
            q: 'Can your programs be adapted to my industry?',
            a: 'Absolutely. We customize every program based on your industry, team structure, and specific business challenges.',
          },
          {
            q: 'How much time will the training take for my team?',
            a: 'It depends on the format. A workshop takes 1-2 days, while a full training program runs 2-4 weeks. We design schedules that minimize disruption.',
          },
          {
            q: 'How do you measure results?',
            a: 'We track AI adoption rates, time savings, productivity improvements, and participant satisfaction. Every program includes clear KPIs and post-training assessment.',
          },
          {
            q: 'Is it safe for company data?',
            a: 'Yes. We follow strict data security protocols and teach your team best practices for using AI tools safely. All prompts and workflows are reviewed for compliance.',
          },
          {
            q: 'Who will I work with directly?',
            a: "You'll work directly with our founder and senior AI strategists. No junior consultants or account managers.",
          },
        ]}
      />
    </>
  )
}
