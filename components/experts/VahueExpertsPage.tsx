import Image from 'next/image'
import { INTEGRATIONS, WORKFLOWS } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import ExpertsPage from '@/components/templates/experts/ExpertsPage'
import type { ExpertsContent, Logo, TestimonialItem } from '@/components/templates/experts/content'

/*
 * Vahue /experts on the scale.com/experts layout (components/templates/experts, spec
 * reference-snapshots/scale-clone/experts.md). Same six sections, order and roles; Scale's colours and motion. Only copy
 * and media change:
 *   - team facts come from public/llms.txt (17 people, 15+ specialists, markets served)
 *   - the domain tabs hold the six workflows (Scale has seven tabs); their rows are the workflow's forWho, summary and
 *     guardrails, and the sphere tiles name its tools first, then the other INTEGRATIONS
 *   - the testimonial slot holds case outcomes from lib/case-studies.ts, without quotation marks: they are not quotes
 * Copy written for this page is marked `// page copy`.
 */

const CTA = { label: 'Work With Us', href: '/contact/' }

// Scale's seven domain colours, first six, in order.
const COLORS = ['#193A29', '#273252', '#1A4A5A', '#839CB2', '#A8927C', '#79648C']

// Text tiles on the sphere and the phone marquee: the box sets the text size, as Scale's logo boxes set the marks.
const tiles = (tools: string[]): Logo[] =>
  [...new Set([...tools, ...INTEGRATIONS])].map((alt) => ({ alt, width: 110, height: 28 }))

// The case's published title, summary and last outcome, to come close to Scale's quote length.
const caseItem = (slug: string): TestimonialItem[] => {
  const c = getCaseStudy(slug)
  if (!c) return []
  const outcome = c.outcomes[c.outcomes.length - 1]
  return [
    {
      name: c.client,
      title: `${c.service}, ${c.disclosure.toLowerCase()}`,
      quote: `${c.title}. ${c.summary} ${outcome}.`,
      logo: { alt: c.client, width: 110, height: 22 },
    },
  ]
}

export const vahueExpertsContent: ExpertsContent = {
  hero: {
    headline: 'The human experts behind your AI agents.', // page copy
    body: 'A team of 17 and a network of 15+ specialists on your busiest workflows.', // page copy
    cta: CTA,
    poster: '',
  },
  cardGrid: {
    heading: 'Senior operators for every workflow', // page copy
    // page copy, from public/llms.txt and the six workflows
    cards: [
      { icon: 'academic', title: 'Senior AI-native engineers', body: 'Pods that ship with evals, guardrails, CI/CD and observability', hover: '#a8927c' },
      { icon: 'industry', title: 'Deep, top-tier industry experience', body: 'Experience at McKinsey, Google and other top tech companies', hover: '#79648c' },
      { icon: 'worldwide', title: 'Worldwide delivery', body: 'US, EU, UK and selected APAC markets.', hover: '#929292' },
      { icon: 'domain', title: 'Specialized workflow expertise', body: 'Six workflows, run under one control layer', hover: '#839cb2' },
    ],
  },
  domains: {
    heading: 'Our experts run', // page copy
    labels: { who: 'Who it is for', skills: 'What the agents do', project: 'Guardrails', peer: '' },
    colors: Object.fromEntries(WORKFLOWS.map((w, i) => [w.slug, COLORS[i % COLORS.length]])),
    domains: WORKFLOWS.map((w) => ({
      label: w.label,
      key: w.slug,
      whoTheyAre: w.forWho,
      skills: w.summary,
      // second sentence: the control layer every agent runs under (CONTROL_FEATURES)
      projectType: `${w.guardrails.join('. ')}. Every agent runs with review queues, approvals and a full audit log.`,
      logos: tiles(w.tools),
    })),
  },
  testimonials: {
    heading: 'Results in production', // page copy
    plainText: true,
    items: [...caseItem('exaware-governed-noc-agents'), ...caseItem('docplanner-voicebot-recovery')],
  },
  resources: {
    heading: 'Resources',
    // page copy: titles
    posts: [
      { title: 'Case Studies: Named and Anonymised Results from Production', category: 'Proof', href: '/case-studies/' },
      { title: 'Guides: Practical Playbooks for Teams Putting AI to Work', category: 'Guides', href: '/guides/', image: '/img/guides/skills1.png' },
      { title: 'How We Operate Your Agents, Month to Month', category: 'Operate', href: '/operations/', image: '/img/careers/office-1.jpg' },
      { title: 'Security and the Control Layer', category: 'Security', href: '/security/', image: '/img/blog/blog1.jpg' },
      { title: 'Six Workflows We Run with AI Agents', category: 'Automations', href: '/automations/', image: '/img/blog/agentic-flexibility-assets.webp' },
    ],
  },
  prefooter: {
    headline: 'Start with the Right Workflow.', // page copy
    body: "Vahue's team will map one workflow and record its baseline in two weeks.", // page copy, from PHASES
    cta: CTA,
    poster: '/img/careers/office-3.jpg',
  },
}

export default function VahueExpertsPage() {
  return (
    // Scale's first block starts 39px down at 1440 and 102px at 390 (its banner + header); the sticky navbar is 88px.
    <div className="bg-white pt-[13px] md:-mt-[50px] md:pt-0">
      <SmoothScroll />
      <ExpertsPage
        content={vahueExpertsContent}
        media={{
          // Scale's hero is a video, which stays at scale 1: a media node keeps that, the pre-footer poster scales
          hero: <Image src="/img/careers/office-4.jpg" alt="The Vahue team at work in the open-plan office" fill sizes="100vw" priority className="object-cover" />,
        }}
      />
    </div>
  )
}
