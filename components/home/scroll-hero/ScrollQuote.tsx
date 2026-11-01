'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText, { type RevealHandle } from './RevealText'
import { quote } from './content'

gsap.registerPlugin(ScrollTrigger)

// Stat card. The section pins when its top reaches 20% of the viewport (top
// of the viewport on phones) for two viewports, without pin spacing.
// Scrubbed timeline (2.25 units): row rises from +25%, video card rises from
// +67% (desktop only), then at 1.5 the row shrinks to 0.9, lifts 20% and fades.
// Words fade in on a separate timeline driven at 1.4x the pin progress.
export default function ScrollQuote() {
  const root = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const videoCard = useRef<HTMLDivElement>(null)
  const text = useRef<RevealHandle>(null)
  const [version, setVersion] = useState(0)
  const rebuild = useCallback(() => setVersion((v) => v + 1), [])

  useEffect(() => {
    if (!section.current || !wrapper.current || !videoCard.current) return
    let cancelled = false
    let st: ScrollTrigger | null = null
    let words: gsap.core.Timeline | null = null
    const tl = gsap.timeline({ paused: true })
    const desktop = matchMedia('(min-width: 768px)').matches

    text.current?.ready().then(() => {
      if (cancelled || !section.current) return
      text.current?.prepare()
      words = text.current?.buildScrubTimeline() ?? null
      let settled = false
      tl.fromTo(wrapper.current, { yPercent: 25 }, { yPercent: 0, duration: 0.75, ease: 'power3.out' }, 0)
      if (desktop) tl.fromTo(videoCard.current, { yPercent: 67 }, { yPercent: 0, duration: 2.25, ease: 'power2.inOut' }, 0)
      else tl.set(videoCard.current, { yPercent: 0 }, 0)
      tl.to(wrapper.current, { scale: 0.9, opacity: 0, yPercent: -20, duration: 0.75, ease: 'power2.inOut' }, 1.5)

      st = ScrollTrigger.create({
        trigger: section.current,
        start: desktop ? 'top 20%' : 'top top',
        end: () => `+=${2 * window.innerHeight}`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        animation: tl,
        invalidateOnRefresh: true,
        onEnter: () => {
          if (settled) return
          settled = true
          text.current?.playQuoteSettle()
        },
        onUpdate: (self) => {
          words?.progress(Math.max(0, Math.min(1, 1.4 * self.progress)))
        },
      })
    })

    return () => {
      cancelled = true
      st?.kill()
      tl.kill()
      words?.kill()
    }
  }, [version])

  return (
    <div ref={root} className="relative z-[1] h-[200dvh] overflow-x-clip bg-black px-3 md:px-6">
      <section ref={section} className="relative isolate mx-auto w-full max-w-[2048px] overflow-x-clip">
        <div ref={wrapper} className="relative z-[1] flex min-h-0 w-full overflow-visible pb-3 md:min-h-[70vh]">
          <div className="relative z-[1] flex min-h-0 w-full flex-col gap-2 max-md:h-[calc(92svh-1.25rem+1.5rem)] max-md:max-h-[calc(92svh-1.25rem+1.5rem)] max-md:overflow-hidden md:max-h-none md:min-h-[70vh] md:flex-1 md:flex-row md:overflow-visible md:pt-0">
            <div
              ref={videoCard}
              className="relative w-full rounded-[0.5rem] bg-black max-md:min-h-0 max-md:shrink max-md:grow max-md:basis-0 md:aspect-auto md:h-[60%] md:min-h-0 md:w-[362px] md:flex-none md:shrink-0 md:rounded-3xl"
            >
              <div className="h-full overflow-clip rounded-[0.5rem] object-cover md:rounded-3xl">
                <video
                  src={quote.video}
                  className="block h-full min-h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
            <div className="flex min-h-0 w-full flex-col items-start rounded-[0.5rem] bg-dark-secondary p-8 max-md:shrink max-md:grow-[2] max-md:basis-0 max-md:overflow-y-auto md:h-full md:min-h-0 md:flex-1 md:rounded-[16px] md:px-14 md:py-12">
              <RevealText
                ref={text}
                as="p"
                variant="quote"
                text={quote.text}
                onResplit={rebuild}
                className="max-w-5xl text-balance font-display text-[2rem] font-medium leading-[1.05] text-white max-md:!leading-[40px] md:text-[4rem] md:leading-[4rem]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
