'use client'

import { useEffect } from 'react'
import { setScaleNavTheme } from '../shared/header/navTheme'

/*
 * Copied from the about clone; national-security change: a dark section starting within the first 100px also covers
 * scroll 0 (Scale renders this page with data-initial-chrome-theme="dark", so the header is dark at the top).
 *
 * scale.com SectionThemeTracker (module 995634 in 268a4ug0aebtb.js, sha256 c8bcbaba…). Sections that called
 * setSectionTheme(el, "dark") (here: the Section with pageThemeOverride "dark") are measured once from their layout box
 * (getBoundingClientRect + scroll, at mount and 150ms after a resize / "section-theme:remeasure"); on every Lenis scroll
 * the page theme is "dark" while scroll + 35 is inside one of them, else "light", applied after a 50ms debounce.
 * Because the bounds are cached, the header follows the section's layout box, not its parallax-shifted visual box
 * (the stats Section is translated up to 20% down while it scrolls out). The clone marks such sections with
 * data-section-theme="dark" (Scale writes data-theme, which the Vahue app already uses on <html>).
 */
export default function SectionTheme() {
  useEffect(() => {
    const root = document.querySelector('.rootPageRenderer')
    if (!root) return
    const els = [...root.children].filter((e): e is HTMLElement => e instanceof HTMLElement && e.dataset.sectionTheme === 'dark')
    let ranges: { start: number; end: number }[] = []
    let current = 'light'
    let paused = false
    let t: ReturnType<typeof setTimeout> | undefined
    let rt: ReturnType<typeof setTimeout> | undefined
    const measure = () => {
      const y = scrollY
      ranges = els.map((e) => {
        const r = e.getBoundingClientRect()
        const start = r.top + y
        // this page starts dark (data-initial-chrome-theme="dark"): a dark section that begins under the announcement
        // bar owns the top of the page too
        return { start: start <= 110 ? 0 : start, end: r.top + r.height + y }
      })
    }
    const check = () => {
      if (paused) return
      const s = scrollY + 35
      const next = ranges.some((r) => s >= r.start && s <= r.end) ? 'dark' : 'light'
      if (next === current) return
      current = next
      clearTimeout(t)
      t = setTimeout(() => setScaleNavTheme(next as 'dark' | 'light'), 50)
    }
    const onResize = () => {
      paused = true
      clearTimeout(rt)
      rt = setTimeout(() => {
        paused = false
        measure()
        check()
      }, 150)
    }
    measure()
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('section-theme:remeasure', onResize)
    return () => {
      clearTimeout(t)
      clearTimeout(rt)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('section-theme:remeasure', onResize)
      setScaleNavTheme(null)
    }
  }, [])
  return null
}
