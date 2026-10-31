'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, mapRange, onEnter, prefersReducedMotion, type AnimatedText } from './motion'
import s from './styles.module.css'

gsap.registerPlugin(ScrollTrigger)

const ASSET = '/scale-clone/genai-portfolio'

export const ArrowRight = () => (
  <svg className="inline-block" width="9" height="8" viewBox="0 0 9 8" fill="none" aria-hidden="true">
    <path
      d="M8.64645 3.43929C8.84171 3.63456 8.84171 3.95114 8.64645 4.1464L5.35355 7.43929C5.15829 7.63456 4.84171 7.63456 4.64645 7.43929L4.29105 7.0839C4.09579 6.88864 4.09579 6.57206 4.29105 6.37679L5.27145 5.3964C5.58643 5.08142 5.36335 4.54285 4.91789 4.54285L0.5 4.54285C0.223858 4.54285 -1.51847e-07 4.31899 -1.63918e-07 4.04285L-1.85773e-07 3.54285C-1.97844e-07 3.2667 0.223857 3.04285 0.5 3.04285L4.91789 3.04285C5.36335 3.04285 5.58643 2.50428 5.27145 2.18929L4.29105 1.2089C4.09579 1.01364 4.09579 0.697055 4.29105 0.501793L4.64645 0.1464C4.84171 -0.0488622 5.15829 -0.0488622 5.35355 0.1464L8.64645 3.43929Z"
      fill="#1C1B1F"
    />
  </svg>
)

/*
 * ClipScrollSection: scrubbed "top bottom" -> "center center" (progressOffset maps progress 0..offset -> 0..1):
 * clip-path inset(lerp(start/2 -> 0)% round R rem), inner scale lerp(startScale -> 1).
 */
