'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface Testimonial {
  id: string
  type: 'video' | 'text'
  name: string
  role: string
  quote: string
  avatar: string
  video?: string
  column: number
}

// Testimonial data
const testimonials: Testimonial[] = [
  // Column 1
  {
    id: 'eugene-walden',
    type: 'video',
    name: 'Eugene Walden',
    role: 'Founder & CTO of Madefire',
    quote: 'Vahue quickly provided top talent who became key to our team. Reliable, responsive, and a pleasure to work with!',
    avatar: '/img/testimonials/jacob_berg.webp',
    video: '/img/testimonials/reviewSizeShort.mp4',
    column: 1,
  },
  {
    id: 'chad-willard',
    type: 'text',
    name: 'Chad Willard',
    role: 'CEO at Straddle',
    quote: 'Their speed and professionalism are really impressive',
    avatar: '/img/testimonials/chad_willard.webp',
    column: 1,
  },
  {
    id: 'patrik-dvorak',
    type: 'text',
    name: 'Patrik Dvořák',
    role: 'CEO, SECTOR 31 s.r.o.y',
    quote: 'Vahue\'s responsiveness and accuracy were impressive. We highly recommend them',
    avatar: '/img/testimonials/patrik_dvorak.webp',
    column: 1,
  },
  {
    id: 'philipp-lenz',
    type: 'text',
    name: 'Philipp Lenz',
    role: 'Co-Founder, parloo.de',
    quote: "There are a lot of companies that offer similar services but we've had an end-to-end good experience with them.",
    avatar: '/img/testimonials/gilles_clement.webp',
    column: 1,
  },
  // Column 2
  {
    id: 'jacob-berg',
    type: 'text',
    name: 'Jacob Berg',
    role: 'CTO at Social Curator',
    quote: 'I appreciated the level of comfort Vahue made us feel. It was like being a part of a family.',
    avatar: '/img/testimonials/jacob_berg.webp',
    column: 2,
  },
  {
    id: 'george-winkler',
    type: 'text',
    name: 'Georg Winkler',
    role: 'CEO, Xpertify',
    quote: 'The different and very profound skillset of the Vahue team was very impressive.',
    avatar: '/img/testimonials/george_winkler.webp',
    column: 2,
  },
  {
    id: 'prasanna-elvis',
    type: 'text',
    name: 'Prasanna Elvis Eswara',
    role: 'Principal Consultant, Roost Digital',
    quote: 'They were proactive and seemed eager to build a relationship.',
    avatar: '/img/testimonials/prasanna_elvis.webp',
    column: 2,
  },
  {
    id: 'chad-willard-2',
    type: 'text',
    name: 'Chad Willard',
    role: 'CEO at Straddle',
    quote: 'Their speed and professionalism are really impressive',
    avatar: '/img/testimonials/chad_willard.webp',
    column: 2,
  },
  // Column 3
  {
    id: 'bartek-czerwinski',
    type: 'text',
    name: 'Bartek Czerwinski',
    role: 'CTO, Quik',
    quote: 'Vahue has the ability to dive in and get the work done creatively with a lot of personal input.',
    avatar: '/img/testimonials/bartek_cherwinski.webp',
    column: 3,
  },
  {
    id: 'steinar-aas',
    type: 'text',
    name: 'Steinar Aas',
    role: 'CEO & Co-Founder at Asio AS',
    quote: 'Their flexibility and genuine interest in finding the best solution for the product was impressive.',
    avatar: '/img/testimonials/steinar_aas.webp',
    column: 3,
  },
  {
    id: 'patrik-dvorak-2',
    type: 'text',
    name: 'Patrik Dvořák',
    role: 'CEO, SECTOR 31 s.r.o.y',
    quote: 'They are young, talented, and extremely smart developers.',
    avatar: '/img/testimonials/patrik_dvorak.webp',
    column: 3,
  },
  {
    id: 'george-winkler-2',
    type: 'text',
    name: 'Georg Winkler',
    role: 'CEO, Xpertify',
    quote: 'The different and very profound skillset of the team was very impressive.',
    avatar: '/img/testimonials/george_winkler.webp',
    column: 3,
  },
]

