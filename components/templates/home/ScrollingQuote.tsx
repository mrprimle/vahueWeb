'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText } from './animatedText'
import { prefersReducedMotion } from './scroll'
import s from './home.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * ScrollingQuote (0sni47mcvnqwg.js module 418462, CSS module _3KnF3q). h-[200dvh] black, px-3 md:px-6. Section pinned, start
 * md "top 20%" / phone "top top", end +=2*innerHeight, pinSpacing false, scrub; onEnter fires the words' transform intro once.
 * Timeline (length 2.25): wrapper yPercent 25 -> 0 (.75, power3.out, at 0); media yPercent 67 -> 0 (2.25, cubic.inOut, md; 0 on
 * phone); wrapper scale .9, opacity 0, yPercent -20 (.75, power2.inOut, at 1.5). onUpdate: quote seek(min(1, 1.4 * progress)).
 * wrapper::after is the gray panel peeking out under the card (top calc(100% - 4px), 20vh tall, calc(100vw - 48px) / -24px).
 */
export default function ScrollingQuote({ text, media }: { text: string; media?: ReactNode }) {
  const section = useRef<HTMLElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const mediaBox = useRef<HTMLDivElement>(null)
  const quote = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = quote.current
    if (!el) return
    const t = createAnimatedText(el, { variant: 'quote', mask: false })
    if (prefersReducedMotion()) return
    const md = matchMedia('(min-width: 768px)').matches
    let intro = false
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        pin: true,
        pinSpacing: false,
        start: md ? 'top 20%' : 'top top',
        end: () => `+=${2 * innerHeight}`,
        scrub: true,
        invalidateOnRefresh: true,
        onEnter: () => {
          if (intro) return
          intro = true
          t.playTransformIntro()
        },
        onUpdate: (self) => t.seek(Math.max(0, Math.min(1, 1.4 * self.progress))),
      },
    })
    tl.fromTo(wrapper.current, { yPercent: 25 }, { yPercent: 0, duration: 0.75, ease: 'power3.out' }, 0)
    if (md) tl.fromTo(mediaBox.current, { yPercent: 67 }, { yPercent: 0, duration: 2.25, ease: 'cubic.inOut' }, 0)
    else tl.set(mediaBox.current, { yPercent: 0 }, 0)
    tl.to(wrapper.current, { scale: 0.9, opacity: 0, yPercent: -20, duration: 0.75, ease: 'power2.inOut' }, 1.5)
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      t.revert()
    }
  }, [])

  return (
    <div data-section-theme="dark" className={`ScrollingQuote ${s.quoteRoot} h-[200dvh] bg-black px-3 md:px-6`}>
      <section ref={section} className={`${s.quoteSection} relative mx-auto w-full max-w-[2048px]`}>
        <div ref={wrapper} className={`${s.quoteWrapper} wrapper flex min-h-0 w-full pb-3 md:min-h-[70vh]`}>
          <div className={`${s.quoteStack} relative z-[1] flex min-h-0 w-full flex-col gap-2 max-md:h-[calc(92svh-1.25rem+1.5rem)] max-md:max-h-[calc(92svh-1.25rem+1.5rem)] max-md:overflow-hidden md:max-h-none md:min-h-[70vh] md:flex-1 md:flex-row md:overflow-visible md:pt-0`}>
            <div ref={mediaBox} className="relative w-full overflow-hidden rounded-[0.5rem] bg-black max-md:min-h-0 max-md:shrink max-md:grow max-md:basis-0 md:h-[60%] md:min-h-0 md:w-[362px] md:flex-none md:shrink-0 md:rounded-3xl">
              {media}
            </div>
            <div className="flex min-h-0 w-full flex-col items-start rounded-[0.5rem] bg-[#193A29] p-8 max-md:shrink max-md:grow-[2] max-md:basis-0 max-md:overflow-y-auto md:h-full md:min-h-0 md:flex-1 md:rounded-[16px] md:px-14 md:py-12">
              <p ref={quote} className={`${s.header2} ${s.pending} max-w-5xl font-display font-medium text-white max-md:!leading-[40px] md:!leading-[4rem]`} style={{ textWrap: 'balance' }}>
                {text}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
