'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Media from './Media'
import SplitText from './SplitText'
import { heroMedia, heroStages, heroStatement } from './content'

gsap.registerPlugin(ScrollTrigger)

// Lavender-to-white settle on entering headlines (DESIGN.md: white→lavender only in hero).
const ACCENT = '#b8b8ff'
const STAGE_COUNT = heroStages.length
// Pin progress at which stage i becomes active: first at 10%, last at 80%.
const thresholds = heroStages.map((_, i) =>
  STAGE_COUNT === 1 ? 0.1 : 0.1 + (i * 0.7) / (STAGE_COUNT - 1),
)
// Per-stage pose added on top of the base tilt of the pane stack.
const POSES = [
  { rotationX: 0, rotationY: 0 },
  { rotationX: -4, rotationY: 30 },
  { rotationX: 4, rotationY: 6 },
  { rotationX: -2, rotationY: 26 },
]
const GHOSTS = [1, 2, 3]

// gsap.set without the "target not found" warning while lines are re-measuring.
const setIf = (targets: (HTMLElement | null)[], vars: gsap.TweenVars) => {
  const list = targets.filter(Boolean)
  if (list.length) gsap.set(list, vars)
}

const frameInsets = () => {
  const w = innerWidth
  if (w < 768) return { top: 72, side: 16, bottom: 16 }
  if (w < 1920) return { top: 75, side: 18, bottom: 18 }
  return { top: 88, side: 24, bottom: 24 }
}

const paneTarget = () => {
  const w = innerWidth
  const h = innerHeight
  const mobile = w < 768
  const width = mobile ? Math.min(w * 0.62, 320) : Math.min(Math.max(w * 0.27, 300), 520)
  const height = width * 0.62
  const centerY = h * (mobile ? 0.27 : 0.29)
  return { left: (w - width) / 2, top: centerY - height / 2, width, height }
}

