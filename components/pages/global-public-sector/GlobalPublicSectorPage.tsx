'use client'

// The page body as Scale's route renders it (RSC payload): 243385, 478135 (non-globe hero), 497052, 927726 > 540409, 763867 > 685963, 540409, 297990, 482270, 623453, 540431.
import { VideoGallery } from '@/components/pages/generative-ai-data-engine/VideoGallery'
import { AlternatingImageRows } from '@/components/site/shared/AlternatingImageRows'
import { CardGrid, type CardData } from '@/components/site/shared/CardGrid'
import { ClientTestimonials } from '@/components/site/shared/ClientTestimonials'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { GlowBackground } from '@/components/site/shared/GlowBackground'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import Image from 'next/image'
import { Fragment, useMemo } from 'react'
import { ICONS, type GpsIcon } from './icons'
import { SolutionsGrid } from './SolutionsGrid'
import type { GlobalPublicSectorContent } from './types'
import { UseCaseTabs } from './UseCaseTabs'

const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'
const CONTAINER = 'mx-auto w-full max-w-[1472px] ps-6 pe-6'
const OVERTITLE = 'text-xs leading-6 tracking-[1px] mb-5 uppercase font-geist-mono text-[#525252]'
const HEADING = 'font-aeonik leading-snug lg:leading-[1.25] text-3xl md:text-4.5xl lg:text-5xl [text-wrap:balance] text-black'
const SUBTITLE = 'mt-4 lg:mt-2 leading-[1.60] lg:text-xl [text-wrap:balance] [white-space:inherit] block font-normal'
const TITLE_BLOCK = 'flex flex-col justify-center mb-10 md:mb-20 md:mt-12'
// Module 763867's styled-jsx rule, plus 96% on the label: DM Mono (stack.md) is narrower than Aeonik Mono and would wrap it one line earlier than Scale.
const TESTIMONIAL_CSS =
  '@media (width<=1023px){.global-public-sector-testimonial .ClientTestimonials [role=tabpanel]>div>div:first-child{max-height:none!important;overflow-y:visible!important}}@media (width>=1024px){.global-public-sector-testimonial [role=tablist]>p{max-width:96%}}'

function makeIcon(name: GpsIcon) {
  const [base, ...rest] = ICONS[name]
  return function GpsIconGlyph({ size, className }: { size?: number; className?: string }) {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={className} height={size} width={size} xmlns="http://www.w3.org/2000/svg">
        <path fill="none" d={base} />
        {rest.map((d) => (
          <path d={d} key={d} />
        ))}
      </svg>
    )
  }
}

// Stable identities: CardGrid re-runs its reveal setup when `cards` changes.
const GLYPHS = Object.fromEntries((Object.keys(ICONS) as GpsIcon[]).map((name) => [name, makeIcon(name)])) as Record<GpsIcon, ReturnType<typeof makeIcon>>

