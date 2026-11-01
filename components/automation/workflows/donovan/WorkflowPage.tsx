import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import type { Workflow } from '@/lib/automation-content'
import FullBleedMedia from './FullBleedMedia'
import IntegrationStrip from './IntegrationStrip'
import Showcase from './Showcase'
import { FeatureGrid, Foundation, OverviewCards, Section, SectionHeader } from './Sections'
import { SUPPORT as C } from './content'

/**
 * /automations/support-agents on the scale.com/donovan layout, strict parity with the clone
 * (components/templates/donovan/DonovanPage.tsx): the same 8 sections in the same order, in the clone's own
 * colours. hero -> logo strip -> product overview (3 UI cards) -> foundation (3 + brace + 6) -> tabbed showcase
 * (5 tabs) -> icon grid (6) -> trusted & secure (3) -> pre-footer. Copy and slot mapping: ./content.ts.
 */
export default function WorkflowPage({ workflow: _workflow }: { workflow: Workflow }) {
  return (
    <div className="bg-white font-display tracking-[-0.01em] text-black">
      <SmoothScroll />
      <div className="overflow-x-hidden">
        {/* 1. Full-bleed hero (ClipScrollSection) */}
        <div className="pb-10 pt-24">
          <FullBleedMedia
            as="h1"
            image={C.hero.image}
            imageBg="#193A29"
            headline={C.hero.headline}
            body={C.hero.body}
            primary={C.hero.primary}
            backdrop="#fff"
            startPercentage={0}
            priority
          />
        </div>

        {/* 2. Customer logos -> integrations */}
        <IntegrationStrip tools={C.tools} />

        {/* 3. Product overview: 3 product-UI cards */}
        <Section>
          <SectionHeader eyebrow={C.overview.eyebrow} title={C.overview.title} subtitle={C.overview.subtitle} />
          <OverviewCards cards={C.overview.cards} />
        </Section>

        {/* 4. Foundation cards (gray-50 band) */}
        <Foundation {...C.foundation} />

        {/* 5. Tabbed showcase */}
        <Showcase tabs={C.showcase} />

        {/* 6. Icon feature grid */}
        <FeatureGrid {...C.overmatch} sectionClassName="py-12" />

        {/* 7. Supported environments */}
        <FeatureGrid {...C.trusted} />

        {/* 8. Pre-footer CTA */}
        <div className="pb-8">
          <FullBleedMedia
            image={C.prefooter.image}
            imageBg="#193A29"
            headline={C.prefooter.headline}
            primary={C.prefooter.primary}
            secondary={C.prefooter.secondary}
            backdrop="#fff"
            startPercentage={10}
          />
        </div>
      </div>
    </div>
  )
}
