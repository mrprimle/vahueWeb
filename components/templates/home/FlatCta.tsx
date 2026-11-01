'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, type MouseEvent, type TransitionEvent } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { prefersReducedMotion } from './scroll'

/*
 * scale.com FlatCta + AnimatedFlatCta (1h0nvyhf5gbrf.js module 892855, 37xz28pjbnlx4.js module 961870; hashes 10b2627a… and
 * b234eef5…, the audited copies). Same state machine as the sibling ports: wash moves on the CSS `translate` property
 * (so the `transform` transitionend never fires and the reset is the 680ms timeout), re-entry snaps it back first,
 * arrow strip -50% -> 0 over 600ms and snaps back on leave. Evergreen has no wash: a black multiply layer, opacity 0 -> .18.
 * Internal links keep Scale's 1px #86bff2 focus outline.
 *
 * Intros: filledEvergreenArrow  root autoAlpha 0, scaleX .4, scaleY 1.15, transparent with an inset white 1px ring, label +6,
 *           arrow -6, counter-scaled; scaleY 1 over the whole duration power2.inOut; autoAlpha / scaleX 1 over T/2 power2.out;
 *           label / arrow x 0 over T/2 power3.inOut at T/2; fill #193A29 and ring out over T/2 power3.inOut at T/2.
 *         filledWhiteArrow  root autoAlpha 0, radius 0, scaleX 0 (left); -> 1, radius 8, T power3.out; counter at +.1;
 *           label opacity at T - .1; arrow x -6 -> 0 power3.inOut.
 */

export type FlatCtaHandle = {
  set: () => void
  animateIn: (o?: { duration?: number; delay?: number }) => Promise<void>
  animateOut: (o?: { duration?: number; delay?: number }) => Promise<void>
}

type Props = {
  href?: string
  text: string
  variant?: 'fill' | 'arrow' | 'arrowOutline'
  theme?: 'black' | 'white' | 'evergreen' | 'gray'
  intro?: 'filledEvergreenArrow' | 'filledWhiteArrow'
  iconOnly?: boolean
  direction?: 'left' | 'right'
  as?: 'link' | 'button'
  onClick?: (e: MouseEvent<HTMLElement>) => void
  /** Scale's `g` props on the hero CTA: h-11, py-1.5, gap-1.5, arrow box h-8 w-8 */
  tall?: boolean
  className?: string
}

const Chevron = ({ left }: { left?: boolean }) => (
  <svg className="block shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={left ? { transform: 'rotate(180deg)' } : undefined}>
    <path
      d="M6.12994 12.7576C5.99604 12.8915 5.77896 12.8915 5.64506 12.7576L5.24244 12.3549C5.10854 12.221 5.10854 12.004 5.24244 11.8701L8.58217 8.53033C8.87506 8.23744 8.87506 7.76256 8.58217 7.46967L5.24244 4.12994C5.10854 3.99604 5.10854 3.77896 5.24244 3.64506L5.64506 3.24244C5.77896 3.10854 5.99604 3.10854 6.12994 3.24244L10.3572 7.46967C10.6501 7.76256 10.6501 8.23744 10.3572 8.53033L6.12994 12.7576Z"
      fill="currentColor"
    />
  </svg>
)

