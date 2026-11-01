// Copy for /automotive ("Scoring and Decisions" in the menu), from research/research.ts and the NMT research (Job: verify every item at volume without automating beyond confidence).
// Same shape and counts as content.scale.ts. Lines marked PLACEHOLDER are for Mike to replace with real data.
import { TEXT_PANEL } from './textPanel'
import type { AutomotiveContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }

export const content: AutomotiveContent = {
  meta: { title: 'Scoring and Decisions | Vahue', description: 'Score, classify and route work at volume, with every decision explained and logged.' },
  hero: {
    headline: 'Scoring and Decisions',
    body: 'Score, classify and route work at volume.',
    cta: { text: 'Book an Audit', url: '/demo' },
    backdrop: WHITE,
    image: { path: '/automotive/hero.webp' },
  },
  logos: [
    { alt: 'Logo', width: 92, height: 40 }, // PLACEHOLDER
    { alt: 'Logo', width: 96, height: 32 }, // PLACEHOLDER
  ],
  overview: {
    title: 'The Scoring Agent Workflow',
    subtitle: "Vahue's scoring agents have everything you need to make consistent decisions at real volume.",
    features: [
      { title: 'Item Scoring', description: 'Scores for tickets, quality checks, risk files and submissions, learned from your past decisions and the reasons behind them. Every item gets a score and an explanation in seconds, inside the tools you already use.' },
      { title: 'Work Routing', description: 'Send clear cases straight on to the next system. Send borderline cases to a reviewer with explanations attached, and log every decision against its reason.' },
      { title: 'Agreement Monitoring', description: 'Track agreement with your reviewers every week. Explore decision logs, identify drift and grow scope only once agreement holds against baseline.' },
    ],
    image: { src: '/automotive/scoring-loop.png', alt: 'Scoring, routing and monitoring loop', width: 662, height: 594 },
  },
  stack: {
    overtitle: 'Decision tech stack',
    title: 'How to Score at Volume',
    tabs: {
      panelTitle: 'Supported Work',
      panelSubtitle: 'Every judgement your team repeats',
      description: 'Vahue takes over the judgement your team repeats thousands of times a month, pairing language models with human review, so decisions stay consistent, explained and logged.',
      cta: { text: 'Score My Data', href: '/demo' },
      titles: ['Risk', 'Image', 'Routing', 'Text', 'Audio'],
      frame: {
        src: '/automotive/risk-queue.html', // PLACEHOLDER
        placeholder: { src: '/automotive/risk-queue.webp', alt: '', width: 1460, height: 904 },
      },
      image: {
        src: '/automotive/living-room.webp',
        alt: 'An image with each detected item boxed for checking',
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
        run: 'Run Code',
        code: `client.createCallScoreTask({ 
            "attachment_type": "audio", 
            "attachment": "THE_URL_WE_UPLOAD_THIS_TO", 
            "explain": true, 
            "callback_url": "http://www.example.com/callback", 
            }, (err, task) => { 
            // do something with task 
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
    title: 'Phases of Decision Automation',
    subtitle: 'We work with you at every stage, from the first baseline to running decisions live.',
    items: [
      {
        title: 'Audit Phase',
        subtitle: 'In two weeks we map one scoring workflow end to end and record the baseline: volume, minutes per item, error rate, cost and reviewer agreement. We agree the target, the human-control boundary and the point at which we stop.',
        image: { src: '/automotive/phase-audit.webp', alt: 'Audit Phase' },
        video: '/automotive/phase-audit.mp4', // PLACEHOLDER
      },
      {
        title: 'Pilot Phase',
        subtitle: 'In this phase, one workflow runs on your own data at real volume for four to six weeks. A person on your team checks every output until agreement holds against the baseline.',
        image: { src: '/automotive/phase-pilot.webp', alt: 'Pilot Phase' },
        video: '/automotive/phase-pilot.mp4', // PLACEHOLDER
      },
      {
        title: 'Operate Phase',
        subtitle: 'We run the scoring agents day to day, with monitoring, exception handling, accuracy reviews and model updates. Borderline cases reach your reviewers with reasons attached, and scope grows only once agreement holds. Each month we close the loop with a report against your audited baseline.',
        image: { src: '/automotive/phase-operate.webp', alt: 'Operate Phase' },
        video: '/automotive/phase-operate.mp4', // PLACEHOLDER
      },
    ],
  },
  why: {
    overtitle: 'Why Vahue',
    title: 'Trusted by Operations and Finance Leaders',
    subtitle: 'Operations leaders work with Vahue on scoring and decisions for the following reasons:',
    features: [
      { icon: 'flame', title: 'Consistent Decisions', subtitle: 'Reviewers disagree and rules cannot keep up. With every past decision and reason it learns from, Vahue helps your team judge each item the same way.' },
      { icon: 'gauge', title: 'Explained Scores', subtitle: 'Every score is stored with its reasons beside the decision, so reviewers, owners and auditors can trace any call.' },
      { icon: 'bolt', title: 'Faster Reviews', subtitle: 'Vahue shortens the review loop - scoring each item in seconds, routing clear cases on, and leaving your reviewers only the borderline calls that need their judgement.' },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Scoring Agents',
    items: [
      {
        id: 'checking-repair-orders',
        overtitle: 'Scoring',
        title: 'Checking Every Repair Order Before It Is Billed',
        image: { src: '/automotive/webinar.webp', alt: 'Checking Every Repair Order Before It Is Billed' },
        link: '/events', // PLACEHOLDER
      },
      {
        id: 'guide-reviewer-agreement',
        overtitle: 'Guides',
        title: 'The Reviewer Agreement Guide',
        image: { src: '/automotive/guide-computer-vision.png', alt: 'The Reviewer Agreement Guide' },
        link: '/guides', // PLACEHOLDER
      },
    ],
  },
  foundation: {
    title: 'The Decision Scoring Agent',
    overtitle: 'Live Demo',
    heading: "Introducing Vahue's Decision Scoring Agent Demo",
    body: 'A tested, source-grounded scoring agent that learns your past decisions and explains every score it gives.',
    link: { text: 'Book a Scoring Audit →', href: '/demo' },
    image: { src: '/automotive/foundation.webp', alt: 'Decision Scoring Agent', width: 544, height: 306 }, // PLACEHOLDER
  },
  prefooter: {
    headline: 'The end of guesswork starts here',
    cta: { text: 'Book an Audit', url: '/demo' },
    secondaryCta: { text: 'All Workflows', url: '/data-engine' },
    backdrop: WHITE,
    image: { path: '/automotive/prefooter.webp' },
  },
}
