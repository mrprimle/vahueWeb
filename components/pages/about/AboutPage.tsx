'use client'

// https://scale.com/about. Slices from the page's RSC payload: 478135 hero, 698764 Section, static sections inline on Scale's page,
// 970272 LogoCloud, 756386 ScrollRevealSection with 540409 CardGrid, 939985 carousel, 808358 BlogPreview, 540431 FullBleedMediaSection.
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useMemo, useRef, type ReactNode } from 'react'
import { cn } from '@/components/site/lib/cn'
import { gsap } from '@/components/site/lib/gsap'
import { BlogPreview, type BlogPreviewPost } from '@/components/site/shared/BlogPreview'
import { CardGrid, type CardData, type LinkCardData } from '@/components/site/shared/CardGrid'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { HeadlineWithCta } from '@/components/site/shared/HeadlineWithCta'
import { LogoCloud } from '@/components/site/shared/LogoCloud'
import { ScrollRevealSection } from '@/components/site/shared/ScrollRevealSection'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { OfficeCarousel } from './OfficeCarousel'
import type { AboutContent, AboutIcon } from './types'

const MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'
const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const COLUMN = 'col-span-full md:col-start-2 md:col-span-10 xl:col-start-3 xl:col-span-8'

// react-icons Material icons as Scale's lazy icon module renders them, read from the live DOM.
const ICONS: Record<AboutIcon, string[]> = {
  storage: ['M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z'],
  barChart: ['M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z'],
  autoAwesome: ['m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z'],
  psychology: [
    'M13 8.57a1.43 1.43 0 1 0 0 2.86 1.43 1.43 0 0 0 0-2.86z',
    'M13 3C9.25 3 6.2 5.94 6.02 9.64L4.1 12.2a.5.5 0 0 0 .4.8H6v3c0 1.1.9 2 2 2h1v3h7v-4.68A6.999 6.999 0 0 0 13 3zm3 7c0 .13-.01.26-.02.39l.83.66c.08.06.1.16.05.25l-.8 1.39c-.05.09-.16.12-.24.09l-.99-.4c-.21.16-.43.29-.67.39L14 13.83c-.01.1-.1.17-.2.17h-1.6c-.1 0-.18-.07-.2-.17l-.15-1.06c-.25-.1-.47-.23-.68-.39l-.99.4c-.09.03-.2 0-.25-.09l-.8-1.39a.19.19 0 0 1 .05-.25l.84-.66c-.01-.13-.02-.26-.02-.39s.02-.27.04-.39l-.85-.66c-.08-.06-.1-.16-.05-.26l.8-1.38c.05-.09.15-.12.24-.09l1 .4c.2-.15.43-.29.67-.39L12 6.17c.02-.1.1-.17.2-.17h1.6c.1 0 .18.07.2.17l.15 1.06c.24.1.46.23.67.39l1-.4c.09-.03.2 0 .24.09l.8 1.38a.2.2 0 0 1-.05.26l-.85.66c.03.12.04.25.04.39z',
  ],
  people: ['M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'],
  trendingUp: ['m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z'],
  badge: ['M20 7h-5V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 12c.83 0 1.5.67 1.5 1.5S9.83 15 9 15s-1.5-.67-1.5-1.5S8.17 12 9 12zm3 6H6v-.75c0-1 2-1.5 3-1.5s3 .5 3 1.5V18zm1-9h-2V4h2v5zm5 7.5h-4V15h4v1.5zm0-3h-4V12h4v1.5z'],
  rocket: ['M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83L11.17 17zm6.48-2.19c-2.29 2.04-5.58 3.44-5.89 3.57L13.31 22l4.05-4.05c.47-.47.68-1.15.55-1.81l-.26-1.33zM9 18c0 .83-.34 1.58-.88 2.12C6.94 21.3 2 22 2 22s.7-4.94 1.88-6.12A2.996 2.996 0 0 1 9 18zm4-9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z'],
}

function MdIcon({ name, size, className }: { name: AboutIcon; size?: number; className?: string }) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={className} height={size} width={size} xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z" />
      {ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

/** Scale module 698764 `u` (Section slice), the options this page sets. */
function Section({ margin, background, parallaxFadeOut = false, dark = false, children }: { margin: string; background: 'white' | 'black'; parallaxFadeOut?: boolean; dark?: boolean; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (!parallaxFadeOut) return
      const tl = gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'bottom 100%', end: 'bottom top', scrub: true } })
        .to(root.current, { yPercent: 20, duration: 1, ease: 'power3.in' }, 0)
        .fromTo(inner.current, { opacity: 1 }, { opacity: 0, duration: 0.75, ease: 'none' }, 0.15)
      return () => {
        tl.kill()
      }
    },
    { scope: root, dependencies: [parallaxFadeOut] },
  )
  return (
    <div ref={root} data-theme={dark ? 'dark' : undefined} className={cn('Section overflow-hidden', margin, background === 'black' ? 'text-white' : 'text-black', 'grid-layout-mobile md:grid-layout-desktop relative isolate', `bg-${background}`)} data-text-theme={background === 'black' ? 'white' : 'black'}>
      <div ref={inner} className={cn('rounded-3xl relative isolate', COLUMN)}>
        <div className="CMSSliceRenderer relative">{children}</div>
      </div>
    </div>
  )
}

