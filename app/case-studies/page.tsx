import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContactCards from '@/components/ContactCards'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore our portfolio of successful AI and software development projects. See how Vahue helps companies build innovative solutions.',
  openGraph: {
    title: 'Case Studies | Vahue',
    description: 'Explore our portfolio of successful AI and software development projects.',
    url: 'https://vahue.ai/case-studies',
  },
}

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
      text: "I've managed a number of outsourcing relationships in my career, and they've really stood out to me. Vahue has worked diligently to understand our goals.",
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
      text: "As the Founder and CEO of LUCA Learning Platform, my vision was to create a transformative reading experience for students with dyslexia.",
      author: 'Scott Sosso',
      role: 'Founder of LUCA.ai',
      avatar: '/img/cases/lucaaiAvatar.png',
    },
    href: '/case-studies/luca',
  },
]

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#3b82f6] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-[#1d1d1f]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold text-white">{rating.toFixed(1)}</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-[#38BDF8]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-white font-medium">Clutch</span>
    </div>
  )
}

export default function CaseStudiesPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Case Studies' },
          ]} />
          <div className="mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] mb-4">Case Studies</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              Explore how we&apos;ve helped companies build innovative software solutions and achieve their goals.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {caseStudies.map((caseStudy) => (
              <Link key={caseStudy.id} href={caseStudy.href} className="group block relative rounded-3xl overflow-hidden min-h-[380px]">
                <div className="absolute inset-0">
                  <Image src={caseStudy.bgImage} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
                </div>
                <div className="relative z-10 p-8 md:p-10 lg:p-12 h-full flex flex-col">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8 flex-1">
                    <div className="flex-1 max-w-xl">
                      <p className="text-white text-sm md:text-base font-medium mb-2 tracking-wide">{caseStudy.company}</p>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-[#3B82F6] transition-colors">{caseStudy.title}</h2>
                      <div className="flex items-center gap-2 text-white/70 mb-3">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                        <span className="text-sm md:text-base">{caseStudy.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 text-xs font-medium text-white/90 border border-white/30 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="lg:flex-shrink-0 lg:w-[240px] xl:w-[280px]">
                      <div className="relative overflow-hidden rounded-xl">
                        <Image src={caseStudy.resultImage} alt={`${caseStudy.company} result`} width={280} height={200} className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-6">
                    <StarRating rating={caseStudy.rating} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <ContactCards />
    </>
  )
}
