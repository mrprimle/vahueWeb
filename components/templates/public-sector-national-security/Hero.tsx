'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './motion'
import type { NsHeroContent } from './content'
import s from './ns.module.css'

/*
 * scale.com NatSecHero (chunk 0sni47mcvnqwg.js sha256 0e137e33…, module 831675). Black, min-h-screen, setSectionTheme
 * dark (data-section-theme here). Left: HeadlineWithCta 925107 (animationManual, padding false, h1 header3-regular
 * leading-none, subtitle text-base -> md:text-lg) + "Trusted by" logo marquee; right: the 1451x635 collage (object-left).
 * Motion (page-intro hook 700758: animateSet on mount, animateIn when the page transition ends = on load):
 *   set     image opacity 0
 *   in      HeadlineWithCta.animateIn({ delay: 1 }) -> setTimeout 1ms, headline animateIn delay 1.5 / wordStagger .06,
 *           subtitle delay 1.6 / wordStagger .03; image opacity 1, 1s, delay 1.5 (gsap default ease power1.out)
 *   CSS     label row logo-rise .8s cubic-bezier(.22,.61,.36,1) 2s both; each logo logo-rise with delay 2.15 + .1 i;
 *           strip logo-marquee 40s linear infinite (two copies, translate 0 -> -50%); motion-reduce: none
 * No pointer listeners (REA ev_2f7f754f…: none on .NatSecHero).
 */
export default function Hero({ content }: { content: NsHeroContent }) {
  const img = useRef<HTMLDivElement>(null)
  const h1 = useRef<HTMLHeadingElement>(null)
  const sub = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const texts: AnimatedText[] = []
    if (h1.current) texts.push(createAnimatedText(h1.current))
    if (sub.current) texts.push(createAnimatedText(sub.current))
    if (prefersReducedMotion()) return () => texts.forEach((t) => t.revert())
    gsap.set(img.current, { opacity: 0 })
    const id = setTimeout(() => {
      texts[0]?.animateIn({ delay: 1.5, wordStagger: 0.06 })
      texts[1]?.animateIn({ delay: 1.6, wordStagger: 0.03 })
    }, 1)
    const tw = gsap.to(img.current, { opacity: 1, duration: 1, delay: 1.5 })
    return () => {
      clearTimeout(id)
      tw.kill()
      texts.forEach((t) => t.revert())
    }
  }, [])

  return (
    <div data-section-theme="dark" data-nav-theme="dark" className="NatSecHero relative min-h-screen overflow-hidden bg-[var(--ns-dark)] text-white">
      <div
        className={`${s.grid} h-full min-h-screen w-full !gap-y-8 py-10 max-md:content-start max-md:!gap-y-[max(2rem,8dvh)] max-md:pt-[max(6rem,16dvh)] md:!gap-y-0 md:py-16`}
      >
        <div className="col-span-full flex flex-col md:col-span-6 md:col-start-1 md:self-center lg:gap-6 xl:col-span-4 xl:col-start-2">
          <div className="HeadlineWithCta flex w-full flex-col items-center gap-6 pb-6 pt-0 max-sm:pb-6 md:items-start">
            <h1 ref={h1} className={`${s.header3} ${s.pending} w-full text-center !leading-none text-inherit md:text-left`}>
              {content.headline}
            </h1>
            <div className="w-full text-center text-white md:text-left">
              <p ref={sub} className={`${s.pending} text-base leading-[1.65] md:text-[18px] md:leading-[1.65]`}>
                {content.body}
              </p>
            </div>
          </div>
          {content.logos.length ? (
            <div className="flex flex-col gap-4">
              <div className={`${s.logoRise} flex origin-left items-center justify-center gap-2 md:justify-start`}>
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-white" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
                <p className="text-[0.625rem] uppercase leading-[1.5] !tracking-wider text-white md:text-xs md:leading-[1.5]">{content.trustedLabel}</p>
              </div>
              <div className="relative overflow-hidden max-md:[mask-image:linear-gradient(to_right,transparent,black_1.5rem,black_calc(100%-1.5rem),transparent)]">
                <div className={`${s.marquee} flex w-max items-center`}>
                  {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0 items-center gap-x-8 pr-8" aria-hidden={copy === 1}>
                      {content.logos.map((l, i) => (
                        <span
                          key={`${copy}-${l.src}`}
                          className={`${s.logoRiseItem} flex h-9 shrink-0 origin-left items-center justify-center`}
                          style={{ animationDelay: `${2.15 + 0.1 * i}s`, width: l.width }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={l.src}
                            alt={copy === 0 ? l.alt : ''}
                            className="pointer-events-none max-h-full max-w-full select-none object-contain [filter:brightness(0)_invert(1)]"
                          />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="relative col-span-full max-md:order-first max-md:aspect-[2029/1174] md:col-span-6 md:col-start-7 md:h-[635px] md:self-center">
          <div ref={img} className="pointer-events-none absolute inset-0 select-none md:inset-auto md:left-0 md:top-0 md:h-[635px] md:w-[1451px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content.image} alt="" className="absolute inset-0 h-full w-full object-contain object-center md:object-left" />
          </div>
        </div>
      </div>
    </div>
  )
}
