// Placeholder copy for /scale-clone/rlenvironments. Lengths roughly match the source blocks.
// TODO: Vahue copy (every string below).
import type { GlyphName } from './icons'

export const ASSET = '/scale-clone/rlenvironments'

export const hero = {
  title: 'Agent Workspaces',
  body: 'Prepare and measure agents on long-running, multi-step operational work.',
  cta: 'Book A Demo',
}

export const features = {
  eyebrow: 'Features',
  title: 'Built for Agent Practice',
  cards: [
    {
      icon: 'window' as GlyphName,
      color: '#273252',
      title: 'Working Tools, Rebuilt for Practice',
      body: 'Mock services, connectors and screens that act like the tools agents rely on.',
    },
    {
      icon: 'files' as GlyphName,
      color: '#193A29',
      title: 'Hand-Picked Working Files',
      body: 'Documents, sheets, decks, records and starting states drawn from everyday operations, with all the untidy detail kept in.',
    },
    {
      icon: 'target' as GlyphName,
      color: '#79648C',
      title: 'Tough Jobs with Checkable Results',
      body: 'Specialist-written goals, scoring guides and automatic checks that give steady feedback for scoring both the path and the result.',
    },
    {
      icon: 'hub' as GlyphName,
      color: '#A8927C',
      title: 'Simple Hookup and Full Session Control',
      body: 'Works with common workspace interfaces, with support for run logs, state resets, score inspection and more.',
    },
  ],
}

export const overview = {
  eyebrow: 'Overview',
  title: 'A Look Inside Agent Workspaces',
  cards: [
    {
      title: 'Made to Grow What Agents Can Do',
      body: 'Agent Workspaces are simulated sets of everyday applications built to practise and measure agent behaviour.',
      image: 'product-built-to-advance.webp',
    },
    {
      title: 'Setups for Clearer Feedback Signals',
      body: 'They copy real desktop and service-based setups, keeping detailed logs and app state that can feed automatic and guide-based scoring.',
      image: 'product-systems-signals.webp',
    },
    {
      title: 'Practice-Ready Specialist Data',
      body: 'Each workspace pairs mock screens with hand-picked data and checkers to give dependable feedback. We also report on difficulty (pass@k) and the gains you can expect from practice.',
      image: 'product-rl-ready-data.webp',
    },
  ],
}

export const capabilities = {
  eyebrow: 'Capabilities',
  title: 'Range That Mirrors the Systems Teams Really Run',
  items: [
    {
      title: 'Desktop Workspaces',
      body: 'Prepare agents to move through and run lifelike desktop and browser setups, including Mac- and PC-style systems.',
      image: 'capability-computer-use.webp',
      textSide: 'left' as const,
    },
    {
      title: 'Connector / Tool Workspaces',
      body: 'Prepare agents to think through and use real tools over connectors: chat, CRM, issue tracking and more.',
      image: 'capability-tool-mcp.webp',
      textSide: 'right' as const,
    },
  ],
}

export const environmentTypes = {
  eyebrow: 'Offered as',
  title: 'Workspace Kinds',
  body: 'Three kinds of simulated workspace, each shaped to match the systems agents meet at work.',
  cards: [
    { icon: 'globe' as GlyphName, color: '#273252', title: 'Browser Apps', body: 'Web-based business and office tools.' },
    { icon: 'desktop' as GlyphName, color: '#193A29', title: 'Desktop Machines', body: 'Mac- and PC-style operating system workspaces.' },
    { icon: 'storage' as GlyphName, color: '#839CB2', title: 'Tool Connectors', body: 'Real business tools: chat, CRM, issue tracking and more.' },
  ],
}

export const prefooter = {
  title: 'Try Agent Workspaces',
  cta: 'Book A Demo',
}
