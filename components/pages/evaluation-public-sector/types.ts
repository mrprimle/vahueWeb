import type { ChecklistImage } from '@/components/site/shared/ChecklistWithMedia'
import type { CloudLogo } from '@/components/site/shared/LogoCloud'

export type CtaLink = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor: string }
export type WhyIcon = 'certainty' | 'ongoing' | 'vulnerabilities'
export type CardIcon = 'sets' | 'targeted' | 'rater' | 'product' | 'reporting' | 'redteam'

export type EvaluationPublicSectorContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: CtaLink; secondaryCta: CtaLink; backdrop: Backdrop; image: { path: string } }
  logos: { copy: string; link: { title: string; href: string }; items: CloudLogo[] }
  techniques: { overtitle: string; title: string; subtitle: string; items: { title: string; description: string; image: string }[] }
  why: { overtitle: string; title: string; subtitle: string; items: { icon: WhyIcon; title: string; subtitle: string }[] }
  methodology: {
    overtitle: string
    title: string
    subtitle: string
    listTitle: string
    features: { title: string; description: string }[]
    image: ChecklistImage
    cta: { text: string; href: string }
  }
  platform: { overtitle: string; title: string; subtitle: string; cards: { icon: CardIcon; title: string; description: string }[] }
  prefooter: { headline: string; cta: CtaLink; backdrop: Backdrop; image: { path: string } }
}
