'use client'

// labs.scale.com module 523384 (shadcn Dialog on Radix). Scale's bundle has no `animate-in` CSS, so open and close are instant (sampled).
// Same behaviour without the Radix dependency: portal, overlay click and Escape close, focus trap, focus return, body scroll lock.
import { X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/components/site/lib/cn'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/** Lock the page behind a modal and keep Tab inside `node`. Shared with LabsSearch. */
export function useModal(open: boolean, onClose: () => void, node: () => HTMLElement | null) {
  const close = useRef(onClose)
  useEffect(() => {
    close.current = onClose
  })
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close.current()
        return
      }
      if (e.key !== 'Tab') return
      const root = node()
      if (!root) return
      const list = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!list.length) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [open, node])
}

export function LabsDialog({ open, onOpenChange, title, closeLabel, className, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: ReactNode; closeLabel: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [root, setRoot] = useState<Element | null>(null)
  const nodeRef = useRef(() => ref.current)
  useModal(open, () => onOpenChange(false), nodeRef.current)
  useEffect(() => {
    setRoot(document.querySelector('.labs-root'))
  }, [])
  useEffect(() => {
    if (open) ref.current?.focus()
  }, [open])
  if (!open || !root) return null
  return createPortal(
    <>
      <div className="fixed inset-0 z-50 bg-black/80" data-lenis-prevent onClick={() => onOpenChange(false)} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="labs-dialog-title"
        tabIndex={-1}
        data-lenis-prevent
        className={cn('fixed left-[50%] top-[50%] z-50 outline-none max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-white shadow-lg w-[calc(100vw-2rem)] p-0 gap-0 rounded-none border-neutral-200 flex flex-col max-h-[calc(100vh-4rem)]', className)}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left px-6 pt-6 pb-4 border-b border-neutral-200 shrink-0">
          <h2 id="labs-dialog-title" className="text-sm font-sans font-medium text-ink uppercase tracking-wider">
            {title}
          </h2>
        </div>
        {children}
        <button type="button" onClick={() => onOpenChange(false)} className="absolute right-4 top-4 rounded-sm text-neutral-600 hover:text-ink transition-colors focus:outline-hidden focus:ring-2 focus:ring-[hsl(0_0%_7%)] focus:ring-offset-2">
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">{closeLabel}</span>
        </button>
      </div>
    </>,
    root,
  )
}
