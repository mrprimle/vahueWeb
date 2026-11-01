'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, playCascade, prepareCascade, reducedMotion, retroactiveEnter, whenVisible } from '@/components/scale-clone/rlenvironments/motion'
import type { CardGridContent, ExpertCard } from './content'
import s from './experts.module.css'

const ease = gsap.parseEase('power2.out')
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

// BaseCardScroll stagger window (module 598042): l = min(0.1, 0.85 / (count - 1)); card i maps progress
// [i*l, i*l + 1 - (count-1)*l] -> [0, 1], then power2.out.
function staggered(p: number, i: number, count: number) {
  if (count <= 1) return p
  const l = Math.min(0.1, 0.85 / Math.max(1, count - 1))
  return clamp01((p - i * l) / (1 - (count - 1) * l))
}

// Icons (page chunk 3z_q0c19dxjc-.js, module 794721): a 64x64 white tile (rx 12) with a Material glyph at
// translate(16,16) scale(32/24). The LinkCard renders it at 100% of its icon box (64, 40 below md).
const GLYPHS: Record<ExpertCard['icon'], { color: string; paths: string[] }> = {
  academic: { color: '#A8927C', paths: ['M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z'] },
  industry: {
    color: '#79648C',
    paths: [
      'M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72A7.96 7.96 0 0 0 20 10zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z',
    ],
  },
  worldwide: {
    color: '#929292',
    paths: [
      'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z',
    ],
  },
  domain: {
    color: '#839CB2',
    paths: [
      'M13 8.57a1.43 1.43 0 1 0 0 2.86 1.43 1.43 0 0 0 0-2.86z',
      'M13 3C9.25 3 6.2 5.94 6.02 9.64L4.1 12.2a.5.5 0 0 0 .4.8H6v3c0 1.1.9 2 2 2h1v3h7v-4.68A6.999 6.999 0 0 0 13 3zm3 7c0 .13-.01.26-.02.39l.83.66c.08.06.1.16.05.25l-.8 1.39c-.05.09-.16.12-.24.09l-.99-.4c-.21.16-.43.29-.67.39L14 13.83c-.01.1-.1.17-.2.17h-1.6c-.1 0-.18-.07-.2-.17l-.15-1.06c-.25-.1-.47-.23-.68-.39l-.99.4c-.09.03-.2 0-.25-.09l-.8-1.39a.19.19 0 0 1 .05-.25l.84-.66c-.01-.13-.02-.26-.02-.39s.02-.27.04-.39l-.85-.66c-.08-.06-.1-.16-.05-.26l.8-1.38c.05-.09.15-.12.24-.09l1 .4c.2-.15.43-.29.67-.39L12 6.17c.02-.1.1-.17.2-.17h1.6c.1 0 .18.07.2.17l.15 1.06c.24.1.46.23.67.39l1-.4c.09-.03.2 0 .24.09l.8 1.38a.2.2 0 0 1-.05.26l-.85.66c.03.12.04.25.04.39z',
    ],
  },
}

