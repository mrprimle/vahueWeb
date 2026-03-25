const items = [
  {
    title: 'AI Maturity Assessment Framework',
    description:
      'To assess your readiness across technology, data, and people, creating a hyper-personalized roadmap.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="why-grad-0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0389f4" />
            <stop offset="100%" stopColor="#8434e9" />
          </linearGradient>
        </defs>
        <path stroke="url(#why-grad-0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    title: 'Outcome-Focused Delivery',
    description:
      'We wire agents into real tools, APIs, apps, and data, and measure task completion. Iterative releases improve accuracy, latency, and cost, turning pilots into stable, production-ready operations.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="why-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0389f4" />
            <stop offset="100%" stopColor="#8434e9" />
          </linearGradient>
        </defs>
        <path stroke="url(#why-grad-1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: 'Domain Expertise',
    description:
      'Work with engineers who know HealthTech, GreenTech, and EdTech. We adapt agent behaviors to your regulations, processes, and risk profile, so results land in real workflows.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="why-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0389f4" />
            <stop offset="100%" stopColor="#8434e9" />
          </linearGradient>
        </defs>
        <path stroke="url(#why-grad-2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Secure by Design',
    description:
      "Security isn't an add-on. We build with enhanced governance, compliance, and control baked in from Day One, meeting SOC2, GDPR, and HIPAA standards.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="why-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0389f4" />
            <stop offset="100%" stopColor="#8434e9" />
          </linearGradient>
        </defs>
        <path stroke="url(#why-grad-3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
]

export default function WhatSetsUsApart() {
  return (
    <section id="why-us" className="bg-white py-16 md:py-24 lg:py-28 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            Why companies choose Vahue
          </h2>
          <p className="text-[#86868b] text-base md:text-lg max-w-2xl mx-auto">
            One partner for strategy, training, engineering, and automation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item.title} className="card-neu h-full">
              <div className="card-neu-inner flex flex-col min-h-[280px]">
                <div className="mb-6">{item.icon}</div>
                <div className="mt-auto">
                  <h3 className="text-lg md:text-xl font-bold text-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#86868b] text-sm leading-relaxed">
                    {item.description}
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
