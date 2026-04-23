'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type {
  MarketplaceCategoryId,
  MarketplaceItem,
} from '@/lib/marketplace'
import {
  getMarketplaceCategory,
  marketplaceCategories,
} from '@/lib/marketplace'
import CopyButton from './CopyButton'
import LikeButton from './LikeButton'

type MarketplaceIndexProps = {
  items: MarketplaceItem[]
}

function formatCount(value: number): string {
  if (value >= 1000) {
    const k = value / 1000
    return `${k.toFixed(k < 10 ? 1 : 0)}k`
  }
  return String(value)
}

function CategoryIcon({ id, className }: { id: MarketplaceCategoryId; className?: string }) {
  switch (id) {
    case 'rules':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      )
    case 'skills':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2l2.4 5.1 5.6.8-4 3.9.9 5.6L12 14.8l-4.9 2.6.9-5.6-4-3.9 5.6-.8L12 2z" />
        </svg>
      )
    case 'plugins':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    case 'mcp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    case 'tools':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    case 'prompts':
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
  }
}

export default function MarketplaceIndex({ items }: MarketplaceIndexProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<
    'all' | MarketplaceCategoryId
  >('all')

  const visible = useMemo(() => {
    let list = items.slice()
    if (activeCategory !== 'all') {
      list = list.filter((item) => item.category === activeCategory)
    }
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          item.tools.some((tool) => tool.toLowerCase().includes(q))
        )
      })
    }
    return list
  }, [items, query, activeCategory])

  const allCount = items.length
  const visibleCount = visible.length

  return (
    <>
      {/* Search */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-5">
        <label className="relative block">
          <span className="sr-only">Search marketplace</span>
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
            placeholder="Search rules, skills, plugins…"
            className="w-full rounded-2xl bg-white/[0.03] border border-white/10 pl-12 pr-5 py-4 text-sm md:text-base text-white placeholder:text-white/40 outline-none focus:border-white/25 focus:bg-white/[0.05] transition-colors"
          />
        </label>
      </section>

      {/* Category tabs */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`group flex flex-col items-start gap-1 rounded-xl border px-4 py-3.5 text-left transition-colors ${
              activeCategory === 'all'
                ? 'bg-white text-bg border-white'
                : 'bg-white/[0.03] border-white/10 text-white/80 hover:bg-white/[0.05] hover:border-white/20 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2 font-medium text-sm">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.2" />
                <rect x="14" y="3" width="7" height="7" rx="1.2" />
                <rect x="3" y="14" width="7" height="7" rx="1.2" />
                <rect x="14" y="14" width="7" height="7" rx="1.2" />
              </svg>
              All types
            </span>
            <span className={`text-[11px] ${activeCategory === 'all' ? 'text-bg/70' : 'text-white/45'}`}>
              Everything
            </span>
          </button>

          {marketplaceCategories.map((category) => {
            const active = activeCategory === category.id
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`group flex flex-col items-start gap-1 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                  active
                    ? 'bg-white text-bg border-white'
                    : 'bg-white/[0.03] border-white/10 text-white/80 hover:bg-white/[0.05] hover:border-white/20 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2 font-medium text-sm">
                  <CategoryIcon id={category.id} className="w-4 h-4" />
                  {category.label}
                </span>
                <span className={`text-[11px] ${active ? 'text-bg/70' : 'text-white/45'}`}>
                  {category.subLabel}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Count */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-white/50">
            {visibleCount} of {allCount}{' '}
            {allCount === 1 ? 'item' : 'items'}
          </p>
          {(query || activeCategory !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setActiveCategory('all')
              }}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Card grid */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-28 md:pb-32">
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.015] px-8 py-16 text-center">
            <p className="eyebrow mb-3">No matches</p>
            <h3 className="font-display text-xl md:text-2xl font-light text-white">
              Nothing matches your filters
            </h3>
            <p className="mt-3 text-white/55 text-sm max-w-md mx-auto">
              Try a different search term or switch back to “All types”.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {visible.map((item) => {
              const category = getMarketplaceCategory(item.category)
              return (
                <Link
                  key={item.slug}
                  href={`/marketplace/${item.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-border-soft bg-white/[0.02] p-6 md:p-7 hover:border-border-mid hover:bg-white/[0.035] transition-colors"
                >
                  {/* Top row: category + stats */}
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest ${category.accent.pillBg} ${category.accent.pillBorder} ${category.accent.pillText}`}
                    >
                      <CategoryIcon id={category.id} className="w-3 h-3" />
                      {category.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <LikeButton
                        slug={item.slug}
                        initialLikes={item.likes}
                        stopPropagation
                      />
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-white/50">
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
                        {formatCount(item.views)}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-lg md:text-xl font-light leading-snug text-white text-balance">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[14.5px] text-white/60 leading-relaxed line-clamp-4 flex-1">
                    {item.description}
                  </p>

                  {/* Tools + author + actions */}
                  <div className="mt-6 pt-5 border-t border-white/5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center rounded-md bg-white/[0.04] border border-white/10 px-2 py-0.5 text-[11px] text-white/70"
                        >
                          {tool}
                        </span>
                      ))}
                      {item.tools.length > 3 && (
                        <span className="inline-flex items-center rounded-md bg-white/[0.04] border border-white/10 px-2 py-0.5 text-[11px] text-white/60">
                          +{item.tools.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-[13px] text-white/55">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] text-white/80">
                          {item.author.charAt(0)}
                        </span>
                        {item.author}
                      </span>

                      <div className="flex items-center gap-2">
                        <CopyButton
                          text={item.content}
                          size="sm"
                          variant="ghost"
                          label="Copy"
                          copiedLabel="Copied"
                        />
                        <span
                          aria-hidden="true"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/50 group-hover:border-white/30 group-hover:text-white transition-colors"
                        >
                          <svg
                            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M13 7l5 5-5 5M6 12h12" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
