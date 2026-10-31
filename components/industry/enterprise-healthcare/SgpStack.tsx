'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from '@/components/scale-clone/enterprise-healthcare/animatedText'
import { useRevealText } from '@/components/scale-clone/enterprise-healthcare/useRevealText'
import s from '@/components/scale-clone/enterprise-healthcare/healthcare.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * Vahue dark copy of the clone's SgpStack (components/scale-clone/enterprise-healthcare/SgpStack.tsx),
 * theme "light" -> Vahue dark, same motion:
 *   backdrop  scale 0.98 -> 1, origin center top, 1.15s power3.out scrubbed, "top bottom" -> "bottom 75%"
 *   cards     trigger = card, "top 85%": title AnimatedText + body "fade" animateIn; onLeaveBack animateOut
 *   section   "top center" onLeaveBack: every card animateOut, delay 0.1 i
 * Cards take an optional mono `meta` label (the phase length) beside the title.
 */

type Handle = { out: (d: number) => void }

function Card({ title, body, meta, index, handles }: { title: string; body: string; meta?: string; index: number; handles: { current: Handle[] } }) {
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
    <article ref={ref} className="flex min-h-[211px] flex-col justify-between gap-2 rounded-xl border border-border-soft bg-[#0b0b0b] p-8">
      <div className="flex w-full items-center justify-between gap-2">
        <h3 ref={h} className={`${s.header2b} ${s.pending} font-display font-normal text-white`}>
          {title}
        </h3>
        {meta ? <span className={`${s.detailMono} shrink-0 font-mono text-white/55`}>{meta}</span> : null}
      </div>
      <div className={`${s.body3} font-display text-white/70`}>
        <div ref={p} className={s.pending}>
          {body}
        </div>
      </div>
    </article>
  )
}

export default function SgpStack({ heading: headline, media, cards }: { heading: string; media: ReactNode; cards: { title: string; body: string; meta?: string }[] }) {
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
          <h2 ref={heading} className={`${s.header3} ${s.pending} mx-auto w-full max-w-[960px] text-center font-display font-normal text-white`}>
            {headline}
          </h2>
        </div>
      </div>
      <div className="relative py-5 pb-7 text-white md:px-10 md:py-10 md:pb-0 lg:pb-10">
        <div className={s.sgpGrid}>
          <div className={s.sgpMedia}>
            <div className="w-full max-w-[685px]">
              {media}
            </div>
          </div>
          <div className={s.sgpCards}>
            {cards.map((c, i) => (
              <Card key={c.title} {...c} index={i} handles={handles} />
            ))}
          </div>
        </div>
        <div ref={bg} className={s.sgpBg} style={{ transformOrigin: 'center top' }}>
          <div className="col-span-full h-full w-full rounded-2xl border border-border-soft bg-white/[0.04]" />
        </div>
      </div>
    </section>
  )
}
