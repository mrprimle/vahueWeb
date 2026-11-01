'use client'

import { useEffect, useState } from 'react'

export type PresenceAttrs = { 'data-open'?: ''; 'data-starting-style'?: ''; 'data-ending-style'?: '' }

/*
 * Base UI's mount/unmount transition contract (Dialog, Menu, Drawer popups on Mintlify): an element mounts with
 * [data-starting-style] for one frame, then the attribute is removed so CSS transitions it in; on close it gets
 * [data-ending-style] and is unmounted once the exit transition (`exitMs`) has run.
 */
export function usePresence(open: boolean, exitMs: number) {
  const [mounted, setMounted] = useState(open)
  const [phase, setPhase] = useState<'starting' | 'open' | 'ending'>(open ? 'open' : 'starting')

  useEffect(() => {
    if (open) {
      setMounted(true)
      setPhase('starting')
      let r2 = 0
      const r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setPhase('open'))
      })
      return () => {
        cancelAnimationFrame(r1)
        cancelAnimationFrame(r2)
      }
    }
    setPhase('ending')
    const t = window.setTimeout(() => setMounted(false), exitMs)
    return () => window.clearTimeout(t)
  }, [open, exitMs])

  const attrs: PresenceAttrs = {}
  if (open) attrs['data-open'] = ''
  if (phase === 'starting') attrs['data-starting-style'] = ''
  if (phase === 'ending') attrs['data-ending-style'] = ''
  return { mounted, attrs }
}
