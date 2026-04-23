'use client'

import { useEffect, useState } from 'react'

type Benefit = {
  metric: string
  label: string
  body: string
}

type Agent = {
  key: string
  name: string
  title: string
  description: string
  benefits: Benefit[]
}

type TabKey = 'technical' | 'horizontal' | 'vertical'

const technical: Agent[] = [
  {
    key: 'knowledge-engine',
    name: 'Knowledge Engine',
    title: 'Knowledge Engine',
    description:
      'Connects tickets, docs, wikis, code and transcripts into a single governed system that produces verifiable requirements, stories and tests — and brings the \u201Cwhy\u201D into the IDE.',
    benefits: [
      {
        metric: '40\u201360%',
        label: 'Faster PRDs',
        body: 'From discovery to requirements with citations',
      },
      {
        metric: '50\u201370%',
        label: 'Faster test design',
        body: 'Test suites mapped to acceptance criteria',
      },
      {
        metric: 'Up to 60%',
        label: 'Faster onboarding',
        body: 'Searchable, cited project memory',
      },
      {
        metric: 'End-to-end',
        label: 'Traceability',
        body: 'Discovery \u2192 PRD \u2192 stories \u2192 tests \u2192 code',
      },
    ],
  },
  {
    key: 'mcp-accelerator',
    name: 'MCP Accelerator',
    title: 'MCP Accelerator',
    description:
      'A Model Context Protocol server — a secure integration layer that connects AI models to your enterprise systems, data and tools, making products and operations AI-ready by design.',
    benefits: [
      {
        metric: '2\u201312 Week',
        label: 'Time to production',
        body: 'From discovery to deployed MCP server',
      },
      {
        metric: '30+',
        label: 'GenAI projects',
        body: 'Production deployments across industries',
      },
      {
        metric: '350+',
        label: 'Use cases identified',
        body: 'Across AI strategy and discovery engagements',
      },
      {
        metric: '19+',
        label: 'Technology partnerships',
        body: 'Cloud and AI ecosystem integrations',
      },
    ],
  },
  {
    key: 'ai-seo',
    name: 'AI SEO',
    title: 'AI SEO',
    description:
      'Reach millions of buyers who now use AI assistants to discover products and brands. Engineered for how LLM-powered search ranks, cites and converts.',
    benefits: [
      {
        metric: '10\u00D7',
        label: 'LLM visibility',
        body: 'Brand shows up in ChatGPT, Claude and Perplexity answers',
      },
      {
        metric: 'Top 3',
        label: 'Placements',
        body: 'Across AI-powered search and agentic assistants',
      },
      {
        metric: 'Weeks',
        label: 'To first citations',
        body: 'From kickoff to appearing in LLM answers',
      },
      {
        metric: '+30%',
        label: 'Qualified traffic',
        body: 'Buyers already in high-intent AI research',
      },
    ],
  },
  {
    key: 'predictive-analytics',
    name: 'Predictive Analytics Suite',
    title: 'Predictive Analytics Suite',
    description:
      'AI-driven insights, reporting automation and decision intelligence — turning raw data into actionable enterprise knowledge at speed.',
    benefits: [
      {
        metric: '70%',
        label: 'Faster insight delivery',
        body: 'From data request to actionable insight',
      },
      {
        metric: '50%',
        label: 'Report automation',
        body: 'Reduction in manual reporting effort',
      },
      {
        metric: '85%',
        label: 'Data quality improvement',
        body: 'Through AI-driven monitoring and remediation',
      },
      {
        metric: '3\u00D7',
        label: 'Analyst productivity',
        body: 'More analyses completed per analyst per week',
      },
    ],
  },
]

