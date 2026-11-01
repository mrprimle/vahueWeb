// Shape shared by content.scale.ts (Scale's strings) and content.ts (rendered copy).
import type { ChecklistFeature, ChecklistImage } from '@/components/site/shared/ChecklistWithMedia'
import type { Testimonial } from '@/components/site/shared/ClientTestimonials'
import type { CloudLogo } from '@/components/site/shared/LogoCloud'
import type { ResourceItem } from '@/components/site/shared/ResourcesCarousel'
import type { Video } from '@/components/pages/generative-ai-data-engine/types'

export type Cta = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor: string }
export type FeatureIcon = 'monitor' | 'sparkle' | 'trend'

export type PublicSectorContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: Cta; image: { path: string }; backdrop: Backdrop }
  logos: { copy: string; link: { title: string; href: string }; items: CloudLogo[] }
  overview: { overtitle: string; title: string; subtitle: string; items: { icon: FeatureIcon; title: string; subtitle: string }[] }
  why: { overtitle: string; title: string; subtitle: string; items: ChecklistFeature[]; image: ChecklistImage }
  testimonials: { heading: string; items: Testimonial[]; backdrop: Backdrop }
  demos: { overtitle: string; title: string; videos: Video[] }
  resources: { overtitle: string; title: string; items: ResourceItem[] }
  prefooter: { headline: string; cta: Cta; image: { path: string }; backdrop: Backdrop }
}
