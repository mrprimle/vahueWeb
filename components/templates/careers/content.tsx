import type { ReactNode } from 'react'
import { SCALE_JOBS_SNAPSHOT } from './jobs'

/*
 * Content contract for the scale.com/careers layout. CareersPage renders every section from this object, so Vahue's
 * /careers can reuse the same layout + motion by passing its own content (and restyle it through the --car-* theme
 * variables, see CareersPage.tsx). `scaleCareersContent` below is Scale's own copy, read from the page's RSC payload
 * on 2026-10-31, so the clone lines up with scale.com in side-by-side QA.
 * Everything here is plain data or React elements (no functions), so a server page can pass it to the client list.
 */

export type Cta = { label: string; href: string; smoothScrollTargetId?: string }

/** One Greenhouse job. `location` is the raw board value: "; "-separated offices become one row each. */
export type CareersJob = {
  id: number | string
  title: string
  /** "External Department" metadata value, else the job's first Greenhouse department. */
  department: string
  location: string
  /** Apply → (opened in a new tab). */
  applyUrl: string
  /** Row link; defaults to `${positions.jobBaseHref}/${id}`. */
  href?: string
}

export type CareersFullBleed = {
  headline: string
  body?: string
  image?: string
  imageAlt?: string
  /** Solid fill behind the image (ResponsiveImage background-color). */
  imageBg?: string
  /** Replaces the image (e.g. a Vahue visual); it gets the same 1.25 -> 1 scroll scale. */
  media?: ReactNode
  cta?: Cta
}

export type CareersPositionsLabels = {
  search: string
  allDepartments: string
  allLocations: string
  /** "Departments" -> "Departments (2)" */
  departmentsCount: string
  locationsCount: string
  role: string
  roles: string
  department: string
  departments: string
  across: string
  expandAll: string
  collapseAll: string
  expandedOf: string
  expanded: string
  showing: string
  matching: string
  inDept: string
  inDepts: string
  location: string
  locations: string
  clearFilters: string
  noMatch: string
  noneFound: string
  apply: string
}

export type CareersContent = {
  hero: CareersFullBleed
  news: {
    overtitle: string
    title: string
    ctaLabel: string
    items: { label: string; title: string; href: string; /** card background */ bg: string }[]
  }
  mission: {
    overtitle: string
    title: string
    /** body1 lead paragraph (left column, first) */
    lead: ReactNode
    left: ReactNode[]
    right: ReactNode[]
  }
  credos: {
    overtitle: string
    title: string
    subtitle: string
    items: { title: string; body: string; /** 88px line illustration (white strokes, inverted by --car-credo-filter) */ icon?: string; iconNode?: ReactNode }[]
  }
  benefits: {
    overtitle: string
    title: string
    subtitle: string
    items: { title: string; body: string; image?: string; media?: ReactNode }[]
  }
  positions: {
    /** section id; the hero CTA smooth-scrolls here */
    id: string
    overtitle: string
    title: string
    jobs: CareersJob[]
    jobBaseHref: string
    /** location key (last comma part, e.g. "CA", "UK", "Qatar") -> flag image; unknown keys use flagFallback */
    flags: Record<string, string>
    flagFallback: string
    /** dropdown option relabels (scale.com `e9`) */
    departmentLabels?: Record<string, string>
    /**
     * scale.com passes customSelectedDepartments / customSelectedLocations = [] to FilterPosition, and its trigger
     * labels, "in N depts" summary and initial expansion read those props (`D = o || x`), so they never reflect the
     * live selection (the trigger turns dark but keeps saying "All Departments"). true reproduces that; false shows
     * the live selection.
     */
    scaleLabelQuirk?: boolean
    labels?: Partial<CareersPositionsLabels>
  }
  prefooter: CareersFullBleed
}

const ASSET = '/templates/careers'
const US = `${ASSET}/flags/united-states-of-america.svg`
const UK = `${ASSET}/flags/united-kingdom.svg`
const UAE = `${ASSET}/flags/united-arab-emirates.svg`

