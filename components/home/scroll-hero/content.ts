import { DISCOVERY_CALL_URL } from '@/lib/links'

// All copy and media for the scroll hero lives here so assets can be swapped
// without touching motion code. Paths ending in .mp4/.webm render as video.

export type HeroStage = {
  category?: string
  title: string
  body: string
  media: string
  cta?: { label: string; href: string; external?: boolean }
}

// Rendered as: <lead> <middle> <emphasis> <tail>, matching the current H1 styling.
export const heroStatement = {
  lead: 'Accelerate',
  middle: 'your',
  emphasis: 'AI',
  tail: 'Transformation',
}

export const heroMedia = '/img/placeholders/hero-media.svg'

export const heroStages: HeroStage[] = [
  {
    title: 'Everything to not get lost in the AI transition.',
    body: 'Vahue works across the whole adoption curve, from the engineers who build with AI to the teams who learn to use it and the systems that run on your data.',
    media: '/img/placeholders/stage-1.svg',
  },
  {
    category: 'Talent',
    title: 'AI-Native engineers inside your team.',
    body: "Extend your team with Vahue's AI-Native engineers to ship 10x faster, without changing how you plan or review work.",
    media: '/img/placeholders/stage-2.svg',
    cta: { label: 'Book a discovery call', href: DISCOVERY_CALL_URL, external: true },
  },
  {
    category: 'Training',
    title: 'Teams that use AI mindfully.',
    body: 'Supercharge your team with domain-specific workshops on the tools they already open every day.',
    media: '/img/placeholders/stage-3.svg',
    cta: { label: 'See team training', href: '/team-training' },
  },
  {
    category: 'Systems',
    title: 'Agents that learn your enterprise.',
    body: 'Deploy reliable agents that learn your unique enterprise data, tools, and skills, with humans kept in the loop.',
    media: '/img/placeholders/stage-4.svg',
    cta: { label: 'Explore enterprise AI', href: '/enterprise-ai' },
  },
]

export const quote = {
  // First token is the headline number; the rest animates word by word.
  text: "10x faster shipping for product teams that extend with Vahue's AI-Native engineers.",
  media: '/img/placeholders/quote-video.svg',
}
