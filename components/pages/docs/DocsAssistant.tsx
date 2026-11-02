'use client'

// Assistant panel. At 1024 and up, a rail of 368 to 576 beside the page (`--assistant-sheet-width`, opens with no
// transition, resized by the grip, width and open state kept in localStorage under Mintlify's keys). Below 1024, a
// bottom drawer. Scale sends to Mintlify's assistant API; this has no backend, so nothing leaves the page.
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AttachIcon, CloseIcon, ExpandIcon, SparkleIcon } from './DocsIcons'
import type { DocsContent } from './content.types'

const OPEN_KEY = 'chat-assistant-sheet-open'
const WIDTH_KEY = 'chat-assistant-sheet-width'
const MIN = 368
const MAX = 576

type Message = { role: 'user' | 'assistant'; text: string }

const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v))

export function useAssistant(content: DocsContent) {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(MIN)
  const [messages, setMessages] = useState<Message[]>([])
  const [isDesktop, setIsDesktop] = useState(true)
  const focusNonce = useRef(0)
  const [, force] = useState(0)

  useLayoutEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const sync = () => setIsDesktop(desktop.matches)
    sync()
    desktop.addEventListener('change', sync)
    try {
      if (desktop.matches) {
        const stored = localStorage.getItem(OPEN_KEY)
        if (stored !== null) setOpen(JSON.parse(stored) === true)
        const w = localStorage.getItem(WIDTH_KEY)
        if (w !== null) setWidth(clamp(Number(JSON.parse(w))))
      }
    } catch {
      /* private window */
    }
    return () => desktop.removeEventListener('change', sync)
  }, [])

  const setOpenStored = useCallback((value: boolean | ((v: boolean) => boolean)) => {
    setOpen((current) => {
      const next = typeof value === 'function' ? value(current) : value
      try {
        localStorage.setItem(OPEN_KEY, JSON.stringify(next))
      } catch {
        /* private window */
      }
      return next
    })
    focusNonce.current += 1
    force((n) => n + 1)
  }, [])

  const toggle = useCallback(() => setOpenStored((v) => !v), [setOpenStored])

  const setWidthStored = useCallback((value: number) => {
    const next = clamp(value)
    setWidth(next)
    try {
      localStorage.setItem(WIDTH_KEY, JSON.stringify(next))
    } catch {
      /* private window */
    }
  }, [])

  const ask = useCallback(
    (text: string) => {
      setOpenStored(true)
      const q = text.trim()
      if (!q) return
      setMessages((list) => [...list, { role: 'user', text: q }, { role: 'assistant', text: content.ui.assistantUnavailable }])
    },
    [content.ui.assistantUnavailable, setOpenStored],
  )

  return useMemo(
    () => ({ open, setOpen: setOpenStored, toggle, ask, width, setWidth: setWidthStored, messages, isDesktop, focusKey: focusNonce.current }),
    [open, setOpenStored, toggle, ask, width, setWidthStored, messages, isDesktop],
  )
}

type Assistant = ReturnType<typeof useAssistant>

function Compose({ content, assistant, autoFocus }: { content: DocsContent; assistant: Assistant; autoFocus: boolean }) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (autoFocus) ref.current?.focus()
  }, [autoFocus, assistant.focusKey])
  const send = () => {
    const text = value.trim()
    if (!text) return
    setValue('')
    assistant.ask(text)
  }
  return (
    <div className="docs-sheet-compose">
      <div className="docs-input">
        <div className="docs-input-row">
          <textarea
            ref={ref}
            aria-label={content.ui.assistantPlaceholder}
            autoComplete="off"
            placeholder={content.ui.assistantPlaceholder}
            rows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault()
                send()
              }
            }}
          />
        </div>
        <div className="docs-input-foot">
          {/* No backend: nothing to attach to. Kept for the layout, inert. */}
          <button type="button" className="docs-attach" aria-label="Add attachment">
            <AttachIcon />
          </button>
          <button type="button" className="docs-send" aria-label="Send message" disabled={!value.trim()} onClick={send}>
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9.0 1.5754L8.9999 16.4171" />
              <path d="M2.2563 8.319L8.9999 1.5754L15.7435 8.3191" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function SheetBody({ content, assistant, desktop }: { content: DocsContent; assistant: Assistant; desktop: boolean }) {
  const maximized = assistant.width >= MAX
  return (
    <div className="docs-sheet-column">
      <div className="docs-sheet-head">
        <div>
          <SparkleIcon className="spark" />
          <span className="name">{content.ui.assistantTitle}</span>
        </div>
        <div>
          {desktop ? (
            <button
              type="button"
              className="docs-sheet-btn"
              aria-label={maximized ? 'Minimize assistant panel' : 'Maximize assistant panel'}
              onClick={() => assistant.setWidth(maximized ? MIN : MAX)}
            >
              <ExpandIcon strokeWidth={2} className="sm" />
            </button>
          ) : null}
          <button type="button" className="docs-sheet-btn" aria-label="Close assistant panel" onClick={() => assistant.setOpen(false)}>
            <CloseIcon strokeWidth={2} />
          </button>
        </div>
      </div>
      <div id="chat-content" className="docs-sheet-feed">
        <div className="docs-sheet-feed-grow" />
        <div>
          <div className="docs-sheet-disclaimer">{content.ui.assistantDisclaimer}</div>
          {assistant.messages.map((m, i) => (
            <div key={i} className="docs-msg" data-role={m.role}>
              {m.text}
            </div>
          ))}
        </div>
      </div>
      <Compose content={content} assistant={assistant} autoFocus={assistant.open && desktop} />
    </div>
  )
}

