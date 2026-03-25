'use client'

import { useEffect, useRef, useState } from 'react'

const painItems = [
  {
    pain: 'Slow & Costly Development',
    solutions: [
      {
        title: 'AI Software Delivery',
        description:
          'AI delivers the most value when it is applied intentionally within the software development lifecycle (SDLC). We embed AI into selected SDLC stages or across the full process to accelerate delivery, improve cost efficiency, and catch quality or security issues early, adjusting the balance between human-led and AI-native development based on your project requirements.',
      },
      {
        title: 'Competency Reinforcement',
        description:
          'Sustainable AI adoption depends on skills evolving alongside technology. We support continuous learning through our tech academy and internal L&D, and provide tailored upskilling programs for both tech and non-tech teams when deeper capability building is needed.',
      },
    ],
  },
  {
    pain: 'Context-Blind AI',
    solutions: [
      {
        title: 'Operation-Aware Design',
        description:
          'AI systems ensure value when they are grounded in how data is produced, decisions are made, and outcomes are measured in real environments. By designing around domain context and operational realities, AI solutions remain usable, trustworthy, and effective beyond initial deployment.',
      },
      {
        title: 'Custom AI Development',
        description:
          'Tailored AI solutions are often essential when off-the-shelf models cannot accommodate specific data, constraints, or operating conditions. Time-series analytics, computer vision, NLP, RPA, and more — our team is ready to build a product aligned with your strategic business goals and industry standards.',
      },
    ],
  },
  {
    pain: 'Data Quality Issues',
    solutions: [
      {
        title: 'Data Readiness by Design',
        description:
          'Data quality is an ongoing condition shaped by sources, workflows, and governance. By addressing bias, access, and provenance early, and by working with specialized data partners where needed, data pipelines remain usable, trustworthy, and ready to support AI systems over time.',
      },
      {
        title: 'Responsible Data Solutions',
        description:
          'Reliable AI depends on data that is consistent, accessible, and fit for its intended use. We design and build data pipelines — from lightweight to enterprise-grade — that handle cleaning, labeling, and structuring with the right level of rigor.',
      },
    ],
  },
  {
    pain: 'Security, Compliance & Trust Risks',
    solutions: [
      {
        title: 'Responsible Data Practices',
        description:
          'Handling sensitive data responsibly is a prerequisite for deploying AI systems that can be trusted in real operations. With ISO 27001 certification and GDPR compliance, we apply responsible data handling, security-first frameworks, and robust access control.',
      },
      {
        title: 'Diverse & Inclusive Teams',
        description:
          'AI outcomes are shaped by the assumptions built into data, models, and design decisions. To deliver our artificial intelligence solutions, we involve experts with varied backgrounds and perspectives to help debias and broaden your space for innovation.',
      },
    ],
  },
]

export default function PainRecognition() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#0a0a14] py-16 md:py-24 lg:py-28">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div
          className={`mb-12 md:mb-16 max-w-3xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4">
            Struggling to turn scattered AI experiments into real ROI?
          </h2>
          <p className="text-white text-base md:text-lg max-w-2xl">
            We turn fragmented AI tools into structured workflows, data-connected automations, and agentic systems that cut costs and increase speed and output.
          </p>
        </div>

        {/* Interactive Layout: Left pain list + Right solution detail */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-0 rounded-2xl overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
        >
          {/* Left: Pain Points list */}
          <div className="bg-white/[0.03] border-r border-white/[0.06] p-8 md:p-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white mb-6">
              Pain Points
            </h3>
            <div className="flex flex-col gap-1">
              {painItems.map((item, index) => (
                <button
                  key={item.pain}
                  onClick={() => setActiveIndex(index)}
                  className={`text-left py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                    activeIndex === index
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span
                    className={`transition-colors ${
                      activeIndex === index ? 'text-[#0389f4]' : 'text-white'
                    }`}
                  >
                    &rarr;
                  </span>
                  <span className="text-base font-semibold">{item.pain}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Solution detail */}
          <div className="bg-white/[0.02] p-8 md:p-10 lg:p-12">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white mb-8">
              Our Solution
            </h3>
            <div className="space-y-8">
              {painItems[activeIndex].solutions.map((solution) => (
                <div key={solution.title}>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {solution.title}
                  </h4>
                  <p className="text-white text-sm md:text-base leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
