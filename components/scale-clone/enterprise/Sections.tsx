'use client'

import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText, { type AnimatedTextHandle } from './AnimatedText'
import FlatCta, { type FlatCtaHandle } from './FlatCta'
import ClipScroll from './ClipScroll'
import type { PillarIcon, PillarsContent, PoweredByContent, RaceContent, TrustedContent } from './content'

gsap.registerPlugin(ScrollTrigger)

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const map = (v: number, a: number, b: number, c: number, d: number) => {
  const r = ((v - a) * (d - c)) / (b - a) + c
  return Math.min(Math.max(r, Math.min(c, d)), Math.max(c, d))
}

/** One-shot ScrollTrigger (Scale's useScrollTriggerOnEnter, default start "top 80%"). */
function useOnEnter(ref: React.RefObject<HTMLElement | null>, fn: () => void, start = 'top 80%') {
  const cb = useRef(fn)
  cb.current = fn
  useEffect(() => {
    let done = false
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start,
      onEnter: () => {
        if (done) return
        done = true
        cb.current()
      },
    })
    if (st.progress > 0 && !done) {
      done = true
      cb.current()
    }
    return () => st.kill()
  }, [ref, start])
}

function useInViewVideo(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause())))
    io.observe(v)
    return () => io.disconnect()
  }, [ref])
}

/*
 * TwoColumnTextWithVideo, variant enterpriseRace (module 857484): onEnter -> heading animateIn(.35),
 * left column (.45), right column (.45), link (.55). Grey #C7C7C7 band, py-24, video aspect-video rounded-2xl.
 */
