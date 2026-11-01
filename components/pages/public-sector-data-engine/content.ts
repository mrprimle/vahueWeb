// Scale's copy under the 80% rule for /public-sector-data-engine ("For Revenue Teams" in the menu, research segment 2). Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { PublicSectorContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const DIR = '/public-sector-data-engine'

export const content: PublicSectorContent = {
  meta: {
    title: 'Revenue Team Agents | Vahue',
    description: "Vahue's Revenue Team Agents answer, qualify, quote and book every enquiry while intent is live, with clean handoffs to your team and best-in-class CRM write-back.",
  },
  hero: {
    headline: 'Revenue Team Agents',
    body: 'Powering Reliable AI for Sales, Support, and Booking Teams.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/hero-revenue.webp` },
    backdrop: WHITE,
  },
  logos: {
    copy: "Trusted by the world's most ambitious teams.", // PLACEHOLDER
    link: { title: 'Meet our customers', href: '/enterprise' },
    items: [
      { alt: 'Logo', width: 48, height: 63 }, // PLACEHOLDER
      { alt: 'Logo', width: 113, height: 30 }, // PLACEHOLDER
      { alt: 'Logo', width: 65, height: 51 }, // PLACEHOLDER
      { alt: 'Logo', width: 140, height: 31 }, // PLACEHOLDER
      { alt: 'Logo', width: 182, height: 20 }, // PLACEHOLDER
    ],
  },
  overview: {
    overtitle: 'PRODUCT OVERVIEW',
    title: 'Revenue Team Agents',
    subtitle: 'Answer every enquiry and never lose live buying intent to a busy or closed desk.',
    items: [
      { icon: 'monitor', title: 'Lead Capture', subtitle: 'Capture enquiries from calls, forms, chat, email and more. Quickly answer every lead with AI-assisted voice and chat agents and a team of sales operations experts.' },
      { icon: 'sparkle', title: 'Lead Qualification', subtitle: 'Get unparalleled visibility into your pipeline. Explore enquiries through natural language search. Prioritize high-intent leads so only qualified ones reach your sales team.' },
      { icon: 'trend', title: 'Agent Evaluation', subtitle: 'Compare agent answers to your best reps and past calls. Measure agent performance over time. Pinpoint agent weaknesses at granular call and enquiry levels.' },
    ],
  },
  why: {
    overtitle: 'Why Vahue',
    title: 'Agent Performance is Critical for Revenue Teams',
    subtitle: 'Agent speed and accuracy are achieved with clean CRM data powered by advanced AI software and sales operations experts.',
    items: [
      { title: 'Advanced AI Software', description: 'A unified platform for end-to-end agent ops. Route enquiries and calibrate scripts, conduct benchmark testing and error-analysis, uncover edge cases, and audit CRM write-backs.' },
      { title: 'State-of-the-Art Machine Learning', description: 'Leverage machine learning strategies to accelerate and strategically approach lead qualification. Tune on real call transcripts, predict drop-offs, and hold quotes to your price rules.' },
      { title: 'Human-in-the-Loop Expertise', description: 'Leverage sales operations experts with decades of experience and domain depth for quality assurance, call reviews, and clean handoffs whenever a deal needs a person.' },
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
          "Vahue has accelerated how our revenue team answers enquiries by providing a voice agent on top of our CRM in addition to bringing clean handoffs and CRM write-back to our sales desk. Our booking rate has improved more in the 3 months working with Vahue than in the last 15 months.", // PLACEHOLDER
      },
    ],
  },
  demos: {
    overtitle: 'Demos',
    title: 'Revenue Team Agents Demos',
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
      { id: 'automation-table-stakes', overtitle: 'Blog', title: "Automation Table Stakes: Your Revenue Team's Data Layer", image: { src: `${DIR}/resource-3.webp` }, link: '/blog' }, // PLACEHOLDER
      { id: 'pricing-guardrails', overtitle: 'Blog', title: 'Revenue Team Pricing Guardrails', image: { src: `${DIR}/resource-4.webp` }, link: '/blog' }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/prefooter.webp` },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
  },
}
