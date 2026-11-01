'use client'

import { useMemo, useState, type KeyboardEvent } from 'react'
import { ArrowRight } from '@/components/scale-clone/labs-shared/icons'
import { labsHref } from '@/components/scale-clone/labs-shared/links'
import s from '@/components/scale-clone/labs-shared/labs.module.css'
import type { LabsPaper, LabsPapersContent } from './content'

/*
 * 1:1 clone of https://labs.scale.com/papers: labs' `ResearchTable` (chunk 2khvrmlfrtnxz.js, module 782200) with
 * `useCategoryFilter` + `CategoryFilterPills` (module 353007/622866). One section, no ScrollReveal on this route.
 *   state: sortField "date" | "title" | "category" (default "date"), sortDir (default "desc"), activeIndex (0),
 *          activeCategory ("All").
 *   pill click  -> setActiveCategory(c), activeIndex 0
 *   header click -> same field: toggle dir; other field: field = it, dir = "asc"; activeIndex 0
 *   desktop row mouseenter -> activeIndex = row (never reset on leave); preview (lg+, sticky top-20) shows it
 *   row click / Enter -> router.push(`/papers/${slug}`) (clone: the live labs.scale.com detail page)
 * Spec: reference-snapshots/scale-clone/labs-papers.md
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

function Dot() {
  return <span className="w-1 h-1 bg-[color:var(--color-ink)] rounded-full inline-block shrink-0" />
}

type Field = 'date' | 'title' | 'category'

function Authors({ p }: { p: LabsPaper }) {
  const cls = 'text-[12px] leading-[1.5] text-[#a3a3a3] truncate block'
  // enablePeopleLinks is false on labs (SSR), so author names render as plain spans.
  if (p.authorNames.length)
    return (
      <span className={cls}>
        {p.authorNames.map((n, i) => (
          <span key={n + i}>
            <span>{n}</span>
            {i < p.authorNames.length - 1 && ', '}
          </span>
        ))}
      </span>
    )
  return p.authors ? <span className={cls}>{p.authors}</span> : null
}

export default function LabsPapers({ content }: { content: LabsPapersContent }) {
  const papers = content.papers
  const [field, setField] = useState<Field>('date')
  const [dir, setDir] = useState<'asc' | 'desc'>('desc')
  const [active, setActive] = useState(0)
  const [category, setCategory] = useState('All')

  const options = useMemo(() => ['All', ...new Set(papers.flatMap((p) => p.categories))], [papers])
  const filtered = useMemo(() => (category === 'All' ? papers : papers.filter((p) => p.categories.includes(category))), [papers, category])
  const rows = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        if (field === 'date') {
          const d = new Date(a.dateSort || a.date || '').getTime() - new Date(b.dateSort || b.date || '').getTime()
          return dir === 'asc' ? d : -d
        }
        if (field === 'category') {
          const d = (a.categories[0] || '').localeCompare(b.categories[0] || '')
          return dir === 'asc' ? d : -d
        }
        const d = (a.title || '').localeCompare(b.title || '')
        return dir === 'asc' ? d : -d
      }),
    [filtered, field, dir],
  )
  const cur = rows[active] || rows[0]

  const go = (p: LabsPaper) => window.location.assign(labsHref(`/papers/${p.slug}`))
  const rowProps = (p: LabsPaper) => ({
    role: 'link' as const,
    tabIndex: 0,
    'data-href': labsHref(`/papers/${p.slug}`),
    onClick: () => go(p),
    onKeyDown: (e: KeyboardEvent) => e.key === 'Enter' && go(p),
  })

  const SortButton = ({ f, label }: { f: Field; label: string }) => (
    <button
      type="button"
      onClick={() => {
        if (field === f) setDir(dir === 'asc' ? 'desc' : 'asc')
        else {
          setField(f)
          setDir('asc')
        }
        setActive(0)
      }}
      className="text-[12px] leading-[1.5] text-[color:var(--color-ink)] font-semibold flex items-center gap-1.5 uppercase [@media(hover:hover){&:hover}]:text-[#525252] transition-colors bg-transparent border-0 p-0 cursor-pointer text-left"
    >
      <Dot /> {label}
      {field === f && <ArrowUpDown className="w-2.5 h-2.5 text-[#737373]" />}
    </button>
  )

  return (
    <section className="w-full border-b border-[#d4d4d4]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-20">
        <h1 className="text-[14px] leading-[1.5] font-medium text-[color:var(--color-ink)] mb-6 mt-0 tracking-[0.025em] uppercase">{content.title}</h1>
        <p className="text-[14px] text-[#525252] leading-[1.625] max-w-[672px] mb-12 mt-0">{content.intro}</p>

        {/* CategoryFilterPills */}
        <div className="mb-10 border-b border-[#e5e5e5] pb-5">
          <div className={`-mx-6 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0`}>
            <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
              {options.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    setCategory(o)
                    setActive(0)
                  }}
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
            <div className="hidden md:grid grid-cols-[100px_minmax(0,1fr)_100px_28px] gap-x-3 pb-3 border-b border-[color:var(--color-ink)]">
              <SortButton f="date" label="Date" />
              <SortButton f="title" label="Title" />
              <SortButton f="category" label="Category" />
              <span />
            </div>
            <div className="grid grid-cols-[70px_1fr_28px] gap-x-3 pb-3 border-b border-[color:var(--color-ink)] md:hidden">
              {['Date', 'Title'].map((h) => (
                <span key={h} className="text-[12px] leading-[1.5] text-[color:var(--color-ink)] font-semibold flex items-center gap-1 uppercase">
                  <Dot /> {h}
                </span>
              ))}
              <span />
            </div>
            {rows.map((p, i) => (
              <div
                key={p._id}
                {...rowProps(p)}
                onMouseEnter={() => setActive(i)}
                className="hidden md:grid min-w-0 grid-cols-[100px_minmax(0,1fr)_100px_28px] gap-x-3 py-3.5 border-b border-[#e5e5e5] [@media(hover:hover){&:hover}]:bg-[#fafafa] transition-colors group cursor-pointer"
              >
                <span className={`${s.mono} min-w-0 text-[12px] leading-[1.5] text-[#737373]`}>{p.date}</span>
                <span className="min-w-0 flex flex-col gap-0.5">
                  <span className="text-[14px] leading-[1.5] text-[color:var(--color-ink)] font-medium line-clamp-2">{p.title}</span>
                  <Authors p={p} />
                </span>
                <span className="min-w-0 text-[12px] leading-[1.5] text-[#737373] truncate">{p.categories.join(', ')}</span>
                <span className="flex items-center justify-end">
                  <ArrowRight className="w-3.5 h-3.5 text-[#737373]" />
                </span>
              </div>
            ))}
            {rows.map((p) => (
              <div
                key={`m-${p._id}`}
                {...rowProps(p)}
                className="grid grid-cols-[70px_1fr_28px] gap-x-3 py-3.5 border-b border-[#e5e5e5] [@media(hover:hover){&:hover}]:bg-[#fafafa] transition-colors group md:hidden cursor-pointer"
              >
                <span className={`${s.mono} text-[12px] leading-[1.5] text-[#737373]`}>{p.date}</span>
                <div className="min-w-0">
                  <span className="text-[14px] leading-[1.5] text-[color:var(--color-ink)] font-medium line-clamp-2">{p.title}</span>
                  <span className="text-[12px] leading-[1.5] text-[#737373]">{p.categories.join(', ')}</span>
                </div>
                <span className="flex items-center justify-end">
                  <ArrowRight className="w-3 h-3 text-[#737373]" />
                </span>
              </div>
            ))}
          </div>

          {/* hover preview: lg+, sticky top-20 (80px, under the 57px header) */}
          <div className="hidden lg:block w-[280px] shrink-0 relative">
            <div className="sticky top-20">
              <div className="w-full aspect-square bg-white overflow-hidden relative border border-[#e5e5e5]">
                {rows.map((p, i) =>
                  p.image ? (
                    <div key={p._id} className="absolute inset-0 transition-opacity duration-300 ease-in-out" style={{ opacity: +(active === i) }}>
                      <div className="absolute inset-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          decoding="async"
                          sizes="280px"
                          className="object-contain object-center"
                          style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      key={p._id}
                      className="absolute inset-0 w-full h-full bg-[#e5e5e5] flex items-center justify-center transition-opacity duration-300 ease-in-out"
                      style={{ opacity: +(active === i) }}
                    >
                      <span className="text-[12px] text-[color:var(--color-ink-faint)]">No image</span>
                    </div>
                  ),
                )}
              </div>
              {cur && (
                <div className="mt-3">
                  <p className="text-[12px] leading-[1.5] font-medium text-[color:var(--color-ink)] m-0">{cur.title}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[12px] leading-[1.5] text-[#737373] m-0">
            {rows.length} {rows.length === 1 ? 'paper' : 'papers'} found
          </p>
        </div>
        {rows.length === 0 && <p className="text-[14px] leading-[1.5] text-[#737373] text-center py-20 m-0">No papers found in this category.</p>}
      </div>
    </section>
  )
}
