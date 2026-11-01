'use client'

// Scale module 756386: the backdrop panel grows to full width while the section reaches the top.
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { mapRange } from '../lib/math'
import { useScrubTrigger } from '../lib/useScrubTrigger'

export const ScrollRevealSection = forwardRef<
  { getScaleValue: () => number | null },
  { children?: ReactNode; backdropColor?: string; backdropClassName?: string; contentContainerColor?: string; className?: string }
>(function ScrollRevealSection({ children, backdropColor, backdropClassName, contentContainerColor, className = '' }, ref) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const setters = useRef<{ sx?: (v: number) => void; sy?: (v: number) => void; tl?: (v: number) => void; tr?: (v: number) => void }>({})
  const scale = useRef<number | null>(null)
  useLayoutEffect(() => {
    const el = panel.current
    if (!el) return
    setters.current = {
      sx: gsap.quickSetter(el, 'scaleX') as (v: number) => void,
      sy: gsap.quickSetter(el, 'scaleY') as (v: number) => void,
      tl: gsap.quickSetter(el, 'borderTopLeftRadius', 'px') as (v: number) => void,
      tr: gsap.quickSetter(el, 'borderTopRightRadius', 'px') as (v: number) => void,
    }
  }, [])
  useScrubTrigger(root, {
    start: 'top bottom',
    end: 'top top',
    pinSpacing: false,
    onUpdate: (self) => {
      const { sx, tl, tr } = setters.current
      if (!sx || !tl || !tr) return
      const w = root.current?.offsetWidth
      if (!w) return
      const min = Math.max(0.01, 1 - (2 * (window.innerWidth < 768 ? 12 : 24)) / w)
      const p = mapRange(self.progress, 0.5, 1, 0, 1, true)
      scale.current = mapRange(p, 0, 0.8, min, 1, true)
      const radius = 16 * (1 - mapRange(p, 0, 0.8, 0, 1, true))
      sx(scale.current)
      tl(radius)
      tr(radius)
    },
  })
  useImperativeHandle(ref, () => ({ getScaleValue: () => scale.current }))
  return (
    <div ref={root} className={`ScrollRevealSection isolate relative w-full ${backdropClassName || (backdropColor && backdropColor !== 'transparent' ? `bg-${backdropColor}` : '')} ${className}`}>
      <div ref={panel} className={`pointer-events-none w-full h-full absolute inset-0 z-0 origin-top overflow-hidden bg-${contentContainerColor}`} aria-hidden />
      <div className="relative z-1 isolate min-h-[60vh]">{children}</div>
    </div>
  )
})
