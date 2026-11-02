// Copy for /partnership ("Partnerships" in the menu). Method: vahue-positioning-copy-source.md. Scale's strings stay, brand words swap.
// Same shape and counts as content.scale.ts. PLACEHOLDER lines are partner claims Mike must confirm or replace: no partner name is confirmed yet.
import type { PartnershipContent } from './types'

export const content: PartnershipContent = {
  meta: {
    title: 'Vahue Partners | Vahue',
    description: 'Vahue works with partners to bring enterprises and scale-ups reliable agents, rigorous evaluation, and secure integrations, with results measured against a baseline.',
  },
  hero: {
    title: 'Vahue Partners',
    body: 'Vahue works with partners to bring enterprises and scale-ups reliable agents, rigorous evaluation, and secure integrations, with results measured against a baseline.',
  },
  cards: [
    {
      key: 'page-partnership-crm-implementers',
      url: '/services/back-office-sync',
      color: '#839CB2',
      logo: { alt: 'Logo' }, // PLACEHOLDER
      title: 'CRM Implementers', // PLACEHOLDER
      body: 'Vahue Back-office Sync Agents optimized for CRM and ERP Platforms', // PLACEHOLDER
      cta: 'Learn more',
    },
    {
      key: 'page-partnership-telephony-firms',
      url: '/services/support-and-voice',
      color: '#A8927C',
      logo: { alt: 'Logo' }, // PLACEHOLDER
      title: 'Telephony Firms x Vahue', // PLACEHOLDER
      body: 'Accelerating agent adoption and performance with Vahue Support and Voice Agents.', // PLACEHOLDER
      cta: 'Learn more',
    },
  ],
}
