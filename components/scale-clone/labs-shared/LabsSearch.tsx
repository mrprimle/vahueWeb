'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CornerDownLeft, SearchIcon, Sparkles } from './icons'
import { labsGeistMono, labsInter } from './fonts'
import { labsHref } from './links'
import s from './labs.module.css'

export type LabsSearchItem = { title: string; href: string; kind: string; snippet?: string }

const BRAND = '#6a5df9'

function Mark({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'))
  return <>{parts.map((p, i) => (p.toLowerCase() === q.toLowerCase() ? <b key={i} className="font-semibold text-[#111]">{p}</b> : p))}</>
}

const Globe = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="shrink-0 text-[#4b5563]">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

/*
 * Static stand-in for labs' Inkeep "ModalSearchAndChat" (lazy chunk 25n1aq7vxfxt3.js, apiKey-backed, forced light
 * mode, primaryBrandColor #6a5df9, placeholder "Search Scale Labs", debounce 300ms, max 40 results, links in new tab).
 * The clone keeps the modal chrome (Search / Ask AI toggle, "Ask AI · Start conversation" row) and filters a static
 * index of the page's own items instead of calling Inkeep. Opened by the header button or Cmd/Ctrl+K.
 */
export default function LabsSearch({ open, onOpenChange, items = [] }: { open: boolean; onOpenChange: (v: boolean) => void; items?: LabsSearchItem[] }) {
  const [q, setQ] = useState('')
  const [dq, setDq] = useState('')
  const [mode, setMode] = useState<'search' | 'chat'>('search')
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setDq(q), 300)
    return () => clearTimeout(t)
  }, [q])

  useEffect(() => {
    if (!open) return
    setQ('')
    setDq('')
    setMode('search')
    requestAnimationFrame(() => input.current?.focus())
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    const lenis = (window as unknown as { __labsLenis?: { stop(): void; start(): void } }).__labsLenis
    lenis?.stop()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prev
      lenis?.start()
    }
  }, [open, onOpenChange])

  const results = useMemo(() => {
    const t = dq.trim().toLowerCase()
    if (!t) return []
    return items.filter((i) => (i.title + ' ' + (i.snippet ?? '')).toLowerCase().includes(t)).slice(0, 40)
  }, [dq, items])

  if (!open) return null
  return createPortal(
    <div className={`${labsInter.variable} ${labsGeistMono.variable} ${s.portal}`}>
      <div data-state="open" className={`${s.inkeepOverlay} fixed inset-0`} style={{ zIndex: 10000 }} onClick={() => onOpenChange(false)} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search Scale Labs"
        data-state="open"
        className={`${s.inkeepModal} fixed left-1/2 top-[45px] -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[720px] bg-white rounded-[4px] px-5 pt-[14px] pb-4`}
        style={{ zIndex: 10001 }}
      >
        <div className="flex items-center gap-3 h-[34px]">
          <SearchIcon className="w-[18px] h-[18px] text-[#6b7280] shrink-0" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={mode === 'search' ? 'Search Scale Labs' : 'Ask anything about Scale Labs...'}
            className="flex-1 min-w-0 bg-transparent outline-none text-[17px] text-[#111] placeholder:text-[#9ca3af]"
          />
          <div className="flex items-center rounded-[6px] bg-[#f3f4f6] p-[2px] text-[13px] font-medium">
            <button
              type="button"
              onClick={() => setMode('search')}
              className={`flex items-center gap-1.5 rounded-[5px] px-2 h-[24px] ${mode === 'search' ? 'bg-white text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.12)]' : 'text-[#6b7280]'}`}
            >
              <SearchIcon className="w-3 h-3" /> Search
            </button>
            <button
              type="button"
              onClick={() => setMode('chat')}
              className={`flex items-center gap-1.5 rounded-[5px] px-2 h-[24px] ${mode === 'chat' ? 'bg-white text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.12)]' : 'text-[#6b7280]'}`}
            >
              <Sparkles className="w-3 h-3" /> Ask AI
            </button>
          </div>
        </div>
        <div className="mt-[13px] flex flex-col">
          <button
            type="button"
            onClick={() => setMode('chat')}
            className="flex items-center justify-between gap-3 rounded-[6px] border border-[#e5e7eb] px-4 h-[44px] text-left hover:bg-[#f9fafb]"
          >
            <span className="flex items-center gap-2.5 text-[17px] text-[#111] min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scale-clone/labs/triangle-nav-logo.png" alt="" width={22} height={22} className="w-[22px] h-[22px]" />
              Ask AI
              {dq.trim() && <span className="ml-1 font-medium truncate" style={{ color: '#3f37c9' }}>{dq.trim()}</span>}
            </span>
            <span className="flex items-center gap-3 text-[13px] text-[#4b5563] shrink-0">
              Start conversation <CornerDownLeft className="w-4 h-4" />
            </span>
          </button>
          {dq.trim() && (
            <>
              <div className="mt-4 mb-[10px]">
                <span className="inline-flex items-center rounded-full border px-3 h-[27px] text-[13px] font-medium" style={{ borderColor: '#a5a0f5', color: '#3f37c9', background: '#f5f4ff' }}>
                  All ({results.length})
                </span>
              </div>
              <div className="flex flex-col gap-[10px] max-h-[452px] overflow-y-auto" data-lenis-prevent="">
                {results.map((r, i) => (
                  <a
                    key={r.href + r.title}
                    href={labsHref(r.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-[6px] border px-4 py-[13px] hover:bg-[#fafaff]"
                    style={{ borderColor: i === 0 ? '#c4c0f7' : '#e5e7eb' }}
                  >
                    <span className="block text-[12px] text-[#4b5563] mb-[6px]">{r.kind}</span>
                    <span className="flex items-center gap-2 text-[17px] text-[#111]">
                      <Globe />
                      <span className="truncate flex-1">{r.title}</span>
                      {i === 0 && (
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={BRAND} strokeWidth="2" aria-hidden="true">
                          <path d="M7 17 17 7M7 7h10v10" />
                        </svg>
                      )}
                    </span>
                    {r.snippet && (
                      <span className="block truncate text-[14px] text-[#374151] mt-[6px]">
                        <Mark text={r.snippet} q={dq.trim()} />
                      </span>
                    )}
                  </a>
                ))}
                {!results.length && <p className="px-1 py-3 text-[14px] text-[#6b7280] m-0">No results for “{dq.trim()}”</p>}
              </div>
              <p className="mt-[18px] mb-0 text-[14px] text-[#6b7280]">
                Powered by <span className="tracking-[0.02em]">inkeep</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
