'use client'

// Scale's root scroller (chunk 2d7ykwtxp_8ed.js, function eR). Verbatim settings:
// lerp .14, wheelMultiplier .8, autoRaf off (gsap.ticker drives it), allowNestedScroll, autoResize off,
// syncTouch only on coarse pointers, ScrollTrigger proxied onto Lenis.
import { ReactLenis, type LenisRef } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from './lib/gsap'

export const LENIS_OPTIONS = { lerp: 0.14, wheelMultiplier: 0.8 }

export function SmoothScroll() {
  const ref = useRef<LenisRef>(null)
  useEffect(() => {
    const tick = (time: number) => {
      ref.current?.lenis?.raf(1000 * time)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(tick)
  }, [])
  useEffect(() => {
    let frame = 0
    let unmounted = false
    let cleanup: (() => void) | null = null
    let timer: ReturnType<typeof setTimeout> | undefined
    const wait = () => {
      const lenis = ref.current?.lenis
      if (!lenis) {
        frame = requestAnimationFrame(wait)
        return
      }
      if (unmounted) return
      ScrollTrigger.config({ limitCallbacks: false, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load', syncInterval: 0x3b9ac9ff, ignoreMobileResize: true })
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && !(ScrollTrigger as unknown as { isRefreshing: boolean }).isRefreshing) lenis.scrollTo(value as number, { immediate: true })
          return lenis.scroll
        },
        getBoundingClientRect: () => ({ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }),
      })
      const scheduleRefresh = () => {
        clearTimeout(timer)
        timer = setTimeout(() => ScrollTrigger.refresh(), 90)
      }
      new ResizeObserver(() => scheduleRefresh()).observe(document.body)
      const onScroll = () => {
        if (!unmounted) ScrollTrigger.update()
      }
      lenis.on('scroll', onScroll)
      let saved = 0
      const onRefresh = () => {
        lenis.resize()
        if (saved > 1 && window.scrollY <= 1 && lenis.scroll <= 1) {
          lenis.scrollTo(saved, { immediate: true, force: true })
          ScrollTrigger.update()
        }
      }
      ScrollTrigger.addEventListener('refresh', onRefresh)
      const onRefreshInit = () => {
        saved = Math.max(window.scrollY, lenis.scroll || 0)
      }
      ScrollTrigger.addEventListener('refreshInit', onRefreshInit)
      window.addEventListener('resize', scheduleRefresh)
      cleanup = () => {
        lenis.off('scroll', onScroll)
        ScrollTrigger.removeEventListener('refresh', onRefresh)
        ScrollTrigger.removeEventListener('refreshInit', onRefreshInit)
        window.removeEventListener('resize', scheduleRefresh)
      }
    }
    wait()
    return () => {
      unmounted = true
      if (frame) cancelAnimationFrame(frame)
      cleanup?.()
    }
  }, [])
  let coarse = false
  try {
    coarse = matchMedia('(pointer: coarse)').matches
  } catch {}
  return <ReactLenis root options={{ autoRaf: false, allowNestedScroll: true, autoResize: false, syncTouch: coarse, ...LENIS_OPTIONS }} ref={ref} />
}
