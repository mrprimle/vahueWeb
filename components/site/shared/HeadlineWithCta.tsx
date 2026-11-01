'use client'

// Scale module 925107. Scale passes `wordStagger` to its text animation, which ignores it, so it is dropped here.
// `href` is `cta.url` on an array on Scale, so the button navigates through onClick only.
import { useRouter } from 'next/navigation'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { AnimatedFlatCta, type AnimatedFlatCtaHandle, flatCtaIntros } from './AnimatedFlatCta'
import { AnimatedText, type AnimatedTextHandle } from './AnimatedText'
import type { FlatCtaVariant } from './FlatCta'
import { RichText, type RichBlock } from './RichText'

export type HeadlineCta = { url: string; text: string; variant?: FlatCtaVariant; theme?: 'white' | 'black' }

export type HeadlineWithCtaHandle = {
  animateIn: (o?: { delay?: number; delayHeadline?: number; delaySubtitle?: number; delayCta?: number }) => void
  animateSet: () => void
  ready: () => Promise<unknown>
}

export type HeadlineWithCtaProps = {
  backgroundColor?: { hex: string; contrastColor: string }
  headline: string
  subtitle?: RichBlock[]
  cta?: HeadlineCta[]
  align?: 'center' | 'left'
  padding?: boolean
  width?: string
  animationManual?: boolean
  headerClass?: string
  headerTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  subtitleClasses?: string
  ctaAnimation?: keyof typeof flatCtaIntros
  className?: string
  startHidden?: boolean
}

export const HeadlineWithCta = forwardRef<HeadlineWithCtaHandle, HeadlineWithCtaProps>(function HeadlineWithCta(
  {
    backgroundColor,
    headline,
    subtitle,
    cta,
    align = 'center',
    padding = true,
    width = 'w-72',
    animationManual = false,
    headerClass = 'header3-regular',
    headerTag = 'h3',
    subtitleClasses = 'text-inherit',
    ctaAnimation,
    className = '',
    startHidden = false,
  },
  ref,
) {
  const root = useRef<HTMLDivElement>(null)
  const title = useRef<AnimatedTextHandle>(null)
  const body = useRef<AnimatedTextHandle>(null)
  const ctaRef = useRef<AnimatedFlatCtaHandle>(null)
  const first = cta?.length ? cta[0] : null
  const router = useRouter()
  const [ctaShown, setCtaShown] = useState(false)
  const contrast = backgroundColor ? (backgroundColor.contrastColor === '#010101' ? 'black' : 'white') : undefined
  useImperativeHandle(
    ref,
    () => ({
      animateIn: ({ delay = 500, delayHeadline = 1.5, delaySubtitle = 1.6, delayCta = 1.5 } = {}) => {
        setTimeout(() => {
          title.current?.animateIn({ delay: delayHeadline })
          body.current?.animateIn({ delay: delaySubtitle })
          if (ctaRef.current) {
            ctaRef.current.animateIn({ duration: 0.85, delay: delayCta })
            setCtaShown(true)
          }
        }, delay)
      },
      animateSet: () => {
        ctaRef.current?.animateSet()
        title.current?.seek(0)
        body.current?.seek(0)
      },
      ready: () => Promise.all([title.current?.ready(), body.current?.ready()]),
    }),
    [],
  )
  const go = useCallback(() => {
    if (first?.url) router.push(first.url)
  }, [first, router])
  useEffect(() => {
    if (animationManual) return
    const el = root.current
    const reveal = () => {
      title.current?.animateIn({ delay: 0.5 })
      body.current?.animateIn({ delay: 1 })
      if (ctaRef.current) {
        ctaRef.current.animateIn({ duration: 0.85, delay: body.current ? 1.4 : 0.9 })
        setCtaShown(true)
      }
    }
    if (!el || typeof IntersectionObserver === 'undefined') {
      const t = setTimeout(reveal, 200)
      return () => clearTimeout(t)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          reveal()
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [animationManual])
  const textAlign = align === 'center' ? 'text-center' : 'text-left'
  return (
    <div
      ref={root}
      className={cn('HeadlineWithCta', 'flex flex-col gap-6 py-6', padding ? 'grid-padding' : '', align === 'center' ? 'items-center' : 'items-start', className)}
      style={backgroundColor ? { background: backgroundColor.hex, color: backgroundColor.contrastColor } : undefined}
    >
      <AnimatedText ref={title} tagName={headerTag} className={cn(headerClass, 'text-inherit w-full', width, textAlign)}>
        {headline}
      </AnimatedText>
      {subtitle ? <RichText animatedTextRef={body} animatedTextClassName="text-inherit max-md:text-sm" className={cn('text-inherit w-full', subtitleClasses, textAlign)} value={subtitle} /> : null}
      {first ? (
        <AnimatedFlatCta
          ref={ctaRef}
          as="button"
          aria-label={first.text}
          text={first.text}
          variant={first.variant}
          theme={first.theme || contrast || 'white'}
          introAnimation={ctaAnimation ?? (animationManual ? 'filledWhiteArrow' : 'fadeIn')}
          onClick={go}
          startHidden={(startHidden || !animationManual) && !ctaShown}
        />
      ) : null}
    </div>
  )
})
