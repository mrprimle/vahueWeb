'use client'

// Scale module 909085. The `iconName` branch (lazy icon lookup, module 255416) and CMS icon assets are not ported:
// pass `iconNode`.
import Image from 'next/image'
import { createElement, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { cn } from '../lib/cn'
import { useInViewTrigger } from '../lib/useInViewTrigger'
import { useMediaQuery } from '../lib/useMediaQuery'
import type { AnimatedTextHandle } from './AnimatedText'
import { HeadlineWithCta, type HeadlineWithCtaHandle, type HeadlineWithCtaProps } from './HeadlineWithCta'
import { ResponsiveVideo, type VideoAsset } from './ResponsiveVideo'
import { RichText, type RichBlock } from './RichText'

type IconNode = ((p: { size?: number; color?: string }) => ReactNode) | ReactNode

export type PillarCard = {
  _key: string
  iconNode?: IconNode
  iconColor?: string
  headlineWithCta?: Partial<HeadlineWithCtaProps> & { headline: string }
}

type PillarHandle = { animateIn: () => Promise<void>; animateSet: () => void; ready: () => Promise<unknown> }

const Pillar = forwardRef<PillarHandle, { card: PillarCard; index: number; retroactiveOnEnter: boolean }>(function Pillar({ card, index, retroactiveOnEnter }, ref) {
  const headline = useRef<HeadlineWithCtaHandle>(null)
  const icon = useRef<HTMLDivElement>(null)
  const { iconNode, iconColor, headlineWithCta } = card
  useImperativeHandle(
    ref,
    () => ({
      animateIn: async () => {
        if (icon.current) gsap.fromTo(icon.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        await headline.current?.ready()
        headline.current?.animateIn({ delay: (index + Number(retroactiveOnEnter)) * 200, delayHeadline: 0.2, delaySubtitle: 0.4, delayCta: 0.66 })
      },
      animateSet: () => {
        if (icon.current) gsap.set(icon.current, { opacity: 0 })
        headline.current?.animateSet()
      },
      ready: () => Promise.all([headline.current?.ready()]),
    }),
    [index, retroactiveOnEnter],
  )
  return (
    <>
      {iconNode ? (
        <div ref={icon} className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center oml:opacity-100!" style={iconColor ? { backgroundColor: iconColor } : undefined}>
          <span className="text-white flex items-center justify-center">{typeof iconNode === 'function' ? createElement(iconNode as (p: { size?: number; color?: string }) => ReactNode, { size: 20, color: 'white' }) : iconNode}</span>
        </div>
      ) : null}
      {headlineWithCta ? <HeadlineWithCta ref={headline} padding={false} {...headlineWithCta} width="w-full" align="left" className="pb-0!" headerTag="h5" headerClass="header5-regular" animationManual /> : null}
    </>
  )
})

export type EnterprisePillarsProps = {
  heading?: string | RichBlock[]
  overtitle?: string
  subtitle?: string
  video?: VideoAsset
  image?: { path: string; alt?: string; width?: number; height?: number }
  cards?: PillarCard[]
  className?: string
  mediaFrame?: boolean
  retroactiveOnEnter?: boolean
  mediaNode?: ReactNode
}

export function EnterprisePillars({ heading, overtitle, subtitle, video, image, cards = [], className, mediaFrame = true, retroactiveOnEnter = false, mediaNode }: EnterprisePillarsProps) {
  const hasVideo = !!video?.url
  const hasImage = !!image?.path
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const playVideo = hasVideo && (!hasImage || reduced === false)
  const section = useRef<HTMLElement>(null)
  const headingRef = useRef<AnimatedTextHandle>(null)
  const pillars = useRef<(PillarHandle | null)[]>([])
  const rules = useRef<(HTMLDivElement | null)[]>([])
  const started = useRef(false)
  useEffect(
    () => () => {
      started.current = false
    },
    [],
  )
  useEffect(() => {
    if (started.current) return
    pillars.current.forEach((p) => p?.animateSet())
  }, [cards])
  const onEnter = useCallback(() => {
    if (started.current) return
    headingRef.current?.animateIn()
    cards.forEach((_, i) => {
      const rule = rules.current[i]
      if (rule) gsap.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.5, delay: 0.2 * i + 0.2 })
      pillars.current[i]?.animateIn()
    })
    started.current = true
  }, [cards])
  useInViewTrigger(section, { onEnter, retroactiveOnEnter })
  return (
    <section ref={section} className={cn('EnterprisePillars py-24 oml:py-10 bg-white text-black', className)}>
      <div className="grid-layout-mobile md:grid-layout-desktop">
        <div className="col-span-full flex flex-col items-start gap-6 md:col-start-2 md:col-span-5 md:justify-center">
          {overtitle ? <p className="detail-mono text-scale-gray-60">{overtitle}</p> : null}
          {Array.isArray(heading) ? (
            <RichText value={heading} animatedTextRef={headingRef} animatedTextClassName="w-full" />
          ) : heading ? (
            <h2 className="header2 text-black text-balance">{heading}</h2>
          ) : null}
          {subtitle ? <p className="body1 text-scale-gray-30">{subtitle}</p> : null}
          {mediaNode ? (
            <div className="relative w-full">{mediaNode}</div>
          ) : hasVideo ? (
            <div className="relative w-full overflow-hidden rounded-2xl aspect-square">
              {playVideo ? (
                <ResponsiveVideo asset={video!} loop autoPlay muted poster={image?.path} className="absolute inset-0 h-full w-full" />
              ) : (
                <Image src={image!.path} alt={image!.alt ?? ''} width={1200} height={1200} className="absolute inset-0 h-full w-full object-cover" />
              )}
            </div>
          ) : hasImage ? (
            <div className={cn('relative w-full overflow-hidden rounded-2xl', mediaFrame && 'border border-scale-gray-90 bg-white p-2 shadow-[0_8px_40px_rgba(0,0,0,0.06)]')}>
              <Image src={image!.path} alt={image!.alt ?? ''} width={image!.width ?? 800} height={image!.height ?? 600} className="w-full h-auto rounded-xl" />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-5 col-span-full md:gap-10 md:col-start-8 md:col-span-4 oml:flex-row">
          {cards.map((card, i) => (
            <div className="oml:flex-1 oml:min-w-0" key={card._key}>
              <article className="flex flex-col">
                <Pillar
                  ref={(el) => {
                    pillars.current[i] = el
                  }}
                  card={card}
                  index={i}
                  retroactiveOnEnter={retroactiveOnEnter}
                />
              </article>
              {i !== cards.length - 1 ? (
                <div
                  ref={(el) => {
                    rules.current[i] = el
                  }}
                  className="w-full h-px mt-5 origin-left scale-x-0 bg-scale-gray-90 md:mt-10 oml:hidden"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
