'use client'

import { useEffect, useRef, useState } from 'react'
import type { DocsContent } from './content'
import { Icon } from './icons'
import { usePresence } from './usePresence'
import s from './docs.module.css'

export type ChatMessage = { role: 'user' | 'assistant'; text: string }

/*
 * Mintlify assistant. Desktop (>1024px): a right-hand sheet that takes layout space (368px, 576px maximized,
 * drag-resizable from its 1px left edge). Mobile: a Base UI bottom drawer (450ms cubic-bezier(0.32,0.72,0,1),
 * black/40 backdrop, swipe down to dismiss). The live chat backend isn't reproduced: a sent question gets
 * `assistant.offlineReply`.
 */

export const SHEET_W = 368
export const SHEET_MAX_W = 576

function ChatInput({
  content,
  value,
  onChange,
  onSubmit,
  autoFocus,
  className,
  attach = true,
  readOnly,
  onFocusReadOnly,
}: {
  content: DocsContent
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  autoFocus?: boolean
  className?: string
  attach?: boolean
  readOnly?: boolean
  onFocusReadOnly?: () => void
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (autoFocus) ref.current?.focus()
  }, [autoFocus])
  const empty = !value.trim()
  return (
    <div className={`${s.chatBox} ${className ?? ''}`}>
      <div className={s.chatBoxRow}>
        <textarea
          ref={ref}
          aria-label={content.assistant.placeholder}
          placeholder={content.assistant.placeholder}
          className={s.chatTextarea}
          data-attach={attach || undefined}
          value={value}
          readOnly={readOnly}
          onFocus={() => readOnly && onFocusReadOnly?.()}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault()
              if (!empty) onSubmit()
            }
          }}
        />
        {!attach && (
          <button type="button" className={`${s.chatSend} ${s.chatSendAbs}`} aria-label="Send message" disabled={empty} onClick={onSubmit}>
            <Icon name="Send" strokeWidth={2} className={s.chatSendIcon} />
          </button>
        )}
      </div>
      {attach && (
        <div className={s.chatBoxFoot}>
          <button type="button" className={s.chatAttach} aria-label="Add attachment">
            <Icon name="Attach" className={s.chatAttachIcon} />
          </button>
          <button type="button" className={s.chatSend} aria-label="Send message" disabled={empty} onClick={onSubmit}>
            <Icon name="Send" strokeWidth={2} className={s.chatSendIcon} />
          </button>
        </div>
      )}
    </div>
  )
}

function ChatBody({ content, messages }: { content: DocsContent; messages: ChatMessage[] }) {
  return (
    <div id="chat-content" className={s.chatContent}>
      <div className={s.chatGrow} />
      <div className={s.chatColumn}>
        <div className={s.chatDisclaimerWrap}>
          <div className={s.chatDisclaimer}>{content.assistant.disclaimer}</div>
        </div>
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className={s.chatUser}>
              {m.text}
            </div>
          ) : (
            <div key={i} className={s.chatReply}>
              {m.text}
            </div>
          ),
        )}
      </div>
    </div>
  )
}

type SheetProps = {
  content: DocsContent
  open: boolean
  maximized: boolean
  width: number
  onWidth: (w: number) => void
  onClose: () => void
  onToggleMax: () => void
  messages: ChatMessage[]
  onSend: (q: string) => void
}

