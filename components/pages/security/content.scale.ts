// Scale's original strings for https://scale.com/security: page payload (RSC) and modules 307270 and 156373.
import type { SecurityContent } from './types'

const A = '/security'
const TRUST = { text: "Scale's Trust Center.", url: 'https://trust.scale.com/' }
const LEAD = 'Please find the most recent report in'

export const content: SecurityContent = {
  meta: {
    title: 'Security at Scale.com | Scale AI',
    description: 'At Scale, our customers trust us to develop reliable systems for their most important applications.',
  },
  hero: {
    headline: 'Security at Scale',
    body: 'At Scale, our customers trust us to develop reliable systems for their most important applications. This trust is our driving principle — we embed security into our platform at every level.',
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/hero.webp` },
  },
  commitment: {
    overtitle: 'Our Commitment',
    title: 'Security built into every layer',
    items: [
      { key: 'commitment-1', icon: 'lock', color: '#79648C', title: "Protect Our Customers' Data.", description: "We are dedicated to safeguarding the data and integrity of our customers' critical work. Our security program is designed to protect customer assets and proactively reduce the frequency of negative security events." },
      { key: 'commitment-2', icon: 'shield', color: '#A8927C', title: 'Secure Our Foundation.', description: 'We treat security as foundational, integrating it deeply into our company culture and product development lifecycle.' },
      { key: 'commitment-3', icon: 'public', color: '#839CB2', title: 'Protect our Shared Future.', description: 'As leaders in AI, we believe our responsibility extends to the entire field. That is why we actively partner with government, industry, and the research community to define and elevate standards for secure and responsible AI.' },
    ],
  },
  compliance: {
    overtitle: 'Compliance',
    title: 'Certifications and Compliance',
    subtitle: "Learn about Scale's certifications, frameworks, and compliance programs. To access Scale AI's latest security compliance certifications and reports, please visit our Trust Center.",
    items: [
      {
        key: 'tab1',
        logo: { src: `${A}/soc2-type-ii.png`, alt: 'SOC 2 Type II', invert: false },
        title: 'SOC 2 Type II',
        body: 'SOC stands for the Service Organization Controls created by the American Institute of Certified Public Accounts ("AICPA"). Scale has a SOC 2 Type 2 report demonstrating its commitment to protecting customer data through security, availability, and confidentiality controls that align with the AICPA Trust Services Criteria.',
        reportLead: LEAD,
        reportLink: TRUST,
      },
      {
        key: 'tab2',
        logo: { src: `${A}/iso-27001.png`, alt: 'ISO 27001', invert: true },
        title: 'ISO 27001',
        body: 'The International Organization for Standardization (ISO) is an independent, global entity that brings experts together to create and maintain various management system standards. Scale has certified its product and services against ISO/IEC 27001:2022 and makes its ISO certificate available for download.',
        reportLead: LEAD,
        reportLink: TRUST,
      },
      {
        key: 'tab3',
        logo: { src: `${A}/logo-disa.png`, alt: 'Defense Information Systems Agency (DISA)', invert: true },
        title: 'DoD IL4 Provisional Authorization',
        body: 'The DoD IL4 Provisional Authorization is issued by the Defense Information Systems Agency (DISA) and provides assurance that a cloud service meets the rigorous requirements defined in the DoD Cloud Computing Security Requirements Guide (SRG).',
        reportLead: LEAD,
        reportLink: TRUST,
      },
      {
        key: 'tab4',
        logo: { src: `${A}/logo-fedramp.png`, alt: 'FedRAMP', invert: false },
        title: 'FedRAMP High Authorized',
        body: 'FedRAMP stands for the Federal Risk and Authorization Management Program. It is a United States government-wide program that provides a standardized approach to security assessment, authorization, and continuous monitoring for all Cloud Products and Services (CPS) used by federal agencies.',
        reportLead: LEAD,
        reportLink: TRUST,
      },
    ],
  },
  cards: [
    {
      label: 'Public Sector',
      title: 'Scale for Public Sector',
      body: 'Scale powers key computer vision and agentic GenAI programs across various Public Sector partners.',
      cta: { text: 'Learn more', url: '/public-sector' },
      image: { src: `${A}/capitol.webp`, alt: 'US Capitol Building', className: 'object-cover object-top' },
    },
    {
      label: 'Trust Center',
      title: 'Learn about how we protect ourselves and our customers',
      body: 'Scale powers key computer vision and agentic GenAI programs across the Department of Defense, Intelligence Community, and Federal Civilian agencies.',
      cta: { text: "Visit Scale's Trust Center", url: 'https://trust.scale.com/' },
      image: { src: `${A}/shield-nobg.webp`, alt: 'Trust Center', className: 'object-contain' },
    },
  ],
  disclosure: {
    label: 'Responsible Disclosure',
    title: 'Need to report a vulnerability?',
    lead: 'Get ahold of our vulnerability disclosure team by emailing',
    email: { text: 'vulnerabilities@scale.com', url: 'mailto:vulnerabilities@scale.com' },
  },
  prefooter: {
    headline: "Interested in joining Scale's Security Team?",
    cta: { text: 'Go to Careers', url: '/careers' },
    backdrop: { tailwindClass: 'white', contrastColor: '#ffffff' },
    image: { path: `${A}/prefooter.webp` },
  },
}
