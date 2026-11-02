// Copy for /evaluation/model-developers: the Evals and Guardrails service, proving and controlling agents on the client's own cases.
// Same shape and counts as content.scale.ts. `// PLACEHOLDER` marks what Vahue can't claim yet.
import type { EvaluationModelDevelopersContent } from './types'

const A = '/evaluation-model-developers'

export const content: EvaluationModelDevelopersContent = {
  meta: {
    title: 'Evals and Guardrails | Test AI Agents on Your Own Cases | Vahue',
    description: 'Baselines, private evals, shadow mode and monitoring, built and run for you, so you see every agent work on your own cases before it goes live.',
  },
  hero: {
    headline: 'Evals and Guardrails',
    body: 'See it work on your own cases before it goes live. Baselines, private evals, shadow mode and monitoring for teams putting agents on real work.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/hero-filled.webp` },
  },
  challenges: {
    overtitle: 'Evaluation Challenges',
    title: 'The State of Evaluations Today is Limiting AI Progress',
    cards: [
      { key: 'evaluation-challenge-1', icon: 'wq', iconColor: '#79648C', title: 'Agents judged on a polished demo, not on the messy cases your team handles every day.' },
      { key: 'evaluation-challenge-2', icon: 'bB', iconColor: '#A8927C', title: 'No baseline, so no one can say whether the agent beats the way the work gets done today.' },
      { key: 'evaluation-challenge-3', icon: 'w9', iconColor: '#839CB2', title: 'A black box in production, until a customer or an auditor finds the mistake.' },
    ],
  },
  why: {
    overtitle: 'Why Vahue',
    title: 'Reliable and Robust Performance Management',
    subtitle: 'We build and run the evals for you, so you can see how each agent performs on accuracy, coverage, cost, and safety, without anyone on your team becoming its full-time babysitter.',
    cards: [
      { key: 'why-1', icon: 'AH', iconColor: '#79648C', title: 'Private Evaluation Sets', description: 'Built from your own past cases and edge cases, so scores reflect your real work rather than a vendor benchmark.' },
      { key: 'why-2', icon: 'hd', iconColor: '#79648C', title: 'Rater Quality', description: 'Your experts and ours review the hard cases, backed by transparent scoring and agreement tracked over time.' },
      { key: 'why-3', icon: 'I3', iconColor: '#839CB2', title: 'Shadow Mode', description: 'Agents run on real work alongside your team and touch nothing until accuracy holds. You compare results side by side.' },
      { key: 'why-4', icon: 'B5', iconColor: '#A8927C', title: 'Targeted Evaluations', description: 'Custom tests focus on the failures that would hurt you most, such as a wrong price, a bad refund, or a missed escalation.' },
      { key: 'why-5', icon: 'Wm', iconColor: '#79648C', title: 'Reporting Consistency', description: 'Monthly reports against your baseline, with true apples-to-apples comparisons across agent versions and models.' },
    ],
  },
  risks: {
    overtitle: 'RISKS',
    title: 'Key Identifiable Risks of AI Agents',
    subtitle: 'Our evals and guardrails catch failures in multiple categories.',
    cards: [
      { key: 'risk-1', icon: 'ZM', iconColor: '#79648C', title: 'Misinformation', description: 'Agents producing false, misleading, or inaccurate information, such as a made-up price or policy.' },
      { key: 'risk-2', icon: 'en', iconColor: '#A8927C', title: 'Unqualified Advice', description: 'Advice on sensitive topics (i.e. medical, legal, financial) that may result in material harm to the user.' },
      { key: 'risk-3', icon: 'w9', iconColor: '#839CB2', title: 'Bias', description: 'Responses that reinforce and perpetuate stereotypes that harm specific groups.' },
      { key: 'risk-4', icon: 'Yr', iconColor: '#839CB2', title: 'Privacy', description: 'Disclosing personally identifiable information (PII) or leaking private data.' },
      { key: 'risk-5', icon: 'be', iconColor: '#79648C', title: 'Prompt Attacks', description: 'A malicious caller using crafted prompts to extract private data or trick an agent into acting.' },
      { key: 'risk-6', icon: 'lF', iconColor: '#A8927C', title: 'Unauthorized Actions', description: 'Issuing payments or credits (e.g. refunds, write-offs) beyond an agent’s limits without human approval.' },
    ],
  },
  experts: {
    overtitle: 'GUARDRAILS',
    title: 'Expert Red Teamers and Guardrails',
    subtitle: 'We attack your agent before your customers do, then put controls in place for what we find. Humans stay in the loop.',
    taxonomy: { src: `${A}/taxonomy-agents.webp`, alt: 'Red team techniques connected to identifiable agent harms.' },
    cards: [
      { key: 'red-team-1', icon: 'yN', iconColor: '#79648C', title: 'Red Team Staff', description: 'Engineers trained on prompt attacks and agent failure modes test every agent before launch.' },
      { key: 'red-team-2', icon: 'kk', iconColor: '#A8927C', title: 'Review Queues', description: 'Anything below the confidence threshold goes to a person before it touches a system of record.' },
      { key: 'red-team-3', icon: 'St', iconColor: '#839CB2', title: 'Approvals', description: 'Agents propose, and your team approves any action that moves money, customers, or data.' },
      { key: 'red-team-4', icon: 'bZ', iconColor: '#79648C', title: 'Audit Log', description: 'Every input, decision, and action is recorded and searchable, ready for your auditors.' },
      { key: 'red-team-5', icon: 'b', iconColor: '#A8927C', title: 'Monitoring', description: 'Drift, failures, latency, and cost are watched in production, and new failures join the test set.' },
    ],
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    items: [
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: 'We used to argue over vendor demos and could not tell whether our agent was actually improving. Vahue ran private evaluations on our own cases, and 97% of them passed before go-live. Now we can review any case and see exactly what the agent did.', // PLACEHOLDER
      },
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: 'We had no reliable baseline to show the board, only a feeling that the pilot saved time. Vahue recorded one in two weeks, and shadow mode showed manual workload down by over 40%. We finally have confidence that our agents are trustworthy and our numbers will hold up.', // PLACEHOLDER
      },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Evals and Guardrails',
    items: [
      { href: '/blog', category: 'Blog', title: 'Why the Baseline Comes Before the Build', image: `${A}/leaderboard.png` }, // PLACEHOLDER
      { href: '/blog', category: 'Blog', title: 'Test and Evaluation Blog', image: `${A}/test-evaluation.png` }, // PLACEHOLDER
      { href: '/guides', category: 'Blog', title: 'Measuring and Mitigating the Operational Risk of AI Agents', image: `${A}/wmdp-risk.png` }, // PLACEHOLDER
      { href: '/blog', category: 'Blog', title: 'Shadow Mode: Working Alongside Your Team', image: `${A}/llama-partner.png` }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'Enable the safety of your agents today!',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
