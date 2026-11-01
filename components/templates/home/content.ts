import type { ReactNode } from 'react'

/*
 * Content contract of the scale.com homepage layout (spec: reference-snapshots/scale-clone/home.md). Every section reads
 * its slice from `HomeContent`; every picture or video slot reads from `HomeMedia` (nothing from Scale ships here).
 * Slot counts on scale.com: 3 pull-apart items (6 logos on the second), 12 orbit items, 11 carousel cards, 3 link cards,
 * 8 blog tiles. The layout works with fewer.
 */

export type HomeCta = { text: string; href: string }

export type PullApartItem = {
  /** mono overtitle with the triangle marker; item 0 has none on Scale */
  category?: string
  title: string
  body: string
  cta?: HomeCta
  logos?: { name: string; src: string }[]
}

export type OrbitItem = {
  /** word after "Real" in the dynamic heading (several items may share one) */
  type: string
  /** heading word colour */
  color: string
  /** direction the word leaves in: left (default) or right */
  direction?: 'left' | 'right'
  href: string
  /** tile picture */
  image: ReactNode
}

export type CarouselCard = {
  heading: string
  subtitle: string
  href?: string
  /** 40px tile top left */
  mark: ReactNode
}

export type LinkCardItem = {
  title: string
  body: string
  cta: HomeCta
  /** hover fill + heading tint */
  hoveredColor: string
  iconColor: string
  /** 32px glyph */
  icon: ReactNode
}

export type BlogTile = {
  title: string
  href: string
  /** chip; Scale's first two tiles have none */
  category?: string
  /** omitted on the title-only tile */
  image?: string
  imageAlt?: string
  /** chip and title colour over the picture; Scale measures the picture when unset */
  textColor?: 'light' | 'dark'
  gradient?: boolean
}

export type HomeContent = {
  hero: { headline: string; scrollHint: string; items: PullApartItem[] }
  quote: { text: string }
  applications: {
    headline: string
    realWord: string
    cta: HomeCta
    items: OrbitItem[]
    carousel: { heading: string; cards: CarouselCard[] }
  }
  benchmark: { heading: string; cards: LinkCardItem[] }
  blog: { heading: string; posts: BlogTile[] }
  prefooter: { headline: string; description: string; cta: HomeCta; color: string; contrast: 'black' | 'white' }
}

export type HeroFrameSource = {
  /**
   * The hero scene samples one "packed" frame, laid out like Scale's Packed.mp4: picture in the bottom-left 80% (u, v
   * in 0..0.8), id map for the outline pass in the top-left 20% (red channel, thresholded at .5), pixel (1,1) = left/right
   * phone offset (r - g). Give a video in that layout or a canvas drawer.
   */
  video?: string
  draw?: (ctx: CanvasRenderingContext2D, width: number, height: number, seconds: number) => void
  width?: number
  height?: number
}

export type HomeMedia = {
  hero?: HeroFrameSource
  /** left panel of the scrolling quote (362px wide on desktop) */
  quote?: ReactNode
  /** line art on the pre-footer colour, multiplied (Scale: a looping video, mix-blend-multiply) */
  prefooter?: ReactNode
}
