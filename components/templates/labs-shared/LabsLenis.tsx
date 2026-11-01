'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/*
 * labs.scale.com runs Lenis (1.3.21) on the home route only (chunk 2ri_cj1i8zivb.js):
 *   if (pathname !== '/') return; const l = new Lenis({ lerp: 0.1, smoothWheel: true });
 *   requestAnimationFrame(function t(n){ l.raf(n); requestAnimationFrame(t) })
 * i.e. its own rAF loop, no GSAP ticker. Other labs pages use native scroll. Exposed as window.__labsLenis so
 * labs dialogs can stop it while open.
 */
export default function LabsLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let id = requestAnimationFrame(function t(time) {
      lenis.raf(time)
      id = requestAnimationFrame(t)
    })
    const w = window as unknown as { __labsLenis?: Lenis }
    w.__labsLenis = lenis
    return () => {
      cancelAnimationFrame(id)
      if (w.__labsLenis === lenis) delete w.__labsLenis
      lenis.destroy()
    }
  }, [])
  return null
}
