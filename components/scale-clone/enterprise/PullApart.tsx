'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText, { type AnimatedTextHandle } from './AnimatedText'
import { createPullApartScene } from './pullApartScene'
import { pullApart } from './content'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com EnterprisePullApart (chunk 0sni47mcvnqwg, module 322473).
 * Section h-[450vh] black, isolate. Its h-screen content is pinned "top top" -> "+=4.5 * innerHeight"
 * (pinSpacing false) and the inner .parallaxOut is scrubbed yPercent 0 -> -25 (power2.inOut, timeline
 * positions 2.2..3.7 of 3.7). The next section (isolate, white) paints over the pinned layer as it scrolls in.
 * Copy blocks animate in/out from the scene's progress windows: headline AnimatedText default (delay .2),
 * subheading custom "lift" animation (delay .5).
 */

export default function PullApart() {
  const section = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const parallax = useRef<HTMLDivElement>(null)
  const canvasBox = useRef<HTMLDivElement>(null)
  const heads = useRef<(AnimatedTextHandle | null)[]>([])
  const subs = useRef<(AnimatedTextHandle | null)[]>([])

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: content.current,
          start: 'top top',
          end: () => `+=${4.5 * window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          scrub: reduce ? false : true,
          invalidateOnRefresh: true,
        },
      })
      tl.fromTo(parallax.current, { yPercent: 0 }, { yPercent: reduce ? 0 : -25, duration: 1.5, ease: 'power2.inOut' }, 2.2)
    })
    const onVisible = (i: 0 | 1, on: boolean) => {
      if (on) {
        heads.current[i]?.animateIn({ delay: 0.2 })
        subs.current[i]?.animateIn({ delay: 0.5 })
      } else {
        heads.current[i]?.animateOut()
        subs.current[i]?.animateOut()
      }
    }
    const destroy = canvasBox.current ? createPullApartScene(canvasBox.current, { curvesUrl: '/scale-clone/enterprise/pull-apart-curves.json', onSectionVisible: onVisible }) : () => {}
    return () => {
      destroy()
      ctx.revert()
    }
  }, [])

  return (
    <div ref={section} data-nav-theme="dark" className="EnterprisePullApart relative isolate h-[450vh] w-full overflow-hidden bg-black">
      <div ref={content} className="content relative h-screen w-full">
        <div ref={parallax} className="parallaxOut relative h-screen w-full">
          <div ref={canvasBox} className="relative inset-0 h-full w-full" style={{ touchAction: 'none' }} />
          {pullApart.map((item, i) => (
            <div
              key={i}
              className={`absolute m-auto grid w-full grid-cols-8 gap-2 px-6 text-white md:grid-cols-12 ${i === 0 ? 'top-[15vh]' : 'bottom-[15vh] md:bottom-[6vh]'}`}
            >
              <div className="col-span-full text-center">
                {/* TODO: Vahue copy */}
                <AnimatedText
                  ref={(h) => {
                    heads.current[i] = h
                  }}
                  as="h3"
                  maskCompensation
                  className="mb-6 px-[12.5%] text-[24px] font-normal leading-[1.05] tracking-[-0.01em] text-white [text-shadow:0_10px_8px_rgb(0_0_0/0.04),0_4px_3px_rgb(0_0_0/0.1)] md:mb-0 md:text-[40px] md:leading-[1.25]"
                >
                  {item.headline}
                </AnimatedText>
                {/* TODO: Vahue copy */}
                <AnimatedText
                  ref={(h) => {
                    subs.current[i] = h
                  }}
                  variant="lift"
                  className="text-[16px] leading-[1.45] tracking-[-0.01em] text-[#929292] md:text-[20px] md:leading-[1.5]"
                >
                  {item.subheading}
                </AnimatedText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
