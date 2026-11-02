// Copy for /labs/leaderboard. Keep first: Scale's string stays unless it is false for Vahue, brand words swap, the rest changes by a few words.
// Same shape as content.scale.ts. Static snapshot, no live data. PLACEHOLDER lines are facts or proof Mike must confirm or replace: stat numbers, benchmark names,
// the partner name, task counts, the contact address, and every score row (model labels and numbers are not real results; bars keep Scale's values so the layout stays true).
// Deprecated boards: 24 of Scale's 25, per the brief's cap on long lists.
import type { LeaderboardContent } from './types'

const L = '/labs/leaderboard'

export const content: LeaderboardContent = {
  meta: {
    title: 'AI Agent Evals & Benchmarks | Vahue Labs',
    description: 'Explore evals with expert-driven agent benchmarks and updated AI model rankings across workflows, reasoning and more.',
    keywords: 'agent evals, expert-driven, private, regularly updated, LLM rankings, LLM evaluations, workflows, instruction following',
    siteName: 'Vahue Labs Agent Evals',
  },
  baseHref: L,
  hero: {
    heading: '[AGENT EVALS]',
    title: 'testing the limits of AI.',
    body: 'Benchmarks for workflow, agentic, and safety capabilities',
    cta: 'Start Exploring',
    stats: [
      {
        label: 'Benchmarks',
        value: '20+', // PLACEHOLDER
        body: 'Including benchmarks on agentic intake, expert reasoning, and safety alignment.',
      },
      {
        label: 'Models evaluated',
        value: '100+', // PLACEHOLDER
        body: 'From leading AI labs including OpenAI, Anthropic, Google, Meta, and open-source contributors.', // PLACEHOLDER
      },
    ],
  },
  tabs: { all: 'All', agentic: 'Agentic', safety: 'Safety', frontier: 'Workflow' },
  card: { viewFull: 'View Full Ranking', arrow: '→', newBadge: 'NEW', score: 'Score:', range: 'Range:', to: 'to', deprecated: 'Deprecated' },
  features: [
    {
      title: 'Enterprise AI Agent Evaluations & Benchmarks',
      body: 'We conduct high-complexity evaluations to expose agent failures, prevent benchmark saturation, and push agent capabilities--while continuously evaluating the latest production models.',
    },
    {
      title: 'Scaling with Human Expertise',
      body: 'Humans design complex evaluations and define precise criteria to assess models, while LLMs scale evaluations--ensuring efficiency and alignment with human judgment.',
    },
    {
      title: 'Robust Datasets for Reliable AI Benchmarks',
      body: 'Our evaluations are built on carefully curated evaluation sets, combining your private cases to prevent overfitting and open-source datasets for broad benchmarking and comparability.',
    },
  ],
  deprecated: {
    label: 'Show Deprecated Evals',
    infoLabel: 'Information about deprecated evals',
    info: "As models advance, benchmarks must evolve. We're retiring the saturated legacy evals and introducing new benchmarks targeting complex reasoning, robustness, and emerging AI capabilities.",
  },
  evaluate: {
    heading: '[EVALUATE YOUR AGENT]',
    bodyBefore: "If you'd like to add your agent to this evaluation or a future version, please contact",
    email: 'evals@vahue.ai', // PLACEHOLDER
    bodyAfter: '. To ensure evaluation integrity, we require that agents can only be featured the FIRST TIME when an organization encounters the test cases.',
    cta: 'Evaluate your Agent',
    form: {
      title: 'Evaluate your Agent',
      firstName: 'First name*',
      lastName: 'Last name*',
      company: 'Company name*',
      jobTitle: 'Job title*',
      message: 'Please provide details on your project.*',
      legalBefore: 'By submitting this form, your information will be processed in accordance with our',
      legalLink: { label: 'Privacy Policy', href: '/legal/privacy' },
      legalAfter: '.',
    },
  },
  items: [
    {
      key: 'hss',
      href: L,
      name: "Support's Sixth Sense", // PLACEHOLDER
      description: 'SSS, in partnership with PartnerCo, is a benchmark for intuitive intent reasoning across diverse ticket and call inputs.', // PLACEHOLDER
      category: 'frontier',
      deprecated: false,
      scores: [
        { model: 'Model-B-4 (high)', rank: 1, score: 55.4, ci: 4.2, isNew: true, deprecated: false, maxScore: 61.388000000000005, color: '#598DD2' }, // PLACEHOLDER
        { model: 'Model-A-6 (max)', rank: 2, score: 53.6, ci: 4.1, isNew: true, deprecated: false, maxScore: 61.388000000000005, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model-A-6.1 (max)', rank: 3, score: 46.6, ci: 3.8, isNew: true, deprecated: false, maxScore: 61.388000000000005, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'distressbench',
      href: L,
      name: 'ExceptionBench', // PLACEHOLDER
      description: 'We introduce ExceptionBench, designed to measure the quality of handoffs a model delivers.',
      category: 'safety',
      deprecated: false,
      scores: [
        { model: 'model-d-1.2', rank: 1, score: 88.39, ci: 0.93, isNew: false, deprecated: false, maxScore: 91.99960000000002, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'model-d-open', rank: 2, score: 87.74, ci: 1.03, isNew: true, deprecated: false, maxScore: 91.99960000000002, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'model-d-1.0', rank: 3, score: 85.89, ci: 1.05, isNew: true, deprecated: false, maxScore: 91.99960000000002, color: '#6FCBEF' }, // PLACEHOLDER
      ],
    },
    {
      key: 'hle-diamond',
      href: L,
      name: "Expert's Last Exam (Diamond)", // PLACEHOLDER
      description: 'Challenging agents at the frontier of expert knowledge',
      category: 'frontier',
      deprecated: false,
      scores: [
        { model: 'model-a-6', rank: 1, score: 60.6, ci: 3, message: 'Potential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.', isNew: false, deprecated: false, maxScore: 65.50800000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-c-5-5', rank: 2, score: 55, ci: 3.1, message: 'Potential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.', isNew: false, deprecated: false, maxScore: 65.50800000000001, color: '#E27553' }, // PLACEHOLDER
        { model: 'model-b-4', rank: 3, score: 53.2, ci: 3.07, isNew: true, deprecated: false, maxScore: 65.50800000000001, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
    {
      key: 'drugdiscoverybench',
      href: L,
      name: 'IntakeBench', // PLACEHOLDER
      description: 'IntakeBench: 82 expert-curated tasks evaluating how reliably back-office workflow agents perform the computational work of invoice, order and claims intake.', // PLACEHOLDER
      category: 'agentic',
      deprecated: false,
      scores: [
        { model: 'Model A 6 (mini-run-agent) max', rank: 1, score: 68.7, ci: 2.5, isNew: true, deprecated: false, maxScore: 73.336, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model A 6 (Agent Kit) max', rank: 2, score: 65.4, ci: 1.9, isNew: true, deprecated: false, maxScore: 73.336, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model B 4 (mini-run-agent) high', rank: 3, score: 65.4, ci: 2.9, isNew: true, deprecated: false, maxScore: 73.336, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
    {
      key: 'sweatlas-refactoring',
      href: L,
      name: 'Workflow Atlas - Back-office Sync', // PLACEHOLDER
      description: "Evaluating an agent's ability to restructure core records while preserving workflows.",
      category: 'agentic',
      deprecated: false,
      scores: [
        { model: 'Model A 6 (Agent Kit) xHigh', rank: 1, score: 59.05, ci: 6.43, isNew: true, deprecated: false, maxScore: 67.44439999999999, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model-C-5.1 (Agent Run) xHigh', rank: 2, score: 56.67, ci: 6.52, isNew: true, deprecated: false, maxScore: 67.44439999999999, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model-C-5 (Agent Run) xHigh', rank: 3, score: 54.76, ci: 6.76, isNew: false, deprecated: false, maxScore: 67.44439999999999, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'sweatlas-tw',
      href: L,
      name: 'Workflow Atlas - Test Writing', // PLACEHOLDER
      description: 'Evaluating an agent’s ability to write production-grade tests',
      category: 'agentic',
      deprecated: false,
      scores: [
        { model: 'Model-C-5.1 (Agent Run) xHigh*', rank: 1, score: 67.04, ci: 5.33, isNew: true, deprecated: false, maxScore: 74.5411, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model C 5 (Agent Run) xHigh', rank: 2, score: 62.22, ci: 5.58, isNew: false, deprecated: false, maxScore: 74.5411, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model-C-5 (Agent Run) xHigh*', rank: 3, score: 55.6, ci: 5.8, isNew: false, deprecated: false, maxScore: 74.5411, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'sweatlas-qna',
      href: L,
      name: 'Workflow Atlas - Knowledge QnA', // PLACEHOLDER
      description: 'Evaluating deep document comprehension and reasoning',
      category: 'agentic',
      deprecated: false,
      scores: [
        { model: 'Model C 5 (Agent Run) xHigh', rank: 1, score: 63.17, ci: 5.01, isNew: false, deprecated: false, maxScore: 70.22540000000001, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model-C-5.1 (Agent Run) xHigh*', rank: 2, score: 59.95, ci: 4.85, isNew: true, deprecated: false, maxScore: 70.22540000000001, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model A 6 (Agent Kit) xHigh*', rank: 3, score: 59.14, ci: 4.88, isNew: true, deprecated: false, maxScore: 70.22540000000001, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'hil',
      href: L,
      name: 'HiL-Bench (Human-in-Loop Benchmark)', // PLACEHOLDER
      description: 'Evaluates whether agents recognize information gaps and ask targeted clarifying questions.',
      category: 'agentic',
      deprecated: false,
      scores: [
        { model: 'Model D 1.0', rank: 1, score: 79.67, ci: 4.17, isNew: true, deprecated: false, maxScore: 86.35520000000001, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'Model D 1.3', rank: 2, score: 66.89, ci: 5.12, isNew: false, deprecated: false, maxScore: 86.35520000000001, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'Model A 6', rank: 3, score: 65.32, ci: 5.19, isNew: false, deprecated: false, maxScore: 86.35520000000001, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'mcp_atlas',
      href: L,
      name: 'MCP Atlas', // PLACEHOLDER
      description: 'Evaluating real-world tool use through the Model Context Protocol (MCP)',
      category: 'agentic',
      deprecated: false,
      scores: [
        { model: 'Model D 1.1', rank: 1, score: 88.1, ci: 1.95, isNew: false, deprecated: false, maxScore: 92.7515, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'Model C 5.1', rank: 2, score: 87.2, ci: 2.05, isNew: true, deprecated: false, maxScore: 92.7515, color: '#E27553' }, // PLACEHOLDER
        { model: 'model-c-5 (xhigh)', rank: 3, score: 85.8, ci: 2.1, isNew: false, deprecated: false, maxScore: 92.7515, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'swe_bench_pro_public_v2-full',
      href: L,
      name: 'Workflow-Bench Pro V2 Full', // PLACEHOLDER
      description: 'Evaluating long-horizon back-office workflow tasks in public open source repositories',
      category: 'agentic',
      deprecated: false,
      scores: [
        { model: 'Model C 5 (Agent Run) xhigh', rank: 1, score: 99.4, ci: 0.4, isNew: false, deprecated: false, maxScore: 102.79400000000001, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model B 4 (mini-run-agent) high', rank: 2, score: 99.22, ci: 0.45, isNew: true, deprecated: false, maxScore: 102.79400000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model C 5.1 (Agent Run) high', rank: 3, score: 99.1, ci: 0.5, isNew: false, deprecated: false, maxScore: 102.79400000000001, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'swe_bench_pro_public_v2-hard',
      href: L,
      name: 'Workflow-Bench Pro V2 HARD', // PLACEHOLDER
      description: 'Evaluating long-horizon back-office workflow tasks in public open source repositories',
      category: 'agentic',
      deprecated: false,
      scores: [
        { model: 'Model C 5 (Agent Run) xhigh', rank: 1, score: 98, ci: 0, isNew: false, deprecated: false, maxScore: 100.94, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model C 5.1 (Agent Run) high', rank: 2, score: 92.2, ci: 0, isNew: false, deprecated: false, maxScore: 100.94, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model B 4 (mini-run-agent) high', rank: 3, score: 92.16, ci: 0, isNew: true, deprecated: false, maxScore: 100.94, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'swe_bench_pro-public',
      href: L,
      name: 'Workflow-Bench Pro (Public Dataset)', // PLACEHOLDER
      description: 'Evaluating long-horizon back-office workflow tasks in public open source repositories',
      category: 'agentic',
      deprecated: true,
      scores: [
        { model: 'Model D 1.1*', rank: 1, score: 61.5, ci: 3.1, isNew: true, deprecated: false, maxScore: 66.538, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'model-a-5.4 (xHigh)*', rank: 2, score: 59.1, ci: 3.56, isNew: false, deprecated: false, maxScore: 66.538, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model D*', rank: 3, score: 55, ci: 3.6, isNew: false, deprecated: false, maxScore: 66.538, color: '#6FCBEF' }, // PLACEHOLDER
      ],
    },
    {
      key: 'swe_bench_pro-private',
      href: L,
      name: 'Workflow-Bench Pro (Private Dataset)', // PLACEHOLDER
      description: 'Evaluating long-horizon back-office workflow tasks in public open source repositories',
      category: 'agentic',
      deprecated: true,
      scores: [
        { model: 'Model D 1.1*', rank: 1, score: 51.5, ci: 5.5, isNew: true, deprecated: false, maxScore: 58.71, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'model-c-4-6 (thinking)*', rank: 2, score: 47.1, ci: 6.07, isNew: false, deprecated: false, maxScore: 58.71, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model D*', rank: 3, score: 44.7, ci: 6.05, isNew: false, deprecated: false, maxScore: 58.71, color: '#6FCBEF' }, // PLACEHOLDER
      ],
    },
    {
      key: 'scipredict',
      href: L,
      name: 'CasePredict', // PLACEHOLDER
      description: 'Forecasting real workflow case outcomes',
      category: 'frontier',
      deprecated: true,
      scores: [
        { model: 'model-b-3-pro-preview', rank: 1, score: 25.27, ci: 1.92, isNew: false, deprecated: false, maxScore: 28.005699999999997, color: '#598DD2' }, // PLACEHOLDER
        { model: 'model-c-4-5-20251101', rank: 2, score: 23.05, ci: 0.51, isNew: false, deprecated: false, maxScore: 28.005699999999997, color: '#E27553' }, // PLACEHOLDER
        { model: 'model-c-4-5-20250929', rank: 3, score: 22.55, ci: 0.75, isNew: false, deprecated: false, maxScore: 28.005699999999997, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'humanitys_last_exam',
      href: L,
      name: "Expert's Last Exam", // PLACEHOLDER
      description: 'Challenging agents at the frontier of expert knowledge',
      category: 'frontier',
      deprecated: true,
      scores: [
        { model: 'Model A 6', rank: 1, score: 54.8, ci: 1.94, message: 'Potential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.', isNew: true, deprecated: false, maxScore: 58.4422, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model C 5.1 (xhigh)', rank: 2, score: 46.5, ci: 2, message: 'Potential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.', isNew: true, deprecated: false, maxScore: 58.4422, color: '#E27553' }, // PLACEHOLDER
        { model: 'model-b-3.1-pro-preview (thinking high)', rank: 3, score: 46.44, ci: 1.96, message: 'Potential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.', isNew: false, deprecated: false, maxScore: 58.4422, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
    {
      key: 'humanitys_last_exam_text_only',
      href: L,
      name: "Expert's Last Exam (Text Only)", // PLACEHOLDER
      description: 'Challenging agents at the frontier of expert knowledge',
      category: 'frontier',
      deprecated: true,
      scores: [
        { model: 'Model A 6', rank: 1, score: 54.17, ci: 2.09, message: 'Potential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.', isNew: true, deprecated: false, maxScore: 57.94780000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-b-3.1-pro-preview (thinking high)', rank: 2, score: 47.31, ci: 2.11, message: 'Potential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.', isNew: false, deprecated: false, maxScore: 57.94780000000001, color: '#598DD2' }, // PLACEHOLDER
        { model: 'Model C 5.1 (xhigh)', rank: 3, score: 46.8, ci: 2.1, message: 'Potential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.', isNew: true, deprecated: false, maxScore: 57.94780000000001, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'audiomc',
      href: L,
      name: 'AudioMultiChallenge ', // PLACEHOLDER
      description: 'Evaluating spoken dialogue systems in multi-turn interaction',
      category: 'frontier',
      deprecated: false,
      scores: [
        { model: 'model-b-3.8-flash (high)', rank: 1, score: 60.4, ci: 4.49, isNew: false, deprecated: false, maxScore: 66.83670000000001, color: '#598DD2' }, // PLACEHOLDER
        { model: 'model-h-omni-1', rank: 2, score: 59.69, ci: 4.13, isNew: true, deprecated: false, maxScore: 66.83670000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-b-4 (high)', rank: 3, score: 58.41, ci: 4.53, isNew: true, deprecated: false, maxScore: 66.83670000000001, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
    {
      key: 'audiomc-audio',
      href: L,
      name: 'AudioMultiChallenge  - Audio Output', // PLACEHOLDER
      description: 'Evaluating spoken dialogue systems in multi-turn interaction',
      category: 'frontier',
      deprecated: false,
      scores: [
        { model: 'model-a-realtime-2 (xHigh)', rank: 1, score: 48.45, ci: 4.59, isNew: false, deprecated: false, maxScore: 54.63120000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-j-interaction-small', rank: 2, score: 43.36, ci: 4.55, isNew: false, deprecated: false, maxScore: 54.63120000000001, color: '#9ACD32' }, // PLACEHOLDER
        { model: 'model-a-realtime-2', rank: 3, score: 37.61, ci: 4.45, isNew: false, deprecated: false, maxScore: 54.63120000000001, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'audiomc-text',
      href: L,
      name: 'AudioMultiChallenge - Text Output', // PLACEHOLDER
      description: 'Evaluating spoken dialogue systems in multi-turn interaction',
      category: 'frontier',
      deprecated: false,
      scores: [
        { model: 'model-b-3.8-flash (high)', rank: 1, score: 60.4, ci: 4.49, isNew: true, deprecated: false, maxScore: 66.83670000000001, color: '#598DD2' }, // PLACEHOLDER
        { model: 'model-h-omni-1', rank: 2, score: 59.69, ci: 4.13, isNew: true, deprecated: false, maxScore: 66.83670000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-b-4 (high)', rank: 3, score: 58.41, ci: 4.53, isNew: true, deprecated: false, maxScore: 66.83670000000001, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
    {
      key: 'prbench-finance',
      href: L,
      name: 'Professional Reasoning Benchmark - Finance', // PLACEHOLDER
      description: 'Evaluating Professional Reasoning in Finance',
      category: 'frontier',
      deprecated: false,
      scores: [
        { model: 'Model D 1.3', rank: 1, score: 59.54, ci: 1.66, isNew: true, deprecated: false, maxScore: 63.035999999999994, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'Model D 1.0', rank: 2, score: 58.67, ci: 1.69, isNew: true, deprecated: false, maxScore: 63.035999999999994, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'Model D 1.1', rank: 3, score: 55.01, ci: 0.14, isNew: false, deprecated: false, maxScore: 63.035999999999994, color: '#6FCBEF' }, // PLACEHOLDER
      ],
    },
    {
      key: 'prbench-legal',
      href: L,
      name: 'Professional Reasoning Benchmark - Legal', // PLACEHOLDER
      description: 'Evaluating Professional Reasoning in Legal Practice',
      category: 'frontier',
      deprecated: false,
      scores: [
        { model: 'Model D 1.3', rank: 1, score: 61.56, ci: 1.72, isNew: true, deprecated: false, maxScore: 65.1784, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'Model D Open', rank: 2, score: 59.76, ci: 0.88, isNew: true, deprecated: false, maxScore: 65.1784, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'Model D 1.0', rank: 3, score: 58.4, ci: 1.76, isNew: true, deprecated: false, maxScore: 65.1784, color: '#6FCBEF' }, // PLACEHOLDER
      ],
    },
    {
      key: 'rli',
      href: L,
      name: 'Remote Labor Index (RLI)', // PLACEHOLDER
      description: 'Evaluating AI agents ability to perform real-world, economically valuable remote work',
      category: 'agentic',
      deprecated: false,
      scores: [
        { model: 'Model C 5.5', rank: 1, score: 21.25, ci: 0, isNew: false, deprecated: false, maxScore: 21.8875, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model A 6', rank: 2, score: 20.83, ci: 0, isNew: false, deprecated: false, maxScore: 21.8875, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model C 5.1', rank: 3, score: 17.92, ci: 0, isNew: false, deprecated: false, maxScore: 21.8875, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'propensitybench',
      href: L,
      name: 'PropensityBench', // PLACEHOLDER
      description: 'Simulating real-world pressure to choose between safe or harmful behavior',
      category: 'safety',
      deprecated: true,
      scores: [
        { model: 'model-a-3-2025-04-16', rank: 1, score: 10.5, ci: 0.6, isNew: false, deprecated: false, maxScore: 81.988, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-c-4-20250514', rank: 2, score: 12.2, ci: 0.2, isNew: false, deprecated: false, maxScore: 81.988, color: '#E27553' }, // PLACEHOLDER
        { model: 'model-a-4-mini-2025-04-16', rank: 3, score: 15.8, ci: 0.4, isNew: false, deprecated: false, maxScore: 81.988, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'vtb',
      href: L,
      name: 'VisualToolBench (VTB)', // PLACEHOLDER
      description: 'Evaluating how LLMs can dynamically interact with and reason about visual information',
      category: 'frontier',
      deprecated: true,
      scores: [
        { model: 'Model D 1.1', rank: 1, score: 44.77, ci: 2.82, isNew: true, deprecated: false, maxScore: 49.017700000000005, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'model-a-5.4-2026-03-05 (reasoning effort = high)', rank: 2, score: 29.17, ci: 0.13, isNew: false, deprecated: false, maxScore: 49.017700000000005, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-b-3.1-pro-preview', rank: 3, score: 28.97, ci: 0.91, isNew: false, deprecated: false, maxScore: 49.017700000000005, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
    {
      key: 'multinrc',
      href: L,
      name: 'MultiNRC', // PLACEHOLDER
      description: 'Multilingual Native Reasoning Evaluation Benchmark for LLMs',
      category: 'frontier',
      deprecated: true,
      scores: [
        { model: 'Model D 1.1', rank: 1, score: 65.59, ci: 2.87, isNew: true, deprecated: false, maxScore: 70.5138, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'model-a-5-pro-2025-10-06', rank: 2, score: 65.2, ci: 1.24, message: 'Potential contamination warning: This model was evaluated after the public release of MultiNRC, allowing model builder access to the prompts and solutions.', isNew: false, deprecated: false, maxScore: 70.5138, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-b-3.1-pro-preview', rank: 3, score: 64.74, ci: 2.88, message: 'Potential contamination warning: This model was evaluated after the public release of MultiNRC, allowing model builder access to the prompts and solutions.', isNew: false, deprecated: false, maxScore: 70.5138, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
    {
      key: 'multichallenge-large',
      href: L,
      name: 'MultiChallenge (Large Language Models)', // PLACEHOLDER
      description: 'Assessing models across diverse, interdisciplinary challenges',
      category: 'frontier',
      deprecated: false,
      scores: [
        { model: 'Model A 6.1', rank: 1, score: 81.95, ci: 4.16, isNew: true, deprecated: false, maxScore: 88.69330000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model B 4', rank: 2, score: 78.7, ci: 5.3, isNew: true, deprecated: false, maxScore: 88.69330000000001, color: '#598DD2' }, // PLACEHOLDER
        { model: 'Model D', rank: 3, score: 75.52, ci: 4.05, isNew: false, deprecated: false, maxScore: 88.69330000000001, color: '#6FCBEF' }, // PLACEHOLDER
      ],
    },
    {
      key: 'multichallenge-small',
      href: L,
      name: 'MultiChallenge (Small Language Models)', // PLACEHOLDER
      description: 'Assessing models across diverse, interdisciplinary challenges',
      category: 'frontier',
      deprecated: false,
      scores: [
        { model: 'Model F 3.5 Bolt E4B (Thinking)', rank: 1, score: 56.03, ci: 6.2, isNew: true, deprecated: false, maxScore: 64.0969, color: '#76B900' }, // PLACEHOLDER
        { model: 'Model B 4 E4B (Thinking)', rank: 2, score: 43.23, ci: 6.13, isNew: false, deprecated: false, maxScore: 64.0969, color: '#598DD2' }, // PLACEHOLDER
        { model: 'Model F 3 Nano 4B (Thinking)', rank: 3, score: 38.67, ci: 6.27, isNew: false, deprecated: false, maxScore: 64.0969, color: '#76B900' }, // PLACEHOLDER
      ],
    },
    {
      key: 'fortress',
      href: L,
      name: 'Fortress', // PLACEHOLDER
      description: 'Workflow Risk Evaluation for Regulated Teams and Data Safety',
      category: 'safety',
      deprecated: false,
      scores: [
        { model: 'model-c-5-5-max', rank: 1, score: 5.78, ci: 1.26, message: 'ORS score: 28.78', isNew: true, deprecated: false, maxScore: 79.4233, color: '#E27553' }, // PLACEHOLDER
        { model: 'model-a-oss-120b', rank: 2, score: 8.24, ci: 1.93, message: 'ORS score: 18.00', isNew: false, deprecated: false, maxScore: 79.4233, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model C 5.5', rank: 3, score: 9.48, ci: 1.34, message: 'ORS score: 9.00', isNew: true, deprecated: false, maxScore: 79.4233, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'mask',
      href: L,
      name: 'MASK', // PLACEHOLDER
      description: 'Evaluate model honesty when pressured to lie',
      category: 'safety',
      deprecated: true,
      scores: [
        { model: 'model-c-4-6 (Non-Thinking)', rank: 1, score: 96.28, ci: 0.41, message: 'Potential contamination warning: This model was evaluated after the public release of MASK, allowing model builder access to the prompts and solutions.', isNew: false, deprecated: false, maxScore: 100.54860000000001, color: '#E27553' }, // PLACEHOLDER
        { model: 'model-c-4-5-20250929-thinking', rank: 2, score: 96.13, ci: 0.57, message: 'Potential contamination warning: This model was evaluated after the public release of MASK, allowing model builder access to the prompts and solutions.', isNew: false, deprecated: false, maxScore: 100.54860000000001, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model C 4 (Thinking)', rank: 3, score: 95.33, ci: 2.29, isNew: false, deprecated: false, maxScore: 100.54860000000001, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'enigma_eval',
      href: L,
      name: 'EnigmaEval', // PLACEHOLDER
      description: 'Evaluating model performance on complex, multi-step reasoning tasks',
      category: 'frontier',
      deprecated: true,
      scores: [
        { model: 'model-c-5-high', rank: 1, score: 39.28, ci: 2.8, isNew: false, deprecated: false, maxScore: 43.3424, color: '#E27553' }, // PLACEHOLDER
        { model: 'model-a-5.6-high', rank: 2, score: 37.12, ci: 2.8, isNew: false, deprecated: false, maxScore: 43.3424, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-b-3.1-pro-preview-high', rank: 3, score: 36.78, ci: 2.71, isNew: false, deprecated: false, maxScore: 43.3424, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
    {
      key: 'visual_language_understanding',
      href: L,
      name: 'VISTA', // PLACEHOLDER
      description: 'Vision-Language Understanding benchmark for multimodal models',
      category: 'frontier',
      deprecated: true,
      scores: [
        { model: 'Model B 2.5 Pro Experimental (March 2025)', rank: 1, score: 54.65, ci: 1.46, isNew: false, deprecated: false, maxScore: 57.7933, color: '#598DD2' }, // PLACEHOLDER
        { model: 'model-b-2.5-pro-preview-06-05', rank: 2, score: 54.63, ci: 0.55, isNew: false, deprecated: false, maxScore: 57.7933, color: '#598DD2' }, // PLACEHOLDER
        { model: 'model-a-5.4-pro-2026-03-05', rank: 3, score: 53.89, ci: 2.02, isNew: false, deprecated: false, maxScore: 57.7933, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'tutorbench',
      href: L,
      name: 'OnboardBench', // PLACEHOLDER
      description: 'Evaluating model performance on common onboarding tasks for new hires and frontline teams',
      category: 'frontier',
      deprecated: true,
      scores: [
        { model: 'Model D', rank: 1, score: 68.55, ci: 0.95, isNew: false, deprecated: false, maxScore: 71.58500000000001, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'model-a-5.4-pro-2026-03-05', rank: 2, score: 56.6249, ci: 1.02, isNew: false, deprecated: false, maxScore: 71.58500000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-b-2.5-pro-preview-06-05', rank: 3, score: 55.65, ci: 1.11, isNew: false, deprecated: false, maxScore: 71.58500000000001, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
    {
      key: 'adversarial_robustness',
      href: L,
      name: 'Adversarial Robustness', // PLACEHOLDER
      description: "Retired test for measuring models' resilience against adversarial inputs",
      category: '',
      deprecated: true,
      scores: [
        { model: 'Model B 1.5 Pro (May 2024)', rank: 1, score: 8, ci: 8, isNew: false, deprecated: false, maxScore: 86.52, color: '#598DD2' }, // PLACEHOLDER
        { model: 'Model E 3.1 405B Instruct', rank: 2, score: 10, ci: 8, isNew: false, deprecated: false, maxScore: 86.52, color: '#6FCBEF' }, // PLACEHOLDER
        { model: 'Model C 3', rank: 3, score: 13, ci: 9, isNew: false, deprecated: false, maxScore: 86.52, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'tool_use_chat',
      href: L,
      name: 'Agentic Tool Use (Chat)', // PLACEHOLDER
      description: "Assessing chatbots' proficiency in leveraging external tools",
      category: '',
      deprecated: true,
      scores: [
        { model: 'model-a-3-mini (high)', rank: 1, score: 63.45, ci: 5.52, isNew: false, deprecated: false, maxScore: 71.2657, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model B 2.5 Pro Experimental (March 2025)', rank: 2, score: 62.43, ci: 6.76, message: 'Potential contamination warning: Model B 2.5 Pro Experimental (March 2025) was evaluated  after Model B 1.5 Pro (May 2024), possibly allowing the vendor to access the prompt set from API logs.', isNew: true, deprecated: false, maxScore: 71.2657, color: '#598DD2' }, // PLACEHOLDER
        { model: 'model-a-3-mini (medium)', rank: 3, score: 62.42, ci: 6.76, isNew: false, deprecated: false, maxScore: 71.2657, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'tool_use_enterprise',
      href: L,
      name: 'Agentic Tool Use (Enterprise)', // PLACEHOLDER
      description: "Evaluating AI agents' ability to use enterprise tools effectively",
      category: '',
      deprecated: true,
      scores: [
        { model: 'Model A 1 (December 2024)', rank: 1, score: 70.14, ci: 5.32, isNew: false, deprecated: false, maxScore: 77.72380000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model B 2.5 Pro Experimental (March 2025)', rank: 2, score: 68.75, ci: 5.35, message: 'Potential contamination warning: Model B 2.5 Pro Experimental (March 2025) was evaluated  after Model B 1.5 Pro (May 2024), possibly allowing the vendor to access the prompt set from API logs.', isNew: true, deprecated: false, maxScore: 77.72380000000001, color: '#598DD2' }, // PLACEHOLDER
        { model: 'Model A 1 Pro (March 2025)', rank: 3, score: 67.01, ci: 5.43, message: "Model A 1 Pro (March 2025) - Potential contamination warning: Model A 1 was evaluated after model-a-4o possibly allowing the vendor to access the prompt set from API logs. However, the vendor's policy states they don't train on these data.", isNew: true, deprecated: false, maxScore: 77.72380000000001, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'humanitys_last_exam_preview',
      href: L,
      name: "Expert's Last Exam (Preview)", // PLACEHOLDER
      description: 'Challenging agents at the frontier of expert knowledge',
      category: 'frontier',
      deprecated: true,
      scores: [
        { model: 'Model B 2.5 Pro Experimental (March 2025)', rank: 1, score: 18.81, ci: 1.47, message: 'Potential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.\n\nSampled at temperature = 1.0, top_p = 0.95.', isNew: false, deprecated: false, maxScore: 20.888399999999997, color: '#598DD2' }, // PLACEHOLDER
        { model: 'Model A 1 Pro (March 2025)*', rank: 2, score: 9.15, ci: 1.09, message: 'model-a-1-Pro: 7% (193 prompts) failed due to a post-training bug and were counted as failures. The vendor has been informed and is working on a fix.\n---\nPotential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.', isNew: false, deprecated: false, maxScore: 20.888399999999997, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model C 3.7 (thinking)', rank: 3, score: 8.93, ci: 1.08, message: 'Thinking budget: 16,000 tokens.\n\nPotential contamination warning: This model was evaluated after the public release of ELE, allowing model builder access to the prompts and solutions.', isNew: false, deprecated: false, maxScore: 20.888399999999997, color: '#E27553' }, // PLACEHOLDER
      ],
    },
    {
      key: 'instruction_following',
      href: L,
      name: 'Instruction Following', // PLACEHOLDER
      description: "Former benchmark for assessing models' ability to follow complex instructions",
      category: '',
      deprecated: true,
      scores: [
        { model: 'Model A 1 (December 2024)', rank: 1, score: 91.96, ci: 1.6, isNew: false, deprecated: false, maxScore: 96.36679999999998, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model G R1', rank: 2, score: 87.75, ci: 1.91, isNew: false, deprecated: false, maxScore: 96.36679999999998, color: '#E39CAB' }, // PLACEHOLDER
        { model: 'model-a-1-preview', rank: 3, score: 86.58, ci: 1.58, isNew: false, deprecated: false, maxScore: 96.36679999999998, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'arabic',
      href: L,
      name: 'Arabic', // PLACEHOLDER
      description: 'Assessing performance on Arabic language understanding and generation',
      category: '',
      deprecated: true,
      flag: 'SA',
      scores: [
        { model: 'Model B 1.5 Pro (August 27, 2024)', rank: 1, score: 1147, ci: 33, isNew: false, deprecated: false, maxScore: 1215.4, color: '#598DD2' }, // PLACEHOLDER
        { model: 'Model B 2.0 Pro (December 2024)', rank: 2, score: 1138, ci: 29, isNew: false, deprecated: false, maxScore: 1215.4, color: '#598DD2' }, // PLACEHOLDER
        { model: 'Model A 1 (December 2024)', rank: 3, score: 1120, ci: 27, isNew: false, deprecated: false, maxScore: 1215.4, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'chinese',
      href: L,
      name: 'Chinese', // PLACEHOLDER
      description: "Evaluating language models' proficiency in Chinese language tasks",
      category: '',
      deprecated: true,
      flag: 'CN',
      scores: [
        { model: 'Model A 1 (December 2024)', rank: 1, score: 1165, ci: 30, isNew: false, deprecated: false, maxScore: 1230.8500000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-a-3-mini', rank: 2, score: 1156, ci: 32, isNew: false, deprecated: false, maxScore: 1230.8500000000001, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model B 1.5 Pro (August 27, 2024)', rank: 3, score: 1120, ci: 35, isNew: false, deprecated: false, maxScore: 1230.8500000000001, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
    {
      key: 'coding',
      href: L,
      name: 'Coding', // PLACEHOLDER
      description: "Assessing models' ability to understand and generate programming code",
      category: '',
      deprecated: true,
      scores: [
        { model: 'model-a-1-mini', rank: 1, score: 1237, ci: 31, message: "Potential contamination warning: Model A 1 was evaluated approximately 4 months after Model-A-4 (May 2024), possibly allowing the vendor to access the prompt set from API logs. However, the vendor's policy states they don't train on these data.", isNew: false, deprecated: false, maxScore: 1306.04, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'model-a-3-mini', rank: 2, score: 1137, ci: 34, isNew: false, deprecated: false, maxScore: 1306.04, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model-A-4 (November 2024)', rank: 3, score: 1132, ci: 31, isNew: false, deprecated: false, maxScore: 1306.04, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'japanese',
      href: L,
      name: 'Japanese', // PLACEHOLDER
      description: "Testing models' proficiency in Japanese language tasks and cultural nuances",
      category: '',
      deprecated: true,
      flag: 'JP',
      scores: [
        { model: 'model-a-1-preview', rank: 1, score: 1118, ci: 43, isNew: false, deprecated: false, maxScore: 1195.83, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model B 2.0 Pro (December 2024)', rank: 2, score: 1117, ci: 36, isNew: false, deprecated: false, maxScore: 1195.83, color: '#598DD2' }, // PLACEHOLDER
        { model: 'model-a-3-mini', rank: 3, score: 1104, ci: 31, isNew: false, deprecated: false, maxScore: 1195.83, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'korean',
      href: L,
      name: 'Korean', // PLACEHOLDER
      description: 'Measuring capabilities in Korean language processing and comprehension',
      category: '',
      deprecated: true,
      flag: 'KR',
      scores: [
        { model: 'model-a-1-preview', rank: 1, score: 66.43, ci: 5.47, isNew: false, deprecated: false, maxScore: 74.057, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model C 3.7 (February 2025)', rank: 2, score: 64.93, ci: 5.51, isNew: false, deprecated: false, maxScore: 74.057, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model-A-4 (May 2024)', rank: 3, score: 64.58, ci: 5.52, isNew: false, deprecated: false, maxScore: 74.057, color: '#65C2B9' }, // PLACEHOLDER
      ],
    },
    {
      key: 'math',
      href: L,
      name: 'Math', // PLACEHOLDER
      description: 'Previously used for evaluating mathematical problem-solving capabilities',
      category: '',
      deprecated: true,
      scores: [
        { model: 'Model C 3.5 (June 2024)', rank: 1, score: 96.6, ci: 1.02, isNew: false, deprecated: false, maxScore: 100.5486, color: '#E27553' }, // PLACEHOLDER
        { model: 'Model-A-4 (August 2024)', rank: 2, score: 95.68, ci: 1.15, isNew: false, deprecated: false, maxScore: 100.5486, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model E 3.1 405B Instruct', rank: 3, score: 95.6, ci: 1.16, isNew: false, deprecated: false, maxScore: 100.5486, color: '#6FCBEF' }, // PLACEHOLDER
      ],
    },
    {
      key: 'spanish',
      href: L,
      name: 'Spanish', // PLACEHOLDER
      description: 'Evaluating Spanish language skills across various linguistic challenges',
      category: '',
      deprecated: true,
      flag: 'ES',
      scores: [
        { model: 'Model B 2.0 Pro (December 2024)', rank: 1, score: 1176, ci: 38, isNew: false, deprecated: false, maxScore: 1250.42, color: '#598DD2' }, // PLACEHOLDER
        { model: 'Model A 1 (December 2024)', rank: 2, score: 1134, ci: 36, isNew: false, deprecated: false, maxScore: 1250.42, color: '#65C2B9' }, // PLACEHOLDER
        { model: 'Model B Pro Lite 2', rank: 3, score: 1119, ci: 32, isNew: false, deprecated: false, maxScore: 1250.42, color: '#598DD2' }, // PLACEHOLDER
      ],
    },
  ],
}
