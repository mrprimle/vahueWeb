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
      leftColumn: [
        { text: 'Automate a Workflow' },
        { href: '/services/context-and-integrations', name: 'Integrations', image: img('data-engine', 'Context and Integrations') },
        { href: '/services/back-office-sync', name: 'Back-office Sync', image: img('back-office-sync', 'Back-office Sync Agents') },
        { href: '/services/document-intake', name: 'Document Intake', image: img('document-intake', 'Document Intake Agents') },
        { href: '/services/sales-and-booking', name: 'Sales and Booking', image: img('revenue-teams', 'Sales and Booking Agents') },
        { href: '/services/scoring-and-decisions', name: 'Decision Scoring', image: img('scoring-decisions', 'Scoring and Decision Agents') },
        { href: '/services/knowledge-agents', name: 'Knowledge Agents', image: img('genai-portfolio', 'Knowledge Agents') },
        { href: '/services/support-and-voice', name: 'Support and Voice', image: img('support-voice', 'Support and Voice Agents') },
      ],
      rightColumn: [
        { text: 'Build AI' },
        { href: '/services/ai-product-engineering', name: 'AI Product Engineering', image: img('rlenvironments', 'AI Product Engineering') },
        { href: '/services/embedded-specialists', name: 'Embedded AI Specialists', image: img('experts', 'Embedded AI Specialists') },
        { text: 'Prove and Fix' },
        { href: '/services/ai-strategy-and-audit', name: 'AI Strategy and Audit', image: img('evaluation-enterprise', 'AI Strategy and Audit') },
        { href: '/services/evals-and-guardrails', name: 'Evals and Guardrails', image: img('evaluation-model-developers', 'Evals and Guardrails') },
        { href: '/services/production-rescue', name: 'Production Rescue', image: img('evaluation-public-sector', 'Production Rescue') },
      ],
    },
    {
      name: 'Solutions',
      leftColumn: [
        { href: '/enterprise', name: 'Enterprise', image: img('enterprise', 'Enterprise') },
        { href: '/solutions/scale-ups', name: 'Scale-ups', image: img('scale-ups', 'Scale-ups') },
        { href: '/solutions/professional-services', name: 'Professional Services', image: img('professional-services', 'Professional Services') },
      ],
      rightColumn: [
        { text: 'By Industry' },
        { href: '/enterprise/insurance', name: 'Insurance', image: img('enterprise-insurance', 'Insurance') },
        { href: '/enterprise/healthcare', name: 'Healthcare', image: img('enterprise-healthcare', 'Healthcare') },
        { href: '/solutions/regulated-industries', name: 'Regulated Industries', image: img('regulated-industries', 'Regulated Industries') },
      ],
    },
    {
      name: 'Company',
      leftColumn: [
        { text: 'Company' },
        { href: '/about', name: 'About', image: img('about', 'About Vahue') },
        { href: '/security', name: 'Security', image: img('security-controls', 'Security') },
        { href: '/careers', name: 'Careers', image: img('about', 'Careers') },
        { href: '/partnership', name: 'Partnerships', image: img('enterprise', 'Partnerships') },
        { href: '/demo', name: 'Contact us', image: img('scale-ups', 'Contact us') },
      ],
      rightColumn: [],
    },
    {
      name: 'Resources',
      featureBlogPosts: true,
      leftColumn: [
        { text: 'Resources' },
        { href: '/guides', name: 'Guides' },
        { href: '/blog', name: 'Blog' },
      ],
      rightColumn: [
        { href: '/events', name: 'Events' },
        { href: '/docs', name: 'Documentation' },
      ],
      featuredPosts: [
        { url: '/guides', title: 'Read the Agentic Planning eBook', image: img('featured-planning', 'Agentic Planning eBook') }, // PLACEHOLDER
        { url: '/blog', title: 'Reliable AI: Building From the Ground Up', image: img('featured-context', 'Systems connected through Context and Integrations') }, // PLACEHOLDER
      ],
    },
  ],
}

export const announcement: AnnouncementContent = {
  text: 'For Operations, Finance and Support Teams: Start With a 2-Week Audit',
  variant: 'evergreen',
  cta: { label: 'Learn more', href: '/services/ai-strategy-and-audit' },
}

export const footer: FooterContent = {
  linkLists: [
    {
      title: 'Services',
      links: [
        { text: 'Context and Integrations', href: '/services/context-and-integrations' },
        { text: 'AI Product Engineering', href: '/services/ai-product-engineering' },
        { text: 'AI Strategy and Audit', href: '/services/ai-strategy-and-audit' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { text: 'Enterprise', href: '/enterprise' },
        { text: 'Insurance', href: '/enterprise/insurance' },
        { text: 'Healthcare', href: '/enterprise/healthcare' },
        { text: 'Regulated Industries', href: '/solutions/regulated-industries' },
        { text: 'Scale-ups', href: '/solutions/scale-ups' },
        { text: 'Professional Services', href: '/solutions/professional-services' },
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
