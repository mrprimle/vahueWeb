'use client'

import { useEffect, useImperativeHandle, useRef, forwardRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, mapRange, prefersReducedMotion } from './motion'
import s from './styles.module.css'

gsap.registerPlugin(ScrollTrigger)

export const ArrowRight = () => (
  <svg className="inline-block" width="9" height="8" viewBox="0 0 9 8" fill="none" aria-hidden="true">
    <path
      d="M8.64645 3.43929C8.84171 3.63456 8.84171 3.95114 8.64645 4.1464L5.35355 7.43929C5.15829 7.63456 4.84171 7.63456 4.64645 7.43929L4.29105 7.0839C4.09579 6.88864 4.09579 6.57206 4.29105 6.37679L5.27145 5.3964C5.58643 5.08142 5.36335 4.54285 4.91789 4.54285L0.5 4.54285C0.223858 4.54285 -1.51847e-07 4.31899 -1.63918e-07 4.04285L-1.85773e-07 3.54285C-1.97844e-07 3.2667 0.223857 3.04285 0.5 3.04285L4.91789 3.04285C5.36335 3.04285 5.58643 2.50428 5.27145 2.18929L4.29105 1.2089C4.09579 1.01364 4.09579 0.697055 4.29105 0.501793L4.64645 0.1464C4.84171 -0.0488622 5.15829 -0.0488622 5.35355 0.1464L8.64645 3.43929Z"
      fill="currentColor"
    />
  </svg>
)

export const Eyebrow = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`${s.mono} font-mono tracking-[0.05em] text-white/45 ${className}`}>{children}</p>
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
  backdrop = '#020202',
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
 * TwoColumnTextWithVideo, "videoFirst" variant, on Vahue dark: py-24, md:gap-y-16 (row gap 8 on phones). Copy isn't
 * split (Scale passes noSplit for videoFirst), so it renders static. Optional media sits in a ClipScroll
 * (startPercentage 20 -> inset 10%, scale 1.25 -> 1).
 */
