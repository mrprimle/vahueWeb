'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SubpageBenefits from '@/components/shared/SubpageBenefits'
import SubpageApproach from '@/components/shared/SubpageApproach'
import SubpageWhyUs from '@/components/shared/SubpageWhyUs'
import SubpageIndustries from '@/components/shared/SubpageIndustries'
import SubpageFAQ from '@/components/shared/SubpageFAQ'
import FounderCTA from '@/components/engineering/FounderCTA'
import CaseStudies from '@/components/engineering/CaseStudies'
import BlogSection from '@/components/engineering/BlogSection'
import ContactContainer from '@/components/engineering/ContactContainer'

/* ─── DATA ─── */

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

const services = [
  {
    title: 'AI Readiness Diagnostic',
    description:
      'Comprehensive audit of your data, processes, tools, and team capabilities. Deliverables: AI Maturity Scorecard, prioritized use-case portfolio with ROI estimates, 90-day action plan.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-readiness" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9" stroke="url(#grad-readiness)" strokeWidth={1.4} />
        <path d="M12 7v5l3.5 2" stroke="url(#grad-readiness)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.24 7.76l1.42-1.42" stroke="url(#grad-readiness)" strokeWidth={1.4} strokeLinecap="round" />
        <path d="M19.07 11H21" stroke="url(#grad-readiness)" strokeWidth={1.4} strokeLinecap="round" />
        <path d="M12 3v1.93" stroke="url(#grad-readiness)" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'AI Strategy Roadmap',
    description:
      'A phased, actionable plan that aligns AI initiatives with business goals. Deliverables: Executive-ready strategy deck, technology selection guide, 6-12 month timeline with milestones.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-roadmap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path d="M3 3v18h18" stroke="url(#grad-roadmap)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 16l4-6 4 4 5-8" stroke="url(#grad-roadmap)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 6h3v3" stroke="url(#grad-roadmap)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'AI Governance & Responsible AI',
    description:
      'Policies, guardrails, and oversight structures so your AI scales safely. Deliverables: AI governance charter, responsible AI policy, compliance checklist for your industry.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-governance" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" stroke="url(#grad-governance)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="url(#grad-governance)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Executive AI Consulting (1:1)',
    description:
      'Strategic advisory for C-level leaders navigating AI decisions and investments. Deliverables: Monthly sessions, decision frameworks, board presentation materials.',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-exec" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="url(#grad-exec)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" stroke="url(#grad-exec)" strokeWidth={1.4} />
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25" stroke="url(#grad-exec)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" opacity={0.4} />
      </svg>
    ),
  },
]

const statsData = [
  { value: '200+', label: 'companies transformed' },
  { value: '9.4/10', label: 'client satisfaction' },
  { value: '96%', label: 'AI adoption in 7 days' },
]

/* ─── 1. HERO ─── */
function StrategyHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-[85vh] md:min-h-screen flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 0%, 
              rgba(48, 94, 255, 0.48) 0%, 
              rgba(79, 98, 248, 0.42) 20%, 
              rgba(99, 102, 241, 0.36) 40%, 
              rgba(110, 100, 245, 0.24) 55%, 
              rgba(118, 98, 248, 0.15) 70%, 
              transparent 90%
            )
          `,
        }}
      />

      <div className="flex-1 flex items-center relative">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="text-center max-w-5xl mx-auto">
            <div
              className={`inline-flex mb-6 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '50ms' : '0ms',
              }}
            >
              <span className="inline-flex items-center gap-1.5 pl-4 pr-4 py-1 rounded-full text-[13px] font-medium text-dark/90 backdrop-blur-sm bg-white/20 border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                AI Strategy &amp; Advisory
              </span>
            </div>

            <h1
              className={`text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight text-dark mb-6 leading-[1.05] uppercase ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '150ms' : '0ms',
              }}
            >
              From AI Ambition to Board-Ready Action
            </h1>

            <p
              className={`text-xs sm:text-sm md:text-base text-dark/70 mb-6 max-w-3xl mx-auto ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '330ms' : '0ms',
              }}
            >
              Most AI initiatives stall between pilot and production because strategy,
              governance, and execution never align. We build the roadmap your leadership
              can fund and execute.
            </p>

            <div
              className={`${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: mounted ? '500ms' : '0ms',
              }}
            >
              <Link
                href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="group inline-flex items-center gap-1.5 bg-transparent text-dark font-medium text-xs md:text-sm uppercase tracking-wider px-3 md:px-4 py-1.5 md:py-2 rounded-full border-2 border-dark transition-all duration-200">
                  Book a Strategy Session
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-auto pt-4 pb-12 md:pb-16">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-gray-100 rounded-2xl md:rounded-3xl p-4 md:p-6">
            <div className="grid grid-cols-3 md:grid-cols-8 gap-4 md:gap-6 items-center justify-items-center">
              {companies.slice(0, 3).map((company) => (
                <div key={`mobile-${company.name}`} className="flex items-center justify-center md:hidden">
                  <Image src={company.logo} alt={company.name} width={120} height={40} className="h-8 w-auto grayscale opacity-60" />
                </div>
              ))}
              {companies.map((company) => (
                <div key={company.name} className="hidden md:flex items-center justify-center">
                  <Image src={company.logo} alt={company.name} width={120} height={40} className="h-8 w-auto grayscale opacity-60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 3. SERVICES ─── */
function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 md:py-28 lg:py-36 scroll-mt-20">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark text-center mb-14 md:mb-20">
          Our Services
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

/* ─── 7. STATS ─── */
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

/* ─── EXPORT ─── */
export default function StrategyPage() {
  return (
    <>
      {/* 1. Hero */}
      <StrategyHero />

      {/* 2. Benefits */}
      <SubpageBenefits
        title="What changes with a clear AI strategy"
        benefits={[
          {
            title: 'From AI FOMO to clear direction',
            description:
              'Stop chasing every AI trend. Focus on the 2-3 initiatives that will actually move your business forward.',
          },
          {
            title: 'From scattered pilots to a portfolio',
            description:
              'Turn fragmented experiments into a coordinated AI portfolio with prioritized use cases and ROI estimates.',
          },
          {
            title: 'From compliance anxiety to governance confidence',
            description:
              'Know exactly how your AI systems handle data, bias, and privacy — before regulators ask.',
          },
          {
            title: 'From abstract AI talk to funded initiatives',
            description:
              'Leave with board-ready artifacts, not slide decks. Strategy your CFO can approve and your CTO can execute.',
          },
        ]}
      />

      {/* 3. Services */}
      <ServicesSection />

      {/* 4. Approach */}
      <SubpageApproach
        frameworkName="The Vahue Strategy Sprint"
        title="How we build your AI strategy"
        steps={[
          {
            title: 'Discover',
            description:
              'Stakeholder interviews, current-state mapping, and opportunity identification',
          },
          {
            title: 'Assess',
            description:
              'Data readiness audit, process analysis, and AI maturity scoring',
          },
          {
            title: 'Design',
            description:
              'Use-case prioritization, roadmap creation, and governance framework',
          },
          {
            title: 'Align',
            description:
              'Leadership workshops, business case development, and budget alignment',
          },
          {
            title: 'Activate',
            description:
              'Quick-win pilots, success metrics, and handoff to implementation',
          },
        ]}
      />

      {/* 5. Why Us */}
      <SubpageWhyUs
        title="Why companies choose Vahue for AI strategy"
        items={[
          {
            title: 'Operators, not consultants',
            description:
              'We\'ve implemented 200+ AI solutions. Our strategy is grounded in what actually works in production.',
          },
          {
            title: 'Strategy that becomes action',
            description:
              'Most strategy engagements end with a PDF. Ours end with a funded roadmap and a first pilot in flight.',
          },
          {
            title: 'Full lifecycle partner',
            description:
              'When strategy turns into implementation, you don\'t need a new vendor. We build what we design.',
          },
          {
            title: 'Built for mid-market',
            description:
              'Enterprise-grade frameworks without the 6-figure minimums. Strategy that fits your budget and pace.',
          },
        ]}
      />

      {/* 6. Industries */}
      <SubpageIndustries />

      {/* 7. Stats */}
      <StatsSection />

      {/* 8. Founder + CTA */}
      <FounderCTA />

      {/* 9. Case Studies */}
      <CaseStudies />

      {/* 10. Blog */}
      <BlogSection />

      {/* 11. Contact Form */}
      <ContactContainer />

      {/* 12. FAQ */}
      <SubpageFAQ
        items={[
          {
            q: 'How long does a strategy engagement take?',
            a: 'Most strategy sprints run 2-4 weeks. We move fast — you get a board-ready roadmap, not a 6-month consulting project.',
          },
          {
            q: 'Do you deliver slides or action plans?',
            a: 'Action plans. Every deliverable is designed to be immediately executable — budgets, timelines, owners, and success metrics included.',
          },
          {
            q: 'Can this lead to implementation?',
            a: "Absolutely. That's the point. We're a full lifecycle partner. Strategy engagements often flow directly into training, automation, or engineering projects.",
          },
          {
            q: 'What if we already have an AI strategy?',
            a: "We'll audit it. Many companies have a strategy that's 6-12 months stale. We'll pressure-test it against current market reality and sharpen it.",
          },
          {
            q: 'How do you handle governance and compliance?',
            a: "We build governance frameworks tailored to your industry and regulatory environment. GDPR, HIPAA, SOC2 — we've done them all.",
          },
        ]}
      />
    </>
  )
}
