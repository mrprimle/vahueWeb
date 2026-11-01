// Scale's strings for /evaluation/enterprise, read from the page's RSC payload on 2026-11-01.
import type { EvaluationEnterpriseContent } from './types'

const A = '/evaluation-enterprise'
const FRAME = 'nucleus.scale.com'

export const content: EvaluationEnterpriseContent = {
  meta: {
    title: 'Enterprise AI Evaluation and Monitoring | Scale AI',
    description: 'Bridge the trust gap to deploy production-grade generative AI applications. Evaluate and monitor applications for performance, reliability, and safety.',
  },
  hero: {
    headline: 'Generative AI Evaluation for Enterprise',
    body: 'Bridge the trust gap to deploy product-grade genAI applications.',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Learn more', url: '/genai-portfolio' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/hero.webp` },
  },
  challenge: {
    overtitle: 'The challenge',
    title: 'Lack of Trust Stalls Enterprise AI Adoption',
    subtitle: 'Only 10% of enterprises have Gen AI in production, and more than 30% of Gen AI projects are abandoned after POC. The number one reason why companies stall is a lack of trust stemming from:',
    items: [
      { icon: 'performance', title: 'Poor Performance', subtitle: 'Models hallucinate, exhibit unsafe behavior, or pose security risks.' },
      { icon: 'roi', title: 'Unproven ROI', subtitle: 'Use cases are not adopted and targeted workflows remain unchanged.' },
      { icon: 'costs', title: 'Escalating Costs', subtitle: 'Unmonitored usage leads to extensive cloud or vendor bills.' },
    ],
  },
  solution: {
    overtitle: 'The Solution',
    title: 'Bridge the Trust Gap for Enterprise Gen AI',
    subtitle: 'The path to deploying with confidence in production is to systematically evaluate, improve and monitor GenAI systems for performance, safety, and reliability.',
    features: [
      { title: 'Get Trusted Insights', description: 'Use the trusted evaluation and benchmarking system for enterprise-grade GenAI.' },
      { title: 'Ensure Safety and Reliability', description: 'Avoid bias, hallucinations, poor accuracy, harmful responses, and malicious behavior.' },
      { title: 'Monitor for Peace of Mind', description: 'Keep track of latency and cost and get alerted for any issues or regressions.' },
    ],
    image: { src: `${A}/bridge-trust-gap.webp`, alt: 'With Scale GP enterprises can move faster and safer', width: 646, height: 390 },
  },
  how: {
    overtitle: 'How it Works',
    title: 'How the Scale GenAI Portfolio Evaluates Applications',
    subtitle: 'Trust in AI is earned through better data. Scale GenAI Portfolio combines automated evaluations with an expert workforce for human evaluations to build a “Trust Feedback Loop” of evaluation, improvement and monitoring.',
    items: [
      {
        title: 'Measure your AI',
        description: "Automatically test your GenAI system against auto-generated evaluation datasets as well as against Scale's industry leading proprietary benchmark datasets.",
        textSide: 'left',
        image: { src: `${A}/measure-your-ai.webp`, alt: 'Measure your AI', width: 644, height: 415, mockup: true, mockupUrl: FRAME },
      },
      {
        title: 'Set your own bar',
        description: 'Augment our industry best practice rubrics and datasets with custom metrics and datasets tailored for your domain and use case.',
        textSide: 'right',
        image: { src: `${A}/set-your-own-bar.webp`, alt: 'Set your own bar', width: 644, height: 430, mockup: true, mockupUrl: FRAME },
      },
      {
        title: 'Verify with Human-in-the-Loop (HiTL)',
        description: 'Ensure quality control of auto-evaluation with industry-leading, efficient HiTL evaluation for the highest complexity test cases.',
        textSide: 'left',
        image: { src: `${A}/verify-hitl.webp`, alt: 'Verify with Human-in-the-Loop (HiTL)', width: 644, height: 430, mockup: true, mockupUrl: FRAME },
      },
      {
        title: 'Iterate',
        description: 'Programmatically turn your evaluations into actions that improve your GenAI systems through RAG optimization and fine-tuning, then see your scores improve over time.',
        textSide: 'right',
        image: { src: `${A}/iterate.webp`, alt: 'Iterate', width: 644, height: 430, mockup: true, mockupUrl: FRAME },
      },
      {
        title: 'Deploy',
        description: 'Monitor production traffic to surface quality metrics, issues and alerts. Detect anomalies (e.g. prompts that are not covered by your evaluation datasets) to add them to your test suite.',
        textSide: 'left',
        image: { src: `${A}/deploy.webp`, alt: 'Deploy', width: 644, height: 430, mockup: true, mockupUrl: FRAME },
      },
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Build AI', url: '/data-engine' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
