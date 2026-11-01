'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, type AnimatedText } from './animatedText'
import FlatCta from './FlatCta'
import ScrollReveal from './ScrollReveal'
import { mapRange, prefersReducedMotion, useRetroEnter } from './scroll'
import type { HomeContent } from './content'
import s from './home.module.css'

gsap.registerPlugin(ScrollTrigger)

const power2out = gsap.parseEase('power2.out')

/*
 * ScrollRevealSection (backdrop gray-90 under md, panel white) > CardGrid (2k1qlgdxlbmz1.js sha256 bb51ad26…, modules 540409, 874328,
 * 598042) heading + 3 LinkCards with hoveredColor, animationDirection up, iconSize md, directionalEntrance false.
 *   Cards: trigger card "top bottom" -> "top 50%", staggered (r = min(.1, .85/(n-1))) + power2.out: scale .96 -> 1, opacity 0 -> 1.
 *   Intro (top bottom, retroactive; deferred while the tab is hidden): heading delay .125. LinkCard s = .05i + .125: icon box clip
 *     inset(0 100% 0 0 round 10px) -> 0 (.5s power1.out), glyph opacity (1s, s + .05), title (s + .16, tint colorIn), description
 *     (s + .34, tint colorIn), then the CTA opacity 0 / y 10 -> 1 / 0 (.5s power2.out).
 *   Hover (CSS, group-hover/card): colour layer scaleY 0 -> 1 from the bottom, 500ms ease-out; CTA bg black, text white, 500ms.
 */
export default function BenchmarkGrid({ content }: { content: HomeContent['benchmark'] }) {
  const root = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const texts = useRef<{ head?: AnimatedText; cards: AnimatedText[][] }>({ cards: [] })
  const played = useRef(false)
  const wanted = useRef(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = prefersReducedMotion()
    const t = texts.current
    const ctx = gsap.context(() => {
      if (heading.current) t.head = createAnimatedText(heading.current)
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]', el)
      const n = cards.length
      t.cards = cards.map((card, i) => {
        const colorIn = content.cards[i]?.hoveredColor
        const title = card.querySelector<HTMLElement>('[data-title]')
        const body = card.querySelector<HTMLElement>('[data-body]')
        return [title, body].filter((e): e is HTMLElement => !!e).map((e) => createAnimatedText(e, { colorIn }))
      })
      if (reduce) return
      cards.forEach((card, i) => {
        const r = Math.min(0.1, 0.85 / Math.max(1, n - 1))
        const a = i * r
        const apply = (p: number) => {
          const l = power2out(n > 1 ? mapRange(p, a, a + (1 - (n - 1) * r), 0, 1) : p)
          gsap.set(card, { scale: 0.96 + 0.04 * l, opacity: l })
        }
        ScrollTrigger.create({ trigger: card, start: 'top bottom', end: 'top 50%', onUpdate: (st) => apply(st.progress), onRefresh: (st) => apply(st.progress) })
        const box = card.querySelector('[data-icon-box]')
        const icon = card.querySelector('[data-icon]')
        const cta = card.querySelector('[data-cta]')
        if (box) gsap.set(box, { clipPath: 'inset(0% 100% 0% 0% round 10px)' })
        if (icon) gsap.set(icon, { opacity: 0 })
        if (cta) gsap.set(cta, { opacity: 0, y: 10 })
      })
    }, el)
    const onVis = () => {
      if (document.visibilityState === 'visible' && wanted.current && !played.current) play()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      t.head?.revert()
      t.cards.flat().forEach((x) => x.revert())
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const play = () => {
    if (played.current) return
    wanted.current = true
    if (document.hidden) return
    played.current = true
    const el = root.current
    if (!el) return
    const t = texts.current
    t.head?.animateIn({ delay: 0.125 })
    gsap.utils.toArray<HTMLElement>('[data-card]', el).forEach((card, i) => {
      const d = 0.05 * i + 0.125
      const box = card.querySelector('[data-icon-box]')
      const icon = card.querySelector('[data-icon]')
      const cta = card.querySelector('[data-cta]')
      if (box) gsap.to(box, { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: d })
      if (icon) gsap.to(icon, { opacity: 1, duration: 1, ease: 'power1.out', delay: d + 0.05 })
      Promise.all((t.cards[i] ?? []).map((x, k) => x.animateIn({ delay: d + 0.16 + 0.18 * k }))).then(() => {
        if (cta) gsap.to(cta, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      })
    })
  }
  useRetroEnter(root, play, { start: 'top bottom' })

  return (
    <ScrollReveal panelColor="#fff" className="bg-[#EAEAEA] md:bg-transparent">
      <div className={s.gridLayout}>
        <div className="col-span-full min-w-0 md:col-span-10 md:col-start-2" style={{ color: '#010101' }}>
          <section ref={root} className="CardGrid w-full scroll-mt-28 py-12 xl:py-24">
            <div className="mx-auto w-full">
              <h3 ref={heading} className={`${s.header3} ${s.pending} mb-[48px] w-4/5 text-left font-display font-normal text-inherit max-sm:mx-auto md:w-full xl:mb-16`}>
                {content.heading}
              </h3>
              <div className={s.cardGrid}>
                {content.cards.map((c) => (
                  <div key={c.title} data-card className="BaseCard" style={{ transformOrigin: 'center center' }}>
                    <div className="LinkCard group/card relative h-full overflow-clip rounded-[8px] bg-[#F2F2F2] text-black xl:rounded-2xl">
                      <Link href={c.cta.href} className={`${s.cardLink} block h-full focus:outline focus:outline-1 focus:outline-[#86bff2]`}>
                        <div aria-hidden className="absolute h-full w-full origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover/card:scale-y-100" style={{ backgroundColor: c.hoveredColor }} />
                        <div className="relative z-10 flex h-full flex-col justify-between gap-5 p-6 md:gap-6 xl:gap-16 xl:p-10">
                          <div className="flex items-center gap-2">
                            <div data-icon-box className="flex h-10 w-10 items-center justify-center rounded-xl bg-white md:h-16 md:w-16">
                              <span data-icon className="flex items-center justify-center" style={{ color: c.iconColor }}>
                                {c.icon}
                              </span>
                            </div>
                          </div>
                          <h5 data-title className={`${s.cardTitle} ${s.pending} font-display font-normal text-black`}>
                            {c.title}
                          </h5>
                          <div className="flex flex-1 flex-col justify-end gap-4">
                            <div data-body className={`${s.cardBody} ${s.pending} font-display text-[#212121]`}>
                              <p>{c.body}</p>
                            </div>
                            <div className="pt-4">
                              <span data-cta className="inline-block">
                                <FlatCta as="button" text={c.cta.text} variant="fill" theme="gray" className="transition-all duration-500 ease-out group-hover/card:bg-black group-hover/card:text-white" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </ScrollReveal>
  )
}
