'use client'

// The page body as Scale's route renders it (RSC payload): 478135 (non-globe hero), 460138, 872447, 497052, 540431.
import { AlternatingImageRows } from '@/components/site/shared/AlternatingImageRows'
import { ChecklistWithMedia } from '@/components/site/shared/ChecklistWithMedia'
import { FeaturesWithIcons } from '@/components/site/shared/FeaturesWithIcons'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { CHALLENGE_ICONS } from './icons'
import type { EvaluationEnterpriseContent } from './types'

const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'
const SECTION = 'py-18 lg:py-20 bg-transparent !py-16'
const CONTAINER = 'mx-auto w-full max-w-[1472px] ps-6 pe-6 relative'

/** react-icons' GenIcon output, as the RSC payload renders it. */
function Icon({ paths }: { paths: string[] }) {
  const [base, ...rest] = paths
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height={22} width={22} xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d={base} />
      {rest.map((d) => (
        <path d={d} key={d} />
      ))}
    </svg>
  )
}

export function EvaluationEnterprisePage({ content: c }: { content: EvaluationEnterpriseContent }) {
  return (
    <>
      <PageThemeSetter theme="light" />
      <div className="pb-10! pt-24!">
        <FullBleedMediaSection
          headline={c.hero.headline}
          body={c.hero.body}
          cta={c.hero.cta}
          secondaryCta={c.hero.secondaryCta}
          backdropColor={c.hero.backdrop}
          image={c.hero.image}
          startPercentage={0}
          sectionClassName={HERO_MEDIA}
        />
      </div>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <SectionTitle className="!mb-10" overtitle={c.challenge.overtitle} title={c.challenge.title} subtitle={c.challenge.subtitle} />
          <FeaturesWithIcons
            columns="3"
            featuresIconColor="white"
            features={c.challenge.items.map((f) => ({ title: f.title, subtitle: f.subtitle, iconNode: <Icon paths={CHALLENGE_ICONS[f.icon]} /> }))}
          />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <SectionTitle className="!mb-10" overtitle={c.solution.overtitle} title={c.solution.title} subtitle={c.solution.subtitle} />
          <ChecklistWithMedia features={c.solution.features} image={c.solution.image} mediaPosition="left" dividers={false} />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <SectionTitle className="!mb-10" overtitle={c.how.overtitle} title={c.how.title} subtitle={c.how.subtitle} />
          <AlternatingImageRows items={c.how.items} headingLevel="h3" />
        </div>
      </section>

      <div className="pt-16! pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} secondaryCta={c.prefooter.secondaryCta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
      </div>
    </>
  )
}
