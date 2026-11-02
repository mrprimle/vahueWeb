// Site chrome labels. Same shape and row counts as content.scale.ts; service names are the single source of truth for every page.
import type { AnnouncementContent, FooterContent, NavContent } from './content.types'

const img = (slug: string, alt: string) => ({ path: `/site/nav/${slug}.webp`, alt })

export const nav: NavContent = {
  logoLink: '/',
  loginCtaLabel: 'Log in',
  loginCtaHref: '/demo',
  bookDemoCtaLabel: 'Get Started',
  bookDemoCtaHref: '/demo',
  categories: [
    {
      name: 'Services',
      wideLeftColumn: true,
      leftColumn: [
        { text: 'Automate a Workflow' },
        { href: '/data-engine', name: 'Context and Integrations', image: img('data-engine', 'Context and Integrations') },
        { href: '/generative-ai-data-engine', name: 'Back-office Sync Agents', image: img('back-office-sync', 'Back-office Sync Agents') },
        { href: '/physical-ai', name: 'Document Intake Agents', image: img('document-intake', 'Document Intake Agents') },
        { href: '/public-sector-data-engine', name: 'Sales and Booking Agents', image: img('revenue-teams', 'Sales and Booking Agents') },
        { href: '/automotive', name: 'Scoring and Decision Agents', image: img('scoring-decisions', 'Scoring and Decision Agents') },
        { href: '/genai-portfolio', name: 'Knowledge Agents', image: img('genai-portfolio', 'Knowledge Agents') },
        { href: '/donovan', name: 'Support and Voice Agents', image: img('support-voice', 'Support and Voice Agents') },
      ],
      rightColumn: [
        { text: 'Build AI' },
        { href: '/rlenvironments', name: 'AI Product Engineering', image: img('rlenvironments', 'AI Product Engineering') },
        { href: '/experts', name: 'Embedded AI Specialists', image: img('experts', 'Embedded AI Specialists') },
        { text: 'Prove and Fix' },
        { href: '/evaluation/enterprise', name: 'AI Strategy and Audit', image: img('evaluation-enterprise', 'AI Strategy and Audit') },
        { href: '/evaluation/model-developers', name: 'Evals and Guardrails', image: img('evaluation-model-developers', 'Evals and Guardrails') },
        { href: '/evaluation/public-sector', name: 'Production Rescue', image: img('evaluation-public-sector', 'Production Rescue') },
      ],
    },
    {
      name: 'Solutions',
      leftColumn: [
        { href: '/enterprise', name: 'Enterprise', image: img('enterprise', 'Enterprise') },
        { href: '/public-sector', name: 'Scale-ups', image: img('scale-ups', 'Scale-ups') },
        { href: '/global-public-sector', name: 'Professional Services', image: img('professional-services', 'Professional Services') },
      ],
      rightColumn: [
        { text: 'By Industry' },
        { href: '/enterprise/insurance', name: 'Insurance', image: img('enterprise-insurance', 'Insurance') },
        { href: '/enterprise/healthcare', name: 'Healthcare', image: img('enterprise-healthcare', 'Healthcare') },
        { href: '/public-sector/national-security', name: 'Regulated Industries', image: img('regulated-industries', 'Regulated Industries') },
      ],
    },
    {
      name: 'Research',
      leftColumn: [
        { text: 'Research' },
        { href: '/labs/papers', name: 'Research Papers', image: img('labs-papers', 'Research Papers') },
        { href: '/labs/leaderboard', name: 'Agent Evals', image: img('labs-papers', 'Agent Evals') },
        { href: '/labs', name: 'Labs', image: img('document-intake', 'Labs') },
        { href: '/labs/blog', name: 'Research Blog', image: img('scoring-decisions', 'Research Blog') },
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
        { href: '/security', name: 'Security', image: img('security-controls', 'Security') },
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
        { url: '/guides', title: 'Read the Agentic Planning eBook', image: img('featured-planning', 'Agentic Planning eBook') }, // PLACEHOLDER
        { url: '/blog', title: 'Reliable AI: Building From the Ground Up', image: img('featured-context', 'Systems connected through the Context Engine') }, // PLACEHOLDER
      ],
    },
  ],
}

export const announcement: AnnouncementContent = {
  text: 'For Operations, Finance and Support Teams: Start With a 2-Week Audit',
  variant: 'evergreen',
  cta: { label: 'Learn more', href: '/evaluation/enterprise' },
}

export const footer: FooterContent = {
  linkLists: [
    {
      title: 'Services',
      links: [
        { text: 'Back-office Sync Agents', href: '/generative-ai-data-engine' },
        { text: 'Document Intake Agents', href: '/physical-ai' },
        { text: 'Sales and Booking Agents', href: '/public-sector-data-engine' },
        { text: 'Support and Voice Agents', href: '/donovan' },
        { text: 'AI Product Engineering', href: '/rlenvironments' },
        { text: 'AI Strategy and Audit', href: '/evaluation/enterprise' },
        { text: 'Production Rescue', href: '/evaluation/public-sector' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { text: 'Enterprise', href: '/enterprise' },
        { text: 'Insurance', href: '/enterprise/insurance' },
        { text: 'Healthcare', href: '/enterprise/healthcare' },
        { text: 'Regulated Industries', href: '/public-sector/national-security' },
        { text: 'Scale-ups', href: '/public-sector' },
        { text: 'Professional Services', href: '/global-public-sector' },
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
        { text: 'Technology Partnerships', href: '/partnership' },
        { text: 'Documentation', href: '/docs' },
        { text: 'Brand Guidelines', href: '/about' },
      ],
    },
    {
      title: 'Guides',
      links: [
        { text: 'Context and Integrations', href: '/guides' },
        { text: 'AI Agent Evaluation', href: '/guides' },
        { text: 'Document Intake', href: '/guides' },
        { text: 'Support and Voice Agents', href: '/guides' },
        { text: 'Workflow Automation Guide', href: '/guides' },
        { text: 'AI Pilot to Production', href: '/guides' },
      ],
    },
  ],
  title: 'Reliable AI for your busiest workflows',
  smallPrint: 'Copyright © 2026 Vahue AI, Inc. All rights reserved', // PLACEHOLDER: legal entity name for Mike
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
