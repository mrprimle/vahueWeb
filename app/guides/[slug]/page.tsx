import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import GuideActions from '@/components/guides/GuideActions'
import GuideArticle from '@/components/guides/GuideArticle'
import { DISCOVERY_CALL_URL } from '@/lib/links'
import { getGuide, getRelatedGuides, guides } from '@/lib/guides'

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white/45 mb-10 flex-wrap">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-white/20">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition-colors">
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

function formatViews(views: number): string {
  if (views >= 1000) {
    const k = views / 1000
    return `${k.toFixed(k < 10 ? 1 : 0)}k`
  }
  return String(views)
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  return {
    title: `${guide.title} | Vahue Guides`,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: `https://vahue.ai/guides/${slug}`,
    },
  }
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  const related = getRelatedGuides(slug, 2)

  return (
    <main className="bg-bg">
      {/* Header */}
      <section className="relative overflow-hidden bg-bg">
        <div className="absolute inset-0 hero-texture opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

        <div className="relative z-10 w-full max-w-standard mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-6 md:pb-10">
          <Breadcrumbs
            items={[
              { label: 'Guides', href: '/guides' },
              { label: guide.category },
            ]}
          />

          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-[2rem] md:text-[2.7rem] lg:text-[3.1rem] font-light leading-[1.08] -tracking-[0.01em] text-balance text-white">
                {guide.title}
              </h1>
            </div>

            <div className="shrink-0 hidden md:block">
              <GuideActions slug={guide.slug} />
            </div>
          </div>

          {/* Actions (mobile, below title) */}
          <div className="mt-5 md:hidden">
            <GuideActions slug={guide.slug} />
          </div>

          {/* Author + meta */}
          <div className="mt-8 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-medium text-sm">
              {guide.author.charAt(0)}
            </div>
            <p className="text-sm text-white/80">{guide.author}</p>
          </div>

          <div className="mt-5 flex items-center gap-4 flex-wrap text-[13px] text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {guide.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {formatViews(guide.views)} views
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {guide.date}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="w-full max-w-standard mx-auto px-6 md:px-8 pt-4 pb-20 md:pb-24">
        <GuideArticle html={guide.content} />
      </section>

      {/* CTA */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-20 md:pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border-soft bg-white/[0.03] p-8 md:p-12 lg:p-14">
          <div className="absolute inset-0 hero-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">Work with us</p>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-white text-balance">
                Rolling this out across a team?{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Let&apos;s talk.
                </span>
              </h3>
              <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
                Vahue helps engineering teams adopt Claude Code, Cursor, and
                MCP-based workflows — with the skills, guardrails, and training
                to make it stick. 30-minute discovery call, zero pressure.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href={DISCOVERY_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-bg font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors"
              >
                Book a Discovery Call
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
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
                    strokeWidth={2}
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
                Back to all guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-28 md:pb-32">
          <div className="hairline mb-12" />
          <div className="flex items-end justify-between gap-4 mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-light text-white">
              Keep reading
            </h3>
            <Link
              href="/guides"
              className="text-sm text-white/70 hover:text-white transition-colors hidden md:inline-flex items-center gap-1.5"
            >
              All guides
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
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/guides/${item.slug}`}
                className="group flex flex-col rounded-2xl border border-border-soft bg-white/[0.02] p-6 md:p-7 hover:border-border-mid hover:bg-white/[0.035] transition-colors"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                  {item.category}
                </span>
                <h4 className="mt-3 font-display text-lg md:text-xl font-light leading-snug text-white text-balance">
                  {item.title}
                </h4>
                <p className="mt-3 text-white/55 text-sm leading-relaxed flex-1 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <span>{item.readTime}</span>
                    <span className="text-white/25">·</span>
                    <span>{formatViews(item.views)} views</span>
                  </div>
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
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
