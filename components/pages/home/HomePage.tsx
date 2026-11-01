'use client'

// https://scale.com/ : slices in Scale's order (RSC payload, 2026-11-01).
import { BlogPreview } from '@/components/site/shared/BlogPreview'
import { CardGrid, type LinkCardData } from '@/components/site/shared/CardGrid'
import { ScrollRevealSection } from '@/components/site/shared/ScrollRevealSection'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { Applications } from './Applications'
import type { HomeContent, HomeLinkCard } from './content.types'
import { HomeHero } from './HomeHero'
import { ScrollingQuote } from './ScrollingQuote'
import { VideoCta } from './VideoCta'

// react-icons/md paths, read from Scale's rendered cards.
const ICONS: Record<HomeLinkCard['icon'], React.ReactNode> = {
  trendingUp: <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />,
  leaderboard: <path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z" />,
  joinLeft: (
    <>
      <ellipse cx="12" cy="12" rx="3" ry="5.74" />
      <path d="M7.5 12c0-.97.23-4.16 3.03-6.5C9.75 5.19 8.9 5 8 5c-3.86 0-7 3.14-7 7s3.14 7 7 7c.9 0 1.75-.19 2.53-.5-2.8-2.34-3.03-5.53-3.03-6.5zM16 5c-.9 0-1.75.19-2.53.5.61.51 1.1 1.07 1.49 1.63.33-.08.68-.13 1.04-.13 2.76 0 5 2.24 5 5s-2.24 5-5 5c-.36 0-.71-.05-1.04-.13-.39.56-.88 1.12-1.49 1.63.78.31 1.63.5 2.53.5 3.86 0 7-3.14 7-7s-3.14-7-7-7z" />
    </>
  ),
}

function mdIcon(name: HomeLinkCard['icon']) {
  return function MdIcon({ size, className }: { size?: number; className?: string }) {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height={size} width={size} xmlns="http://www.w3.org/2000/svg" className={className}>
        <path fill="none" d="M0 0h24v24H0z" />
        {ICONS[name]}
      </svg>
    )
  }
}

export function HomePage({ content }: { content: HomeContent }) {
  const cards: LinkCardData[] = content.benchmark.cards.map((c) => ({
    _type: 'linkCard',
    _key: c._key,
    title: c.title,
    description: c.description,
    icon: mdIcon(c.icon),
    iconColor: c.iconColor,
    iconBgColor: c.iconBgColor,
    hoveredColor: c.hoveredColor,
    link: c.link,
  }))
  return (
    <div className="relative overflow-x-hidden">
      <PageThemeSetter theme="light" />
      <div className="CMSSliceRenderer relative rootPageRenderer">
        <HomeHero content={content.hero} />
        <ScrollingQuote content={content.quote} />
        <Applications content={content.applications} />
        <ScrollRevealSection backdropClassName="bg-scale-gray-90 md:bg-transparent" contentContainerColor="white">
          <div className="grid-layout-mobile md:grid-layout-desktop">
            <div className="col-span-full min-w-0 md:col-start-2 md:col-span-10" style={{ color: '#010101' }}>
              <CardGrid heading={content.benchmark.heading} fluidLayout={false} animationDirection="up" iconSize="md" cards={cards} directionalEntrance={false} />
            </div>
          </div>
        </ScrollRevealSection>
        <BlogPreview heading={content.blog.heading} pageThemeOverride="light" posts={content.blog.posts} />
        <VideoCta content={content.videoCta} />
        <SectionThemeWatcher />
      </div>
    </div>
  )
}
