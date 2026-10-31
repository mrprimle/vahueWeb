import type { ReactNode } from 'react'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import type { Workflow } from '@/lib/automation-content'
import ModelChart from '@/components/scale-clone/physical-ai/ModelChart'
import { FeaturesTwoCol, FeaturesWrap, Section, SectionHeader, SplitRow } from '@/components/scale-clone/physical-ai/Sections'
import cloneStyles from '@/components/scale-clone/physical-ai/physical-ai.module.css'
import FullBleedMedia from './FullBleedMedia'
import CaseResults from './CaseResults'
import { CardScene, IntakeIsometric, SourceTrace } from './Visuals'
import { DOC_INTAKE as C } from './content'

/* The clone's ImageCards (4:3 card, hairline, title, body) with our own media in place of Scale's photos. */
function MediaCards({ cards }: { cards: readonly { kind: Parameters<typeof CardScene>[0]['kind']; title: string; body: string }[] }) {
  return (
    <div className="relative grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14">
      {cards.map((c) => (
        <div key={c.title}>
          <div className={`${cloneStyles.feature} relative aspect-[4/3]`}>
            <CardScene kind={c.kind} />
          </div>
          <p className="relative mt-8 text-[24px] leading-[1.5] tracking-[-0.01em] text-black lg:mt-12">{c.title}</p>
          <p className="relative mt-3 text-[16px] leading-[1.65] tracking-[-0.01em] text-black/70">{c.body}</p>
        </div>
      ))}
    </div>
  )
}

const Media = ({ children }: { children: ReactNode }) => <div className="w-full">{children}</div>

/**
 * /automations/document-intake on the scale.com/physical-ai layout, strict parity with the clone
 * (components/scale-clone/physical-ai/PhysicalAiPage.tsx): the same 9 sections in the same order, in the clone's
 * own colours, reusing the clone's section components. Copy and slot mapping: ./content.ts.
 */
export default function WorkflowPage({ workflow: _workflow }: { workflow: Workflow }) {
  return (
    <div className="bg-white font-display tracking-[-0.01em] text-black">
      <SmoothScroll />
      <div className="overflow-x-hidden">
        {/* 1. Full-bleed hero (ClipScrollSection, startPercentage 0); logo strip -> integrations */}
        <FullBleedMedia
          as="h1"
          wrapperClassName="pb-10 pt-24"
          backdropClassName="bg-white"
          startPercentage={0}
          image={C.hero.image}
          headline={C.hero.headline}
          body={C.hero.body}
          primary={C.hero.primary}
          strip={C.hero.strip}
        />

        {/* 2. Product overview: 2-col icon features */}
        <Section>
          <SectionHeader eyebrow={C.overview.eyebrow} title={C.overview.title} muted={false} />
          <FeaturesTwoCol items={C.overview.items} />
        </Section>

        {/* 3. Client testimonials (evergreen panel) -> verified case results */}
        <CaseResults heading={C.testimonials.heading} items={C.testimonials.items} />

        {/* 4. Use case: text + isometric illustration */}
        <Section>
          <SectionHeader eyebrow={C.useCase.eyebrow} title={C.useCase.title} />
          <SplitRow
            title={C.useCase.heading}
            body={C.useCase.body}
            gapClassName="gap-8 lg:gap-12"
            media={
              <Media>
                <IntakeIsometric />
              </Media>
            }
          />
        </Section>

        {/* 5. Key features: document types */}
        <Section>
          <SectionHeader eyebrow={C.embodiments.eyebrow} title={C.embodiments.title} subtitle={C.embodiments.subtitle} />
          <MediaCards cards={C.embodiments.cards} />
        </Section>

        {/* 6. Environments -> channels (empty eyebrow keeps its 24px row) */}
        <Section>
          <SectionHeader eyebrow="" title={C.environments.title} subtitle={C.environments.subtitle} />
          <MediaCards cards={C.environments.cards} />
        </Section>

        {/* 7. Annotations + improvement chart */}
        <Section>
          <SplitRow
            title={C.annotations.first.title}
            body={C.annotations.first.body}
            mediaFirst
            media={
              <Media>
                <SourceTrace fields={C.annotations.first.fields} />
              </Media>
            }
          />
          <SplitRow
            className="mt-16"
            title={C.annotations.second.title}
            body={C.annotations.second.body}
            media={<ModelChart yAxis={C.annotations.chart.yAxis} xAxis={C.annotations.chart.xAxis} labels={C.annotations.chart.series} />}
          />
        </Section>

        {/* 8. The difference -> controls */}
        <Section>
          <SectionHeader eyebrow="" title={C.difference.title} muted={false} />
          <FeaturesWrap items={C.difference.items} />
        </Section>

        {/* 9. Prefooter full-bleed CTA (ClipScrollSection, startPercentage 10, gray-50 backdrop) */}
        <FullBleedMedia
          wrapperClassName="pb-8 pt-16"
          backdropClassName="bg-[#f9fafb]"
          startPercentage={10}
          image={C.prefooter.image}
          headline={C.prefooter.headline}
          primary={C.prefooter.primary}
          secondary={C.prefooter.secondary}
        />
      </div>
    </div>
  )
}
