'use client'

import { createElement, useLayoutEffect, useRef, type ReactNode } from 'react'
import { revealBlock, revealText, type RevealVariant } from './revealMotion'

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span'
  variant?: RevealVariant
  delay?: number
  className?: string
  children: ReactNode
}

/** Wraps one element and reveals it on scroll. Text variants split by line. */
export default function Reveal({ as = 'div', variant = 'rise', delay = 0, className, children }: Props) {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    return variant === 'block' ? revealBlock(el, delay) : revealText(el, variant, delay)
  }, [variant, delay])
  return createElement(as, { ref, className }, children)
}
