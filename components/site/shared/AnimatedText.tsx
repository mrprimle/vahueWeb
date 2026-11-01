'use client'

// Port of Scale's AnimatedText (module 947153, chunk 1h0nvyhf5gbrf.js). All timings verbatim.
import {
  createElement,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { cn } from '../lib/cn'

const DEFAULT_COLOR_IN = '#72CE7B'
const CASCADE_COLOR = '#79648C'

export type ColorVariant = { colorIn?: string | { hex?: string } }
type Split = SplitText & { masks?: HTMLElement[] }

function hasColorIn(v?: ColorVariant) {
  if (!v || typeof v !== 'object') return false
  const c = v.colorIn
  return c != null && c !== '' && (typeof c === 'string' || (typeof c === 'object' && c.hex != null && c.hex !== ''))
}
function colorInOf(v?: ColorVariant) {
  if (!hasColorIn(v)) return DEFAULT_COLOR_IN
  const c = v!.colorIn!
  return typeof c === 'string' ? c : c.hex!
}
function pairLinesWords(lines: Element[], words: Element[]) {
  const used = new Set<Element>()
  return lines.map((line) => {
    const own: Element[] = []
    for (const w of words) {
      if (!used.has(w) && line.contains(w)) {
        own.push(w)
        used.add(w)
      }
    }
    return { line, words: own }
  })
}

export type TextAnimation = {
  replaceBuiltIn?: boolean
  prepareForIn?: (split: Split, preserve?: string) => void
  onAnimateIn?: (tl: gsap.core.Timeline, ctx: AnimateInCtx) => void
  onAnimateOut?: (tl: gsap.core.Timeline, ctx: AnimateOutCtx) => void
  playStandaloneTransformIntro?: (ctx: { split: Split; rootRef?: unknown }) => void
}
type AnimateInCtx = {
  split: Split
  rootRef?: React.RefObject<HTMLElement | null>
  preserveLinesMatchingSelector?: string
  colorClearTargets: Element[]
  introDuration?: number
  introVariant?: ColorVariant
}
type AnimateOutCtx = { split: Split; preserveLinesMatchingSelector?: string; variant?: string }

function builtInIn(
  tl: gsap.core.Timeline,
  o: { splitInstance: Split; elRef: React.RefObject<HTMLElement | null>; preserve?: string; clear: Element[]; variant?: ColorVariant },
) {
  let color = DEFAULT_COLOR_IN
  if (o.elRef.current) {
    const c = getComputedStyle(o.elRef.current).color
    if (c) color = c
  }
  const f = 0.29484
  const p = 0.9 * 0.78 - 0.29484
  const solid = hasColorIn(o.variant)
  const lines = o.splitInstance.lines
  const words = o.splitInstance.words
  if (lines.length) {
    pairLinesWords(lines, words).forEach(({ line, words: lw }, index) => {
      if (o.preserve && line.querySelector?.(o.preserve)) return
      const at = 0.08 * index
      o.clear.push(line, ...lw)
      tl.to(line, { yPercent: 0, x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, at)
      if (solid) tl.to(line, { color, duration: 1, ease: 'power1.inOut' }, at)
      else {
        const r = at + 0.22
        tl.to(line, { color: CASCADE_COLOR, duration: 0.3276, ease: 'power1.inOut' }, r)
        tl.to(line, { color, duration: 0.4524, ease: 'power1.inOut' }, r + 0.3276)
      }
      if (lw.length) {
        const t = at + 0.04
        tl.to(lw, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.03 }, t)
        if (solid) tl.to(lw, { color, duration: 0.9, ease: 'power1.inOut', stagger: 0.03 }, t)
        else {
          const n = t + 0.198
          tl.to(lw, { color: CASCADE_COLOR, duration: f, ease: 'power1.inOut', stagger: 0.03 }, n)
          tl.to(lw, { color, duration: p, ease: 'power1.inOut', stagger: 0.03 }, n + f)
        }
      }
    })
  } else if (words.length) {
    o.clear.push(...words)
    tl.to(words, { yPercent: 0, x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.03 }, 0)
    if (solid) tl.to(words, { color, duration: 0.9, ease: 'power1.inOut', stagger: 0.03 }, 0)
    else {
      tl.to(words, { color: CASCADE_COLOR, duration: f, ease: 'power1.inOut', stagger: 0.03 }, 0.198)
      tl.to(words, { color, duration: p, ease: 'power1.inOut', stagger: 0.03 }, 0.198 + f)
    }
  }
}

function runIn(
  tl: gsap.core.Timeline,
  o: {
    splitInstance: Split
    elRef: React.RefObject<HTMLElement | null>
    preserve?: string
    clear: Element[]
    custom?: TextAnimation
    introDuration?: number
    variant?: ColorVariant
  },
) {
  if (o.custom?.replaceBuiltIn !== true || typeof o.custom.onAnimateIn !== 'function') builtInIn(tl, o)
  o.custom?.onAnimateIn?.(tl, {
    split: o.splitInstance,
    rootRef: o.elRef,
    preserveLinesMatchingSelector: o.preserve,
    colorClearTargets: o.clear,
    introDuration: o.introDuration,
    introVariant: o.variant,
  })
}

function runOut(tl: gsap.core.Timeline, o: { splitInstance: Split; preserve?: string; custom?: TextAnimation; variant?: string }) {
  const variant = o.variant ?? 'default'
  if (o.custom?.replaceBuiltIn !== true || typeof o.custom.onAnimateOut !== 'function') {
    const lines = o.splitInstance.lines
    const words = o.splitInstance.words
    const simple = variant === 'fadeOutSimple'
    if (lines.length) {
      pairLinesWords(lines, words).forEach(({ line, words: lw }, index) => {
        if (o.preserve && line.querySelector?.(o.preserve)) return
        const at = 0.08 * index
        if (lw.length) tl.to(lw, { yPercent: simple ? 0 : -30, opacity: 0, duration: 0.4, ease: 'power3.in', stagger: 0.03 }, at)
        tl.to(line, { yPercent: simple ? 0 : -100, opacity: 0, duration: 0.5, ease: 'power3.in' }, at + 0.02)
      })
    } else if (words.length) {
      tl.to(words, { yPercent: simple ? 0 : -30, opacity: 0, duration: 0.4, ease: 'power3.in', stagger: 0.03 }, 0)
    }
  }
  o.custom?.onAnimateOut?.(tl, { split: o.splitInstance, preserveLinesMatchingSelector: o.preserve, variant })
}

const EASE = 'power2.out'
function fadeDurations(lineCount: number, wordCount: number, requested?: number) {
  const n = lineCount > 0 ? (lineCount - 1) * 0.052 : 0
  const i = wordCount > 0 ? (wordCount - 1) * 0.025 : 0
  const min = Math.max(0.55, n + 0.2, i + 0.2)
  const T = requested != null && Number.isFinite(requested) && requested > 0 ? Math.max(requested, min) : min
  return { T, lineDur: lineCount > 0 ? T - n : 0.2, wordDur: wordCount > 0 ? T - i : 0.2 }
}

/** Scale export "H": soft rise used by several heroes. */
export const softRiseAnimation: TextAnimation = {
  replaceBuiltIn: true,
  prepareForIn(split, preserve) {
    const lines = split.lines
    const words = split.words
    if (lines?.length) {
      pairLinesWords(lines, words).forEach(({ line, words: w }) => {
        if (preserve && line.querySelector?.(preserve)) {
          gsap.set(line, { yPercent: 0, opacity: 1 })
          if (w.length) gsap.set(w, { opacity: 1 })
        } else {
          gsap.set(line, { yPercent: 50, opacity: 1 })
          if (w.length) gsap.set(w, { opacity: 0 })
        }
      })
    } else if (words?.length) gsap.set(words, { opacity: 0 })
  },
  onAnimateIn(tl, { split, preserveLinesMatchingSelector: preserve, introDuration }) {
    const lines = split.lines
    const words = split.words
    if (lines?.length) {
      const pairs = pairLinesWords(lines, words).filter(({ line }) => !(preserve && line.querySelector?.(preserve)))
      const allWords = pairs.flatMap(({ words: w }) => w)
      const { lineDur, wordDur } = fadeDurations(pairs.length, allWords.length, introDuration)
      pairs.forEach(({ line }, i) => {
        tl.to(line, { yPercent: 0, duration: lineDur, ease: 'power3.out' }, 0.052 * i)
      })
      if (allWords.length) tl.to(allWords, { opacity: 1, duration: wordDur, ease: EASE, stagger: 0.025 }, 0)
    } else if (words?.length) {
      const { wordDur } = fadeDurations(0, words.length, introDuration)
      tl.to(words, { opacity: 1, duration: wordDur, ease: EASE, stagger: 0.025 }, 0)
    }
  },
  onAnimateOut(tl, { split, preserveLinesMatchingSelector: preserve, variant = 'default' }) {
    const lines = split.lines
    const words = split.words
    if (lines?.length) {
      const list = lines.filter((l) => !(preserve && l.querySelector?.(preserve)))
      if (list.length)
        tl.to(list, { yPercent: variant === 'fadeOutSimple' ? 0 : -50, opacity: 0, duration: 0.32, stagger: 0.055, ease: 'power2.in' }, 0)
    } else if (words?.length) tl.to(words, { opacity: 0, duration: 0.28, stagger: 0.025, ease: 'power2.in' }, 0)
  },
}

/** Scale export "F": used by CMSLink buttonHover text. */
export const linkTextAnimation: TextAnimation = {
  replaceBuiltIn: true,
  prepareForIn(split) {
    if (split.words?.length) gsap.set(split.words, { opacity: 0 })
    if (split.lines?.length) gsap.set(split.lines, { y: '100%' })
  },
  onAnimateIn(tl, { split }) {
    const { words, lines } = split
    if (words?.length) tl.to(words, { opacity: 1, duration: 0.8, stagger: { each: 0.03, from: 'start' }, ease: 'power2.out' }, 0)
    if (lines?.length) tl.to(lines, { y: '0%', opacity: 1, x: 0, stagger: { each: 0.08, from: 'start' }, ease: 'power2.out' }, 0)
  },
  onAnimateOut(tl, { split }) {
    const { words, lines } = split
    if (lines?.length)
      tl.to(lines, {
        opacity: 0,
        duration: 0.8,
        x: '10%',
        stagger: { each: 0.08, from: 'end' },
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(lines, { opacity: 0, x: 0, y: '100%' })
        },
      }, 0)
    if (words?.length) tl.to(words, { opacity: 0, duration: 0.35, stagger: { each: 0.03, from: 'end' }, ease: 'power2.in' }, 0)
  },
}

