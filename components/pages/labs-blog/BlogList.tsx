'use client'

// labs.scale.com/blog: BlogList 835536, useCategoryFilter 622866, CategoryFilterPills 353007 (chunk 3d2wpwokq5chh.js). Class strings verbatim.
// `enablePeopleLinks` is false and `authorFilter`, `hideHeader` are unset on this page, so the /people links and the "Posts by" header are not ported.
import { ArrowRight, ArrowUpDown, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { LabsBlogContent, LabsBlogPost } from './types'

type SortField = 'date' | 'title' | 'category'

// Scale's /blog/<slug> pages have no route here yet: every post opens the list route, as /labs does.
const postHref = '/labs/blog'

function formatDate(date: string) {
  return new Date(date.includes('T') ? date : `${date}T00:00:00`).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
}

function Dot() {
  return <span className="w-1 h-1 bg-ink rounded-full inline-block shrink-0" />
}

function SortButton({ field, label, sortField, toggleSort }: { field: SortField; label: string; sortField: SortField; toggleSort: (f: SortField) => void }) {
  return (
    <button onClick={() => toggleSort(field)} className="text-xs font-sans text-ink font-semibold flex items-center gap-1.5 uppercase hover:text-neutral-600 transition-colors">
      <Dot /> {label}
      {sortField === field && <ArrowUpDown className="w-2.5 h-2.5 text-neutral-500" />}
    </button>
  )
}

function useCategoryFilter(posts: LabsBlogPost[], allLabel: string) {
  const [activeCategory, setActiveCategory] = useState(allLabel)
  const options = useMemo(() => [allLabel, ...new Set(posts.flatMap((p) => p.categories))], [posts, allLabel])
  const filtered = useMemo(() => (activeCategory === allLabel ? posts : posts.filter((p) => p.categories.includes(activeCategory))), [posts, activeCategory, allLabel])
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

export function BlogList({ content }: { content: LabsBlogContent }) {
  const router = useRouter()
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [openId, setOpenId] = useState<string | null>(null)
  const { activeCategory, setActiveCategory, options, filtered } = useCategoryFilter(content.posts, content.allLabel)
  const c = content.columns
  const countWord = (n: number) => (n === 1 ? content.count.one : content.count.many)

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        if (sortField === 'date') {
          const x = new Date(a.date || '').getTime()
          const y = new Date(b.date || '').getTime()
          return sortDir === 'asc' ? x - y : y - x
        }
        if (sortField === 'title') {
          const d = (a.title || '').localeCompare(b.title || '')
          return sortDir === 'asc' ? d : -d
        }
        const d = (a.categories[0] || '').localeCompare(b.categories[0] || '')
        return sortDir === 'asc' ? d : -d
      }),
    [filtered, sortField, sortDir],
  )

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else {
      setSortField(field)
      setSortDir(field === 'date' ? 'desc' : 'asc')
    }
  }

  const groups = useMemo(() => {
    const byYear = new Map<string, LabsBlogPost[]>()
    for (const p of sorted) {
      const year = p.date ? String(new Date(p.date.includes('T') ? p.date : `${p.date}T00:00:00`).getUTCFullYear()) : '—'
      if (!byYear.has(year)) byYear.set(year, [])
      byYear.get(year)!.push(p)
    }
    const list = Array.from(byYear.entries()).map(([year, posts]) => ({ year, posts }))
    if (sortField === 'date') list.sort((a, b) => (sortDir === 'desc' ? Number(b.year) - Number(a.year) : Number(a.year) - Number(b.year)))
    return list
  }, [sorted, sortField, sortDir])

  return (
    <section className="w-full border-b border-neutral-300">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-20">
        <h1 className="text-sm font-sans font-medium text-ink mb-6 tracking-wide uppercase">{content.heading}</h1>
        <p className="text-sm font-sans text-neutral-600 leading-relaxed max-w-2xl mb-12">{content.blurb}</p>
        <CategoryFilterPills options={options} activeCategory={activeCategory} onSelect={setActiveCategory} />
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <div className="hidden md:grid grid-cols-[120px_minmax(0,1fr)_110px_minmax(0,1fr)_28px] gap-x-3 pb-3 border-b border-ink">
              <SortButton field="date" label={c.date} sortField={sortField} toggleSort={toggleSort} />
              <SortButton field="title" label={c.title} sortField={sortField} toggleSort={toggleSort} />
              <SortButton field="category" label={c.category} sortField={sortField} toggleSort={toggleSort} />
              <span className="text-xs font-sans text-ink font-semibold flex items-center gap-1.5 uppercase">
                <Dot /> {c.authors}
              </span>
              <span />
            </div>
            <div className="grid grid-cols-[80px_1fr_28px] gap-x-3 pb-3 border-b border-ink md:hidden">
              <span className="text-xs font-sans text-ink font-semibold flex items-center gap-1 uppercase">
                <Dot /> {c.date}
              </span>
              <span className="text-xs font-sans text-ink font-semibold flex items-center gap-1 uppercase">
                <Dot /> {c.title}
              </span>
              <span />
            </div>
            {groups.map(({ year, posts }) => (
              <div key={year}>
                <div className="flex items-center gap-4 py-4 border-b border-neutral-200">
                  <span className="text-xs font-mono font-semibold text-ink-faint uppercase tracking-widest">{year}</span>
                  <div className="flex-1 h-px bg-neutral-200" />
                  <span className="text-xs font-sans text-neutral-300">
                    {posts.length} {countWord(posts.length)}
                  </span>
                </div>
                {posts.map((p) => {
                  const key = p.slug ?? p.id
                  const isOpen = openId === key
                  const intro = p.intro
                  const categories = p.categories.join(', ')
                  const onRowClick = () => {
                    if (intro) setOpenId(isOpen ? null : key)
                    else if (p.slug) router.push(postHref)
                  }
                  return (
                    <div key={p.id} className="border-b border-neutral-200">
                      <div onClick={onRowClick} className={`hidden md:grid min-w-0 grid-cols-[120px_minmax(0,1fr)_110px_minmax(0,1fr)_28px] gap-x-3 py-3.5 hover:bg-neutral-50 transition-colors group ${intro || p.slug ? 'cursor-pointer' : ''}`}>
                        <span className="min-w-0 text-xs font-mono text-neutral-500">{p.date ? formatDate(p.date) : '—'}</span>
                        <span className="min-w-0 text-sm font-sans text-ink font-medium truncate">{p.title}</span>
                        <span className="min-w-0 text-xs font-sans text-neutral-500 truncate">{categories}</span>
                        <span className="min-w-0 text-xs font-sans text-neutral-500 truncate">{p.authors.join(', ') || '—'}</span>
                        <span className="flex items-center justify-end">{intro ? <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} /> : <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />}</span>
                      </div>
                      <div onClick={onRowClick} className={`grid grid-cols-[80px_1fr_28px] gap-x-3 py-3.5 hover:bg-neutral-50 transition-colors group md:hidden ${intro || p.slug ? 'cursor-pointer' : ''}`}>
                        <span className="text-xs font-mono text-neutral-500">{p.date ? formatDate(p.date) : '—'}</span>
                        <div className="min-w-0">
                          <span className="text-sm font-sans text-ink font-medium truncate block">{p.title}</span>
                          <span className="text-xs font-sans text-neutral-500">{categories}</span>
                        </div>
                        <span className="flex items-center justify-end">{intro ? <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} /> : <ArrowRight className="w-3 h-3 text-neutral-500" />}</span>
                      </div>
                      {intro && (
                        <div className={`pb-4 md:grid md:grid-cols-[120px_minmax(0,1fr)_28px] md:gap-x-3 ${isOpen ? '' : 'hidden'}`}>
                          <span className="hidden md:block" />
                          <div className="min-w-0">
                            <p className="text-xs font-sans text-neutral-600 leading-relaxed mb-3">{intro}</p>
                            <Link href={postHref} className="inline-flex items-center gap-1.5 text-xs font-sans text-ink hover:text-neutral-600 transition-colors uppercase tracking-wide">
                              {content.readPost} <ArrowRight className="w-3 h-3" />
                            </Link>
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
          <p className="text-xs font-sans text-neutral-500">
            {sorted.length} {countWord(sorted.length)} {content.count.foundSuffix}
          </p>
        </div>
        {sorted.length === 0 && <p className="text-sm font-sans text-neutral-500 text-center py-20">{content.empty}</p>}
      </div>
    </section>
  )
}
