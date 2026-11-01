'use client'

// https://scale.com/enterprise. Sections in Scale's order, see docs/specs/enterprise.md.
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { gsap, useGSAP } from '@/components/site/lib/gsap'
import { cn } from '@/components/site/lib/cn'
import { clamp, mapRange } from '@/components/site/lib/math'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'
import { useMediaQuery } from '@/components/site/lib/useMediaQuery'
import { useScrubTrigger } from '@/components/site/lib/useScrubTrigger'
import { AnimatedText, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import { BaseCard } from '@/components/site/shared/BaseCard'
import { CardGrid, LinkCard, type CardData } from '@/components/site/shared/CardGrid'
import { ClientTestimonials } from '@/components/site/shared/ClientTestimonials'
import { ClipScrollSection, type ClipScrollHandle } from '@/components/site/shared/ClipScrollSection'
import { EnterprisePillars, type PillarCard } from '@/components/site/shared/EnterprisePillars'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { HeadlineWithCta, type HeadlineWithCtaHandle } from '@/components/site/shared/HeadlineWithCta'
import { LogoMarquee, LogoTile, type LogoMarqueeHandle } from '@/components/site/shared/LogoMarquee'
import { ResponsiveImage } from '@/components/site/shared/ResponsiveImage'
import { RichText } from '@/components/site/shared/RichText'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { TransparentVideo } from '@/components/site/shared/TransparentVideo'
import { TwoColumnTextWithVideo } from '@/components/site/shared/TwoColumnTextWithVideo'
import { BlogPreview3D } from './BlogPreview3D'
import { EnterpriseHero } from './EnterpriseHero'
import { LogoCloud } from './LogoCloud'
import { PullApart } from './PullApart'
import type { CardIconKey, EnterpriseContent, EnterpriseLogo, PillarIconKey } from './types'

const MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'

// react-icons Material icons as Scale's lazy icon module renders them, read from the live DOM.
const CARD_ICONS: Record<CardIconKey, { base: string; d: string }> = {
  time: { base: 'M0 0h24v24H0V0z', d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.71L11 12.41V7h2v4.59l3.71 3.71-1.42 1.41z' },
  revenue: { base: 'M0 0h24v24H0z', d: 'm3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z' },
  accuracy: { base: 'M0 0h24v24H0z', d: 'M5 10h2v7H5zM11 10h2v7h-2zM22 6 12 1 2 6v2h20zM2 19v2h12.4c-.21-.64-.32-1.31-.36-2H2zM19 12.26V10h-2v3.26zM20 14l-4 2v2.55c0 2.52 1.71 4.88 4 5.45 2.29-.57 4-2.93 4-5.45V16l-4-2zm-.72 7-2.03-2.03 1.06-1.06.97.97 2.41-2.38 1.06 1.06L19.28 21z' },
  adoption: { base: 'M0 0h24v24H0z', d: 'M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z' },
  speed: { base: 'M0 0h24v24H0z', d: 'm11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z' },
}
const PILLAR_ICONS: Record<PillarIconKey, string> = {
  experts: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  technology:
    'M8.4 18.2c.38.5.6 1.12.6 1.8 0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3c.44 0 .85.09 1.23.26l1.41-1.77a4.504 4.504 0 0 1-1.09-3.69l-2.03-.68A2.997 2.997 0 0 1 0 9.5c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .07 0 .14-.01.21l2.03.68a4.468 4.468 0 0 1 3.22-2.32V5.91A3.018 3.018 0 0 1 9 3c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.4-.96 2.57-2.25 2.91v2.16c1.4.23 2.58 1.11 3.22 2.32L18 9.71V9.5c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3c-1.06 0-1.98-.55-2.52-1.37l-2.03.68a4.49 4.49 0 0 1-1.09 3.69l1.41 1.77c.38-.18.79-.27 1.23-.27 1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3c0-.68.22-1.3.6-1.8l-1.41-1.77c-1.35.75-3.01.76-4.37 0L8.4 18.2z',
  research: 'M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z',
}

function MdIcon({ base, d, size, className, color }: { base: string; d: string; size?: number; className?: string; color?: string }) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={className} height={size} width={size} color={color} xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d={base} />
      <path d={d} />
    </svg>
  )
}

