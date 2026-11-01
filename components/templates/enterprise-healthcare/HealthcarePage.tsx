import BlogPreview from './BlogPreview'
import FullBleedMedia from './FullBleedMedia'
import SgpStack from './SgpStack'
import TabbedPanel from './TabbedPanel'
import Testimonial from './Testimonial'
import TrustSplit from './TrustSplit'
import type { HealthcareContent } from './content'

/**
 * scale.com/enterprise/healthcare layout, driven entirely by `content` (see content.tsx for the contract and
 * Scale's own copy). Slice order and spacers follow the page's CMSSliceRenderer:
 *   pageHero (FullBleedMediaSection, startPercentage 0, wrapper pt-24 pb-10) -> TabbedPanel
 *   -> ClientTestimonials (metrics) -> SgpStack -> BlogPreview -> TextImageSplit -> SpacerSlice h-8
 *   -> FullBleedMediaSection pre-footer (startPercentage 10, headlineWidth narrow) -> SpacerSlice h-8.
 * Spec: reference-snapshots/scale-clone/enterprise-healthcare.md
 */
export default function HealthcarePage({ content, as: Root = 'main' }: { content: HealthcareContent; as?: 'main' | 'div' }) {
  const { hero, tabs, testimonial, stack, blog, trust, prefooter } = content
  return (
    <Root className="overflow-x-hidden bg-white font-display text-black">
      <div className="pb-10 pt-24">
        <FullBleedMedia
          image={hero.image}
          imageAlt={hero.imageAlt}
          imageBg={hero.imageBg}
          media={hero.media}
          priority
          startPercentage={0}
          headline={hero.headline}
          body={hero.body}
          primary={hero.primary}
          logos={hero.logos}
          as={hero.as}
        />
      </div>
      <TabbedPanel heading={tabs.heading} items={tabs.items} />
      <Testimonial {...testimonial} />
      <SgpStack heading={stack.heading} media={stack.media} cards={stack.cards} />
      <BlogPreview heading={blog.heading} category={blog.category} tiles={blog.tiles} />
      <TrustSplit headline={trust.headline} body={trust.body} badges={trust.badges} />
      <div className="h-8 w-full bg-white" />
      <FullBleedMedia
        image={prefooter.image}
        imageAlt={prefooter.imageAlt}
        imageBg={prefooter.imageBg}
        media={prefooter.media}
        startPercentage={10}
        narrow
        headline={prefooter.headline}
        primary={prefooter.primary}
      />
      <div className="h-8 w-full bg-white" />
    </Root>
  )
}
