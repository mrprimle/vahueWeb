// Scale's original strings for https://scale.com/evaluation/model-developers: the RSC payload of the page, and module 830843 in 1zwo72ehg4xzu.js.
import type { EvaluationModelDevelopersContent } from './types'

const A = '/evaluation-model-developers'

export const content: EvaluationModelDevelopersContent = {
  meta: {
    title: 'AI Evaluation for Model Developers | Scale AI',
    description: 'Scale Evaluation is a platform for analyzing model performance, identifying weaknesses, and improving model quality.',
  },
  hero: {
    headline: 'Evaluation for Model Developers',
    body: 'Trusted LLM capability and safety evaluations.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/hero.webp` },
  },
  challenges: {
    overtitle: 'Evaluation Challenges',
    title: 'The State of Evaluations Today is Limiting AI Progress',
    cards: [
      { key: 'evaluation-challenge-1', icon: 'wq', iconColor: '#79648C', title: 'Lack of high quality, trustworthy evaluation datasets (which have not been overfit on).' },
      { key: 'evaluation-challenge-2', icon: 'bB', iconColor: '#A8927C', title: 'Lack of good product tooling for understanding and iterating on evaluation results.' },
      { key: 'evaluation-challenge-3', icon: 'w9', iconColor: '#839CB2', title: 'Lack of consistency in model comparisons and reliability in reporting.' },
    ],
  },
  why: {
    overtitle: 'Why Scale',
    title: 'Reliable and Robust Performance Management',
    subtitle: 'Scale Evaluation is designed to enable frontier model developers to understand, analyze, and iterate on their models by providing detailed breakdowns of LLMs across multiple facets of performance and safety.',
    cards: [
      { key: 'why-scale-1', icon: 'AH', iconColor: '#79648C', title: 'Proprietary Evaluation Sets', description: 'High-quality evaluation sets across domains and capabilities ensure accurate model assessments without overfitting.' },
      { key: 'why-scale-2', icon: 'hd', iconColor: '#79648C', title: 'Rater Quality', description: 'Expert human raters provide reliable evaluations, backed by transparent metrics and quality assurance mechanisms.' },
      { key: 'why-scale-3', icon: 'I3', iconColor: '#839CB2', title: 'Product Experience', description: 'User-friendly interface for analyzing and reporting on model performance across domains, capabilities, and versioning.' },
      { key: 'why-scale-4', icon: 'B5', iconColor: '#A8927C', title: 'Targeted Evaluations', description: 'Custom evaluation sets focus on specific model concerns, enabling precise improvements via new training data.' },
      { key: 'why-scale-5', icon: 'Wm', iconColor: '#79648C', title: 'Reporting Consistency', description: 'Enables standardized model evaluations for true apples-to-apples comparisons across models.' },
    ],
  },
  risks: {
    overtitle: 'RISKS',
    title: 'Key Identifiable Risks of LLMs',
    subtitle: 'Our platform can identify vulnerabilities in multiple categories.',
    cards: [
      { key: 'risk-1', icon: 'ZM', iconColor: '#79648C', title: 'Misinformation', description: 'LLMs producing false, misleading, or inaccurate information.' },
      { key: 'risk-2', icon: 'en', iconColor: '#A8927C', title: 'Unqualified Advice', description: 'Advice on sensitive topics (i.e. medical, legal, financial) that may result in material harm to the user.' },
      { key: 'risk-3', icon: 'w9', iconColor: '#839CB2', title: 'Bias', description: 'Responses that reinforce and perpetuate stereotypes that harm specific groups.' },
      { key: 'risk-4', icon: 'Yr', iconColor: '#839CB2', title: 'Privacy', description: 'Disclosing personally identifiable information (PIl) or leaking private data.' },
      { key: 'risk-5', icon: 'be', iconColor: '#79648C', title: 'Cyberattacks', description: 'A malicious actor using a language model to conduct or accelerate a cyberattack.' },
      { key: 'risk-6', icon: 'lF', iconColor: '#A8927C', title: 'Dangerous Substances', description: 'Assisting bad actors in acquiring or creating dangerous substances or items(e.g. bioweapons, bombs).' },
    ],
  },
  experts: {
    overtitle: 'EXPERTS',
    title: 'Expert Red Teamers',
    subtitle: 'Scale has a diverse network of experts to perform the LLM evaluation and red teaming to identify risks.',
    taxonomy: { src: `${A}/taxonomy.webp`, alt: 'Red team techniques connected to identifiable model harms.' },
    cards: [
      { key: 'red-team-1', icon: 'yN', iconColor: '#79648C', title: 'Red Team Staff', description: '1000s of red teamers trained on advanced tactics and in-house prompt engineers enable state of the art red teaming at scale.' },
      { key: 'red-team-2', icon: 'kk', iconColor: '#A8927C', title: 'Content Libraries', description: 'Extensive libraries and taxonomies of tactics and harms ensure broad coverage of vulnerability areas' },
      { key: 'red-team-3', icon: 'St', iconColor: '#839CB2', title: 'Adversarial Datasets', description: 'Proprietary adversarial prompt sets are used to conduct systematic model vulnerability scans.' },
      { key: 'red-team-4', icon: 'bZ', iconColor: '#79648C', title: 'Product Experience', description: "Scale's red teaming product was selected by the White House to conduct public assessments of models from leading AI developers." },
      { key: 'red-team-5', icon: 'b', iconColor: '#A8927C', title: 'Model-Assisted Research', description: "Research conducted by Scale's Safety, Evaluations, and Analysis Lab (SEAL) will enable model-assisted approaches." },
    ],
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    items: [
      {
        clientName: 'Dan Hendrycks',
        title: 'Director, Center for AI Safety',
        testimonial: 'Companies are incentivized to game leaderboards in order to one-up one another. This makes it hard to tell whether AI systems are actually improving. That’s why it’s important that organizations such as Scale assess these AI systems with their private evaluations.',
      },
      {
        clientName: 'Dr. Craig Martell',
        title: 'Former Chief Digital and Artificial Intelligence Officer (CDAO), U.S. Department of Defense',
        testimonial: 'The work Scale is doing to evaluate the performance, reliability, and safety of AI models is crucial. Government agencies and the general public alike need an independent, third party like Scale to have confidence that AI systems are trustworthy and to accelerate responsible AI development.',
      },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Our LLM Capabilities',
    items: [
      { href: 'https://labs.scale.com/leaderboard', category: 'Blog', title: "Scale's SEAL Research Lab Launches Expert-Evaluated LLM Leaderboards", image: `${A}/leaderboard.png` },
      { href: '/blog/test-and-evaluation-white-paper', category: 'Blog', title: 'Test and Evaluation Blog', image: `${A}/test-evaluation.png` },
      { href: '/blog/measuring-mitigating-risk-wmdp', category: 'Blog', title: 'Introducing WMDP: Measuring and Mitigating Catastrophic Risk Potential from LLMs', image: `${A}/wmdp-risk.png` },
      { href: '/blog/custom-llms', category: 'Blog', title: 'Meta Llama 2 Launch Partner', image: `${A}/llama-partner.png` },
    ],
  },
  prefooter: {
    headline: 'Enable the safety of LLMs today!',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
