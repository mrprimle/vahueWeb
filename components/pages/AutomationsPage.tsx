'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import SubpageBenefits from '@/components/shared/SubpageBenefits'
import SubpageApproach from '@/components/shared/SubpageApproach'
import SubpageWhyUs from '@/components/shared/SubpageWhyUs'
import SubpageIndustries from '@/components/shared/SubpageIndustries'
import SubpageFAQ from '@/components/shared/SubpageFAQ'
import FounderCTA from '@/components/engineering/FounderCTA'
import BlogSection from '@/components/engineering/BlogSection'
import ContactContainer from '@/components/engineering/ContactContainer'

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

          const wave1 = Math.sin(dist * 0.022) * 0.5 + 0.5
          const wave2 = Math.sin(dist * 0.013 + 0.8) * 0.3 + 0.35
          const wave = wave1 * 0.6 + wave2 * 0.4

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
    title: 'AI Assistants & Conversational AI',
    description: 'Context-aware chatbots and voice assistants that resolve issues, not just deflect them.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-chat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <rect x="3" y="4" width="18" height="14" rx="3" stroke="url(#grad-chat)" strokeWidth={1.4} />
        <circle cx="9" cy="11" r="1.2" fill="url(#grad-chat)" />
        <circle cx="15" cy="11" r="1.2" fill="url(#grad-chat)" />
        <path d="M8 21h8" stroke="url(#grad-chat)" strokeWidth={1.4} strokeLinecap="round" />
        <path d="M12 18v3" stroke="url(#grad-chat)" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Agentic Process Automation & RPA',
    description: 'Autonomous AI agents that execute complex, multi-step workflows — with or without APIs.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-agent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M12 2v6m0 8v6M2 12h6m8 0h6" stroke="url(#grad-agent)" strokeWidth={1.4} strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke="url(#grad-agent)" strokeWidth={1.4} />
        <circle cx="12" cy="12" r="7" stroke="url(#grad-agent)" strokeWidth={1.4} strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    title: 'Smart Search & Knowledge Systems',
    description: 'RAG-powered search that gives teams instant, accurate answers from your documentation.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-search" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <circle cx="11" cy="11" r="7" stroke="url(#grad-search)" strokeWidth={1.4} />
        <path d="M21 21l-4.35-4.35" stroke="url(#grad-search)" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'AI-Powered Analytics & Monitoring',
    description: 'Automated tracking of competitors, markets, and internal KPIs with AI-generated insights.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-analytics" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="url(#grad-analytics)" strokeWidth={1.4} />
        <path d="M7 17v-4M12 17V9M17 17v-6" stroke="url(#grad-analytics)" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Content Generation & Marketing',
    description: 'AI systems that produce on-brand copy, visuals, and marketing materials at scale.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-content" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M12 20h9" stroke="url(#grad-content)" strokeWidth={1.4} strokeLinecap="round" />
        <path d="M16.376 3.622a1.994 1.994 0 013.002 2.628L7.874 17.754l-4.124.824.824-4.124L16.376 3.622z" stroke="url(#grad-content)" strokeWidth={1.4} />
      </svg>
    ),
  },
  {
    title: 'Generative AI Solutions',
    description: 'Custom GenAI apps — from digital twins to accelerated R&D — built for your specific context.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-genai" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" stroke="url(#grad-genai)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" stroke="url(#grad-genai)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Predictive Analytics & Decision Intelligence',
    description: 'Custom ML models that forecast outcomes and power smarter decisions.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-predict" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" stroke="url(#grad-predict)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 6h5.25v5.25" stroke="url(#grad-predict)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Business Process Integration',
    description: 'Connect AI capabilities to your CRM, ERP, and internal systems for end-to-end intelligent workflows.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-bpi" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="url(#grad-bpi)" strokeWidth={1.4} />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="url(#grad-bpi)" strokeWidth={1.4} />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="url(#grad-bpi)" strokeWidth={1.4} />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="url(#grad-bpi)" strokeWidth={1.4} />
        <path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4" stroke="url(#grad-bpi)" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
  },
]

