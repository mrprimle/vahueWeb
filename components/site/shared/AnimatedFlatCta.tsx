'use client'

// Scale module 961870: FlatCta with an intro timeline.
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { FlatCta, type FlatCtaProps } from './FlatCta'

const WHITE = '#ffffff'
const OUT2 = 'power2.out'
const OUT3 = 'power3.out'
const INOUT3 = 'power3.inOut'

type Refs = {
  root: React.RefObject<HTMLElement | null>
  counterScale: React.RefObject<HTMLDivElement | null>
  textEl: React.RefObject<HTMLSpanElement | null>
  arrowEl: React.RefObject<HTMLDivElement | null>
}
type Intro = {
  prepareForIn: (r: Refs, o?: { direction?: 'left' | 'right' }) => void
  appendAnimateIn: (tl: gsap.core.Timeline, r: Refs, o?: { totalDuration?: number; direction?: 'left' | 'right' }) => void
}
const nodes = (r: Refs) => ({ root: r.root.current, counter: r.counterScale.current, text: r.textEl.current, arrow: r.arrowEl.current })

export const flatCtaIntros: Record<'filledEvergreenArrow' | 'filledWhiteArrow' | 'fadeIn', Intro> = {
  filledEvergreenArrow: {
    prepareForIn(r, { direction = 'right' } = {}) {
      const { root, counter, text, arrow } = nodes(r)
      if (!root || !counter) return
      root.removeAttribute('data-flat-cta-intro-done')
      gsap.set(root, {
        autoAlpha: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: 'transparent',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,1)',
        color: WHITE,
        scaleX: 0.4,
        scaleY: 1.15,
        transformOrigin: '50% 50%',
      })
      gsap.set(counter, { scaleX: 2.5, scaleY: 1 / 1.15, transformOrigin: '50% 50%' })
      if (text) gsap.set(text, { x: direction === 'left' ? -6 : 6 })
      if (arrow) gsap.set(arrow, { x: direction === 'left' ? 6 : -6, backgroundColor: 'transparent', color: WHITE })
    },
    appendAnimateIn(tl, r, { totalDuration = 0.85, direction = 'right' } = {}) {
      const { root, counter, text, arrow } = nodes(r)
      if (!root || !counter) return
      const half = 0.5 * totalDuration
      const rest = (totalDuration - half) * 0.55
      if (text) gsap.set(text, { x: direction === 'left' ? -6 : 6 })
      if (arrow) gsap.set(arrow, { x: direction === 'left' ? 6 : -6 })
      tl.to(root, { scaleY: 1, duration: totalDuration, ease: 'power2.inOut' }, 0)
      tl.to(
        counter,
        {
          scaleY: 1,
          duration: totalDuration,
          ease: 'none',
          modifiers: {
            scaleY: () => {
              const v = parseFloat(String(gsap.getProperty(root, 'scaleY')))
              return Number.isFinite(v) && v !== 0 ? 1 / v : 1
            },
          },
        },
        0,
      )
      tl.to(root, { autoAlpha: 1, scaleX: 1, duration: half, ease: OUT2 }, 0)
      tl.to(counter, { scaleX: 1, duration: half, ease: OUT2 }, 0)
      tl.to(root, { scaleX: 1, duration: rest, ease: OUT3 }, half)
      tl.to(counter, { scaleX: 1, duration: rest, ease: OUT3 }, half)
      const both = [text, arrow].filter(Boolean)
      if (both.length) tl.to(both, { x: 0, duration: half, ease: 'power3.inOut' }, half)
      tl.to(root, { backgroundColor: '#193A29', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0)', color: WHITE, duration: half, ease: INOUT3 }, half)
      if (arrow) tl.to(arrow, { color: WHITE, duration: half, ease: INOUT3 }, half)
      tl.add(() => {
        gsap.set(counter, { clearProps: 'transform' })
        if (text) gsap.set(text, { clearProps: 'x' })
        if (arrow) gsap.set(arrow, { clearProps: 'x,backgroundColor,color' })
        gsap.set(root, { clearProps: 'backgroundColor,borderWidth,borderStyle,borderColor,boxShadow,color,opacity,visibility,transform,transformOrigin' })
        root.setAttribute('data-flat-cta-intro-done', 'true')
      })
    },
  },
  filledWhiteArrow: {
    prepareForIn(r, { direction = 'right' } = {}) {
      const { root, counter, text, arrow } = nodes(r)
      if (!root || !counter) return
      root.removeAttribute('data-flat-cta-intro-done')
      gsap.set(root, { autoAlpha: 0, borderRadius: 0, scaleX: 0, transformOrigin: 'left center' })
      gsap.set(counter, { scaleX: 0, transformOrigin: 'left center' })
      if (text) gsap.set(text, { opacity: 0 })
      if (arrow) gsap.set(arrow, { x: direction === 'left' ? 6 : -6 })
    },
    appendAnimateIn(tl, r, { totalDuration = 0.85, direction = 'right' } = {}) {
      const { root, counter, text, arrow } = nodes(r)
      if (!root || !counter) return
      if (arrow) gsap.set(arrow, { x: direction === 'left' ? 6 : -6 })
      tl.to(root, { autoAlpha: 1, borderRadius: 8, scaleX: 1, duration: totalDuration, ease: OUT3 }, 0)
      tl.to(counter, { scaleX: 1, duration: totalDuration, ease: OUT3 }, 0.1)
      if (text) tl.to(text, { opacity: 1 }, totalDuration - 0.1)
      if (arrow) tl.to(arrow, { x: 0, duration: totalDuration, ease: INOUT3 }, 0)
      tl.add(() => {
        gsap.set(counter, { clearProps: 'transform' })
        if (text) gsap.set(text, { clearProps: 'opacity' })
        if (arrow) gsap.set(arrow, { clearProps: 'x' })
        gsap.set(root, { clearProps: 'opacity,visibility,transform,transformOrigin' })
        root.setAttribute('data-flat-cta-intro-done', 'true')
      })
    },
  },
  fadeIn: {
    prepareForIn(r) {
      const { root } = nodes(r)
      if (!root) return
      root.removeAttribute('data-flat-cta-intro-done')
      gsap.set(root, { autoAlpha: 0 })
    },
    appendAnimateIn(tl, r, { totalDuration = 0.85 } = {}) {
      const { root } = nodes(r)
      if (!root) return
      tl.to(root, { autoAlpha: 1, duration: totalDuration, ease: OUT3 }, 0)
      tl.add(() => {
        gsap.set(root, { clearProps: 'opacity,visibility' })
        root.setAttribute('data-flat-cta-intro-done', 'true')
      })
    },
  },
}

