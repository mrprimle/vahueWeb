'use client'

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'

export const LANDSCAPE_PHONE = '(orientation: landscape) and (max-height: 500px)'

function matches(query: string) {
  return 'matchMedia' in window && window.matchMedia(query).matches
}

/** Scale module 367272. `fallback` is the server snapshot. */
export function useMediaQuery(query: string, fallback?: boolean, onChange?: (v: boolean) => void) {
  const cb = useRef(onChange)
  cb.current = onChange
  useEffect(() => {
    cb.current?.(matches(query))
  }, [query])
  const subscribe = useCallback(
    (notify: () => void) => {
      if (!('matchMedia' in window)) return () => {}
      const mq = window.matchMedia(query)
      const listener = () => {
        cb.current?.(mq.matches)
        notify()
      }
      mq.addEventListener('change', listener)
      return () => mq.removeEventListener('change', listener)
    },
    [query],
  )
  return useSyncExternalStore(subscribe, () => matches(query), () => fallback)
}
