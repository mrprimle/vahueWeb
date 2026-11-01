import { FeaturesWithIcons } from '@/components/site/shared/FeaturesWithIcons'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { LogoCloud } from '@/components/site/shared/LogoCloud'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import { TabsWithImages } from '@/components/site/shared/TabsWithImages'
import { cn } from '@/components/site/lib/cn'
import { FEATURE_ICONS, type FeatureIconName } from './featureIcons'
import { FOUNDATION_ICONS, type FoundationIconName } from './foundationIcons'
import { AgentArsenalMock, AgentFactoryMock, TestEvaluateMock } from './Mocks'
import type { DonovanContent, Feature, Heading } from './types'

const MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'
const CONTAINER = 'mx-auto w-full max-w-[1472px] ps-6 pe-6 relative'
const CARD = 'flex w-[368px] flex-col items-center gap-6 p-6 rounded-2xl bg-white border-[0.5px] border-solid border-black/5'
const CARD_ROW = 'flex flex-wrap items-start content-start self-stretch gap-8 p-6 rounded-2xl'

/** Scale module 1900. The heading level changes per section on Scale. */
function Title({ overtitle, title, subtitle, as: As, className }: Heading & { as: 'h2' | 'h3'; className?: string }) {
  return (
    <div className={cn('flex flex-col justify-center mb-10 md:mb-20 md:mt-12 items-center mx-auto max-w-3xl text-center', className)}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="text-xs leading-6 tracking-[1px] mb-5 uppercase font-geist-mono text-[#525252]">
            <span>{overtitle}</span>
          </div>
          <As className="font-aeonik leading-snug lg:leading-[1.25] text-3xl md:text-4.5xl lg:text-5xl [text-wrap:balance] text-black">{title}</As>
        </div>
        <p className="mt-4 lg:mt-2 leading-[1.60] lg:text-xl [text-wrap:balance] [white-space:inherit] block font-normal w-full text-black/70">{subtitle}</p>
      </div>
    </div>
  )
}

function FoundationCard({ icon, label }: { icon: FoundationIconName; label: string }) {
  return (
    <div className={CARD}>
      <figure className="relative flex items-center justify-center rounded-lg select-none w-11 h-11">
        <div className="relative w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {FOUNDATION_ICONS[icon].map((p, i) => (
              <path key={i} fillRule={'fill-rule' in p ? (p['fill-rule'] as 'evenodd') : undefined} clipRule={'clip-rule' in p ? (p['clip-rule'] as 'evenodd') : undefined} d={p.d} fill={p.fill} />
            ))}
          </svg>
        </div>
      </figure>
      <p className="self-stretch text-2xl font-normal leading-8 text-center text-black font-aeonik">{label}</p>
    </div>
  )
}

function iconNode(name: FeatureIconName) {
  const [base, ...shapes] = FEATURE_ICONS[name]
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d={base} />
      {shapes.map((shape, i) => (
        <path key={i} d={shape} />
      ))}
    </svg>
  )
}

const withIcons = (features: Feature[]) => features.map((f) => ({ title: f.title, subtitle: f.subtitle, iconNode: iconNode(f.icon) }))

export function DonovanPage({ content: c }: { content: DonovanContent }) {
  const mocks = [AgentFactoryMock, TestEvaluateMock, AgentArsenalMock]
  return (
    <div className="overflow-x-hidden">
      <PageThemeSetter theme="light" />
      {/* Scale module 478135, non-globe branch. */}
      <div className="pb-10! pt-24!">
        <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} cta={c.hero.cta} backdropColor={c.hero.backdrop} image={c.hero.image} startPercentage={0} sectionClassName={MEDIA} />
      </div>

      <section className="py-18 lg:py-20 bg-transparent !py-12">
        <div className={CONTAINER}>
          <LogoCloud logos={c.logos} />
        </div>
      </section>

      <section className="py-18 lg:py-20 bg-transparent py-8">
        <div className={CONTAINER}>
          <Title as="h3" overtitle={c.overview.overtitle} title={c.overview.title} subtitle={c.overview.subtitle} />
          <div className="grid grid-cols-1 gap-6 mt-2 md:grid-cols-2 lg:grid-cols-3">
            {c.overview.cards.map((card, i) => {
              const Mock = mocks[i]
              return (
                <div key={card.title}>
                  <Mock {...card.mock} />
                  <p className="mt-8 text-2xl text-black lg:mt-10 font-aeonik">{card.title}</p>
                  <p className="mt-3 text-base text-black/70">{card.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        <section className="py-18 lg:py-20 bg-transparent py-8">
          <div className={CONTAINER}>
            <Title as="h2" overtitle={c.foundation.overtitle} title={c.foundation.title} subtitle={c.foundation.subtitle} />
            <div className="flex flex-col items-center gap-6 mb-24">
              <div className={CARD_ROW}>
                {c.foundation.top.map((card) => (
                  <FoundationCard key={card.label} {...card} />
                ))}
              </div>
              <svg width="687" height="36" viewBox="0 0 687 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.45">
                  <path d="M0.527344 35.1703C0.527344 22.8684 10.5 12.8958 22.8018 12.8958H330.542C337.664 12.8958 343.437 7.12213 343.437 0" stroke="#959595" strokeWidth="1.05511" />
                  <path d="M686.348 35.1703C686.348 22.8684 676.375 12.8958 664.073 12.8958H356.333C349.211 12.8958 343.438 7.12213 343.438 0" stroke="#959595" strokeWidth="1.05511" />
                </g>
              </svg>
              <div className={CARD_ROW}>
                {c.foundation.bottom.map((card) => (
                  <FoundationCard key={card.label} {...card} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="py-18 lg:py-20 bg-transparent py-8">
        <div className={CONTAINER}>
          <TabsWithImages tabs={c.tabs} />
        </div>
      </section>

      <section className="py-18 lg:py-20 bg-transparent !py-12">
        <div className={CONTAINER}>
          <Title as="h3" overtitle={c.overmatch.overtitle} title={c.overmatch.title} subtitle={c.overmatch.subtitle} className="!mb-10" />
          <FeaturesWithIcons features={withIcons(c.overmatch.features)} featuresIconColor="white" columns="3" />
        </div>
      </section>

      <section className="py-18 lg:py-20 bg-transparent py-8">
        <div className={CONTAINER}>
          <Title as="h3" overtitle={c.trusted.overtitle} title={c.trusted.title} subtitle={c.trusted.subtitle} className="!mb-10" />
          <FeaturesWithIcons features={withIcons(c.trusted.features)} featuresIconColor="white" columns="3" />
        </div>
      </section>

      <div className="pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} secondaryCta={c.prefooter.secondaryCta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} sectionClassName={MEDIA} />
      </div>
    </div>
  )
}
