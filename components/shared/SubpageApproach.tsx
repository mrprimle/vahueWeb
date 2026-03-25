'use client'

interface Step {
  title: string
  description: string
}

interface SubpageApproachProps {
  title?: string
  subtitle?: string
  frameworkName?: string
  steps: Step[]
}

export default function SubpageApproach({
  title = 'Our Approach',
  subtitle,
  frameworkName,
  steps,
}: SubpageApproachProps) {
  return (
    <section id="approach" className="bg-white py-16 md:py-24 lg:py-28 scroll-mt-20">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14 md:mb-20">
          {frameworkName && (
            <p className="font-semibold uppercase tracking-wider text-sm mb-3 gradient-text-animated">
              {frameworkName}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#86868b] text-base md:text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-[#e5e7eb]" />

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-6 ${
              steps.length <= 4
                ? 'md:grid-cols-4'
                : steps.length === 5
                ? 'md:grid-cols-5'
                : 'md:grid-cols-3 lg:grid-cols-6'
            }`}
          >
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="relative z-10 w-14 h-14 rounded-full bg-dark flex items-center justify-center mb-5">
                  <span className="text-white text-lg font-bold">{index + 1}</span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-dark/50 text-sm leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
