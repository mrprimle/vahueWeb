'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { createAnimatedText, type AnimatedText } from './animatedText'
import FlatCta from './FlatCta'
import { prefersReducedMotion, useRetroEnter } from './scroll'
import type { HomeContent } from './content'
import s from './home.module.css'

/*
 * FullWidthCardCarousel (0sni47mcvnqwg.js module 424625). Keen Slider: loop, perView auto, spacing 8, origin center; slides =
 * cards repeated max(4, ceil(16 / n)) * n times; cursor grabbing while dragging. Window keydown ArrowLeft / ArrowRight -> prev / next
 * while the section has been entered (not from inputs). Previous / next: 44px arrowOutline black FlatCtas.
 * Intro (useScrollTrigger top 80%, retroactive; re-arms on leave / leave back): heading animateIn(.02); then the 5 slides around
 * the start on each side (3 under 400px), index e: mark scale 0 -> 1 (.95s power3.out, delay .09e), heading delay .09e + .08,
 * subtitle ("fade") delay .09e + .15; when those finish the remaining slides are set visible.
 * Card hover (linked cards): arrow track -28px -> 0, 600ms ease-out on group-hover only.
 */
export default function CardCarousel({ content }: { content: HomeContent['applications']['carousel'] }) {
  const cards = content.cards
  const slides = useMemo(() => {
    const n = cards.length
    if (!n) return []
    const total = Math.max(4, Math.ceil(16 / n)) * n
    return Array.from({ length: total }, (_, i) => cards[i % n])
  }, [cards])
  const R = slides.length
  const root = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const marks = useRef<(HTMLDivElement | null)[]>([])
  const heads = useRef<(HTMLHeadingElement | null)[]>([])
  const subs = useRef<(HTMLParagraphElement | null)[]>([])
  const texts = useRef<{ heading?: AnimatedText; heads: (AnimatedText | undefined)[]; subs: (AnimatedText | undefined)[] }>({ heads: [], subs: [] })
  const active = useRef(false)
  const played = useRef(false)

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: { perView: 'auto', spacing: 8, origin: 'center' },
    dragStarted(k) {
      k.container.style.cursor = 'grabbing'
    },
    dragEnded(k) {
      k.container.style.cursor = 'grab'
    },
  })

  useEffect(() => {
    slider.current?.update()
  }, [slider])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!active.current || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return
      const t = e.target as Element | null
      if (t?.closest?.('input, textarea, select, [contenteditable="true"]')) return
      e.preventDefault()
      if (e.key === 'ArrowLeft') slider.current?.prev()
      else slider.current?.next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slider])

  useEffect(() => {
    const t = texts.current
    if (heading.current) t.heading = createAnimatedText(heading.current)
    t.heads = heads.current.map((el) => (el ? createAnimatedText(el) : undefined))
    t.subs = subs.current.map((el) => (el ? createAnimatedText(el, { variant: 'fade' }) : undefined))
    if (prefersReducedMotion()) marks.current.forEach((m) => m && gsap.set(m, { scale: 1 }))
    return () => {
      t.heading?.revert()
      t.heads.forEach((x) => x?.revert())
      t.subs.forEach((x) => x?.revert())
    }
  }, [])

  const enter = useCallback(() => {
    if (active.current) return
    active.current = true
    if (played.current) return
    played.current = true
    const t = texts.current
    t.heading?.animateIn({ delay: 0.02 })
    const r = innerWidth < 400 ? 3 : 5
    const pick = <T,>(a: T[]) => [...a.slice(Math.max(0, R - r), R), ...a.slice(0, r)]
    const ms = pick(marks.current)
    const hs = pick(t.heads)
    const ss = pick(t.subs)
    const all: Promise<void>[] = []
    hs.forEach((h, e) => {
      const d = 0.09 * e
      if (ms[e]) gsap.to(ms[e], { scale: 1, duration: 0.95, ease: 'power3.out', delay: d })
      if (h) all.push(h.animateIn({ delay: d + 0.08 }))
      const sub = ss[e]
      if (sub) all.push(sub.animateIn({ delay: d + 0.15 }))
    })
    Promise.all(all).then(() => {
      for (let e = r; e < R - r; e++) {
        const m = marks.current[e]
        if (m) gsap.set(m, { scale: 1, opacity: 1 })
        t.heads[e]?.animateIn({ delay: 0 })
        t.subs[e]?.animateIn({ delay: 0 })
      }
    })
  }, [R])

  useRetroEnter(root, enter, {
    onEnterBack: () => {
      active.current = true
    },
    onLeave: () => {
      active.current = false
    },
    onLeaveBack: () => {
      active.current = false
    },
  })

  return (
    <div className="FullWidthCardCarousel">
      <section ref={root} className="w-full py-12 md:py-16">
        <div role="region" aria-roledescription="carousel" aria-label="Card carousel" className="flex flex-col">
          <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-4 md:px-6">
            <div ref={sliderRef} className="keen-slider w-full cursor-grab !overflow-visible active:cursor-grabbing">
              {slides.map((card, i) => {
                const body = (
                  <article className="relative flex min-h-full w-full min-w-0 max-w-full flex-1 flex-col gap-4 overflow-hidden rounded-2xl bg-white p-8">
                    <div className="flex w-full min-w-0 shrink-0 justify-start">
                      <div ref={(el) => { marks.current[i] = el }} className={`w-fit origin-top-left will-change-transform ${s.markHidden}`}>
                        <div className="flex shrink-0 self-start rounded-lg bg-[#EAEAEA] p-2">
                          <div className="relative size-[40px] shrink-0 overflow-hidden rounded-sm">{card.mark}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-fit min-h-0 w-full min-w-0 flex-1 flex-col items-start justify-start pt-12 text-left">
                      <h3 ref={(el) => { heads.current[i] = el }} className={`${s.pending} w-full min-w-0 text-left font-display text-xl font-medium text-black md:text-2xl`} style={{ textWrap: 'balance' }}>
                        {card.heading}
                      </h3>
                    </div>
                    <div className="mt-auto flex w-full min-w-0 shrink-0 items-end gap-3">
                      <div className="min-w-0 flex-1 text-left" style={{ color: '#929292', textWrap: 'pretty' }}>
                        <p ref={(el) => { subs.current[i] = el }} className={`${s.pending} block w-full min-w-0 text-left text-base font-normal leading-[1.3]`}>
                          {card.subtitle}
                        </p>
                      </div>
                      {card.href ? (
                        <div className="size-5 shrink-0 overflow-hidden" style={{ color: '#929292' }} aria-hidden>
                          <div className="flex h-full -translate-x-[28px] transform-gpu gap-2 transition-none will-change-transform group-hover/card:translate-x-0 group-hover/card:transition-transform group-hover/card:ease-out motion-reduce:!translate-x-0 motion-reduce:!transition-none" style={{ width: 56, transitionDuration: '600ms' }}>
                            {[0, 1].map((k) => (
                              <span key={k} className="flex size-5 shrink-0 items-center justify-center">
                                <svg className="block size-5 shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                                  <path d="M14.8491 12.0446C15.374 11.5196 15.0022 10.622 14.2598 10.622H0.833334C0.373096 10.622 0 10.2489 0 9.78867V9.51504C0 9.0548 0.373096 8.68171 0.833333 8.68171H14.2598C15.0022 8.68171 15.374 7.78409 14.8491 7.25912L9.21422 1.62428C8.88997 1.30003 8.88861 0.774728 9.2112 0.44881L9.41076 0.247186C9.7357 -0.08111 10.2657 -0.0824722 10.5923 0.244148L19.4107 9.0626C19.7362 9.38804 19.7362 9.91567 19.4107 10.2411L10.5923 19.0596C10.2657 19.3862 9.7357 19.3848 9.41076 19.0565L9.2112 18.8549C8.88861 18.529 8.88997 18.0037 9.21422 17.6794L14.8491 12.0446Z" fill="currentColor" />
                                </svg>
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </article>
                )
                return (
                  <div key={i} className="keen-slider__slide flex w-[calc(100vw_-_3.5rem)] min-w-[calc(100vw_-_3.5rem)] max-w-[calc(100vw_-_3.5rem)] flex-col sm:w-[404px] sm:min-w-[404px] sm:max-w-[404px]">
                    {card.href ? (
                      <Link href={card.href} className="group/card flex min-h-0 w-full min-w-0 max-w-full flex-1 flex-col rounded-2xl text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-black/20" draggable={false}>
                        {body}
                      </Link>
                    ) : (
                      <div className="flex min-h-0 flex-1 flex-col">{body}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mx-auto mt-6 w-full max-w-[1600px] px-4 md:mt-8 md:px-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <h2 ref={heading} className={`${s.pending} mt-4 min-w-0 font-display text-2xl font-medium leading-[1.1] text-black md:text-4xl`} style={{ textWrap: 'balance' }}>
                {content.heading}
              </h2>
              <div className="flex shrink-0 items-center justify-end gap-2">
                <FlatCta as="button" text="Previous slide" variant="arrowOutline" theme="black" iconOnly direction="left" className={s.iconCta} onClick={(e) => { e.stopPropagation(); slider.current?.prev() }} />
                <FlatCta as="button" text="Next slide" variant="arrowOutline" theme="black" iconOnly className={s.iconCta} onClick={(e) => { e.stopPropagation(); slider.current?.next() }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
