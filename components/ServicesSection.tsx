// import Link from 'next/link'

const services = [
  {
    title: 'Team Training',
    description:
      'Talent agility is now essential — pushing organizations to continuously rebalance their human and AI workforce to unlock the full potential of every employee.',
    href: '/teams',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="svc-grad-0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0389f4" />
            <stop offset="100%" stopColor="#8434e9" />
          </linearGradient>
        </defs>
        <path stroke="url(#svc-grad-0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: 'Agentic AI Automations',
    description:
      'Turn automation into measurable ROI with adaptive, conversational AI chatbots and agentic AI systems that understand context, act autonomously within guardrails, and evolve with your business needs.',
    href: '/automations',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="svc-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0389f4" />
            <stop offset="100%" stopColor="#8434e9" />
          </linearGradient>
        </defs>
        <path stroke="url(#svc-grad-1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'AI-Native Engineering',
    description:
      'The next evolution of engineering is here: building and scaling AI-native, agentic ways of working across the software development life cycle to enable high-performance teams.',
    href: '/ai-native-engineering',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="svc-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0389f4" />
            <stop offset="100%" stopColor="#8434e9" />
          </linearGradient>
        </defs>
        <path stroke="url(#svc-grad-2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: 'Predictive Analysis & GenAI',
    description:
      'From time-series forecasting platforms to advanced modelling tools, we build predictive analytics software that turns data into insights and helps your team make confident decisions.',
    href: '/automations',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="svc-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0389f4" />
            <stop offset="100%" stopColor="#8434e9" />
          </linearGradient>
        </defs>
        <path stroke="url(#svc-grad-3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: 'AI SEO',
    description:
      'Reach millions of clients who are using AI to discover new products and brands.',
    href: '/ai-seo',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="svc-grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0389f4" />
            <stop offset="100%" stopColor="#8434e9" />
          </linearGradient>
        </defs>
        <path stroke="url(#svc-grad-4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-dark scroll-mt-20 overflow-hidden">
      {/* Texture + glow */}
      <div className="absolute inset-0 hero-texture opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(255, 78, 10, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(255, 162, 0, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 lg:py-28">
        {/* Header */}
        <div className="mb-12 md:mb-14">
          <p className="font-semibold uppercase tracking-wider text-sm mb-4 gradient-text-animated">
            Enterprise-ready AI
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4 max-w-3xl">
            Your AI journey isn&apos;t one-size-fits-all. We meet you where you are and take you further.
          </h2>
          <p className="text-white text-base md:text-lg max-w-2xl">
            Redefine your company: innovate, operate and outpace your competitors in the era of AI.
          </p>
        </div>

        {/* Bento Grid: Row 1 — 2 large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {services.slice(0, 2).map((service) => (
            <div key={service.title} className="block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col min-h-[240px]">
                <div className="mb-5">{service.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white text-sm md:text-base leading-relaxed mb-auto">
                  {service.description}
                </p>
                {/* <div className="mt-6 flex items-center gap-2 text-[#0389f4] text-sm font-semibold">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Bento Grid: Row 2 — 3 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(2).map((service) => (
            <div key={service.title} className="block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col min-h-[260px]">
                <div className="mb-5">{service.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white text-sm leading-relaxed mb-auto">
                  {service.description}
                </p>
                {/* <div className="mt-6 flex items-center gap-2 text-[#0389f4] text-sm font-semibold">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