export function AboutPage({ content: c }: { content: AboutContent }) {
  const pillars = useMemo<LinkCardData[]>(
    () =>
      c.whatWeDo.cards.map((card) => ({
        _type: 'linkCard',
        title: card.title,
        icon: ({ size, className }) => <MdIcon name={card.icon} size={size} className={className} />,
        description: [{ style: 'normal', text: card.description }],
      })),
    [c.whatWeDo.cards],
  )
  const stats = useMemo<CardData[]>(
    () =>
      c.glance.cards.map((card) => ({
        _type: 'card',
        label: card.label,
        icon: ({ size, className }) => <MdIcon name={card.icon} size={size} className={className} />,
        iconBgColor: { hex: '#193A29' },
        description: [{ style: 'h2', text: card.stat }, ...(card.description ? [{ style: 'normal' as const, children: [{ text: card.description, highlightGray: true }] }] : [])],
      })),
    [c.glance.cards],
  )
  const posts = useMemo<BlogPreviewPost[]>(
    () =>
      c.news.posts.map((post) => ({
        _key: post.key,
        title: post.title,
        url: post.url,
        image: post.image,
        alt: post.alt,
        category: { name: post.category },
        textColor: 'light',
        imageGradientOverlay: post.gradient,
        variantOverride: post.overlay ? 'overlay' : undefined,
        openInNewTab: post.openInNewTab,
      })),
    [c.news.posts],
  )
  return (
    <div className="relative overflow-x-hidden">
      <PageThemeSetter theme="light" />
      <div className="CMSSliceRenderer relative rootPageRenderer">
        {/* Scale module 478135, non-globe branch. */}
        <div className="pb-10! pt-24!">
          <FullBleedMediaSection headline={c.hero.headline} backdropColor={WHITE} image={{ path: c.hero.image }} startPercentage={0} sectionClassName={MEDIA} />
        </div>
        <Section margin="py-16! md:py-32! oml:py-10!" background="white">
          <HeadlineWithCta headerTag="h1" headline={c.mission.headline} subtitle={[{ style: 'normal', text: c.mission.subtitle }]} />
        </Section>
        <section className="bg-white pt-6 lg:pt-8 pb-[72px]">
          <div className="mx-auto max-w-[1216px] px-4 lg:px-6">
            <div className="overflow-hidden rounded-2xl">
              <Image src={c.headquarters.image} alt={c.headquarters.alt} width={1216} height={689} priority unoptimized sizes="(max-width: 1280px) 100vw, 1216px" className="block w-full h-auto" />
            </div>
            <p className="detail-mono text-scale-gray-60 mt-3 text-center">{c.headquarters.caption}</p>
          </div>
        </section>
        <section className="bg-white py-[72px] md:py-[120px]">
          <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
            <SectionTitle overtitle={c.trustedBy.overtitle} title={c.trustedBy.title} className="!mt-0 !mb-10" />
            <div className="">
              <LogoCloud logos={c.trustedBy.logos} />
            </div>
          </div>
        </section>
        <ScrollRevealSection backdropClassName="bg-scale-gray-90 md:bg-transparent" contentContainerColor="white">
          <div className="grid-layout-mobile md:grid-layout-desktop">
            <div className="col-span-full min-w-0 md:col-start-2 md:col-span-10" style={{ color: '#010101' }}>
              <CardGrid heading={c.whatWeDo.heading} fluidLayout={false} animationDirection="up" iconSize="md" cards={pillars} directionalEntrance={false} />
            </div>
          </div>
        </ScrollRevealSection>
        <Section margin="" background="black" parallaxFadeOut dark>
          <CardGrid heading={c.glance.heading} headerSize="lg" headerAlignment="text-left" animationDirection="down" directionalEntrance iconSize="sm" fluidLayout cards={stats} />
        </Section>
        <section className="bg-white py-8 md:py-12">
          <OfficeCarousel className="w-full" images={c.offices} />
        </section>
        <BlogPreview heading={c.news.heading} posts={posts} pageThemeOverride="light" />
        <FullBleedMediaSection headline={c.careers.headline} cta={c.careers.cta} backdropColor={WHITE} image={{ path: c.careers.image }} />
        <div className="h-8 bg-white w-full" />
      </div>
      <SectionThemeWatcher />
    </div>
  )
}
