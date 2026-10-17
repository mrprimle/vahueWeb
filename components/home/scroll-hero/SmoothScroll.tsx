'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Lenis smooth scrolling driven by the GSAP ticker so ScrollTrigger scrubs stay
// in lockstep with the eased scroll position (lerp 0.14, wheel x0.8, touch synced
// on coarse pointers). Skipped for reduced motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    const coarse = matchMedia('(pointer: coarse)').matches
    const lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 0.8, autoRaf: false, allowNestedScroll: true, syncTouch: coarse })
    const tick = (time: number) => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
  return null
}
