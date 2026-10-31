import type { ReactNode } from 'react'
import { CustomAgentsMockup, OrderGuidanceMockup, SchedulingMockup } from './Mockups'
import HealthcareIllustration from './HealthcareIllustration'

/*
 * Content contract for the scale.com/enterprise/healthcare layout. HealthcarePage renders every section from
 * this object, so a Vahue industry page can reuse the same layout + motion by passing its own content.
 * `scaleHealthcareContent` below is Scale's own copy (read from the page's RSC payload and the mockup modules
 * in chunk 0sni47mcvnqwg.js) so the clone lines up with scale.com in side-by-side QA.
 */

export type Cta = { label: string; href: string }

/** One slot in the "Trusted by" marquee: Scale's rendered logo box (width x logo height inside a 35px row). */
export type LogoSlot = { w: number; h: number }

export type HealthcareContent = {
  hero: {
    headline: string
    body?: string
    /** Full-bleed image; when omitted the card shows `imageBg` (or `media`, if given). */
    image?: string
    imageAlt?: string
    imageBg?: string
    media?: ReactNode
    primary?: Cta
    logos?: { label: string; slots: LogoSlot[] } | null
  }
  tabs: {
    heading: string
    items: {
      label: string
      /** indicatorColor.hex */
      color: string
      title: string
      body: string
      cta?: Cta
      /** Rendered in the right-hand media frame; remounted on every tab switch so its intro replays. */
      mockup: ReactNode
    }[]
  }
  testimonial: {
    /** colorTheme.hex (backdrop + tag text) */
    color: string
    /** colorTheme.contrastColor (logo tile + tag background) */
    contrast: string
    quote: string
    metricValue: string
    metricLabel: string
    name: string
    title: string
    /** Logo inside the tab tile; a neutral placeholder tile when omitted. */
    logo?: ReactNode
  }
  stack: {
    heading: string
    media: ReactNode
    cards: { title: string; body: string }[]
  }
  blog: {
    heading: string
    category: string
    tiles: {
      title: string
      image?: string
      /** Solid fill when there is no image. */
      fill?: string
      video?: boolean
      href?: string
    }[]
  }
  trust: {
    headline: string
    body: string
    badges: { alt: string; src?: string }[]
  }
  prefooter: {
    headline: string
    image?: string
    imageAlt?: string
    imageBg?: string
    media?: ReactNode
    primary?: Cta
  }
}

const ASSET = '/scale-clone/enterprise-healthcare'

export const scaleHealthcareContent: HealthcareContent = {
  hero: {
    headline: 'Reliable AI for Healthcare’s Most Critical Decisions',
    body: 'Scale builds AI that clinicians can trust, embedded inside your workflows and evaluated continuously so it stays accountable for outcomes.',
    image: `${ASSET}/hero.webp`,
    imageAlt: 'Clinician reviewing X-ray and CT scans on a light board',
    imageBg: '#537B95',
    // Cengage, Cisco, DLA Piper, Global Atlantic, Howard Hughes, Mayo Clinic, Shore Capital, TIME: customer
    // logos are not shipped, so the marquee renders neutral tiles at the rendered logo sizes.
    logos: {
      label: 'Trusted By',
      slots: [
        { w: 70, h: 16 },
        { w: 47, h: 28 },
        { w: 48, h: 28 },
        { w: 70, h: 21 },
        { w: 70, h: 13 },
        { w: 26, h: 28 },
        { w: 70, h: 19 },
        { w: 57, h: 28 },
      ],
    },
  },
  tabs: {
    heading: 'AI Systems for Every Clinical Decision',
    items: [
      {
        label: 'Order Guidance',
        color: '#273252',
        title: 'Synthesize clinical history to reduce delays',
        body: "Consolidates a patient's full history to recommend the right labs, imaging, and prescriptions, so clinicians spend less time piecing together charts.",
        cta: { label: 'Book a Demo', href: '#' },
        mockup: <OrderGuidanceMockup />,
      },
      {
        label: 'Scheduling Intelligence',
        color: '#839CB2',
        title: 'Get patients to the right appointment, faster',
        body: 'Automate appointment scheduling across patient charts, clinical protocols, and operational constraints - reducing manual coordinator work.',
        cta: { label: 'Book a Demo', href: '#' },
        mockup: <SchedulingMockup />,
      },
      {
        label: 'Custom Agents & Applications',
        color: '#A8927C',
        title: 'Build to the unique needs of your healthcare organization',
        body: 'From transplant order sequencing to autonomous clinical intake, Scale builds custom agents for the workflows unique to your health system.',
        cta: { label: 'Book a Demo', href: '#' },
        mockup: <CustomAgentsMockup />,
      },
    ],
  },
  testimonial: {
    color: '#839CB2',
    contrast: '#010101',
    quote:
      '“Ultimately, this work is about helping patients by using innovation to deliver more timely, coordinated and compassionate care. Since launch, doctors are spending an average of eleven more minutes with each patient while reliably maintaining an expert standard of care for patients.”',
    metricValue: '11+',
    metricLabel: 'more minutes with every patient',
    name: 'Matthew R. Callstrom, M.D., Ph.D.',
    title: 'AI Program Medical Director, Mayo Clinic',
  },
  stack: {
    heading: 'Built on Scale’s reliability layer for healthcare',
    media: <HealthcareIllustration />,
    cards: [
      {
        title: 'Forward-deployed clinical and engineering teams',
        body: 'Applied AI engineers and clinical informaticists embedded inside your health system, accountable for outcomes, not just delivery.',
      },
      {
        title: 'Evaluations compound clinical value',
        body: "Frontier-trained evals and clinical domain experts encode institutional knowledge to continually improve every agent's accuracy and safety.",
      },
      {
        title: 'Deploy anywhere, on your terms',
        body: 'Scale connects to your existing EHR, imaging, and clinical data systems. No migration required, and it works with any model.',
      },
    ],
  },
  blog: {
    heading: 'Fuel Your AI Strategy',
    category: 'Healthcare',
    tiles: [
      { title: 'Rad Agent Multi-Agent Radiology Solution', image: `${ASSET}/tile-rad-agent.webp`, video: true },
      // Scale's thumbnail carries Scale branding: a dark fill stands in for it.
      { title: 'Scalable Infrastructure for Enterprise-Ready AI Agents', fill: 'linear-gradient(135deg, #1b2236 0%, #07080c 55%, #000 100%)', video: true },
      // Scale's cover is the Scale + Mayo Clinic logo lock-up on #1B3A2A; logos are not shipped.
      { title: 'Mayo Clinic + Scale: Reliable AI for Better Healthcare', fill: '#1B3A2A', href: '#' },
    ],
  },
  trust: {
    headline: 'Built for healthcare trust and privacy',
    body: 'Meets the security, safety, and clinical standards required for healthcare.',
    // Certification marks are third-party; the clone keeps neutral tiles in the same 4x2 grid.
    badges: [
      { alt: 'AICPA SOC 2 certified' },
      { alt: 'ISO 27001 information security certified' },
      { alt: 'ISO 42001 artificial intelligence certified' },
      { alt: 'HIPAA compliant' },
      { alt: 'GDPR compliant' },
      { alt: 'EU AI Act compliant' },
      { alt: 'CSA STAR Level One self-assessment' },
      { alt: 'FedRAMP authorized' },
    ],
  },
  prefooter: {
    headline: 'The future of healthcare starts here',
    image: `${ASSET}/prefooter.webp`,
    imageAlt: 'Patient entering an MRI scanner',
    imageBg: '#6A7C96',
    primary: { label: 'Speak with an expert', href: '#' },
  },
}
