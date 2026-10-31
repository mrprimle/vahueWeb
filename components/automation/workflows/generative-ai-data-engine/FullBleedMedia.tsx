'use client'

import { createElement, useLayoutEffect, useRef } from 'react'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlatCta from './FlatCta'
import { fontsReady, prepareText, reduced, type Reveal } from './motion'

type Props = {
  /** Photo for the media layer. Without one the layer is a flat dark surface with the dot texture. */
  image?: string
  headline: string
  /** Hero renders the page H1; the prefooter an H2. */
  as?: 'h1' | 'h2'
  body?: string
  cta: { href: string; label: string }
  /** ClipScrollSection startPercentage: hero 0, prefooter 10 (clip starts at half of it). */
  startPercentage: number
  /** Outer padding wrapper: hero `pb-10! pt-24!`, prefooter `pt-16! pb-8`. */
  wrapperClassName: string
}

// FullBleedMediaSection inside a ClipScrollSection (scale.com), on Vahue dark.
// Scroll: trigger section "top bottom" -> "center center": clip inset(0.5*start% -> 0% round 1.5rem),
//         media layer scale 1.25 -> 1.
// Intro:  section "top center" (retroactive): headline lines in, body +0.2s; CTA "filledWhiteArrow"
//         0.85s with 0.5s delay.
export default function FullBleedMedia({ image, headline, as = 'h2', body, cta, startPercentage, wrapperClassName }: Props) {
  useRefreshOnPageGrow()
  const clipRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaWrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || reduced()) return
    const reveals: Reveal[] = []
    let alive = true
    const half = 0.5 * startPercentage
    const clipEl = clipRef.current

    const ctx = gsap.context(() => {
      const apply = (p: number) => {
        if (clipRef.current) clipRef.current.style.clipPath = `inset(${(half * (1 - p)).toFixed(4)}% round 1.5rem)`
        if (mediaRef.current) gsap.set(mediaRef.current, { scale: 1.25 - 0.25 * p })
      }
      apply(0)
      ScrollTrigger.create({ trigger: section, start: 'top bottom', end: 'center center', onUpdate: (st) => apply(st.progress), onRefresh: (st) => apply(st.progress) })

      // CTA "filledWhiteArrow" starting state
      const root = ctaWrapRef.current?.querySelector<HTMLElement>('[data-cta-root]')
      const counter = root?.querySelector<HTMLElement>('[data-cta-counter]')
      const text = root?.querySelector<HTMLElement>('[data-cta-text]')
      const arrow = root?.querySelector<HTMLElement>('[data-cta-arrow]')
      if (root && counter) {
        gsap.set(root, { autoAlpha: 0, borderRadius: 0, scaleX: 0, transformOrigin: 'left center' })
        gsap.set(counter, { scaleX: 0, transformOrigin: 'left center' })
        if (text) gsap.set(text, { opacity: 0 })
        if (arrow) gsap.set(arrow, { x: -6 })
      }
      gsap.set([headRef.current, bodyRef.current], { opacity: 0 })

      fontsReady().then(() => {
        if (!alive) return
        ctx.add(() => {
          const els = [headRef.current, bodyRef.current].filter(Boolean) as HTMLElement[]
          els.forEach((el) => {
            gsap.set(el, { opacity: 1 })
            reveals.push(prepareText(el))
          })
          ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            once: true,
            onEnter: () => {
              reveals.forEach((r, i) => r.play(0.2 * i))
              if (root && counter) {
                const d = 0.85
                const tl = gsap.timeline({ delay: 0.5 })
                tl.to(root, { autoAlpha: 1, borderRadius: 8, scaleX: 1, duration: d, ease: 'power3.out' }, 0)
                tl.to(counter, { scaleX: 1, duration: d, ease: 'power3.out' }, 0.1)
                if (text) tl.to(text, { opacity: 1 }, d - 0.1)
                if (arrow) tl.to(arrow, { x: 0, duration: d, ease: 'power3.inOut' }, 0)
                tl.add(() => gsap.set([root, counter, text, arrow].filter(Boolean), { clearProps: 'all' }))
              }
            },
          })
          ScrollTrigger.refresh()
        })
      })
    }, section)

    return () => {
      alive = false
      ctx.revert()
      reveals.forEach((r) => r.revert())
      if (clipEl) clipEl.style.clipPath = ''
    }
  }, [startPercentage])

  return (
    <div className={wrapperClassName}>
      <div className="relative isolate grid w-full grid-cols-12 gap-2 px-4">
        <div ref={clipRef} className="col-span-full h-full w-full overflow-hidden" style={{ clipPath: 'inset(0 round 1.5rem)' }}>
          <div className="h-full w-full">
            <section ref={sectionRef} className="overflow-hidden rounded-3xl bg-bg text-white [clip-path:inset(0_round_1.5rem)]">
              <div className="relative flex min-h-[480px] items-end overflow-hidden rounded-3xl p-8 [clip-path:inset(0_round_1.5rem)] md:min-h-[720px] md:p-16">
                <div className="relative z-20 flex w-full max-w-[72rem] flex-col gap-6">
                  {createElement(
                    as,
                    {
                      ref: headRef,
                      className:
                        'text-balance font-display text-[clamp(2rem,0.5rem+5vw,4rem)] font-normal leading-[1.05] tracking-[-0.01em] text-white',
                    },
                    headline,
                  )}
                  {body ? (
                    <p ref={bodyRef} className="w-full max-w-[48rem] text-balance text-[16px] leading-[1.45] tracking-[-0.01em] text-white/85 md:text-[20px] md:leading-[1.5]">
                      {body}
                    </p>
                  ) : null}
                  <div ref={ctaWrapRef} className="flex flex-col gap-4 md:flex-row">
                    <FlatCta href={cta.href}>{cta.label}</FlatCta>
                  </div>
                </div>
                <div className="absolute left-0 top-0 h-full w-full origin-center overflow-hidden rounded-3xl [clip-path:inset(0_round_1.5rem)]">
                  {/* Vignette fade to the page background (no coloured glow, per DESIGN.md hero rules). */}
                  <div className="pointer-events-none absolute inset-0 z-10 h-full w-full rounded-3xl bg-[linear-gradient(rgba(2,2,2,0)_0%,#020202_100%)]" />
                  <div ref={mediaRef} className="absolute inset-0 h-full w-full overflow-hidden rounded-3xl">
                    <div className="hero-texture relative h-full w-full overflow-hidden rounded-3xl border border-border-soft bg-surface">
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image} alt="" className="absolute inset-0 h-full w-full rounded-3xl object-cover" />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
