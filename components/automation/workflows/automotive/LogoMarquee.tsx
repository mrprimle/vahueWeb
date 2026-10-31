'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import s from './styles.module.css'

/*
 * Mobile logo cloud (<768), copied from the automotive clone: react-fast-marquee with default props
 * (speed 50px/s, left, no autoFill). Two copies of the list, each min-width 100%, translateX(0 -> -100%)
 * linear, duration = width / 50. Items carry ml-12 (48px). Here the items are tool wordmarks.
 */
export default function LogoMarquee({ items }: { items: ReactNode[] }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const set = () => el.style.setProperty('--rfm-duration', `${el.offsetWidth / 50}s`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const group = (key: string) => (
    <div key={key} className={`${s.marqueeGroup} flex min-w-full shrink-0 items-center`} aria-hidden={key === 'b'}>
      {items.map((item, i) => (
        <div key={i} className="ml-12 flex flex-col items-center justify-center">
          {item}
        </div>
      ))}
    </div>
  )
  return (
    <div ref={root} className="relative flex w-full overflow-hidden">
      {group('a')}
      {group('b')}
    </div>
  )
}
