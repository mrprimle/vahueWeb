import Image from 'next/image'
import { PHASES, POSITIONING } from '@/lib/automation-content'
import { caseStudies } from '@/lib/case-studies'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import { vahueBlogPosts } from '@/components/blog/vahue-blog-content'
import AboutPage from '@/components/templates/about/AboutPage'
import type { AboutContent, AboutNewsPost } from '@/components/templates/about/content'

/*
 * Vahue /about on the scale.com/about layout (components/templates/about, spec reference-snapshots/scale-clone/about.md).
 * Same nine sections, order, roles and counts; Scale's colours and motion. Only copy and media change:
 *   - mission = POSITIONING; "What we do" = PHASES; the stats band holds real case figures plus team and founding year
 *     (public/llms.txt, PRODUCT.md), so there are no placeholder metrics on this page
 *   - "Trusted by" = client logos the site already shows (components/main/ClientsStrip.tsx)
 *   - Vahue has no press items with a title and link, so "In The News" holds its five newest blog posts
 *   - photos are Vahue's own (public/img/careers), the ones without the old company name
 * Copy written for this page is marked `// page copy`.
 */

const CAREERS = '/img/careers'

const photo = (src: string, alt: string, position?: string, priority?: boolean) => (
  <Image src={src} alt={alt} fill sizes="100vw" priority={priority} className="object-cover" style={position ? { objectPosition: position } : undefined} />
)

const phase = (name: string) => PHASES.find((p) => p.name === name)?.name ?? name

// Scale's five tiles: posts 0 and 1 overlay with gradient, post 3 gradient.
const NEWS_LOOK: Record<string, { image: string; overlay?: boolean; gradient?: boolean }> = {
  'aeo-content-system': { image: '/img/blog/aeo-system-cover.png', overlay: true, gradient: true },
  'claude-fable-5-agentic-ai': { image: '/img/blog/agentic-flexibility-assets.webp', overlay: true, gradient: true },
  'trumps-ai-order-decoded': { image: '/img/blog/blog4.avif' },
  'secure-llm-deployment-enterprise': { image: '/img/blog/blog1.jpg', gradient: true },
  'code-data-sources-for-llm-training': { image: '/img/blog/blog2.jpg' },
}

const newsPosts: AboutNewsPost[] = vahueBlogPosts
  .filter((p) => NEWS_LOOK[p.slug])
  .map((p) => ({ title: p.title, category: p.category?.name ?? '', href: p.href ?? `/blog/${p.slug}/`, ...NEWS_LOOK[p.slug] }))

export const vahueAboutContent: AboutContent = {
  hero: {
    headline: 'About',
    imageBg: '#193A29',
    media: photo(`${CAREERS}/team-vahue-mi.png`, 'The Vahue team celebrating together', 'center 40%', true),
  },
  mission: {
    headline: 'Our mission is to run your busiest workflows with AI agents, measured from day one.', // page copy, from POSITIONING.line
    body: `${POSITIONING.promise} Every engagement runs the same way: Audit, Pilot, Operate.`, // second sentence: page copy
  },
  headquarters: {
    image: `${CAREERS}/office-5.jpg`,
    alt: 'The Vahue office seen from the mezzanine',
    width: 1216,
    height: 689,
    caption: 'Inside the Vahue office', // page copy
  },
  trusted: {
    overtitle: 'Trusted by',
    title: 'Working with teams that ship', // page copy
    logos: [
      { name: 'Shopify', src: '/img/shopify.svg', width: 100, height: 29 },
      { name: 'Qonto', src: '/img/qontoLogo.svg', width: 90, height: 24 },
      { name: 'Leafworks', src: '/img/leafworks.svg', width: 112, height: 20 },
      { name: 'Tracesafe', src: '/img/tracesafe.svg', width: 100, height: 28 },
    ],
  },
  pillars: {
    heading: 'What we do',
    // page copy: PHASES bodies cut to the length of Scale's cards
    cards: [
      { icon: 'MdBarChart', title: phase('Audit'), body: 'We map one workflow end to end and record the baseline: volume, time, errors and cost.' },
      { icon: 'MdRocketLaunch', title: phase('Pilot'), body: 'One workflow on your own data at real volume, checked by your team until accuracy holds.' },
      { icon: 'MdAutoAwesome', title: phase('Operate'), body: 'We run the agents day to day, with a monthly report against the baseline you agreed.' },
    ],
  },
  stats: {
    heading: 'Vahue at a glance',
    cards: [
      { icon: 'MdPsychology', label: 'Case studies', value: String(caseStudies.length), body: 'Named and anonymised, on this site.' }, // body: page copy
      { icon: 'MdPeople', label: 'RFI responses', value: '>90%', body: 'Automated, with human review intact.' }, // case: rfi-response-automation
      { icon: 'MdTrendingUp', label: 'Time to resolution', value: '−27%' }, // case: exaware-governed-noc-agents
      { icon: 'MdBadge', label: 'Team', value: '17' }, // public/llms.txt
      { icon: 'MdRocketLaunch', label: 'Founded', value: '2019' }, // PRODUCT.md
    ],
  },
  gallery: [
    { src: `${CAREERS}/office-1.jpg`, alt: 'Glass-walled workspace at the Vahue office' },
    { src: `${CAREERS}/office-2-vahue.png`, alt: 'The Vahue office entrance' },
    { src: `${CAREERS}/office-3.jpg`, alt: 'Vahue team members at their desks' },
    { src: `${CAREERS}/office-4.jpg`, alt: 'The Vahue open-plan office' },
    { src: `${CAREERS}/office-5.jpg`, alt: 'Vahue office seen from the mezzanine' },
  ],
  news: {
    heading: 'Latest From Vahue', // page copy
    posts: newsPosts,
  },
  prefooter: {
    headline: 'Join us. Put AI agents to work.', // page copy
    imageBg: '#193A29',
    media: photo(`${CAREERS}/office-4.jpg`, 'The Vahue open-plan office'),
    cta: { label: 'View Open Roles', href: '/careers/' },
  },
}

export default function VahueAboutPage() {
  return (
    // Scale's first block starts 39px down at 1440 and 102px at 390 (its banner + header). The site navbar is sticky and
    // 88px, so these offsets put every section at Scale's page position.
    <div className="bg-white pt-[13px] md:-mt-[50px] md:pt-0">
      <SmoothScroll />
      <AboutPage content={vahueAboutContent} />
    </div>
  )
}
