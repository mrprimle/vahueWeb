'use client'

// labs.scale.com module 650118 over @radix-ui/react-tooltip (chunk 4288nmznpxdws.js). Same behaviour without the dependency: open delay,
// 300ms skip window, one open at a time, hoverable content with Radix's grace polygon, Escape and scroll close, focus opens, click closes,
// side top with flip and clamp, 0 collision padding, rounded translate. Scale's bundle has no animate-in CSS, so it appears and leaves instantly (sampled).
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent, type ReactNode, type Ref } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/components/site/lib/cn'

const OPEN_EVENT = 'labs.tooltip.open'
const SKIP_DELAY = 300
const CONTENT = 'z-50 overflow-hidden rounded-md border bg-white px-3 py-1.5 text-sm text-[rgb(9,9,11)] shadow-md'

type Point = { x: number; y: number }

function exitPoints(exit: Point, rect: DOMRect): Point[] {
  const side = { left: Math.abs(rect.left - exit.x), right: Math.abs(rect.right - exit.x), top: Math.abs(rect.top - exit.y), bottom: Math.abs(rect.bottom - exit.y) }
  const min = Math.min(side.left, side.right, side.top, side.bottom)
  const pad = 5
  if (min === side.left) return [{ x: exit.x + pad, y: exit.y - pad }, { x: exit.x + pad, y: exit.y + pad }]
  if (min === side.right) return [{ x: exit.x - pad, y: exit.y - pad }, { x: exit.x - pad, y: exit.y + pad }]
  if (min === side.top) return [{ x: exit.x - pad, y: exit.y + pad }, { x: exit.x + pad, y: exit.y + pad }]
  return [{ x: exit.x - pad, y: exit.y - pad }, { x: exit.x + pad, y: exit.y - pad }]
}

function corners(r: DOMRect): Point[] {
  return [{ x: r.left, y: r.top }, { x: r.right, y: r.top }, { x: r.right, y: r.bottom }, { x: r.left, y: r.bottom }]
}

function inPolygon(p: Point, poly: Point[]) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i]
    const b = poly[j]
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside
  }
  return inside
}

/** Andrew's monotone chain, as in Radix. */
function hull(points: Point[]) {
  const s = [...points].sort((a, b) => a.x - b.x || a.y - b.y)
  if (s.length <= 1) return s
  const half = (list: Point[]) => {
    const out: Point[] = []
    for (const p of list) {
      while (out.length >= 2) {
        const a = out[out.length - 1]
        const b = out[out.length - 2]
        if ((a.x - b.x) * (p.y - b.y) >= (a.y - b.y) * (p.x - b.x)) out.pop()
        else break
      }
      out.push(p)
    }
    out.pop()
    return out
  }
  return [...half(s), ...half([...s].reverse())]
}

export type TooltipTriggerProps = {
  ref: Ref<HTMLElement>
  'aria-describedby'?: string
  'data-state': 'closed' | 'delayed-open' | 'instant-open'
  onPointerMove: (e: PointerEvent) => void
  onPointerLeave: () => void
  onPointerDown: () => void
  onFocus: (e: FocusEvent) => void
  onBlur: (e: FocusEvent) => void
  onClick: (e: MouseEvent) => void
}

