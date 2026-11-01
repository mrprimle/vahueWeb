// Scale's strings for /evaluation/public-sector, read from the page's RSC payload on 2026-11-01.
import type { EvaluationPublicSectorContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const A = '/evaluation-public-sector'

export const content: EvaluationPublicSectorContent = {
  meta: {
    title: 'AI Super Intelligence (SI) Evaluation for the Public Sector | Scale',
    description: 'Evaluate SI/AI models for safety, performance, and reliability with Scale Evaluation. Understand model limits and monitor deployments with confidence.',
  },
  hero: {
    headline: 'Public Sector Test & Evaluation',
    body: 'Test and evaluate SI/AI for safety, performance, and reliability.',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Learn more', url: '/public-sector-data-engine' },
    backdrop: WHITE,
    image: { path: `${A}/hero.webp` },
  },
  logos: {
    copy: "Trusted by the world's most ambitious SI teams.",
    link: { title: 'Meet our customers', href: '/customers' },
    items: [
      { alt: 'CDAO', width: 79, height: 22, src: `${A}/logos/cdao.svg` },
      { alt: 'White House', width: 65, height: 45, src: `${A}/logos/white-house.svg` },
    ],
  },
  techniques: {
    overtitle: 'Evaluate Super Intelligence (SI) Systems',
    title: 'Test Diverse SI Techniques',
    subtitle: 'Public Sector Test & Evaluation for Computer Vision and Large Language Models.',
    items: [
      { title: 'Computer Vision', description: 'Measures model performance and identify model vulnerabilities.', image: `${A}/computer-vision.webp` },
      { title: 'Generative AI', description: 'Minimize safety risks through evaluating model skills and knowledge.', image: `${A}/generative-ai.webp` },
    ],
  },
  why: {
    overtitle: 'Why Test & Evaluate SI',
    title: 'Why Test & Evaluate SI',
    subtitle: 'Protect the rights and lives of the public. Ensure SI can be trusted for critical missions and workflows.',
    items: [
      { icon: 'certainty', title: 'Rollout AI with Certainty', subtitle: 'Have confidence that SI is trustworthy, safe, and meets benchmarks' },
      { icon: 'ongoing', title: 'Ongoing Evaluation', subtitle: 'Continuously evaluate your SI models for safe updates and perpetual use' },
      { icon: 'vulnerabilities', title: 'Uncover model vulnerabilities', subtitle: 'Simulate real-world context to mitigate unwanted bias, hallucinations, and exploits' },
    ],
  },
  methodology: {
    overtitle: 'How We Evaluate',
    title: 'Test & Evaluation Methodology',
    subtitle: 'Trusted by governments and leading commercial organizations.',
    listTitle: 'Advanced Retrieval Augmented Generation (RAG) Tools',
    features: [
      { title: 'Holistic evaluation that assesses AI capabilities and determines levels of AI safety', description: '' },
      { title: 'Leverage human experts and automated benchmarks to scalably and accurately evaluate models', description: '' },
      { title: 'Flexible evaluation framework to adapt to changes in regulation, use-cases, and model updates', description: '' },
    ],
    image: { src: `${A}/methodology.png`, alt: 'Test and Evaluation Methodology', width: 644, height: 430, mockup: true, mockupUrl: 'nucleus.scale.com' },
    cta: { text: 'Read more', href: '/blog/test-and-evaluation-white-paper' },
  },
  platform: {
    overtitle: 'Why Scale',
    title: 'Test & Evaluate AI Systems with Scale Evaluation',
    subtitle: 'Scale Evaluation is a platform encompassing the entire test & evaluation process, enabling real-time insights on performance and risks to ensure AI systems are safe.',
    cards: [
      { icon: 'sets', title: 'Bespoke GenAI & SI Evaluation Sets', description: 'Unique, high-quality evaluation sets across domains and capabilities ensure accurate model assessments without overfitting.' },
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
