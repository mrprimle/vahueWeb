import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

/*
 * Port of scale.com AnimatedText default intro (chunk 668761; re-verified in chunk 1h0nvyhf5gbrf on /blog). Copied from the guides clone.
 *
 * Split: SplitText type "lines,words" (or "lines"), mask "lines", wordsClass "word".
 * Hidden state: lines yPercent 400 / opacity 0, words x 30% / opacity 0, both tinted #72CE7B.
 * animateIn, per line i (offset 0.08 * i):
 *   line  -> yPercent 0, opacity 1, 1s power3.out
 *   line  colour -> #79648C at +0.22 (0.3276s), then -> CSS colour (0.4524s), power1.inOut
 *   words -> x 0, opacity 1, 0.9s power3.out, stagger 0.03 at +0.04
 *   words colour -> #79648C at +0.238 (0.29484s), then -> CSS colour (0.40716s), stagger 0.03
 */

const GREEN = '#72CE7B'
const PURPLE = '#79648C'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export type AnimatedText = {
  animateIn: (o?: { delay?: number }) => gsap.core.Timeline | null
  /** Jump to the finished state (used when a re-split happens after the intro played). */
  seek: () => void
  revert: () => void
}

export function createAnimatedText(
  el: HTMLElement,
  type: 'lines,words' | 'lines' = 'lines,words',
  descender = false,
): AnimatedText {
  let done = false
  let tl: gsap.core.Timeline | null = null

  const pairs = (split: SplitText) =>
    (split.lines as HTMLElement[]).map((line) => ({
      line,
      words: (split.words as HTMLElement[]).filter((w) => line.contains(w)),
    }))

  const setHidden = (split: SplitText) => {
    gsap.set(split.lines, { yPercent: 400, opacity: 0, color: GREEN })
    if (split.words.length) gsap.set(split.words, { x: '30%', opacity: 0, color: GREEN })
  }

  const build = (split: SplitText, delay: number) => {
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
    return { animateIn: () => null, seek: () => {}, revert: () => {} }
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
      if (done) gsap.set([...self.lines, ...self.words], { yPercent: 0, x: 0, opacity: 1 })
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
    seek() {
      tl?.kill()
      tl = null
      done = true
      gsap.set([...split.lines, ...split.words], { yPercent: 0, x: 0, opacity: 1, clearProps: 'color' })
    },
    revert() {
      tl?.kill()
      split.revert()
    },
  }
}