export function ClipScroll({
  children,
  startPercentage = 75,
  startScale = 1.25,
  radius = 1,
  backdrop = '#fff',
  progressOffset = 1,
  className = '',
  clipClassName = '',
}: {
  children: ReactNode
  startPercentage?: number
  startScale?: number
  radius?: number
  backdrop?: string | null
  progressOffset?: number
  className?: string
  clipClassName?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const set = (p: number) => {
      const c = mapRange(p, 0, progressOffset, 0.5 * startPercentage, 0)
      const k = mapRange(p, 0, progressOffset, startScale, 1)
      if (clip.current) clip.current.style.clipPath = `inset(${c}% round ${radius}rem)`
      if (inner.current) inner.current.style.transform = `scale(${k})`
    }
    if (prefersReducedMotion()) {
      set(1)
      return
    }
    set(0)
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top bottom',
      end: 'center center',
      onUpdate: (self) => set(self.progress),
      onRefresh: (self) => set(self.progress),
    })
    return () => st.kill()
  }, [startPercentage, startScale, radius, progressOffset])
  return (
    <div ref={root} className={`relative isolate w-full ${className}`} style={backdrop ? { backgroundColor: backdrop } : undefined}>
      <div ref={clip} className={`h-full w-full overflow-hidden ${clipClassName}`} style={{ clipPath: `inset(0 round ${radius}rem)` }}>
        <div ref={inner} className="h-full w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

/*
 * TwoColumnTextWithVideo, "videoFirst" variant: py-24, md:gap-y-16 (row gap 8 on phones). Copy isn't split
 * (Scale passes noSplit for videoFirst), so it renders static. Optional video sits in a ClipScroll
 * (startPercentage 20 -> inset 10%, scale 1.25 -> 1).
 */
export function TwoColumn({
  video,
  headingSpacer,
  left,
  right,
  cta,
  ctaColumn,
}: {
  video?: string
  headingSpacer?: boolean
  left: ReactNode
  right: ReactNode
  cta: string
  ctaColumn: 'left' | 'right'
}) {
  const link = (
    <div className="mt-6">
      <a href="#" className="flex items-center gap-1 align-middle text-sm font-medium leading-[21px] tracking-normal">
        {cta}
        <ArrowRight />
      </a>
    </div>
  )
  return (
    <section className="relative bg-white text-black">
      <div className={`${s.grid} w-full !py-24 sm:!gap-y-5 md:!gap-y-16`}>
        {video ? (
          <div className="order-1 col-span-full w-full overflow-clip rounded-2xl md:col-span-10 md:col-start-2">
            <ClipScroll startPercentage={20}>
              <video className="relative block aspect-video h-full min-h-full w-full object-cover md:min-h-0" src={video} autoPlay muted loop playsInline aria-hidden="true" />
            </ClipScroll>
          </div>
        ) : null}
        {headingSpacer ? <div className="order-2 col-span-full py-8 md:col-span-10 md:col-start-2" /> : null}
        <div className={`${headingSpacer ? 'order-3' : 'order-2'} col-span-full row-start-2 mt-6 pb-6 md:col-span-5 md:col-start-2 md:mt-0`}>
          {left}
          {ctaColumn === 'left' ? link : null}
        </div>
        <div className={`${headingSpacer ? 'order-4' : 'order-3'} col-span-full pb-6 md:col-span-4 md:col-start-8`}>
          {right}
          {ctaColumn === 'right' ? link : null}
        </div>
      </div>
    </section>
  )
}

/* ---------------- SgpStack ---------------- */

const CARD_ACCENTS = ['#79648c', '#a8927c', '#839cb2']
// TODO: Vahue copy
const STACK_CARDS = [
  {
    title: 'Your records',
    body: 'Pull from wikis, file shares, buckets and more. VAP shapes that data through tuned, purpose-built pipelines rather than a one-size-fits-all flow.',
  },
  {
    title: 'Your Cloud',
    body: 'Run safely inside your own VPC. Full support for AWS, Azure and GCP, with enterprise-grade controls at every layer.',
  },
  {
    title: 'Your models',
    body: 'Test, tune and ship across every major model family and provider. Swap without rebuilding. Tune without starting again.',
  },
]

function StackCard({ title, body, accent, index, register }: { title: string; body: string; accent: string; index: number; register: (i: number, api: CardApi) => void }) {
  const root = useRef<HTMLElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)
  const tri = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const tt = createAnimatedText(h.current as HTMLElement)
    const pp = createAnimatedText(p.current as HTMLElement, { variant: 'rise' })
    const reduced = prefersReducedMotion()
    const api: CardApi = {
      in: (d = 0) => {
        tt.animateIn({ delay: d })
        pp.animateIn({ delay: d })
        if (!reduced) gsap.fromTo(tri.current, { opacity: 0, y: 20, x: -10 }, { opacity: 1, y: 0, x: 0, delay: d, duration: 0.85, ease: 'power2.out' })
      },
      out: (d = 0) => {
        tt.animateOut({ delay: d })
        pp.animateOut({ delay: d })
        if (!reduced) gsap.to(tri.current, { opacity: 0, y: 20, x: -10, delay: d, duration: 0.85, ease: 'power2.out' })
      },
    }
    register(index, api)
    if (reduced) {
      gsap.set(tri.current, { opacity: 1 })
      return () => {
        tt.revert()
        pp.revert()
      }
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => api.in(0.25 * index),
      onLeaveBack: () => api.out(0.1 * index),
    })
    return () => {
      st.kill()
      tt.revert()
      pp.revert()
    }
  }, [index, register])
  return (
    <article ref={root} className="flex min-h-[211px] flex-col justify-between gap-2 rounded-xl bg-[#373737] p-8">
      <div className="flex w-full items-center justify-between gap-2">
        <h3 ref={h} className={`${s.header2b} ${s.pending} !leading-none !text-white`}>
          {title}
        </h3>
        <div ref={tri} className="h-[17px] w-[17px] opacity-0" style={{ color: accent }}>
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="inline-block h-full w-full align-top" aria-hidden="true">
            <path
              d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div className={`${s.body3} text-[#929292] tracking-normal`}>
        <div ref={p} className={s.pending}>
          {body}
        </div>
      </div>
    </article>
  )
}

type CardApi = { in: (d?: number) => void; out: (d?: number) => void }

/*
 * SgpStack: dark #212121 panel (rounded 16) scrubbed scale .98 -> 1 (origin center top, "top bottom" -> "bottom 75%").
 * Headline via HeadlineWithCta (IntersectionObserver -15%: title delay .5, subtitle 1).
 * Video fades in (1s) and restarts at "top center"; on leave-back it fades out and the cards animate out.
 * Cards: "top 85%" -> in with delay .25*i (title default, copy "rise", accent triangle 0.85s), leave-back -> out.
 */