export type AnimatedFlatCtaHandle = {
  animateSet: () => void
  animateIn: (o?: { duration?: number; delay?: number }) => Promise<void>
  animateOut: (o?: { duration?: number; delay?: number }) => Promise<void>
}

export const AnimatedFlatCta = forwardRef<
  AnimatedFlatCtaHandle,
  FlatCtaProps & { introAnimation?: keyof typeof flatCtaIntros }
>(function AnimatedFlatCta({ introAnimation = 'filledEvergreenArrow', direction = 'right', ...props }, ref) {
  const intro = flatCtaIntros[introAnimation] ?? flatCtaIntros.filledEvergreenArrow
  const root = useRef<HTMLElement>(null)
  const counterScale = useRef<HTMLDivElement>(null)
  const textEl = useRef<HTMLSpanElement>(null)
  const arrowEl = useRef<HTMLDivElement>(null)
  const active = useRef<gsap.core.Timeline | null>(null)
  const refs = useMemo(() => ({ root, counterScale, textEl, arrowEl }), [])
  const kill = useCallback(() => {
    active.current?.kill()
    active.current = null
  }, [])
  const animateSet = useCallback(() => {
    kill()
    const el = root.current
    if (el) {
      gsap.killTweensOf(el)
      gsap.set(el, { y: 0 })
    }
    intro.prepareForIn(refs, { direction })
  }, [kill, intro, refs, direction])
  useImperativeHandle(
    ref,
    () => ({
      animateSet,
      animateIn: ({ duration = 0.65, delay = 0 } = {}) =>
        new Promise((resolve) => {
          kill()
          const el = root.current
          if (el) gsap.set(el, { y: 0, visibility: 'visible' })
          intro.prepareForIn(refs, { direction })
          const tl = gsap.timeline({
            delay,
            onComplete: () => {
              active.current = null
              resolve()
            },
          })
          active.current = tl
          intro.appendAnimateIn(tl, refs, { totalDuration: duration, direction })
        }),
      animateOut: ({ duration = 0.3, delay = 0 } = {}) => {
        kill()
        const el = root.current
        if (!el) return Promise.resolve()
        gsap.killTweensOf(el)
        return new Promise((resolve) => {
          gsap.to(el, { autoAlpha: 0, y: -6, duration, delay, ease: 'power3.in', overwrite: 'auto', onComplete: () => resolve() })
        })
      },
    }),
    [animateSet, kill, intro, refs, direction],
  )
  return <FlatCta ref={root} {...props} direction={direction} animationLayout animationRefs={refs} />
})
AnimatedFlatCta.displayName = 'AnimatedFlatCta'
