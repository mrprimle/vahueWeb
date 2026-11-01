'use client'

// The page body as Scale's route renders it (RSC payload), with module 830843 for the four grids.
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { CardGrid, type LinkCardData } from '@/components/site/shared/CardGrid'
import { ClientTestimonials } from '@/components/site/shared/ClientTestimonials'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import type { RichBlock } from '@/components/site/shared/RichText'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { cn } from '@/components/site/lib/cn'
import styles from './evaluation.module.css'
import { ICON_PATHS } from './icons'
import type { CardCopy, EvaluationModelDevelopersContent, IconKey } from './types'

const MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'
const SECTION = 'py-18 lg:py-20 bg-transparent !pt-8 !pb-10 md:!pt-10'
const CONTAINER = 'mx-auto w-full max-w-[1472px] ps-6 pe-6 relative'
const HEADING =
  '!mb-8 md:!mb-10 [&>div]:items-center [&_h2]:max-w-[760px] [&_h2]:text-[2.5rem] [&_h2]:leading-[1.08] md:[&_h2]:text-[3rem] lg:[&_h2]:text-[3.25rem] [&_p]:mx-auto [&_p]:max-w-[760px] [&_p]:text-lg [&_p]:leading-[1.55] [&_p]:text-black/60'

const blocks = (text: string): RichBlock[] => [{ style: 'normal', text }]

/** react-icons' GenIcon output, as Scale renders module 473665. */
function Icon({ name, size, color }: { name: IconKey; size?: number; color?: string }) {
  const [base, ...paths] = ICON_PATHS[name]
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" color={color} style={{ color }} height={size ?? '1em'} width={size ?? '1em'} xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d={base} />
      {paths.map((d) => (
        <path d={d} key={d} />
      ))}
    </svg>
  )
}

/** Scale's `m` in module 830843. */
function EvaluationGrid({ cards }: { cards: CardCopy[] }) {
  const data = useMemo<LinkCardData[]>(
    () =>
      cards.map((card) => ({
        _type: 'linkCard',
        _key: card.key,
        icon: ({ size }) => <Icon name={card.icon} size={size} color={card.iconColor} />,
        title: card.title,
        description: card.description ? blocks(card.description) : undefined,
        iconSize: 'md',
      })),
    [cards],
  )
  return (
    <div className={cn('evaluation-link-card-grid', styles.grid)}>
      <CardGrid cards={data} animationDirection="up" iconSize="md" theme="light" />
    </div>
  )
}

export function EvaluationModelDevelopersPage({ content: c }: { content: EvaluationModelDevelopersContent }) {
  return (
    <>
      <PageThemeSetter theme="light" />
      <div className="bg-white text-[#111111]">
        {/* Scale module 478135, non-globe branch. */}
        <div className="pb-10! pt-24!">
          <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} cta={c.hero.cta} backdropColor={c.hero.backdrop} image={c.hero.image} startPercentage={0} sectionClassName={MEDIA} />
        </div>

        <section className={SECTION}>
          <div className={CONTAINER}>
            <SectionTitle className={HEADING} overtitle={c.challenges.overtitle} title={c.challenges.title} />
            <EvaluationGrid cards={c.challenges.cards} />
          </div>
        </section>

        <section className={SECTION}>
          <div className={CONTAINER}>
            <SectionTitle className={HEADING} overtitle={c.why.overtitle} title={c.why.title} subtitle={c.why.subtitle} />
            <EvaluationGrid cards={c.why.cards} />
          </div>
        </section>

        <section className={SECTION}>
          <div className={CONTAINER}>
            <SectionTitle className={HEADING} overtitle={c.risks.overtitle} title={c.risks.title} subtitle={c.risks.subtitle} />
            <EvaluationGrid cards={c.risks.cards} />
          </div>
        </section>

        <section className={SECTION}>
          <div className={CONTAINER}>
            <SectionTitle className={HEADING} overtitle={c.experts.overtitle} title={c.experts.title} subtitle={c.experts.subtitle} />
            <div className="relative mb-10 overflow-hidden rounded-lg border border-black/10 bg-[#f5f5f3] p-6 md:p-10">
              <div className="relative aspect-[1129/480] w-full">
                <Image src={c.experts.taxonomy.src} alt={c.experts.taxonomy.alt} fill sizes="(min-width: 1280px) 1129px, calc(100vw - 48px)" className="object-contain" />
              </div>
            </div>
            <EvaluationGrid cards={c.experts.cards} />
          </div>
        </section>

        <div className="!pt-8 !pb-10 md:!pt-10">
          <ClientTestimonials backdropColor={c.testimonials.backdrop} heading={c.testimonials.heading} testimonials={c.testimonials.items.map((item) => ({ ...item, nameTile: true }))} />
        </div>

        <section className={SECTION}>
          <div className={CONTAINER}>
            <SectionTitle className={HEADING} overtitle={c.resources.overtitle} title={c.resources.title} />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {c.resources.items.map((item) => (
                <Link href={item.href} className="block" key={item.title}>
                  <div className="relative flex aspect-[389/243] items-center justify-center overflow-hidden rounded-lg bg-[#f5f5f3] p-6">
                    <Image src={item.image} alt="" width={256} height={256} className="h-28 w-28 object-contain" aria-hidden="true" />
                    <span className="sr-only">{item.title}</span>
                  </div>
                  <div className="pt-5">
                    <p className="text-sm font-medium leading-[1.71] text-[#525252]">{item.category}</p>
                    <h5 className="mt-1 line-clamp-2 font-aeonik text-2xl leading-[1.33] text-[#111111]">{item.title}</h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-16! pb-8">
          <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
        </div>
      </div>
    </>
  )
}
