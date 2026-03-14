'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const plates = [
  {
    id: 'insight',
    icon: '/img/rocketIcon.svg',
    title: 'Deep Business Insight',
    description: 'We carry FAANG and Stanford DNA within us, which enables us to tackle even the most complex matters in record time and understand business needs down to the finest detail.',
    borderRadius: 'rounded-3xl',
  },
  {
    id: 'talent',
    icon: '/img/crownIcon.svg',
    title: 'Top 1% of talent',
    description: `We don't spray-and-pray CVs.
You're matched with one or more engineers from our in-house team of AI-Native self-managed senior engineers with proven cross-domain expertise.

If the perfect match isn't immediately available, we tap into our network of 175k+ Eastern Europe's top engineers — hiring exceptional, domain-fit talent in under two weeks.`,
    borderRadius: 'rounded-3xl rounded-tr-[7.5rem]',
  },
  {
    id: 'ai-native',
    icon: '/img/estimatesIcon.svg',
    title: 'Supercharged by AI',
    description: 'Vahue AI Unit — our in-house AI-native team where AI speed meets senior-level orchestration to deliver production-grade quality and security at extraordinary speed and cost efficiency that human teams alone can\'t match.',
    borderRadius: 'rounded-3xl rounded-tr-[7.5rem]',
    fullWidth: true,
  },
]

export default function QualityPlates() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleSelectAINative = () => {
      setActiveIndex(2) // AI-Native is at index 2
    }
    
    window.addEventListener('selectAINative', handleSelectAINative)
    return () => window.removeEventListener('selectAINative', handleSelectAINative)
  }, [])

  return (
    <section id="benefits-section" className="bg-white">
      {/* Dark section with rounded bottom corners */}
      <div className="bg-[#141414] py-6 md:py-8">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Left side - 3 Plates: 2 on top, 1 spanning bottom */}
            <div className="grid grid-cols-2 gap-4">
            {plates.map((plate, index) => (
              <div
                key={plate.id}
                onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                className={`
                    relative p-5 md:p-6 cursor-pointer transition-all duration-300 border
                  ${plate.borderRadius}
                    ${plate.fullWidth ? 'col-span-2' : ''}
                  ${activeIndex === index 
                      ? 'bg-[#334155] border-[#475569]' 
                      : 'bg-[#1e2530] border-[#2a3340] hover:bg-[#2d3a4a] hover:border-[#3d4f63]'
                  }
                `}
              >
                  {/* Icon - 1.5x bigger */}
                  <div className="mb-5 md:mb-6">
                    <Image
                      src={plate.icon}
                      alt=""
                      width={72}
                      height={72}
                      className="w-16 h-16 md:w-[72px] md:h-[72px]"
                    />
                </div>
                
                  {/* Title - 2x bigger */}
                <h3 className="text-white font-semibold text-xl md:text-2xl leading-tight">
                  {plate.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Right side - Active plate details */}
            <div className="bg-[#334155] border border-[#475569] rounded-3xl p-8 lg:p-10 flex flex-col justify-between min-h-[320px]">
              {/* Title at the top */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-animated-teal pb-4" style={{ lineHeight: '1.4' }}>
              {plates[activeIndex].title}
            </h2>
            
              {/* Description */}
              <p className="text-white text-lg md:text-xl leading-relaxed whitespace-pre-line">
                {plates[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
