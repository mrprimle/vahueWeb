// Filled copy for "For Regulated Teams" (finance, insurance, healthcare B2B), same shape as content.scale.ts. Keep first: Scale's string stays unless it is
// false for Vahue, brand words swap, and government or Super Intelligence content becomes the regulated-team job in the same slot. `// PLACEHOLDER` marks what Vahue can't claim yet.
import type { EvaluationPublicSectorContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const A = '/evaluation-public-sector'

export const content: EvaluationPublicSectorContent = {
  meta: {
    title: 'AI Evaluation for Regulated Teams | Vahue',
    description: 'Evaluate AI models for safety, performance, and reliability with Vahue Evaluation. Understand model limits and monitor deployments with confidence.',
  },
  hero: {
    headline: 'Regulated Teams Test & Evaluation',
    body: 'Test and evaluate AI for safety, performance, and reliability.',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Learn more', url: '/public-sector/national-security' },
    backdrop: WHITE,
    image: { path: `${A}/hero-filled.webp` },
  },
  logos: {
    copy: "Trusted by the world's most ambitious AI teams.", // PLACEHOLDER
    link: { title: 'Meet our customers', href: '/enterprise' },
    items: [
      { alt: 'Logo', width: 79, height: 22 }, // PLACEHOLDER
      { alt: 'Logo', width: 65, height: 45 }, // PLACEHOLDER
    ],
  },
  techniques: {
    overtitle: 'Evaluate Agents and AI Systems',
    title: 'Test Diverse AI Techniques',
    subtitle: 'Regulated Test & Evaluation for Document Intake and Large Language Models.',
    items: [
      { title: 'Document Intake', description: 'Measures performance and errors on claims, invoices, and KYC.', image: `${A}/computer-vision-filled.webp` },
      { title: 'Generative AI', description: 'Minimize safety risks through evaluating model skills and knowledge.', image: `${A}/generative-ai-filled.webp` },
    ],
  },
  why: {
    overtitle: 'Why Test & Evaluate AI',
    title: 'Why Test & Evaluate AI',
    subtitle: 'Protect the rights and data of your customers. Ensure AI is trusted for critical decisions and workflows.',
    items: [
      { icon: 'certainty', title: 'Rollout AI with Certainty', subtitle: 'Have confidence that AI is trustworthy, safe, and meets benchmarks' },
      { icon: 'ongoing', title: 'Ongoing Evaluation', subtitle: 'Continuously evaluate your AI models for safe updates and perpetual use' },
      { icon: 'vulnerabilities', title: 'Uncover model vulnerabilities', subtitle: 'Simulate real-world context to mitigate unwanted bias, hallucinations, and exploits' },
    ],
  },
  methodology: {
    overtitle: 'How We Evaluate',
    title: 'Test & Evaluation Methodology',
    subtitle: 'Trusted by insurers, lenders, and leading healthcare organizations.', // PLACEHOLDER
    listTitle: 'Advanced Knowledge Retrieval and Agent Evaluation Tools',
    features: [
      { title: 'Holistic evaluation that assesses AI capabilities and determines levels of AI safety', description: '' },
      { title: 'Leverage human experts and automated benchmarks to scalably and accurately evaluate models', description: '' },
      { title: 'Flexible evaluation framework to adapt to changes in regulation, use-cases, and model updates', description: '' },
    ],
    image: { src: `${A}/methodology-filled.png`, alt: 'Test and Evaluation Methodology', width: 644, height: 430, mockup: true, mockupUrl: 'evals.vahue.ai' }, // PLACEHOLDER (host in the mock browser bar)
    cta: { text: 'Read more', href: '/blog' },
  },
  platform: {
    overtitle: 'Why Vahue',
    title: 'Test & Evaluate AI Systems with Vahue Evaluation',
    subtitle: 'Vahue Evaluation is a platform encompassing the entire test & evaluation process, enabling real-time insights on performance and risks to ensure AI systems are safe.',
    cards: [
      { icon: 'sets', title: 'Bespoke Agent & AI Evaluation Sets', description: 'Unique, high-quality evaluation sets across domains and capabilities ensure accurate model assessments without overfitting.' },
      { icon: 'targeted', title: 'Targeted Evaluations', description: 'Custom evaluation sets focus on specific model concerns, enabling precise improvements via new training data.' },
      { icon: 'rater', title: 'Rater Quality', description: 'Expert human raters provide reliable evaluations, backed by transparent metrics and quality assurance mechanisms.' },
      { icon: 'product', title: 'Product Experience', description: 'User-friendly interface for analyzing and reporting on model performance across domains, capabilities, and versioning.' },
      { icon: 'reporting', title: 'Reporting Consistency', description: 'Enables standardized model evaluations for true apples-to-apples comparisons across models.' },
      { icon: 'redteam', title: 'Red-teaming Platform', description: 'Prevent GenAI risk or algorithmic discrimination by simulating adversarial prompts and exploits.' },
    ],
  },
  prefooter: {
    headline: 'Enable AI safety today!',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
