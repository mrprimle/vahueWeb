import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Case Studies | Vahue',
  description:
    'Explore our portfolio of AI and software engagements — from Fortune 500 platforms to AI-native transformation programs.',
  openGraph: {
    title: 'Case Studies | Vahue',
    description:
      'Explore our portfolio of AI and software engagements — from Fortune 500 platforms to AI-native transformation programs.',
    url: 'https://vahue.ai/case-studies',
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

type ClientEngagement = {
  id: string
  company: string
  title: string
  location: string
  tags: string[]
  rating: number
  bgImage: string
  resultImage: string
  href: string
}

const clientEngagements: ClientEngagement[] = [
  {
    id: 'audi',
    company: 'AUDI',
    title:
      "Revolutionizing automation testing and CI/CD for AUDI's myAudi systems",
    location: 'Germany',
    tags: ['AUTOMOTIVE', 'QA AUTOMATION', 'CI/CD'],
    rating: 5.0,
    bgImage: '/img/cases/audiBg.webp',
    resultImage: '/img/cases/audiResult.webp',
    href: '/case-studies/audi',
  },
  {
    id: 'living-security',
    company: 'Living Security',
    title:
      'Gamified cybersecurity e-Learning web platform for Fortune 500 enterprises',
    location: 'Austin, TX, USA',
    tags: ['E-LEARNING', 'CYBERSECURITY'],
    rating: 5.0,
    bgImage: '/img/cases/LivingSecurityBg.webp',
    resultImage: '/img/cases/LivingSecurityResult.webp',
    href: '/case-studies/living-security',
  },
  {
    id: 'luca',
    company: 'Luca.ai',
    title:
      'AI-powered learning platform helping children overcome dyslexia challenges',
    location: 'Pennsylvania, USA',
    tags: ['EDUCATION', 'EDTECH'],
    rating: 5.0,
    bgImage: '/img/cases/lucaaiBg.webp',
    resultImage: '/img/cases/LucaaiResult.webp',
    href: '/case-studies/luca',
  },
]

type TransformationStory = {
  id: string
  client: string
  objective: string
  results: { value: string; description: string }[]
  stack: string
}

const transformationStories: TransformationStory[] = [
  {
    id: 'wealth-management',
    client: 'Wealth Management Company',
    objective:
      'Integrate AI tools into everyday work across all roles and increase overall productivity.',
    results: [
      { value: '85%', description: 'of employees use AI tools daily in their workflows' },
      { value: '70%', description: 'of routine queries resolved via the GPT assistant within the first 2 weeks' },
      { value: '5 min', description: 'average response time, down from 1 hour' },
      { value: '52', description: 'ready-to-use prompts created for finance, presale, legal, and HR' },
      { value: '12', description: 'AI agents deployed across quality, sales, finance, and exec dashboards' },
      { value: '100%', description: 'prompts reviewed for data-security compliance' },
    ],
    stack:
      'ChatGPT Enterprise, n8n, Cursor, RAGDB (vector database), Power BI + Bloomberg GPT, Miro, Whisper / Coqui',
  },
  {
    id: 'e-commerce',
    client: 'E-Commerce Platform',
    objective:
      'Automate customer support and optimize product-recommendation systems using AI.',
    results: [
      { value: '60%', description: 'reduction in customer-support tickets' },
      { value: '3x', description: 'increase in product-recommendation conversion rate' },
      { value: '24/7', description: 'automated support coverage with the AI chatbot' },
      { value: '8', description: 'custom AI workflows deployed across departments' },
      { value: '40%', description: 'faster content generation for marketing campaigns' },
      { value: '95%', description: 'customer-satisfaction score with AI-assisted support' },
    ],
    stack:
      'Anthropic API, LangChain, Pinecone, Next.js, Vercel, PostgreSQL, Redis, NanoClaw',
  },
]

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

export default function CaseStudiesPage() {
  return (
    <main className="bg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg">
        <div className="absolute inset-0 hero-texture opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

        <div className="relative z-10 w-full max-w-wide mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Case Studies' },
            ]}
          />

          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Selected work · Outcomes</p>
            <h1 className="font-display text-[2.7rem] font-light leading-none md:leading-tight xl:leading-[80px] lg:text-6xl xl:text-7xl -tracking-[0.01em] max-w-2xl xl:max-w-4xl text-balance text-white">
              Where ideas become{' '}
              <span
                style={{
                  background:
                    'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                measurable
              </span>{' '}
              impact.
            </h1>
            <p className="mt-6 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
              A few of the engagements we&apos;re proud of — enterprise
              platforms, AI transformations, and products that ship on
              schedule and move real metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Client engagements — 3 linked cases */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-20 md:pb-28">
        <div className="flex items-end justify-between gap-4 mb-8 md:mb-10">
          <div>
            <p className="eyebrow mb-3">Client engagements</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-white leading-tight">
              Shipped products, reviewed by clients
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {clientEngagements.map((cs) => (
            <Link
              key={cs.id}
              href={cs.href}
              className="group relative rounded-3xl border border-border-soft bg-white/[0.02] overflow-hidden hover:border-border-mid hover:bg-white/[0.035] transition-colors"
            >
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src={cs.bgImage}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
              </div>

              <div className="relative z-10 p-8 md:p-10 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12 items-start">
                  <div className="flex flex-col min-h-[260px]">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                        {cs.company}
                      </span>
                      <span className="text-white/25 text-sm">·</span>
                      <span className="inline-flex items-center gap-1.5 text-white/60 text-sm">
                        <LocationIcon />
                        {cs.location}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl md:text-2xl lg:text-3xl font-light leading-tight text-white text-balance max-w-2xl">
                      {cs.title}
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {cs.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-8 flex items-center justify-between gap-4 flex-wrap">
                      <ClutchRating rating={cs.rating} />
                      <span className="inline-flex items-center gap-2 text-sm text-white/85 group-hover:text-white transition-colors">
                        Read case study
                        <svg
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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

                  <div className="relative w-full">
                    <div className="relative w-full aspect-[5/4] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                      <Image
                        src={cs.resultImage}
                        alt={`${cs.company} result preview`}
                        fill
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Transformation stories — 2 unlinked metric cases */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-28 md:pb-32">
        <div className="hairline mb-12" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Transformation stories</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-white leading-tight">
              Inside the numbers behind our AI programs
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/55 max-w-md">
            Not every engagement becomes a public product story — sometimes
            the outcome is a transformed team. A look at the measurable
            impact we&apos;ve delivered.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          {transformationStories.map((cs, idx) => (
            <div
              key={cs.id}
              className="relative rounded-3xl border border-border-soft bg-surface p-7 md:p-10 overflow-hidden"
            >
              <div className="relative grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-3">
                    Case {String(idx + 1).padStart(2, '0')} · Client
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-white leading-tight">
                    {cs.client}
                  </h3>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/45">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/45" />
                    Confidential engagement
                  </p>
                </div>

                <div>
                  <div className="mb-8">
                    <p className="eyebrow mb-3">Objective</p>
                    <p className="text-white/80 text-[15px] md:text-base leading-relaxed">
                      {cs.objective}
                    </p>
                  </div>

                  <div className="mb-8">
                    <p className="eyebrow mb-4">Results</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cs.results.map((result, index) => (
                        <div
                          key={index}
                          className="border-t border-border-mid pt-4"
                        >
                          <p className="font-display text-2xl md:text-3xl font-light text-white leading-none mb-2">
                            {result.value}
                          </p>
                          <p className="text-white/65 text-sm leading-relaxed">
                            {result.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="eyebrow mb-3">Stack</p>
                    <p className="text-white/65 text-sm leading-relaxed">
                      {cs.stack}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
