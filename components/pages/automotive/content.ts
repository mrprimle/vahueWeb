// AJTBD copy for /automotive (Scoring and Decision Agents). Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import { TEXT_PANEL } from './textPanel'
import type { AutomotiveContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }

export const content: AutomotiveContent = {
  meta: { title: 'Scoring and Decision Agents | Vahue', description: 'Agents score, explain and route every item in seconds, send borderline cases to your reviewers, and report against your baseline from day one.' },
  hero: {
    headline: 'Scoring and Decision Agents',
    body: 'Agents score and route every item, for teams making the same judgement all day.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: '/automotive/hero-scoring.webp' },
  },
  logos: [
    { alt: 'Logo', width: 92, height: 40 }, // PLACEHOLDER
    { alt: 'Logo', width: 96, height: 32 }, // PLACEHOLDER
  ],
  overview: {
    title: 'Scoring and Decision Agents',
    subtitle: 'Hours of manual QA per batch, and no two reviewers deciding quite alike. Agents learn from your past decisions and the reasons behind them, so every item gets the same judgement.',
    features: [
      { title: 'Case Scoring', description: 'Every ticket, claim, invoice or file gets a score and a reason in seconds, from the systems you already use. Clear cases flow on instead of waiting hours in a queue.' },
      { title: 'Case Review', description: 'Explore both scored and unscored cases. See where your reviewers disagree, pull the cases that match a target scenario and send them for review.' },
      { title: 'Agent Evaluation', description: 'Track agreement with your reviewers every week. Identify agent weaknesses and evaluate your agent on scenario tests before its scope grows.' },
    ],
    image: { src: '/automotive/scoring-curation-evaluation.png', alt: 'Data scoring, data curation and agent evaluation loop', width: 662, height: 594 },
  },
  stack: {
    overtitle: 'Decision tech stack',
    title: 'How to Score at Volume',
    tabs: {
      panelTitle: 'Supported Data',
      panelSubtitle: 'Every format your decisions come in',
      description: 'Vahue combines AI-based scoring with human-in-the-loop review. Every item gets a score and an explanation, and nothing is automated beyond its confidence: borderline cases go to a person.',
      cta: { text: 'Score My Cases', href: '/demo' },
      titles: ['Risk', 'Image', 'Routing', 'Text', 'Audio'],
      frame: {
        src: '/automotive/risk-queue.html', // PLACEHOLDER
        placeholder: { src: '/automotive/risk-queue-invoices.webp', alt: '', width: 1460, height: 904 },
      },
      image: {
        src: '/automotive/scanned-quote.webp',
        alt: 'A scanned quote with each detected field boxed for checking',
        width: 649,
        height: 402,
        blurDataURL: 'data:image/webp;base64,UklGRu4AAABXRUJQVlA4TOIAAAAvBwABAM1VICICHghACgMAAADinQKYJCAAAAAAAAAAAAAAAAAAAAAAAAAAGAJDkEAQkG8GWDMiDwAAwAMByEEAAAA4/3uYiQCYfywCIDAAAAAAAAAAAAAAAAAAAAAAAAAAwAAFYLzNKhD074EApDAAAACc/71+BDQCvDDEAAAAAAAAAAAAAAAAAAAAAAAAAAAYIAAYAg9A5dn6yHOZL+39RfMzAA0s9wkf0nl7EU3cyeAdgcgR5DmOcWJ+dKq6VIwaV843upgqrKG8o9+rgq9UMl9l3VEs7bhL+o/8hd+29ugD',
      },
      map: {
        src: '/automotive/routing.webp',
        alt: 'Items routed by score to the next system, a reviewer or a person',
        width: 649,
        height: 402,
        blurDataURL: 'data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAAAwAQCdASoIAAUAA4BaJaQAA3AA/vSbWpvF0P8lhYkJd82kAAA=',
      },
      textArtwork: TEXT_PANEL, // PLACEHOLDER
      audio: {
        prompt: 'Please score this support call.',
        fileName: 'support-call-4127.mp3',
        time: '0:00',
        run: 'Run Agent',
        code: `agent.scoreCall({ 
            "source": "support_line", 
            "attachment": "support-call-4127.mp3", 
            "explain": true, 
            "below_threshold": "send_to_reviewer", 
            }, (err, decision) => { 
            // log the decision and its reasons 
          });`,
        result: `{
              "explanation": "The customer reports a damaged replacement part on order 4127 and asks for a refund or a new part shipped today. A refund moves money, so this call goes to a reviewer with the order, the summary and the reason attached instead of being resolved by the agent on its own. The score sits below your threshold, the reply is drafted for your team, and the decision is logged with its reasons for the weekly agreement review.",
              "score": 0.62
            }`, // PLACEHOLDER
        src: '/automotive/support-call.mp3',
      },
    },
  },
  phases: {
    title: 'Phases of Agent Development',
    subtitle: 'Vahue partners with you at every stage, from recording your baseline to running the agent month after month.',
    items: [
      {
        title: 'Audit Phase',
        subtitle: 'In two weeks, Vahue records your baseline on your past decisions: volume, minutes per item, error rate and where reviewers disagree. We randomly sample cases or add constraints (ex. Claim value = high) matching your real mix.',
        image: { src: '/automotive/phase-base.webp', alt: 'Audit Phase' },
        video: '/automotive/phase-audit.mp4', // PLACEHOLDER
      },
      {
        title: 'Pilot Phase',
        subtitle: 'For 4 to 6 weeks, the agent scores real cases in shadow mode next to your reviewers. Anything below the threshold goes to a person, and you see where the agent agrees, where it doesn’t, and the errors it catches that people missed.',
        image: { src: '/automotive/phase-improvement.webp', alt: 'Pilot Phase' },
        video: '/automotive/phase-pilot.mp4', // PLACEHOLDER
      },
      {
        title: 'Operate Phase',
        subtitle: 'Vahue runs the agent month to month. We find the scenarios where it is weakest with natural language search, review those cases and improve its scores. Decisions are logged with their reasons, and you get a monthly report against your baseline.',
        image: { src: '/automotive/phase-target.webp', alt: 'Operate Phase' },
        video: '/automotive/phase-operate.mp4', // PLACEHOLDER
      },
    ],
  },
  why: {
    overtitle: 'Why Vahue',
    title: 'Trusted by Leading Operations Teams', // PLACEHOLDER
    subtitle: 'Operations leaders work with Vahue on scoring and decisions for the following reasons:',
    features: [
      { icon: 'flame', title: 'Sure-Fire Improvements', subtitle: 'Your reviewers’ corrections are the sure-fire way to improve your agents. With every week of reviewed decisions, Vahue tunes the agent and shows you the change against your baseline.' },
      { icon: 'gauge', title: 'Decisions You Can Explain', subtitle: 'Every score is stored with its reasons, so when someone asks why a case was held or passed, the answer is already in the log.' },
      { icon: 'bolt', title: 'Faster Decisions', subtitle: 'Every item is scored in seconds, and your reviewers focus on the borderline cases, so volume can grow without the next hire and without a new queue.' },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Scoring and Decisions',
    items: [
      {
        id: 'upgrading-workflow-context-engine',
        overtitle: 'Webinar',
        title: 'Connecting Your Workflow to Its Context',
        image: { src: '/automotive/webinar-context.webp', alt: 'Connecting Your Workflow to Its Context' },
        link: '/events', // PLACEHOLDER
      },
      {
        id: 'guide-authoritative',
        overtitle: 'Guides',
        title: 'The Authoritative Guide to Scoring Decisions',
        image: { src: '/automotive/guide-computer-vision.png', alt: 'The Authoritative Guide to Scoring Decisions' },
        link: '/guides', // PLACEHOLDER
      },
    ],
  },
  foundation: {
    title: 'The Decision Scoring Agent',
    overtitle: 'Private Demo',
    heading: 'See It Score Your Own Cases',
    body: 'Send us 200 to 500 past decisions. In two weeks you see the agent’s score next to what your reviewers decided, including the errors people missed.', // PLACEHOLDER
    link: { text: 'Test Drive the Agent →', href: '/demo' },
    image: { src: '/automotive/foundation.webp', alt: 'Decision Scoring Agent', width: 544, height: 306 }, // PLACEHOLDER
  },
  prefooter: {
    headline: 'See it work on your own cases before it goes live',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Context and Integrations', url: '/data-engine' },
    backdrop: WHITE,
    image: { path: '/automotive/prefooter.webp' },
  },
}