const SCALE_IN_FROM = { opacity: 0, scale: 1.75, transformOrigin: '-72px -72px', x: 50 }
/** Scale export "c": word scale-in with a two-phase opacity. */
export const wordScaleAnimation: TextAnimation = {
  replaceBuiltIn: true,
  prepareForIn(split) {
    const { lines, words } = split
    if (lines?.length) gsap.set(lines, { yPercent: 0, opacity: 1 })
    if (words?.length) gsap.set(words, SCALE_IN_FROM)
  },
  onAnimateIn(tl, { split }) {
    const words = split.words
    if (!words?.length) return
    tl.set(words, { opacity: 0 }, 0)
    tl.to(words, { opacity: 0.1, duration: 0.35, stagger: 0.02, ease: 'power2.out' }, 0)
    const at = 0.02 * Math.floor(0.66 * words.length) + 0.0875
    tl.to(words, { opacity: 1, duration: 0.45, stagger: 0.09, ease: 'power2.out' }, at)
  },
  onAnimateOut(tl, { split }) {
    const words = split.words
    if (words?.length) tl.to(words, { opacity: 0, scale: 0.85, duration: 0.35, stagger: { each: 0.03, from: 'end' }, ease: 'power2.in' }, 0)
  },
  playStandaloneTransformIntro({ split }) {
    const words = split.words
    if (words?.length) gsap.to(words, { scale: 1, x: 0, duration: 0.35, stagger: 0.02, ease: 'power2.out', overwrite: 'auto' })
  },
}

