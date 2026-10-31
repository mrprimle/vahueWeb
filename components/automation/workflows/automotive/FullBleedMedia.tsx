'use client'

import { useEffect, useRef } from 'react'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlatCta from './FlatCta'
import { createAnimatedText, prefersReducedMotion } from './animatedText'
import s from './styles.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com FullBleedMediaSection inside a ClipScrollSection (automotive clone), on Vahue dark.
 *
 * Clip-scrubbed (ClipScrollSection), trigger = wrapper, start "top bottom" -> end "center center":
 *   clip container  clip-path inset(0.5*startPercentage % -> 0% round 1.5rem)
 *   the hero passes startPercentage 0 (no clip).
 * Media-scrubbed (FullBleedMediaSection, module 540431), trigger = section, same range:
 *   media layer     scale 1.25 -> 1 (hero and prefooter; REA-verified on scale.com/automotive)
 * One-shot, start "top center" (retroactive onEnter):
 *   headline        AnimatedText intro, delay 0
 *   body            AnimatedText intro, delay 0.2
 *   primary CTA     "filledWhiteArrow" intro, 0.85s, delay 0.5
 *   secondary CTA   "fadeIn" intro, 0.85s, delay 0.5
 * Media layer: flat dark surface with the dot texture (no Scale imagery on Vahue pages) under the template's
 * gradient-to-black overlay, here a fade to the page background.
 */

type Cta = { label: string; href: string }

type Props = {
  headline: string
  /** Hero renders the page H1; the prefooter an H2. */
  as?: 'h1' | 'h2'
  body?: string
  primary: Cta
  secondary?: Cta
  /** ClipScrollSection startPercentage (0 = no clip, as on the hero). */
  startPercentage?: number
  wrapperClassName?: string
}

