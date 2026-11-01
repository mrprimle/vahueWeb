'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { XIcon } from './icons'
import s from './labs.module.css'
import { labsGeistMono, labsInter } from './fonts'

/*
 * Radix Dialog as labs' shadcn DialogContent renders it: portal, overlay bg-black/80, content centred (no enter/exit
 * animation: labs' Tailwind v4 build has no tailwindcss-animate utilities), Esc + overlay click close, focus moved in and restored, body scroll
 * locked, close button top-right (neutral-600 -> ink).
 */
export default function LabsDialog({
  open,
  onOpenChange,
  title,
  className = '',
  children,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  title: ReactNode
  className?: string
  children: ReactNode
}) {
  const [mounted, setMounted] = useState(open)
  const [state, setState] = useState<'open' | 'closed'>(open ? 'open' : 'closed')
  const ref = useRef<HTMLDivElement>(null)
  const restore = useRef<HTMLElement | null>(null)
  const id = useId()

  useEffect(() => {
    if (open) {
      restore.current = document.activeElement as HTMLElement | null
      setMounted(true)
      setState('open')
    } else if (mounted) {
      setState('closed')
      setMounted(false)
      restore.current?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!mounted || state !== 'open') return
    ref.current?.focus()
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    const lenis = (window as unknown as { __labsLenis?: { stop(): void; start(): void } }).__labsLenis
    lenis?.stop()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
      if (e.key === 'Tab' && ref.current) {
        const f = [...ref.current.querySelectorAll<HTMLElement>('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute('disabled'))
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prev
      lenis?.start()
    }
  }, [mounted, state, onOpenChange])

  if (!mounted) return null
  return createPortal(
    <div className={`${labsInter.variable} ${labsGeistMono.variable} ${s.portal}`}>
      <div data-state={state} className="fixed inset-0 z-50 bg-black/80" onClick={() => onOpenChange(false)} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        data-state={state}
        tabIndex={-1}
        className={`${s.dialog} fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg p-0 border border-[#e5e5e5] bg-white shadow-lg flex flex-col max-h-[calc(100vh-4rem)] rounded-none outline-none ${className}`}
      >
        <div className="flex flex-col text-center sm:text-left px-6 pt-6 pb-4 border-b border-[#e5e5e5] shrink-0">
          <h2 id={id} className="text-[14px] leading-[1.5] font-medium text-[color:var(--color-ink)] uppercase tracking-[0.05em] m-0">
            {title}
          </h2>
        </div>
        {children}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm text-[#525252] hover:text-[color:var(--color-ink)] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-2"
        >
          <XIcon className="h-3.5 w-3.5" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>,
    document.body,
  )
}