export function Race({ content: race, media }: { content: RaceContent; media?: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  const head = useRef<AnimatedTextHandle>(null)
  const lead = useRef<AnimatedTextHandle>(null)
  const body = useRef<AnimatedTextHandle>(null)
  const link = useRef<AnimatedTextHandle>(null)
  const video = useRef<HTMLVideoElement>(null)
  useInViewVideo(video)
  useOnEnter(root, () => {
    head.current?.animateIn({ delay: 0.35 })
    lead.current?.animateIn({ delay: 0.45 })
    body.current?.animateIn({ delay: 0.45 })
    link.current?.animateIn({ delay: 0.55 })
  })
  return (
    <section ref={root} className="TwoColumnTextWithVideo relative bg-[var(--ent-bg,#fff)] text-[color:var(--ent-fg,#000)]">
      <div className="grid grid-cols-8 gap-2 px-6 md:grid-cols-12">
        <div className="col-span-full py-8">
          <AnimatedText ref={head} as="h2" maskCompensation className="w-full text-[32px] font-normal leading-[1.05] tracking-[-0.01em] text-[color:var(--ent-fg,#000)] md:text-[64px]">
            {race.heading}
          </AnimatedText>
        </div>
      </div>
      <div className="grid w-full grid-cols-8 gap-2 bg-[var(--ent-band-2,#C7C7C7)] px-6 py-24 text-[color:var(--ent-fg,#000)] md:grid-cols-12">
        <div className="order-2 col-span-full row-start-1 pb-6 md:col-span-4 md:col-start-3">
          <AnimatedText ref={lead} as="h4" maskCompensation className="w-full text-[24px] font-normal leading-9 tracking-[-0.03em] text-[color:var(--ent-fg,#000)] md:text-[32px]">
            {race.lead}
          </AnimatedText>
          <AnimatedText ref={link} className="mt-6">
            <a href={race.link.href} className="flex items-center gap-1 align-middle text-[14px] font-medium leading-[1.5]">
              {race.link.text}
              <svg className="inline-block" width="9" height="8" viewBox="0 0 9 8" fill="none" aria-hidden>
                <path
                  d="M8.64645 3.43929C8.84171 3.63456 8.84171 3.95114 8.64645 4.1464L5.35355 7.43929C5.15829 7.63456 4.84171 7.63456 4.64645 7.43929L4.29105 7.0839C4.09579 6.88864 4.09579 6.57206 4.29105 6.37679L5.27145 5.3964C5.58643 5.08142 5.36335 4.54285 4.91789 4.54285L0.5 4.54285C0.223858 4.54285 0 4.31899 0 4.04285V3.54285C0 3.2667 0.223857 3.04285 0.5 3.04285L4.91789 3.04285C5.36335 3.04285 5.58643 2.50428 5.27145 2.18929L4.29105 1.2089C4.09579 1.01364 4.09579 0.697055 4.29105 0.501793L4.64645 0.1464C4.84171 -0.0488622 5.15829 -0.0488622 5.35355 0.1464L8.64645 3.43929Z"
                  style={{ fill: 'var(--ent-icon,#1C1B1F)' }}
                />
              </svg>
            </a>
          </AnimatedText>
        </div>
        <div className="order-1 col-span-full pb-6 md:col-span-4 md:col-start-8">
          <AnimatedText ref={body} as="p" className="w-full text-[16px] leading-[1.5] tracking-[-0.01em] text-[color:var(--ent-fg,#000)]">
            {race.body}
          </AnimatedText>
        </div>
        <div className="order-3 col-span-full w-full overflow-clip rounded-2xl md:col-span-9 md:col-start-3">
          <div className="relative aspect-video w-full overflow-clip">
            {race.video ? (
              <video ref={video} className="block h-full min-h-full w-full object-cover" src={race.video} muted loop playsInline preload="metadata" aria-hidden />
            ) : (
              media
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const PILLAR_ICONS: Record<PillarIcon, string> = {
  people:
    'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  hub: 'M8.4 18.2c.38.5.6 1.12.6 1.8 0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3c.44 0 .85.09 1.23.26l1.41-1.77a4.504 4.504 0 0 1-1.09-3.69l-2.03-.68A2.997 2.997 0 0 1 0 9.5c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .07 0 .14-.01.21l2.03.68a4.468 4.468 0 0 1 3.22-2.32V5.91A3.018 3.018 0 0 1 9 3c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.4-.96 2.57-2.25 2.91v2.16c1.4.23 2.58 1.11 3.22 2.32L18 9.71V9.5c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3c-1.06 0-1.98-.55-2.52-1.37l-2.03.68a4.49 4.49 0 0 1-1.09 3.69l1.41 1.77c.38-.18.79-.27 1.23-.27 1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3c0-.68.22-1.3.6-1.8l-1.41-1.77c-1.35.75-3.01.76-4.37 0L8.4 18.2z',
  search:
    'M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z',
}

/*
 * EnterprisePillars (chunk 2k1qlgdxlbmz1, module 909085). onEnter: heading animateIn; per item i the icon fades in
 * (opacity 0 -> 1, .5s) and its HeadlineWithCta animates after i * 200ms (headline +.2s, subtitle +.4s); the
 * divider under item i scales X 0 -> 1 (.5s, delay .2i + .2).
 */
export function Pillars({ content: pillars, media }: { content: PillarsContent; media?: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  const head = useRef<AnimatedTextHandle>(null)
  const icons = useRef<(HTMLDivElement | null)[]>([])
  const titles = useRef<(AnimatedTextHandle | null)[]>([])
  const bodies = useRef<(AnimatedTextHandle | null)[]>([])
  const rules = useRef<(HTMLDivElement | null)[]>([])
  const video = useRef<HTMLVideoElement>(null)
  useInViewVideo(video)
  useLayoutEffect(() => {
    if (reduced()) return
    icons.current.forEach((el) => el && gsap.set(el, { opacity: 0 }))
  }, [])
  useOnEnter(root, () => {
    head.current?.animateIn()
    pillars.items.forEach((_, i) => {
      if (rules.current[i]) gsap.fromTo(rules.current[i], { scaleX: 0 }, { scaleX: 1, duration: 0.5, delay: 0.2 * i + 0.2 })
      if (icons.current[i]) gsap.fromTo(icons.current[i], { opacity: 0 }, { opacity: 1, duration: 0.5 })
      setTimeout(() => {
        titles.current[i]?.animateIn({ delay: 0.2 })
        bodies.current[i]?.animateIn({ delay: 0.4 })
      }, i * 200)
    })
  })
  return (
    <section ref={root} className="EnterprisePillars bg-[var(--ent-bg,#fff)] py-24 text-[color:var(--ent-fg,#000)]">
      <div className="grid grid-cols-8 gap-2 px-6 md:grid-cols-12">
        <div className="col-span-full flex flex-col items-start gap-6 md:col-span-5 md:col-start-2 md:justify-center">
          <AnimatedText ref={head} as="h3" maskCompensation className="w-full text-[24px] font-normal leading-[1.05] tracking-[-0.01em] text-[color:var(--ent-fg,#000)] md:text-[40px] md:leading-[1.25]">
            {pillars.heading[0]}
            <br />
            {pillars.heading[1]}
          </AnimatedText>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
            {pillars.video ? (
              <video ref={video} className="absolute inset-0 block h-full w-full object-cover" src={pillars.video} muted loop playsInline preload="metadata" aria-hidden />
            ) : (
              media
            )}
          </div>
        </div>
        <div className="col-span-full flex flex-col gap-5 md:col-span-4 md:col-start-8 md:gap-10">
          {pillars.items.map((it, i) => (
            <div key={it.title}>
              <article className="flex flex-col">
                <div
                  ref={(el) => {
                    icons.current[i] = el
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: it.color }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="white" aria-hidden>
                    <path d={PILLAR_ICONS[it.icon]} />
                  </svg>
                </div>
                <div className="flex flex-col items-start gap-6 pb-0 pt-6">
                  <AnimatedText
                    ref={(h) => {
                      titles.current[i] = h
                    }}
                    as="h5"
                    className="w-full text-left text-[22px] font-normal leading-[1.05] tracking-[-0.01em] text-[color:var(--ent-fg,#000)] md:text-[24px] md:leading-[1.5]"
                  >
                    {it.title}
                  </AnimatedText>
                  <AnimatedText
                    ref={(h) => {
                      bodies.current[i] = h
                    }}
                    as="p"
                    className="w-full text-left text-[14px] leading-[1.5] tracking-[-0.01em] text-[color:var(--ent-fg,#000)] md:text-[16px]"
                  >
                    {it.body}
                  </AnimatedText>
                </div>
              </article>
              {i !== pillars.items.length - 1 ? (
                <div
                  ref={(el) => {
                    rules.current[i] = el
                  }}
                  className="mt-5 h-px w-full origin-left scale-x-0 bg-[var(--ent-line,#EAEAEA)] md:mt-10"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/*
 * EnterprisePoweredBy (module 366838). Section "top bottom" onEnter -> HeadlineWithCta animateIn (headline,
 * subtitle, CTA "filledWhiteArrow"). Media: ClipScroll startPercentage 10, startScale .85, noClip, radius
 * 1rem (.75 on touch). Cards: BaseCardScroll start "0% 120%" -> "top 50%", scale .96 -> 1, x -160 / +160 -> 0
 * (desktop), no opacity; on first progress the icon pops (opacity 0 / scale .3 -> 1, .85s power2.out) and the
 * card copy animates in (headline 0, subtitle .2).
 */
export function PoweredBy({ content: poweredBy, media }: { content: PoweredByContent; media?: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  const head = useRef<AnimatedTextHandle>(null)
  const sub = useRef<AnimatedTextHandle>(null)
  const cta = useRef<FlatCtaHandle>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const icons = useRef<(HTMLDivElement | null)[]>([])
  const titles = useRef<(AnimatedTextHandle | null)[]>([])
  const bodies = useRef<(AnimatedTextHandle | null)[]>([])

  useLayoutEffect(() => {
    cta.current?.set()
    if (!reduced()) icons.current.forEach((el) => el && gsap.set(el, { opacity: 0, scale: 0.3 }))
  }, [])
  useOnEnter(
    root,
    () => {
      head.current?.animateIn({ delay: 1.5 * 0 + 0.5 })
      sub.current?.animateIn({ delay: 0.6 })
      cta.current?.animateIn({ duration: 0.85, delay: 0.5 })
    },
    'top bottom',
  )
  useEffect(() => {
    if (reduced()) return
    const desktop = matchMedia('(hover: hover) and (pointer: fine)').matches
    const triggers = cards.current.map((el, i) => {
      if (!el) return null
      let fired = false
      const x0 = desktop ? (i === 0 ? -160 : 160) : 0
      const apply = (p: number) => gsap.set(el, { scale: map(p, 0, 1, 0.96, 1), x: map(p, 0, 1, x0, 0) })
      apply(0)
      return ScrollTrigger.create({
        trigger: el,
        start: '0% 120%',
        end: 'top 50%',
        onEnter: () => {
          if (fired) return
          fired = true
          gsap.to(icons.current[i], { opacity: 1, scale: 1, duration: 0.85, ease: 'power2.out' })
          titles.current[i]?.animateIn()
          bodies.current[i]?.animateIn({ delay: 0.2 })
        },
        onUpdate: (st) => apply(gsap.parseEase('power2.out')(st.progress)),
        onRefresh: (st) => apply(gsap.parseEase('power2.out')(st.progress)),
      })
    })
    return () => triggers.forEach((t) => t?.kill())
  }, [])

  return (
    <section ref={root} className="EnterprisePoweredBy bg-[var(--ent-band,#EAEAEA)] py-16 text-[color:var(--ent-fg,#000)] md:py-24">
      <div className="grid grid-cols-8 gap-2 px-6 md:grid-cols-12">
        <div className="col-span-full pb-8 md:col-span-6 md:col-start-4">
          <div className="flex flex-col items-center gap-6 py-6">
            <AnimatedText ref={head} as="h3" maskCompensation className="w-full text-center text-[32px] font-normal leading-[1.05] tracking-[-0.01em] text-[color:var(--ent-fg,#000)] md:text-[64px]">
              {poweredBy.headline}
            </AnimatedText>
            <AnimatedText ref={sub} as="p" className="w-full text-center text-[14px] leading-[1.5] tracking-[-0.01em] text-[color:var(--ent-fg,#000)] md:w-[576px] md:text-[16px]">
              {poweredBy.body}
            </AnimatedText>
            <FlatCta ref={cta} as="button" navigate variant="arrow" href={poweredBy.cta.href} text={poweredBy.cta.text} />
          </div>
        </div>
        <ClipScroll
          startPercentage={10}
          startScale={0.85}
          borderRadius={1}
          noClip
          className="col-span-full mb-6 w-full overflow-clip rounded-lg md:col-span-10 md:col-start-2 md:mb-0 md:rounded-2xl xl:col-span-8 xl:col-start-3"
        >
          <div className="relative aspect-video w-full bg-[rgb(94,94,95)]">
            {poweredBy.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poweredBy.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              media
            )}
          </div>
        </ClipScroll>
        <div className="col-span-full flex flex-col gap-2 md:col-span-8 md:col-start-3 md:flex-row xl:col-span-6 xl:col-start-4">
          {poweredBy.cards.map((c, i) => (
            <article key={c.title} className="flex h-full flex-1 flex-col gap-4 md:-translate-y-20">
              <div
                ref={(el) => {
                  cards.current[i] = el
                }}
                className="h-full"
              >
                <div className="z-[2] flex h-full flex-col gap-6 rounded-lg bg-[var(--ent-card,#fff)] p-6 md:gap-8 md:rounded-2xl md:p-8">
                  <div
                    ref={(el) => {
                      icons.current[i] = el
                    }}
                    className="relative h-10 w-10 shrink-0"
                  >
                    {poweredBy.cardIcon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={poweredBy.cardIcon} alt="" className="h-10 w-10 object-contain" />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-[var(--ent-accent,#193A29)]" />
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-6">
                    <AnimatedText
                      ref={(h) => {
                        titles.current[i] = h
                      }}
                      as="h3"
                      className="w-full text-left text-[16px] font-medium leading-[1.45] tracking-[-0.01em] text-[color:var(--ent-fg,#000)]"
                    >
                      {c.title}
                    </AnimatedText>
                    <AnimatedText
                      ref={(h) => {
                        bodies.current[i] = h
                      }}
                      as="p"
                      className="w-full text-left text-[14px] leading-[1.35] tracking-[-0.01em] text-[color:var(--ent-fg,#000)] md:text-[16px] md:leading-[1.5]"
                    >
                      {c.body}
                    </AnimatedText>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CardLink({ href, children }: { href?: string; children: ReactNode }) {
  return href ? (
    <a href={href} className="relative block h-full cursor-pointer focus:outline focus:outline-1 focus:outline-[#86bff2]">
      {children}
    </a>
  ) : (
    <div className="relative block h-full">{children}</div>
  )
}

/*
 * EnterpriseBuiltToBeTrusted (module 270115). Heading header2. ClipScroll: startPercentage 10, startScale 1,
 * radius 1rem (.75 touch), end "center bottom" (as sampled live, see below); 800px (600 mobile) photo with a glass
 * card (bg black/45, 1px white/10 border, backdrop-blur-xl, shadow-2xl). Link cards below: BaseCardScroll
 * ("top bottom" -> "top 50%", scale .96 -> 1, opacity 0 -> 1), hover fill rises from the bottom (scale-y 0 -> 1,
 * 500ms ease-out).
 */
export function BuiltToBeTrusted({ content: trusted, media }: { content: TrustedContent; media?: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  const head = useRef<AnimatedTextHandle>(null)
  const overlay = useRef<AnimatedTextHandle>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const titles = useRef<(AnimatedTextHandle | null)[]>([])
  const bodies = useRef<(AnimatedTextHandle | null)[]>([])
  const ctas = useRef<(FlatCtaHandle | null)[]>([])
  const photo = useRef<HTMLDivElement>(null)

  useOnEnter(root, () => {
    head.current?.animateIn()
    overlay.current?.animateIn({ delay: 0.4 })
  })
  // Photo parallax over the whole section ("top bottom" -> "bottom top"): scale 1.5 -> 1.25, translateY 20% -> -20%.
  useEffect(() => {
    if (reduced()) return
    const apply = (p: number) => gsap.set(photo.current, { scale: map(p, 0, 1, 1.5, 1.25), translate: `0 ${-100 * map(p, 0, 1, -0.2, 0.2)}%` })
    apply(0)
    const st = ScrollTrigger.create({ trigger: root.current, start: 'top bottom', end: 'bottom top', onUpdate: (s) => apply(s.progress), onRefresh: (s) => apply(s.progress) })
    return () => st.kill()
  }, [])
  useLayoutEffect(() => {
    ctas.current.forEach((c) => c?.set())
  }, [])
  useEffect(() => {
    if (reduced()) return
    const n = cards.current.length
    const r = Math.min(0.1, 0.85 / Math.max(1, n - 1))
    const ease = gsap.parseEase('power2.out')
    let played = false
    const triggers = cards.current.map((el, i) => {
      if (!el) return null
      const a = i * r
      const apply = (p: number) => {
        const q = ease(map(p, a, a + (1 - (n - 1) * r), 0, 1))
        gsap.set(el, { scale: map(q, 0, 1, 0.96, 1), opacity: q })
      }
      apply(0)
      return ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'top 50%',
        onUpdate: (st) => apply(st.progress),
        onRefresh: (st) => apply(st.progress),
        onEnter: () => {
          if (played) return
          played = true
          trusted.cards.forEach((_, k) => {
            titles.current[k]?.animateIn({ delay: 0.075 + 0.045 * k })
            bodies.current[k]?.animateIn({ delay: 0.075 + 0.045 * k + 0.14 })
            ctas.current[k]?.animateIn({ duration: 0.85, delay: 0.1 * k + 0.5 })
          })
        },
      })
    })
    return () => triggers.forEach((t) => t?.kill())
  }, [])

  return (
    <section ref={root} className="EnterpriseBuiltToBeTrusted bg-[var(--ent-bg,#fff)] pt-[120px] text-[color:var(--ent-fg,#000)]">
      <div className="grid grid-cols-8 gap-2 px-6 md:grid-cols-12">
        <AnimatedText ref={head} as="h2" maskCompensation className="col-span-full pb-8 text-left text-[32px] font-normal leading-[1.05] tracking-[-0.01em] text-[color:var(--ent-fg,#000)] md:text-[64px]">
          {trusted.heading}
        </AnimatedText>
      </div>
      <ClipScroll
        startPercentage={10}
        startScale={1}
        borderRadius={1}
        // Source: scrollEnd isDesktop ? "center center" : "center bottom", but isDesktop (react-device-detect) is {}
        // on the first render and ClipScrollSection builds its trigger once, so live samples at 1440 run to
        // "center bottom" (inset 3.75% with the top at 800px, 0 by 500px). Matched to the live behaviour.
        scrollEnd="center bottom"
        className="mb-2 grid h-[600px] grid-cols-8 gap-2 px-6 pb-2 md:h-[800px] md:grid-cols-12"
        clipClassName="col-span-full"
      >
        <div className="relative flex h-full items-end justify-start p-8">
          <div ref={photo} className="absolute inset-0 bg-[rgb(151,137,103)]" role="img" aria-hidden>
            {trusted.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={trusted.image} alt="" className="h-full w-full object-cover" />
            ) : (
              media
            )}
          </div>
          <div className="relative w-full rounded-2xl border border-white/10 bg-black/45 px-8 py-8 shadow-2xl backdrop-blur-xl md:max-w-[748px] md:px-16 md:py-16">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
              <div className="min-w-0 flex-1 text-white">
                <AnimatedText ref={overlay} as="h6" className="text-[18px] font-normal leading-[1.05] tracking-[-0.01em] text-white md:text-[20px] md:leading-[1.5]">
                  {trusted.overlay}
                </AnimatedText>
              </div>
              {trusted.logos.length ? (
                <div className="flex w-full shrink-0 flex-col gap-4 md:w-[min(100%,20rem)]">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-white" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
                    <p className="text-[12px] font-medium uppercase leading-[1.5] tracking-wider text-white/80">{trusted.trustedBy}</p>
                  </div>
                  {/* Agency logos: items without `src` are neutral same-size placeholder tiles. */}
                  <ul className="flex gap-2">
                    {trusted.logos.map((l, k) => (
                      <li key={k} className="flex aspect-square h-14 w-14 items-center justify-center rounded-md bg-[rgba(234,234,234,0.2)] text-white md:h-16 md:w-16">
                        {l.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={l.src} alt={l.name} className="h-[60%] w-[60%] object-contain" />
                        ) : (
                          trusted.textLogos ? (
                            <span className="text-center font-mono text-[10px] uppercase leading-[1.2] tracking-[-0.01em] text-white/90">{l.name}</span>
                          ) : (
                            <div className="h-[30%] w-[55%] rounded-[3px] bg-white/80" aria-hidden />
                          )
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </ClipScroll>
      <div className="grid grid-cols-8 gap-2 px-6 md:grid-cols-12">
        {trusted.cards.map((c, i) => (
          <div key={c.title} className="col-span-full md:col-span-4">
            <div
              ref={(el) => {
                cards.current[i] = el
              }}
              className="h-full"
            >
              <div className="group/card relative h-full overflow-clip rounded-[8px] bg-[var(--ent-card-2,#F2F2F2)] text-[color:var(--ent-fg,#000)] xl:rounded-2xl">
                {/* Scale LinkCard: the card body is a CMSLink (anchor + 1px #86bff2 :focus outline) when the card has a
                    link, a plain div.CMSLink otherwise; the CTA inside is a button, so its click falls through. */}
                <CardLink href={c.cta?.href}>
                  <div className="absolute bottom-0 left-0 h-full w-full origin-bottom scale-y-0 transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover/card:scale-y-100" style={{ background: c.fill }} />
                  <div className="relative z-10 flex h-full flex-col justify-between gap-2 p-[24px] md:gap-4 xl:gap-8 xl:p-10">
                    <div className="flex items-center gap-2">
                      <div className="relative h-10 w-10 overflow-hidden md:h-16 md:w-16">
                        {c.icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={c.icon} alt="" className="h-full w-full object-contain" />
                        ) : null}
                      </div>
                    </div>
                    <AnimatedText
                      ref={(h) => {
                        titles.current[i] = h
                      }}
                      as="h5"
                      className="text-[18px] font-normal leading-[1.35] tracking-[-0.01em] text-[color:var(--ent-fg,#000)] xl:text-[24px] xl:leading-[1.5]"
                    >
                      {c.title}
                    </AnimatedText>
                    <div className="flex flex-1 flex-col justify-end gap-4">
                      <AnimatedText
                        ref={(h) => {
                          bodies.current[i] = h
                        }}
                        as="p"
                        className="text-[14px] leading-[1.45] tracking-[-0.01em] text-[color:var(--ent-fg-2,#212121)] xl:text-[16px] xl:leading-[1.5]"
                      >
                        {c.body}
                      </AnimatedText>
                      {c.cta ? (
                        <div className="pt-4">
                          <FlatCta
                            ref={(h) => {
                              ctas.current[i] = h
                            }}
                            as="button"
                            variant="border"
                            theme="gray"
                            href={c.cta.href}
                            text={c.cta.text}
                          />
                        </div>
                      ) : trusted.cards.some((k) => k.cta) ? (
                        // Scale equalises the description area across the row (md:min-h(--cg-desc-min-h)), so a card
                        // without a CTA keeps its description top-aligned with its siblings': reserve the CTA row.
                        <div aria-hidden className="hidden pt-4 md:block">
                          <div className="h-[37px]" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </CardLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
