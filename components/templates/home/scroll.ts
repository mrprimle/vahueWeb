'use client'

import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export const mapRange = (v: number, a: number, b: number, c: number, d: number) => c + (d - c) * gsap.utils.clamp(0, 1, (v - a) / (b - a))

/** useScrollTrigger (37xz28pjbnlx4 module 210104): onEnter at `start` (default top 80%), retroactive on every refresh. */
export function useRetroEnter(ref: RefObject<Element | null>, onEnter: () => void, { start = 'top 80%', onLeave, onEnterBack, onLeaveBack }: { start?: string; onLeave?: () => void; onEnterBack?: () => void; onLeaveBack?: () => void } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const st = ScrollTrigger.create({ trigger: el, start, end: 'bottom 20%', onEnter, onLeave, onEnterBack, onLeaveBack })
    const retro = () => {
      if (st.progress > 0 || st.scroll() >= st.start - 1) onEnter()
    }
    ScrollTrigger.addEventListener('refresh', retro)
    retro()
    return () => {
      ScrollTrigger.removeEventListener('refresh', retro)
      st.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])
}
