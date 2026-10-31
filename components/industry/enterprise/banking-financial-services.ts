import { CONTROL_FEATURES } from '@/lib/automation-content'
import { bankingFinancialServicesContent } from '@/components/segments/content/banking-financial-services'
import type { IndustryConfig } from './build'

// /industries/banking-financial-services on the enterprise layout. Workflows: INDUSTRY_WORKFLOWS; the problem line
// is a trigger from the segment content (no figures); "page copy" marks lines written for this page.

const lending = bankingFinancialServicesContent.triggers.find((t) => t.startsWith('Lending teams')) ?? ''
const approvals = CONTROL_FEATURES.find((f) => f.title === 'Approvals and dry runs')?.body ?? ''

export const bankingConfig: IndustryConfig = {
  key: 'banking-financial-services',
  hero: {
    headline: 'Loan files, KYC and reconciliations, run by agents.', // page copy
    body: 'Loan documents, KYC packs and reconciliations handled inside your systems, with exceptions reviewed by your team.', // page copy
    systems: ['Salesforce', 'SharePoint', 'Outlook', 'SAP', 'Snowflake', 'NetSuite', 'Power BI'],
  },
  problem: [
    { headline: 'The paperwork grows faster than the team.', subheading: lending }, // headline: page copy
    { headline: 'Agents take the volume. Your team decides.', subheading: approvals }, // headline: page copy
  ],
  workflowLinks: {
    'Mortgage and loan document handling': 'document-intake',
    'Reconciliation across core and finance systems': 'back-office-sync',
    'KYC document intake': 'document-intake',
  },
  // Closest verified cases (testimonial slots): document responses with audit history kept, decisions behind human
  // thresholds, agents with explicit execution controls. None is a bank; each names its client as the case does.
  cases: ['rfi-response-automation', 'amerit-repair-order-ai', 'exaware-governed-noc-agents'],
  // Fourth carousel card (3 banking workflows; Scale shows 4): the document case with audit history kept.
  extraCase: 'rfi-response-automation',
  // Mock UI labels (page copy).
  pipeline: { inputs: ['Loan application', 'KYC pack', 'Bank statement'], target: 'Core system' },
  queue: [
    { doc: 'Loan application', status: 'Posted', fill: 0.7 },
    { doc: 'KYC pack', status: 'Needs review', fill: 0.4, hot: true },
    { doc: 'Bank statement', status: 'Matched', fill: 0.85 },
    { doc: 'Proof of address', status: 'Posted', fill: 0.6 },
    { doc: 'Ledger break', status: 'Awaiting approval', fill: 0.5 },
  ],
  log: [
    ['08:02:11', 'document-intake', 'read', 'loan application, page 3'],
    ['08:02:12', 'document-intake', 'check', 'income matches payslip'],
    ['08:02:12', 'document-intake', 'queue', 'ID expiry unclear, sent to review'],
    ['08:05:40', 'kyc analyst', 'approve', 'ID document confirmed'],
    ['08:05:41', 'document-intake', 'post', 'KYC record written to core'],
    ['08:11:03', 'back-office-sync', 'match', 'ledger matched to core balances'],
    ['08:11:04', 'back-office-sync', 'flag', 'break sent to finance'],
    ['08:19:27', 'finance lead', 'approve', 'adjusting entry'],
    ['08:19:28', 'back-office-sync', 'write', 'adjusting entry posted'],
    ['08:24:50', 'document-intake', 'read', 'mortgage valuation report'],
    ['08:24:52', 'document-intake', 'queue', 'valuation below policy, sent to underwriter'],
    ['08:40:00', 'monitor', 'sample', 'accuracy review drawn'],
  ],
}
