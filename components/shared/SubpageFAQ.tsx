'use client'

import { useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

interface SubpageFAQProps {
  items: FAQItem[]
  title?: string
}

export default function SubpageFAQ({ items, title = 'Frequently Asked Questions' }: SubpageFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-white py-16 md:py-24 lg:py-28 scroll-mt-20">
      <div className="w-full max-w-3xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark text-center mb-12 md:mb-16">
          {title}
        </h2>
        <div className="divide-y divide-dark/10">
          {items.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
              >
                <span className="text-base md:text-lg font-medium text-dark pr-8 group-hover:text-dark/70 transition-colors">
                  {item.q}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full border border-dark/15 flex items-center justify-center transition-transform ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  <svg className="w-4 h-4 text-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <p className="text-[#86868b] text-sm leading-relaxed pr-12">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
