'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './animatedText'
import { useRevealText } from './useRevealText'
import s from './healthcare.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com SgpStack, theme "light", headingPosition "above", mediaType "healthcareIllustration"
 * (chunk 0sni47mcvnqwg.js modules 290276 + 892353).
 *   backdrop  scale 0.98 -> 1, origin center top, 1.15s power3.out scrubbed, trigger = section,
 *             "top bottom" -> "bottom 75%" (sampled 0.98 / 0.986 / 0.9983 / 1)
 *   cards     each card: trigger = card, "top 85%": title AnimatedText (default) + body ("fade" custom
 *             animation) animateIn, delay 0.25 * cardIndex (cardIndex is never passed -> 0);
 *             onLeaveBack: animateOut
 *   section   "top center" onLeaveBack: every card animateOut, delay 0.1 i
 * Illustration (HealthcareLeadingSystemsIllustration, animation "gsap"): 736x691 stage scaled to the
 * container width (offsetWidth / 736); three layers float y 0 -> -6, yoyo, repeat -1, sine.inOut,
 * duration = cssDuration / 2 (3.25 / 4.25 / 3.5s), delay |cssDelay| (4 / 2.5 / 0s); tweens play on
 * enter/enterBack and pause on leave/leaveBack (trigger "top 80%" -> "bottom 20%").
 */

const ASSET = '/scale-clone/enterprise-healthcare'
const layers = [
  { key: 'diagram', left: 10, top: 6, width: 719, height: 453.5, z: 30, duration: 6.5, delay: -4 },
  { key: 'dashboard', left: 6, top: 188, width: 723.5, height: 456, z: 20, duration: 8.5, delay: -2.5 },
  { key: 'avatars', left: 122, top: 402, width: 489.75, height: 282.75, z: 10, duration: 7, delay: 0 },
]

function Illustration() {
  const box = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const items = useRef<HTMLDivElement[]>([])
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setScale(el.offsetWidth / 736)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion() || !stage.current) return
    const tweens = layers.map((l, i) =>
      gsap.to(items.current[i], { y: -6, duration: l.duration / 2, delay: Math.abs(l.delay), ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true }),
    )
    const play = () => tweens.forEach((t) => t.play())
    const pause = () => tweens.forEach((t) => t.pause())
    const st = ScrollTrigger.create({
      trigger: stage.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: play,
      onEnterBack: play,
      onLeave: pause,
      onLeaveBack: pause,
      onRefresh: (self) => {
        if (self.isActive) play()
      },
    })
    return () => {
      st.kill()
      tweens.forEach((t) => t.kill())
    }
  }, [])

  return (
    <div ref={box} aria-hidden="true" className="relative w-full overflow-hidden" style={{ aspectRatio: '736 / 691' }}>
      <div ref={stage} className="absolute left-0 top-0 origin-top-left" style={{ width: 736, height: 691, transform: `scale(${scale})` }}>
        {layers.map((l, i) => (
          <div
            key={l.key}
            ref={(el) => {
              if (el) items.current[i] = el
            }}
            className="absolute"
            style={{ left: l.left, top: l.top, width: l.width, height: l.height, zIndex: l.z }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ASSET}/layer-${l.key}.webp`} alt="" className="absolute inset-0 h-full w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}

// TODO: Vahue copy
const cards = [
  {
    title: 'Placeholder card title about teams',
    body: 'Placeholder description of embedded teams working inside the organization, accountable for outcomes, not just delivery.',
  },
  {
    title: 'Placeholder card title about value',
    body: 'Placeholder description of evaluations and domain experts that encode knowledge to keep improving each agent over time.',
  },
  {
    title: 'Placeholder title, on your terms',
    body: 'Placeholder description of connecting to existing systems and data. No migration required, and it works with any model.',
  },
]

type Handle = { out: (d: number) => void }

function Card({ title, body, index, handles }: { title: string; body: string; index: number; handles: { current: Handle[] } }) {
  const ref = useRef<HTMLElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !h.current || !p.current) return
    const texts: AnimatedText[] = [
      createAnimatedText(h.current),
      createAnimatedText(p.current, { variant: 'fade' }),
    ]
    handles.current[index] = { out: (delay) => texts.forEach((t) => t.animateOut({ delay })) }
    if (prefersReducedMotion()) return
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => texts.forEach((t) => t.animateIn({ delay: 0 })),
      onLeaveBack: () => texts.forEach((t) => t.animateOut({ delay: 0 })),
      onRefresh: (self) => {
        if (self.progress > 0) texts.forEach((t) => t.animateIn({ delay: 0 }))
      },
    })
    return () => {
      st.kill()
      texts.forEach((t) => t.revert())
    }
  }, [index, handles])

  return (
    <article ref={ref} className="flex min-h-[211px] flex-col justify-between gap-2 rounded-xl bg-white p-8">
      <div className="flex w-full items-center justify-between gap-2">
        {/* TODO: Vahue copy */}
        <h3 ref={h} className={`${s.header2b} ${s.pending} font-display font-normal text-[#212121]`}>
          {title}
        </h3>
      </div>
      <div className={`${s.body3} font-display text-[#575757]`}>
        {/* TODO: Vahue copy */}
        <div ref={p} className={s.pending}>
          {body}
        </div>
      </div>
    </article>
  )
}

export default function SgpStack() {
  const section = useRef<HTMLElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const handles = useRef<Handle[]>([])
  useRevealText(heading)

  useEffect(() => {
    const root = section.current
    if (!root) return
    if (prefersReducedMotion()) {
      gsap.set(bg.current, { scale: 1 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg.current,
        { scale: 0.98, transformOrigin: 'center top' },
        { scale: 1, duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom 75%', scrub: true } },
      )
      ScrollTrigger.create({
        trigger: root,
        start: 'top center',
        onLeaveBack: () => handles.current.forEach((h, i) => h.out(0.1 * i)),
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={section} className="relative isolate grid grid-cols-1 gap-2 overflow-hidden bg-transparent px-6 pb-7 pt-0 lg:px-0">
      <div className="mb-10 text-center md:mb-6">
        <div className="flex flex-col items-center gap-6">
          {/* TODO: Vahue copy */}
          <h3 ref={heading} className={`${s.header3} ${s.pending} mx-auto w-full max-w-[960px] text-center font-display font-normal text-[#212121]`}>
            Placeholder headline about the reliability layer
          </h3>
        </div>
      </div>
      <div className="relative py-5 pb-7 text-neutral-900 md:px-10 md:py-10 md:pb-0 lg:pb-10">
        <div className={s.sgpGrid}>
          <div className={s.sgpMedia}>
            <div className="w-full max-w-[685px]">
              <Illustration />
            </div>
          </div>
          <div className={s.sgpCards}>
            {cards.map((c, i) => (
              <Card key={c.title} {...c} index={i} handles={handles} />
            ))}
          </div>
        </div>
        <div ref={bg} className={s.sgpBg} style={{ transformOrigin: 'center top' }}>
          <div className="col-span-full h-full w-full rounded-2xl bg-[#f2f2f2]" />
        </div>
      </div>
    </section>
  )
}
