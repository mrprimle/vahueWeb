'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import ContactCards from '@/components/ContactCards'

/* ═══════════════════════════════════════════════════════
   DOT-MATRIX CANVAS  –  concentric-ring pattern
   ═══════════════════════════════════════════════════════ */
function DotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      const w = rect.width
      const h = rect.height
      const spacing = 14
      const dotR = 1.3
      const cx = w * 0.5
      const cy = h * 0.5

      ctx.clearRect(0, 0, w, h)

      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          const dx = x - cx
          const dy = y - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxR = Math.max(w, h) * 0.7

          // Concentric wave rings
          const wave1 = Math.sin(dist * 0.022) * 0.5 + 0.5
          const wave2 = Math.sin(dist * 0.013 + 0.8) * 0.3 + 0.35
          const wave = wave1 * 0.6 + wave2 * 0.4

          // Radial falloff
          const falloff = Math.max(0, 1 - (dist / maxR) * 0.55)
          const opacity = wave * falloff * 0.55

          if (opacity > 0.02) {
            ctx.beginPath()
            ctx.arc(x, y, dotR, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0, 180, 210, ${opacity})`
            ctx.fill()
          }
        }
      }
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */
const services = [
  {
    title: 'AI Assistants & Chatbots',
    description:
      'Smart helpers for managers, support teams, and customers',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="14" rx="3" />
        <circle cx="9" cy="11" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="11" r="1.2" fill="currentColor" stroke="none" />
        <path d="M8 21h8" strokeLinecap="round" />
        <path d="M12 18v3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Smart Search & Knowledge Base',
    description: 'Instant answers from corporate documentation',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Monitoring & Analytics',
    description:
      'Automated tracking of competitors and market trends',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 17v-4M12 17V9M17 17v-6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Content Generation',
    description:
      'Visualizations, copy, and marketing materials',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path d="M12 20h9" strokeLinecap="round" />
        <path d="M16.376 3.622a1.994 1.994 0 013.002 2.628L7.874 17.754l-4.124.824.824-4.124L16.376 3.622z" />
      </svg>
    ),
  },
  {
    title: 'Business Process Integration',
    description:
      'Connecting AI to your CRM, ERP, and internal systems',
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path d="M12 2v6m0 8v6M2 12h6m8 0h6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Custom Development for Your Needs',
    description:
      "Contact us — let's discuss your challenge and find a solution",
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M7 21h10M12 17v4" strokeLinecap="round" />
      </svg>
    ),
    isHighlighted: true,
  },
]

const processSteps = [
  {
    number: 1,
    title: 'AI Business Analysis',
    description: 'We study your processes and identify growth opportunities',
  },
  {
    number: 2,
    title: 'Strategy',
    description: 'We create an implementation plan with ROI forecast',
  },
  {
    number: 3,
    title: 'Development',
    description: 'We build a solution tailored to your needs',
  },
  {
    number: 4,
    title: 'Deployment',
    description: 'We integrate into your workflows',
  },
]

const caseStudies = [
  {
    title: 'Smart AI Search',
    problem:
      'The company faced inefficiency in working with corporate knowledge. With a technical documentation volume of over 10,000 documents, employees spent up to 15% of their working time searching for information. Low quality of classic search for contextual queries.',
    solution:
      'We developed an intelligent semantic search system with the ability to generate answers in natural language.',
    results: [
      { value: '-75%', label: 'search time reduction' },
      { value: '-40%', label: 'support tickets' },
      { value: '20→5 min', label: 'average time to find needed information' },
    ],
    client: 'One of the largest home appliance brands',
    gradient: 'linear-gradient(135deg, #e8eef4 0%, #d1dce6 100%)',
  },
  {
    title: 'Automated Competitive Landscape Analysis',
    problem:
      'Competitors change prices daily, launch promotions, introduce new installment formats, and update course programs. The company was losing competitive advantages due to the inability to promptly track changes from 20+ competitors across 50+ parameters.',
    solution:
      'Regularly analyzes competitors or product analogues across various parameters (discounts, new products, promotions, functionality, etc.) and generates a report in table format, sending it via email or messenger.',
    results: [
      { value: 'Daily', label: 'data updates for 20+ competitors instead of quarterly' },
      { value: '10x', label: 'monitoring coverage: from 200 to 2000+ parameters' },
      { value: '2 hrs', label: 'response time to changes' },
    ],
    client: 'NDA project, client — EdTech company',
    gradient: 'linear-gradient(135deg, #1a3a5c 0%, #2a5a8c 50%, #1a3a5c 100%)',
  },
]

/* ═══════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════ */
function AutomationsHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark overflow-hidden">
      <DotMatrix />
      {/* Subtle radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
          AI Automations
          <br />
          for Business
        </h1>
        <p className="text-white/50 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          We deliver solutions with measurable ROI — from analysis to launch
        </p>
        <Link
          href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-dark font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
        >
          Discuss Project
        </Link>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   WHAT WE DO  –  6 service cards, 2-col grid
   ═══════════════════════════════════════════════════════ */
function WhatWeDo() {
  return (
    <section id="services" className="bg-white py-20 md:py-28 lg:py-36 scroll-mt-20">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark text-center mb-14 md:mb-20">
          What We Do
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service) => {
            const cardClasses = `relative rounded-2xl p-6 md:p-8 transition-colors ${
              service.isHighlighted
                ? 'border-2 border-primary/40 bg-white hover:border-primary/60'
                : 'bg-[#f3f4f6] border border-transparent'
            }`

            const cardContent = (
              <>
                {/* Arrow icon for highlighted card */}
                {service.isHighlighted && (
                  <div className="absolute top-6 right-6 text-dark/30">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                )}

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#e8eef4] flex items-center justify-center text-[#2a4a6a]">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-dark mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-dark/50 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </>
            )

            if (service.isHighlighted) {
              return (
                <Link
                  key={service.title}
                  href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block ${cardClasses}`}
                >
                  {cardContent}
                </Link>
              )
            }

            return (
              <div key={service.title} className={cardClasses}>
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   HOW WE WORK  –  horizontal 4-step timeline
   ═══════════════════════════════════════════════════════ */
function HowWeWork() {
  return (
    <section id="process" className="bg-white py-20 md:py-28 lg:py-36 scroll-mt-20">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark text-center mb-14 md:mb-20">
          How We Work
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-[#e5e7eb]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {processSteps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                {/* Circle with number */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#1a3a5c] flex items-center justify-center mb-5">
                  <span className="text-white text-lg font-bold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-dark/50 text-sm leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   CASE STUDIES  –  two detailed cards
   ═══════════════════════════════════════════════════════ */
function CaseStudiesSection() {
  return (
    <section id="cases" className="bg-white py-20 md:py-28 lg:py-36 scroll-mt-20">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            Case Studies
          </h2>
          <p className="text-dark/50 text-base md:text-lg">
            Real results from implementing AI automations for business
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {caseStudies.map((cs, idx) => (
            <div key={idx} className="bg-[#f3f4f6] rounded-3xl p-6 md:p-10 lg:p-12">
              {/* Badge + Title */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center bg-[#1a3a5c] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                  Case Study
                </span>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-dark">
                  {cs.title}
                </h3>
              </div>

              {/* Divider */}
              <div className="h-[2px] bg-[#1a3a5c]/20 mb-8" />

              {/* Content: text + visual */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12">
                {/* Left: Problem, Solution, Results */}
                <div className="flex flex-col gap-6">
                  {/* Problem */}
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h4 className="text-base font-bold text-dark mb-3">
                      Problem
                    </h4>
                    <p className="text-dark/60 text-sm leading-relaxed">
                      {cs.problem}
                    </p>
                  </div>

                  {/* Solution + Results side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="bg-white rounded-2xl p-6">
                      <h4 className="text-base font-bold text-primary mb-3">
                        Solution
                      </h4>
                      <p className="text-dark/60 text-sm leading-relaxed">
                        {cs.solution}
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6">
                      <h4 className="text-base font-bold text-primary mb-3">
                        Results
                      </h4>
                      <ul className="space-y-2.5">
                        {cs.results.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>
                              <span className="font-bold text-dark">
                                {r.value}
                              </span>{' '}
                              <span className="text-dark/50">{r.label}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right: Visual placeholder + client */}
                <div className="flex flex-col gap-4">
                  <div
                    className="relative rounded-2xl overflow-hidden flex-1 min-h-[260px]"
                    style={{ background: cs.gradient }}
                  >
                    {/* NDA badge */}
                    <span className="absolute top-4 right-4 bg-[#1a3a5c] text-white text-xs font-bold px-3 py-1 rounded-md">
                      NDA
                    </span>

                    {/* Decorative elements for the first case (search interface) */}
                    {idx === 0 && (
                      <div className="absolute inset-4 flex flex-col gap-3 pt-12">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <p className="text-xs font-bold text-dark mb-1">
                            Search Data in Files
                          </p>
                          <p className="text-[10px] text-dark/40">
                            Find the documents you need with your query
                          </p>
                          <div className="mt-2 h-6 bg-[#f3f4f6] rounded-md" />
                        </div>
                        <div className="bg-white/80 rounded-lg p-3 shadow-sm">
                          <div className="h-2 w-3/4 bg-dark/10 rounded mb-1.5" />
                          <div className="h-2 w-1/2 bg-dark/5 rounded" />
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 shadow-sm">
                          <div className="h-2 w-2/3 bg-dark/10 rounded mb-1.5" />
                          <div className="h-2 w-1/3 bg-dark/5 rounded" />
                        </div>
                      </div>
                    )}

                    {/* Decorative elements for the second case (wave pattern) */}
                    {idx === 1 && (
                      <div className="absolute inset-0">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-full"
                            style={{
                              height: '60%',
                              top: `${i * 12}%`,
                              background: `linear-gradient(180deg, transparent, rgba(100,160,220,${0.08 + i * 0.03}), transparent)`,
                              borderRadius: '50%',
                              transform: `scaleX(1.5) translateY(${i * 5}px)`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-xl p-4 text-center">
                    <p className="text-dark/50 text-xs leading-relaxed">
                      {cs.client}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════════════ */
export default function AutomationsPage() {
  return (
    <>
      <AutomationsHero />
      <WhatWeDo />
      <HowWeWork />
      <CaseStudiesSection />
      <ContactCards />
    </>
  )
}
