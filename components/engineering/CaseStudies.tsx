'use client'

import Image from 'next/image'

const caseStudies = [
  {
    id: 'audi',
    company: 'AUDI',
    title: "Revolutionizing automation testing and CI/CD for AUDI's myAudi systems",
    location: 'Germany',
    tags: ['AUTOMOTIVE'],
    rating: 5.0,
    bgImage: '/img/cases/audiBg.webp',
    resultImage: '/img/cases/audiResult.webp',
    href: '/case-studies/audi',
  },
  {
    id: 'living-security',
    company: 'Living Security',
    title: 'Gamified cybersecurity e-Learning web platform for Fortune 500 Enterprises',
    location: 'Austin, TX, USA',
    tags: ['E-LEARNING', 'CYBERSECURITY'],
    rating: 5.0,
    bgImage: '/img/cases/LivingSecurityBg.webp',
    resultImage: '/img/cases/LivingSecurityResult.webp',
    testimonial: {
      text: "I've managed a number of outsourcing relationships in my career, and they've really stood out to me. Vahue has worked diligently to understand our goals. Based on this understanding, they've morphed their practices to fit our needs. WSY team work has directly contributed to our revenue growth. We've grown our...",
      author: 'Matt Ward',
      role: 'Director of Engineering at Living Security',
      avatar: '/img/cases/LivingSecurityAvatar.png',
    },
    href: '/case-studies/living-security',
  },
  {
    id: 'luca',
    company: 'Luca.ai',
    title: 'AI-Powered Learning Platform Helping Children Overcome Dyslexia Challenges',
    location: 'Pennsylvania, United States',
    tags: ['EDUCATION', 'EDTECH'],
    rating: 5.0,
    bgImage: '/img/cases/lucaaiBg.webp',
    resultImage: '/img/cases/LucaaiResult.webp',
    testimonial: {
      text: "As the Founder and CEO of LUCA Learning Platform, my vision was to create a transformative reading experience for students with dyslexia. Inspired by my son, I wanted to make a difference in the lives of millions of children. This was more than a project; it was a dream that required the right team. That's when I found...",
      author: 'Scott Sosso',
      role: 'Founder of LUCA.ai',
      avatar: '/img/cases/lucaaiAvatar.png',
    },
    href: '/case-studies/luca',
  },
]

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl md:text-3xl font-bold text-white">{rating.toFixed(1)}</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 md:w-6 md:h-6 text-[#38BDF8]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-white font-medium text-lg">Clutch</span>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="bg-white py-16 md:py-24 scroll-mt-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-1.5">
            CASE STUDIES
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-[#86868b] text-sm md:text-base">
              Our success stories. Yours could be a few clicks away.
            </p>
            <a
              href="/case-studies"
              className="group hidden md:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#3B82F6] transition-colors"
            >
              See More Cases
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Case Studies Cards */}
        <div className="flex flex-col gap-8">
          {caseStudies.map((caseStudy) => (
            <a
              key={caseStudy.id}
              href={caseStudy.href}
              className="group block relative rounded-3xl overflow-hidden min-h-[420px] md:min-h-[380px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={caseStudy.bgImage}
                  alt=""
                  fill
                  className="object-cover"
                />
                {/* Dark gradient overlay - light at top, dark at bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-10 lg:p-12">
                {/* Row 1: Content left, Result image right */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
                  {/* Left: Text Content */}
                  <div className="flex-1 max-w-xl">
                    {/* Company Name */}
                    <p className="text-white text-sm md:text-base font-medium mb-2 tracking-wide">
                      {caseStudy.company}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-[#3B82F6] transition-colors">
                      {caseStudy.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-white/70 mb-3">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span className="text-sm md:text-base">{caseStudy.location}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium text-white/90 border border-white/30 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Result Image - smaller */}
                  <div className="lg:flex-shrink-0 lg:w-[240px] xl:w-[280px]">
                    <div className="relative overflow-hidden rounded-xl">
                      <Image
                        src={caseStudy.resultImage}
                        alt={`${caseStudy.company} result`}
                        width={280}
                        height={200}
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Rating + Review left, Avatar right */}
                <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  {/* Left: Rating + Review */}
                  <div className="flex-1 max-w-2xl">
                    <StarRating rating={caseStudy.rating} />
                    
                    {/* Review text (if exists) */}
                    {caseStudy.testimonial && (
                      <p className="mt-3 text-white text-sm md:text-base leading-relaxed">
                        &ldquo;{caseStudy.testimonial.text}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Right: Avatar with name (if testimonial exists) */}
                  {caseStudy.testimonial && (
                    <div className="flex items-center gap-4 lg:flex-shrink-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20">
                        <Image
                          src={caseStudy.testimonial.avatar}
                          alt={caseStudy.testimonial.author}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          {caseStudy.testimonial.author}
                        </p>
                        <p className="text-white/60 text-sm">
                          {caseStudy.testimonial.role}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile: See More Cases Link */}
        <div className="md:hidden mt-8 text-center">
          <a
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#3B82F6] transition-colors"
          >
            See More Cases
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
