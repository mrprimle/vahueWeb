'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, type AnimatedText } from './animatedText'
import FlatCta, { type FlatCtaHandle } from './FlatCta'
import ScrollReveal, { type ScrollRevealHandle } from './ScrollReveal'
import { prefersReducedMotion, useRetroEnter } from './scroll'
import type { HomeContent } from './content'
import s from './home.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * VideoCta (0sni47mcvnqwg.js module 590542) in ScrollRevealSection (backdrop white, panel = the slice's colour).
 * Root scaleX = scaleY = the reveal value, "top bottom" -> "top top". Intro (useScrollTrigger, md "top center" / phone "top 92%"):
 * CTA filledWhiteArrow .85s delay .5 (phone .08); heading then description, delay i * .2 (phone .06).
 * The media box is lg:absolute, bottom 40%, right 5%, 60% wide, translateY 40%; video pointer-events-none, mix-blend-multiply.
 */
export default function VideoCta({ content, media }: { content: HomeContent['prefooter']; media?: ReactNode }) {
  const reveal = useRef<ScrollRevealHandle>(null)
  const root = useRef<HTMLDivElement>(null)
  const head = useRef<HTMLHeadingElement>(null)
  const desc = useRef<HTMLParagraphElement>(null)
  const cta = useRef<FlatCtaHandle>(null)
  const texts = useRef<AnimatedText[]>([])
  const played = useRef(false)
  const dark = content.contrast === 'black'

  useEffect(() => {
    const els = [head.current, desc.current].filter((e): e is HTMLElement => !!e)
    texts.current = els.map((e) => createAnimatedText(e))
    cta.current?.set()
    let st: ScrollTrigger | null = null
    if (!prefersReducedMotion() && root.current) {
      const el = root.current
      const setX = gsap.quickSetter(el, 'scaleX')
      const setY = gsap.quickSetter(el, 'scaleY')
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'top top',
        onUpdate: () => {
          const v = reveal.current?.getScaleValue()
          if (v == null) return
          setX(v)
          setY(v)
        },
      })
    }
    return () => {
      st?.kill()
      texts.current.forEach((t) => t.revert())
    }
  }, [])

  const md = typeof window !== 'undefined' && matchMedia('(min-width: 768px)').matches
  useRetroEnter(root, () => {
    if (played.current) return
    played.current = true
    const wide = matchMedia('(min-width: 768px)').matches
    cta.current?.animateIn({ duration: 0.85, delay: wide ? 0.5 : 0.08 })
    texts.current.forEach((t, i) => t.animateIn({ delay: i * (wide ? 0.2 : 0.06) }))
  }, { start: md ? 'top center' : 'top 92%' })

  return (
    <ScrollReveal ref={reveal} panelColor={content.color} className="bg-white">
      <div className={s.gridLayout}>
        <div ref={root} className={`VideoCta relative isolate col-span-full flex min-w-0 flex-col gap-8 overflow-clip px-6 pb-12 pt-[40px] md:col-span-10 md:col-start-2 md:px-0 lg:block lg:gap-0 lg:rounded-t-[2rem] lg:pb-24 lg:pt-96 ${dark ? 'text-black' : 'text-white'}`}>
          <div className="relative z-10 flex min-w-0 flex-col gap-4 lg:max-w-[min(100%,28rem)]">
            <h2 ref={head} className={`${s.header3} ${s.pending} max-w-[16.25rem] font-display font-normal`}>
              {content.headline}
            </h2>
            <p ref={desc} className={`${s.body1} ${s.pending} font-display lg:mb-8 lg:w-[400px]`}>
              {content.description}
            </p>
            <div>
              <FlatCta ref={cta} href={content.cta.href} text={content.cta.text} variant="arrow" theme={dark ? 'black' : 'white'} intro="filledWhiteArrow" />
            </div>
          </div>
          {media ? (
            <div className="relative z-0 ml-auto aspect-video w-full max-w-[min(100%,28rem)] shrink-0 overflow-hidden p-2 lg:absolute lg:bottom-[40%] lg:right-[5%] lg:aspect-[695/525] lg:w-3/5 lg:max-w-none lg:translate-y-[40%]" style={{ backgroundColor: content.color }}>
              <div className="pointer-events-none h-full w-full mix-blend-multiply">{media}</div>
            </div>
          ) : null}
        </div>
      </div>
    </ScrollReveal>
  )
}
