import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ContactCards from '@/components/ContactCards'

// Case study data
const caseStudies: Record<string, {
  company: string
  title: string
  location: string
  tags: string[]
  rating: number
  bgImage: string
  resultImage: string
  testimonial?: {
    text: string
    author: string
    role: string
    avatar: string
  }
  overview: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
}> = {
  'audi': {
    company: 'AUDI',
    title: "Revolutionizing automation testing and CI/CD for AUDI's myAudi systems",
    location: 'Germany',
    tags: ['AUTOMOTIVE', 'QA AUTOMATION', 'CI/CD'],
    rating: 5.0,
    bgImage: '/img/cases/audiBg.webp',
    resultImage: '/img/cases/audiResult.webp',
    overview: 'Vahue partnered with AUDI to transform their quality assurance processes for the myAudi digital ecosystem, implementing cutting-edge automation testing frameworks and streamlined CI/CD pipelines.',
    challenge: 'AUDI needed to modernize their testing infrastructure to keep pace with rapid development cycles. The existing manual testing processes were time-consuming and couldn\'t scale with the growing complexity of the myAudi platform.',
    solution: 'We implemented a comprehensive automation testing strategy using industry-leading tools and frameworks. Our team designed and built a robust CI/CD pipeline that integrated seamlessly with AUDI\'s existing development workflow, enabling faster deployments and higher code quality.',
    results: [
      '80% reduction in manual testing time',
      '50% faster release cycles',
      'Zero critical bugs in production post-implementation',
      'Automated test coverage increased to 85%',
    ],
    technologies: ['Selenium', 'Jenkins', 'Docker', 'Kubernetes', 'Python', 'TypeScript'],
  },
  'living-security': {
    company: 'Living Security',
    title: 'Gamified cybersecurity e-Learning web platform for Fortune 500 Enterprises',
    location: 'Austin, TX, USA',
    tags: ['E-LEARNING', 'CYBERSECURITY', 'GAMIFICATION'],
    rating: 5.0,
    bgImage: '/img/cases/LivingSecurityBg.webp',
    resultImage: '/img/cases/LivingSecurityResult.webp',
    testimonial: {
      text: "I've managed a number of outsourcing relationships in my career, and they've really stood out to me. Vahue has worked diligently to understand our goals. Based on this understanding, they've morphed their practices to fit our needs. WSY team work has directly contributed to our revenue growth. We've grown our ARR significantly since engaging with them.",
      author: 'Matt Ward',
      role: 'Director of Engineering at Living Security',
      avatar: '/img/cases/LivingSecurityAvatar.png',
    },
    overview: 'Living Security approached Vahue to build an innovative cybersecurity training platform that would engage enterprise employees through gamification while delivering measurable security awareness improvements.',
    challenge: 'Traditional cybersecurity training is often boring and ineffective. Living Security needed a platform that would not only educate employees about security threats but also keep them engaged and motivated to complete training modules.',
    solution: 'We developed a comprehensive e-learning platform featuring interactive games, simulations, and quizzes. The platform includes detailed analytics dashboards for enterprise administrators to track employee progress and identify security knowledge gaps.',
    results: [
      '95% employee engagement rate',
      '40% improvement in phishing test results',
      'Platform adopted by 50+ Fortune 500 companies',
      'Reduced security incidents by 60%',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Unity', 'GraphQL'],
  },
  'luca': {
    company: 'Luca.ai',
    title: 'AI-Powered Learning Platform Helping Children Overcome Dyslexia Challenges',
    location: 'Pennsylvania, United States',
    tags: ['EDUCATION', 'EDTECH', 'AI/ML'],
    rating: 5.0,
    bgImage: '/img/cases/lucaaiBg.webp',
    resultImage: '/img/cases/LucaaiResult.webp',
    testimonial: {
      text: "As the Founder and CEO of LUCA Learning Platform, my vision was to create a transformative reading experience for students with dyslexia. Inspired by my son, I wanted to make a difference in the lives of millions of children. This was more than a project; it was a dream that required the right team. That's when I found Vahue, and they exceeded all my expectations.",
      author: 'Scott Sosso',
      role: 'Founder of LUCA.ai',
      avatar: '/img/cases/lucaaiAvatar.png',
    },
    overview: 'LUCA.ai is an innovative AI-powered platform designed to help children with dyslexia improve their reading skills through personalized, adaptive learning experiences.',
    challenge: 'Dyslexia affects approximately 15-20% of the population, yet traditional educational tools often fail to address the unique learning needs of dyslexic students. LUCA.ai needed a platform that could adapt to each child\'s specific challenges and progress.',
    solution: 'We built an AI-driven learning platform that uses machine learning to analyze each student\'s reading patterns and adapt content accordingly. The platform includes voice recognition, interactive exercises, and progress tracking features designed specifically for dyslexic learners.',
    results: [
      '2x improvement in reading speed for users',
      '85% of parents reported improved confidence in their children',
      'Used by 10,000+ students across the US',
      'Featured in major education technology publications',
    ],
    technologies: ['React Native', 'Python', 'TensorFlow', 'Firebase', 'OpenAI', 'AWS'],
  },
}

// Breadcrumb component
function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#3b82f6] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1d1d1f]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl font-bold text-[#1d1d1f]">{rating.toFixed(1)}</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-[#38BDF8]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-[#1d1d1f] font-medium text-lg">Clutch</span>
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug,
  }))
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caseStudy = caseStudies[slug]

  if (!caseStudy) {
    notFound()
  }

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative min-h-[60vh] flex items-end">
          <div className="absolute inset-0">
            <Image
              src={caseStudy.bgImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium text-white/90 border border-white/30 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Company */}
            <p className="text-white/80 text-lg font-medium mb-2">
              {caseStudy.company}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
              {caseStudy.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-white/70">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-base">{caseStudy.location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: caseStudy.company },
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{caseStudy.overview}</p>
              </section>

              {/* Challenge */}
              <section>
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">The Challenge</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{caseStudy.challenge}</p>
              </section>

              {/* Solution */}
              <section>
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Our Solution</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{caseStudy.solution}</p>
              </section>

              {/* Results */}
              <section>
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-[#f5f5f7] rounded-xl">
                      <svg className="w-6 h-6 text-[#38BDF8] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#1d1d1f] font-medium">{result}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Testimonial */}
              {caseStudy.testimonial && (
                <section className="bg-gradient-to-br from-[#8b5cf6]/10 to-[#3b82f6]/10 rounded-3xl p-8 md:p-10">
                  <blockquote className="text-lg md:text-xl text-[#1d1d1f] leading-relaxed mb-6 italic">
                    &ldquo;{caseStudy.testimonial.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <Image
                      src={caseStudy.testimonial.avatar}
                      alt={caseStudy.testimonial.author}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#1d1d1f]">{caseStudy.testimonial.author}</p>
                      <p className="text-gray-500 text-sm">{caseStudy.testimonial.role}</p>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Result Image */}
              <div className="bg-[#f5f5f7] rounded-2xl p-6">
                <Image
                  src={caseStudy.resultImage}
                  alt={`${caseStudy.company} result`}
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Rating */}
              <div className="bg-[#f5f5f7] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#1d1d1f] mb-4">Client Rating</h3>
                <StarRating rating={caseStudy.rating} />
              </div>

              {/* Technologies */}
              <div className="bg-[#f5f5f7] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#1d1d1f] mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-medium text-[#1d1d1f] bg-white rounded-full border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#1d1d1f] rounded-2xl p-6 text-center">
                <h3 className="text-lg font-bold text-white mb-2">Ready to start your project?</h3>
                <p className="text-white/70 text-sm mb-4">Let&apos;s discuss how we can help.</p>
                <Link
                  href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3b82f6] text-white rounded-full font-medium hover:bg-[#2563eb] transition-colors text-sm"
                >
                  Schedule a Call
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ContactCards />
    </>
  )
}
