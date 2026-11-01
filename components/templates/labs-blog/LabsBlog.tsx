'use client'

import { useMemo, useState } from 'react'
import { ArrowRight } from '@/components/templates/labs-shared/icons'
import { labsHref } from '@/components/templates/labs-shared/links'
import s from '@/components/templates/labs-shared/labs.module.css'
import type { LabsBlogContent, LabsBlogPost } from './content'

/*
 * Labs blog layout: `BlogList` (chunk 3d2wpwokq5chh.js, module 835536) with
 * `useCategoryFilter` + `CategoryFilterPills` (modules 622866 / 353007). One section, no ScrollReveal, no Lenis.
 *   state: sortField "date" | "title" | "category" (default "date"), sortDir ("desc"), expanded (null), activeCategory ("All")
 *   pill click   -> setActiveCategory(c) (expanded is NOT reset)
 *   header click -> same field: toggle dir; other field: field = it, dir = field === "date" ? "desc" : "asc"
 *   grouping     -> Map by year (getUTCFullYear of `date + "T00:00:00"`) in sorted order; year groups re-sorted
 *                   numerically only when sorting by date
 *   row click    -> intro ? toggle expanded (one open at a time, keyed by slug ?? _id) : router.push(`/blog/${slug}`)
 *   chevron      -> rotate-180 when open (transition-transform 200ms, killed by labs' html.loaded * override: instant)
 * hover: labs is Tailwind v4, whose `hover:` only applies under @media (hover:hover); the repo's Tailwind 3 variant is
 *   written as `[@media(hover:hover){&:hover}]:` so tapped rows don't keep a sticky hover bg on touch screens.
 * Spec: reference-snapshots/scale-clone/labs-blog.md
 */

const ArrowUpDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`lucide lucide-arrow-up-down ${className ?? ''}`}
  >
    <path d="m21 16-4 4-4-4" />
    <path d="M17 20V4" />
    <path d="m3 8 4-4 4 4" />
    <path d="M7 4v16" />
  </svg>
)

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`lucide lucide-chevron-down ${className ?? ''}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

function Dot() {
  return <span className="w-1 h-1 bg-[color:var(--color-ink)] rounded-full inline-block shrink-0" />
}

type Field = 'date' | 'title' | 'category'

function SortButton({ f, label, field, onSort }: { f: Field; label: string; field: Field; onSort: (f: Field) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSort(f)}
      className="text-[12px] leading-[1.5] text-[color:var(--color-ink)] font-semibold flex items-center gap-1.5 uppercase [@media(hover:hover){&:hover}]:text-[#525252] transition-colors bg-transparent border-0 p-0 cursor-pointer text-left"
    >
      <Dot /> {label}
      {field === f && <ArrowUpDown className="w-2.5 h-2.5 text-[#737373]" />}
    </button>
  )
}

// labs `d()`: local-midnight parse, en-US numeric (e.g. 10/29/2026)
function fmt(date: string) {
  return new Date(date.includes('T') ? date : date + 'T00:00:00').toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
}

export default function LabsBlog({ content }: { content: LabsBlogContent }) {
  const posts = content.posts
  const [field, setField] = useState<Field>('date')
  const [dir, setDir] = useState<'asc' | 'desc'>('desc')
  const [open, setOpen] = useState<string | null>(null)
  const [category, setCategory] = useState('All')

  const options = useMemo(() => ['All', ...new Set(posts.flatMap((p) => p.categories))], [posts])
  const filtered = useMemo(() => (category === 'All' ? posts : posts.filter((p) => p.categories.includes(category))), [posts, category])
  const rows = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        if (field === 'date') {
          const x = new Date(a.date || '').getTime()
          const y = new Date(b.date || '').getTime()
          return dir === 'asc' ? x - y : y - x
        }
        if (field === 'title') {
          const d = (a.title || '').localeCompare(b.title || '')
          return dir === 'asc' ? d : -d
        }
        const d = (a.categories[0] || '').localeCompare(b.categories[0] || '')
        return dir === 'asc' ? d : -d
      }),
    [filtered, field, dir],
  )
  const groups = useMemo(() => {
    const m = new Map<string, LabsBlogPost[]>()
    for (const p of rows) {
      const y = p.date ? String(new Date(p.date.includes('T') ? p.date : p.date + 'T00:00:00').getUTCFullYear()) : '—'
      if (!m.has(y)) m.set(y, [])
      m.get(y)!.push(p)
    }
    const g = Array.from(m.entries()).map(([year, list]) => ({ year, posts: list }))
    if (field === 'date') g.sort((a, b) => (dir === 'desc' ? Number(b.year) - Number(a.year) : Number(a.year) - Number(b.year)))
    return g
  }, [rows, field, dir])

  const toggleSort = (f: Field) => {
    if (field === f) setDir(dir === 'asc' ? 'desc' : 'asc')
    else {
      setField(f)
      setDir(f === 'date' ? 'desc' : 'asc')
    }
  }


  return (
    <section className="w-full border-b border-[#d4d4d4]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-20">
        <h1 className="text-[14px] leading-[1.5] font-medium text-[color:var(--color-ink)] mb-6 mt-0 tracking-[0.025em] uppercase">{content.title}</h1>
        <p className="text-[14px] text-[#525252] leading-[1.625] max-w-[672px] mb-12 mt-0">{content.intro}</p>

        {/* CategoryFilterPills (353007) */}
        <div className="mb-10 border-b border-[#e5e5e5] pb-5">
          <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0">
            <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
              {options.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setCategory(o)}
                  className={`shrink-0 whitespace-nowrap text-[12px] leading-[1.5] px-3 py-1.5 border border-solid transition-colors cursor-pointer rounded-none ${
                    category === o
                      ? 'border-[color:var(--color-ink)] text-[color:var(--color-ink)] bg-[#f5f5f5]'
                      : 'border-[color:var(--color-hairline)] text-[#525252] bg-transparent [@media(hover:hover){&:hover}]:border-[color:var(--color-ink)] [@media(hover:hover){&:hover}]:text-[color:var(--color-ink)]'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <div className="hidden md:grid grid-cols-[120px_minmax(0,1fr)_110px_minmax(0,1fr)_28px] gap-x-3 pb-3 border-b border-[color:var(--color-ink)]">
              <SortButton f="date" label="Date" field={field} onSort={toggleSort} />
              <SortButton f="title" label="Title" field={field} onSort={toggleSort} />
              <SortButton f="category" label="Category" field={field} onSort={toggleSort} />
              <span className="text-[12px] leading-[1.5] text-[color:var(--color-ink)] font-semibold flex items-center gap-1.5 uppercase">
                <Dot /> Authors
              </span>
              <span />
            </div>
            <div className="grid grid-cols-[80px_1fr_28px] gap-x-3 pb-3 border-b border-[color:var(--color-ink)] md:hidden">
              {['Date', 'Title'].map((h) => (
                <span key={h} className="text-[12px] leading-[1.5] text-[color:var(--color-ink)] font-semibold flex items-center gap-1 uppercase">
                  <Dot /> {h}
                </span>
              ))}
              <span />
            </div>

            {groups.map(({ year, posts: list }) => (
              <div key={year} data-year={year}>
                <div className="flex items-center gap-4 py-4 border-b border-[#e5e5e5]">
                  <span className={`${s.mono} text-[12px] leading-[1.5] font-semibold text-[color:var(--color-ink-faint)] uppercase tracking-[0.1em]`}>{year}</span>
                  <div className="flex-1 h-px bg-[#e5e5e5]" />
                  <span className="text-[12px] leading-[1.5] text-[#d4d4d4]">
                    {list.length} {list.length === 1 ? 'post' : 'posts'}
                  </span>
                </div>
                {list.map((p) => {
                  const slug = p.slug
                  const key = slug ?? p._id
                  const isOpen = open === key
                  const intro = p.intro
                  const cats = p.categories.join(', ')
                  const onClick = () => {
                    if (intro) setOpen(isOpen ? null : key)
                    else if (slug) window.location.assign(p.href ?? labsHref(`/blog/${slug}`))
                  }
                  const ptr = intro || slug ? 'cursor-pointer' : ''
                  return (
                    <div key={p._id} className="border-b border-[#e5e5e5]" data-post={key} data-open={isOpen ? '' : undefined}>
                      <div
                        onClick={onClick}
                        className={`hidden md:grid min-w-0 grid-cols-[120px_minmax(0,1fr)_110px_minmax(0,1fr)_28px] gap-x-3 py-3.5 [@media(hover:hover){&:hover}]:bg-[#fafafa] transition-colors group ${ptr}`}
                      >
                        <span className={`${s.mono} min-w-0 text-[12px] leading-[1.5] text-[#737373]`}>{p.date ? fmt(p.date) : '—'}</span>
                        <span className="min-w-0 text-[14px] leading-[1.5] text-[color:var(--color-ink)] font-medium truncate">{p.title}</span>
                        <span className="min-w-0 text-[12px] leading-[1.5] text-[#737373] truncate">{cats}</span>
                        {/* enablePeopleLinks:false and no authors[] on any post: labs prints authorNames.join(", ") */}
                        <span className="min-w-0 text-[12px] leading-[1.5] text-[#737373] truncate">{p.authorNames.join(', ') || '—'}</span>
                        <span className="flex items-center justify-end">
                          {intro ? (
                            <ChevronDown className={`w-3.5 h-3.5 text-[#737373] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 text-[#737373]" />
                          )}
                        </span>
                      </div>
                      <div
                        onClick={onClick}
                        className={`grid grid-cols-[80px_1fr_28px] gap-x-3 py-3.5 [@media(hover:hover){&:hover}]:bg-[#fafafa] transition-colors group md:hidden ${ptr}`}
                      >
                        <span className={`${s.mono} text-[12px] leading-[1.5] text-[#737373]`}>{p.date ? fmt(p.date) : '—'}</span>
                        <div className="min-w-0">
                          <span className="text-[14px] leading-[1.5] text-[color:var(--color-ink)] font-medium truncate block">{p.title}</span>
                          <span className="text-[12px] leading-[1.5] text-[#737373]">{cats}</span>
                        </div>
                        <span className="flex items-center justify-end">
                          {intro ? (
                            <ChevronDown className={`w-3 h-3 text-[#737373] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          ) : (
                            <ArrowRight className="w-3 h-3 text-[#737373]" />
                          )}
                        </span>
                      </div>
                      {intro && (
                        <div className={`pb-4 md:grid md:grid-cols-[120px_minmax(0,1fr)_28px] md:gap-x-3 ${isOpen ? '' : 'hidden'}`}>
                          <span className="hidden md:block" />
                          <div className="min-w-0">
                            <p className="text-[12px] text-[#525252] leading-[1.625] mb-3 mt-0">{intro}</p>
                            <a
                              href={p.href ?? (slug ? labsHref(`/blog/${slug}`) : '#')}
                              className="inline-flex items-center gap-1.5 text-[12px] leading-[1.5] text-[color:var(--color-ink)] [@media(hover:hover){&:hover}]:text-[#525252] transition-colors uppercase tracking-[0.025em] no-underline"
                            >
                              Read post <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>
                          <span className="hidden md:block" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[12px] leading-[1.5] text-[#737373] m-0">
            {rows.length} {rows.length === 1 ? 'post' : 'posts'} found
          </p>
        </div>
        {rows.length === 0 && <p className="text-[14px] leading-[1.5] text-[#737373] text-center py-20 m-0">No posts found in this category.</p>}
      </div>
    </section>
  )
}
