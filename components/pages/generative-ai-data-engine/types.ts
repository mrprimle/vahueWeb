// Shape shared by content.scale.ts (Scale's strings) and content.ts (rendered copy).
import type { Testimonial } from '@/components/site/shared/ClientTestimonials'
import type { CloudLogo } from '@/components/site/shared/LogoCloud'
import type { ResourceItem } from '@/components/site/shared/ResourcesCarousel'

export type Cta = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor: string }
export type SizedImage = { src: string; alt: string; width: number; height: number }
export type FeatureIcon = 'gauge' | 'hub' | 'trend' | 'bolt' | 'microscope' | 'handshake'
export type Video = { src: string; title: string; cover: string; description: string }

export type GenAiContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: Cta; image: { path: string }; backdrop: Backdrop }
  logos: { copy: string; link: { title: string; href: string }; items: CloudLogo[] }
  overview: { overtitle: string; title: string; subtitle: string; image: SizedImage }
  testimonials: {
    heading: string
    items: Testimonial[]
    backdrop: Backdrop
    colorTheme: { tailwindClass: string; hex: string; contrastColor: string }
  }
  product: { body: string; image: SizedImage }
  build: { overtitle: string; title: string; subtitle: string; image: SizedImage }
  features: { overtitle: string; title: string; subtitle: string; items: { icon: FeatureIcon; title: string; subtitle: string }[] }
  demos: { overtitle: string; title: string; videos: Video[] }
  resources: { overtitle: string; title: string; subtitle: string; items: ResourceItem[] }
  prefooter: { headline: string; cta: Cta; image: { path: string }; backdrop: Backdrop }
}
