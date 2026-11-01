import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/*
 * Motion for workflow pages built on the generative-ai-data-engine clone, ported from scale.com's production chunks:
 *
 *  AnimatedText (default)   SplitText "words, lines", mask lines (+0.12em descender pad).
 *                           lines  yPercent 400 -> 0, opacity 0 -> 1, 1s power3.out, line i at 0.08*i
 *                           words  x 30% -> 0, opacity 0 -> 1, 0.9s power3.out, stagger 0.03, at line+0.04
 *                           colour #72CE7B -> #79648C (0.3276s) -> CSS colour (0.4524s), power1.inOut
 *  AnimatedText (flip)      testimonial quote/name: lines, transformPerspective 900, origin 50% 100%,
 *                           rotationX -90 / yPercent 108 -> 0, 0.48s power2.out, stagger 0.05
 *  ClipScrollSection        ScrollTrigger "top bottom" -> "center center", clip inset 0.5*start% -> 0,
 *                           media layer scale 1.25 -> 1
 */

export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

const COLOR_IN = '#72CE7B'
const COLOR_MID = '#79648C'

export type Reveal = { play: (delay?: number) => gsap.core.Timeline; revert: () => void }

const linesWithWords = (split: SplitText) => {
  const seen = new Set<Element>()
  return (split.lines as HTMLElement[]).map((line) => ({
    line,
    words: (split.words as HTMLElement[]).filter((w) => {
      if (seen.has(w) || !line.contains(w)) return false
      seen.add(w)
      return true
    }),
  }))
}

/** Splits `el` and parks it in its pre-entrance state. `play` builds the entrance timeline. */
export function prepareText(el: HTMLElement, variant: 'default' | 'flip' = 'default'): Reveal {
  const split = SplitText.create(el, {
    type: variant === 'flip' ? 'lines' : 'words,lines',
    mask: 'lines',
    wordsClass: 'word',
    aria: 'auto',
  })
  if (split.masks?.length) {
    gsap.set(split.masks, { paddingTop: '0.12em', marginTop: '-0.12em', paddingBottom: '0.12em', marginBottom: '-0.12em' })
  }
  if (variant === 'flip') {
    gsap.set(split.lines, { transformPerspective: 900, transformOrigin: '50% 100%', rotationX: -90, yPercent: 108, opacity: 1, force3D: true })
  } else {
    gsap.set(split.lines, { yPercent: 400, opacity: 0, color: COLOR_IN })
    gsap.set(split.words, { yPercent: 0, x: '30%', opacity: 0, color: COLOR_IN })
  }

  const play = (delay = 0) => {
    const tl = gsap.timeline({ delay })
    if (variant === 'flip') {
      tl.to(split.lines, { rotationX: 0, yPercent: 0, opacity: 1, duration: 0.48, stagger: 0.05, ease: 'power2.out', force3D: true }, 0)
      return tl
    }
    const final = getComputedStyle(el).color
    const clear: HTMLElement[] = []
    linesWithWords(split).forEach(({ line, words }, i) => {
      const at = 0.08 * i
      clear.push(line, ...words)
      tl.to(line, { yPercent: 0, x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, at)
      tl.to(line, { color: COLOR_MID, duration: 0.3276, ease: 'power1.inOut' }, at + 0.22)
      tl.to(line, { color: final, duration: 0.4524, ease: 'power1.inOut' }, at + 0.22 + 0.3276)
      if (words.length) {
        const w = at + 0.04
        tl.to(words, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.03 }, w)
        tl.to(words, { color: COLOR_MID, duration: 0.29484, ease: 'power1.inOut', stagger: 0.03 }, w + 0.198)
        tl.to(words, { color: final, duration: 0.9 * 0.78 - 0.29484, ease: 'power1.inOut', stagger: 0.03 }, w + 0.198 + 0.29484)
      }
    })
    tl.add(() => gsap.set(clear, { clearProps: 'color' }))
    return tl
  }

  return { play, revert: () => split.revert() }
}

/** Waits for webfonts so SplitText measures the final line breaks. */
export const fontsReady = () => (document.fonts?.ready ?? Promise.resolve()).then(() => undefined)

/*
 * ClientTestimonials role tag (scale.com chunk 3hpmz3b0is2de.js, ClientName.animateToText):
 * the tag shrinks to 20px (0.5s power3.out, after `delay`), the text is swapped in and measured, then after
 * 10ms the text fades to opacity 1 (0.5s linear) while the tag grows to text width + 26px (0.5s power3.out).
 * 26px = px-2 padding (16) + 6px triangle + 4px gap.
 */
export async function animateToText(wrap: HTMLElement, textEl: HTMLElement, text: string, delay = 0) {
  await gsap.to(wrap, { width: 20, duration: 0.5, ease: 'power3.out', delay })
  textEl.textContent = text.trim()
  const w = textEl.getBoundingClientRect().width
  await new Promise((r) => setTimeout(r, 10))
  gsap.to(textEl, { opacity: 1, duration: 0.5, ease: 'none' })
  await gsap.to(wrap, { width: w + 26, duration: 0.5, ease: 'power3.out' })
}

/*
 * ClientTestimonials logo tab (same chunk, component `u`): its white fill sits off the button while inactive
 * (y 100% on desktop, x 100% when `(max-width: 768px)` matches) and slides to 0 in 0.3s (GSAP default ease)
 * when the tab becomes active; the button colour switches from the contrast colour to the theme colour.
 */
export const tabAxis = () => (matchMedia('(max-width: 768px)').matches ? 'x' : 'y')
