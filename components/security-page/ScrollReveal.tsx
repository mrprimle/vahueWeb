'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './animatedText'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com ScrollRevealSection (chunk 058pnujclak3f / 0c1-uups1drfu, module 756386).
 * A backdrop panel (origin-top) widens to full bleed as the section scrolls in.
 * trigger = section, "top bottom" -> "top top", pinSpacing false:
 *   l      = map(progress, 0.5..1 -> 0..1)
 *   scaleX = map(l, 0..0.8 -> 1 - 2*gutter/width .. 1), gutter 24px (12px under 768px)
 *   top-left / top-right radius = 16 * (1 - map(l, 0..0.8 -> 0..1)) px
 */

const map = (v: number, a: number, b: number, c: number, d: number) =>
  c + (d - c) * gsap.utils.clamp(0, 1, (v - a) / (b - a))

export default function ScrollReveal({
  children,
  backdrop = '#f2f2f2',
  panel = '#000',
}: {
  children: ReactNode
  backdrop?: string
  panel?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    const bg = panelRef.current
    if (!el || !bg) return
    if (prefersReducedMotion()) {
      gsap.set(bg, { scaleX: 1, borderTopLeftRadius: 0, borderTopRightRadius: 0 })
      return
    }
    const setX = gsap.quickSetter(bg, 'scaleX')
    const setTL = gsap.quickSetter(bg, 'borderTopLeftRadius', 'px')
    const setTR = gsap.quickSetter(bg, 'borderTopRightRadius', 'px')
    const apply = (p: number) => {
      const w = el.offsetWidth
      if (!w) return
      const start = Math.max(0.01, 1 - (2 * (window.innerWidth < 768 ? 12 : 24)) / w)
      const l = map(p, 0.5, 1, 0, 1)
      setX(map(l, 0, 0.8, start, 1))
      const r = 16 * (1 - map(l, 0, 0.8, 0, 1))
      setTL(r)
      setTR(r)
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'top top',
      onUpdate: ({ progress }) => apply(progress),
      onRefresh: ({ progress }) => apply(progress),
    })
    apply(st.progress)
    return () => st.kill()
  }, [])

  return (
    <div ref={root} className="relative isolate w-full" style={{ background: backdrop }}>
      <div
        ref={panelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full origin-top overflow-hidden"
        style={{ background: panel, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />
      <div className="relative z-[1] isolate min-h-[60vh]">{children}</div>
    </div>
  )
}