export function TwoColumn({
  media,
  headingSpacer,
  left,
  right,
  cta,
  ctaColumn,
}: {
  media?: ReactNode
  headingSpacer?: ReactNode | boolean
  left: ReactNode
  right: ReactNode
  cta: { href: string; label: string }
  ctaColumn: 'left' | 'right'
}) {
  const link = (
    <div className="mt-6">
      <a href={cta.href} className="flex w-fit items-center gap-1 align-middle text-sm font-medium leading-[21px] tracking-normal text-white transition-colors duration-300 hover:text-white/70">
        {cta.label}
        <ArrowRight />
      </a>
    </div>
  )
  return (
    <section className="relative bg-bg text-white">
      <div className={`${s.grid} w-full !py-24 sm:!gap-y-5 md:!gap-y-16`}>
        {media ? (
          <div className="order-1 col-span-full w-full overflow-clip rounded-2xl md:col-span-10 md:col-start-2">
            <ClipScroll startPercentage={20}>{media}</ClipScroll>
          </div>
        ) : null}
        {headingSpacer ? (
          <div className="order-2 col-span-full flex min-h-16 items-end py-8 md:col-span-10 md:col-start-2">{headingSpacer === true ? null : headingSpacer}</div>
        ) : null}
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

/* ---------------- Converge: Vahue drawing for the before/after panel (in place of Scale's stack video) ---------------- */

type ConvergeHandle = { play: () => void; reset: () => void }

const DOTS = 7 * 7
// Deterministic scatter so server and client render the same positions.
const scatter = (i: number) => {
  const a = Math.sin(i * 12.9898) * 43758.5453
  const b = Math.sin(i * 78.233) * 12345.6789
  return { x: 60 + (a - Math.floor(a)) * 480, y: 60 + (b - Math.floor(b)) * 480 }
}
const target = (i: number) => ({ x: 150 + (i % 7) * 50, y: 150 + Math.floor(i / 7) * 50 })

const Converge = forwardRef<ConvergeHandle>(function Converge(_, ref) {
  const dots = useRef<(SVGCircleElement | null)[]>([])
  const frame = useRef<SVGRectElement>(null)
  useImperativeHandle(ref, () => ({
    play() {
      dots.current.forEach((d, i) => {
        if (!d) return
        const t = target(i)
        gsap.to(d, { attr: { cx: t.x, cy: t.y }, opacity: 1, duration: 1.4, ease: 'power3.inOut', delay: 0.15 + (i % 7) * 0.03 + Math.floor(i / 7) * 0.02, overwrite: true })
      })
      gsap.to(frame.current, { opacity: 1, duration: 0.8, delay: 1.2, overwrite: true })
    },
    reset() {
      dots.current.forEach((d, i) => {
        if (!d) return
        const p = scatter(i)
        gsap.to(d, { attr: { cx: p.x, cy: p.y }, opacity: 0.45, duration: 1, ease: 'power2.inOut', overwrite: true })
      })
      gsap.to(frame.current, { opacity: 0, duration: 0.5, overwrite: true })
    },
  }))
  return (
    <svg viewBox="0 0 600 600" className="block aspect-square w-full" aria-hidden="true">
      <rect ref={frame} x={120} y={120} width={360} height={360} rx={20} fill="none" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 8" style={{ opacity: 0 }} />
      {Array.from({ length: DOTS }).map((_, i) => {
        const p = scatter(i)
        return (
          <circle
            key={i}
            ref={(el) => {
              dots.current[i] = el
            }}
            cx={p.x}
            cy={p.y}
            r={i % 9 === 0 ? 7 : 5}
            fill={i % 9 === 0 ? '#ffffff' : 'rgba(255,255,255,0.55)'}
            style={{ opacity: 0.45 }}
          />
        )
      })}
    </svg>
  )
})

/* ---------------- SgpStack -> before and after ---------------- */

const CARD_ACCENTS = ['rgba(255,255,255,0.85)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.45)']
type CardApi = { in: (d?: number) => void; out: (d?: number) => void }

function StackCard({ title, body, accent, index, register }: { title: string; body?: string; accent: string; index: number; register: (i: number, api: CardApi) => void }) {
  const root = useRef<HTMLElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)
  const tri = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const tt = createAnimatedText(h.current as HTMLElement)
    const pp = p.current ? createAnimatedText(p.current, { variant: 'rise' }) : null
    const reduced = prefersReducedMotion()
    const api: CardApi = {
      in: (d = 0) => {
        tt.animateIn({ delay: d })
        pp?.animateIn({ delay: d })
        if (!reduced) gsap.fromTo(tri.current, { opacity: 0, y: 20, x: -10 }, { opacity: 1, y: 0, x: 0, delay: d, duration: 0.85, ease: 'power2.out' })
      },
      out: (d = 0) => {
        tt.animateOut({ delay: d })
        pp?.animateOut({ delay: d })
        if (!reduced) gsap.to(tri.current, { opacity: 0, y: 20, x: -10, delay: d, duration: 0.85, ease: 'power2.out' })
      },
    }
    register(index, api)
    if (reduced) {
      gsap.set(tri.current, { opacity: 1 })
      return () => {
        tt.revert()
        pp?.revert()
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
      pp?.revert()
    }
  }, [index, register])
  return (
    <article ref={root} className="flex min-h-[211px] flex-col justify-between gap-2 rounded-xl border border-border-soft bg-white/[0.06] p-8">
      <div className="flex w-full items-start justify-between gap-2">
        <h3 ref={h} className={`${s.header2b} ${s.pending} !leading-[1.15] text-white`}>
          {title}
        </h3>
        <div ref={tri} className="h-[17px] w-[17px] shrink-0 opacity-0" style={{ color: accent }}>
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="inline-block h-full w-full align-top" aria-hidden="true">
            <path
              d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      {body ? (
        <div className={`${s.body3} tracking-normal text-white/55`}>
          <div ref={p} className={s.pending}>
            <span className="text-white/35">Before: </span>
            {body}
          </div>
        </div>
      ) : null}
    </article>
  )
}