export function LabsTooltip({
  children,
  content,
  delayDuration = 700,
  sideOffset = 4,
  className,
  onTriggerClick,
}: {
  children: (props: TooltipTriggerProps) => ReactNode
  content: ReactNode
  delayDuration?: number
  sideOffset?: number
  className?: string
  /** Runs before the close-on-click. `preventDefault` keeps it open, as on Scale's click tooltips. */
  onTriggerClick?: (e: MouseEvent, open: () => void) => void
}) {
  const [state, setState] = useState<TooltipTriggerProps['data-state']>('closed')
  const [root, setRoot] = useState<Element | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number; side: 'top' | 'bottom' } | null>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const panel = useRef<HTMLDivElement | null>(null)
  const openTimer = useRef(0)
  const skipTimer = useRef(0)
  const delayed = useRef(true)
  const movedIn = useRef(false)
  const pointerDown = useRef(false)
  const inTransit = useRef(false)
  const id = useId()
  const open = state !== 'closed'

  const show = useCallback((how: 'delayed-open' | 'instant-open') => {
    window.clearTimeout(skipTimer.current)
    delayed.current = false
    document.dispatchEvent(new CustomEvent(OPEN_EVENT))
    setState(how)
  }, [])

  const close = useCallback(() => {
    window.clearTimeout(openTimer.current)
    setState((prev) => {
      if (prev !== 'closed') {
        window.clearTimeout(skipTimer.current)
        skipTimer.current = window.setTimeout(() => {
          delayed.current = true
        }, SKIP_DELAY)
      }
      return 'closed'
    })
  }, [])

  const openNow = useCallback(() => {
    window.clearTimeout(openTimer.current)
    show('instant-open')
  }, [show])

  const enter = useCallback(() => {
    if (delayed.current) {
      window.clearTimeout(openTimer.current)
      openTimer.current = window.setTimeout(() => show('delayed-open'), delayDuration)
    } else {
      openNow()
    }
  }, [delayDuration, openNow, show])

  useEffect(() => {
    setRoot(document.querySelector('.labs-root'))
    return () => {
      window.clearTimeout(openTimer.current)
      window.clearTimeout(skipTimer.current)
    }
  }, [])

  // Another tooltip opened: this one closes. Radix listens from mount; its own dispatch runs before setState commits.
  useEffect(() => {
    if (!open) return
    const onOther = () => close()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const onScroll = (e: Event) => {
      const t = e.target as Node | null
      if (t && trigger.current && t.contains?.(trigger.current)) close()
    }
    // Radix DismissableLayer: a mouse press anywhere outside the panel closes it, the trigger included. Touch waits for the click.
    const onDown = (e: globalThis.PointerEvent) => {
      if (panel.current?.contains(e.target as Node)) return
      if (e.pointerType === 'touch') document.addEventListener('click', close, { once: true })
      else close()
    }
    document.addEventListener(OPEN_EVENT, onOther)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('scroll', onScroll, { capture: true })
    return () => {
      document.removeEventListener(OPEN_EVENT, onOther)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('click', close)
      window.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [open, close])

  // Grace polygon between the trigger and the panel.
  useEffect(() => {
    if (!open) return
    const t = trigger.current
    const c = panel.current
    if (!t || !c) return
    let area: Point[] | null = null
    const create = (e: globalThis.PointerEvent, target: HTMLElement) => {
      const exit = { x: e.clientX, y: e.clientY }
      const from = (e.currentTarget as HTMLElement).getBoundingClientRect()
      area = hull([...exitPoints(exit, from), ...corners(target.getBoundingClientRect())])
      inTransit.current = true
    }
    const onTriggerLeave = (e: globalThis.PointerEvent) => create(e, c)
    const onPanelLeave = (e: globalThis.PointerEvent) => create(e, t)
    const onMove = (e: globalThis.PointerEvent) => {
      if (!area) return
      const target = e.target as Node
      const entered = t.contains(target) || c.contains(target)
      const outside = !inPolygon({ x: e.clientX, y: e.clientY }, area)
      if (entered) {
        area = null
        inTransit.current = false
      } else if (outside) {
        area = null
        inTransit.current = false
        close()
      }
    }
    t.addEventListener('pointerleave', onTriggerLeave)
    c.addEventListener('pointerleave', onPanelLeave)
    document.addEventListener('pointermove', onMove)
    return () => {
      t.removeEventListener('pointerleave', onTriggerLeave)
      c.removeEventListener('pointerleave', onPanelLeave)
      document.removeEventListener('pointermove', onMove)
      inTransit.current = false
    }
  }, [open, close, pos])

  useLayoutEffect(() => {
    if (!open) {
      setPos(null)
      return
    }
    const t = trigger.current
    const c = panel.current
    if (!t || !c) return
    const a = t.getBoundingClientRect()
    const b = c.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const round = (v: number) => Math.round(v * dpr) / dpr
    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight
    const top = a.top - b.height - sideOffset
    const below = a.bottom + sideOffset
    const side = top < 0 && below + b.height <= vh ? 'bottom' : 'top'
    const x = Math.min(Math.max(a.left + a.width / 2 - b.width / 2, 0), Math.max(vw - b.width, 0))
    setPos({ x: round(x), y: round(side === 'top' ? top : below), side })
  }, [open, sideOffset, root])

  const props: TooltipTriggerProps = {
    ref: (node: HTMLElement | null) => {
      trigger.current = node
    },
    'aria-describedby': open ? id : undefined,
    'data-state': state,
    onPointerMove: (e) => {
      if (e.pointerType === 'touch') return
      if (!movedIn.current && !inTransit.current) {
        enter()
        movedIn.current = true
      }
    },
    onPointerLeave: () => {
      window.clearTimeout(openTimer.current)
      movedIn.current = false
    },
    onPointerDown: () => {
      pointerDown.current = true
      document.addEventListener(
        'pointerup',
        () => {
          pointerDown.current = false
        },
        { once: true },
      )
    },
    onFocus: () => {
      if (!pointerDown.current) openNow()
    },
    onBlur: () => close(),
    onClick: (e) => {
      onTriggerClick?.(e, openNow)
      if (!e.defaultPrevented) close()
    },
  }

  return (
    <>
      {children(props)}
      {open && root
        ? createPortal(
            <div data-radix-popper-content-wrapper="" style={{ position: 'fixed', left: 0, top: 0, minWidth: 'max-content', zIndex: 50, transform: pos ? `translate(${pos.x}px, ${pos.y}px)` : 'translate(0, -200%)' }}>
              <div ref={panel} id={id} role="tooltip" data-side={pos?.side ?? 'top'} data-align="center" data-state={state} className={cn(CONTENT, className)}>
                {content}
              </div>
            </div>,
            root,
          )
        : null}
    </>
  )
}
