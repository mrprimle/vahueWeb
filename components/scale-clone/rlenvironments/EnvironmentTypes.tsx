'use client'

import { useLayoutEffect, useRef } from 'react'
import { ASSET, environmentTypes } from './content'
import { Glyph } from './icons'
import { gsap, ScrollTrigger, playCascade, prepareCascade, reducedMotion } from './motion'
import styles from './styles.module.css'

// scale.com EnterprisePillars (chunk 1pr295x5wseyf.js, module 909085). Static left column
// (mono overtitle, header2, body1, square looping video). On section `top 80%` (once):
//   icon tile opacity 0 -> 1, 0.5s (gsap default ease)
//   card i after setTimeout(i * 200ms): headline cascade delay 0.2 (word stagger 0.06),
//     subtitle cascade delay 0.4 (word stagger 0.03)
//   divider i: scaleX 0 -> 1, 0.5s, delay 0.2*i + 0.2 (origin left)
export default function EnvironmentTypes() {
  const section = useRef<HTMLElement>(null)
  const icons = useRef<(HTMLDivElement | null)[]>([])
  const titles = useRef<(HTMLHeadingElement | null)[]>([])
  const bodies = useRef<(HTMLParagraphElement | null)[]>([])
  const dividers = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    if (reducedMotion()) {
      gsap.set(dividers.current, { scaleX: 1 })
      return
    }
    let cancelled = false
    const timers: number[] = []
    const splits: { revert: () => void }[] = []
    const ctx = gsap.context(() => {
      gsap.set(icons.current, { opacity: 0 })
    }, section)
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx.add(() => {
        const t = titles.current.map((el) => el && prepareCascade(el))
        const b = bodies.current.map((el) => el && prepareCascade(el))
        ;[...t, ...b].forEach((x) => x && splits.push(x.split))
        ScrollTrigger.create({
          trigger: section.current,
          start: 'top 80%',
          end: 'bottom 20%',
          once: true,
          onEnter: () => {
            environmentTypes.cards.forEach((_, i) => {
              gsap.fromTo(icons.current[i], { opacity: 0 }, { opacity: 1, duration: 0.5 })
              const d = dividers.current[i]
              if (d) gsap.fromTo(d, { scaleX: 0 }, { scaleX: 1, duration: 0.5, delay: 0.2 * i + 0.2 })
              timers.push(
                window.setTimeout(() => {
                  if (cancelled) return
                  ctx.add(() => {
                    const ti = t[i]
                    const bi = b[i]
                    if (ti) playCascade(ti, 0.2, 0.06)
                    if (bi) playCascade(bi, 0.4, 0.03)
                  })
                }, i * 200),
              )
            })
          },
        })
      })
    })
    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
      ctx.revert()
      splits.forEach((sp) => sp.revert())
    }
  }, [])

  const cards = environmentTypes.cards
  return (
    <section ref={section} className="bg-white py-24 text-black">
      <div className={styles.gridLayout}>
        <div className="col-span-full flex flex-col items-start gap-6 md:col-span-5 md:col-start-2 md:justify-center">
          {/* TODO: Vahue copy */}
          <p className={`${styles.detailMono} font-mono tracking-[-0.01em] text-[#929292]`}>{environmentTypes.eyebrow}</p>
          {/* TODO: Vahue copy */}
          <h2 className={`${styles.header2} text-balance !font-normal tracking-[-0.01em] !text-black`}>{environmentTypes.title}</h2>
          {/* TODO: Vahue copy */}
          <p className={`${styles.body1} tracking-[-0.01em] text-[#575757]`}>{environmentTypes.body}</p>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
            <div className="absolute inset-0 h-full w-full overflow-clip">
              <video
                src={`${ASSET}/environment-types.mp4`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="block h-full min-h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="col-span-full flex flex-col gap-5 md:col-span-4 md:col-start-8 md:gap-10">
          {cards.map((card, i) => (
            <div key={card.title}>
              <article className="flex flex-col">
                <div
                  ref={(el) => {
                    icons.current[i] = el
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: card.color }}
                >
                  <span className="flex items-center justify-center text-white">
                    <Glyph name={card.icon} size={20} />
                  </span>
                </div>
                <div className="flex flex-col items-start gap-6 pt-6">
                  {/* TODO: Vahue copy */}
                  <h5
                    ref={(el) => {
                      titles.current[i] = el
                    }}
                    className={`${styles.header5} w-full text-left !font-normal tracking-[-0.01em] !text-black`}
                  >
                    {card.title}
                  </h5>
                  {/* TODO: Vahue copy */}
                  <p
                    ref={(el) => {
                      bodies.current[i] = el
                    }}
                    className="w-full text-left text-[14px] leading-[1.5] tracking-[-0.01em] text-black md:text-[16px]"
                  >
                    {card.body}
                  </p>
                </div>
              </article>
              {i !== cards.length - 1 ? (
                <div
                  ref={(el) => {
                    dividers.current[i] = el
                  }}
                  className="mt-5 h-px w-full origin-left scale-x-0 bg-[#eaeaea] md:mt-10"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