/*
 * SgpStack: dark panel (rounded 16) scrubbed scale .98 -> 1 (origin center top, "top bottom" -> "bottom 75%").
 * Headline via HeadlineWithCta (IntersectionObserver -15%: title delay .5, subtitle 1).
 * The drawing fades in (1s) and plays at "top center"; on leave-back it fades out, resets and the cards animate out.
 * Cards: "top 85%" -> in with delay .25*i (title default, copy "rise", accent triangle 0.85s), leave-back -> out.
 * Here each card pairs an "after" outcome (title) with the "before" it replaces (body).
 */
export function Stack({ eyebrow, title, subtitle, after, before }: { eyebrow: string; title: string; subtitle: string; after: string[]; before: string[] }) {
  const root = useRef<HTMLElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const mediaWrap = useRef<HTMLDivElement>(null)
  const drawing = useRef<ConvergeHandle>(null)
  const head = useRef<HTMLDivElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)
  const cards = useRef<CardApi[]>([])
  const register = useRef((i: number, api: CardApi) => {
    cards.current[i] = api
  }).current
  const count = Math.max(after.length, before.length)
  const pairs = Array.from({ length: count }, (_, i) => ({ title: after[i] ?? before[i], body: after[i] ? before[i] : undefined }))

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = prefersReducedMotion()
    const texts = [createAnimatedText(h.current as HTMLElement), createAnimatedText(p.current as HTMLElement)]
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(mediaWrap.current, { opacity: 1 })
        drawing.current?.play()
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
          drawing.current?.play()
        },
        onLeaveBack: () => {
          gsap.to(mediaWrap.current, { opacity: 0, duration: 1 })
          drawing.current?.reset()
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
    <section ref={root} className={`${s.grid} relative isolate overflow-hidden bg-bg !pb-7 pt-0 lg:!px-0`}>
      <div className="relative col-span-full py-5 pb-7 md:py-10 md:!pb-0 md:pl-10 md:pr-10 lg:col-span-12 lg:col-start-1">
        <div className={`${s.grid} ${s.gridDouble} md:!pb-10`}>
          <div className="relative z-[2] col-span-full pb-0 lg:col-span-12 lg:col-start-1 lg:self-start xl:col-span-7 xl:col-start-1">
            <div ref={head} className="flex flex-col items-start gap-6">
              <Eyebrow className="md:mt-[-0.5rem]">{eyebrow}</Eyebrow>
              <h2 ref={h} className={`${s.header3} ${s.pending} w-full text-balance text-left text-white`}>
                {title}
              </h2>
              <div ref={p} className={`${s.pending} w-full text-pretty text-left text-sm leading-[21px] tracking-normal text-white/55 md:text-base md:leading-6`}>
                {subtitle}
              </div>
            </div>
          </div>
          <div
            ref={mediaWrap}
            className="pointer-events-none z-[1] col-span-full flex items-center justify-center pb-10 lg:absolute lg:left-[45%] lg:h-full lg:w-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
          >
            <div className="w-full max-w-[720px]">
              <Converge ref={drawing} />
            </div>
          </div>
          <div className="relative z-[2] col-span-full flex flex-col gap-2 lg:col-span-7 lg:col-start-[18] lg:self-start">
            {pairs.map((c, i) => (
              <StackCard key={i} title={c.title} body={c.body} accent={CARD_ACCENTS[i % CARD_ACCENTS.length]} index={i} register={register} />
            ))}
          </div>
        </div>
        <div className={`${s.grid} ${s.gridDouble} absolute inset-0 z-0 h-full w-full max-lg:!p-0`}>
          <div ref={panel} className="hero-texture col-span-full h-full w-full rounded-2xl border border-border-soft bg-[#0d0d0e] lg:col-span-24" />
        </div>
      </div>
    </section>
  )
}
