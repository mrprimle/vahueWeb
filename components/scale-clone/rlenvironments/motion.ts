import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }

export const reducedMotion = () =>
  typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// scale.com AnimatedText default intro (chunk 1h0nvyhf5gbrf.js):
// split "words, lines" with masked lines. Lines start yPercent 400 / opacity 0,
// words start x 30% / opacity 0, both tinted green (#72CE7B). Each line i starts at
// 0.08*i: line rises over 1s power3.out, words slide in 0.9s power3.out (stagger 0.03)
// and the colour cascades green -> purple (#79648C) -> the element's own colour.
const CASCADE_IN = '#72CE7B'
const CASCADE_MID = '#79648C'

export function prepareCascade(el: HTMLElement) {
  const split = SplitText.create(el, { type: 'words,lines', mask: 'lines', aria: 'auto' })
  const finalColor = getComputedStyle(el).color
  gsap.set(split.lines, { yPercent: 400, opacity: 0, color: CASCADE_IN })
  gsap.set(split.words, { x: '30%', opacity: 0, color: CASCADE_IN })
  return { split, finalColor }
}

export function playCascade(
  { split, finalColor }: ReturnType<typeof prepareCascade>,
  delay = 0,
  wordStagger = 0.03,
): gsap.core.Timeline {
  const tl = gsap.timeline({ delay })
  const wordsLeft = new Set(split.words as HTMLElement[])
  ;(split.lines as HTMLElement[]).forEach((line, i) => {
    const words = [...wordsLeft].filter((w) => line.contains(w))
    words.forEach((w) => wordsLeft.delete(w))
    const a = 0.08 * i
    tl.to(line, { yPercent: 0, x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, a)
    tl.to(line, { color: CASCADE_MID, duration: 0.3276, ease: 'power1.inOut' }, a + 0.22)
    tl.to(line, { color: finalColor, duration: 0.4524, ease: 'power1.inOut' }, a + 0.22 + 0.3276)
    if (!words.length) return
    const t = a + 0.04
    tl.to(words, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: wordStagger }, t)
    tl.to(words, { color: CASCADE_MID, duration: 0.29484, ease: 'power1.inOut', stagger: wordStagger }, t + 0.198)
    tl.to(words, { color: finalColor, duration: 0.9 * 0.78 - 0.29484, ease: 'power1.inOut', stagger: wordStagger }, t + 0.198 + 0.29484)
  })
  tl.add(() => gsap.set([...split.lines, ...split.words], { clearProps: 'color' }))
  return tl
}

// scale.com ResponsiveVideo (chunk 37xz28pjbnlx4.js, module 310080): an autoplay + muted video only plays while
// it is in the viewport. An IntersectionObserver (threshold 0) plays/pauses it, and a rect check
// (bottom >= 0 && top <= innerHeight) runs on mount and on window pageshow / focus / scroll (passive) / resize and
// document visibilitychange. There is no reduced-motion branch: the video plays either way.
export function observeInViewPlayback(video: HTMLVideoElement | null) {
  if (!video) return () => {}
  const check = () => {
    const r = video.getBoundingClientRect()
    if (r.bottom >= 0 && r.top <= window.innerHeight) video.play().catch(() => {})
    else video.pause()
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.target === video) (e.isIntersecting ? video.play().catch(() => {}) : video.pause())
    },
    { threshold: 0 },
  )
  io.observe(video)
  window.addEventListener('pageshow', check)
  document.addEventListener('visibilitychange', check)
  window.addEventListener('focus', check)
  window.addEventListener('scroll', check, { passive: true })
  window.addEventListener('resize', check)
  check()
  return () => {
    io.disconnect()
    window.removeEventListener('pageshow', check)
    document.removeEventListener('visibilitychange', check)
    window.removeEventListener('focus', check)
    window.removeEventListener('scroll', check)
    window.removeEventListener('resize', check)
  }
}

// scale.com useScrollTrigger hook (module 210104) with retroactiveOnEnter: besides ScrollTrigger's own onEnter,
// it fires onEnter on every refresh once the trigger's progress > 0 or the scroll is at/after start - 1, so a
// page loaded or restored below the section still plays the intro. Callers guard against repeats.
export function retroactiveEnter(st: ScrollTrigger, fire: () => void) {
  const check = () => {
    if (st.progress > 0 || st.scroll() >= st.start - 1) fire()
  }
  ScrollTrigger.addEventListener('refresh', check)
  check()
  return () => ScrollTrigger.removeEventListener('refresh', check)
}

// scale.com CardGrid (module 540409) defers its intro while the tab is hidden: onEnter marks it pending, and a
// document visibilitychange to "visible" plays it.
export function whenVisible(fire: () => void) {
  if (typeof document === 'undefined' || !document.hidden) {
    fire()
    return () => {}
  }
  const onVis = () => {
    if (document.visibilityState !== 'visible') return
    document.removeEventListener('visibilitychange', onVis)
    fire()
  }
  document.addEventListener('visibilitychange', onVis)
  return () => document.removeEventListener('visibilitychange', onVis)
}