export default function ScrollHero() {
  const root = useRef<HTMLElement>(null)
  const parallax = useRef<HTMLDivElement>(null)
  const pane = useRef<HTMLDivElement>(null)
  const tilt = useRef<HTMLDivElement>(null)
  const pose = useRef<HTMLDivElement>(null)
  const statement = useRef<HTMLDivElement>(null)
  const indicator = useRef<HTMLDivElement>(null)
  const active = useRef(-1)
  const opening = useRef(true)
  const reduced = useRef(false)
  const stageTimelines = useRef(new Map<number, gsap.core.Timeline>())

  const stageEl = (i: number) =>
    root.current?.querySelector<HTMLElement>(`[data-stage="${i}"]`) ?? null

  const parts = (el: HTMLElement) => ({
    headLines: [...el.querySelectorAll<HTMLElement>('[data-part="category"] [data-line], [data-part="title"] [data-line]')],
    headWords: [...el.querySelectorAll<HTMLElement>('[data-part="category"] [data-word], [data-part="title"] [data-word]')],
    bodyLines: [...el.querySelectorAll<HTMLElement>('[data-part="body"] [data-line]')],
    bodyWords: [...el.querySelectorAll<HTMLElement>('[data-part="body"] [data-word]')],
    cta: el.querySelector<HTMLElement>('[data-cta]'),
  })

  // Resting state for a stage that is not active: hidden, lines parked below.
  const parkStage = useCallback((i: number) => {
    const el = stageEl(i)
    if (!el) return
    const p = parts(el)
    gsap.set(el, { autoAlpha: 0, y: 0, pointerEvents: 'none' })
    setIf(p.headLines, { yPercent: 400, autoAlpha: 0 })
    setIf(p.headWords, { xPercent: 30 })
    setIf(p.bodyLines, { yPercent: 50, autoAlpha: 1 })
    setIf(p.bodyWords, { autoAlpha: 0 })
    setIf([p.cta], { autoAlpha: 0, scaleX: 0.4, scaleY: 1.15 })
  }, [])

  const showStage = useCallback((i: number) => {
    const el = stageEl(i)
    if (!el) return
    const p = parts(el)
    gsap.set(el, { autoAlpha: 1, y: 0, pointerEvents: 'auto' })
    setIf([...p.headLines, ...p.bodyLines], { yPercent: 0, autoAlpha: 1 })
    setIf([...p.headWords, ...p.bodyWords], { xPercent: 0, autoAlpha: 1 })
    setIf([p.cta], { autoAlpha: 1, scaleX: 1, scaleY: 1 })
  }, [])

  const enterStage = (i: number) => {
    const el = stageEl(i)
    if (!el) return
    stageTimelines.current.get(i)?.kill()
    parkStage(i)
    const p = parts(el)
    gsap.set(el, { autoAlpha: 1, pointerEvents: 'auto' })
    if (reduced.current) {
      showStage(i)
      return
    }
    // Timings sampled from the reference: 150ms delay, ~1s expo settle,
    // body words fade in one by one, CTA springs open last.
    const tl = gsap.timeline({ delay: 0.15 })
    tl.to(p.headLines, { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.06 }, 0)
      .to(p.headWords, { xPercent: 0, duration: 1, ease: 'expo.out' }, 0)
      .from(p.headLines, { color: ACCENT, duration: 1.1, ease: 'power1.inOut', clearProps: 'color' }, 0)
      .to(p.bodyLines, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, 0.6)
      .to(p.bodyWords, { autoAlpha: 1, duration: 0.3, ease: 'none', stagger: 0.022 }, 0.65)
    if (p.cta) {
      tl.to(p.cta, { autoAlpha: 1, scaleX: 1, duration: 0.45, ease: 'power3.out' }, 1.2)
        .to(p.cta, { scaleY: 1, duration: 0.8, ease: 'power2.out' }, 1.2)
    }
    stageTimelines.current.set(i, tl)
  }

  const exitStage = (i: number) => {
    const el = stageEl(i)
    if (!el) return
    stageTimelines.current.get(i)?.kill()
    if (reduced.current) {
      parkStage(i)
      return
    }
    const p = parts(el)
    gsap.set(el, { pointerEvents: 'none' })
    const tl = gsap.timeline({ onComplete: () => parkStage(i) })
    tl.to(el, { y: 25, duration: 0.9, ease: 'power3.out' }, 0)
      .to([...p.headLines, ...p.bodyLines, ...(p.cta ? [p.cta] : [])], {
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power2.in',
      }, 0)
    stageTimelines.current.set(i, tl)
  }

  // Statement and scroll cue only live on the untouched opening frame.
  const setOpening = (next: boolean) => {
    if (next === opening.current) return
    opening.current = next
    gsap.to([statement.current, indicator.current], {
      autoAlpha: next ? 1 : 0,
      y: next ? 0 : -16,
      duration: next ? 0.6 : 0.4,
      ease: next ? 'power3.out' : 'power2.in',
      overwrite: true,
    })
  }

  const setActive = (next: number) => {
    const prev = active.current
    if (next === prev) return
    active.current = next
    if (prev >= 0) exitStage(prev)
    if (next >= 0) enterStage(next)

    // Media crossfade inside the pane, plus a new pose for the stack.
    const layers = pane.current?.querySelectorAll<HTMLElement>('[data-media]') ?? []
    layers.forEach((layer, k) => {
      gsap.to(layer, { autoAlpha: k === next + 1 ? 1 : 0, duration: 0.6, ease: 'power2.out', overwrite: true })
    })
    if (!reduced.current && pose.current) {
      const target = next < 0 ? POSES[0] : POSES[(next + 1) % POSES.length]
      // Narrow screens get a gentler pose so the stack stays clear of the nav.
      const k = innerWidth < 768 ? 0.5 : 1
      gsap.to(pose.current, {
        rotationX: target.rotationX * k,
        rotationY: target.rotationY * k,
        duration: 1.4,
        ease: 'power3.inOut',
        overwrite: true,
      })
    }
  }

  useEffect(() => {
    const section = root.current
    if (!section || !pane.current || !tilt.current) return
    reduced.current = matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      heroStages.forEach((_, i) => parkStage(i))
      gsap.from([statement.current, indicator.current], { autoAlpha: 0, y: 24, duration: 1, ease: 'power3.out', delay: 0.1 })

      // 1. Scrubbed intro: the full-bleed frame shrinks into a tilted pane stack.
      const intro = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            let idx = -1
            thresholds.forEach((t, i) => {
              if (self.progress >= t) idx = i
            })
            setOpening(self.progress < 0.015)
            setActive(idx)
          },
        },
      })
      intro
        .fromTo(
          pane.current,
          {
            left: () => frameInsets().side,
            top: () => frameInsets().top,
            width: () => innerWidth - frameInsets().side * 2,
            height: () => innerHeight - frameInsets().top - frameInsets().bottom,
            borderRadius: 16,
          },
          {
            left: () => paneTarget().left,
            top: () => paneTarget().top,
            width: () => paneTarget().width,
            height: () => paneTarget().height,
            borderRadius: 10,
            ease: 'power2.inOut',
            duration: 0.07,
          },
          0.005,
        )
        .to('[data-hero-dim]', { autoAlpha: 0, duration: 0.04 }, 0.005)
      if (!reduced.current) {
        intro
          .fromTo(tilt.current, { rotationX: 0, rotationY: 0 }, { rotationX: 12, rotationY: -22, ease: 'power2.inOut', duration: 0.05 }, 0.045)
          .fromTo('[data-ghost]', { autoAlpha: 0, z: 0, x: 0, y: 0 }, {
            autoAlpha: 1,
            z: (k) => -70 * (k + 1),
            x: (k) => 18 * (k + 1),
            y: (k) => -6 * (k + 1),
            ease: 'power2.out',
            duration: 0.05,
            stagger: 0.008,
          }, 0.055)
      }
      intro.to({}, { duration: 1 - intro.duration() })

      // 2. Parallax out while the next section scrolls over the pinned panel.
      if (!reduced.current && parallax.current) {
        gsap.to(parallax.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'bottom bottom', end: 'bottom top', scrub: true },
        })
        gsap.to('[data-float]', { y: -8, rotationY: 4, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, section)

    return () => {
      ctx.revert()
      stageTimelines.current.forEach((tl) => tl.kill())
      stageTimelines.current.clear()
      active.current = -1
      opening.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // After a re-split (resize, font swap) restore the current stage's state.
  const resync = useCallback(
    (i: number) => {
      stageTimelines.current.get(i)?.progress(1)
      if (active.current === i) showStage(i)
      else parkStage(i)
    },
    [parkStage, showStage],
  )

  const heightVars = {
    '--hero-h-desktop': `${(1.5 + STAGE_COUNT) * 100}dvh`,
    '--hero-h-mobile': `${(0.85 + 0.46 * STAGE_COUNT) * 100}dvh`,
  } as React.CSSProperties

  return (
    <section
      ref={root}
      aria-label="Vahue introduction"
      style={heightVars}
      className="relative -mt-[var(--header-height)] w-full bg-bg h-[var(--hero-h-mobile)] md:h-[var(--hero-h-desktop)]"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <div ref={parallax} className="absolute inset-0 h-dvh w-full">
          {/* Pane stack: starts as the full-bleed frame, becomes a tilted 3D pane */}
          <div className="absolute inset-0 [perspective:1400px]">
            <div
              ref={pane}
              className="absolute left-[18px] top-[75px] h-[calc(100dvh-93px)] w-[calc(100%-36px)] rounded-2xl [transform-style:preserve-3d]"
            >
              <div data-float="" className="absolute inset-0 [transform-style:preserve-3d]">
                <div ref={tilt} className="absolute inset-0 [transform-style:preserve-3d]">
                  <div ref={pose} className="absolute inset-0 [transform-style:preserve-3d]">
                    {GHOSTS.map((g) => (
                      <div
                        key={g}
                        data-ghost=""
                        aria-hidden="true"
                        className="invisible absolute inset-0 rounded-[inherit] border border-white/25 opacity-0"
                        style={{ borderRadius: 'inherit' }}
                      />
                    ))}
                    <div className="absolute inset-0 overflow-hidden rounded-[inherit] bg-black ring-1 ring-white/15" style={{ borderRadius: 'inherit' }}>
                      {[heroMedia, ...heroStages.map((s) => s.media)].map((src, k) => (
                        <div
                          key={src + k}
                          data-media=""
                          className="absolute inset-0"
                          style={{ opacity: k === 0 ? 1 : 0, visibility: k === 0 ? 'inherit' : 'hidden' }}
                        >
                          <Media src={src} />
                        </div>
                      ))}
                      {/* Light scrim so the statement reads over the opening media */}
                      <div data-hero-dim="" aria-hidden="true" className="absolute inset-0 bg-black/35" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Opening statement over the full-bleed frame */}
          <div
            ref={statement}
            className="absolute inset-0 z-10 flex flex-col items-center px-8 pt-[45dvh] md:justify-center md:pt-0 lg:px-16"
          >
            <h1 className="mx-auto max-w-2xl text-balance text-center font-display text-[2.7rem] font-light leading-none -tracking-[0.01em] text-white md:leading-tight lg:text-6xl xl:max-w-4xl xl:text-7xl xl:leading-[80px]">
              <span className="text-[#BBDEF2]">{heroStatement.lead}</span> {heroStatement.middle}{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {heroStatement.emphasis}
              </span>{' '}
              {heroStatement.tail}
            </h1>
          </div>

          {/* Stages: one block of copy per scroll step */}
          {heroStages.map((stage, i) => (
            <div
              key={stage.title}
              data-stage={i}
              className="invisible absolute inset-0 z-10 flex flex-col items-center px-6 pt-[45dvh] opacity-0 md:pt-[50dvh]"
            >
              <div className="flex w-full max-w-xl flex-col items-center gap-4 text-center md:gap-6">
                {stage.category && (
                  <SplitText
                    as="p"
                    part="category"
                    text={stage.category}
                    onSplit={() => resync(i)}
                    className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 md:text-[11px]"
                  />
                )}
                <div className="flex w-full flex-col gap-[15px]">
                  <SplitText
                    as="h2"
                    part="title"
                    text={stage.title}
                    onSplit={() => resync(i)}
                    className="text-balance font-display text-[1.75rem] font-light leading-[1.1875] text-white md:text-[2rem]"
                  />
                  <SplitText
                    as="p"
                    part="body"
                    text={stage.body}
                    onSplit={() => resync(i)}
                    className="text-balance text-[14px] leading-[1.43] text-white/55"
                  />
                </div>
                {stage.cta && (
                  <Link
                    data-cta=""
                    href={stage.cta.href}
                    {...(stage.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group inline-flex h-11 origin-center items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-bg transition-colors hover:bg-white/90"
                  >
                    {stage.cta.label}
                    <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}

          {/* Scroll cue */}
          <div
            ref={indicator}
            className="absolute bottom-10 right-10 z-10 md:bottom-[54px] md:right-[54px] 2xl:bottom-[72px] 2xl:right-[72px]"
          >
            <div className="flex items-center gap-4 text-white">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] max-md:hidden">Scroll to explore</span>
              <span className="flex aspect-square items-center justify-center rounded-sm border border-white p-2">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-6-6m6 6l6-6" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
