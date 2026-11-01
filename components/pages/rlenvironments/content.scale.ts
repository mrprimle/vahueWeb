// Scale's original strings for https://scale.com/rlenvironments, from module 799680 in 3za68ndmpk06v.js.
import type { RlEnvironmentsContent } from './types'

export const content: RlEnvironmentsContent = {
  meta: {
    title: 'Reinforcement Learning Environments for AI Agents | Scale AI',
    description: 'Accelerate reinforcement learning with realistic simulations. Scale AI provides RL environments for training agents on desktop VMs, MCP servers, and workflows.',
  },
  hero: {
    headline: 'RL Environments',
    body: 'Train and evaluate agents to excel at long-horizon, professional workflows.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#ffffff' },
    video: { url: '/rlenvironments/hero.mp4' },
    image: { path: '/rlenvironments/hero.webp' },
  },
  features: {
    overtitle: 'Features',
    title: 'Made for Agent Training',
    cards: [
      { key: 'at-1', icon: 'bv', iconColor: '#273252', title: 'Real Applications, Rebuilt for RL', description: 'Simulated APIs, MCP servers, and GUIs that behave like the systems agents actually use.' },
      { key: 'at-2', icon: 'dz', iconColor: '#193A29', title: 'Expert-Curated Artifacts', description: 'Files (PDFs, CSVs, PPTs, etc.), data, and state settings that reflect real professional workflows, sourced from real business settings, capturing natural messiness.' },
      { key: 'at-3', icon: 'nz', iconColor: '#79648C', title: 'Hard Tasks with Verifiable Outcomes', description: 'Expert-designed objectives, rubrics, and automated verifiers that produce stable training signals for programmatic process and outcome evaluation.' },
      { key: 'at-4', icon: 'ba', iconColor: '#A8927C', title: 'Easy Integration and Environment Control', description: 'Compatible with standard environment interfaces, supporting trajectories, resetting state, examining rewards, and more.' },
    ],
  },
  overview: {
    overtitle: 'Overview',
    title: "Inside Scale AI's RL Environments",
    cards: [
      { title: 'Built to Advance Agent Capabilities', subtitle: "Scale AI's RL Environments are simulated collections of realistic applications designed to train and evaluate agent behavior.", image: { src: '/rlenvironments/product-built-to-advance.webp', alt: 'Spreadsheet-based RL environment for AI agent training.' } },
      { title: 'Systems for Stronger Learning Signals', subtitle: 'They mirror real computer and API-based systems, supporting rich logs and application state that can be used for programmatic and rubric-based evaluation.', image: { src: '/rlenvironments/product-systems-signals.webp', alt: 'RL environment modeling developer tools and APIs.' } },
      { title: 'RL-Ready Expert Data', subtitle: 'Each environment combines simulated interfaces with expert-curated data and evaluators to produce reliable learning signals. Scale also provides analysis on complexity (pass@k) and anticipated training gains.', image: { src: '/rlenvironments/product-rl-ready-data.webp', alt: 'RL environment simulating file management and document systems.' } },
    ],
  },
  capabilities: {
    overtitle: 'Capabilities',
    title: 'Coverage That Matches Production-grade Systems',
    items: [
      { title: 'Computer Use Environments', description: 'Train agents to navigate and operate realistic desktop and web environments, including macOS- and Windows-like systems.', textSide: 'left', image: { src: '/rlenvironments/capability-computer-use.webp', alt: 'GUI agent executor in a calendar application.', width: 598, height: 820 } },
      { title: 'MCP / Tool Use Environments', description: 'Train agents to reason over and use real tools via MCP servers — Slack, HubSpot, Linear, and more.', textSide: 'right', image: { src: '/rlenvironments/capability-tool-mcp.webp', alt: 'AI agent operating across enterprise apps through MCP.', width: 598, height: 900 } },
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
    headline: 'Try Scale RL Environments',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: '/rlenvironments/prefooter.webp' },
  },
}
