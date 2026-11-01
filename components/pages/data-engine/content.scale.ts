// Scale's original strings for https://scale.com/data-engine (RSC payload, 2026-11-01).
import type { DataEngineContent } from './types'

export const scaleContent: DataEngineContent = {
  meta: {
    title: 'Scale Data Engine | AI Training Data at Scale | Scale AI',
    description: 'Collect, Curate, and annotate data. Train models and evaluate. Repeat.',
  },
  hero: {
    headline: 'Data Engine',
    body: 'Collect, Curate, and annotate data. Train models and evaluate. Repeat.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: '/data-engine/hero.webp' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
  },
  logos: [
    { key: 'Square', alt: 'Square', width: 90, height: 23, src: '/data-engine/logos/square.svg' },
    { key: 'Pinterest', alt: 'Pinterest', width: 100, height: 24, src: '/data-engine/logos/pinterest.svg' },
    { key: 'Meta', alt: 'Meta', width: 100, height: 20, src: '/data-engine/logos/meta.svg' },
    { key: 'NVIDIA', alt: 'NVIDIA', width: 112, height: 20, src: '/data-engine/logos/nvidia.svg' },
    { key: 'Instacart', alt: 'Instacart', width: 111, height: 23, src: '/data-engine/logos/instacart.svg' },
    { key: 'TIME', alt: 'TIME', width: 60, height: 24, src: '/data-engine/logos/time.svg' },
    { key: 'Cohere', alt: 'Cohere', width: 100, height: 24, src: '/data-engine/logos/cohere.svg' },
  ],
  best: {
    title: 'The Best In The Business',
    body: "The Scale Data Engine is trusted by the world's leading ML teams to accelerate the development of their models.",
    image: { src: '/data-engine/the-business.webp', alt: '', width: 2048, height: 2048 },
    cards: [
      { title: 'Quality', body: 'Scale can provide the core tenet of any dataset with high-quality labels from domain experts.', iconClass: 'text-archive-purple' },
      { title: 'Cost Effective', body: 'Easily find, categorize, and fix model failures with Scale’s Data Engine. Then, optimize labeling spend with high-value curated data.', iconClass: 'text-foundry-tan' },
      { title: 'Scalability', body: 'Scale’s data engine can support any ML project from lower-volume experiments to high-volume production projects. Scale up, or down, as needed.', iconClass: 'text-atlas-blue' },
      { title: 'Diversity', body: 'Scale delivers the greatest variety and diversity of data to help deliver the greatest value to your model performance.', iconClass: 'text-evergreen' },
    ],
  },
  caseStudy: {
    overtitle: 'Customer Case Study',
    description: 'TIME and Scale partnered to transform media publishing workflows with generative AI experiences built for a global audience.',
    cta: { text: 'Read customer story', url: '/customers/time' },
    tileClass: 'bg-[#E7131A]',
    logo: { key: 'TIME', alt: 'TIME', width: 240, height: 96, src: '/data-engine/logos/time.svg' },
  },
  buildAi: {
    overtitle: 'Build AI',
    title: 'Powering Frontier AI',
    subtitle: 'Next Generation AI powered by world-class data.',
    showcaseTitle: 'Generative AI',
    showcaseSubtitle: 'Powering the next generation of Generative AI',
    body: 'Scale Generative AI Data Engine powers many of the most advanced LLMs and generative models in the world through world-class RLHF, data generation, model evaluation, safety, and alignment.',
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
    overtitle: 'WHAT IS THE DATA ENGINE',
    title: 'The One-Stop-Shop For Building AI',
    subtitle: 'Data engine is the process of improving machine learning models with high quality, diverse and large datasets powered by experts. Unlock model performance with the Scale Data Engine.',
    image: { src: '/data-engine/diagram.webp', alt: 'LiDAR viewer desktop interface', width: 2432, height: 1274 },
    label: 'Generative AI Data Engine',
    items: [
      { title: 'Generation', body: 'After initial pre-training, create complex prompt-response pairs from scratch.' },
      { title: 'RLHF', body: 'Apply human preferences to model outputs.' },
      { title: 'Red Teaming', body: 'Use prompt injection techniques to find vulnerabilities.' },
      { title: 'Evaluation', body: 'Evaluate your model against a set of complex and diverse prompts to find weak points.' },
    ],
  },
  types: {
    overtitle: 'DATA INPUTS',
    title: 'Supported Annotation Types',
    cards: [
      { title: 'Scale Text', icon: 'text', items: ['Document Processing', 'Natural Language Processing', 'Transcription', 'Content & Language'] },
      { title: 'Scale Image', icon: 'image', items: ['Electro Optical', 'Infrared', 'Transcription'] },
      { title: 'Scale Video', icon: 'video', items: ['Full Motion Video', 'Natural Language Processing'] },
      { title: 'Scale 3D Sensor Fusion', icon: 'cube', items: ['LiDAR'] },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About The Data Engine',
    items: [
      { id: 'chatgpt-rlhf', overtitle: 'Blog', title: 'Why Is ChatGPT So Good?', image: { src: '/data-engine/01.png', alt: 'Human feedback' }, description: 'OpenAI applied reinforcement learning with human feedback (RLHF) to enhance ChatGPT. Understand the role RLHF plays in enhancing large language models and how to implement it.', link: '/blog/chatgpt-reinforcement-learning' },
      { id: 'guide-data-annotation', overtitle: 'Guide', title: 'Guide to Data Annotation', image: { src: '/data-engine/02.png', alt: 'Blur' }, description: 'The success of ML models is dependent on data and label quality. Read our authoritative guide to ensure you get the highest quality labels.', link: '/guides/data-labeling-annotation-guide' },
      { id: 'guide-computer-vision', overtitle: 'Guide', title: 'Guide: Computer Vision', image: { src: '/data-engine/03.png' }, description: 'Computer Vision focuses on developing systems that can process, analyze, and make sense of visual data. Read our guide to learn about how it works and top use cases by industry.', link: '/guides/computer-vision' },
      { id: 'guide-training-models', overtitle: 'Guide', title: 'Guide: Training & Building Models', image: { src: '/data-engine/04.png' }, description: 'ML models take data as inputs and deliver a classification, a prediction, or some other indicator as an output. Read our guide to learn more about how to train models.', link: '/guides/model-training-building' },
    ],
  },
  testimonials: {
    heading: "Don't just take our word for it",
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    items: [
      {
        clientName: 'Cassandra Ung',
        title: 'Software Engineer',
        testimonial: 'Scale has made it easier for us to gather annotations at a good price point. The UI is simple to navigate, and the built in worker evaluation pipeline and batch options saves us time and helps enforce best practices so that we can get high-quality training data.',
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
