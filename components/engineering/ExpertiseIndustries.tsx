'use client'

import { useState } from 'react'

interface BaseItem {
  id: string
  title: string
  description: string
  href: string
}

interface ExpertiseItem extends BaseItem {
  tags: string[]
}

interface IndustryItem extends BaseItem {
  tags?: never
}

const expertiseData: ExpertiseItem[] = [
  {
    id: 'ai-native',
    title: 'AI/ML',
    description: 'We build AI features that users actually adopt — copilots, automation workflows, retrieval systems, digital twins, and internal AI tools.',
    tags: ['OpenAI', 'Claude', 'OpenClaw', 'RAG', 'n8n', 'Cursor', 'Power BI', 'Miro', 'Whisper'],
    href: '/ai-native-engineering/expertise/ai-ml',
  },
  {
    id: 'high-load',
    title: 'High-Load Systems',
    description: 'Event-driven architectures, streaming pipelines, and backends that handle millions of operations. We build systems where latency and throughput actually matter.',
    tags: ['Kafka', 'Redis', 'Go', 'Rust', 'gRPC', 'WebSockets'],
    href: '/ai-native-engineering/expertise/high-load-systems',
  },
  {
    id: 'cloud-platform',
    title: 'Cloud',
    description: 'Internal developer platforms, Kubernetes at scale, and reliability engineering. We help teams ship faster with infrastructure that doesn\'t slow them down.',
    tags: ['Kubernetes', 'Terraform', 'AWS', 'GCP', 'ArgoCD', 'DevOps'],
    href: '/ai-native-engineering/expertise/cloud',
  },
  {
    id: 'data-ml-infra',
    title: 'Data Engineering',
    description: 'Your data team is drowning in maintenance. We build pipelines, analytics backends, and ML infrastructure that run reliably at scale — so your team can focus on insights, not firefighting.',
    tags: ['Spark', 'Airflow', 'dbt', 'Snowflake', 'MLflow', 'Ray'],
    href: '/ai-native-engineering/expertise/data-engineering',
  },
  {
    id: 'staff-founding',
    title: 'Team Extension',
    description: 'Senior engineers, staff engineers, and tech leads who integrate directly into your workflow. You manage priorities and keep product direction — we bring the expertise. No black-box outsourcing.',
    tags: ['React', 'TypeScript', 'Python', 'Node.js', 'PostgreSQL', 'Redis', 'Elixir', 'Nest', 'QA', 'iOS', 'Android'],
    href: '/ai-native-engineering/expertise/team-extension',
  },
  {
    id: 'secure-compliance',
    title: 'Security & Compliance',
    description: 'Payments infrastructure, identity platforms, and audit-ready architectures. We build systems where security and regulatory compliance are built in from day one.',
    tags: ['SOC 2', 'PCI DSS', 'OAuth/OIDC', 'Vault', 'Encryption'],
    href: '/ai-native-engineering/expertise/security-compliance',
  },
]

const industriesData: IndustryItem[] = [
  {
    id: 'ai-ml',
    title: 'AI & Data Engineering',
    description: 'From model training to production deployment, we build intelligent systems that actually ship. Data pipelines, LLM integrations, and ML infrastructure that scales.',
    href: '/ai-native-engineering/industries/ai-data-engineering',
  },
  {
    id: 'healthtech',
    title: 'HealthTech',
    description: 'We build compliant, secure platforms for clinical workflows, patient engagement, and medical data. Engineers who speak both code and healthcare.',
    href: '/ai-native-engineering/industries/healthtech',
  },
  {
    id: 'b2b-saas',
    title: 'B2B SaaS',
    description: 'Multi-tenant architectures, complex integrations, and workflow automation. We help vertical SaaS companies ship faster without compromising on depth.',
    href: '/ai-native-engineering/industries/b2b-saas',
  },
  {
    id: 'fintech',
    title: 'FinTech',
    description: 'Beyond generic banking apps — we specialize in reg-tech, crypto infrastructure, and niche financial products where compliance and precision are non-negotiable.',
    href: '/ai-native-engineering/industries/fintech',
  },
  {
    id: 'legaltech-insurtech',
    title: 'LegalTech & InsurTech',
    description: 'Document automation, claims processing, and contract intelligence systems. We help legal and insurance firms modernize operations without compromising on compliance.',
    href: '/ai-native-engineering/industries/legaltech-insurtech',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Property platforms, transaction systems, and marketplace solutions. We build PropTech that handles the messy reality of real estate operations.',
    href: '/ai-native-engineering/industries/real-estate',
  },
]

export default function ExpertiseIndustries() {
  const [activeTab, setActiveTab] = useState<'expertise' | 'industries'>('expertise')

  const currentData: (ExpertiseItem | IndustryItem)[] = activeTab === 'expertise' ? expertiseData : industriesData

  return (
    <section className="bg-[#141414]">
      <div className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] py-16 md:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          {/* Tabs */}
          <div className="flex gap-8 md:gap-16 mb-12 md:mb-16 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('expertise')}
              className={`relative pb-4 text-2xl md:text-3xl lg:text-4xl font-bold transition-colors ${
                activeTab === 'expertise'
                  ? 'text-[#1d1d1f]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Expertise
              {activeTab === 'expertise' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('industries')}
              className={`relative pb-4 text-2xl md:text-3xl lg:text-4xl font-bold transition-colors ${
                activeTab === 'industries'
                  ? 'text-[#1d1d1f]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Industries
              {activeTab === 'industries' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-full" />
              )}
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentData.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="group block bg-[#fafafa] border border-gray-200 rounded-2xl p-6 md:p-8 transition-all"
              >
                {/* Header: Title + Arrow */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  <svg
                    className="w-6 h-6 flex-shrink-0 text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#3B82F6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>

                {/* Description */}
                <p className="text-[#86868b] text-sm md:text-base leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Tags (only for expertise) */}
                {'tags' in item && item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-[#1d1d1f] bg-white border border-gray-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
