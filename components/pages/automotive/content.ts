// Scale's copy under the 80% rule for /automotive ("For Scoring and Decisions" in the menu). Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import { TEXT_PANEL } from './textPanel'
import type { AutomotiveContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }

export const content: AutomotiveContent = {
  meta: { title: 'Scoring and Decision Agents | Vahue', description: "Vahue's Scoring and Decisions Engine provides all the tools you need to drive agent improvements with data." },
  hero: {
    headline: 'Scoring and Decision Agents',
    body: 'Unlocking Decisions with best-in-class data.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: '/automotive/hero-scoring.webp' },
  },
  logos: [
    { alt: 'Logo', width: 92, height: 40 }, // PLACEHOLDER
    { alt: 'Logo', width: 96, height: 32 }, // PLACEHOLDER
  ],
  overview: {
    title: 'The Scoring and Decisions Engine',
    subtitle: "Vahue's Scoring and Decisions Engine has everything you need to drive agent improvements with data.",
    features: [
      { title: 'Data Scoring', description: 'Industry-leading scoring of tickets and files sourced from multiple systems. Achieve high quality decisions at low cost from ML-assisted scoring workflows, best in class operations, and advanced review interfaces.' },
      { title: 'Data Curation', description: 'Explore both scored and unscored data. Understand dataset distribution, curate data matching target scenarios and send data for review.' },
      { title: 'Agent Evaluation', description: 'Analyze the performance of your production AI agents. Explore agent metrics, identify agent weaknesses and evaluate your agent on scenario tests.' },
    ],
    image: { src: '/automotive/scoring-curation-evaluation.png', alt: 'Data scoring, data curation and agent evaluation loop', width: 662, height: 594 },
  },
  stack: {
    overtitle: 'Decision tech stack',
    title: 'How to Build Agents',
    tabs: {
      panelTitle: 'Supported Data',
      panelSubtitle: 'Best-in-class data to fuel decisions',
      description: 'Vahue has pioneered in the data scoring industry by combining AI-based techniques with human-in-the-loop, delivering scored data at unprecedented quality, scalability, and efficiency.',
      cta: { text: 'Score My Data', href: '/demo' },
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
    title: 'Phases of Agent Development',
    subtitle: 'Vahue partners with you at every stage of developing agents within the Context Engine.',
    items: [
      {
        title: 'Base Phase',
        subtitle: "Vahue's Context Engine helps you collect and prepare a base dataset to unlock initial agent performance. Our platform lets you randomly sample data or add constraints (ex. Claim value = high) matching your intended distribution.",
        image: { src: '/automotive/phase-base.webp', alt: 'Base Phase' },
        video: '/automotive/phase-audit.mp4', // PLACEHOLDER
      },
      {
        title: 'Improvement Phase',
        subtitle: 'In this phase, the Context Engine ensures new cases continually challenge your agent and maximally improve performance. To achieve this, Vahue offers both automated (ML-based) and manual review methods.',
        image: { src: '/automotive/phase-improvement.webp', alt: 'Improvement Phase' },
        video: '/automotive/phase-pilot.mp4', // PLACEHOLDER
      },
      {
        title: 'Target Phase',
        subtitle: 'Vahue helps you collect and curate data targeted to specific scenarios with Natural Language Search and Autotag, we then review that data and improve your agent performance on those specific scenarios. Vahue helps you close the loop by evaluating your agent on scenario tests.',
        image: { src: '/automotive/phase-target.webp', alt: 'Target Phase' },
        video: '/automotive/phase-operate.mp4', // PLACEHOLDER
      },
    ],
  },
  why: {
    overtitle: 'Why Vahue',
    title: 'Trusted by Leading Operations Teams', // PLACEHOLDER
    subtitle: 'Operations leaders work with Vahue for building agents for the following reasons:',
    features: [
      { icon: 'flame', title: 'Sure-Fire Improvements', subtitle: 'Data is the sure-fire way to improve your agents. With every larger/higher quality/more diverse dataset, Vahue helps your production AI agents improve.' },
      { icon: 'gauge', title: 'Maximum Performance', subtitle: 'All the components of the Vahue Context Engine maximize the value of each reviewed decision to improve agent performance.' },
      { icon: 'bolt', title: 'Faster Development', subtitle: 'Vahue accelerates the context engine loop - improving review speed, curating optimal datasets, and scaling up the engineering team to drive faster development of AI applications.' },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Context Engine',
    items: [
      {
        id: 'upgrading-workflow-context-engine',
        overtitle: 'Context Engine',
        title: 'Upgrading Your Workflow Into a Context Engine',
        image: { src: '/automotive/webinar-context.webp', alt: 'Upgrading Your Workflow Into a Context Engine' },
        link: '/events', // PLACEHOLDER
      },
      {
        id: 'guide-authoritative',
        overtitle: 'Guides',
        title: 'The Authoritative Guide',
        image: { src: '/automotive/guide-computer-vision.png', alt: 'The Authoritative Guide' },
        link: '/guides', // PLACEHOLDER
      },
    ],
  },
  foundation: {
    title: 'The Decision Scoring Agent',
    overtitle: 'Live Demo',
    heading: "Introducing Vahue's Decision Scoring Agent Demo",
    body: 'State of the art, language-grounded, scoring agent to accelerate the review of high-volume decisions.',
    link: { text: 'Test Drive the Agent →', href: '/demo' },
    image: { src: '/automotive/foundation.webp', alt: 'Decision Scoring Agent', width: 544, height: 306 }, // PLACEHOLDER
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Build AI', url: '/data-engine' },
    backdrop: WHITE,
    image: { path: '/automotive/prefooter.webp' },
  },
}
