import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import { WORKFLOWS, type Workflow } from '@/lib/automation-content'
import FullBleedMedia from './FullBleedMedia'
import FeatureCards from './FeatureCards'
import EnvironmentTypes from './EnvironmentTypes'
import { Capabilities, Overview } from './StaticSections'
import { AfterMock, BeforeMock, ControlMock, PlatformsLineArt, ReviewMock, WavesMock } from './Visuals'

/*
 * /automations/engineering-enablement on the scale.com/rlenvironments layout, strict parity with the clone
 * (scale.com/rlenvironments): hero -> 4 feature cards -> 3 overview cards -> 2 capability rows
 * -> 3 "offered as" cards with the square visual -> pre-footer, in the clone's own colours, built from the clone's
 * components with the content passed in. Source: lib/automation-content.ts (WORKFLOWS 'engineering-enablement');
 * text written for this page is listed in the strict-parity report.
 */
const wf = WORKFLOWS.find((w) => w.slug === 'engineering-enablement')!
const [baseline, pilot, coach, scale] = wf.steps

const CONTENT = {
  hero: { title: 'Engineering Enablement', body: 'Make your engineering team AI-native, and measure it.', cta: 'Book An Audit', href: '/contact/' },
  features: {
    eyebrow: 'How It Works',
    title: 'Built for Measured Adoption',
    cards: [
      { icon: 'trending' as const, color: '#273252', title: 'A Baseline on a Comparable Team', body: `${baseline.body} The gain from agents is then compared, not assumed.` },
      { icon: 'flag' as const, color: '#193A29', title: 'A 12-Week Pilot on One Team', body: 'Agents for code review, tests and documentation, with the practices that make them stick, on one team for 12 weeks.' },
      { icon: 'people' as const, color: '#79648C', title: 'Coaching and Internal Champions', body: `${coach.body} Adoption grows team by team, not tool by tool.` },
      { icon: 'hub' as const, color: '#A8927C', title: 'Rollout in Waves, Same Metrics', body: `${scale.body} Every wave is read against the control group.` },
    ],
  },
  overview: {
    eyebrow: 'Overview',
    title: 'A Look Inside an Enablement Pilot',
    cards: [
      { title: 'Agents for Review, Tests and Docs', body: 'Agents review pull requests, suggest tests and keep documentation current, inside the repositories your team already uses.', media: <ReviewMock /> },
      { title: 'A Control Group From Day One', body: 'A comparable team keeps working as before, so the agreed delivery metrics show what the agents changed and what they did not.', media: <ControlMock /> },
      { title: 'Practices Adopted Team by Team', body: `${pilot.body} Pairing and internal champions then carry what works to the next team, wave by wave, with the same agreed metrics read every time.`, media: <WavesMock /> },
    ],
  },
  capabilities: {
    eyebrow: 'Capabilities',
    title: 'What Changes for the Teams You Really Run',
    items: [
      { title: 'Before: Uneven Adoption', body: `${wf.before.join('. ')}, so nobody can say what AI is actually doing for delivery, or which teams it helps.`, media: <BeforeMock />, textSide: 'left' as const },
      { title: 'After: Measured Practice', body: `${wf.after.join('. ')}, so the gain is shown on your own delivery metrics before the rollout grows.`, media: <AfterMock />, textSide: 'right' as const },
    ],
  },
  environmentTypes: {
    eyebrow: 'Works with',
    title: 'Code Platforms',
    body: 'Agents work where your engineers already do. Code stays in your repositories throughout.',
    cards: [
      { icon: 'code' as const, color: '#273252', title: 'GitHub', body: 'Pull requests, reviews and actions.' },
      { icon: 'storage' as const, color: '#193A29', title: 'GitLab', body: 'Merge requests and CI pipelines.' },
      { icon: 'desktop' as const, color: '#839CB2', title: 'Jira', body: 'Tickets, sprints and delivery tracking.' },
    ],
  },
  prefooter: { title: 'Start an Enablement Pilot', cta: 'Book An Audit', href: '/contact/' },
}

export default function WorkflowPage({ workflow: _workflow }: { workflow: Workflow }) {
  return (
    <div className="overflow-x-clip bg-white font-display text-black">
      <SmoothScroll />
      <FullBleedMedia
        as="h1"
        image="/img/careers/office-2.jpg"
        title={CONTENT.hero.title}
        body={CONTENT.hero.body}
        cta={CONTENT.hero.cta}
        href={CONTENT.hero.href}
        startPercentage={0}
        staticMedia
        wrapperClassName="pb-10 pt-12 md:pt-24"
        priority
      />
      <FeatureCards features={CONTENT.features} />
      <Overview overview={CONTENT.overview} />
      <Capabilities capabilities={CONTENT.capabilities} />
      <EnvironmentTypes environmentTypes={CONTENT.environmentTypes} media={<PlatformsLineArt />} />
      <FullBleedMedia
        image="/img/careers/office-5.jpg"
        title={CONTENT.prefooter.title}
        cta={CONTENT.prefooter.cta}
        href={CONTENT.prefooter.href}
        startPercentage={10}
        wrapperClassName="pb-8"
      />
    </div>
  )
}
