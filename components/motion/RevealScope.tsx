'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { revealText } from './revealMotion'

/**
 * Adds line reveals to every section heading inside it, so existing sections pick up
 * the motion without each one being rewritten. Opt a heading out with data-no-reveal.
 */
export default function RevealScope({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const headings = root.querySelectorAll<HTMLElement>('section h2:not([data-no-reveal])')
    const cleanups = [...headings].map((h) => revealText(h, 'rise'))
    return () => cleanups.forEach((c) => c())
  }, [])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
