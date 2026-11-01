'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import s from './eps.module.css'

// react-fast-marquee defaults (speed 50, autoFill false, no pause): each of the two copies is min-width 100% of the
// container; duration = max(container width, content width) / 50 px/s (6.84s for the 342px row at 390).
export default function Marquee({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const set = () => {
      const w = Math.max(el.clientWidth, first?.scrollWidth ?? 0)
      el.style.setProperty('--rfm-duration', `${w / 50}s`)
    }
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={root} className={s.rfmContainer} style={{ '--rfm-duration': '6.84s' } as CSSProperties}>
      {[0, 1].map((copy) => (
        <div key={copy} className={s.rfmMarquee} aria-hidden={copy === 1 || undefined}>
          {children}
        </div>
      ))}
    </div>
  )
}
