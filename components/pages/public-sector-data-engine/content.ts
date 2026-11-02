// Copy for /public-sector-data-engine (Sales and Booking Agents, research segment 2). AJTBD copy in Scale's sections: same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import { fitProofLogo } from '@/components/site/proofLogos'
import type { PublicSectorContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const DIR = '/public-sector-data-engine'

export const content: PublicSectorContent = {
  meta: {
    title: 'Sales and Booking Agents | Vahue',
    description: "Vahue's Sales and Booking Agents answer, qualify, quote and book every enquiry while intent is live, then write the result back to your CRM, measured against your baseline from day one.",
  },
  hero: {
    headline: 'Sales and Booking Agents',
    body: 'Every enquiry answered, qualified, quoted and booked while intent is live, for sales and booking teams running at maximum capacity.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/hero-revenue.webp` },
    backdrop: WHITE,
  },
  logos: {
    copy: "Trusted by the world's most ambitious teams.", // PLACEHOLDER
    link: { title: 'Meet our customers', href: '/enterprise' },
    items: [
      fitProofLogo('ica', 60, 30), // FROM OLD SITE: confirm
      fitProofLogo('qonto', 113, 30), // FROM OLD SITE: confirm
      fitProofLogo('inspera', 70, 36), // FROM OLD SITE: confirm
      fitProofLogo('wisestamp', 120, 31), // FROM OLD SITE: confirm
      fitProofLogo('winningtemp', 120, 28), // FROM OLD SITE: confirm
    ],
  },
  overview: {
    overtitle: 'SERVICE OVERVIEW',
    title: 'Sales and Booking Agents',
    subtitle: 'We run your enquiry desk with agents, measured against your baseline from day one, so missed calls stop costing you bookings.',
    items: [
      { icon: 'monitor', title: 'Answer and Book', subtitle: 'Answer calls, forms, chat, email and more in seconds, after hours included. Voice and chat agents check the schedule and book the job, backed by a team of sales operations experts.' },
      { icon: 'sparkle', title: 'Qualify and Quote', subtitle: 'Agents ask your scoping questions, check your rules and availability, and prepare the quote. Every result is written back to your CRM, and only qualified leads reach the sales team.' },
      { icon: 'trend', title: 'Prove and Measure', subtitle: 'Compare agent calls to what your best reps did on your own past enquiries. Measure response time, booking rate and cost per booked job against your baseline. Pinpoint weaknesses call by call.' },
    ],
  },
  why: {
    overtitle: 'Why Vahue',
    title: 'Agent Performance is Critical When Every Call is a Booking',
    subtitle: "We've all hung up on a robotic voice. Speed, correct quotes and clean handoffs come from tuning on your real calls, powered by advanced AI software and sales operations experts.",
    items: [
      { title: 'Advanced AI Software', description: 'One system for the whole chain: understand intent, find the right context, apply your rules, book or ask a person, update the CRM and report. It runs inside the tools you already use.' },
      { title: 'State-of-the-Art Machine Learning', description: 'Tune on real call transcripts until the voice stops sounding like a robot. Proper guardrails hold every quote to your price rules, so the agent never hallucinates a price.' },
      { title: 'Human-in-the-Loop Expertise', description: 'Sales operations experts listen back to calls, tune scripts and handle quality assurance. Discounts, complaints and big deals go to a person with the full context.' },
    ],
    image: { src: `${DIR}/why-revenue.webp`, alt: 'Advanced AI software, state-of-the-art machine learning and human-in-the-loop expertise feed each other in a loop', width: 662, height: 592 },
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: WHITE,
    items: [
      {
        nameTile: true,
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial:
          "Missed calls and after-hours enquiries used to cost us bookings. Vahue put a voice agent on every call and writes each result back to our CRM, and only qualified leads now reach our sales desk. Our booking rate has improved more in the 3 months working with Vahue than in the last 15 months.", // PLACEHOLDER
      },
    ],
  },
  demos: {
    overtitle: 'Demos',
    title: 'Sales and Booking Agents Demos',
    videos: [
      { src: `${DIR}/demo-1.mp4`, title: 'Enquiry Answers from Your CRM', cover: `${DIR}/poster-revenue-1.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-2.mp4`, title: 'Lead Qualification and Agent Accuracy Review', cover: `${DIR}/poster-revenue-2.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-3.mp4`, title: 'Accelerate Quotes with Prefilled Data', cover: `${DIR}/poster-revenue-3.webp`, description: '' }, // PLACEHOLDER
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Our Work',
    items: [
      { id: 'property-manager-bookings', overtitle: 'Blog', title: 'Vahue chosen by a Property Manager for Its After-hours Bookings', image: { src: `${DIR}/resource-1.webp` }, link: '/blog' }, // PLACEHOLDER
      { id: 'booking-desk-coverage', overtitle: 'Blog', title: 'Booking Desk Coverage Across the Whole Region', image: { src: `${DIR}/resource-2.webp` }, link: '/blog' }, // PLACEHOLDER
      { id: 'automation-table-stakes', overtitle: 'Blog', title: "Automation Table Stakes: Your Sales Team's Data Layer", image: { src: `${DIR}/resource-3.webp` }, link: '/blog' }, // PLACEHOLDER
      { id: 'pricing-guardrails', overtitle: 'Blog', title: 'Pricing Guardrails for Sales Agents', image: { src: `${DIR}/resource-4.webp` }, link: '/blog' }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'See it work on your own cases before it goes live.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/prefooter.webp` },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
  },
}
