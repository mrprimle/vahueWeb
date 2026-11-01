import { getCaseStudy } from '@/lib/case-studies'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import GlobalPublicSectorPage from '@/components/templates/global-public-sector/GlobalPublicSectorPage'
import type { GlobalPublicSectorContent } from '@/components/templates/global-public-sector/content'

/*
 * Vahue /global-public-sector on the scale.com/global-public-sector layout (components/templates/global-public-sector,
 * spec reference-snapshots/scale-clone/global-public-sector.md). Same ten sections, order, roles and counts; Scale's
 * colours and motion. Only copy and media change:
 *   - Vahue's workflows for public organisations outside the US; regions from public/llms.txt
 *   - every number comes from a real commercial case in lib/case-studies.ts and is labelled as such, so there are no
 *     placeholder metrics; there are no government customers, names or quotes on this page
 *   - the testimonial slot holds a case outcome, without quotation marks: it is not a quote
 *   - Vahue has no video for the video slot: the poster stays as a still photo, with no play control
 * Copy written for this page is marked `// page copy`.
 */

const CONTACT = '/contact/'

const docplanner = getCaseStudy('docplanner-voicebot-recovery')
const rfi = getCaseStudy('rfi-response-automation')
const pio = getCaseStudy('piogroup-employee-assistant')

