'use client'

import { createElement, forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Entering headlines pass through two Vahue tints before settling on their CSS colour.
export const REVEAL_START = '#BBDEF2'
export const REVEAL_MID = '#8a86b8'

export type RevealVariant = 'headline' | 'body' | 'quote'
export type RevealHandle = {
  /** Resolves once lines/words exist. */
  ready: () => Promise<SplitText>
  /** Puts the text in its pre-entrance state. */
  prepare: () => void
  animateIn: (o?: { delay?: number; duration?: number }) => gsap.core.Timeline | null
  animateOut: (o?: { delay?: number; simple?: boolean }) => gsap.core.Timeline | null
  /** Paused entrance timeline, for scrubbing (quote). */
  buildScrubTimeline: () => gsap.core.Timeline | null
  /** Time-based part of the quote entrance (scale and x settle). */
  playQuoteSettle: () => void
}

type Props = {
  text: string
  /** Called after a re-split (resize, font load) so scrubbed timelines can rebuild. */
  onResplit?: () => void
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  variant?: RevealVariant
  className?: string
}

const QUOTE_WORD_START = { opacity: 0, scale: 1.75, transformOrigin: '-72px -72px', x: 50 }

// Pairs each split line with the words inside it.
const linesWithWords = (split: SplitText) =>
  (split.lines as HTMLElement[]).map((line) => ({
    line,
    words: (split.words as HTMLElement[]).filter((w) => line.contains(w)),
  }))

// Body copy timing: lines and words both finish together at max(duration, natural length).
const bodyTiming = (lines: number, words: number, duration?: number) => {
  const lineSpan = lines > 0 ? (lines - 1) * 0.052 : 0
  const wordSpan = words > 0 ? (words - 1) * 0.025 : 0
  const natural = Math.max(0.55, lineSpan + 0.2, wordSpan + 0.2)
  const total = duration && duration > 0 ? Math.max(duration, natural) : natural
  return { lineDur: lines > 0 ? total - lineSpan : 0.2, wordDur: words > 0 ? total - wordSpan : 0.2 }
}

const RevealText = forwardRef<RevealHandle, Props>(function RevealText(
  { text, as = 'div', variant = 'headline', className, onResplit },
  ref,
) {
  const el = useRef<HTMLElement>(null)
  const split = useRef<SplitText | null>(null)
  const waiters = useRef<((s: SplitText) => void)[]>([])
  const shown = useRef(false)
  const current = useRef<gsap.core.Timeline | null>(null)
  const resplitCb = useRef(onResplit)
  resplitCb.current = onResplit

  useLayoutEffect(() => {
    if (!el.current) return
    const instance = SplitText.create(el.current, {
      type: variant === 'quote' ? 'lines,words' : 'lines,words',
      mask: variant === 'quote' ? undefined : 'lines',
      linesClass: 'reveal-line',
      wordsClass: 'reveal-word',
      autoSplit: true,
      aria: 'auto',
      onSplit: (self) => {
        const first = !split.current
        split.current = self
        if (shown.current) showNow()
        else prepare()
        waiters.current.splice(0).forEach((fn) => fn(self))
        if (!first) resplitCb.current?.()
      },
    })
    return () => {
      instance.revert()
      split.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, variant])

  const showNow = () => {
    const s = split.current
    if (!s) return
    gsap.set([...(s.lines as HTMLElement[]), ...(s.words as HTMLElement[])], {
      yPercent: 0, x: 0, scale: 1, opacity: 1, clearProps: 'color',
    })
  }

  const prepare = () => {
    const s = split.current
    if (!s) return
    const lines = s.lines as HTMLElement[]
    const words = s.words as HTMLElement[]
    gsap.killTweensOf([...lines, ...words])
    if (variant === 'headline') {
      gsap.set(lines, { yPercent: 400, opacity: 0, color: REVEAL_START })
      gsap.set(words, { yPercent: 0, x: '30%', opacity: 0, color: REVEAL_START })
    } else if (variant === 'body') {
      gsap.set(lines, { yPercent: 50, opacity: 1 })
      gsap.set(words, { opacity: 0 })
    } else {
      gsap.set(lines, { yPercent: 0, opacity: 1 })
      gsap.set(words, QUOTE_WORD_START)
    }
  }

  useImperativeHandle(ref, () => ({
    ready: () =>
      split.current ? Promise.resolve(split.current) : new Promise((r) => waiters.current.push(r)),
    prepare,
    animateIn: ({ delay = 0, duration = 0.85 } = {}) => {
      const s = split.current
      if (!s) return null
      current.current?.kill()
      prepare()
      shown.current = true
      const final = el.current ? getComputedStyle(el.current).color : '#fff'
      const tl = gsap.timeline({
        delay,
        onComplete: () => gsap.set([...(s.lines as HTMLElement[]), ...(s.words as HTMLElement[])], { clearProps: 'color' }),
      })
      current.current = tl
      if (variant === 'headline') {
        linesWithWords(s).forEach(({ line, words }, i) => {
          const at = 0.08 * i
          tl.to(line, { yPercent: 0, x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, at)
            .to(line, { color: REVEAL_MID, duration: 0.3276, ease: 'power1.inOut' }, at + 0.22)
            .to(line, { color: final, duration: 0.4524, ease: 'power1.inOut' }, at + 0.22 + 0.3276)
          if (words.length) {
            const w = at + 0.04
            tl.to(words, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.03 }, w)
              .to(words, { color: REVEAL_MID, duration: 0.29484, ease: 'power1.inOut', stagger: 0.03 }, w + 0.198)
              .to(words, { color: final, duration: 0.40716, ease: 'power1.inOut', stagger: 0.03 }, w + 0.198 + 0.29484)
          }
        })
      } else if (variant === 'body') {
        const groups = linesWithWords(s)
        const words = groups.flatMap((g) => g.words)
        const { lineDur, wordDur } = bodyTiming(groups.length, words.length, duration)
        groups.forEach(({ line }, i) => tl.to(line, { yPercent: 0, duration: lineDur, ease: 'power3.out' }, 0.052 * i))
        if (words.length) tl.to(words, { opacity: 1, duration: wordDur, ease: 'power2.out', stagger: 0.025 }, 0)
      }
      return tl
    },
    animateOut: ({ delay = 0, simple = false } = {}) => {
      const s = split.current
      if (!s) return null
      shown.current = false
      current.current?.kill()
      const tl = gsap.timeline({ delay })
      current.current = tl
      if (variant === 'body') {
        tl.to(s.lines, { yPercent: simple ? 0 : -50, opacity: 0, duration: 0.32, stagger: 0.055, ease: 'power2.in' }, 0)
      } else if (variant === 'quote') {
        tl.to(s.words, { opacity: 0, scale: 0.85, duration: 0.35, stagger: { each: 0.03, from: 'end' }, ease: 'power2.in' }, 0)
      } else {
        linesWithWords(s).forEach(({ line, words }, i) => {
          const at = 0.08 * i
          if (words.length)
            tl.to(words, { yPercent: simple ? 0 : -30, opacity: 0, duration: 0.4, ease: 'power3.in', stagger: 0.03 }, at)
          tl.to(line, { yPercent: simple ? 0 : -100, opacity: 0, duration: 0.5, ease: 'power3.in' }, at + 0.02)
        })
      }
      return tl
    },
    buildScrubTimeline: () => {
      const s = split.current
      if (!s) return null
      const words = s.words as HTMLElement[]
      const tl = gsap.timeline({ paused: true })
      tl.set(words, { opacity: 0 }, 0).to(words, { opacity: 0.1, duration: 0.35, stagger: 0.02, ease: 'power2.out' }, 0)
      const second = 0.02 * Math.floor(0.66 * words.length) + 0.0875
      tl.to(words, { opacity: 1, duration: 0.45, stagger: 0.09, ease: 'power2.out' }, second)
      return tl
    },
    playQuoteSettle: () => {
      const s = split.current
      if (!s) return
      gsap.to(s.words, { scale: 1, x: 0, duration: 0.35, stagger: 0.02, ease: 'power2.out', overwrite: 'auto' })
    },
  }))

  return createElement(as, { ref: el, className }, text)
})

export default RevealText
