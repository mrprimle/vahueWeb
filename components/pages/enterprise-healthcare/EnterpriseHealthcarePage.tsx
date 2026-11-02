'use client'

// The page body as Scale's route renders it (RSC payload): 478135 (non-globe hero), 591798, 685963 metrics, 290276, 808358, inline TextImageSplit with 925107, 540431.
import { useMemo } from 'react'
import { BlogPreview } from '@/components/site/shared/BlogPreview'
import { ClientTestimonials } from '@/components/site/shared/ClientTestimonials'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { HeadlineWithCta } from '@/components/site/shared/HeadlineWithCta'
import { LogoTile } from '@/components/site/shared/LogoMarquee'
import { ResponsiveImage } from '@/components/site/shared/ResponsiveImage'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { SgpStack } from '@/components/site/shared/SgpStack'
import { TabbedPanel, type TabbedPanelTab } from '@/components/site/shared/TabbedPanel'
import { cn } from '@/components/site/lib/cn'
import { CustomAgentsMockup } from './CustomAgentsMockup'
import { LayerIllustration } from './LayerIllustration'
import { OrderGuidanceMockup } from './OrderGuidanceMockup'
import { SchedulingMockup } from './SchedulingMockup'
import type { EnterpriseHealthcareContent, Logo } from './types'

const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'
const CLOUD_SLATE = { tailwindClass: 'cloud-slate', hex: '#839CB2', contrastColor: '#010101' }

/** Scale module 964254. A logo without `src` is the neutral tile. */
function CustomerLogo({ logo, maxWidth, maxHeight, width, className, tileClassName }: { logo: Logo; maxWidth: number; maxHeight: number; width?: number; className?: string; tileClassName?: string }) {
  if (!logo.src) return <LogoTile className={tileClassName} />
  const url = `url("${logo.src}")`
  return (
    <div
      className={cn('inline-block h-full', className)}
      style={{ backgroundColor: 'currentColor', WebkitMaskImage: url, maskImage: url, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.src} alt={logo.alt} className="opacity-0 pointer-events-none" style={{ width: width ? `${width}px` : 'auto', height: 'auto', maxWidth, maxHeight }} />
    </div>
  )
}

export function EnterpriseHealthcarePage({ content: c }: { content: EnterpriseHealthcareContent }) {
  const logos = useMemo(() => c.hero.logos.map((l, i) => ({ id: `${l.alt}-${i}`, label: 'Logo', node: l.src ? <CustomerLogo logo={l} maxWidth={70} maxHeight={28} /> : undefined })), [c.hero.logos])
  const w = c.workflows
  const media = [<OrderGuidanceMockup key="order" data={w.orderGuidance} />, <SchedulingMockup key="scheduling" data={w.scheduling} />, <CustomAgentsMockup key="custom" data={w.customAgents} />]
  const tabs: TabbedPanelTab[] = w.tabs.map((t, i) => ({
    _key: t.key,
    label: t.label,
    title: t.title,
    body: [{ text: t.body }],
    ctaText: t.cta.text,
    ctaUrl: t.cta.url,
    indicatorColor: { hex: t.color },
    mediaNode: media[i],
    image: t.image,
  }))
  const t = c.testimonial
  return (
    <div className="relative overflow-x-hidden">
      <style>{'html { scroll-behavior: smooth; }'}</style>
      <PageThemeSetter theme="light" />
      <div className="CMSSliceRenderer relative rootPageRenderer">
        <div className="pb-10! pt-24!">
          <FullBleedMediaSection
            headline={c.hero.headline}
            body={c.hero.body}
            backdropColor={c.hero.backdrop}
            image={c.hero.image}
            imageBackgroundColor={c.hero.imageColor}
            startPercentage={0}
            overlayVariant="gradient"
            logos={{ label: c.hero.logosLabel, logos }}
            sectionClassName={HERO_MEDIA}
          />
        </div>
        <TabbedPanel heading={{ headline: w.heading }} tabs={tabs} />
        <ClientTestimonials
          variant="metrics"
          colorTheme={CLOUD_SLATE}
          testimonials={[
            {
              _key: 'testimonial',
              clientName: t.clientName,
              title: t.title,
              testimonial: t.quote,
              metricValue: t.metricValue,
              metricLabel: t.metricLabel,
              logoLabel: 'Logo',
              logoNode: t.logo.src ? (
                <div className="relative block w-full h-full">
                  <CustomerLogo logo={t.logo} maxWidth={100} maxHeight={80} width={100} className="relative z-10 w-full h-full" />
                </div>
              ) : undefined,
            },
          ]}
        />
        <SgpStack
          heading={{ headline: c.reliability.heading }}
          headingPosition="above"
          mediaPosition="left"
          theme="light"
          cardAccent={false}
          cards={c.reliability.cards.map((card) => ({ _key: card.key, title: card.title, description: [{ text: card.description }] }))}
          mediaNode={
            <div className="w-full max-w-[685px]">
              <LayerIllustration layers={c.reliability.layers} />
            </div>
          }
        />
        <BlogPreview heading={c.strategy.heading} pageThemeOverride="light" categoryOverride={{ name: c.strategy.category }} posts={c.strategy.posts} />
        <section className="TextImageSplit py-20 bg-gray-50 text-black">
          <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
            <div className="flex flex-col gap-10 md:gap-16 items-center md:flex-row">
              <HeadlineWithCta
                headline={c.trust.headline}
                subtitle={[{ text: c.trust.subtitle }]}
                align="left"
                padding={false}
                width="w-full"
                headerClass="header2 text-balance text-[clamp(2rem,0.5rem+5vw,4rem)]!"
                subtitleClasses="text-pretty text-[clamp(0.875rem,0.5rem+1.2vw,1rem)]!"
                className="flex-1 py-0"
              />
              <div className="relative w-full md:w-[clamp(320px,38vw,580px)] shrink-0">
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                  {c.trust.badges.map((b) => (
                    <div key={b.key} className="relative aspect-square p-[12%]">
                      <ResponsiveImage asset={{ path: b.path, alt: b.alt, width: b.width, height: b.width }} alt={b.alt} fill noBackground className="[&_img]:grayscale [&_img]:opacity-35" sizes="(max-width: 768px) 25vw, 145px" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="h-8 bg-white w-full" />
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} imageBackgroundColor={c.prefooter.imageColor} headlineWidth="narrow" />
        <div className="h-8 bg-white w-full" />
      </div>
      <SectionThemeWatcher />
    </div>
  )
}
