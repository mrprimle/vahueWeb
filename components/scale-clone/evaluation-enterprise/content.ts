// Placeholder copy for /scale-clone/evaluation-enterprise. Lengths roughly match the source blocks.
// TODO: Vahue copy (every string below).
import type { GlyphName } from './icons'

export const ASSET = '/scale-clone/evaluation-enterprise'

export const hero = {
  title: 'Generative AI Assurance for Large Teams',
  body: 'Close the confidence gap and ship dependable assistants to production.',
  primary: 'Book A Demo',
  secondary: 'Learn More',
}

export const challenge = {
  eyebrow: 'The problem',
  title: 'Doubt Stalls Company-Wide AI Rollouts',
  body: 'Only a small share of large companies run assistants in production today, and a third of early pilots are quietly dropped after the first trial. The single most common reason these projects stall is low confidence that grows out of:',
  items: [
    {
      icon: 'shieldX' as GlyphName,
      title: 'Weak Answers',
      body: 'Assistants invent facts, act in risky ways, or open new security gaps.',
    },
    {
      icon: 'help' as GlyphName,
      title: 'Unclear Payback',
      body: 'Pilots are not picked up and the intended workflows stay exactly the same.',
    },
    {
      icon: 'receipt' as GlyphName,
      title: 'Rising Spend',
      body: 'Unchecked usage turns into large hosting or provider invoices.',
    },
  ],
}

export const solution = {
  eyebrow: 'The approach',
  title: 'Close the Confidence Gap for Team-Wide AI',
  body: 'The route to shipping with confidence in production is to steadily test, refine and watch every assistant for quality, safety and dependability.',
  image: { src: 'img-bridge-trust-gap.webp', width: 1920, height: 1160 },
  items: [
    {
      title: 'Get Reliable Signals',
      body: 'Use a dependable scoring and comparison system built for large teams and real workloads.',
    },
    {
      title: 'Keep Answers Safe and Steady',
      body: 'Catch bias, invented facts, weak accuracy, harmful replies, and hostile use.',
    },
    {
      title: 'Watch Without Worry',
      body: 'Follow response time and spend, and get alerted when quality drifts away.',
    },
  ],
}

export const howItWorks = {
  eyebrow: 'How it works',
  title: 'How the Vahue Assurance Suite Checks Your AI Assistants',
  body: 'Confidence in AI comes from better evidence. The assurance suite pairs automatic checks with a trained group of expert reviewers for human scoring to build a repeatable loop of testing, improving and monitoring.',
  mockupUrl: 'app.vahue.example',
  items: [
    {
      title: 'Score your assistant',
      body: 'Automatically run your assistant against freshly generated test sets as well as against our own carefully curated, sector-leading benchmark collections.',
      image: { src: 'img-measure-your-ai.webp', width: 1920, height: 1236 },
      textSide: 'left' as const,
    },
    {
      title: 'Define your own standard',
      body: 'Extend our proven default scoring rubrics with your own criteria and test sets, so every check matches the way your team works.',
      image: { src: 'img-set-your-own-bar.webp', width: 1920, height: 1281 },
      textSide: 'right' as const,
    },
    {
      title: 'Confirm with Expert Reviewers (HiTL)',
      body: 'Keep automatic scores honest with careful human review on the exact cases that need it most.',
      image: { src: 'img-verify-hitl.webp', width: 1920, height: 1283 },
      textSide: 'left' as const,
    },
    {
      title: 'Improve',
      body: 'Programmatically turn your results into fresh training data, then retrain, tune and retest the assistant again and again until it reliably meets the target you set.',
      image: { src: 'img-iterate.webp', width: 1920, height: 1281 },
      textSide: 'right' as const,
    },
    {
      title: 'Ship',
      body: 'Watch live production traffic to spot quality problems early, and feed the weak cases (the ones flagged by your own test sets) straight back into your suite.',
      image: { src: 'img-deploy.webp', width: 1920, height: 1280 },
      textSide: 'left' as const,
    },
  ],
}

export const prefooter = {
  title: 'Your team\'s next step starts here',
  primary: 'Book A Demo',
  secondary: 'Start now',
}
