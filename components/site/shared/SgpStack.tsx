'use client'

// Scale module 290276 (SgpStack), chunk 0sni47mcvnqwg.js. `mediaNode` and image branches. The video branch (553471 with fade and restart) is not ported: no page here uses it yet.
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { gsap, useGSAP } from '../lib/gsap'
import { useTheme } from '../lib/themeStore'
import { useInViewTrigger } from '../lib/useInViewTrigger'
import { AnimatedText, linkTextAnimation, type AnimatedTextHandle } from './AnimatedText'
import { HeadlineWithCta, type HeadlineWithCtaProps } from './HeadlineWithCta'
import { ResponsiveImage, type ImageAsset } from './ResponsiveImage'
import { RichText, type RichBlock } from './RichText'

export type SgpStackCard = { _key?: string; title?: string; description?: RichBlock[]; color?: { tailwindClass: string } }
type CardHandle = { animateIn: (o?: { delay?: number }) => void; animateOut: (o?: { delay?: number }) => void; seek: (p: number) => void }

const Card = forwardRef<CardHandle, { card: SgpStackCard; cardIndex?: number; theme?: 'light' | 'dark'; accent?: boolean }>(function Card({ card, cardIndex = 0, theme, accent = true }, ref) {
  const { title, description, color } = card
  const light = (theme ?? 'dark') === 'light'
  const root = useRef<HTMLElement>(null)
  const heading = useRef<AnimatedTextHandle>(null)
  const body = useRef<AnimatedTextHandle>(null)
  const mark = useRef<HTMLDivElement>(null)
  const animateIn = useCallback(({ delay = 0 } = {}) => {
    heading.current?.animateIn({ delay })
    body.current?.animateIn({ delay })
    if (mark.current) gsap.fromTo(mark.current, { opacity: 0, y: 20, x: -10 }, { opacity: 1, y: 0, x: 0, delay, duration: 0.85, ease: 'power2.out' })
  }, [])
  const animateOut = useCallback(({ delay = 0 } = {}) => {
    heading.current?.animateOut({ delay })
    body.current?.animateOut({ delay })
    if (mark.current) gsap.to(mark.current, { opacity: 0, y: 20, x: -10, delay, duration: 0.85, ease: 'power2.out' })
  }, [])
  useImperativeHandle(
    ref,
    () => ({
      animateIn,
      animateOut,
      seek(p: number) {
        const t = gsap.utils.clamp(0, 1, p)
        heading.current?.seek?.(t)
        body.current?.seek?.(gsap.utils.mapRange(0.2, 1, 0, 1, t))
        if (mark.current) gsap.set(mark.current, { opacity: t })
      },
    }),
    [animateIn, animateOut],
  )
  useInViewTrigger(root, {
    start: 'top 85%',
    onEnter: () => animateIn({ delay: 0.25 * cardIndex }),
    onLeaveBack: () => animateOut({ delay: 0.1 * cardIndex }),
  })
  return (
    <article ref={root} className={cn('flex flex-col gap-2 rounded-xl p-8 min-h-[211px] justify-between oml:flex-1 oml:min-h-0 oml:justify-start', light ? 'bg-white' : 'bg-scale-gray-20')}>
      <div className="flex items-center gap-2 justify-between w-full">
        {title ? (
          <AnimatedText tagName="h3" ref={heading} className={cn('header2b-regular leading-none', light ? 'text-scale-gray-10' : 'text-white')}>
            {title}
          </AnimatedText>
        ) : null}
        {accent ? (
          <div ref={mark} className={cn(`text-${color?.tailwindClass}`, 'w-[17px] h-[17px] opacity-0')}>
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block w-full h-full align-top" aria-hidden>
              <path d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z" fill="currentColor" />
            </svg>
          </div>
        ) : null}
      </div>
      {description?.length ? (
        <div className={cn('body3', light ? 'text-scale-gray-30' : 'text-scale-gray-60')}>
          <RichText animatedTextRef={body} value={description} customAnimation={linkTextAnimation} />
        </div>
      ) : null}
    </article>
  )
})

