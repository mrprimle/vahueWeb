// Shape shared by content.scale.ts (Scale's strings) and content.ts (rendered copy).
import type { BlogPreviewPost } from '@/components/site/shared/BlogPreview'
import type { FaqItem } from '@/components/site/shared/Faqs'
import type { ImageAsset } from '@/components/site/shared/ResponsiveImage'
import type { RichBlock } from '@/components/site/shared/RichText'
import type { SteppedVideoStep } from '@/components/site/shared/stepped-video/SteppedVideo'
import type { TransparentVideoAsset } from '@/components/site/shared/TransparentVideo'

export type Cta = { text: string; url: string }
export type MarqueeLogoItem = { key: string; alt: string; src?: string }
export type Applicable = 'applicable' | 'partialApplicable' | 'notApplicable'
export type CapabilityCell = { id: string; applicable: Applicable; note?: RichBlock[] }

export type GenAiContent = {
  meta: { title: string; description: string }
  hero: { headline: string; subtitle: RichBlock[]; logos: MarqueeLogoItem[]; video: TransparentVideoAsset; scrollLabel: string }
  intro: { headline: string; body: RichBlock[]; steps: SteppedVideoStep[]; counterLabel: string; scrollLabel: string }
  postTraining: { anchorId: string; left: RichBlock[]; right: RichBlock[]; cta: Cta }
  stack: { headline: string; subtitle: RichBlock[]; cards: { title: string; description: RichBlock[]; colorClass: string }[]; video: TransparentVideoAsset }
  trust: { heading: string; cards: { title: string; description: RichBlock[] }[] }
  flywheel: { headline: string; body: RichBlock[]; steps: SteppedVideoStep[]; labels: { performance: string; process: string } }
  dialect: { left: RichBlock[]; right: RichBlock[]; cta: Cta; video: { url: string } }
  differentiators: {
    heading: string
    capabilitiesLabel: string
    categories: { id: string; label: string }[]
    capabilities: { label: string; categories: CapabilityCell[] }[]
  }
  security: { heading: string; labels: string[]; link: Cta; image: ImageAsset }
  testimonials: {
    heading: string
    items: { clientName: string; title: string; testimonial: string; logo?: string }[]
  }
  demo: { headline: string; subtitle: RichBlock[]; cta: Cta; images: ImageAsset[] }
  faqs: { heading: string; items: FaqItem[]; ctaText: string; ctaHref: string }
  blog: { heading: RichBlock[]; posts: BlogPreviewPost[] }
}
