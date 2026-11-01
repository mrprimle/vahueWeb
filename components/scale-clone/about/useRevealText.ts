'use client'

import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText } from './animatedText'

gsap.registerPlugin(ScrollTrigger)

/*
 * One-shot AnimatedText intros.
 * mode "io"  = HeadlineWithCta (chunk 2k1qlgdxlbmz1.js sha256 bb51ad26…, module 925107): an IntersectionObserver on the
 *              HeadlineWithCta root, rootMargin "0px 0px -15% 0px"; headline animateIn delay 0.5, subtitle delay 1.
 * mode "st"  = Scale's useScrollTrigger hook (module 210104 in 37xz28pjbnlx4.js): start "top 80%" unless given, retroactive
 *              (on every refresh, fire once progress > 0 or the scroll is at/after start - 1).
 * `targets` are animated in order with `delays[i]`; `trigger` defaults to the first target.
 */
export function useRevealText(
  targets: RefObject<HTMLElement | null>[],
  { delays = [0.5], mode = 'io', start = 'top 80%', trigger }: {
    delays?: number[]
    mode?: 'io' | 'st'
    start?: string
    trigger?: RefObject<HTMLElement | null>
  } = {},
) {
  useEffect(() => {
    const els = targets.map((t) => t.current).filter((e): e is HTMLElement => !!e)
    const root = trigger?.current ?? els[0]
    if (!root || !els.length) return
    const texts = els.map((el) => createAnimatedText(el))
    let played = false
    const play = () => {
      if (played) return
      played = true
      texts.forEach((t, i) => t.animateIn({ delay: delays[i] ?? delays[delays.length - 1] }))
    }
    let cleanup = () => {}
    if (mode === 'io') {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect()
            play()
          }
        },
        { rootMargin: '0px 0px -15% 0px' },
      )
      io.observe(root)
      cleanup = () => io.disconnect()
    } else {
      const st = ScrollTrigger.create({ trigger: root, start, end: 'bottom 20%', onEnter: play })
      const retro = () => {
        if (st.progress > 0 || st.scroll() >= st.start - 1) play()
      }
      ScrollTrigger.addEventListener('refresh', retro)
      retro()
      cleanup = () => {
        ScrollTrigger.removeEventListener('refresh', retro)
        st.kill()
      }
    }
    return () => {
      cleanup()
      texts.forEach((t) => t.revert())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
