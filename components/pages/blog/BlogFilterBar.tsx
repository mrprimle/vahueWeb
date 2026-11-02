'use client'

// Scale module 507457, chunk 126gr-esjog6p.js: tag pills, More panel, phone rail, search modal.
// Scale's modal queries Algolia (index scale_com_lx5v19e6hj_pages, hitsPerPage 8, type:blog) on a 200ms debounce.
// This site has no runtime CMS: the same debounce and hit count run over the static post list.
import { useLenis } from 'lenis/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { BlogPost, BlogTag, BlogUi } from './types'

// react-icons Md glyphs from module 473665 (y_, MG, pA), rendered as GenIcon does: 1em, currentColor.
function GenIcon({ d, blank, className }: { d: string; blank: string; className?: string }) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d={blank} />
      <path d={d} />
    </svg>
  )
}
const SearchIcon = ({ className }: { className?: string }) => (
  <GenIcon
    className={className}
    blank="M0 0h24v24H0z"
    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
  />
)
const ChevronIcon = ({ className }: { className?: string }) => <GenIcon className={className} blank="M0 0h24v24H0V0z" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
const CloseIcon = ({ className }: { className?: string }) => (
  <GenIcon className={className} blank="M0 0h24v24H0z" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
)

const pill = (active: boolean) =>
  `px-3 py-1.5 rounded-full detail-mono transition-colors shrink-0 focus:outline-none ${active ? 'bg-black text-white' : 'bg-scale-gray-95 text-scale-gray-30 hover:bg-scale-gray-90'}`

