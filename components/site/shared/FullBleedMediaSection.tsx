'use client'

// Scale module 540431 (FullBleedMediaSection, usually the pre-footer CTA).
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { cn } from '../lib/cn'
import { mapRange } from '../lib/math'
import { useInViewTrigger } from '../lib/useInViewTrigger'
import { useScrubTrigger } from '../lib/useScrubTrigger'
import { AnimatedText, type AnimatedTextHandle } from './AnimatedText'
import { AnimatedFlatCta, type AnimatedFlatCtaHandle, flatCtaIntros } from './AnimatedFlatCta'
import { ClipScrollSection, type ClipScrollHandle } from './ClipScrollSection'
import { FlatCta, type FlatCtaVariant } from './FlatCta'
import { LogoMarquee, type LogoMarqueeHandle, type MarqueeLogo } from './LogoMarquee'
import { ResponsiveImage, type ImageAsset } from './ResponsiveImage'
import { ResponsiveVideo, type VideoAsset } from './ResponsiveVideo'

const ROUNDED = 'rounded-3xl overflow-hidden [clip-path:inset(0_round_1.5rem)]'
const ROUNDED_MEDIA = cn(ROUNDED, '[&_img]:[border-radius:inherit] [&_img]:[clip-path:inherit]', '[&_video]:[border-radius:inherit] [&_video]:[clip-path:inherit]')

export type CtaLink = { url: string; text: string; smoothScrollTargetId?: string }

export type FullBleedMediaSectionProps = {
  backdropColor?: { tailwindClass: string; contrastColor?: string }
  image?: ImageAsset
  video?: VideoAsset
  headline: string
  body?: string
  cta?: CtaLink | null
  secondaryCta?: CtaLink | null
  rounded?: boolean
  animateCta?: boolean
  sectionClassName?: string
  startPercentage?: number
  logos?: { label?: string; logos?: MarqueeLogo[] } | null
  overlayVariant?: 'flat' | 'gradient'
  headlineWidth?: 'wide' | 'narrow'
  /**
   * Not on Scale. Prepares the CTA before the trigger's retroactive enter, not after it, and never once revealed.
   * On Scale's order a long main-thread block during hydration (a WebGL section below, Strict Mode) can leave
   * an in-view hero's CTA hidden for good: the prepare kills the intro, then `started` stops the retry.
   */
  stableCtaIntro?: boolean
  /** Scale's palette colour for this image, shown behind it while it loads (module 669677). */
  imageBackgroundColor?: string
}

