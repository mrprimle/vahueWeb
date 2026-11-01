'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import FlatCta from '@/components/scale-clone/careers/FlatCta'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from '@/components/scale-clone/careers/animatedText'
import type { HeroContent } from './content'
import s from './styles.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com FullBleedMediaSection inside a ClipScrollSection (chunk 37xz28pjbnlx4.js sha256 b234eef5…, byte-identical to
 * the rlenvironments / careers / experts audits). Ported from the experts clone, image branch only.
 * /evaluation/model-developers props (RSC payload):
 *   hero        478135 (compact), startPercentage 0, media img-hero-monitor.webp, backdrop white, wrapper pt-24! pb-10!
 *   pre-footer  540431 defaults, startPercentage 10, media prefooter.webp, backdrop gray-50 (#f9fafb), wrapper mt-16! pb-8
 * Scrubbed, "top bottom" -> "center center":
 *   clip   inset((1 - p) * 0.5 * startPercentage % round 1.5rem)
 *   media  scale 1.25 -> 1, onUpdate only (no initial set); both sections are images, so the scale applies to both
 * One-shot, "top center" (useScrollTrigger 210104, retroactiveOnEnter, end "bottom 20%"): headline AnimatedText,
 *   body +0.2s, CTA filledWhiteArrow (scaleX 0 -> 1, radius 0 -> 8, autoAlpha, 0.85s, delay 0.5).
 * Overlay: .media-overlay computes to linear-gradient(#0000, #000). CTA: FlatCta arrow/white (680ms reset state machine,
 * #86bff2 :focus on internal links).
 */
export default function FullBleedMedia({
  content,
  startPercentage,
  wrapperClassName,
  backdropClassName = 'bg-white',
  media: mediaNode,
  priority,
}: {
  content: HeroContent
  startPercentage: number
  wrapperClassName: string
  /** ClipScrollSection backdrop (shows around the inset clip): bg-white / bg-[#f9fafb] */
  backdropClassName?: string
  /** Replaces the image/video (e.g. a Vahue visual). */
  media?: ReactNode
  priority?: boolean
}) {
  const { headline, body, cta, image } = content
  const root = useRef<HTMLDivElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const h2 = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  useRefreshOnPageGrow()

  useEffect(() => {
    const sec = section.current
    if (!sec) return
    const reduced = prefersReducedMotion()
    const texts: AnimatedText[] = []
    let offRetro = () => {}
    const ctx = gsap.context(() => {
      if (!reduced) {
        const max = 0.5 * startPercentage
        const apply = (progress: number) => {
          if (clip.current) clip.current.style.clipPath = `inset(${gsap.utils.clamp(0, max, max * (1 - progress))}% round 1.5rem)`
        }
        const scaleMedia = !mediaNode
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'center center',
          onUpdate: ({ progress }) => {
            apply(progress)
            if (scaleMedia && media.current) gsap.set(media.current, { scale: 1.25 - 0.25 * progress })
          },
          onRefresh: ({ progress }) => apply(progress),
        })
      }

      if (h2.current) texts.push(createAnimatedText(h2.current))
      if (p.current) texts.push(createAnimatedText(p.current))
      if (reduced) return

      const a = ctaRef.current
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
      const st = ScrollTrigger.create({ trigger: sec, start: 'top center', end: 'bottom 20%', onEnter: play })
      const retro = () => {
        if (st.progress > 0 || st.scroll() >= st.start - 1) play()
      }
      ScrollTrigger.addEventListener('refresh', retro)
      retro()
      offRetro = () => ScrollTrigger.removeEventListener('refresh', retro)
    }, sec)
    return () => {
      offRetro()
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [startPercentage, mediaNode])

  return (
    <div className={wrapperClassName}>
      <div ref={root} className={`ClipScrollSection relative isolate w-full px-4 ${backdropClassName}`}>
        <div ref={clip} className="h-full w-full overflow-hidden" style={{ clipPath: `inset(${0.5 * startPercentage}% round 1.5rem)` }}>
          <section ref={section} className="FullBleedMediaSection relative overflow-hidden rounded-3xl bg-white text-black">
            <div className="relative flex min-h-[480px] items-end overflow-hidden rounded-3xl p-8 md:min-h-[720px] md:p-16">
              <div className="relative z-20 flex w-full max-w-[72rem] flex-col gap-6 text-white">
                <h2 ref={h2} className={`${s.header2} ${s.pending} font-display text-white`}>
                  {headline}
                </h2>
                {body ? (
                  <p ref={p} className={`${s.body1} ${s.pending} w-full font-display text-white`} style={{ textWrap: 'balance' }}>
                    {body}
                  </p>
                ) : null}
                <div className="flex flex-col gap-4 font-display md:flex-row">
                  <FlatCta ref={ctaRef} href={cta.href} variant="arrow" theme="white">
                    {cta.label}
                  </FlatCta>
                </div>
              </div>
              <div className="absolute left-0 top-0 h-full w-full origin-center overflow-hidden rounded-3xl">
                <div className="media-overlay pointer-events-none absolute inset-0 z-10 rounded-3xl" style={{ backgroundImage: 'linear-gradient(#0000 0%, #000 100%)' }} />
                <div ref={media} className="absolute inset-0 overflow-hidden rounded-3xl">
                  {mediaNode ?? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt=""
                      loading={priority ? 'eager' : 'lazy'}
                      className="absolute inset-0 h-full w-full rounded-[inherit] object-cover"
                      style={{ backgroundColor: '#193A29' }}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
