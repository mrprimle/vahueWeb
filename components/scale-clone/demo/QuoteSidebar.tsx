'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion } from './animatedText'
import type { DemoContent } from './content'
import s from './demo.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * DemoQuoteSidebar (scale.com chunk 0_fm2xcv8_y2d.js, module 659050).
 * useScrollTrigger (module 210104) on the card: start "top 85%" (end "bottom 20%"), onEnter:
 *   quote   AnimatedText type "lines", mask "lines" -> animateIn({ delay: 0 })
 *   person  AnimatedText type "lines" on the name + position block -> animateIn({ delay: .15 })
 *   logos   span[role=img] set { opacity 0, y 8 } on mount -> to { opacity 1, y 0, stagger .06, delay .3, duration .5, power2.out }
 * Logo rows: first 4 in grid-cols-2 md:grid-cols-4, the rest in grid-cols-3; each slot 96x40.
 */
export default function QuoteSidebar({ sidebar }: { sidebar: DemoContent['sidebar'] }) {
  const card = useRef<HTMLDivElement>(null)
  const quote = useRef<HTMLParagraphElement>(null)
  const person = useRef<HTMLDivElement>(null)
  const logos = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = card.current
    if (!root || !quote.current || !person.current || !logos.current) return
    const marks = logos.current.querySelectorAll('[role="img"]')
    if (prefersReducedMotion()) {
      quote.current.style.opacity = '1'
      person.current.style.opacity = '1'
      return
    }
    gsap.set(marks, { opacity: 0, y: 8 })
    const q = createAnimatedText(quote.current, { type: 'lines' })
    // no descender compensation on the two-paragraph block: collapsed mask margins would add 0.12em under it
    const p = createAnimatedText(person.current, { type: 'lines', descender: false })
    let played = false
    const play = () => {
      if (played) return
      played = true
      q.animateIn({ delay: 0 })
      p.animateIn({ delay: 0.15 })
      gsap.to(marks, { opacity: 1, y: 0, stagger: 0.06, delay: 0.3, duration: 0.5, ease: 'power2.out' })
    }
    const st = ScrollTrigger.create({ trigger: root, start: 'top 85%', end: 'bottom 20%', onEnter: play, onEnterBack: play })
    if (st.isActive || st.progress > 0) play()
    return () => {
      st.kill()
      gsap.killTweensOf(marks)
      q.revert()
      p.revert()
    }
  }, [])

  const rows = [sidebar.logos.slice(0, 4), sidebar.logos.slice(4)]
  const showMarks = sidebar.quoteMarks !== false

  return (
    <div ref={card} className={s.card}>
      <blockquote className="relative m-0">
        {showMarks ? (
          <span aria-hidden="true" className={`${s.mark} absolute -left-4 top-0 text-3xl leading-none`}>
            “
          </span>
        ) : null}
        <p ref={quote} className={`AnimatedText ${s.quote} ${s.pending} m-0`}>
          {sidebar.quote}
          {showMarks ? (
            <span aria-hidden="true" className={`${s.mark} ml-0.5`}>
              ”
            </span>
          ) : null}
        </p>
      </blockquote>
      <div ref={person} className={`AnimatedText ${s.pending}`}>
        <p className={`${s.body3} m-0 font-medium text-[color:var(--demo-card-fg)]`}>{sidebar.name}</p>
        <p className={`${s.body3} m-0 text-[color:var(--demo-card-muted)]`}>{sidebar.position}</p>
      </div>
      <hr className={s.rule} />
      <p className={`${s.detailMono} m-0 text-center font-mono text-[color:var(--demo-card-muted)]`}>{sidebar.trustedLabel}</p>
      <div ref={logos} className="flex flex-col items-center gap-8">
        {rows.map((row, r) =>
          row.length ? (
            <div
              key={r}
              className={`grid w-full max-w-[480px] place-items-center gap-x-4 gap-y-6 ${r === 0 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}
            >
              {row.map((l) => (
                <span key={l.alt} className="flex h-10 w-[96px] shrink-0 items-center justify-center">
                  {l.text ? (
                    <span role="img" aria-label={l.alt} className={s.logoText}>
                      {l.alt}
                    </span>
                  ) : l.src ? (
                    <span
                      role="img"
                      aria-label={l.alt}
                      className="block bg-[var(--demo-logo)]"
                      style={{
                        width: l.width,
                        height: l.height,
                        WebkitMask: `url(${l.src}) center / contain no-repeat`,
                        mask: `url(${l.src}) center / contain no-repeat`,
                      }}
                    />
                  ) : (
                    <span role="img" aria-label={l.alt} className={s.logoTile} style={{ width: l.width, height: l.height }} />
                  )}
                </span>
              ))}
            </div>
          ) : null,
        )}
      </div>
    </div>
  )
}
