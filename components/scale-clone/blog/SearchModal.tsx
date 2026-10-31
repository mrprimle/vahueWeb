'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { SearchIcon } from './FilterBar'
import type { Post } from './posts'
import s from './blog.module.css'

/*
 * scale.com BlogSearchModal (module 507457, function w), portalled to <body>.
 * Overlay: fixed inset-0 z-[999], bg-black/60 backdrop; mousedown on the backdrop closes.
 * Panel: bottom sheet on mobile (rounded-t-2xl, max-h 90svh, drag handle), centred max-w-2xl at 12vh on md+.
 * Empty query lists "Recent posts" (first 8). Keys: Esc closes, Up/Down move the highlight, Enter opens.
 * Scale stops Lenis while open; here the panel carries data-lenis-prevent so wheel stays inside it.
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

type Props = { posts: Post[]; isOpen: boolean; onClose: () => void }

export default function SearchModal({ posts, isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false)
  const [q, setQ] = useState('')
  const [hi, setHi] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)

  useEffect(() => setMounted(true), [])

  const query = q.trim().toLowerCase()
  const results = query
    ? posts.filter((p) => p.title.toLowerCase().includes(query) || p.category?.name.toLowerCase().includes(query)).slice(0, 8)
    : posts.slice(0, 8)

  useEffect(() => {
    if (!isOpen) return
    setQ('')
    setHi(0)
    const t = setTimeout(() => input.current?.focus(), 50)
    return () => clearTimeout(t)
  }, [isOpen])

  useEffect(() => setHi(0), [q])

  useEffect(() => {
    const el = list.current?.children[hi] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [hi])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHi((h) => Math.max(0, Math.min(h + 1, results.length - 1)))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHi((h) => Math.max(h - 1, 0))
      } else if (e.key === 'Enter' && results[hi]) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, results, hi, onClose])

  if (!mounted || !isOpen) return null

  const label = query ? `${results.length} result${results.length !== 1 ? 's' : ''}` : 'Recent posts'

  return createPortal(
    <div
      className="scale-clone fixed inset-0 z-[999] flex flex-col justify-end font-display md:items-start md:justify-center md:px-4 md:pt-[12vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      data-lenis-prevent
    >
      <div className="pointer-events-none absolute inset-0 bg-black/60" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search posts"
        className="relative flex max-h-[90svh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl md:mx-auto md:max-h-none md:max-w-2xl md:rounded-2xl"
      >
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
            placeholder="Search posts..."
            className={`${s.body1} flex-1 bg-transparent text-black outline-none placeholder:text-[#929292] focus:outline-none focus:ring-0`}
          />
          {q && (
            <button type="button" onClick={() => setQ('')} className="p-1 text-[#575757] transition-colors hover:text-black focus:outline-none" aria-label="Clear">
              <CloseIcon />
            </button>
          )}
          <button type="button" onClick={onClose} className={`${s.detailMono} shrink-0 px-1 font-mono text-[#575757] focus:outline-none md:hidden`}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`${s.detailMono} hidden shrink-0 rounded-lg bg-[#f2f2f2] px-2 py-1 font-mono text-[#929292] transition-colors hover:bg-[#eaeaea] focus:outline-none md:block`}
          >
            Esc
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain md:max-h-[55vh]">
          {results.length === 0 ? (
            <div className={`${s.detailMono} px-5 py-12 text-center font-mono text-[#929292]`}>No results for &ldquo;{q}&rdquo;</div>
          ) : (
            <>
              <p className={`${s.detailMono} px-5 pb-2 pt-4 font-mono text-[#929292]`}>{label}</p>
              <ul ref={list} className="pb-3">
                {results.map((p, i) => (
                  <li key={p.slug}>
                    <a
                      href="#"
                      onClick={onClose}
                      onMouseEnter={() => setHi(i)}
                      className={`flex items-center gap-4 px-5 py-3.5 transition-colors focus:outline-none ${i === hi ? 'bg-[#f2f2f2]' : 'hover:bg-[#f2f2f2]'}`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[16px] leading-[1.5] tracking-[-0.01em] text-black">{highlight(p.title, q)}</p>
                        {p.category && <p className={`${s.detailMono} mt-0.5 font-mono text-[#929292]`}>{p.category.name}</p>}
                      </div>
                      <span className={`${s.detailMono} hidden shrink-0 font-mono text-[#929292] md:block`}>{p.date}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="hidden shrink-0 items-center gap-5 border-t border-[#eaeaea] px-5 py-3 md:flex">
          <span className={`${s.detailMono} font-mono text-[#929292]`}>↑↓ Navigate</span>
          <span className={`${s.detailMono} font-mono text-[#929292]`}>↵ Open</span>
          <span className={`${s.detailMono} ml-auto font-mono text-[#929292]`}>⌘K to search</span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
