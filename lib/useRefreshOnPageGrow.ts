'use client'

import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * Sections above a scrubbed trigger (lazy images, sliders, fonts) grow after the triggers are created,
 * which left pre-footer clip/scale triggers ~130-875px late in live sampling (see commit 1c2b96b).
 * Re-measure all ScrollTriggers, debounced 150ms, whenever the document height changes.
 *
 * Call it from any component on the page; one shared observer is ref-counted across callers,
 * so a hero and a pre-footer both calling it still cause a single refresh.
 */
let users = 0
let observer: ResizeObserver | null = null
let timer: ReturnType<typeof setTimeout> | undefined
let lastHeight = 0

function start() {
  lastHeight = document.documentElement.scrollHeight
  observer = new ResizeObserver(() => {
    const h = document.documentElement.scrollHeight
    if (h === lastHeight) return
    lastHeight = h
    clearTimeout(timer)
    timer = setTimeout(() => ScrollTrigger.refresh(), 150)
  })
  observer.observe(document.body)
}

export function useRefreshOnPageGrow() {
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return
    if (users++ === 0) start()
    return () => {
      if (--users > 0) return
      observer?.disconnect()
      observer = null
      clearTimeout(timer)
    }
  }, [])
}
