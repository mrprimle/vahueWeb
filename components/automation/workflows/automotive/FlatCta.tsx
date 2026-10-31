'use client'

import { forwardRef, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import s from './styles.module.css'

/*
 * scale.com FlatCta. Hover slides a currentColor layer (opacity .35 / .30) in from below
 * (from the left for the arrow variant), and out the opposite side on leave.
 * Fill / border: 300ms, label scales to .9. Arrow: 600ms, chevron track slides one slot.
 */

type Variant = 'fill' | 'border' | 'arrow'
type Theme = 'black' | 'white'

type Props = {
  href: string
  variant?: Variant
  theme?: Theme
  children: ReactNode
  className?: string
}

export const Chevron = () => (
  <svg className="block shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6.12994 12.7576C5.99604 12.8915 5.77896 12.8915 5.64506 12.7576L5.24244 12.3549C5.10854 12.221 5.10854 12.004 5.24244 11.8701L8.58217 8.53033C8.87506 8.23744 8.87506 7.76256 8.58217 7.46967L5.24244 4.12994C5.10854 3.99604 5.10854 3.77896 5.24244 3.64506L5.64506 3.24244C5.77896 3.10854 5.99604 3.10854 6.12994 3.24244L10.3572 7.46967C10.6501 7.76256 10.6501 8.23744 10.3572 8.53033L6.12994 12.7576Z"
      fill="currentColor"
    />
  </svg>
)

const FlatCta = forwardRef<HTMLAnchorElement, Props>(function FlatCta(
  { href, variant = 'fill', theme = 'black', children, className = '' },
  ref,
) {
  const arrow = variant === 'arrow'
  const outline = variant === 'border'
  // idle -> in (hovered) -> out (leaving) -> reset (snap back without transition) -> idle
  const [phase, setPhase] = useState<'idle' | 'in' | 'out' | 'reset'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  useEffect(() => {
    if (phase !== 'reset') return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('idle')))
    return () => cancelAnimationFrame(id)
  }, [phase])

  const enter = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    setPhase('in')
  }, [])
  const leave = useCallback(() => {
    setPhase('out')
    timer.current = setTimeout(() => setPhase('reset'), arrow ? 680 : 380)
  }, [arrow])

  const offset = arrow ? 'translateX(-100%)' : 'translateY(100%)'
  const fillTransform =
    phase === 'in' ? 'translate(0,0)' : phase === 'out' ? (arrow ? 'translateX(100%)' : 'translateY(-100%)') : offset

  const colours = outline
    ? theme === 'white'
      ? 'border border-white text-white'
      : 'border border-black text-black'
    : theme === 'white'
      ? 'bg-white text-black'
      : 'bg-black text-white'
  const fillOpacity = (theme === 'black' && !outline) || (theme === 'white' && outline) ? 0.3 : 0.35

  return (
    <a
      ref={ref}
      href={href}
      onPointerEnter={enter}
      onPointerLeave={leave}
      className={`${s.cta} ${arrow ? s.ctaArrow : ''} ${colours} ${className}`}
    >
      <span
        aria-hidden="true"
        className={s.ctaFill}
        style={{
          opacity: fillOpacity,
          transform: fillTransform,
          transitionDuration: phase === 'reset' ? '0ms' : arrow ? '600ms' : '300ms',
        }}
      />
      {arrow ? (
        <span className="relative z-[1] inline-flex items-center gap-4 py-1 pl-4 pr-1" data-cta-counter>
          <span className={s.ctaLabel} data-cta-text>
            {children}
          </span>
          <span className={`${s.ctaIcon} ${theme === 'white' ? 'bg-black text-white' : 'bg-white text-black'}`} data-cta-arrow>
            <span className={s.ctaTrack}>
              <span>
                <Chevron />
              </span>
              <span>
                <Chevron />
              </span>
            </span>
          </span>
        </span>
      ) : (
        <span className="relative z-[1] inline-flex items-center px-4 py-2" data-cta-counter>
          <span className={s.ctaLabel} data-cta-text>
            {children}
          </span>
        </span>
      )}
    </a>
  )
})

export default FlatCta
