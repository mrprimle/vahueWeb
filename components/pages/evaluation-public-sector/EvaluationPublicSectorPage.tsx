'use client'

// The page body as Scale's route renders it (RSC payload): 478135 (non-globe hero), 970272, 15518, 460138, 872447, 408298, 540431.
import { ChecklistWithMedia } from '@/components/site/shared/ChecklistWithMedia'
import { FeatureCards } from '@/components/site/shared/FeatureCards'
import { FeaturesWithIcons } from '@/components/site/shared/FeaturesWithIcons'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { LogoCloud } from '@/components/site/shared/LogoCloud'
import { NewButtonLink } from '@/components/site/shared/NewButtonLink'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { CARD_ICONS, WHY_ICONS } from './icons'
import type { EvaluationPublicSectorContent } from './types'

const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'
const SECTION = 'py-18 lg:py-20 bg-transparent !py-16'
const CONTAINER = 'mx-auto w-full max-w-[1472px] ps-6 pe-6 relative'

/** react-icons' GenIcon output, as the RSC payload renders it. */
function Icon({ paths, size }: { paths: string[]; size: number }) {
  const [base, ...rest] = paths
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height={size} width={size} xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d={base} />
      {rest.map((d) => (
        <path d={d} key={d} />
      ))}
    </svg>
  )
}

export function EvaluationPublicSectorPage({ content: c }: { content: EvaluationPublicSectorContent }) {
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

      <section className="py-18 lg:py-20 bg-transparent !py-12">
        <div className={CONTAINER}>
          <LogoCloud logos={c.logos.items} copy={c.logos.copy} link={c.logos.link} />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <SectionTitle className="!mb-10" overtitle={c.techniques.overtitle} title={c.techniques.title} subtitle={c.techniques.subtitle} />
          <FeatureCards items={c.techniques.items} columns="2" imageHeight="h-[320px]" />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <SectionTitle className="!mb-10" overtitle={c.why.overtitle} title={c.why.title} subtitle={c.why.subtitle} />
          <FeaturesWithIcons
            columns="3"
            featuresIconColor="white"
            features={c.why.items.map((f) => ({ title: f.title, subtitle: f.subtitle, iconNode: <Icon paths={WHY_ICONS[f.icon]} size={22} /> }))}
          />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <SectionTitle className="!mb-10" overtitle={c.methodology.overtitle} title={c.methodology.title} subtitle={c.methodology.subtitle} />
          <ChecklistWithMedia title={c.methodology.listTitle} features={c.methodology.features} image={c.methodology.image} mediaPosition="left" dividers={false}>
            <NewButtonLink href={c.methodology.cta.href} color="black">
              {c.methodology.cta.text}
            </NewButtonLink>
          </ChecklistWithMedia>
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <SectionTitle className="!mb-10" overtitle={c.platform.overtitle} title={c.platform.title} subtitle={c.platform.subtitle} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.platform.cards.map((card) => (
              <article key={card.title} className="flex min-h-[310px] flex-col rounded-2xl border border-black/10 bg-black/5 p-6">
                <div className="mb-12 flex flex-1 items-center justify-center text-black/70">
                  <Icon paths={CARD_ICONS[card.icon]} size={72} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black">{card.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-black/70">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-16! pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
      </div>
    </>
  )
}
