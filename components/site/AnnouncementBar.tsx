'use client'

// Scale module 677474. On Scale it renders in the layout, above everything, on every page (displayScope "all").
// Scale's CMS entry is `scheduled`, so the server renders nothing and the first effect mounts the bar: it appears
// at hydration and pushes the page down. There is no timer; the roughly 350ms after first paint is hydration time.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { LogoMark } from './Logo'
import type { AnnouncementContent } from './content.types'

const VARIANTS: Record<string, string> = {
  white: 'bg-white text-scale-gray-10 border-b border-scale-gray-80',
  'light-gray': 'bg-[#EAEAEA] text-scale-gray-10 border-b border-scale-gray-80',
  'medium-gray': 'bg-[#C7C7C7] text-scale-gray-10',
  'dark-gray': 'bg-[#929292] text-scale-gray-10',
  dark: 'bg-black text-white',
  evergreen: 'bg-evergreen text-white',
  'atlas-blue': 'bg-atlas-blue text-white',
  'foundry-tan': 'bg-foundry-tan text-scale-gray-10',
  'archive-purple': 'bg-archive-purple text-white',
  'cloud-slate': 'bg-cloud-slate text-scale-gray-10',
}

export function AnnouncementBar({ data }: { data: AnnouncementContent }) {
  const ref = useRef<HTMLDivElement>(null)
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useLayoutEffect(() => {
    const root = document.documentElement
    const el = ref.current
    if (!mounted || !el) {
      root.style.setProperty('--announcement-offset', '0px')
      return
    }
    let frame = 0
    const write = () => {
      frame = 0
      root.style.setProperty('--announcement-offset', `${Math.max(0, el.getBoundingClientRect().bottom)}px`)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write)
    }
    const ro = new ResizeObserver(write)
    ro.observe(el)
    write()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      ro.disconnect()
      root.style.setProperty('--announcement-offset', '0px')
    }
  }, [mounted])
  if (!mounted) return null
  const tone = VARIANTS[data.variant] ?? VARIANTS.dark
  return (
    <div
      ref={ref}
      role="region"
      aria-label="Announcement"
      aria-hidden={dismissed || undefined}
      inert={dismissed || undefined}
      className={['relative z-30 w-full overflow-hidden transition-all duration-300 ease-out', tone, dismissed ? 'max-h-0 -translate-y-full opacity-0' : 'max-h-40 opacity-100'].join(' ')}
    >
      <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6 flex items-center justify-center gap-3 py-2.5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm leading-snug">
          <LogoMark size={16} className="shrink-0" />
          <span>{data.text}</span>
          <Link href={data.cta.href} className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline">
            {data.cta.label}
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" height="1em" width="1em">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
            </svg>
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100"
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" height="1em" width="1em">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  )
}
