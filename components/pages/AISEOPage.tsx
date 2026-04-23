'use client'

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
   1. HERO
   ═══════════════════════════════════════════════════════ */
function AISEOHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-dark overflow-hidden">
      {/* Atmospheric background layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(94,234,212,0.07) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 30% 70%, rgba(94,234,212,0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
          Get Found Where AI&nbsp;Recommends
        </h1>
        <p className="text-white/50 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Over 100&nbsp;million people ask AI for recommendations every day.
          If your brand doesn&apos;t appear in those answers, you&apos;re invisible
          to a fast-growing audience.
        </p>
        <Link
          href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white text-dark font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
        >
          Book an AI Visibility Audit
        </Link>
      </div>

      {/* Stat bar */}
      <div className="relative z-10 w-full pb-16 md:pb-20">
        <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-white/10">
            {[
              { value: '100M+', label: 'daily AI searches' },
              { value: 'Only 13%', label: 'of brands appear in AI answers' },
              { value: '3x', label: 'higher conversion from AI referrals' },
            ].map((stat) => (
              <div key={stat.value} className="text-center px-4">
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   3. SERVICES — 3 neumorphism cards
   ═══════════════════════════════════════════════════════ */
const services = [
  {
    title: 'AI Search Audit & Visibility Score',
    description:
      'Measure how and whether your brand appears when AI assistants answer queries in your category.',
    deliverables: [
      'Brand visibility report across ChatGPT, Gemini, Claude, Perplexity',
      'Competitor visibility benchmarks',
      'Gap analysis with prioritized fix list',
    ],
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-audit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <circle cx="11" cy="11" r="7" stroke="url(#grad-audit)" strokeWidth={1.4} />
        <path d="M21 21l-4.35-4.35" stroke="url(#grad-audit)" strokeWidth={1.4} strokeLinecap="round" />
        <path d="M8 11h6M11 8v6" stroke="url(#grad-audit)" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'AI-Optimized Content Strategy',
    description:
      'Content creation and restructuring designed to increase your brand\u2019s citation rate in AI-generated responses.',
    deliverables: [
      'Content calendar targeting high-volume AI queries',
      '10\u201320 optimized content pieces per month',
      'Monthly visibility tracking',
    ],
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-content-seo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path d="M4 4h16v16H4z" stroke="url(#grad-content-seo)" strokeWidth={1.4} rx="2" />
        <path d="M8 8h8M8 12h5" stroke="url(#grad-content-seo)" strokeWidth={1.2} strokeLinecap="round" />
        <path d="M14 14l3 3" stroke="url(#grad-content-seo)" strokeWidth={1.2} strokeLinecap="round" />
        <circle cx="15.5" cy="15.5" r="2" stroke="url(#grad-content-seo)" strokeWidth={1.2} />
      </svg>
    ),
  },
  {
    title: 'AI Agent Analytics & Monitoring',
    description:
      'Continuous tracking of how AI crawlers and models interpret, index, and represent your brand.',
    deliverables: [
      'Real-time monitoring dashboard',
      'Crawler behavior analysis',
      'Monthly strategic recommendations',
    ],
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="grad-monitor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="url(#grad-monitor)" strokeWidth={1.4} />
        <path d="M7 17l3-4 3 2 4-6" stroke="url(#grad-monitor)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="9" r="1.5" fill="url(#grad-monitor)" />
      </svg>
    ),
  },
]

function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 md:py-28 lg:py-36 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark text-center mb-14 md:mb-20">
          What We Do
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service) => (
            <div key={service.title} className="card-neu">
              <div className="card-neu-inner flex flex-col min-h-[440px]">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#e8eef4] flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-dark mb-2">
                  {service.title}
                </h3>
                <p className="text-[#86868b] text-sm leading-relaxed mb-auto">
                  {service.description}
                </p>
                <div className="mt-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-dark/40 mb-3">
                    Deliverables
                  </p>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[#86868b] text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4]/60 mt-1.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
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
   7. STATS
   ═══════════════════════════════════════════════════════ */
const statsData = [
  { value: '100M+', label: 'people search with AI daily' },
  { value: '13%', label: 'of brands appear in AI answers' },
  { value: '3x', label: 'higher conversion from AI referrals' },
]

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
   9. CASE STUDIES — Coming Soon
   ═══════════════════════════════════════════════════════ */
function CaseStudiesPlaceholder() {
  return (
    <section id="cases" className="bg-white py-20 md:py-28 lg:py-36 scroll-mt-20">
      <div className="w-full max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            Case Studies
          </h2>
        </div>

        <div className="bg-[#f3f4f6] rounded-3xl p-8 md:p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-dark/5 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-dark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-dark/60 text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto">
            Our first AI SEO case studies are in progress. Book a call to learn
            about early results.
          </p>
          <Link
            href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-dark text-white font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-dark/90 transition-colors"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════════════ */
export default function AISEOPage() {
  return (
    <>
      {/* 1. Hero */}
      <AISEOHero />

      {/* 2. Benefits */}
      <SubpageBenefits
        title="What changes when AI recommends you"
        benefits={[
          {
            title: 'From invisible to recommended',
            description:
              'Your brand appears when ChatGPT, Gemini, Claude, and Perplexity answer questions in your category.',
          },
          {
            title: 'From guessing to measuring',
            description:
              'Know exactly how AI models perceive your brand \u2014 visibility scores, sentiment, and competitive benchmarks.',
          },
          {
            title: 'From traditional SEO to AI-first',
            description:
              'AI search is a fundamentally different channel. We optimize for how LLMs select and cite sources.',
          },
          {
            title: 'From missed traffic to new pipeline',
            description:
              'Turn AI-generated recommendations into measurable leads, signups, and revenue.',
          },
        ]}
      />

      {/* 3. Services */}
      <ServicesSection />

      {/* 4. Approach */}
      <SubpageApproach
        title="How we make AI recommend you"
        steps={[
          {
            title: 'Audit',
            description:
              'Map your current AI visibility across all major models and compare to competitors',
          },
          {
            title: 'Benchmark',
            description:
              'Score your brand\u2019s presence, sentiment, and citation rate vs your category',
          },
          {
            title: 'Optimize',
            description:
              'Restructure content, metadata, and digital footprint for AI discoverability',
          },
          {
            title: 'Monitor',
            description:
              'Track changes in real-time as models update and competitors adapt',
          },
          {
            title: 'Scale',
            description:
              'Expand to new queries, models, and markets as the channel grows',
          },
        ]}
      />

      {/* 5. Why Us */}
      <SubpageWhyUs
        title="Why companies choose Vahue for AI SEO"
        items={[
          {
            title: 'First movers',
            description:
              'We\u2019ve been optimizing for AI search since before most companies knew it existed. Early expertise = compounding advantage.',
          },
          {
            title: 'Data-driven, not guesswork',
            description:
              'Real visibility scores, real competitor benchmarks, real citation tracking. Every recommendation is backed by data.',
          },
          {
            title: 'Ongoing, not one-time',
            description:
              'AI models update constantly. We monitor your visibility continuously and adapt your strategy in real-time.',
          },
          {
            title: 'Cross-model coverage',
            description:
              'ChatGPT, Gemini, Claude, Perplexity, Copilot \u2014 we track and optimize across all major AI platforms.',
          },
        ]}
      />

      {/* 6. Industries */}
      <SubpageIndustries />

      {/* 7. Stats */}
      <StatsSection />

      {/* 8. Founder + CTA */}
      <FounderCTA />

      {/* 9. Case Studies — Coming Soon */}
      <CaseStudiesPlaceholder />

      {/* 10. Blog */}
      <BlogSection />

      {/* 11. Contact Form */}
      <ContactContainer />

      {/* 12. FAQ */}
      <SubpageFAQ
        items={[
          {
            q: 'What is AI SEO?',
            a: 'AI SEO is the practice of optimizing your brand\u2019s visibility in AI-generated answers. When someone asks ChatGPT \u201CWhat\u2019s the best tool for X?\u201D, AI SEO determines whether your brand appears in that answer.',
          },
          {
            q: 'How is this different from traditional SEO?',
            a: 'Traditional SEO optimizes for search engine result pages. AI SEO optimizes for how large language models select, summarize, and cite sources. Different algorithms, different strategies.',
          },
          {
            q: 'Which AI platforms do you cover?',
            a: 'We track and optimize across ChatGPT, Google Gemini, Anthropic Claude, Perplexity, Microsoft Copilot, and other major AI assistants.',
          },
          {
            q: 'How long before we see results?',
            a: 'Initial visibility improvements typically appear within 4\u20138 weeks. Sustained growth builds over 3\u20136 months as content compounds.',
          },
          {
            q: 'Can you prove ROI?',
            a: 'Yes. We track visibility scores, citation rates, and when possible, referral traffic and conversions from AI-generated recommendations.',
          },
        ]}
      />
    </>
  )
}
