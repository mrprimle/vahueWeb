'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import FlatCta from './FlatCta'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './animatedText'
import s from './careers.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com FullBleedMediaSection inside a ClipScrollSection. /careers renders its own copy of the section
 * (chunk 0fwc0347bccaa.js; same body as module 540431 in 37xz28pjbnlx4.js) with the defaults:
 *   startPercentage 10, startScale 1, borderRadius 1.5rem, overlayVariant "flat", headlineWidth "wide".
 * Page props (RSC payload):
 *   hero        animateCta false, cta "View Open Positions" -> smoothScrollTargetId "open-roles", wrapper pt-24
 *   pre-footer  animateCta true (filledWhiteArrow intro), cta "Explore Opportunities", wrapper mt-16 pb-8
 * Scrubbed, "top bottom" -> "center center":
 *   clip container (trigger = ClipScrollSection)  clip-path inset(0.5 * startPercentage % -> 0% round 1.5rem)
 *   media (trigger = section)                      scale 1.25 -> 1 (gsap.utils.mapRange, clamped)
 *   The hero starts ~past its end (section top 135 at 1440x900), so it reads inset(0%) / scale ~1.01 at load.
 * One-shot, "top center" (retroactive): headline AnimatedText delay 0, body delay 0.2; with animateCta the CTA
 *   runs filledWhiteArrow (scaleX 0 -> 1, radius 0 -> 8, autoAlpha, 0.85s power3.out, delay 0.5).
 * .media-overlay computes to linear-gradient(#0000, #000) on /careers (sampled): its unlayered `background`
 *   beats the layered bg-black/45 utility of the "flat" variant.
 * useRefreshOnPageGrow re-measures every ScrollTrigger when the page grows (department lists expanding,
 * lazy images, fonts) so the pre-footer clip/scale trigger doesn't fire late.
 */

type Cta = { label: string; href: string; smoothScrollTargetId?: string }

type Props = {
  image?: string
  imageAlt?: string
  /** Replaces the image (e.g. a Vahue visual); it gets the same 1.25 -> 1 scale. */
  media?: ReactNode
  imageBg?: string
  headline: string
  body?: string
  cta?: Cta
  animateCta?: boolean
  priority?: boolean
  startPercentage?: number
}

export default function FullBleedMedia({
  image,
  imageAlt = '',
  media: mediaNode,
  imageBg = '#193A29',
  headline,
  body,
  cta,
  animateCta = true,
  priority,
  startPercentage = 10,
}: Props) {
  const section = useRef<HTMLElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const h2 = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLParagraphElement>(null)
  const cta1 = useRef<HTMLAnchorElement>(null)
  useRefreshOnPageGrow()

  useEffect(() => {
    const root = section.current
    if (!root) return
    const reduced = prefersReducedMotion()
    const texts: AnimatedText[] = []

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

      if (!reduced) {
        const zoom = (progress: number) => media.current && gsap.set(media.current, { scale: 1.25 - 0.25 * progress })
        ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'center center',
          onUpdate: ({ progress }) => zoom(progress),
          onRefresh: ({ progress }) => zoom(progress),
        })
      }

      if (h2.current) texts.push(createAnimatedText(h2.current))
      if (p.current) texts.push(createAnimatedText(p.current))
      if (reduced) return

      const a = animateCta ? cta1.current : null
      const counter = a?.querySelector<HTMLElement>('[data-cta-counter]')
      const label = a?.querySelector<HTMLElement>('[data-cta-text]')
      const arrow = a?.querySelector<HTMLElement>('[data-cta-arrow]')
      if (a && counter) {
        gsap.set(a, { autoAlpha: 0, borderRadius: 0, scaleX: 0, transformOrigin: 'left center' })
        gsap.set(counter, { scaleX: 0, transformOrigin: 'left center' })
        if (label) gsap.set(label, { opacity: 0 })
        if (arrow) gsap.set(arrow, { x: -6 })
      }

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
  }, [startPercentage, animateCta])

  return (
    <div className="ClipScrollSection relative isolate w-full bg-[var(--car-bg,#fff)] px-4">
      <div ref={clip} className="h-full w-full overflow-hidden" style={{ clipPath: 'inset(0% round 1.5rem)' }}>
        <section ref={section} className="FullBleedMediaSection relative overflow-hidden rounded-3xl bg-white text-black">
          <div className="relative flex min-h-[480px] items-end overflow-hidden rounded-3xl p-8 md:min-h-[720px] md:p-16">
            <div className="relative z-20 flex w-full max-w-[72rem] flex-col gap-6 text-white">
              <h2 ref={h2} className={`${s.header2} ${s.pending} font-display font-normal text-white`}>
                {headline}
              </h2>
              {body ? (
                <p ref={p} className={`${s.body1} ${s.pending} w-full font-display text-white`} style={{ textWrap: 'balance' }}>
                  {body}
                </p>
              ) : null}
              {/* the CTA row renders even when empty, as on scale.com */}
              <div className="flex flex-col gap-4 font-display md:flex-row">
                {cta ? (
                  <FlatCta
                    ref={cta1}
                    href={cta.href}
                    smoothScrollTargetId={cta.smoothScrollTargetId}
                    variant="arrow"
                    theme="white"
                    staticShape={!animateCta}
                  >
                    {cta.label}
                  </FlatCta>
                ) : null}
              </div>
            </div>
            <div className="absolute left-0 top-0 h-full w-full origin-center overflow-hidden rounded-3xl">
              <div
                className="media-overlay pointer-events-none absolute inset-0 z-10 rounded-3xl"
                style={{ backgroundImage: 'linear-gradient(#0000 0%, #000 100%)' }}
              />
              <div ref={media} className="absolute inset-0 overflow-hidden rounded-3xl" style={{ background: imageBg }}>
                {mediaNode ??
                  (image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={imageAlt}
                      loading={priority ? 'eager' : 'lazy'}
                      className="absolute inset-0 h-full w-full rounded-[inherit] object-cover"
                    />
                  ) : null)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
