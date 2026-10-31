'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
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

type Props = { href: string; text: string; variant: 'arrow' | 'border' }

const Arrow = () => (
  <svg className="block shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M6.12994 12.7576C5.99604 12.8915 5.77896 12.8915 5.64506 12.7576L5.24244 12.3549C5.10854 12.221 5.10854 12.004 5.24244 11.8701L8.58217 8.53033C8.87506 8.23744 8.87506 7.76256 8.58217 7.46967L5.24244 4.12994C5.10854 3.99604 5.10854 3.77896 5.24244 3.64506L5.64506 3.24244C5.77896 3.10854 5.99604 3.10854 6.12994 3.24244L10.3572 7.46967C10.6501 7.76256 10.6501 8.23744 10.3572 8.53033L6.12994 12.7576Z"
      fill="currentColor"
    />
  </svg>
)

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

const FlatCta = forwardRef<FlatCtaHandle, Props>(function FlatCta({ href, text, variant }, ref) {
  const isArrow = variant === 'arrow'
  const root = useRef<HTMLAnchorElement>(null)
  const counter = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const arrow = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  // Wash states mirror Scale's: idle -> hover -> leaving (exits the far side) -> reset (snaps back, no transition).
  const [wash, setWash] = useState<'idle' | 'hover' | 'leaving' | 'reset'>('idle')
  const [arrowIn, setArrowIn] = useState(false)
  const [arrowSnap, setArrowSnap] = useState(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (wash !== 'reset' && !arrowSnap) return
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        if (wash === 'reset') setWash('idle')
        setArrowSnap(false)
      })
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [wash, arrowSnap])

  useEffect(() => () => void (leaveTimer.current && clearTimeout(leaveTimer.current)), [])

  const onEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setWash('hover')
    if (isArrow) {
      setArrowSnap(false)
      setArrowIn(true)
    }
  }, [isArrow])
  const onLeave = useCallback(() => {
    if (isArrow) {
      setArrowIn(false)
      setArrowSnap(true)
    }
    setWash('leaving')
    leaveTimer.current = setTimeout(() => setWash('reset'), 680)
  }, [isArrow])

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

  const washPos =
    wash === 'reset'
      ? isArrow ? '-translate-x-full' : 'translate-y-full'
      : wash === 'hover'
        ? 'translate-x-0 translate-y-0'
        : wash === 'leaving'
          ? isArrow ? 'translate-x-full' : '-translate-y-full'
          : isArrow ? '-translate-x-full' : 'translate-y-full'

  return (
    <a
      ref={root}
      href={href}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={`group/cta relative inline-flex h-max w-fit cursor-pointer items-center justify-center overflow-hidden rounded-md ${
        isArrow ? 'origin-center transform-gpu bg-white text-black will-change-transform' : 'border border-white text-white'
      }`}
      style={isArrow ? { borderRadius: 8 } : undefined}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-0 size-full rounded-[inherit] bg-current ease-out motion-reduce:transition-none ${
          isArrow ? 'opacity-35' : 'opacity-30'
        } ${washPos} ${wash === 'reset' ? 'transition-none' : 'transition-transform'}`}
        style={{ transitionDuration: isArrow ? '600ms' : '300ms' }}
      />
      <div className={`relative z-[1] inline-flex max-w-full flex-wrap items-center justify-center ${isArrow ? 'py-1 pl-4 pr-1' : 'px-4 py-2'}`}>
        <div
          ref={counter}
          className={`relative z-[1] flex w-full max-w-full flex-1 flex-wrap items-center justify-center transform-gpu will-change-transform ${isArrow ? 'gap-4' : ''}`}
          style={{ transformOrigin: '0% 50%' }}
        >
          <span
            ref={label}
            className={`block h-fit self-center text-nowrap text-[14px] font-medium leading-[1.5] ${
              isArrow ? '' : 'relative z-[1] inline-block origin-center transform-gpu transition-transform duration-300 ease-out group-hover/cta:scale-90 motion-reduce:transition-none'
            }`}
          >
            {text}
          </span>
          {isArrow && (
            <div ref={arrow} className="relative z-[1] box-border flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black p-2 text-white">
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
    </a>
  )
})

export default FlatCta
