import Link from 'next/link'

const industries = [
  {
    name: 'E-commerce',
    description: 'Personalize every touchpoint — from AI-driven product recommendations and virtual try-on tools to automated content creation. Reduce cart abandonment, increase AOV, and deliver shopping experiences that convert.',
    href: '/ai-native-engineering/industries/ecommerce',
  },
  {
    name: 'FinTech',
    description: 'Detect fraud in real time, automate credit scoring and compliance reporting, and personalize financial products for each customer. Agents correlate KYC, risk, and behavior signals with least-privilege access and full audit trails.',
    href: '/ai-native-engineering/industries/fintech',
  },
  {
    name: 'HealthTech',
    description: 'Support clinicians with AI that organizes records, surfaces clinical guidelines, and forecasts patient outcomes. Automate scheduling, prior authorizations, and follow-ups — all with human-in-the-loop checks and strict data safeguards.',
    href: '/ai-native-engineering/industries/healthtech',
  },
  {
    name: 'Manufacturing',
    description: 'Detect defects early, predict maintenance windows, and stabilize production flows. Agents analyze sensor streams and maintenance logs to reduce downtime, lower waste, and improve throughput — always within defined safety thresholds.',
    href: '/ai-native-engineering/industries/manufacturing',
  },
]

interface SubpageIndustriesProps {
  title?: string
  subtitle?: string
}

export default function SubpageIndustries({
  title = 'We Know Your Industry. We Build for It.',
  subtitle = "Technology alone doesn't solve industry challenges. That's why we lead with domain expertise. Our teams combine sector knowledge with engineering precision to deliver industry-native solutions.",
}: SubpageIndustriesProps) {
  return (
    <section id="industries" className="bg-white py-16 md:py-24 lg:py-28 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#86868b] text-base md:text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {industries.map((industry) => (
            <Link
              key={industry.name}
              href={industry.href}
              className="block group"
            >
              <div className="card-neu h-full">
                <div className="card-neu-inner flex flex-col min-h-[200px]">
                  <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-[#86868b] text-sm leading-relaxed mb-auto">
                    {industry.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
