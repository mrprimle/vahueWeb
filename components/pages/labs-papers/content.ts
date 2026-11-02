// Copy for /labs/papers. Keep first: Scale's string stays unless it is false for Vahue, brand words swap, the rest changes by a few words.
// Same shape as content.scale.ts. Scale lists 88 papers; this keeps the first 24 slots with their dates, category patterns and author counts (capped at 9, as /labs does).
// Rows 1 to 6 equal the papers on /labs. Every row is a PLACEHOLDER Mike must confirm or replace: Vahue has no published paper behind these titles yet.
// Scale's category names: Multimodal = Voice, Computer Vision = Documents, Post-Training = Baselines, Science of Data = Science of Context, matching /labs.
// Row 17 has no category because Scale's slot has none.
import type { LabsPapersContent } from './types'

const P = '/labs/papers'
const names = (n: number) => Array.from({ length: n }, () => 'Full Name')
const figure = (i: number) => `/labs/figures/figure-${(i % 6) + 1}.svg` // PLACEHOLDER: six neutral diagrams from /labs, repeated

export const content: LabsPapersContent = {
  meta: {
    title: 'Papers - Vahue Labs | Vahue Labs',
    description: 'Research papers and publications from Vahue Labs covering AI evaluation, safety, and benchmarking.',
  },
  heading: '[Papers]',
  blurb: 'Research papers and publications from Vahue Labs covering AI evaluation, safety, benchmarking, and business agent analysis.',
  allLabel: 'All',
  columns: { date: 'Date', title: 'Title', category: 'Category' },
  noImage: 'No image',
  found: { one: 'paper', many: 'papers', suffix: 'found' },
  empty: 'No papers found in this category.',
  papers: [
    { id: "exceptionbench", slug: "exceptionbench", title: "ExceptionBench: Evaluating Multi-Dimensional Human Handoff in Business Agents", href: P, date: "10/9/2026", dateSort: "2026-10-09T15:00:00.000Z", categories: ["Safety & Oversight"], authors: names(4), image: figure(0) }, // PLACEHOLDER
    { id: "support-s-sixth-sense", slug: "support-s-sixth-sense", title: "Support's Sixth Sense: Benchmarking Intent Reasoning in Voice and Chat Agents", href: P, date: "10/7/2026", dateSort: "2026-10-07T22:17:00.000Z", categories: ["Voice"], authors: names(9), image: figure(1) }, // PLACEHOLDER
    { id: "steerintake", slug: "steerintake", title: "SteerIntake: Steerable Document Intake for Invoices and Claims", href: P, date: "9/17/2026", dateSort: "2026-09-17T23:01:00.000Z", categories: ["Documents"], authors: names(9), image: figure(2) }, // PLACEHOLDER
    { id: "ready-or-not", slug: "ready-or-not", title: "READY or Not: Reliable Mid-Market Agent Deployment", href: P, date: "9/4/2026", dateSort: "2026-09-04T04:38:00.000Z", categories: ["Agents", "Enterprise"], authors: names(9), image: figure(3) }, // PLACEHOLDER
    { id: "spine-branch-coordination-for-multi-agent-back-office-sync", slug: "spine-branch-coordination-for-multi-agent-back-office-sync", title: "Spine-Branch Coordination for Multi-agent Back-office Sync", href: P, date: "8/27/2026", dateSort: "2026-08-27T16:55:00.000Z", categories: ["Agents"], authors: names(8), image: figure(4) }, // PLACEHOLDER
    { id: "claimcare-bench", slug: "claimcare-bench", title: "ClaimCARE-Bench: Calibrated Audit of Agent Reasoning in Claims Handling", href: P, date: "8/20/2026", dateSort: "2026-08-20T16:28:47Z", categories: ["Evaluation and Alignment"], authors: names(9), image: figure(5) }, // PLACEHOLDER
    { id: "harnessopt-bench", slug: "harnessopt-bench", title: "HarnessOpt-Bench: Evaluating Agents at Harness Optimization", href: P, date: "8/6/2026", dateSort: "2026-08-06T16:50:54Z", categories: ["Agents", "Enterprise", "Evaluation and Alignment"], authors: names(7), image: figure(6) }, // PLACEHOLDER
    { id: "quotebench", slug: "quotebench", title: "QuoteBench: Can Sales Agents Assist Early-Stage Quote Preparation?", href: P, date: "6/30/2026", dateSort: "2026-06-30T20:49:00.000Z", categories: ["Agents", "Enterprise", "Evaluation and Alignment"], authors: names(9), image: figure(7) }, // PLACEHOLDER
    { id: "crm-interact", slug: "crm-interact", title: "CRM-INTERACT: Reimagining CRM Benchmarks as User-Driven Long-Horizon Sales Sessions", href: P, date: "6/29/2026", dateSort: "2026-06-29T15:04:00.000Z", categories: ["Agents", "Evaluation and Alignment"], authors: names(4), image: figure(8) }, // PLACEHOLDER
    { id: "closeworld", slug: "closeworld", title: "CloseWorld: Composing Long-Horizon Back-office Workloads from Atomic Finance Tasks", href: P, date: "6/19/2026", dateSort: "2026-06-19T15:23:00.000Z", categories: ["Agents", "Evaluation and Alignment"], authors: names(5), image: figure(9) }, // PLACEHOLDER
    { id: "rubric-guided-baselines", slug: "rubric-guided-baselines", title: "Rubric-Guided Baselines: Agent Scoring Without Rubric Verifiers", href: P, date: "6/10/2026", dateSort: "2026-06-10T18:18:00.000Z", categories: ["Baselines"], authors: names(9), image: figure(10) }, // PLACEHOLDER
    { id: "ticketbench", slug: "ticketbench", title: "TicketBench: A Controllable and Verifiable Benchmark for Evaluating Agents in Support Ticket Triage", href: P, date: "6/9/2026", dateSort: "2026-06-09T21:00:00.000Z", categories: ["Evaluation and Alignment", "Agents", "Enterprise"], authors: names(9), image: figure(11) }, // PLACEHOLDER
    { id: "insights-generator", slug: "insights-generator", title: "Insights Generator: Systematic Corpus-Level Trace Diagnostics for Business Agents", href: P, date: "6/4/2026", dateSort: "2026-06-04T19:17:00.000Z", categories: ["Agents", "Evaluation and Alignment", "Enterprise"], authors: names(9), image: figure(12) }, // PLACEHOLDER
    { id: "arca", slug: "arca", title: "ARCA: Agent-Residual Credit Assignment When Baseline Signals Degenerate", href: P, date: "5/29/2026", dateSort: "2026-05-29T15:27:00.000Z", categories: ["Baselines", "Reasoning"], authors: names(1), image: figure(13) }, // PLACEHOLDER
    { id: "not-every-rubric-scores-equally", slug: "not-every-rubric-scores-equally", title: "Not Every Rubric Scores Equally: Policy-Aware Rubric Rewards for Agent Evals", href: P, date: "5/19/2026", dateSort: "2026-05-19T19:48:00.000Z", categories: ["Baselines", "Reasoning"], authors: names(8), image: figure(14) }, // PLACEHOLDER
    { id: "aspi", slug: "aspi", title: "ASPI: Seeking Ambiguity Clarification Amplifies Prompt Injection Vulnerability in Business Agents", href: P, date: "5/17/2026", dateSort: "2026-05-17T18:08:00.000Z", categories: ["Safety & Oversight", "Agents", "Evaluation and Alignment"], authors: names(6), image: figure(15) }, // PLACEHOLDER
    { id: "inbox-fortress", slug: "inbox-fortress", title: "INBOX-FORTRESS: Measuring the Effect of Regional Translation for Customer Support and Compliance Teams", href: P, date: "5/13/2026", dateSort: "2026-05-13T15:44:00.000Z", categories: [], authors: names(9), image: figure(16) }, // PLACEHOLDER
    { id: "metric-hacking-in-rubric-based-agent-evaluation", slug: "metric-hacking-in-rubric-based-agent-evaluation", title: "Metric Hacking in Rubric-Based Agent Evaluation", href: P, date: "5/12/2026", dateSort: "2026-05-12T19:15:00.000Z", categories: ["Safety & Oversight", "Baselines"], authors: names(6), image: figure(17) }, // PLACEHOLDER
    { id: "support-atlas", slug: "support-atlas", title: "Support Atlas: Benchmarking Service Agents Beyond Ticket Resolution", href: P, date: "5/7/2026", dateSort: "2026-05-07T16:32:00.000Z", categories: ["Evaluation and Alignment", "Agents"], authors: names(9), image: figure(18) }, // PLACEHOLDER
    { id: "coverage-not-averages", slug: "coverage-not-averages", title: "Coverage, Not Averages: Semantic Stratification for Trustworthy Knowledge Evaluation", href: P, date: "4/22/2026", dateSort: "2026-04-22T20:01:00.000Z", categories: ["Evaluation and Alignment", "Science of Context", "Enterprise"], authors: names(6), image: figure(19) }, // PLACEHOLDER
    { id: "hil-evals-human-in-loop-evaluation", slug: "hil-evals-human-in-loop-evaluation", title: "HiL-EVALS (Human-in-Loop Evaluation)", href: P, date: "4/13/2026", dateSort: "2026-04-13T20:09:00.000Z", categories: ["Evaluation and Alignment", "Safety & Oversight"], authors: names(9), image: figure(20) }, // PLACEHOLDER
    { id: "over-escalation-bias", slug: "over-escalation-bias", title: "Over-Escalation Bias: How Safety Alignment Fails Support Teams", href: P, date: "3/12/2026", dateSort: "2026-03-12T02:35:00.000Z", categories: ["Safety & Oversight"], authors: names(8), image: figure(21) }, // PLACEHOLDER
    { id: "agent-novice-uplift-on-regulated-high-stakes-finance-tasks", slug: "agent-novice-uplift-on-regulated-high-stakes-finance-tasks", title: "Agent Novice Uplift on Regulated, High-Stakes Finance Tasks", href: P, date: "2/26/2026", dateSort: "2026-02-26T14:25:00.000Z", categories: ["Safety & Oversight"], authors: names(9), image: figure(22) }, // PLACEHOLDER
    { id: "casero", slug: "casero", title: "CaseRO: An Evaluation Harness for Agents to Optimize Agents", href: P, date: "2/25/2026", dateSort: "2026-02-25T18:00:00.000Z", categories: ["Agents", "Baselines", "Evaluation and Alignment"], authors: names(5), image: figure(23) }, // PLACEHOLDER
  ],
}
