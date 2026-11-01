'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type Lenis from 'lenis'
import { SearchIcon } from './FilterBar'
import { formatPostDate, postHref, type BlogContent, type BlogPost } from './content'
import s from './blog.module.css'

/*
 * scale.com BlogSearchModal (module 507457, function w), portalled to <body>.
 * Overlay: fixed inset-0 z-[999], bg-black/60; mousedown on the overlay itself closes.
 * Panel: bottom sheet below 768px (rounded-t-2xl, max-h 90svh, drag handle), centred max-w-2xl at pt-12vh on md+.
 * Open: query and highlight reset, Lenis stopped (html.lenis-stopped), input focused after 50ms; close restarts Lenis.
 * Empty query lists the first 8 posts ("Recent posts"). Scale queries Algolia (index scale_com_lx5v19e6hj_pages,
 * facetFilters type:blog, 8 hits, 200ms debounce, stale responses dropped); the clone filters the static snapshot the
 * by title (case-insensitive substring; Algolia ranks by relevance and typo tolerance, the clone keeps index order),
 * with the same debounce and 8-hit cap.
 * Keys (window keydown while open): Escape closes, ArrowDown/ArrowUp move the highlight (clamped, preventDefault),
 * Enter closes and navigates to the highlighted post. Mouse enter on a result highlights it. The highlighted row
 * is scrolled into view ({ block: "nearest" }).
 */

const CloseIcon = () => (
  <svg className="text-lg" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" aria-hidden="true">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)

function highlight(title: string, q: string): ReactNode {
  if (!q.trim()) return title
  const i = title.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return title
  return (
    <>
      {title.slice(0, i)}
      <mark className="rounded-sm bg-black/10 not-italic text-black">{title.slice(i, i + q.length)}</mark>
      {title.slice(i + q.length)}
    </>
  )
}

const lenis = () => (window as unknown as { __lenis?: Lenis }).__lenis

type Props = { content: BlogContent; posts: BlogPost[]; isOpen: boolean; onClose: () => void }

export default function SearchModal({ content, posts, isOpen, onClose }: Props) {
  const { labels } = content
  const router = useRouter()
  const [q, setQ] = useState('')
  const [hi, setHi] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [hits, setHits] = useState<BlogPost[]>([])
  const seq = useRef(0)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)

  useEffect(() => setMounted(true), [])

  const results = q.trim() ? hits : posts.slice(0, 8)

  useEffect(() => {
    if (isOpen) {
      setQ('')
      setHi(0)
      lenis()?.stop()
      setTimeout(() => input.current?.focus(), 50)
    } else lenis()?.start()
    return () => {
      lenis()?.start()
    }
  }, [isOpen])

  // Debounced query (200ms), latest request wins.
  useEffect(() => {
    if (!q.trim()) {
      setHits([])
      return
    }
    const id = ++seq.current
    const t = setTimeout(() => {
      const n = q.toLowerCase()
      const found = posts.filter((p) => p.title.toLowerCase().includes(n)).slice(0, 8)
      if (id === seq.current) setHits(found)
    }, 200)
    return () => clearTimeout(t)
  }, [q, posts])

  useEffect(() => setHi(0), [q])

  useEffect(() => {
    ;(list.current?.children[hi] as HTMLElement | undefined)?.scrollIntoView({ block: 'nearest' })
  }, [hi])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setHi((h) => Math.max(0, Math.min(h + 1, results.length - 1)))
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setHi((h) => Math.max(h - 1, 0))
        }
        if (e.key === 'Enter' && results[hi]) {
          onClose()
          const href = postHref(content, results[hi])
          if (/^https?:/.test(href)) window.location.assign(href)
          else router.push(href)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, results, hi, onClose, content, router])

  if (!mounted || !isOpen) return null

  const label = q.trim() ? `${results.length} ${results.length !== 1 ? labels.results : labels.result}` : labels.searchRecent

  return createPortal(
    <div
      className={`scale-clone ${s.modal} fixed inset-0 z-[999] flex flex-col justify-end font-display md:items-start md:justify-center md:px-4 md:pt-[12vh]`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      <div className="relative flex max-h-[90svh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl md:mx-auto md:max-h-none md:max-w-2xl md:rounded-2xl">
        <div className="flex shrink-0 justify-center pb-1 pt-3 md:hidden">
          <div className="h-1 w-9 rounded-full bg-[#c7c7c7]" />
        </div>
        <div className="flex shrink-0 items-center gap-3 border-b border-[#eaeaea] px-5 py-4">
          <SearchIcon className="shrink-0 text-xl text-[#575757]" />
          <input
            ref={input}
            type="search"
            inputMode="search"
            enterKeyHint="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className={`${s.body1} ${s.input} flex-1 bg-transparent text-black placeholder:text-[#929292]`}
          />
          {q && (
            <button type="button" onClick={() => setQ('')} className={`${s.ease} ${s.hoverBlack} p-1 text-[#575757] transition-colors focus:outline-none ${s.noOutline}`}>
              <CloseIcon />
            </button>
          )}
          <button type="button" onClick={onClose} className={`${s.detailMono} shrink-0 px-1 font-mono text-[#575757] focus:outline-none md:hidden ${s.noOutline}`}>
            {labels.searchCancel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`${s.detailMono} ${s.ease} ${s.hoverGray90} hidden shrink-0 rounded-lg bg-[#f2f2f2] px-2 py-1 font-mono text-[#929292] transition-colors focus:outline-none md:block ${s.noOutline}`}
          >
            {labels.searchEsc}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain md:max-h-[55vh]">
          {results.length === 0 ? (
            <div className={`${s.detailMono} px-5 py-12 text-center font-mono text-[#929292]`}>
              {labels.searchNoResults} &ldquo;{q}&rdquo;
            </div>
          ) : (
            <>
              <p className={`${s.detailMono} px-5 pb-2 pt-4 font-mono text-[#929292]`}>{label}</p>
              <ul ref={list} className="pb-3">
                {results.map((p, i) => (
                  <li key={p.slug}>
                    <Link
                      href={postHref(content, p)}
                      onClick={onClose}
                      onMouseEnter={() => setHi(i)}
                      className={`${s.ease} flex items-center gap-4 px-5 py-3.5 transition-colors focus:outline-none ${s.noOutline} ${i === hi ? 'bg-[#f2f2f2]' : s.hoverGray95}`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className={`${s.body2} truncate text-black`}>{highlight(p.title, q)}</p>
                        {p.category && <p className={`${s.detailMono} mt-0.5 font-mono text-[#929292]`}>{p.category.name}</p>}
                      </div>
                      {p.date && <span className={`${s.detailMono} hidden shrink-0 font-mono text-[#929292] md:block`}>{formatPostDate(p.date)}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="hidden shrink-0 items-center gap-5 border-t border-[#eaeaea] px-5 py-3 md:flex">
          <span className={`${s.detailMono} font-mono text-[#929292]`}>{labels.searchNavigate}</span>
          <span className={`${s.detailMono} font-mono text-[#929292]`}>{labels.searchOpen}</span>
          <span className={`${s.detailMono} ml-auto font-mono text-[#929292]`}>{labels.searchHint}</span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
