import { CONTROL_FEATURES, PHASES } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import NationalSecurityPage from '@/components/templates/public-sector-national-security/NationalSecurityPage'
import type { CustomerPost, NationalSecurityContent } from '@/components/templates/public-sector-national-security/content'

/*
 * Vahue /public-sector/national-security on the scale.com/public-sector/national-security layout
 * (components/templates/public-sector-national-security, spec reference-snapshots/scale-clone/public-sector-national-security.md).
 * Same ten sections, order, roles and counts; Scale's colours and motion. Only copy and media change.
 * The research has no national-security work, so the page is about governed agents on sensitive data in the customer's
 * own environment. It makes no claim to clearances, government customers or defence contracts, and says so in How to Work:
 *   - logos and customers are commercial, labelled as such; the seven logos are the ones the site already uses
 *   - every stat comes from a real commercial case in lib/case-studies.ts and names it, so there are no placeholder metrics
 *   - the only certification is ISO 27001, which /security already states
 * Copy written for this page is marked `// page copy`.
 */

const CONTACT = '/contact/'
const NEUTRAL = 'rgb(82, 82, 82)'
const GREEN = '#193A29'
const CONTROL = Object.fromEntries(CONTROL_FEATURES.map((f) => [f.title, f.body]))
const logo = (src: string, alt: string) => ({ src, alt, width: 90 })

const customer = (slug: string, image: string, swatch: string): CustomerPost[] => {
  const c = getCaseStudy(slug)
  return c ? [{ category: c.service, swatch, title: c.title, href: `/case-studies/${c.slug}/`, image }] : []
}

