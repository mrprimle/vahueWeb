'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from 'react'
import { createPortal } from 'react-dom'
import { labsGeistMono, labsInter } from '@/components/templates/labs-shared/fonts'
import shared from '@/components/templates/labs-shared/labs.module.css'

/*
 * Radix Tooltip (@radix-ui/react-tooltip, bundled in labs' 2ri_cj1i8zivb.js and wrapped by shadcn module 650118),
 * reproduced without the dependency (the repo has no Radix):
 *   - TooltipProvider delayDuration (700 default; labs passes 300 for model names and score bars, 0 for
 *     contamination notes) and skipDelayDuration 300 (re-entering within 300 ms of a close opens instantly).
 *   - Trigger: pointermove (not touch) arms the open timer, pointerleave cancels it; focus opens at once unless the
 *     focus came from a pointerdown; blur and click close.
 *   - Content is hoverable: after leaving the trigger it stays open while the pointer is inside the grace polygon
 *     (exit point padded 5 px + content rect, convex hull) and closes once it leaves it.
 *   - Escape closes; a scroll of anything containing the trigger closes; only one tooltip is open at a time
 *     (Radix's "tooltip.open" document event).
 *   - Popper: side top, align center, sideOffset (shadcn default 4, labs passes 5 on some), flip to bottom when it
 *     doesn't fit, shift along x to stay in the viewport (padding 0). Wrapper is position:fixed with
 *     translate(x, y), min-width max-content, z-index taken from the content (z-50).
 *   - The shadcn animate-in/zoom classes are inert on labs (no tailwindcss-animate), so it shows/hides instantly.
 */
const OPEN_EVENT = 'labs-tooltip.open'
type Pt = { x: number; y: number }

export const TIP_CONTENT =
  'z-50 overflow-hidden rounded-none border border-solid border-[#d9d9d9] bg-white px-3 py-1.5 text-[14px] leading-[1.5] text-[#09090b] shadow-[0_4px_6px_-1px_#0000001a,0_2px_4px_-2px_#0000001a]'

// Shared per-"provider" state so skipDelayDuration works like a TooltipProvider instance.
export type TipProvider = { lastClose: number }

export function useTipProvider(): TipProvider {
  return useRef<TipProvider>({ lastClose: 0 }).current
}

function hull(points: Pt[]): Pt[] {
  const p = [...points].sort((a, b) => a.x - b.x || a.y - b.y)
  if (p.length <= 1) return p
  const cross = (o: Pt, a: Pt, b: Pt) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
  const lo: Pt[] = []
  for (const q of p) {
    while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop()
    lo.push(q)
  }
  const up: Pt[] = []
  for (const q of p.reverse()) {
    while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop()
    up.push(q)
  }
  lo.pop()
  up.pop()
  return lo.concat(up)
}

function inPoly(pt: Pt, poly: Pt[]) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i]
    const b = poly[j]
    if (a.y > pt.y !== b.y > pt.y && pt.x < ((b.x - a.x) * (pt.y - a.y)) / (b.y - a.y) + a.x) inside = !inside
  }
  return inside
}

export type TipTriggerProps = {
  ref: Ref<HTMLElement>
  'data-state': string
  onPointerMove: (e: React.PointerEvent) => void
  onPointerLeave: (e: React.PointerEvent) => void
  onPointerDown: () => void
  onFocus: () => void
  onBlur: () => void
  onClick: () => void
}