export const vahueGlobalPublicSectorContent: GlobalPublicSectorContent = {
  hero: {
    headline: 'Global Public Sector',
    body: 'Running public workflows with AI agents across the EU, UK and selected APAC markets, built on four core controls: Review, Approval, Access and Audit.', // page copy
    cta: { label: 'Book an Audit', href: CONTACT },
    image: '/img/blog/blog4.avif',
  },
  trusted: {
    header: {
      title: 'Governed AI that fits local rules and data residency', // page copy
      body: 'Vahue deploys in your VPC or on-premises when data cannot leave, with ISO 27001 certified data handling and personal data used only for the workflow it was shared for', // page copy, from CONTROL_FEATURES and /security
    },
    items: [
      {
        title: 'Engineers Alongside Your Team', // page copy
        description: 'Vahue works with your staff on one workflow at a time, to turn a policy goal into a service you can measure.', // page copy
        image: { src: '/img/control/audit-pilot-operate.svg', alt: 'Three steps: Audit for 2 weeks, Pilot for 4 to 6 weeks, Operate monthly', width: 500, height: 334 },
      },
    ],
  },
  foundations: {
    header: {
      title: 'The foundations of Private, Secure, and Reliable agents', // page copy
      body: 'Vahue brings together your records, governed agents and hands-on training to cover the whole rollout, from the workflow audit and data access to deployment and day-to-day operation', // page copy
    },
    // The template inverts these images (as on Scale), so the panels are drawn dark.
    columns: [
      { title: 'Data', body: 'Records connected with existing permissions', image: { src: '/img/control/sync-dark.svg', alt: 'Records matched across CRM, ERP and finance systems' } }, // page copy
      { title: 'Workflows', body: 'Six workflows, one control layer', image: { src: '/img/control/chat-dark.svg', alt: 'A knowledge agent answering with cited sources' } }, // page copy
      { title: 'Talent', body: 'Training and handover', image: { src: '/img/control/approval-dark.svg', alt: 'Staff approving an agent’s proposed action' } }, // page copy
    ],
  },
  value: {
    header: { title: 'How Vahue Delivers Value' }, // page copy
    // page copy
    cards: [
      { icon: 'MdOutlineShield', title: 'Deployed Where Your Data Lives', body: 'Runs in your VPC or on-premises when data mandates say records cannot leave' },
      { icon: 'MdOutlineVerified', title: 'Proven Production Experience', body: 'Results published from governed agents running in commercial production' },
      { icon: 'MdOutlinePeople', title: 'Delivery Across Regions', body: 'Working with clients across the US, EU, UK and selected APAC markets, with lasting capability transfer and long-term ownership on your side' },
      { icon: 'MdOutlineSchool', title: 'Upskilling and Enablement', body: 'Build capability through embedded collaboration, hands-on training and documentation your team keeps afterwards' },
      { icon: 'MdOutlineHowToReg', title: 'Human-in-the-Loop Assurance', body: 'Review queues and approvals keep people in charge of anything below the threshold' },
      { icon: 'MdOutlineMergeType', title: 'End-to-End Delivery', body: 'From the workflow audit and pilot to day-to-day operation and monthly reports' },
    ],
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    plainText: true,
    theme: { hex: '#839CB2', contrast: '#000000' },
    items: docplanner ? [{ name: docplanner.client, title: `${docplanner.service}, ${docplanner.disclosure.toLowerCase()}`, quote: `${docplanner.title}. ${docplanner.summary}` }] : [],
  },
  stats: [
    { icon: 'MdEditDocument', label: 'RFI responses', value: '>90%', body: 'Automated, with review intact' }, // case: rfi-response-automation
    { icon: 'MdSchool', label: 'Answer accuracy', value: '>90%', body: 'Reported on permissioned data' }, // case: piogroup-employee-assistant
    { icon: 'MdSecurity', label: 'Incident resolution', value: '27%', body: 'Faster on repeatable incidents' }, // case: exaware-governed-noc-agents
  ],
  portfolio: {
    title: 'Solutions Portfolio',
    columns: ['Category', 'Solutions'],
    emptyLabel: 'On request', // page copy
    mobileVisible: 4,
    // page copy, from WORKFLOWS and INDUSTRY_WORKFLOWS. What the workflows can do in each area, not a list of customers.
    // Sorted alphabetically per category, as Scale's AISolutionsGrid does.
    rows: [
      { category: 'Legal & Compliance', color: '#714DFF', solutions: ['Audit Finding Classification', 'Policy Review Agent'] },
      { category: 'Education & Training', color: '#9C83FF', solutions: ['Staff Knowledge Agent', 'Team Training Programs'] },
      { category: 'Center of Government', color: '#7B8FDD', solutions: ['Meeting Prep Agent', 'Sourced Policy Q&A'] },
      { category: 'Government Services', color: '#86BFF2', solutions: ['Application Intake', 'Licence Document Checks', 'Service Request Routing', 'Voice Support Agent'] },
      { category: 'Healthcare', color: '#E151FF', solutions: ['Clinical Document Summaries'] },
      { category: 'Finance & Procurement', color: '#C88BC4', solutions: ['Invoice Intake', 'Reconciliation Prep', 'RFI Response Automation', 'Supplier Onboarding'] },
      { category: 'Infrastructure & Permitting', color: '#D1AAD7', solutions: ['Drawings to Bills of Materials', 'Inspection Report Intake', 'Repair-Order Scoring'] },
      { category: 'Public Communications', color: '#BBDEF2', solutions: ['Correspondence Drafting', 'Inbox Triage'] },
      { category: 'Transport & Logistics', color: '#FFF759', solutions: ['Status Inbox Agent'] },
      { category: 'Energy & Utilities', color: '#0076FF', solutions: [] },
    ],
  },
  video: {
    poster: '/img/careers/office-5.jpg',
    title: '',
    description: '',
  },
  useCases: {
    overtitle: 'Use cases',
    challengeLabel: 'Challenge',
    outcomesLabel: 'Key Outcomes',
    cases: [
      {
        tab: 'Document Intake & Response', // page copy
        title: 'Document Intake & Response', // page copy
        subtitle: `In a commercial deployment for a ${rfi?.client}, responses that took several days now take a few hours, with more than 90% automated and full editing control kept.`, // page copy, from the case
        challenge: 'RFI responses took several days to turn around, and automating them could not come at the cost of editing controls or audit history. The same pattern fits applications and correspondence.', // page copy, from the case
        stats: [
          { value: '>90%', label: 'RFI responses automated' }, // case: rfi-response-automation
          { value: 'Hours', label: 'Turnaround, from days' }, // case: rfi-response-automation
          { value: 'Full', label: 'Audit history retained' }, // case: rfi-response-automation
        ],
        outcomes: [
          ...(rfi?.outcomes ?? []),
          'Confidence threshold per field', // WORKFLOWS document-intake
          'Side-by-side review of source and record', // WORKFLOWS document-intake
        ],
        image: { src: '/img/control/docs-card.svg', alt: 'A source document beside the record read from it' },
      },
      {
        tab: 'Knowledge Q&A for Staff', // page copy
        title: 'Knowledge Q&A for Staff', // page copy
        subtitle: 'At PioGroup, staff ask questions of permissioned CRM and ERP data, with more than 90% reported answer accuracy and adoption across more than 30% of the company.', // page copy, from the case
        challenge: 'Answers lived across scattered systems and in a few people’s heads, and any assistant had to respect who may see what. Public bodies face the same problem with policy and guidance.', // page copy, from WORKFLOWS knowledge-agents
        stats: [
          { value: '>90%', label: 'Reported answer accuracy' }, // case: piogroup-employee-assistant
          { value: '>30%', label: 'Company-wide adoption' }, // case: piogroup-employee-assistant
          { value: 'Role', label: 'Permission-aware access' }, // case: piogroup-employee-assistant
        ],
        outcomes: [
          ...(pio?.outcomes ?? []),
          'No figure without a traceable query', // WORKFLOWS knowledge-agents
          'Unanswered questions become the next content to add', // WORKFLOWS knowledge-agents
        ],
        image: { src: '/img/control/chat-card.svg', alt: 'A knowledge agent answering with cited sources' },
      },
    ],
  },
  prefooter: {
    headline: 'Start Your Agent Rollout with One Measured Workflow', // page copy
    cta: { label: 'Book a Meeting', href: CONTACT },
    image: '/img/careers/office-1.jpg',
  },
}

export default function VahueGlobalPublicSectorPage() {
  return (
    // Scale's first block starts 39px down at 1440 and 102px at 390 (its banner + header); the sticky navbar is 88px.
    <div className="bg-white pt-[13px] md:-mt-[50px] md:pt-0">
      <SmoothScroll />
      <GlobalPublicSectorPage content={vahueGlobalPublicSectorContent} />
    </div>
  )
}
