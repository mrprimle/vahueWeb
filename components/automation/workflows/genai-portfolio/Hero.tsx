'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './motion'
import Orbit from './Orbit'
import s from './styles.module.css'

/*
 * Template SgpHero, in the clone's colours (black). Media column 2-6 / copy column 8-11 on the 12-col grid; stacked +
 * centred on phones. Scale's transparent hero video is replaced by Vahue's own drawing (sources orbiting one agent).
 * h-screen as on Scale: the page pulls itself up under Vahue's 88px navbar.
 * Intro on mount (Scale: animateSet -> animateIn):
 *   media wrapper   opacity 0 -> 1, 1s, delay 2
 *   headline        AnimatedText default, delay 1.5; subtitle delay 1.6
 *   integrations    fade in, delay 2.2 (40s linear marquee, translate -50%), in place of the customer-logo marquee
 *   scroll cue      label AnimatedText delay 1 + box autoAlpha 1 (0.25s); arrow loop y -100% -> 0, 0.5s, repeatDelay 5
 */

type Props = { headline: string; body: string; tools: string[] }

export default function Hero({ headline, body, tools }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)
  const marquee = useRef<HTMLDivElement>(null)
  const cueLabel = useRef<HTMLParagraphElement>(null)
  const cueBox = useRef<HTMLDivElement>(null)
  const arrows = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const texts: AnimatedText[] = []
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      ;[h.current, p.current, cueLabel.current].forEach((el) => el && texts.push(createAnimatedText(el)))
      if (reduced) return
      gsap.set(media.current, { opacity: 0 })
      gsap.set(marquee.current, { opacity: 0 })
      gsap.set(cueBox.current, { autoAlpha: 0 })
      gsap.to(media.current, { opacity: 1, duration: 1, delay: 2 })
      texts[0]?.animateIn({ delay: 1.5 })
      texts[1]?.animateIn({ delay: 1.6 })
      texts[2]?.animateIn({ delay: 1 })
      gsap.to(cueBox.current, { autoAlpha: 1, duration: 0.25, delay: 1 })
      gsap.to(marquee.current, { opacity: 1, duration: 1, delay: 2.2, ease: 'power2.out' })
      const a = arrows.current?.children
      if (a) {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 })
        tl.fromTo(a, { y: '-100%' }, { y: '0%', duration: 0.5 }, 0)
      }
    }, root)
    return () => {
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [])

  const row = tools.length ? tools : []

  return (
    <div ref={root} className="relative h-screen bg-black text-white">
      <div className={`${s.grid} h-full !gap-y-8 !py-10 md:!gap-y-0 md:!py-16`}>
        <div
          ref={media}
          className="col-span-6 col-start-2 flex items-center justify-center max-md:pt-8 md:col-span-5 md:col-start-2 md:row-start-1 md:self-center"
        >
          <div className="block aspect-square w-full max-w-[575px] scale-110 md:scale-100">
            <Orbit labels={row} />
          </div>
        </div>
        <div className="col-span-full flex flex-col md:col-span-4 md:col-start-8 md:row-start-1 md:self-center lg:gap-10">
          <div className="flex flex-col items-center gap-6 pb-6 max-sm:pb-10 md:items-start">
            <h1 ref={h} className={`${s.header3} ${s.pending} w-full text-balance text-center !leading-none md:text-left`}>
              {headline}
            </h1>
            <div ref={p} className={`${s.pending} w-full text-center text-sm text-[#929292] md:text-left md:text-base md:leading-6`}>
              {body}
            </div>
          </div>
          {row.length ? (
            <div className="flex w-full min-w-0 flex-col gap-2">
              <div ref={marquee} className="w-full min-w-0 overflow-hidden opacity-50">
                <ul aria-label="Integrations" className={`${s.marquee} flex w-max gap-8`}>
                  {[...row, ...row].map((t, i) => (
                    <li key={i} className="flex h-[35px] shrink-0 items-center whitespace-nowrap text-lg text-white" aria-hidden={i >= row.length}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="absolute bottom-[5vh] right-8 z-10 flex items-center gap-4 text-center text-white max-sm:hidden md:right-12">
        <p ref={cueLabel} className={`${s.body3} ${s.pending} hidden font-medium tracking-[0.025em] md:block`}>
          Scroll to explore
        </p>
        <div ref={cueBox} className="flex aspect-square items-center justify-center rounded-[4px] border border-white p-2">
          <div ref={arrows} className="h-4 w-4 overflow-clip">
            {[0, 1].map((i) => (
              <svg key={i} className="block size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
