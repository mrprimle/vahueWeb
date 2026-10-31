import Image from 'next/image'
import { POSITIONING } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import CareersPage from '@/components/scale-clone/careers/CareersPage'
import type { CareersContent } from '@/components/scale-clone/careers/content'
import { EvidenceArt, FlexArt, GLOBE_ICON, MeasureArt, OwnerArt, RespectArt, ShareArt } from './careersArt'
import v from './vahueCareers.module.css'

/*
 * Vahue /careers on the scale.com/careers clone (components/scale-clone/careers, spec
 * reference-snapshots/scale-clone/careers.md). Strict parity: every clone section, in the same order, with the same
 * element roles and counts (hero H2 + body + CTA, 3 news cards, mission lead + 1 left + 3 right paragraphs, 6 credos,
 * 4 benefits, open positions, pre-footer H2 + CTA). Only the copy and visuals change:
 *   - copy from the previous /careers page (CareersExperience), the vacancy pages, lib/automation-content.ts and
 *     lib/case-studies.ts ("In The News" holds three named Vahue cases, linking to their case-study pages)
 *   - photos are Vahue's own (public/img/careers), line art is own SVG (careersArt.tsx); nothing from public/scale-clone
 *   - dark Vahue palette through the clone's --car-* variables
 */

const THEME: Record<`--car-${string}`, string> = {
  '--car-bg': '#020202',
  '--car-fg': '#ffffff',
  '--car-fg-2': '#f2f2f2',
  '--car-fg-3': 'rgba(255,255,255,0.7)',
  '--car-muted': 'rgba(255,255,255,0.55)',
  '--car-line': 'rgba(255,255,255,0.12)',
  '--car-card': '#111111',
  '--car-over': 'rgba(255,255,255,0.55)',
  '--car-sub': 'rgba(255,255,255,0.7)',
  '--car-hover-ink': '#ffffff',
  '--car-active-bg': '#ffffff',
  '--car-active-fg': '#020202',
  '--car-menu-bg': '#111111',
  '--car-sticky-bg': 'rgba(2,2,2,0.9)',
  '--car-shadow': 'none',
  '--car-credo-filter': 'none',
  // the site navbar is sticky (88px) and stays on screen, so the filter bar sticks below it
  '--car-sticky-top': '88px',
}

const photo = (src: string, alt: string, sizes: string, opts: { priority?: boolean; position?: string } = {}) => (
  <Image
    src={src}
    alt={alt}
    fill
    sizes={sizes}
    priority={opts.priority}
    className="object-cover"
    style={opts.position ? { objectPosition: opts.position } : undefined}
  />
)

// the clone's benefit image box: h-[320px] w-full rounded-lg object-cover
const benefitPhoto = (src: string, alt: string) => (
  <div className="relative h-[320px] w-full overflow-hidden rounded-lg">{photo(src, alt, '(min-width: 768px) 50vw, 100vw')}</div>
)

const link = (href: string, label: string) => (
  <a href={href} className="underline transition-colors hover:text-[color:var(--car-fg-2)]">
    {label}
  </a>
)

// three named cases in the news slot (label = client, title = case title, card tone = dark neutral)
const NEWS_CASES = [
  { slug: 'exaware-governed-noc-agents', bg: '#161616' },
  { slug: 'amerit-repair-order-ai', bg: '#111111' },
  { slug: 'piogroup-employee-assistant', bg: '#1a1a1a' },
].flatMap(({ slug, bg }) => {
  const c = getCaseStudy(slug)
  return c ? [{ label: c.client, title: c.title, href: `/case-studies/${c.slug}/`, bg }] : []
})

