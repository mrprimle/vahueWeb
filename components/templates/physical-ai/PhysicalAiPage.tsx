import FullBleedMedia from './FullBleedMedia'
import Testimonials from './Testimonials'
import ModelChart from './ModelChart'
import { FeaturesTwoCol, FeaturesWrap, ImageCards, ResponsiveImg, Section, SectionHeader, SplitRow } from './Sections'
import { annotations, difference, embodiments, environments, hero, overview, prefooter, testimonials, useCase } from './content'

// Body of scale.com/physical-ai, top to bottom. Spec: reference-snapshots/scale-clone/physical-ai.md
export default function PhysicalAiPage() {
  return (
    <main className="bg-white font-display tracking-[-0.01em] text-black">
      <div className="overflow-x-hidden">
        {/* 1. Full-bleed hero (ClipScrollSection, startPercentage 0) */}
        <FullBleedMedia
          wrapperClassName="pb-10 pt-24"
          backdropClassName="bg-white"
          startPercentage={0}
          image={hero.image}
          headline={hero.headline}
          body={hero.body}
          primary={hero.primary}
          logos={{ label: hero.logosLabel, count: hero.logoCount }}
          priority
        />

        {/* 2. Product overview: 2-col icon features */}
        <Section>
          <SectionHeader eyebrow={overview.eyebrow} title={overview.title} muted={false} />
          <FeaturesTwoCol items={overview.items} />
        </Section>

        {/* 3. Client testimonials (evergreen panel) */}
        <Testimonials heading={testimonials.heading} items={testimonials.items} />

        {/* 4. Use case: text + isometric illustration */}
        <Section>
          <SectionHeader eyebrow={useCase.eyebrow} title={useCase.title} />
          <SplitRow
            title={useCase.heading}
            body={useCase.body}
            gapClassName="gap-8 lg:gap-12"
            media={<ResponsiveImg {...useCase.image} />}
          />
        </Section>

        {/* 5. Key features: embodiment cards */}
        <Section>
          <SectionHeader eyebrow={embodiments.eyebrow} title={embodiments.title} subtitle={embodiments.subtitle} />
          <ImageCards cards={embodiments.cards} />
        </Section>

        {/* 6. Environments cards (empty eyebrow keeps its 24px row) */}
        <Section>
          <SectionHeader eyebrow="" title={environments.title} subtitle={environments.subtitle} />
          <ImageCards cards={environments.cards} />
        </Section>

        {/* 7. Annotations + model improvement chart */}
        <Section>
          <SplitRow title={annotations.first.title} body={annotations.first.body} mediaFirst media={<ResponsiveImg {...annotations.first.image} />} />
          <SplitRow
            className="mt-16"
            title={annotations.second.title}
            body={annotations.second.body}
            media={<ModelChart yAxis={annotations.chart.yAxis} xAxis={annotations.chart.xAxis} labels={annotations.chart.series} />}
          />
        </Section>

        {/* 8. The difference: 6 icon features */}
        <Section>
          <SectionHeader eyebrow="" title={difference.title} muted={false} />
          <FeaturesWrap items={difference.items} />
        </Section>

        {/* 9. Prefooter full-bleed CTA (ClipScrollSection, startPercentage 10, gray-50 backdrop) */}
        <FullBleedMedia
          wrapperClassName="pb-8 pt-16"
          backdropClassName="bg-[#f9fafb]"
          startPercentage={10}
          image={prefooter.image}
          headline={prefooter.headline}
          primary={prefooter.primary}
          secondary={prefooter.secondary}
        />
      </div>
    </main>
  )
}
