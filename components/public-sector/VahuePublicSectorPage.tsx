import { CONTROL_FEATURES, WORKFLOWS } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import PublicSectorPage from '@/components/templates/public-sector/PublicSectorPage'
import type { PublicSectorContent } from '@/components/templates/public-sector/content'

/*
 * Vahue /public-sector on the scale.com/public-sector layout (components/templates/public-sector, spec
 * reference-snapshots/scale-clone/public-sector.md). Same eight sections, order, roles and counts; Scale's colours and
 * motion. Only copy and media change:
 *   - the use cases are Vahue's workflows as they apply to public organisations; bullets describe the work, not customers
 *   - Vahue has no government customers: the logo cloud shows the seven commercial client logos the site already uses
 *     (components/main/ClientsStrip.tsx), and "Proven experience" names commercial cases only
 *   - the resources are real case studies, posts and pages; no metric slots, so no placeholder metrics
 * Copy written for this page is marked `// page copy`.
 */

const CONTACT = '/contact/'
const CONTROL = Object.fromEntries(CONTROL_FEATURES.map((f) => [f.title, f.body]))
const wf = (slug: string) => WORKFLOWS.find((w) => w.slug === slug)!
const caseTitle = (slug: string) => getCaseStudy(slug)?.title ?? ''
const card = (src: string, alt: string) => ({ src, width: 480, height: 360, alt })

