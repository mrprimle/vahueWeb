'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import FlatCta from '../about/FlatCta'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from '../about/animatedText'
import type { Cta } from './content'
import s from './eps.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com FullBleedMediaSection inside a ClipScrollSection (chunk 37xz28pjbnlx4.js sha256 b234eef5…, module 540431;
 * byte-identical to the copy read in the about / careers / evaluation-enterprise audits, so their fixes carry over).
 * /evaluation/public-sector props:
 *   hero        startPercentage 0, ClipScrollSection bg-white, wrapper `pb-10! pt-24!`; headline + body; CTA row
 *               arrow "Book a Demo" (introAnimation filledWhiteArrow) + border "Learn more" (introAnimation fadeIn)
 *   pre-footer  startPercentage 10 (inset 5% -> 0), ClipScrollSection bg-gray-50, wrapper `mt-16! pb-8`; headline only,
 *               one arrow CTA "Book a Demo"
 * Scrubbed, "top bottom" -> "center center":
 *   clip container (trigger = ClipScrollSection)  clip-path inset(0.5 * startPercentage % -> 0% round 1.5rem)
 *   media (trigger = section)                      scale 1.25 -> 1, set in onUpdate only (no initial set)
 * One-shot, "top center" (useScrollTrigger retroactiveOnEnter, end "bottom 20%"): headline AnimatedText delay 0, body
 *   delay 0.2; CTAs at delay 0.5 / 0.85s: filledWhiteArrow (root autoAlpha 0 -> 1, scaleX 0 -> 1, radius 0 -> 8,
 *   power3.out; counter scaleX 0 -> 1 at +0.1; label opacity at 0.75; chevron x -6 -> 0 power3.inOut) and fadeIn
 *   (autoAlpha 0 -> 1, power3.out). Ease constants read from the chunk: i="power2.out", s="power3.out", o="power3.inOut".
 * .media-overlay computes to linear-gradient(#0000, #000): its unlayered `background` beats bg-black/45.
 */

type Props = {
  image: string
  headline: string
  body?: string
  primary: Cta
  secondary?: Cta
  startPercentage: number
  /** ClipScrollSection backdrop colour (hero bg-white, pre-footer bg-gray-50) */
  backdrop: string
  wrapperClassName: string
  priority?: boolean
}

export default function FullBleedMedia({ image, headline, body, primary, secondary, startPercentage, backdrop, wrapperClassName, priority }: Props) {
  const section = useRef<HTMLElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const h2 = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLParagraphElement>(null)
  const cta1 = useRef<HTMLAnchorElement>(null)
  const cta2 = useRef<HTMLAnchorElement>(null)
  useRefreshOnPageGrow()

  useEffect(() => {
    const root = section.current
    if (!root) return
    const reduced = prefersReducedMotion()
    const texts: AnimatedText[] = []
    let offRetro = () => {}

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
        // onUpdate only, as on Scale (no initial set, no onRefresh): mapRange(progress, 0, 1, 1.25, 1, clamp)
        ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'center center',
          onUpdate: ({ progress }) => media.current && gsap.set(media.current, { scale: 1.25 - 0.25 * progress }),
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
      const b = cta2.current
      if (b) gsap.set(b, { autoAlpha: 0 })

      let played = false
      const play = () => {
        if (played) return
        played = true
        texts.forEach((t, i) => t.animateIn({ delay: 0.2 * i }))
        const d = 0.85
        // Both CTAs are appended to one timeline at position 0 (CtaGroup animateIn, delay 0.5).
        const tl = gsap.timeline({ delay: 0.5 })
        if (a && counter) {
          tl.to(a, { autoAlpha: 1, borderRadius: 8, scaleX: 1, duration: d, ease: 'power3.out' }, 0)
          tl.to(counter, { scaleX: 1, duration: d, ease: 'power3.out' }, 0.1)
          if (label) tl.to(label, { opacity: 1 }, d - 0.1)
          if (arrow) tl.to(arrow, { x: 0, duration: d, ease: 'power3.inOut' }, 0)
          tl.add(() => {
            gsap.set(counter, { clearProps: 'transform' })
            if (label) gsap.set(label, { clearProps: 'opacity' })
            if (arrow) gsap.set(arrow, { clearProps: 'x' })
            gsap.set(a, { clearProps: 'opacity,visibility,transform,transformOrigin' })
          })
        }
        if (b) {
          tl.to(b, { autoAlpha: 1, duration: d, ease: 'power3.out' }, 0)
          tl.add(() => gsap.set(b, { clearProps: 'opacity,visibility' }))
        }
      }
      // useScrollTrigger (module 210104) retroactiveOnEnter: start `top center`, default end `bottom 20%`; on every
      // refresh, fire onEnter once progress > 0 or the scroll is at/after start - 1.
      const st = ScrollTrigger.create({ trigger: root, start: 'top center', end: 'bottom 20%', onEnter: play })
      const retro = () => {
        if (st.progress > 0 || st.scroll() >= st.start - 1) play()
      }
      ScrollTrigger.addEventListener('refresh', retro)
      retro()
      offRetro = () => ScrollTrigger.removeEventListener('refresh', retro)
    }, root)

    return () => {
      offRetro()
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [startPercentage])

  return (
    <div className={wrapperClassName}>
      <div className="ClipScrollSection relative isolate w-full px-4" style={{ background: backdrop }}>
        <div ref={clip} className="h-full w-full overflow-hidden" style={{ clipPath: 'inset(0% round 1.5rem)' }}>
          <div className="h-full w-full">
            <section ref={section} className="FullBleedMediaSection relative overflow-hidden rounded-3xl bg-white text-black">
              <div className="relative flex min-h-[480px] items-end overflow-hidden rounded-3xl p-8 md:min-h-[720px] md:p-16">
                <div className="relative z-20 flex w-full max-w-[72rem] flex-col gap-6 text-white">
                  <h2 ref={h2} className={`${s.header2} ${s.pending} font-display text-white`}>
                    {headline}
                  </h2>
                  {body ? (
                    <p ref={p} className={`${s.body1} ${s.pending} w-full font-display text-white`}>
                      {body}
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-4 font-display md:flex-row">
                    <FlatCta ref={cta1} href={primary.href} variant="arrow" theme="white">
                      {primary.label}
                    </FlatCta>
                    {secondary ? (
                      <FlatCta ref={cta2} href={secondary.href} variant="border" theme="white" className={s.borderCta}>
                        {secondary.label}
                      </FlatCta>
                    ) : null}
                  </div>
                </div>
                <div className="absolute left-0 top-0 h-full w-full origin-center overflow-hidden rounded-3xl">
                  <div
                    className="media-overlay pointer-events-none absolute inset-0 z-10 rounded-3xl"
                    style={{ backgroundImage: 'linear-gradient(#0000 0%, #000 100%)' }}
                  />
                  <div ref={media} className="absolute inset-0 overflow-hidden rounded-3xl" style={{ background: 'var(--eps-media-bg)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt=""
                      loading={priority ? 'eager' : 'lazy'}
                      fetchPriority={priority ? 'high' : 'auto'}
                      className="absolute inset-0 h-full w-full rounded-[inherit] object-cover"
                    />
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
