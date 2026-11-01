import type { ReactNode } from 'react'
import FullBleedMedia from './FullBleedMedia'
import Testimonials from './Testimonials'
import { CardSection, Resources } from './Sections'
import { evalModelDevContent, type EvalModelDevContent } from './content'
import s from './styles.module.css'

/*
 * scale.com/evaluation/model-developers, section for section (spec: reference-snapshots/scale-clone/evaluation-model-developers.md):
 * hero FullBleedMediaSection (compact) -> Evaluation Challenges (3 LinkCards) -> Why Scale (5) -> Risks (6)
 * -> Experts (taxonomy figure + 5) -> ClientTestimonials (2) -> Resources (4 links) -> pre-footer FullBleedMediaSection.
 * `content` drives every section; leave a slice out to drop that section. `media` replaces the hero / pre-footer image.
 * Theme colours are CSS variables on the root (styles.module.css .root).
 */
export default function EvalModelDevPage({
  content = evalModelDevContent,
  media,
}: {
  content?: EvalModelDevContent
  media?: { hero?: ReactNode; prefooter?: ReactNode }
}) {
  return (
    <main className={`${s.root} overflow-x-clip bg-white font-display text-[16px] leading-6 text-[#111111]`}>
      {content.hero ? <FullBleedMedia content={content.hero} startPercentage={0} wrapperClassName="pb-10 pt-24" media={media?.hero} priority /> : null}
      {content.challenges ? <CardSection content={content.challenges} /> : null}
      {content.whyScale ? <CardSection content={content.whyScale} /> : null}
      {content.risks ? <CardSection content={content.risks} /> : null}
      {content.experts ? <CardSection content={content.experts} /> : null}
      {content.testimonials ? (
        <div className="pb-10 pt-8 md:pt-10">
          <Testimonials content={content.testimonials} />
        </div>
      ) : null}
      {content.resources ? <Resources content={content.resources} /> : null}
      {content.prefooter ? (
        <FullBleedMedia content={content.prefooter} startPercentage={10} wrapperClassName="mt-16 pb-8" backdropClassName="bg-[#f9fafb]" media={media?.prefooter} />
      ) : null}
    </main>
  )
}
