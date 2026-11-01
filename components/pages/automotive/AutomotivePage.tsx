import Image from 'next/image'
import Link from 'next/link'
import { ChecklistWithMedia } from '@/components/site/shared/ChecklistWithMedia'
import { FeaturesWithIcons } from '@/components/site/shared/FeaturesWithIcons'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { LogoCloud } from '@/components/site/shared/LogoCloud'
import { ResourcesCarousel } from '@/components/site/shared/ResourcesCarousel'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import { DataTabs } from './DataTabs'
import { PhaseFeatures } from './PhaseFeatures'
import type { AutomotiveContent, IconFeature } from './types'

const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'

const ICONS: Record<IconFeature['icon'], { base: string; d: string[] }> = {
  flame: { base: 'M0 0h24v24H0V0z', d: ['M11.57 13.16c-1.36.28-2.17 1.16-2.17 2.41 0 1.34 1.11 2.42 2.49 2.42 2.05 0 3.71-1.66 3.71-3.71 0-1.07-.15-2.12-.46-3.12-.79 1.07-2.2 1.72-3.57 2zM13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM12 20c-3.31 0-6-2.69-6-6 0-1.53.3-3.04.86-4.43a5.582 5.582 0 0 0 3.97 1.63c2.66 0 4.75-1.83 5.28-4.43A14.77 14.77 0 0 1 18 14c0 3.31-2.69 6-6 6z'] },
  gauge: { base: 'M0 0h24v24H0z', d: ['m20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44z', 'M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z'] },
  bolt: { base: 'M0 0h24v24H0z', d: ['M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z'] },
}

function Icon({ name }: { name: IconFeature['icon'] }) {
  const icon = ICONS[name]
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d={icon.base} />
      {icon.d.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export function AutomotivePage({ content: c }: { content: AutomotiveContent }) {
  return (
    <div className="overflow-x-hidden">
      <PageThemeSetter theme="light" />
      {/* Scale module 478135, non-globe branch: `startPercentage` 0. */}
      <div className="pb-10! pt-24!">
        <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} cta={c.hero.cta} backdropColor={c.hero.backdrop} image={c.hero.image} startPercentage={0} sectionClassName={HERO_MEDIA} />
      </div>

      <section className="py-10 md:py-14">
        <div className="w-full">
          <LogoCloud logos={c.logos} />
        </div>
      </section>

      <section className="container py-16">
        <SectionTitle overtitle="" title={c.overview.title} subtitle={c.overview.subtitle} />
        <ChecklistWithMedia features={c.overview.features} image={c.overview.image} />
      </section>

      <section className="container py-16">
        <SectionTitle overtitle={c.stack.overtitle} title={c.stack.title} />
        <DataTabs tabs={c.stack.tabs} className="mt-10" />
      </section>

      <section className="container py-16">
        <SectionTitle overtitle="" title={c.phases.title} subtitle={c.phases.subtitle} />
        <div className="mt-10">
          <PhaseFeatures items={c.phases.items} />
        </div>
      </section>

      <section className="container py-16">
        <SectionTitle overtitle={c.why.overtitle} title={c.why.title} subtitle={c.why.subtitle} />
        <div className="mt-10">
          <FeaturesWithIcons columns="3" features={c.why.features.map((f) => ({ iconNode: <Icon name={f.icon} />, title: f.title, subtitle: f.subtitle }))} />
        </div>
      </section>

      <section className="relative py-16">
        <div className="container">
          <SectionTitle overtitle={c.resources.overtitle} title={c.resources.title} />
        </div>
        <div className="mt-10">
          <ResourcesCarousel className="pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]" items={c.resources.items} />
        </div>
      </section>

      <section className="container py-16">
        <SectionTitle overtitle="" title={c.foundation.title} />
        <div className="flex flex-col items-center gap-16 mt-12 md:flex-row">
          <div className="flex flex-col w-full gap-4 md:w-1/2">
            <p className="text-xs leading-6 tracking-[1px] uppercase font-geist-mono">{c.foundation.overtitle}</p>
            <h2 className="text-3xl text-black lg:text-4xl font-aeonik">{c.foundation.heading}</h2>
            <p className="text-zinc-400">{c.foundation.body}</p>
            <Link href={c.foundation.link.href} className="mt-2 text-black transition-colors hover:text-gray-600">
              {c.foundation.link.text}
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <Image src={c.foundation.image.src} alt={c.foundation.image.alt} width={c.foundation.image.width} height={c.foundation.image.height} className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </section>

      <div className="mt-16! pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} secondaryCta={c.prefooter.secondaryCta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
      </div>
    </div>
  )
}
