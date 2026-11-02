import type { RichBlock } from '@/components/site/shared/RichText'

export type EnterpriseCta = { url: string; text: string }
/** `src` is a logo file on the clone. Filled pages leave it out and get the neutral tile. */
export type EnterpriseLogo = {
  alt: string
  src?: string
  /** A full-colour badge, drawn as it is instead of as a one-colour mask. */
  plain?: boolean
}
export type CardIconKey = 'time' | 'revenue' | 'accuracy' | 'adoption' | 'speed'
export type PillarIconKey = 'experts' | 'technology' | 'research'
export type BlogCategory = { name: string; color?: { hex: string } | null }

export type EnterpriseContent = {
  meta: { title: string; description: string }
  hero: {
    headline: string
    subtitle: RichBlock[]
    cta: EnterpriseCta
    scrollLabel: string
    /** Node slots 0 to 6, in Scale's order. */
    images: { path: string; label: string; color?: string }[]
  }
  pullApart: {
    logoTexture: string
    video: string
    textItems: { headline: RichBlock[]; subheading: RichBlock[] }[]
  }
  bridge: {
    headline: string
    subtitle: RichBlock[]
    trustedBy: string
    logos: EnterpriseLogo[]
    video: { webm: string; mov: string; poster: string; name: string }
  }
  blog: {
    heading: string
    posts: { title: string; url: string; image: string; category: BlogCategory }[]
  }
  logoCloud: { headline: string; logos: EnterpriseLogo[] }
  results: {
    heading: string
    cards: { label: string; stat: string; description: string; icon: CardIconKey }[]
  }
  testimonials: {
    heading: string
    items: { clientName: string; title: string; testimonial: string; logo: EnterpriseLogo }[]
  }
  race: {
    heading: RichBlock[]
    left: RichBlock[]
    right: RichBlock[]
    cta: EnterpriseCta
    video: string
  }
  pillars: {
    heading: RichBlock[]
    video: string
    cards: { headline: string; subtitle: string; icon: PillarIconKey; color: string }[]
  }
  poweredBy: {
    headline: string
    subtitle: RichBlock[]
    cta: EnterpriseCta
    image: { path: string; alt: string }
    cards: { headline: string; subtitle: string; icon: string }[]
  }
  trusted: {
    headline: string
    image: string
    overlay: RichBlock[]
    trustedBy: string
    logos: EnterpriseLogo[]
    cards: { title: string; description: string; icon: string; hover: { tailwindClass: string; hex: string }; link?: EnterpriseCta }[]
  }
  closing: { headline: string; cta: EnterpriseCta; image: string }
}
