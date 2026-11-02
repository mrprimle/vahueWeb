// Copy for /enterprise/insurance ("Insurance" in the menu), written from the AJTBD research into Scale's slots; Scale's line stays where it's already right.
// Same shape and counts as content.scale.ts. PLACEHOLDER lines are for Mike.
import type { EnterpriseInsuranceContent } from './types'

const A = '/enterprise-insurance'

export const content: EnterpriseInsuranceContent = {
  meta: {
    title: 'Agentic Solutions for Insurance | Vahue',
    description: 'Vahue runs your claims intake with AI agents, turning claims, reports, and documents into clean, checked records, measured against your baseline from day one.',
  },
  hero: {
    headline: 'Turn Insurance Documents Into Intelligence',
    body: 'We run your claims intake with AI agents, turning unstructured claims, reports, and documents into clean, checked records that clear the backlog, prevent claims leakage, and eliminate costly re-keying, measured against your baseline from day one.',
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
      { icon: 'layers', title: 'Unstructured Data Chaos', subtitle: "Critical details trapped in PDFs, reports, and invoices that staff key in by hand, and that backlog at every peak" },
      { icon: 'manageSearch', title: 'Hidden Claims Leakage', subtitle: 'Small fraction of claims analyzed for leakage, leaving companies to miss millions of dollars in recoverable waste patterns' },
      { icon: 'lock', title: 'Vanishing Expertise', subtitle: 'Expert knowledge disappears when adjusters leave, creating costly training gaps' },
    ],
  },
  solutions: {
    overtitle: '',
    title: 'How Smart Insurers Turn Data Chaos Into Unfair Advantage',
    subtitle: 'We take the three biggest challenges off your claims team with agents proven on your own past claims, so they transform documents, detect waste, and preserve expertise.',
    cta: { children: 'See Document Intake Agents', href: '/physical-ai' },
    items: [
      { icon: 'assignment', title: 'Document Intake Agents', subtitle: 'Turn first notices of loss, claims correspondence, and phone calls into clean records in your claims system', href: '/physical-ai' },
      { icon: 'psychology', title: 'Scoring and Decision Agents', subtitle: 'Expand claims review with agents that score waste patterns across thousands of documents and route borderline cases to a person', href: '/automotive' },
      { icon: 'lightbulb', title: 'Knowledge Agents', subtitle: "Capture your best adjusters' decision-making patterns and put sourced answers in front of every team member and claim", href: '/genai-portfolio' },
    ],
  },
  strategy: {
    overtitle: '',
    title: 'Fuel Your AI Strategy',
    subtitle: 'Learn how we run AI Agents for Insurance',
    items: [
      {
        title: 'Document Intake Agents for Claims',
        subtitle: 'Accelerate claims with AI that works alongside your team, delivering fast, accurate outcomes.',
        image: { src: `${A}/claims.webp`, alt: 'Document Intake Agents for Claims' },
        videoLink: `${A}/claims-filled.mp4`, // PLACEHOLDER
      },
      {
        title: 'Support and Voice Agents for Retention',
        subtitle: 'Stop customer churn before it happens with agents that answer every call, update your systems, and hand risky cases to a person.',
        image: { src: `${A}/customer-retention.webp`, alt: 'Support and Voice Agents for Retention' },
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
