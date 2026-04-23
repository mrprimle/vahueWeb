import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CopyButton from '@/components/marketplace/CopyButton'
import LikeButton from '@/components/marketplace/LikeButton'
import { DISCOVERY_CALL_URL } from '@/lib/links'
import {
  getMarketplaceCategory,
  getMarketplaceItem,
  getRelatedMarketplaceItems,
  marketplaceItems,
} from '@/lib/marketplace'

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

function formatCount(value: number): string {
  if (value >= 1000) {
    const k = value / 1000
    return `${k.toFixed(k < 10 ? 1 : 0)}k`
  }
  return String(value)
}

export function generateStaticParams() {
  return marketplaceItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getMarketplaceItem(slug)
  if (!item) return {}
  return {
    title: `${item.title} | Vahue Marketplace`,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      url: `https://vahue.ai/marketplace/${slug}`,
    },
  }
}

export default async function MarketplaceItemPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getMarketplaceItem(slug)

  if (!item) {
    notFound()
  }

  const category = getMarketplaceCategory(item.category)
  const related = getRelatedMarketplaceItems(slug, 2)

  return (
    <main className="bg-bg">
      {/* Header: breadcrumbs */}
      <section className="relative overflow-hidden bg-bg">
        <div className="absolute inset-0 hero-texture opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

        <div className="relative z-10 w-full max-w-standard mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-4 md:pb-6">
          <Breadcrumbs
            items={[
              { label: 'Marketplace', href: '/marketplace' },
              { label: category.label },
            ]}
          />

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
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
            Back to catalog
          </Link>
        </div>
      </section>

      {/* Hero card (category-tinted) */}
      <section className="w-full max-w-standard mx-auto px-6 md:px-8 pt-6 pb-10 md:pb-12">
        <div
          className={`relative overflow-hidden rounded-3xl border ${category.accent.heroBorder} ${category.accent.heroBg} p-7 md:p-10`}
        >
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start gap-6 md:gap-8">
            {/* Category icon */}
            <div
              className={`hidden md:flex h-14 w-14 items-center justify-center rounded-2xl border ${category.accent.pillBorder} ${category.accent.pillBg} ${category.accent.pillText}`}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>

            {/* Body */}
            <div className="min-w-0">
              <h1 className="font-display text-[1.9rem] md:text-[2.4rem] lg:text-[2.8rem] font-light leading-[1.08] -tracking-[0.01em] text-balance text-white">
                {item.title}
              </h1>

              <div className="mt-5 flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest ${category.accent.pillBg} ${category.accent.pillBorder} ${category.accent.pillText}`}
                >
                  {category.label}
                </span>
                {item.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center rounded-md bg-white/[0.04] border border-white/10 px-2 py-0.5 text-[11px] text-white/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-[15px] md:text-base text-white/70 leading-relaxed max-w-2xl">
                {item.description}
              </p>

              <div className="mt-6 flex items-center gap-3 flex-wrap text-[13px] text-white/55">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] text-white/80">
                    {item.author.charAt(0)}
                  </span>
                  {item.author}
                </span>
                <span className="text-white/20">·</span>
                <span>{item.date}</span>
              </div>
            </div>

            {/* Top-right meta */}
            <div className="flex flex-row md:flex-col items-end gap-3 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[13px] text-white/55">
                <svg
                  className="w-4 h-4"
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
                {formatCount(item.views)}
              </span>
              <LikeButton slug={item.slug} initialLikes={item.likes} size="md" />
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="w-full max-w-standard mx-auto px-6 md:px-8 pb-10 md:pb-12">
        <div className="rounded-3xl border border-border-soft bg-white/[0.02] p-7 md:p-9">
          <h2 className="font-display text-xl md:text-2xl font-light text-white">
            How to use
          </h2>
          <p className="mt-4 text-[15px] text-white/70 leading-relaxed max-w-2xl">
            {item.howToUse}
          </p>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <span className="text-[13px] text-white/50">Works with:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {item.tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center rounded-md bg-white/[0.04] border border-white/10 px-2 py-1 text-[12px] text-white/75"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <CopyButton
              text={item.content}
              size="lg"
              variant="solid"
              label="Copy prompt"
              copiedLabel="Copied to clipboard"
            />
          </div>
        </div>
      </section>

      {/* Scenarios + Tags */}
      <section className="w-full max-w-standard mx-auto px-6 md:px-8 pb-10 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 md:gap-6">
          {/* Scenarios */}
          <div className="rounded-3xl border border-border-soft bg-white/[0.02] p-7 md:p-9">
            <h2 className="font-display text-xl md:text-2xl font-light text-white">
              Use cases
            </h2>
            <ul className="mt-5 space-y-3.5">
              {item.scenarios.map((scenario, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-white/70">
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <p className="text-[14.5px] text-white/75 leading-relaxed">
                    {scenario}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <aside className="rounded-3xl border border-border-soft bg-white/[0.02] p-7 md:p-8">
            <h2 className="font-display text-lg md:text-xl font-light text-white">
              Tags
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[12px] text-white/70 hover:text-white hover:border-white/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Content block */}
      <section className="w-full max-w-standard mx-auto px-6 md:px-8 pb-14 md:pb-20">
        <div className="rounded-3xl border border-border-soft bg-white/[0.02] overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-6 md:px-8 py-4 border-b border-white/5">
            <h2 className="font-display text-lg md:text-xl font-light text-white">
              Content
            </h2>
            <CopyButton
              text={item.content}
              size="md"
              variant="ghost"
              label="Copy"
              copiedLabel="Copied"
            />
          </div>
          <div className="p-6 md:p-8">
            <pre
              lang={item.contentLanguage ?? 'en'}
              className="font-mono text-[12.5px] md:text-[13px] leading-relaxed text-white/80 whitespace-pre-wrap break-words bg-black/30 border border-white/5 rounded-2xl p-5 md:p-6 max-h-[560px] overflow-auto"
            >
              {item.content}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-20 md:pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border-soft bg-white/[0.03] p-8 md:p-12 lg:p-14">
          <div className="absolute inset-0 hero-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">Work with us</p>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-white text-balance">
                Want this running inside your team?{' '}
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
                Vahue helps product and engineering teams adopt AI-native
                workflows — with the rules, skills, and guardrails to make them
                stick. 30-minute discovery call, zero pressure.
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
                href="/marketplace"
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
                Back to the catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-28 md:pb-32">
          <div className="hairline mb-12" />
          <div className="flex items-end justify-between gap-4 mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-light text-white">
              More from the marketplace
            </h3>
            <Link
              href="/marketplace"
              className="text-sm text-white/70 hover:text-white transition-colors hidden md:inline-flex items-center gap-1.5"
            >
              All items
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
            {related.map((rel) => {
              const relCategory = getMarketplaceCategory(rel.category)
              return (
                <Link
                  key={rel.slug}
                  href={`/marketplace/${rel.slug}`}
                  className="group flex flex-col rounded-2xl border border-border-soft bg-white/[0.02] p-6 md:p-7 hover:border-border-mid hover:bg-white/[0.035] transition-colors"
                >
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest self-start ${relCategory.accent.pillBg} ${relCategory.accent.pillBorder} ${relCategory.accent.pillText}`}
                  >
                    {relCategory.label}
                  </span>
                  <h4 className="mt-4 font-display text-lg md:text-xl font-light leading-snug text-white text-balance">
                    {rel.title}
                  </h4>
                  <p className="mt-3 text-white/55 text-sm leading-relaxed flex-1 line-clamp-3">
                    {rel.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
