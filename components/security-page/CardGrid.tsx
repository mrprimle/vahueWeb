'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion } from './animatedText'
import s from './security.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * Vahue /security control cards: the security clone's CardGrid (components/templates/security/CardGrid.tsx)
 * 1:1, Scale's colours; only the card title is an h3 instead of h5.
 *
 * scale.com CardGrid (chunk 2k1qlgdxlbmz1, "BaseCardScroll" + LinkCard), 3 cards, directionalEntrance off.
 *
 * Per card, scrubbed (trigger = card, "top bottom" -> "top 50%", scrub: true, pinSpacing false):
 *   staggered progress: r = min(0.1, 0.85 / (n - 1)), window [i*r, i*r + 1 - (n-1)*r], eased power2.out
 *   scale 0.96 -> 1, opacity 0 -> 1, transform-origin center center
 * One-shot, trigger = CardGrid section, "top bottom" (retroactive onEnter), e = 0.125, per card index i.
 * The commitment cards are `linkCard` slices, so the timing is LinkCard's (chunk 0c1-uups1drfu.js, module 874328),
 * not the plain Card's: s = 0.05i + e
 *   icon box  clip-path inset(0 100% 0 0 round 10px) -> inset(0 round 10px), 0.5s power1.out, delay s
 *   icon      opacity 0 -> 1, 1s power1.out, delay s + 0.05
 *   title     AnimatedText intro, delay s + 0.16; description AnimatedText intro, delay s + 0.16 + 0.18
 * If the tab is hidden when the grid enters, the intro waits for visibilitychange (module 540409).
 */

type Card = { icon: ReactNode; title: string; body: string }

const power2out = gsap.parseEase('power2.out')
const mapRange = (v: number, a: number, b: number, c: number, d: number) =>
  c + (d - c) * gsap.utils.clamp(0, 1, (v - a) / (b - a))

function stagger(p: number, i: number, n: number) {
  if (n <= 1) return p
  const r = Math.min(0.1, 0.85 / Math.max(1, n - 1))
  const a = i * r
  return mapRange(p, a, a + (1 - (n - 1) * r), 0, 1)
}

export default function CardGrid({ cards }: { cards: Card[] }) {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = section.current
    if (!root) return
    const reduced = prefersReducedMotion()
    const texts: ReturnType<typeof createAnimatedText>[][] = []
    let onVisible: (() => void) | null = null

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>('[data-card]', root)
      const n = cardEls.length

      cardEls.forEach((card) => {
        const title = card.querySelector<HTMLElement>('[data-title]')
        const body = card.querySelector<HTMLElement>('[data-body]')
        texts.push([
          ...(title ? [createAnimatedText(title, 'lines,words', true)] : []),
          ...(body ? [createAnimatedText(body, 'lines,words', true)] : []),
        ])
      })
      if (reduced) return

      cardEls.forEach((card, i) => {
        const apply = (p: number) => {
          const l = power2out(stagger(p, i, n))
          gsap.set(card, { scale: 0.96 + 0.04 * l, opacity: l })
        }
        ScrollTrigger.create({
          trigger: card,
          start: 'top bottom',
          end: 'top 50%',
          onUpdate: ({ progress }) => apply(progress),
          onRefresh: ({ progress }) => apply(progress),
        })
        const box = card.querySelector('[data-icon-box]')
        const icon = card.querySelector('[data-icon]')
        if (box) gsap.set(box, { clipPath: 'inset(0% 100% 0% 0% round 10px)' })
        if (icon) gsap.set(icon, { opacity: 0 })
      })

      let played = false
      let wanted = false
      const play = () => {
        if (played) return
        wanted = true
        if (document.hidden) return
        played = true
        cardEls.forEach((card, i) => {
          const d = 0.05 * i + 0.125
          const box = card.querySelector('[data-icon-box]')
          const icon = card.querySelector('[data-icon]')
          if (box) gsap.to(box, { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: d })
          if (icon) gsap.to(icon, { opacity: 1, duration: 1, ease: 'power1.out', delay: d + 0.05 })
          texts[i]?.forEach((t, k) => t.animateIn({ delay: d + 0.16 + 0.18 * k }))
        })
      }
      onVisible = () => {
        if (document.visibilityState === 'visible' && wanted && !played) play()
      }
      document.addEventListener('visibilitychange', onVisible)
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        once: true,
        onEnter: play,
        onRefresh: (self) => {
          if (self.progress > 0) play()
        },
      })
    }, root)

    return () => {
      if (onVisible) document.removeEventListener('visibilitychange', onVisible)
      texts.flat().forEach((t) => t.revert())
      ctx.revert()
    }
  }, [])

  return (
    <section ref={section} className="w-full scroll-mt-28 py-12 xl:py-24">
      <div className={s.cardGrid}>
        {cards.map((c, i) => (
          <div key={i} data-card className="origin-center">
            <div className="relative h-full overflow-clip rounded-[8px] bg-[#f2f2f2] text-black xl:rounded-2xl">
              <div className="relative z-10 flex h-full flex-col justify-between gap-5 p-6 md:gap-6 xl:gap-16 xl:p-10">
                <div className="flex items-center gap-2">
                  <div
                    data-icon-box
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.06] md:h-16 md:w-16"
                    style={{ clipPath: 'inset(0% round 10px)' }}
                  >
                    <span data-icon className="flex items-center justify-center">
                      {c.icon}
                    </span>
                  </div>
                </div>
                <h3 data-title className={`${s.cardTitle} ${s.pending} font-display font-normal text-black`}>
                  {c.title}
                </h3>
                <div className="flex flex-1 flex-col justify-start gap-4">
                  <div data-body className={`${s.cardBody} ${s.pending} font-display text-[#212121]`}>
                    {c.body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
