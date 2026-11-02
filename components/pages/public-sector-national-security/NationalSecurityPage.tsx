'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/components/site/lib/cn'
import { gsap } from '@/components/site/lib/gsap'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'
import { useMediaQuery } from '@/components/site/lib/useMediaQuery'
import { AnimatedText, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import { BaseCard } from '@/components/site/shared/BaseCard'
import { BlogPreview } from '@/components/site/shared/BlogPreview'
import { CardGrid } from '@/components/site/shared/CardGrid'
import { ClipScrollSection } from '@/components/site/shared/ClipScrollSection'
import { FlatCta } from '@/components/site/shared/FlatCta'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { HeadlineWithCta, type HeadlineWithCtaHandle } from '@/components/site/shared/HeadlineWithCta'
import { LogoTile } from '@/components/site/shared/LogoMarquee'
import { ResponsiveImage } from '@/components/site/shared/ResponsiveImage'
import { RichText } from '@/components/site/shared/RichText'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { SteppedVideo } from '@/components/site/shared/stepped-video/SteppedVideo'
import { BlogPreview3D } from '@/components/pages/enterprise/BlogPreview3D'
import { MdIcon } from './icons'
import styles from './national-security.module.css'
import type { NationalSecurityContent } from './types'

const setTheme = (el: HTMLElement | null, theme: string) => el?.setAttribute('data-theme', theme)

// Scale module 831675.
function NatSecHero({ c }: { c: NationalSecurityContent['hero'] }) {
  const root = useRef<HTMLDivElement>(null)
  const head = useRef<HeadlineWithCtaHandle>(null)
  const media = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    setTheme(root.current, 'dark')
    gsap.set(media.current, { opacity: 0 })
  }, [])
  useEffect(() => {
    let live = true
    ;(async () => {
      await head.current?.ready()
      if (!live) return
      head.current?.animateIn({ delay: 1 })
      gsap.to(media.current, { opacity: 1, duration: 1, delay: 1.5 })
    })()
    return () => {
      live = false
    }
  }, [])
  return (
    <div ref={root} data-theme="dark" className="NatSecHero bg-black relative text-white min-h-screen overflow-hidden">
      <div className="w-full h-full py-10 max-md:content-start max-md:pt-[max(6rem,16dvh)] grid-layout-mobile md:grid-layout-desktop oml:grid-layout-desktop gap-y-8 max-md:gap-y-[max(2rem,8dvh)] md:py-16 md:gap-y-0 oml:py-16 oml:gap-y-0 min-h-screen">
        <div className="flex flex-col lg:gap-6 oml:gap-6 col-span-full md:col-start-1 md:col-span-6 md:self-center xl:col-start-2 xl:col-span-4 oml:col-start-2 oml:col-span-6 oml:self-center">
          <HeadlineWithCta
            animationManual
            ref={head}
            padding={false}
            headline={c.headline}
            subtitle={c.subtitle}
            headerTag="h1"
            headerClass="header3-regular oml:header4-regular leading-none text-center! md:text-left! oml:text-left!"
            subtitleClasses="text-white max-md:text-base! md:text-lg text-center! md:text-left! oml:text-left!"
            width="w-full"
            className="items-center! md:items-start! oml:items-start! pt-0 max-sm:pb-6"
          />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 justify-center origin-left md:justify-start animate-[logo-rise_0.8s_cubic-bezier(0.22,0.61,0.36,1)_2s_both] motion-reduce:animate-none">
              <span aria-hidden className="w-[6px] h-[6px] bg-white triangle" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
              <p className="text-[0.625rem] md:text-xs font-aeonik tracking-wider uppercase text-white">{c.trustedBy}</p>
            </div>
            <div className="relative overflow-hidden max-md:[mask-image:linear-gradient(to_right,transparent,black_1.5rem,black_calc(100%-1.5rem),transparent)]">
              <div className="flex w-max items-center animate-logo-marquee motion-reduce:animate-none">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0 items-center gap-x-8 pr-8" aria-hidden={copy === 1}>
                    {c.logos.map((logo, i) => (
                      <span key={`${copy}-${logo.key}`} style={{ animationDelay: `${2.15 + 0.1 * i}s`, width: logo.width }} className="flex h-9 shrink-0 items-center justify-center origin-left animate-[logo-rise_0.8s_cubic-bezier(0.22,0.61,0.36,1)_both] motion-reduce:animate-none">
                        {logo.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={logo.src} alt={copy === 0 ? logo.alt : ''} className="max-h-full max-w-full object-contain select-none pointer-events-none [filter:brightness(0)_invert(1)]" />
                        ) : (
                          <LogoTile className="h-[27px]" style={{ width: '100%' }} />
                        )}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-start-7 md:col-span-6 md:self-center oml:col-start-7 oml:col-span-6 relative max-md:order-first max-md:aspect-[2029/1174] md:h-[635px]">
          <div ref={media} className="select-none pointer-events-none absolute inset-0 md:inset-auto md:left-0 md:top-0 md:h-[635px] md:w-[1451px]">
            <ResponsiveImage asset={c.image} fill noBackground sizes="(max-width: 767px) 100vw, 1451px" alt="" className="[&_img]:object-contain [&_img]:object-center md:[&_img]:object-left" />
          </div>
        </div>
      </div>
    </div>
  )
}

const CARD_END_MD = 'top bottom-=276'
const CARD_END_SM = 'top bottom-=188'

// Scale module 298718.
function NatSecStatsPanel({ c }: { c: NationalSecurityContent['stats'] }) {
  const heading = useRef<AnimatedTextHandle>(null)
  const inner = useRef<HTMLDivElement>(null)
  // Scale reads react-device-detect's isDesktop; a touch screen is its "not desktop" here.
  const isDesktop = useMediaQuery('(hover: hover) and (pointer: fine)', false) === true
  const md = useMediaQuery('(min-width: 768px)', false) === true
  const cols = md ? 3 : 1
  useInViewTrigger(inner, {
    start: 'top 85%',
    retroactiveOnEnter: true,
    onEnter: async () => {
      await heading.current?.ready()
      heading.current?.animateIn({ delay: 0.1 })
    },
  })
  const entrance = (i: number) => {
    const a = i % 3
    if (!isDesktop || (a !== 0 && a !== 2)) return { scaleTransformOrigin: 'center center', entranceTranslateX: 0 }
    return a === 0 ? { scaleTransformOrigin: 'right center', entranceTranslateX: -160 } : { scaleTransformOrigin: 'left center', entranceTranslateX: 160 }
  }
  return (
    <section className="NatSecStatsPanel relative w-full">
      <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden>
        <ResponsiveImage asset={c.background} fill objectCover noBackground sizes="100vw" alt="" />
      </div>
      <ClipScrollSection startPercentage={md ? 10 : 1.5} startScale={1} backdropColor="" borderRadius={1} className="relative p-4" clipContainerClassName="w-full">
        <div className="relative w-full">
          <div className="relative rounded-2xl bg-black p-6 md:p-14">
            <div ref={inner} className="mx-auto flex w-full max-w-[978px] flex-col gap-10 md:gap-16">
              <AnimatedText ref={heading} tagName="h2" className="header2 mx-auto max-w-4xl text-balance text-center text-white">
                {c.heading}
              </AnimatedText>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {c.items.map((s, i) => (
                  <BaseCard key={i} scaleDir="down" staggerIndex={i % cols} staggerCount={cols} scrollTriggerEnd={md ? CARD_END_MD : CARD_END_SM} {...entrance(i)} className="flex min-h-[180px] flex-col justify-between rounded-2xl bg-white/[0.09] p-6 md:min-h-[268px]">
                    <div className="flex items-center gap-4">
                      <span className="flex size-[26px] shrink-0 items-center justify-center rounded-[5px] bg-foundry-tan-lt">
                        <MdIcon name={s.icon} size={16} className="text-black" />
                      </span>
                      <p className="detail-mono uppercase tracking-tight text-scale-gray-60">{s.label}</p>
                    </div>
                    <div className="flex flex-col gap-5">
                      <p className="header3-regular text-scale-gray-90 max-lg:text-[2rem] max-lg:leading-10">{s.value}</p>
                      <p className="text-sm leading-5 tracking-tight text-scale-gray-60">{s.description}</p>
                    </div>
                  </BaseCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ClipScrollSection>
    </section>
  )
}

// Scale module 698764 with a CardGrid: `foundry-tan`, `contentWidth: large`, `marginVertical: none`.
function TrustSection({ c }: { c: NationalSecurityContent['trust'] }) {
  return (
    <div className="Section overflow-hidden text-black grid-layout-mobile md:grid-layout-desktop relative isolate bg-foundry-tan" data-text-theme="black">
      <div className="rounded-3xl relative isolate col-span-full md:col-start-1 md:col-span-12 xl:col-start-2 xl:col-span-10">
        <CardGrid
          heading={c.heading}
          animationDirection="down"
          directionalEntrance
          fluidLayout={false}
          headerAlignment="text-center"
          headerSize="md"
          iconSize="md"
          cards={c.cards.map((card) => ({
            _type: 'card' as const,
            title: card.title,
            description: card.description,
            iconBgColor: { hex: '#000000' },
            icon: ({ size, className }: { size?: number; className?: string }) => <MdIcon name={card.icon} size={size} className={className} />,
          }))}
        />
      </div>
    </div>
  )
}

// Scale module 698764 with a HeadlineWithCta: white, `contentWidth: full`, `marginVertical: none`.
function MissionTitle({ c }: { c: NationalSecurityContent['missionTitle'] }) {
  return (
    <div className="Section overflow-hidden text-black grid-layout-mobile md:grid-layout-desktop relative isolate bg-white" data-text-theme="black">
      <div className="rounded-none relative isolate col-span-full">
        <HeadlineWithCta headline={c.headline} subtitle={c.subtitle} cta={c.cta} />
      </div>
    </div>
  )
}

function HowToBuyItem({ item, open, onToggle, buttonId, panelId }: { item: NationalSecurityContent['howToBuy']['items'][number]; open: boolean; onToggle: () => void; buttonId: string; panelId: string }) {
  const clip = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  useLayoutEffect(() => {
    const el = panel.current
    if (!el) return
    const ro = new ResizeObserver(() => setHeight(el.scrollHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    if (clip.current) gsap.to(clip.current, { height: open ? height : 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
  }, [open, height])
  return (
    <li className="border-b border-black/80">
      <button type="button" id={buttonId} aria-expanded={open} aria-controls={panelId} onClick={onToggle} className="group flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer">
        <span className="header6 text-scale-gray-20 transition-colors duration-200 ease-out group-hover:text-black">{item.question}</span>
        <span aria-hidden className="relative flex size-4 shrink-0 items-center justify-center">
          <span className="absolute h-px w-4 bg-current" />
          <span className={cn('absolute h-px w-4 origin-center bg-current transition-transform duration-300 ease-out motion-reduce:transition-none', open ? 'rotate-0' : 'rotate-90')} />
        </span>
      </button>
      <div ref={clip} className="h-0 overflow-clip">
        <div ref={panel} id={panelId} role="region" aria-labelledby={buttonId} className="pb-3 text-scale-gray-10 [&_p]:body2-regular">
          <RichText value={item.answer} />
        </div>
      </div>
    </li>
  )
}

// Scale module 109486.
function NatSecHowToBuy({ c }: { c: NationalSecurityContent['howToBuy'] }) {
  const heading = useRef<AnimatedTextHandle>(null)
  const wrap = useRef<HTMLDivElement>(null)
  useInViewTrigger(wrap, {
    start: 'top 85%',
    retroactiveOnEnter: true,
    onEnter: async () => {
      await heading.current?.ready()
      heading.current?.animateIn({ delay: 0.1 })
    },
  })
  const [open, setOpen] = useState<string | null>(c.items[0]?.key ?? null)
  const id = useId()
  return (
    <section className="NatSecHowToBuy w-full bg-scale-gray-80 py-16 text-black md:py-28">
      <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="flex min-w-0 flex-col items-start gap-10 lg:flex-1">
            <div ref={wrap} className="flex flex-col gap-6">
              <AnimatedText ref={heading} tagName="h2" className="header3-regular text-balance">
                {c.heading}
              </AnimatedText>
              <div className="max-w-[486px] text-pretty [&_p]:body2-regular">
                <RichText value={c.body} />
              </div>
            </div>
            <FlatCta href={c.cta.url} text={c.cta.text} variant="arrow" theme="none" className="bg-foundry-tan text-white" />
          </div>
          <div className="min-w-0 lg:w-[600px] lg:shrink-0">
            <ul className="m-0 flex list-none flex-col p-0">
              {c.items.map((item) => (
                <HowToBuyItem key={item.key} item={item} open={open === item.key} onToggle={() => setOpen(open === item.key ? null : item.key)} buttonId={`${id}-button-${item.key}`} panelId={`${id}-panel-${item.key}`} />
              ))}
            </ul>
          </div>
        </div>
        <div className="relative mt-20 aspect-[1477/360] w-full overflow-hidden rounded-2xl max-md:aspect-[2/1] max-md:[&_img]:object-right">
          <ResponsiveImage asset={c.image} fill objectCover noBackground sizes="100vw" alt={c.image.alt ?? ''} />
        </div>
      </div>
    </section>
  )
}

export function NationalSecurityPage({ content: c }: { content: NationalSecurityContent }) {
  return (
    <div className={cn('relative overflow-x-hidden', styles.page)} data-initial-chrome-theme="dark">
      <PageThemeSetter theme="dark" />
      <div className="CMSSliceRenderer relative rootPageRenderer">
        <NatSecHero c={c.hero} />
        <SteppedVideo componentName="SgpIntro" configFilePath="sgp-intro.json" layout="headingPinned" counterLabel={c.challenges.counterLabel} introHeadline={c.challenges.headline} introBody={c.challenges.body} introImage={c.challenges.image} steps={c.challenges.steps} />
        <NatSecStatsPanel c={c.stats} />
        <TrustSection c={c.trust} />
        <MissionTitle c={c.missionTitle} />
        <SteppedVideo componentName="SgpFlywheel" configFilePath="sgp-flywheel.json" layout="stepsOnly" hideProcessLabel introHeadline="" introLabel="" steps={c.mission.steps} />
        <BlogPreview3D content={c.customers} />
        <NatSecHowToBuy c={c.howToBuy} />
        <BlogPreview heading={c.resources.heading} pageThemeOverride="light" posts={c.resources.posts} />
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={{ tailwindClass: 'white', contrastColor: '#010101' }} image={c.prefooter.image} />
      </div>
      <SectionThemeWatcher />
    </div>
  )
}
