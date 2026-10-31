'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com ClipScrollSection (chunk 37xz28pjbnlx4, module 656598). ScrollTrigger start..end (default
 * "top bottom" -> "center center") maps progress p to
 *   clip-path: inset(map(p, 0..1, startPercentage/2 .. 0)% round {borderRadius}rem)   (skipped when noClip)
 *   inner scale: map(p, 0..1, startScale .. 1)
 * Enterprise uses it for PoweredBy (10 / .85 / radius 1 or .75, noClip) and Built to Be Trusted (10 / 1 / 1).
 */

const map = (v: number, a: number, b: number, c: number, d: number) => {
  const r = ((v - a) * (d - c)) / (b - a) + c
  return Math.min(Math.max(r, Math.min(c, d)), Math.max(c, d))
}

type Props = {
  children: ReactNode
  className?: string
  clipClassName?: string
  startPercentage?: number
  startScale?: number
  borderRadius?: number | { mobile: number; desktop: number }
  scrollStart?: string
  scrollEnd?: string
  noClip?: boolean
}

export default function ClipScroll({
  children,
  className = '',
  clipClassName = '',
  startPercentage = 75,
  startScale = 1.25,
  borderRadius = 1,
  scrollStart = 'top bottom',
  scrollEnd = 'center center',
  noClip = false,
}: Props) {
  const root = useRef<HTMLDivElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const radius = () => (typeof borderRadius === 'number' ? borderRadius : matchMedia('(min-width: 768px)').matches ? borderRadius.desktop : borderRadius.mobile)
    const apply = (p: number) => {
      const c = map(p, 0, 1, 0.5 * startPercentage, 0)
      const s = map(p, 0, 1, startScale, 1)
      if (!noClip && clip.current) clip.current.style.clipPath = `inset(${c}% round ${radius()}rem)`
      if (inner.current) inner.current.style.transform = `scale(${s})`
    }
    if (reduce) {
      apply(1)
      return
    }
    apply(0)
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: scrollStart,
      end: scrollEnd,
      onUpdate: (s) => apply(s.progress),
      onRefresh: (s) => apply(s.progress),
    })
    return () => st.kill()
  }, [startPercentage, startScale, borderRadius, scrollStart, scrollEnd, noClip])

  const r = typeof borderRadius === 'number' ? borderRadius : borderRadius.desktop
  return (
    <div ref={root} className={`ClipScrollSection relative isolate w-full ${noClip ? '' : 'bg-white'} ${className}`}>
      <div ref={clip} className={`h-full w-full overflow-hidden ${clipClassName}`} style={{ clipPath: `inset(0 round ${r}rem)` }}>
        <div ref={inner} className="h-full w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
