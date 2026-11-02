// Copy for /rlenvironments: the AI Product Engineering service. Same shape and counts as content.scale.ts.
// Scale's page has no numbers, customers, case studies or quotes, so no line here needs a PLACEHOLDER mark.
import type { RlEnvironmentsContent } from './types'

export const content: RlEnvironmentsContent = {
  meta: {
    title: 'AI Product Engineering | From Prototype to Production | Vahue',
    description: 'We build your AI product or feature and take it from prototype to production, for product and engineering leaders without every specialist in-house.',
  },
  hero: {
    headline: 'AI Product Engineering',
    body: 'We build your AI product or feature and take it from prototype to production, for product and engineering leaders without every specialist in-house.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#ffffff' },
    video: { url: '/rlenvironments/hero.mp4' },
    image: { path: '/rlenvironments/hero.webp' },
  },
  features: {
    overtitle: 'Features',
    title: 'Made for Production',
    cards: [
      { key: 'at-1', icon: 'bv', iconColor: '#273252', title: 'Built Into Your Real Product', description: 'Features, APIs, and MCP servers that work with your codebase, your data, and the systems your users already rely on.' },
      { key: 'at-2', icon: 'dz', iconColor: '#193A29', title: 'Every Discipline, No Hiring Round', description: 'LLM, backend, data, evals, and product engineers on one team, so going from prototype to live does not wait on assembling every specialist yourself.' },
      { key: 'at-3', icon: 'nz', iconColor: '#79648C', title: 'Hard Features with Verifiable Outcomes', description: 'Evals, rubrics, and automated checks built on your own cases, so quality is measured rather than argued and hallucinations get caught before your users see them.' },
      { key: 'at-4', icon: 'ba', iconColor: '#A8927C', title: 'Your Code, Your IP, Your Control', description: 'You own the code and IP, in your repositories and your cloud. Documented for your team to extend, or we stay and run it.' },
    ],
  },
  overview: {
    overtitle: 'Overview',
    title: 'Inside a Vahue Product Build',
    cards: [
      { title: 'Built to Reach a Credible Release', subtitle: 'We start from the job your users need done, then scope the smallest AI feature that does it, with your data and a clear release target.', image: { src: '/rlenvironments/product-built-to-advance.webp', alt: 'Dashboards and tables showing delivery metrics.' } },
      { title: 'Systems That Are Not a Black Box', subtitle: 'Logs, traces, and application state on every run, so your team can see why the AI did what it did. Latency and token cost get tracked under real load.', image: { src: '/rlenvironments/product-systems-signals.webp', alt: 'Code and developer tools connected to a review window.' } },
      { title: 'Handover-Ready by Default', subtitle: 'Each release ships with docs, tests, evals, and runbooks, and we walk your engineers through them, so no one is left holding a system they cannot change.', image: { src: '/rlenvironments/product-rl-ready-data.webp', alt: 'Shared folders with a checklist and two team members.' } },
    ],
  },
  capabilities: {
    overtitle: 'Capabilities',
    title: 'Coverage That Matches Production-grade Systems',
    items: [
      { title: 'AI Features and Agents', description: 'Copilots, search, drafting, and agents that take real actions inside your product, tested on real user tasks before release.', textSide: 'left', image: { src: '/rlenvironments/capability-computer-use.webp', alt: 'Agent execution log beside its verifier.', width: 598, height: 820 } },
      { title: 'MCP and Tool Integrations', description: 'Connect your product to real tools via MCP servers and APIs — Slack, HubSpot, Linear, and more — without building every connector by hand.', textSide: 'right', image: { src: '/rlenvironments/capability-tool-mcp.webp', alt: 'Agent working through a checklist of tool calls.', width: 598, height: 900 } },
    ],
  },
  pillars: {
    overtitle: 'Available as',
    heading: 'Ways to Build',
    subtitle: 'Three starting points — each designed around where your AI product stands today.',
    video: { url: '/rlenvironments/pillars.mp4' },
    cards: [
      { key: 'ep-1', icon: 'y4', iconColor: '#273252', headline: 'New Product', subtitle: 'An AI-first product or MVP, from first spec to first release.' },
      { key: 'ep-2', icon: 'kb', iconColor: '#193A29', headline: 'New Feature', subtitle: 'An AI capability inside the product you already ship.' },
      { key: 'ep-3', icon: 'wc', iconColor: '#839CB2', headline: 'Prototype to Production', subtitle: 'An internal proof of concept made reliable, scalable, and live.' },
    ],
  },
  prefooter: {
    headline: 'Take Your Prototype to Production',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: '/rlenvironments/prefooter.webp' },
  },
}
