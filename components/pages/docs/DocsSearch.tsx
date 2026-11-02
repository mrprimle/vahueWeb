'use client'

// Search dialog, geometry and motion read from the live modal with no query typed.
// Scale's results come from Mintlify's API. Here a static title index, same rows as Mintlify's loading skeleton
// (icon column, title, path), so typing never leaves the page. See docs/specs/docs.md.
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { SearchIcon } from './DocsIcons'
import type { DocsContent } from './content.types'

type Entry = { title: string; href: string; path: string }

export function DocsSearch({
  open,
  content,
  pages,
  onClose,
  onNavigate,
  onAsk,
}: {
  open: boolean
  content: DocsContent
  pages: Entry[]
  onClose: () => void
  onNavigate: (href: string) => void
  onAsk: (query: string) => void
}) {
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      setMounted(true)
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
      const html = document.documentElement
      const prev = html.style.overflow
      html.style.overflow = 'hidden'
      return () => {
        cancelAnimationFrame(raf)
        html.style.overflow = prev
      }
    }
    setShown(false)
    const t = setTimeout(() => {
      setMounted(false)
      setQuery('')
      setActive(0)
      returnFocus.current?.focus?.()
    }, 150)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (mounted) input.current?.focus()
  }, [mounted])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const words = q.split(/\s+/)
    return pages.filter((p) => words.every((w) => `${p.title} ${p.path}`.toLowerCase().includes(w)))
  }, [pages, query])

  if (!mounted) return null

  const hasQuery = query.trim().length > 0

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'Enter' && e.altKey) {
      e.preventDefault()
      onAsk(query.trim())
    } else if (e.key === 'Enter') {
      const hit = results[active]
      if (hit) {
        e.preventDefault()
        onNavigate(hit.href)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (results.length) setActive((a) => (a + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (results.length) setActive((a) => (a <= 0 ? results.length - 1 : a - 1))
    }
  }

  const portalTarget = document.querySelector('.docs-root') ?? document.body
  return createPortal(
    <div onKeyDown={onKeyDown}>
      <div className="docs-backdrop" data-state={shown ? 'open' : 'closed'} data-search-item="backdrop" />
      <div
        className="docs-search-layer"
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            e.preventDefault()
            onClose()
          }
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={content.ui.searchPlaceholder}
          className="docs-search"
          data-state={shown ? 'open' : 'closed'}
          data-search-item="dialog"
          onMouseDown={(e) => {
            if (!(e.target instanceof HTMLElement && e.target.closest('input'))) e.preventDefault()
          }}
        >
          <div className="docs-search-head">
            <div className="docs-search-box">
              <SearchIcon />
              <input
                ref={input}
                id="search-input"
                className="docs-search-input"
                role="combobox"
                aria-expanded={hasQuery}
                aria-controls="docs-search-list"
                aria-autocomplete="list"
                aria-label={content.ui.searchPlaceholder}
                aria-describedby="search-keyboard-hints"
                placeholder={content.ui.searchPlaceholder}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
              />
              <button type="button" className="docs-search-ask" aria-keyshortcuts="Alt+Enter" onClick={() => onAsk(query.trim())}>
                {content.ui.askAssistant}
                <span className="docs-search-hint" aria-hidden>
                  <CmdGlyph />
                  <ReturnGlyph />
                </span>
              </button>
            </div>
          </div>
          <div id="docs-search-list" role="listbox" className="docs-search-list">
            {hasQuery && results.length === 0 ? <div className="docs-search-empty">{content.ui.searchNoResults}</div> : null}
            {results.map((r, i) => (
              <a
                key={r.href}
                role="option"
                aria-selected={i === active}
                href={r.href}
                className="docs-search-item"
                data-active={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(r.href)
                }}
              >
                <span>
                  <span className="docs-search-item-title">{r.title}</span>
                  <span className="docs-search-item-path">{r.path}</span>
                </span>
              </a>
            ))}
          </div>
          <p id="search-keyboard-hints" className="docs-sr">
            {content.ui.searchHints}
          </p>
        </div>
      </div>
    </div>,
    portalTarget,
  )
}

function CmdGlyph() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="14" height="14" rx="4" fill="currentColor" stroke="none" />
      <path stroke="var(--c-menu-bg)" d="M7 7h4v4H7zM7 7V5.5A1.5 1.5 0 1 0 5.5 7H7zM11 7h1.5A1.5 1.5 0 1 0 11 5.5V7zM7 11H5.5A1.5 1.5 0 1 0 7 12.5V11zM11 11v1.5a1.5 1.5 0 1 0 1.5-1.5H11z" strokeWidth={1} />
    </svg>
  )
}

function ReturnGlyph() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="14" height="14" rx="4" fill="currentColor" stroke="none" />
      <path stroke="var(--c-menu-bg)" d="M12.5 6v3.5a1 1 0 0 1-1 1h-6M7.5 8.5l-2 2 2 2" strokeWidth={1.25} />
    </svg>
  )
}
