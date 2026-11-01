'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from './gsap'

type GetEndEl = HTMLElement & { getEnd?: () => string | number }

export type ScrubTriggerOptions = Omit<ScrollTrigger.Vars, 'trigger' | 'animation' | 'onUpdate'> & {
  setupTimeline?: (tl: gsap.core.Timeline) => void
  timeline?: gsap.core.Timeline
  onProgress?: (progress: number) => void
  onUpdate?: (self: ScrollTrigger) => void
  timelineVersion?: unknown
  debug?: boolean
}

/** Scale module 681201: scrubbed trigger, defaults start 'top bottom', end 'bottom top', scrub true. */
export function useScrubTrigger(ref: RefObject<HTMLElement | null>, options: ScrubTriggerOptions = {}) {
  const progressRef = useRef(0)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const created = useRef(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const latest = useRef(options)
  useEffect(() => {
    latest.current = options
  })

  const usesEffect = options.timelineVersion !== undefined
  const setup = () => {
    const el = ref.current as GetEndEl | null
    if (!el) return
    if (created.current) {
      triggerRef.current?.kill()
      triggerRef.current = null
      timelineRef.current?.kill()
      timelineRef.current = null
    }
    const {
      setupTimeline,
      timeline,
      scrub = true,
      start = 'top bottom',
      end = 'bottom top',
      onProgress: _onProgress,
      onUpdate: _onUpdate,
      timelineVersion: _version,
      debug: _debug,
      ...rest
    } = latest.current
    const tl = timeline ?? gsap.timeline({ paused: true })
    const own = !timeline
    setupTimeline?.(tl)
    const st = ScrollTrigger.create({
      ...rest,
      trigger: el,
      start,
      end: () =>
        typeof el.getEnd === 'function'
          ? (el.getEnd() as string)
          : typeof end === 'function'
            ? (end as () => string)()
            : (end as string),
      animation: tl,
      scrub,
      onUpdate(self) {
        if (!ref.current) return
        progressRef.current = self.progress
        latest.current.onProgress?.(self.progress)
        latest.current.onUpdate?.(self)
      },
    })
    triggerRef.current = st
    timelineRef.current = tl
    let cancelled = false
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled && triggerRef.current === st) st.refresh()
      })
    })
    created.current = true
    return () => {
      cancelled = true
      triggerRef.current = null
      st.kill()
      if (own) tl.kill()
    }
  }

  // Scale switches between useEffect (keyed on timelineVersion) and useGSAP (layout, revert on update).
  useEffect(() => (usesEffect ? setup() : undefined), [ref, options.timelineVersion])
  useGSAP(() => (usesEffect ? undefined : setup()), {
    scope: ref as RefObject<HTMLElement>,
    revertOnUpdate: true,
    dependencies: [options.timelineVersion],
  })

  return { progressRef, scrollTriggerRef: triggerRef }
}
