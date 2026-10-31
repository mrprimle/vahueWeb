'use client'

import Link from 'next/link'
import { forwardRef, useRef, type CSSProperties, type MouseEvent } from 'react'

// Scale's FlatCta: a pill/rect link with a bg-current/35 fill that slides in from the edge the cursor
// entered (translate-y ±100% -> 0, 300ms ease-out) and leaves through the edge it exits; the label
// scales to 0.9 on hover (300ms ease-out).
type Props = {
  href: string
  label: string
  className?: string
  style?: CSSProperties
  labelClassName?: string
  innerClassName?: string
}

const FlatCta = forwardRef<HTMLAnchorElement, Props>(function FlatCta(
  { href, label, className = '', style, labelClassName = '', innerClassName = 'px-4 py-2' },
  ref,
) {
  const fill = useRef<HTMLDivElement>(null)

  const edge = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    return e.clientY < r.top + r.height / 2 ? '-100%' : '100%'
  }
  const onEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = fill.current
    if (!el) return
    el.style.transitionDuration = '0ms'
    el.style.transform = `translateY(${edge(e)})`
    void el.offsetHeight
    el.style.transitionDuration = '300ms'
    el.style.transform = 'translateY(0)'
  }
  const onLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = fill.current
    if (!el) return
    el.style.transitionDuration = '300ms'
    el.style.transform = `translateY(${edge(e)})`
  }

  const content = (
    <>
      <div
        ref={fill}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 size-full rounded-[inherit] bg-current opacity-35 transition-transform ease-out motion-reduce:transition-none"
        style={{ transform: 'translateY(100%)', transitionDuration: '300ms' }}
      />
      <div className={`relative z-[1] inline-flex min-h-0 min-w-0 max-w-full flex-wrap items-center justify-center ${innerClassName}`}>
        <span
          className={`relative z-[1] block h-fit origin-center self-center whitespace-nowrap text-[14px] font-medium leading-[1.5] transition-transform duration-300 ease-out group-hover/cta:scale-90 motion-reduce:transition-none motion-reduce:group-hover/cta:scale-100 ${labelClassName}`}
        >
          {label}
        </span>
      </div>
    </>
  )

  const cls = `group/cta relative inline-flex h-max w-fit cursor-pointer items-center justify-center overflow-hidden ${className}`
  if (href.startsWith('/')) {
    return (
      <Link ref={ref} href={href} className={cls} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {content}
      </Link>
    )
  }
  return (
    <a ref={ref} href={href} className={cls} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {content}
    </a>
  )
})

export default FlatCta
