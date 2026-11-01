'use client'

import { Fragment, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import type { DocsContent, SearchRecord } from './content'
import { Icon } from './icons'
import { resolveHref } from './links'
import { usePresence } from './usePresence'
import s from './docs.module.css'

/*
 * Mintlify search dialog (Base UI Dialog + Combobox) over a static snapshot index (searchIndex.json: every page
 * and heading of the live docs, built from its llms.txt + page markdown). Popup: 250ms cubic-bezier(0.22,1,0.36,1)
 * scale .96 -> 1 + fade, exit 150ms; backdrop black/40 fades on the same curve. Keyboard: arrows move the
 * highlight (looping), Enter opens, Alt+Enter asks the assistant, Escape closes.
 */

const escapeRe = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function searchRecords(records: SearchRecord[], query: string, limit: number) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const scored: { r: SearchRecord; matched: number; score: number; i: number }[] = []
  // A page's own top heading duplicates the page hit, so it is dropped (Mintlify returns one hit per page there).
  const pageTitles = new Map(records.filter((r) => r.k === 'p').map((r) => [r.h, r.t.toLowerCase()]))
  records.forEach((r, i) => {
    const title = r.t.toLowerCase()
    if (r.k === 's' && pageTitles.get(r.h.split('#')[0]) === title) return
    const crumbs = r.b.join(' ').toLowerCase()
    let matched = 0
    let score = 0
    for (const w of words) {
      const re = new RegExp('(^|[^a-z0-9])' + escapeRe(w))
      if (re.test(title)) {
        matched++
        score += title === w ? 60 : title.startsWith(w) ? 40 : 30
      } else if (title.includes(w)) {
        matched++
        score += 20
      } else if (re.test(crumbs)) {
        matched++
        score += 1
      }
    }
    if (matched) scored.push({ r, matched, score: score + (r.k === 'p' ? 15 : 0), i })
  })
  scored.sort((a, b) => b.matched - a.matched || b.score - a.score || a.i - b.i)
  return scored.slice(0, limit).map((x) => x.r)
}

