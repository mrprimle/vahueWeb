// AJTBD copy for /physical-ai (Document Intake Agents). Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { MarqueeLogoItem, PhysicalAiContent } from './types'

const card = (slug: string, alt: string) => ({ src: `/physical-ai/${slug}.webp`, alt, width: 480, height: 360 })
const logo = (i: number): MarqueeLogoItem => ({ key: `customer-${i}`, alt: 'Logo', src: null })

export const content: PhysicalAiContent = {
  meta: { title: 'Document Intake Agents | Vahue', description: 'Agents read every invoice, claim and form, check it against your rules, and post a clean record to your systems, measured against your baseline.' },
  hero: {
    headline: 'Document Intake Agents',
    body: 'Agents read, check and post every document your team keys in by hand.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: '/physical-ai/hero-documents.webp' },
    logos: {
      label: "Trusted by the world's busiest operations teams", // PLACEHOLDER
      items: [logo(1), logo(2), logo(3), logo(4), logo(5)], // PLACEHOLDER
    },
  },
  overview: {
    overtitle: 'Service Overview',
    title: 'Every Document, From Inbox to System of Record',
    features: [
      { icon: 'globe', title: 'Receive From Anywhere', body: 'Invoices, claims, supplier sheets and contracts, from email, portals, scans and shared drives, with no change to how anyone sends them' },
      { icon: 'bolt', title: 'Extract at Any Volume', body: 'Language models and OCR read every field, including at month-end and peak, when the backlog used to build.' },
      { icon: 'diversity', title: 'Check Against Your Rules', body: 'Values are validated against your rules, and agents don’t just guess: unsure fields go to a person with the source page beside them.' },
      { icon: 'verified', title: 'Post Clean Records', body: 'Clean records are written to your ERP, CRM or claims system, with every field traceable to its source page.' },
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
        testimonial: "We used to key every invoice by hand and fall behind at month-end. Now our team only reviews the uncertain fields. We couldn't go back.", // PLACEHOLDER
      },
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: "Volume was growing faster than the people keying documents in, and our last pilot had stalled on messy scans. Vahue ran the agents on our own past documents first, next to what our team had entered, so we saw the results before anything went live. Manual data entry fell by 75%, errors stopped turning up downstream, and we got through peak without a new hire. It was a relief, honestly.", // PLACEHOLDER
      },
    ],
  },
  useCase: {
    overtitle: 'Use Case',
    title: 'Break Through the Document Bottleneck',
    heading: 'No More Month-End Backlog',
    paragraphs: [
      'Every document costs minutes of manual entry. Backlogs build at month-end and peaks, and errors are found downstream.',
      'Agents post documents as they arrive, and your people review only the uncertain fields, for up to 75% less manual data entry.', // PLACEHOLDER
    ],
    image: { src: '/physical-ai/use-case-documents.png', alt: '', width: 1214, height: 636 },
  },
  embodiments: {
    overtitle: 'Key Features',
    title: 'Growing Document Portfolio',
    subtitle: 'Agents read the documents your team keys in today, calibrated to your formats and your rules.',
    cards: [
      { title: 'Invoices and Claims', body: 'Field-level extraction from invoices, claims, purchase orders and remittance advice', image: card('img-portfolio-1', 'Invoices and Claims') },
      { title: 'One Intake Agent', body: 'Reads your inboxes, forms and portals, and writes to your ERP, CRM and review queue', image: card('img-portfolio-2', 'One Intake Agent') },
      { title: 'Bespoke Document Types', body: 'Contracts, supplier sheets, lab reports and KYC files: your formats, managed and operated by Vahue', image: card('img-portfolio-3', 'Bespoke Document Types') },
    ],
  },
  environments: {
    overtitle: '',
    title: 'Wherever Your Documents Arrive',
    subtitle: 'Agents work inside the inboxes and systems your team already uses.',
    cards: [
      { title: 'Inboxes and Portals', body: 'High-volume shared inboxes, supplier portals, forms and scans', image: card('img-sources-1', 'Inboxes and Portals') },
      { title: 'Review Teams', body: 'Your reviewers see only the uncertain fields, across teams and time zones', image: card('img-sources-2', 'Review Teams') },
      { title: 'Commercial and Industrial', body: 'Delivery notes and packing slips matched to the order, line by line', image: card('img-sources-3', 'Commercial and Industrial') },
    ],
  },
  annotations: {
    image: { src: '/physical-ai/review.webp', alt: '', width: 627, height: 458 },
    title: 'Side-by-Side Review',
    body: 'Every uncertain field appears next to its source page, against a confidence threshold you set per field. Your team checks it once, and the correction improves the next run.',
  },
  improvements: {
    title: 'Proven on Your Own Documents',
    paragraphs: [
      'Agents run in shadow mode on your own past documents before going live, next to what your team actually entered.',
      'Go live with the reassurance that they have produced measurable improvements against your baseline.',
    ],
    chart: {
      ariaLabel: 'Chart: field accuracy improves significantly with rule checks and human review vs raw extraction',
      yLabel: 'Field Accuracy',
      xLabel: 'Documents Processed',
      // PLACEHOLDER: curve shapes are Scale's, illustrative until Mike has pilot data.
      series: [
        { id: 'raw', label: ['Raw Extraction'], color: '#E05533', ceiling: 0.4, delay: 0, duration: 1.6 },
        { id: 'validated', label: ['With Rule Checks'], color: '#7B6FF0', ceiling: 0.65, delay: 0.3, duration: 1.6 },
        { id: 'annotated', label: ['With Rule Checks', 'and Human Review'], color: '#52C041', ceiling: 0.9, delay: 0.6, duration: 1.6 },
      ],
    },
  },
  difference: {
    overtitle: '',
    title: 'The Vahue Difference',
    features: [
      { icon: 'support', title: 'Responsive White Glove Service', body: 'A dedicated engineering and operations team keeps running your agents after launch: monitoring, exceptions, accuracy reviews and a monthly report against your baseline.' },
      { icon: 'science', title: 'In-house AI Engineers', body: 'Forward-deployed engineers map your documents, fields and rules with you, and build the agents inside your existing stack.' },
      { icon: 'partners', title: 'Fits Your Systems', body: 'Agents read from and write to the tools you already run, such as Outlook, SharePoint, NetSuite and SAP, using your existing permissions.' },
      { icon: 'quality', title: 'Quality You Can Trace', body: 'Rule checks and per-field confidence thresholds keep unsure values out of your systems, and every posted field points back to its source page.' },
      { icon: 'pin', title: 'Born in Shadow Mode; Scaled Across Teams', body: 'Intake agents are developed, tested, and validated on your real documents in a 4 to 6 week pilot, and a person checks every output until accuracy holds.' },
      { icon: 'security', title: 'Security and Compliance', body: 'Our infrastructure supports GDPR, CCPA, and customer-specific audit requirements with optional onshore data processing. We are SOC 2 and ISO 27001 certified.' },
    ],
  },
  prefooter: {
    headline: 'See it work on your own documents before it goes live',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Back-office Sync Agents', url: '/services/back-office-sync' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: '/physical-ai/prefooter.webp' },
  },
}
