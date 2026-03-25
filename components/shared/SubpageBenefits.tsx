'use client'

interface Benefit {
  title: string
  description: string
}

interface SubpageBenefitsProps {
  title?: string
  subtitle?: string
  benefits: Benefit[]
}

export default function SubpageBenefits({
  title = 'What changes',
  subtitle,
  benefits,
}: SubpageBenefitsProps) {
  return (
    <section id="benefits" className="bg-white py-16 md:py-24 lg:py-28 scroll-mt-20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-bg-gray rounded-2xl md:rounded-3xl p-8 md:p-10 flex flex-col min-h-[240px]"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-auto">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="mt-auto">
                <h3 className="text-lg md:text-xl font-bold text-dark mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