/** Scale testimonial 3D flip (module 685963 "m"). */
export const flipLinesAnimation: TextAnimation = {
  replaceBuiltIn: true,
  prepareForIn(split) {
    if (split.lines?.length)
      gsap.set(split.lines, { transformPerspective: 900, transformOrigin: '50% 100%', rotationX: -90, yPercent: 108, opacity: 1, force3D: true })
  },
  onAnimateIn(tl, { split }) {
    if (split.lines?.length)
      tl.to(split.lines, { rotationX: 0, yPercent: 0, opacity: 1, duration: 0.48, stagger: 0.05, ease: 'power2.out', force3D: true }, 0)
  },
  onAnimateOut(tl, { split }) {
    if (split.lines?.length)
      tl.to(split.lines, {
        rotationX: 90,
        yPercent: (_i: number, t: HTMLElement) => {
          const h = t.offsetHeight
          if (!h) return -108
          const pad = parseFloat(getComputedStyle(t.parentElement as Element).paddingTop) || 0
          return -Math.max(108, ((h + pad + 1) / h) * ((900 + h) / 900) * 100)
        },
        opacity: 1,
        duration: 0.48,
        stagger: 0.05,
        ease: 'power2.out',
        force3D: true,
      }, 0)
  },
}

function matchChildren(line: Element, words: Element[]) {
  return words.filter((w) => line.contains(w))
}
function cascadeTargets(split: Split | null, preserve?: string) {
  if (!split) return []
  const { chars, words, lines } = split
  const ok = (el: Element) => {
    if (lines?.length) {
      for (const line of lines) {
        if (line.contains(el)) {
          if (preserve && line.querySelector?.(preserve)) return false
          break
        }
      }
    }
    return true
  }
  if (chars?.length) return chars.filter(ok)
  if (words?.length) return words.filter(ok)
  return []
}
function blockCount(el: Element) {
  return Array.from(el.children).filter((c) => /^(H[1-6]|P)$/i.test(c.tagName)).length
}
function multiBlock(el: Element) {
  if (blockCount(el) > 1) return true
  return el.children.length === 1 && blockCount(el.children[0]) > 1
}

