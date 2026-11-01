// Copy for /physical-ai ("Document Intake" in the menu), from research/research.ts.
// Same shape and counts as content.scale.ts. Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { MarqueeLogoItem, PhysicalAiContent } from './types'

const NEUTRAL = '/site/nav/neutral.svg'
const card = (slug: string, alt: string) => ({ src: `/physical-ai/${slug}.webp`, alt, width: 480, height: 360 })
const neutralCard = (alt: string) => ({ src: NEUTRAL, alt, width: 480, height: 360 })
const logo = (i: number): MarqueeLogoItem => ({ key: `customer-${i}`, alt: 'Logo', src: null })

export const content: PhysicalAiContent = {
  meta: { title: 'Document Intake | Vahue', description: 'Turn every incoming document into a clean record' },
  hero: {
    headline: 'Agents for Document Intake',
    body: 'Every New Document, a Clean Record',
    cta: { text: 'Book an Audit', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: '/physical-ai/hero.webp' },
    logos: {
      label: 'Trusted by busy operations and finance teams',
      items: [logo(1), logo(2), logo(3), logo(4), logo(5)], // PLACEHOLDER
    },
  },
  overview: {
    overtitle: 'Product Overview',
    title: 'Agents That Run Document Intake',
    features: [
      { icon: 'globe', title: 'Receive From Everywhere', body: 'Invoices, claims, lab reports, supplier sheets and contracts arrive from email, portals, scans and shared drives, in one queue' },
      { icon: 'bolt', title: 'Peak-Ready Extraction', body: 'Clear month-end and seasonal backlogs. Language models and OCR extract every field, so throughput grows without headcount.' },
      { icon: 'diversity', title: 'Control Over Exceptions', body: 'Values are validated against your rules, and unsure fields go to a person for review.' },
      { icon: 'verified', title: 'Measured Against Your Baseline', body: 'Cycle time, error rate and cost per document are reported against your audited baseline.' },
    ],
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    colorTheme: { tailwindClass: 'evergreen', hex: '#193A29', contrastColor: '#ffffff' },
    items: [
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: "Vahue has been a trusted partner in clearing our document backlog at month-end. We're excited to be working with them on the next workflow", // PLACEHOLDER
      },
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: "Our mission is to post every claim and invoice at volume through a single intake queue. I feel fortunate to have worked with the Vahue team from the first audit and know first-hand that Vahue is unique in its ability to quickly adapt to the rules of each document type. We're excited by the work Vahue has already done in running this workflow and look forward to handing them the next one.", // PLACEHOLDER
      },
    ],
  },
  useCase: {
    overtitle: 'Use Case',
    title: 'Break Through the Document Intake Backlog',
    heading: 'Continuous Intake',
    paragraphs: [
      '1000+ incoming documents are read, checked and posted to your ERP, CRM or claims system every day.', // PLACEHOLDER
      'Retire manual keying and backlog firefighting while your team keeps control of exceptions.',
    ],
    image: { src: '/physical-ai/use-case.png', alt: '', width: 1214, height: 636 },
  },
  embodiments: {
    overtitle: 'Key Features',
    title: 'Growing Document Coverage',
    subtitle: 'Extract fields from invoices and laboratory reports, calibrated against your business rules.',
    cards: [
      { title: 'Invoices and Claims', body: 'Field-by-field extraction from every invoice and claim', image: neutralCard('Invoices and claims') },
      { title: 'Lab Reports', body: 'Results and certificates automatically matched to supplier orders', image: card('img-embodiment-2', 'Lab reports') },
      { title: 'Bespoke Document Types', body: 'Your formats, read and checked by Vahue', image: neutralCard('Bespoke document types') },
    ],
  },
  environments: {
    overtitle: '',
    title: 'Connected Intake Channels',
    subtitle: 'Receive documents from wherever they arrive, inside the tools you use.',
    cards: [
      { title: 'Email Inboxes', body: 'Attachments from Outlook and Gmail', image: card('img-environment-1', 'Email inboxes') },
      { title: 'Web Portals', body: 'Supplier uploads and customer attachments collected automatically', image: card('img-environment-2', 'Web portals') },
      { title: 'Scans and Drives', body: 'Scans and SharePoint folders, watched live', image: card('img-environment-3', 'Scans and drives') },
    ],
  },
  annotations: {
    image: { src: '/physical-ai/review.webp', alt: '', width: 627, height: 458 },
    title: 'Side-by-Side Document Verification',
    body: 'See the source page beside every record, with a confidence threshold per field and a person reviewing anything uncertain.',
  },
  improvements: {
    title: 'Proven Accuracy Improvements',
    paragraphs: [
      'Workflows complete a shadow-mode Pilot at real volume on your data before going live.',
      'Operate agents with the reassurance that a reviewer validated every output until accuracy stabilized.',
    ],
    chart: {
      ariaLabel: 'Chart: field accuracy improves significantly with rule checks and human review vs raw extraction',
      yLabel: 'Field Accuracy',
      xLabel: 'Document Volume',
      // PLACEHOLDER: curve shapes are Scale's, illustrative until Mike has pilot data.
      series: [
        { id: 'raw', label: ['Raw Extraction'], color: '#E05533', ceiling: 0.4, delay: 0, duration: 1.6 },
        { id: 'validated', label: ['Checked Fields'], color: '#7B6FF0', ceiling: 0.65, delay: 0.3, duration: 1.6 },
        { id: 'annotated', label: ['Checked Fields', 'with Review'], color: '#52C041', ceiling: 0.9, delay: 0.6, duration: 1.6 },
      ],
    },
  },
  difference: {
    overtitle: '',
    title: 'The Vahue Difference',
    features: [
      { icon: 'support', title: 'Agents Run for You', body: 'Workflows are operated by a dedicated engineering and operations team that handles exceptions and monitoring every day.' },
      { icon: 'science', title: 'In-house Workflow Engineers', body: 'An internal team of experienced engineers will work with you to map the chain from inbox to system of record.' },
      { icon: 'partners', title: 'Deep System Integrations', body: 'Our agents work inside your existing tools and systems of record such as Outlook, SharePoint, NetSuite and SAP.' },
      { icon: 'quality', title: 'Accuracy Reviews', body: 'Confidence thresholds and validation rules ensure that only clean records reach your ERP, CRM or claims system of record.' },
      { icon: 'pin', title: 'Baseline First; Scaled Later', body: 'Intake workflows are audited, piloted, and validated on your own documents at real volume before deployment to the rest of your document types and teams.' },
      { icon: 'security', title: 'Security and Compliance', body: 'Our agents support role-based access and customer-specific audit requirements, in your VPC or on-premises when needed. Every input, decision and action is logged and searchable.' },
    ],
  },
  prefooter: {
    headline: 'The end of your backlog starts here',
    cta: { text: 'Book an Audit', url: '/demo' },
    secondaryCta: { text: 'Back-office Sync', url: '/generative-ai-data-engine' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: '/physical-ai/prefooter.webp' },
  },
}
