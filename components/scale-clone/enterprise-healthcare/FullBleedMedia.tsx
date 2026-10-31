'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import FlatCta from './FlatCta'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './animatedText'
import s from './healthcare.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com FullBleedMediaSection inside a ClipScrollSection (chunk 37xz28pjbnlx4.js), as configured on
 * /enterprise/healthcare (props read from the bundle and checked against live samples):
 *   hero        startPercentage 0 (no clip; sampled inset(0%)), logos "Trusted by" marquee, no CTA
 *   pre-footer  startPercentage 10 (sampled inset(5%) -> inset(1.765%) at scroll 4600 -> inset(0%)),
 *               headlineWidth "narrow" (max-w-[620px]), "filledWhiteArrow" CTA
 * Scrubbed, trigger = wrapper, "top bottom" -> "center center":
 *   clip container  clip-path inset(0.5 * startPercentage % -> 0% round 1.5rem)
 *   media           scale 1.25 -> 1 (trigger = section; sampled 1.0139 at scroll 0 on the hero)
 * One-shot, "top center" (retroactive): headline AnimatedText delay 0, body delay 0.2,
 *   CTA filledWhiteArrow 0.85s delay 0.5.
 * .media-overlay is linear-gradient(#0000, #000): its unlayered `background` shorthand beats the layered
 *   bg-black/45 utility, so "flat" and "gradient" overlayVariant render the same.
 * useRefreshOnPageGrow re-measures every ScrollTrigger when the page grows (lazy images, tab mockups, fonts)
 * so the pre-footer clip/scale trigger doesn't fire late.
 * Logo marquee: LogoMarquee, `animate-logo-marquee` 40s linear infinite, translateX 0 -> -50%, gap 32,
 * the logo row is rendered twice; wrapper opacity .4.
 */

type Cta = { label: string; href: string }

type Props = {
  image?: string
  imageAlt?: string
  /** Replaces the image (e.g. a Vahue visual); it gets the same 1.25 -> 1 scale. */
  media?: ReactNode
  imageBg?: string
  headline: string
  body?: string
  primary?: Cta
  priority?: boolean
  startPercentage?: number
  narrow?: boolean
  logos?: { label: string; slots: { w: number; h: number }[] } | null
}

export default function FullBleedMedia({ image, imageAlt = '', media: mediaNode, imageBg, headline, body, primary, priority, startPercentage = 10, narrow, logos }: Props) {
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
  }, [startPercentage])

  return (
    <div className="isolate relative w-full bg-white px-4">
      <div ref={clip} className="h-full w-full overflow-hidden" style={{ clipPath: 'inset(0% round 1.5rem)' }}>
        <section ref={section} className="FullBleedMediaSection relative overflow-hidden rounded-3xl bg-white text-black">
          <div className="relative flex min-h-[480px] items-end overflow-hidden rounded-3xl p-8 md:min-h-[720px] md:p-16">
            <div className="relative z-20 flex w-full max-w-[72rem] flex-col gap-6 text-white">
              <h2
                ref={h2}
                className={`${s.header2} ${s.pending} font-display font-normal text-white ${narrow ? 'max-w-[620px]' : ''}`}
              >
                {headline}
              </h2>
              {body ? (
                <p ref={p} className={`${s.body1} ${s.pending} w-full font-display text-white`} style={{ textWrap: 'balance' }}>
                  {body}
                </p>
              ) : null}
              {/* the CTA row renders even when empty, as on scale.com (adds a 24px flex gap) */}
              <div className="flex flex-col gap-4 font-display md:flex-row">
                {primary ? (
                  <FlatCta ref={cta1} href={primary.href} variant="arrow" theme="white">
                    {primary.label}
                  </FlatCta>
                ) : null}
              </div>
              {logos ? (
                <div className="mt-4 flex w-full min-w-0 max-w-md flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 bg-[#929292]" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
                    <p className="font-display text-[0.625rem] uppercase leading-[15px] tracking-[0.05em] text-[#929292]">{logos.label}</p>
                  </div>
                  <div className="w-full min-w-0 overflow-hidden opacity-40" role="presentation" aria-hidden="true">
                    <div className={`flex w-max gap-8 overflow-hidden will-change-transform ${s.marquee}`}>
                      {[...logos.slots, ...logos.slots].map((l, i) => (
                        // customer logos are not shipped: neutral tile in Scale's rendered logo box
                        <div key={i} className="relative flex h-[35px] shrink-0 items-start overflow-hidden" style={{ width: l.w }}>
                          <div className="rounded-[3px] bg-white" style={{ width: l.w, height: l.h }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="absolute left-0 top-0 h-full w-full origin-center overflow-hidden rounded-3xl">
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
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
