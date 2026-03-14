'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

const awards = [
  {
    id: 'top1-clutch',
    image: '/img/awards/top1clutch.webp',
    title: 'Top 1% on Clutch Global',
  },
  {
    id: 'clutch-ai-2024',
    image: '/img/awards/top_clutch.co_ai_strategy_company_2024.png',
    title: 'Top AI Strategy Company 2024',
  },
  {
    id: 'clutch-fall-2024',
    image: '/img/awards/clutch_fall_champion_2024.png',
    title: 'Clutch Fall Champion 2024',
  },
  {
    id: 'inc-5000',
    image: '/img/awards/Inc.-5000-Color-Medallion-Logo.png',
    title: 'Inc. 5000 Fastest Growing',
  },
  {
    id: 'best-web-dev',
    image: '/img/awards/best_web_dev.0b9f241f.svg',
    title: 'Best Web Development 2023',
  },
  {
    id: 'upwork-badge',
    image: '/img/awards/upwork.webp',
    title: 'Breakthrough of the Year 2019',
  },
  {
    id: 'ftc-badge',
    image: '/img/awards/FTC-Badge-Circle-White.svg',
    title: 'Member of Forbes Tech Council',
  },
  {
    id: 'voice-recognition-2024',
    image: '/img/awards/top_clutch.co_voice_and_speech_recognition_company_2024_award.png',
    title: 'Voice & Speech Recognition 2024',
  },
  {
    id: 'upwork-top',
    image: '/img/awards/upworktop.webp',
    title: 'Top Rated Plus on Upwork',
  },
  {
    id: 'blockchain-education-2024',
    image: '/img/awards/top_clutch.co_blockchain_company_education_2024.png',
    title: 'Top Blockchain Company 2024',
  },
  {
    id: 'payoneer',
    image: '/img/awards/payoneer.svg',
    title: 'Innovators of the Year 2019',
  },
  {
    id: 'goodfirms',
    image: '/img/awards/goodfirms.avif',
    title: 'GoodFirms Top Company',
  },
  {
    id: 'techreviewer',
    image: '/img/awards/techreviewer.svg',
    title: 'TechReviewer Top Company',
  },
]

export default function AwardsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const isAtStart = scrollLeft <= 1
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1
      setCanScrollLeft(!isAtStart)
      setCanScrollRight(!isAtEnd)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    // Initial check with a small delay to ensure content is rendered
    const timeoutId = setTimeout(checkScroll, 100)
    
    // Listen to scroll events
    el.addEventListener('scroll', checkScroll)
    
    // Listen to resize events
    window.addEventListener('resize', checkScroll)

    return () => {
      clearTimeout(timeoutId)
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  // Drag handlers - using refs for immediate response (no state delay)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollStartRef = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDraggingRef.current = true
    setIsDragging(true)
    startXRef.current = e.pageX
    scrollStartRef.current = scrollRef.current.scrollLeft
    scrollRef.current.style.scrollBehavior = 'auto'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return
    e.preventDefault()
    const walk = e.pageX - startXRef.current
    scrollRef.current.scrollLeft = scrollStartRef.current - walk
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    setIsDragging(false)
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = ''
    }
  }

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      setIsDragging(false)
      if (scrollRef.current) {
        scrollRef.current.style.scrollBehavior = ''
      }
    }
  }


  return (
    <section className="bg-[#141414]">
      <div className="py-16 md:py-20 pb-20 md:pb-24">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10 md:mb-12">
            <h2 className="text-sm md:text-base font-semibold tracking-widest uppercase text-white">
              Multiawarded company mentioned in global media
            </h2>
            
            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'border-[#475569] bg-[#1e2530] hover:bg-[#334155] text-white'
                    : 'border-[#2a3340] bg-[#1e2530]/50 text-white/30 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'border-[#475569] bg-[#1e2530] hover:bg-[#334155] text-white'
                    : 'border-[#2a3340] bg-[#1e2530]/50 text-white/30 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Slider Container with fade edges - scoped to content width */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="relative">
            {/* Left fade */}
            <div 
              className={`absolute left-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-r from-[#141414] to-transparent z-10 pointer-events-none transition-opacity ${
                canScrollLeft ? 'opacity-100' : 'opacity-0'
              }`} 
            />
            
            {/* Right fade */}
            <div 
              className={`absolute right-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-l from-[#141414] to-transparent z-10 pointer-events-none transition-opacity ${
                canScrollRight ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Scrollable content */}
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className={`flex gap-4 overflow-x-auto scrollbar-hide select-none snap-x snap-mandatory md:snap-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="flex-shrink-0 w-[160px] md:w-[180px] snap-start"
                >
                  {/* Award Card */}
                  <div className="bg-[#1e2530] border border-[#2a3340] rounded-xl p-4 h-[140px] md:h-[160px] flex items-center justify-center mb-3 pointer-events-none">
                    <Image
                      src={award.image}
                      alt={award.title}
                      width={120}
                      height={120}
                      className="max-w-[100px] max-h-[100px] md:max-w-[120px] md:max-h-[120px] object-contain"
                      draggable={false}
                    />
                  </div>
                  
                  {/* Award Title */}
                  <p className="text-white/80 text-xs md:text-sm text-center leading-snug font-medium pointer-events-none">
                    {award.title}
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
