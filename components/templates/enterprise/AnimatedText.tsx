'use client'

import { createElement, forwardRef, useImperativeHandle, useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

/*
 * Port of scale.com's AnimatedText (chunk 1h0nvyhf5gbrf, module 668761).
 *
 * default  SplitText lines+words, masked lines. Set: lines yPercent 400 / opacity 0, words x 30% / opacity 0,
 *          all tinted #72CE7B. In: per line i at 0.08*i, line -> 0 over 1s power3.out; words (+0.04) x -> 0
 *          over 0.9s stagger 0.03; colour passes #79648C then settles on the CSS colour.
 * flip     testimonial variant: lines rotationX -90 / yPercent 108 (perspective 900, origin 50% 100%)
 *          -> 0 over 0.48s power2.out stagger 0.05; out rotates to +90 and lifts by the line height.
 * lift     custom animation "H" (module 947153, pull-apart subheadings): lines yPercent 50 -> 0 (power3.out,
 *          line i at 0.052*i, duration max(.55, ...)), words opacity 0 -> 1 (power2.out, stagger 0.025).
 *          Out: lines yPercent -50 / opacity 0, 0.32s power2.in, stagger 0.055.
 */

const GREEN = '#72CE7B'
const PURPLE = '#79648C'

export type AnimatedTextVariant = 'default' | 'flip' | 'lift'
export type AnimatedTextHandle = {
  ready: () => Promise<void>
  animateIn: (o?: { delay?: number }) => Promise<void>
  animateOut: (o?: { delay?: number }) => Promise<void>
}

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div'
  className?: string
  variant?: AnimatedTextVariant
  /** Adds 0.12em padding/negative margin to each line mask so descenders aren't clipped. */
  maskCompensation?: boolean
  children: ReactNode
}

const reduced = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

const linesWithWords = (s: SplitText) =>
  (s.lines as HTMLElement[]).map((line) => ({ line, words: (s.words as HTMLElement[]).filter((w) => line.contains(w)) }))

