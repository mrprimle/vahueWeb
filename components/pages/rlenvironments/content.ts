// Scale's copy under the 80% rule for /rlenvironments ("Agent Environments" in the menu). Same shape and counts as content.scale.ts.
// Scale's page has no numbers, customers, case studies or quotes, so nothing here is a placeholder.
import type { RlEnvironmentsContent } from './types'

export const content: RlEnvironmentsContent = {
  meta: {
    title: 'Agent Environments for AI Agents | Vahue',
    description: 'Accelerate agent deployment with realistic simulations. Vahue provides agent environments for testing agents on desktop VMs, MCP servers, and workflows.',
  },
  hero: {
    headline: 'Agent Environments',
    body: 'Train and evaluate agents to excel at long-horizon, professional workflows.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#ffffff' },
    video: { url: '/rlenvironments/hero.mp4' },
    image: { path: '/rlenvironments/hero.webp' },
  },
  features: {
    overtitle: 'Features',
    title: 'Made for Agent Testing',
    cards: [
      { key: 'at-1', icon: 'bv', iconColor: '#273252', title: 'Real Applications, Rebuilt for Agents', description: 'Simulated APIs, MCP servers, and GUIs that behave like the systems agents actually use.' },
      { key: 'at-2', icon: 'dz', iconColor: '#193A29', title: 'Expert-Curated Artifacts', description: 'Files (PDFs, CSVs, PPTs, etc.), data, and state settings that reflect real professional workflows, sourced from real business settings, capturing natural messiness.' },
      { key: 'at-3', icon: 'nz', iconColor: '#79648C', title: 'Hard Tasks with Verifiable Outcomes', description: 'Expert-designed objectives, rubrics, and automated verifiers that produce stable quality signals for programmatic process and outcome evaluation.' },
      { key: 'at-4', icon: 'ba', iconColor: '#A8927C', title: 'Easy Integration and Environment Control', description: 'Compatible with standard environment interfaces, supporting run histories, resetting state, examining outcomes, and more.' },
    ],
  },
  overview: {
    overtitle: 'Overview',
    title: "Inside Vahue's Agent Environments",
    cards: [
      { title: 'Built to Advance Agent Capabilities', subtitle: "Vahue's Agent Environments are simulated collections of realistic applications designed to train and evaluate agent behavior.", image: { src: '/rlenvironments/product-built-to-advance.webp', alt: 'Dashboards and tables showing delivery metrics.' } },
      { title: 'Systems for Stronger Test Signals', subtitle: 'They mirror real computer and API-based systems, supporting rich logs and application state that can be used for programmatic and rubric-based evaluation.', image: { src: '/rlenvironments/product-systems-signals.webp', alt: 'Code and developer tools connected to a review window.' } },
      { title: 'Agent-Ready Expert Data', subtitle: 'Each environment combines simulated interfaces with expert-curated data and evaluators to produce reliable test signals. Vahue also provides analysis on complexity (pass rates) and anticipated production gains.', image: { src: '/rlenvironments/product-rl-ready-data.webp', alt: 'Shared folders with a checklist and two team members.' } },
    ],
  },
  capabilities: {
    overtitle: 'Capabilities',
    title: 'Coverage That Matches Production-grade Systems',
    items: [
      { title: 'Computer Use Environments', description: 'Train agents to navigate and operate realistic desktop and web environments, including macOS- and Windows-like systems.', textSide: 'left', image: { src: '/rlenvironments/capability-computer-use.webp', alt: 'Agent execution log beside its verifier.', width: 598, height: 820 } },
      { title: 'MCP / Tool Use Environments', description: 'Train agents to reason over and use real tools via MCP servers — Slack, HubSpot, Linear, and more.', textSide: 'right', image: { src: '/rlenvironments/capability-tool-mcp.webp', alt: 'Agent working through a checklist of tool calls.', width: 598, height: 900 } },
    ],
  },
  pillars: {
    overtitle: 'Available as',
    heading: 'Environment Types',
    subtitle: 'Three types of simulated environments — each designed to match the systems agents operate in production.',
    video: { url: '/rlenvironments/pillars.mp4' },
    cards: [
      { key: 'ep-1', icon: 'y4', iconColor: '#273252', headline: 'Web Apps', subtitle: 'Browser-based SaaS and productivity apps.' },
      { key: 'ep-2', icon: 'kb', iconColor: '#193A29', headline: 'Desktop VMs', subtitle: 'macOS- and Windows-like operating system environments.' },
      { key: 'ep-3', icon: 'wc', iconColor: '#839CB2', headline: 'MCP Servers', subtitle: 'Real enterprise tools — Slack, HubSpot, Linear, and more.' },
    ],
  },
  prefooter: {
    headline: 'Try Vahue Agent Environments',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: '/rlenvironments/prefooter.webp' },
  },
}
