'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText, { type AnimatedTextHandle } from './AnimatedText'
import FlatCta, { type FlatCtaHandle } from './FlatCta'
import styles from './styles.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com FullBleedMediaSection inside a ClipScrollSection (physical-ai clone), in the clone's own colours.
 *
 * Scrub (scrub: true, trigger = wrapper / section, start "top bottom" -> end "center center"):
 *   clip-path inset(mapRange(p, 0..1, startPercentage/2 .. 0)% round 1.5rem)   hero: 0, prefooter: 10 -> 5% -> 0
 *   media wrapper scale 1.25 -> 1
 * Intro (ScrollTrigger "top center", fires retroactively): CTAs animateIn {duration 0.85, delay 0.5};
 *   headline then body animateIn with delay 0.2 * index.
 * The hero's logo strip becomes the integrations strip (tool names in the same 40s marquee).
 */

type Cta = { text: string; href: string }
type Props = {
  /** Own photo for the media layer (no Scale imagery); #193A29 underneath, as on the clone. */
  image?: string
  headline: string
  /** Hero renders the page H1; the prefooter an H2. */
  as?: 'h1' | 'h2'
  body?: string
  primary: Cta
  secondary?: Cta
  strip?: { label: string; items: string[] }
  backdropClassName?: string
  startPercentage: number
  wrapperClassName: string
}

const map = (v: number, a: number, b: number, c: number, d: number) => {
  const r = ((v - a) * (d - c)) / (b - a) + c
  return Math.min(Math.max(r, Math.min(c, d)), Math.max(c, d))
}

export default function FullBleedMedia({
  image,
  headline,
  as = 'h2',
  body,
  primary,
  secondary,
  strip,
  startPercentage,
  wrapperClassName,
  backdropClassName = 'bg-white',
}: Props) {
  useRefreshOnPageGrow()
  const clipRoot = useRef<HTMLDivElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const headRef = useRef<AnimatedTextHandle>(null)
  const bodyRef = useRef<AnimatedTextHandle>(null)
  const primaryRef = useRef<FlatCtaHandle>(null)
  const secondaryRef = useRef<FlatCtaHandle>(null)

  useLayoutEffect(() => {
    primaryRef.current?.set()
    secondaryRef.current?.set()
  }, [])

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduce) {
        const setClip = (p: number) => {
          if (clip.current) clip.current.style.clipPath = `inset(${map(p, 0, 1, 0.5 * startPercentage, 0)}% round 1.5rem)`
        }
        setClip(0)
        gsap.set(media.current, { scale: 1.25 })
        ScrollTrigger.create({
          trigger: clipRoot.current,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
          onUpdate: (st) => setClip(st.progress),
          onRefresh: (st) => setClip(st.progress),
        })
        ScrollTrigger.create({
          trigger: section.current,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
          onUpdate: (st) => gsap.set(media.current, { scale: map(st.progress, 0, 1, 1.25, 1) }),
          onRefresh: (st) => gsap.set(media.current, { scale: map(st.progress, 0, 1, 1.25, 1) }),
        })
      }
      if (reduce && clip.current) clip.current.style.clipPath = 'inset(0% round 1.5rem)'
      let played = false
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top center',
        once: true,
        onEnter: async () => {
          if (played) return
          played = true
          primaryRef.current?.animateIn({ duration: 0.85, delay: 0.5 })
          secondaryRef.current?.animateIn({ duration: 0.85, delay: 0.5 })
          const texts = [headRef.current, bodyRef.current].filter(Boolean) as AnimatedTextHandle[]
          await Promise.all(texts.map((t) => t.ready()))
          texts.forEach((t, i) => t.animateIn({ delay: 0.2 * i }))
        },
      })
    })
    return () => ctx.revert()
  }, [startPercentage])

  return (
    <div className={wrapperClassName}>
      <div ref={clipRoot} className={`relative isolate grid w-full grid-cols-1 px-4 ${backdropClassName}`}>
        <div ref={clip} className="col-span-full h-full w-full overflow-hidden" style={{ clipPath: `inset(${0.5 * startPercentage}% round 1.5rem)` }}>
          <div className="h-full w-full">
            <section ref={section} className="relative overflow-hidden rounded-3xl bg-white text-black [clip-path:inset(0_round_1.5rem)]">
              <div className="relative flex min-h-[480px] items-end overflow-hidden rounded-3xl p-8 [clip-path:inset(0_round_1.5rem)] md:min-h-[720px] md:p-16">
                <div className="relative z-20 flex w-full max-w-[72rem] flex-col gap-6 text-white">
                  <AnimatedText
                    ref={headRef}
                    as={as}
                    maskCompensation
                    className="text-balance font-display text-[clamp(2rem,0.5rem+5vw,4rem)] font-normal leading-[1.05] tracking-[-0.01em] text-white"
                  >
                    {headline}
                  </AnimatedText>
                  {body ? (
                    <AnimatedText
                      ref={bodyRef}
                      as="p"
                      maskCompensation
                      className="w-full text-balance text-[16px] leading-[1.45] tracking-[-0.01em] text-white md:text-[20px] md:leading-[1.5]"
                    >
                      {body}
                    </AnimatedText>
                  ) : null}
                  <div className="flex flex-col gap-4 md:flex-row">
                    <FlatCta ref={primaryRef} variant="arrow" href={primary.href} text={primary.text} />
                    {secondary ? <FlatCta ref={secondaryRef} variant="border" href={secondary.href} text={secondary.text} /> : null}
                  </div>
                  {strip && strip.items.length ? (
                    <div className="mt-4 flex w-full min-w-0 max-w-md flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="h-[6px] w-[6px] shrink-0 bg-[#929292]" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
                        <p className="text-[10px] uppercase leading-[1.5] tracking-[0.05em] text-[#929292]">{strip.label}</p>
                      </div>
                      <ul className="sr-only">
                        {strip.items.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                      <div className="w-full min-w-0 overflow-hidden opacity-40" aria-hidden>
                        <div className={`flex w-max gap-8 overflow-hidden will-change-transform ${styles.marquee}`}>
                          {[0, 1].map((copy) =>
                            strip.items.map((t) => (
                              <div key={`${copy}-${t}`} className="relative flex h-7 shrink-0 items-center">
                                <span className="whitespace-nowrap font-display text-[16px] font-medium leading-none tracking-[-0.01em] text-white">{t}</span>
                              </div>
                            )),
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="absolute left-0 top-0 h-full w-full origin-center overflow-hidden rounded-3xl [clip-path:inset(0_round_1.5rem)]">
                  <div className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-hidden rounded-3xl [background:linear-gradient(#0000_0%,#000_100%)] [clip-path:inset(0_round_1.5rem)]" />
                  <div ref={media} className="absolute inset-0 h-full w-full overflow-hidden rounded-3xl [clip-path:inset(0_round_1.5rem)]">
                    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-[#193A29]">
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
