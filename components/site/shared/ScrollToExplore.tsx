'use client'

// Scale module 265985. The two arrows drop together every 5.5s.
import { ArrowDown } from 'lucide-react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { cn } from '../lib/cn'
import { gsap, useGSAP } from '../lib/gsap'
import { AnimatedText, type AnimatedTextHandle } from './AnimatedText'

export type ScrollToExploreHandle = { animateIn: (o?: { delay?: number }) => void; animateOut: (o?: { delay?: number }) => void }

export const ScrollToExplore = forwardRef<ScrollToExploreHandle, { className?: string; theme?: 'dark' | 'light'; label?: string }>(function ScrollToExplore({ className, theme = 'dark', label = 'Scroll to explore' }, ref) {
  const text = useRef<AnimatedTextHandle>(null)
  const box = useRef<HTMLDivElement>(null)
  const a = useRef<SVGSVGElement>(null)
  const b = useRef<SVGSVGElement>(null)
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 })
    tl.fromTo(a.current, { y: '-100%' }, { y: '0%', duration: 0.5 }, 0)
    tl.fromTo(b.current, { y: '-100%' }, { y: '0%', duration: 0.5 }, 0)
  }, [])
  useImperativeHandle(
    ref,
    () => ({
      animateIn: (o) => {
        text.current?.animateIn?.(o)
        gsap.killTweensOf(box.current)
        gsap.to(box.current, { autoAlpha: 1, duration: 0.25, overwrite: 'auto' })
      },
      animateOut: (o) => {
        text.current?.animateOut?.(o)
        gsap.killTweensOf(box.current)
        gsap.to(box.current, { autoAlpha: 0, duration: 0.5, overwrite: 'auto' })
      },
    }),
    [],
  )
  const dark = theme === 'dark'
  const icon = cn('size-4 shrink-0', dark ? 'text-white' : 'text-black')
  return (
    <div className={cn('flex items-center gap-4 text-center', dark ? 'text-white' : 'text-black', className)} aria-label={label}>
      <AnimatedText ref={text} tagName="p" className="hidden font-medium tracking-wide body3 md:block">
        {label}
      </AnimatedText>
      <div ref={box} className={cn('flex items-center justify-center p-2 border rounded-sm aspect-square', dark ? 'border-white' : 'border-black')}>
        <div className="w-4 h-4 overflow-clip">
          <ArrowDown ref={a} className={icon} strokeWidth={2} aria-hidden />
          <ArrowDown ref={b} className={icon} strokeWidth={2} aria-hidden />
        </div>
      </div>
    </div>
  )
})
ScrollToExplore.displayName = 'ScrollToExplore'
