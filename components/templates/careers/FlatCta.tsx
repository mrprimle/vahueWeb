'use client'

import { forwardRef, useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode, type TransitionEvent } from 'react'
import s from './careers.module.css'

/*
 * scale.com FlatCta (chunk 1h0nvyhf5gbrf.js sha256 10b2627a…, module 892855; same hover state machine as the security /
 * guides / enterprise audits) wrapped in Scale's CMSLink behaviour (module 737900):
 *   - internal hrefs: next/link with `focus:outline-1 focus:outline-scale-skyblue` (1px #86bff2 on :focus)
 *   - external hrefs: plain <a>, target _blank unless the URL contains scale.com, rel noopener noreferrer, no focus
 *     classes (the UA focus ring shows)
 *   - smoothScrollTargetId (the hero "View Open Positions" -> #open-roles). Measured on scale.com/careers (2026-11-01):
 *     the click pushes `#open-roles` onto the history and the page glides there through Lenis (per-frame
 *     scrollTo({ behavior: 'instant' }), lerp ~0.14), not a native scrollIntoView. The clone does the same through the
 *     shared Lenis (window.__lenis); without Lenis it falls back to scrollIntoView smooth.
 * Hover slides a currentColor layer (opacity .35 / .30) in from below (from the left for the arrow variants) and out the
 * opposite side on leave. Fill / border: 300ms, label scales to .9. Arrow: 600ms, the chevron track slides one slot in
 * and snaps back on leave.
 * Variants: "arrow" (filled + 32px icon box), "borderArrow" (= Scale's arrowOutline: 1px border, transparent icon box).
 */

type Variant = 'fill' | 'border' | 'arrow' | 'borderArrow'
type Theme = 'black' | 'white'

type Props = {
  href: string
  variant?: Variant
  theme?: Theme
  /** animateCta false on scale.com: the CTA keeps rounded-md (6px) instead of the intro's 8px. */
  staticShape?: boolean
  smoothScrollTargetId?: string
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

type LenisLike = { scrollTo: (t: HTMLElement | number, o?: { immediate?: boolean }) => void }

const FlatCta = forwardRef<HTMLAnchorElement, Props>(function FlatCta(
  { href, variant = 'fill', theme = 'black', staticShape, smoothScrollTargetId, children, className = '' },
  ref,
) {
  const arrow = variant === 'arrow' || variant === 'borderArrow'
  const outline = variant === 'border' || variant === 'borderArrow'
  const bordered = variant === 'borderArrow'
  // Scale's state machine: hovered -> fill at 0; leaving -> fill exits the far side; resetting -> fill snaps back to the
  // start with no transition, released after two rAFs. Leave resets on the fill's `transform` transitionend or after
  // 680ms; Scale's fill moves on the CSS `translate` property (Tailwind v4 translate-*), so that check never matches and
  // the reset is the 680ms timeout. The fill here animates `translate` too. Re-entering while the fill is still leaving
  // snaps it back first, so it always enters from the start side. Arrow track: hovered slides -50% -> 0 (600ms); leave
  // snaps it back (transition none).
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
    if (!resetting && !trackSnap) return
    let b = 0
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => {
        setResetting(false)
        setTrackSnap(false)
      })
    })
    return () => {
      cancelAnimationFrame(a)
      cancelAnimationFrame(b)
    }
  }, [resetting, trackSnap])

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

  const onFillEnd = (e: TransitionEvent<HTMLSpanElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName === 'transform' || e.propertyName === '-webkit-transform') finishLeave()
  }

  const external = /^https?:\/\//.test(href) && !href.includes('scale.com')

  const onClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (!smoothScrollTargetId || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      const id = smoothScrollTargetId.replace(/^#/, '')
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      if (location.hash !== `#${id}`) history.pushState(history.state, '', `#${id}`)
      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (lenis) lenis.scrollTo(target, reduced ? { immediate: true } : undefined)
      else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    },
    [smoothScrollTargetId],
  )

  const start = arrow ? '-100% 0' : '0 100%'
  const fillTranslate = resetting ? start : hovered ? '0 0' : leaving ? (arrow ? '100% 0' : '0 -100%') : start
  const trackTransform = trackIn && !trackSnap ? 'translateX(0)' : 'translateX(-50%)'

  const colours = outline
    ? theme === 'white'
      ? 'border border-white text-white'
      : 'border border-black text-black'
    : theme === 'white'
      ? 'bg-white text-black'
      : 'bg-black text-white'
  const fillOpacity = (theme === 'black' && !outline) || (theme === 'white' && outline) ? 0.3 : 0.35
  const shape = staticShape ? s.ctaStatic : arrow && !bordered ? s.ctaArrow : bordered ? s.ctaBorderArrow : ''

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerEnter={enter}
      onPointerLeave={leave}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${s.cta} ${shape} ${external ? s.focusUa : s.ctaFocus} ${colours} ${className}`}
    >
      <span
        aria-hidden="true"
        className={s.ctaFill}
        onTransitionEnd={onFillEnd}
        style={{
          opacity: fillOpacity,
          translate: fillTranslate,
          transition: resetting ? 'none' : undefined,
          transitionDuration: resetting ? undefined : `${duration}ms`,
        }}
      />
      {arrow ? (
        <span
          className={`relative z-[1] inline-flex items-center gap-4 pl-4 pr-1 ${bordered ? 'py-2' : 'py-1'}`}
          data-cta-counter
        >
          <span className={s.ctaLabel} data-cta-text>
            {children}
          </span>
          <span
            className={`${s.ctaIcon} ${
              bordered
                ? theme === 'white'
                  ? 'bg-transparent text-white'
                  : 'bg-transparent text-black'
                : theme === 'white'
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
            }`}
            data-cta-arrow
          >
            <span className={s.ctaTrack} style={{ transform: trackTransform, transition: trackSnap ? 'none' : undefined }}>
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
