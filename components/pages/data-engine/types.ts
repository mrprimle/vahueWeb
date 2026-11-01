// Shape shared by content.scale.ts (Scale's strings) and content.ts (rendered copy).
import type { Testimonial } from '@/components/site/shared/ClientTestimonials'

export type Cta = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor: string }
export type SizedImage = { src: string; alt: string; width: number; height: number }

/** `src` draws the image; without it a neutral "Logo" tile fills the same box. */
export type LogoItem = { key: string; alt: string; width: number; height: number; src?: string; className?: string }

export type DataEngineContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: Cta; image: { path: string }; backdrop: Backdrop }
  logos: LogoItem[]
  best: {
    title: string
    body: string
    image: SizedImage
    cards: { title: string; body: string; iconClass: string }[]
  }
  caseStudy: {
    overtitle: string
    description: string
    cta: Cta
    tileClass: string
    logo: LogoItem
  }
  buildAi: {
    overtitle: string
    title: string
    subtitle: string
    showcaseTitle: string
    showcaseSubtitle: string
    body: string
    primaryCta: Cta
    secondaryCta: Cta
    chat: {
      windowTitle: string
      question: string
      rankingTitle: string
      /** Top, middle (the one that moves up), bottom. */
      ranking: [string, string, string]
      answer: string
      userAvatar: string
      agentAvatar: string
    }
  }
  whatIs: {
    overtitle: string
    title: string
    subtitle: string
    image: SizedImage
    label: string
    items: { title: string; body: string }[]
  }
  types: {
    overtitle: string
    title: string
    cards: { title: string; icon: 'text' | 'image' | 'video' | 'cube'; items: string[] }[]
  }
  resources: {
    overtitle: string
    title: string
    items: { id: string; overtitle: string; title: string; image: { src: string; alt?: string }; description: string; link: string }[]
  }
  testimonials: { heading: string; items: Testimonial[]; backdrop: Backdrop }
  prefooter: { headline: string; cta: Cta; secondaryCta: Cta; image: { path: string }; backdrop: Backdrop }
}
