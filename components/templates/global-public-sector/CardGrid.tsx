'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from '@/components/templates/about/animatedText'
import { MdIcon } from './icons'
import type { StatCard, ValueCard } from './content'
import s from './gps.module.css'

gsap.registerPlugin(ScrollTrigger)

const power2out = gsap.parseEase('power2.out')
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/** BaseCardScroll stagger (module 598042): r = min(.1, .85/(n-1)), card i maps progress [i r, i r + 1 - (n-1) r] -> [0, 1]. */
function stagger(p: number, i: number, n: number) {
  if (n <= 1) return p
  const r = Math.min(0.1, 0.85 / Math.max(1, n - 1))
  return clamp01((p - i * r) / (1 - (n - 1) * r))
}

/*
 * scale.com CardGrid (chunk 2xfd582q915vr.js module 540409) with plain `card`s (Card, same module) on BaseCardScroll
 * (module 317967 / 598042). Two instances on /global-public-sector:
 *   variant "value": HowScaleDeliversGrid (page chunk 25a4rb779kpr2.js module 927726): theme light, animationDirection up,
 *     columns 3, iconSize md (64px tile bg-black/5, 32px glyph text-black/70), title h3 header5-regular, body p
 *     body2-regular text-scale-gray-30.
 *   variant "stats": RSC CardGrid { theme light, iconSize sm (32px tile, 16px glyph), fluidLayout, animationDirection up }:
 *     grid-cols-6, `@container` cells col-span-2 with lg:min-h-[calc(100cqw*268/320)]; mono label; RichText (h2 value +
 *     highlightGray span) as one AnimatedText with min-h-16.
 * Both: directionalEntrance false (origin centre, no x), retroactiveOnEnter true (CardGrid default).
 *   per card, scrubbed: trigger card, "top bottom" -> "top 50%"; scale .96 -> 1, opacity 0 -> 1 (staggered window, power2.out)
 *   once, grid "top bottom" (retroactive; deferred while document.hidden, replayed on visibilitychange):
 *     Card.animateIn({ delay: .125, index: i }): icon tile clip inset(0 100% 0 0 round 10px) -> inset(0) .5s power1.out at
 *     .1 i + .125; glyph opacity 0 -> 1, 1s power1.out, +.1; title AnimatedText at .1 i + .125; body/RichText +.14 when
 *     there is a title. AnimatedText's built-in intro ignores the `duration: 2` the Card passes.
 * No pointer listeners (REA ev_55f8f9b4bdab…: none on .BaseCard); no hover styles.
 */
type Props = { variant: 'value'; cards: ValueCard[] } | { variant: 'stats'; cards: StatCard[] }

