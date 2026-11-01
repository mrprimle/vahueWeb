// Filled copy, same shape as content.scale.ts. Keep first: Scale's string stays unless it is false for Vahue, brand words swap,
// and the rest changes by a few words. `// PLACEHOLDER` marks what Vahue can't claim yet.
import type { EvaluationModelDevelopersContent } from './types'

const A = '/evaluation-model-developers'

export const content: EvaluationModelDevelopersContent = {
  meta: {
    title: 'AI Evaluation for Operations Teams | Vahue',
    description: 'Vahue Audit is a platform for analyzing model performance, identifying weaknesses, and improving model quality.',
  },
  hero: {
    headline: 'Evaluation for Operations Teams',
    body: 'Trusted LLM capability and safety evaluations.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/hero-filled.webp` },
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
    overtitle: 'Why Vahue',
    title: 'Reliable and Robust Performance Management',
    subtitle: 'Vahue Audit is designed to enable enterprise teams deploying agents to understand, analyze, and iterate on their agents by providing detailed breakdowns of LLMs across multiple facets of performance and safety.',
    cards: [
      { key: 'why-1', icon: 'AH', iconColor: '#79648C', title: 'Proprietary Evaluation Sets', description: 'High-quality evaluation sets across domains and capabilities ensure accurate model assessments without overfitting.' },
      { key: 'why-2', icon: 'hd', iconColor: '#79648C', title: 'Rater Quality', description: 'Expert human raters provide reliable evaluations, backed by transparent metrics and quality assurance mechanisms.' },
      { key: 'why-3', icon: 'I3', iconColor: '#839CB2', title: 'Product Experience', description: 'User-friendly interface for analyzing and reporting on model performance across domains, capabilities, and versioning.' },
      { key: 'why-4', icon: 'B5', iconColor: '#A8927C', title: 'Targeted Evaluations', description: 'Custom evaluation sets focus on specific model concerns, enabling precise improvements via new training data.' },
      { key: 'why-5', icon: 'Wm', iconColor: '#79648C', title: 'Reporting Consistency', description: 'Enables standardized model evaluations for true apples-to-apples comparisons across models.' },
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
      { key: 'risk-4', icon: 'Yr', iconColor: '#839CB2', title: 'Privacy', description: 'Disclosing personally identifiable information (PII) or leaking private data.' },
      { key: 'risk-5', icon: 'be', iconColor: '#79648C', title: 'Cyberattacks', description: 'A malicious actor using a language model to conduct or accelerate a cyberattack.' },
      { key: 'risk-6', icon: 'lF', iconColor: '#A8927C', title: 'Dangerous Actions', description: 'Assisting bad actors in acquiring or creating fraudulent payments or credits (e.g. refunds, write-offs).' },
    ],
  },
  experts: {
    overtitle: 'EXPERTS',
    title: 'Expert Red Teamers',
    subtitle: 'Vahue has a diverse network of experts to perform the LLM evaluation and red teaming to identify risks.',
    taxonomy: { src: `${A}/taxonomy.webp`, alt: 'Red team techniques connected to identifiable model harms.' },
    cards: [
      { key: 'red-team-1', icon: 'yN', iconColor: '#79648C', title: 'Red Team Staff', description: '100s of red teamers trained on advanced tactics and in-house prompt engineers enable state of the art red teaming at scale.' }, // PLACEHOLDER
      { key: 'red-team-2', icon: 'kk', iconColor: '#A8927C', title: 'Content Libraries', description: 'Extensive libraries and taxonomies of tactics and harms ensure broad coverage of vulnerability areas' },
      { key: 'red-team-3', icon: 'St', iconColor: '#839CB2', title: 'Adversarial Datasets', description: 'Proprietary adversarial prompt sets are used to conduct systematic model vulnerability scans.' },
      { key: 'red-team-4', icon: 'bZ', iconColor: '#79648C', title: 'Product Experience', description: "Vahue's red teaming product was selected by a mid-market insurer to conduct private assessments of models from leading AI developers." }, // PLACEHOLDER
      { key: 'red-team-5', icon: 'b', iconColor: '#A8927C', title: 'Model-Assisted Research', description: "Research conducted by Vahue's Safety, Evaluations, and Analysis Lab will enable model-assisted approaches." },
    ],
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    items: [
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: 'We used to argue over vendor demos and could not tell whether our AI pilot was actually improving. Vahue ran private evaluations on our own cases, and 97% of them passed before go-live. I genuinely don’t think we’d have shipped without it.', // PLACEHOLDER
      },
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: 'Our operations team was running at maximum capacity, with no reliable baseline to show the board. Vahue recorded one in two weeks, and the pilot reduced manual workload by over 40%. We finally have confidence that our AI systems are trustworthy and our numbers will hold up.', // PLACEHOLDER
      },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Our LLM Capabilities',
    items: [
      { href: '/labs/leaderboard', category: 'Blog', title: "Vahue's Research Lab Launches Expert-Evaluated Agency Leaderboards", image: `${A}/leaderboard.png` },
      { href: '/blog', category: 'Blog', title: 'Test and Evaluation Blog', image: `${A}/test-evaluation.png` },
      { href: '/guides', category: 'Blog', title: 'Introducing the Audit: Measuring and Mitigating Catastrophic Risk Potential from LLMs', image: `${A}/wmdp-risk.png` },
      { href: '/blog', category: 'Blog', title: 'Mid-Market Launch Partner', image: `${A}/llama-partner.png` }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'Enable the safety of LLMs today!',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