export function SgpStack({
  heading,
  headingPosition = 'inline',
  image,
  mediaNode,
  mediaPosition = 'center',
  cards = [],
  cardAccent = true,
  className,
  theme,
}: {
  heading?: Pick<HeadlineWithCtaProps, 'headline' | 'subtitle'>
  headingPosition?: 'inline' | 'above'
  image?: ImageAsset
  mediaNode?: ReactNode
  mediaPosition?: 'center' | 'left'
  cards?: SgpStackCard[]
  cardAccent?: boolean
  className?: string
  theme?: 'light' | 'dark'
}) {
  const resolved = theme ?? 'dark'
  const light = resolved === 'light'
  const ratio = image?.width && image?.height ? `${image.width} / ${image.height}` : '1 / 1'
  const section = useRef<HTMLElement>(null)
  const scaled = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(CardHandle | null)[]>([])
  const { setSectionTheme } = useTheme()
  useEffect(() => {
    setSectionTheme(section.current, light ? 'light' : 'dark')
  }, [light, setSectionTheme])
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, cards.length)
  }, [cards.length])
  useGSAP(
    () => {
      if (!scaled.current || !section.current) return
      const count = cards.length
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(scaled.current, { width: '100%' })
        if (count) {
          const step = 1 / count
          cardRefs.current.forEach((c, i) => c?.seek?.(gsap.utils.clamp(0, 1, (1 - i * step) / step)))
        }
        return
      }
      const tween = gsap.fromTo(
        scaled.current,
        { scale: 0.98, transformOrigin: 'center top' },
        { scale: 1, duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom 75%', scrub: true } },
      )
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: section, dependencies: [cards.length] },
  )
  useInViewTrigger(section, {
    start: 'top center',
    onLeaveBack: () => cardRefs.current.forEach((c, i) => c?.animateOut({ delay: 0.1 * i })),
  })
  return (
    <section ref={section} className={cn('SgpStack relative isolate overflow-hidden grid-layout-mobile lg:grid-layout-desktop pt-0 lg:px-0! pb-7!', light ? 'bg-transparent' : 'bg-black', className)}>
      {heading && headingPosition === 'above' ? (
        <div className="col-span-full mb-10 text-center md:mb-6 [&_.HeadlineWithCta]:text-inherit">
          <HeadlineWithCta
            padding={false}
            {...heading}
            width="max-w-[960px] mx-auto"
            align="center"
            headerClass={cn('header3-regular text-balance', light ? 'text-scale-gray-10' : 'text-white')}
            subtitleClasses={cn('text-pretty', light ? 'text-scale-gray-30' : 'text-scale-gray-60')}
            className="py-0!"
          />
        </div>
      ) : null}
      <div className="relative col-span-full lg:col-start-1 lg:col-span-12 text-neutral-900 py-5 pb-7 md:pb-0 md:py-10 md:pl-10 md:pr-10 lg:pb-10">
        <div className="grid-layout-mobile lg:grid-layout-desktop-double md:px-0 md:pb-10">
          {heading && headingPosition === 'inline' ? (
            <div className="col-span-full pb-0 relative z-2 lg:col-start-1 lg:col-span-12 xl:col-start-1 xl:col-span-7 lg:self-start [&_.HeadlineWithCta]:text-inherit">
              <HeadlineWithCta
                padding={false}
                {...heading}
                width="w-full"
                align="left"
                headerClass={cn('header3-regular text-balance md:mt-[-0.5rem]', light ? 'text-scale-gray-10' : 'text-white')}
                subtitleClasses={cn('text-pretty', light ? 'text-scale-gray-30' : 'text-scale-gray-60')}
                className="py-0!"
              />
            </div>
          ) : null}
          {mediaNode || image ? (
            <div className={cn('pointer-events-none col-span-full lg:absolute z-1 lg:w-1/2 lg:h-full flex items-center pb-10', mediaPosition === 'left' ? 'lg:left-[4%] justify-start' : 'lg:left-[45%] lg:-translate-x-1/2 justify-center')} aria-hidden="true">
              {mediaNode ??
                (image ? (
                  <div className="relative w-full" style={{ aspectRatio: ratio }}>
                    <ResponsiveImage asset={image} fill noBackground sizes="(max-width: 1023px) 100vw, 50vw" className="[&_img]:object-contain" />
                  </div>
                ) : null)}
            </div>
          ) : null}
          {cards.length ? (
            <div className="col-span-full relative z-2 flex flex-col oml:flex-row gap-2 lg:col-start-18 lg:col-span-7 lg:self-start">
              {cards.map((card, i) => (
                <Card
                  key={card._key ?? i}
                  card={card}
                  theme={resolved}
                  accent={cardAccent}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div ref={scaled} className="absolute z-0 w-full h-full inset-0 grid-layout-mobile lg:grid-layout-desktop-double p-0">
          <div className={cn('w-full h-full rounded-2xl col-span-full lg:col-span-24', light ? 'bg-scale-gray-95' : 'bg-scale-gray-10')} />
        </div>
      </div>
    </section>
  )
}
