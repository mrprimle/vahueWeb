import { DISCOVERY_CALL_URL } from '@/lib/links'
import { CONTROL_FEATURES, POSITIONING } from '@/lib/automation-content'

// Copy and media for the homepage scroll hero. Swap assets here; motion code
// lives in ScrollHero / PullApart / heroScene.

export type HeroStage = {
  category?: string
  title: string
  body: string
  cta?: { label: string; href: string; external?: boolean }
  logos?: { name: string; src: string }[]
}

export const heroHeading = POSITIONING.line

/**
 * Packed hero video (1920x1080 MP4). See public/videos/README.md:
 * colour shot in the bottom-left 80%, black/white mask of the same shot in the
 * top-left 20% tile, red marker pixel top-right.
 */
export const heroVideo = '/videos/hero-packed-placeholder.mp4'

// Exactly three stages: they map to the scene's three scroll states.
export const heroStages: [HeroStage, HeroStage, HeroStage] = [
  {
    title: 'A high-volume workflow, run inside the tools you already use.',
    body: POSITIONING.promise,
    cta: { label: 'See the six workflows', href: '/automations' },
  },
  {
    category: 'Audit → Pilot → Operate',
    title: 'Two weeks to a baseline. Four to six weeks to a live pilot.',
    body: 'We map one workflow and record the baseline, pilot it on your own data at real volume, then run the agents day to day.',
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
    category: 'Measured',
    title: 'Results against the baseline, every month.',
    body: CONTROL_FEATURES.find((f) => f.title === 'Results dashboard')?.body ?? '',
    cta: { label: 'How we operate', href: '/operations' },
  },
]

export const quote = {
  text: 'Operations that keep up with growth, without new hires.',
  video: '/videos/quote-placeholder.mp4',
}
