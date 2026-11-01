// Content contract for the scale.com/evaluation/public-sector layout. `scaleEvaluationPublicSectorContent` holds
// Scale's own copy (read from the live page 2026-11-01) so QA lines up 1:1; a Vahue page passes its own object.
import type { GlyphName } from './icons'

export type Cta = { label: string; href: string }
export type Img = { src: string; width: number; height: number; alt?: string }

export type EvaluationPublicSectorContent = {
  hero: { headline: string; body: string; image: string; primary: Cta; secondary: Cta }
  logos: {
    lead: string
    link: Cta
    /** Logo slots (Scale: CDAO 79×22, White House 65×45). Without `src` a same-size neutral tile stands in. */
    items: { src?: string; alt: string; width: number; height: number }[]
  }
  techniques: { eyebrow: string; title: string; body: string; cards: { title: string; body: string; image: Img }[] }
  why: { eyebrow: string; title: string; body: string; items: { icon: GlyphName; title: string; body: string }[] }
  methodology: {
    eyebrow: string
    title: string
    body: string
    mockupUrl: string
    image: Img
    heading: string
    items: string[]
    cta: Cta
  }
  whyScale: { eyebrow: string; title: string; body: string; cards: { icon: GlyphName; title: string; body: string }[] }
  prefooter: { headline: string; image: string; primary: Cta }
}

export const ASSET = '/scale-clone/evaluation-public-sector'

export const scaleEvaluationPublicSectorContent: EvaluationPublicSectorContent = {
  hero: {
    headline: 'Public Sector Test & Evaluation',
    body: 'Test and evaluate SI/AI for safety, performance, and reliability.',
    image: `${ASSET}/hero.webp`,
    primary: { label: 'Book a Demo', href: '/scale-clone/demo/' },
    secondary: { label: 'Learn more', href: '/scale-clone/public-sector-data-engine/' },
  },
  logos: {
    lead: "Trusted by the world's most ambitious SI teams.",
    link: { label: 'Meet our customers', href: '/scale-clone/' },
    items: [
      { alt: 'CDAO', width: 79, height: 22 },
      { alt: 'White House', width: 65, height: 45 },
    ],
  },
  techniques: {
    eyebrow: 'Evaluate Super Intelligence (SI) Systems',
    title: 'Test Diverse SI Techniques',
    body: 'Public Sector Test & Evaluation for Computer Vision and Large Language Models.',
    cards: [
      {
        title: 'Computer Vision',
        body: 'Measures model performance and identify model vulnerabilities.',
        image: { src: `${ASSET}/img-computer-vision-eval.webp`, width: 1752, height: 1140 },
      },
      {
        title: 'Generative AI',
        body: 'Minimize safety risks through evaluating model skills and knowledge.',
        image: { src: `${ASSET}/img-generative-ai-eval.webp`, width: 1752, height: 1141 },
      },
    ],
  },
  why: {
    eyebrow: 'Why Test & Evaluate SI',
    title: 'Why Test & Evaluate SI',
    body: 'Protect the rights and lives of the public. Ensure SI can be trusted for critical missions and workflows.',
    items: [
      { icon: 'verifiedUser', title: 'Rollout AI with Certainty', body: 'Have confidence that SI is trustworthy, safe, and meets benchmarks' },
      { icon: 'autorenew', title: 'Ongoing Evaluation', body: 'Continuously evaluate your SI models for safe updates and perpetual use' },
      {
        icon: 'searchOff',
        title: 'Uncover model vulnerabilities',
        body: 'Simulate real-world context to mitigate unwanted bias, hallucinations, and exploits',
      },
    ],
  },
  methodology: {
    eyebrow: 'How We Evaluate',
    title: 'Test & Evaluation Methodology',
    body: 'Trusted by governments and leading commercial organizations.',
    mockupUrl: 'nucleus.scale.com',
    image: { src: `${ASSET}/img-rag-methodology.webp`, width: 1400, height: 934 },
    heading: 'Advanced Retrieval Augmented Generation (RAG) Tools',
    items: [
      'Holistic evaluation that assesses AI capabilities and determines levels of AI safety',
      'Leverage human experts and automated benchmarks to scalably and accurately evaluate models',
      'Flexible evaluation framework to adapt to changes in regulation, use-cases, and model updates',
    ],
    cta: { label: 'Read more', href: '/scale-clone/blog/' },
  },
  whyScale: {
    eyebrow: 'Why Scale',
    title: 'Test & Evaluate AI Systems with Scale Evaluation',
    body: 'Scale Evaluation is a platform encompassing the entire test & evaluation process, enabling real-time insights on performance and risks to ensure AI systems are safe.',
    cards: [
      {
        icon: 'tune',
        title: 'Bespoke GenAI & SI Evaluation Sets',
        body: 'Unique, high-quality evaluation sets across domains and capabilities ensure accurate model assessments without overfitting.',
      },
      {
        icon: 'personSearch',
        title: 'Targeted Evaluations',
        body: 'Custom evaluation sets focus on specific model concerns, enabling precise improvements via new training data.',
      },
      {
        icon: 'barChart',
        title: 'Rater Quality',
        body: 'Expert human raters provide reliable evaluations, backed by transparent metrics and quality assurance mechanisms.',
      },
      {
        icon: 'gpsFixed',
        title: 'Product Experience',
        body: 'User-friendly interface for analyzing and reporting on model performance across domains, capabilities, and versioning.',
      },
      {
        icon: 'gridView',
        title: 'Reporting Consistency',
        body: 'Enables standardized model evaluations for true apples-to-apples comparisons across models.',
      },
      {
        icon: 'shield',
        title: 'Red-teaming Platform',
        body: 'Prevent GenAI risk or algorithmic discrimination by simulating adversarial prompts and exploits.',
      },
    ],
  },
  prefooter: {
    headline: 'Enable AI safety today!',
    image: `${ASSET}/prefooter.jpg`,
    primary: { label: 'Book a Demo', href: '/scale-clone/demo/' },
  },
}
