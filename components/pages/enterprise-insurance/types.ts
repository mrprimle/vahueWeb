import type { CarouselLogo } from '@/components/site/shared/LogoCarousel'
import type { VideoFeature } from '@/components/site/shared/VideoFeatures'

export type CtaLink = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor: string }
export type InsuranceIcon = 'layers' | 'manageSearch' | 'lock' | 'assignment' | 'psychology' | 'lightbulb'
export type IconFeature = { icon: InsuranceIcon; title: string; subtitle: string; href?: string }

export type EnterpriseInsuranceContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: CtaLink; backdrop: Backdrop; image: { path: string } }
  logos: { copy: string; href: string; linkText: string; items: CarouselLogo[] }
  blindSpots: { overtitle: string; title: string; subtitle: string; items: IconFeature[] }
  solutions: { overtitle: string; title: string; subtitle: string; cta: { children: string; href: string }; items: IconFeature[] }
  strategy: { overtitle: string; title: string; subtitle: string; items: VideoFeature[] }
  prefooter: { headline: string; cta: CtaLink; backdrop: Backdrop; image: { path: string } }
}
