'use client'

import { createElement, useLayoutEffect, useRef, useState } from 'react'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  className?: string
  /** Marks the element for animation queries, e.g. data-part="title". */
  part?: string
  /** Called after lines are (re)measured, so callers can re-apply GSAP state. */
  onSplit?: () => void
}

// Splits text into masked lines of inline-block words. Lines are measured from
// the rendered words, so the split follows real wrapping at every breakpoint.
// The visible tree is aria-hidden; screen readers get the sentence once via sr-only.
export default function SplitText({ text, as = 'div', className, part, onSplit }: Props) {
  const ref = useRef<HTMLElement>(null)
  const words = text.split(/\s+/).filter(Boolean)
  const [lines, setLines] = useState<number[][] | null>(null)
  const width = useRef(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (!lines) {
      const spans = [...el.querySelectorAll<HTMLElement>('[data-word]')]
      const grouped: number[][] = []
      let lastTop: number | null = null
      spans.forEach((span, i) => {
        const top = span.offsetTop
        if (lastTop === null || Math.abs(top - lastTop) > 4) grouped.push([])
        grouped[grouped.length - 1].push(i)
        lastTop = top
      })
      width.current = el.clientWidth
      setLines(grouped)
      return
    }
    onSplit?.()
  }, [lines, onSplit])

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      if (Math.abs(el.clientWidth - width.current) > 1) setLines(null)
    })
    observer.observe(el)
    // Webfonts can change wrapping without changing the block's width.
    let alive = true
    document.fonts?.ready.then(() => alive && setLines(null))
    return () => {
      alive = false
      observer.disconnect()
    }
  }, [])

  const word = (i: number) => (
    <span key={i} data-word="" className="relative inline-block">
      {words[i]}
    </span>
  )

  const content = lines
    ? lines.map((line, li) => (
        <span
          key={li}
          aria-hidden="true"
          className="relative block overflow-clip"
          style={{ margin: '-0.12em 0', padding: '0.12em 0' }}
        >
          <span data-line="" className="relative block">
            {line.map((i, k) => (
              <span key={i}>
                {word(i)}
                {k < line.length - 1 ? ' ' : null}
              </span>
            ))}
          </span>
        </span>
      ))
    : (
        <span aria-hidden="true" className="block">
          {words.map((_, i) => (
            <span key={i}>
              {word(i)}
              {i < words.length - 1 ? ' ' : null}
            </span>
          ))}
        </span>
      )

  return createElement(
    as,
    { ref, className, 'data-part': part },
    <span className="sr-only">{text}</span>,
    content,
  )
}
