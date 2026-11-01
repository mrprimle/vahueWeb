import type { CSSProperties } from 'react'
import FullBleedMedia from './FullBleedMedia'
import { LogoStrip, Methodology, Techniques, WhyScale, WhyTest } from './Sections'
import type { EvaluationPublicSectorContent } from './content'
import s from './eps.module.css'

/**
 * scale.com/evaluation/public-sector layout, driven entirely by `content` (content.ts holds the contract and Scale's
 * own copy). Order follows the page's DOM: FullBleedMediaSection hero (startPercentage 0, wrapper pb-10 pt-24) ->
 * LogoStrip -> "Test Diverse SI Techniques" (two image cards) -> "Why Test & Evaluate SI" (FeaturesWithIcons) ->
 * "Test & Evaluation Methodology" (ChecklistWithMedia + BrowserMockup + legacy Read more button) -> "Why Scale"
 * (six icon cards) -> FullBleedMediaSection pre-footer (startPercentage 10, wrapper mt-16 pb-8).
 * Spec: reference-snapshots/scale-clone/evaluation-public-sector.md
 *
 * Theme: colours read --eps-* variables (defaults = Scale light, on .root in eps.module.css); pass `theme` to override.
 */
export default function EvaluationPublicSectorPage({
  content,
  theme,
}: {
  content: EvaluationPublicSectorContent
  theme?: Record<`--eps-${string}`, string>
}) {
  const { hero, logos, techniques, why, methodology, whyScale, prefooter } = content
  return (
    <main className={`${s.root} overflow-x-clip font-display`} style={theme as CSSProperties | undefined}>
      <FullBleedMedia
        image={hero.image}
        headline={hero.headline}
        body={hero.body}
        primary={hero.primary}
        secondary={hero.secondary}
        startPercentage={0}
        backdrop="var(--eps-bg)"
        wrapperClassName="pb-10 pt-24"
        priority
      />
      <LogoStrip content={logos} />
      <Techniques content={techniques} />
      <WhyTest content={why} />
      <Methodology content={methodology} />
      <WhyScale content={whyScale} />
      <FullBleedMedia
        image={prefooter.image}
        headline={prefooter.headline}
        primary={prefooter.primary}
        startPercentage={10}
        backdrop="var(--eps-prefooter-bg)"
        wrapperClassName="mt-16 pb-8"
      />
    </main>
  )
}
