import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

/*
 * Port of scale.com's AnimatedText default intro (chunk 668761, data-engine page).
 *
 * Split: SplitText type "lines,words" (or "lines"), mask "lines", wordsClass "word".
 * Hidden state: lines yPercent 400 / opacity 0, words x 30% / opacity 0, both tinted #72CE7B.
 * animateIn, per line i (offset 0.08 * i):
 *   line  -> yPercent 0, opacity 1, 1s power3.out
 *   line  colour -> #79648C at +0.22 (0.3276s), then -> CSS colour (0.4524s), power1.inOut
 *   words -> x 0, opacity 1, 0.9s power3.out, stagger 0.03 at +0.04
 *   words colour -> #79648C at +0.238 (0.29484s), then -> CSS colour (0.40716s), stagger 0.03
 *
 * variant 'flip': the ClientTestimonials customAnimation (chunk 1a9k8nwrsxal6.js, module 685963,
 * replaceBuiltIn: true, so no tint): lines start transformPerspective 900, origin 50% 100%, rotationX -90,
 * yPercent 108, opacity 1, and flip to rotationX 0 / yPercent 0 in 0.48s power2.out, stagger 0.05.
 */

const GREEN = '#72CE7B'
const PURPLE = '#79648C'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export type AnimatedText = {
  animateIn: (o?: { delay?: number }) => gsap.core.Timeline | null
  revert: () => void
}

export function createAnimatedText(
  el: HTMLElement,
  type: 'lines,words' | 'lines' = 'lines,words',
  descender = false,
  variant: 'default' | 'flip' = 'default',
): AnimatedText {
  const flip = variant === 'flip'
  let done = false
  let tl: gsap.core.Timeline | null = null

  const pairs = (split: SplitText) =>
    (split.lines as HTMLElement[]).map((line) => ({
      line,
      words: (split.words as HTMLElement[]).filter((w) => line.contains(w)),
    }))

  const setHidden = (split: SplitText) => {
    if (flip) {
      gsap.set(split.lines, { transformPerspective: 900, transformOrigin: '50% 100%', rotationX: -90, yPercent: 108, opacity: 1, force3D: true })
      return
    }
    gsap.set(split.lines, { yPercent: 400, opacity: 0, color: GREEN })
    if (split.words.length) gsap.set(split.words, { x: '30%', opacity: 0, color: GREEN })
  }

  const build = (split: SplitText, delay: number) => {
    if (flip) {
      const t = gsap.timeline({ delay, onComplete: () => void (done = true) })
      t.to(split.lines, { rotationX: 0, yPercent: 0, opacity: 1, duration: 0.48, stagger: 0.05, ease: 'power2.out', force3D: true }, 0)
      return t
    }
    const final = getComputedStyle(el).color
    const t = gsap.timeline({
      delay,
      onComplete: () => {
        gsap.set([...split.lines, ...split.words], { clearProps: 'color' })
        done = true
      },
    })
    pairs(split).forEach(({ line, words }, i) => {
      const a = 0.08 * i
      t.to(line, { yPercent: 0, x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, a)
      t.to(line, { color: PURPLE, duration: 0.3276, ease: 'power1.inOut' }, a + 0.22)
      t.to(line, { color: final, duration: 0.4524, ease: 'power1.inOut' }, a + 0.22 + 0.3276)
      if (words.length) {
        const w = a + 0.04
        t.to(words, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.03 }, w)
        t.to(words, { color: PURPLE, duration: 0.29484, ease: 'power1.inOut', stagger: 0.03 }, w + 0.198)
        t.to(words, { color: final, duration: 0.40716, ease: 'power1.inOut', stagger: 0.03 }, w + 0.198 + 0.29484)
      }
    })
    return t
  }

  if (prefersReducedMotion()) {
    return { animateIn: () => null, revert: () => {} }
  }

  const split = SplitText.create(el, {
    type,
    mask: 'lines',
    wordsClass: 'word',
    aria: 'auto',
    autoSplit: true,
    onSplit(self) {
      // lineMaskDescenderCompensation: keep descenders inside the line masks.
      if (descender && self.masks.length)
        gsap.set(self.masks, { paddingTop: '0.12em', marginTop: '-0.12em', paddingBottom: '0.12em', marginBottom: '-0.12em' })
      // autoSplit re-runs on font load and resize: keep the current state.
      if (done) gsap.set([...self.lines, ...self.words], { yPercent: 0, x: 0, opacity: 1, ...(flip ? { rotationX: 0 } : {}) })
      else if (tl) {
        tl.kill()
        tl = build(self, 0)
      } else setHidden(self)
    },
  })

  // Elements start hidden through the .pending CSS class; show them once split and set.
  el.style.opacity = '1'

  return {
    animateIn({ delay = 0 } = {}) {
      if (done || tl) return tl
      tl = build(split, delay)
      return tl
    },
    revert() {
      tl?.kill()
      split.revert()
    },
  }
}