function CardIcon({ name }: { name: ExpertCard['icon'] }) {
  const g = GLYPHS[name]
  return (
    <svg width="100%" height="100%" viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="12" fill="white" />
      <g transform={`translate(16, 16) scale(${32 / 24})`} fill={g.color}>
        {g.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
}

/*
 * scale.com CardGridSection (page chunk 3z_q0c19dxjc-.js module 794721 -> CardGrid 540409 / LinkCard 874328 /
 * BaseCardScroll 598042): heading "lg" (h2, noSplit: no intro), retroactiveOnEnter true, animationDirection "up",
 * directionalEntrance false (no x offset, origin centre), four LinkCards with hoveredColor.
 * The wrapper is `section.relative.z-0 > max-w-[1472px] ps-6 pe-6 > md:sticky md:top-20`; the sticky box is as tall
 * as its parent, so it never sticks (measured: the grid scrolls 1:1 with the page).
 *   per card, scrubbed: trigger card, `top bottom` -> `top 50%`; scale 0.96 -> 1, opacity 0 -> 1, staggered window
 *   once, section `top bottom` (retroactive, deferred while the tab is hidden): icon tile clip
 *     inset(0 100% 0 0 round 10px) -> inset(0) 0.5s power1.out at 0.05*i + 0.125; icon opacity 1s (+0.05);
 *     title AnimatedText cascade (+0.16); body cascade (+0.18)
 *   hover (CSS group-hover/card): fill `bg-<hoveredColor>` scale-y 0 -> 1 from the bottom, 500ms ease-out. The title
 *     and body keep their colours. No link, so no focus target.
 */
export default function CardGrid({ content }: { content: CardGridContent }) {
  const section = useRef<HTMLElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const tiles = useRef<(HTMLDivElement | null)[]>([])
  const glyphs = useRef<(HTMLSpanElement | null)[]>([])
  const titles = useRef<(HTMLHeadingElement | null)[]>([])
  const bodies = useRef<(HTMLParagraphElement | null)[]>([])
  const count = content.cards.length

  useLayoutEffect(() => {
    if (reducedMotion()) return
    let cancelled = false
    let offRetro = () => {}
    let offVis = () => {}
    const splits: { revert: () => void }[] = []
    const ctx = gsap.context(() => {
      cards.current.forEach((card, i) => {
        if (!card) return
        const set = (p: number) => {
          const r = ease(staggered(p, i, count))
          gsap.set(card, { scale: 0.96 + 0.04 * r, opacity: r, x: 0, y: 0 })
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
      gsap.set(tiles.current, { clipPath: 'inset(0% 100% 0% 0% round 10px)' })
      gsap.set(glyphs.current, { opacity: 0 })
    }, section)

    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx.add(() => {
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
        let started = false
        const play = () => {
          if (started || cancelled) return
          started = true
          ctx.add(() => {
            for (let i = 0; i < count; i++) {
              const st = 0.05 * i + 0.125
              gsap.to(tiles.current[i], { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: st })
              gsap.to(glyphs.current[i], { opacity: 1, duration: 1, ease: 'power1.out', delay: st + 0.05 })
              const c = st + 0.16
              if (t[i]) playCascade(t[i]!, c)
              if (b[i]) playCascade(b[i]!, c + 0.18)
            }
          })
        }
        let pending = false
        const enter = () => {
          if (pending || started) return
          pending = true
          offVis = whenVisible(play)
        }
        const st = ScrollTrigger.create({ trigger: section.current, start: 'top bottom', end: 'bottom 20%', onEnter: enter })
        offRetro = retroactiveEnter(st, enter)
      })
    })
    return () => {
      cancelled = true
      offRetro()
      offVis()
      ctx.revert()
      splits.forEach((sp) => sp.revert())
    }
  }, [count])

  return (
    <section className="relative z-0">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="md:sticky md:top-20">
          <section ref={section} className="CardGrid w-full scroll-mt-28 py-12 xl:py-24">
            <div className="mx-auto w-full">
              <h2
                className="mb-[48px] w-4/5 max-w-[22ch] text-left font-display text-[2rem] font-normal leading-[1.05] tracking-[-0.01em] text-inherit max-sm:mx-auto md:w-full md:text-[40px] md:leading-[44px] xl:mb-16"
                style={{ textWrap: 'balance', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {content.heading}
              </h2>
              <div className="flex flex-col gap-2 lg:grid lg:grid-cols-4">
                {content.cards.map((card, i) => (
                  <div
                    key={card.title}
                    ref={(el) => {
                      cards.current[i] = el
                    }}
                    className="BaseCard"
                    style={{ transformOrigin: 'center center' }}
                  >
                    <div className={`LinkCard ${s.card} relative h-full overflow-clip rounded-[8px] bg-[#f2f2f2] text-black xl:rounded-2xl`}>
                      <div className={`${s.cardFill} absolute h-full w-full origin-bottom`} style={{ background: card.hover }} />
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
                              className="flex h-full w-full items-center justify-center"
                            >
                              <CardIcon name={card.icon} />
                            </span>
                          </div>
                        </div>
                        <h5
                          ref={(el) => {
                            titles.current[i] = el
                          }}
                          className={`${s.cardTitle} font-display tracking-[-0.01em] !text-black`}
                        >
                          {card.title}
                        </h5>
                        <div className="flex flex-1 flex-col justify-end gap-4">
                          <p
                            ref={(el) => {
                              bodies.current[i] = el
                            }}
                            className="font-display text-[16px] leading-6 tracking-[-0.01em] text-[#212121]"
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
      </div>
    </section>
  )
}
