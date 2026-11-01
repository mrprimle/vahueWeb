'use client'

// The page body as Scale's route renders it (RSC payload): 243385, 478135 (non-globe hero), 970272, 450359, 872447 with 51051, 460138, the box-asset-light block, 382790, 540431.
import Image from 'next/image'
import { ChecklistWithMedia } from '@/components/site/shared/ChecklistWithMedia'
import { Features } from '@/components/site/shared/Features'
import { FeaturesWithIcons } from '@/components/site/shared/FeaturesWithIcons'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { GlowBackground } from '@/components/site/shared/GlowBackground'
import { LogoCloud } from '@/components/site/shared/LogoCloud'
import { NewButtonLink } from '@/components/site/shared/NewButtonLink'
import { ResourcesCarousel } from '@/components/site/shared/ResourcesCarousel'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { WHY_ICONS } from './icons'
import type { ButtonLink, PublicSectorContent } from './types'

const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'
const SECTION = 'py-18 lg:py-20 bg-transparent !py-12'
const GLOW_SECTION = 'relative py-12 overflow-hidden'
const GLOW = 'absolute inset-0 z-0 opacity-25'

/** Module 51051 (CTAs) with one button: glass, theme light. */
function Cta({ cta }: { cta: ButtonLink }) {
  return (
    <div className="flex items-center flex-wrap">
      <NewButtonLink href={cta.href} color="glass" theme="light">
        {cta.text}
      </NewButtonLink>
    </div>
  )
}

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

export function PublicSectorPage({ content: c }: { content: PublicSectorContent }) {
  return (
    <div className="overflow-x-hidden">
      <PageThemeSetter theme="light" />
      <div className="pb-10! pt-24!">
        <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} cta={c.hero.cta} backdropColor={c.hero.backdrop} image={c.hero.image} startPercentage={0} sectionClassName={HERO_MEDIA} />
      </div>

      <section className={SECTION}>
        <div className="container relative">
          <LogoCloud logos={c.logos.items} />
        </div>
      </section>

      <section className={GLOW_SECTION}>
        <div className="container relative z-10">
          <SectionTitle as="h3" overtitle={c.useCases.overtitle} title={c.useCases.title} subtitle={c.useCases.subtitle} />
          <Features features={c.useCases.features} />
        </div>
        <GlowBackground className={GLOW} />
      </section>

      <section className={GLOW_SECTION}>
        <div className="container relative z-10">
          <SectionTitle as="h3" className="!mb-12" overtitle={c.capabilities.overtitle} title={c.capabilities.title} subtitle={c.capabilities.subtitle} />
          {c.capabilities.items.map((item, i) => (
            <ChecklistWithMedia key={item.title} title={item.title} features={item.features} image={item.image} mediaPosition={i === 0 ? 'left' : 'right'} dividers={false} className={i === 0 ? 'mb-16' : undefined}>
              <Cta cta={item.cta} />
            </ChecklistWithMedia>
          ))}
        </div>
        <GlowBackground className={GLOW} />
      </section>

      <section className={SECTION}>
        <div className="container relative">
          <SectionTitle as="h3" className="!mb-10" overtitle={c.why.overtitle} title={c.why.title} subtitle={c.why.subtitle} />
          <FeaturesWithIcons columns="3" featuresIconColor="white" features={c.why.items.map((f) => ({ title: f.title, subtitle: f.subtitle, iconNode: <Icon paths={WHY_ICONS[f.icon]} size={22} /> }))} />
        </div>
      </section>

      <section className={SECTION}>
        <div className="container relative">
          <div>
            <div className="max-w-[440px] mx-auto lg:max-w-none lg:h-[440px] flex items-center bg-black/10 px-10 py-0 z-10 relative lg:items-center rounded-2xl overflow-hidden md:overflow-visible">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
                <div className="flex flex-col gap-6 lg:w-1/2">
                  <h3 className="text-3xl heading md:text-4xl text-balance">{c.callout.title}</h3>
                  <p className="text-xl text-black/70">{c.callout.body}</p>
                  <Cta cta={c.callout.cta} />
                </div>
                <div className="lg:w-1/2">
                  <Image alt={c.callout.image.alt} quality={80} src={c.callout.image.src} width={c.callout.image.width} height={c.callout.image.height} className="w-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <div className="relative">
          <div className="container">
            <SectionTitle as="h3" className="!mb-10" overtitle={c.resources.overtitle} title={c.resources.title} />
          </div>
          <ResourcesCarousel items={c.resources.items} description className="pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]" />
        </div>
      </section>

      <div className="pt-16! pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} secondaryCta={c.prefooter.secondaryCta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
      </div>
    </div>
  )
}
