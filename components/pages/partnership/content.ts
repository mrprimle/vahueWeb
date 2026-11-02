// Copy for /partnership ("Partnerships" in the menu). Method: vahue-positioning-copy-source.md. Scale's strings stay, brand words swap.
// Same shape and counts as content.scale.ts. PLACEHOLDER lines are partner claims Mike must confirm or replace: no partner name is confirmed yet.
import type { PartnershipContent } from './types'

export const content: PartnershipContent = {
  meta: {
    title: 'Vahue Partners | Vahue',
    description: 'Vahue enables enterprises to accelerate AI development with high-quality data, rigorous agent evaluation, and secure solutions designed to deliver reliable outcomes at scale.',
  },
  hero: {
    title: 'Vahue Partners',
    body: 'Vahue enables enterprises to accelerate AI development with high-quality data, rigorous agent evaluation, and secure solutions designed to deliver reliable outcomes at scale.',
  },
  cards: [
    {
      key: 'page-partnership-crm-implementers',
      url: '/generative-ai-data-engine',
      color: '#839CB2',
      logo: { alt: 'Logo' }, // PLACEHOLDER
      title: 'CRM Implementers', // PLACEHOLDER
      body: 'Vahue Back-office Sync Agents optimized for CRM and ERP Platforms', // PLACEHOLDER
      cta: 'Learn more',
    },
    {
      key: 'page-partnership-telephony-firms',
      url: '/donovan',
      color: '#A8927C',
      logo: { alt: 'Logo' }, // PLACEHOLDER
      title: 'Telephony Firms x Vahue', // PLACEHOLDER
      body: 'Accelerating agent adoption and performance with Vahue Support and Voice Agents.', // PLACEHOLDER
      cta: 'Learn more',
    },
  ],
}
