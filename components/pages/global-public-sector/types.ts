import type { RichBlock } from '@/components/site/shared/RichText'
import type { Video } from '@/components/pages/generative-ai-data-engine/types'
import type { GpsIcon } from './icons'

export type CtaLink = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor: string }

export type UseCase = {
  tab: string
  title: string
  subtitle: string
  challenge: string
  stats: { value: string; label: string }[]
  outcomes: { text: string }[]
  image: { src: string; alt: string }
}

export type SolutionCategory = { name: string; color: string; href?: string; solutions: string[] }

export type GlobalPublicSectorContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: CtaLink; backdrop: Backdrop; image: { path: string } }
  trusted: {
    overtitle: string
    title: string
    subtitle: string
    row: { title: string; description: string; image: { src: string; alt: string; width: number; height: number } }
  }
  foundations: {
    overtitle: string
    title: string
    subtitle: string
    columns: { title: string; description: string; image: { src: string; alt: string } }[]
  }
  delivers: { overtitle: string; title: string; cards: { key: string; icon: GpsIcon; title: string; description: string }[] }
  testimonial: { heading: string; clientName: string; title: string; quote: string }
  stats: { key: string; icon: GpsIcon; label: string; description: RichBlock[] }[]
  solutions: {
    title: string
    ariaLabel: string
    categoryHeader: string
    solutionsHeader: string
    comingSoon: string
    showLess: string
    seeAll: string
    categories: SolutionCategory[]
  }
  video: Video
  useCases: { overtitle: string; challengeLabel: string; outcomesLabel: string; cases: UseCase[] }
  prefooter: { headline: string; cta: CtaLink; backdrop: Backdrop; image: { path: string } }
}
