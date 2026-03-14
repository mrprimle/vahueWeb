import Link from 'next/link'

const services = [
  {
    title: 'Agentic AI Automations',
    description:
      'Turn automation into measurable ROI with adaptive, conversational AI chatbots and agentic AI systems that understand context, act autonomously within guardrails, and evolve with your business needs.',
    href: '/automations',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="svc-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
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
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
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
    href: '#contact',
    isAnchor: true,
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="svc-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path stroke="url(#svc-grad-3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'AI SEO',
    description:
      'Reach millions of clients who are using AI to discover new products and brands.',
    href: '#contact',
    isAnchor: true,
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="svc-grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path stroke="url(#svc-grad-4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-16 md:py-24 lg:py-28 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-semibold uppercase tracking-wider text-base mb-3 gradient-text-animated">
            Enterprise-ready AI
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4 leading-tight">
            Struggling to turn fragmented AI
            <br className="hidden md:block" /> advancements into real ROI?
          </h2>
          <p className="text-[#86868b] text-base md:text-lg max-w-2xl mx-auto">
            Your AI journey isn&apos;t one-size-fits-all. We meet you where you
            are and take you further.
          </p>
        </div>

        {/* Service Cards — 4 in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => {
            const inner = (
              <div className="card-neu h-full group">
                <div className="card-neu-inner flex flex-col min-h-[340px]">
                  <div className="mb-5 pointer-events-none">{service.icon}</div>
                  <h3 className="text-lg md:text-xl font-bold text-dark mb-2 pointer-events-none">
                    {service.title}
                  </h3>
                  <p className="text-[#86868b] text-sm leading-relaxed mb-auto pointer-events-none">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
            )

            if (service.isAnchor) {
              return (
                <a key={service.title} href={service.href} className="block">
                  {inner}
                </a>
              )
            }

            return (
              <Link key={service.title} href={service.href} className="block">
                {inner}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
