'use client'

import Link from 'next/link'
import type { ReactElement, SVGProps } from 'react'
import { useState } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const Svg24 = (props: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  />
)

const TalentIcon = (p: IconProps) => (
  <Svg24
    {...p}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
    <path d="M8 15H7a4 4 0 0 0-4 4v2" />
    <circle cx="10" cy="7" r="4" />
  </Svg24>
)

const GraduationCapIcon = (p: IconProps) => (
  <Svg24 {...p}>
    <g
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </g>
  </Svg24>
)

const EnterpriseIcon = (p: IconProps) => (
  <Svg24 {...p}>
    <g
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 12h4" />
      <path d="M10 8h4" />
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    </g>
  </Svg24>
)

const CommunityIcon = (p: IconProps) => (
  <Svg24 {...p}>
    <g fill="currentColor">
      <path d="M18.3059 22.2455C18.5323 22.3644 18.7967 22.3644 19.0231 22.2455C20.2193 21.6168 23.9977 19.3375 23.9977 15.6312C24.0036 14.0035 22.6995 12.6778 21.0823 12.668C20.1093 12.6805 19.2049 13.1746 18.6644 13.9889C18.1239 13.1746 17.2195 12.6805 16.2465 12.668C14.6293 12.6778 13.3252 14.0035 13.3311 15.6312C13.3311 19.3375 17.1096 21.6167 18.3059 22.2455Z" />
      <path d="M12.5819 12.3243C11.5841 11.9006 10.4861 11.666 9.33248 11.666C6.08038 11.666 3.27009 13.5291 1.89876 16.2413C1.07298 17.8745 1.96984 19.7957 3.61778 20.368C5.0753 20.8741 7.02314 21.334 9.33248 21.334C10.8433 21.334 12.1996 21.1371 13.3651 20.8592C12.3491 19.6524 11.4444 18.0284 11.3408 16.0112C11.3303 15.8064 11.3239 15.5497 11.3429 15.2745C11.4207 14.1475 11.8745 13.1209 12.5819 12.3243Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.66699 6.33396C5.66699 4.30838 7.30877 2.6673 9.33366 2.6673C11.3586 2.6673 13.0003 4.30838 13.0003 6.33396C13.0003 8.35955 11.3586 10.0006 9.33366 10.0006C7.30877 10.0006 5.66699 8.35955 5.66699 6.33396Z"
      />
      <path d="M14.0664 9.4504C14.6276 9.79922 15.29 10.0006 15.9993 10.0006C18.0243 10.0006 19.666 8.35955 19.666 6.33396C19.666 4.30838 18.0243 2.6673 15.9993 2.6673C15.29 2.6673 14.6276 2.86871 14.0664 3.21751C14.6561 4.11152 14.9993 5.18254 14.9993 6.33396C14.9993 7.48538 14.6561 8.5564 14.0664 9.4504Z" />
    </g>
  </Svg24>
)

type Agent = {
  title: string
  body: string
}

const technicalAgents: Agent[] = [
  {
    title: 'AI SEO',
    body: 'Reach millions of buyers who now use AI assistants to discover products and brands. Engineered for how LLM-powered search ranks, cites, and converts.',
  },
  {
    title: 'Knowledge Engine',
    body: 'Connects tickets, docs, wikis, code, and transcripts into a single governed system that produces verifiable requirements, stories, and tests — and brings the “why” into the IDE.',
  },
  {
    title: 'Predictive Analytics Suite',
    body: 'AI-driven insights, reporting automation, and decision intelligence — turning raw data into actionable enterprise knowledge at speed.',
  },
  {
    title: 'MCP Accelerator',
    body: 'A Model Context Protocol server — a secure integration layer that connects AI models to your enterprise systems, data, and tools, making products and operations AI-ready by design.',
  },
]

const horizontalAgents: Agent[] = [
  {
    title: 'Intelligent Document Processing',
    body: 'AI-powered extraction, classification, and summarization across enterprise documents — from contracts and invoices to regulatory filings and technical specs.',
  },
  {
    title: 'Customer Experience',
    body: 'Omnichannel support agents, hyper-personalization, and intelligent journey orchestration — delivering seamless customer experiences at enterprise scale.',
  },
  {
    title: 'Process Automation Suite',
    body: 'End-to-end workflow automation combining agentic AI with RPA, low-code orchestration, and enterprise integration — eliminating manual handoffs across operations.',
  },
  {
    title: 'Finance',
    body: 'Prep journal entries, reconcile accounts, generate financial statements, analyze variances, manage close, and support audits.',
  },
  {
    title: 'Sales & Marketing',
    body: 'Research prospects, prep for calls, review your pipeline, build competitive battlecards, draft content, plan campaigns, enforce brand voice, and report across channels — wired into your CRM, ERP, and internal systems.',
  },
]

type TabKey = 'technical' | 'horizontal'

