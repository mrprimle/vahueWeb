'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { gsap, reducedMotion } from './motion'
import { Chevron } from './icons'

export type ArrowCtaHandle = { prepare: () => void; play: (delay?: number) => gsap.core.Timeline | null }

// scale.com FlatCta, variant "arrow", theme "white" with the "filledWhiteArrow" intro
// (chunk 1h0nvyhf5gbrf.js, module 892855; byte-identical to the automotive audit's copy).
// Hover state machine, same as Scale's:
//   hovered -> the 35% current-colour wash slides -100% -> 0 (600ms ease-out)
//   leaving -> the wash exits to +100%; resetting -> it snaps back to -100% with no transition,
//              released after two rAFs. The reset runs on the 680ms timer: Scale also listens for the
//              wash's `transform` transitionend, but its Tailwind 4 translate-* classes animate the
//              `translate` property, so that handler never matches (measured on the automotive audit).
//   Re-entering while the wash is still leaving snaps it back first, so it always enters from the left.
//   Chevron strip: hovered slides -50% -> 0 (600ms ease-out); leave snaps it back (transition none).
const ArrowCta = forwardRef<ArrowCtaHandle, { href: string; label: string }>(function ArrowCta(
  { href, label },
  ref,
) {
  const root = useRef<HTMLAnchorElement>(null)
  const counter = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLSpanElement>(null)
  const arrow = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [trackIn, setTrackIn] = useState(false)
  const [trackSnap, setTrackSnap] = useState(false)
  const pending = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useImperativeHandle(ref, () => ({
    prepare() {
      if (reducedMotion()) return
      gsap.set(root.current, { autoAlpha: 0, borderRadius: 0, scaleX: 0, transformOrigin: 'left center' })
      gsap.set(counter.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(text.current, { opacity: 0 })
      gsap.set(arrow.current, { x: -6 })
    },
    play(delay = 0) {
      if (reducedMotion()) return null
      const r = 0.85
      const tl = gsap.timeline({ delay })
      tl.to(root.current, { autoAlpha: 1, borderRadius: 8, scaleX: 1, duration: r, ease: 'power2.out' }, 0)
      tl.to(counter.current, { scaleX: 1, duration: r, ease: 'power2.out' }, 0.1)
      tl.to(text.current, { opacity: 1 }, r - 0.1)
      tl.to(arrow.current, { x: 0, duration: r, ease: 'power3.inOut' }, 0)
      tl.add(() => {
        gsap.set([counter.current, text.current, arrow.current], { clearProps: 'all' })
        gsap.set(root.current, { clearProps: 'opacity,visibility,transform,transformOrigin,borderRadius' })
      })
      return tl
    },
  }))

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
    setTrackSnap(false)
    setTrackIn(true)
  }, [])

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

  const washTransform = resetting
    ? 'translateX(-100%)'
    : hovered
      ? 'translateX(0)'
      : leaving
        ? 'translateX(100%)'
        : 'translateX(-100%)'
  const trackTransform = trackIn && !trackSnap ? 'translateX(0)' : 'translateX(-50%)'

  return (
    <a
      ref={root}
      href={href}
      data-qa="cta"
      onPointerEnter={enter}
      onPointerLeave={leave}
      className="group/cta relative inline-flex h-max w-fit cursor-pointer items-center justify-center overflow-hidden rounded-md bg-white text-black"
    >
      <div
        aria-hidden
        data-qa="cta-wash"
        className="pointer-events-none absolute inset-0 z-0 size-full rounded-[inherit] bg-current opacity-35 ease-out motion-reduce:transition-none"
        style={{
          transform: washTransform,
          transitionProperty: resetting ? 'none' : 'transform',
          transitionDuration: resetting ? '0ms' : '600ms',
        }}
      />
      <div ref={counter} className="relative z-[1] inline-flex items-center justify-center py-1 pl-4 pr-1">
        <div className="relative z-[1] flex flex-1 flex-wrap items-center justify-center gap-4">
          {/* TODO: Vahue copy */}
          <span ref={text} className="block self-center text-nowrap text-[14px] font-medium capitalize leading-[1.5]">
            {label}
          </span>
          <div
            ref={arrow}
            className="relative z-[1] box-border flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black p-2 text-white"
          >
            <div
              aria-hidden
              data-qa="cta-strip"
              className="absolute inset-0 flex h-full w-[200%] transform-gpu ease-out motion-reduce:!translate-x-0 motion-reduce:!transform-none motion-reduce:!transition-none"
              style={{
                transform: trackTransform,
                transitionProperty: trackSnap ? 'none' : 'transform',
                transitionDuration: '600ms',
              }}
            >
              <span className="flex h-full w-1/2 shrink-0 items-center justify-center">
                <Chevron />
              </span>
              <span className="flex h-full w-1/2 shrink-0 items-center justify-center">
                <Chevron />
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
})

export default ArrowCta
