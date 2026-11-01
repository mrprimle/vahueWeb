'use client'

// Scale module 418462: pinned quote, video column rises, words scrub in with the scroll.
import { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/components/site/lib/cn'
import { useTheme } from '@/components/site/lib/themeStore'
import { useMediaQuery } from '@/components/site/lib/useMediaQuery'
import { useScrubTrigger } from '@/components/site/lib/useScrubTrigger'
import { wordScaleAnimation, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import { ResponsiveVideo } from '@/components/site/shared/ResponsiveVideo'
import { RichText } from '@/components/site/shared/RichText'
import type { HomeContent } from './content.types'
import styles from './ScrollingQuote.module.css'

export function ScrollingQuote({ content, className }: { content: HomeContent['quote']; className?: string }) {
  const section = useRef<HTMLElement>(null)
  const quoteRef = useRef<AnimatedTextHandle>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const md = useMediaQuery('(min-width: 768px)') === true
  const start = md ? 'top 20%' : 'top top'
  const { setSectionTheme } = useTheme()
  const played = useRef(false)
  useEffect(() => {
    played.current = false
  }, [md, content.quote])
  const onEnter = useCallback(() => {
    if (played.current) return
    const run = () => {
      const q = quoteRef.current
      if (!q?.playStandaloneTransformIntro) return false
      played.current = true
      q.playStandaloneTransformIntro()
      return true
    }
    if (!run())
      requestAnimationFrame(() => {
        if (!played.current) run()
      })
  }, [])
  useScrubTrigger(section, {
    pin: true,
    pinSpacing: false,
    start,
    end: () => `+=${2 * window.innerHeight}`,
    timelineVersion: md,
    onEnter,
    setupTimeline: (tl) => {
      const w = wrapper.current
      if (w) tl.fromTo(w, { yPercent: 25 }, { yPercent: 0, duration: 0.75, ease: 'power3.out' }, 0)
      const m = media.current
      if (m) {
        if (md) tl.fromTo(m, { yPercent: 67 }, { yPercent: 0, duration: 2.25, ease: 'cubic.inOut' }, 0)
        else tl.set(m, { yPercent: 0 }, 0)
      }
      if (w) tl.to(w, { scale: 0.9, opacity: 0, yPercent: -20, duration: 0.75, ease: 'power2.inOut' }, 1.5)
    },
    onUpdate(self) {
      quoteRef.current?.seek(Math.max(0, Math.min(1, 1.4 * self.progress)))
    },
  })
  useEffect(() => {
    setSectionTheme(root.current, 'dark')
  }, [setSectionTheme])
  return (
    <div ref={root} className={cn(styles.root, 'ScrollingQuote h-[200dvh] px-3 md:px-6 bg-black', className)}>
      <section ref={section} className={cn(styles.section, 'relative mx-auto w-full max-w-[2048px]')}>
        <div ref={wrapper} className={cn(styles.wrapper, 'wrapper flex w-full pb-3 min-h-0 md:min-h-[70vh]')}>
          <div
            className={cn(
              styles.innerStack,
              'relative z-[1] flex w-full min-h-0 flex-col gap-2 max-md:overflow-hidden max-md:h-[calc(92svh-1.25rem+1.5rem)] max-md:max-h-[calc(92svh-1.25rem+1.5rem)] md:overflow-visible md:min-h-[70vh] md:max-h-none md:flex-1 md:flex-row md:pt-0 oml:flex-row oml:gap-2',
            )}
          >
            <div
              ref={media}
              className="relative w-full bg-black rounded-[0.5rem] max-md:min-h-0 max-md:basis-0 max-md:grow max-md:shrink md:aspect-auto md:h-[60%] md:min-h-0 md:w-[362px] md:flex-none md:shrink-0 md:rounded-3xl"
            >
              <ResponsiveVideo asset={content.video} loop autoPlay muted className="object-cover h-full rounded-[0.5rem] md:rounded-3xl" />
            </div>
            <div className="flex w-full min-h-0 flex-col items-start bg-evergreen p-8 rounded-[0.5rem] max-md:basis-0 max-md:grow-[2] max-md:shrink max-md:overflow-y-auto md:min-h-0 md:flex-1 md:h-full md:rounded-[16px] md:px-14 md:py-12">
              <RichText
                value={content.quote}
                animatedTextRef={quoteRef}
                animatedTextClassName="max-w-5xl header2 oml:header4-regular font-medium max-md:!leading-[40px] md:leading-[4rem] text-white font-aeonik text-balance"
                contentKey={content.quote}
                customAnimation={wordScaleAnimation}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
