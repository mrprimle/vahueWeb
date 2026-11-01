// Scale's copy under the 80% rule for /data-engine ("Vahue Context Engine" in the menu). Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { DataEngineContent, LogoItem } from './types'

const logo = (key: string, width: number, height: number): LogoItem => ({ key, alt: 'Logo', width, height })

export const content: DataEngineContent = {
  meta: {
    title: 'Vahue Context Engine | AI Agents at Scale | Vahue',
    description: 'Collect, Curate, and annotate data. Build agents and evaluate. Repeat.',
  },
  hero: {
    headline: 'Context Engine',
    body: 'Collect, Curate, and annotate data. Build agents and evaluate. Repeat.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: '/data-engine/hero.webp' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
  },
  logos: [
    logo('customer-1', 90, 23), // PLACEHOLDER
    logo('customer-2', 100, 24), // PLACEHOLDER
    logo('customer-3', 100, 20), // PLACEHOLDER
    logo('customer-4', 112, 20), // PLACEHOLDER
    logo('customer-5', 111, 23), // PLACEHOLDER
    logo('customer-6', 60, 24), // PLACEHOLDER
    logo('customer-7', 100, 24), // PLACEHOLDER
  ],
  best: {
    title: 'The Best In The Business',
    body: "The Vahue Context Engine is trusted by the world's leading operations teams to accelerate the development of their agents.", // PLACEHOLDER
    image: { src: '/data-engine/the-business.webp', alt: '', width: 2048, height: 2048 },
    cards: [
      { title: 'Quality', body: 'Vahue can provide the core tenet of any dataset with high-quality context from domain experts.', iconClass: 'text-archive-purple' },
      { title: 'Cost Effective', body: 'Easily find, categorize, and fix agent failures with Vahue’s Context Engine. Then, optimize run costs with high-value curated data.', iconClass: 'text-foundry-tan' },
      { title: 'Scalability', body: 'Vahue’s context engine can support any AI project from lower-volume experiments to high-volume production projects. Scale up, or down, as needed.', iconClass: 'text-atlas-blue' },
      { title: 'Diversity', body: 'Vahue delivers the greatest variety and diversity of data to help deliver the greatest value to your agent performance.', iconClass: 'text-evergreen' },
    ],
  },
  caseStudy: {
    overtitle: 'Customer Case Study',
    description: 'An insurer and Vahue partnered to transform claims workflows with generative AI experiences built for a global audience.', // PLACEHOLDER
    cta: { text: 'Read customer story', url: '/enterprise/insurance' },
    tileClass: 'bg-evergreen',
    logo: { key: 'case-study', alt: 'Logo', width: 240, height: 75, className: 'text-white' }, // PLACEHOLDER
  },
  buildAi: {
    overtitle: 'Build AI',
    title: 'Powering Reliable AI',
    subtitle: 'Next Generation AI powered by world-class data.',
    showcaseTitle: 'Generative AI',
    showcaseSubtitle: 'Powering the next generation of Generative AI',
    body: 'Vahue Context Engine powers many of the most reliable agents and generative workflows in the world through world-class context, data preparation, agent evaluation, guardrails, and review.',
    primaryCta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Build AI', url: '/generative-ai-data-engine' },
    chat: {
      windowTitle: 'AI Text Generator',
      question: 'Why is human feedback necessary for accurate llm responses?',
      rankingTitle: 'Human Feedback Ranking',
      ranking: [
        'LLMs are trained by garden gnomes, who are known to lie',
        'LLMs are not always truthful or aligned with human preferences',
        'Humans enjoy giving opinions. It makes them feel important',
      ],
      answer: 'LLMs are not always truthful or aligned with human preferences.',
      userAvatar: '/data-engine/avatar.webp',
      agentAvatar: '/data-engine/llm-1.webp',
    },
  },
  whatIs: {
    overtitle: 'WHAT IS THE CONTEXT ENGINE',
    title: 'The One-Stop-Shop For Building AI',
    subtitle: 'Context engine is the process of improving AI agents with high quality, diverse and large datasets powered by experts. Unlock agent performance with the Vahue Context Engine.',
    image: { src: '/data-engine/diagram-context-loop.webp', alt: 'Your data moves through Generation, Human Review, Evaluation and Red Teaming in a loop until the agent is reliable', width: 2432, height: 1274 },
    label: 'Generative AI Context Engine',
    items: [
      { title: 'Generation', body: 'After initial setup, create complex test cases from your own history.' },
      { title: 'Human Review', body: 'Apply human preferences to agent outputs.' },
      { title: 'Red Teaming', body: 'Use prompt injection techniques to find vulnerabilities.' },
      { title: 'Evaluation', body: 'Evaluate your agent against a set of complex and diverse prompts to find weak points.' },
    ],
  },
  types: {
    overtitle: 'DATA INPUTS',
    title: 'Supported Automation Types',
    cards: [
      { title: 'Vahue Text', icon: 'text', items: ['Document Processing', 'Natural Language Processing', 'Transcription', 'Content & Language'] },
      { title: 'Vahue Image', icon: 'image', items: ['Scanned Documents', 'Photos & Drawings', 'Transcription'] },
      { title: 'Vahue Voice', icon: 'video', items: ['Inbound Phone Calls', 'Natural Language Processing'] },
      { title: 'Vahue Cross-system Sync', icon: 'cube', items: ['CRM & ERP'] },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Context Engine',
    items: [
      { id: 'pilot-to-production', overtitle: 'Blog', title: 'Why Do AI Pilots Stall?', image: { src: '/data-engine/01.png', alt: 'Human feedback' }, description: 'Most pilots work in the demo and stall in production. Understand the role human feedback and clean context play in getting agents live, and how to measure it against a baseline.', link: '/blog' },
      { id: 'guide-data-preparation', overtitle: 'Guide', title: 'Guide to Data Preparation', image: { src: '/data-engine/02.png', alt: 'Blur' }, description: 'The success of AI agents is dependent on data and context quality. Read our authoritative guide to ensure you get the highest quality context.', link: '/guides' },
      { id: 'guide-document-intake', overtitle: 'Guide', title: 'Guide: Document Intake', image: { src: '/data-engine/03.png' }, description: 'Document Intake focuses on developing agents that can read, check, and make sense of incoming invoices, claims and forms. Read our guide to learn how it works and top use cases by industry.', link: '/guides' },
      { id: 'guide-building-agents', overtitle: 'Guide', title: 'Guide: Building & Testing Agents', image: { src: '/data-engine/04.png' }, description: 'AI agents take data as inputs and deliver a classification, a prediction, or some other indicator as an output. Read our guide to learn more about how to evaluate agents.', link: '/guides' },
    ],
  },
  testimonials: {
    heading: "Don't just take our word for it",
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    items: [
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: 'Vahue has made it easier for us to clear our backlog at a good price point. The UI is simple to navigate, and the built in evaluation pipeline and batch options saves us time and helps enforce best practices so that we can get high-quality agent output.', // PLACEHOLDER
      },
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Build AI', url: '/generative-ai-data-engine' },
    image: { path: '/data-engine/prefooter.webp' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
  },
}