export function Stack() {
  const root = useRef<HTMLElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const mediaWrap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const head = useRef<HTMLDivElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)
  const cards = useRef<CardApi[]>([])
  const register = useRef((i: number, api: CardApi) => {
    cards.current[i] = api
  }).current

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = prefersReducedMotion()
    const texts = [createAnimatedText(h.current as HTMLElement), createAnimatedText(p.current as HTMLElement)]
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(mediaWrap.current, { opacity: 1 })
        return
      }
      gsap.set(mediaWrap.current, { opacity: 0 })
      gsap.fromTo(
        panel.current,
        { scale: 0.98, transformOrigin: 'center top' },
        { scale: 1, duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom 75%', scrub: true } },
      )
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        onEnter: () => {
          gsap.to(mediaWrap.current, { opacity: 1, duration: 1 })
          const v = video.current
          if (v) {
            v.currentTime = 0
            v.play().catch(() => {})
          }
        },
        onLeaveBack: () => {
          gsap.to(mediaWrap.current, { opacity: 0, duration: 1 })
          video.current?.pause()
          cards.current.forEach((c, i) => c?.out(0.1 * i))
        },
      })
    }, el)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          texts[0].animateIn({ delay: 0.5 })
          texts[1].animateIn({ delay: 1 })
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    if (head.current) io.observe(head.current)
    return () => {
      io.disconnect()
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [])

  return (
    <section ref={root} data-nav-theme="dark" className={`${s.grid} relative isolate overflow-hidden bg-black !pb-7 pt-0 lg:!px-0`}>
      <div className="relative col-span-full py-5 pb-7 text-neutral-900 md:py-10 md:!pb-0 md:pl-10 md:pr-10 lg:col-span-12 lg:col-start-1">
        <div className={`${s.grid} ${s.gridDouble} md:!pb-10`}>
          <div className="relative z-[2] col-span-full pb-0 lg:col-span-12 lg:col-start-1 lg:self-start xl:col-span-7 xl:col-start-1">
            <div ref={head} className="flex flex-col items-start gap-6">
              {/* TODO: Vahue copy */}
              <h3 ref={h} className={`${s.header3} ${s.pending} w-full text-balance text-left !text-white md:mt-[-0.5rem]`}>
                You run the stack. We work inside it.
              </h3>
              {/* TODO: Vahue copy */}
              <div ref={p} className={`${s.pending} w-full text-pretty text-left text-sm leading-[21px] tracking-normal text-[#929292] md:text-base md:leading-6`}>
                VAP plugs into the tools, frameworks and models you already run. No migration. No change of vendor.
              </div>
            </div>
          </div>
          <div
            ref={mediaWrap}
            className="pointer-events-none z-[1] col-span-full flex items-center justify-center pb-10 lg:absolute lg:left-[45%] lg:h-full lg:w-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
          >
            <video ref={video} className="block aspect-square w-full object-contain" src={`${ASSET}/stack.webm`} muted loop playsInline preload="auto" />
          </div>
          <div className="relative z-[2] col-span-full flex flex-col gap-2 lg:col-span-7 lg:col-start-[18] lg:self-start">
            {STACK_CARDS.map((c, i) => (
              <StackCard key={i} title={c.title} body={c.body} accent={CARD_ACCENTS[i]} index={i} register={register} />
            ))}
          </div>
        </div>
        <div className={`${s.grid} ${s.gridDouble} absolute inset-0 z-0 h-full w-full max-lg:!p-0`}>
          <div ref={panel} className="col-span-full h-full w-full rounded-2xl bg-[#212121] lg:col-span-24" />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Section (evergreen) + CardGrid ---------------- */

// TODO: Vahue copy
const TRUST_CARDS = [
  {
    title: 'Every Source. Model-Ready.',
    body: 'Each agent is built and checked against your own house standards (your processes, your policies, your bar for good) before it ever reaches production.',
  },
  {
    title: 'Agent runtime + operations',
    body: 'We carry the full weight of running agents at company scale (long jobs, async work and many agents at once) so your team can stay on results instead of upkeep.',
  },
  {
    title: 'Dependable and auditable launch',
    body: 'Each agent that ships to production carries a complete audit log, cited sources and company-specific review built in, so you always know what it did and why.',
  },
]

const ease2 = gsap.parseEase('power2.out')
const stagger = (p: number, i: number, n: number) => {
  if (n <= 1) return p
  const r = Math.min(0.1, 0.85 / Math.max(1, n - 1))
  const a = i * r
  return mapRange(p, a, a + (1 - (n - 1) * r), 0, 1)
}

function TrustCard({ title, body, index, count }: { title: string; body: string; index: number; count: number }) {
  const root = useRef<HTMLDivElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const texts = [createAnimatedText(h.current as HTMLElement), createAnimatedText(p.current as HTMLElement)]
    const reduced = prefersReducedMotion()
    if (reduced) return () => texts.forEach((t) => t.revert())
    // BaseCardScroll: scrub "top bottom" -> "top 50%", eased power2.out, scale .96 -> 1, opacity 0 -> 1
    // directionalEntrance: first card slides in from -160px (origin right), last from +160px (origin left)
    const set = (prog: number) => {
      const n = window.innerWidth >= 1024 ? count : 1
      const e = ease2(stagger(prog, n > 1 ? index : 0, n))
      const dx = n <= 1 ? 0 : index === 0 ? -160 : index === n - 1 ? 160 : 0
      const origin = n <= 1 ? 'center center' : index === 0 ? 'right center' : index === n - 1 ? 'left center' : 'center center'
      gsap.set(el, { scale: mapRange(e, 0, 1, 0.96, 1), opacity: e, x: mapRange(e, 0, 1, dx, 0), transformOrigin: origin })
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'top 50%',
      onUpdate: (self) => set(self.progress),
      onRefresh: (self) => set(self.progress),
    })
    const enter = onEnter(el.closest('section') as Element, 'top bottom', () => {
      texts[0].animateIn({ delay: 0.125 + 0.1 * index })
      texts[1].animateIn({ delay: 0.125 + 0.1 * index + 0.14 })
    })
    return () => {
      st.kill()
      enter.kill()
      texts.forEach((t) => t.revert())
    }
  }, [index, count])
  return (
    <div ref={root} style={{ transformOrigin: 'center center' }}>
      <div className="Card h-full rounded-[8px] bg-white/[0.13] text-white xl:rounded-2xl">
        <div className="flex h-full flex-col justify-between gap-5 p-6 md:gap-16 xl:p-8">
          <div className="flex flex-col gap-5 md:gap-16">
            <div className="flex items-center gap-2" />
            <h3 ref={h} className={`${s.header5} ${s.pending} max-xl:!text-[18px] max-xl:!leading-[1.35]`}>
              {title}
            </h3>
          </div>
          <div ref={p} className={`${s.pending} text-base leading-6`}>
            {body}
          </div>
        </div>
      </div>
    </div>
  )
}

