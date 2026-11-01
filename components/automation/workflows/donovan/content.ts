import { CONTROL_FEATURES, WORKFLOWS } from '@/lib/automation-content'
import type { IconName } from './Sections'
import type { ShowcaseTab } from './Showcase'

/*
 * /automations/support-agents on the donovan clone. Same slots as components/templates/donovan/content.ts, each
 * about the length of Scale's text there. Source: lib/automation-content.ts (WORKFLOWS 'support-agents',
 * POSITIONING, PHASES, CONTROL_FEATURES) and lib/case-studies.ts; text written for this page is listed in the
 * strict-parity report.
 */
const wf = WORKFLOWS.find((w) => w.slug === 'support-agents')!

export const SUPPORT = {
  workflow: wf,
  hero: {
    headline: 'Support Agents',
    body: 'Answer customers and route tickets around the clock, with your team in control.',
    image: '/img/careers/hero.jpg',
    primary: { label: 'Book an Audit', href: '/contact/' },
  },
  // Scale: 5 customer marks. Here: the workflow's 4 tools + Outlook (email is one of the agent's channels).
  tools: [...wf.tools, 'Outlook'],
  overview: {
    eyebrow: 'Product Overview',
    title: 'Design, Test, and Run Dependable Support Agents for Your Customers',
    subtitle: `${wf.summary} Built for support and service teams whose inquiry volume rises faster than headcount.`,
    cards: [
      {
        title: 'Chat and Voice Agents',
        body: 'Agents answer chat, email and phone around the clock, verify identity where needed and resolve routine requests end to end by looking up orders, bookings or accounts in the systems you already run, acting only within the limits you set.',
      },
      {
        title: 'Human Hand-Off',
        body: 'Anything outside the agent’s limits goes to a person on your team with a summary of the conversation, so customers never repeat themselves, agents never re-ask for context and every hand-off is logged.',
      },
      {
        title: 'Queue Control',
        body: 'Routine questions stop filling the queue, so your team works the requests that need judgement, queues stay inside your service levels, and a weekly review of escalations picks the next requests to automate.',
      },
    ],
  },
  foundation: {
    eyebrow: 'Why Vahue',
    title: 'Foundations of Support Agents',
    subtitle: 'The controls that make dependable, production-ready support agents safe to run.',
    top: [
      { title: 'Chat Agents', icon: 'factCheck' },
      { title: 'Voice Agents', icon: 'play' },
      { title: 'Human Hand-Off', icon: 'person' },
    ] as { title: string; icon: IconName }[],
    bottom: CONTROL_FEATURES.map((f, i) => ({ title: f.title, icon: (['factCheck', 'callSplit', 'person', 'history', 'cloud', 'insights'] as IconName[])[i] })),
  },
  showcase: [
    {
      label: 'Greet',
      bullets: [
        'Answer chat, email and phone from one agent.',
        'Verify identity before anything account-specific is shared.',
        'Offer a person at any point in the conversation.',
      ],
    },
    {
      label: 'Resolve',
      bullets: ['Look up orders, bookings and accounts in your own systems.', 'Act only within the limits set for each role.'],
    },
    {
      label: 'Hand Off',
      bullets: [
        'Pass anything outside the agent’s limits to a person on your team.',
        'Every hand-off arrives with a summary.',
        'Customers can ask for a person at any time.',
      ],
    },
    {
      label: 'Weekly Review',
      bullets: ['Review every escalation with your team once a week.', 'Pick the next requests to automate from what was escalated.'],
    },
    {
      label: 'Results Dashboard',
      bullets: ['Track requests handled, hand-offs and accuracy, live.', 'Get a one-page monthly summary against the baseline.'],
    },
  ] as ShowcaseTab[],
  overmatch: {
    eyebrow: 'Why Vahue',
    title: 'Stay Ahead of Rising Volume',
    subtitle: 'Inquiry volume rises faster than headcount. Keep your service levels with support agents your team can trust in production.',
    items: [
      { icon: 'insights', title: 'Measured', body: 'Before anything is built we record the baseline: volume, minutes per request, error rate and cost. Every monthly report is read against it.' },
      { icon: 'trending', title: 'Proven in Production', body: 'Docplanner’s scheduling voicebot doubled booking conversion from roughly 10% to 20% while becoming faster, less token-heavy and easier to monitor.' },
      { icon: 'play', title: 'Time to Value', body: 'A two-week audit, then a four-to-six-week pilot on your own requests at real volume, with a person checking every answer until accuracy holds.' },
      { icon: 'cloud', title: 'Inside Your Tools', body: 'Agents work in Zendesk, Twilio, Salesforce and HubSpot, the tools your team already uses, so nobody has a new system to learn.' },
      { icon: 'history', title: 'Traceability', body: 'Every input, decision and action is recorded and searchable, so you can see why an agent answered the way it did.' },
      { icon: 'person', title: 'We Run It', body: 'After the pilot we operate the agents day to day: monitoring, exceptions, accuracy reviews and model updates, with a monthly report against the baseline.' },
    ] as { icon: IconName; title: string; body: string }[],
  },
  trusted: {
    eyebrow: 'Supported Environments',
    title: 'Trusted & Secure',
    subtitle: 'Vahue support agents run in your cloud, ours, or on-premises.',
    items: [
      { icon: 'check', title: 'Your Cloud or Ours', body: 'Deploy in your VPC or in ours' },
      { icon: 'check', title: 'On-Premises', body: 'When data cannot leave your network' },
      { icon: 'check', title: 'Role-Based Access', body: 'Agents see only what their role can' },
    ] as { icon: IconName; title: string; body: string }[],
  },
  prefooter: {
    headline: 'Start with your busiest support queue',
    image: '/img/careers/team.jpg',
    primary: { label: 'Book an Audit', href: '/contact/' },
    secondary: { label: 'See Results', href: '/case-studies/' },
  },
}
