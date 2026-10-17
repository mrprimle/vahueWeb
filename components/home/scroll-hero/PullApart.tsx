'use client'

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import RevealText, { type RevealHandle } from './RevealText'
import type { HeroStage } from './content'

type Props = {
  index: 0 | 1 | 2
  stage: HeroStage
  visible: boolean
  /** True when a different stage is currently on screen. */
  otherVisible: boolean
  isLast: boolean
}

// Column placement per stage: centred below 1450px; on the wide layout the
// intro sits centre-bottom, stage 2 on the left, stage 3 on the right.
const COLUMN_BASE =
  'col-span-8 md:max-[1449px]:col-span-6 md:max-[1449px]:col-start-2 md:max-[1449px]:justify-self-center flex min-w-0 flex-col gap-0 md:gap-6 min-[1450px]:gap-4'
const COLUMN = [
  `${COLUMN_BASE} min-[1450px]:col-start-5 min-[1450px]:col-span-4 max-md:py-10 md:py-12 min-[1450px]:py-24 items-center text-center`,
  `${COLUMN_BASE} min-[1450px]:col-start-2 min-[1450px]:col-span-3 md:max-[1449px]:py-0 min-[1450px]:py-12 items-start text-center min-[1450px]:text-left`,
  `${COLUMN_BASE} min-[1450px]:col-start-9 min-[1450px]:col-span-3 md:max-[1449px]:py-0 min-[1450px]:py-12 items-start text-center min-[1450px]:text-left`,
]

