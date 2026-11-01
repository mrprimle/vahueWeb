// Scale's original chrome strings, captured from https://scale.com/ RSC payload (navMainMenu, footer data,
// announcement) on 2026-11-01. Links to labs.scale.com and other hosts are mapped to this site's own routes.
import type { AnnouncementContent, FooterContent, NavContent } from './content.types'

const img = (slug: string, alt: string) => ({ path: `/site/nav/${slug}.webp`, alt })

export const navScale: NavContent = {
  logoLink: '/',
  loginCtaLabel: 'Log in',
  loginCtaHref: '/demo', // Scale: https://dashboard.scale.com/login
  bookDemoCtaLabel: 'Get Started',
  bookDemoCtaHref: '/demo',
  categories: [
    {
      name: 'Products',
      leftColumn: [
        { text: 'Build AI' },
        { href: '/data-engine', name: 'Scale Data Engine', image: img('data-engine', 'Data Engine') },
        { href: '/generative-ai-data-engine', name: 'For Generative AI', image: img('generative-ai-data-engine', 'For Generative AI') },
        { href: '/physical-ai', name: 'For Physical AI', image: img('physical-ai', 'For Physical AI') },
        { href: '/public-sector-data-engine', name: 'For Government', image: img('public-sector-data-engine', 'For Government') },
        { href: '/automotive', name: 'For Automotive', image: img('automotive', 'Automotive') },
        { href: '/rlenvironments', name: 'RL Environments', image: img('rlenvironments', 'RL Environments') },
        { href: '/experts', name: 'Experts', image: img('experts', 'Experts') },
      ],
      rightColumn: [
        { text: 'Apply AI' },
        { href: '/genai-portfolio', name: 'Scale GenAI Portfolio', image: img('genai-portfolio', 'Scale GenAI Portfolio Image') },
        { href: '/donovan', name: 'Scale Donovan', image: img('donovan', 'Scale Donovan image') },
        { text: 'Evaluate AI' },
        { href: '/evaluation/model-developers', name: 'For Model Developers', image: img('evaluation-model-developers', 'For Model Developers') },
        { href: '/evaluation/public-sector', name: 'For Public Sector', image: img('evaluation-public-sector', 'Public Sector') },
        { href: '/evaluation/enterprise', name: 'For Enterprise', image: img('evaluation-enterprise', 'For Enterprise') },
      ],
    },
    {
      name: 'Solutions',
      leftColumn: [
        { href: '/enterprise', name: 'Enterprise', image: img('enterprise', 'Enterprise') },
        { href: '/public-sector', name: 'US Public Sector', image: img('public-sector', 'US Public Sector') },
        { href: '/global-public-sector', name: 'Global Public Sector', image: img('global-public-sector', 'Global Public Sector') },
      ],
      rightColumn: [
        { text: 'By Industry' },
        { href: '/enterprise/insurance', name: 'Insurance', image: img('enterprise-insurance', 'Enterprise Insurance') },
        { href: '/enterprise/healthcare', name: 'Healthcare', image: img('enterprise-healthcare', 'Enterprise Healthcare') },
        { href: '/public-sector/national-security', name: 'National Security', image: img('public-sector-national-security', 'National Security') },
      ],
    },
    {
      name: 'Research',
      leftColumn: [
        { text: 'Research' },
        { href: '/labs/papers', name: 'Research Papers', image: img('labs-papers', 'Research Papers') },
        { href: '/labs/leaderboard', name: 'Frontier Leaderboards', image: img('labs-papers', 'Frontier Leaderboards') },
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
        { text: 'In Scale' },
        { href: '/about', name: 'About', image: img('about', 'About Scale') },
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
        { url: '/guides', title: 'Read the Agentic Planning eBook', image: img('featured-1', 'Agentic Planning eBook') },
        { url: '/blog', title: 'Arabic-First AI: Building From the Ground Up', image: img('featured-2', 'Earth with Arab world at the center') },
      ],
    },
  ],
}

export const announcementScale: AnnouncementContent = {
  text: 'Scale Partners With NVIDIA to Bring Nemotron to Enterprises',
  variant: 'evergreen',
  cta: { label: 'Learn more', href: '/blog' },
}

export const footerScale: FooterContent = {
  linkLists: [
    {
      title: 'Products',
      links: [
        { text: 'Scale data engine', href: '/data-engine' },
        { text: 'Scale GenAI Portfolio', href: '/genai-portfolio' },
        { text: 'Scale Donovan', href: '/donovan' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { text: 'Enterprise', href: '/enterprise' },
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
        { text: 'Modern Slavery Statement', href: '/legal/modern-slavery-statement' },
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
        { text: 'Data Labeling', href: '/guides' },
        { text: 'ML Model Training', href: '/guides' },
        { text: 'Diffusion Models', href: '/guides' },
        { text: 'Guide to AI for eCommerce', href: '/guides' },
        { text: 'Computer Vision Applications', href: '/guides' },
        { text: 'Large Language Models', href: '/guides' },
      ],
    },
  ],
  title: 'Reliable AI for the world’s most important decisions',
  smallPrint: 'Copyright © 2026 Scale AI, Inc. All rights reserved',
  cookiesPrefix: 'Manage your',
  cookiesLink: 'cookie preferences',
  tos: [
    { label: 'Terms of Use', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
  ],
  tosJoiner: ' & ',
  socials: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/scaleai', icon: 'linkedin' },
    { name: 'X', href: 'https://x.com/scale_ai', icon: 'x' },
  ],
}
