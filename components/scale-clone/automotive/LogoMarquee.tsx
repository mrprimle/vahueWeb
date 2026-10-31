'use client'

import { useEffect, useRef } from 'react'
import s from './automotive.module.css'

/*
 * Mobile logo cloud (<768): react-fast-marquee with default props (speed 50px/s, left, no autoFill).
 * Two copies of the list, each min-width 100%, translateX(0 -> -100%) linear, duration = width / 50.
 * Items carry ml-12 (48px).
 */
export default function LogoMarquee({ logos }: { logos: [number, number][] }) {
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
      {logos.map(([w, h], i) => (
        <div key={i} className="ml-12 flex flex-col items-center justify-center">
          <span className="block rounded-[4px] bg-black/10" style={{ width: w, height: h }} />
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
