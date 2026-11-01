import Image from 'next/image'
import type { ReactNode } from 'react'
import { ClientTestimonials } from '@/components/site/shared/ClientTestimonials'
import { FeaturesWithIcons } from '@/components/site/shared/FeaturesWithIcons'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { GlowBackground } from '@/components/site/shared/GlowBackground'
import { LogoCloud } from '@/components/site/shared/LogoCloud'
import { ResourcesCarousel } from '@/components/site/shared/ResourcesCarousel'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import type { FeatureIcon, GenAiContent } from './types'
import { VideoGallery } from './VideoGallery'

const SECTION = 'py-18 lg:py-20 bg-transparent !pt-8 !pb-10 md:!pt-10'
const INNER = 'mx-auto w-full max-w-[1472px] ps-6 pe-6 relative'
const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'

const ICONS: Record<FeatureIcon, { base: string; d: string[] }> = {
  gauge: { base: 'M0 0h24v24H0z', d: ['m20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44z', 'M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z'] },
  hub: { base: 'M0 0h24v24H0z', d: ['M21 6.5a2.996 2.996 0 0 0-2.99 3.21l-2.03.68a4.468 4.468 0 0 0-3.22-2.32V5.91A3.018 3.018 0 0 0 15 3c0-1.66-1.34-3-3-3S9 1.34 9 3c0 1.4.96 2.57 2.25 2.91v2.16c-1.4.23-2.58 1.11-3.22 2.32l-2.04-.68C6 9.64 6 9.57 6 9.5c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3c1.06 0 1.98-.55 2.52-1.37l2.03.68c-.2 1.29.17 2.66 1.09 3.69l-1.41 1.77C6.85 17.09 6.44 17 6 17c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.68-.22-1.3-.6-1.8l1.41-1.77c1.36.76 3.02.75 4.37 0l1.41 1.77c-.37.5-.59 1.12-.59 1.8 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.44 0-.85.09-1.23.26l-1.41-1.77a4.49 4.49 0 0 0 1.09-3.69l2.03-.68c.53.82 1.46 1.37 2.52 1.37 1.66 0 3-1.34 3-3S22.66 6.5 21 6.5zm-18 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM6 21c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-18c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm1 12a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zm6 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm3-8.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z'] },
  trend: { base: 'M0 0h24v24H0V0z', d: ['m3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z'] },
  bolt: { base: 'M0 0h24v24H0z', d: ['M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z'] },
  microscope: { base: 'M0 0h24v24H0z', d: ['M7 19c-1.1 0-2 .9-2 2h14c0-1.1-.9-2-2-2h-4v-2h3c1.1 0 2-.9 2-2h-8c-1.66 0-3-1.34-3-3a3 3 0 0 1 1.47-2.57c.41.59 1.06 1 1.83 1.06.7.06 1.36-.19 1.85-.62l.59 1.61.94-.34.34.94 1.88-.68-.34-.94.94-.34-2.74-7.52-.94.34-.34-.94-1.88.68.34.94-.94.35.56 1.55c-1.17-.04-2.19.75-2.48 1.86A5.01 5.01 0 0 0 5 12c0 2.76 2.24 5 5 5v2H7zm5.86-14.48 1.71 4.7-.94.34-1.71-4.7.94-.34zM10.5 7c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z'] },
  handshake: { base: 'M0 0h24v24H0z', d: ['M12.22 19.85c-.18.18-.5.21-.71 0a.504.504 0 0 1 0-.71l3.39-3.39-1.41-1.41-3.39 3.39c-.19.2-.51.19-.71 0a.504.504 0 0 1 0-.71l3.39-3.39-1.41-1.41-3.39 3.39c-.18.18-.5.21-.71 0a.513.513 0 0 1 0-.71l3.39-3.39-1.42-1.41-3.39 3.39c-.18.18-.5.21-.71 0a.513.513 0 0 1 0-.71L9.52 8.4l1.87 1.86c.95.95 2.59.94 3.54 0 .98-.98.98-2.56 0-3.54l-1.86-1.86.28-.28c.78-.78 2.05-.78 2.83 0l4.24 4.24c.78.78.78 2.05 0 2.83l-8.2 8.2zm9.61-6.78a4.008 4.008 0 0 0 0-5.66l-4.24-4.24a4.008 4.008 0 0 0-5.66 0l-.28.28-.28-.28a4.008 4.008 0 0 0-5.66 0L2.17 6.71a3.992 3.992 0 0 0-.4 5.19l1.45-1.45a2 2 0 0 1 .37-2.33l3.54-3.54c.78-.78 2.05-.78 2.83 0l3.56 3.56c.18.18.21.5 0 .71-.21.21-.53.18-.71 0L9.52 5.57l-5.8 5.79c-.98.97-.98 2.56 0 3.54.39.39.89.63 1.42.7a2.458 2.458 0 0 0 2.12 2.12 2.458 2.458 0 0 0 2.12 2.12c.07.54.31 1.03.7 1.42.47.47 1.1.73 1.77.73.67 0 1.3-.26 1.77-.73l8.21-8.19z'] },
}