export function GlobalPublicSectorPage({ content: c }: { content: GlobalPublicSectorContent }) {
  const deliverCards = useMemo<CardData[]>(() => c.delivers.cards.map((card) => ({ _type: 'card', _key: card.key, icon: GLYPHS[card.icon], title: card.title, description: card.description })), [c.delivers.cards])
  const statCards = useMemo<CardData[]>(() => c.stats.map((card) => ({ _type: 'card', _key: card.key, icon: GLYPHS[card.icon], label: card.label, description: card.description })), [c.stats])
  return (
    <div className="overflow-x-hidden">
      <PageThemeSetter theme="light" />
      <div className="pb-10! pt-24!">
        <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} cta={c.hero.cta} backdropColor={c.hero.backdrop} image={c.hero.image} startPercentage={0} sectionClassName={HERO_MEDIA} />
      </div>

      <section className="py-24">
        <div className={CONTAINER}>
          <div className={`${TITLE_BLOCK} md:items-start md:text-left text-center !mb-0`}>
            <div className="flex flex-col w-full md:flex-row md:items-end md:gap-6">
              <div className="flex flex-col md:flex-1">
                <div className={OVERTITLE}>
                  <span>{c.trusted.overtitle}</span>
                </div>
                <h3 className={HEADING}>{c.trusted.title}</h3>
              </div>
              <p className={`${SUBTITLE} md:mt-0 md:flex-1 md:self-end text-black/70`}>{c.trusted.subtitle}</p>
            </div>
          </div>
          <div className="p-16 pt-0 bg-cloud-slate md:pt-16 md:pb-32 md:pr-36 md:pl-36 rounded-3xl mt-36">
            <AlternatingImageRows
              items={[{ title: c.trusted.row.title, description: c.trusted.row.description, textSide: 'left', image: { ...c.trusted.row.image, plain: true } }]}
              headingLevel="h4"
              className="pt-16"
            />
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className={`${CONTAINER} relative z-10`}>
          <div className={`${TITLE_BLOCK} items-center mx-auto max-w-3xl text-center !mb-24 !max-w-[840px] mx-auto`}>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className={OVERTITLE}>
                  <span>{c.foundations.overtitle}</span>
                </div>
                <h3 className={HEADING}>{c.foundations.title}</h3>
              </div>
              <p className={`${SUBTITLE} w-full text-black/70`}>{c.foundations.subtitle}</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-scale-gray-80 flex flex-col sm:flex-row bg-scale-gray-95">
            {c.foundations.columns.map((col, i) => (
              <Fragment key={col.title}>
                {i > 0 ? <div className="shrink-0 bg-scale-gray-80 h-px sm:h-auto sm:w-px" /> : null}
                <div className="flex flex-col flex-1 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image alt={col.image.alt} src={col.image.src} width={800} height={500} className="w-full h-auto scale-[1.4] origin-top-left invert" unoptimized />
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-scale-gray-95 to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-scale-gray-95 to-transparent pointer-events-none" />
                  </div>
                  <div className="flex flex-col gap-2 p-6">
                    <h4 className="header5-regular text-scale-gray-10">{col.title}</h4>
                    <p className="body2-regular text-scale-gray-30">{col.description}</p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <GlowBackground className="absolute inset-0 z-0 opacity-25" />
      </section>

      <section className="py-20">
        <div className={CONTAINER}>
          <div className={`${TITLE_BLOCK} items-center mx-auto max-w-3xl text-center !max-w-[730px] !mb-0`}>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className={OVERTITLE}>
                  <span>{c.delivers.overtitle}</span>
                </div>
                <h3 className={HEADING}>{c.delivers.title}</h3>
              </div>
            </div>
          </div>
          <CardGrid cards={deliverCards} theme="light" animationDirection="up" columns={3} />
        </div>
      </section>

      <div className="global-public-sector-testimonial">
        <ClientTestimonials
          backdropColor={c.hero.backdrop}
          heading={c.testimonial.heading}
          testimonials={[{ clientName: c.testimonial.clientName, title: c.testimonial.title, testimonial: c.testimonial.quote, nameTile: true }]}
        />
        <style>{TESTIMONIAL_CSS}</style>
      </div>

      <div className="bg-white py-12 md:py-20 grid-layout-mobile md:grid-layout-desktop">
        <div className="col-span-full md:col-start-2 md:col-span-10 xl:col-start-3 xl:col-span-8">
          <CardGrid cards={statCards} theme="light" iconSize="sm" fluidLayout animationDirection="up" />
        </div>
      </div>

      <SolutionsGrid content={c.solutions} />

      <section className="py-12">
        <div className={CONTAINER}>
          <div>
            <div className="bg-white/10 p-4 z-10 relative lg:items-center rounded-2xl overflow-hidden md:overflow-visible">
              <VideoGallery videos={[c.video]} />
            </div>
          </div>
        </div>
      </section>

      <UseCaseTabs content={c.useCases} />

      <div className="pt-16! pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
      </div>
    </div>
  )
}
