import type { ReactNode } from 'react'
import FullBleedMedia from './FullBleedMedia'
import CardGrid from './CardGrid'
import DomainExpertise from './DomainExpertise'
import Testimonials from './Testimonials'
import BlogPreview from './BlogPreview'
import { expertsContent, type ExpertsContent } from './content'
import s from './experts.module.css'

/*
 * scale.com/experts, section for section (spec: reference-snapshots/scale-clone/experts.md):
 * hero FullBleedMediaSection (compact, video) -> CardGridSection -> DomainExpertise (tabs + WebGL logo sphere)
 * -> ClientTestimonials -> BlogPreview "Resources" -> pre-footer FullBleedMediaSection.
 * `content` drives every section; leave a slice out to drop that section. `media` replaces the hero / pre-footer
 * media (a Vahue page passes its own visuals).
 */
export default function ExpertsPage({
  content = expertsContent,
  media,
}: {
  content?: ExpertsContent
  media?: { hero?: ReactNode; prefooter?: ReactNode }
}) {
  return (
    <main className={`${s.root} overflow-x-clip bg-white font-display text-black`}>
      {content.hero ? <FullBleedMedia content={content.hero} startPercentage={0} wrapperClassName="pb-10 pt-12 md:pt-24" media={media?.hero} priority /> : null}
      {content.cardGrid ? <CardGrid content={content.cardGrid} /> : null}
      {content.domains ? <DomainExpertise content={content.domains} /> : null}
      {content.testimonials ? <Testimonials content={content.testimonials} /> : null}
      {content.resources ? <BlogPreview content={content.resources} /> : null}
      {content.prefooter ? <FullBleedMedia content={content.prefooter} startPercentage={10} wrapperClassName="pb-8" media={media?.prefooter} /> : null}
    </main>
  )
}