const FlatCta = forwardRef<FlatCtaHandle, Props>(function FlatCta({ href = '#', text, variant = 'fill', theme = 'black', intro, iconOnly, direction = 'right', as = 'link', onClick, tall, className = '' }, ref) {
  const isArrow = variant === 'arrow' || variant === 'arrowOutline'
  const outline = variant === 'arrowOutline'
  const green = theme === 'evergreen'
  const washed = !green
  const multiply = green && !outline
  const root = useRef<HTMLElement | null>(null)
  const counter = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const arrow = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  const [hovered, setHovered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [arrowIn, setArrowIn] = useState(false)
  const [arrowSnap, setArrowSnap] = useState(false)
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
    if (!resetting && !arrowSnap) return
    let b = 0
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => {
        setResetting(false)
        setArrowSnap(false)
      })
    })
    return () => {
      cancelAnimationFrame(a)
      cancelAnimationFrame(b)
    }
  }, [resetting, arrowSnap])

  const enter = useCallback(() => {
    if (isArrow) {
      setArrowSnap(false)
      setArrowIn(true)
    }
    if (!washed) return
    clear()
    setResetting(pending.current)
    pending.current = false
    setLeaving(false)
    setHovered(true)
  }, [isArrow, washed])

  const leave = useCallback(() => {
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
    timer.current = setTimeout(() => {
      timer.current = null
      finishLeave()
    }, 680)
  }, [isArrow, washed, resetting, finishLeave])

  const onWashEnd = (e: TransitionEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName === 'transform' || e.propertyName === '-webkit-transform') finishLeave()
  }

  useImperativeHandle(ref, () => {
    const set = () => {
      const r = root.current
      if (!r || prefersReducedMotion()) return
      tl.current?.kill()
      gsap.killTweensOf(r)
      gsap.set(r, { y: 0 })
      if (intro === 'filledEvergreenArrow') {
        gsap.set(r, { autoAlpha: 0, backgroundColor: 'transparent', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,1)', color: '#fff', scaleX: 0.4, scaleY: 1.15, transformOrigin: '50% 50%' })
        gsap.set(counter.current, { scaleX: 2.5, scaleY: 1 / 1.15, transformOrigin: '50% 50%' })
        gsap.set(label.current, { x: 6 })
        gsap.set(arrow.current, { x: -6, backgroundColor: 'transparent', color: '#fff' })
      } else if (intro === 'filledWhiteArrow') {
        gsap.set(r, { autoAlpha: 0, borderRadius: 0, scaleX: 0, transformOrigin: 'left center' })
        gsap.set(counter.current, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(label.current, { opacity: 0 })
        gsap.set(arrow.current, { x: -6 })
      } else gsap.set(r, { autoAlpha: 0 })
    }
    const animateIn = ({ duration = 0.65, delay = 0 } = {}) =>
      new Promise<void>((resolve) => {
        const r = root.current
        if (!r || prefersReducedMotion()) return resolve()
        set()
        gsap.set(r, { visibility: 'visible' })
        const t = gsap.timeline({ delay, onComplete: () => resolve() })
        tl.current = t
        if (intro === 'filledEvergreenArrow') {
          const p = 0.5 * duration
          const h = (duration - p) * 0.55
          t.to(r, { scaleY: 1, duration, ease: 'power2.inOut' }, 0)
          t.to(counter.current, { scaleY: 1, duration, ease: 'none', modifiers: { scaleY: () => {
            const v = parseFloat(String(gsap.getProperty(r, 'scaleY')))
            return Number.isFinite(v) && v !== 0 ? 1 / v : 1
          } } }, 0)
          t.to(r, { autoAlpha: 1, scaleX: 1, duration: p, ease: 'power2.out' }, 0)
          t.to(counter.current, { scaleX: 1, duration: p, ease: 'power2.out' }, 0)
          t.to(r, { scaleX: 1, duration: h, ease: 'power3.out' }, p)
          t.to(counter.current, { scaleX: 1, duration: h, ease: 'power3.out' }, p)
          t.to([label.current, arrow.current], { x: 0, duration: p, ease: 'power3.inOut' }, p)
          t.to(r, { backgroundColor: '#193A29', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0)', color: '#fff', duration: p, ease: 'power3.inOut' }, p)
          t.to(arrow.current, { color: '#fff', duration: p, ease: 'power3.inOut' }, p)
          t.add(() => {
            gsap.set(counter.current, { clearProps: 'transform' })
            gsap.set(label.current, { clearProps: 'x' })
            gsap.set(arrow.current, { clearProps: 'x,backgroundColor,color' })
            gsap.set(r, { clearProps: 'backgroundColor,boxShadow,color,opacity,visibility,transform,transformOrigin' })
          })
        } else if (intro === 'filledWhiteArrow') {
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
    const animateOut = ({ duration = 0.3, delay = 0 } = {}) =>
      new Promise<void>((resolve) => {
        const r = root.current
        tl.current?.kill()
        if (!r) return resolve()
        gsap.killTweensOf(r)
        gsap.to(r, { autoAlpha: 0, y: -6, duration, delay, ease: 'power3.in', overwrite: 'auto', onComplete: () => resolve() })
      })
    return { set, animateIn, animateOut }
  })

  const start = isArrow ? '-100% 0' : '0 100%'
  const washTranslate = resetting ? start : hovered ? '0 0' : leaving ? (isArrow ? '100% 0' : '0 -100%') : start
  const washOpacity = (outline && theme === 'white') || (!isArrow && theme === 'black') ? 'opacity-30' : 'opacity-35'
  const colours = outline
    ? theme === 'white'
      ? 'border border-white text-white'
      : 'border border-black text-black'
    : { black: 'bg-black text-white', white: 'bg-white text-black', evergreen: 'bg-[#193A29] text-white', gray: 'bg-[#EAEAEA] text-black' }[theme]
  const boxColours = outline ? '' : green ? '' : theme === 'white' ? 'bg-black text-white' : 'bg-white text-black'

  const cls = `group/cta relative inline-flex w-fit cursor-pointer items-center justify-center overflow-hidden ${tall ? '!h-11 !max-h-11 !min-h-11' : 'h-max'} ${as === 'link' ? 'focus:outline focus:outline-1 focus:outline-[#86bff2]' : ''} ${multiply ? 'isolate' : ''} ${isArrow ? 'origin-center transform-gpu will-change-transform' : ''} ${colours} rounded-md ${className}`
  const style = isArrow && !outline ? { borderRadius: 8 } : undefined
  const content = (
    <>
      {washed ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-0 size-full rounded-[inherit] bg-current ease-out motion-reduce:transition-none ${washOpacity}`}
          onTransitionEnd={onWashEnd}
          style={{ translate: washTranslate, transitionProperty: resetting ? 'none' : 'translate', transitionDuration: isArrow ? '600ms' : '300ms' }}
        />
      ) : null}
      {multiply ? <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] bg-black opacity-0 mix-blend-multiply transition-opacity duration-300 ease-out group-hover/cta:opacity-[0.18] motion-reduce:transition-none" /> : null}
      <div className={`relative ${multiply ? 'z-[2]' : 'z-[1]'} inline-flex max-w-full items-center justify-center ${iconOnly ? '' : isArrow ? (tall ? 'py-1.5 pl-4 pr-1' : 'py-1 pl-4 pr-1') : 'px-4 py-2'}`}>
        <div ref={counter} className={`relative z-[1] flex w-full max-w-full flex-1 items-center ${tall ? 'justify-start gap-1.5' : `justify-center ${isArrow && !iconOnly && !green ? 'gap-4' : ''}`} transform-gpu will-change-transform`} style={{ transformOrigin: '0% 50%' }}>
          <span ref={label} className={iconOnly ? 'hidden' : `block h-fit self-center text-nowrap text-[14px] font-medium capitalize leading-[1.5] ${isArrow ? '' : 'relative z-[1] inline-block origin-center transform-gpu transition-transform duration-300 ease-out group-hover/cta:scale-90 motion-reduce:transition-none'}`}>
            {text}
          </span>
          {isArrow ? (
            <div ref={arrow} className={`relative z-[1] box-border flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md ${boxColours}`}>
              <div
                aria-hidden
                className={`absolute inset-0 flex h-full w-[200%] transform-gpu ease-out will-change-transform motion-reduce:!translate-x-0 motion-reduce:!transition-none ${arrowIn && !arrowSnap ? 'translate-x-0' : '-translate-x-1/2'} ${arrowSnap ? '!transition-none' : 'transition-transform'}`}
                style={{ transitionDuration: '600ms' }}
              >
                <span className="flex h-full w-1/2 shrink-0 items-center justify-center"><Chevron left={direction === 'left'} /></span>
                <span className="flex h-full w-1/2 shrink-0 items-center justify-center"><Chevron left={direction === 'left'} /></span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
  if (as === 'button')
    return (
      <button ref={(el) => { root.current = el }} type="button" aria-label={text} onClick={onClick} onPointerEnter={enter} onPointerLeave={leave} className={cls} style={style}>
        {content}
      </button>
    )
  return (
    <Link ref={(el) => { root.current = el }} href={href} onClick={onClick} onPointerEnter={enter} onPointerLeave={leave} className={cls} style={style}>
      {content}
    </Link>
  )
})

export default FlatCta