export function DocsAssistantRail({ content, assistant }: { content: DocsContent; assistant: Assistant }) {
  const onGrip = (e: React.MouseEvent) => {
    e.preventDefault()
    const move = (ev: MouseEvent) => assistant.setWidth(window.innerWidth - ev.clientX)
    const up = () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }
  const open = assistant.open && assistant.isDesktop
  return (
    <div className="docs-sheet-rail" style={{ width: open ? assistant.width : 0 }} data-assistant-sheet-container="">
      <div className="docs-sheet-grip" onMouseDown={onGrip} />
      <div id={assistant.isDesktop ? 'chat-assistant-sheet' : undefined} className="docs-sheet" aria-hidden={!open} inert={!open || undefined}>
        {open ? <SheetBody content={content} assistant={assistant} desktop /> : null}
      </div>
    </div>
  )
}

export function DocsAssistantDrawer({ content, assistant }: { content: DocsContent; assistant: Assistant }) {
  const wanted = assistant.open && !assistant.isDesktop
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const [drag, setDrag] = useState(0)
  const start = useRef<{ y: number; t: number } | null>(null)
  const sheet = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wanted) {
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
    const t = setTimeout(() => setMounted(false), 400)
    return () => clearTimeout(t)
  }, [wanted])

  if (!mounted) return null
  const h = sheet.current?.offsetHeight ?? 700
  const progress = Math.min(1, drag / h)
  const portalTarget = document.querySelector('.docs-root') ?? document.body
  return createPortal(
    <div onKeyDown={(e) => e.key === 'Escape' && assistant.setOpen(false)}>
      <div
        className="docs-drawer-backdrop"
        data-state={shown ? 'open' : 'closed'}
        data-swiping={drag > 0}
        style={{ '--swipe': progress } as React.CSSProperties}
      />
      <div className="docs-sheet-layer" onClick={(e) => e.target === e.currentTarget && assistant.setOpen(false)}>
        <div
          ref={sheet}
          id="chat-assistant-sheet"
          role="dialog"
          aria-label={content.ui.assistantTitle}
          tabIndex={-1}
          className="docs-sheet-drawer"
          data-state={shown ? 'open' : 'closed'}
          data-swiping={drag > 0}
          style={drag > 0 ? { transform: `translateY(${drag}px)` } : undefined}
        >
          <div
            className="docs-sheet-grab"
            onPointerDown={(e) => {
              start.current = { y: e.clientY, t: performance.now() }
              e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
              if (start.current) setDrag(Math.max(0, e.clientY - start.current.y))
            }}
            onPointerUp={(e) => {
              if (!start.current) return
              const dy = e.clientY - start.current.y
              const v = dy / Math.max(1, performance.now() - start.current.t)
              start.current = null
              setDrag(0)
              if (dy > h / 2 || v > 0.5) assistant.setOpen(false)
            }}
          >
            <div className="docs-sheet-handle" />
          </div>
          <SheetBody content={content} assistant={assistant} desktop={false} />
        </div>
      </div>
    </div>,
    portalTarget,
  )
}
