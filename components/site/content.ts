// Scale's chrome labels under the 80% rule. Same shape and counts as content.scale.ts.
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
        { text: 'Build AI' },
        { href: '/data-engine', name: 'Vahue Context Engine', image: img('data-engine', 'Context Engine') },
        { href: '/generative-ai-data-engine', name: 'For Back-office Sync', image: neutral('For Back-office Sync') },
        { href: '/physical-ai', name: 'For Document Intake', image: img('physical-ai', 'For Document Intake') },
        { href: '/public-sector-data-engine', name: 'For Revenue Teams', image: img('public-sector-data-engine', 'For Government') },
        { href: '/automotive', name: 'For Scoring and Decisions', image: img('automotive', 'For Scoring and Decisions') },
        { href: '/rlenvironments', name: 'Agent Environments', image: img('rlenvironments', 'Agent Environments') },
        { href: '/experts', name: 'Experts', image: img('experts', 'Experts') },
      ],
      rightColumn: [
        { text: 'Apply AI' },
        { href: '/genai-portfolio', name: 'Knowledge Agents', image: img('genai-portfolio', 'Knowledge Agents') },
        { href: '/donovan', name: 'Support and Voice Agents', image: img('donovan', 'Support and Voice Agents') },
        { text: 'Evaluate AI' },
        { href: '/evaluation/model-developers', name: 'For Operations Teams', image: img('evaluation-model-developers', 'For Operations Teams') },
        { href: '/evaluation/public-sector', name: 'For Regulated Teams', image: img('evaluation-public-sector', 'Public Sector') },
        { href: '/evaluation/enterprise', name: 'For Enterprise', image: img('evaluation-enterprise', 'For Enterprise') },
      ],
    },
    {
      name: 'Solutions',
      leftColumn: [
        { href: '/enterprise', name: 'Enterprise', image: img('enterprise', 'Enterprise') },
        { href: '/public-sector', name: 'Scale-ups', image: img('public-sector', 'US Public Sector') },
        { href: '/global-public-sector', name: 'Professional Services', image: img('global-public-sector', 'Global Public Sector') },
      ],
      rightColumn: [
        { text: 'By Industry' },
        { href: '/enterprise/insurance', name: 'Insurance', image: img('enterprise-insurance', 'Enterprise Insurance') },
        { href: '/enterprise/healthcare', name: 'Healthcare', image: img('enterprise-healthcare', 'Enterprise Healthcare') },
        { href: '/public-sector/national-security', name: 'Regulated Industries', image: img('public-sector-national-security', 'Regulated Industries') },
      ],
    },
    {
      name: 'Research',
      leftColumn: [
        { text: 'Research' },
        { href: '/labs/papers', name: 'Research Papers', image: img('labs-papers', 'Research Papers') },
        { href: '/labs/leaderboard', name: 'Agent Evals', image: img('labs-papers', 'Agent Evals') },
        { href: '/labs', name: 'Labs', image: img('physical-ai', 'Labs') },
        { href: '/labs/blog', name: 'Research Blog', image: img('automotive', 'Research Blog') },
        { href: '/labs/jobs', name: 'Research Careers', image: img('labs-papers', 'Research Careers') },
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
        { url: '/guides', title: 'Read the Agentic Planning eBook', image: neutral('Agentic Planning eBook') }, // PLACEHOLDER
        { url: '/blog', title: 'Reliable AI: Building From the Ground Up', image: img('featured-2', 'Earth with Arab world at the center') }, // PLACEHOLDER
      ],
    },
  ],
}

export const announcement: AnnouncementContent = {
  text: 'Vahue Partners With Enterprises to Bring AI Agents to Production', // PLACEHOLDER
  variant: 'evergreen',
  cta: { label: 'Learn more', href: '/blog' },
}

export const footer: FooterContent = {
  linkLists: [
    {
      title: 'Products',
      links: [
        { text: 'Vahue context engine', href: '/data-engine' },
        { text: 'Knowledge Agents', href: '/genai-portfolio' },
        { text: 'Support and Voice Agents', href: '/donovan' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { text: 'Enterprise', href: '/enterprise' },
        { text: 'Insurance', href: '/enterprise/insurance' },
        { text: 'Healthcare', href: '/enterprise/healthcare' },
        { text: 'Regulated Industries', href: '/public-sector/national-security' },
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
        { text: 'Data Partnerships', href: '/partnership' },
        { text: 'Documentation', href: '/docs' },
        { text: 'Brand Guidelines', href: '/about' },
      ],
    },
    {
      title: 'Guides',
      links: [
        { text: 'Data Preparation', href: '/guides' },
        { text: 'AI Agent Evaluation', href: '/guides' },
        { text: 'Document Intake', href: '/guides' },
        { text: 'Guide to AI for eCommerce', href: '/guides' },
        { text: 'Computer Vision Applications', href: '/guides' },
        { text: 'Large Language Models', href: '/guides' },
      ],
    },
  ],
  title: 'Reliable AI for the world’s most important workflows',
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