const horizontal: Agent[] = [
  {
    key: 'customer-experience',
    name: 'Customer Experience',
    title: 'Customer Experience',
    description:
      'Omnichannel support agents, hyper-personalization and intelligent journey orchestration — delivering seamless customer experiences at enterprise scale.',
    benefits: [
      {
        metric: '60%',
        label: 'Ticket resolution automation',
        body: 'L1 and L2 inquiries resolved without human intervention',
      },
      {
        metric: '45%',
        label: 'Faster response times',
        body: 'Average reduction in first-response time',
      },
      {
        metric: '+15pt',
        label: 'NPS improvement',
        body: 'Net Promoter Score uplift from AI-augmented CX',
      },
      {
        metric: '35%',
        label: 'Cost-to-serve reduction',
        body: 'Lower operational costs per customer interaction',
      },
    ],
  },
  {
    key: 'document-processing',
    name: 'Intelligent Document Processing',
    title: 'Intelligent Document Processing',
    description:
      'AI-powered extraction, classification and summarization across enterprise documents — from contracts and invoices to regulatory filings and technical specs.',
    benefits: [
      {
        metric: '90%+',
        label: 'Extraction accuracy',
        body: 'Across structured and semi-structured documents',
      },
      {
        metric: '80%',
        label: 'Processing time reduction',
        body: 'Compared to manual document handling',
      },
      {
        metric: '50+',
        label: 'Document types supported',
        body: 'PDFs, images, emails, scans and more',
      },
      {
        metric: '70%',
        label: 'Cost reduction',
        body: 'In document-heavy back-office operations',
      },
    ],
  },
  {
    key: 'process-automation',
    name: 'Process Automation Suite',
    title: 'Process Automation Suite',
    description:
      'End-to-end workflow automation combining agentic AI with RPA, low-code orchestration and enterprise integration — eliminating manual handoffs across operations.',
    benefits: [
      {
        metric: '75%',
        label: 'Manual task reduction',
        body: 'Across automated business processes',
      },
      {
        metric: '60%',
        label: 'Faster cycle times',
        body: 'End-to-end process completion acceleration',
      },
      {
        metric: '90%+',
        label: 'Process accuracy',
        body: 'Error reduction through AI-driven validation',
      },
      {
        metric: '40%',
        label: 'Operational cost savings',
        body: 'Through elimination of manual handoffs',
      },
    ],
  },
  {
    key: 'finance',
    name: 'Finance',
    title: 'Finance',
    description:
      'Prep journal entries, reconcile accounts, generate financial statements, analyze variances, manage close and support audits — wired into your ERP and data warehouse.',
    benefits: [
      {
        metric: '10\u00D7',
        label: 'Close velocity',
        body: 'Month-end without the fire drill',
      },
      {
        metric: '99%+',
        label: 'Reconciliation accuracy',
        body: 'Journal entries backed by evidence',
      },
      {
        metric: '\u221270%',
        label: 'Manual effort',
        body: 'On variance analysis and statements',
      },
      {
        metric: 'Audit-ready',
        label: 'By default',
        body: 'Every action logged and reviewable',
      },
    ],
  },
  {
    key: 'sales-marketing',
    name: 'Sales & Marketing',
    title: 'Sales & Marketing',
    description:
      'Research prospects, prep for calls, review pipeline, build battlecards, draft content, plan campaigns, enforce brand voice and report across channels — wired into your CRM, ERP and internal systems.',
    benefits: [
      {
        metric: '3\u00D7',
        label: 'Outbound coverage',
        body: 'Research, prep and follow-up wired to CRM',
      },
      {
        metric: '+25%',
        label: 'Meetings booked',
        body: 'Sharper prospecting and outreach',
      },
      {
        metric: '\u221240%',
        label: 'Prep time',
        body: 'Briefs, battlecards and call notes auto-generated',
      },
      {
        metric: 'Brand-safe',
        label: 'By default',
        body: 'Enforced voice, guardrails and approvals',
      },
    ],
  },
]

