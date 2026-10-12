'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Media from './Media'
import SplitText from './SplitText'
import { quote } from './content'

gsap.registerPlugin(ScrollTrigger)

// Pinned stat card. Everything is scrubbed to scroll:
//  - entering: the card row rises from +25%
//  - pinned 0→62%: words scale in from 1.75× one after another
//  - pinned 0→100%: the video card slides up from +67%
//  - pinned 62→100%: the row lifts and shrinks to 0.9× as the next section arrives
export default function ScrollQuote() {
  const root = useRef<HTMLElement>(null)
  const row = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLDivElement>(null)
  const [splitVersion, setSplitVersion] = useState(0)
  const bump = useCallback(() => setSplitVersion((v) => v + 1), [])

  useEffect(() => {
    const section = root.current
    if (!section || !row.current || !video.current) return
    const words = section.querySelectorAll<HTMLElement>('[data-part="quote"] [data-word]')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(words, { autoAlpha: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(row.current, { yPercent: 25 }, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: true },
      })

      const pinned = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
      })
      const wordDuration = 0.14
      pinned
        .fromTo(words, { autoAlpha: 0, scale: 1.75, x: 50, transformOrigin: '-72px -72px' }, {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          ease: 'power2.out',
          duration: wordDuration,
          stagger: { amount: 0.62 - wordDuration },
        }, 0)
        .fromTo(video.current, { yPercent: 67 }, { yPercent: 0, ease: 'power1.inOut', duration: 0.98 }, 0)
        .fromTo(row.current, { yPercent: 0, scale: 1 }, {
          yPercent: -20,
          scale: 0.9,
          ease: 'power1.in',
          duration: 0.38,
          immediateRender: false,
        }, 0.62)
    }, section)

    return () => ctx.revert()
  }, [splitVersion])

  return (
    <section ref={root} aria-label="Vahue in numbers" className="relative h-[300dvh] bg-bg px-3 md:px-6">
      <div className="sticky top-0 flex h-dvh w-full items-center">
        <div
          ref={row}
          className="mx-auto flex w-full max-w-[2048px] flex-col gap-2 max-md:h-[calc(92svh-1.25rem)] md:h-[70vh] md:flex-row md:items-start"
        >
          <div
            ref={video}
            className="relative overflow-hidden rounded-lg bg-black max-md:min-h-0 max-md:grow max-md:basis-0 md:h-[60%] md:w-[362px] md:flex-none md:rounded-3xl"
          >
            <Media src={quote.media} />
          </div>
          <div className="relative z-[1] flex min-h-0 flex-col items-start rounded-lg border border-border-soft bg-dark-secondary p-8 max-md:grow-[2] max-md:basis-0 md:h-full md:flex-1 md:rounded-2xl md:px-14 md:py-12">
            <SplitText
              key={quote.text}
              as="p"
              part="quote"
              text={quote.text}
              onSplit={bump}
              className="max-w-5xl text-balance font-display text-[2.25rem] font-light leading-[40px] text-white md:text-[3.5rem] md:leading-[4rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
