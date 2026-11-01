'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mapRange, prefersReducedMotion } from './scroll'

gsap.registerPlugin(ScrollTrigger)

/*
 * ScrollRevealSection (058pnujclak3f.js module 756386). Panel behind the content, trigger = section "top bottom" -> "top top":
 * l = map(p, .5..1, 0..1); scaleX = map(l, 0...8, 1 - 2*gutter/width .. 1) (gutter 24, 12 under 768), top radii 16 -> 0.
 * getScaleValue() hands the same scale to children that follow it (Applications section, VideoCta).
 */
export type ScrollRevealHandle = { getScaleValue: () => number | null }

const ScrollReveal = forwardRef<ScrollRevealHandle, { children: ReactNode; panelColor: string; className?: string }>(function ScrollReveal({ children, panelColor, className = '' }, ref) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const value = useRef<number | null>(null)
  useImperativeHandle(ref, () => ({ getScaleValue: () => value.current }), [])
  useEffect(() => {
    const el = root.current
    const bg = panel.current
    if (!el || !bg) return
    if (prefersReducedMotion()) {
      value.current = 1
      return
    }
    const setX = gsap.quickSetter(bg, 'scaleX')
    const setTL = gsap.quickSetter(bg, 'borderTopLeftRadius', 'px')
    const setTR = gsap.quickSetter(bg, 'borderTopRightRadius', 'px')
    const apply = (p: number) => {
      const w = el.offsetWidth
      if (!w) return
      const s = Math.max(0.01, 1 - (2 * (window.innerWidth < 768 ? 12 : 24)) / w)
      const l = mapRange(p, 0.5, 1, 0, 1)
      value.current = mapRange(l, 0, 0.8, s, 1)
      const r = 16 * (1 - mapRange(l, 0, 0.8, 0, 1))
      setX(value.current)
      setTL(r)
      setTR(r)
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'top top', onUpdate: (s) => apply(s.progress), onRefresh: (s) => apply(s.progress) })
    apply(st.progress)
    return () => st.kill()
  }, [])
  return (
    <div ref={root} className={`ScrollRevealSection relative isolate w-full ${className}`}>
      <div ref={panel} aria-hidden className="pointer-events-none absolute inset-0 z-0 h-full w-full origin-top overflow-hidden" style={{ backgroundColor: panelColor, borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
      <div className="relative z-[1] isolate min-h-[60vh]">{children}</div>
    </div>
  )
})

export default ScrollReveal
