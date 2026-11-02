// Copy for /about. Keep first: Scale's string stays unless it is false for Vahue, brand words swap, and the rest changes by a few words.
// Same shape and counts as content.scale.ts. PLACEHOLDER lines are facts or proof Mike must confirm or replace.
import { fitProofLogo } from '@/components/site/proofLogos'
import type { AboutContent } from './types'

const A = '/about'

export const content: AboutContent = {
  meta: {
    title: 'About Us | Reliable AI for Critical Work | Vahue',
    description: 'Vahue powers leading enterprises and scale-ups with context, evaluations, and full-stack AI systems. Learn about our mission and impact.',
  },
  hero: { headline: 'About', image: `${A}/vahue-hero.webp` }, // FROM OLD SITE: confirm Mike's office photo, 800px source
  mission: {
    headline: "Our mission is to develop reliable AI systems for the world's most important workflows.",
    subtitle: "We provide high-quality context and full-stack technologies that power the world's busiest workflows and enable enterprises and scale-ups to build, deploy, and oversee AI agents that deliver real impact.",
  },
  headquarters: {
    image: `${A}/vahue-hq.webp`, // FROM OLD SITE: confirm Mike's office photo, 800px source
    alt: 'The office building beside the water', // FROM OLD SITE: confirm
    caption: 'The Vahue office', // FROM OLD SITE: confirm city not on the old site
  },
  trustedBy: {
    overtitle: 'Trusted by',
    title: "Powering the world's busiest teams",
    // Tiles at the boxes Scale's logos render at.
    logos: [
      fitProofLogo('qonto', 100, 24), // FROM OLD SITE: confirm
      fitProofLogo('verbit', 72, 30), // FROM OLD SITE: confirm
      fitProofLogo('inspera', 72, 37), // FROM OLD SITE: confirm
      fitProofLogo('etoro', 80, 24), // FROM OLD SITE: confirm
    ],
  },
  whatWeDo: {
    heading: 'What we do',
    cards: [
      { icon: 'storage', title: 'Context and Integrations', description: "High-quality context, system integrations, and expert review to power reliable AI agents." },
      { icon: 'barChart', title: 'Evals and Guardrails', description: 'Rigorous evals and red-teaming on your own cases to measure, benchmark, and improve AI performance.' },
      { icon: 'autoAwesome', title: 'Workflow Agents', description: 'Agents that run the busiest workflows of enterprises and scale-ups, measured against a baseline.' },
    ],
  },
  glance: {
    heading: 'Vahue at a glance',
    cards: [
      { icon: 'people', label: 'People Trained', stat: '100+', description: 'Trained on AI, with 96% adoption within 7 days.' }, // FROM OLD SITE: confirm
      { icon: 'psychology', label: 'Companies', stat: '20+', description: 'Companies transformed with AI.' }, // FROM OLD SITE: confirm
      { icon: 'trendingUp', label: 'Workshop Rating', stat: '9.4/10' }, // FROM OLD SITE: confirm
      { icon: 'badge', label: 'Team', stat: '17' }, // FROM OLD SITE: confirm plus a network of 15+ specialists
      { icon: 'rocket', label: 'Founded', stat: '2019' }, // FROM OLD SITE: confirm
    ],
  },
  offices: [
    { src: `${A}/vahue-office-1.webp`, alt: 'The office building beside the water' }, // FROM OLD SITE: confirm
    { src: `${A}/vahue-office-2.webp`, alt: 'Office lounge with sofas and plants' }, // FROM OLD SITE: confirm
    { src: `${A}/vahue-office-3.webp`, alt: 'Bright atrium with long tables' }, // FROM OLD SITE: confirm
    { src: `${A}/vahue-office-4.webp`, alt: 'Two colleagues talking in a lounge' }, // FROM OLD SITE: confirm
    { src: `${A}/vahue-office-5.webp`, alt: 'Two colleagues talking on a sofa' }, // FROM OLD SITE: confirm closer crop of the same photo: Mike sent four, Scale's slider has five
  ],
  news: {
    heading: 'Vahue In The News',
    posts: [
      { key: 'news-1', overlay: true, gradient: true, title: 'Vahue CEO Full Name: We are headed for a multi-agent world', category: 'Publication', image: `${A}/vahue-news-1.webp`, alt: 'Bright atrium with long tables', url: '/blog', openInNewTab: true }, // PLACEHOLDER
      { key: 'news-2', overlay: true, gradient: true, title: 'Vahue hires former operations chief Full Name as new COO', category: 'Publication', image: `${A}/vahue-news-2.webp`, alt: 'Two colleagues talking in a lounge', url: '/blog', openInNewTab: true }, // PLACEHOLDER
      { key: 'news-3', title: 'One of the world’s most prominent insurers is testing how AI can revolutionize claims work', category: 'Publication', image: `${A}/news-3-filled.webp`, alt: 'Aerial view of a residential neighbourhood', url: '/blog', openInNewTab: true }, // PLACEHOLDER
      { key: 'news-4', gradient: true, title: 'Vahue Names Former Operations Executive Full Name as Its New COO', category: 'Publication', image: `${A}/news-4-filled.webp`, alt: 'Shipping containers at a port', url: '/blog', openInNewTab: true }, // PLACEHOLDER
      { key: 'news-5', title: "Vahue's CEO says stalled AI pilots are often theater", category: 'Publication', image: `${A}/news-5-filled.webp`, url: '/blog', openInNewTab: true }, // PLACEHOLDER
    ],
  },
  careers: { headline: 'Join us. Shape the future of AI.', cta: { text: 'View Open Roles', url: '/careers' }, image: `${A}/vahue-prefooter.webp` }, // FROM OLD SITE: confirm
}
