// Content contract for the scale.com/public-sector-data-engine layout. A page passes its own object; there are no
// defaults, so neither Scale's copy nor its media (no longer hosted) can render.
import type { FeatureIcon } from './icons'

export type Cta = { label: string; href: string }
export type Img = { src: string; alt: string }

export type PublicSectorDataEngineContent = {
  hero: { title: string; body: string; image: string; cta: Cta }
  /** Scale: a lead line with an arrow link over five logos, each at its own rendered size. */
  logos: {
    lead: string
    link: Cta
    items: (Img & { width: number; height: number })[]
  }
  overview: {
    eyebrow: string
    title: string
    body: string
    cards: { icon: FeatureIcon; title: string; body: string }[]
  }
  why: {
    eyebrow: string
    title: string
    body: string
    items: { title: string; body: string }[]
    image: Img & { width: number; height: number }
  }
  testimonial: {
    eyebrow: string
    /** Set `plainText` when this is a case outcome rather than something a person said: no quotation marks are drawn. */
    quote: string
    plainText?: boolean
    name: string
    role: string
    /** Label on the selector tile (Scale: the client's logo). Falls back to `name`. */
    tileLabel?: string
  }
  demos: {
    eyebrow: string
    title: string
    /** `video` is an embeddable URL. Without one the slot is a still: no play control, slide selection still works. */
    items: { title: string; poster: Img; video?: string }[]
  }
  resources: {
    eyebrow: string
    title: string
    items: { tag: string; title: string; image: string; href: string }[]
  }
  prefooter: { title: string; image: string; cta: Cta }
}
