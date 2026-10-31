// Content model for the scale.com/enterprise layout, plus the clone's own data (Scale's copy, so QA lines up).
//
// Every section component takes its slice of `EnterpriseContent` as props, so Vahue pages built on this layout
// (/operations, /industries/banking|retail|distribution-manufacturing) pass their own content and media.
// Media fields are optional: leave `image`/`video` out and pass a `media` ReactNode (own SVG / three.js visual /
// dot-texture panel) to the section instead. Leave a whole slice out of `EnterpriseContent` to drop that section.

export type Link = { text: string; href: string }

export type HeroNode = { label: string; color: string; image?: string; href?: string }
export type HeroContent = {
  headline: string
  body: string
  cta: Link
  /** "Scroll to explore" label next to the arrow box (desktop only). */
  scroll: string
  /** Exactly 7 nodes, in Scale's graph order (positions/edges are fixed by the layout). */
  nodes: HeroNode[]
  /** CTA style: Scale's evergreen pill (default) or the white pill with the black arrow box (dark pages). */
  ctaTheme?: 'evergreen' | 'white'
}

export type PullApartItem = { headline: string; subheading: string }
export type PullApartContent = {
  /** Two blocks: [0] sits top (shown while the object is whole), [1] bottom (shown once it pulls apart). */
  items: [PullApartItem, PullApartItem]
  /** JSON of curve paths for the pulled-apart object (see pullApartScene.ts). */
  curvesUrl: string
  /** Optional footage inside the scene's card (Scale's is a licensed iStock clip, not shipped). */
  cardVideo?: string
  /** Optional mark image drawn on the card (its alpha is used). Default: a neutral chevron. */
  cardMark?: string
}

export type LogoItem = { name: string; src?: string; width?: number }
export type BridgeContent = {
  headline: string
  body: string
  trustedBy: string
  /** Transparent (alpha) webm shown left of the copy. Omit and pass `media` to <Bridge> instead. */
  video?: string
  /** Logo marquee. Items without `src` render as neutral placeholder tiles of `width` px. */
  logos: LogoItem[]
  /** Render the marquee items' names as text instead of placeholder tiles (for items without `src`). */
  textLogos?: boolean
}

export type BlogPost = { category: string; swatch: string; title: string; href: string; image?: string; background?: string }
export type BlogContent = { heading: string; posts: BlogPost[] }

export type LogoCloudContent = {
  headline: string
  tiles?: number
  /** Optional text drawn on the sphere tiles (one tile per label; overrides `tiles`). */
  labels?: string[]
}

export type StatIcon = 'clock' | 'trend' | 'bank' | 'swap' | 'rocket'
export type StatCard = { label: string; value: string; body: string; icon: StatIcon }
export type StatsContent = { heading: string; cards: StatCard[] }

export type Testimonial = { name: string; title: string; quote: string }
export type TestimonialsContent = {
  heading: string
  items: Testimonial[]
  /** Show the text without quotation marks (a stated case result, not a quote). */
  plain?: boolean
  /** Write each item's `name` in its tab tile instead of the neutral logo placeholder bar. */
  textLogos?: boolean
  /**
   * Below lg the quotes stack in one grid cell, so the longest quote sets the panel height. Reserve this many
   * 28px lines there so shorter content keeps the clone's panel height (Scale's longest quote is 13 lines at 390).
   */
  mobileQuoteLines?: number
}

export type RaceContent = { heading: string; lead: string; link: Link; body: string; video?: string }

export type PillarIcon = 'people' | 'hub' | 'search'
export type PillarsContent = {
  heading: [string, string]
  video?: string
  items: { title: string; body: string; color: string; icon: PillarIcon }[]
}

export type PoweredByContent = {
  headline: string
  body: string
  cta: Link
  image?: string
  cardIcon?: string
  cards: { title: string; body: string }[]
}

export type TrustedCard = { title: string; body: string; icon?: string; fill: string; cta?: Link }
export type TrustedContent = {
  heading: string
  image?: string
  overlay: string
  trustedBy: string
  /** Agency logos in the glass card; items without `src` render as placeholder tiles. Empty: no logo column. */
  logos: LogoItem[]
  /** Write the names of logos without `src` in their tiles instead of placeholder bars. */
  textLogos?: boolean
  cards: TrustedCard[]
}

export type PrefooterContent = { headline: string; body?: string; cta: Link; secondary?: Link; image?: string }

