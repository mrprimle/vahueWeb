import { CONTROL_FEATURES, PHASES } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import PublicSectorDataEnginePage from '@/components/templates/public-sector-data-engine/PublicSectorDataEnginePage'
import type { PublicSectorDataEngineContent } from '@/components/templates/public-sector-data-engine/content'

/*
 * Vahue /public-sector-data-engine on the scale.com/public-sector-data-engine layout
 * (components/templates/public-sector-data-engine, spec reference-snapshots/scale-clone/public-sector-data-engine.md).
 * Same eight sections, order, roles and counts; Scale's colours and motion. Only copy and media change:
 *   - Scale's data-labelling product becomes the document and back-office workflows Vahue runs, as they apply to
 *     government teams. Vahue has no government customers, clearances or contracts, and this page claims none
 *   - the logos, the testimonial slot and the resources are commercial and labelled so. The testimonial slot holds a case
 *     outcome from lib/case-studies.ts, without quotation marks: it is not a quote
 *   - Vahue has no demo videos: the three demo slots show stills, with no play control
 *   - no metric slots beyond the case's own figures, so no placeholder metrics
 * Copy written for this page is marked `// page copy`.
 */

const CONTACT = '/contact/'
const CONTROL = Object.fromEntries(CONTROL_FEATURES.map((f) => [f.title, f.body]))
const phase = (name: string) => PHASES.find((p) => p.name === name)!
const caseTitle = (slug: string) => getCaseStudy(slug)?.title ?? ''
const rfi = getCaseStudy('rfi-response-automation')

export const vahuePublicSectorDataEngineContent: PublicSectorDataEngineContent = {
  hero: {
    title: 'Agents for Government Back Offices', // page copy
    body: 'How Vahue runs document and back-office workflows, with people in review and every action logged.', // page copy
    image: '/img/careers/office-4.jpg',
    cta: { label: 'Book an Audit', href: CONTACT },
  },
  logos: {
    lead: 'Commercial teams already run production agents with Vahue.', // page copy
    link: { label: 'Read the cases', href: '/case-studies/' }, // page copy
    items: [
      { src: '/img/shopify.svg', alt: 'Shopify', width: 110, height: 32 },
      { src: '/img/qontoLogo.svg', alt: 'Qonto', width: 113, height: 30 },
      { src: '/img/leafworks.svg', alt: 'Leafworks', width: 140, height: 25 },
      { src: '/img/tracesafe.svg', alt: 'Tracesafe', width: 116, height: 32 },
      { src: '/img/bringliesel.svg', alt: 'BringLiesel', width: 118, height: 28 },
    ],
  },
  overview: {
    eyebrow: 'Workflow overview', // page copy
    title: 'Agents for Back Offices', // page copy
    body: 'Take one high-volume workflow off your team and run it inside the tools you already use.', // page copy, from POSITIONING.promise
    cards: [
      {
        icon: 'laptop',
        title: 'Document Intake',
        body: 'Applications, forms, invoices and claims are read, checked against your rules and posted to the right system. People review only the uncertain fields.', // page copy, from WORKFLOWS document-intake
      },
      {
        icon: 'sparkles',
        title: 'Back-Office Sync',
        body: 'Agents move records, approvals and reconciliations between finance, ERP and case systems. Clean matches are written back. Mismatches arrive as a short exception list.', // page copy, from WORKFLOWS back-office-sync
      },
      {
        icon: 'trend',
        title: 'Measured Operation', // page copy
        body: 'Start from a recorded baseline of volume, minutes per item, error rate and cost. Get a monthly report against it. Stop at the point agreed up front.', // page copy, from PHASES
      },
    ],
  },
  why: {
    eyebrow: 'Why Vahue',
    title: 'Accountability Comes First in Public Back Offices', // page copy
    body: 'Control comes from review queues, approvals and audit history, backed by a team that stays to run the agents.', // page copy
    items: [
      {
        title: 'One Control Layer', // page copy
        body: `${CONTROL['Review queues']} ${CONTROL['Audit log']}`,
      },
      {
        title: 'Your Cloud or Ours', // CONTROL_FEATURES
        body: `${CONTROL['Your cloud or ours']} ${CONTROL['Role-based access']}`,
      },
      {
        title: 'People Who Stay to Run It', // page copy
        body: `${phase('Pilot').body.split('. ')[1]} We then handle monitoring, exceptions, accuracy reviews and model updates.`, // page copy, from PHASES
      },
    ],
    image: { src: '/img/control/audit-flywheel.svg', width: 1000, height: 700, alt: 'An audit log recording each step of a document, from input to the system of record' },
  },
  testimonial: {
    eyebrow: 'Take it from a commercial deployment', // page copy
    quote: rfi ? `${rfi.title}. ${rfi.summary} The same pattern fits applications, forms and correspondence, with a person reviewing anything below the confidence threshold.` : '', // last sentence: page copy, from CONTROL_FEATURES
    plainText: true,
    name: rfi?.client ?? '',
    role: 'Commercial case, anonymised',
    tileLabel: 'RFI case', // page copy
  },
  demos: {
    eyebrow: 'Walkthroughs', // page copy
    title: 'How a Back-Office Workflow Runs', // page copy
    // page copy
    items: [
      { title: 'Reading an Incoming Document', poster: { src: '/img/control/docs-card.svg', alt: 'A source document beside the record read from it, with one field sent to review' } },
      { title: 'Matching Records Across Systems', poster: { src: '/img/control/sync-card.svg', alt: 'Records matched across CRM, ERP and finance, with exceptions on a short list' } },
      { title: 'Approving What Agents Propose', poster: { src: '/img/control/approval-light-wide.svg', alt: 'An agent’s action moving through propose, dry run, approve and write' } },
    ],
  },
  resources: {
    eyebrow: 'Resources',
    title: 'Read More About Our Work', // page copy
    items: [
      { tag: 'Commercial Case', title: caseTitle('rfi-response-automation'), image: '/img/control/queue-light.svg', href: '/case-studies/rfi-response-automation/' },
      { tag: 'Commercial Case', title: caseTitle('amerit-repair-order-ai'), image: '/img/control/approval-light.svg', href: '/case-studies/amerit-repair-order-ai/' },
      { tag: 'Commercial Case', title: caseTitle('piogroup-employee-assistant'), image: '/img/control/dash-light.svg', href: '/case-studies/piogroup-employee-assistant/' },
      { tag: 'Blog', title: 'Deploying LLMs Securely in Enterprise Environments', image: '/img/control/audit-light.svg', href: '/blog/secure-llm-deployment-enterprise/' },
    ],
  },
  prefooter: {
    title: 'Your next workflow starts with an Audit', // page copy
    image: '/img/careers/office-3.jpg',
    cta: { label: 'Book an Audit', href: CONTACT },
  },
}

export default function VahuePublicSectorDataEnginePage() {
  return (
    // Scale's first block starts 39px down at 1440 and 102px at 390 (its banner + header); the sticky navbar is 88px.
    <div className="bg-white pt-[13px] text-[#0a0a0a] md:-mt-[50px] md:pt-0">
      <SmoothScroll />
      <PublicSectorDataEnginePage content={vahuePublicSectorDataEngineContent} />
    </div>
  )
}
