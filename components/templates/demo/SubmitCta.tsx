'use client'

import { useCallback, useEffect, useRef, useState, type TransitionEvent } from 'react'
import s from './demo.module.css'

/*
 * scale.com FlatCta, variant "arrow", theme "black", rendered `as="button"` (StaticForm's Submit, module 892855).
 * Hover: a currentColor layer (opacity .30) slides in from the left (-100% -> 0) and leaves to the right, 600ms
 * cubic-bezier(0,0,.2,1); the chevron track slides one 16px slot (-50% -> 0) over 600ms and snaps back on leave.
 * No focus classes on Scale's button: keyboard focus shows the browser's default ring.
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
  // Scale's FlatCta state machine (chunk 1h0nvyhf5gbrf.js, module 892855; byte-identical to the enterprise-healthcare
  // audit, ported from components/templates/enterprise-healthcare/FlatCta.tsx):
  //   hovered -> fill at 0; leaving -> fill exits right (+100%); resetting -> fill snaps back to -100% with no transition,
  //   released after two rAFs. Leave resets on the fill's `transform` transitionend or after 680ms; the fill moves with the
  //   CSS `translate` property (Tailwind v4), so in practice the 680ms timeout wins, as on Scale. Re-entering while the fill
  //   is still leaving snaps it back first, so it always enters from the left.
  //   Chevron track: hovered slides -50% -> 0 over 600ms; leave snaps it back (transition none, released after two rAFs).
  //   Disabled (busy) ignores pointerenter, as Scale's `disabled` prop does.
  const [hovered, setHovered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [trackIn, setTrackIn] = useState(false)
  const [trackSnap, setTrackSnap] = useState(false)
  const pending = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = () => {
    if (timer.current != null) clearTimeout(timer.current)
    timer.current = null
  }
  useEffect(() => clear, [])

  const finishLeave = useCallback(() => {
    if (!pending.current) return
    clear()
    pending.current = false
    setLeaving(false)
    setResetting(true)
  }, [])

  useEffect(() => {
    if (!resetting) return
    let b = 0
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setResetting(false))
    })
    return () => {
      cancelAnimationFrame(a)
      cancelAnimationFrame(b)
    }
  }, [resetting])

  useEffect(() => {
    if (!trackSnap) return
    let b = 0
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setTrackSnap(false))
    })
    return () => {
      cancelAnimationFrame(a)
      cancelAnimationFrame(b)
    }
  }, [trackSnap])

  const enter = useCallback(() => {
    if (busy) return
    clear()
    setResetting(pending.current)
    pending.current = false
    setLeaving(false)
    setHovered(true)
    setTrackSnap(false)
    setTrackIn(true)
  }, [busy])

  const leave = useCallback(() => {
    setTrackIn(false)
    setTrackSnap(true)
    setHovered(false)
    if (resetting) return
    setLeaving(true)
    pending.current = true
    clear()
    timer.current = setTimeout(() => {
      timer.current = null
      finishLeave()
    }, 680)
  }, [resetting, finishLeave])

  const onFillEnd = (e: TransitionEvent<HTMLSpanElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName === 'transform' || e.propertyName === '-webkit-transform') finishLeave()
  }

  const fillTranslate = resetting ? '-100% 0' : hovered ? '0 0' : leaving ? '100% 0' : '-100% 0'
  const trackTranslate = trackIn && !trackSnap ? '0 0' : '-50% 0'

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
        onTransitionEnd={onFillEnd}
        style={{ translate: fillTranslate, transition: resetting ? 'none' : undefined }}
      />
      <span className={s.ctaInner}>
        <span className={s.ctaLabel}>{label}</span>
        <span className={s.ctaIcon}>
          <span
            aria-hidden="true"
            className={s.ctaTrack}
            style={{ translate: trackTranslate, transition: trackSnap ? 'none' : undefined }}
          >
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