export type EnterpriseContent = {
  hero?: HeroContent
  pullApart?: PullApartContent
  bridge?: BridgeContent
  blog?: BlogContent
  logoCloud?: LogoCloudContent
  stats?: StatsContent
  testimonials?: TestimonialsContent
  race?: RaceContent
  pillars?: PillarsContent
  poweredBy?: PoweredByContent
  trusted?: TrustedContent
  prefooter?: PrefooterContent
}

/* ------------------------------------------------------------------------------------------------------------ */
/* Clone data: scale.com/enterprise copy (captured 2026-10-31). Links point nowhere inside the clone.           */
/* ------------------------------------------------------------------------------------------------------------ */

const A = '/scale-clone/enterprise'

// Logo widths at 28px height from Scale's marquee (customer logos are not shipped: placeholder tiles).
const BRIDGE_LOGOS: LogoItem[] = [57, 26, 26, 70, 26, 70].map((width, i) => ({ name: `Customer ${i + 1}`, width }))

export const enterpriseContent: EnterpriseContent = {
  hero: {
    headline: 'Reliable AI for the decisions your business runs on.',
    body: 'Enterprises trust Scale to build, deploy and operate AI systems that perform in production.',
    cta: { text: 'Schedule a consult', href: '#' },
    scroll: 'Scroll to explore',
    nodes: [
      { label: 'Energy', image: `${A}/hero-energy.jpg`, color: 'rgb(167, 137, 85)' },
      { label: 'Infrastructure', image: `${A}/hero-infrastructure.jpg`, color: 'rgb(163, 119, 87)' },
      { label: 'Insurance', image: `${A}/hero-insurance.jpg`, color: 'rgb(84, 140, 164)' },
      { label: 'Health', image: `${A}/hero-health.jpg`, color: 'rgb(84, 132, 153)' },
      { label: 'Consumer', image: `${A}/hero-consumer.jpg`, color: 'rgb(159, 111, 85)' },
      { label: 'Retail', image: `${A}/hero-retail.jpg`, color: 'rgb(158, 107, 95)' },
      { label: 'Life Science', image: `${A}/hero-life-science.jpg`, color: 'rgb(145, 127, 111)' },
    ],
  },
  pullApart: {
    curvesUrl: `${A}/pull-apart-curves.json`,
    items: [
      { headline: 'Most AI initiatives never make it past pilot.', subheading: 'Models are powerful, but turning them into reliable systems is the challenge.' },
      {
        headline: 'We turn models into reliable systems',
        subheading: 'From rebuilding infrastructure to redesigning workflows, we connect your operation with solutions that transform.',
      },
    ],
  },
  bridge: {
    headline: 'Scale bridges the gap between AI models & business outcomes',
    body: 'By connecting your data and models with tangible human feedback, we create workflows into systems that continuously improve over time.',
    trustedBy: 'Trusted by',
    video: `${A}/bridge-stack.webm`,
    logos: BRIDGE_LOGOS,
  },
  blog: {
    heading: 'Your experts, amplified. Your limits, redefined.',
    posts: [
      { category: 'Research', swatch: 'rgb(39, 50, 82)', title: 'Beyond "Out-of-the-Box": Why Enterprises Need Specialized RL Agents', image: `${A}/blog-1.jpg`, href: '#' },
      {
        category: 'Company',
        swatch: 'rgb(82, 82, 82)',
        title: "How Morgan Stanley deploys AI that actually works (hint: it's evals) | Human in the Loop: Episode 13",
        image: `${A}/blog-2.jpg`,
        href: '#',
      },
      { category: 'Enterprise', swatch: 'rgb(82, 82, 82)', title: 'Turn Insurance Documents Into Intelligence', image: `${A}/blog-3.jpg`, href: '#' },
      { category: 'Healthcare', swatch: 'rgb(82, 82, 82)', title: 'Reliable AI for the Future of Healthcare', image: `${A}/blog-4.jpg`, href: '#' },
    ],
  },
  logoCloud: { headline: "Trusted by the world's most ambitious enterprises.", tiles: 10 },
  stats: {
    heading: 'Real customers, real results.',
    cards: [
      { label: 'Time Saved', value: '93%', body: 'faster contract reviews for legal clients (15 hours > 1 hour)', icon: 'clock' },
      { label: 'Revenue', value: '$64M+', body: 'revenue growth after implementing Gen AI recommendations.', icon: 'trend' },
      { label: 'Accuracy', value: '100%', body: 'source-cited, regulator-defensive audit-trail.', icon: 'bank' },
      { label: 'Adoption', value: '36,000+', body: 'customer retention within 3 months of rollout.', icon: 'swap' },
      { label: 'Delivery Speed', value: '6 weeks', body: 'production timeline to implement Scale AI in your system.', icon: 'rocket' },
    ],
  },
  testimonials: {
    heading: "Don't just\ntake our word\nfor it",
    items: [
      {
        name: 'Jessica Sibley',
        title: 'CEO, Time',
        quote:
          "We have a lot more to do. We have an exciting roadmap ahead that we will be announcing shortly, and we're going to continue to be partnering with Scale AI, and I'm really excited about that.",
      },
      {
        name: 'Padma Elmgart',
        title: 'CTO, Global Atlantic Financial Group',
        quote:
          'We wanted to not just stand up a demo or POC, but deploy production-ready use cases and infrastructure. With Scale GenAI Platform, we were able to quickly launch our first use case: a GenAI solution that makes it easy for users across Global Atlantic to get information out of our Enterprise Data Hub. This is enabling data-driven decision making and shortening the time to insights from days or weeks down to seconds.',
      },
      {
        name: 'Carlos Olea',
        title: 'CFO, Howard Hughes',
        quote:
          'Scale AI is really the backbone of our AI success. It\'s critical and I\'m excited to keep building forward that relationship and delivering more for Howard Hughes." - Carlos Olea, CFO, Howard Hughes.',
      },
    ],
  },
  race: {
    heading: 'The race is on.',
    lead: 'Everyone is using AI. But only Scale makes it uniquely yours.',
    link: { text: 'Learn More', href: '#' },
    body: 'Most AI gets smarter for everyone. Dialect learns from your experts every day, turning their judgment into a compounding advantage that grows more powerful, and more uniquely yours, over time.',
    video: `${A}/race.mp4`,
  },
  pillars: {
    heading: ['Three Pillars.', 'One Unfair Advantage.'],
    video: `${A}/pillars.mp4`,
    items: [
      {
        title: 'Integrated experts',
        body: 'We embed directly in your organization to help you identify the right use cases and build them correctly from your office, not ours.',
        color: 'rgb(168, 146, 124)',
        icon: 'people',
      },
      {
        title: 'Technology',
        body: 'Our platform and internal tooling are built to move fast, ready to stand up in your environment within a day of a demo.',
        color: 'rgb(131, 156, 178)',
        icon: 'hub',
      },
      {
        title: 'Applied AI Research',
        body: "Our frontier research team isn't just following the technology, they're building and evaluating it alongside the labs that make it.",
        color: 'rgb(25, 58, 41)',
        icon: 'search',
      },
    ],
  },
  poweredBy: {
    headline: 'Powered by the Scale Generative AI Platform',
    body: 'Agentic solutions are built and deployed on Scale’s platform, enabling the full lifecycle of AI systems – from development to real-world operation.',
    cta: { text: 'Learn More', href: '#' },
    image: `${A}/powered-by-platform.png`,
    cardIcon: `${A}/icon-powered-card.svg`,
    cards: [
      { title: 'Build & Improve AI Systems', body: 'Create, evaluate, and refine AI systems with the data, feedback, and workflows needed to make them reliable.' },
      { title: 'Deploy & run in production', body: 'Integrate AI into your business workflows and operate it reliably—with the controls needed to scale safely.' },
    ],
  },
  trusted: {
    heading: 'Built to Be Trusted.',
    image: `${A}/trusted-panel.jpg`,
    overlay:
      'Trusted by government and defense operations, Scale delivers AI systems that meet the highest standards for security, oversight, and operational reliability.',
    trustedBy: 'Trusted by',
    logos: [{ name: 'Agency 1' }, { name: 'Agency 2' }, { name: 'Agency 3' }],
    cards: [
      {
        title: 'Security & Compliance',
        body: 'Enterprise-grade security with strict data controls, privacy safeguards, and compliance with industry standards.',
        icon: `${A}/icon-security.svg`,
        fill: 'rgb(131, 156, 178)',
        cta: { text: 'Learn more', href: '#' },
      },
      {
        title: 'Reliable Agentic Execution',
        body: 'Scale gives autonomous agents a framework to execute complex, multi-step operations across your enterprise.',
        icon: `${A}/icon-agentic.svg`,
        fill: 'rgb(168, 146, 124)',
      },
      {
        title: 'Model Agnostic Flexibility',
        body: 'The right model for every use case. Our stack integrates seamlessly with any frontier model or custom open-source.',
        icon: `${A}/icon-model.svg`,
        fill: 'rgb(121, 100, 140)',
        cta: { text: 'Learn more', href: '#' },
      },
    ],
  },
  prefooter: {
    headline: 'When it has to work, it starts with Scale.',
    cta: { text: 'Speak with An Expert', href: '#' },
    image: `${A}/prefooter.jpg`,
  },
}
