// Scale's copy under the 80% rule for /public-sector-data-engine ("For Government" in the menu). Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { PublicSectorContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const DIR = '/public-sector-data-engine'

export const content: PublicSectorContent = {
  meta: {
    title: 'Public Sector Agents | Vahue',
    description: "Vahue's Public Sector Agents improve reliable AI systems for critical public services by providing high-quality data through expert labeling and best-in-class tooling.",
  },
  hero: {
    headline: 'Public Sector Agents',
    body: 'Powering Reliable AI for Federal, State, and Civilian Agencies.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/hero.webp` },
    backdrop: WHITE,
  },
  logos: {
    copy: "Trusted by the world's most ambitious teams.", // PLACEHOLDER
    link: { title: 'Meet our customers', href: '/public-sector' },
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
    title: 'Public Sector Agents',
    subtitle: 'Enhance AI agent performance and reliability with industry-leading data annotations.',
    items: [
      { icon: 'monitor', title: 'Data Annotation', subtitle: 'Annotate diverse data types from text, video, geospatial, image and more. Quickly turnaround high-quality data with AI-assisted annotation tools and a team of subject matter experts.' },
      { icon: 'sparkle', title: 'Data Curation', subtitle: 'Get unparalleled visibility into your data. Explore datasets through natural language search. Prioritize slices of data to annotate and address agent vulnerabilities.' },
      { icon: 'trend', title: 'Agent Evaluation', subtitle: 'Compare agent predictions to ground-truth data. Measure agent performance over time. Pinpoint agent weaknesses at granular case classifications.' },
    ],
  },
  why: {
    overtitle: 'Why Vahue',
    title: 'Agent Performance is Critical for Public Institutions',
    subtitle: 'Agent precision and accuracy are achieved with high-quality data powered by advanced AI software and subject matter experts.',
    items: [
      { title: 'Advanced AI Software', description: 'A unified platform for end-to-end agent ops. Process and calibrate data, conduct benchmark testing and error-analysis, uncover edge cases, and audit data annotations.' },
      { title: 'State-of-the-Art Machine Learning', description: 'Leverage machine learning strategies to accelerate and strategically approach data annotation. Curate diverse multimodal datasets, predict errors, and conduct uncertainty sampling.' },
      { title: 'Human-in-the-Loop Expertise', description: 'Leverage subject matter experts with decades of experience and domain depth for quality assurance, red-teaming, and continuous iteration of annotation strategies.' },
    ],
    image: { src: `${DIR}/why.webp`, alt: 'Governed agent software, baseline-first workflow delivery and human-in-the-loop review feed each other in a loop', width: 662, height: 592 },
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
          "Vahue has accelerated the improvement of our AI agent's accuracy by providing a comprehensive data infrastructure component in addition to bringing cutting edge private sector technology to our team. Our agent's accuracy has improved more in the 3 months working with Vahue than in the last 15 months.", // PLACEHOLDER
      },
    ],
  },
  demos: {
    overtitle: 'Demos',
    title: 'Public Sector Agents Demos',
    videos: [
      { src: `${DIR}/demo-1.mp4`, title: 'Data Exploration with Context Engine', cover: `${DIR}/poster-1.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-2.mp4`, title: 'Document Detection and Agent Evaluation', cover: `${DIR}/poster-2.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-3.mp4`, title: 'Accelerate Annotations with Prelabel', cover: `${DIR}/poster-3.webp`, description: '' }, // PLACEHOLDER
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Our Work',
    items: [
      { id: 'state-agency-intake', overtitle: 'Blog', title: 'Vahue chosen by a State Agency for Its Permit Intake Program', image: { src: `${DIR}/resource-1.webp` }, link: '/blog' }, // PLACEHOLDER
      { id: 'agency-contract', overtitle: 'Blog', title: 'Agency Contract Across the Whole State', image: { src: `${DIR}/resource-2.webp` }, link: '/blog' }, // PLACEHOLDER
      { id: 'automation-table-stakes', overtitle: 'Blog', title: "Automation Table Stakes: Your Agency's Data Layer", image: { src: `${DIR}/resource-3.webp` }, link: '/blog' }, // PLACEHOLDER
      { id: 'public-sector-commitments', overtitle: 'Blog', title: 'Public Sector Voluntary Commitments', image: { src: `${DIR}/resource-4.webp` }, link: '/blog' }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/prefooter.webp` },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
  },
}
