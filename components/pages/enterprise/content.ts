// Copy for /enterprise from the AJTBD research in Scale's slots. Same shape as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real numbers, clients, quotes and logos.
import { fitProofLogo, type ProofLogo } from '@/components/site/proofLogos'
import type { EnterpriseContent, EnterpriseLogo } from './types'

const P = '/enterprise'
const NO_LOGO: EnterpriseLogo = { alt: 'Logo' } // no logo on the old site: the testimonial tab shows the name, Scale's no-logo branch
const logos = (names: ProofLogo[]): EnterpriseLogo[] => names.map((name) => { const { alt, src } = fitProofLogo(name, 70, 28); return { alt, src } })

export const content: EnterpriseContent = {
  meta: {
    title: 'AI Agents for Enterprise Operations | Vahue',
    description: 'We run your busiest workflow with agents, measured against your baseline from day one. See it work on your own cases before it goes live.',
  },
  hero: {
    headline: 'Reliable AI for the work your business runs on.',
    subtitle: [{ style: 'normal', text: 'For operations, finance and support leaders: we run your busiest workflow with agents, measured against your baseline from day one.' }],
    cta: { url: '/demo', text: 'Schedule a consult' },
    scrollLabel: 'Scroll to explore',
    images: [
      { path: `${P}/hero-energy.webp`, label: 'Energy', color: '#a78955' },
      { path: `${P}/hero-infrastructure.webp`, label: 'Infrastructure', color: '#a37757' },
      { path: `${P}/hero-insurance.webp`, label: 'Insurance', color: '#548ca4' },
      { path: `${P}/hero-health.webp`, label: 'Health', color: '#548499' },
      { path: `${P}/hero-consumer.webp`, label: 'Consumer', color: '#9f6f55' },
      { path: `${P}/hero-retail.webp`, label: 'Retail', color: '#9e6b5f' },
      { path: `${P}/hero-logistics.webp`, label: 'Logistics', color: '#917f6f' },
    ],
  },
  pullApart: {
    logoTexture: `${P}/pull-apart-logo-filled.png`,
    video: `${P}/pull-apart.mp4`,
    textItems: [
      {
        headline: [{ style: 'normal', text: 'Most AI initiatives never make it past pilot.' }],
        subheading: [{ style: 'normal', text: 'Models are powerful, but your team still moves the work between systems by hand.' }],
      },
      {
        headline: [{ style: 'normal', text: 'We turn pilots into reliable systems' }],
        subheading: [{ style: 'normal', text: 'We connect your inbox, documents, CRM and ERP, redesign the workflow, and run agents inside the tools your team already uses.' }],
      },
    ],
  },
  bridge: {
    headline: 'Vahue bridges the gap between AI models & business outcomes',
    subtitle: [{ style: 'normal', text: 'We find the right use case, build the system, and own the outcome. Agents learn from your team’s corrections, so the workflow keeps improving against your baseline.' }],
    trustedBy: 'Trusted by',
    logos: logos(['qonto', 'etoro', 'verbit', 'inspera', 'winningtemp', 'monocl']), // FROM OLD SITE: confirm
    video: { webm: `${P}/squares-filled.webm`, mov: `${P}/squares-filled-hevc.mp4`, poster: `${P}/squares-filled-poster.webp`, name: 'Squares' },
  },
  blog: {
    heading: 'Your experts, amplified. Your limits, redefined.',
    posts: [
      { title: 'Beyond "Out-of-the-Box": Why Scale-ups Need Specialized AI Agents', url: '/blog', image: `${P}/blog-rl.webp`, category: { name: 'Research', color: { hex: '#273252' } } },
      { title: "How a mid-market insurer deploys AI that actually works (hint: it's evals) | Human in the Loop: Episode 13", url: '/blog', image: `${P}/blog-evals-filled.webp`, category: { name: 'Company' } }, // PLACEHOLDER
      { title: 'Turn Insurance Documents Into Intelligence', url: '/enterprise/insurance', image: `${P}/blog-insurance.webp`, category: { name: 'Enterprise' } },
      { title: 'Reliable AI for the Future of Healthcare', url: '/enterprise/healthcare', image: `${P}/blog-healthcare.webp`, category: { name: 'Healthcare' } },
    ],
  },
  logoCloud: {
    headline: 'Trusted by 20+ ambitious companies.', // FROM OLD SITE: confirm
    logos: logos(['qonto', 'etoro', 'verbit', 'inspera', 'winningtemp', 'svea-solar', 'ica', 'wisestamp', 'zwapgrid']), // FROM OLD SITE: confirm
  },
  results: {
    heading: 'Real customers, real results.',
    cards: [
      { label: 'Time Saved', stat: '5 min', description: 'average response time at a wealth management firm, down from 1 hour.', icon: 'time' }, // FROM OLD SITE: confirm
      { label: 'Support Load', stat: '60%', description: 'fewer customer support tickets on an e-commerce platform.', icon: 'revenue' }, // FROM OLD SITE: confirm
      { label: 'Satisfaction', stat: '95%', description: 'CSAT with 24/7 AI support on the same e-commerce platform.', icon: 'accuracy' }, // FROM OLD SITE: confirm
      { label: 'Adoption', stat: '85%', description: 'of employees at a wealth management firm use AI tools daily.', icon: 'adoption' }, // FROM OLD SITE: confirm
      { label: 'Delivery Speed', stat: '2 weeks', description: 'to resolve 70% of routine queries automatically at that firm.', icon: 'speed' }, // FROM OLD SITE: confirm
    ],
  },
  testimonials: {
    heading: "Don't just take our word for it",
    items: [
      {
        clientName: 'Chad Willard', // FROM OLD SITE: confirm
        title: 'CEO, Straddle', // FROM OLD SITE: confirm
        testimonial: 'Their speed and professionalism are really impressive.', // FROM OLD SITE: confirm
        logo: NO_LOGO,
      },
      {
        clientName: 'Steinar Aas', // FROM OLD SITE: confirm
        title: 'CEO & Co-Founder, Asio AS', // FROM OLD SITE: confirm
        testimonial: 'Their flexibility and genuine interest in finding the best solution for the product was impressive.', // FROM OLD SITE: confirm
        logo: NO_LOGO,
      },
      {
        clientName: 'Patrik Dvořák', // FROM OLD SITE: confirm
        title: 'CEO, SECTOR 31', // FROM OLD SITE: confirm
        testimonial: "Vahue's responsiveness and accuracy were impressive. We highly recommend them.", // FROM OLD SITE: confirm
        logo: NO_LOGO,
      },
    ],
  },
  race: {
    heading: [{ style: 'h2', text: 'The race is on.' }],
    left: [{ style: 'h4', text: 'Everyone is using AI. Few have it running the work.' }],
    right: [{ style: 'normal', text: 'Platforms leave your team tuning, testing and watching the bill. Firms that build and leave hand you a demo and a handover. We prove the agents on your own cases, then run them, so nobody on your team becomes their full-time babysitter.' }],
    cta: { url: '/demo', text: 'Learn More' },
    video: `${P}/cables.mp4`,
  },
  pillars: {
    heading: [{ style: 'h3', text: 'Three Pillars.\nOne Unfair Advantage.' }],
    video: `${P}/stacking.mp4`,
    cards: [
      { headline: 'Integrated experts', subtitle: 'We embed directly in your organization to find the right use case, build it inside your systems, not ours, and stay to run it.', icon: 'experts', color: '#A8927C' },
      { headline: 'Technology', subtitle: 'Our internal tooling connects to your CRM, ERP, documents and MCP servers, so agents work in the systems you already use, with no migration.', icon: 'technology', color: '#839CB2' },
      { headline: 'Evals and Guardrails', subtitle: 'We test every agent on your own past cases in shadow mode, next to what your team actually did, so accuracy is proven before go-live.', icon: 'research', color: '#193A29' },
    ],
  },
  poweredBy: {
    headline: 'Audit, Pilot, Operate with one accountable team',
    subtitle: [{ style: 'normal', text: 'Start with a 2-week Audit that records your baseline. Run a 4 to 6-week Pilot in shadow mode on real cases. Then we operate it monthly and report against that baseline.' }],
    cta: { url: '/services/ai-strategy-and-audit', text: 'Learn More' },
    image: { path: `${P}/platform.webp`, alt: 'AI Platform' },
    cards: [
      { headline: 'Audit & Pilot', subtitle: 'Find the right use case, record the baseline, and see the agents work on your own cases before they go live.', icon: `${P}/icon-powered.svg` },
      { headline: 'Operate in production', subtitle: 'We run, monitor and fix the agents every month, with a person approving every risky action and a report against your baseline.', icon: `${P}/icon-powered.svg` },
    ],
  },
  trusted: {
    headline: 'Built to Be Trusted.',
    image: `${P}/trusted-filled.webp`,
    overlay: [{ style: 'h6', text: 'Top 1% on Clutch Global and Top AI Strategy Company 2025, Vahue delivers AI systems that meet the highest standards for security, oversight, and operational reliability.' }], // FROM OLD SITE: confirm
    trustedBy: 'Recognized by',
    logos: [
      { alt: 'Clutch Top AI Strategy Company 2025', src: '/awards/clutch-ai-strategy-2025.webp', plain: true }, // FROM OLD SITE: confirm
      { alt: 'Clutch Champion Fall 2024', src: '/awards/clutch-fall-champion-2024.webp', plain: true }, // FROM OLD SITE: confirm
      { alt: 'Inc. 5000', src: '/awards/inc-5000.webp', plain: true }, // FROM OLD SITE: confirm
    ],
    cards: [
      {
        title: 'Security & Compliance',
        description: 'SOC 2, ISO 27001, ISO 42001, HIPAA and GDPR, with strict data controls and privacy safeguards.',
        icon: `${P}/icon-security.svg`,
        hover: { tailwindClass: 'cloud-slate', hex: '#839CB2' },
        link: { url: '/security', text: 'Learn more' },
      },
      {
        title: 'Reliable Agentic Execution',
        description: 'Agents read the work, find the context, apply your rules and update your systems. Every risky action waits for a person.',
        icon: `${P}/icon-agentic.svg`,
        hover: { tailwindClass: 'foundry-tan', hex: '#A8927C' },
      },
      {
        title: 'Model Agnostic Flexibility',
        description: 'The right model for every use case. Our stack integrates seamlessly with any frontier model or custom open-source.',
        icon: `${P}/icon-model.svg`,
        hover: { tailwindClass: 'archive-purple', hex: '#79648C' },
        link: { url: '/services/context-and-integrations', text: 'Learn more' },
      },
    ],
  },
  closing: { headline: 'When it has to work, it starts with Vahue.', cta: { url: '/demo', text: 'Speak with An Expert' }, image: `${P}/prefooter-filled.webp` },
}
