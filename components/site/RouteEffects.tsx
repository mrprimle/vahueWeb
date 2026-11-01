'use client'

// Scale's route-change logic (2d7ykwtxp_8ed.js, functions ey, eb, em): theme reset, scroll reset, hash scrolling.
import { useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { useReadyStore } from './lib/readyStore'
import { routeTheme, useTheme, useThemeStore } from './lib/themeStore'

const INPUT_EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown']

function offsetOf(el: HTMLElement) {
  let top = 0
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop
  const margin = Number.parseFloat(getComputedStyle(el).scrollMarginTop)
  return Math.max(0, top - (Number.isNaN(margin) ? 0 : margin))
}

function ReadyGate() {
  useEffect(() => {
    const timeout = setTimeout(() => useReadyStore.getState().resolve(), 4000)
    const off = useReadyStore.subscribe((s) => {
      if (s.resolved) clearTimeout(timeout)
    })
    const frame = requestAnimationFrame(() => {
      const { pending, resolve } = useReadyStore.getState()
      if (pending.size === 0) resolve()
    })
    return () => {
      off()
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [])
  return null
}

function hashTargetExists() {
  const hash = window.location.hash.slice(1)
  if (!hash) return false
  try {
    return !!document.getElementById(decodeURIComponent(hash))
  } catch {
    return false
  }
}

export function RouteEffects() {
  const pathname = usePathname()
  const resetReady = useReadyStore((s) => s.reset)
  const { resetTheme } = useTheme()
  const lenis = useLenis()
  const previous = useRef(pathname)
  const [generation, setGeneration] = useState(0)
  useLayoutEffect(() => {
    if (previous.current === pathname) return
    const theme = routeTheme(pathname)
    if (theme !== 'dark') return
    document.documentElement.setAttribute('data-theme-transition', 'instant')
    useThemeStore.getState().setPageThemeImmediate(theme)
    const frame = requestAnimationFrame(() => document.documentElement.removeAttribute('data-theme-transition'))
    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.removeAttribute('data-theme-transition')
    }
  }, [pathname])
  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    resetReady()
    resetTheme(routeTheme(pathname))
    if (lenis && !hashTargetExists()) lenis.scrollTo(0, { immediate: true })
    setGeneration(generation + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Scroll to the hash once the page reports ready.
  useEffect(() => {
    if (!lenis) return
    let id = ''
    try {
      id = decodeURIComponent(window.location.hash.slice(1))
    } catch {
      return
    }
    if (!id) return
    let cancelled = false
    let frame = 0
    let timer: ReturnType<typeof setTimeout> | undefined
    let unsub: (() => void) | null = null
    const jump = () => {
      const el = document.getElementById(id)
      if (el) {
        lenis.scrollTo(offsetOf(el), { immediate: true, force: true })
        ScrollTrigger.update()
      }
    }
    const onRefresh = () => {
      if (!cancelled) jump()
    }
    const stop = () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      INPUT_EVENTS.forEach((e) => window.removeEventListener(e, stop))
      clearTimeout(timer)
    }
    const run = () => {
      frame = requestAnimationFrame(() => {
        if (cancelled) return
        if (!document.getElementById(id)) {
          lenis.scrollTo(0, { immediate: true, force: true })
          return
        }
        ScrollTrigger.addEventListener('refresh', onRefresh)
        INPUT_EVENTS.forEach((e) => window.addEventListener(e, stop, { passive: true }))
        timer = setTimeout(stop, 3000)
        ScrollTrigger.refresh()
        jump()
      })
    }
    if (useReadyStore.getState().resolved) run()
    else
      unsub = useReadyStore.subscribe((s) => {
        if (s.resolved) {
          unsub?.()
          unsub = null
          run()
        }
      })
    return () => {
      cancelled = true
      unsub?.()
      cancelAnimationFrame(frame)
      stop()
    }
  }, [pathname, lenis])

  // Same-page anchor clicks go through Lenis.
  useEffect(() => {
    if (!lenis) return
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target instanceof Element ? (e.target.closest('a[href*="#"]') as HTMLAnchorElement | null) : null
      if (!a || (a.target && a.target !== '_self')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return
      let id = ''
      try {
        id = decodeURIComponent(url.hash.slice(1))
      } catch {
        return
      }
      const el = id && document.getElementById(id)
      if (!el) return
      e.preventDefault()
      if (url.hash !== window.location.hash) window.history.pushState(window.history.state, '', url.hash)
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      lenis.scrollTo(offsetOf(el), {
        immediate: reduced,
        onComplete: () => {
          const y = offsetOf(el)
          if (Math.abs(lenis.scroll - y) > 1) lenis.scrollTo(y, { immediate: reduced })
        },
      })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [lenis])

  return <ReadyGate key={generation} />
}
