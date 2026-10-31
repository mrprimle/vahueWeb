'use client'

import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, type TextVariant } from './animatedText'

gsap.registerPlugin(ScrollTrigger)

/*
 * One-shot AnimatedText intro for a single element.
 * mode "io"  = HeadlineWithCta (chunk be/2k1qlgdxlbmz1.js module 925107): IntersectionObserver with
 *              rootMargin "0px 0px -15% 0px", headline animateIn delay 0.5 (subtitle 1).
 * mode "st"  = Scale's useScrollTrigger hook (module 210104): default start "top 80%", retroactive.
 */
export function useRevealText(
  ref: RefObject<HTMLElement | null>,
  { delay = 0.5, mode = 'io', variant = 'default', type = 'lines,words', start = 'top 80%' }: {
    delay?: number
    mode?: 'io' | 'st'
    variant?: TextVariant
    type?: 'lines,words' | 'lines'
    start?: string
  } = {},
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const text = createAnimatedText(el, { variant, type })
    let cleanup = () => {}
    if (mode === 'io') {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect()
            text.animateIn({ delay })
          }
        },
        { rootMargin: '0px 0px -15% 0px' },
      )
      io.observe(el)
      cleanup = () => io.disconnect()
    } else {
      const st = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => text.animateIn({ delay }),
        onRefresh: (self) => {
          if (self.progress > 0 || self.scroll() >= self.start - 1) text.animateIn({ delay })
        },
      })
      cleanup = () => st.kill()
    }
    return () => {
      cleanup()
      text.revert()
    }
  }, [ref, delay, mode, variant, type, start])
}
