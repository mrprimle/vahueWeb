'use client'

// Scale module 880750. Logos are neutral tiles on filled pages: pass `logos` as node or label.
import { forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { cn } from '../lib/cn'

export type MarqueeLogo = { id?: string; node?: ReactNode; label?: string }
export type LogoMarqueeHandle = {
  animateSet: () => void
  animateIn: (o?: { delay?: number }) => void
  animateOut: (o?: { delay?: number }) => Promise<void>
  startMarquee: () => void
}

/** Neutral stand-in at Scale's logo bounds (70x28). */
export function LogoTile({ label = 'Logo', className }: { label?: string; className?: string }) {
  return (
    <span className={cn('flex h-7 w-[70px] items-center justify-center rounded-sm border border-current text-[10px] opacity-60', className)}>{label}</span>
  )
}

export const LogoMarquee = forwardRef<
  LogoMarqueeHandle,
  { logos?: MarqueeLogo[]; className?: string; logoClassName?: string; containerClassName?: string; hideUntilAnimate?: boolean }
>(function LogoMarquee({ logos = [], className, logoClassName, containerClassName, hideUntilAnimate = false }, ref) {
  const items = useRef<(HTMLDivElement | null)[]>([])
  const [running, setRunning] = useState(false)
  const setItem = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      items.current[i] = el
    },
    [],
  )
  const targets = useCallback((count: number) => (count ? items.current.slice(0, count).filter(Boolean) : []), [])
  useLayoutEffect(() => {
    items.current.length = 2 * logos.length
  }, [logos.length])
  useLayoutEffect(() => {
    if (!hideUntilAnimate || !logos.length) return
    const t = targets(2 * logos.length)
    if (t.length) gsap.set(t, { opacity: 0, scale: 0.85, yPercent: 100 })
  }, [logos, hideUntilAnimate, targets])
  useImperativeHandle(
    ref,
    () => ({
      animateSet: () => {
        const t = targets(logos.length ? 2 * logos.length : 0)
        if (t.length) gsap.set(t, { opacity: 0, scale: 0.85, yPercent: 100 })
      },
      animateIn: ({ delay = 0.5 } = {}) => {
        const t = targets(logos.length ? 2 * logos.length : 0)
        if (!t.length) return
        setRunning((r) => !r || r)
        gsap.killTweensOf(t)
        gsap.fromTo(t, { scale: 0.85, yPercent: 100, opacity: 0 }, { scale: 1, yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay, ease: 'power2.out' })
      },
      animateOut: async ({ delay = 0 } = {}) => {
        const t = targets(logos.length ? 2 * logos.length : 0)
        if (!t.length) return
        gsap.killTweensOf(t)
        await gsap.to(t, { scale: 0.85, yPercent: 100, opacity: 0, duration: 0.4, delay, stagger: 0.1, ease: 'power2.in' })
        setRunning(false)
      },
      startMarquee: () => setRunning(true),
    }),
    [logos, targets],
  )
  if (!logos.length) return null
  const render = (logo: MarqueeLogo, i: number, suffix: string) => (
    <div key={`${logo.id ?? i}-${suffix}`} ref={setItem(suffix === 'a' ? i : i + logos.length)} className={cn('relative shrink-0 overflow-hidden text-inherit', logoClassName)}>
      {logo.node ?? <LogoTile label={logo.label} />}
    </div>
  )
  return (
    <div className={cn('LogoMarquee w-full overflow-hidden', className)} role="presentation" aria-hidden>
      <div className={cn('flex w-max gap-8 md:gap-8 overflow-hidden will-change-transform', running && 'motion-safe:animate-logo-marquee motion-reduce:animate-none', containerClassName)}>
        {logos.map((l, i) => render(l, i, 'a'))}
        {logos.map((l, i) => render(l, i, 'b'))}
      </div>
    </div>
  )
})
LogoMarquee.displayName = 'LogoMarquee'
