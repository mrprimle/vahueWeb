import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { prefersReducedMotion } from './scroll'

gsap.registerPlugin(SplitText)

/*
 * scale.com AnimatedText + its custom animations (chunk 1h0nvyhf5gbrf.js sha256 10b2627a…, modules 668761 + 947153), with the
 * extras the homepage needs on top of the sibling ports (about/animatedText.ts): re-entry, the "fadeOutSimple" exit,
 * `colorIn` (LinkCard hoveredColor), "lift" (947153.H, pull-apart body), "fade" (.F, carousel subtitle), "quote" (.c,
 * ScrollingQuote: no line mask, seek() from the scrub, standalone transform intro) and duration.
 *
 * default  hidden lines yPercent 400 / opacity 0, words x 30% / opacity 0, tint #72CE7B (or colorIn).
 *          in  line i at .08i: yPercent 0, opacity 1, 1s power3.out; colour #79648C at +.22 (.3276s) then CSS colour (.4524s),
 *              power1.inOut (with colorIn: straight to the CSS colour, 1s); words at +.04: x 0, opacity 1, .9s power3.out,
 *              stagger .03, tint at +.198 (.29484s then .40716s); with colorIn .9s
 *          out words yPercent -30 (0 when fadeOutSimple) / opacity 0, .4s power3.in, stagger .03; line yPercent -100 (0) /
 *              opacity 0, .5s power3.in at +.02
 * lift     hidden lines yPercent 50, words opacity 0.
 *          T = max(.55, (lines-1)*.052 + .2, (words-1)*.025 + .2, duration); lines yPercent 0 at .052i for T - (lines-1)*.052,
 *          power3.out; words opacity 1, stagger .025, for T - (words-1)*.025, power2.out.
 *          out lines yPercent -50 (0) / opacity 0, .32s, stagger .055, power2.in
 * fade     hidden words opacity 0, lines y 100%; in words 1 (.8s, stagger .03), lines y 0 (.5s, stagger .08), power2.out
 * quote    hidden lines visible, words { opacity 0, scale 1.75, transformOrigin "-72px -72px", x 50 }.
 *          in (scrubbed by seek) words opacity .1 (.35s, stagger .02) at 0, opacity 1 (.45s, stagger .09) at
 *          .02*floor(.66*n) + .0875, power2.out; transform intro: scale 1, x 0, .35s, stagger .02, power2.out, overwrite auto
 */

const GREEN = '#72CE7B'
const PURPLE = '#79648C'

export type TextVariant = 'default' | 'lift' | 'fade' | 'quote'

export type AnimatedText = {
  animateIn: (o?: { delay?: number; duration?: number }) => Promise<void>
  animateOut: (o?: { delay?: number; variant?: 'default' | 'fadeOutSimple' }) => Promise<void>
  seek: (p: number) => void
  playTransformIntro: () => void
  revert: () => void
}

type Options = { variant?: TextVariant; colorIn?: string; mask?: boolean; descender?: boolean }

const noop: AnimatedText = { animateIn: async () => {}, animateOut: async () => {}, seek: () => {}, playTransformIntro: () => {}, revert: () => {} }

