// Scale's own strings for /partnership, read from the page's RSC payload on 2026-11-02.
import type { PartnershipContent } from './types'

export const contentScale: PartnershipContent = {
  meta: {
    title: 'Scale Partners | Scale AI',
    description: 'Scale enables enterprises to accelerate AI development with high-quality data, rigorous model evaluation, and secure solutions designed to deliver reliable outcomes at scale.',
  },
  hero: {
    title: 'Scale Partners',
    body: 'Scale enables enterprises to accelerate AI development with high-quality data, rigorous model evaluation, and secure solutions designed to deliver reliable outcomes at scale.',
  },
  cards: [
    {
      key: 'page-partnership-google-cloud',
      url: '/partnership/google-cloud',
      color: '#839CB2',
      logo: { path: '/partnership/google-cloud.png', alt: '' },
      title: 'Google Cloud',
      body: 'Scale Generative AI Portfolio optimized for Google Cloud Platform',
      cta: 'Learn more',
    },
    {
      key: 'page-partnership-nvidia',
      url: '/partnership/nvidia',
      color: '#A8927C',
      logo: { path: '/partnership/nvidia.svg', alt: 'NVIDIA', invert: true },
      title: 'NVIDIA x Scale',
      body: 'Accelerating open-weight model adoption and performance with Scale GenAI Portfolio.',
      cta: 'Learn more',
    },
  ],
}
