// Vahue chrome copy from research/research.ts. Same shape and counts as content.scale.ts.
import type { AnnouncementContent, FooterContent, NavContent } from './content.types'

const img = (slug: string, alt: string) => ({ path: `/site/nav/${slug}.webp`, alt })
const neutral = (alt: string) => ({ path: '/site/nav/neutral.svg', alt })

export const nav: NavContent = {
  logoLink: '/',
  loginCtaLabel: 'Log in',
  loginCtaHref: '/demo',
  bookDemoCtaLabel: 'Get Started',
  bookDemoCtaHref: '/demo',
  categories: [
    {
      name: 'Products',
      leftColumn: [
        { text: 'Workflows' },
        { href: '/data-engine', name: 'All Workflows', image: img('data-engine', 'Person reviewing work at a screen') },
        { href: '/generative-ai-data-engine', name: 'Back-office Sync', image: neutral('Back-office sync') },
        { href: '/physical-ai', name: 'Document Intake', image: img('physical-ai', 'Operator working beside automated equipment') },
        { href: '/public-sector-data-engine', name: 'For Government', image: img('public-sector-data-engine', 'For government') },
        { href: '/automotive', name: 'Scoring and Decisions', image: img('automotive', 'Scoring and decisions') },
        { href: '/rlenvironments', name: 'Engineering Enablement', image: img('rlenvironments', 'Engineering enablement') },
        { href: '/experts', name: 'Reviewers', image: img('experts', 'A reviewer checking agent output') },
      ],
      rightColumn: [
        { text: 'Apply Agents' },
        { href: '/genai-portfolio', name: 'Knowledge Agents', image: img('genai-portfolio', 'Knowledge agents') },
        { href: '/donovan', name: 'Support and Voice Agents', image: img('donovan', 'Support and voice agents') },
        { text: 'Run the Work' },
        { href: '/evaluation/model-developers', name: 'Audit in Two Weeks', image: img('evaluation-model-developers', 'Audit') },
        { href: '/evaluation/public-sector', name: 'Pilot in Six Weeks', image: img('evaluation-public-sector', 'Pilot') },
        { href: '/evaluation/enterprise', name: 'Operate Monthly', image: img('evaluation-enterprise', 'Operate') },
      ],
    },
    {
      name: 'Solutions',
      leftColumn: [
        { href: '/enterprise', name: 'Operations Teams', image: img('enterprise', 'Operations teams') },
        { href: '/public-sector', name: 'US Public Sector', image: img('public-sector', 'US public sector') },
        { href: '/global-public-sector', name: 'Global Public Sector', image: img('global-public-sector', 'Global public sector') },
      ],
      rightColumn: [
        { text: 'By Industry' },
        { href: '/enterprise/insurance', name: 'Insurance', image: img('enterprise-insurance', 'Insurance') },
        { href: '/enterprise/healthcare', name: 'Healthcare', image: img('enterprise-healthcare', 'Healthcare') },
        { href: '/public-sector/national-security', name: 'National Security', image: img('public-sector-national-security', 'National security') },
      ],
    },
    {
      name: 'Research',
      leftColumn: [
        { text: 'Research' },
        { href: '/labs/papers', name: 'Research Papers', image: img('labs-papers', 'Research papers') },
        { href: '/labs/leaderboard', name: 'Agency Leaderboards', image: img('labs-papers', 'Agency leaderboards') },
        { href: '/labs', name: 'Labs', image: img('physical-ai', 'Labs') },
        { href: '/labs/blog', name: 'Research Blog', image: img('automotive', 'Research blog') },
        { href: '/labs/jobs', name: 'Research Careers', image: img('labs-papers', 'Research careers') },
      ],
      rightColumn: [],
    },
    {
      name: 'Resources',
      featureBlogPosts: true,
      leftColumn: [
        { text: 'In Vahue' },
        { href: '/about', name: 'About', image: img('about', 'About Vahue') },
        { href: '/security', name: 'Security', image: img('security', 'Security') },
        { href: '/guides', name: 'Guides' },
        { href: '/careers', name: 'Careers', image: img('labs-papers', 'Careers') },
      ],
      rightColumn: [
        { href: '/demo', name: 'Contact us' },
        { href: '/blog', name: 'Blog' },
        { href: '/events', name: 'Events' },
        { href: '/docs', name: 'Documentation' },
        { href: '/partnership', name: 'Partnerships' },
      ],
      featuredPosts: [
        { url: '/guides', title: 'Read the Workflow Audit Guide', image: neutral('Workflow audit guide') },
        { url: '/blog', title: 'Measured From Day One: Baselines Before Agents', image: img('featured-2', 'Baselines before agents') },
      ],
    },
  ],
}

export const announcement: AnnouncementContent = {
  text: 'Two-Week Workflow Audits Now Open for Mid-Market Operations Teams',
  variant: 'evergreen',
  cta: { label: 'Learn more', href: '/evaluation/model-developers' },
}

export const footer: FooterContent = {
  linkLists: [
    {
      title: 'Products',
      links: [
        { text: 'All workflows', href: '/data-engine' },
        { text: 'Knowledge Agents', href: '/genai-portfolio' },
        { text: 'Support and Voice Agents', href: '/donovan' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { text: 'Operations Teams', href: '/enterprise' },
        { text: 'Insurance', href: '/enterprise/insurance' },
        { text: 'Healthcare', href: '/enterprise/healthcare' },
        { text: 'National Security', href: '/public-sector/national-security' },
        { text: 'US Public Sector', href: '/public-sector' },
        { text: 'Global Public Sector', href: '/global-public-sector' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '/about' },
        { text: 'Careers', href: '/careers' },
        { text: 'Security', href: '/security' },
        { text: 'Terms', href: '/legal/terms' },
        { text: 'Privacy', href: '/legal/privacy' },
        { text: 'Data Processing Terms', href: '/legal/data-processing' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', href: '/blog' },
        { text: 'Contact Us', href: '/demo' },
        { text: 'Events', href: '/events' },
        { text: 'Partnerships', href: '/partnership' },
        { text: 'Integrations', href: '/partnership' },
        { text: 'Documentation', href: '/docs' },
        { text: 'Brand Guidelines', href: '/about' },
      ],
    },
    {
      title: 'Guides',
      links: [
        { text: 'Back-office Sync', href: '/guides' },
        { text: 'Document Intake', href: '/guides' },
        { text: 'Knowledge Agents', href: '/guides' },
        { text: 'Support and Voice Agents', href: '/guides' },
        { text: 'Scoring and Decisions', href: '/guides' },
        { text: 'Engineering Enablement', href: '/guides' },
      ],
    },
  ],
  title: 'Your busiest workflows, run and measured by agents',
  smallPrint: 'Copyright © 2026 Vahue. All rights reserved', // PLACEHOLDER: legal entity name for Mike
  cookiesPrefix: 'Manage your',
  cookiesLink: 'cookie preferences',
  tos: [
    { label: 'Terms of Use', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
  ],
  tosJoiner: ' & ',
  socials: [
    { name: 'LinkedIn', href: '#', icon: 'linkedin' }, // PLACEHOLDER: Vahue LinkedIn URL for Mike
    { name: 'X', href: '#', icon: 'x' }, // PLACEHOLDER: Vahue X URL for Mike
  ],
}
