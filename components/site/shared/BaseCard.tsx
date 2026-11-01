'use client'

// Scale module 317967 (BaseCard + stagger/origin helpers).
import { forwardRef, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { cn } from '../lib/cn'
import { mapRange } from '../lib/math'
import { useScrubTrigger } from '../lib/useScrubTrigger'

export const GRID_COLS: Record<number, string> = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6' }

export function resolveColumns(columns: number | string | undefined, count: number) {
  const n = typeof columns === 'number' ? columns : typeof columns === 'string' && columns.trim() !== '' ? Number(columns) : undefined
  if (n !== undefined) return Number.isInteger(n) && GRID_COLS[n] ? n : 4
  return GRID_COLS[count] ? count : 4
}

export function directionalEntrance(index: number, count: number, fluid: boolean, directional = false, columns?: number | string, disabled = false) {
  if (!directional || disabled) return { scaleTransformOrigin: 'center center', entranceTranslateX: 0 }
  let i: number
  let cols: number
  if (fluid) {
    if (index < 3) {
      i = index
      cols = 3
    } else {
      const start = 3 + 2 * Math.floor((index - 3) / 2)
      cols = Math.min(2, count - start)
      i = index - start
    }
  } else {
    cols = resolveColumns(columns, count)
    i = index % cols
  }
  if (cols <= 1) return { scaleTransformOrigin: 'center center', entranceTranslateX: 0 }
  if (i === 0) return { scaleTransformOrigin: 'right center', entranceTranslateX: -160 }
  if (i === cols - 1) return { scaleTransformOrigin: 'left center', entranceTranslateX: 160 }
  return { scaleTransformOrigin: 'center center', entranceTranslateX: 0 }
}

export const CARD_PADDING = 'p-6 md:p-8'
export const CARD_HEADER2 = 'font-normal tracking-[-0.01em] text-[2rem] leading-[1.05] md:text-[40px] md:leading-[44px]'
const H2_STYLES = '[&_h2]:font-normal [&_h2]:tracking-[-0.01em] [&_h2]:text-[2rem] [&_h2]:leading-[1.05] [&_h2]:md:text-[40px] [&_h2]:md:leading-[44px]'

const easeOut = gsap.parseEase('power2.out')
function stagger(p: number, index: number, count: number) {
  if (count <= 1) return p
  const each = Math.min(0.1, 0.85 / Math.max(1, count - 1))
  const start = index * each
  return mapRange(p, start, start + (1 - (count - 1) * each), 0, 1, true)
}

export type BaseCardProps = {
  children?: ReactNode
  className?: string
  scaleTransformOrigin?: string
  entranceTranslateX?: number
  scaleDir?: 'up' | 'down' | 'none'
  staggerIndex?: number
  staggerCount?: number
  scrollTriggerEnd?: string
  scrollTriggerStart?: string
  noOpacity?: boolean
  onInViewport?: () => void
  useViewportEntrance?: boolean
  viewportEntranceActive?: boolean
}

function setRefs<T>(a: React.RefObject<T | null>, b: React.ForwardedRef<T>) {
  return (el: T | null) => {
    a.current = el
    if (typeof b === 'function') b(el)
    else if (b) b.current = el
  }
}

const ScrollCard = forwardRef<HTMLDivElement, BaseCardProps>(function BaseCardScroll(
  {
    children,
    className,
    scaleTransformOrigin = 'center center',
    entranceTranslateX = 0,
    scaleDir = 'up',
    staggerIndex = 0,
    staggerCount = 1,
    scrollTriggerEnd = 'top 50%',
    scrollTriggerStart = 'top bottom',
    noOpacity = false,
    onInViewport = () => {},
  },
  ref,
) {
  const el = useRef<HTMLDivElement>(null)
  const seeded = useRef(false)
  const fromScale = scaleDir === 'down' ? 1.06 : 0.96
  const fromY = 48 * Number(scaleDir === 'down')
  const values = (progress: number) => {
    const e = easeOut(stagger(progress, staggerIndex, staggerCount))
    return {
      scale: mapRange(e, 0, 1, fromScale, 1, true),
      opacity: noOpacity ? 1 : mapRange(e, 0, 1, 0, 1, true),
      x: mapRange(e, 0, 1, entranceTranslateX, 0, true),
      y: mapRange(e, 0, 1, fromY, 0, true),
    }
  }
  useLayoutEffect(() => {
    const node = el.current
    if (!node) return
    const { top } = node.getBoundingClientRect()
    if (seeded.current && top < window.innerHeight) return
    seeded.current = true
    gsap.set(node, values(0))
  }, [fromScale, entranceTranslateX, fromY, staggerIndex, staggerCount, scrollTriggerEnd, noOpacity])
  useScrubTrigger(el, {
    timelineVersion: `${scaleDir}-${entranceTranslateX}-${fromY}-${scaleTransformOrigin}-${staggerIndex}-${staggerCount}-${scrollTriggerEnd}`,
    start: scrollTriggerStart,
    end: scrollTriggerEnd,
    pinSpacing: false,
    scrub: true,
    onEnter: () => onInViewport(),
    onUpdate(self) {
      if (el.current) gsap.set(el.current, values(self.progress))
    },
  })
  return (
    <div ref={setRefs(el, ref)} className={cn('BaseCard', H2_STYLES, className)} style={{ transformOrigin: scaleTransformOrigin }}>
      {children}
    </div>
  )
})

const ViewportCard = forwardRef<HTMLDivElement, BaseCardProps>(function BaseCardViewportEntrance(
  { children, className, scaleTransformOrigin = 'center center', entranceTranslateX = 0, scaleDir = 'up', staggerIndex = 0, viewportEntranceActive = false },
  ref,
) {
  const el = useRef<HTMLDivElement>(null)
  const fromScale = scaleDir === 'down' ? 1.06 : scaleDir === 'up' ? 0.96 : 1
  const fromY = scaleDir === 'down' ? 48 : 16 * Number(scaleDir === 'none')
  useLayoutEffect(() => {
    const node = el.current
    if (!node) return
    const r = node.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) gsap.set(node, { scale: 1, opacity: 1, x: 0, y: 0 })
    else gsap.set(node, { scale: fromScale, opacity: 0, x: entranceTranslateX, y: fromY })
  }, [fromScale, entranceTranslateX, fromY])
  useEffect(() => {
    if (!viewportEntranceActive) return
    const node = el.current
    if (!node) return
    const tween = gsap.to(node, {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.6,
      delay: 0.05 * Math.min(staggerIndex, 3),
      ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
      overwrite: 'auto',
    })
    return () => {
      tween.kill()
    }
  }, [viewportEntranceActive, staggerIndex, fromScale, entranceTranslateX, fromY])
  return (
    <div ref={setRefs(el, ref)} className={cn('BaseCard', H2_STYLES, className)} style={{ transformOrigin: scaleTransformOrigin }}>
      {children}
    </div>
  )
})

export const BaseCard = forwardRef<HTMLDivElement, BaseCardProps>(function BaseCard(props, ref) {
  if (props.useViewportEntrance) return <ViewportCard ref={ref} {...props} />
  const { useViewportEntrance: _u, viewportEntranceActive: _v, ...rest } = props
  return <ScrollCard ref={ref} {...rest} />
})
