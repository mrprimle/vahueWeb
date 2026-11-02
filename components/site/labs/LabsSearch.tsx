'use client'

// labs.scale.com mounts Inkeep's InkeepModalSearchAndChat (chunks 1j-kp-07hrdzk.js, 25n1aq7vxfxt3.js, 1.5 MB, live API).
// This is the same modal rebuilt from measurements, over a static index: no network at runtime.
// Settings kept from Scale's call: maxResults 40, debounce 300ms, links in a new tab, overlay z-index 10000.
import { ArrowUpRight, CornerDownLeft, Search, Send, Sparkles, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/components/site/lib/cn'
import { useModal } from './LabsDialog'
import type { LabsChromeContent, LabsSearchEntry } from './types'

const MAX_RESULTS = 40
const DEBOUNCE_MS = 300

function terms(query: string) {
  return query.toLowerCase().split(/\s+/).filter(Boolean)
}

export function searchLabsIndex(index: LabsSearchEntry[], query: string) {
  const words = terms(query)
  if (!words.length) return []
  return index
    .map((entry) => {
      const title = entry.title.toLowerCase()
      const text = `${entry.crumb} ${entry.description}`.toLowerCase()
      let score = 0
      for (const w of words) {
        if (title.includes(w)) score += 3
        else if (text.includes(w)) score += 1
      }
      return { entry, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
    .map((r) => r.entry)
}

function highlight(text: string, query: string): ReactNode {
  const words = terms(query)
  if (!words.length) return text
  const pattern = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return text.split(pattern).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold text-[#494555]">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

function ViewToggle({ view, onChange, content }: { view: 'search' | 'chat'; onChange: (v: 'search' | 'chat') => void; content: LabsChromeContent['search'] }) {
  const item = (active: boolean) => cn('flex h-6 items-center gap-1 rounded-[4px] px-2 text-xs font-semibold', active ? 'bg-white text-[#374151] shadow-sm' : 'text-[#6b7280]')
  const icon = (active: boolean) => cn('size-3', active ? 'text-[#6b7280]' : 'text-[#9ca3af]')
  return (
    <div className="flex shrink-0 rounded-[6px] border border-transparent bg-[#f9fafb] p-0.5">
      <button type="button" onClick={() => onChange('search')} className={item(view === 'search')}>
        <Search className={icon(view === 'search')} />
        {content.searchTab}
      </button>
      <button type="button" onClick={() => onChange('chat')} className={item(view === 'chat')}>
        <Sparkles className={icon(view === 'chat')} />
        {content.askTab}
      </button>
    </div>
  )
}

function Mark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn('flex shrink-0 items-center justify-center rounded-[22%] bg-[#111] leading-none text-white', className)} style={{ fontFamily: 'var(--font-aeonik), -apple-system, Arial, sans-serif' }}>
      v
    </span>
  )
}

function CloseButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="flex size-6 shrink-0 items-center justify-center rounded-[6px] text-[#9ca3af] min-[769px]:hidden">
      <X className="size-[18px]" />
    </button>
  )
}

function PoweredBy({ content }: { content: LabsChromeContent['search'] }) {
  return (
    <div className="shrink-0 px-5 pt-1 pb-3 text-sm text-[#9ca3af]">
      {content.poweredBy} <span className="tracking-tight">{content.poweredByName}</span>
    </div>
  )
}

export function LabsSearch({ open, onOpenChange, content, index }: { open: boolean; onOpenChange: (open: boolean) => void; content: LabsChromeContent['search']; index: LabsSearchEntry[] }) {
  const [root, setRoot] = useState<Element | null>(null)
  const [view, setView] = useState<'search' | 'chat'>('search')
  const [query, setQuery] = useState('')
  const [applied, setApplied] = useState('')
  const [active, setActive] = useState(0)
  const [draft, setDraft] = useState('')
  const [asked, setAsked] = useState<{ question: string; hits: LabsSearchEntry[] }[]>([])
  const panel = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const close = useCallback(() => onOpenChange(false), [onOpenChange])
  const nodeRef = useRef(() => panel.current)
  useModal(open, close, nodeRef.current)

  useEffect(() => {
    setRoot(document.querySelector('.labs-root'))
  }, [])
  useEffect(() => {
    if (open && view === 'search') input.current?.focus()
  }, [open, view])
  useEffect(() => {
    const t = setTimeout(() => setApplied(query), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => searchLabsIndex(index, applied), [index, applied])
  useEffect(() => {
    setActive(0)
    list.current?.scrollTo({ top: 0 })
  }, [results])
  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const ask = (question: string) => {
    const q = question.trim()
    if (!q) return
    setAsked((a) => [...a, { question: q, hits: searchLabsIndex(index, q).slice(0, 3) }])
    setDraft('')
    setView('chat')
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (active >= 0 && results[active]) window.open(results[active].href, '_blank', 'noopener')
      else ask(query)
    }
  }

  const hasQuery = applied.trim().length > 0
  if (!open || !root) return null
  return createPortal(
    <div className="labs-search labs-search-fade fixed inset-0 z-[10000] flex items-start justify-center bg-[rgba(104,112,118,0.5)] backdrop-blur-[4px] min-[769px]:pt-[5vh]" data-lenis-prevent onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={content.searchTab}
        className={cn('labs-search-fade flex w-full flex-col overflow-hidden bg-white text-[#374151] shadow-lg max-[768px]:h-full min-[769px]:w-[min(90vw,720px)] min-[769px]:rounded-[6px]', hasQuery && view === 'search' ? 'min-[769px]:h-[min(662px,calc(581px+9vh))]' : '')}
      >
        {view === 'search' ? (
          <>
            <div className="flex h-[62px] shrink-0 items-center gap-3 px-5 py-3">
              <Search className="size-5 shrink-0 text-[#9ca3af]" />
              <input
                ref={input}
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="labs-search-results"
                value={query}
                placeholder={content.placeholder}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                className="h-[38px] min-w-0 flex-1 border-0 bg-transparent px-0 py-1.5 text-base text-[#374151] shadow-none outline-none placeholder:text-[#9ca3af] focus:ring-0"
              />
              <ViewToggle view={view} onChange={setView} content={content} />
              <CloseButton onClick={close} label={content.close} />
            </div>
            <div className={cn('flex min-h-0 flex-col', hasQuery && 'flex-1')}>
              <button
                type="button"
                role="option"
                aria-selected={active === -1}
                onClick={() => ask(query)}
                onMouseEnter={() => setActive(-1)}
                className={cn('mx-5 mb-4 flex h-11 shrink-0 items-center gap-2 rounded-[8px] border px-4 py-2 text-left', active === -1 ? 'border-[rgba(4,37,180,0.3)] bg-[#f9f9ff]' : 'border-[#eaecf1] bg-white')}
              >
                <Mark className="size-5 text-[15px]" />
                <span className="min-w-0 truncate font-medium text-[#4b5563]">
                  {content.askTrigger}
                  {query ? <span className="ml-2 font-semibold text-[#3538cc]">{query}</span> : null}
                </span>
                <span className="ml-auto shrink-0 text-xs text-[#6e7db0]">{content.startConversation}</span>
                <CornerDownLeft className="ml-1 size-4 shrink-0 text-[#aea9bb]" />
              </button>
              {hasQuery ? (
                <div className="flex min-h-0 flex-1 flex-col pb-2">
                  <div role="tablist" className="shrink-0 px-5 pb-2">
                    <button type="button" role="tab" aria-selected className="rounded-full border border-[rgba(4,37,180,0.3)] bg-[#f9f9ff] px-3 py-1 text-[13px] leading-[17.875px] font-medium text-[#0425b4]">
                      {content.allLabel} ({results.length})
                    </button>
                  </div>
                  <div ref={list} id="labs-search-results" role="tabpanel" className="labs-search-list -mt-px min-h-0 flex-1 overflow-y-auto px-5 py-1">
                    {results.length === 0 ? <p className="px-1 py-4 text-sm text-[#6b7280]">{content.noResults}</p> : null}
                    <div className="flex flex-col gap-2.5 pb-6">
                      {results.map((r, i) => {
                        const on = i === active
                        return (
                          <a
                            key={`${r.crumb}${r.title}`}
                            data-index={i}
                            role="option"
                            aria-selected={on}
                            href={r.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setActive(i)}
                            className={cn('group relative block rounded-[8px] border px-4 py-2', on ? 'border-[rgba(4,37,180,0.3)] bg-[#f9f9ff]' : 'border-[#eaecf1] bg-white')}
                          >
                            {r.crumb ? <div className="text-xs text-[#6b7280]">{r.crumb}</div> : null}
                            <div className="mt-1 flex items-center gap-2 pr-6">
                              <GlobeIcon className={on ? 'text-[#494555]' : 'text-[#9ca3af]'} />
                              <span className={cn('min-w-0 truncate font-medium', on ? 'text-[#1c1b22]' : 'text-[#374151]')}>{r.title}</span>
                            </div>
                            <div className="mt-1 truncate pr-6 text-[13px] leading-[19.5px] text-[#4b5563]">{highlight(r.description, applied)}</div>
                            {on ? <ArrowUpRight className="absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#534ce4]" /> : null}
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {hasQuery ? <PoweredBy content={content} /> : null}
          </>
        ) : (
          <div className="flex min-h-0 flex-col max-[768px]:h-full">
            <div className="flex h-[54px] shrink-0 items-center justify-between px-5 pt-4 pb-2">
              <div className="text-sm text-[#6b7280]">{content.askTab}</div>
              <div className="flex items-center">
                <ViewToggle view={view} onChange={setView} content={content} />
                <CloseButton onClick={close} label={content.close} />
              </div>
            </div>
            <div className="max-h-[440px] min-h-[174px] overflow-y-auto px-8 pt-6 pb-4 max-[768px]:max-h-none max-[768px]:flex-1">
              <div className="flex gap-6">
                <Mark className="mt-1.5 size-8 text-[24px]" />
                <div className="min-w-0 flex-1 space-y-3 text-base text-[#374151]">
                  <p>{content.chatGreeting}</p>
                  <p>{content.chatIntro}</p>
                  <p>
                    {content.chatAskPrefix} <code className="rounded-[4px] bg-[#6a5df9] px-1.5 py-0.5 font-mono text-[13px] font-bold text-white">{content.chatSubject}</code>.
                  </p>
                  {asked.map((a, i) => (
                    <div key={i} className="space-y-2 pt-2">
                      <p className="font-medium text-[#1c1b22]">{a.question}</p>
                      <p>{a.hits.length ? content.chatAnswerIntro : content.chatNoAnswer}</p>
                      {a.hits.map((h) => (
                        <a key={h.title} href={h.href} target="_blank" rel="noopener noreferrer" className="block text-[#534ce4] underline underline-offset-2">
                          {h.title}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ChatInput draft={draft} setDraft={setDraft} onSubmit={ask} content={content} />
            <PoweredBy content={content} />
          </div>
        )}
      </div>
    </div>,
    root,
  )
}

function ChatInput({ draft, setDraft, onSubmit, content }: { draft: string; setDraft: (v: string) => void; onSubmit: (q: string) => void; content: LabsChromeContent['search'] }) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(draft)
  }
  return (
    <form onSubmit={submit} className="mx-5 mb-1 flex h-[55px] shrink-0 items-center gap-3 rounded-[6px] bg-[#f9fafb] px-6 shadow-md">
      <input ref={ref} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={content.chatPlaceholder} aria-label={content.chatPlaceholder} className="min-w-0 flex-1 border-0 bg-transparent p-0 text-base text-[#374151] shadow-none outline-none placeholder:text-[#9ca3af] focus:ring-0" />
      <button type="submit" aria-label={content.askTab} className="shrink-0 text-[#9ca3af]">
        <Send className="size-4" />
      </button>
    </form>
  )
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('size-4 shrink-0', className)} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
