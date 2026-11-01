'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MdIcon } from './icons'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './motion'
import { baseCardScroll, isDesktopDevice, retroEnter } from './scroll'
import type { TrustContent } from './content'
import s from './ns.module.css'

/*
 * CMS Section (module 698764: bg foundry-tan, contrast black, contentWidth "large" = md:col-span-12 xl:col-start-2
 * xl:col-span-10, marginVertical none) > CardGrid (540409) { headerSize md (h3 header3-regular), text-center,
 * animationDirection "down", directionalEntrance true, iconSize md (64px tile, 32px glyph), iconBgColor Core Black,
 * 4 `card`s, theme dark (overridden by the page CSS) }.
 * Page CSS module lBBaeq (0npdyq12us3md.css) on top of CardGrid:
 *   Card bg #ebebeb21, radius 14 (CardGrid forces 8 below 1280), text black, RichText #212121, glyph colour #a8927c;
 *   Card > div justify-start, padding 32 from 1280 (CardGrid forces 24 below); title medium (Aeonik NatSec Medium),
 *   min-height 4.75rem from 1024; CardGridContainer.grid-cols-4 -> 2 columns between 1024 and 1535 (4 above, a flex
 *   column below 1024).
 * Motion:
 *   cards   BaseCardScroll "down": "top bottom" -> "top 50%", stagger window over 4 cards, scale 1.06 -> 1, y 48 -> 0,
 *           opacity 0 -> 1; from 1024px on a desktop device, column (i % 4) 0 / 3 enters from x -160 / +160 (origin
 *           right / left centre)
 *   intro   useScrollTrigger(section, "top bottom", retroactive; deferred while the document is hidden): heading
 *           animateIn(.125); card i: icon tile clip inset(0 100% 0 0 round 10px) -> 0 (.5s power1.out, delay .1 i +
 *           .125), glyph opacity 0 -> 1 (1s, +.1), title animateIn(.1 i + .125), body animateIn(+.14)
 * No pointer listeners or hover styles on these cards.
 */
export default function TrustCards({ content }: { content: TrustContent }) {
  const section = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const sec = section.current
    if (!sec) return
    const reduced = prefersReducedMotion()
    const head: AnimatedText | null = heading.current ? createAnimatedText(heading.current) : null
    const texts = cards.current.map((c) => {
      const t = c?.querySelector<HTMLElement>('[data-title]')
      const b = c?.querySelector<HTMLElement>('[data-body]')
      return [t ? createAnimatedText(t) : null, b ? createAnimatedText(b) : null] as const
    })
    let off = () => {}
    let onVis: (() => void) | null = null
    const ctx = gsap.context(() => {
      if (reduced) return
      const lg = matchMedia('(min-width: 1024px)').matches
      const desktop = isDesktopDevice()
      const n = cards.current.length
      cards.current.forEach((card, i) => {
        if (!card) return
        const col = i % 4
        const edge = lg && desktop && (col === 0 || col === 3)
        card.style.transformOrigin = edge ? (col === 0 ? 'right center' : 'left center') : 'center center'
        baseCardScroll(card, { dir: 'down', x: edge ? (col === 0 ? -160 : 160) : 0, index: i, count: n })
        const box = card.querySelector('[data-icon-box]')
        const glyph = card.querySelector('[data-icon]')
        if (box) gsap.set(box, { clipPath: 'inset(0% 100% 0% 0% round 10px)' })
        if (glyph) gsap.set(glyph, { opacity: 0 })
      })
      let played = false
      let wanted = false
      const play = () => {
        if (played) return
        wanted = true
        if (document.hidden) return
        played = true
        head?.animateIn({ delay: 0.125 })
        cards.current.forEach((card, i) => {
          if (!card) return
          const d = 0.1 * i + 0.125
          const box = card.querySelector('[data-icon-box]')
          const glyph = card.querySelector('[data-icon]')
          if (box) gsap.to(box, { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: d })
          if (glyph) gsap.to(glyph, { opacity: 1, duration: 1, ease: 'power1.out', delay: d + 0.1 })
          texts[i]?.[0]?.animateIn({ delay: d })
          texts[i]?.[1]?.animateIn({ delay: d + 0.14 })
        })
      }
      onVis = () => {
        if (document.visibilityState === 'visible' && wanted && !played) play()
      }
      document.addEventListener('visibilitychange', onVis)
      off = retroEnter(sec, 'top bottom', play)
    }, sec)
    return () => {
      off()
      if (onVis) document.removeEventListener('visibilitychange', onVis)
      ctx.revert()
      head?.revert()
      texts.forEach(([a, b]) => {
        a?.revert()
        b?.revert()
      })
    }
  }, [])

  return (
    <div className={`Section ${s.grid} relative isolate overflow-hidden bg-[var(--ns-tan)] text-black`} data-text-theme="black">
      <div className="relative isolate col-span-full rounded-3xl md:col-span-12 md:col-start-1 xl:col-span-10 xl:col-start-2">
        <section ref={section} className="CardGrid w-full scroll-mt-28 py-12 xl:py-24">
          <div className="mx-auto w-full">
            <h3 ref={heading} className={`${s.header3} ${s.pending} mb-[48px] w-4/5 text-center text-inherit max-sm:mx-auto md:w-full xl:mb-16`}>
              {content.heading}
            </h3>
            <div className="CardGridContainer flex flex-col gap-2 md:p-0 lg:grid lg:grid-cols-2 min-[1536px]:grid-cols-4">
              {content.cards.map((c, i) => (
                <div
                  key={c.title}
                  ref={(r) => {
                    cards.current[i] = r
                  }}
                  className="BaseCard"
                >
                  <div className="Card h-full min-h-0 rounded-[8px] bg-[#ebebeb21] text-black xl:min-h-[378px] xl:rounded-[14px]">
                    <div className="flex h-full flex-col justify-start gap-5 p-6 md:gap-16 xl:p-8">
                      <div className="flex flex-col gap-5 md:gap-16">
                        <div className="flex items-center gap-2">
                          <div data-icon-box className="flex h-16 w-16 items-center justify-center rounded-md bg-black">
                            <span data-icon className="flex items-center justify-center">
                              <MdIcon name={c.icon} size={32} className="text-[var(--ns-tan)]" />
                            </span>
                          </div>
                        </div>
                        <h3 data-title className={`${s.header5} ${s.pending} text-black !font-medium max-xl:!text-[18px] max-xl:!leading-[1.35] lg:min-h-[4.75rem]`}>
                          {c.title}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="RichText min-h-16 text-[var(--ns-gray-10)]">
                          <p data-body className={`${s.pending} text-base leading-6`}>
                            {c.body}
                          </p>
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