export const vahuePublicSectorContent: PublicSectorContent = {
  hero: {
    headline: 'US Public Sector',
    body: 'Vahue’s agents take on document intake, knowledge Q&A, support and back-office sync for public organisations, with people in review and every action logged.', // page copy
    image: '/img/careers/team-vahue-mi.png',
    primary: { label: 'Book an Audit', href: CONTACT },
  },
  logos: [
    { src: '/img/shopify.svg', alt: 'Shopify', width: 79, height: 23 },
    { src: '/img/qontoLogo.svg', alt: 'Qonto', width: 79, height: 21 },
    { src: '/img/leafworks.svg', alt: 'Leafworks', width: 90, height: 16 },
    { src: '/img/tracesafe.svg', alt: 'Tracesafe', width: 80, height: 22 },
    { src: '/img/carmen.svg', alt: 'Carmen', width: 85, height: 11 },
    { src: '/img/bringliesel.svg', alt: 'BringLiesel', width: 84, height: 20 },
    { src: '/img/quilk.svg', alt: 'Quilk', width: 60, height: 24 },
  ],
  useCases: {
    eyebrow: 'Use Cases',
    title: 'Taking Routine Casework Off Public Teams', // page copy
    body: 'Vahue runs high-volume workflows with AI agents inside the tools your organisation already uses, so services keep up without new hires.', // page copy, from POSITIONING.promise
    // page copy: bullets apply the workflows in lib/automation-content.ts to public work
    cards: [
      {
        title: 'Document Intake & Case Files',
        image: card('/img/control/docs-card.svg', wf('document-intake').label),
        bullets: ['Applications, forms and correspondence', 'Invoices, claims and supplier sheets', 'Fields checked against your own rules', 'Every field traceable to its source page'],
      },
      {
        title: 'Knowledge Q&A for Staff',
        image: card('/img/control/chat-card.svg', wf('knowledge-agents').label),
        bullets: ['Policies, guidance and procedure manuals', 'Sourced answers in Slack, Teams or a browser', 'Answers respect each user’s access rights', 'Faster starts for new staff'],
      },
      {
        title: 'Support for Residents and Service Users',
        image: card('/img/control/support-card.svg', wf('support-agents').label),
        bullets: ['Routine requests by chat, email or phone, with identity checks where needed', 'Status lookups within set limits', 'Hand-off to a person on request, with a summary'],
      },
      {
        title: 'Back-Office Sync',
        image: card('/img/control/sync-card.svg', wf('back-office-sync').label),
        bullets: ['Finance and ERP reconciliations', 'Purchase orders and approvals', 'Mismatches on a short exception list', 'Full audit log per record'],
      },
      {
        title: 'Scoring & Routing',
        image: card('/img/control/scoring-card.svg', wf('scoring-decisions').label),
        bullets: ['Sorting inbound requests', 'Quality checks on batches', 'Borderline cases sent to a reviewer', 'Explanations stored with each decision', 'Reviewer agreement tracked every week'],
      },
    ],
  },
  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Governed Agents, Ready for Public Work', // page copy
    body: 'Commercially proven workflows and a control layer that keeps people in charge of every agent', // page copy
    rows: [
      {
        heading: 'AI Agents', // page copy
        image: { src: '/img/control/queue-row.svg', width: 644, height: 461, alt: 'A review queue with confidence scores for incoming documents' },
        // page copy, from PHASES and WORKFLOWS
        items: [
          { title: 'Measured from day one', body: 'Each workflow starts with a recorded baseline of volume, minutes per item, error rate and cost.' },
          { title: 'Inside the tools you already use', body: 'Agents connect to your email, document stores, ERP and CRM, with your existing permissions kept in place.' },
          { title: 'Operated month to month', body: 'We handle monitoring, exceptions, accuracy reviews and model updates.' },
        ],
        cta: { label: 'Learn more', href: '/automations/' },
      },
      {
        heading: 'Control Layer', // page copy
        image: { src: '/img/control/audit-row.svg', width: 662, height: 474, alt: 'An audit log recording each step of an agent’s work' },
        items: [
          { title: 'Review Queues', body: CONTROL['Review queues'] },
          { title: 'Audit Log', body: CONTROL['Audit log'] },
          { title: 'Your Cloud or Ours', body: CONTROL['Your cloud or ours'] },
        ],
        cta: { label: 'Learn more', href: '/security/' },
      },
    ],
  },
  whyScale: {
    eyebrow: 'Why Vahue',
    title: 'Measured Performance', // page copy
    body: 'Reach the accuracy your service needs by combining your own data with governed agents, human review and a team that stays to run them.', // page copy
    // page copy
    items: [
      {
        icon: 'psychology',
        title: 'AI-native',
        body: 'Vahue’s team of 17 and network of 15+ specialists ship agents with evals, guardrails and observability, and bring the same rigor to every regulated workflow we take on.',
      },
      {
        icon: 'verified',
        title: 'Proven experience',
        body: 'Commercial teams including Exaware, Amerit Fleet Solutions and PioGroup rely on Vahue for production agents under explicit controls, with results published in our case studies.',
      },
      {
        icon: 'groupAdd',
        title: 'Software and People',
        body: 'A person on your team checks every output until accuracy holds, and Vahue stays on to run the agents, handle exceptions and report against the baseline every month.',
      },
    ],
  },
  banner: {
    title: 'Vahue builds the skills to run agents inside your team.', // page copy
    body: 'Hands-on work with your staff, so your organisation can run, explain and extend what we deploy together.', // page copy, from in-house-marketing-mix-modeling
    image: { src: '/img/careers/office-3-square.jpg', width: 560, height: 560, alt: 'Vahue team members at their desks' },
    cta: { label: 'Learn more', href: '/experts/' },
  },
  resources: {
    eyebrow: 'RESOURCES',
    title: 'Learn More About Our Workflows and Controls', // page copy
    items: [
      { tag: 'Case Study', title: caseTitle('exaware-governed-noc-agents'), image: '/img/control/dash-light.svg', href: '/case-studies/exaware-governed-noc-agents/' },
      { tag: 'Case Study', title: caseTitle('rfi-response-automation'), image: '/img/control/queue-light.svg', href: '/case-studies/rfi-response-automation/' },
      { tag: 'Case Study', title: caseTitle('piogroup-employee-assistant'), image: '/img/control/audit-light.svg', href: '/case-studies/piogroup-employee-assistant/' },
      { tag: 'Case Study', title: caseTitle('amerit-repair-order-ai'), image: '/img/control/approval-light.svg', href: '/case-studies/amerit-repair-order-ai/' },
      { tag: 'Blog', title: 'Deploying LLMs Securely in Enterprise Environments', image: '/img/blog/blog1.jpg', href: '/blog/secure-llm-deployment-enterprise/' },
      { tag: 'Blog', title: 'Trump’s AI order, decoded', image: '/img/blog/blog4.avif', href: '/blog/trumps-ai-order-decoded/' },
      { tag: 'Workflow', title: wf('document-intake').headline, image: '/img/control/docs-card.svg', href: '/automations/document-intake/' },
      { tag: 'Workflow', title: wf('knowledge-agents').headline, image: '/img/control/chat-card.svg', href: '/automations/knowledge-agents/' },
      { tag: 'Security', title: 'Security and the Control Layer', image: '/img/careers/office-1.jpg', href: '/security/' }, // page copy
    ],
  },
  prefooter: {
    headline: 'Start with one public workflow', // page copy
    image: '/img/blog/agentic-flexibility-assets.webp',
    primary: { label: 'Book an Audit', href: CONTACT },
    secondary: { label: 'See Workflows', href: '/automations/' },
  },
}

export default function VahuePublicSectorPage() {
  return (
    // Scale's first block starts 39px down at 1440 and 102px at 390 (its banner + header); the sticky navbar is 88px.
    <div className="bg-white pt-[13px] md:-mt-[50px] md:pt-0">
      <SmoothScroll />
      <PublicSectorPage content={vahuePublicSectorContent} />
    </div>
  )
}
