import type { CSSProperties } from 'react'
import FullBleedMedia from '../evaluation-public-sector/FullBleedMedia'
import eps from '../evaluation-public-sector/eps.module.css'
import Resources from './Resources'
import { Capabilities, LogoCloud, StLouisBanner, UseCases, WhyScale } from './Sections'
import type { PublicSectorContent } from './content'
import s from './ps.module.css'

/**
 * scale.com/public-sector layout, driven entirely by `content` (content.ts holds the contract and Scale's own copy).
 * Order follows the page's DOM: FullBleedMediaSection hero (startPercentage 0, wrapper pb-10 pt-24, one arrow CTA) ->
 * LogoCloud (7 logos) -> Use Cases (FeatureGrid, 5 image cards with bullets) -> Capabilities (two ChecklistWithMedia
 * rows with glass CTAs) -> Why Scale (FeaturesWithIcons) -> St. Louis banner -> Resources (Keen slider, 9 slides) ->
 * FullBleedMediaSection pre-footer (startPercentage 10, wrapper mt-16 pb-8, arrow + border CTA).
 * The hero / pre-footer reuse the evaluation-public-sector FullBleedMedia (same 37xz28pjbnlx4.js module).
 * Spec: reference-snapshots/scale-clone/public-sector.md
 *
 * Theme: colours read --ps-* (body) and --eps-* (FullBleedMedia) variables; defaults are Scale's light palette.
 */
export default function PublicSectorPage({
  content,
  theme,
}: {
  content: PublicSectorContent
  theme?: Record<`--ps-${string}` | `--eps-${string}`, string>
}) {
  const { hero, logos, useCases, capabilities, whyScale, banner, resources, prefooter } = content
  return (
    <main className={`${eps.root} ${s.root} overflow-x-clip font-display`} style={theme as CSSProperties | undefined}>
      <FullBleedMedia
        image={hero.image}
        headline={hero.headline}
        body={hero.body}
        primary={hero.primary}
        startPercentage={0}
        backdrop="var(--ps-bg)"
        wrapperClassName="pb-10 pt-24"
        priority
      />
      <LogoCloud logos={logos} />
      <UseCases content={useCases} />
      <Capabilities content={capabilities} />
      <WhyScale content={whyScale} />
      <StLouisBanner content={banner} />
      <Resources content={resources} />
      <FullBleedMedia
        image={prefooter.image}
        headline={prefooter.headline}
        primary={prefooter.primary}
        secondary={prefooter.secondary}
        startPercentage={10}
        backdrop="var(--eps-prefooter-bg)"
        wrapperClassName="mt-16 pb-8"
      />
    </main>
  )
}
