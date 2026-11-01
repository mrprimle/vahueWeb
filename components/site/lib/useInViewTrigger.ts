'use client'

import { useCallback, useEffect, useRef, type RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from './gsap'

export type InViewOptions = Omit<ScrollTrigger.Vars, 'trigger'> & {
  ticker?: gsap.TickerCallback
  tickerImmediate?: boolean
  retroactiveOnEnter?: boolean
}

// One refresh per frame across all instances.
let frame: number | null = null
let queued = new Set<{ callback: () => void }>()
function scheduleRefresh(callback: () => void) {
  const entry = { callback }
  queued.add(entry)
  if (frame === null) {
    frame = window.requestAnimationFrame(() => {
      frame = null
      const run = queued
      queued = new Set()
      if (run.size === 0) return
      ScrollTrigger.refresh()
      run.forEach((e) => e.callback())
    })
  }
  let live = true
  return () => {
    if (!live) return
    live = false
    queued.delete(entry)
    if (queued.size === 0 && frame !== null) {
      window.cancelAnimationFrame(frame)
      frame = null
    }
  }
}

/** Scale module 210104: one-shot style trigger, defaults start 'top 80%', end 'bottom 20%'. */
export function useInViewTrigger(ref: RefObject<HTMLElement | null>, options: InViewOptions = {}) {
  const latest = useRef(options)
  const tickerOn = useRef(false)
  useEffect(() => {
    latest.current = options
  })

  const tick = useCallback<gsap.TickerCallback>((time, delta, f, elapsed) => {
    latest.current.ticker?.(time, delta, f, elapsed)
  }, [])
  const startTicker = useCallback(() => {
    if (latest.current.ticker && !tickerOn.current) {
      gsap.ticker.add(tick)
      tickerOn.current = true
    }
  }, [tick])
  const stopTicker = useCallback(() => {
    if (tickerOn.current) {
      gsap.ticker.remove(tick)
      tickerOn.current = false
    }
  }, [tick])
  const onEnter = useCallback(
    (self: ScrollTrigger) => {
      latest.current.onEnter?.(self)
      startTicker()
    },
    [startTicker],
  )
  const onLeave = useCallback(
    (self: ScrollTrigger) => {
      stopTicker()
      latest.current.onLeave?.(self)
    },
    [stopTicker],
  )
  const onEnterBack = useCallback(
    (self: ScrollTrigger) => {
      latest.current.onEnterBack?.(self)
      startTicker()
    },
    [startTicker],
  )
  const onLeaveBack = useCallback(
    (self: ScrollTrigger) => {
      const o = latest.current
      if (!(o.tickerImmediate && o.ticker && self.scroll() <= 1)) stopTicker()
      o.onLeaveBack?.(self)
    },
    [stopTicker],
  )
  const onUpdate = useCallback((self: ScrollTrigger) => {
    latest.current.onUpdate?.(self)
  }, [])

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      let live = true
      const { ticker: _t, tickerImmediate: _ti, retroactiveOnEnter: _r, ...vars } = latest.current
      const st = ScrollTrigger.create({
        start: 'top 80%',
        end: 'bottom 20%',
        ...vars,
        trigger: el,
        onEnter: (s) => {
          if (live) onEnter(s)
        },
        onLeave: (s) => {
          if (live) onLeave(s)
        },
        onEnterBack: (s) => {
          if (live) onEnterBack(s)
        },
        onLeaveBack: (s) => {
          if (live) onLeaveBack(s)
        },
        onUpdate: (s) => {
          if (live) onUpdate(s)
        },
      })
      tickerOn.current = false
      const retro = () => {
        if (!live || !latest.current.retroactiveOnEnter || latest.current.tickerImmediate) return
        if ((st.progress > 0 || st.scroll() >= st.start - 1) && latest.current.onEnter) onEnter(st)
      }
      ScrollTrigger.addEventListener('refresh', retro)
      const sync = () => {
        if (!live) return
        if (latest.current.tickerImmediate) startTicker()
        else if (latest.current.ticker) {
          if (st.isActive) startTicker()
          else stopTicker()
        }
      }
      let cancel: (() => void) | null = null
      const refresh = () => {
        cancel?.()
        cancel = scheduleRefresh(() => {
          cancel = null
          sync()
        })
      }
      const onShow = () => {
        if (live) refresh()
      }
      const onVisibility = () => {
        if (document.visibilityState === 'visible') onShow()
      }
      window.addEventListener('pageshow', onShow)
      document.addEventListener('visibilitychange', onVisibility)
      retro()
      sync()
      refresh()
      return () => {
        live = false
        cancel?.()
        ScrollTrigger.removeEventListener('refresh', retro)
        window.removeEventListener('pageshow', onShow)
        document.removeEventListener('visibilitychange', onVisibility)
        stopTicker()
      }
    },
    {
      scope: ref as RefObject<HTMLElement>,
      revertOnUpdate: true,
      dependencies: [startTicker, stopTicker, onEnter, onLeave, onEnterBack, onLeaveBack, onUpdate, tick, options.start, options.end],
    },
  )
  return {}
}