export const vahueNationalSecurityContent: NationalSecurityContent = {
  hero: {
    headline: 'Governed Agents on Your Most Sensitive Data', // page copy
    body: 'Vahue’s agents run inside your VPC or on-premises, work from your own data and rules, and keep people in review with every action on record.', // page copy
    trustedLabel: 'Trusted by commercial teams', // page copy
    logos: [
      logo('/img/shopify.svg', 'Shopify'),
      logo('/img/qontoLogo.svg', 'Qonto'),
      logo('/img/leafworks.svg', 'Leafworks'),
      logo('/img/tracesafe.svg', 'Tracesafe'),
      logo('/img/carmen.svg', 'Carmen'),
      logo('/img/bringliesel.svg', 'BringLiesel'),
      logo('/img/quilk.svg', 'Quilk'),
    ],
    image: '/img/control/boundary-dark.svg',
  },
  challenges: {
    headline: 'Challenges',
    body: 'Using agents without giving up control of your data', // page copy
    counterLabel: 'CHALLENGES',
    introImage: '/img/control/challenge-context.svg',
    // page copy
    steps: [
      {
        title: 'Missing Your Context',
        body: 'Off-the-shelf assistants aren’t connected to your data or your rules, creating more risk than impact.',
        image: '/img/control/challenge-context.svg',
        alt: 'Diagram with severed links between your data, the agent and review',
      },
      {
        title: 'Unreliable & Opaque',
        body: 'Teams can’t rely on agents they can’t explain. Plausible but wrong answers get through without human review, and accuracy degrades over time.',
        image: '/img/control/challenge-opaque.svg',
        alt: 'Diagram with dashed, unverifiable links and a question mark at the agent',
      },
      {
        title: 'Data That Cannot Leave',
        body: 'Sensitive records can’t go to an outside service, so useful data stays out of reach and staff keep searching and re-keying by hand.',
        image: '/img/control/challenge-data.svg',
        alt: 'Diagram with the data panel hatched out and a severed link',
      },
      {
        title: 'Complex & Inflexible',
        body: 'Long procurement and closed systems slow every change, while a black-box tool locks up your data and leaves you dependent on one vendor.',
        image: '/img/control/challenge-locked.svg',
        alt: 'Diagram with the review panel locked',
      },
    ],
  },
  stats: {
    heading: 'Reliable agents designed for sensitive decisions.', // page copy
    background: '/img/blog/agentic-flexibility-assets.webp',
    stats: [
      { icon: 'MdAlarm', label: 'TIME SAVED', value: '27% faster', body: 'repeatable incident resolution at Exaware' }, // case: exaware-governed-noc-agents
      { icon: 'MdShowChart', label: 'ACCELERATE RESPONSE', value: 'RFI responses', body: 'completed in hours vs. days' }, // case: rfi-response-automation
      { icon: 'Md3P', label: 'ANSWER ACCURACY', value: '>90%', body: 'reported answer accuracy at PioGroup' }, // case: piogroup-employee-assistant
      { icon: 'MdAttachMoney', label: 'HUMAN AGREEMENT', value: '75–80%', body: 'on repair-order scoring at Amerit' }, // case: amerit-repair-order-ai
      { icon: 'MdDynamicFeed', label: 'AUTOMATION', value: '>90%', body: 'of RFI responses, with human review intact' }, // case: rfi-response-automation
      { icon: 'MdEnhancedEncryption', label: 'PROTECT SECURITY', value: 'Zero', body: 'unauthorized executions in UAT and staging at Exaware' }, // case: exaware-governed-noc-agents
    ],
  },
  trust: {
    heading: 'Reliable commercial AI. With speed and control.', // page copy
    // page copy
    cards: [
      {
        icon: 'MdCheck',
        title: 'Purpose-Built & Rule-Aligned',
        body: 'Replace manual processes with agents set up on your data and rules. Vahue maps one workflow end to end before anything runs, so teams can decide and act faster, with less risk and rework.',
      },
      {
        icon: 'MdUpload',
        title: 'Reliable & Reviewed',
        body: 'Vahue reviews accuracy every month and tries to break each agent before you rely on it, catching wrong answers, overreach and drift, while citing data sources and keeping people in review, so agents keep working in your environment.',
      },
      {
        icon: 'MdShield',
        title: 'Deep Data Expertise & Upskilling',
        body: 'Vahue’s engineers connect your data with existing permissions, tailor agents to your use cases, and train your team to run them. Your code stays in your repositories and your data stays with you.',
      },
      {
        icon: 'MdHub',
        title: 'Open & Flexible',
        body: 'Vahue is model-agnostic and deploys in your VPC or on-premises, connecting to the tools you already use, such as SharePoint, SAP and Snowflake, without vendor lock-in.',
      },
    ],
  },
  missionTitle: {
    headline: 'Governed Agentic Workflow Solutions', // page copy
    body: 'Vahue turns your sensitive records into reviewed, logged work by agents, on whichever model fits your rules, with a control layer your team can inspect at every step.', // page copy
    cta: { label: 'Schedule a Call', href: CONTACT },
  },
  flywheel: {
    // page copy, with bodies drawn from CONTROL_FEATURES and PHASES
    steps: [
      {
        title: 'VAHUE GOVERNED AGENTS',
        paragraphs: [
          'Vahue’s agents are designed for control, transparency and accountable decisions.',
          'They take on document intake, knowledge Q&A, support and back-office sync, under review queues and approvals, so outputs stay secure, auditable and ready to use.',
        ],
        image: '/img/control/boundary-light.svg',
      },
      {
        title: 'Your Cloud or Ours',
        paragraphs: [`${CONTROL['Your cloud or ours']} ${CONTROL['Role-based access']} Actions that move money, customers or data wait for your team’s approval.`],
        image: '/img/control/queue-flywheel.svg',
        link: { label: 'Learn more', href: '/security/' },
      },
      {
        title: 'Vahue Audit Log',
        paragraphs: [`${CONTROL['Audit log']} Every answer cites its source, so your team can show what an agent did and why.`],
        image: '/img/control/audit-flywheel.svg',
        link: { label: 'Learn more', href: '/evaluation/public-sector/' },
      },
      {
        title: 'Vahue Operate',
        paragraphs: [`${PHASES[2].body} You see how each agent performs and can stop it at any point.`],
        image: '/img/control/dash-flywheel.svg',
        link: { label: 'Learn more', href: '/operations/' },
      },
    ],
  },
  customers: {
    heading: 'Real Customers. Production Work.', // page copy
    posts: [
      ...customer('exaware-governed-noc-agents', '/img/blog/blog3.png', NEUTRAL),
      ...customer('piogroup-employee-assistant', '/img/careers/office-3.jpg', GREEN),
      ...customer('rfi-response-automation', '/img/careers/office-1.jpg', NEUTRAL),
      ...customer('amerit-repair-order-ai', '/img/blog/blog4.avif', NEUTRAL),
    ],
  },
  howToBuy: {
    heading: 'How to Work with Vahue', // page copy
    body: 'Vahue deploys in **your VPC or on-premises**, with **ISO 27001** certified data handling. We do not hold government clearances or defence accreditations.', // page copy
    cta: { label: 'Contact Us', href: CONTACT },
    items: [
      { question: 'Start with an Audit', answer: `${PHASES[0].body} It takes ${PHASES[0].length}.` },
      { question: 'Run a Pilot', answer: PHASES[1].body },
      { question: 'Operate Monthly', answer: PHASES[2].body },
      { question: 'Your Cloud or Ours', answer: 'Vahue runs in your VPC, on-premises or in our cloud, and works with the model that fits your rules.' }, // page copy
    ],
    image: '/img/careers/office-5.jpg',
    imageAlt: 'The Vahue office seen from the mezzanine',
  },
  resources: {
    heading: 'Resources',
    posts: [
      { category: 'Security', swatch: '#273252', title: 'Read About Security and the Control Layer', href: '/security/', image: '/img/careers/office-4.jpg', imageAlt: 'The Vahue open-plan office', variant: 'caption' }, // title: page copy
      { category: 'Blog', swatch: GREEN, title: 'Deploying LLMs Securely in Enterprise Environments', href: '/blog/secure-llm-deployment-enterprise/', image: '/img/blog/blog1.jpg', imageAlt: 'A tree growing from data, an illustration for the post', variant: 'overlay', gradient: true },
      { category: 'Evaluation', swatch: GREEN, title: 'See How We Evaluate Agents', href: '/evaluation/model-developers/', image: '/img/blog/blog2.jpg', imageAlt: 'A glass flower, an illustration for the post', variant: 'overlay', gradient: true }, // title: page copy
    ],
  },
  prefooter: {
    headline: 'Schedule a private call with a senior engineer.', // page copy
    cta: { label: 'Speak with an expert', href: CONTACT },
    image: '/img/careers/team-vahue-mi.png',
  },
}

export default function VahueNationalSecurityPage() {
  return (
    // Scale's first block starts 39px down at 1440 and 102px at 390 (its banner + header); the sticky navbar is 88px.
    <div className="bg-black pt-[13px] md:-mt-[50px] md:pt-0">
      <SmoothScroll />
      <NationalSecurityPage content={vahueNationalSecurityContent} />
    </div>
  )
}
