// Scale's strings for /enterprise/insurance, read from the page's RSC payload on 2026-11-01.
import type { EnterpriseInsuranceContent } from './types'

const A = '/enterprise-insurance'
const L = `${A}/logos`

export const content: EnterpriseInsuranceContent = {
  meta: {
    title: 'Agentic Solutions for Insurance | Scale AI',
    description: 'Turn claims data, reports, and documents into actionable insights with AI agents that reduce claims leakage and improve insurance operations.',
  },
  hero: {
    headline: 'Turn Insurance Documents Into Intelligence',
    body: 'Deploy AI agents to transform unstructured claims data, reports, and documents into actionable insights that prevent claims leakage, reduce customer churn, and eliminate costly manual document processing.',
    cta: { text: 'Book a Meeting', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/hero.webp` },
  },
  logos: {
    copy: "Trusted by the world's most ambitious enterprises.",
    href: '/customers',
    linkText: 'Meet our customers →',
    items: [
      { alt: 'Mayo Clinic', width: 56, height: 56, src: `${L}/mayo-clinic.svg` },
      { alt: 'Cisco', width: 70, height: 37, src: `${L}/cisco.svg` },
      { alt: 'Time', width: 82, height: 25, src: `${L}/time.svg` },
      { alt: 'DLA Piper', width: 64, height: 37, src: `${L}/dla-piper.svg` },
      { alt: 'Global Atlantic Financial Group', width: 169, height: 26, src: `${L}/global-atlantic.svg` },
      { alt: 'Howard Hughes', width: 242, height: 43, src: `${L}/howard-hughes.svg` },
      { alt: 'Cengage', width: 183, height: 61, src: `${L}/cengage.svg` },
    ],
  },
  blindSpots: {
    overtitle: '',
    title: "Insurance's 3 Most Expensive Blind Spots",
    subtitle: 'Every insurer faces these same costly challenges:',
    items: [
      { icon: 'layers', title: 'Unstructured Data Chaos', subtitle: "Critical insights trapped in PDFs, reports, and invoices that aren't AI-ready and can't be analyzed at scale" },
      { icon: 'manageSearch', title: 'Hidden Benefits Waste', subtitle: 'Small fraction of cases analyzed for leakage, leaving companies to miss millions of dollars in recoverable waste patterns' },
      { icon: 'lock', title: 'Vanishing Expertise', subtitle: 'Expert knowledge disappears when adjusters leave, creating costly training gaps' },
    ],
  },
  solutions: {
    overtitle: '',
    title: 'How Smart Insurers Turn Data Chaos Into Unfair Advantage',
    subtitle: 'We directly solve the three biggest challenges facing insurance operations with purpose-built solutions that transform documents, detect waste, and preserve expertise.',
    cta: { children: 'View all applications', href: '/enterprise' },
    items: [
      { icon: 'assignment', title: 'Document Intelligence Transformation', subtitle: 'Transform messy unstructured reports and phone calls into machine-native structured data' },
      { icon: 'psychology', title: 'AI-Powered Pattern\nRecognition', subtitle: 'Scale case analysis with AI that identifies benefits waste patterns across thousands of documents simultaneously' },
      { icon: 'lightbulb', title: 'Knowledge Capture & Scaling Technology', subtitle: "Capture your best adjusters' decision-making patterns and scale that expertise across every team member and claim" },
    ],
  },
  strategy: {
    overtitle: '',
    title: 'Fuel Your AI Strategy',
    subtitle: 'Learn how we support AI Agents for Insurance',
    items: [
      {
        title: 'Scale AI Agentic Claims Processing',
        subtitle: 'Accelerate claims with AI that works alongside your team, delivering fast, accurate outcomes.',
        image: { src: `${A}/claims.webp`, alt: 'Scale AI Agentic Claims Processing' },
        videoLink: 'https://scaleai.wistia.com/medias/wf2b29soei',
      },
      {
        title: 'Scale AI Autonomous Customer Retention',
        subtitle: 'Stop customer churn before it happens with AI agents that predict issues and act proactively, not reactively.',
        image: { src: `${A}/customer-retention.webp`, alt: 'Scale AI Autonomous Customer Retention' },
        videoLink: 'https://scaleai.wistia.com/medias/i8wx19bwut',
      },
    ],
  },
  prefooter: {
    headline: 'The future of insurance starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
