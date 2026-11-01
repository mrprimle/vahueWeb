import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/*
 * Copied from the genai-portfolio clone (motion.ts) with Scale's `wordStagger` animateIn option added
 * (HeadlineWithCta 925107 passes wordStaggerTitle .06 / wordStaggerSubtitle .03).
 *
 * Port of scale.com's AnimatedText (chunk 1h0nvyhf5gbrf, module 668761) as used on /genai-portfolio.
 *
 * Split: SplitText "words, lines" (or "lines"), mask "lines", wordsClass "word", masks padded ±0.12em
 * (lineMaskDescenderCompensation, on by default).
 *
 * Variants (Scale's built-in + the customAnimation objects this page passes):
 *  default  hidden: lines yPercent 400 / opacity 0, words x 30% / opacity 0, tinted #72CE7B
 *           in, per line i at 0.08*i: line -> 0/1 1s power3.out, colour #79648C at +0.22 (0.3276s) then CSS colour
 *           (0.4524s) power1.inOut; words x 0 / opacity 1 0.9s power3.out stagger 0.03 at +0.04, colour +0.198
 *           (0.29484s) then 0.40716s.
 *           out, per line i at 0.08*i: words yPercent -30 / opacity 0 0.4s power3.in stagger 0.03,
 *           line yPercent -100 / opacity 0 0.5s power3.in at +0.02.
 *  fade     ("H"): hidden lines yPercent 50, words opacity 0. In: lines -> 0 power3.out (0.052*i), words opacity 1
 *           power2.out stagger 0.025, T = max(0.85, 0.55, (L-1)*0.052+0.2, (W-1)*0.025+0.2) (0.85 = animateIn's
 *           default duration, which h() uses as a floor). Out: lines yPercent -50 /
 *           opacity 0 0.32s stagger 0.055 power2.in.
 *  rise     ("F", SgpStack card copy): hidden words opacity 0, lines y 100%. In: words opacity 1 0.8s stagger 0.03,
 *           lines y 0 0.5s stagger 0.08 power2.out. Out: lines opacity 0 / x 10% 0.8s stagger 0.08 from end
 *           power2.in, words opacity 0 0.35s stagger 0.03 from end.
 *  flip     (ClientTestimonials): hidden lines transformPerspective 900, origin 50% 100%, rotationX -90,
 *           yPercent 108. In: rotationX 0 / yPercent 0 0.48s stagger 0.05 power2.out. Out: rotationX 90 /
 *           yPercent -108, same timing.
 */

const GREEN = '#72CE7B'
const PURPLE = '#79648C'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const mapRange = (v: number, a: number, b: number, c: number, d: number, clamp = true) => {
  let t = (v - a) / (b - a)
  if (clamp) t = Math.min(1, Math.max(0, t))
  return c + (d - c) * t
}

export type Variant = 'default' | 'fade' | 'rise' | 'flip'

export type AnimatedText = {
  /** Returns the running intro timeline (null when already in / reduced motion). */
  animateIn: (o?: { delay?: number; wordStagger?: number }) => gsap.core.Timeline | null
  animateOut: (o?: { delay?: number }) => void
  /** Jump straight to the visible (1) or hidden (0) state. */
  set: (visible: boolean) => void
  revert: () => void
}

type Opts = { type?: 'lines,words' | 'lines'; variant?: Variant; descender?: boolean }

const pairs = (split: SplitText) =>
  (split.lines as HTMLElement[]).map((line) => ({
    line,
    words: (split.words as HTMLElement[]).filter((w) => line.contains(w)),
  }))

