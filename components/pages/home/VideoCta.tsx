'use client'

// Scale module 590542 (chunk 0sni47mcvnqwg.js): tan CTA panel with a multiply-blended video.
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { cn } from '@/components/site/lib/cn'
import { gsap } from '@/components/site/lib/gsap'
import { useMediaQuery } from '@/components/site/lib/useMediaQuery'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'
import { useScrubTrigger } from '@/components/site/lib/useScrubTrigger'
import { AnimatedFlatCta, type AnimatedFlatCtaHandle } from '@/components/site/shared/AnimatedFlatCta'
import { AnimatedText, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import { ResponsiveVideo } from '@/components/site/shared/ResponsiveVideo'
import { ScrollRevealSection } from '@/components/site/shared/ScrollRevealSection'
import type { HomeContent } from './content.types'

export function VideoCta({ content }: { content: HomeContent['videoCta'] }) {
  const { backgroundColor, headline, description, cta, video } = content
  const reveal = useRef<{ getScaleValue: () => number | null }>(null)
  const panel = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<AnimatedTextHandle>(null)
  const bodyRef = useRef<AnimatedTextHandle>(null)
  const played = useRef(false)
  const ctaRef = useRef<AnimatedFlatCtaHandle>(null)
  const setX = useRef<((v: number) => void) | null>(null)
  const setY = useRef<((v: number) => void) | null>(null)
  const ctaTheme = backgroundColor.contrastColor === '#010101' ? 'black' : 'white'
  const md = useMediaQuery('(min-width: 768px)', false) === true
  const textStagger = md ? 0.2 : 0.06
  const ctaDelay = md ? 0.5 : 0.08
  const setCta = useCallback(() => {
    ctaRef.current?.animateSet()
  }, [])
  useEffect(() => {
    setCta()
  }, [setCta])
  const onEnter = useCallback(async () => {
    if (played.current) return
    const list = [headlineRef.current, bodyRef.current].filter(Boolean) as AnimatedTextHandle[]
    if (list.length === 0) {
      played.current = true
      return
    }
    ctaRef.current?.animateIn({ duration: 0.85, delay: ctaDelay })
    await Promise.all(list.map((e) => e.ready()))
    await Promise.all(list.map((e, i) => e.animateIn({ delay: i * textStagger })))
    played.current = true
  }, [ctaDelay, textStagger])
  useInViewTrigger(panel, { start: md ? 'top center' : 'top 92%', onEnter })
  useLayoutEffect(() => {
    const el = panel.current
    if (!el) return
    setX.current = gsap.quickSetter(el, 'scaleX') as (v: number) => void
    setY.current = gsap.quickSetter(el, 'scaleY') as (v: number) => void
  }, [])
  useScrubTrigger(panel, {
    start: 'top bottom',
    end: 'top top',
    pinSpacing: false,
    onUpdate: () => {
      if (!setX.current || !setY.current) return
      const v = reveal.current?.getScaleValue()
      if (v == null) return
      setX.current(v)
      setY.current(v)
    },
  })
  return (
    <ScrollRevealSection ref={reveal} backdropColor="white" contentContainerColor={backgroundColor.tailwindClass}>
      <div className="grid-layout-mobile md:grid-layout-desktop">
        <div
          ref={panel}
          className={cn(
            'VideoCta',
            'col-span-full min-w-0 md:col-start-2 md:col-span-10',
            'isolate relative flex flex-col gap-8 overflow-clip px-6 pt-[40px] pb-12 md:px-0 lg:block lg:gap-0 lg:pb-24 lg:pt-96 lg:rounded-t-4xl oml:flex oml:flex-col oml:gap-6 oml:px-10 oml:pt-10 oml:pb-10',
            `text-${ctaTheme}`,
          )}
        >
          <div className="relative z-10 flex min-w-0 flex-col gap-4 lg:max-w-[min(100%,28rem)] oml:w-1/2">
            <AnimatedText tagName="h2" className="header3-regular max-w-65" ref={headlineRef}>
              {headline}
            </AnimatedText>
            <AnimatedText tagName="p" className="body1 lg:mb-8 lg:w-[400px] oml:w-full oml:mb-8" ref={bodyRef}>
              {description}
            </AnimatedText>
            {cta ? (
              <div>
                <AnimatedFlatCta ref={ctaRef} href={cta.url} text={cta.text} variant="arrow" theme={ctaTheme} introAnimation="filledWhiteArrow" />
              </div>
            ) : null}
          </div>
          {video ? (
            <div
              className={cn(
                'relative z-0 ml-auto w-full max-w-[min(100%,28rem)] shrink-0 overflow-hidden p-2 aspect-video',
                'lg:absolute lg:aspect-auto lg:w-3/5 lg:max-w-none lg:bottom-[40%] lg:right-[5%] lg:translate-y-[40%]',
                'oml:relative oml:ml-auto oml:aspect-video oml:w-1/2 oml:max-w-none oml:translate-y-0 oml:bottom-auto oml:right-auto',
              )}
              style={{ backgroundColor: backgroundColor.hex }}
            >
              <ResponsiveVideo asset={video} loop autoPlay muted className="pointer-events-none h-full w-full mix-blend-multiply" />
            </div>
          ) : null}
        </div>
      </div>
    </ScrollRevealSection>
  )
}
