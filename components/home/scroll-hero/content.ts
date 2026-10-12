import { DISCOVERY_CALL_URL } from '@/lib/links'

// Copy and media for the homepage scroll hero. Swap assets here; motion code
// lives in ScrollHero / PullApart / heroScene.

export type HeroStage = {
  category?: string
  title: string
  body: string
  cta?: { label: string; href: string; external?: boolean }
  logos?: { name: string; src: string }[]
}

export const heroHeading = 'Accelerate your AI Transformation'

/**
 * Packed hero video (1920x1080 MP4). See public/videos/README.md:
 * colour shot in the bottom-left 80%, black/white mask of the same shot in the
 * top-left 20% tile, red marker pixel top-right.
 */
export const heroVideo = '/videos/hero-packed-placeholder.mp4'

// Exactly three stages: they map to the scene's three scroll states.
export const heroStages: [HeroStage, HeroStage, HeroStage] = [
  {
    title: 'Everything to not get lost in the AI transition.',
    body: 'Vahue works across the whole adoption curve: AI-Native engineers who build with you, training that teaches your team to use AI mindfully, and systems that run on your own data.',
  },
  {
    category: 'Talent',
    title: 'AI-Native engineers inside your team.',
    body: "Extend your team with Vahue's AI-Native engineers to ship 10x faster, without changing how you plan or review work.",
    cta: { label: 'Book a discovery call', href: DISCOVERY_CALL_URL, external: true },
    logos: [
      { name: 'Shopify', src: '/img/shopify.svg' },
      { name: 'Qonto', src: '/img/qontoLogo.svg' },
      { name: 'Leafworks', src: '/img/leafworks.svg' },
      { name: 'Tracesafe', src: '/img/tracesafe.svg' },
      { name: 'Carmen', src: '/img/carmen.svg' },
      { name: 'BringLiesel', src: '/img/bringliesel.svg' },
    ],
  },
  {
    category: 'Systems',
    title: 'Agents that learn your enterprise.',
    body: 'Deploy reliable agents that learn your unique enterprise data, tools, and skills, with humans kept in the loop.',
    cta: { label: 'Explore enterprise AI', href: '/enterprise-ai' },
  },
]

export const quote = {
  text: "10x faster shipping for product teams that extend with Vahue's AI-Native engineers.",
  video: '/videos/quote-placeholder.mp4',
}
