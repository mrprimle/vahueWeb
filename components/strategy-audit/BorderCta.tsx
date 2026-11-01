'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { gsap, reducedMotion } from './motion'

export type BorderCtaHandle = { prepare: () => void; play: (delay?: number) => gsap.core.Tween | null }

// scale.com FlatCta, variant "border", theme "white", intro "fadeIn" (chunk 1h0nvyhf5gbrf.js, module 892855;
// byte-identical to the rlenvironments / automotive audits' copy):
//   intro: autoAlpha 0 -> 1, 0.85s power2.out (delay 0.5s, same call as the arrow CTA)
//   hover state machine, same as Scale's:
//     hovered -> the 30% current-colour wash rises translateY(100%) -> 0 (300ms ease-out)
//     leaving -> it exits through the top (-100%); resetting -> it snaps back to +100% with no transition,
//                released after two rAFs. The reset runs on the 680ms timer: Scale also listens for the wash's
//                `transform` transitionend, but its Tailwind 4 translate-* classes animate the `translate`
//                property, so that handler never matches (measured on the automotive audit).
//     Re-entering while the wash is still leaving snaps it back first, so it always rises from below.
//   label: CSS group-hover scale 0.9 (300ms ease-out)
//   box:   1px white border, r6, px-4 py-2, label 14 / 1.5 medium
const BorderCta = forwardRef<BorderCtaHandle, { href: string; label: string }>(function BorderCta({ href, label }, ref) {
  const root = useRef<HTMLAnchorElement>(null)
  const [hovered, setHovered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const pending = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useImperativeHandle(ref, () => ({
    prepare() {
      if (reducedMotion()) return
      gsap.set(root.current, { autoAlpha: 0 })
    },
    play(delay = 0) {
      if (reducedMotion()) return null
      return gsap.to(root.current, {
        autoAlpha: 1,
        duration: 0.85,
        delay,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(root.current, { clearProps: 'opacity,visibility' })
        },
      })
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

  const enter = useCallback(() => {
    clear()
    setResetting(pending.current)
    pending.current = false
    setLeaving(false)
    setHovered(true)
  }, [])

  const leave = useCallback(() => {
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
    ? 'translateY(100%)'
    : hovered
      ? 'translateY(0)'
      : leaving
        ? 'translateY(-100%)'
        : 'translateY(100%)'

  return (
    <a
      ref={root}
      href={href}
      data-qa="cta-border"
      onPointerEnter={enter}
      onPointerLeave={leave}
      className="group/cta relative inline-flex h-max w-fit cursor-pointer items-center justify-center overflow-hidden rounded-md border border-white text-white"
    >
      <div
        aria-hidden
        data-qa="cta-border-wash"
        className="pointer-events-none absolute inset-0 z-0 size-full rounded-[inherit] bg-current opacity-30 ease-out motion-reduce:transition-none"
        style={{
          transform: washTransform,
          transitionProperty: resetting ? 'none' : 'transform',
          transitionDuration: resetting ? '0ms' : '300ms',
        }}
      />
      <div className="relative z-[1] inline-flex items-center justify-center px-4 py-2">
        <span
          data-qa="cta-border-label"
          className="relative z-[1] block origin-center transform-gpu self-center text-nowrap text-[14px] font-medium capitalize leading-[1.5] transition-transform duration-300 ease-out group-hover/cta:scale-90 motion-reduce:transition-none motion-reduce:group-hover/cta:scale-100"
        >
          {label}
        </span>
      </div>
    </a>
  )
})

export default BorderCta
