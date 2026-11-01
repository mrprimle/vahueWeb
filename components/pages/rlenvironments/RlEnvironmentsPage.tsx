'use client'

// Scale module 799680, the page body. Scale wraps everything below in the same client component.
import Image from 'next/image'
import { useMemo } from 'react'
import { CardGrid, type LinkCardData } from '@/components/site/shared/CardGrid'
import { EnterprisePillars, type PillarCard } from '@/components/site/shared/EnterprisePillars'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import type { RichBlock } from '@/components/site/shared/RichText'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { ICON_PATHS } from './icons'
import type { IconKey, RlEnvironmentsContent } from './types'

const MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'

const blocks = (text: string): RichBlock[] => [{ style: 'normal', text }]

/** react-icons' GenIcon output, as Scale renders module 473665. */
function Icon({ name, size, color }: { name: IconKey; size?: number; color?: string }) {
  const { base, d } = ICON_PATHS[name]
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" color={color} style={{ color }} height={size ?? '1em'} width={size ?? '1em'} xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d={base} />
      <path d={d} />
    </svg>
  )
}

/** Scale module 858675. */
function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">{children}</div>
}

/** Scale module 497052, light theme, no mockup or plain image branch: this page uses neither. */
function CapabilityList({ items }: { items: RlEnvironmentsContent['capabilities']['items'] }) {
  return (
    <div className="space-y-14 md:space-y-24">
      {items.map((item) => {
        const textRight = item.textSide === 'right'
        const text = (
          <div className="max-w-[440px] space-y-5">
            <h3 className="text-2xl font-semibold leading-tight md:text-3xl">{item.title}</h3>
            <p className="text-base leading-relaxed text-black/70">{item.description}</p>
          </div>
        )
        const media = (
          <div className="w-full overflow-hidden rounded-2xl border p-2 border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
            <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} className="object-cover w-full h-auto rounded-xl" />
          </div>
        )
        return (
          <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16" key={item.title}>
            {textRight ? media : text}
            {textRight ? text : media}
          </article>
        )
      })}
    </div>
  )
}

export function RlEnvironmentsPage({ content: c }: { content: RlEnvironmentsContent }) {
  const cards = useMemo<LinkCardData[]>(
    () =>
      c.features.cards.map((card) => ({
        _type: 'linkCard',
        _key: card.key,
        icon: ({ size }) => <Icon name={card.icon} size={size} color={card.iconColor} />,
        title: card.title,
        description: blocks(card.description),
      })),
    [c],
  )
  const pillars = useMemo<PillarCard[]>(
    () =>
      c.pillars.cards.map((card) => ({
        _key: card.key,
        iconNode: ({ size, color }) => <Icon name={card.icon} size={size} color={color} />,
        iconColor: card.iconColor,
        headlineWithCta: { headline: card.headline, subtitle: blocks(card.subtitle), headerTag: 'h3', headerClass: 'header3-regular' },
      })),
    [c],
  )
  return (
    <div className="min-h-screen bg-white text-black overflow-x-clip">
      <PageThemeSetter theme="light" />
      {/* Scale module 478135, compact, non-globe branch. */}
      <div className="pb-10! pt-12! md:pt-24!">
        <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} cta={c.hero.cta} backdropColor={c.hero.backdrop} video={c.hero.video} image={c.hero.image} startPercentage={0} sectionClassName={MEDIA} />
      </div>

      <Container>
        <SectionTitle overtitle={c.features.overtitle} title={c.features.title} />
        <CardGrid cards={cards} animationDirection="up" directionalEntrance />
      </Container>

      <section className="bg-scale-gray-95 py-16 md:py-24">
        <Container>
          <SectionTitle overtitle={c.overview.overtitle} title={c.overview.title} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.overview.cards.map((card) => (
              <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-scale-gray-90" key={card.title}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-scale-gray-90">
                  <Image src={card.image.src} alt={card.image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="header5-regular text-black mb-3">{card.title}</h3>
                  <p className="body3 text-scale-gray-30 leading-relaxed">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionTitle overtitle={c.capabilities.overtitle} title={c.capabilities.title} />
          <CapabilityList items={c.capabilities.items} />
        </Container>
      </section>

      <EnterprisePillars overtitle={c.pillars.overtitle} heading={c.pillars.heading} subtitle={c.pillars.subtitle} video={c.pillars.video} cards={pillars} />

      <div className="pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} sectionClassName={MEDIA} />
      </div>
      <SectionThemeWatcher />
    </div>
  )
}
