// Copy for /about. Keep first: Scale's string stays unless it is false for Vahue, brand words swap, and the rest changes by a few words.
// Same shape and counts as content.scale.ts. PLACEHOLDER lines are facts or proof Mike must confirm or replace.
import type { AboutContent } from './types'

const A = '/about'

export const content: AboutContent = {
  meta: {
    title: 'About Us | Reliable AI for Critical Work | Vahue',
    description: 'Vahue powers leading enterprises and scale-ups with context, evaluations, and full-stack AI systems. Learn about our mission and impact.',
  },
  hero: { headline: 'About', image: `${A}/hero.webp` },
  mission: {
    headline: "Our mission is to develop reliable AI systems for the world's most important workflows.",
    subtitle: "We provide high-quality context and full-stack technologies that power the world's busiest workflows and enable enterprises and scale-ups to build, deploy, and oversee AI agents that deliver real impact.",
  },
  headquarters: {
    image: `${A}/headquarters-filled.webp`, // PLACEHOLDER neutral office photo until Vahue has its own
    alt: 'Vahue headquarters', // PLACEHOLDER
    caption: 'Headquarters: City, Country', // PLACEHOLDER
  },
  trustedBy: {
    overtitle: 'Trusted by',
    title: "Powering the world's busiest teams",
    // Tiles at the boxes Scale's logos render at.
    logos: [
      { alt: 'Logo', width: 100, height: 20 }, // PLACEHOLDER
      { alt: 'Logo', width: 108, height: 18 }, // PLACEHOLDER
      { alt: 'Logo', width: 72, height: 37 }, // PLACEHOLDER
      { alt: 'Logo', width: 60, height: 24 }, // PLACEHOLDER
    ],
  },
  whatWeDo: {
    heading: 'What we do',
    cards: [
      { icon: 'storage', title: 'Context Engine', description: "High-quality context, annotations, and expert review to power the world's most advanced AI agents." },
      { icon: 'barChart', title: 'Evaluations', description: 'Rigorous model evaluations and red-teaming to measure, benchmark, and improve AI performance.' },
      { icon: 'autoAwesome', title: 'Applied AI', description: 'Full-stack AI systems that help enterprises and scale-ups build, deploy, and oversee reliable AI.' },
    ],
  },
  glance: {
    heading: 'Vahue at a glance',
    cards: [
      { icon: 'psychology', label: 'AI Decisions', stat: '15M', description: 'Human decisions to oversee AI agents.' }, // PLACEHOLDER
      { icon: 'people', label: 'Experts', stat: '$10M', description: 'Paid to experts globally.' }, // PLACEHOLDER
      { icon: 'trendingUp', label: 'Valuation', stat: '$29M' }, // PLACEHOLDER
      { icon: 'badge', label: 'Employees', stat: '100+' }, // PLACEHOLDER
      { icon: 'rocket', label: 'Founded', stat: '2016' }, // PLACEHOLDER
    ],
  },
  offices: [
    { src: `${A}/office-1.webp`, alt: 'Vahue office' }, // PLACEHOLDER
    { src: `${A}/office-2.webp`, alt: 'Vahue office' }, // PLACEHOLDER
    { src: `${A}/office-3.webp`, alt: 'Vahue office' }, // PLACEHOLDER
    { src: `${A}/office-4.webp`, alt: 'Vahue office' }, // PLACEHOLDER
    { src: `${A}/office-5.webp`, alt: 'Vahue office' }, // PLACEHOLDER
  ],
  news: {
    heading: 'Vahue In The News',
    posts: [
      { key: 'news-1', overlay: true, gradient: true, title: 'Vahue CEO Full Name: We are headed for a multi-agent world', category: 'Publication', image: `${A}/news-1-filled.webp`, alt: 'Two colleagues on a staircase', url: '/blog', openInNewTab: true }, // PLACEHOLDER
      { key: 'news-2', overlay: true, gradient: true, title: 'Vahue hires former operations chief Full Name as new COO', category: 'Publication', image: `${A}/news-2-filled.webp`, alt: 'Two colleagues talking in an office lounge', url: '/blog', openInNewTab: true }, // PLACEHOLDER
      { key: 'news-3', title: 'One of the world’s most prominent insurers is testing how AI can revolutionize claims work', category: 'Publication', image: `${A}/news-3-filled.webp`, alt: 'Aerial view of a residential neighbourhood', url: '/blog', openInNewTab: true }, // PLACEHOLDER
      { key: 'news-4', gradient: true, title: 'Vahue Names Former Operations Executive Full Name as Its New COO', category: 'Publication', image: `${A}/news-4-filled.webp`, alt: 'Shipping containers at a port', url: '/blog', openInNewTab: true }, // PLACEHOLDER
      { key: 'news-5', title: "Vahue's CEO says stalled AI pilots are often theater", category: 'Publication', image: `${A}/news-5-filled.webp`, url: '/blog', openInNewTab: true }, // PLACEHOLDER
    ],
  },
  careers: { headline: 'Join us. Shape the future of AI.', cta: { text: 'View Open Roles', url: '/careers' }, image: `${A}/prefooter.webp` },
}
