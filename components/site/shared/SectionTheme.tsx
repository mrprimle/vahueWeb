'use client'

// Scale modules 995634 (section theme watcher) and 243385 (page theme setter).
import { useLenis } from 'lenis/react'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useTheme, useThemeStore, type PageTheme } from '../lib/themeStore'

type Measured = HTMLElement & { theme?: string }

/** Wrap page sections in `.CMSSliceRenderer.rootPageRenderer` and mark dark ones `data-theme="dark"`.
 *  The header turns dark when scroll + 35 falls inside a dark section. */
export function SectionThemeWatcher() {
  const sections = useRef<Measured[]>([])
  const ranges = useRef<{ start: number; end: number }[]>([])
  const lenis = useLenis()
  const current = useRef<PageTheme>('light')
  const { setTheme } = useTheme()
  useEffect(() => {
    let paused = false
    let debounce: ReturnType<typeof setTimeout> | undefined
    const measure = () => {
      if (!sections.current?.length) return
      const scroll = lenis?.scroll ?? window.scrollY ?? document.documentElement.scrollTop ?? 0
      const list: { start: number; end: number }[] = []
      sections.current.forEach((s) => {
        if (s.theme === 'dark') {
          const r = s.getBoundingClientRect()
          list.push({ start: r.top + scroll, end: r.top + r.height + scroll })
        }
      })
      ranges.current = list
    }
    const update = ({ scroll }: { scroll: number }) => {
      if (paused) return
      let next: PageTheme = 'light'
      ranges.current.forEach((r) => {
        if (scroll + 35 >= r.start && scroll + 35 <= r.end) next = 'dark'
      })
      if (current.current !== next) {
        current.current = next
        clearTimeout(debounce)
        debounce = setTimeout(() => setTheme(next), 50)
      }
    }
    const read = () => lenis?.scroll ?? window.scrollY ?? document.documentElement.scrollTop ?? 0
    const onNative = () => update({ scroll: read() })
    let settle: ReturnType<typeof setTimeout> | undefined
    const remeasure = () => {
      paused = true
      clearTimeout(settle)
      settle = setTimeout(() => {
        paused = false
        measure()
        update({ scroll: read() })
      }, 150)
    }
    const root = document.querySelector('.CMSSliceRenderer.rootPageRenderer')
    if (root) {
      sections.current = Array.from(root.children)
        .filter((c) => !c.classList.contains('LoaderScreen'))
        .flatMap((c) => (c.hasAttribute('data-slice-group') ? Array.from(c.querySelector('.CMSSliceRenderer')?.children ?? []) : [c])) as Measured[]
      sections.current.forEach((s) => {
        s.theme = s.getAttribute('data-theme') ?? 'light'
      })
    }
    measure()
    update({ scroll: read() })
    if (lenis) lenis.on('scroll', update)
    else window.addEventListener('scroll', onNative, { passive: true })
    window.addEventListener('resize', remeasure)
    window.addEventListener('section-theme:remeasure', remeasure)
    return () => {
      if (lenis) lenis.off('scroll', update)
      else window.removeEventListener('scroll', onNative)
      clearTimeout(settle)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('section-theme:remeasure', remeasure)
    }
  }, [lenis, setTheme])
  return null
}

/** Pins the page theme while mounted (Scale uses it on dark-first pages). */
export function PageThemeSetter({ theme = 'dark' }: { theme?: PageTheme }) {
  const set = useThemeStore((s) => s.setPageThemeImmediate)
  useLayoutEffect(() => {
    set(theme)
  }, [theme, set])
  useEffect(() => {
    const apply = () => set(theme)
    apply()
    window.addEventListener('pagehide', apply)
    window.addEventListener('beforeunload', apply)
    window.addEventListener('pageshow', apply)
    document.addEventListener('visibilitychange', apply)
    window.addEventListener('focus', apply)
    return () => {
      window.removeEventListener('pagehide', apply)
      window.removeEventListener('beforeunload', apply)
      window.removeEventListener('pageshow', apply)
      document.removeEventListener('visibilitychange', apply)
      window.removeEventListener('focus', apply)
    }
  }, [theme, set])
  return null
}