const vertical: Agent[] = [
  {
    key: 'banking',
    name: 'Banking & Financial Services',
    title: 'Banking & Financial Services',
    description:
      'Agentic AI accelerators purpose-built for banking, insurance and financial services — automating compliance, reducing fraud and transforming customer operations at enterprise scale.',
    benefits: [
      {
        metric: '20\u201330%',
        label: 'Revenue leakage reduction',
        body: 'Through churn detection and dormancy re-engagement',
      },
      {
        metric: '70%',
        label: 'Audit prep effort reduction',
        body: 'Automated evidence gathering and report generation',
      },
      {
        metric: '50%',
        label: 'Financial crime false negatives',
        body: 'Reduction through multi-agent pattern detection',
      },
      {
        metric: '40\u201360%',
        label: 'Faster claims cycles',
        body: 'End-to-end claims and servicing acceleration',
      },
    ],
  },
  {
    key: 'insurance',
    name: 'Insurance',
    title: 'Insurance',
    description:
      'Compress claims, underwriting and service cycles — with agents that structure messy inputs (calls, forms, photos) into regulator-ready, explainable decisions.',
    benefits: [
      {
        metric: '\u221260%',
        label: 'Claims cycle time',
        body: 'Intake, triage and decision in one flow',
      },
      {
        metric: '95%+',
        label: 'FNOL accuracy',
        body: 'Structured capture from calls, forms and photos',
      },
      {
        metric: '3\u00D7',
        label: 'Underwriting throughput',
        body: 'Without compromising risk discipline',
      },
      {
        metric: 'Explainable',
        label: 'End-to-end',
        body: 'Every decision auditable for regulators',
      },
    ],
  },
  {
    key: 'healthcare',
    name: 'Healthcare & Life Sciences',
    title: 'Healthcare & Life Sciences',
    description:
      'Agentic AI accelerators for healthcare and pharma — automating clinical workflows, accelerating patient services and ensuring regulatory compliance across the care continuum.',
    benefits: [
      {
        metric: '50%',
        label: 'Handling time reduction',
        body: 'Patient inquiry and case resolution acceleration',
      },
      {
        metric: '40%',
        label: 'Escalation reduction',
        body: 'Through AI-driven first-contact resolution',
      },
      {
        metric: '+2pt',
        label: 'NPS improvement',
        body: 'Patient satisfaction uplift from faster, consistent service',
      },
      {
        metric: '8 mo',
        label: 'Time to market',
        body: 'For AI-first healthcare platform deployment',
      },
    ],
  },
  {
    key: 'retail',
    name: 'Retail & Consumer Goods',
    title: 'Retail & Consumer Goods',
    description:
      'Agentic AI accelerators for retail and CPG — powering hyper-personalization, demand intelligence and autonomous merchandising across the entire customer lifecycle.',
    benefits: [
      {
        metric: '25\u201340%',
        label: 'Segmentation accuracy',
        body: 'Improvement in customer targeting precision',
      },
      {
        metric: '60%',
        label: 'Content creation reduction',
        body: 'Effort saved through AI-generated product content',
      },
      {
        metric: '20%',
        label: 'Campaign efficiency uplift',
        body: 'Through AI-driven audience and channel optimization',
      },
      {
        metric: '15%',
        label: 'Revenue uplift',
        body: 'From personalized offers and basket optimization',
      },
    ],
  },
]

const tabs: {
  key: TabKey
  label: string
  tagline: string
  agents: Agent[]
}[] = [
  {
    key: 'technical',
    label: 'Technical Agents',
    tagline: 'Accelerate the entire product lifecycle',
    agents: technical,
  },
  {
    key: 'horizontal',
    label: 'Horizontal Agents',
    tagline: 'Solve problems across the enterprise',
    agents: horizontal,
  },
  {
    key: 'vertical',
    label: 'Vertical Agents',
    tagline: 'Solve specific industry problems',
    agents: vertical,
  },
]

