'use client'

// Scale module 463059 (CMSLink): internal Next link, external anchor, optional buttonHover cascade.
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { forwardRef, useCallback, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { cn } from '../lib/cn'
import { AnimatedText, linkTextAnimation, type AnimatedTextHandle } from './AnimatedText'

export function isInternalHref(href?: string | null) {
  if (!href) return false
  return (href.startsWith('/') && !href.startsWith('//')) || href.startsWith('#')
}

export type CMSLinkProps = {
  href?: string | null
  className?: string
  children?: ReactNode
  label?: string
  buttonHover?: boolean
  reveal?: number
  smoothScrollTargetId?: string
  onClick?: React.MouseEventHandler<HTMLElement>
} & Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'children'>

export const CMSLink = forwardRef<HTMLElement, CMSLinkProps>(function CMSLink(
  { href, className, children, label, buttonHover = false, reveal, smoothScrollTargetId, onClick, ...rest },
  ref,
) {
  const root = useRef<HTMLElement | null>(null)
  const arrow = useRef<SVGSVGElement | null>(null)
  const text = useRef<AnimatedTextHandle | null>(null)
  const url = typeof href === 'string' ? href.trim() : href
  const setRef = useCallback(
    (el: HTMLElement | null) => {
      root.current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    },
    [ref],
  )
  const onEnter = useCallback(() => {
    if (!buttonHover || !root.current) return
    text.current?.animateColorCascadeIn({ duration: 0.6, ease: 'power2.out', delay: 0, variant: { colorIn: '#775893' } })
    gsap.killTweensOf(arrow.current)
    gsap.fromTo(arrow.current, { opacity: 0, xPercent: -30 }, { opacity: 1, xPercent: 0, duration: 0.3, ease: 'power2.out', delay: 0.35 })
  }, [buttonHover])
  const onLeave = useCallback(() => {
    if (!buttonHover || !root.current) return
    text.current?.resetColorCascade()
    gsap.killTweensOf(arrow.current)
    gsap.to(arrow.current, { opacity: 0, duration: 0.3, ease: 'power2.out', delay: 0.3 })
  }, [buttonHover])
  useLayoutEffect(() => {
    if (reveal != null) text.current?.animateIn({ duration: 0.3, delay: 0.01 * reveal })
  }, [reveal])
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      onClick?.(e)
      if (e.defaultPrevented || !url || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      const target = e.currentTarget.getAttribute('target')
      if (target && target !== '_self') return
      const id = typeof smoothScrollTargetId === 'string' ? smoothScrollTargetId.replace(/^#/, '') : ''
      if (id) {
        const el = document.getElementById(id)
        if (el) {
          e.preventDefault()
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    },
    [url, onClick, smoothScrollTargetId],
  )
  const hoverContent = useMemo(
    () => (
      <span className="inline-flex items-start gap-2">
        <span className="min-w-0">
          <AnimatedText ref={text} tagName="span" type="chars, words, lines" charsClass="inline-block" customAnimation={linkTextAnimation}>
            {children}
          </AnimatedText>
        </span>
        <ChevronRight ref={arrow} className="my-1 opacity-0 size-5 shrink-0" strokeWidth={2} aria-hidden />
      </span>
    ),
    [children],
  )
  const content = buttonHover ? hoverContent : children
  if (!url) {
    return (
      <div ref={setRef as React.Ref<HTMLDivElement>} className={cn('CMSLink', className)} onClick={onClick} onPointerEnter={onEnter} onPointerLeave={onLeave} {...rest}>
        {content}
      </div>
    )
  }
  if (isInternalHref(url)) {
    return (
      <Link
        ref={setRef as React.Ref<HTMLAnchorElement>}
        href={url}
        onClick={handleClick}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className={cn('CMSLink', 'focus:outline-1 relative focus:outline-scale-skyblue w-max group/link', className)}
        {...rest}
      >
        {content}
      </Link>
    )
  }
  return (
    <a
      ref={setRef as React.Ref<HTMLAnchorElement>}
      href={url}
      className={cn('CMSLink external', className)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      aria-label={label}
      {...rest}
    >
      {content}
    </a>
  )
})
CMSLink.displayName = 'CMSLink'
