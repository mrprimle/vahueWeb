'use client'

// The dialog of Scale module 808358's video tile. Scale uses Radix Dialog, which is not installed here. Same classes and same behaviour:
// portal, Escape and overlay click close, focus moves in and returns, `pointer-events: none` on body. On Scale the wheel still moves
// the page behind the open dialog (Lenis ignores Radix's scroll lock: 318px after a 400 wheel), so it does here too.
import dynamic from 'next/dynamic'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

// Scale module 832862 picks Vidstack (638474) for a file URL. Loaded with ssr off, as on Scale.
const VideoPlayer = dynamic(() => import('@/components/pages/automotive/VideoPlayer'), { ssr: false })

export function BlogVideoDialog({ title, src, poster, onClose, returnFocus }: { title: string; src: string; poster?: string; onClose: () => void; returnFocus: () => void }) {
  const box = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descId = useId()
  useEffect(() => {
    const { body } = document
    const prev = { overflow: body.style.overflow, pointerEvents: body.style.pointerEvents }
    body.setAttribute('data-scroll-locked', '1')
    body.style.overflow = 'hidden'
    body.style.pointerEvents = 'none'
    box.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !box.current) return
      const items = box.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const at = document.activeElement
      if (e.shiftKey && (at === first || at === box.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && at === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      body.removeAttribute('data-scroll-locked')
      body.style.overflow = prev.overflow
      body.style.pointerEvents = prev.pointerEvents
      document.removeEventListener('keydown', onKey)
      returnFocus()
    }
  }, [onClose, returnFocus])
  return createPortal(
    <div style={{ pointerEvents: 'auto' }}>
      <div className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="fixed left-1/2 top-1/2 z-[999] w-[95vw] max-w-7xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl outline-none md:w-[80vw] lg:w-[70vw]"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 text-white">
          <h2 id={titleId} className="text-left text-base font-normal md:text-lg">
            {title}
          </h2>
          <p id={descId} className="sr-only">
            Video player for {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close video"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" className="size-5" aria-hidden xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden bg-black">
          <VideoPlayer src={src} poster={poster ?? ''} title={title} autoPlay className="h-full w-full" />
        </div>
      </div>
    </div>,
    document.body,
  )
}