export function createAnimatedText(el: HTMLElement, { variant = 'default', colorIn, mask = true, descender = true }: Options = {}): AnimatedText {
  if (prefersReducedMotion()) {
    el.style.opacity = '1'
    return noop
  }
  let state: 'in' | 'out' | null = null
  let tl: gsap.core.Timeline | null = null
  let master: gsap.core.Timeline | null = null
  let seeked: number | null = null
  const tint = colorIn ?? GREEN

  const pairs = (s: SplitText) => (s.lines as HTMLElement[]).map((line) => ({ line, words: (s.words as HTMLElement[]).filter((w) => line.contains(w)) }))

  const setHidden = (s: SplitText) => {
    if (variant === 'lift') {
      gsap.set(s.lines, { yPercent: 50, opacity: 1 })
      gsap.set(s.words, { opacity: 0, yPercent: 0 })
    } else if (variant === 'fade') {
      gsap.set(s.words, { opacity: 0 })
      gsap.set(s.lines, { y: '100%', x: 0, opacity: 1 })
    } else if (variant === 'quote') {
      gsap.set(s.lines, { yPercent: 0, opacity: 1 })
      gsap.set(s.words, { opacity: 0, scale: 1.75, transformOrigin: '-72px -72px', x: 50 })
    } else {
      gsap.set(s.lines, { yPercent: 400, opacity: 0, color: tint })
      gsap.set(s.words, { yPercent: 0, x: '30%', opacity: 0, color: tint })
    }
  }

  const setVisible = (s: SplitText) => {
    gsap.set([...s.lines, ...s.words], { yPercent: 0, x: 0, y: 0, opacity: 1, scale: 1, clearProps: 'color' })
  }

  const buildIn = (s: SplitText, t: gsap.core.Timeline, duration?: number) => {
    if (variant === 'lift') {
      const ps = pairs(s)
      const nl = ps.length
      const words = ps.flatMap((p) => p.words)
      const a = (nl - 1) * 0.052
      const b = (words.length - 1) * 0.025
      const base = Math.max(0.55, a + 0.2, b + 0.2)
      const T = duration && duration > 0 ? Math.max(duration, base) : base
      ps.forEach(({ line }, i) => t.to(line, { yPercent: 0, duration: T - a, ease: 'power3.out' }, 0.052 * i))
      if (words.length) t.to(words, { opacity: 1, duration: T - b, ease: 'power2.out', stagger: 0.025 }, 0)
      return
    }
    if (variant === 'fade') {
      t.to(s.words, { opacity: 1, duration: 0.8, stagger: { each: 0.03, from: 'start' }, ease: 'power2.out' }, 0)
      t.to(s.lines, { y: '0%', opacity: 1, x: 0, duration: 0.5, stagger: { each: 0.08, from: 'start' }, ease: 'power2.out' }, 0)
      return
    }
    if (variant === 'quote') {
      const w = s.words
      t.set(w, { opacity: 0 }, 0)
      t.to(w, { opacity: 0.1, duration: 0.35, stagger: 0.02, ease: 'power2.out' }, 0)
      t.to(w, { opacity: 1, duration: 0.45, stagger: 0.09, ease: 'power2.out' }, 0.02 * Math.floor(0.66 * w.length) + 0.0875)
      return
    }
    const final = getComputedStyle(el).color
    pairs(s).forEach(({ line, words }, i) => {
      const a = 0.08 * i
      t.to(line, { yPercent: 0, x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, a)
      if (colorIn) t.to(line, { color: final, duration: 1, ease: 'power1.inOut' }, a)
      else {
        t.to(line, { color: PURPLE, duration: 0.3276, ease: 'power1.inOut' }, a + 0.22)
        t.to(line, { color: final, duration: 0.4524, ease: 'power1.inOut' }, a + 0.22 + 0.3276)
      }
      if (words.length) {
        const w = a + 0.04
        t.to(words, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.03 }, w)
        if (colorIn) t.to(words, { color: final, duration: 0.9, ease: 'power1.inOut', stagger: 0.03 }, w)
        else {
          t.to(words, { color: PURPLE, duration: 0.29484, ease: 'power1.inOut', stagger: 0.03 }, w + 0.198)
          t.to(words, { color: final, duration: 0.40716, ease: 'power1.inOut', stagger: 0.03 }, w + 0.198 + 0.29484)
        }
      }
    })
  }

  const buildOut = (s: SplitText, t: gsap.core.Timeline, simple: boolean) => {
    if (variant === 'lift') {
      t.to(s.lines, { yPercent: simple ? 0 : -50, opacity: 0, duration: 0.32, stagger: 0.055, ease: 'power2.in' }, 0)
      return
    }
    if (variant === 'fade') {
      t.to(s.lines, { opacity: 0, duration: 0.8, x: '10%', stagger: { each: 0.08, from: 'end' }, ease: 'power2.in' }, 0)
      t.to(s.words, { opacity: 0, duration: 0.35, stagger: { each: 0.03, from: 'end' }, ease: 'power2.in' }, 0)
      return
    }
    if (variant === 'quote') {
      t.to(s.words, { opacity: 0, scale: 0.85, duration: 0.35, stagger: { each: 0.03, from: 'end' }, ease: 'power2.in' }, 0)
      return
    }
    pairs(s).forEach(({ line, words }, i) => {
      const a = 0.08 * i
      if (words.length) t.to(words, { yPercent: simple ? 0 : -30, opacity: 0, duration: 0.4, ease: 'power3.in', stagger: 0.03 }, a)
      t.to(line, { yPercent: simple ? 0 : -100, opacity: 0, duration: 0.5, ease: 'power3.in' }, a + 0.02)
    })
  }

  const buildMaster = (s: SplitText) => {
    master?.kill()
    master = gsap.timeline({ paused: true })
    buildIn(s, master)
  }

  const split = SplitText.create(el, {
    type: 'words,lines',
    ...(mask ? { mask: 'lines' as const } : {}),
    wordsClass: 'word',
    aria: 'auto',
    autoSplit: true,
    onSplit(self) {
      if (mask && descender && self.masks.length) gsap.set(self.masks, { paddingTop: '0.12em', marginTop: '-0.12em', paddingBottom: '0.12em', marginBottom: '-0.12em' })
      tl?.kill()
      tl = null
      if (variant === 'quote') {
        setHidden(self)
        buildMaster(self)
        if (seeked != null) master?.totalTime(seeked * (master.duration() || 0))
        return
      }
      if (state === 'in') setVisible(self)
      else setHidden(self)
    },
  })
  el.style.opacity = '1'

  return {
    animateIn({ delay = 0, duration } = {}) {
      return new Promise((resolve) => {
        if (state === 'in' && tl) return resolve()
        tl?.kill()
        setHidden(split)
        state = 'in'
        tl = gsap.timeline({ delay, onComplete: () => {
          if (variant === 'default') gsap.set([...split.lines, ...split.words], { clearProps: 'color' })
          resolve()
        } })
        buildIn(split, tl, duration)
      })
    },
    animateOut({ delay = 0, variant: v = 'default' } = {}) {
      return new Promise((resolve) => {
        if (state !== 'in') return resolve()
        tl?.kill()
        state = 'out'
        tl = gsap.timeline({ delay, onComplete: () => resolve() })
        buildOut(split, tl, v === 'fadeOutSimple')
      })
    },
    seek(p) {
      seeked = Math.max(0, Math.min(1, p))
      if (master) master.totalTime(seeked * master.duration())
    },
    playTransformIntro() {
      gsap.to(split.words, { scale: 1, x: 0, duration: 0.35, stagger: 0.02, ease: 'power2.out', overwrite: 'auto' })
    },
    revert() {
      tl?.kill()
      master?.kill()
      split.revert()
    },
  }
}