// Shared resize handling: revert on start, resplit 150ms after the last resize.
const afterResize = new Set<() => void>()
const beforeResize = new Set<() => void>()
let resizeTimer: ReturnType<typeof setTimeout> | null = null
let listening = false
let resizing = false
function onWindowResize() {
  if (!resizing) {
    resizing = true
    beforeResize.forEach((f) => {
      try {
        f()
      } catch {}
    })
  }
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    resizeTimer = null
    resizing = false
    afterResize.forEach((f) => {
      try {
        f()
      } catch {}
    })
  }, 150)
}
function listen() {
  if (!listening) {
    window.addEventListener('resize', onWindowResize)
    listening = true
  }
}
function unlisten() {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = null
  resizing = false
  if (listening) {
    window.removeEventListener('resize', onWindowResize)
    listening = false
  }
}
function subscribe(set: Set<() => void>, f: () => void) {
  set.add(f)
  listen()
  return () => {
    set.delete(f)
    if (afterResize.size === 0 && beforeResize.size === 0) unlisten()
  }
}

// Split queue: top-most first, one per frame, after fonts are ready.
type QueueEntry = { id: number; priorityTop: number; run: () => void; token: { cancelled: boolean } }
const queue: QueueEntry[] = []
let nextId = 1
let queueFrame: number | null = null
let fontsReady = typeof document === 'undefined' || !document.fonts?.ready
function sortQueue() {
  queue.sort((a, b) => a.priorityTop - b.priorityTop)
}
function removeQueued(e: QueueEntry) {
  const i = queue.findIndex((q) => q.id === e.id)
  if (i >= 0) queue.splice(i, 1)
}
function pump() {
  if (!fontsReady || queueFrame != null || typeof requestAnimationFrame === 'undefined') return
  queueFrame = requestAnimationFrame(() => {
    queueFrame = null
    sortQueue()
    if (!queue.length) return
    const e = queue.shift()!
    if (e.token.cancelled) return pump()
    try {
      e.run()
    } catch {}
  })
}
if (!fontsReady) {
  document.fonts.ready
    .then(() => {
      fontsReady = true
      if (queue.length) pump()
    })
    .catch(() => {
      fontsReady = true
      if (queue.length) pump()
    })
}
function enqueue({ getElement, run }: { getElement: () => Element | null; run: () => void }) {
  const el = getElement()
  if (!el) {
    try {
      run()
    } catch {}
    return {
      cancel: () => {},
      flushImmediate: () => {
        try {
          run()
        } catch {}
      },
    }
  }
  const entry: QueueEntry = { id: nextId++, priorityTop: el.getBoundingClientRect().top, run, token: { cancelled: false } }
  queue.push(entry)
  sortQueue()
  pump()
  return {
    cancel: () => {
      entry.token.cancelled = true
      removeQueued(entry)
    },
    flushImmediate: () => {
      entry.token.cancelled = true
      removeQueued(entry)
      try {
        run()
      } catch {}
    },
  }
}

