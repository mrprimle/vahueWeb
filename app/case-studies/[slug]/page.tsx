import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DISCOVERY_CALL_URL } from '@/lib/links'

type CaseStudy = {
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
}

const caseStudies: Record<string, CaseStudy> = {
  audi: {
    company: 'AUDI',
    title:
      "Revolutionizing automation testing and CI/CD for AUDI's myAudi systems",
    location: 'Germany',
    tags: ['AUTOMOTIVE', 'QA AUTOMATION', 'CI/CD'],
    rating: 5.0,
    bgImage: '/img/cases/audiBg.webp',
    resultImage: '/img/cases/audiResult.webp',
    overview:
      'Vahue partnered with AUDI to transform their quality assurance processes for the myAudi digital ecosystem, implementing cutting-edge automation testing frameworks and streamlined CI/CD pipelines.',
    challenge:
      "AUDI needed to modernize their testing infrastructure to keep pace with rapid development cycles. The existing manual testing processes were time-consuming and couldn't scale with the growing complexity of the myAudi platform.",
    solution:
      "We implemented a comprehensive automation testing strategy using industry-leading tools and frameworks. Our team designed and built a robust CI/CD pipeline that integrated seamlessly with AUDI's existing development workflow, enabling faster deployments and higher code quality.",
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
    title:
      'Gamified cybersecurity e-Learning web platform for Fortune 500 enterprises',
    location: 'Austin, TX, USA',
    tags: ['E-LEARNING', 'CYBERSECURITY', 'GAMIFICATION'],
    rating: 5.0,
    bgImage: '/img/cases/LivingSecurityBg.webp',
    resultImage: '/img/cases/LivingSecurityResult.webp',
    testimonial: {
      text: "I've managed a number of outsourcing relationships in my career, and they've really stood out to me. Vahue has worked diligently to understand our goals. Based on this understanding, they've morphed their practices to fit our needs. The team's work has directly contributed to our revenue growth. We've grown our ARR significantly since engaging with them.",
      author: 'Matt Ward',
      role: 'Director of Engineering at Living Security',
      avatar: '/img/cases/LivingSecurityAvatar.png',
    },
    overview:
      'Living Security approached Vahue to build an innovative cybersecurity training platform that would engage enterprise employees through gamification while delivering measurable security-awareness improvements.',
    challenge:
      'Traditional cybersecurity training is often boring and ineffective. Living Security needed a platform that would not only educate employees about security threats but also keep them engaged and motivated to complete training modules.',
    solution:
      'We developed a comprehensive e-learning platform featuring interactive games, simulations, and quizzes. The platform includes detailed analytics dashboards for enterprise administrators to track employee progress and identify security knowledge gaps.',
    results: [
      '95% employee engagement rate',
      '40% improvement in phishing test results',
      'Platform adopted by 50+ Fortune 500 companies',
      'Reduced security incidents by 60%',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Unity', 'GraphQL'],
  },
  luca: {
    company: 'Luca.ai',
    title:
      'AI-powered learning platform helping children overcome dyslexia challenges',
    location: 'Pennsylvania, USA',
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
    overview:
      "LUCA.ai is an innovative AI-powered platform designed to help children with dyslexia improve their reading skills through personalized, adaptive learning experiences.",
    challenge:
      "Dyslexia affects approximately 15-20% of the population, yet traditional educational tools often fail to address the unique learning needs of dyslexic students. LUCA.ai needed a platform that could adapt to each child's specific challenges and progress.",
    solution:
      "We built an AI-driven learning platform that uses machine learning to analyze each student's reading patterns and adapt content accordingly. The platform includes voice recognition, interactive exercises, and progress tracking features designed specifically for dyslexic learners.",
    results: [
      '2x improvement in reading speed for users',
      '85% of parents reported improved confidence in their children',
      'Used by 10,000+ students across the US',
      'Featured in major education-technology publications',
    ],
    technologies: ['React Native', 'Python', 'TensorFlow', 'Firebase', 'OpenAI', 'AWS'],
  },
}

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white/45 mb-10 flex-wrap">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-white/20">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white/85">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

function ClutchRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base font-semibold text-white">
        {rating.toFixed(1)}
      </span>
      <div className="flex gap-0.5" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-3.5 h-3.5 text-white/85"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-white/70 text-sm font-medium">Clutch</span>
    </div>
  )
}

function LocationIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  )
}

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudies[slug]
  if (!cs) return {}
  return {
    title: `${cs.company} — Case Study | Vahue`,
    description: cs.overview,
    openGraph: {
      title: `${cs.company} — Case Study`,
      description: cs.overview,
      url: `https://vahue.ai/case-studies/${slug}`,
      images: [{ url: cs.bgImage }],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = caseStudies[slug]

  if (!cs) {
    notFound()
  }

  const otherCases = Object.entries(caseStudies)
    .filter(([key]) => key !== slug)
    .map(([key, value]) => ({ slug: key, ...value }))

  return (
    <main className="bg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg">
        <div className="absolute inset-0">
          <Image
            src={cs.bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/85 to-bg" />
          <div className="absolute inset-0 hero-texture opacity-40" />
        </div>

        <div className="relative z-10 w-full max-w-wide mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-14 md:pb-20">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Case Studies', href: '/case-studies' },
              { label: cs.company },
            ]}
          />

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 flex-wrap mb-5">
              <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/85">
                {cs.company}
              </span>
              <span className="text-white/25 text-sm">·</span>
              <span className="inline-flex items-center gap-1.5 text-white/65 text-sm">
                <LocationIcon />
                {cs.location}
              </span>
            </div>

            <h1 className="font-display text-[2.2rem] md:text-5xl lg:text-6xl font-light leading-[1.08] -tracking-[0.01em] text-balance text-white max-w-4xl">
              {cs.title}
            </h1>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/75"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 pt-7 border-t border-white/10 max-w-xl">
              <ClutchRating rating={cs.rating} />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16">
          {/* Main content */}
          <div className="flex flex-col gap-14 md:gap-16">
            {/* Overview */}
            <section>
              <p className="eyebrow mb-4">Overview</p>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                {cs.overview}
              </p>
            </section>

            {/* Challenge */}
            <section>
              <p className="eyebrow mb-4">The challenge</p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-white leading-tight mb-5 text-balance">
                What the team was up against.
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                {cs.challenge}
              </p>
            </section>

            {/* Solution */}
            <section>
              <p className="eyebrow mb-4">Our solution</p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-white leading-tight mb-5 text-balance">
                How we shipped it.
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                {cs.solution}
              </p>
            </section>

            {/* Results */}
            <section>
              <p className="eyebrow mb-4">Results</p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-white leading-tight mb-7 text-balance">
                What changed, measured.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {cs.results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-border-soft bg-white/[0.02] p-5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-white text-[15px] md:text-base font-medium leading-snug">
                      {result}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonial */}
            {cs.testimonial && (
              <section className="relative rounded-3xl border border-border-soft bg-white/[0.03] p-8 md:p-10 overflow-hidden">
                <div className="absolute inset-0 hero-texture opacity-30 pointer-events-none" />
                <div className="relative z-10">
                  <svg
                    className="w-8 h-8 text-white/20 mb-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                  <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-7 text-balance">
                    {cs.testimonial.text}
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <Image
                      src={cs.testimonial.avatar}
                      alt={cs.testimonial.author}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border border-white/15"
                    />
                    <div>
                      <p className="font-semibold text-white">
                        {cs.testimonial.author}
                      </p>
                      <p className="text-white/55 text-sm">
                        {cs.testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
            {/* Result preview */}
            <div className="rounded-2xl border border-border-soft bg-white/[0.02] p-4 md:p-5">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
                <Image
                  src={cs.resultImage}
                  alt={`${cs.company} result`}
                  fill
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Client rating */}
            <div className="rounded-2xl border border-border-soft bg-white/[0.02] p-6">
              <p className="eyebrow mb-3">Client rating</p>
              <ClutchRating rating={cs.rating} />
            </div>

            {/* Technologies */}
            <div className="rounded-2xl border border-border-soft bg-white/[0.02] p-6">
              <p className="eyebrow mb-4">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {cs.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium text-white/85 bg-white/5 border border-white/10 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="relative rounded-2xl border border-border-soft bg-white/[0.03] p-6 overflow-hidden">
              <div className="absolute inset-0 hero-texture opacity-30 pointer-events-none" />
              <div className="relative z-10">
                <p className="eyebrow mb-3">Next step</p>
                <h3 className="font-display text-xl font-light text-white leading-tight mb-2 text-balance">
                  Starting something similar?
                </h3>
                <p className="text-white/65 text-sm mb-5 leading-relaxed">
                  30-minute discovery call. No deck, no pressure.
                </p>
                <Link
                  href={DISCOVERY_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 bg-white text-bg font-medium text-xs uppercase tracking-wider px-5 py-3 rounded-full hover:bg-white/90 transition-colors"
                >
                  Book a Discovery Call
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Other case studies */}
      {otherCases.length > 0 && (
        <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-28 md:pb-32">
          <div className="hairline mb-12" />
          <div className="flex items-end justify-between gap-4 mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-light text-white">
              More client engagements
            </h3>
            <Link
              href="/case-studies"
              className="text-sm text-white/70 hover:text-white transition-colors hidden md:inline-flex items-center gap-1.5"
            >
              All case studies
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {otherCases.map((other) => (
              <Link
                key={other.slug}
                href={`/case-studies/${other.slug}`}
                className="group relative flex flex-col rounded-2xl border border-border-soft bg-white/[0.02] overflow-hidden hover:border-border-mid hover:bg-white/[0.035] transition-colors"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={other.bgImage}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-60 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/30 to-transparent" />
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                    {other.company}
                  </span>
                  <h4 className="mt-3 font-display text-lg md:text-xl font-light leading-snug text-white text-balance">
                    {other.title}
                  </h4>
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/50">
                    <span className="inline-flex items-center gap-1.5">
                      <LocationIcon />
                      {other.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-white/70 group-hover:text-white transition-colors">
                      Read
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
