'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { Guide, GuideCategory } from '@/lib/guides'
import { guideCategories } from '@/lib/guides'

type SortKey = 'newest' | 'popular' | 'week'
type SortOption = { id: 'all' | SortKey; label: string }

const sortOptions: SortOption[] = [
  { id: 'all', label: 'All' },
  { id: 'newest', label: 'Newest' },
  { id: 'popular', label: 'Popular' },
  { id: 'week', label: 'This week' },
]

type GuidesIndexProps = {
  guides: Guide[]
}

function formatViews(views: number): string {
  if (views >= 1000) {
    const k = views / 1000
    return `${k.toFixed(k < 10 ? 1 : 0)}k`
  }
  return String(views)
}

export default function GuidesIndex({ guides }: GuidesIndexProps) {
  const [sort, setSort] = useState<'all' | SortKey>('all')
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<'All' | GuideCategory>('All')

  const visibleGuides = useMemo(() => {
    let list = guides.slice()

    if (activeTag !== 'All') {
      list = list.filter((guide) => guide.category === activeTag)
    }

    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (guide) =>
          guide.title.toLowerCase().includes(q) ||
          guide.excerpt.toLowerCase().includes(q) ||
          guide.category.toLowerCase().includes(q),
      )
    }

    if (sort === 'newest') {
      list.sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    } else if (sort === 'popular') {
      list.sort((a, b) => b.views - a.views)
    } else if (sort === 'week') {
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      list = list.filter((guide) => {
        const published = new Date(guide.dateISO).getTime()
        return Number.isFinite(published) && published >= sevenDaysAgo
      })
    }

    return list
  }, [guides, sort, query, activeTag])

  return (
    <>
      {/* Sort tabs */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-6">
        <div className="hairline mb-8" />
        <div className="flex flex-wrap items-center gap-2">
          {sortOptions.map((option) => {
            const active = sort === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSort(option.id)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-white text-bg'
                    : 'bg-white/[0.04] border border-white/10 text-white/75 hover:bg-white/[0.07] hover:text-white'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Search */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-5">
        <label className="relative block">
          <span className="sr-only">Search guides</span>
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or description…"
            className="w-full rounded-2xl bg-white/[0.03] border border-white/10 pl-12 pr-5 py-4 text-sm md:text-base text-white placeholder:text-white/40 outline-none focus:border-white/25 focus:bg-white/[0.05] transition-colors"
          />
        </label>
      </section>

      {/* Category pills */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-10">
        <div className="flex flex-wrap items-center gap-2">
          {(['All', ...guideCategories] as const).map((tag) => {
            const active = activeTag === tag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-white text-bg'
                    : 'bg-white/[0.04] border border-white/10 text-white/75 hover:bg-white/[0.07] hover:text-white'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </section>

      {/* Count */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-4">
        <div className="flex items-center gap-4">
          <div className="hairline flex-1" />
          <p className="eyebrow whitespace-nowrap">
            {visibleGuides.length} {visibleGuides.length === 1 ? 'guide' : 'guides'}
          </p>
          <div className="hairline flex-1" />
        </div>
      </section>

      {/* List */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-28 md:pb-32">
        {visibleGuides.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.015] px-8 py-16 text-center">
            <p className="eyebrow mb-3">No matches</p>
            <h3 className="font-display text-xl md:text-2xl font-light text-white">
              No guides match your filters yet
            </h3>
            <p className="mt-3 text-white/55 text-sm max-w-md mx-auto">
              Try a different search term, clear the tag filter, or switch back
              to “All”.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setActiveTag('All')
                setSort('all')
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-bg px-5 py-2.5 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {visibleGuides.map((guide) => (
              <li key={guide.slug} className="first:border-t first:border-white/5">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-start gap-6 py-7 md:py-8 transition-colors"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-lg md:text-xl font-light text-white group-hover:text-white text-balance leading-snug">
                      {guide.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-[15px] text-white/55 leading-relaxed line-clamp-2">
                      {guide.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2.5 flex-wrap text-[12px] text-white/50">
                      <span className="inline-flex items-center rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-1 font-mono uppercase tracking-widest text-[10px] text-white/70">
                        {guide.category}
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
                        {formatViews(guide.views)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[10px] text-white/80">
                          {guide.author.charAt(0)}
                        </span>
                        {guide.author}
                      </span>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 group-hover:border-white/30 group-hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
