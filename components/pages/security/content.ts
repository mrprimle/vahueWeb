// Copy for /security ("Security" in the menu). Keep first: Scale's string stays unless it is false for Vahue, brand words swap,
// the rest changes by a few words. Same shape and counts as content.scale.ts. PLACEHOLDER lines are for Mike.
import type { SecurityContent } from './types'

const A = '/security'
const TRUST = { text: "Vahue's Trust Center.", url: '/demo' } // PLACEHOLDER: no Trust Center exists yet, point at the real one
const LEAD = 'Please find the most recent report in'

export const content: SecurityContent = {
  meta: {
    title: 'Security at Vahue | Vahue',
    description: 'At Vahue, our customers trust us to develop reliable systems for their most important applications.',
  },
  hero: {
    headline: 'Security at Vahue',
    body: 'At Vahue, our customers trust us to develop reliable systems for their most important applications. This trust is our driving principle — we embed security into our platform at every level.',
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/hero.webp` },
  },
  commitment: {
    overtitle: 'Our Commitment',
    title: 'Security built into every layer',
    items: [
      { key: 'commitment-1', icon: 'lock', color: '#79648C', title: "Protect Our Customers' Data.", description: "We are dedicated to safeguarding the data and integrity of our customers' critical work. Our security program is designed to protect customer assets and proactively reduce the frequency of negative security events." },
      { key: 'commitment-2', icon: 'shield', color: '#A8927C', title: 'Secure Our Foundation.', description: 'We treat security as foundational, integrating it deeply into our company culture and product development lifecycle.' },
      { key: 'commitment-3', icon: 'public', color: '#839CB2', title: 'Protect our Shared Future.', description: 'As leaders in AI, we believe our responsibility extends to the entire field. That is why we actively partner with customers, industry, and the research community to define and elevate standards for secure and responsible AI.' },
    ],
  },
  compliance: {
    overtitle: 'Compliance',
    title: 'Certifications and Compliance',
    subtitle: "Learn about Vahue's certifications, frameworks, and compliance programs. To access Vahue's latest security compliance certifications and reports, please visit our Trust Center.", // PLACEHOLDER
    items: [
      {
        key: 'tab1',
        logo: { src: `${A}/soc2-type-ii.png`, alt: 'SOC 2 Type II', invert: false }, // PLACEHOLDER
        title: 'SOC 2 Type II', // PLACEHOLDER
        body: 'SOC stands for the Service Organization Controls created by the American Institute of Certified Public Accounts ("AICPA"). Vahue has a SOC 2 Type 2 report demonstrating its commitment to protecting customer data through security, availability, and confidentiality controls that align with the AICPA Trust Services Criteria.', // PLACEHOLDER
        reportLead: LEAD,
        reportLink: TRUST,
      },
      {
        key: 'tab2',
        logo: { src: `${A}/iso-27001.png`, alt: 'ISO 27001', invert: true }, // PLACEHOLDER
        title: 'ISO 27001', // PLACEHOLDER
        body: 'The International Organization for Standardization (ISO) is an independent, global entity that brings experts together to create and maintain various management system standards. Vahue has certified its product and services against ISO/IEC 27001:2022 and makes its ISO certificate available for download.', // PLACEHOLDER
        reportLead: LEAD,
        reportLink: TRUST,
      },
      {
        key: 'tab3',
        logo: { src: `${A}/gdpr.png`, alt: 'GDPR', invert: false }, // PLACEHOLDER: stands in for Scale's DISA logo
        title: 'General Data Protection Regulation', // PLACEHOLDER: stands in for DoD IL4
        body: 'The General Data Protection Regulation (GDPR) is issued by the European Union (EU) and defines how a service must collect, process, and store personal data to meet the rigorous requirements defined in its data protection principles.', // PLACEHOLDER
        reportLead: LEAD,
        reportLink: TRUST,
      },
      {
        key: 'tab4',
        logo: { src: `${A}/hipaa.png`, alt: 'HIPAA', invert: false }, // PLACEHOLDER: stands in for Scale's FedRAMP logo
        title: 'HIPAA Security Compliant', // PLACEHOLDER: stands in for FedRAMP High
        body: 'HIPAA stands for the Health Insurance Portability and Accountability Act. It is a United States federal law that provides a standardized approach to security safeguards, access control, and continuous monitoring for all Protected Health Information (PHI) used by healthcare organizations.', // PLACEHOLDER
        reportLead: LEAD,
        reportLink: TRUST,
      },
    ],
  },
  cards: [
    {
      label: 'Scale-Ups',
      title: 'Vahue for Scale-Ups',
      body: 'Vahue powers key back-office and agentic AI programs across various Scale-Up partners.', // PLACEHOLDER: customer claim
      cta: { text: 'Learn more', url: '/public-sector' },
      image: { src: `${A}/office-tower.webp`, alt: 'Office building', className: 'object-cover object-top' },
    },
    {
      label: 'Trust Center',
      title: 'Learn about how we protect ourselves and our customers',
      body: 'Vahue powers key back-office and agentic AI programs across Operations, Revenue and Support teams, Professional Services firms, and Regulated Industries.', // PLACEHOLDER: customer claim
      cta: { text: "Visit Vahue's Trust Center", url: '/demo' }, // PLACEHOLDER: no Trust Center exists yet, point at the real one
      image: { src: `${A}/shield-nobg.webp`, alt: 'Trust Center', className: 'object-contain' },
    },
  ],
  disclosure: {
    label: 'Responsible Disclosure',
    title: 'Need to report a vulnerability?',
    lead: 'Get ahold of our vulnerability disclosure team by emailing',
    email: { text: 'vulnerabilities@vahue.ai', url: 'mailto:vulnerabilities@vahue.ai' }, // PLACEHOLDER: confirm the mailbox exists
  },
  prefooter: {
    headline: "Interested in joining Vahue's Security Team?",
    cta: { text: 'Go to Careers', url: '/careers' },
    backdrop: { tailwindClass: 'white', contrastColor: '#ffffff' },
    image: { path: `${A}/prefooter.webp` },
  },
}
