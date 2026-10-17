import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/*
 * Scroll-triggered text and block reveals.
 *
 *   rise   lines rise out of a clipped mask        (headings)
 *   words  words rise inside masked lines          (lead paragraphs)
 *   flip   lines swing up from -90deg in 3D        (big statement lines)
 *   block  element fades and lifts 24px           (cards, media, CTAs)
 *
 * Every reveal plays once when its top crosses 85% of the viewport.
 * Reduced motion: nothing is split or hidden.
 */

export type RevealVariant = 'rise' | 'words' | 'flip' | 'block'

const START = 'top 85%'
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export function revealText(el: HTMLElement, variant: Exclude<RevealVariant, 'block'> = 'rise', delay = 0) {
  if (reduced()) return () => {}
  let tween: gsap.core.Tween | null = null
  const split = SplitText.create(el, {
    type: variant === 'words' ? 'words,lines' : 'lines',
    mask: 'lines',
    aria: 'auto',
    autoSplit: true,
    // autoSplit re-runs this after font loads and width changes; the returned tween is reverted with it
    onSplit(self) {
      const targets = variant === 'words' ? self.words : self.lines
      const from =
        variant === 'flip'
          ? { yPercent: 108, rotationX: -90, transformPerspective: 900, transformOrigin: '50% 0%' }
          : { yPercent: 110 }
      tween = gsap.from(targets, {
        ...from,
        duration: variant === 'flip' ? 1 : 0.85,
        ease: 'power3.out',
        stagger: variant === 'words' ? 0.025 : 0.06,
        delay,
        scrollTrigger: { trigger: el, start: START, toggleActions: 'play none none none', once: true },
      })
      return tween
    },
  })
  return () => {
    tween?.scrollTrigger?.kill()
    split.revert()
  }
}

export function revealBlock(el: HTMLElement, delay = 0) {
  if (reduced()) return () => {}
  const tween = gsap.from(el, {
    autoAlpha: 0,
    y: 24,
    duration: 0.85,
    ease: 'power2.out',
    delay,
    scrollTrigger: { trigger: el, start: START, once: true },
  })
  return () => {
    tween.scrollTrigger?.kill()
    tween.revert()
  }
}
