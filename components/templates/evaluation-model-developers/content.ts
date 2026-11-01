// Content for /evaluation-model-developers: scale.com/evaluation/model-developers copy (captured 2026-11-01)
// so QA lines up with the live page. Every section reads its slice from EvalModelDevContent; a Vahue page passes its own
// content object (leave a slice out to drop that section).
import type { IconName } from './icons'

export const ASSET = '/templates/evaluation-model-developers'

export type Cta = { label: string; href: string }
export type HeroContent = { headline: string; body?: string; cta: Cta; image: string }
export type HeaderContent = { eyebrow: string; title: string; body?: string }
export type Card = { icon: IconName; title: string; body?: string }
export type CardSectionContent = { header: HeaderContent; cards: Card[]; figure?: { src: string; alt: string } }
export type TestimonialItem = { name: string; title: string; quote: string }
export type TestimonialsContent = {
  heading: string
  /** colorTheme: panel / active tile text (hex) and the contrast colour (borders, tile fill, arrows) */
  theme: { hex: string; contrast: string }
  items: TestimonialItem[]
  /** Case outcomes rather than spoken quotes: render without quotation marks. */
  plainText?: boolean
}
export type ResourcePost = { title: string; category: string; href: string; image: string }
export type ResourcesContent = { header: HeaderContent; posts: ResourcePost[] }

export type EvalModelDevContent = {
  hero?: HeroContent
  challenges?: CardSectionContent
  whyScale?: CardSectionContent
  risks?: CardSectionContent
  experts?: CardSectionContent
  testimonials?: TestimonialsContent
  resources?: ResourcesContent
  prefooter?: HeroContent
}

