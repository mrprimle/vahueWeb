'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ContactCards from '@/components/ContactCards'

/* ─── HERO ─── */
function TeamsHero() {
  const logos = ['epic growth', 'LANCET', 'SMSTRETCHING', 'nubes']

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #f97316 0%, #ea580c 25%, #dc2626 45%, #f59e0b 65%, #84cc16 85%, #22d3ee 100%)',
        }}
      />
      <div className="absolute inset-0 backdrop-blur-[80px]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 60%, rgba(249,115,22,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(234,179,8,0.3) 0%, transparent 50%)',
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Big headline */}
            <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold text-white leading-[1.05] tracking-tight">
              Train Your Team in AI and Streamline Routine Work
            </h1>

            {/* Right: Description + CTA */}
            <div>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-10">
                We help companies integrate artificial intelligence into their
                everyday operations, reduce manual workload, and increase
                efficiency from day one.
              </p>

              <Link
                href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-dark font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/90 transition-colors w-full"
              >
                Let&apos;s Talk Strategy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By */}
      <div className="relative z-10 pb-16 md:pb-20">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <p className="text-white/40 text-sm mb-6">Trusted by</p>
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {logos.map((name) => (
              <span
                key={name}
                className="text-white/50 text-lg md:text-xl font-bold tracking-wide"
                style={{
                  fontStyle: name === 'SMSTRETCHING' ? 'italic' : 'normal',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── RESULTS IN NUMBERS ─── */
const resultsStats = [
  {
    value: '2500+', description: 'Specialists trained',
    icon: <svg className="w-5 h-5 text-dark/25" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>,
  },
  {
    value: '9.4/10', description: 'Average participant satisfaction',
    icon: <svg className="w-5 h-5 text-dark/25" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
  },
  {
    value: '96%', description: 'of employees started using AI tools within 7 days after the training',
    icon: <svg className="w-5 h-5 text-dark/25" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>,
  },
]

function ResultsInNumbers() {
  return (
    <section id="results" className="bg-white py-20 md:py-28 lg:py-36">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6 leading-tight">
              Results in Numbers
            </h2>
            <p className="text-dark/60 text-base md:text-lg leading-relaxed">
              We&apos;ve helped businesses make AI a working tool — not just a buzzword.
            </p>
          </div>
          <div className="flex flex-col">
            {resultsStats.map((stat, index) => (
              <div key={index} className="min-h-[28vh] md:min-h-[35vh] flex flex-col justify-center">
                <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-[#ea580c] leading-[0.9] mb-4 tracking-tight">
                  {stat.value}
                </p>
                <div className="flex items-start gap-3 max-w-sm">
                  <span className="[&>svg]:w-8 [&>svg]:h-8">{stat.icon}</span>
                  <p className="text-dark/40 text-base md:text-lg leading-relaxed">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── OUR PRODUCTS (draggable carousel like Pletava) ─── */
const products = [
  {
    title: 'AI Diagnostics',
    description: 'Quick audit of tasks, teams, and processes.',
    bullets: ['Up to 30% increase in process efficiency', 'Faster pilot launch and implementation', 'Tailored AI roadmap for your business'],
    icon: <svg className="w-10 h-10 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>,
  },
  {
    title: 'Intro AI Workshops',
    description: 'Immersive sessions on GenAI tools and business use cases.',
    bullets: ['Clear explanations + guided practice', 'Learn from real-world examples', 'Understand how to apply AI in daily tasks'],
    icon: <svg className="w-10 h-10 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
  },
  {
    title: 'AI Skills for Teams',
    description: 'Practical training to integrate AI into everyday workflows.',
    bullets: ['Build AI literacy across roles and teams', 'Learn prompt design and automation', 'Develop a shared AI culture in your company'],
    icon: <svg className="w-10 h-10 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
  },
  {
    title: 'Executive AI Consulting',
    description: '1:1 strategic AI sessions for C-level leaders and decision-makers.',
    bullets: ['Identify and prioritize high-impact AI opportunities', 'Align AI strategy with business objectives', 'Accelerate implementation across departments'],
    icon: <svg className="w-10 h-10 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>,
  },
  {
    title: 'AI Advisor for CEO and Top Teams',
    description: 'Individual AI navigation track: from strategies to simulations and real-time solutions.',
    bullets: ['The top team speaks a single AI "language"', 'Managers have proven tools for analysis and planning', 'Real scenarios for using AI in business', 'Personal support for strategic decisions'],
    icon: <svg className="w-10 h-10 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>,
  },
]

function OurProducts() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Drag refs (Pletava pattern — refs for no-delay)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollStartRef = useRef(0)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 1)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -380 : 380, behavior: 'smooth' })
    }
  }

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
    scrollRef.current.scrollLeft = scrollStartRef.current - (e.pageX - startXRef.current)
  }
  const handleMouseUp = () => {
    isDraggingRef.current = false
    setIsDragging(false)
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = ''
  }
  const handleMouseLeave = () => {
    if (isDraggingRef.current) { isDraggingRef.current = false; setIsDragging(false); if (scrollRef.current) scrollRef.current.style.scrollBehavior = '' }
  }

  return (
    <section id="products" className="bg-white py-16 md:py-24 lg:py-28 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark">Our Products</h2>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scroll('left')} disabled={!canScrollLeft} className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${canScrollLeft ? 'border-dark/20 hover:border-dark/40 text-dark/60' : 'border-dark/10 text-dark/20 cursor-not-allowed'}`} aria-label="Scroll left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button onClick={() => scroll('right')} disabled={!canScrollRight} className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${canScrollRight ? 'border-dark/20 hover:border-dark/40 text-dark/60' : 'border-dark/10 text-dark/20 cursor-not-allowed'}`} aria-label="Scroll right">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="relative">
          {/* Fade edges */}
          <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onScroll={checkScroll}
            className={`flex gap-5 overflow-x-auto scrollbar-hide select-none snap-x snap-mandatory md:snap-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {products.map((product) => (
              <div key={product.title} className="flex-shrink-0 w-[300px] md:w-[340px] snap-start">
                <div className="card-neu h-full">
                  <div className="card-neu-inner flex flex-col min-h-[420px]">
                    <div className="mb-5 pointer-events-none">{product.icon}</div>
                    <h3 className="text-lg md:text-xl font-bold text-dark mb-2 pointer-events-none">{product.title}</h3>
                    <p className="text-[#86868b] text-sm leading-relaxed mb-auto pointer-events-none">{product.description}</p>
                    <ul className="mt-8 space-y-2.5 pointer-events-none">
                      {product.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#86868b] text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]/40 mt-1.5 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CLIENT CASES (dark glassmorphism) ─── */
function ClientCases() {
  return (
    <section id="cases" className="bg-white scroll-mt-20">
      <div className="section-dark-top py-16 md:py-24 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16">Client Cases</h2>
          <div className="card-glass">
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 lg:gap-12">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Client</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">Wealth Management Company</h3>
              </div>
              <div>
                <div className="mb-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Objective</p>
                  <p className="text-white/70 text-base leading-relaxed">The goal was to integrate AI tools into everyday work across all roles and increase overall productivity.</p>
                </div>
                <div className="mb-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Results</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { v: '85%', d: 'of employees use AI tools daily in workflows' },
                      { v: '70%', d: 'of routine queries resolved via GPT assistant within the first 2 weeks' },
                      { v: '5 min', d: 'average response time reduced from 1 hour to 5 minutes' },
                      { v: '52', d: 'ready-to-use prompts created for key scenarios (finance, presale, legal, HR)' },
                      { v: '12', d: 'AI agents deployed for quality, sales, finance, and executive dashboards' },
                      { v: '100%', d: 'prompts reviewed for data security compliance' },
                    ].map((r, i) => (
                      <div key={i} className="border-t border-white/10 pt-4">
                        <p className="text-2xl md:text-3xl font-bold text-white mb-1">{r.v}</p>
                        <p className="text-white/40 text-sm leading-relaxed">{r.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Stack</p>
                  <p className="text-white/40 text-sm leading-relaxed">ChatGPT Enterprise, n8n, Cursor, RAGDB (vector database), Power BI + Bloomberg GPT, Miro, Whisper / Coqui</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── WHAT PARTICIPANTS GET (neumorphism on light-from-dark) ─── */
const participantBenefits = [
  { title: '20% theory / 80% hands-on practice', description: "You'll learn by doing — using your actual tasks and documents, not simulations.", icon: <svg className="w-8 h-8 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg> },
  { title: 'Mentorship & expert feedback', description: 'Ongoing support from experienced AI strategists. We stay involved beyond the workshop.', icon: <svg className="w-8 h-8 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg> },
  { title: 'Expert-curated prompt libraries & use cases', description: "Ready-to-use, field-tested prompts and AI workflows — adapted to your team's goals.", icon: <svg className="w-8 h-8 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg> },
  { title: 'Your own AI agents', description: 'Participants build personalized GPT-powered agents for real tasks — emails, reports, CRM, analytics.', icon: <svg className="w-8 h-8 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg> },
  { title: 'Transformation plans & templates', description: 'Each team leaves with a ready-to-implement roadmap, including automation ideas, role guidelines, and tools.', icon: <svg className="w-8 h-8 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
  { title: 'Bonus resources pack', description: 'Access to exclusive guides, databases, agent templates, and industry benchmarks to keep growing after the program.', icon: <svg className="w-8 h-8 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg> },
]

function WhatParticipantsGet() {
  return (
    <section className="bg-[#141414]">
      <div className="section-light-top py-16 md:py-24 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">What Participants Get</h2>
            <p className="text-[#86868b] text-base md:text-lg max-w-2xl mx-auto">We don&apos;t teach &ldquo;AI theory&rdquo; We help teams transform how they work.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
            {participantBenefits.map((item) => (
              <div key={item.title} className="text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-base md:text-lg font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-[#86868b] text-sm leading-relaxed max-w-xs mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── OUR TEAM (with Pletava founder image) ─── */
function OurTeam() {
  return (
    <section id="team" className="bg-white py-16 md:py-24 lg:py-28">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-12 md:mb-16">Our Team</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="card-neu">
            <div className="card-neu-inner grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-center">
              <div className="relative w-[200px] h-[260px] md:w-[240px] md:h-[320px] rounded-2xl overflow-hidden">
                <Image src="/img/mikecut.avif" alt="Founder" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-dark mb-1">Mike Doroshenko</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-[#86868b] mb-6">Founder, Product Strategist, AI Consultant</p>
                <p className="text-[#86868b] text-sm leading-relaxed">10+ years of experience in digital product strategy and AI transformation. Author of corporate training programs used by leading companies.</p>
              </div>
            </div>
          </div>
          <div className="card-neu">
            <div className="card-neu-inner flex flex-col justify-center">
              <svg className="w-10 h-10 text-[#ea580c] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
              <p className="text-lg md:text-xl font-bold text-dark mb-2">Supported by 30+ experts</p>
              <p className="text-[#86868b] text-sm leading-relaxed">from McKinsey, Google, and top tech companies.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
const faqItems = [
  { q: 'How is Vahue different from agencies or large consulting firms?', a: 'We combine deep AI expertise with hands-on implementation. Unlike large firms, we work directly with your team, not through layers of consultants. Our programs are practical, not theoretical.' },
  { q: 'What kind of problems do you solve?', a: 'We help teams automate routine tasks, build AI-powered workflows, improve decision-making with data, and develop internal AI competency across all departments.' },
  { q: 'Can your programs be adapted to my industry?', a: "Absolutely. We customize every program based on your industry, team structure, and specific business challenges. We've worked with finance, healthcare, e-commerce, legal, and many more." },
  { q: 'How much time will the training take for my team?', a: "It depends on the format. A workshop takes 1-2 days, while a full training program runs 2-4 weeks. We design schedules that minimize disruption to your team's daily work." },
  { q: 'How do you measure results?', a: 'We track AI adoption rates, time savings, productivity improvements, and participant satisfaction scores. Every program includes clear KPIs and post-training assessment.' },
  { q: 'Is it safe for company data?', a: 'Yes. We follow strict data security protocols and teach your team best practices for using AI tools safely. All prompts and workflows are reviewed for compliance.' },
  { q: 'Who will I work with directly?', a: "You'll work directly with our founder and senior AI strategists. No junior consultants or account managers — just experienced practitioners." },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section id="faq" className="bg-white py-16 md:py-24 lg:py-28 scroll-mt-20">
      <div className="w-full max-w-3xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark text-center mb-12 md:mb-16">Frequently Asked Questions</h2>
        <div className="divide-y divide-dark/10">
          {faqItems.map((item, index) => (
            <div key={index}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between py-5 md:py-6 text-left group">
                <span className="text-base md:text-lg font-medium text-dark pr-8 group-hover:text-dark/70 transition-colors">{item.q}</span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-dark/15 flex items-center justify-center transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>
                  <svg className="w-4 h-4 text-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                <p className="text-[#86868b] text-sm leading-relaxed pr-12">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── EXPORT ─── */
export default function TeamsPage() {
  return (
    <>
      <TeamsHero />
      <ResultsInNumbers />
      <OurProducts />
      <ClientCases />
      <WhatParticipantsGet />
      <OurTeam />
      <FAQ />
      <ContactCards />
    </>
  )
}
