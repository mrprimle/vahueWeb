'use client'

import { useLayoutEffect, useRef } from 'react'
import { Glyph, type GlyphName } from './icons'
import { gsap, ScrollTrigger, playCascade, prepareCascade, reducedMotion } from './motion'
import { SectionHeader } from './SectionHeader'
import styles from './styles.module.css'

const ease = gsap.parseEase('power2.out')
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

// BaseCardScroll stagger window (chunk 1pr295x5wseyf.js, module 598042):
// l = min(0.1, 0.85 / (count - 1)); card i maps progress [i*l, i*l + 1 - (count-1)*l] -> [0, 1]
function staggered(p: number, i: number, count: number) {
  if (count <= 1) return p
  const l = Math.min(0.1, 0.85 / Math.max(1, count - 1))
  const a = i * l
  return clamp01((p - a) / (1 - (count - 1) * l))
}

// scale.com CardGrid of LinkCards, animationDirection "up", directionalEntrance (module 540409 + 874328):
//   per card, scrubbed: trigger card, `top bottom` -> `top 50%`; scale 0.96 -> 1, opacity 0 -> 1,
//     x -160 (first column, origin right) / +160 (last column, origin left) -> 0 at >= 1024px; power2.out on progress
//   once, section `top bottom` (retroactive): icon tile clip inset(0 100% 0 0 round 10px) -> inset(0) 0.5s power1.out
//     at 0.05*i + 0.125; glyph opacity 0 -> 1 1s power1.out (+0.05); title cascade (+0.16); body cascade (+0.18)
type Features = { eyebrow: string; title: string; cards: { icon: GlyphName; color: string; title: string; body: string }[] }

export default function FeatureCards({ features }: { features: Features }) {
  const section = useRef<HTMLElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const tiles = useRef<(HTMLDivElement | null)[]>([])
  const glyphs = useRef<(HTMLSpanElement | null)[]>([])
  const titles = useRef<(HTMLHeadingElement | null)[]>([])
  const bodies = useRef<(HTMLParagraphElement | null)[]>([])

  useLayoutEffect(() => {
    if (reducedMotion()) return
    let cancelled = false
    const splits: { revert: () => void }[] = []
    const count = features.cards.length
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add({ lg: '(min-width: 1024px)', sm: '(max-width: 1023px)' }, (c) => {
        const lg = !!c.conditions?.lg
        cards.current.forEach((card, i) => {
          if (!card) return
          const col = i % 4
          const tx = lg ? (col === 0 ? -160 : col === 3 ? 160 : 0) : 0
          card.style.transformOrigin = !lg || tx === 0 ? 'center center' : tx < 0 ? 'right center' : 'left center'
          const set = (p: number) => {
            const r = ease(staggered(p, i, count))
            gsap.set(card, { scale: 0.96 + 0.04 * r, opacity: r, x: tx * (1 - r), y: 0 })
          }
          set(0)
          ScrollTrigger.create({
            trigger: card,
            start: 'top bottom',
            end: 'top 50%',
            onUpdate: (self) => set(self.progress),
            onRefresh: (self) => set(self.progress),
          })
        })
        return () => cards.current.forEach((card) => card && gsap.set(card, { clearProps: 'all' }))
      })
      gsap.set(tiles.current, { clipPath: 'inset(0% 100% 0% 0% round 10px)' })
      gsap.set(glyphs.current, { opacity: 0 })
    }, section)

    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx.add(() => {
        // In the cards Scale's line masks add 0.125em between lines (measured: 24px title lines
        // step 39px, 16px body lines step 26px) while the block keeps n*lh + (n-1)*0.125em.
        const pad = (el: HTMLElement | null) => {
          if (!el) return null
          const c = prepareCascade(el)
          gsap.set(c.split.masks, { paddingTop: '0.0625em', paddingBottom: '0.0625em' })
          gsap.set(el, { marginTop: '-0.0625em', marginBottom: '-0.0625em' })
          return c
        }
        const t = titles.current.map(pad)
        const b = bodies.current.map(pad)
        ;[...t, ...b].forEach((x) => x && splits.push(x.split))
        ScrollTrigger.create({
          trigger: section.current,
          start: 'top bottom',
          once: true,
          onEnter: () => {
            features.cards.forEach((_, i) => {
              const s = 0.05 * i + 0.125
              gsap.to(tiles.current[i], { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: s })
              gsap.to(glyphs.current[i], { opacity: 1, duration: 1, ease: 'power1.out', delay: s + 0.05 })
              const c = s + 0.16
              const ti = t[i]
              const bi = b[i]
              if (ti) playCascade(ti, c)
              if (bi) playCascade(bi, c + 0.18)
            })
          },
        })
      })
    })
    return () => {
      cancelled = true
      ctx.revert()
      splits.forEach((sp) => sp.revert())
    }
  }, [])

  return (
    <div className="mx-auto w-full max-w-[1472px] px-6">
      <SectionHeader eyebrow={features.eyebrow} title={features.title} />
      <section ref={section} className="w-full py-12 xl:py-24">
        <div className="mx-auto w-full">
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-4">
            {features.cards.map((card, i) => (
              <div
                key={card.title}
                ref={(el) => {
                  cards.current[i] = el
                }}
              >
                <div className="relative h-full overflow-clip rounded-[8px] bg-[#f2f2f2] text-black xl:rounded-2xl">
                  <div className="relative z-10 flex flex-col justify-between gap-5 p-6 md:gap-6 xl:gap-16 xl:p-10">
                    <div className="flex items-center gap-2">
                      <div
                        ref={(el) => {
                          tiles.current[i] = el
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.06] md:h-16 md:w-16"
                      >
                        <span
                          ref={(el) => {
                            glyphs.current[i] = el
                          }}
                          className="flex items-center justify-center"
                        >
                          <Glyph name={card.icon} size={32} color={card.color} />
                        </span>
                      </div>
                    </div>
                    <h5
                      ref={(el) => {
                        titles.current[i] = el
                      }}
                      className={`${styles.header5} ${styles.cardTitle} !font-normal tracking-[-0.01em] !text-black`}
                    >
                      {card.title}
                    </h5>
                    <div className="flex flex-1 flex-col justify-end gap-4">
                        <p
                        ref={(el) => {
                          bodies.current[i] = el
                        }}
                        className="text-[16px] leading-6 tracking-[-0.01em] text-[#212121]"
                      >
                        {card.body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