const tabs: { key: TabKey; label: string; agents: Agent[] }[] = [
  {
    key: 'technical',
    label: 'Technical Agents',
    agents: technicalAgents,
  },
  {
    key: 'horizontal',
    label: 'Horizontal Agents',
    agents: horizontalAgents,
  },
]

export default function EngagementModels() {
  const [activeTab, setActiveTab] = useState<TabKey>('technical')
  const active = tabs.find((t) => t.key === activeTab) ?? tabs[0]

  return (
    <section id="engagement" className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Services</p>
            <h2 className="text-display font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
              Your AI journey isn&apos;t one-size-fits-all.{' '}
              <span className="text-white/55">
                We meet you where you are and
              </span>{' '}
              take you{' '}
              <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
                further.
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/55 max-w-md">
            Redefine your company: innovate, operate, and outpace your
            competitors in the era of AI.
          </p>
        </div>

        {/* Bento grid: 3 services on top, Enterprise AI full-width below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Top row — 3 equal service cards */}
          <BentoCard
            category="Engineering"
            title="AI-Native Engineering"
            body="The next evolution of engineering is here: building and scaling AI-native, agentic ways of working across the software development life cycle to enable high-performance teams."
            href="/ai-native-engineering"
            Icon={TalentIcon}
          />
          <BentoCard
            category="Training"
            title="Team Training"
            body="Talent agility is now essential — pushing organizations to continuously rebalance their human and AI workforce to unlock the full potential of every employee."
            href="/team-training"
            Icon={GraduationCapIcon}
          />
          <BentoCard
            category="Founders Community"
            title="AI Incubator"
            body="A community-as-a-service for founders — weekly content, hands-on playbooks, and real case studies from teams shipping AI in production."
            href="/vahue-incubator"
            accent="radial-gradient(120% 120% at 100% 0%, rgba(132,52,233,0.22) 0%, rgba(3,137,244,0.08) 45%, transparent 80%)"
            Icon={CommunityIcon}
          />

          {/* Bottom row — Enterprise AI full width */}
          <div className="group md:col-span-3 relative rounded-3xl border border-border-mid overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                background:
                  'radial-gradient(90% 80% at 0% 0%, rgba(3,137,244,0.12) 0%, rgba(132,52,233,0.08) 45%, transparent 75%)',
              }}
            />
            <div className="relative bg-surface p-7 md:p-10 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/45">
                  <EnterpriseIcon className="w-4 h-4" />
                  Systems &amp; Automations
                </p>
                <Link
                  href="/enterprise-ai"
                  aria-label="Learn more about Enterprise AI Hub"
                  className="group/link inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/55 group-hover:text-white transition-colors"
                >
                  <span>Learn more</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-white mb-3 leading-tight">
                Enterprise AI Hub
              </h3>
              <p className="text-sm md:text-[15px] text-white/65 leading-relaxed max-w-2xl mb-8">
                Turn automation into measurable ROI with adaptive, conversational
                AI chatbots and agentic AI systems that understand context, act
                autonomously within guardrails, and evolve with your business
                needs.
              </p>

              {/* Tab switcher */}
              <div
                role="tablist"
                aria-label="Agent type"
                className="inline-flex flex-nowrap gap-1 md:gap-1.5 p-1 rounded-full border border-border-soft bg-white/[0.03] self-start mb-6"
              >
                {tabs.map((t) => {
                  const isActive = t.key === activeTab
                  return (
                    <button
                      key={t.key}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(t.key)}
                      className={`whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-white text-[#0a0a14] shadow-[0_0_0_1px_rgba(255,255,255,0.2)]'
                          : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {t.label}
                    </button>
                  )
                })}
              </div>

              {/* 3 plates per row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {active.agents.map((a) => (
                  <div
                    key={a.title}
                    className="rounded-2xl border border-border-soft bg-white/[0.02] p-5 transition-colors hover:border-border-mid"
                  >
                    <p className="text-lg md:text-xl font-semibold text-white mb-2 leading-tight">
                      {a.title}
                    </p>
                    <p className="text-[13px] md:text-sm text-white/65 leading-relaxed">
                      {a.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BentoCard({
  category,
  title,
  body,
  href,
  accent,
  Icon,
}: {
  category: string
  title: string
  body: string
  href: string
  accent?: string
  Icon?: (p: IconProps) => ReactElement
}) {
  return (
    <Link
      href={href}
      className="group relative rounded-3xl border border-border-soft bg-surface p-7 md:p-8 flex flex-col min-h-[220px] overflow-hidden"
    >
      {accent && (
        <div
          className="absolute inset-0 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: accent }}
        />
      )}
      <div className="relative flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/45">
            {Icon && <Icon className="w-4 h-4" />}
            {category}
          </span>
          <span className="w-9 h-9 rounded-full border border-border-mid flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-bg group-hover:border-white transition-all">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </span>
        </div>
        <div className="mt-auto">
          <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-3 leading-tight tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-white/65 leading-relaxed">{body}</p>
        </div>
      </div>
    </Link>
  )
}
