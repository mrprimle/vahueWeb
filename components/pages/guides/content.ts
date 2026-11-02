// Copy for /guides. Keep first: Scale's string stays unless it is false for Vahue, brand words swap, and the rest changes by a few words.
// Same shape and counts as content.scale.ts. PLACEHOLDER lines are facts or proof Mike must confirm or replace.
import type { GuidesContent } from './types'

const A = '/guides'

export const content: GuidesContent = {
  meta: {
    title: 'Expert AI Guides for Success | Vahue',
    description: "Discover comprehensive resources and expert insights with Vahue's Guides. Enhance your knowledge and skills with our expertly curated content.",
  },
  intro: {
    overtitle: 'Resources',
    title: 'Guides',
    body: 'Building AI is difficult, so we have created these guides to help you deliver more business value from your AI investments more quickly.',
  },
  // Guide detail pages are not built: each book opens the site's closest page until Mike has the guides themselves.
  books: [
    { key: 'data-preparation', href: '/data-engine', background: '#212121', number: '01', title: 'Data Preparation: The Definitive Guide' }, // PLACEHOLDER
    { key: 'document-intake', href: '/physical-ai', background: '#193A29', number: '02', title: 'Document Intake: A Practical Guide' }, // PLACEHOLDER
    { key: 'agent-evaluation', href: '/evaluation/model-developers', background: '#273252', number: '03', title: 'Evaluating and Building Reliable AI Agents' }, // PLACEHOLDER
    { key: 'ai-for-ecommerce', href: '/public-sector-data-engine', background: '#79648C', number: '04', title: 'Guide to Sales and Booking Agents' }, // PLACEHOLDER
    { key: 'workflow-automation', href: '/generative-ai-data-engine', background: '#A8927C', number: '05', title: 'Guide to Workflow Automation' }, // PLACEHOLDER
    { key: 'large-language-models', href: '/genai-portfolio', background: '#212121', number: '06', title: 'Guide to Knowledge Agents' }, // PLACEHOLDER
    { key: 'generative-ai', href: '/enterprise', background: '#193A29', number: '07', title: 'Generative AI for the Enterprise: From Experimentation to Production' }, // PLACEHOLDER
    { key: 'ai-for-insurance', href: '/enterprise/insurance', background: '#273252', number: '08', title: 'Guide to AI for Insurance' }, // PLACEHOLDER
    { key: 'ai-in-finance', href: '/automotive', background: '#79648C', number: '09', title: 'Guide to AI in Finance' }, // PLACEHOLDER
    { key: 'evals-on-your-own-cases', href: '/evaluation/model-developers', background: '#A8927C', number: '10', title: 'Guide to Evals on Your Own Cases' }, // PLACEHOLDER
    { key: 'ai-for-the-revenue-team', href: '/public-sector-data-engine', background: '#212121', number: '11', title: 'Guide to AI for the Revenue Team' }, // PLACEHOLDER
    { key: 'build-vs-buy', href: '/evaluation/enterprise', background: '#193A29', number: '12', title: 'Enterprise Guide: Build vs. Buy' }, // PLACEHOLDER
  ],
  prefooter: {
    headline: 'Start building better AI today.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#ffffff' },
    image: { path: `${A}/prefooter.webp` },
  },
}