/** scale.com flag map (module 242648 `U`), limited to the flags this snapshot needs; unknown keys fall back to earth.svg. */
export const SCALE_FLAGS: Record<string, string> = {
  'United States': US,
  AZ: US,
  TX: US,
  CA: US,
  NY: US,
  DC: US,
  MO: US,
  WA: US,
  HI: US,
  CO: US,
  FL: US,
  MD: US,
  VA: US,
  Maryland: US,
  Massachusetts: US,
  Mexico: `${ASSET}/flags/mexico.svg`,
  MX: `${ASSET}/flags/mexico.svg`,
  Canada: `${ASSET}/flags/canada.svg`,
  'United Kingdom': UK,
  UK,
  Qatar: `${ASSET}/flags/qatar.svg`,
  QA: `${ASSET}/flags/qatar.svg`,
  'Saudi Arabia': `${ASSET}/flags/saudi-arabia.svg`,
  UAE,
  AE: UAE,
  'United Arab Emirates': UAE,
  'Middle East': UAE,
  India: `${ASSET}/flags/india.svg`,
  IN: `${ASSET}/flags/india.svg`,
}

const missionLink = (href: string, label: string) => (
  <a href={href} className="underline transition-colors hover:text-[color:var(--car-fg-2,#212121)] focus-visible:[outline:revert]">
    {label}
  </a>
)

