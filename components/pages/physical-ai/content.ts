// Scale's copy under the 80% rule for /physical-ai ("For Document Intake" in the menu). Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { MarqueeLogoItem, PhysicalAiContent } from './types'

const card = (slug: string, alt: string) => ({ src: `/physical-ai/${slug}.webp`, alt, width: 480, height: 360 })
const logo = (i: number): MarqueeLogoItem => ({ key: `customer-${i}`, alt: 'Logo', src: null })

export const content: PhysicalAiContent = {
  meta: { title: 'Document Intake | Vahue', description: 'Building the Context Engine for Document Intake' },
  hero: {
    headline: 'Document Intake Agents',
    body: 'Powering the Next Generation of Operations',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: '/physical-ai/hero-documents.webp' },
    logos: {
      label: "Trusted by the world's most ambitious AI teams", // PLACEHOLDER
      items: [logo(1), logo(2), logo(3), logo(4), logo(5)], // PLACEHOLDER
    },
  },
  overview: {
    overtitle: 'Product Overview',
    title: 'The Context Engine for Documents',
    features: [
      { icon: 'globe', title: 'Global Intake Network', body: 'Real-world high-quality data from a global network of inboxes, forms and portals, distributed document sources, and operating businesses' },
      { icon: 'bolt', title: 'Unmatched Scalability', body: 'Scale to thousands of documents. Ingest peak-volume data through networking infrastructure engineered for maximum throughput.' },
      { icon: 'diversity', title: 'Data Diversity Guaranteed', body: 'Improve agent robustness by testing on data collected from different formats, systems, and tasks.' },
      { icon: 'verified', title: 'Validated Performance Gains', body: 'Datasets enriched with context and grounding annotations that are proven to improve agent performance.' },
    ],
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    colorTheme: { tailwindClass: 'evergreen', hex: '#193A29', contrastColor: '#ffffff' },
    items: [
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: "Vahue has been a trusted partner in making abundant, high-quality, custom data. We're excited to be working with them on the future of document intake", // PLACEHOLDER
      },
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: "At our firm, our mission is to deploy AI agents at scale through our ops team. I feel fortunate to have worked with the Vahue team in the past and know first-hand that Vahue is unique in its ability to quickly adapt to the needs of their partners. We're excited by the work Vahue has already done in building this data set and look forward to partnering to raise the bar for quality in document intake.", // PLACEHOLDER
      },
    ],
  },
  useCase: {
    overtitle: 'Use Case',
    title: 'Break Through the Document Bottleneck',
    heading: 'Expansive Workflows',
    paragraphs: [
      "1000+ hours of diverse document data are collected and uploaded to Vahue's data platform every day.", // PLACEHOLDER
      'Leverage our platform to accelerate your program and supercharge agent performance.',
    ],
    image: { src: '/physical-ai/use-case-documents.png', alt: '', width: 1214, height: 636 },
  },
  embodiments: {
    overtitle: 'Key Features',
    title: 'Growing Document Portfolio',
    subtitle: 'Access data from invoices, claims and reports calibrated for performant intake operations.',
    cards: [
      { title: 'Invoices and Claims', body: 'Field-level extraction from industry-standard documents', image: card('img-portfolio-1', 'Invoices and Claims') },
      { title: 'Vahue Harness', body: 'Agent platform designed for distributed document collection', image: card('img-portfolio-2', 'Vahue Harness') },
      { title: 'Bespoke Document Types', body: 'Your formats, managed and operated by Vahue', image: card('img-portfolio-3', 'Bespoke Document Types') },
    ],
  },
  environments: {
    overtitle: '',
    title: 'Expansive Global Environments',
    subtitle: 'Train on data collected from diverse locations around the world.',
    cards: [
      { title: 'Inboxes and Portals', body: 'High-volume centralized collection operations', image: card('img-sources-1', 'Inboxes and Portals') },
      { title: 'Remote Teams', body: 'Remote review with globally-distributed operations teams', image: card('img-sources-2', 'Remote Teams') },
      { title: 'Commercial and Industrial', body: 'In-field deployments of intake agents', image: card('img-sources-3', 'Commercial and Industrial') },
    ],
  },
  annotations: {
    image: { src: '/physical-ai/review.webp', alt: '', width: 627, height: 458 },
    title: 'Multi-Modal Grounding Annotations',
    body: 'Unlock the full potential of your document data with best-in-class annotations and human-expert feedback on all outputs.',
  },
  improvements: {
    title: 'Proven Agent Improvements',
    paragraphs: [
      "Agents go through Vahue's internal fine-tuning and evaluation process before going live.",
      'Run agents with the reassurance that they have produced measurable performance improvements.',
    ],
    chart: {
      ariaLabel: 'Chart: agent performance improves significantly with validated and annotated data vs raw data',
      yLabel: 'Agent Performance',
      xLabel: 'Data Volume',
      // PLACEHOLDER: curve shapes are Scale's, illustrative until Mike has pilot data.
      series: [
        { id: 'raw', label: ['Raw Data'], color: '#E05533', ceiling: 0.4, delay: 0, duration: 1.6 },
        { id: 'validated', label: ['Validated Data'], color: '#7B6FF0', ceiling: 0.65, delay: 0.3, duration: 1.6 },
        { id: 'annotated', label: ['Validated Data', 'with Annotations'], color: '#52C041', ceiling: 0.9, delay: 0.6, duration: 1.6 },
      ],
    },
  },
  difference: {
    overtitle: '',
    title: 'The Vahue Difference',
    features: [
      { icon: 'support', title: 'Responsive White Glove Service', body: 'Engagements are supported by a dedicated engineering and operations team that runs at your pace.' },
      { icon: 'science', title: 'In-house AI Engineers', body: 'An internal team of experienced engineers will work with you to produce agent specifications tailored to your program.' },
      { icon: 'partners', title: 'Deep Technical Partnerships', body: 'Our data platform supports cutting-edge operations teams and industry leaders such as insurers and distributors.' }, // PLACEHOLDER
      { icon: 'quality', title: 'Quality Guarantees', body: 'Rigorous schema calibration and data validation protocols ensure that only the highest quality data is available on our platform.' },
      { icon: 'pin', title: 'Born in Pilots; Scaled Globally', body: 'Intake agents are developed, tested, and validated in shadow mode on your real cases before deployment to your global network of teams.' },
      { icon: 'security', title: 'Security and Compliance', body: 'Our infrastructure supports GDPR, CCPA, and customer-specific audit requirements with optional onshore data processing. We are SOC 2 Type II and ISO 27001 certified.' }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Build AI', url: '/generative-ai-data-engine' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: '/physical-ai/prefooter.webp' },
  },
}
