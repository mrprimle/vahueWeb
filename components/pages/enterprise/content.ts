// Filled copy for /enterprise. Same shape as content.scale.ts. Keep rule: Scale's line stays unless it is false for Vahue.
// Lines marked PLACEHOLDER are for Mike to replace with real numbers, clients, quotes and logos.
import type { EnterpriseContent, EnterpriseLogo } from './types'

const P = '/enterprise'
const LOGO: EnterpriseLogo = { alt: 'Logo' } // PLACEHOLDER

export const content: EnterpriseContent = {
  meta: {
    title: 'Agentic Solutions for Enterprise | Vahue',
    description: 'Enterprises trust Vahue to build, deploy and operate AI systems that perform in production.',
  },
  hero: {
    headline: 'Reliable AI for the decisions your business runs on.',
    subtitle: [{ style: 'normal', text: 'Enterprises trust Vahue to build, deploy and operate AI systems that perform in production.' }],
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
        subheading: [{ style: 'normal', text: 'Models are powerful, but turning them into reliable systems is the challenge.' }],
      },
      {
        headline: [{ style: 'normal', text: 'We turn models into reliable systems' }],
        subheading: [{ style: 'normal', text: 'From rebuilding infrastructure to redesigning workflows, we connect your operation with solutions that transform.' }],
      },
    ],
  },
  bridge: {
    headline: 'Vahue bridges the gap between AI models & business outcomes',
    subtitle: [{ style: 'normal', text: 'By connecting your data and models with tangible human feedback, we turn workflows into systems that continuously improve over time.' }],
    trustedBy: 'Trusted by',
    logos: [LOGO, LOGO, LOGO, LOGO, LOGO, LOGO], // PLACEHOLDER
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
    headline: "Trusted by the world's most ambitious enterprises.", // PLACEHOLDER
    logos: [LOGO, LOGO, LOGO, LOGO, LOGO, LOGO, LOGO, LOGO, LOGO], // PLACEHOLDER
  },
  results: {
    heading: 'Real customers, real results.',
    cards: [
      { label: 'Time Saved', stat: '93%', description: 'faster invoice reviews for finance teams (15 hours > 1 hour)', icon: 'time' }, // PLACEHOLDER
      { label: 'Cost', stat: '$4M+', description: 'cost removed after implementing agents across finance reconciliations.', icon: 'revenue' }, // PLACEHOLDER
      { label: 'Accuracy', stat: '100%', description: 'source-cited, regulator-defensive audit-trail.', icon: 'accuracy' }, // PLACEHOLDER
      { label: 'Adoption', stat: '36,000+', description: 'cases handled without a person within 3 months of rollout.', icon: 'adoption' }, // PLACEHOLDER
      { label: 'Delivery Speed', stat: '6 weeks', description: 'production timeline to implement Vahue AI in your system.', icon: 'speed' }, // PLACEHOLDER
    ],
  },
  testimonials: {
    heading: "Don't just take our word for it",
    items: [
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Head of Support, Company', // PLACEHOLDER
        testimonial: "Customers used to wait two to five days for a reply. Now our agent resolves 97% of conversations instantly, and we didn't need a third hire. I genuinely don't think we'd function without it.", // PLACEHOLDER
        logo: LOGO,
      },
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'CTO, Company', // PLACEHOLDER
        testimonial:
          'We wanted to not just stand up a demo or POC, but deploy production-ready use cases and infrastructure. With Vahue, we were able to quickly launch our first use case: an agent that makes it easy for users across the business to get information out of our own documents and systems. This is enabling data-driven decision making and shortening the time to insights from days or weeks down to seconds.', // PLACEHOLDER
        logo: LOGO,
      },
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'CFO, Company', // PLACEHOLDER
        testimonial: "Vahue is really the backbone of our AI success. It's critical and I'm excited to keep building forward that relationship and delivering more for our operations team every single month.", // PLACEHOLDER
        logo: LOGO,
      },
    ],
  },
  race: {
    heading: [{ style: 'h2', text: 'The race is on.' }],
    left: [{ style: 'h4', text: 'Everyone is using AI. But only Vahue makes it truly yours.' }],
    right: [{ style: 'normal', text: 'Most AI gets smarter for everyone. Vahue learns from your experts every day, turning their judgment into a compounding advantage that grows more powerful, and more uniquely yours, over time.' }],
    cta: { url: '/demo', text: 'Learn More' },
    video: `${P}/cables.mp4`,
  },
  pillars: {
    heading: [{ style: 'h3', text: 'Three Pillars.\nOne Unfair Advantage.' }],
    video: `${P}/stacking.mp4`,
    cards: [
      { headline: 'Integrated experts', subtitle: 'We embed directly in your organization to identify the right use cases, build them from your office, not ours, and stay to run them.', icon: 'experts', color: '#A8927C' },
      { headline: 'Technology', subtitle: 'Our platform and internal tooling are built to move fast, ready to stand up in your environment within a day of a demo.', icon: 'technology', color: '#839CB2' },
      { headline: 'Applied AI Research', subtitle: "Our applied research team isn't just following the technology, they're building and evaluating it on your own past cases.", icon: 'research', color: '#193A29' },
    ],
  },
  poweredBy: {
    headline: 'Powered by the Vahue Agentic AI Platform',
    subtitle: [{ style: 'normal', text: 'Agentic solutions are built and deployed on Vahue’s platform, enabling the full lifecycle of AI systems – from development to real-world operation.' }],
    cta: { url: '/genai-portfolio', text: 'Learn More' },
    image: { path: `${P}/platform.webp`, alt: 'AI Platform' },
    cards: [
      { headline: 'Build & Improve AI Systems', subtitle: 'Create, evaluate, and refine AI systems with the data, feedback, and workflows needed to make them reliable.', icon: `${P}/icon-powered.svg` },
      { headline: 'Deploy & run in production', subtitle: 'Integrate AI into your business workflows and operate it reliably—with the controls needed to scale safely.', icon: `${P}/icon-powered.svg` },
    ],
  },
  trusted: {
    headline: 'Built to Be Trusted.',
    image: `${P}/trusted-filled.webp`,
    overlay: [{ style: 'h6', text: 'Trusted by finance and support operations, Vahue delivers AI systems that meet the highest standards for security, oversight, and operational reliability.' }], // PLACEHOLDER
    trustedBy: 'Trusted by',
    logos: [LOGO, LOGO, LOGO], // PLACEHOLDER
    cards: [
      {
        title: 'Security & Compliance',
        description: 'Enterprise-grade security with strict data controls, privacy safeguards, and compliance with industry standards.', // PLACEHOLDER
        icon: `${P}/icon-security.svg`,
        hover: { tailwindClass: 'cloud-slate', hex: '#839CB2' },
        link: { url: '/security', text: 'Learn more' },
      },
      {
        title: 'Reliable Agentic Execution',
        description: 'Vahue gives autonomous agents a framework to execute complex, multi-step operations across your enterprise.',
        icon: `${P}/icon-agentic.svg`,
        hover: { tailwindClass: 'foundry-tan', hex: '#A8927C' },
      },
      {
        title: 'Model Agnostic Flexibility',
        description: 'The right model for every use case. Our stack integrates seamlessly with any frontier model or custom open-source.',
        icon: `${P}/icon-model.svg`,
        hover: { tailwindClass: 'archive-purple', hex: '#79648C' },
        link: { url: '/generative-ai-data-engine', text: 'Learn more' },
      },
    ],
  },
  closing: { headline: 'When it has to work, it starts with Vahue.', cta: { url: '/demo', text: 'Speak with An Expert' }, image: `${P}/prefooter-filled.webp` },
}