/*
 * Section (bg evergreen #193A29, py-16 / md:py-32, content xl:col 2-11, parallaxFadeOut):
 * scrubbed "bottom 100%" -> "bottom top": section yPercent 0 -> 20 (power3.in), inner opacity 1 -> 0 (none, from .15).
 * CardGrid heading animates in (delay .125) when the grid enters "top bottom".
 */
export function TrustCards() {
  const root = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const t = createAnimatedText(h.current as HTMLElement)
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      onEnter(el, 'top bottom', () => t.animateIn({ delay: 0.125 }))
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'bottom 100%', end: 'bottom top', scrub: true } })
        .to(el, { yPercent: 20, duration: 1, ease: 'power3.in' }, 0)
        .fromTo(inner.current, { opacity: 1 }, { opacity: 0, duration: 0.75, ease: 'none' }, 0.15)
    }, el)
    return () => {
      t.revert()
      ctx.revert()
    }
  }, [])
  return (
    <div ref={root} data-nav-theme="dark" className={`${s.grid} relative isolate overflow-hidden bg-[#193a29] !py-16 text-white md:!py-32`}>
      <div ref={inner} className="relative isolate col-span-full rounded-3xl md:col-span-12 md:col-start-1 xl:col-span-10 xl:col-start-2">
        <section className="w-full py-12 xl:py-24">
          <div className="mx-auto w-full">
            {/* TODO: Vahue copy */}
            <h3 ref={h} className={`${s.header3} ${s.pending} mb-[48px] w-4/5 text-center max-sm:mx-auto md:w-full xl:mb-16`}>
              Agents are simple to spin up and hard to rely on. (That’s the part we handle.)
            </h3>
            <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3">
              {TRUST_CARDS.map((c, i) => (
                <TrustCard key={i} title={c.title} body={c.body} index={i} count={TRUST_CARDS.length} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
