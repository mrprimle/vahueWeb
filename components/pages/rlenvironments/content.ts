// Copy for /rlenvironments ("Engineering Enablement" in the menu), from research/research.ts and the full NMT research.
// Same shape and counts as content.scale.ts. Scale's page has no numbers, customers, case studies or quotes, so nothing here is a placeholder.
import type { RlEnvironmentsContent } from './types'

export const content: RlEnvironmentsContent = {
  meta: {
    title: 'Engineering Enablement | Vahue',
    description: 'Make your engineering team AI-native with agents for code review, tests and documentation, measured against a control group.',
  },
  hero: {
    headline: 'Engineering Enablement',
    body: 'Make your engineering team AI-native, measured against a control group.',
    cta: { text: 'Book an Audit', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#ffffff' },
    video: { url: '/rlenvironments/hero.mp4' },
    image: { path: '/rlenvironments/hero.webp' },
  },
  features: {
    overtitle: 'Features',
    title: 'Made for Delivery Teams',
    cards: [
      { key: 'at-1', icon: 'bv', iconColor: '#273252', title: 'Real Tools, Ready for Agents', description: 'Code review, test and documentation agents that work in GitHub, GitLab, and Jira.' },
      { key: 'at-2', icon: 'dz', iconColor: '#193A29', title: 'Engineer-Curated Practices', description: 'Rules (style guides, checklists, test patterns, etc.), prompts, and context that reflect how your teams ship, drawn from your own repositories and legacy code.' },
      { key: 'at-3', icon: 'nz', iconColor: '#79648C', title: 'Measured Against a Control Group', description: 'Agreed baselines, delivery metrics, and a comparable team that show how much agents improve cycle time and defect rates.' },
      { key: 'at-4', icon: 'ba', iconColor: '#A8927C', title: 'Easy Integration and Repository Control', description: 'Compatible with standard pull-request workflows, keeping code inside your repositories, reviewing security before every rollout.' },
    ],
  },
  overview: {
    overtitle: 'Overview',
    title: "Inside Vahue's Engineering Rollout",
    cards: [
      { title: 'Built for Uneven AI Adoption', subtitle: "Vahue's Engineering Enablement brings agents and practices to teams where AI tools are adopted unevenly and impact goes unmeasured.", image: { src: '/rlenvironments/product-built-to-advance.webp', alt: 'Dashboards and tables showing delivery metrics.' } },
      { title: 'Systems for Stronger Engineering Signals', subtitle: 'They measure delivery on a comparable team first, using pull request, review and defect data that can show every gain against the agreed baseline.', image: { src: '/rlenvironments/product-systems-signals.webp', alt: 'Code and developer tools connected to a review window.' } },
      { title: 'Team-Ready Expert Coaching', subtitle: 'Each rollout combines agents with pairing and internal champions to spread what works across teams. Vahue also provides weekly reporting on adoption (per team) and measured delivery gains.', image: { src: '/rlenvironments/product-rl-ready-data.webp', alt: 'Shared folders with a checklist and two team members.' } },
    ],
  },
  capabilities: {
    overtitle: 'Capabilities',
    title: 'Coverage That Matches Production-grade Codebases',
    items: [
      { title: 'Code Review Agents', description: 'Give engineers agents that read and review real pull requests and inherited code, including GitHub and GitLab repositories.', textSide: 'left', image: { src: '/rlenvironments/capability-computer-use.webp', alt: 'Agent execution log beside its verifier.', width: 598, height: 820 } },
      { title: 'Test / Documentation Agents', description: 'Let agents write tests and keep documentation current in your real tools via integrations — GitHub, GitLab, Jira, and more.', textSide: 'right', image: { src: '/rlenvironments/capability-tool-mcp.webp', alt: 'Agent working through a checklist of tool calls.', width: 598, height: 900 } },
    ],
  },
  pillars: {
    overtitle: 'Available as',
    heading: 'Engagement Stages',
    subtitle: 'Three stages of one engineering rollout — each designed to prove the gain before the next team joins.',
    video: { url: '/rlenvironments/pillars.mp4' },
    cards: [
      { key: 'ep-1', icon: 'y4', iconColor: '#273252', headline: 'Two-Week Audit', subtitle: "Measure a comparable team's delivery." },
      { key: 'ep-2', icon: 'kb', iconColor: '#193A29', headline: 'One-Team Pilot', subtitle: 'Agents and practices, measured on one team for 12 weeks.' },
      { key: 'ep-3', icon: 'wc', iconColor: '#839CB2', headline: 'Operate Monthly', subtitle: 'Roll out in waves — coaching, champions, data, and more.' },
    ],
  },
  prefooter: {
    headline: 'Try Engineering Enablement',
    cta: { text: 'Book an Audit', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: '/rlenvironments/prefooter.webp' },
  },
}
