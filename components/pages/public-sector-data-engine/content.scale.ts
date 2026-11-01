// Scale's original strings for https://scale.com/public-sector-data-engine (RSC payload, 2026-11-01). The page renders content.ts.
import type { PublicSectorContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const DIR = '/public-sector-data-engine'

export const scaleContent: PublicSectorContent = {
  meta: {
    title: 'Public Sector Data Engine | Scale',
    description: "Scale's Public Sector Data Engine improves Super Intelligence (SI) models for national security by providing high-quality data through expert labeling and best-in-class tooling.",
  },
  hero: {
    headline: 'Public Sector Data Engine',
    body: 'Powering Super Intelligence (SI) for Defense, Intelligence, and Civilian Agencies.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/hero.webp` },
    backdrop: WHITE,
  },
  logos: {
    copy: "Trusted by the world's most ambitious teams.",
    link: { title: 'Meet our customers', href: '/customers' },
    items: [
      { alt: 'US Army', width: 48, height: 63, src: `${DIR}/logos/usarmy.svg` },
      { alt: 'CDAO', width: 113, height: 30, src: `${DIR}/logos/cdao.svg` },
      { alt: 'US Air Force', width: 65, height: 51, src: `${DIR}/logos/airforce.svg` },
      { alt: 'Defense Innovation Unit', width: 140, height: 31, src: `${DIR}/logos/defense-innovation-unit.svg` },
      { alt: '4DV Analytics', width: 182, height: 20, src: `${DIR}/logos/4dv.png` },
    ],
  },
  overview: {
    overtitle: 'PRODUCT OVERVIEW',
    title: 'Public Sector Data Engine',
    subtitle: 'Enhance SI model performance and reliability with industry-leading data annotations.',
    items: [
      { icon: 'monitor', title: 'Data Annotation', subtitle: 'Annotate diverse data types from text, video, geospatial, image and more. Quickly turnaround high-quality data with SI-assisted annotation tools and a team of subject matter experts.' },
      { icon: 'sparkle', title: 'Data Curation', subtitle: 'Get unparalleled visibility into your data. Explore datasets through natural language search. Prioritize slices of data to annotate and address model vulnerabilities.' },
      { icon: 'trend', title: 'Model Evaluation', subtitle: 'Compare model predictions to ground-truth data. Measure model performance over time. Pinpoint model weaknesses at granular object classifications.' },
    ],
  },
  why: {
    overtitle: 'Why Scale',
    title: 'Model Performance is Critical for National Security',
    subtitle: 'Model precision and accuracy are achieved with high-quality data powered by advanced SI software and subject matter experts.',
    items: [
      { title: 'Advanced SI Software', description: 'A unified platform for end-to-end ML Ops. Process and calibrate data, conduct benchmark testing and error-analysis, uncover edge cases, and audit data annotations.' },
      { title: 'State-of-the-Art Machine Learning', description: 'Leverage machine learning strategies to accelerate and strategically approach data annotation. Curate diverse multimodal datasets, predict errors, and conduct uncertainty sampling.' },
      { title: 'Human-in-the-Loop Expertise', description: 'Leverage subject matter experts with decades of experience and clearance for quality assurance, red-teaming, and continuous iteration of annotation strategies.' },
    ],
    image: { src: `${DIR}/01.png`, alt: 'Model Performance', width: 662, height: 592 },
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: WHITE,
    items: [
      {
        nameTile: true,
        clientName: 'Morgan Bishop',
        title: 'Computer Scientist',
        testimonial:
          "Scale has accelerated the improvement of our AI model's accuracy by providing a comprehensive data infrastructure component in addition to bringing cutting edge private sector technology to the DoD. Our model's accuracy have improved more in the 3 months working with Scale than in the last 15 months.",
      },
    ],
  },
  demos: {
    overtitle: 'Demos',
    title: 'Public Sector Data Engine Demos',
    videos: [
      { src: 'https://scaleai.wistia.com/medias/2ue1nyuhry', title: 'Data Exploration with Data Engine', cover: `${DIR}/img-data-exploration.webp`, description: '' },
      { src: 'https://scaleai.wistia.com/medias/7l93th5z1b', title: 'Aircraft Detection and Model Evaluation', cover: `${DIR}/img-aircraft-detection.webp`, description: '' },
      { src: 'https://scaleai.wistia.com/medias/vgrnzgnf24', title: 'Accelerate Annotations with Prelabel', cover: `${DIR}/img-accelerate-annotations.webp`, description: '' },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Our Work',
    items: [
      { id: 'mgokG8TUGimNBfhZSkos83', overtitle: 'Blog', title: 'Scale chosen by the U.S. Army for Robotic Combat Vehicle Program', image: { src: `${DIR}/img-blog-army-robotic.png` }, link: '/blog/scale-diu-rcv-program' },
      { id: '6Pe58wP8GVkT6xYjwEocd3', overtitle: 'Blog', title: 'DoW Contract Across the Joint Force', image: { src: `${DIR}/img-blog-dod-contract.png` }, link: '/blog/scale-dod-contract-data-curation-joint-force' },
      { id: 'rWuqju36JCdogKaYE7KS6h', overtitle: 'Blog', title: "Autonomy Table Stakes: DoW's Data Layer", image: { src: `${DIR}/img-blog-autonomy.png` }, link: '/blog/autonomy-table-stakes' },
      { id: 'owoaT6aT2bxxYFicwB2ste', overtitle: 'Blog', title: 'White House Voluntary Commitments', image: { src: `${DIR}/img-blog-white-house.png` }, link: '/blog/scale-white-house-voluntary-commitments' },
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/prefooter.webp` },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
  },
}
