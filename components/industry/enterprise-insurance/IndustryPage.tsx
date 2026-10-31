import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import CaseCards from './CaseCards'
import FullBleedMedia from './FullBleedMedia'
import LogoCarousel from './LogoCarousel'
import { GlassButton, IconFeatures, SectionHeader, Slice } from './Sections'
import type { InsuranceLayoutContent } from './content'

/**
 * Industry landing in strict parity with the scale.com/enterprise/insurance clone
 * (app/scale-clone/enterprise-insurance, spec reference-snapshots/scale-clone/enterprise-insurance.md): the same six
 * sections in Scale's order, Scale's own colours (white page, black type, empty overtitles, glass button), the same
 * counts (7 logos in 4 + 3, 3 + 3 icon cards, 2 video cards); Vahue fonts, logo and copy (./content.ts).
 * Section mapping: hero -> the industry promise; logo carousel -> named clients as text tiles; blind spots -> the
 * industry's problems; "how smart insurers" -> the INDUSTRY_WORKFLOWS cards; video cards -> two verified cases;
 * pre-footer CTA.
 */
export default function IndustryPage({ content }: { content: InsuranceLayoutContent }) {
  const { hero, logos, problems, solutions, cases, prefooter } = content
  return (
    <div className="overflow-x-hidden bg-white font-display text-black">
      <SmoothScroll />

      {/* PageHeader: FullBleedMedia with startPercentage 0. The clone's pt-24 sits under Scale's overlay header;
          Vahue's sticky navbar (light on this route, see Navbar.tsx) takes space in the flow, so pt-4 here. */}
      <div className="pb-10 pt-4">
        <FullBleedMedia
          as="h1"
          backdrop="#fff"
          imageBg={hero.imageBg}
          priority
          startPercentage={0}
          headline={hero.headline}
          body={hero.body}
          primary={hero.cta}
        />
      </div>

      <Slice className="py-8">
        <LogoCarousel names={logos.names} line={logos.line} link={logos.link} />
      </Slice>

      <Slice>
        <SectionHeader title={problems.title} sub={problems.sub} />
        <IconFeatures items={problems.items} />
      </Slice>

      <Slice>
        <SectionHeader title={solutions.title} sub={solutions.sub}>
          <GlassButton href={solutions.button.href}>{solutions.button.label}</GlassButton>
        </SectionHeader>
        <IconFeatures items={solutions.items} />
      </Slice>

      <Slice>
        <SectionHeader title={cases.title} sub={cases.sub} />
        <CaseCards items={cases.items} />
      </Slice>

      {/* Pre-footer: pt-16 pb-8, FullBleedMedia default startPercentage 10 */}
      <div className="pb-8 pt-16">
        <FullBleedMedia backdrop="#fff" imageBg={prefooter.imageBg} headline={prefooter.headline} primary={prefooter.cta} />
      </div>
    </div>
  )
}
