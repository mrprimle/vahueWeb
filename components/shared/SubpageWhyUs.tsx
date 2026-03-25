interface WhyUsItem {
  title: string
  description: string
}

interface SubpageWhyUsProps {
  title?: string
  subtitle?: string
  items: WhyUsItem[]
}

export default function SubpageWhyUs({
  title = 'Why companies choose Vahue',
  subtitle,
  items,
}: SubpageWhyUsProps) {
  return (
    <section id="why-us" className="bg-white py-16 md:py-24 lg:py-28 scroll-mt-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-bg-gray rounded-2xl md:rounded-3xl p-8 md:p-10 flex flex-col min-h-[280px]"
            >
              <div className="mb-auto">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                  />
                </svg>
              </div>
              <div className="mt-auto">
                <h3 className="text-lg md:text-xl font-bold text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
