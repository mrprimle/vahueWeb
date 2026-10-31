'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import s from './demo.module.css'

/*
 * scale.com FlatCta, variant "arrow", theme "black", rendered `as="button"` (StaticForm's Submit, module 892855).
 * Hover: a currentColor layer (opacity .30) slides in from the left (-100% -> 0) and leaves to the right, 600ms
 * cubic-bezier(0,0,.2,1); the chevron track slides one 16px slot (-50% -> 0) over 600ms.
 */
export const Chevron = () => (
  <svg className="block shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6.12994 12.7576C5.99604 12.8915 5.77896 12.8915 5.64506 12.7576L5.24244 12.3549C5.10854 12.221 5.10854 12.004 5.24244 11.8701L8.58217 8.53033C8.87506 8.23744 8.87506 7.76256 8.58217 7.46967L5.24244 4.12994C5.10854 3.99604 5.10854 3.77896 5.24244 3.64506L5.64506 3.24244C5.77896 3.10854 5.99604 3.10854 6.12994 3.24244L10.3572 7.46967C10.6501 7.76256 10.6501 8.23744 10.3572 8.53033L6.12994 12.7576Z"
      fill="currentColor"
    />
  </svg>
)

export default function SubmitCta({ label, onClick, busy = false }: { label: string; onClick?: () => void; busy?: boolean }) {
  // idle -> in (hovered) -> out (leaving) -> reset (snap back without transition) -> idle
  const [phase, setPhase] = useState<'idle' | 'in' | 'out' | 'reset'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )
  useEffect(() => {
    if (phase !== 'reset') return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('idle')))
    return () => cancelAnimationFrame(id)
  }, [phase])

  const enter = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    setPhase('in')
  }, [])
  const leave = useCallback(() => {
    setPhase('out')
    timer.current = setTimeout(() => setPhase('reset'), 680)
  }, [])

  const transform = phase === 'in' ? 'translate(0,0)' : phase === 'out' ? 'translateX(100%)' : 'translateX(-100%)'

  return (
    <button
      type="submit"
      onClick={onClick}
      onPointerEnter={enter}
      onPointerLeave={leave}
      disabled={busy}
      aria-busy={busy || undefined}
      className={`FlatCta ${s.cta}`}
    >
      <span
        aria-hidden="true"
        className={s.ctaFill}
        style={{ transform, transitionDuration: phase === 'reset' ? '0ms' : '600ms' }}
      />
      <span className={s.ctaInner}>
        <span className={s.ctaLabel}>{label}</span>
        <span className={s.ctaIcon}>
          <span aria-hidden="true" className={s.ctaTrack}>
            <span>
              <Chevron />
            </span>
            <span>
              <Chevron />
            </span>
          </span>
        </span>
      </span>
    </button>
  )
}