export function createAnimatedText(el: HTMLElement, opts: Opts = {}): AnimatedText {
  const { type = 'lines,words', variant = 'default', descender = true } = opts
  let state: 'hidden' | 'in' | 'out' | 'visible' = 'hidden'
  let tl: gsap.core.Timeline | null = null

  if (prefersReducedMotion()) {
    el.style.opacity = '1'
    return { animateIn: () => null, animateOut: () => {}, set: () => {}, revert: () => {} }
  }

  const hide = (s: SplitText) => {
    const lines = s.lines as HTMLElement[]
    const words = s.words as HTMLElement[]
    gsap.set([...lines, ...words], { clearProps: 'transform,opacity,color' })
    if (variant === 'default') {
      gsap.set(lines, { yPercent: 400, opacity: 0, color: GREEN })
      if (words.length) gsap.set(words, { yPercent: 0, x: '30%', opacity: 0, color: GREEN })
    } else if (variant === 'fade') {
      gsap.set(lines, { yPercent: 50, opacity: 1 })
      if (words.length) gsap.set(words, { opacity: 0 })
    } else if (variant === 'rise') {
      if (words.length) gsap.set(words, { opacity: 0 })
      gsap.set(lines, { y: '100%' })
    } else {
      gsap.set(lines, { transformPerspective: 900, transformOrigin: '50% 100%', rotationX: -90, yPercent: 108, opacity: 1 })
    }
  }

  const show = (s: SplitText) => {
    gsap.set([...(s.lines as HTMLElement[]), ...(s.words as HTMLElement[])], { clearProps: 'transform,opacity,color' })
  }

  const buildIn = (s: SplitText, delay: number, ws = 0.03) => {
    const t = gsap.timeline({
      delay,
      onComplete: () => {
        state = 'visible'
        show(s)
      },
    })
    const lines = s.lines as HTMLElement[]
    const words = s.words as HTMLElement[]
    if (variant === 'default') {
      const final = getComputedStyle(el).color
      pairs(s).forEach(({ line, words: w }, i) => {
        const a = 0.08 * i
        t.to(line, { yPercent: 0, x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, a)
        t.to(line, { color: PURPLE, duration: 0.3276, ease: 'power1.inOut' }, a + 0.22)
        t.to(line, { color: final, duration: 0.4524, ease: 'power1.inOut' }, a + 0.22 + 0.3276)
        if (w.length) {
          const b = a + 0.04
          t.to(w, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: ws }, b)
          t.to(w, { color: PURPLE, duration: 0.29484, ease: 'power1.inOut', stagger: ws }, b + 0.198)
          t.to(w, { color: final, duration: 0.40716, ease: 'power1.inOut', stagger: ws }, b + 0.198 + 0.29484)
        }
      })
    } else if (variant === 'fade') {
      const n = lines.length > 0 ? (lines.length - 1) * 0.052 : 0
      const m = words.length > 0 ? (words.length - 1) * 0.025 : 0
      // h(): T = max(0.55, …), then max(introDuration, T); animateIn's duration defaults to 0.85 on Scale
      const T = Math.max(0.85, Math.max(0.55, n + 0.2, m + 0.2))
      lines.forEach((line, i) => t.to(line, { yPercent: 0, duration: T - n, ease: 'power3.out' }, 0.052 * i))
      if (words.length) t.to(words, { opacity: 1, duration: T - m, ease: 'power2.out', stagger: 0.025 }, 0)
    } else if (variant === 'rise') {
      if (words.length) t.to(words, { opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power2.out' }, 0)
      t.to(lines, { y: '0%', opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0)
    } else {
      t.to(lines, { rotationX: 0, yPercent: 0, opacity: 1, duration: 0.48, stagger: 0.05, ease: 'power2.out' }, 0)
    }
    return t
  }

  const buildOut = (s: SplitText, delay: number) => {
    const t = gsap.timeline({ delay, onComplete: () => (state = 'hidden') })
    const lines = s.lines as HTMLElement[]
    const words = s.words as HTMLElement[]
    if (variant === 'default') {
      pairs(s).forEach(({ line, words: w }, i) => {
        const a = 0.08 * i
        if (w.length) t.to(w, { yPercent: -30, opacity: 0, duration: 0.4, ease: 'power3.in', stagger: 0.03 }, a)
        t.to(line, { yPercent: -100, opacity: 0, duration: 0.5, ease: 'power3.in' }, a + 0.02)
      })
    } else if (variant === 'fade') {
      t.to(lines, { yPercent: -50, opacity: 0, duration: 0.32, stagger: 0.055, ease: 'power2.in' }, 0)
    } else if (variant === 'rise') {
      t.to(lines, { opacity: 0, x: '10%', duration: 0.8, stagger: { each: 0.08, from: 'end' }, ease: 'power2.in' }, 0)
      if (words.length) t.to(words, { opacity: 0, duration: 0.35, stagger: { each: 0.03, from: 'end' }, ease: 'power2.in' }, 0)
    } else {
      t.to(lines, { rotationX: 90, yPercent: -108, opacity: 1, duration: 0.48, stagger: 0.05, ease: 'power2.out' }, 0)
    }
    return t
  }

  let split: SplitText
  split = SplitText.create(el, {
    type: type === 'lines' ? 'lines' : 'words,lines',
    mask: 'lines',
    wordsClass: 'word',
    aria: 'auto',
    autoSplit: true,
    onSplit(self) {
      if (descender && self.masks.length)
        gsap.set(self.masks, { paddingTop: '0.12em', marginTop: '-0.12em', paddingBottom: '0.12em', marginBottom: '-0.12em' })
      // autoSplit re-runs on resize/font load: restore the logical state on the fresh nodes.
      if (!split) return
      tl?.kill()
      tl = null
      if (state === 'visible' || state === 'in') {
        state = 'visible'
        show(self)
      } else hide(self)
    },
  })
  hide(split)
  el.style.opacity = '1'

  return {
    animateIn({ delay = 0, wordStagger = 0.03 } = {}) {
      if (state === 'in' || state === 'visible') return null
      tl?.kill()
      hide(split)
      state = 'in'
      tl = buildIn(split, delay, wordStagger)
      return tl
    },
    animateOut({ delay = 0 } = {}) {
      if (state === 'out' || state === 'hidden') return
      tl?.kill()
      state = 'out'
      tl = buildOut(split, delay)
    },
    set(visible) {
      tl?.kill()
      tl = null
      state = visible ? 'visible' : 'hidden'
      if (visible) show(split)
      else hide(split)
    },
    revert() {
      tl?.kill()
      split.revert()
      // the root carries the .pending (opacity 0) class; keep it visible once unsplit
      el.style.opacity = '1'
    },
  }
}

/** One-shot ScrollTrigger enter helper (retroactive: fires immediately when already past `start`). */
export function onEnter(
  trigger: Element,
  start: string,
  cb: () => void,
  extra: Partial<ScrollTrigger.Vars> = {},
) {
  let fired = false
  return ScrollTrigger.create({
    trigger,
    start,
    ...extra,
    onEnter: () => {
      if (fired) return
      fired = true
      cb()
    },
    onRefresh: (self) => {
      if (!fired && self.progress > 0) {
        fired = true
        cb()
      }
    },
  })
}