export default function PullApart({ index, stage, visible, otherVisible, isLast }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const category = useRef<RevealHandle>(null)
  const title = useRef<RevealHandle>(null)
  const body = useRef<RevealHandle>(null)
  const cta = useRef<HTMLAnchorElement>(null)
  const ctaIcon = useRef<HTMLSpanElement>(null)
  const logos = useRef<HTMLDivElement>(null)

  const everShown = useRef(false)
  const wasVisible = useRef(visible)
  const visibleRef = useRef(visible)
  const drifting = useRef(false) // exited and still following scroll
  const faded = useRef(false)
  const exitOffset = useRef({ v: 0 })
  const scrollOffset = useRef(0)
  const lastScroll = useRef<number | null>(null)
  const prevScroll = useRef<number | null>(null)
  const scrollingUp = useRef(false)
  const driftTween = useRef<gsap.core.Tween | null>(null)
  const driftStop = useRef<gsap.core.Tween | null>(null)
  const logoCall = useRef<gsap.core.Tween | null>(null)
  const run = useRef(0)
  const ctaTl = useRef<gsap.core.Timeline | null>(null)

  visibleRef.current = visible
  const el = (s: string) => [...(root.current?.querySelectorAll<HTMLElement>(s) ?? [])]
  const applyY = useCallback(() => {
    if (root.current) gsap.set(root.current, { y: exitOffset.current.v + scrollOffset.current })
  }, [])

  // While exited, the block keeps drifting up at a quarter of the scroll speed.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (prevScroll.current !== null) scrollingUp.current = y < prevScroll.current
      prevScroll.current = y
      if (visibleRef.current) {
        lastScroll.current = y
        return
      }
      if (!drifting.current) return
      if (lastScroll.current !== null) scrollOffset.current -= (y - lastScroll.current) * 0.25
      lastScroll.current = y
      applyY()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [applyY])

  const ctaSet = () => {
    if (cta.current) gsap.set(cta.current, { autoAlpha: 0, y: 0, scaleX: 0.4, scaleY: 1.15 })
    if (ctaIcon.current) gsap.set(ctaIcon.current, { x: -6 })
  }

  const enter = useCallback(() => {
    const n = ++run.current
    const k = (matchMedia('(max-width: 767px)').matches ? 1.4 : 1) * (isLast && scrollingUp.current ? 1.35 : 1)
    category.current?.animateIn({ duration: 0.8 / k, delay: 0.1 / k })
    title.current?.animateIn({ duration: 0.8 / k, delay: 0.3 / k })

    const ctaDelay = 1.3 / k
    if (cta.current) {
      const dur = 0.85 / k
      ctaTl.current?.kill()
      gsap.killTweensOf([cta.current, ctaIcon.current])
      ctaSet()
      ctaTl.current = gsap.timeline({ delay: ctaDelay })
        .set(cta.current, { autoAlpha: 1 })
        .to(cta.current, { scaleX: 1, duration: dur * 0.53, ease: 'power3.out' }, 0)
        .to(cta.current, { scaleY: 1, duration: dur, ease: 'power2.out' }, 0)
        .to(ctaIcon.current, { x: 0, duration: dur, ease: 'power3.out' }, 0)
    }

    const bodyDelay = 0.5 / k
    const bodyDur = 1.8 / k
    body.current?.animateIn({ duration: bodyDur, delay: bodyDelay })

    const logoEls = el('.pull-apart-logo')
    gsap.killTweensOf(logoEls)
    logoCall.current?.kill()
    logoCall.current = gsap.delayedCall(bodyDelay + bodyDur, () => {
      if (!visibleRef.current || n !== run.current) return
      gsap.fromTo(
        el('.pull-apart-logo'),
        { autoAlpha: 0, scale: 1.15, y: 0 },
        { autoAlpha: 1, scale: 1, duration: 0.65 / k, stagger: 0.08 / k, ease: 'power2.out', overwrite: 'auto' },
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLast])

  const exit = useCallback(() => {
    run.current++
    driftTween.current?.kill()
    exitOffset.current.v = 0
    scrollOffset.current = 0
    lastScroll.current = null
    driftTween.current = gsap.to(exitOffset.current, { v: 25, duration: 0.9, ease: 'power2.out', onUpdate: applyY })
    const simple = index === 0
    category.current?.animateOut()
    title.current?.animateOut({ delay: 0.1, simple })
    body.current?.animateOut({ delay: 0.2, simple })
    ctaTl.current?.kill()
    if (cta.current) gsap.to(cta.current, { autoAlpha: 0, y: -6, duration: 0.3, delay: 0.3, ease: 'power2.in', overwrite: 'auto' })
    logoCall.current?.kill()
    const logoEls = el('.pull-apart-logo')
    if (logoEls.length)
      gsap.to(logoEls, {
        autoAlpha: 0,
        y: -6,
        duration: 0.22,
        delay: 0.4,
        stagger: { each: 0.04, from: 'end' },
        ease: 'power2.out',
        overwrite: 'auto',
      })
  }, [applyY, index])

  // Initial state
  useEffect(() => {
    ctaSet()
    const logoEls = el('.pull-apart-logo')
    if (logoEls.length) gsap.set(logoEls, { autoAlpha: 0, scale: 1.15, y: 0 })
    return () => {
      driftTween.current?.kill()
      driftStop.current?.kill()
      logoCall.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const was = wasVisible.current
    wasVisible.current = visible
    const node = root.current
    if (!node) return
    if (!visible) {
      if (was) {
        drifting.current = true
        faded.current = false
        driftStop.current?.kill()
        driftStop.current = gsap.delayedCall(2, () => (drifting.current = false))
        exit()
      }
      return
    }
    everShown.current = true
    driftStop.current?.kill()
    drifting.current = false
    faded.current = false
    driftTween.current?.kill()
    exitOffset.current.v = 0
    scrollOffset.current = 0
    lastScroll.current = null
    gsap.killTweensOf(node)
    gsap.set(node, { y: 0, autoAlpha: 1 })
    let cancelled = false
    requestAnimationFrame(() => requestAnimationFrame(() => !cancelled && enter()))
    return () => {
      cancelled = true
    }
  }, [visible, enter, exit])

  // An exited block fades away entirely once another stage takes over.
  useEffect(() => {
    if (visible || !otherVisible || faded.current || !drifting.current || !root.current) return
    faded.current = true
    gsap.to(root.current, { autoAlpha: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
  }, [otherVisible, visible])

  const centred = index === 0
  const align = centred ? undefined : 'w-full text-center min-[1450px]:text-left'

  return (
    <div
      ref={root}
      aria-hidden={!visible}
      style={{ zIndex: 10 + index }}
      className={[
        'absolute left-0 top-0 grid h-dvh w-full grid-cols-8 gap-2 px-6 pb-0 [perspective:1000px] max-md:[perspective:800px]',
        'min-[1450px]:grid-cols-[repeat(12,minmax(0,150px))] min-[1450px]:justify-center',
        'max-md:items-start max-md:pt-[45dvh] md:max-[1449px]:items-start md:max-[1449px]:pt-[50dvh]',
        centred ? 'min-[1450px]:items-end' : 'min-[1450px]:items-center',
        visible ? 'pointer-events-auto' : 'pointer-events-none',
        !visible && !everShown.current ? 'invisible opacity-0' : '',
      ].join(' ')}
    >
      <div className={COLUMN[index]}>
        {stage.category && (
          <RevealText
            ref={category}
            as="h2"
            text={stage.category}
            className={`pull-apart-category whitespace-nowrap pb-0 font-mono text-[10px] uppercase text-[#929292] max-md:mb-6 md:mb-0 md:text-[11px] min-[1450px]:pb-6 ${align ?? ''}`}
          />
        )}
        <div className="flex w-full min-w-0 flex-col gap-[15px] max-md:mb-6 md:mb-0">
          <RevealText
            ref={title}
            as="h3"
            text={stage.title}
            className={`text-balance font-display text-[1.5rem] font-normal leading-[1.1875] -tracking-[0.03em] text-white md:text-[17px] xl:text-[2rem] ${align ?? ''}`}
          />
          <RevealText
            ref={body}
            as="p"
            variant="body"
            text={stage.body}
            className={`text-balance text-[14px] leading-[1.43] text-[#c7c7c7] ${align ?? ''}`}
          />
        </div>
        {(stage.cta || stage.logos?.length) && (
          <div className={`flex w-full min-w-0 flex-col gap-10 md:gap-[50px] ${centred ? 'items-center' : 'items-start'}`}>
            {stage.cta && (
              <div className="mx-auto w-fit max-w-full pt-0 min-[1450px]:mx-0 min-[1450px]:pt-6">
                <Link
                  ref={cta}
                  href={stage.cta.href}
                  {...(stage.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group relative isolate inline-flex h-11 min-h-11 origin-center items-center gap-1.5 overflow-hidden rounded-md bg-white py-1.5 pl-4 pr-1 text-sm font-medium text-bg will-change-transform"
                >
                  {stage.cta.label}
                  <span ref={ctaIcon} className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md py-2 pl-2 pr-0">
                    <svg className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}
            {stage.logos?.length ? (
              <div
                ref={logos}
                className={`relative flex max-h-12 flex-wrap items-center justify-start gap-x-6 gap-y-2 self-center pb-12 pt-0 text-[#929292] min-[1450px]:self-start min-[1450px]:pb-0 ${stage.cta ? '' : 'min-[1450px]:pt-12'}`}
              >
                {stage.logos.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt=""
                    aria-hidden="true"
                    className="pull-apart-logo h-auto max-h-[30px] w-auto max-w-[68px] opacity-0 brightness-0 invert"
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
