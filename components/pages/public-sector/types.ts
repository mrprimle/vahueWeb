import type { ChecklistImage } from '@/components/site/shared/ChecklistWithMedia'
import type { FeatureItem } from '@/components/site/shared/Features'
import type { CloudLogo } from '@/components/site/shared/LogoCloud'
import type { ResourceItem } from '@/components/site/shared/ResourcesCarousel'

export type CtaLink = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor: string }
export type WhyIcon = 'native' | 'proven' | 'people'
export type ButtonLink = { text: string; href: string }
export type Capability = { title: string; features: { title: string; description: string }[]; image: ChecklistImage; cta: ButtonLink }

export type PublicSectorContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: CtaLink; backdrop: Backdrop; image: { path: string } }
  logos: { items: CloudLogo[] }
  useCases: { overtitle: string; title: string; subtitle: string; features: FeatureItem[] }
  capabilities: { overtitle: string; title: string; subtitle: string; items: Capability[] }
  why: { overtitle: string; title: string; subtitle: string; items: { icon: WhyIcon; title: string; subtitle: string }[] }
  callout: { title: string; body: string; cta: ButtonLink; image: { src: string; alt: string; width: number; height: number } }
  resources: { overtitle: string; title: string; items: ResourceItem[] }
  prefooter: { headline: string; cta: CtaLink; secondaryCta: CtaLink; backdrop: Backdrop; image: { path: string } }
}