// Text card component
function TextCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="border border-[#F4F5F6] rounded-[32px] p-3 bg-[#F4F5F680] mb-4 h-full">
      {/* Inner white card with shadow */}
      <div className="bg-white rounded-[24px] p-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] h-full flex flex-col">
        {/* Avatar and info */}
        <div className="flex items-center gap-3 mb-5">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-[#1d1d1f] text-lg">{testimonial.name}</h4>
            <p className="text-gray-500 text-sm">{testimonial.role}</p>
          </div>
        </div>
        
        {/* Quote */}
        <p className="text-[#1d1d1f] text-[17px] leading-[1.6] mb-8 font-normal flex-grow">
          {testimonial.quote}
        </p>
        
        {/* Clutch and link */}
        <div className="flex items-center justify-between">
          <Image
            src="/img/testimonials/clutch_logo.svg"
            alt="Clutch"
            width={80}
            height={24}
            className="h-6 w-auto"
          />
          <a 
            href="https://clutch.co/profile/pletava" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/img/testimonials/testimonialLink.svg"
              alt="View on Clutch"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

// Video card component
function VideoCard({ testimonial, onPlay }: { testimonial: Testimonial, onPlay: () => void }) {
  return (
    <div className="border border-[#F4F5F6] rounded-[32px] p-3 bg-[#F4F5F680] mb-4 h-full">
      <div className="rounded-[24px] overflow-hidden shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] h-full flex flex-col">
        {/* Video thumbnail */}
        <div className="relative aspect-[4/3] cursor-pointer bg-gray-200" onClick={onPlay}>
          <video
            src={testimonial.video}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
          
          {/* Play button - light glass */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-colors shadow-lg">
              <svg className="w-7 h-7 text-white drop-shadow-md -ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          
          {/* Name overlay - light glass bubble */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-gray-600/35 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg">
              <h4 className="font-semibold text-white text-base">{testimonial.name}</h4>
              <p className="text-white text-sm">{testimonial.role}</p>
            </div>
          </div>
        </div>
        
        {/* Quote section - solid blue */}
        <div className="p-5 bg-[#4A90E2] flex items-end justify-between gap-4">
          <p className="text-white text-[17px] leading-[1.5] flex-1 font-normal">
            {testimonial.quote}
          </p>
          <a 
            href="https://clutch.co/profile/pletava" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/img/testimonials/testimonialLink.svg"
              alt="View on Clutch"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

// Video Modal
function VideoModal({ isOpen, onClose, videoSrc }: { isOpen: boolean, onClose: () => void, videoSrc: string }) {
  if (!isOpen) return null
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Video */}
        <video
          src={videoSrc}
          controls
          autoPlay
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  )
}

// Animated Column
function AnimatedColumn({ 
  testimonials, 
  speed, 
  onVideoPlay 
}: { 
  testimonials: Testimonial[], 
  speed: number,
  onVideoPlay: (video: string) => void 
}) {
  const [isPaused, setIsPaused] = useState(false)
  
  // Duplicate items for seamless loop
  const items = [...testimonials, ...testimonials]
  
  return (
    <div 
      className="relative h-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="animate-scroll-up"
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {items.map((testimonial, index) => (
          testimonial.type === 'video' ? (
            <VideoCard 
              key={`${testimonial.id}-${index}`} 
              testimonial={testimonial} 
              onPlay={() => onVideoPlay(testimonial.video || '')}
            />
          ) : (
            <TextCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
          )
        ))}
      </div>
    </div>
  )
}

// Mobile Slider - uses native scroll for smooth mobile experience
function MobileSlider({ testimonials, onVideoPlay }: { testimonials: Testimonial[], onVideoPlay: (video: string) => void }) {
  return (
    <div 
      className="flex gap-4 overflow-x-auto scrollbar-hide px-6 select-none items-stretch snap-x snap-mandatory"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="flex-shrink-0 w-[300px] flex snap-start">
          {testimonial.type === 'video' ? (
            <VideoCard testimonial={testimonial} onPlay={() => onVideoPlay(testimonial.video || '')} />
          ) : (
            <TextCard testimonial={testimonial} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [videoModal, setVideoModal] = useState<string | null>(null)
  
  const column1 = testimonials.filter(t => t.column === 1)
  const column2 = testimonials.filter(t => t.column === 2)
  const column3 = testimonials.filter(t => t.column === 3)

  return (
    <section id="testimonials" className="bg-[#141414] scroll-mt-20">
      <div className="bg-white rounded-t-[2.5rem] md:rounded-t-[3rem] py-16 md:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-semibold uppercase tracking-wider text-base md:text-lg mb-3 gradient-text-animated">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f]">
              What our clients say
            </h2>
          </div>
        </div>

        {/* Desktop: 3 animated columns */}
        <div className="hidden lg:block relative">
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
          
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-3 gap-6 h-[700px] overflow-hidden">
              <AnimatedColumn 
                testimonials={column1} 
                speed={25} 
                onVideoPlay={setVideoModal}
              />
              <AnimatedColumn 
                testimonials={column2} 
                speed={30} 
                onVideoPlay={setVideoModal}
              />
              <AnimatedColumn 
                testimonials={column3} 
                speed={35} 
                onVideoPlay={setVideoModal}
              />
            </div>
          </div>
        </div>

        {/* Mobile: Draggable row */}
        <div className="lg:hidden">
          <MobileSlider testimonials={testimonials} onVideoPlay={setVideoModal} />
        </div>
      </div>
      
      {/* Video Modal */}
      <VideoModal 
        isOpen={!!videoModal} 
        onClose={() => setVideoModal(null)} 
        videoSrc={videoModal || ''} 
      />
    </section>
  )
}