export default function FullBleedMedia({ headline, as = 'h2', body, primary, secondary, startPercentage = 10, wrapperClassName = '' }: Props) {
  useRefreshOnPageGrow()
  const section = useRef<HTMLElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLParagraphElement>(null)
  const cta1 = useRef<HTMLAnchorElement>(null)
  const cta2 = useRef<HTMLAnchorElement>(null)
  const Heading = as

  useEffect(() => {
    const root = section.current
    if (!root) return
    const reduced = prefersReducedMotion()
    const texts: ReturnType<typeof createAnimatedText>[] = []

    const ctx = gsap.context(() => {
      if (!reduced && startPercentage > 0) {
        const max = 0.5 * startPercentage
        const apply = (progress: number) => {
          const inset = gsap.utils.clamp(0, max, max * (1 - progress))
          if (clip.current) clip.current.style.clipPath = `inset(${inset}% round 1.5rem)`
        }
        apply(0)
        ScrollTrigger.create({
          trigger: clip.current?.parentElement ?? root,
          start: 'top bottom',
          end: 'center center',
          onUpdate: ({ progress }) => apply(progress),
          onRefresh: ({ progress }) => apply(progress),
        })
      }

      // FullBleedMediaSection's own media scrub (module 540431): `v(progress, 0, 1, 1.25, 1, clamp)` on the
      // media layer, trigger = section, "top bottom" -> "center center". Runs on the hero and the pre-footer
      // alike (it is independent of the ClipScrollSection's startScale 1 and startPercentage).
      if (!reduced) {
        const scale = (progress: number) => {
          if (media.current) gsap.set(media.current, { scale: gsap.utils.mapRange(0, 1, 1.25, 1, gsap.utils.clamp(0, 1, progress)) })
        }
        scale(0)
        ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'center center',
          onUpdate: ({ progress }) => scale(progress),
          onRefresh: ({ progress }) => scale(progress),
        })
      }

      if (h.current) texts.push(createAnimatedText(h.current, 'lines,words'))
      if (p.current) texts.push(createAnimatedText(p.current, 'lines,words'))
      if (reduced) return

      // CTA intros: set hidden now, play on enter.
      const a = cta1.current
      const counter = a?.querySelector<HTMLElement>('[data-cta-counter]')
      const label = a?.querySelector<HTMLElement>('[data-cta-text]')
      const arrow = a?.querySelector<HTMLElement>('[data-cta-arrow]')
      if (a && counter) {
        gsap.set(a, { autoAlpha: 0, borderRadius: 0, scaleX: 0, transformOrigin: 'left center' })
        gsap.set(counter, { scaleX: 0, transformOrigin: 'left center' })
        if (label) gsap.set(label, { opacity: 0 })
        if (arrow) gsap.set(arrow, { x: -6 })
      }
      if (cta2.current) gsap.set(cta2.current, { autoAlpha: 0 })

      let played = false
      const play = () => {
        if (played) return
        played = true
        texts.forEach((t, i) => t.animateIn({ delay: 0.2 * i }))
        if (a && counter) {
          const d = 0.85
          const tl = gsap.timeline({
            delay: 0.5,
            onComplete: () => {
              gsap.set(counter, { clearProps: 'transform' })
              if (label) gsap.set(label, { clearProps: 'opacity' })
              if (arrow) gsap.set(arrow, { clearProps: 'x' })
              gsap.set(a, { clearProps: 'opacity,visibility,transform,transformOrigin' })
            },
          })
          tl.to(a, { autoAlpha: 1, borderRadius: 8, scaleX: 1, duration: d, ease: 'power3.out' }, 0)
          tl.to(counter, { scaleX: 1, duration: d, ease: 'power3.out' }, 0.1)
          if (label) tl.to(label, { opacity: 1 }, d - 0.1)
          if (arrow) tl.to(arrow, { x: 0, duration: d, ease: 'power3.inOut' }, 0)
        }
        if (cta2.current)
          gsap.to(cta2.current, {
            autoAlpha: 1,
            duration: 0.85,
            delay: 0.5,
            ease: 'power3.out',
            onComplete: () => {
              if (cta2.current) gsap.set(cta2.current, { clearProps: 'opacity,visibility' })
            },
          })
      }
      ScrollTrigger.create({
        trigger: root,
        start: 'top center',
        once: true,
        onEnter: play,
        onRefresh: (self) => {
          if (self.progress > 0) play()
        },
      })
    }, root)

    return () => {
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [startPercentage])

  return (
    <div className={wrapperClassName}>
      <div className="relative isolate w-full px-4">
        <div ref={clip} className="h-full w-full overflow-hidden" style={{ clipPath: `inset(${0.5 * startPercentage}% round 1.5rem)` }}>
          <section ref={section} className="relative overflow-hidden rounded-3xl bg-bg text-white">
            <div className="relative flex min-h-[480px] items-end overflow-hidden rounded-3xl p-8 md:min-h-[720px] md:p-16">
              <div className="relative z-20 flex w-full max-w-[72rem] flex-col gap-6 text-white">
                <Heading ref={h} className={`${s.header2} ${s.pending} font-display font-normal text-white`}>
                  {headline}
                </Heading>
                {body ? (
                  <p ref={p} className={`${s.body1} ${s.pending} w-full max-w-[48rem] font-display text-white/85`}>
                    {body}
                  </p>
                ) : null}
                <div className="flex flex-col gap-4 font-display md:flex-row">
                  <FlatCta ref={cta1} href={primary.href} variant="arrow" theme="white">
                    {primary.label}
                  </FlatCta>
                  {secondary ? (
                    <FlatCta ref={cta2} href={secondary.href} variant="border" theme="white">
                      {secondary.label}
                    </FlatCta>
                  ) : null}
                </div>
              </div>
              <div className="absolute left-0 top-0 h-full w-full origin-center overflow-hidden rounded-3xl">
                {/* .media-overlay: fade to the page background (no coloured glow, per DESIGN.md hero rules) */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
                  style={{ backgroundImage: 'linear-gradient(rgba(2,2,2,0) 0%, #020202 100%)' }}
                />
                <div ref={media} className="hero-texture absolute inset-0 overflow-hidden rounded-3xl border border-border-soft bg-surface" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
