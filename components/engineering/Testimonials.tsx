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
    <div className="rounded-3xl border border-border-soft bg-surface p-6 mb-4 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-5">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={56}
          height={56}
          className="w-12 h-12 rounded-full object-cover border border-border-mid"
        />
        <div>
          <h4 className="font-semibold text-white text-base">{testimonial.name}</h4>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest">{testimonial.role}</p>
        </div>
      </div>

      <p className="text-white/85 text-[15px] leading-[1.6] mb-6 flex-grow">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border-soft">
        <Image
          src="/img/testimonials/clutch_logo.svg"
          alt="Clutch"
          width={80}
          height={24}
          className="h-5 w-auto opacity-70 brightness-0 invert"
        />
        <a
          href="https://clutch.co/profile/pletava"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full border border-border-mid flex items-center justify-center text-white/60 hover:text-white hover:border-border-strong transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </div>
  )
}

// Video card component
function VideoCard({ testimonial, onPlay }: { testimonial: Testimonial, onPlay: () => void }) {
  return (
    <div className="rounded-3xl border border-border-mid bg-surface overflow-hidden mb-4 h-full flex flex-col">
      {/* Video thumbnail */}
      <div className="relative aspect-[4/3] cursor-pointer bg-black" onClick={onPlay}>
        <video
          src={testimonial.video}
          className="w-full h-full object-cover opacity-90"
          muted
          playsInline
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30">
            <svg className="w-6 h-6 text-white -ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-3 left-3">
          <div className="bg-black/60 backdrop-blur-md rounded-2xl px-3.5 py-2 border border-white/10">
            <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
            <p className="text-white/70 text-xs">{testimonial.role}</p>
          </div>
        </div>
      </div>

      {/* Quote section */}
      <div className="p-5 bg-gradient-to-br from-[#0389f4]/15 to-[#8434e9]/15 flex items-end justify-between gap-4 flex-grow">
        <p className="text-white/90 text-[15px] leading-[1.55] flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <a
          href="https://clutch.co/profile/pletava"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-bg transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
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
    <section id="testimonials" className="relative py-20 md:py-28 scroll-mt-20">
      <div>
        <div className="w-full max-w-wide mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-12 md:mb-16 max-w-2xl">
            <p className="eyebrow mb-4">Testimonials</p>
            <h2 className="text-display font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
            Our clients said it best.
            </h2>
          </div>
        </div>

        {/* Desktop: 3 animated columns */}
        <div className="hidden lg:block relative">
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg to-transparent z-10 pointer-events-none" />

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />
          
          <div className="w-full max-w-wide mx-auto px-6 md:px-8">
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
