import { CONTROL_FEATURES } from '@/lib/automation-content'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import EvaluationPublicSectorPage from '@/components/templates/evaluation-public-sector/EvaluationPublicSectorPage'
import type { EvaluationPublicSectorContent } from '@/components/templates/evaluation-public-sector/content'

/*
 * Vahue /evaluation/public-sector on the scale.com/evaluation/public-sector layout
 * (components/templates/evaluation-public-sector, spec reference-snapshots/scale-clone/evaluation-public-sector.md).
 * Same seven sections, order, roles and counts; Scale's colours and motion. Only copy and media change:
 *   - repositioned as evaluating and auditing agents for regulated and public buyers
 *   - Vahue has no government customers: the logo strip shows two commercial client logos the site already uses, and its
 *     lead says so. No government names, logos, clearances or accreditations appear on this page
 *   - no metric slots, so no placeholder metrics
 * Copy written for this page is marked `// page copy`.
 */

const CONTACT = '/contact/'
const CONTROL = Object.fromEntries(CONTROL_FEATURES.map((f) => [f.title, f.body]))

export const vahueEvaluationPublicSectorContent: EvaluationPublicSectorContent = {
  hero: {
    headline: 'Public Sector Agent Evaluation', // page copy
    body: 'Test and audit agents for accuracy, safety and accountability.', // page copy
    image: '/img/careers/office-1.jpg',
    primary: { label: 'Book an Audit', href: CONTACT },
    secondary: { label: 'Learn more', href: '/public-sector/' },
  },
  logos: {
    lead: 'Commercial teams already run their agents on this same control layer.', // page copy
    link: { label: 'Read the cases', href: '/case-studies/' }, // page copy
    items: [
      { src: '/img/qontoLogo.svg', alt: 'Qonto', width: 79, height: 21 },
      { src: '/img/tracesafe.svg', alt: 'Tracesafe', width: 80, height: 22 },
    ],
  },
  techniques: {
    eyebrow: 'Evaluate Agents in Regulated Work', // page copy
    title: 'Test Agents That Read and Act', // page copy
    body: 'Evaluation for agents that read public records and agents that act on them.', // page copy
    cards: [
      {
        title: 'Reading Agents', // page copy
        body: 'Measures field accuracy and sends uncertain documents to a person.', // page copy
        image: { src: '/img/control/queue-light-wide.svg', width: 876, height: 468, alt: 'A review queue where uncertain documents wait for a person' },
      },
      {
        title: 'Acting Agents', // page copy
        body: 'Limits risk by proposing every action in a dry run before approval.', // page copy
        image: { src: '/img/control/approval-light-wide.svg', width: 876, height: 468, alt: 'Agent actions moving through propose, dry run, approve and write' },
      },
    ],
  },
  why: {
    eyebrow: 'Why Test & Audit Agents', // page copy
    title: 'Why Test & Audit Agents', // page copy
    body: 'Public decisions need a record. Show that each agent can be trusted with the work it handles.', // page copy
    // page copy
    items: [
      { icon: 'verifiedUser', title: 'Roll Out with Evidence', body: 'Have a recorded baseline and a target agreed before an agent goes live' },
      { icon: 'autorenew', title: 'Ongoing Evaluation', body: 'Review accuracy every month, across model updates and changes in data' },
      { icon: 'searchOff', title: 'Uncover agent failures', body: 'Test real documents and edge cases to catch wrong answers, overreach and exposure' },
    ],
  },
  methodology: {
    eyebrow: 'How We Evaluate', // page copy
    title: 'Audit & Evaluation Methodology', // page copy
    body: 'Built on Audit, Pilot and Operate, the way every Vahue engagement runs.', // page copy
    mockupUrl: 'Vahue control layer',
    image: { src: '/img/control/audit-dark.svg', width: 1000, height: 668, alt: 'An audit log recording each input, decision and action for one item' },
    heading: 'A Full Audit Trail for Every Agent', // page copy
    // page copy, from PHASES and CONTROL_FEATURES
    items: [
      'A recorded baseline of volume, minutes per item, error rate and cost before any agent runs',
      'Your own reviewers check every output during the pilot, until accuracy holds on real volume',
      'Monthly reports against the baseline, adapting to changes in policy, data and models',
    ],
    cta: { label: 'Read more', href: '/security/' },
  },
  whyScale: {
    eyebrow: 'Why Vahue',
    title: 'Evaluate & Audit Agents with Vahue’s Control Layer', // page copy
    body: 'Vahue’s control layer covers the whole evaluation and audit process, giving your team live results and a searchable record of what each agent did and why.', // page copy
    cards: [
      { icon: 'tune', title: 'Review Queues', body: CONTROL['Review queues'] },
      { icon: 'personSearch', title: 'Approvals and Dry Runs', body: CONTROL['Approvals and dry runs'] },
      { icon: 'barChart', title: 'Results Dashboard', body: CONTROL['Results dashboard'] },
      { icon: 'gpsFixed', title: 'Role-Based Access', body: `${CONTROL['Role-based access']} Permissions already set in your systems stay in force.` }, // second sentence: page copy
      { icon: 'gridView', title: 'Audit Log', body: `${CONTROL['Audit log']} Hand it to your auditors as it stands.` }, // second sentence: page copy
      { icon: 'shield', title: 'Your Cloud or Ours', body: CONTROL['Your cloud or ours'] },
    ],
  },
  prefooter: {
    headline: 'Audit your agents today!', // page copy
    image: '/img/careers/office-5.jpg',
    primary: { label: 'Book an Audit', href: CONTACT },
  },
}

export default function VahueEvaluationPublicSectorPage() {
  return (
    // Scale's first block starts 39px down at 1440 and 102px at 390 (its banner + header); the sticky navbar is 88px.
    <div className="bg-white pt-[13px] md:-mt-[50px] md:pt-0">
      <SmoothScroll />
      <EvaluationPublicSectorPage content={vahueEvaluationPublicSectorContent} />
    </div>
  )
}