function connected(s: Split) {
  return !!(
    (s.lines.length > 0 && s.lines[0].isConnected) ||
    (s.words.length > 0 && s.words[0].isConnected) ||
    (s.chars?.length > 0 && s.chars[0].isConnected)
  )
}

function prepare(split: Split, preserve: string | undefined, custom: TextAnimation | undefined, variant?: ColorVariant) {
  if (custom?.replaceBuiltIn === true && typeof custom.prepareForIn === 'function') {
    custom.prepareForIn(split, preserve)
    return
  }
  const { lines, words } = split
  const color = colorInOf(variant)
  if (lines.length) {
    gsap.set(lines, { yPercent: 400, opacity: 0, color, textDecoration: 'inherit' })
    gsap.set(words, { yPercent: 0, x: '30%', opacity: 0, color, textDecoration: 'inherit' })
    if (preserve) {
      const byLine = new Map<Element, Element[]>()
      lines.forEach((l) => byLine.set(l, []))
      const lineSet = new Set<Element>(lines)
      words.forEach((w) => {
        let p: Element | null = w
        while ((p = p.parentElement)) {
          if (lineSet.has(p)) {
            byLine.get(p)!.push(w)
            break
          }
        }
      })
      const keep: Element[] = []
      lines.forEach((l) => {
        if (!l.querySelector?.(preserve)) return
        keep.push(l)
        const w = byLine.get(l)
        if (w?.length) keep.push(...w)
      })
      if (keep.length) gsap.set(keep, { yPercent: 0, x: 0, opacity: 1, textDecoration: 'inherit' })
    }
  } else if (words.length) {
    gsap.set(words, { yPercent: 40, x: '30%', opacity: 0, color, textDecoration: 'inherit' })
  }
}

function setFlags(
  t: number,
  revealed: React.RefObject<boolean>,
  visible: React.RefObject<boolean>,
  done: React.RefObject<boolean>,
) {
  if (t >= 2 || t > 1) {
    revealed.current = true
    visible.current = false
  } else if (t >= 1) {
    revealed.current = true
    visible.current = true
  } else {
    revealed.current = false
    visible.current = false
  }
  done.current = revealed.current && visible.current
}
function setVisibleClass(el: Element | null, on: boolean) {
  if (!el?.classList) return
  if (on) {
    el.classList.add('is-visible')
    el.classList.remove('isnt-visible')
  } else {
    el.classList.add('isnt-visible')
    el.classList.remove('is-visible')
  }
}

export type AnimatedTextHandle = {
  ready: () => Promise<void>
  reflowLayout: () => void
  animateIn: (o?: { duration?: number; delay?: number; variant?: ColorVariant; onStart?: (() => void) | null; restart?: boolean }) => Promise<void>
  animateColorCascadeIn: (o?: { duration?: number; delay?: number; ease?: string; variant?: ColorVariant }) => Promise<void>
  resetColorCascade: () => void
  playStandaloneTransformIntro: () => Promise<void>
  animateOut: (o?: { duration?: number; delay?: number; variant?: string }) => Promise<void>
  seek: (t: number) => void
}

export type AnimatedTextProps = {
  children?: ReactNode
  tagName?: ElementType
  type?: string
  mask?: 'lines' | 'words' | false
  lineMaskDescenderCompensation?: boolean
  className?: string
  contentKey?: unknown
  preserveLinesMatchingSelector?: string
  customAnimation?: TextAnimation
  charsClass?: string
  keepNonBreakingSpaces?: boolean
  noSplit?: boolean
  skipAutoAnimateSet?: boolean
}

