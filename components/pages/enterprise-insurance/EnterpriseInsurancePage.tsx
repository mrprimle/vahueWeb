'use client'

// The page body as Scale's route renders it (RSC payload): 478135 (non-globe hero), 236943, 1900 + 460138 twice, 51051, 450359, 540431.
import { FeaturesWithIcons } from '@/components/site/shared/FeaturesWithIcons'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { LogoCarousel } from '@/components/site/shared/LogoCarousel'
import { GlassButtonLink } from '@/components/site/shared/NewButtonLink'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { VideoFeatures } from '@/components/site/shared/VideoFeatures'
import { Icon } from './icons'
import { ServiceFeatures } from './ServiceFeatures'
import type { EnterpriseInsuranceContent, IconFeature } from './types'

const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'
const SECTION = 'py-18 lg:py-20 bg-transparent'
const CONTAINER = 'mx-auto w-full max-w-[1472px] ps-6 pe-6 relative'

const features = (items: IconFeature[]) => items.map((f) => ({ title: f.title, subtitle: f.subtitle, iconNode: <Icon name={f.icon} /> }))

export function EnterpriseInsurancePage({ content: c }: { content: EnterpriseInsuranceContent }) {
  return (
    <>
      <style>{'html { scroll-behavior: smooth; }'}</style>
      <PageThemeSetter theme="light" />
      <div className="pb-10! pt-24!">
        <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} cta={c.hero.cta} backdropColor={c.hero.backdrop} image={c.hero.image} startPercentage={0} sectionClassName={HERO_MEDIA} />
      </div>

      <section className={`${SECTION} !py-8`}>
        <div className={CONTAINER}>
          <LogoCarousel logos={c.logos.items} copy={c.logos.copy} href={c.logos.href} linkText={c.logos.linkText} />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <SectionTitle className="!mb-10" overtitle={c.blindSpots.overtitle} title={c.blindSpots.title} subtitle={c.blindSpots.subtitle} />
          <FeaturesWithIcons columns="3" featuresIconColor="white" features={features(c.blindSpots.items)} />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <SectionTitle
            className="!mb-10"
            overtitle={c.solutions.overtitle}
            title={c.solutions.title}
            subtitle={c.solutions.subtitle}
            cta={
              <div className="mt-8 flex items-center flex-wrap">
                <GlassButtonLink href={c.solutions.cta.href} theme="light" openInNewTab>
                  {c.solutions.cta.children}
                </GlassButtonLink>
              </div>
            }
          />
          <ServiceFeatures items={c.solutions.items} />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <SectionTitle className="!mb-10" overtitle={c.strategy.overtitle} title={c.strategy.title} subtitle={c.strategy.subtitle} />
          <VideoFeatures features={c.strategy.items} />
        </div>
      </section>

      <div className="pt-16! pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
      </div>
    </>
  )
}