export default function Agents() {
  const [activeTab, setActiveTab] = useState<TabKey>('technical')
  const active = tabs.find((t) => t.key === activeTab) ?? tabs[0]
  const [activeKey, setActiveKey] = useState<string>(active.agents[0].key)

  const selectTab = (key: TabKey) => {
    setActiveTab(key)
    const next = tabs.find((t) => t.key === key) ?? tabs[0]
    setActiveKey(next.agents[0].key)
  }

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '')
      const prefix = 'agents-'
      if (!hash.startsWith(prefix)) return
      const key = hash.slice(prefix.length) as TabKey
      if (tabs.some((t) => t.key === key)) {
        selectTab(key)
      }
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const activeAgent =
    active.agents.find((a) => a.key === activeKey) ?? active.agents[0]

  return (
    <section id="agents" className="relative bg-bg py-20 md:py-28 scroll-mt-20">
      {/* Hash anchors — enable deep-linking into a specific tab */}
      <span id="agents-technical" aria-hidden className="absolute top-0 scroll-mt-20" />
      <span id="agents-horizontal" aria-hidden className="absolute top-0 scroll-mt-20" />
      <span id="agents-vertical" aria-hidden className="absolute top-0 scroll-mt-20" />

      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="eyebrow mb-4">Agents</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            AI-driven agents for{' '}
            <span className="text-white/55">every workflow</span>
          </h2>
          <p className="text-white/65 text-base md:text-lg leading-relaxed mt-6">
            Agents orchestrated by Vahue AI Hub optimize every workflow —
            from quality assurance and IT support to risk, underwriting and
            retail merchandising — delivering faster outcomes, reduced
            effort and smarter automation.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div
            role="tablist"
            aria-label="Agent type"
            className="inline-flex flex-wrap gap-1 md:gap-1.5 p-1 rounded-full border border-border-soft bg-white/[0.03]"
          >
            {tabs.map((t) => {
              const isActive = t.key === activeTab
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectTab(t.key)}
                  className={`whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-bg shadow-[0_0_0_1px_rgba(255,255,255,0.2)]'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="sm:hidden">
                    {t.label.replace(' Agents', '')}
                  </span>
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Split: left list + right preview */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-start">
          {/* Agent list */}
          <nav
            aria-label="Agents in this category"
            className="lg:sticky lg:top-28"
          >
            <p
              key={active.key}
              className="font-mono text-[11px] uppercase tracking-widest text-white/55 mb-4 lg:mb-5 text-center lg:text-left lg:pl-5"
            >
              {active.tagline}
            </p>
            <ul className="flex lg:flex-col gap-1 lg:gap-0 overflow-x-auto lg:overflow-visible scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0 lg:border-l lg:border-border-soft">
              {active.agents.map((a) => {
                const isActive = a.key === activeKey
                return (
                  <li key={a.key} className="shrink-0 lg:w-full">
                    <button
                      type="button"
                      onClick={() => setActiveKey(a.key)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative whitespace-nowrap lg:whitespace-normal text-left py-3 lg:py-3.5 lg:pl-5 pr-4 lg:pr-3 text-sm md:text-[15px] font-medium transition-colors duration-200 w-full ${
                        isActive
                          ? 'text-white'
                          : 'text-white/55 hover:text-white/80'
                      }`}
                    >
                      <span
                        className={`hidden lg:block absolute left-[-1px] top-2 bottom-2 w-[2px] rounded-full transition-all duration-200 ${
                          isActive ? 'bg-white' : 'bg-transparent'
                        }`}
                        aria-hidden="true"
                      />
                      {a.name}
                      <span
                        className={`lg:hidden block h-[2px] mt-2 rounded-full transition-all duration-200 ${
                          isActive ? 'bg-white' : 'bg-transparent'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Preview */}
          <AgentPreview agent={activeAgent} />
        </div>
      </div>
    </section>
  )
}

function AgentPreview({ agent }: { agent: Agent }) {
  return (
    <article
      key={agent.key}
      className="relative rounded-3xl border border-border-soft bg-surface p-6 md:p-10 overflow-hidden"
    >
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(132,52,233,0.45) 0%, rgba(3,137,244,0.25) 55%, transparent 80%)',
        }}
      />
      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-widest text-white/55 mb-3">
          {agent.title}
        </p>
        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-3xl mb-8 md:mb-10">
          {agent.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {agent.benefits.map((b) => (
            <BenefitCard key={b.label} benefit={b} />
          ))}
        </div>
      </div>
    </article>
  )
}

function BenefitCard({ benefit }: { benefit: Benefit }) {
  return (
    <div className="relative rounded-2xl border border-border-mid overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, #0b1a4d 0%, #0f1238 45%, #1a0d3c 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-70 mix-blend-screen"
        style={{
          background:
            'radial-gradient(80% 80% at 100% 100%, rgba(132,52,233,0.25) 0%, transparent 60%)',
        }}
      />
      <div className="relative p-5 md:p-6">
        <p
          className="font-display text-3xl md:text-4xl font-semibold leading-none tracking-tight"
          style={{
            background:
              'linear-gradient(90deg, #c8b8ff 0%, #7edfd2 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {benefit.metric}
        </p>
        <p className="text-white text-sm md:text-[15px] font-semibold mt-4 leading-snug">
          {benefit.label}
        </p>
        <p className="text-white/60 text-[12px] md:text-[13px] leading-relaxed mt-1.5">
          {benefit.body}
        </p>
      </div>
    </div>
  )
}