const copilots = [
  {
    department: 'Sales',
    description: 'Research prospects, prep for calls, review pipeline, draft outreach. Predictive: revenue forecasting, lead scoring.',
    tools: 'HubSpot, Close, Slack, ZoomInfo',
  },
  {
    department: 'Marketing',
    description: 'Draft content, plan campaigns, enforce brand voice, report on performance. Predictive: churn prediction, customer segmentation.',
    tools: 'HubSpot, Canva, Amplitude, Klaviyo',
  },
  {
    department: 'Customer Support',
    description: 'Triage tickets, draft responses, package escalations, build KB articles. Predictive: churn risk, sentiment trends.',
    tools: 'Intercom, HubSpot, Jira, Slack',
  },
  {
    department: 'Finance',
    description: 'Prep journal entries, reconcile accounts, manage close, support audits. Predictive: fraud detection, cash flow forecasting.',
    tools: 'Snowflake, BigQuery, Microsoft 365',
  },
  {
    department: 'Legal',
    description: 'Review contracts, triage NDAs, navigate compliance, assess risk.',
    tools: 'Box, Egnyte, Jira, Microsoft 365',
  },
  {
    department: 'Product',
    description: 'Write specs, plan roadmaps, synthesize user research, track competition. Predictive: feature adoption, A/B test modeling.',
    tools: 'Linear, Jira, Figma, Amplitude',
  },
  {
    department: 'Data & Analytics',
    description: 'Query datasets, write SQL, build dashboards, validate analysis. Predictive: anomaly detection, trend forecasting.',
    tools: 'Snowflake, Databricks, BigQuery, Hex',
  },
  {
    department: 'Operations',
    description: 'Manage tasks, calendars, workflows, cross-tool search. Predictive: preventive maintenance, inventory optimization.',
    tools: 'Slack, Notion, Asana, Jira, Monday',
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

const statsData = [
  { value: '-75%', label: 'search time reduction' },
  { value: '2 hrs', label: 'response time to market changes' },
  { value: '10x', label: 'monitoring coverage increase' },
]

/* ═══════════════════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════════════════ */
function AutomationsHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark overflow-hidden">
      <DotMatrix />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
          AI That Acts,
          <br />
          Not Just Answers
        </h1>
        <p className="text-white/50 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          We build AI agents, automations, and predictive models that do real work — from
          customer support to back-office operations. Every solution ships to production
          with guardrails, audit trails, and measurable ROI.
        </p>
        <Link
          href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-dark font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
        >
          Discuss Your Project
        </Link>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   3. SERVICES  –  8 service cards, 2-col grid
   ═══════════════════════════════════════════════════════ */
function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 md:py-28 lg:py-36 scroll-mt-20">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark text-center mb-14 md:mb-20">
          What We Do
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-[#f3f4f6] border border-transparent rounded-2xl p-6 md:p-8 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#e8eef4] flex items-center justify-center">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   4. DEPARTMENT AI COPILOTS
   ═══════════════════════════════════════════════════════ */
function DepartmentCopilots() {
  return (
    <section id="copilots" className="bg-white scroll-mt-20">
      <div className="section-dark-top py-16 md:py-24 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              AI Copilots for Every Department
            </h2>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
              Role-specific AI assistants connected to the tools your team already uses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {copilots.map((copilot) => (
              <div
                key={copilot.department}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-7 flex flex-col"
              >
                <h3 className="text-lg font-bold text-white mb-3">
                  {copilot.department}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-auto">
                  {copilot.description}
                </p>
                <div className="mt-5 pt-4 border-t border-white/10">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary mb-1.5">
                    Tools
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {copilot.tools}
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

/* ═══════════════════════════════════════════════════════
   8. STATS
   ═══════════════════════════════════════════════════════ */
function StatsSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="border border-[#F4F5F6] rounded-[32px] p-3 bg-[#F4F5F680] w-[calc(50%-0.5rem)] md:w-[240px] lg:w-[280px] aspect-square"
            >
              <div className="bg-white rounded-[24px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] h-full flex flex-col items-center justify-center text-center px-4">
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-animated mb-2">
                  {stat.value}
                </p>
                <p className="text-[#86868b] text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   10. CASE STUDIES
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
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center bg-[#1a3a5c] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                  Case Study
                </span>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-dark">
                  {cs.title}
                </h3>
              </div>

              <div className="h-[2px] bg-[#1a3a5c]/20 mb-8" />

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12">
                <div className="flex flex-col gap-6">
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h4 className="text-base font-bold text-dark mb-3">
                      Problem
                    </h4>
                    <p className="text-dark/60 text-sm leading-relaxed">
                      {cs.problem}
                    </p>
                  </div>

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

                <div className="flex flex-col gap-4">
                  <div
                    className="relative rounded-2xl overflow-hidden flex-1 min-h-[260px]"
                    style={{ background: cs.gradient }}
                  >
                    <span className="absolute top-4 right-4 bg-[#1a3a5c] text-white text-xs font-bold px-3 py-1 rounded-md">
                      NDA
                    </span>

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
      {/* 1. Hero */}
      <AutomationsHero />

      {/* 2. Benefits */}
      <SubpageBenefits
        title="What changes when AI does the heavy lifting"
        benefits={[
          {
            title: 'Your team stops searching, starts deciding',
            description: 'AI-powered knowledge bases give instant answers from 10,000+ documents.',
          },
          {
            title: "Competitors can't hide anymore",
            description: 'Automated competitive intelligence tracks 20+ players across 2,000+ parameters daily.',
          },
          {
            title: 'Support scales without headcount',
            description: 'AI assistants handle routine queries 24/7 while your team handles what matters.',
          },
          {
            title: 'Predictions replace guesswork',
            description: 'ML models forecast churn, demand, and revenue — so you act before problems happen.',
          },
        ]}
      />

      {/* 3. Services */}
      <ServicesSection />

      {/* 4. Department AI Copilots */}
      <DepartmentCopilots />

      {/* 5. Approach */}
      <SubpageApproach
        title="How we build your AI solution"
        steps={[
          { title: 'AI Business Analysis', description: 'We study your processes and find the highest-ROI automation opportunities' },
          { title: 'Strategy & ROI Forecast', description: 'Clear implementation plan with expected savings and timeline' },
          { title: 'Architecture & Design', description: 'Secure, scalable system design that fits your existing stack' },
          { title: 'Development', description: 'Iterative build with your feedback at every sprint' },
          { title: 'Deployment & Integration', description: 'We integrate into your workflows, CRM, ERP, and internal systems' },
          { title: 'Monitoring & Optimization', description: 'Post-launch tracking, fine-tuning, and continuous improvement' },
        ]}
      />

      {/* 6. Why Us */}
      <SubpageWhyUs
        title="Why companies choose Vahue for AI automations"
        items={[
          { title: 'We ship, not demo', description: 'Every project goes to production with real users. No POC graveyards.' },
          { title: 'ROI-first scoping', description: 'We start with the automation that has the highest return. No vanity projects.' },
          { title: 'Full lifecycle partner', description: 'From analysis to maintenance. One team, one relationship, continuous improvement.' },
          { title: 'Your data stays yours', description: 'ISO-level security practices, GDPR-ready, encryption in transit and at rest.' },
        ]}
      />

      {/* 7. Industries */}
      <SubpageIndustries />

      {/* 8. Stats */}
      <StatsSection />

      {/* 9. Founder + CTA */}
      <FounderCTA />

      {/* 10. Case Studies */}
      <CaseStudiesSection />

      {/* 11. Blog */}
      <BlogSection />

      {/* 12. Contact Form */}
      <ContactContainer />

      {/* 13. FAQ */}
      <SubpageFAQ
        items={[
          { q: 'How long does a typical automation project take?', a: 'Most projects go from discovery to production in 6-12 weeks. Simple automations can ship in 2-4 weeks.' },
          { q: 'Can you integrate with our existing systems?', a: 'Yes. We connect to CRMs, ERPs, chat platforms, databases, and custom APIs. If it has an API, we can integrate.' },
          { q: "What if we don't have clean data?", a: "We assess data quality upfront and build cleaning pipelines as part of the project. Poor data doesn't stop us — it's part of what we solve." },
          { q: 'How do you ensure AI safety and accuracy?', a: 'Human-in-the-loop controls, automated testing, audit trails, and continuous monitoring. Every agent has guardrails.' },
          { q: "What's the typical ROI?", a: 'Our clients see 40-75% reduction in manual effort and 2-10x improvement in speed for the processes we automate.' },
          { q: 'Do you offer ongoing support after launch?', a: 'Yes. We provide monitoring, optimization, and model retraining as part of our post-launch support.' },
        ]}
      />
    </>
  )
}
