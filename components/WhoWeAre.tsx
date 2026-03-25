'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '100+', label: 'people trained' },
  { value: '20+', label: 'companies transformed' },
  { value: '9.4/10', label: 'average workshop rating' },
  { value: '96%', label: 'AI adoption in 7 days' },
]

export default function WhoWeAre() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="results" className="bg-[#141414] py-16 md:py-20 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : '0ms' }}
            >
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-animated leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-white text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
