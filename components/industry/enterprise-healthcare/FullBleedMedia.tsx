'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import FlatCta from '@/components/scale-clone/enterprise-healthcare/FlatCta'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from '@/components/scale-clone/enterprise-healthcare/animatedText'
import s from '@/components/scale-clone/enterprise-healthcare/healthcare.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * Vahue dark copy of the enterprise-healthcare clone's FullBleedMediaSection
 * (components/scale-clone/enterprise-healthcare/FullBleedMedia.tsx). Motion is unchanged:
 *   clip   inset(0.5 * startPercentage % -> 0% round 1.5rem), scrubbed "top bottom" -> "center center"
 *   media  scale 1.25 -> 1, same trigger
 *   text   AnimatedText one-shot at "top center" (headline 0, body 0.2), CTA filledWhiteArrow 0.85s delay 0.5
 * Vahue changes: page background instead of white, overlay fades to #020202 (DESIGN.md vignette rule),
 * the media is a Vahue node (dot texture + line art), and the "Trusted by" logo marquee becomes a text
 * marquee of the systems the agents work in (no third-party logos).
 */

type Cta = { label: string; href: string }

type Props = {
  as?: 'h1' | 'h2'
  media?: ReactNode
  headline: string
  body?: string
  primary?: Cta
  startPercentage?: number
  narrow?: boolean
  marquee?: { label: string; names: string[] } | null
}

export default function FullBleedMedia({ as: Heading = 'h2', media: mediaNode, headline, body, primary, startPercentage = 10, narrow, marquee }: Props) {
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
    <div className="isolate relative w-full bg-bg px-4">
      <div ref={clip} className="h-full w-full overflow-hidden" style={{ clipPath: 'inset(0% round 1.5rem)' }}>
        <section ref={section} className="relative overflow-hidden rounded-3xl bg-bg text-white">
          <div className="relative flex min-h-[480px] items-end overflow-hidden rounded-3xl p-8 md:min-h-[720px] md:p-16">
            <div className="relative z-20 flex w-full max-w-[72rem] flex-col gap-6 text-white">
              <Heading
                ref={h2}
                className={`${s.header2} ${s.pending} font-display font-normal text-white ${narrow ? 'max-w-[620px]' : ''}`}
              >
                {headline}
              </Heading>
              {body ? (
                <p ref={p} className={`${s.body1} ${s.pending} w-full max-w-[56rem] font-display text-white/85`} style={{ textWrap: 'balance' }}>
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
              {marquee ? (
                <div className="mt-4 flex w-full min-w-0 max-w-md flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 bg-white/45" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
                    <p className="font-mono text-[0.625rem] uppercase leading-[15px] tracking-[0.05em] text-white/55">{marquee.label}</p>
                  </div>
                  <p className="sr-only">{marquee.names.join(', ')}</p>
                  <div className="w-full min-w-0 overflow-hidden opacity-60" aria-hidden="true">
                    <div className={`flex w-max gap-8 overflow-hidden will-change-transform ${s.marquee}`}>
                      {[...marquee.names, ...marquee.names].map((n, i) => (
                        <span key={i} className="flex h-[35px] shrink-0 items-center whitespace-nowrap font-display text-[15px] tracking-[-0.01em] text-white">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="absolute left-0 top-0 h-full w-full origin-center overflow-hidden rounded-3xl">
              {/* .media-overlay: vignette fade to the page background (no coloured glow, DESIGN.md hero rules) */}
              <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl" style={{ backgroundImage: 'linear-gradient(rgba(2,2,2,0) 0%, #020202 100%)' }} />
              <div ref={media} className="absolute inset-0 overflow-hidden rounded-3xl">
                {mediaNode ?? <div className="hero-texture h-full w-full rounded-3xl border border-border-soft bg-surface" />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
