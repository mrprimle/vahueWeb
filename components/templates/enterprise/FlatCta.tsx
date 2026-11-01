'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, type TransitionEvent } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

/*
 * scale.com FlatCta / AnimatedFlatCta (chunks 1h0nvyhf5gbrf + 37xz28pjbnlx4), white theme.
 *
 * arrow   white pill, 14px medium label + 32px black arrow box. Hover: a 35% currentColor wash slides in
 *         from the left (600ms ease-out) and leaves to the right; the arrow strip slides in from the left.
 *         Intro "filledWhiteArrow": root scaleX 0 -> 1, radius 0 -> 8 over 0.85s power3.out, inner counter
 *         scaleX 0 -> 1 (+0.1s), label fades in at 0.75s, arrow x -6 -> 0 power3.inOut.
 * border  1px white outline. Hover: 30% wash rises from below (300ms) and exits upward, label scales to 0.9.
 *         Intro "fadeIn": autoAlpha 0 -> 1 over 0.85s power3.out.
 */

export type FlatCtaHandle = { set: () => void; animateIn: (o?: { duration?: number; delay?: number }) => Promise<void> }

/*
 * Enterprise themes: arrow/white (white pill, black 32px arrow box), arrow/evergreen (#193A29 pill, white label,
 * transparent arrow box, gap 0: the hero CTA), border/gray (#EAEAEA fill, no outline: link-card CTAs).
 */
type Props = {
  href: string
  text: string
  variant: 'arrow' | 'border'
  theme?: 'white' | 'evergreen' | 'gray'
  /** Scale's CMSLink external branch: no `focus:outline-1 focus:outline-scale-skyblue` (1px #86bff2 on :focus). */
  external?: boolean
  /**
   * Scale's FlatCta `as`: 'link' renders CMSLink (an anchor with the focus outline); 'button' renders
   * <button type="button" aria-label={text}> with no focus classes. HeadlineWithCta (hero, PoweredBy) passes
   * as:"button" + onClick router.push(url) (`navigate`); LinkCard CTAs are buttons with no onClick, so the
   * click falls through to the card's anchor.
   */
  as?: 'link' | 'button'
  navigate?: boolean
}

const Arrow = () => (
  <svg className="block shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M6.12994 12.7576C5.99604 12.8915 5.77896 12.8915 5.64506 12.7576L5.24244 12.3549C5.10854 12.221 5.10854 12.004 5.24244 11.8701L8.58217 8.53033C8.87506 8.23744 8.87506 7.76256 8.58217 7.46967L5.24244 4.12994C5.10854 3.99604 5.10854 3.77896 5.24244 3.64506L5.64506 3.24244C5.77896 3.10854 5.99604 3.10854 6.12994 3.24244L10.3572 7.46967C10.6501 7.76256 10.6501 8.23744 10.3572 8.53033L6.12994 12.7576Z"
      fill="currentColor"
    />
  </svg>
)

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

