'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MdIcon } from './icons'
import { createAnimatedText, prefersReducedMotion } from './motion'
import { baseCardScroll, isDesktopDevice, retroEnter } from './scroll'
import type { StatsPanelContent } from './content'
import s from './ns.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com NatSecStatsPanel (chunk 0sni47mcvnqwg.js, module 298718).
 *   background  the desert photo, absolute inset-0 object-cover on black
 *   ClipScroll  656598 { startPercentage md ? 10 : 1.5, startScale 1, backdropColor null, borderRadius 1 }, className
 *               "relative p-4": "top bottom" -> "center center", clip inset((1 - p) * .5 * startPercentage % round 1rem)
 *   panel       rounded-2xl black, p-6 / md:p-14; column max-w-[978px], gap-10 / md:gap-16
 *   heading     AnimatedText h2 header2 centred; useScrollTrigger(column, "top 85%", retroactive) -> animateIn(.1)
 *   cards       BaseCardScroll scaleDir "down" (scale 1.06 -> 1, y 48 -> 0, opacity 0 -> 1), staggerIndex i % N,
 *               staggerCount N (3 from 768px, else 1), end "top bottom-=276" (md) / "top bottom-=188"; on a desktop
 *               device (react-device-detect, not the viewport) columns 0 / 2 enter from x -160 / +160 with origin
 *               right / left centre
 * No pointer listeners (REA ev_e48bf510…: none on .NatSecStatsPanel).
 */
export default function StatsPanel({ content }: { content: StatsPanelContent }) {
  const clipRoot = useRef<HTMLDivElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const column = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const root = clipRoot.current
    if (!root) return
    const reduced = prefersReducedMotion()
    const text = heading.current ? createAnimatedText(heading.current) : null
    let off = () => {}
    const ctx = gsap.context(() => {
      const md = matchMedia('(min-width: 768px)').matches
      const start = md ? 10 : 1.5
      const setClip = (p: number) => {
        if (clip.current) clip.current.style.clipPath = `inset(${Math.max(0, Math.min(0.5 * start, 0.5 * start * (1 - p)))}% round 1rem)`
      }
      if (reduced) {
        setClip(1)
        return
      }
      setClip(0)
      ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'center center', onUpdate: (self) => setClip(self.progress) })
      off = retroEnter(column.current as Element, 'top 85%', () => text?.animateIn({ delay: 0.1 }))
      const n = md ? 3 : 1
      const desktop = isDesktopDevice()
      cards.current.forEach((card, i) => {
        if (!card) return
        const col = i % 3
        const edge = desktop && (col === 0 || col === 2)
        card.style.transformOrigin = edge ? (col === 0 ? 'right center' : 'left center') : 'center center'
        baseCardScroll(card, { dir: 'down', x: edge ? (col === 0 ? -160 : 160) : 0, index: i % n, count: n, end: md ? 'top bottom-=276' : 'top bottom-=188' })
      })
    }, root)
    return () => {
      off()
      ctx.revert()
      text?.revert()
    }
  }, [])

  return (
    <section className="NatSecStatsPanel relative w-full">
      <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={content.background} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div ref={clipRoot} className="ClipScrollSection relative isolate w-full p-4">
        <div ref={clip} className="h-full w-full overflow-hidden" style={{ clipPath: 'inset(0 round 1rem)' }}>
          <div className="h-full w-full">
            <div className="relative w-full">
              <div className="relative rounded-2xl bg-black p-6 md:p-14">
                <div ref={column} className="mx-auto flex w-full max-w-[978px] flex-col gap-10 md:gap-16">
                  <h2 ref={heading} className={`${s.header2} ${s.pending} mx-auto max-w-4xl text-balance text-center text-white`}>
                    {content.heading}
                  </h2>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {content.stats.map((st, i) => (
                      <div
                        key={st.label}
                        ref={(r) => {
                          cards.current[i] = r
                        }}
                        className="BaseCard flex min-h-[180px] flex-col justify-between rounded-2xl bg-white/[0.09] p-6 md:min-h-[268px]"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex size-[26px] shrink-0 items-center justify-center rounded-[5px] bg-[var(--ns-tan-lt)]">
                            <MdIcon name={st.icon} size={16} className="text-black" />
                          </span>
                          <p className={`${s.mono} font-mono !tracking-tight text-[var(--ns-gray-60)]`}>{st.label}</p>
                        </div>
                        <div className="flex flex-col gap-5">
                          <p className={`${s.header3} text-[var(--ns-gray-90)] max-lg:!text-[2rem] max-lg:!leading-10`}>{st.value}</p>
                          <p className="text-sm leading-5 !tracking-tight text-[var(--ns-gray-60)]">{st.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