function Pills({ tags, activeCategory, onSearchOpen, ui }: { tags: BlogTag[]; activeCategory: string; onSearchOpen: () => void; ui: BlogUi }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const visible = tags.slice(0, 5)
  const overflow = tags.slice(5)
  const overflowActive = overflow.some((t) => t.slug === activeCategory)
  useEffect(() => {
    if (!rail.current) return
    const current = rail.current.querySelector('[aria-current]')
    current?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [activeCategory])
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])
  return (
    <div className="flex flex-col gap-3">
      <div className="md:hidden flex items-center gap-2 -mx-4 px-4">
        <div ref={rail} className="flex flex-1 items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link href="/blog" className={pill(!activeCategory)} aria-current={activeCategory ? undefined : 'page'}>
            {ui.all}
          </Link>
          {tags.map((t) => (
            <Link key={t.id} href={`/blog/category/${t.slug}`} className={pill(activeCategory === t.slug)} aria-current={activeCategory === t.slug ? 'page' : undefined}>
              {t.name}
            </Link>
          ))}
        </div>
        <button type="button" onClick={onSearchOpen} className="px-3 py-1.5 rounded-full bg-scale-gray-95 text-scale-gray-30 shrink-0 focus:outline-none flex items-center" aria-label={ui.searchAria}>
          <SearchIcon className="text-base" />
        </button>
      </div>
      <div className="hidden md:flex md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          <Link href="/blog" className={pill(!activeCategory)}>
            {ui.all}
          </Link>
          {visible.map((t) => (
            <Link key={t.id} href={`/blog/category/${t.slug}`} className={pill(activeCategory === t.slug)}>
              {t.name}
            </Link>
          ))}
          {overflow.length > 0 && (
            <div ref={wrap} className="relative">
              <button type="button" onClick={() => setOpen((v) => !v)} className={pill(overflowActive)}>
                <span className="flex items-center gap-1">
                  {overflowActive ? tags.find((t) => t.slug === activeCategory)?.name : ui.more}
                  <ChevronIcon className={`text-base transition-transform ${open ? 'rotate-180' : ''}`} />
                </span>
              </button>
              {open && (
                <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-scale-gray-80 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
                  {overflow.map((t) => (
                    <Link
                      key={t.id}
                      href={`/blog/category/${t.slug}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 detail-mono transition-colors ${activeCategory === t.slug ? 'text-black bg-scale-gray-95' : 'text-scale-gray-30 hover:bg-scale-gray-95 hover:text-black'}`}
                    >
                      {t.name}
                      {activeCategory === t.slug && <span>✓</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onSearchOpen}
          className="flex items-center gap-2 w-56 shrink-0 pl-3 pr-4 py-2 rounded-xl border border-scale-gray-80 detail-mono text-scale-gray-60 hover:border-scale-gray-30 hover:text-black transition-colors bg-white text-left focus:outline-none"
        >
          <SearchIcon className="text-lg shrink-0" />
          <span className="flex-1">{ui.search}</span>
          <span className="text-xs bg-scale-gray-95 rounded px-1.5 py-0.5 text-scale-gray-60">{ui.shortcut}</span>
        </button>
      </div>
    </div>
  )
}

function highlight(title: string, query: string) {
  if (!query.trim()) return <>{title}</>
  const at = title.toLowerCase().indexOf(query.toLowerCase())
  if (at === -1) return <>{title}</>
  return (
    <>
      {title.slice(0, at)}
      <mark className="bg-black/10 text-black rounded-sm not-italic">{title.slice(at, at + query.length)}</mark>
      {title.slice(at + query.length)}
    </>
  )
}

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'America/Los_Angeles' })

function SearchModal({ posts, index, isOpen, onClose, ui }: { posts: BlogPost[]; index: BlogPost[]; isOpen: boolean; onClose: () => void; ui: BlogUi }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const [mounted, setMounted] = useState(false)
  const request = useRef(0)
  const [hits, setHits] = useState<BlogPost[]>([])
  const lenis = useLenis()
  useEffect(() => {
    setMounted(true)
  }, [])
  const shown = query.trim() ? hits : posts.slice(0, 8)
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActive(0)
      lenis?.stop()
      setTimeout(() => input.current?.focus(), 50)
    } else lenis?.start()
    return () => {
      lenis?.start()
    }
  }, [isOpen, lenis])
  useEffect(() => {
    if (!query.trim()) {
      setHits([])
      return
    }
    const id = ++request.current
    const timer = setTimeout(() => {
      if (id !== request.current) return
      const q = query.trim().toLowerCase()
      setHits(index.filter((p) => p.title.toLowerCase().includes(q) || p.category?.name.toLowerCase().includes(q)).slice(0, 8))
    }, 200)
    return () => clearTimeout(timer)
  }, [query, index])
  useEffect(() => {
    setActive(0)
  }, [query])
  useEffect(() => {
    list.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [active])
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setActive((i) => Math.max(0, Math.min(i + 1, shown.length - 1)))
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setActive((i) => Math.max(i - 1, 0))
        }
        if (e.key === 'Enter' && shown[active]) {
          onClose()
          router.push(`/blog/${shown[active].slug}`)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, shown, active, onClose])
  if (!mounted || !isOpen) return null
  const label = query.trim() ? `${shown.length} ${shown.length !== 1 ? ui.resultMany : ui.resultOne}` : ui.recentPosts
  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex flex-col justify-end md:items-start md:justify-center md:pt-[12vh] md:px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden />
      <div className="relative w-full md:max-w-2xl md:mx-auto bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90svh] md:max-h-none">
        <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-9 h-1 rounded-full bg-scale-gray-80" />
        </div>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-scale-gray-90 shrink-0">
          <SearchIcon className="text-xl text-scale-gray-30 shrink-0" />
          <input
            ref={input}
            type="search"
            inputMode="search"
            enterKeyHint="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={ui.searchPlaceholder}
            className="flex-1 body1 text-black placeholder:text-scale-gray-60 outline-none focus:outline-none focus:ring-0 bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-scale-gray-30 hover:text-black transition-colors focus:outline-none p-1">
              <CloseIcon className="text-lg" />
            </button>
          )}
          <button onClick={onClose} className="md:hidden detail-mono text-scale-gray-30 shrink-0 focus:outline-none px-1">
            {ui.cancel}
          </button>
          <button onClick={onClose} className="hidden md:block detail-mono text-scale-gray-60 bg-scale-gray-95 rounded-lg px-2 py-1 hover:bg-scale-gray-90 transition-colors shrink-0 focus:outline-none">
            {ui.escape}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain md:max-h-[55vh]">
          {shown.length === 0 ? (
            <div className="px-5 py-12 text-center detail-mono text-scale-gray-60">
              {ui.noResultsBefore}
              {query}
              {ui.noResultsAfter}
            </div>
          ) : (
            <>
              <p className="px-5 pt-4 pb-2 detail-mono text-scale-gray-60 uppercase">{label}</p>
              <ul ref={list} className="pb-3">
                {shown.map((p, i) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      onClick={onClose}
                      onMouseEnter={() => setActive(i)}
                      className={`flex items-center gap-4 px-5 py-3.5 transition-colors focus:outline-none ${i === active ? 'bg-scale-gray-95' : 'hover:bg-scale-gray-95'}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="body2-regular text-black truncate">{highlight(p.title, query)}</p>
                        {p.category && <p className="detail-mono text-scale-gray-60 mt-0.5">{p.category.name}</p>}
                      </div>
                      {p.date && <span className="detail-mono text-scale-gray-60 shrink-0 hidden md:block">{formatDate(p.date)}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="hidden md:flex items-center gap-5 px-5 py-3 border-t border-scale-gray-90 shrink-0">
          <span className="detail-mono text-scale-gray-60">{ui.navigate}</span>
          <span className="detail-mono text-scale-gray-60">{ui.open}</span>
          <span className="detail-mono text-scale-gray-60 ml-auto">{ui.searchHint}</span>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function BlogFilterBar({ tags, posts, index, activeCategory = '', ui }: { tags: BlogTag[]; posts: BlogPost[]; index: BlogPost[]; activeCategory?: string; ui: BlogUi }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <>
      <section className="bg-white pb-6 md:pb-8">
        <div className="grid-layout-mobile md:grid-layout-desktop">
          <div className="col-span-full">
            <Pills tags={tags} activeCategory={activeCategory} onSearchOpen={() => setOpen(true)} ui={ui} />
          </div>
        </div>
      </section>
      <SearchModal posts={posts} index={index} isOpen={open} onClose={() => setOpen(false)} ui={ui} />
    </>
  )
}
