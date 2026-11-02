'use client'

// labs.scale.com AppProviders (chunk 2ri_cj1i8zivb.js, function w): Lenis on the home route only, own rAF loop, `{ lerp: .1, smoothWheel: true }`.
// Scale's home is `/`; here it is `/labs`. Scale never cancels the frame loop after destroy; cancelling changes nothing observable.
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const LABS_HOME = '/labs'

export function LabsLenis() {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname !== LABS_HOME) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let frame = requestAnimationFrame(function tick(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(tick)
    })
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [pathname])
  return null
}
