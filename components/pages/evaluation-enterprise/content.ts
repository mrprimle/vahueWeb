// Copy for /evaluation/enterprise: the AI Strategy and Audit service, a two-week decision before the full build.
// Same shape and counts as content.scale.ts. PLACEHOLDER lines are for Mike.
import type { EvaluationEnterpriseContent } from './types'

const A = '/evaluation-enterprise'
const FRAME = 'app.vahue.ai' // PLACEHOLDER

export const content: EvaluationEnterpriseContent = {
  meta: {
    title: 'AI Strategy and Audit | Find the Right Use Case in 2 Weeks | Vahue',
    description: 'In two weeks we find the workflow worth automating, record your baseline, test feasibility on your own cases, and give you a clear go or no-go.',
  },
  hero: {
    headline: 'AI Strategy and Audit',
    body: 'For leaders under pressure to act on AI: in two weeks we find the workflow worth automating, record your baseline, and give you a clear go or no-go.',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Learn more', url: '/evaluation/model-developers' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/hero-filled.webp` },
  },
  challenge: {
    overtitle: 'The challenge',
    title: 'Lack of Clarity Stalls Enterprise AI Adoption',
    subtitle: 'Only 10% of enterprises have Gen AI in production, and more than 30% of Gen AI projects are abandoned after POC. The number one reason why companies stall is committing to a build before they know:', // PLACEHOLDER
    items: [
      { icon: 'performance', title: 'The Right Use Case', subtitle: 'Teams start with what demos well, not with the workflow that costs the most.' },
      { icon: 'roi', title: 'The Real ROI', subtitle: 'With no baseline, “we think it saves time” is all anyone can tell the board.' },
      { icon: 'costs', title: 'The Run Costs', subtitle: 'Usage bills and upkeep only surface once you start scaling.' },
    ],
  },
  solution: {
    overtitle: 'The Solution',
    title: 'Bridge the Gap From AI Mandate to Working Proof',
    subtitle: 'The path to a confident AI decision is to map the real workflow, record its baseline, and test feasibility on your own cases before anyone commits to the full build.',
    features: [
      { title: 'Get Trusted Insights', description: 'A ranked list of use cases, scored by volume, cost, data readiness, and risk, built with the people doing the work.' },
      { title: 'Define Human Control', description: 'Decide where agents act alone, where a person approves, and what data they can touch, with security and compliance at the table.' },
      { title: 'Decide with Peace of Mind', description: 'Get a target, a stop point, and a production plan with costs, and no pressure to buy the build.' },
    ],
    image: { src: `${A}/bridge-trust-gap-filled.webp`, alt: 'With Vahue enterprises can move faster and safer', width: 646, height: 390 },
  },
  how: {
    overtitle: 'How it Works',
    title: 'How the Vahue Audit Works',
    subtitle: 'Trust in AI is earned through better data. Over two weeks, our engineers sit with the people doing the work, then turn what they learn into a measured decision. Instead of a roadmap for the shelf, you get a path to production.',
    items: [
      {
        title: 'Measure your baseline',
        description: 'We map one workflow end to end and record volume, minutes per item, error rate, and cost, so everything that follows has a before.',
        textSide: 'left',
        image: { src: `${A}/measure-your-ai-filled.webp`, alt: 'Measure your baseline', width: 644, height: 415, mockup: true, mockupUrl: FRAME },
      },
      {
        title: 'Set your own bar',
        description: 'Agree the target with your team: the accuracy, coverage, and payback that make this worth doing, and the point at which we stop.',
        textSide: 'right',
        image: { src: `${A}/set-your-own-bar-filled.webp`, alt: 'Set your own bar', width: 644, height: 430, mockup: true, mockupUrl: FRAME },
      },
      {
        title: 'Prove it on your own cases',
        description: 'We run a proof of concept on your past cases, and your experts check the output next to what your team actually did.',
        textSide: 'left',
        image: { src: `${A}/verify-hitl.webp`, alt: 'Prove it on your own cases', width: 644, height: 430, mockup: true, mockupUrl: FRAME },
      },
      {
        title: 'Map the build',
        description: 'Lay out the integrations, data access, architecture, and risks the build needs, then rank the next workflows that could share them.',
        textSide: 'right',
        image: { src: `${A}/iterate.webp`, alt: 'Map the build', width: 644, height: 430, mockup: true, mockupUrl: FRAME },
      },
      {
        title: 'Decide',
        description: 'You get a go or no-go, expected run costs, and a next step: a Pilot in shadow mode on real cases, or a clear reason to stop.',
        textSide: 'left',
        image: { src: `${A}/deploy-filled.webp`, alt: 'Decide', width: 644, height: 430, mockup: true, mockupUrl: FRAME },
      },
    ],
  },
  prefooter: {
    headline: 'Find the right use case before you build',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Explore Evals', url: '/evaluation/model-developers' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
