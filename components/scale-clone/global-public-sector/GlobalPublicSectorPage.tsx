import type { ReactNode } from 'react'
import FullBleedMedia from '@/components/scale-clone/evaluation-model-developers/FullBleedMedia'
import CardGrid from './CardGrid'
import SolutionsPortfolio from './SolutionsPortfolio'
import Testimonials from './Testimonials'
import UseCaseTabs from './UseCaseTabs'
import VideoGallery from './VideoGallery'
import { CONTAINER, Foundations, SectionHeader, Trusted } from './StaticSections'
import { globalPublicSectorContent, type GlobalPublicSectorContent } from './content'
import s from './gps.module.css'

/*
 * scale.com/global-public-sector, section for section (spec: reference-snapshots/scale-clone/global-public-sector.md):
 * hero FullBleedMediaSection (pageHero 478135, startPercentage 0) -> Trusted AI (SectionHeader left + FeatureList) ->
 * Foundations (3 app screenshots) -> How Scale Delivers Value (SectionHeader + CardGrid, 6 cards) ->
 * ClientTestimonials (1) -> stats CardGrid (fluid, 3) -> Solutions Portfolio (AISolutionsGrid) -> VideoGallery (Wistia) ->
 * Use cases (UseCaseTabs, 2) -> pre-footer FullBleedMediaSection (540431, startPercentage 10).
 * `content` drives every section; leave a slice out to drop that section. `media` replaces the hero / pre-footer image.
 * Theme colours are CSS variables on the root (gps.module.css .root).
 */
export default function GlobalPublicSectorPage({
  content = globalPublicSectorContent,
  media,
}: {
  content?: GlobalPublicSectorContent
  media?: { hero?: ReactNode; prefooter?: ReactNode }
}) {
  return (
    <main className={`${s.root} overflow-x-clip bg-white font-display text-[16px] leading-6 text-black`}>
      {content.hero ? <FullBleedMedia content={content.hero} startPercentage={0} wrapperClassName="pb-10 pt-24" media={media?.hero} priority /> : null}
      {content.trusted ? <Trusted content={content.trusted} /> : null}
      {content.foundations ? <Foundations content={content.foundations} /> : null}
      {content.value ? (
        <section className="py-20">
          <div className={CONTAINER}>
            <SectionHeader content={content.value.header} className="!mb-0 !max-w-[730px]" />
            <CardGrid variant="value" cards={content.value.cards} />
          </div>
        </section>
      ) : null}
      {content.testimonials ? (
        <div className="global-public-sector-testimonial">
          <Testimonials content={content.testimonials} />
        </div>
      ) : null}
      {content.stats ? (
        <div className={`${s.gridMobile} bg-white py-12 md:py-20`}>
          <div className="col-span-full md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3">
            <CardGrid variant="stats" cards={content.stats} />
          </div>
        </div>
      ) : null}
      {content.portfolio ? <SolutionsPortfolio content={content.portfolio} /> : null}
      {content.video ? <VideoGallery video={content.video} /> : null}
      {content.useCases ? <UseCaseTabs content={content.useCases} /> : null}
      {content.prefooter ? (
        <FullBleedMedia content={content.prefooter} startPercentage={10} wrapperClassName="pb-8 pt-16" media={media?.prefooter} />
      ) : null}
    </main>
  )
}