/** Desktop sheet (rendered as the last flex child of the page shell, so it narrows the docs layout). */
export function AssistantSheet({ content, open, maximized, width, onWidth, onClose, onToggleMax, messages, onSend }: SheetProps) {
  const [draft, setDraft] = useState('')
  const dragging = useRef<{ x: number; w: number } | null>(null)
  if (!open) return null
  const submit = () => {
    onSend(draft.trim())
    setDraft('')
  }
  return (
    <div className={s.sheetOuter} style={{ width: maximized ? SHEET_MAX_W : width }}>
      <div
        className={s.sheetHandle}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize assistant panel"
        onPointerDown={(e) => {
          dragging.current = { x: e.clientX, w: maximized ? SHEET_MAX_W : width }
          ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return
          const w = dragging.current.w + (dragging.current.x - e.clientX)
          onWidth(Math.max(SHEET_W, Math.min(Math.round(window.innerWidth * 0.5), w)))
        }}
        onPointerUp={() => (dragging.current = null)}
      />
      <div id="chat-assistant-sheet" className={s.sheet}>
        <div className={s.sheetInner}>
          <div className={s.sheetHeader}>
            <div className={s.sheetTitle}>
              <Icon name="Sparkle" className={s.sheetSparkle} />
              <span>{content.assistant.title}</span>
            </div>
            <div className={s.sheetBtns}>
              <button type="button" className={s.sheetBtn} aria-label={maximized ? 'Minimize assistant panel' : 'Maximize assistant panel'} onClick={onToggleMax}>
                <Icon name="Expand" strokeWidth={2} className={s.sheetBtnIcon} />
              </button>
              <button type="button" className={s.sheetBtn} aria-label="Close assistant panel" onClick={onClose}>
                <Icon name="Close" strokeWidth={2} className={s.sheetBtnIcon} />
              </button>
            </div>
          </div>
          <ChatBody content={content} messages={messages} />
          <div className={s.sheetInputWrap}>
            <ChatInput content={content} value={draft} onChange={setDraft} onSubmit={submit} autoFocus />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Mobile bottom drawer with a drag handle; swipe down past 25% of its height (or a fast flick) closes it. */
export function AssistantDrawer({ content, open, onClose, messages, onSend }: Omit<SheetProps, 'maximized' | 'width' | 'onWidth' | 'onToggleMax'>) {
  const { mounted, attrs } = usePresence(open, 400)
  const [draft, setDraft] = useState('')
  const [dy, setDy] = useState(0)
  const drag = useRef<{ y: number; t: number } | null>(null)
  const panel = useRef<HTMLDivElement>(null)
  if (!mounted) return null
  const submit = () => {
    onSend(draft.trim())
    setDraft('')
  }
  const progress = panel.current ? Math.min(1, dy / panel.current.offsetHeight) : 0
  return (
    <div className={s.drawerRoot}>
      <div className={s.drawerBackdrop} {...attrs} style={{ ['--swipe' as string]: progress }} onClick={onClose} />
      <div className={s.drawerBottomPos}>
        <div
          ref={panel}
          role="dialog"
          aria-label={content.assistant.title}
          className={s.drawerBottom}
          data-swiping={drag.current ? '' : undefined}
          style={{ ['--dy' as string]: `${dy}px` }}
          {...attrs}
        >
          <div
            className={s.drawerGrab}
            onPointerDown={(e) => {
              drag.current = { y: e.clientY, t: performance.now() }
              ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => drag.current && setDy(Math.max(0, e.clientY - drag.current.y))}
            onPointerUp={(e) => {
              if (!drag.current) return
              const v = (e.clientY - drag.current.y) / Math.max(1, performance.now() - drag.current.t)
              drag.current = null
              const h = panel.current?.offsetHeight ?? 1
              if (dy > h * 0.25 || v > 0.5) onClose()
              setDy(0)
            }}
          >
            <span className={s.drawerGrabBar} />
          </div>
          <div className={s.sheetHeader}>
            <div className={s.sheetTitle}>
              <Icon name="Sparkle" className={s.sheetSparkle} />
              <span>{content.assistant.title}</span>
            </div>
            <button type="button" className={s.sheetBtn} aria-label="Close assistant panel" onClick={onClose}>
              <Icon name="Close" strokeWidth={2} className={s.sheetBtnIconLg} />
            </button>
          </div>
          <ChatBody content={content} messages={messages} />
          <div className={s.sheetInputWrap}>
            <ChatInput content={content} value={draft} onChange={setDraft} onSubmit={submit} />
          </div>
        </div>
      </div>
    </div>
  )
}

/*
 * Floating "Ask a question..." bar: sticky to the viewport bottom inside the content column. An
 * IntersectionObserver on #footer hides it (translate-y 100px + opacity 0) while the footer is on screen; after the
 * first change it animates (300ms). Invisible/inert while the assistant is open. Enter submits to the assistant.
 */
export function FloatingAsk({ content, hidden, onSubmit }: { content: DocsContent; hidden: boolean; onSubmit: (q: string) => void }) {
  const [footerVisible, setFooterVisible] = useState<boolean | null>(null)
  const [animate, setAnimate] = useState(false)
  const [draft, setDraft] = useState('')
  useEffect(() => {
    const el = document.getElementById('footer')
    if (!el) return
    let first = true
    const io = new IntersectionObserver((entries) => {
      const e = entries[0]
      if (!e) return
      setFooterVisible(e.isIntersecting)
      if (first) first = false
      else setAnimate(true)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const away = footerVisible !== false
  return (
    <div data-assistant-bar="" className={s.floatBar} data-hidden={hidden || undefined} aria-hidden={hidden || undefined} inert={hidden || undefined}>
      <div className={s.floatInner} data-away={away || undefined} data-animate={animate || undefined}>
        <div className={s.floatPad}>
          <ChatInput
            content={content}
            value={draft}
            onChange={setDraft}
            attach={false}
            className={s.floatBox}
            onSubmit={() => {
              onSubmit(draft.trim())
              setDraft('')
            }}
          />
        </div>
      </div>
    </div>
  )
}
