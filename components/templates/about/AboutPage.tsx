import type { CSSProperties } from 'react'
import BlogPreview from './BlogPreview'
import FullBleedMedia from './FullBleedMedia'
import SectionTheme from './SectionTheme'
import { Gallery, Headquarters, Mission, Stats, TrustedBy, WhatWeDo } from './Sections'
import type { AboutContent } from './content'
import s from './about.module.css'

/**
 * scale.com/about layout, driven entirely by `content` (see content.ts for the contract and Scale's own copy).
 * Order follows the page's RSC tree (CMS slices in a CMSSliceRenderer):
 *   pageHero (FullBleedMediaSection, startPercentage 0, wrapper pb-10 pt-24) -> Section > HeadlineWithCta (h1 mission)
 *   -> headquarters photo -> Trusted by (SectionHeader + LogoCloud) -> ScrollRevealSection > CardGrid "What we do"
 *   -> black Section > CardGrid "Scale at a glance" (parallaxFadeOut) -> VideoWithImages (Keen gallery)
 *   -> BlogPreview "Scale In The News" -> FullBleedMediaSection pre-footer -> h-8 spacer.
 * Spec: reference-snapshots/scale-clone/about.md
 *
 * Theme: colours read --abt-* variables (defaults = Scale light, set on .root in about.module.css): --abt-bg page,
 * --abt-fg text, --abt-ink CardGrid ink (#010101), --abt-fg-2 card copy (gray-10), --abt-muted captions / stat labels
 * (gray-60), --abt-line ScrollReveal backdrop on phones (gray-90), --abt-card LinkCards (gray-95), --abt-over overtitle,
 * --abt-accent stat icon tiles (evergreen), --abt-dark stats band.
 */
export default function AboutPage({ content, theme }: { content: AboutContent; theme?: Record<`--abt-${string}`, string> }) {
  const { hero, mission, headquarters, trusted, pillars, stats, gallery, news, prefooter } = content
  return (
    <main className={`${s.root} AboutPage overflow-x-hidden font-display`} style={theme as CSSProperties | undefined}>
      <div className="CMSSliceRenderer rootPageRenderer relative">
        <div className="pb-10 pt-24">
          <FullBleedMedia {...hero} startPercentage={0} animateCta={false} priority />
        </div>
        <Mission content={mission} />
        <Headquarters content={headquarters} />
        <TrustedBy content={trusted} />
        <WhatWeDo content={pillars} />
        <Stats content={stats} />
        <Gallery images={gallery} />
        <BlogPreview heading={news.heading} posts={news.posts} />
        <FullBleedMedia {...prefooter} />
        <div className="h-8 w-full bg-white" />
      </div>
      <SectionTheme />
    </main>
  )
}
