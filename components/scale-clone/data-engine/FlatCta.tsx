'use client'

import { forwardRef, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import s from './dataEngine.module.css'

/*
 * scale.com FlatCta. Hover slides a currentColor layer (opacity .35 / .30) in from below
 * (from the left for the arrow variant), and out the opposite side on leave.
 * Fill / border: 300ms, label scales to .9. Arrow: 600ms, chevron track slides one slot in, snaps back on leave.
 */

type Variant = 'fill' | 'border' | 'arrow'
type Theme = 'black' | 'white'

type Props = {
  href: string
  variant?: Variant
  theme?: Theme
  children: ReactNode
  className?: string
}

export const Chevron = () => (
  <svg className="block shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6.12994 12.7576C5.99604 12.8915 5.77896 12.8915 5.64506 12.7576L5.24244 12.3549C5.10854 12.221 5.10854 12.004 5.24244 11.8701L8.58217 8.53033C8.87506 8.23744 8.87506 7.76256 8.58217 7.46967L5.24244 4.12994C5.10854 3.99604 5.10854 3.77896 5.24244 3.64506L5.64506 3.24244C5.77896 3.10854 5.99604 3.10854 6.12994 3.24244L10.3572 7.46967C10.6501 7.76256 10.6501 8.23744 10.3572 8.53033L6.12994 12.7576Z"
      fill="currentColor"
    />
  </svg>
)

const FlatCta = forwardRef<HTMLAnchorElement, Props>(function FlatCta(
  { href, variant = 'fill', theme = 'black', children, className = '' },
  ref,
) {
  const arrow = variant === 'arrow'
  const outline = variant === 'border'
  // Same state machine as Scale's FlatCta (chunk 1h0nvyhf5gbrf.js, module 892855):
  //   hovered (U) -> fill at 0; leaving (D) -> fill exits the far side; resetting (j) -> fill snaps back to the
  //   start with no transition, released after two rAFs. Leave resets after 680ms: Scale also listens for the
  //   fill's `transform` transitionend, but its Tailwind 4 translate-* classes animate the `translate` property,
  //   so that handler never matches and the 680ms timer is what resets it (measured on scale.com: the arrow wash
  //   sits at +100% and the border fill at -100% until ~700ms). The clone animates `transform`, so it skips the
  //   handler. Re-entering while the fill is still leaving snaps it back first, so it always enters
  //   from the start side. Arrow track: hovered slides -50% -> 0 (600ms); leave snaps it back (transition none).
  const [hovered, setHovered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [trackIn, setTrackIn] = useState(false)
  const [trackSnap, setTrackSnap] = useState(false)
  const pending = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const duration = arrow ? 600 : 300

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
    clear()
    setResetting(pending.current)
    pending.current = false
    setLeaving(false)
    setHovered(true)
    if (arrow) {
      setTrackSnap(false)
      setTrackIn(true)
    }
  }, [arrow])

  const leave = useCallback(() => {
    if (arrow) {
      setTrackIn(false)
      setTrackSnap(true)
    }
    setHovered(false)
    if (resetting) return
    setLeaving(true)
    pending.current = true
    clear()
    timer.current = setTimeout(() => {
      timer.current = null
      finishLeave()
    }, 680)
  }, [arrow, resetting, finishLeave])

  const start = arrow ? 'translateX(-100%)' : 'translateY(100%)'
  const fillTransform = resetting
    ? start
    : hovered
      ? 'translate(0,0)'
      : leaving
        ? arrow
          ? 'translateX(100%)'
          : 'translateY(-100%)'
        : start
  const trackTransform = trackIn && !trackSnap ? 'translateX(0)' : 'translateX(-50%)'

  const colours = outline
    ? theme === 'white'
      ? 'border border-white text-white'
      : 'border border-black text-black'
    : theme === 'white'
      ? 'bg-white text-black'
      : 'bg-black text-white'
  const fillOpacity = (theme === 'black' && !outline) || (theme === 'white' && outline) ? 0.3 : 0.35

  return (
    <a
      ref={ref}
      href={href}
      onPointerEnter={enter}
      onPointerLeave={leave}
      className={`${s.cta} ${arrow ? s.ctaArrow : ''} ${colours} ${className}`}
    >
      <span
        aria-hidden="true"
        className={s.ctaFill}
        style={{
          opacity: fillOpacity,
          transform: fillTransform,
          transition: resetting ? 'none' : undefined,
          transitionDuration: resetting ? undefined : `${duration}ms`,
        }}
      />
      {arrow ? (
        <span className="relative z-[1] inline-flex items-center gap-4 py-1 pl-4 pr-1" data-cta-counter>
          <span className={s.ctaLabel} data-cta-text>
            {children}
          </span>
          <span className={`${s.ctaIcon} ${theme === 'white' ? 'bg-black text-white' : 'bg-white text-black'}`} data-cta-arrow>
            <span
              className={s.ctaTrack}
              style={{ transform: trackTransform, transition: trackSnap ? 'none' : undefined }}
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
      ) : (
        <span className="relative z-[1] inline-flex items-center px-4 py-2" data-cta-counter>
          <span className={s.ctaLabel} data-cta-text>
            {children}
          </span>
        </span>
      )}
    </a>
  )
})

export default FlatCta