const Inner = forwardRef<AnimatedTextHandle, AnimatedTextProps>(function AnimatedText(
  {
    children,
    tagName = 'h1',
    type = 'words, lines',
    mask = 'lines',
    lineMaskDescenderCompensation = true,
    className,
    contentKey,
    preserveLinesMatchingSelector: preserve,
    customAnimation,
    charsClass,
    keepNonBreakingSpaces = false,
    noSplit = false,
    skipAutoAnimateSet = false,
  },
  ref,
) {
  const el = useRef<HTMLElement>(null)
  const split = useRef<Split | null>(null)
  const active = useRef<gsap.core.Animation | null>(null)
  const master = useRef<{
    split: Split
    customAnimation?: TextAnimation
    master: gsap.core.Timeline
    inDur: number
    outDur: number
    colorClearTargets: Element[]
  } | null>(null)
  const seekValue = useRef<number | undefined>(undefined)
  const revealed = useRef(false)
  const visible = useRef(false)
  const done = useRef(false)
  const unsplit = useRef(false)
  const queued = useRef<ReturnType<typeof enqueue> | null>(null)
  const opts = useRef({ type, mask, lineMaskDescenderCompensation, preserve, charsClass, keepNonBreakingSpaces, customAnimation, noSplit, skipAutoAnimateSet })
  opts.current = { type, mask, lineMaskDescenderCompensation, preserve, charsClass, keepNonBreakingSpaces, customAnimation, noSplit, skipAutoAnimateSet }

  const killMaster = useCallback(() => {
    const m = master.current
    if (m?.master) {
      if (active.current === m.master) active.current = null
      m.master.kill()
    }
    master.current = null
  }, [])
  const killActive = useCallback(() => {
    if (active.current) {
      active.current.kill()
      active.current = null
    }
    master.current = null
  }, [])

  const seekSplit = useCallback(
    (value: number) => {
      const s = split.current
      if (!s || !connected(s)) return
      const { preserve: pr, customAnimation: custom, skipAutoAnimateSet: skip } = opts.current
      const t = Math.max(0, Math.min(2, value))
      let m = master.current
      if (!m || m.split !== s || m.customAnimation !== custom) {
        killActive()
        if (t < 1 && !skip) prepare(s, pr, custom, undefined)
        const clear: Element[] = []
        const inTl = gsap.timeline()
        runIn(inTl, { splitInstance: s, elRef: el, preserve: pr, clear, custom })
        const outTl = gsap.timeline()
        runOut(outTl, { splitInstance: s, preserve: pr, custom, variant: 'default' })
        const tl = gsap.timeline({ paused: true })
        tl.add(inTl)
        tl.add(outTl)
        m = master.current = { split: s, customAnimation: custom, master: tl, inDur: inTl.duration(), outDur: outTl.duration(), colorClearTargets: clear }
        active.current = tl
      }
      m.master.totalTime(t <= 1 ? t * m.inDur : m.inDur + (t - 1) * m.outDur)
      if (t >= 1 && m.colorClearTargets.length) gsap.set(m.colorClearTargets, { clearProps: 'color' })
      setFlags(t, revealed, visible, done)
    },
    [killActive],
  )

  const build = useCallback(() => {
    if (!el.current) return
    const o = opts.current
    if (split.current) {
      killMaster()
      split.current.revert()
    }
    if (o.noSplit || multiBlock(el.current)) {
      split.current = null
      unsplit.current = true
      el.current.style.opacity = '1'
      return
    }
    unsplit.current = false
    const config: SplitText.Vars = { type: o.type, wordsClass: 'word' }
    if (o.mask === 'lines') config.mask = 'lines'
    else if (o.mask === 'words') config.mask = 'words'
    if (o.charsClass) config.charsClass = o.charsClass
    if (o.keepNonBreakingSpaces) {
      config.reduceWhiteSpace = false
      config.prepareText = (text: string) => text.replace(/[^\S ]+/g, ' ')
    }
    config.onSplit = () => {}
    split.current = new SplitText(el.current, config) as Split
    const s = split.current
    if (!s) return
    if (o.mask === 'lines' && o.lineMaskDescenderCompensation && s.masks?.length) {
      gsap.set(s.masks, { paddingTop: '0.12em', marginTop: '-0.12em', paddingBottom: '0.12em', marginBottom: '-0.12em' })
    }
    if (revealed.current) {
      const state = visible.current ? 'visible' : 'out'
      const { lines, words } = s
      if (state === 'visible') {
        if (lines.length) {
          gsap.set(lines, { yPercent: 0, x: 0, opacity: 1 })
          gsap.set(words, { yPercent: 0, x: 0, opacity: 1 })
        } else if (words.length) gsap.set(words, { yPercent: 0, x: 0, opacity: 1 })
      } else if (lines.length) {
        lines.forEach((line) => {
          if (o.preserve && line.querySelector?.(o.preserve)) {
            gsap.set(line, { yPercent: 0, opacity: 1 })
            const w = matchChildren(line, words)
            if (w.length) gsap.set(w, { yPercent: 0, opacity: 1 })
          } else {
            gsap.set(line, { yPercent: -100, opacity: 0 })
            const w = matchChildren(line, words)
            if (w.length) gsap.set(w, { yPercent: -30, opacity: 0 })
          }
        })
      } else if (words.length) gsap.set(words, { yPercent: -30, opacity: 0 })
    } else if (!o.skipAutoAnimateSet) prepare(s, o.preserve, o.customAnimation, undefined)
    el.current.style.opacity = '1'
    if (typeof seekValue.current === 'number') seekSplit(seekValue.current)
    const node = el.current
    if (node) {
      if (revealed.current) setVisibleClass(node, visible.current)
      else setVisibleClass(node, false)
    }
  }, [killMaster, seekSplit])

  const reflow = useCallback(() => {
    const s = split.current
    if (!s || !connected(s)) {
      if (revealed.current && el.current && !unsplit.current) {
        killActive()
        build()
      }
      return
    }
    const a = active.current as (gsap.core.Animation & { isActive?: () => boolean; progress?: () => number }) | null
    if (a && !revealed.current && (a.isActive?.() || (a.progress?.() ?? 0) < 1)) return
    if (done.current) {
      if (a?.isActive?.()) return
      killActive()
      build()
      return
    }
    if (!a?.isActive?.()) {
      killActive()
      build()
    }
  }, [build, killActive])

  const reflowRef = useRef(reflow)
  useLayoutEffect(() => {
    reflowRef.current = reflow
    if (!el.current) return
    const offAfter = subscribe(afterResize, () => reflowRef.current())
    const offBefore = subscribe(beforeResize, () => {
      if (!revealed.current) return
      const s = split.current
      if (s && connected(s)) {
        killActive()
        s.revert()
        split.current = null
        if (el.current) el.current.style.opacity = '1'
      }
    })
    if (!split.current || !connected(split.current)) {
      queued.current?.cancel()
      queued.current = enqueue({
        getElement: () => el.current,
        run: () => {
          try {
            build()
          } finally {
            if (queue.length) pump()
          }
        },
      })
    }
    return () => {
      queued.current?.cancel()
      queued.current = null
      offAfter()
      offBefore()
      killActive()
      split.current?.revert()
      split.current = null
    }
  }, [build, contentKey, type, mask, noSplit, preserve, charsClass, keepNonBreakingSpaces, customAnimation, skipAutoAnimateSet, killActive, reflow])

  const ready = useCallback(async () => {
    for (let i = 0; i < 120; i += 1) {
      const node = el.current
      if (!node || unsplit.current) return
      if (!node.textContent?.trim()) {
        await new Promise<void>((r) => requestAnimationFrame(() => r()))
        continue
      }
      const s = split.current
      if (s && connected(s)) return
      if (queued.current) queued.current.flushImmediate()
      else build()
      if (split.current && connected(split.current)) return
      await new Promise<void>((r) => requestAnimationFrame(() => r()))
    }
  }, [build])

  useImperativeHandle(
    ref,
    () => ({
      ready: () => ready(),
      reflowLayout: () => reflow(),
      animateIn: ({ duration = 0.85, delay = 0, variant, onStart = null, restart = false } = {}) =>
        ready().then(
          () =>
            new Promise<void>((resolve) => {
              if (restart) {
                killActive()
                revealed.current = false
                visible.current = false
                done.current = false
              }
              const finish = () => {
                revealed.current = true
                visible.current = true
                done.current = true
                resolve()
              }
              if (unsplit.current) {
                done.current = false
                const node = el.current
                if (!node) return resolve()
                setVisibleClass(node, true)
                if (noSplit) {
                  gsap.set(node, { opacity: 1 })
                  finish()
                  return
                }
                gsap.set(node, { opacity: 0 })
                active.current = gsap.to(node, { opacity: 1, delay, duration, ease: 'power2.out', onComplete: finish })
                return
              }
              const s = split.current
              if (!s) return resolve()
              setVisibleClass(el.current, true)
              done.current = false
              if (!visible.current) prepare(s, preserve, customAnimation, variant)
              const clear: Element[] = []
              const tl = gsap.timeline({
                delay,
                onStart: () => {
                  onStart?.()
                },
                onComplete: () => {
                  if (clear.length) gsap.set(clear, { clearProps: 'color' })
                  finish()
                },
              })
              active.current = tl
              runIn(tl, { splitInstance: s, elRef: el, preserve, clear, custom: customAnimation, introDuration: duration, variant })
            }),
        ),
      animateColorCascadeIn: ({ duration = 0.45, delay = 0, ease = 'power2.out', variant } = {}) =>
        ready().then(
          () =>
            new Promise<void>((resolve) => {
              killActive()
              if (unsplit.current) return resolve()
              const s = split.current
              if (!s || !connected(s)) return resolve()
              const targets = cascadeTargets(s, preserve)
              if (!targets.length) return resolve()
              let color = 'black'
              if (el.current) {
                const c = getComputedStyle(el.current).color
                if (c) color = c
              }
              gsap.set(targets, { color: colorInOf(variant), overwrite: 'auto' })
              active.current = gsap.to(targets, {
                color,
                duration,
                delay,
                ease,
                stagger: { each: 0.03, from: 'start' },
                overwrite: 'auto',
                onComplete: () => {
                  gsap.set(targets, { clearProps: 'color' })
                  resolve()
                },
              })
            }),
        ),
      resetColorCascade() {
        if (unsplit.current) return
        killActive()
        const s = split.current
        if (!s || !connected(s)) return
        const targets = cascadeTargets(s, preserve)
        if (targets.length) gsap.set(targets, { clearProps: 'color' })
      },
      playStandaloneTransformIntro() {
        const play = customAnimation?.playStandaloneTransformIntro
        if (typeof play !== 'function') return Promise.resolve()
        return ready().then(() => {
          if (unsplit.current) return
          const s = split.current
          if (s && connected(s)) play({ split: s, rootRef: el })
        })
      },
      animateOut: ({ duration = 0.85, delay = 0, variant = 'default' } = {}) =>
        ready().then(
          () =>
            new Promise<void>((resolve) => {
              killActive()
              done.current = false
              const finish = () => {
                visible.current = false
                revealed.current = false
                resolve()
              }
              if (unsplit.current) {
                const node = el.current
                if (!node) return resolve()
                setVisibleClass(node, false)
                if (noSplit) {
                  gsap.set(node, { opacity: 0 })
                  finish()
                  return
                }
                active.current = gsap.to(node, { opacity: 0, delay, duration, ease: 'power2.in', onComplete: finish })
                return
              }
              const tl = gsap.timeline({ delay, onComplete: finish })
              active.current = tl
              const s = split.current
              if (s) {
                setVisibleClass(el.current, false)
                runOut(tl, { splitInstance: s, preserve, custom: customAnimation, variant })
              } else resolve()
            }),
        ),
      seek(value) {
        const t = Math.max(0, Math.min(2, value))
        seekValue.current = t
        const node = el.current
        const seekPlain = () => {
          if (!node) return
          if (noSplit) gsap.set(node, { opacity: t <= 1 ? 1 : Math.max(0, 2 - t) })
          else gsap.set(node, { opacity: t <= 1 ? t : Math.max(0, 2 - t) })
          setFlags(t, revealed, visible, done)
        }
        if (unsplit.current && node) return seekPlain()
        const s = split.current
        if (!s || !connected(s)) {
          if (queued.current) queued.current.flushImmediate()
          else build()
          if (unsplit.current && node) seekPlain()
          return
        }
        seekSplit(t)
      },
    }),
    [ready, preserve, killActive, seekSplit, build, customAnimation, noSplit, reflow],
  )

  return createElement(tagName, { ref: el, className: cn('AnimatedText', 'isnt-visible', className) }, children)
})
Inner.displayName = 'AnimatedText'

export const AnimatedText = memo(Inner)
AnimatedText.displayName = 'AnimatedText'
export default AnimatedText
