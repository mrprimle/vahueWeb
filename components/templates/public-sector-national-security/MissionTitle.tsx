'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import FlatCta from './FlatCta'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './motion'
import type { MissionTitleContent } from './content'
import s from './ns.module.css'

/*
 * CMS Section (698764: Core White, contentWidth "full", marginVertical none) > HeadlineWithCta (925107, not manual).
 * Page CSS lBBaeq: HeadlineWithCta padding-top 5rem (7rem from 768); headline balance, max-width 22ch, centred;
 * RichText pretty, max-width 52rem; FlatCta white on #a8927c with a transparent icon box.
 * Intro: IntersectionObserver on the root, rootMargin "0px 0px -15% 0px": headline animateIn(.5), subtitle
 * animateIn(1), CTA introAnimation "fadeIn" (autoAlpha 0 -> 1, .85s power3.out, delay 1.4).
 */
export default function MissionTitle({ content }: { content: MissionTitleContent }) {
  const root = useRef<HTMLDivElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLParagraphElement>(null)
  const cta = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const texts: AnimatedText[] = []
    if (h.current) texts.push(createAnimatedText(h.current))
    if (p.current) texts.push(createAnimatedText(p.current))
    if (prefersReducedMotion()) return () => texts.forEach((t) => t.revert())
    gsap.set(cta.current, { autoAlpha: 0 })
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        texts[0]?.animateIn({ delay: 0.5 })
        texts[1]?.animateIn({ delay: 1 })
        gsap.to(cta.current, { autoAlpha: 1, duration: 0.85, ease: 'power3.out', delay: p.current ? 1.4 : 0.9 })
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      gsap.killTweensOf(cta.current)
      texts.forEach((t) => t.revert())
    }
  }, [])

  return (
    <div className={`Section ${s.grid} relative isolate overflow-hidden bg-white text-black`} data-text-theme="black">
      <div className="relative isolate col-span-full rounded-none">
        <div ref={root} className="HeadlineWithCta flex flex-col items-center gap-6 px-6 pb-6 pt-20 md:pt-28">
          <h3 ref={h} className={`${s.header3} ${s.pending} mx-auto w-full max-w-[22ch] text-balance text-center text-inherit`}>
            {content.headline}
          </h3>
          <div className="RichText mx-auto w-full max-w-[52rem] text-center text-inherit" style={{ textWrap: 'pretty' }}>
            <p ref={p} className={`${s.pending} text-base leading-6 max-md:text-sm max-md:leading-[21px]`}>
              {content.body}
            </p>
          </div>
          <FlatCta ref={cta} href={content.cta.href} variant="arrow" theme="tan" staticShape>
            {content.cta.label}
          </FlatCta>
        </div>
      </div>
    </div>
  )
}
