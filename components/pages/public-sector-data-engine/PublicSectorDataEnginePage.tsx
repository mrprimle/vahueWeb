import { VideoGallery } from '@/components/pages/generative-ai-data-engine/VideoGallery'
import { ChecklistWithMedia } from '@/components/site/shared/ChecklistWithMedia'
import { ClientTestimonials } from '@/components/site/shared/ClientTestimonials'
import { FeaturesWithIcons } from '@/components/site/shared/FeaturesWithIcons'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { LogoCloud } from '@/components/site/shared/LogoCloud'
import { ResourcesCarousel } from '@/components/site/shared/ResourcesCarousel'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import type { FeatureIcon, PublicSectorContent } from './types'

const SECTION = 'py-18 lg:py-20 bg-transparent !pt-8 !pb-10 md:!pt-10'
const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'

const ICONS: Record<FeatureIcon, { base: string; d: string }> = {
  monitor: { base: 'M0 0h24v24H0z', d: 'M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z' },
  sparkle: { base: 'M0 0h24v24H0z', d: 'm19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25zM11.5 9.5 9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zm-1.51 3.49L9 15.17l-.99-2.18L5.83 12l2.18-.99L9 8.83l.99 2.18 2.18.99-2.18.99z' },
  trend: { base: 'M0 0h24v24H0V0z', d: 'm3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z' },
}

function Icon({ name }: { name: FeatureIcon }) {
  const icon = ICONS[name]
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d={icon.base} />
      <path d={icon.d} />
    </svg>
  )
}

export function PublicSectorDataEnginePage({ content: c }: { content: PublicSectorContent }) {
  return (
    <div className="overflow-x-hidden">
      <PageThemeSetter theme="light" />
      {/* Scale module 478135, non-globe branch. */}
      <div className="pb-10! pt-24!">
        <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} cta={c.hero.cta} backdropColor={c.hero.backdrop} image={c.hero.image} startPercentage={0} sectionClassName={HERO_MEDIA} />
      </div>

      <section className={SECTION}>
        <div className="container relative">
          <LogoCloud logos={c.logos.items} copy={c.logos.copy} link={c.logos.link} />
        </div>
      </section>

      <section className={SECTION}>
        <div className="container relative">
          <SectionTitle overtitle={c.overview.overtitle} title={c.overview.title} subtitle={c.overview.subtitle} className="!mb-10" />
          <FeaturesWithIcons columns="3" featuresIconColor="white" features={c.overview.items.map((f) => ({ title: f.title, subtitle: f.subtitle, iconNode: <Icon name={f.icon} /> }))} />
        </div>
      </section>

      <section className={SECTION}>
        <div className="container relative">
          <SectionTitle overtitle={c.why.overtitle} title={c.why.title} subtitle={c.why.subtitle} className="!mb-10" />
          <ChecklistWithMedia features={c.why.items} image={c.why.image} mediaPosition="right" />
        </div>
      </section>

      <div className="!pt-8 !pb-10 md:!pt-10">
        <ClientTestimonials heading={c.testimonials.heading} testimonials={c.testimonials.items} backdropColor={c.testimonials.backdrop} />
      </div>

      <section className={SECTION}>
        <div className="container relative">
          <SectionTitle overtitle={c.demos.overtitle} title={c.demos.title} className="!mb-10" inheritColor />
          <VideoGallery videos={c.demos.videos} />
        </div>
      </section>

      <section className={SECTION}>
        <div className="relative">
          <div className="container">
            <SectionTitle overtitle={c.resources.overtitle} title={c.resources.title} className="!mb-10" />
          </div>
          <ResourcesCarousel items={c.resources.items} className="pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]" description={false} />
        </div>
      </section>

      <div className="mt-16! pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
      </div>
    </div>
  )
}