const FlatCta = forwardRef<FlatCtaHandle, Props>(function FlatCta({ href, text, variant, theme = 'white', external = false, as = 'link', navigate = false }, ref) {
  const isArrow = variant === 'arrow'
  const green = theme === 'evergreen'
  const root = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const router = useRouter()
  // Scale: T = theme !== 'evergreen' -> only non-evergreen CTAs get the sliding wash; evergreen fill/arrow gets a
  // black mix-blend-multiply layer instead (opacity 0 -> .18 on group-hover/cta, 300ms) and isolate.
  const washed = !green
  const multiply = green && variant !== 'border'
  // Wash opacity: .30 for black/evergreen fills and white outlines, .35 otherwise (white arrow, gray fill).
  const washOpacity = variant === 'border' && theme === 'white' ? 'opacity-30' : 'opacity-35'
  const counter = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const arrow = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  // Same state machine as Scale's FlatCta (chunk 1h0nvyhf5gbrf.js sha256 10b2627a…, module 892855; ported from the
  // guides / enterprise-insurance clones): hovered -> wash at 0; leaving -> wash exits the far side; resetting ->
  // wash snaps back to the start with no transition, released after two rAFs. Leave resets on the wash's
  // `transform` transitionend or after 680ms; Scale's wash moves with the CSS `translate` property (Tailwind v4
  // translate-*), so that check never matches and the reset is the 680ms timeout. The wash here uses `translate`
  // too. Re-entering while the wash is still leaving snaps it back first, so it always enters from the start
  // side. Arrow strip: hovered slides -50% -> 0 (600ms); leave snaps it back (transition none).
  const [hovered, setHovered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [arrowIn, setArrowIn] = useState(false)
  const [arrowSnap, setArrowSnap] = useState(false)
  const pending = useRef(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clear = () => {
    if (leaveTimer.current != null) clearTimeout(leaveTimer.current)
    leaveTimer.current = null
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
    if (!resetting && !arrowSnap) return
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        setResetting(false)
        setArrowSnap(false)
      })
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [resetting, arrowSnap])

  const onEnter = useCallback(() => {
    if (!washed) {
      if (isArrow) {
        setArrowSnap(false)
        setArrowIn(true)
      }
      return
    }
    clear()
    setResetting(pending.current)
    pending.current = false
    setLeaving(false)
    setHovered(true)
    if (isArrow) {
      setArrowSnap(false)
      setArrowIn(true)
    }
  }, [isArrow, washed])
  const onLeave = useCallback(() => {
    if (isArrow) {
      setArrowIn(false)
      setArrowSnap(true)
    }
    if (!washed) return
    setHovered(false)
    if (resetting) return
    setLeaving(true)
    pending.current = true
    clear()
    leaveTimer.current = setTimeout(() => {
      leaveTimer.current = null
      finishLeave()
    }, 680)
  }, [isArrow, washed, resetting, finishLeave])
  const onWashEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName === 'transform' || e.propertyName === '-webkit-transform') finishLeave()
  }

  useImperativeHandle(ref, () => {
    const set = () => {
      const r = root.current
      if (!r || reduced()) return
      tl.current?.kill()
      if (isArrow) {
        gsap.set(r, { autoAlpha: 0, borderRadius: 0, scaleX: 0, transformOrigin: 'left center' })
        gsap.set(counter.current, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(label.current, { opacity: 0 })
        gsap.set(arrow.current, { x: -6 })
      } else {
        gsap.set(r, { autoAlpha: 0 })
      }
    }
    const animateIn = ({ duration = 0.65, delay = 0 } = {}) =>
      new Promise<void>((resolve) => {
        const r = root.current
        if (!r || reduced()) return resolve()
        set()
        const t = gsap.timeline({ delay, onComplete: () => resolve() })
        tl.current = t
        if (isArrow) {
          t.to(r, { autoAlpha: 1, borderRadius: 8, scaleX: 1, duration, ease: 'power3.out' }, 0)
          t.to(counter.current, { scaleX: 1, duration, ease: 'power3.out' }, 0.1)
          t.to(label.current, { opacity: 1 }, duration - 0.1)
          t.to(arrow.current, { x: 0, duration, ease: 'power3.inOut' }, 0)
          t.add(() => {
            gsap.set(counter.current, { clearProps: 'transform' })
            gsap.set(label.current, { clearProps: 'opacity' })
            gsap.set(arrow.current, { clearProps: 'x' })
            gsap.set(r, { clearProps: 'opacity,visibility,transform,transformOrigin' })
          })
        } else {
          t.to(r, { autoAlpha: 1, duration, ease: 'power3.out' }, 0)
          t.add(() => gsap.set(r, { clearProps: 'opacity,visibility' }))
        }
      })
    return { set, animateIn }
  })

  const start = isArrow ? '-100% 0' : '0 100%'
  const washTranslate = resetting ? start : hovered ? '0 0' : leaving ? (isArrow ? '100% 0' : '0 -100%') : start

  const Tag = as === 'button' ? 'button' : 'a'
  const tagProps =
    as === 'button'
      ? { type: 'button' as const, 'aria-label': text, onClick: navigate ? () => router.push(href) : undefined }
      : { href }
  return (
    <Tag
      ref={root}
      {...tagProps}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={`group/cta relative inline-flex h-max ${as === 'link' && !external ? 'focus:outline focus:outline-1 focus:outline-[#86bff2]' : ''} ${multiply ? 'isolate' : ''} w-fit cursor-pointer items-center justify-center overflow-hidden rounded-md ${
        isArrow
          ? `origin-center transform-gpu will-change-transform ${green ? 'bg-[#193A29] text-white' : 'bg-white text-black'}`
          : theme === 'gray'
            ? 'bg-[var(--ent-cta-gray,#EAEAEA)] text-[color:var(--ent-fg,#000)] transition-all duration-500 ease-out [@media(hover:hover)]:group-hover/card:bg-[color:var(--ent-fg,#000)] [@media(hover:hover)]:group-hover/card:text-[color:var(--ent-bg,#fff)]'
            : 'border border-white text-white'
      }`}
      style={isArrow ? { borderRadius: 8 } : undefined}
    >
      {washed ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-0 size-full rounded-[inherit] bg-current ease-out motion-reduce:transition-none ${washOpacity}`}
          onTransitionEnd={onWashEnd}
          style={{
            translate: washTranslate,
            transitionProperty: resetting ? 'none' : 'translate',
            transitionDuration: isArrow ? '600ms' : '300ms',
          }}
        />
      ) : null}
      {multiply ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] bg-black opacity-0 mix-blend-multiply transition-opacity duration-300 ease-out group-hover/cta:opacity-[0.18] motion-reduce:transition-none motion-reduce:group-hover/cta:opacity-0"
        />
      ) : null}
      <div className={`relative ${multiply ? 'z-[2]' : 'z-[1]'} inline-flex max-w-full flex-wrap items-center justify-center ${isArrow ? 'py-1 pl-4 pr-1' : 'px-4 py-2'}`}>
        <div
          ref={counter}
          className={`relative z-[1] flex w-full max-w-full flex-1 flex-wrap items-center justify-center transform-gpu will-change-transform ${isArrow ? (green ? 'gap-0' : 'gap-4') : ''}`}
          style={{ transformOrigin: '0% 50%' }}
        >
          <span
            ref={label}
            className={`block h-fit self-center text-nowrap text-[14px] font-medium capitalize leading-[1.5] ${
              isArrow ? '' : 'relative z-[1] inline-block origin-center transform-gpu transition-transform duration-300 ease-out group-hover/cta:scale-90 motion-reduce:transition-none motion-reduce:group-hover/cta:scale-100'
            }`}
          >
            {text}
          </span>
          {isArrow && (
            <div ref={arrow} className={`relative z-[1] box-border flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md p-2 text-white ${green ? '' : 'bg-black'}`}>
              <div
                aria-hidden
                className={`absolute inset-0 flex h-full w-[200%] transform-gpu ease-out will-change-transform motion-reduce:!translate-x-0 motion-reduce:!transition-none ${
                  arrowIn && !arrowSnap ? 'translate-x-0' : '-translate-x-1/2'
                } ${arrowSnap ? '!transition-none' : 'transition-transform'}`}
                style={{ transitionDuration: '600ms' }}
              >
                <span className="flex h-full w-1/2 shrink-0 items-center justify-center">
                  <Arrow />
                </span>
                <span className="flex h-full w-1/2 shrink-0 items-center justify-center">
                  <Arrow />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Tag>
  )
})

export default FlatCta
