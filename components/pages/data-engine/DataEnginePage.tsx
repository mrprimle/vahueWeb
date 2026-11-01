import Image from 'next/image'
import { ClientTestimonials } from '@/components/site/shared/ClientTestimonials'
import { FlatCta } from '@/components/site/shared/FlatCta'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import { BuildAiSection } from './BuildAiSection'
import { CheckIcon, CornerIcon, LogoBox, SectionTitle } from './primitives'
import { ResourcesCarousel } from './ResourcesCarousel'
import type { DataEngineContent } from './types'

const ICONS: Record<DataEngineContent['types']['cards'][number]['icon'], { base: string; d: string }> = {
  text: { base: 'M0 0h24v24H0z', d: 'M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z' },
  image: { base: 'M0 0h24v24H0V0z', d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86-3 3.87L9 13.14 6 17h12l-3.86-5.14z' },
  video: { base: 'M0 0h24v24H0V0z', d: 'M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z' },
  cube: { base: 'M0 0h24v24H0z', d: 'M3 4c0-.55.45-1 1-1h2V1H4C2.34 1 1 2.34 1 4v2h2V4zM3 20v-2H1v2c0 1.66 1.34 3 3 3h2v-2H4c-.55 0-1-.45-1-1zM20 1h-2v2h2c.55 0 1 .45 1 1v2h2V4c0-1.66-1.34-3-3-3zM21 20c0 .55-.45 1-1 1h-2v2h2c1.66 0 3-1.34 3-3v-2h-2v2zM19 14.87V9.13c0-.72-.38-1.38-1-1.73l-5-2.88c-.31-.18-.65-.27-1-.27s-.69.09-1 .27L6 7.39c-.62.36-1 1.02-1 1.74v5.74c0 .72.38 1.38 1 1.73l5 2.88c.31.18.65.27 1 .27s.69-.09 1-.27l5-2.88c.62-.35 1-1.01 1-1.73zm-8 2.3-4-2.3v-4.63l4 2.33v4.6zm1-6.33L8.04 8.53 12 6.25l3.96 2.28L12 10.84zm5 4.03-4 2.3v-4.6l4-2.33v4.63z' },
}

const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'

export function DataEnginePage({ content: c }: { content: DataEngineContent }) {
  return (
    <div className="overflow-x-hidden">
      <PageThemeSetter theme="light" />
      {/* Scale module 478135, non-globe branch. */}
      <div className="pb-10! pt-24!">
        <FullBleedMediaSection
          headline={c.hero.headline}
          body={c.hero.body}
          cta={c.hero.cta}
          backdropColor={c.hero.backdrop}
          image={c.hero.image}
          startPercentage={0}
          sectionClassName={HERO_MEDIA}
        />
      </div>

      <section className="pt-10 pb-14 md:pt-10 md:pb-20">
        <div className="mx-auto w-full ps-6 pe-6">
          <div className="w-full overflow-x-auto">
            <ul className="flex min-w-max items-center justify-around gap-12 md:min-w-0 md:gap-10">
              {c.logos.map((logo) => (
                <li key={logo.key} className="flex shrink-0 items-center justify-center">
                  <LogoBox logo={logo} className="brightness-0" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="mx-auto w-full ps-6 pe-6">
          <div className="rounded-2xl bg-scale-gray-95 p-6 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(560px,1.05fr)] lg:items-stretch">
              <div className="flex flex-col justify-between gap-10">
                <div className="max-w-[460px]">
                  <h2 className="header3-regular text-scale-gray-10">{c.best.title}</h2>
                  <p className="body2-regular mt-4 text-scale-gray-30">{c.best.body}</p>
                </div>
                <div className="flex min-h-[360px] items-center justify-center lg:min-h-[560px]">
                  <Image src={c.best.image.src} alt={c.best.image.alt} width={c.best.image.width} height={c.best.image.height} className="h-auto w-full max-w-[760px] object-contain" />
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
                {c.best.cards.map((card) => (
                  <article key={card.title} className="flex min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-white p-6 md:p-8">
                    <div className="flex items-start justify-between gap-6">
                      <h3 className="header5-regular text-scale-gray-10">{card.title}</h3>
                      <div className={`${card.iconClass} h-[17px] w-[17px] shrink-0`}>
                        <CornerIcon />
                      </div>
                    </div>
                    <p className="body2-regular text-scale-gray-30">{card.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scale module 554920. */}
      <section className="pb-14 md:pb-20">
        <div className="mx-auto w-full ps-6 pe-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.15fr)]">
            <div className={`relative min-h-[280px] overflow-hidden rounded-2xl md:min-h-[420px] ${c.caseStudy.tileClass}`}>
              <div className="flex h-full min-h-[280px] items-center justify-center p-10 md:min-h-[420px]">
                <LogoBox logo={c.caseStudy.logo} className="brightness-0 invert" styleHeightAuto />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-12 p-6 md:p-10 lg:p-12">
              <div>
                <p className="detail-mono text-scale-gray-30">{c.caseStudy.overtitle}</p>
                <h3 className="header3-regular mt-4 text-scale-gray-10">{c.caseStudy.description}</h3>
              </div>
              <FlatCta href={c.caseStudy.cta.url} text={c.caseStudy.cta.text} theme="black" />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-scale-gray-95">
        <section className="py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
            <BuildAiSection content={c.buildAi} />
          </div>
        </section>

        <section className="pb-14 md:pb-20">
          <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
            <SectionTitle overtitle={c.whatIs.overtitle} title={c.whatIs.title} subtitle={c.whatIs.subtitle} className="!mt-0 !mb-10" />
            <div className="mx-auto mt-12 max-w-[1216px]">
              <div className="mx-auto max-w-[980px]">
                <Image src={c.whatIs.image.src} alt={c.whatIs.image.alt} width={c.whatIs.image.width} height={c.whatIs.image.height} className="h-auto w-full" />
              </div>
              <div className="mt-12">
                <p className="detail-mono text-center text-scale-gray-30">{c.whatIs.label}</p>
                <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                  {c.whatIs.items.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-scale-gray-10" />
                      <div>
                        <h3 className="header5-regular text-scale-gray-10">{item.title}</h3>
                        <p className="body2-regular mt-3 text-scale-gray-30">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-14 md:pb-20">
          <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
            <SectionTitle overtitle={c.types.overtitle} title={c.types.title} className="!mt-0 !mb-10" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {c.types.cards.map((card) => (
                <article key={card.title} className="flex min-h-[320px] flex-col rounded-xl bg-white p-6 md:p-8">
                  <div className="min-h-[136px]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-scale-gray-95 text-scale-gray-10">
                      <span className="flex h-6 w-6 items-center justify-center">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
                          <path fill="none" d={ICONS[card.icon].base} />
                          <path d={ICONS[card.icon].d} />
                        </svg>
                      </span>
                    </div>
                    <h3 className="header5-regular mt-8 text-scale-gray-10">{card.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 body2-regular text-scale-gray-30">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-scale-gray-10" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-14 md:pb-20">
          <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
            <SectionTitle overtitle={c.resources.overtitle} title={c.resources.title} className="!mt-0 !mb-10" />
            <ResourcesCarousel items={c.resources.items} />
          </div>
        </section>

        <ClientTestimonials heading={c.testimonials.heading} testimonials={c.testimonials.items} backdropColor={c.testimonials.backdrop} />

        <div className="pb-14 md:pb-20">
          <FullBleedMediaSection
            headline={c.prefooter.headline}
            cta={c.prefooter.cta}
            secondaryCta={c.prefooter.secondaryCta}
            backdropColor={c.prefooter.backdrop}
            image={c.prefooter.image}
          />
        </div>
      </div>
    </div>
  )
}