export default function LabsTooltip({
  provider,
  delay = 700,
  sideOffset = 4,
  contentClassName = '',
  content,
  open: openProp,
  onOpenChange,
  children,
}: {
  provider: TipProvider
  delay?: number
  sideOffset?: number
  contentClassName?: string
  content: ReactNode
  open?: boolean
  onOpenChange?: (v: boolean) => void
  children: (p: TipTriggerProps) => ReactNode
}) {
  const [inner, setInner] = useState(false)
  const [delayed, setDelayed] = useState(true)
  const open = openProp ?? inner
  const trigger = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const timer = useRef<number>(0)
  const moved = useRef(false)
  const pointerDown = useRef(false)
  const grace = useRef<Pt[] | null>(null)
  const id = useRef(Math.random().toString(36).slice(2)).current
  const [pos, setPos] = useState<{ x: number; y: number; side: 'top' | 'bottom' } | null>(null)

  const setOpen = useCallback(
    (v: boolean) => {
      if (openProp === undefined) setInner(v)
      onOpenChange?.(v)
    },
    [openProp, onOpenChange],
  )
  const doOpen = useCallback(
    (wasDelayed: boolean) => {
      window.clearTimeout(timer.current)
      setDelayed(wasDelayed)
      document.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }))
      setOpen(true)
    },
    [id, setOpen],
  )
  const doClose = useCallback(() => {
    window.clearTimeout(timer.current)
    grace.current = null
    if (open) provider.lastClose = performance.now()
    setOpen(false)
  }, [open, provider, setOpen])

  // one open tooltip at a time
  useEffect(() => {
    const on = (e: Event) => {
      if ((e as CustomEvent).detail !== id && open) doClose()
    }
    document.addEventListener(OPEN_EVENT, on)
    return () => document.removeEventListener(OPEN_EVENT, on)
  }, [id, open, doClose])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Escape, scroll of an ancestor, grace-area pointer tracking
  useEffect(() => {
    if (!open) return
    const key = (e: KeyboardEvent) => e.key === 'Escape' && doClose()
    const scroll = (e: Event) => {
      const t = e.target as Node
      if (t && trigger.current && (t === document || t.contains?.(trigger.current))) doClose()
    }
    const move = (e: PointerEvent) => {
      if (!grace.current) return
      const t = e.target as Node
      if (trigger.current?.contains(t) || contentRef.current?.contains(t)) return
      if (!inPoly({ x: e.clientX, y: e.clientY }, grace.current)) doClose()
    }
    document.addEventListener('keydown', key)
    window.addEventListener('scroll', scroll, { capture: true, passive: true })
    document.addEventListener('pointermove', move)
    return () => {
      document.removeEventListener('keydown', key)
      window.removeEventListener('scroll', scroll, { capture: true })
      document.removeEventListener('pointermove', move)
    }
  }, [open, doClose])

  // popper placement
  useLayoutEffect(() => {
    if (!open) {
      setPos(null)
      return
    }
    const place = () => {
      const t = trigger.current?.getBoundingClientRect()
      const c = contentRef.current
      if (!t || !c) return
      const w = c.offsetWidth
      const h = c.offsetHeight
      const vw = document.documentElement.clientWidth
      let side: 'top' | 'bottom' = 'top'
      let y = t.top - sideOffset - h
      if (y < 0 && t.bottom + sideOffset + h <= window.innerHeight) {
        side = 'bottom'
        y = t.bottom + sideOffset
      }
      let x = t.left + t.width / 2 - w / 2
      // shift + limitShift: stay inside the viewport but never detach from the trigger
      x = Math.min(Math.max(x, 0), vw - w)
      x = Math.min(Math.max(x, t.left - w), t.right)
      setPos({ x: Math.round(x), y: Math.round(y), side })
    }
    place()
    const ro = new ResizeObserver(place)
    if (contentRef.current) ro.observe(contentRef.current)
    window.addEventListener('resize', place)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', place)
    }
  }, [open, sideOffset])

  const props: TipTriggerProps = {
    ref: (el: HTMLElement | null) => {
      trigger.current = el
    },
    'data-state': open ? (delayed ? 'delayed-open' : 'instant-open') : 'closed',
    onPointerMove: (e) => {
      if (e.pointerType === 'touch' || moved.current || open) return
      moved.current = true
      grace.current = null
      const skip = performance.now() - provider.lastClose < 300
      if (skip || delay === 0) doOpen(false)
      else timer.current = window.setTimeout(() => doOpen(true), delay)
    },
    onPointerLeave: (e) => {
      moved.current = false
      window.clearTimeout(timer.current)
      if (!open || !contentRef.current) return
      // TooltipContentHoverable: grace polygon from the exit point (padded 5px toward the content) to the content
      const c = contentRef.current.getBoundingClientRect()
      const ex = { x: e.clientX, y: e.clientY }
      const pad = 5
      const side = pos?.side ?? 'top'
      const exit =
        side === 'top'
          ? [
              { x: ex.x - pad, y: ex.y + pad },
              { x: ex.x + pad, y: ex.y + pad },
            ]
          : [
              { x: ex.x - pad, y: ex.y - pad },
              { x: ex.x + pad, y: ex.y - pad },
            ]
      grace.current = hull([...exit, { x: c.left, y: c.top }, { x: c.right, y: c.top }, { x: c.right, y: c.bottom }, { x: c.left, y: c.bottom }])
      if (!inPoly(ex, grace.current)) doClose()
    },
    onPointerDown: () => {
      pointerDown.current = true
      document.addEventListener('pointerup', () => (pointerDown.current = false), { once: true })
    },
    onFocus: () => {
      if (!pointerDown.current) doOpen(false)
    },
    onBlur: doClose,
    onClick: doClose,
  }

  return (
    <>
      {children(props)}
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            data-radix-popper-content-wrapper=""
            className={`${labsInter.variable} ${labsGeistMono.variable} ${shared.portal}`}
            style={{
              display: 'block',
              position: 'fixed',
              left: 0,
              top: 0,
              transform: pos ? `translate(${pos.x}px, ${pos.y}px)` : 'translate(0, -200%)',
              minWidth: 'max-content',
              zIndex: 50,
              visibility: pos ? undefined : 'hidden',
            }}
          >
            <div
              ref={contentRef}
              data-side={pos?.side ?? 'top'}
              data-align="center"
              data-state={delayed ? 'delayed-open' : 'instant-open'}
              onPointerLeave={(e) => {
                const t = trigger.current
                if (t && t.contains(e.relatedTarget as Node)) return
                doClose()
              }}
              className={`${TIP_CONTENT} ${contentClassName}`}
            >
              {content}
              {/* Radix renders the accessible copy in a VisuallyHidden role=tooltip span */}
              <span role="tooltip" style={{ position: 'absolute', border: 0, width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', overflowWrap: 'normal' }}>
                {content}
              </span>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