export const vahueCareersContent: CareersContent = {
  hero: {
    headline: 'Where your work matters',
    body: 'At Vahue, we value personalities, foster growth, build stable partnerships, and love what we do.',
    imageBg: '#111111',
    media: photo('/img/careers/team-vahue-mi.png', 'The Vahue team celebrating together', '100vw', { priority: true, position: 'center 40%' }),
    cta: { label: 'View open vacancies', href: '#open-roles', smoothScrollTargetId: 'open-roles' },
  },
  news: {
    overtitle: 'Case studies',
    title: 'Vahue in production',
    ctaLabel: 'Read case study',
    items: NEWS_CASES,
  },
  mission: {
    overtitle: 'Why',
    title: 'Our mission',
    lead: `At Vahue, our mission is simple: ${POSITIONING.line.charAt(0).toLowerCase()}${POSITIONING.line.slice(1)}`,
    left: [
      'Companies everywhere are trying to put AI to work in operations. Yet most automation projects stall after the pilot: few record a baseline, handover is where they break, and almost nobody keeps the agents running after launch.',
    ],
    right: [
      POSITIONING.promise,
      <>
        Every engagement starts with an Audit that records the baseline, then a Pilot on one workflow at real volume. We
        then Operate the agents month to month. See the {link('/automations/', 'workflows we run')} and{' '}
        {link('/security/', 'how we keep them safe')}.
      </>,
      'And every agent runs with review queues, approvals, role-based access and a full audit log, so your team stays in control of anything that moves money, customers or data.',
    ],
  },
  credos: {
    overtitle: 'Our values',
    title: 'How we work together',
    subtitle: 'Our values guide how we make decisions, work with clients and support each other, so the whole team pulls in one direction.',
    items: [
      { title: 'Mindset of respect', body: 'We treat everyone equally, valuing their opinions and input.', iconNode: <RespectArt /> },
      { title: 'Think like an owner', body: 'We go beyond tasks, promoting proactive action.', iconNode: <OwnerArt /> },
      { title: 'Flexibility', body: 'Flexible hours and remote roles. We trust people to plan their own day and judge them on the work.', iconNode: <FlexArt /> },
      { title: 'Share what you know', body: 'Teammates pass on what they know openly, so everyone keeps growing, from trainees to leads.', iconNode: <ShareArt /> },
      {
        title: 'Evidence before assertion',
        body: 'A claim we make to a client or to each other is no stronger than the evidence behind it.',
        iconNode: <EvidenceArt />,
      },
      { title: 'Measure from day one', body: 'We record the baseline before we build, so everyone can see what changed.', iconNode: <MeasureArt /> },
    ],
  },
  benefits: {
    overtitle: 'Our benefits',
    title: 'What working at Vahue looks like',
    subtitle: 'We give people room to own their work, grow into new roles and keep a schedule that fits their life.',
    items: [
      {
        title: 'No micromanagement',
        body: 'Your work makes a visible difference here. You own it and the decisions that come with it, you can make mistakes and learn from them, and teammates are always ready to support you.',
        media: benefitPhoto('/img/careers/office-3.jpg', 'Vahue team members at their desks'),
      },
      {
        title: 'Room to grow',
        body: 'People grow into new roles at Vahue. Client Partner and Sales teams share their knowledge openly, and trainees become leads in a transparent, supportive culture.',
        media: benefitPhoto('/img/careers/office-4.jpg', 'The Vahue open-plan office'),
      },
      {
        title: 'Modern technology',
        body: 'Work with current tools and ambitious founders, learn processes that make the work more effective, and have a real voice in product and business decisions.',
        media: benefitPhoto('/img/careers/office-1.jpg', 'Glass-walled workspace at the Vahue office'),
      },
      {
        title: 'Offices you’ll love',
        body: 'Bright, open spaces with room to focus and room to meet, for the days you want to work next to the team.',
        media: benefitPhoto('/img/careers/office-5.jpg', 'Vahue office seen from the mezzanine'),
      },
    ],
  },
  positions: {
    id: 'open-roles',
    overtitle: 'Open positions',
    title: 'Help us put AI agents to work',
    jobs: [
      {
        id: 'senior-smm',
        title: 'Senior SMM',
        department: 'Marketing',
        location: 'Fully remote',
        href: '/careers/senior-smm/',
        applyUrl: '/careers/senior-smm/#apply',
      },
    ],
    jobBaseHref: '/careers',
    flags: { 'Fully remote': GLOBE_ICON },
    flagFallback: GLOBE_ICON,
    scaleLabelQuirk: false,
    labels: {
      search: 'Search positions…',
      allDepartments: 'All departments',
      allLocations: 'All locations',
      noneFound: 'No matching roles. Try another search or clear the filters.',
    },
  },
  prefooter: {
    headline: 'See all open vacancies',
    imageBg: '#111111',
    media: photo('/img/careers/office-2-vahue.png', 'The Vahue office entrance', '100vw', { position: 'center 15%' }),
    cta: { label: 'Explore vacancies', href: '/careers/vacancies/' },
  },
}

export default function VahueCareersPage() {
  return (
    // the site navbar is sticky (88px) and transparent at the top: pull the page up under it so the clone's pt-24
    // hero offset lines up with scale.com
    <div className={`${v.vahue} -mt-[88px] bg-[#020202]`}>
      <SmoothScroll />
      <h1 className="sr-only">Careers at Vahue</h1>
      <CareersPage content={vahueCareersContent} theme={THEME} />
    </div>
  )
}
