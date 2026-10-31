import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

/*
 * Port of scale.com's AnimatedText (chunk 1h0nvyhf5gbrf.js, modules 668761 + 947153) and the
 * ClientTestimonials 3D-flip custom animation (chunk 3x8z3_0hhtdcb.js, module 685963).
 *
 * Split: SplitText type "lines,words" (or "lines"), mask "lines", wordsClass "word".
 *
 * variant "default" (built-in intro):
 *   hidden  lines yPercent 400 / opacity 0, words x 30% / opacity 0, tinted #72CE7B
 *   in      per line i (offset 0.08 i): line -> yPercent 0, opacity 1, 1s power3.out;
 *           colour -> #79648C at +0.22 (0.3276s) -> CSS colour (0.4524s), power1.inOut;
 *           words -> x 0, opacity 1, 0.9s power3.out, stagger 0.03 at +0.04 (+ colour tint at +0.198)
 *   out     words yPercent -30 / opacity 0, 0.4s power3.in, stagger 0.03; line yPercent -100 / opacity 0,
 *           0.5s power3.in at +0.02 (per line offset 0.08 i)
 * variant "fade" (custom animation "F", SgpStack card bodies):
 *   hidden  words opacity 0, lines y 100%
 *   in      words opacity 1, 0.8s, stagger 0.03, power2.out; lines y 0%, stagger 0.08, power2.out (0.5s)
 *   out     lines opacity 0 / x 10%, 0.8s power2.in, stagger 0.08 from end; words opacity 0, 0.35s
 * variant "flip" (ClientTestimonials metrics variant: quote, metric, label, name):
 *   hidden  lines transformPerspective 900, origin 50% 100%, rotationX -90, yPercent 108
 *   in      rotationX 0, yPercent 0, 0.48s power2.out, stagger 0.05
 *   out     rotationX 90, yPercent -108, same timing
 */

const GREEN = '#72CE7B'
const PURPLE = '#79648C'

export type TextVariant = 'default' | 'fade' | 'flip'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export type AnimatedText = {
  animateIn: (o?: { delay?: number }) => gsap.core.Timeline | null
  animateOut: (o?: { delay?: number }) => gsap.core.Timeline | null
  revert: () => void
}

type Options = {
  type?: 'lines,words' | 'lines'
  variant?: TextVariant
  descender?: boolean
}

export function createAnimatedText(el: HTMLElement, { type = 'lines,words', variant = 'default', descender = true }: Options = {}): AnimatedText {
  // 'in' after animateIn, 'out' after animateOut; null = hidden, never played.
  let state: 'in' | 'out' | null = null
  let tl: gsap.core.Timeline | null = null

  if (prefersReducedMotion()) {
    el.style.opacity = '1'
    return { animateIn: () => null, animateOut: () => null, revert: () => {} }
  }

  const pairs = (split: SplitText) =>
    (split.lines as HTMLElement[]).map((line) => ({
      line,
      words: (split.words as HTMLElement[]).filter((w) => line.contains(w)),
    }))

  const setHidden = (split: SplitText) => {
    const { lines, words } = split
    if (variant === 'flip') {
      gsap.set(lines, { transformPerspective: 900, transformOrigin: '50% 100%', rotationX: -90, yPercent: 108, opacity: 1, force3D: true })
    } else if (variant === 'fade') {
      if (words.length) gsap.set(words, { opacity: 0 })
      gsap.set(lines, { y: '100%' })
    } else {
      gsap.set(lines, { yPercent: 400, opacity: 0, color: GREEN })
      if (words.length) gsap.set(words, { x: '30%', opacity: 0, color: GREEN })
    }
  }

  const setVisible = (split: SplitText) => {
    if (variant === 'flip') gsap.set(split.lines, { rotationX: 0, yPercent: 0, opacity: 1 })
    else gsap.set([...split.lines, ...split.words], { yPercent: 0, x: 0, y: 0, opacity: 1, clearProps: 'color' })
  }

  const buildIn = (split: SplitText, delay: number) => {
    const t = gsap.timeline({ delay })
    if (variant === 'flip') {
      t.to(split.lines, { rotationX: 0, yPercent: 0, opacity: 1, duration: 0.48, stagger: 0.05, ease: 'power2.out', force3D: true }, 0)
      return t
    }
    if (variant === 'fade') {
      if (split.words.length)
        t.to(split.words, { opacity: 1, duration: 0.8, stagger: { each: 0.03, from: 'start' }, ease: 'power2.out' }, 0)
      t.to(split.lines, { y: '0%', x: 0, opacity: 1, duration: 0.5, stagger: { each: 0.08, from: 'start' }, ease: 'power2.out' }, 0)
      return t
    }
    const final = getComputedStyle(el).color
    t.eventCallback('onComplete', () => gsap.set([...split.lines, ...split.words], { clearProps: 'color' }))
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

  const buildOut = (split: SplitText, delay: number) => {
    const t = gsap.timeline({ delay })
    if (variant === 'flip') {
      t.to(split.lines, { rotationX: 90, yPercent: -108, opacity: 1, duration: 0.48, stagger: 0.05, ease: 'power2.out', force3D: true }, 0)
      return t
    }
    if (variant === 'fade') {
      t.to(split.lines, { opacity: 0, duration: 0.8, x: '10%', stagger: { each: 0.08, from: 'end' }, ease: 'power2.in' }, 0)
      if (split.words.length) t.to(split.words, { opacity: 0, duration: 0.35, stagger: { each: 0.03, from: 'end' }, ease: 'power2.in' }, 0)
      t.eventCallback('onComplete', () => gsap.set(split.lines, { opacity: 0, x: 0, y: '100%' }))
      return t
    }
    pairs(split).forEach(({ line, words }, i) => {
      const a = 0.08 * i
      if (words.length) t.to(words, { yPercent: -30, opacity: 0, duration: 0.4, ease: 'power3.in', stagger: 0.03 }, a)
      t.to(line, { yPercent: -100, opacity: 0, duration: 0.5, ease: 'power3.in' }, a + 0.02)
    })
    return t
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
      tl?.kill()
      tl = null
      if (state === 'in') setVisible(self)
      else setHidden(self)
    },
  })

  // Elements start hidden through the .pending CSS class; show them once split and set.
  el.style.opacity = '1'

  return {
    animateIn({ delay = 0 } = {}) {
      if (state === 'in') return tl
      tl?.kill()
      if (state === 'out') setHidden(split)
      state = 'in'
      tl = buildIn(split, delay)
      return tl
    },
    animateOut({ delay = 0 } = {}) {
      if (state !== 'in') return null
      tl?.kill()
      state = 'out'
      tl = buildOut(split, delay)
      return tl
    },
    revert() {
      tl?.kill()
      split.revert()
    },
  }
}