export const scaleCareersContent: CareersContent = {
  hero: {
    headline: 'Scale is growing. Grow with Us.',
    body: 'Join us as we develop reliable AI systems for the world’s most important decisions.',
    image: `${ASSET}/hero.webp`,
    imageBg: '#193A29',
    cta: { label: 'View Open Positions', href: '/careers/#open-roles', smoothScrollTargetId: 'open-roles' },
  },
  news: {
    overtitle: 'In The News',
    title: 'Scale In The News',
    ctaLabel: 'Read Article',
    items: [
      {
        label: 'Axios',
        title: "Scale AI CEO Jason Droege pushes 'reliability' reality",
        href: 'https://www.axios.com/2026/05/06/scale-ai-jason-droege-reliable-ai',
        bg: '#193A29', // bg-evergreen
      },
      {
        label: 'Semafor',
        title: "Scale's CEO says AI-related layoffs are often theater",
        href: 'https://www.semafor.com/article/04/16/2026/scale-ai-ceo-jason-droege-says-ai-related-layoffs-are-often-theater',
        bg: '#273252', // bg-atlas-blue
      },
      {
        label: 'Big Technology',
        title: 'Most AI Training Is Moving To Reinforcement Learning, Scale AI Says',
        href: 'https://www.bigtechnology.com/p/most-ai-training-is-moving-to-reinforcement',
        bg: '#212121', // bg-scale-gray-10
      },
    ],
  },
  mission: {
    overtitle: 'Why',
    title: 'Our Mission',
    lead: "At Scale, our mission is to develop reliable AI systems for the world's most important decisions.",
    left: [
      "Every industry across the private and public sectors is bringing AI to the center of operations. Yet despite this explosion of investment, there's still no clear blueprint for organizations to move from pilot to profit.",
    ],
    right: [
      'Our products for RLHF, image annotation, semantic segmentation, 3D point cloud annotation, and LiDAR and RADAR annotation are trusted by industry leaders and deliver world-class accuracy.',
      <>
        Our proprietary {missionLink('/data-engine', 'Data Engine')} powers the most advanced LLMs, generative models, and
        computer vision models with high-quality data. We then apply our experience partnering with leading AI companies building these
        models to help more organizations customize and {missionLink('/data-engine', 'Apply AI')} in their organizations.
      </>,
      'And we encode our tradecraft into the Scale GenerativeAI Platform to help organizations successfully apply AI to their most critical business and government decisions.',
    ],
  },
  credos: {
    overtitle: 'OUR CREDOS',
    title: 'Our Internal Core Values',
    subtitle:
      'Our credos provide a framework for us to make decisions and work effectively as a team, ensuring we are aligned in executing on our mission.',
    items: [
      {
        title: 'Earn Customer Love',
        body: 'We are passionate about our customers and contributors and are devoted to their success. We know that trust and confidence is earned, not given, with every interaction, every delivery, and every time we solve their problems.',
        icon: `${ASSET}/credo-earn-customer-love.svg`,
      },
      {
        title: 'Team Flow',
        body: "We work as one Scale. Ideas, energy, and support flow freely across teams because we are invested in each other's success. Optimize for the whole.",
        icon: `${ASSET}/credo-team-flow.svg`,
      },
      {
        title: 'Quality is Our Cheat Code',
        body: 'The systems that deliver quality are rare enough to be a structural advantage. When we deliver effectively and consistently, the economics change. Deals get bigger, cycles get shorter, and growth stops being incremental.',
        icon: `${ASSET}/credo-quality-fractal.svg`,
      },
      {
        title: 'Find the 20%',
        body: 'Not all hard work is equal. 80% of outcomes come from 20% of inputs. We find that 20% and execute completely, even when the work is tedious or meticulous. What we reject is effort without impact.',
        icon: `${ASSET}/credo-find-20.svg`,
      },
      {
        title: 'Write the Market',
        body: "We don't read the market. We write it. Our research puts us at the frontier before anyone else, and our job is to bring our partners there first.",
        icon: `${ASSET}/credo-write-the-market.svg`,
      },
      {
        title: 'Three Moves Ahead',
        body: 'When making decisions, consider the consequences of consequences. Plan accordingly.',
        icon: `${ASSET}/credo-three-moves-ahead.svg`,
      },
    ],
  },
  benefits: {
    overtitle: 'OUR BENEFITS',
    title: 'Supporting You To Do Your Best Work',
    subtitle: 'At Scale, we believe your talent and achievements deserve to be met with a supportive community and flexible environment.',
    items: [
      {
        title: 'Health & Wellbeing',
        body: "Our holistic approach to supporting Scaliens includes comprehensive health coverage, dental and vision insurance, mental healthcare services, and more. PTO policies and accommodating schedules ensure you'll get time off when you need it to relax and recharge. Note that our offerings may vary by region as we strive to respond to the unique needs of Scaliens around the globe.",
        image: `${ASSET}/benefit-health-wellbeing.webp`,
      },
      {
        title: 'Personal & Career Growth',
        body: 'Continuously learn and grow through annual learning & development stipend, attending leadership breakfasts, manager training, speaker series, and joining an ERG.',
        image: `${ASSET}/benefit-personal-career-growth.webp`,
      },
      {
        title: 'Building Scale Community',
        body: 'We welcome guests to our offices, and you can expect to see Scalien families and friends around. Join local happy hours, and accept invites to game nights, book clubs, and many other employee-led community events.',
        image: `${ASSET}/benefit-building-community.webp`,
      },
      {
        title: 'Parental Support',
        body: 'Balancing work and family is essential, and Scale understands the importance of having adequate leave policies in place to promote a healthy home and work life.',
        image: `${ASSET}/benefit-parental-support.webp`,
      },
    ],
  },
  positions: {
    id: 'open-roles',
    overtitle: 'Open positions',
    title: 'Help us bring human intelligence to software',
    jobs: SCALE_JOBS_SNAPSHOT,
    jobBaseHref: 'https://scale.com/careers',
    flags: SCALE_FLAGS,
    flagFallback: `${ASSET}/flags/earth.svg`,
    departmentLabels: {
      'CFO Team': 'Finance, Accounting, and Data Science & Analytics',
      EPD: 'Engineering, Product, and Design',
      GTM: 'Go-To-Market',
    },
    scaleLabelQuirk: true,
  },
  prefooter: {
    headline: 'Join University Student Careers',
    image: `${ASSET}/university-hero.webp`,
    imageBg: '#193A29',
    cta: { label: 'Explore Opportunities', href: 'https://scale.com/careers/university' },
  },
}