/** Scale module 964254: a logo as a CSS mask, in the current colour. A logo with no `src` draws the neutral tile. */
function CustomerLogo({ logo, width, height, className, bounds, tileClassName }: { logo: EnterpriseLogo; width?: number; height?: number; className?: string; bounds?: { width: number; height: number }; tileClassName?: string }) {
  if (!logo.src) return <LogoTile className={tileClassName} />
  const url = `url("${logo.src}")`
  return (
    <div
      className={cn('inline-block h-full', className)}
      style={{ backgroundColor: 'currentColor', WebkitMaskImage: url, maskImage: url, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        className="opacity-0 pointer-events-none"
        width={width}
        height={height}
        style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto', maxWidth: bounds?.width ? `${bounds.width}px` : '100px', maxHeight: bounds?.height ? `${bounds.height}px` : '100px' }}
      />
    </div>
  )
}

/** Scale module 698764 `u` (Section slice), the options this page sets. */
function Section({ margin, width, background, inset, parallaxFadeOut = false, dark = false, children }: { margin: string; width: string; background: string; inset?: string; parallaxFadeOut?: boolean; dark?: boolean; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (!inset || !inner.current || !bg.current) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(bg.current, { width: '100%' })
        return
      }
      const t = gsap.fromTo(bg.current, { width: '90%' }, { width: '100%', duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: inner.current, start: 'top bottom', end: 'bottom 75%', scrub: true } })
      return () => {
        t.scrollTrigger?.kill()
        t.kill()
      }
    },
    { scope: root, dependencies: [inset] },
  )
  useGSAP(
    () => {
      if (!parallaxFadeOut) return
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'bottom 100%', end: 'bottom top', scrub: true } }).to(root.current, { yPercent: 20, duration: 1, ease: 'power3.in' }, 0).fromTo(inner.current, { opacity: 1 }, { opacity: 0, duration: 0.75, ease: 'none' }, 0.15)
      return () => {
        tl.kill()
      }
    },
    { scope: root, dependencies: [parallaxFadeOut] },
  )
  return (
    <div ref={root} data-theme={dark ? 'dark' : undefined} className={cn('Section overflow-hidden', margin, background === 'black' ? 'text-white' : 'text-black', 'grid-layout-mobile md:grid-layout-desktop relative isolate', `bg-${background}`)} data-text-theme={background === 'black' ? 'white' : 'black'}>
      <div ref={inner} className={cn('rounded-3xl relative isolate', width)}>
        {inset ? (
          <>
            <div ref={bg} className={cn('pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 z-0 rounded-3xl', `bg-${inset}`)} aria-hidden />
            <div className="relative z-10 text-white">{children}</div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

/** Scale module 676267 with mediaPosition left, size medium. */
function EnterpriseBridge({ content: c }: { content: EnterpriseContent['bridge'] }) {
  const marquee = useRef<LogoMarqueeHandle>(null)
  useEffect(() => {
    marquee.current?.startMarquee()
  }, [])
  const logos = useMemo(() => c.logos.map((l) => ({ id: l.alt, node: l.src ? <CustomerLogo logo={l} bounds={{ width: 70, height: 28 }} height={28} /> : undefined, label: 'Logo' })), [c.logos])
  return (
    <div className="EnterpriseBridge grid-inner-8 md:grid-inner-10 w-full min-h-[60vh] py-6">
      <div className="flex flex-col justify-center col-span-8 col-start-1 gap-6 text-center md:row-start-1 oml:col-span-4 oml:col-start-4 md:col-start-2 md:col-span-4">
        <TransparentVideo video={{ webm: c.video.webm, mov: c.video.mov, poster: c.video.poster, name: c.video.name, aspectRatio: '1080 / 1080' }} className="w-3/4 md:w-full oml:w-1/2" />
      </div>
      <div className="flex flex-col justify-center col-span-6 col-start-2 gap-6 text-center md:row-start-1 md:text-left md:col-start-7 md:col-span-3">
        <HeadlineWithCta
          padding={false}
          headline={c.headline}
          subtitle={c.subtitle}
          width="w-full"
          headerClass="text-center md:text-left header4-regular leading-7 md:leading-10"
          subtitleClasses="text-scale-gray-80 text-inherit text-center md:text-left leading-normal px-0 mx-0"
          className="w-full px-0 mx-0 pt-0!"
        />
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <div className="w-[6px] h-[6px] bg-white triangle" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
          <p className="text-[0.625rem] md:text-xs font-aeonik tracking-wider uppercase text-white/80">{c.trustedBy}</p>
        </div>
        <LogoMarquee ref={marquee} logos={logos} className="w-full min-w-0" containerClassName="md:gap-3" />
      </div>
    </div>
  )
}

/** Scale module 366838 `p`. */
function PoweredCard({ card, index, isDesktop }: { card: EnterpriseContent['poweredBy']['cards'][number]; index: number; isDesktop: boolean }) {
  const headline = useRef<HeadlineWithCtaHandle>(null)
  const icon = useRef<HTMLDivElement>(null)
  useEffect(() => {
    headline.current?.ready().then(() => {
      headline.current?.animateSet()
      if (icon.current) gsap.set(icon.current, { opacity: 0, scale: 0.3 })
    })
  }, [])
  const onIn = useCallback(() => {
    headline.current?.animateIn({ delay: 0, delayHeadline: 0, delaySubtitle: 0.2, delayCta: 0.4 })
    if (icon.current) gsap.to(icon.current, { opacity: 1, scale: 1, duration: 0.85, ease: 'power2.out' })
  }, [])
  return (
    <BaseCard scaleTransformOrigin="center center" scrollTriggerStart="0% 120%" entranceTranslateX={isDesktop ? (index === 0 ? -160 : 160) : 0} noOpacity onInViewport={onIn} className="h-full">
      <div className="flex flex-col h-full gap-6 p-6 bg-white rounded-lg md:gap-8 md:p-8 md:rounded-2xl z-2">
        <div ref={icon} className="relative w-10 h-10 shrink-0">
          <Image src={card.icon} alt="" fill unoptimized className="object-contain" sizes="40px" />
        </div>
        <HeadlineWithCta ref={headline} className="p-0!" padding={false} headline={card.headline} subtitle={[{ style: 'body2', text: card.subtitle }]} headerClass="subheader1" width="w-full" align="left" animationManual />
      </div>
    </BaseCard>
  )
}

/** Scale module 366838. */
function EnterprisePoweredBy({ content: c }: { content: EnterpriseContent['poweredBy'] }) {
  const isDesktop = useMediaQuery('(hover: hover) and (pointer: fine)', false) === true
  const root = useRef<HTMLElement>(null)
  const headline = useRef<HeadlineWithCtaHandle>(null)
  const done = useRef(false)
  useEffect(() => {
    headline.current?.animateSet()
  }, [])
  const onEnter = useCallback(async () => {
    if (done.current) return
    await headline.current?.ready()
    headline.current?.animateIn({ delay: 0 })
    done.current = true
  }, [])
  useInViewTrigger(root, { start: 'top bottom', end: 'top bottom', onEnter })
  return (
    <section ref={root} className="EnterprisePoweredBy bg-scale-gray-90 text-black py-16 md:py-24 oml:py-10">
      <div className="grid-layout-mobile md:grid-layout-desktop">
        <div className="pb-8 col-span-full md:col-start-4 md:col-span-6 oml:pb-0">
          <HeadlineWithCta
            ref={headline}
            headerClass="header2"
            className="oml:pt-0"
            subtitleClasses="w-full md:w-xl"
            ctaAnimation="filledWhiteArrow"
            padding={false}
            headline={c.headline}
            subtitle={c.subtitle}
            cta={[{ url: c.cta.url, text: c.cta.text, variant: 'arrow' }]}
            width="w-full"
            align="center"
            animationManual
          />
        </div>
        <ClipScrollSection startPercentage={10} startScale={0.85} className="w-full mb-6 rounded-lg col-span-full md:mb-0 md:col-start-2 md:col-span-10 xl:col-start-3 xl:col-span-8 overflow-clip md:rounded-2xl" borderRadius={isDesktop ? 1 : 0.75} noClip>
          <div className="relative w-full aspect-video">
            <ResponsiveImage asset={{ path: c.image.path, alt: c.image.alt }} fill className="object-cover" sizes="(min-width: 768px) 66vw, 100vw" alt={c.image.alt} />
          </div>
        </ClipScrollSection>
        <div className="flex flex-col gap-2 md:col-start-3 md:flex-row col-span-full md:col-span-8 xl:col-start-4 xl:col-span-6">
          {c.cards.map((card, i) => (
            <article key={i} className="flex flex-col gap-4 h-full md:-translate-y-20 flex-1">
              <PoweredCard card={card} index={i} isDesktop={isDesktop} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Scale module 270115. */
function EnterpriseBuiltToBeTrusted({ content: c }: { content: EnterpriseContent['trusted'] }) {
  const isDesktop = useMediaQuery('(hover: hover) and (pointer: fine)', false) === true
  const media = useRef<HTMLDivElement>(null)
  const clip = useRef<ClipScrollHandle>(null)
  const title = useRef<AnimatedTextHandle>(null)
  const cards = useRef<({ animateIn: (o?: { delay?: number; index?: number }) => Promise<void> } | null)[]>([])
  const root = useRef<HTMLElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const done = useRef(false)
  const onEnter = useCallback(async () => {
    if (done.current) return
    c.cards.forEach((_, i) => cards.current[i]?.animateIn({ delay: 0.075 + 0.045 * i }))
    if (title.current) {
      await title.current.ready()
      await title.current.animateIn({ delay: 0 })
    }
    done.current = true
  }, [c.cards])
  useInViewTrigger(root, { onEnter })
  useScrubTrigger(root, {
    start: 'top bottom',
    end: 'bottom top',
    pinSpacing: false,
    onUpdate: (self) => {
      if (!panel.current || !media.current || !clip.current) return
      const v = clip.current.getClipValue() ?? 0
      const s = clip.current.getScaleValue() ?? 1
      panel.current.style.clipPath = `inset(${clamp(v, 0, 5)}% round 1rem)`
      panel.current.style.transform = `scale(${s})`
      const scale = mapRange(self.progress, 0, 1, 1.5, 1.25, true)
      const y = mapRange(self.progress, 0, 1, -0.2, 0.2, true)
      gsap.set(media.current, { scale, translate: `0 ${-(100 * y)}%` })
    },
  })
  return (
    <section ref={root} className="EnterpriseBuiltToBeTrusted bg-white text-black pt-30">
      <div className="grid-layout-mobile md:grid-layout-desktop">
        <AnimatedText ref={title} tagName="h2" className="pb-8 text-left header2 col-span-full">
          {c.headline}
        </AnimatedText>
      </div>
      <ClipScrollSection ref={clip} startPercentage={10} startScale={1} borderRadius={isDesktop ? 1 : 0.75} scrollEnd={isDesktop ? 'center center' : 'center bottom'} className="h-[600px] md:h-[800px] pb-2 grid-layout-mobile md:grid-layout-desktop mb-2" clipContainerClassName="col-span-full">
        <div className="relative flex items-end justify-start h-full p-8">
          <div ref={media} className="absolute inset-0" role="img" aria-hidden>
            <ResponsiveImage asset={{ path: c.image }} fill objectCover sizes="(max-width: 768px) 100vw, 1600px" alt="" className="h-full w-full" />
          </div>
          <div ref={panel} className="w-full md:max-w-[748px] rounded-2xl border border-white/10 bg-black/45 px-8 py-8 shadow-2xl backdrop-blur-xl md:px-16 md:py-16">
            <div className="flex flex-col gap-8 md:gap-10 md:flex-row md:items-start">
              <div className="flex-1 min-w-0 text-white">
                <RichText value={c.overlay} />
              </div>
              <div className="flex w-full shrink-0 flex-col gap-4 md:w-[min(100%,20rem)]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white triangle" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
                  <p className="text-xs font-medium tracking-wider uppercase text-white/80">{c.trustedBy}</p>
                </div>
                <ul className="flex gap-2">
                  {c.logos.map((l, i) => (
                    <li key={i} aria-label={l.alt} className="flex items-center justify-center text-white rounded-md w-14 h-14 md:w-16 md:h-16 aspect-square logo-backdrop">
                      <CustomerLogo logo={l} width={54} height={54} className="block w-10 h-10" tileClassName="w-10 h-10" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ClipScrollSection>
      <div className="grid-layout-mobile md:grid-layout-desktop">
        {c.cards.map((card, i) => (
          <div key={i} className="col-span-full md:col-span-4">
            <LinkCard
              ref={(el) => {
                cards.current[i] = el
              }}
              iconImage={card.icon}
              title={card.title}
              description={[{ style: 'body2', text: card.description }]}
              link={card.link}
              hoveredColor={card.hover}
              staggerIndex={i}
              staggerCount={c.cards.length}
              className="h-full"
              gap="sm"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export function EnterprisePage({ content: c }: { content: EnterpriseContent }) {
  const stats = useMemo<CardData[]>(
    () =>
      c.results.cards.map((card) => ({
        _type: 'card',
        label: card.label,
        icon: ({ size, className }) => <MdIcon {...CARD_ICONS[card.icon]} size={size} className={className} />,
        iconBgColor: { hex: '#193A29' },
        description: [
          { style: 'h2', text: card.stat },
          { style: 'normal', children: [{ text: card.description, highlightGray: true }] },
        ],
      })),
    [c.results.cards],
  )
  const pillars = useMemo<PillarCard[]>(
    () =>
      c.pillars.cards.map((card) => ({
        _key: card.headline,
        iconColor: card.color,
        iconNode: ({ size, color }: { size?: number; color?: string }) => <MdIcon base="M0 0h24v24H0z" d={PILLAR_ICONS[card.icon]} size={size} color={color} />,
        headlineWithCta: { headline: card.headline, subtitle: [{ style: 'normal', text: card.subtitle }] },
      })),
    [c.pillars.cards],
  )
  const testimonials = useMemo(
    () =>
      c.testimonials.items.map((t) => ({
        clientName: t.clientName,
        title: t.title,
        testimonial: t.testimonial,
        logoLabel: 'Logo',
        logoNode: t.logo.src ? <CustomerLogo logo={t.logo} width={54} height={54} className="block w-10 h-10" /> : undefined,
      })),
    [c.testimonials.items],
  )
  return (
    <div className="relative overflow-x-hidden">
      <PageThemeSetter theme="light" />
      <div className="CMSSliceRenderer relative rootPageRenderer">
        <EnterpriseHero content={c.hero} />
        <PullApart content={c.pullApart} />
        <Section margin="py-16! md:py-32! oml:py-10!" width="col-span-full md:col-start-1 md:col-span-12 xl:col-start-2 xl:col-span-10" background="white" inset="evergreen">
          <EnterpriseBridge content={c.bridge} />
        </Section>
        <BlogPreview3D content={c.blog} />
        <LogoCloud content={c.logoCloud} />
        <Section margin="" width="col-span-full md:col-start-2 md:col-span-10 xl:col-start-3 xl:col-span-8" background="black" parallaxFadeOut dark>
          <CardGrid heading={c.results.heading} cards={stats} animationDirection="down" directionalEntrance fluidLayout headerAlignment="text-left" headerSize="lg" iconSize="sm" />
        </Section>
        <ClientTestimonials heading={c.testimonials.heading} colorTheme={{ tailwindClass: 'cloud-slate', hex: '#839CB2', contrastColor: '#010101' }} testimonials={testimonials} />
        <TwoColumnTextWithVideo theme="enterpriseRaceIsOn" heading={c.race.heading} leftColumn={c.race.left} rightColumn={c.race.right} video={{ url: c.race.video }} background={{ className: 'bg-scale-gray-80 text-black' }} cta={c.race.cta} ctaColumn="left" />
        <EnterprisePillars heading={c.pillars.heading} video={{ url: c.pillars.video }} cards={pillars} />
        <EnterprisePoweredBy content={c.poweredBy} />
        <EnterpriseBuiltToBeTrusted content={c.trusted} />
        <div className="h-16 bg-white w-full" />
        <FullBleedMediaSection headline={c.closing.headline} cta={c.closing.cta} backdropColor={{ tailwindClass: 'white', contrastColor: '#010101' }} image={{ path: c.closing.image }} sectionClassName={MEDIA} />
        <div className="h-8 bg-white w-full" />
      </div>
      <SectionThemeWatcher />
    </div>
  )
}
