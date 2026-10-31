import { WORKFLOWS } from '@/lib/automation-content'
import type { IndustryConfig } from './build'

// /industries/distribution-manufacturing on the enterprise layout. Workflows: INDUSTRY_WORKFLOWS (no segment content
// exists for this industry); the pull-apart sublines come from the workflow copy in lib/automation-content.ts;
// "page copy" marks lines written for this page.

const intake = WORKFLOWS.find((w) => w.slug === 'document-intake')?.forWho ?? ''
const sync = WORKFLOWS.find((w) => w.slug === 'back-office-sync')?.summary ?? ''

export const distributionConfig: IndustryConfig = {
  key: 'distribution-manufacturing',
  hero: {
    headline: 'Supplier paperwork, run by agents.', // page copy
    body: 'Supplier onboarding, quotes, invoices and bills of materials handled inside your ERP. Exceptions go to your team, and every action is logged.', // page copy
    systems: ['SAP', 'NetSuite', 'Salesforce', 'Outlook', 'SharePoint', 'QuickBooks', 'Power BI'],
  },
  problem: [
    { headline: 'Paperwork grows with every order and supplier.', subheading: intake }, // headline: page copy
    { headline: 'Agents key it in. Your team checks the exceptions.', subheading: sync }, // headline: page copy
  ],
  workflowLinks: {
    'Supplier onboarding': 'back-office-sync',
    'Quotes and configurators': 'knowledge-agents',
    'Invoices from packing slips': 'document-intake',
    'Drawings to bills of materials': 'document-intake',
  },
  // Closest verified cases: fleet repair-order scoring, automated RFI responses, an assistant across CRM and ERP data.
  cases: [
    { slug: 'amerit-repair-order-ai', icon: 'rocket' },
    { slug: 'rfi-response-automation', icon: 'swap' },
    { slug: 'piogroup-employee-assistant', icon: 'trend' },
  ],
  // Mock UI labels (page copy).
  pipeline: { inputs: ['Packing slip', 'Supplier form', 'Drawing'], target: 'ERP' },
  queue: [
    { doc: 'Packing slip', status: 'Posted', fill: 0.7 },
    { doc: 'Supplier form', status: 'Needs review', fill: 0.4, hot: true },
    { doc: 'Quote request', status: 'Drafted', fill: 0.85 },
    { doc: 'Assembly drawing', status: 'BOM ready', fill: 0.6 },
    { doc: 'Price change', status: 'Awaiting approval', fill: 0.5 },
  ],
  log: [
    ['07:31:05', 'document-intake', 'read', 'packing slip, delivery note'],
    ['07:31:06', 'document-intake', 'check', 'quantities match purchase order'],
    ['07:31:07', 'document-intake', 'post', 'supplier invoice drafted in ERP'],
    ['07:42:18', 'back-office-sync', 'read', 'new supplier form'],
    ['07:42:19', 'back-office-sync', 'queue', 'bank details changed, sent to review'],
    ['07:50:02', 'procurement', 'approve', 'supplier details confirmed'],
    ['07:50:03', 'back-office-sync', 'write', 'supplier created in ERP'],
    ['08:04:44', 'quote-agent', 'draft', 'quote from price list and lead times'],
    ['08:09:12', 'sales lead', 'approve', 'quote sent to customer'],
    ['08:15:37', 'document-intake', 'read', 'assembly drawing, sheet 2'],
    ['08:15:39', 'document-intake', 'propose', 'bill of materials, awaiting check'],
    ['08:30:00', 'monitor', 'sample', 'accuracy review drawn'],
  ],
}
