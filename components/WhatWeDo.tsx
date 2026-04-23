import Link from 'next/link'

const services = [
  {
    title: 'AI Training for Teams',
    description:
      'AI programs, consulting, and strategy sessions for teams ready to bring AI into their everyday work.',
    cta: 'Team Training',
    href: '/team-training',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path stroke="url(#grad1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Custom AI automations',
    description:
      'End-to-end AI solutions tailored to your business needs.',
    cta: 'Custom AI Automations',
    href: '/automations',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path stroke="url(#grad2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
]

export default function WhatWeDo() {
  return (
    <section id="products" className="bg-white py-16 md:py-24 lg:py-28">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark text-center mb-12 md:mb-16">
          What we do
        </h2>

        {/* Service Cards — Neumorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.title} className="card-neu">
              <div className="card-neu-inner flex flex-col min-h-[380px] md:min-h-[440px]">
                {/* Icon */}
                <div className="mb-6">{service.icon}</div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-dark mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#86868b] text-sm md:text-base leading-relaxed mb-auto">
                  {service.description}
                </p>

                {/* CTA Button */}
                <div className="mt-8">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 bg-primary text-white font-mono text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all"
                  >
                    {service.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