export function highlight(text: string, query: string): ReactNode {
  const words = query.split(/\s+/).filter(Boolean).map(escapeRe)
  if (!words.length) return text
  const re = new RegExp('(' + words.join('|') + ')', 'ig')
  return text.split(re).map((part, i) =>
    i % 2 ? (
      <mark key={i}>
        <b>{part}</b>
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

type Props = {
  content: DocsContent
  open: boolean
  onClose: () => void
  onAsk: (q: string) => void
}

export default function DocsSearch({ content, open, onClose, onAsk }: Props) {
  const { mounted, attrs } = usePresence(open, 150)
  if (!mounted) return null
  return <SearchPopup content={content} open={open} onClose={onClose} onAsk={onAsk} attrs={attrs} />
}

function SearchPopup({ content, onClose, onAsk, attrs }: Props & { attrs: ReturnType<typeof usePresence>['attrs'] }) {
  const [query, setQuery] = useState('')
  const [hi, setHi] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const results = useMemo(() => searchRecords(content.search.records, query, content.search.limit), [content, query])
  const hasQuery = query.trim().length > 0
  const count = results.length + (hasQuery ? 1 : 0)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    const html = document.documentElement
    const overflow = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = overflow
      prev?.focus?.()
    }
  }, [])

  useEffect(() => setHi(0), [query])

  useEffect(() => {
    listRef.current?.querySelector('[data-highlighted]')?.scrollIntoView({ block: 'nearest' })
  }, [hi])

  const activate = (i: number) => {
    if (i < results.length) {
      window.location.href = resolveHref(content, results[i].h)
      onClose()
    } else if (hasQuery) {
      onAsk(query.trim())
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown' && count) {
      e.preventDefault()
      setHi((h) => (h + 1) % count)
    } else if (e.key === 'ArrowUp' && count) {
      e.preventDefault()
      setHi((h) => (h - 1 + count) % count)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (e.altKey) {
        if (hasQuery) onAsk(query.trim())
      } else if (count) activate(hi)
    }
  }


  return (
    <>
      <div className={s.searchBackdrop} {...attrs} />
      <div className={s.searchContainer} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label={content.search.placeholder}
          data-component-part="search-modal"
          className={s.searchModal}
          onKeyDown={onKeyDown}
          {...attrs}
        >
          <div className={s.searchHeader}>
            <div className={s.searchInputWrap}>
              <Icon name="Search" className={s.searchInputIcon} />
              <input
                ref={inputRef}
                id="search-input"
                role="combobox"
                aria-expanded="true"
                aria-controls="docs-search-list"
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                placeholder={content.search.placeholder}
                aria-label={content.search.placeholder}
                className={s.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="button" className={s.searchAskBtn} aria-keyshortcuts="Alt+Enter" onClick={() => onAsk(query.trim())}>
                {content.search.askLabel}
                <span className={s.searchAskHint} aria-hidden="true">
                  <Icon name="OptionKey" className={s.key} />
                  <Icon name="ReturnKey" className={s.key} />
                </span>
              </button>
            </div>
          </div>
          {hasQuery && (
            <>
              <div className={s.searchScroll} ref={listRef}>
                <div role="listbox" id="docs-search-list" className={s.searchList}>
                  {results.length > 0 && (
                    <div role="group" data-variant="results">
                      {results.map((r, i) => (
                        <a
                          key={r.h + i}
                          href={resolveHref(content, r.h)}
                          role="option"
                          aria-selected={hi === i}
                          tabIndex={-1}
                          className={s.searchItem}
                          data-highlighted={hi === i || undefined}
                          onMouseMove={() => hi !== i && setHi(i)}
                          onClick={onClose}
                        >
                          <span className={s.searchItemIconWrap}>
                            <Icon name={r.k === 'p' ? 'Page' : 'Hashtag'} className={s.searchItemIcon} />
                          </span>
                          <div className={s.searchItemBody}>
                            <span className={s.searchItemTitle}>{highlight(r.t, query)}</span>
                            <span className={s.searchCrumbs}>
                              {r.b.map((c, j) => (
                                <span key={j} className={s.searchCrumb}>
                                  {j > 0 && <Icon name="BreadcrumbSeparator" strokeWidth={2} className={s.searchSep} />}
                                  <span className={s.searchCrumbText}>{highlight(c, query)}</span>
                                </span>
                              ))}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                  <div role="group" data-variant="ask-ai" aria-label={content.search.askLabel}>
                    <div className={s.searchGroupLabel} aria-hidden="true">
                      {content.search.askLabel}
                    </div>
                    <div
                      role="option"
                      aria-selected={hi === results.length}
                      className={s.searchAskItem}
                      data-highlighted={hi === results.length || undefined}
                      onMouseMove={() => hi !== results.length && setHi(results.length)}
                      onClick={() => onAsk(query.trim())}
                    >
                      <Icon name="SparkleFilled" className={s.searchAskIcon} />
                      <span className={s.searchItemTitle}>
                        {content.search.askPrefix}
                        <mark className={s.askMark}>{query.trim()}</mark>
                        {content.search.askSuffix}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div role="status" aria-live="polite" className={s.srOnly}>
                Results: {results.length}
              </div>
              <div aria-hidden="true" className={s.searchFooter}>
                <div className={s.searchFooterLeft}>
                  <span className={s.searchHint}>
                    <span className={s.searchHintKeys}>
                      <Icon name="ArrowUpKey" className={s.key} />
                      <Icon name="ArrowDownKey" className={s.key} />
                    </span>
                    Select
                  </span>
                  <span className={s.searchHint}>
                    <Icon name="ReturnKey" className={s.key} />
                    Open
                  </span>
                </div>
                <span className={s.searchHint}>
                  <Icon name="EscKey" className={s.key} />
                  Close
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
