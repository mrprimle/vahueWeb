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
    id: 'clutch-ai-2025',
    image: '/img/awards/AI_Strategy_hero.png',
    title: 'Top AI Strategy Company 2025',
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
    <section className="bg-bg border-y border-border-soft">
      <div className="py-16 md:py-20">
        <div className="w-full max-w-wide mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10 md:mb-12">
            <div>
              <p className="eyebrow mb-2">Awards</p>
              <h2 className="text-display font-display text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Proud moments.
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3">
              {canScrollLeft && (
                <button
                  onClick={() => scroll('left')}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-border-mid bg-surface hover:bg-surface-2 text-white flex items-center justify-center transition-all"
                  aria-label="Scroll left"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={() => scroll('right')}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-border-mid bg-surface hover:bg-surface-2 text-white flex items-center justify-center transition-all"
                  aria-label="Scroll right"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Slider Container with fade edges */}
        <div className="w-full max-w-wide mx-auto px-6 md:px-8">
          <div className="relative">
            <div
              className={`absolute left-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none transition-opacity ${
                canScrollLeft ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <div
              className={`absolute right-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none transition-opacity ${
                canScrollRight ? 'opacity-100' : 'opacity-0'
              }`}
            />

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
                  <div className="bg-surface border border-border-soft rounded-2xl p-4 h-[140px] md:h-[160px] flex items-center justify-center mb-3 pointer-events-none">
                    <Image
                      src={award.image}
                      alt={award.title}
                      width={120}
                      height={120}
                      className="max-w-[100px] max-h-[100px] md:max-w-[120px] md:max-h-[120px] object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                      draggable={false}
                    />
                  </div>

                  <p className="text-white/75 text-xs md:text-sm text-center leading-snug pointer-events-none">
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
