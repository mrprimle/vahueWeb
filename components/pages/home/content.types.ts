import type { BlogPreviewPost } from '@/components/site/shared/BlogPreview'
import type { CarouselCard } from '@/components/site/shared/FullWidthCardCarousel'
import type { RichBlock } from '@/components/site/shared/RichText'

export type HomeColor = { hex: string; contrastColor: string; tailwindClass: string }

export type HeroLogo = {
  _id: string
  alt: string
  /** Mask image. Absent on the filled page: a neutral tile sits at the same box instead. */
  path?: string
  /** Rendered box, Scale's image fitted into 68 by 30. */
  width: number
  height: number
}

export type PullApartItem = {
  _key: string
  category?: string
  title: RichBlock[]
  body: RichBlock[]
  cta?: { text: string; url: string }
  logos?: HeroLogo[]
}

export type ApplicationItem = {
  _key: string
  applicationType: string
  image: { path: string; alt: string }
  link?: { url: string }
  textColor: HomeColor
  animationDirection?: 'right'
}

export type HomeLinkCard = {
  _key: string
  title: string
  description: RichBlock[]
  icon: 'trendingUp' | 'leaderboard' | 'joinLeft'
  iconColor: { hex: string }
  iconBgColor: { hex: string }
  hoveredColor: { tailwindClass: string; hex: string }
  link: { url: string; text: string }
}

export type HomeContent = {
  hero: {
    headline: string
    scrollHint: string
    video: string
    textures: { perlin: string; numbers: string; fallback: string }
    items: PullApartItem[]
  }
  quote: { quote: RichBlock[]; video: { url: string } }
  applications: {
    headline: string
    realWord: string
    cta: { text: string; url: string; variant: 'fill' }
    items: ApplicationItem[]
    carousel: { header: RichBlock[]; cards: CarouselCard[] }
  }
  benchmark: { heading: string; cards: HomeLinkCard[] }
  blog: { heading: RichBlock[]; posts: BlogPreviewPost[] }
  videoCta: {
    backgroundColor: HomeColor
    headline: string
    description: string
    cta: { text: string; url: string; variant: 'arrow' }
    video: { url: string }
  }
}
