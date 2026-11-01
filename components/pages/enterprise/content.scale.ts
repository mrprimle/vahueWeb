// Scale's original strings for https://scale.com/enterprise, read from the page's RSC payload.
import type { EnterpriseContent } from './types'

const P = '/enterprise'
const logo = (alt: string, file: string) => ({ alt, src: `${P}/logos/${file}.png` })

export const content: EnterpriseContent = {
  meta: {
    title: 'Agentic Solutions for Enterprise | Scale AI',
    description: 'Enterprises trust Scale to build, deploy and operate AI systems that perform in production.',
  },
  hero: {
    headline: 'Reliable AI for the decisions your business runs on.',
    subtitle: [{ style: 'normal', text: 'Enterprises trust Scale to build, deploy and operate AI systems that perform in production.' }],
    cta: { url: '/demo', text: 'Schedule a consult' },
    scrollLabel: 'Scroll to explore',
    images: [
      { path: `${P}/hero-energy.webp`, label: 'Energy', color: '#a78955' },
      { path: `${P}/hero-infrastructure.webp`, label: 'Infrastructure', color: '#a37757' },
      { path: `${P}/hero-insurance.webp`, label: 'Insurance', color: '#548ca4' },
      { path: `${P}/hero-health.webp`, label: 'Health', color: '#548499' },
      { path: `${P}/hero-consumer.webp`, label: 'Consumer', color: '#9f6f55' },
      { path: `${P}/hero-retail.webp`, label: 'Retail', color: '#9e6b5f' },
      { path: `${P}/hero-life-science.webp`, label: 'Life Science', color: '#917f6f' },
    ],
  },
  pullApart: {
    logoTexture: `${P}/pull-apart-logo.png`,
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
    headline: 'Scale bridges the gap between AI models & business outcomes',
    subtitle: [{ style: 'normal', text: 'By connecting your data and models with tangible human feedback, we create workflows into systems that continuously improve over time.' }],
    trustedBy: 'Trusted by',
    logos: [logo('TIME', 'time'), logo('Paramount Logo', 'paramount'), logo('Mayo Clinic', 'mayo'), logo('Rocket Companies', 'rocket-companies'), logo('BP Logo', 'bp'), logo('Meta', 'meta')],
    video: { webm: `${P}/squares.webm`, mov: `${P}/squares-hevc.mp4`, poster: `${P}/squares-poster.webp`, name: 'Squares' },
  },
  blog: {
    heading: 'Your experts, amplified. Your limits, redefined.',
    posts: [
      { title: 'Beyond "Out-of-the-Box": Why Enterprises Need Specialized RL Agents', url: '/blog/enterprise-rl-agents', image: `${P}/blog-rl.webp`, category: { name: 'Research', color: { hex: '#273252' } } },
      { title: "How Morgan Stanley deploys AI that actually works (hint: it's evals) | Human in the Loop: Episode 13", url: '/blog/hitl-ep13-ai-evals-in-practice', image: `${P}/blog-evals.webp`, category: { name: 'Company' } },
      { title: 'Turn Insurance Documents Into Intelligence', url: '/enterprise/insurance', image: `${P}/blog-insurance.webp`, category: { name: 'Enterprise' } },
      { title: 'Reliable AI for the Future of Healthcare', url: '/enterprise/healthcare', image: `${P}/blog-healthcare.webp`, category: { name: 'Healthcare' } },
    ],
  },
  logoCloud: {
    headline: "Trusted by the world's most ambitious enterprises.",
    logos: [
      logo('NVIDIA', 'nvidia'),
      logo('British Petroleum Logo', 'british-petroleum'),
      logo('Mayo Clinic', 'mayo'),
      logo('Paramount Logo', 'paramount'),
      logo('TIME', 'time'),
      logo('Howard Hughes logo', 'howard-hughes'),
      logo('Cengage', 'cengage'),
      logo('Shore Capital', 'shore-capital'),
      logo('Rocket Logo', 'rocket'),
    ],
  },
  results: {
    heading: 'Real customers, real results.',
    cards: [
      { label: 'Time Saved', stat: '93%', description: 'faster contract reviews for legal clients (15 hours > 1 hour)', icon: 'time' },
      { label: 'Revenue', stat: '$64M+', description: 'revenue growth after implementing Gen AI recommendations.', icon: 'revenue' },
      { label: 'Accuracy', stat: '100%', description: 'source-cited, regulator-defensive audit-trail.', icon: 'accuracy' },
      { label: 'Adoption', stat: '36,000+', description: 'customer retention within 3 months of rollout.', icon: 'adoption' },
      { label: 'Delivery Speed', stat: '6 weeks', description: 'production timeline to implement Scale AI in your system.', icon: 'speed' },
    ],
  },
  testimonials: {
    heading: "Don't just take our word for it",
    items: [
      {
        clientName: 'Jessica Sibley',
        title: 'CEO, Time',
        testimonial: "We have a lot more to do. We have an exciting roadmap ahead that we will be announcing shortly, and we're going to continue to be partnering with Scale AI, and I'm really excited about that.",
        logo: logo('TIME', 'time'),
      },
      {
        clientName: 'Padma Elmgart',
        title: 'CTO, Global Atlantic Financial Group',
        testimonial:
          'We wanted to not just stand up a demo or POC, but deploy production-ready use cases and infrastructure. With Scale GenAI Platform, we were able to quickly launch our first use case: a GenAI solution that makes it easy for users across Global Atlantic to get information out of our Enterprise Data Hub. This is enabling data-driven decision making and shortening the time to insights from days or weeks down to seconds.',
        logo: logo('Global Atlantic Logo', 'global-atlantic'),
      },
      {
        clientName: 'Carlos Olea',
        title: 'CFO, Howard Hughes',
        testimonial: 'Scale AI is really the backbone of our AI success. It\'s critical and I\'m excited to keep building forward that relationship and delivering more for Howard Hughes." - Carlos Olea, CFO, Howard Hughes.',
        logo: logo('Howard Hughes logo', 'howard-hughes'),
      },
    ],
  },
  race: {
    heading: [{ style: 'h2', text: 'The race is on.' }],
    left: [{ style: 'h4', text: 'Everyone is using AI. But only Scale makes it uniquely yours.' }],
    right: [{ style: 'normal', text: 'Most AI gets smarter for everyone. Dialect learns from your experts every day, turning their judgment into a compounding advantage that grows more powerful, and more uniquely yours, over time.' }],
    cta: { url: '/demo', text: 'Learn More' },
    video: `${P}/cables.mp4`,
  },
  pillars: {
    heading: [{ style: 'h3', text: 'Three Pillars.\nOne Unfair Advantage.' }],
    video: `${P}/stacking.mp4`,
    cards: [
      { headline: 'Integrated experts', subtitle: 'We embed directly in your organization to help you identify the right use cases and build them correctly from your office, not ours.', icon: 'experts', color: '#A8927C' },
      { headline: 'Technology', subtitle: 'Our platform and internal tooling are built to move fast, ready to stand up in your environment within a day of a demo.', icon: 'technology', color: '#839CB2' },
      { headline: 'Applied AI Research', subtitle: "Our frontier research team isn't just following the technology, they're building and evaluating it alongside the labs that make it.", icon: 'research', color: '#193A29' },
    ],
  },
  poweredBy: {
    headline: 'Powered by the Scale Generative AI Platform',
    subtitle: [{ style: 'normal', text: 'Agentic solutions are built and deployed on Scale’s platform, enabling the full lifecycle of AI systems – from development to real-world operation.' }],
    cta: { url: '/genai-platform', text: 'Learn More' },
    image: { path: `${P}/platform.webp`, alt: 'AI Platform' },
    cards: [
      { headline: 'Build & Improve AI Systems', subtitle: 'Create, evaluate, and refine AI systems with the data, feedback, and workflows needed to make them reliable.', icon: `${P}/icon-powered.svg` },
      { headline: 'Deploy & run in production', subtitle: 'Integrate AI into your business workflows and operate it reliably—with the controls needed to scale safely.', icon: `${P}/icon-powered.svg` },
    ],
  },
  trusted: {
    headline: 'Built to Be Trusted.',
    image: `${P}/trusted.webp`,
    overlay: [{ style: 'h6', text: 'Trusted by government and defense operations, Scale delivers AI systems that meet the highest standards for security, oversight, and operational reliability.' }],
    trustedBy: 'Trusted by',
    logos: [logo('The White House', 'white-house'), logo('U.S. Army', 'us-army'), logo('US Airforce', 'us-airforce')],
    cards: [
      {
        title: 'Security & Compliance',
        description: 'Enterprise-grade security with strict data controls, privacy safeguards, and compliance with industry standards.',
        icon: `${P}/icon-security.svg`,
        hover: { tailwindClass: 'cloud-slate', hex: '#839CB2' },
        link: { url: '/security', text: 'Learn more' },
      },
      {
        title: 'Reliable Agentic Execution',
        description: 'Scale gives autonomous agents a framework to execute complex, multi-step operations across your enterprise.',
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
  closing: { headline: 'When it has to work, it starts with Scale.', cta: { url: '/demo', text: 'Speak with An Expert' }, image: `${P}/prefooter.webp` },
}
