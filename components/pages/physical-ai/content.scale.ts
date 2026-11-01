// Scale's strings for https://scale.com/physical-ai, read from the live RSC payload on 2026-11-01.
import type { PhysicalAiContent } from './types'

const card = (slug: string, alt: string) => ({ src: `/physical-ai/${slug}.webp`, alt, width: 480, height: 360 })

export const content: PhysicalAiContent = {
  meta: { title: 'Physical AI | Scale AI', description: 'Building the Data Foundry for Physical AI' },
  hero: {
    headline: 'Physical AI Data Engine',
    body: 'Powering the Next Generation of Robotics',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: '/physical-ai/hero.webp' },
    logos: {
      label: "Trusted by the world's most ambitious AI teams",
      items: [
        { key: 'Physical Intelligence', alt: 'Physical Intelligence', src: '/physical-ai/logos/physical-intelligence.svg' },
        { key: 'Generalist', alt: 'Generalist', src: '/physical-ai/logos/generalist.svg' },
        { key: 'Walden Robotics', alt: 'Walden Robotics', src: '/physical-ai/logos/walden.svg' },
        { key: 'Cobot', alt: 'Cobot', src: '/physical-ai/logos/cobot.svg' },
        { key: 'Dyna', alt: 'Dyna', src: '/physical-ai/logos/dyna.png' },
      ],
    },
  },
  overview: {
    overtitle: 'Product Overview',
    title: 'The Data Engine for Physical AI',
    features: [
      { icon: 'globe', title: 'Global Collection Network', body: 'Real-world high-quality data from a global network of robotics data factories, distributed data collectors, and operating businesses' },
      { icon: 'bolt', title: 'Unmatched Scalability', body: 'Scale to thousands of collectors. Ingest petabyte-scale data through networking infrastructure engineered for maximum throughput.' },
      { icon: 'diversity', title: 'Data Diversity Guaranteed', body: 'Improve model robustness by training on data collected from different embodiments, environments, and tasks.' },
      { icon: 'verified', title: 'Validated Performance Gains', body: 'Datasets enriched with context and grounding annotations that are proven to improve model performance.' },
    ],
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    colorTheme: { tailwindClass: 'evergreen', hex: '#193A29', contrastColor: '#ffffff' },
    items: [
      {
        clientName: 'Pete Florence',
        title: 'Co-Founder & CEO',
        testimonial: "Scale has been a trusted partner in making abundant, high-quality, custom data. We're excited to be working with them on the future of physical AI",
      },
      {
        clientName: 'Brad Porter',
        title: 'CEO & Founder',
        testimonial: "At Cobot, our mission is to deploy physical AI at scale through our robot, Proxie. I feel fortunate to have worked with the Scale team in the past and know first-hand that Scale is unique in its ability to quickly adapt to the needs of their partners. We're excited by the work Scale has already done in building this data set and look forward to partnering to push the data frontier in physical AI.",
      },
    ],
  },
  useCase: {
    overtitle: 'Use Case',
    title: 'Break Through the Robotics Data Bottleneck',
    heading: 'Expansive Environments',
    paragraphs: [
      "1000+ hours of diverse demonstration data are collected and uploaded to Scale's data platform every day.",
      'Leverage our platform to accelerate your program and supercharge model performance.',
    ],
    image: { src: '/physical-ai/use-case.png', alt: '', width: 1214, height: 636 },
  },
  embodiments: {
    overtitle: 'Key Features',
    title: 'Growing Embodiment Portfolio',
    subtitle: 'Access data from advanced hardware platforms calibrated for performant collection operations.',
    cards: [
      { title: 'Bimanual Manipulators', body: 'Tele-operated demonstrations from industry-leading robots', image: card('img-embodiment-1', 'Bimanual Manipulators') },
      { title: 'Scale Harness', body: 'Robotless egocentric platform designed for distributed dextrous collection', image: card('img-embodiment-2', 'Scale Harness') },
      { title: 'Bespoke Collection Platforms', body: 'Your hardware, managed and operated by Scale', image: card('img-embodiment-3', 'Bespoke Collection Platforms') },
    ],
  },
  environments: {
    overtitle: '',
    title: 'Expansive Global Environments',
    subtitle: 'Train on data collected from diverse locations around the world.',
    cards: [
      { title: 'Data Factories', body: 'High-volume centralized collection operations', image: card('img-environment-1', 'Data Factories') },
      { title: 'Residential', body: 'At-home collection with globally-distributed collectors', image: card('img-environment-2', 'Residential') },
      { title: 'Commercial and Industrial', body: 'In-field deployments of collection platforms', image: card('img-environment-3', 'Commercial and Industrial') },
    ],
  },
  annotations: {
    image: { src: '/physical-ai/multimodal.webp', alt: '', width: 627, height: 458 },
    title: 'Multi-Modal Grounding Annotations',
    body: 'Unlock the full potential of your robotics data with best-in-class annotations and human-expert feedback on all demonstrations.',
  },
  improvements: {
    title: 'Proven Model Improvements',
    paragraphs: [
      "Datasets go through Scale's internal policy fine-tuning and evaluation process before listing.",
      'Train on datasets with the reassurance that they have produced measurable performance improvements.',
    ],
    chart: {
      ariaLabel: 'Chart: model performance improves significantly with validated and annotated data vs raw data',
      yLabel: 'Model Performance',
      xLabel: 'Data Volume',
      series: [
        { id: 'raw', label: ['Raw Data'], color: '#E05533', ceiling: 0.4, delay: 0, duration: 1.6 },
        { id: 'validated', label: ['Validated Data'], color: '#7B6FF0', ceiling: 0.65, delay: 0.3, duration: 1.6 },
        { id: 'annotated', label: ['Validated Data', 'with Annotations'], color: '#52C041', ceiling: 0.9, delay: 0.6, duration: 1.6 },
      ],
    },
  },
  difference: {
    overtitle: '',
    title: 'The Scale Difference',
    features: [
      { icon: 'support', title: 'Responsive White Glove Service', body: 'Engagements are supported by a dedicated engineering and operations team that runs at your pace.' },
      { icon: 'science', title: 'In-house Robotics Researchers', body: 'An internal team of experienced roboticists will work with you to produce data specifications tailored to your program.' },
      { icon: 'partners', title: 'Deep Technical Partnerships', body: 'Our data platform supports cutting-edge robotics labs and industry leaders such as Generalist and Physical Intelligence.' },
      { icon: 'quality', title: 'Quality Guarantees', body: 'Rigorous sensor calibration and data validation protocols ensure that only the highest quality data is available on our platform.' },
      { icon: 'pin', title: 'Born in SF; Scaled Globally', body: 'Data collection cells are developed, tested, and validated in our San Francisco R&D lab before deployment to our global network of collection partners.' },
      { icon: 'security', title: 'Security and Compliance', body: 'Our infrastructure supports GDPR, CCPA, and customer-specific audit requirements with optional onshore data processing. We are SOC 2 Type II and ISO 27001 certified.' },
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