const AnimatedText = forwardRef<AnimatedTextHandle, Props>(function AnimatedText(
  { as = 'div', className, variant = 'default', maskCompensation = true, children },
  ref,
) {
  const el = useRef<HTMLElement>(null)
  const split = useRef<SplitText | null>(null)
  const state = useRef<'out' | 'in'>('out')
  const tl = useRef<gsap.core.Timeline | null>(null)
  const waiters = useRef<(() => void)[]>([])

  const applyState = () => {
    const s = split.current
    if (!s) return
    const lines = s.lines as HTMLElement[]
    const words = s.words as HTMLElement[]
    if (state.current === 'in') {
      gsap.set(lines, { clearProps: 'transform,opacity,color' })
      if (words.length) gsap.set(words, { clearProps: 'transform,opacity,color' })
      return
    }
    if (variant === 'flip') {
      gsap.set(lines, { transformPerspective: 900, transformOrigin: '50% 100%', rotationX: -90, yPercent: 108, opacity: 1, force3D: true })
    } else if (variant === 'lift') {
      gsap.set(lines, { yPercent: 50, opacity: 1 })
      gsap.set(words, { opacity: 0 })
    } else {
      gsap.set(lines, { yPercent: 400, opacity: 0, color: GREEN })
      gsap.set(words, { yPercent: 0, x: '30%', opacity: 0, color: GREEN })
    }
  }

  useLayoutEffect(() => {
    const node = el.current
    if (!node || reduced()) {
      // Reduced motion: no split. Flip items (testimonials) start hidden and swap by opacity.
      if (node) node.style.opacity = variant === 'flip' && state.current === 'out' ? '0' : '1'
      waiters.current.splice(0).forEach((w) => w())
      return
    }
    let cancelled = false
    const run = () => {
      if (cancelled) return
      split.current = SplitText.create(node, {
        type: variant === 'flip' ? 'lines' : 'lines,words',
        wordsClass: 'word',
        mask: 'lines',
        aria: 'auto',
        autoSplit: true,
        onSplit(self) {
          split.current = self
          if (maskCompensation && self.masks?.length) {
            gsap.set(self.masks, { paddingTop: '0.12em', marginTop: '-0.12em', paddingBottom: '0.12em', marginBottom: '-0.12em' })
          }
          tl.current?.progress(1)
          applyState()
        },
      })
      node.style.opacity = '1'
      waiters.current.splice(0).forEach((w) => w())
    }
    if (document.fonts?.status === 'loaded') run()
    else document.fonts.ready.then(run)
    return () => {
      cancelled = true
      tl.current?.kill()
      split.current?.revert()
      split.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, maskCompensation])

  useImperativeHandle(ref, () => {
    const ready = () =>
      new Promise<void>((resolve) => {
        if (split.current || reduced()) resolve()
        else waiters.current.push(resolve)
      })

    const animateIn = ({ delay = 0 } = {}) =>
      ready().then(
        () =>
          new Promise<void>((resolve) => {
            const s = split.current
            tl.current?.kill()
            if (!s || !el.current) {
              state.current = 'in'
              if (el.current) el.current.style.opacity = '1'
              return resolve()
            }
            state.current = 'out'
            applyState()
            state.current = 'in'
            const t = gsap.timeline({ delay, onComplete: () => resolve() })
            tl.current = t
            if (variant === 'flip') {
              t.to(s.lines, { rotationX: 0, yPercent: 0, opacity: 1, duration: 0.48, stagger: 0.05, ease: 'power2.out', force3D: true }, 0)
              return
            }
            if (variant === 'lift') {
              const lines = s.lines as HTMLElement[]
              const words = s.words as HTMLElement[]
              const nL = lines.length
              const nW = words.length
              const lineOff = nL > 0 ? (nL - 1) * 0.052 : 0
              const wordOff = nW > 0 ? (nW - 1) * 0.025 : 0
              const T = Math.max(0.55, lineOff + 0.2, wordOff + 0.2)
              lines.forEach((line, i) => t.to(line, { yPercent: 0, duration: nL ? T - lineOff : 0.2, ease: 'power3.out' }, 0.052 * i))
              if (nW) t.to(words, { opacity: 1, duration: T - wordOff, ease: 'power2.out', stagger: 0.025 }, 0)
              return
            }
            const final = getComputedStyle(el.current).color || '#000'
            const clear: HTMLElement[] = []
            linesWithWords(s).forEach(({ line, words }, i) => {
              const a = 0.08 * i
              clear.push(line, ...words)
              t.to(line, { yPercent: 0, x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, a)
              t.to(line, { color: PURPLE, duration: 0.3276, ease: 'power1.inOut' }, a + 0.22)
              t.to(line, { color: final, duration: 0.4524, ease: 'power1.inOut' }, a + 0.22 + 0.3276)
              if (words.length) {
                const w = a + 0.04
                t.to(words, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.03 }, w)
                t.to(words, { color: PURPLE, duration: 0.29484, ease: 'power1.inOut', stagger: 0.03 }, w + 0.198)
                t.to(words, { color: final, duration: 0.9 * 0.78 - 0.29484, ease: 'power1.inOut', stagger: 0.03 }, w + 0.198 + 0.29484)
              }
            })
            t.add(() => gsap.set(clear, { clearProps: 'color' }))
          }),
      )

    const animateOut = ({ delay = 0 } = {}) =>
      ready().then(
        () =>
          new Promise<void>((resolve) => {
            const s = split.current
            tl.current?.kill()
            state.current = 'out'
            if (!s) {
              if (el.current && variant === 'flip') el.current.style.opacity = '0'
              return resolve()
            }
            const t = gsap.timeline({ delay, onComplete: () => resolve() })
            tl.current = t
            if (variant === 'flip') {
              t.to(
                s.lines,
                {
                  transformPerspective: 900,
                  transformOrigin: '50% 100%',
                  rotationX: 90,
                  yPercent: (_: number, line: HTMLElement) => {
                    const h = line.offsetHeight
                    if (!h) return -108
                    const pad = parseFloat(getComputedStyle(line.parentElement as Element).paddingTop) || 0
                    return -Math.max(108, ((h + pad + 1) / h) * ((900 + h) / 900) * 100)
                  },
                  opacity: 1,
                  duration: 0.48,
                  stagger: 0.05,
                  ease: 'power2.out',
                  force3D: true,
                },
                0,
              )
              return
            }
            if (variant === 'lift') {
              t.to(s.lines, { yPercent: -50, opacity: 0, duration: 0.32, stagger: 0.055, ease: 'power2.in' }, 0)
              return
            }
            linesWithWords(s).forEach(({ line, words }, i) => {
              const a = 0.08 * i
              if (words.length) t.to(words, { yPercent: -30, opacity: 0, duration: 0.4, ease: 'power3.in', stagger: 0.03 }, a)
              t.to(line, { yPercent: -100, opacity: 0, duration: 0.5, ease: 'power3.in' }, a + 0.02)
            })
          }),
      )

    return { ready, animateIn, animateOut }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant])

  // Hidden until split so the pre-entrance state never flashes.
  return createElement(as, { ref: el, className, style: { opacity: 0 } }, children)
})

export default AnimatedText
