// Copy for /enterprise/insurance ("Insurance" in the menu). Keep first: Scale's string stays unless it is false for Vahue,
// brand words swap, and the rest changes by a few words. Same shape and counts as content.scale.ts. PLACEHOLDER lines are for Mike.
import type { EnterpriseInsuranceContent } from './types'

const A = '/enterprise-insurance'

export const content: EnterpriseInsuranceContent = {
  meta: {
    title: 'Agentic Solutions for Insurance | Vahue',
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
    copy: "Trusted by the world's most ambitious enterprises.", // PLACEHOLDER
    href: '/enterprise',
    linkText: 'Meet our customers →',
    // Tiles at the boxes Scale's logos render at.
    items: [
      { alt: 'Logo', width: 56, height: 56 }, // PLACEHOLDER
      { alt: 'Logo', width: 70, height: 36.8 }, // PLACEHOLDER
      { alt: 'Logo', width: 82, height: 25.5 }, // PLACEHOLDER
      { alt: 'Logo', width: 64, height: 37 }, // PLACEHOLDER
      { alt: 'Logo', width: 169, height: 26 }, // PLACEHOLDER
      { alt: 'Logo', width: 242, height: 43 }, // PLACEHOLDER
      { alt: 'Logo', width: 183, height: 62.7 }, // PLACEHOLDER
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
      { icon: 'psychology', title: 'AI-Powered Pattern\nRecognition', subtitle: 'Expand case analysis with AI that identifies benefits waste patterns across thousands of documents simultaneously' },
      { icon: 'lightbulb', title: 'Knowledge Capture & Scaling Technology', subtitle: "Capture your best adjusters' decision-making patterns and scale that expertise across every team member and claim" },
    ],
  },
  strategy: {
    overtitle: '',
    title: 'Fuel Your AI Strategy',
    subtitle: 'Learn how we run AI Agents for Insurance',
    items: [
      {
        title: 'Vahue AI Agentic Claims Processing',
        subtitle: 'Accelerate claims with AI that works alongside your team, delivering fast, accurate outcomes.',
        image: { src: `${A}/claims.webp`, alt: 'Vahue AI Agentic Claims Processing' },
        videoLink: `${A}/claims-filled.mp4`, // PLACEHOLDER
      },
      {
        title: 'Vahue AI Autonomous Customer Retention',
        subtitle: 'Stop customer churn before it happens with AI agents that predict issues and act proactively, not reactively.',
        image: { src: `${A}/customer-retention.webp`, alt: 'Vahue AI Autonomous Customer Retention' },
        videoLink: `${A}/customer-retention-filled.mp4`, // PLACEHOLDER
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
