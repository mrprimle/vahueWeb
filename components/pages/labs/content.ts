// Copy for /labs. Keep first: Scale's string stays unless it is false for Vahue, brand words swap, the rest changes by a few words.
// Same shape and counts as content.scale.ts. Static snapshot, no live data. PLACEHOLDER lines are facts or proof Mike must confirm or replace:
// benchmark names, paper and post titles, dates, authors, numbers in posts, job dates and locations.
import type { LabsHomeContent } from './types'

const P = '/labs/papers'
const B = '/labs/blog'
const L = '/labs/leaderboard'
const J = '/labs/jobs'
const names = (n: number) => Array.from({ length: n }, () => 'Full Name').join(', ')
const JOB_DATE = '10.22.2026' // PLACEHOLDER
const THREE_CITIES = 'City, Country; City, Country; City, Country' // PLACEHOLDER
const TWO_CITIES = 'City, Country; City, Country' // PLACEHOLDER

export const content: LabsHomeContent = {
  meta: {
    title: 'Vahue Labs - Research to Advance AI | Vahue Labs',
    description: 'Vahue Labs advances AI through research on real business agents, focusing on agents, baselines, safety, evaluation, and alignment, and the science of context.',
  },
  hero: {
    title: 'Research to Advance AI',
    body: 'Vahue Labs advances AI through research on real business agents. Our research focuses on agents, baselines, safety, evaluation, and alignment, and the science of context.',
  },
  leaderboards: {
    heading: '[AGENT EVALS]',
    blurb: 'Benchmarks for workflow, agentic, and safety capabilities',
    items: [
      { name: "Support's Sixth Sense", href: L }, // PLACEHOLDER
      { name: 'ExceptionBench', href: L }, // PLACEHOLDER
      { name: "Expert's Last Exam (Diamond)", href: L }, // PLACEHOLDER
      { name: 'IntakeBench', href: L }, // PLACEHOLDER
      { name: 'Workflow Atlas - Back-office Sync', href: L }, // PLACEHOLDER
    ],
    more: { label: 'View more', href: L },
  },
  papers: {
    heading: '[PAPERS]',
    blurb: 'Research papers and publications covering agents, baselines, workflows, safety, evaluation, and alignment, and the science of context.',
    columns: { date: 'Date', title: 'Title', category: 'Category', authors: 'Authors' },
    items: [
      { title: 'ExceptionBench: Evaluating Multi-Dimensional Human Handoff in Business Agents', href: P, date: '10/9/2026', categories: ['Safety & Oversight'], authors: names(4), image: '/labs/figures/figure-1.svg' }, // PLACEHOLDER
      { title: "Support's Sixth Sense: Benchmarking Intent Reasoning in Voice and Chat Agents", href: P, date: '10/7/2026', categories: ['Voice'], authors: names(9), image: '/labs/figures/figure-2.svg' }, // PLACEHOLDER
      { title: 'SteerIntake: Steerable Document Intake for Invoices and Claims', href: P, date: '9/17/2026', categories: ['Documents'], authors: names(9), image: '/labs/figures/figure-3.svg' }, // PLACEHOLDER
      { title: 'READY or Not: Reliable Mid-Market Agent Deployment', href: P, date: '9/4/2026', categories: ['Agents', 'Enterprise'], authors: names(9), image: '/labs/figures/figure-4.svg' }, // PLACEHOLDER
      { title: 'Spine-Branch Coordination for Multi-agent Back-office Sync', href: P, date: '8/27/2026', categories: ['Agents'], authors: names(8), image: '/labs/figures/figure-5.svg' }, // PLACEHOLDER
      { title: 'ClaimCARE-Bench: Calibrated Audit of Agent Reasoning in Claims Handling', href: P, date: '8/20/2026', categories: ['Evaluation and Alignment'], authors: names(9), image: '/labs/figures/figure-6.svg' }, // PLACEHOLDER
    ],
    noImage: 'No image',
    more: { label: 'View more', href: P },
  },
  blog: {
    heading: '[BLOG]',
    blurb: 'Insights, analysis, and updates from Vahue Labs',
    previous: 'Previous',
    next: 'Next',
    items: [
      {
        title: "IntakeBench: Vahue's First Open-Source Document Dataset and Benchmark", // PLACEHOLDER
        href: B,
        date: 'Oct 29, 2026', // PLACEHOLDER
        category: 'Agents',
        intro: "We're releasing IntakeBench, an open benchmark co-developed with our forward-deployed engineers. It builds upon Vahue's first open-source intake dataset, which includes 40,000 plus real business documents.", // PLACEHOLDER
      },
      {
        title: 'ExceptionBench: An expert-authored benchmark for how AI agents handle risky cases', // PLACEHOLDER
        href: B,
        date: 'Oct 9, 2026', // PLACEHOLDER
        category: 'Safety & Oversight',
        intro: 'People increasingly hand customer work to agents, and some of those cases involve money or compliance risk.\n\nExceptionBench measures whether agents escalate when those cases need a human, using rubrics written by senior operators: 718 expert-authored cases across 23 exception subcategories.', // PLACEHOLDER
      },
      {
        title: "Introducing Support's Sixth Sense: Measuring Intent Reasoning on Real Calls", // PLACEHOLDER
        href: B,
        date: 'Oct 7, 2026', // PLACEHOLDER
        intro: "Today we're introducing Support's Sixth Sense (SSS), a benchmark for intent reasoning in voice and support agents with 522 open-ended tasks across 288 tickets and 234 call recordings (17.6 hours of audio in total). ", // PLACEHOLDER
      },
      {
        title: 'Introducing CaseEnv: An Open-Source Framework for Testing Agents on Your Own Cases', // PLACEHOLDER
        href: B,
        date: 'Oct 5, 2026', // PLACEHOLDER
        intro: "An agent is only as good as the cases it practices on, and building test sets that are realistic, accurate, and scalable all at once is the hard part of going live. Every agent Vahue runs is proven on CaseEnv. Today we're open-sourcing it.\n", // PLACEHOLDER
      },
    ],
    viewAll: 'View all',
    allPosts: 'All posts',
    allHref: B,
  },
  jobs: {
    heading: '[Jobs]',
    columns: { date: 'Date', position: 'Position', location: 'Location' },
    items: [
      { title: 'Machine Learning Research Scientist, Evaluations', location: THREE_CITIES, date: JOB_DATE, href: J }, // PLACEHOLDER
      { title: 'Machine Learning Research Scientist, Agent Baselines', location: THREE_CITIES, date: JOB_DATE, href: J }, // PLACEHOLDER
      { title: 'ML Research Engineer, ML Systems', location: THREE_CITIES, date: JOB_DATE, href: J }, // PLACEHOLDER
      { title: 'Research Scientist, Agent Robustness', location: TWO_CITIES, date: JOB_DATE, href: J }, // PLACEHOLDER
      { title: 'Research Scientist, AI Controls and Monitoring', location: TWO_CITIES, date: JOB_DATE, href: J }, // PLACEHOLDER
      { title: 'Research Scientist, Workflow Risk Evaluations', location: TWO_CITIES, date: JOB_DATE, href: J }, // PLACEHOLDER
    ],
    more: { label: 'View more', href: J },
  },
}
