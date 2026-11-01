import type { CSSProperties, ReactNode } from 'react'
import BlogCarousel from '@/components/scale-clone/enterprise/BlogCarousel'
import SectionTheme from './SectionTheme'
import Challenges from './Challenges'
import Flywheel from './Flywheel'
import Hero from './Hero'
import HowToBuy from './HowToBuy'
import MissionTitle from './MissionTitle'
import Prefooter from './Prefooter'
import Resources from './Resources'
import StatsPanel from './StatsPanel'
import TrustCards from './TrustCards'
import { nationalSecurityContent, type NationalSecurityContent } from './content'
import s from './ns.module.css'

/*
 * scale.com/public-sector/national-security, slice for slice (RSC payload 2026-11-01; spec:
 * reference-snapshots/scale-clone/public-sector-national-security.md):
 *   NatSecHero (831675) -> SgpIntro "Challenges" (154479, headingPinned, static images, pinned 3.75 vh) ->
 *   NatSecStatsPanel (298718) -> Section foundry-tan > CardGrid (4 cards) -> Section white > HeadlineWithCta ->
 *   SgpFlywheel (154479, stepsOnly, static images) -> BlogPreview3D "Real Customers" (62032, the enterprise clone's
 *   Embla carousel) -> NatSecHowToBuy (109486) -> BlogPreview "Resources" (808358) -> FullBleedMediaSection pre-footer.
 * `content` drives every section (leave a slice out to drop it); `media.prefooter` replaces the pre-footer photo.
 * Colours are CSS variables on the root (ns.module.css .root: --ns-*), overridable through `theme`.
 * The hero and the Challenges section call setSectionTheme(dark): the shared header turns dark over them (SectionTheme).
 */
export default function NationalSecurityPage({
  content = nationalSecurityContent,
  media,
  theme,
}: {
  content?: NationalSecurityContent
  media?: { prefooter?: ReactNode }
  theme?: Record<`--ns-${string}`, string>
}) {
  return (
    <main className={`${s.root} overflow-x-clip font-display text-[16px] leading-6`} style={theme as CSSProperties | undefined}>
      <div className="CMSSliceRenderer rootPageRenderer relative">
        {content.hero ? <Hero content={content.hero} /> : null}
        {content.challenges ? <Challenges content={content.challenges} /> : null}
        {content.stats ? <StatsPanel content={content.stats} /> : null}
        {content.trust ? <TrustCards content={content.trust} /> : null}
        {content.missionTitle ? <MissionTitle content={content.missionTitle} /> : null}
        {content.flywheel ? <Flywheel content={content.flywheel} /> : null}
        {content.customers ? <BlogCarousel content={content.customers} /> : null}
        {content.howToBuy ? <HowToBuy content={content.howToBuy} /> : null}
        {content.resources ? <Resources content={content.resources} /> : null}
        {content.prefooter ? <Prefooter content={content.prefooter} media={media?.prefooter} /> : null}
      </div>
      <SectionTheme />
    </main>
  )
}