export const evalModelDevContent: EvalModelDevContent = {
  hero: {
    headline: 'Evaluation for Model Developers',
    body: 'Trusted LLM capability and safety evaluations.',
    cta: { label: 'Book a Demo', href: '/contact' },
    image: `${ASSET}/hero.webp`,
  },
  challenges: {
    header: { eyebrow: 'Evaluation Challenges', title: 'The State of Evaluations Today is Limiting AI Progress' },
    cards: [
      { icon: 'dataset', title: 'Lack of high quality, trustworthy evaluation datasets (which have not been overfit on).' },
      { icon: 'tooling', title: 'Lack of good product tooling for understanding and iterating on evaluation results.' },
      { icon: 'consistency', title: 'Lack of consistency in model comparisons and reliability in reporting.' },
    ],
  },
  whyScale: {
    header: {
      eyebrow: 'Why Scale',
      title: 'Reliable and Robust Performance Management',
      body: 'Scale Evaluation is designed to enable frontier model developers to understand, analyze, and iterate on their models by providing detailed breakdowns of LLMs across multiple facets of performance and safety.',
    },
    cards: [
      { icon: 'evalSets', title: 'Proprietary Evaluation Sets', body: 'High-quality evaluation sets across domains and capabilities ensure accurate model assessments without overfitting.' },
      { icon: 'raters', title: 'Rater Quality', body: 'Expert human raters provide reliable evaluations, backed by transparent metrics and quality assurance mechanisms.' },
      { icon: 'product', title: 'Product Experience', body: 'User-friendly interface for analyzing and reporting on model performance across domains, capabilities, and versioning.' },
      { icon: 'targeted', title: 'Targeted Evaluations', body: 'Custom evaluation sets focus on specific model concerns, enabling precise improvements via new training data.' },
      { icon: 'reporting', title: 'Reporting Consistency', body: 'Enables standardized model evaluations for true apples-to-apples comparisons across models.' },
    ],
  },
  risks: {
    header: { eyebrow: 'RISKS', title: 'Key Identifiable Risks of LLMs', body: 'Our platform can identify vulnerabilities in multiple categories.' },
    cards: [
      { icon: 'misinformation', title: 'Misinformation', body: 'LLMs producing false, misleading, or inaccurate information.' },
      { icon: 'advice', title: 'Unqualified Advice', body: 'Advice on sensitive topics (i.e. medical, legal, financial) that may result in material harm to the user.' },
      { icon: 'bias', title: 'Bias', body: 'Responses that reinforce and perpetuate stereotypes that harm specific groups.' },
      { icon: 'privacy', title: 'Privacy', body: 'Disclosing personally identifiable information (PIl) or leaking private data.' },
      { icon: 'cyber', title: 'Cyberattacks', body: 'A malicious actor using a language model to conduct or accelerate a cyberattack.' },
      { icon: 'substances', title: 'Dangerous Substances', body: 'Assisting bad actors in acquiring or creating dangerous substances or items(e.g. bioweapons, bombs).' },
    ],
  },
  experts: {
    header: {
      eyebrow: 'EXPERTS',
      title: 'Expert Red Teamers',
      body: 'Scale has a diverse network of experts to perform the LLM evaluation and red teaming to identify risks.',
    },
    figure: { src: `${ASSET}/red-team-taxonomy.webp`, alt: 'Red team techniques connected to identifiable model harms.' },
    cards: [
      { icon: 'staff', title: 'Red Team Staff', body: '1000s of red teamers trained on advanced tactics and in-house prompt engineers enable state of the art red teaming at scale.' },
      { icon: 'libraries', title: 'Content Libraries', body: 'Extensive libraries and taxonomies of tactics and harms ensure broad coverage of vulnerability areas' },
      { icon: 'adversarial', title: 'Adversarial Datasets', body: 'Proprietary adversarial prompt sets are used to conduct systematic model vulnerability scans.' },
      { icon: 'whiteHouse', title: 'Product Experience', body: "Scale's red teaming product was selected by the White House to conduct public assessments of models from leading AI developers." },
      { icon: 'research', title: 'Model-Assisted Research', body: "Research conducted by Scale's Safety, Evaluations, and Analysis Lab (SEAL) will enable model-assisted approaches." },
    ],
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    // ClientTestimonials default colorTheme (no CMS override on this page): cloud-slate #839CB2, contrastColor #000000
    theme: { hex: '#839CB2', contrast: '#000000' },
    items: [
      {
        name: 'Dan Hendrycks',
        title: 'Director, Center for AI Safety',
        quote:
          'Companies are incentivized to game leaderboards in order to one-up one another. This makes it hard to tell whether AI systems are actually improving. That’s why it’s important that organizations such as Scale assess these AI systems with their private evaluations.',
      },
      {
        name: 'Dr. Craig Martell',
        title: 'Former Chief Digital and Artificial Intelligence Officer (CDAO), U.S. Department of Defense',
        quote:
          'The work Scale is doing to evaluate the performance, reliability, and safety of AI models is crucial. Government agencies and the general public alike need an independent, third party like Scale to have confidence that AI systems are trustworthy and to accelerate responsible AI development.',
      },
    ],
  },
  resources: {
    header: { eyebrow: 'RESOURCES', title: 'Learn More About Our LLM Capabilities' },
    posts: [
      { title: "Scale's SEAL Research Lab Launches Expert-Evaluated LLM Leaderboards", category: 'Blog', href: 'https://labs.scale.com/leaderboard', image: `${ASSET}/resource-leaderboard.png` },
      { title: 'Test and Evaluation Blog', category: 'Blog', href: 'https://scale.com/blog/test-and-evaluation-white-paper', image: `${ASSET}/resource-test-evaluation.png` },
      { title: 'Introducing WMDP: Measuring and Mitigating Catastrophic Risk Potential from LLMs', category: 'Blog', href: 'https://scale.com/blog/measuring-mitigating-risk-wmdp', image: `${ASSET}/resource-wmdp-risk.png` },
      { title: 'Meta Llama 2 Launch Partner', category: 'Blog', href: 'https://scale.com/blog/custom-llms', image: `${ASSET}/resource-llama-partner.png` },
    ],
  },
  prefooter: {
    headline: 'Enable the safety of LLMs today!',
    cta: { label: 'Book a Demo', href: '/contact' },
    image: `${ASSET}/prefooter.webp`,
  },
}
