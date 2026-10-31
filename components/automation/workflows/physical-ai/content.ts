import { WORKFLOWS } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import type { IconName } from '@/components/scale-clone/physical-ai/content'

/*
 * /automations/document-intake on the physical-ai clone. Same shape as components/scale-clone/physical-ai/content.ts:
 * one entry per clone slot, each about the length of Scale's text there. Source: lib/automation-content.ts
 * (WORKFLOWS 'document-intake', CONTROL_FEATURES) and lib/case-studies.ts; short labels written for this page
 * are listed in the strict-parity report.
 */
const wf = WORKFLOWS.find((w) => w.slug === 'document-intake')!
const cases = ['rfi-response-automation', 'amerit-repair-order-ai'].map((s) => getCaseStudy(s)!)

export const DOC_INTAKE = {
  workflow: wf,
  hero: {
    image: '/img/careers/office-2.jpg',
    headline: 'Document Intake Agents',
    body: 'Turning Every Document Into a Clean Record',
    primary: { text: 'Book an Audit', href: '/contact/' },
    strip: { label: 'Runs inside the tools you already use', items: wf.tools },
  },
  overview: {
    eyebrow: 'Product Overview',
    title: 'An Intake Platform for Documents',
    items: [
      { icon: 'globe', title: 'Received From Any Channel', body: 'Documents arrive from email, supplier portals, scans or shared drives, and the agent picks each one up as it lands.' },
      { icon: 'layers', title: 'Every Field Extracted', body: 'Fields are read with language models and OCR, line by line, from invoices, claims, lab reports and contracts.' },
      { icon: 'shield-check', title: 'Checked Against Your Rules', body: 'Values are validated against your rules; any field the agent is unsure of goes to a person for review.' },
      { icon: 'trending', title: 'Posted to the Right System', body: 'Clean records are written to your ERP, CRM or claims system, with every field traceable to its page.' },
    ] as { icon: IconName; title: string; body: string }[],
  },
  testimonials: {
    heading: 'See what clients have shipped',
    items: cases.map((c) => ({ name: c.client, title: c.metric, quote: c.summary, href: `/case-studies/${c.slug}/` })),
  },
  useCase: {
    eyebrow: 'Use Case',
    title: 'Clear the Backlog Before It Reaches Month-End',
    heading: 'Volume Without New Hires',
    body: [
      'Minutes of manual entry per document turn into backlogs at month-end and errors found downstream.',
      'Agents post documents as they arrive, so the team reviews only the uncertain fields.',
    ],
  },
  embodiments: {
    eyebrow: 'Key Features',
    title: 'Every Document Type, One Agent',
    subtitle: 'Invoices, claims, lab reports and contracts, each read and checked against your rules the same way.',
    cards: [
      { kind: 'invoice', title: 'Invoices and POs', body: 'Each line matched to the purchase order it bills, before it is posted' },
      { kind: 'report', title: 'Claims and Lab Reports', body: 'Fields read with language models and OCR, then checked by rule' },
      { kind: 'contract', title: 'Supplier Sheets and Contracts', body: 'Key terms pulled into your systems, traced to their page' },
    ] as const,
  },
  environments: {
    title: 'Wherever Documents Arrive',
    subtitle: 'From email, supplier portals, scans or shared drives, in any format they arrive in.',
    cards: [
      { kind: 'inbox', title: 'Email Inboxes', body: 'Attachments read as soon as they land in a shared inbox' },
      { kind: 'portal', title: 'Supplier Portals', body: 'Downloads picked up on a schedule you set, every day' },
      { kind: 'drive', title: 'Scans and Shared Drives', body: 'Paper scans and PDFs picked up from any folder you name' },
    ] as const,
  },
  annotations: {
    first: {
      title: 'Every Field Traced to Its Source',
      body: ['Each value in the record links back to the page and line it came from, so a reviewer sees source and record side by side.'],
      fields: ['Supplier name', 'Invoice number', 'PO reference', 'Line items', 'Tax code', 'Total due'],
    },
    second: {
      title: 'Measured Accuracy Gains',
      body: [
        'Every pilot runs on your own documents at real volume, against the baseline recorded in the audit.',
        'Scope grows only once the measured accuracy holds.',
      ],
    },
    chart: {
      yAxis: 'Fields Posted Correctly',
      xAxis: 'Documents Processed',
      series: [['Manual Entry'], ['Agent Only'], ['Agent', 'with Review Queue']],
    },
  },
  difference: {
    title: 'Why Teams Trust the Agents',
    // CONTROL_FEATURES, each body extended to the length of Scale's item text.
    items: [
      { icon: 'shield-check', title: 'Review Queues', body: 'Anything below the confidence threshold goes to a person on your team before it touches a system of record, with the source page open beside it.' },
      { icon: 'handshake', title: 'Approvals and Dry Runs', body: 'Agents propose; your team approves any action that moves money, customers or data, and new rules run as a dry run before they go live.' },
      { icon: 'shield', title: 'Role-Based Access', body: 'Agents see only what the role they act for can see, so a document reaches only the systems and people that role already has access to.' },
      { icon: 'storage', title: 'Audit Log', body: 'Every input, decision and action is recorded and searchable, so any posted record can be traced back to the page, the rule and the reviewer.' },
      { icon: 'globe', title: 'Your Cloud or Ours', body: 'Deploy in your own VPC or on-premises when documents cannot leave your network, or run in ours when they can. The agents and controls are the same either way, and so is the monthly report.' },
      { icon: 'trending', title: 'Results Dashboard', body: 'Items handled, hours returned, exceptions and accuracy, live, plus a one-page monthly summary read against the baseline recorded in the audit before anything was built.' },
    ] as { icon: IconName; title: string; body: string }[],
  },
  prefooter: {
    image: '/img/careers/office-5.jpg',
    headline: 'Start with your busiest document workflow',
    primary: { text: 'Book an Audit', href: '/contact/' },
    secondary: { text: 'See Results', href: '/case-studies/' },
  },
}