function Icon({ name }: { name: FeatureIcon }): ReactNode {
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

/** Scale's `box-asset-dark` wrapper around a bare image. */
function Box({ padding, children }: { padding: 'p-0' | 'p-1'; children: ReactNode }) {
  return (
    <div>
      <div className={`bg-white/10 ${padding} z-10 relative lg:items-center rounded-2xl overflow-hidden md:overflow-visible`}>{children}</div>
    </div>
  )
}

export function GenAiDataEnginePage({ content: c }: { content: GenAiContent }) {
  return (
    <div className="overflow-x-hidden">
      <PageThemeSetter theme="light" />
      {/* Scale module 478135, non-globe branch. */}
      <div className="pb-10! pt-24!">
        <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} cta={c.hero.cta} backdropColor={c.hero.backdrop} image={c.hero.image} startPercentage={0} sectionClassName={HERO_MEDIA} />
      </div>

      <section className={SECTION}>
        <div className={INNER}>
          <LogoCloud logos={c.logos.items} copy={c.logos.copy} link={c.logos.link} />
        </div>
      </section>

      <section className={SECTION}>
        <div className={INNER}>
          <SectionTitle overtitle={c.overview.overtitle} title={c.overview.title} subtitle={c.overview.subtitle} className="!mb-10" />
        </div>
      </section>

      <section className={SECTION}>
        <div className={INNER}>
          <div className="flex flex-col gap-24">
            <Box padding="p-0">
              <Image src={c.overview.image.src} alt={c.overview.image.alt} width={c.overview.image.width} height={c.overview.image.height} className="w-full" />
            </Box>
          </div>
        </div>
      </section>

      <div>
        <ClientTestimonials heading={c.testimonials.heading} testimonials={c.testimonials.items} backdropColor={c.testimonials.backdrop} colorTheme={c.testimonials.colorTheme} />
      </div>

      <section className={SECTION}>
        <div className={INNER}>
          <div className="flex flex-col gap-24">
            <div className="relative grid items-center grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <GlowBackground className="absolute inset-0" variant={null} />
              <h3 className="relative text-xl font-medium leading-relaxed text-black">{c.product.body}</h3>
              <Box padding="p-1">
                <Image src={c.product.image.src} alt={c.product.image.alt} width={c.product.image.width} height={c.product.image.height} sizes="(max-width: 1024px) 100vw, 50vw" className="w-full" />
              </Box>
            </div>
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <div className={INNER}>
          <SectionTitle overtitle={c.build.overtitle} title={c.build.title} subtitle={c.build.subtitle} className="!mb-10" />
          <Box padding="p-0">
            <Image src={c.build.image.src} alt={c.build.image.alt} width={c.build.image.width} height={c.build.image.height} priority sizes="100%" className="w-full" />
          </Box>
        </div>
      </section>

      <section className={SECTION}>
        <div className={INNER}>
          <SectionTitle overtitle={c.features.overtitle} title={c.features.title} subtitle={c.features.subtitle} className="!mb-10" />
          <FeaturesWithIcons features={c.features.items.map((f) => ({ title: f.title, subtitle: f.subtitle, iconNode: <Icon name={f.icon} /> }))} />
        </div>
      </section>

      <section className={SECTION}>
        <div className={INNER}>
          <SectionTitle overtitle={c.demos.overtitle} title={c.demos.title} className="!mb-10" />
          <VideoGallery videos={c.demos.videos} />
        </div>
      </section>

      <section className={SECTION}>
        <div className={INNER}>
          <SectionTitle overtitle={c.resources.overtitle} title={c.resources.title} subtitle={c.resources.subtitle} className="!mb-10" />
          <ResourcesCarousel items={c.resources.items} />
        </div>
      </section>

      <div className="pt-16! pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
      </div>
    </div>
  )
}