export function FullBleedMediaSection({
  backdropColor,
  image,
  video,
  headline,
  body = '',
  cta = null,
  secondaryCta = null,
  rounded = true,
  animateCta = true,
  sectionClassName = '',
  startPercentage = 10,
  logos = null,
  overlayVariant = 'flat',
  headlineWidth = 'wide',
  stableCtaIntro = false,
  imageBackgroundColor,
}: FullBleedMediaSectionProps) {
  const clip = useRef<ClipScrollHandle>(null)
  const section = useRef<HTMLElement>(null)
  const headlineRef = useRef<AnimatedTextHandle>(null)
  const bodyRef = useRef<AnimatedTextHandle>(null)
  const primary = useRef<AnimatedFlatCtaHandle>(null)
  const secondary = useRef<AnimatedFlatCtaHandle>(null)
  const started = useRef(false)
  const media = useRef<HTMLDivElement>(null)
  const marquee = useRef<LogoMarqueeHandle>(null)
  const prepare = useCallback(() => {
    primary.current?.animateSet()
    secondary.current?.animateSet()
  }, [])
  useLayoutEffect(() => {
    if (stableCtaIntro && !started.current) prepare()
  }, [prepare, stableCtaIntro])
  useEffect(() => {
    if (!stableCtaIntro) prepare()
  }, [prepare, stableCtaIntro])
  useEffect(() => {
    marquee.current?.startMarquee()
  }, [])
  const onEnter = useCallback(async () => {
    if (started.current) return
    const texts = [headlineRef.current, bodyRef.current].filter(Boolean) as AnimatedTextHandle[]
    if (texts.length === 0) {
      started.current = true
      return
    }
    primary.current?.animateIn({ duration: 0.85, delay: 0.5 })
    secondary.current?.animateIn({ duration: 0.85, delay: 0.5 })
    await Promise.all(texts.map((t) => t.ready()))
    await Promise.all(texts.map((t, i) => t.animateIn({ delay: 0.2 * i })))
    started.current = true
  }, [])
  useInViewTrigger(section, { start: 'top center', onEnter, retroactiveOnEnter: true })
  useScrubTrigger(section, {
    start: 'top bottom',
    end: 'center center',
    onUpdate: (self) => {
      if (!media.current) return
      gsap.set(media.current, { scale: mapRange(self.progress, 0, 1, 1.25, 1, true) })
    },
  })
  const renderCta = (link: CtaLink | null, ref: typeof primary, variant: FlatCtaVariant, intro: keyof typeof flatCtaIntros) => {
    if (!link) return null
    const props = { href: link.url, smoothScrollTargetId: link.smoothScrollTargetId, text: link.text, variant, theme: 'white' as const }
    return animateCta ? <AnimatedFlatCta ref={ref} {...props} introAnimation={intro} /> : <FlatCta {...props} />
  }
  return (
    <ClipScrollSection
      ref={clip}
      backdropColor={backdropColor ? backdropColor.tailwindClass : 'white'}
      startPercentage={startPercentage}
      startScale={1}
      borderRadius={1.5}
      className="grid-layout-mobile md:grid-layout-desktop px-4! md:grid-padding"
      clipContainerClassName="col-span-full"
    >
      <section ref={section} className={cn('text-black bg-white FullBleedMediaSection', rounded && ROUNDED, sectionClassName)}>
        <div className={cn('relative p-8 md:p-16 min-h-[480px] md:min-h-[720px] flex items-end', rounded ? ROUNDED : 'overflow-clip')}>
          <div className={cn('relative z-20 flex flex-col gap-6 w-full max-w-[72rem]', backdropColor?.contrastColor === '#010101' ? 'text-black' : 'text-white')}>
            <AnimatedText
              tagName="h2"
              ref={headlineRef}
              className={cn('text-white header2 text-balance text-[clamp(2rem,0.5rem+5vw,4rem)]!', headlineWidth === 'narrow' && 'max-w-[620px]')}
            >
              {headline}
            </AnimatedText>
            {body ? (
              <AnimatedText tagName="p" ref={bodyRef} className="w-full text-white body1 text-balance">
                {body}
              </AnimatedText>
            ) : null}
            <div className="flex flex-col gap-4 md:flex-row">
              {renderCta(cta, primary, 'arrow', 'filledWhiteArrow')}
              {renderCta(secondaryCta, secondary, 'border', 'fadeIn')}
            </div>
            {logos?.logos?.length ? (
              <div className="flex flex-col gap-2 w-full max-w-md min-w-0 mt-4">
                {logos.label ? (
                  <div className="flex items-center gap-2">
                    <span aria-hidden className="w-[6px] h-[6px] shrink-0 bg-scale-gray-60" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
                    <p className="text-[0.625rem] font-aeonik tracking-wider uppercase text-scale-gray-60">{logos.label}</p>
                  </div>
                ) : null}
                <LogoMarquee ref={marquee} logos={logos.logos} className="w-full min-w-0 opacity-40" logoClassName="text-white" />
              </div>
            ) : null}
          </div>
          <div className={cn('absolute top-0 left-0 w-full h-full origin-center', rounded && ROUNDED)}>
            <div className={cn('absolute inset-0 z-10 w-full h-full media-overlay pointer-events-none', overlayVariant === 'flat' && 'bg-black/45', rounded && ROUNDED)} />
            {video ? (
              // Scale passes a ref its ResponsiveVideo ignores, so videos never get the 1.25 to 1 scale.
              <ResponsiveVideo asset={video} loop autoPlay muted poster={image?.path} className={cn('absolute top-0 left-0 w-full h-full pointer-events-none', rounded && ROUNDED_MEDIA)} />
            ) : image ? (
              <div ref={media} className={cn('absolute inset-0 w-full h-full', rounded && ROUNDED)}>
                <ResponsiveImage
                  asset={image}
                  fill
                  className={cn('w-full h-full', rounded && ROUNDED_MEDIA)}
                  sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1920px) 100vw, 1920px"
                  objectCover
                  backgroundColor={imageBackgroundColor}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </ClipScrollSection>
  )
}