export default function CardGrid(props: Props) {
  const section = useRef<HTMLElement>(null)
  const count = props.cards.length

  useLayoutEffect(() => {
    const grid = section.current
    if (!grid) return
    const reduced = prefersReducedMotion()
    const texts: (AnimatedText | null)[][] = []
    let cancelled = false
    let offRetro = () => {}
    let offVis = () => {}
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]', grid)
    const ctx = gsap.context(() => {
      if (reduced) return
      cards.forEach((card, i) => {
        const apply = (p: number) => {
          const q = power2out(stagger(p, i, count))
          gsap.set(card, { scale: 0.96 + 0.04 * q, opacity: q, x: 0, y: 0 })
        }
        if (card.getBoundingClientRect().top >= innerHeight) apply(0)
        ScrollTrigger.create({
          trigger: card,
          start: 'top bottom',
          end: 'top 50%',
          onUpdate: ({ progress }) => apply(progress),
          onRefresh: ({ progress }) => apply(progress),
        })
        const tile = card.querySelector('[data-icon-box]')
        const glyph = card.querySelector('[data-icon]')
        if (tile) gsap.set(tile, { clipPath: 'inset(0% 100% 0% 0% round 10px)' })
        if (glyph) gsap.set(glyph, { opacity: 0 })
      })
    }, grid)

    document.fonts.ready.then(() => {
      if (cancelled) return
      cards.forEach((card) => {
        const t = card.querySelector<HTMLElement>('[data-title]')
        const b = card.querySelector<HTMLElement>('[data-body]')
        texts.push([t ? createAnimatedText(t) : null, b ? createAnimatedText(b, { descender: !b.classList.contains('RichText') }) : null])
      })
      if (reduced) return
      let started = false
      let pending = false
      const play = () => {
        if (started || cancelled) return
        started = true
        ctx.add(() => {
          cards.forEach((card, i) => {
            const d = 0.1 * i + 0.125
            const tile = card.querySelector('[data-icon-box]')
            const glyph = card.querySelector('[data-icon]')
            if (tile) gsap.to(tile, { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: d })
            if (glyph) gsap.to(glyph, { opacity: 1, duration: 1, ease: 'power1.out', delay: d + 0.1 })
            const [t, b] = texts[i] ?? []
            t?.animateIn({ delay: d })
            b?.animateIn({ delay: d + (t ? 0.14 : 0) })
          })
        })
      }
      const enter = () => {
        if (started || pending) return
        if (!document.hidden) return play()
        pending = true
        const onVis = () => {
          if (document.visibilityState !== 'visible') return
          document.removeEventListener('visibilitychange', onVis)
          play()
        }
        document.addEventListener('visibilitychange', onVis)
        offVis = () => document.removeEventListener('visibilitychange', onVis)
      }
      ctx.add(() => {
        const st = ScrollTrigger.create({ trigger: grid, start: 'top bottom', end: 'bottom 20%', onEnter: enter })
        const retro = () => {
          if (st.progress > 0 || st.scroll() >= st.start - 1) enter()
        }
        ScrollTrigger.addEventListener('refresh', retro)
        retro()
        offRetro = () => ScrollTrigger.removeEventListener('refresh', retro)
      })
    })

    return () => {
      cancelled = true
      offRetro()
      offVis()
      texts.flat().forEach((t) => t?.revert())
      ctx.revert()
    }
  }, [count])

  const fluid = props.variant === 'stats'
  return (
    <section
      ref={section}
      className="CardGrid w-full scroll-mt-28 py-12 xl:py-24"
    >
      <div className="mx-auto w-full">
        <div className={`CardGridContainer ${s.cardGrid} ${fluid ? s.cols6 : s.cols3}`}>
          {props.variant === 'value'
            ? props.cards.map((c) => (
                <div key={c.title} data-card className="BaseCard" style={{ transformOrigin: 'center center' }}>
                  <div className={`Card ${s.card} h-full`}>
                    <div className={`${s.cardInner} flex h-full flex-col justify-between gap-5 md:gap-16`}>
                      <div className="flex flex-col gap-5 md:gap-16">
                        <div className="flex items-center gap-2">
                          <div data-icon-box className="flex h-16 w-16 items-center justify-center rounded-md bg-black/5">
                            <span data-icon className="flex items-center justify-center">
                              <MdIcon name={c.icon} size={32} className="text-black/70" />
                            </span>
                          </div>
                        </div>
                        <h3 data-title className={`${s.header5} ${s.pending} font-display text-[var(--gps-fg-1)]`}>
                          {c.title}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-4">
                        <p data-body className={`${s.body2} ${s.pending} font-display text-[var(--gps-fg-3)]`}>
                          {c.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : props.cards.map((c) => (
                <div key={c.label} className={`${s.fluidCell} flex min-h-0 flex-col`}>
                  <div data-card className={`BaseCard flex min-h-0 w-full flex-1 flex-col ${s.fluidThird}`} style={{ transformOrigin: 'center center' }}>
                    <div className={`Card ${s.card} flex min-h-0 flex-1 flex-col`}>
                      <div className={`${s.cardInner} flex min-h-0 flex-1 flex-col justify-between gap-5 md:gap-16`}>
                        <div className="flex flex-col gap-5 md:gap-16">
                          <div className="flex items-center gap-2">
                            <div data-icon-box className="flex h-8 w-8 items-center justify-center rounded-md bg-black/5">
                              <span data-icon className="flex items-center justify-center">
                                <MdIcon name={c.icon} size={16} className="text-black/70" />
                              </span>
                            </div>
                            <p className="font-mono text-[14px] uppercase leading-[1.5] text-[var(--gps-fg-6)]">{c.label}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <div data-body className={`RichText ${s.pending} min-h-16 font-display`}>
                            <h2 className={`${s.statValue} text-[var(--gps-fg-1)]`}>{c.value}</h2>
                            <p className="text-[16px] leading-6">
                              <span className="text-[var(--gps-fg-6)]">{c.body}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}
