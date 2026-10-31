'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText, { type AnimatedTextHandle } from './AnimatedText'
import { stats } from './content'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com Section (black, contentWidth medium) > CardGrid (chunk 2k1qlgdxlbmz1, module 270115 family) with
 * CMS props animationDirection "down", directionalEntrance true, fluidLayout true (grid-cols-6), iconSize "sm".
 * BaseCardScroll per card: ScrollTrigger "top bottom" -> "top 50%", scrubbed by progress p:
 *   stagger: r = min(.1, .85 / (n - 1)), p' = map(p, i*r .. i*r + 1 - (n-1) r, 0..1), eased power2.out
 *   scale 1.06 -> 1, opacity 0 -> 1, y 48 -> 0, x entranceTranslateX -> 0 (lg+ only: row edges +-160px,
 *   transform-origin right/left centre).
 * Section "top bottom" onEnter (retroactive): heading animateIn(.125); per card icon clip
 *   inset(0 100% 0 0 round 10px) -> inset(0 round 10px) (.5s power1.out, delay .1i + .125), icon opacity (1s, +.1),
 *   copy animateIn(delay .1i + .125).
 */

const ICONS: Record<string, ReactNode> = {
  clock: <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.71L11 12.41V7h2v4.59l3.71 3.71-1.42 1.41z" />,
  trend: <path d="m3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />,
  bank: <path d="M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zm-5-9L2 6v2h20V6z" />,
  swap: <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z" />,
  rocket: <path d="M12 2.5s4.5 2.04 4.5 10.5c0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7C7.5 4.54 12 2.5 12 2.5zm2 8.5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-6.31 9.52c-.48-1.23-1.52-4.17-1.67-6.87l-1.13.75c-.56.38-.89 1-.89 1.67V22l3.69-1.48zM20 22v-5.93c0-.67-.33-1.29-.89-1.66l-1.13-.75c-.15 2.69-1.2 5.64-1.67 6.87L20 22z" />,
}

const map = (v: number, a: number, b: number, c: number, d: number) => {
  const r = ((v - a) * (d - c)) / (b - a) + c
  return Math.min(Math.max(r, Math.min(c, d)), Math.max(c, d))
}
const ease = gsap.parseEase('power2.out')

// Fluid layout entrance: rows of 3 then 2; first card of a row comes from the left (-160), last from the right.
function entrance(i: number, n: number) {
  let idx: number
  let count: number
  if (i < 3) {
    idx = i
    count = 3
  } else {
    const start = 3 + 2 * Math.floor((i - 3) / 2)
    count = Math.min(2, n - start)
    idx = i - start
  }
  if (count <= 1) return { origin: 'center center', x: 0 }
  if (idx === 0) return { origin: 'right center', x: -160 }
  if (idx === count - 1) return { origin: 'left center', x: 160 }
  return { origin: 'center center', x: 0 }
}

export default function Stats() {
  const section = useRef<HTMLElement>(null)
  const heading = useRef<AnimatedTextHandle>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const icons = useRef<(HTMLDivElement | null)[]>([])
  const glyphs = useRef<(HTMLSpanElement | null)[]>([])
  const copies = useRef<(AnimatedTextHandle | null)[]>([])

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const n = stats.cards.length
    const ctx = gsap.context(() => {
      if (!reduce) {
        icons.current.forEach((el) => el && gsap.set(el, { clipPath: 'inset(0% 100% 0% 0% round 10px)' }))
        glyphs.current.forEach((el) => el && gsap.set(el, { opacity: 0 }))
        const lg = matchMedia('(min-width: 1024px)').matches
        cards.current.forEach((el, i) => {
          if (!el) return
          const ent = lg ? entrance(i, n) : { origin: 'center center', x: 0 }
          el.style.transformOrigin = ent.origin
          const r = Math.min(0.1, 0.85 / Math.max(1, n - 1))
          const a = i * r
          const apply = (p: number) => {
            const q = ease(map(p, a, a + (1 - (n - 1) * r), 0, 1))
            gsap.set(el, { scale: map(q, 0, 1, 1.06, 1), opacity: map(q, 0, 1, 0, 1), x: map(q, 0, 1, ent.x, 0), y: map(q, 0, 1, 48, 0) })
          }
          apply(0)
          ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'top 50%', onUpdate: (st) => apply(st.progress), onRefresh: (st) => apply(st.progress) })
        })
      }
      let played = false
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top bottom',
        onEnter: () => {
          if (played) return
          played = true
          heading.current?.ready().then(() => heading.current?.animateIn({ delay: 0.125 }))
          stats.cards.forEach((_, i) => {
            const d = 0.1 * i + 0.125
            gsap.to(icons.current[i], { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: d })
            gsap.to(glyphs.current[i], { opacity: 1, duration: 1, ease: 'power1.out', delay: d + 0.1 })
            copies.current[i]?.ready().then(() => copies.current[i]?.animateIn({ delay: d }))
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div data-nav-theme="dark" className="Section relative isolate grid grid-cols-8 gap-2 overflow-hidden bg-black px-6 text-white md:grid-cols-12">
      <div className="relative isolate col-span-full rounded-3xl md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3">
        <section ref={section} className="CardGrid w-full py-12 xl:py-24">
          <div className="mx-auto w-full">
            {/* TODO: Vahue copy */}
            <AnimatedText
              ref={heading}
              as="h2"
              maskCompensation
              className="mb-[48px] w-4/5 text-left text-[2rem] font-normal leading-[1.05] tracking-[-0.01em] text-white max-sm:mx-auto md:w-full md:text-[40px] md:leading-[44px] xl:mb-16"
            >
              {stats.heading}
            </AnimatedText>
            <div className="CardGridContainer flex grid-cols-6 flex-col gap-2 md:p-0 lg:grid">
              {stats.cards.map((c, i) => (
                <div key={c.label} className={`flex min-h-0 min-w-0 flex-col lg:h-full ${i < 3 ? 'col-span-full lg:col-span-2' : 'col-span-full lg:col-span-3'}`}>
                  <div
                    ref={(el) => {
                      cards.current[i] = el
                    }}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <div className="Card flex min-h-0 flex-1 flex-col rounded-[8px] bg-white/[0.13] text-white xl:rounded-2xl">
                      <div className="flex min-h-0 flex-1 flex-col justify-between gap-5 p-6 md:gap-16 xl:p-8">
                        <div className="flex items-center gap-2">
                          <div
                            ref={(el) => {
                              icons.current[i] = el
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-md bg-[#193A29]"
                            style={{ clipPath: 'inset(0% round 10px)' }}
                          >
                            <span
                              ref={(el) => {
                                glyphs.current[i] = el
                              }}
                              className="flex items-center justify-center"
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-white" aria-hidden>
                                {ICONS[c.icon]}
                              </svg>
                            </span>
                          </div>
                          {/* TODO: Vahue copy */}
                          <p className="font-mono text-[14px] uppercase leading-[1.5] tracking-[-0.01em] text-[#929292]">{c.label}</p>
                        </div>
                        <div className="flex flex-col gap-4 lg:pt-6">
                          {/* TODO: Vahue copy */}
                          <AnimatedText
                            ref={(h) => {
                              copies.current[i] = h
                            }}
                            className="min-h-16"
                          >
                            <h2 className="mb-2 text-[2rem] font-normal leading-[1.05] tracking-[-0.01em] text-white md:text-[40px] md:leading-[44px]">{c.value}</h2>
                            <p className="text-[16px] leading-[1.5] tracking-[-0.01em] text-[#929292]">{c.body}</p>
                          </AnimatedText>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
