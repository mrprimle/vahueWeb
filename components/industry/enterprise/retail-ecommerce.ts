import { WORKFLOWS } from '@/lib/automation-content'
import { retailEcommerceContent } from '@/components/segments/content/retail-ecommerce'
import type { IndustryConfig } from './build'

// /industries/retail-ecommerce on the enterprise layout. Workflows: INDUSTRY_WORKFLOWS; the problem line is a pain
// from the segment content (no figures); "page copy" marks lines written for this page.

const cxQueues = retailEcommerceContent.pains.find((p) => p.startsWith('CX queues')) ?? ''
const support = WORKFLOWS.find((w) => w.slug === 'support-agents')?.summary ?? ''

export const retailConfig: IndustryConfig = {
  key: 'retail-ecommerce',
  hero: {
    headline: 'Orders and support, run by agents.', // page copy
    body: 'Order-status emails, product data and routine support handled inside the tools you already use. Anything unusual goes to your team.', // page copy
    systems: ['Zendesk', 'Salesforce', 'HubSpot', 'Gmail', 'Twilio', 'Slack', 'Snowflake'],
  },
  problem: [
    { headline: 'Orders and SKUs grow faster than the team.', subheading: cxQueues }, // headline: page copy
    { headline: 'Agents answer the routine. Your team takes the rest.', subheading: support }, // headline: page copy
  ],
  workflowLinks: {
    'Order-status inbox': 'support-agents',
    'Product data and SKU matching': 'scoring-decisions',
    'Customer support agents': 'support-agents',
  },
  // Closest verified cases (testimonial slots): a customer-facing voice agent, a retail NLP delivery, an email
  // classifier.
  cases: ['docplanner-voicebot-recovery', 'retail-nlp-delivery', 'consumer-email-classifier'],
  // Fourth carousel card (3 retail workflows; Scale shows 4): the customer-facing voice agent case.
  extraCase: 'docplanner-voicebot-recovery',
  // Mock UI labels (page copy).
  pipeline: { inputs: ['Order email', 'Supplier feed', 'Return request'], target: 'Order system' },
  queue: [
    { doc: 'Where is my order', status: 'Answered', fill: 0.8 },
    { doc: 'Return request', status: 'Needs review', fill: 0.4, hot: true },
    { doc: 'Supplier product feed', status: 'Matched', fill: 0.85 },
    { doc: 'Address change', status: 'Updated', fill: 0.6 },
    { doc: 'Refund over limit', status: 'Awaiting approval', fill: 0.5 },
  ],
  log: [
    ['10:02:14', 'support-agent', 'read', 'order status request, email'],
    ['10:02:15', 'support-agent', 'lookup', 'order found in order system'],
    ['10:02:16', 'support-agent', 'reply', 'tracking link sent'],
    ['10:06:31', 'support-agent', 'hand off', 'damaged item, photos attached'],
    ['10:09:02', 'cx lead', 'approve', 'replacement order'],
    ['10:14:47', 'sku-matching', 'match', 'supplier item matched to catalog SKU'],
    ['10:14:48', 'sku-matching', 'queue', 'size attribute unclear, sent to review'],
    ['10:18:20', 'merchandiser', 'approve', 'attribute confirmed'],
    ['10:18:21', 'sku-matching', 'write', 'product record updated'],
    ['10:25:09', 'support-agent', 'resolve', 'address change before dispatch'],
    ['10:31:40', 'support-agent', 'propose', 'refund above limit, awaiting approval'],
    ['10:40:00', 'monitor', 'sample', 'accuracy review drawn'],
  ],
}
