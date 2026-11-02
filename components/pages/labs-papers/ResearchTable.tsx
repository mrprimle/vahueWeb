'use client'

// labs.scale.com/papers: ResearchTable 782200, useCategoryFilter 622866, CategoryFilterPills 353007 (chunk 2khvrmlfrtnxz.js). Class strings verbatim.
// Scale's `enablePeopleLinks` prop is false on this page, so authors render as plain spans and the /people link branch is not ported.
import { ArrowRight, ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { LabsPaperRow, LabsPapersContent } from './types'

type SortField = 'date' | 'title' | 'category'

function Dot() {
  return <span className="w-1 h-1 bg-ink rounded-full inline-block shrink-0" />
}

function useCategoryFilter(papers: LabsPaperRow[], allLabel: string) {
  const [activeCategory, setActiveCategory] = useState(allLabel)
  const options = useMemo(() => [allLabel, ...new Set(papers.flatMap((p) => p.categories))], [papers, allLabel])
  const filtered = useMemo(() => (activeCategory === allLabel ? papers : papers.filter((p) => p.categories.includes(activeCategory))), [papers, activeCategory, allLabel])
  return { activeCategory, setActiveCategory, options, filtered }
}

function CategoryFilterPills({ options, activeCategory, onSelect }: { options: string[]; activeCategory: string; onSelect: (c: string) => void }) {
  return (
    <div className="mb-10 border-b border-neutral-200 pb-5">
      <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0">
        <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
          {options.map((o) => (
            <button key={o} onClick={() => onSelect(o)} className={`shrink-0 whitespace-nowrap text-xs font-sans px-3 py-1.5 border transition-colors ${activeCategory === o ? 'border-ink text-ink bg-neutral-100' : 'border-hairline text-neutral-600 hover:border-ink hover:text-ink'}`}>
              {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Authors({ authors }: { authors: string[] }) {
  if (!authors.length) return null
  return (
    <span className="text-xs font-sans text-neutral-400 truncate block">
      {authors.map((name, i) => (
        <span key={`${name}-${i}`}>
          <span>{name}</span>
          {i < authors.length - 1 && ', '}
        </span>
      ))}
    </span>
  )
}

export function ResearchTable({ content }: { content: LabsPapersContent }) {
  const router = useRouter()
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [active, setActive] = useState(0)
  const { activeCategory, setActiveCategory, options, filtered } = useCategoryFilter(content.papers, content.allLabel)

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        if (sortField === 'date') {
          const d = new Date(a.dateSort || a.date || '').getTime() - new Date(b.dateSort || b.date || '').getTime()
          return sortDir === 'asc' ? d : -d
        }
        if (sortField === 'category') {
          const d = (a.categories[0] || '').localeCompare(b.categories[0] || '')
          return sortDir === 'asc' ? d : -d
        }
        const d = (a.title || '').localeCompare(b.title || '')
        return sortDir === 'asc' ? d : -d
      }),
    [filtered, sortField, sortDir],
  )

  const open = (p: LabsPaperRow) => {
    const isExternal = !p.slug && p.href !== '#'
    if (isExternal) window.open(p.href, '_blank', 'noopener,noreferrer')
    else router.push(p.href)
  }

  // Scale's inner `S`, declared inside the component as on Scale: a new component type each render, so these buttons remount and a focused one loses focus. Kept on purpose.
  function SortButton({ field, label }: { field: SortField; label: string }) {
    return (
      <button
        onClick={() => {
          if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
          else {
            setSortField(field)
            setSortDir('asc')
          }
          setActive(0)
        }}
        className="text-xs font-sans text-ink font-semibold flex items-center gap-1.5 uppercase hover:text-neutral-600 transition-colors"
      >
        <Dot /> {label}
        {sortField === field && <ArrowUpDown className="w-2.5 h-2.5 text-neutral-500" />}
      </button>
    )
  }

  const current = sorted[active] || sorted[0]
  const c = content.columns

  return (
    <section className="w-full border-b border-neutral-300">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-20">
        <h1 className="text-sm font-sans font-medium text-ink mb-6 tracking-wide uppercase">{content.heading}</h1>
        <p className="text-sm font-sans text-neutral-600 leading-relaxed max-w-2xl mb-12">{content.blurb}</p>
        <CategoryFilterPills
          options={options}
          activeCategory={activeCategory}
          onSelect={(o) => {
            setActiveCategory(o)
            setActive(0)
          }}
        />
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <div className="hidden md:grid grid-cols-[100px_minmax(0,1fr)_100px_28px] gap-x-3 pb-3 border-b border-ink">
              <SortButton field="date" label={c.date} />
              <SortButton field="title" label={c.title} />
              <SortButton field="category" label={c.category} />
              <span />
            </div>
            <div className="grid grid-cols-[70px_1fr_28px] gap-x-3 pb-3 border-b border-ink md:hidden">
              <span className="text-xs font-sans text-ink font-semibold flex items-center gap-1 uppercase">
                <Dot /> {c.date}
              </span>
              <span className="text-xs font-sans text-ink font-semibold flex items-center gap-1 uppercase">
                <Dot /> {c.title}
              </span>
              <span />
            </div>
            {sorted.map((p, i) => (
              <div
                key={p.id}
                role="link"
                tabIndex={0}
                onClick={() => open(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') open(p)
                }}
                onMouseEnter={() => setActive(i)}
                className="hidden md:grid min-w-0 grid-cols-[100px_minmax(0,1fr)_100px_28px] gap-x-3 py-3.5 border-b border-neutral-200 hover:bg-neutral-50 transition-colors group cursor-pointer"
              >
                <span className="min-w-0 text-xs font-mono text-neutral-500">{p.date}</span>
                <span className="min-w-0 flex flex-col gap-0.5">
                  <span className="text-sm font-sans text-ink font-medium line-clamp-2">{p.title}</span>
                  <Authors authors={p.authors} />
                </span>
                <span className="min-w-0 text-xs font-sans text-neutral-500 truncate">{p.categories.join(', ')}</span>
                <span className="flex items-center justify-end">
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </span>
              </div>
            ))}
            {sorted.map((p) => (
              <div
                key={`m-${p.id}`}
                role="link"
                tabIndex={0}
                onClick={() => open(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') open(p)
                }}
                className="grid grid-cols-[70px_1fr_28px] gap-x-3 py-3.5 border-b border-neutral-200 hover:bg-neutral-50 transition-colors group md:hidden cursor-pointer"
              >
                <span className="text-xs font-mono text-neutral-500">{p.date}</span>
                <div className="min-w-0">
                  <span className="text-sm font-sans text-ink font-medium line-clamp-2">{p.title}</span>
                  <span className="text-xs font-sans text-neutral-500">{p.categories.join(', ')}</span>
                </div>
                <span className="flex items-center justify-end">
                  <ArrowRight className="w-3 h-3 text-neutral-500" />
                </span>
              </div>
            ))}
          </div>
          <div className="hidden lg:block w-[280px] shrink-0 relative">
            <div className="sticky top-20">
              <div className="w-full aspect-square bg-white overflow-hidden relative border border-neutral-200">
                {sorted.map((p, i) =>
                  p.image ? (
                    <div key={p.id} className="absolute inset-0 transition-opacity duration-300 ease-in-out" style={{ opacity: +(active === i) }}>
                      <div className="absolute inset-6">
                        <Image src={p.image} alt={p.title} fill sizes="280px" unoptimized className="object-contain object-center" />
                      </div>
                    </div>
                  ) : (
                    <div key={p.id} className="absolute inset-0 w-full h-full bg-neutral-200 flex items-center justify-center transition-opacity duration-300 ease-in-out" style={{ opacity: +(active === i) }}>
                      <span className="text-xs font-sans text-ink-faint">{content.noImage}</span>
                    </div>
                  ),
                )}
              </div>
              {current ? (
                <div className="mt-3">
                  <p className="text-xs font-sans font-medium text-ink">{current.title}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs font-sans text-neutral-500">
            {sorted.length} {sorted.length === 1 ? content.found.one : content.found.many} {content.found.suffix}
          </p>
        </div>
        {sorted.length === 0 ? <p className="text-sm font-sans text-neutral-500 text-center py-20">{content.empty}</p> : null}
      </div>
    </section>
  )
}
