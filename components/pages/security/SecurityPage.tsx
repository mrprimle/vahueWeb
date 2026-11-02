'use client'

// The page body as Scale's route renders it (RSC payload): 243385, 478135 (compact, non-globe hero), 1900 + 307270,
// 756386, two cards with 156373, disclosure block, 540431, 995634.
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { CardGrid, type LinkCardData } from '@/components/site/shared/CardGrid'
import { FlatCta } from '@/components/site/shared/FlatCta'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { ScrollRevealSection } from '@/components/site/shared/ScrollRevealSection'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { cn } from '@/components/site/lib/cn'
import { Icon } from './icons'
import type { SecurityContent } from './types'

const HERO_MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'
const SECTION = 'py-[72px] md:py-[120px]'
const CONTAINER = 'mx-auto w-full max-w-[1472px] ps-6 pe-6'
const TITLE_ROW = 'flex flex-col justify-center mb-10 md:mb-20 md:mt-12 md:items-start md:text-left text-center'
const TITLE = 'font-aeonik leading-snug lg:leading-[1.25] text-3xl md:text-4.5xl lg:text-5xl [text-wrap:balance]'
const OVERTITLE = 'text-xs leading-6 tracking-[1px] mb-5 uppercase font-geist-mono'

// Scale's CommitmentGrid passes one Portable Text block per card.
const block = (text: string) => [{ style: 'normal' as const, text }]

export function SecurityPage({ content: c }: { content: SecurityContent }) {
  const cards = useMemo<LinkCardData[]>(
    () =>
      c.commitment.items.map((item) => ({
        _type: 'linkCard',
        _key: item.key,
        icon: ({ size }: { size?: number }) => <Icon name={item.icon} color={item.color} size={size} />,
        title: item.title,
        description: block(item.description),
        iconSize: 'md',
      })),
    [c.commitment.items],
  )
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <PageThemeSetter theme="light" />
      <div className="pb-10! pt-12! md:pt-24!">
        <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} backdropColor={c.hero.backdrop} image={c.hero.image} startPercentage={0} sectionClassName={HERO_MEDIA} />
      </div>

      <section className={cn(SECTION, 'bg-white')}>
        <div className={CONTAINER}>
          <div className={cn(TITLE_ROW, '!mb-10 !mt-0')}>
            <div className="flex flex-col w-full md:flex-row md:items-end md:gap-6">
              <div className="flex flex-col md:flex-1">
                <div className={cn(OVERTITLE, 'text-[#525252]')}>
                  <span>{c.commitment.overtitle}</span>
                </div>
                <h2 className={cn(TITLE, 'text-black')}>{c.commitment.title}</h2>
              </div>
            </div>
          </div>
          <CardGrid cards={cards} animationDirection="up" iconSize="md" theme="light" />
        </div>
      </section>

      <ScrollRevealSection backdropColor="scale-gray-95" contentContainerColor="black">
        <div className={cn(SECTION, 'text-white')}>
          <div className={CONTAINER}>
            <div className={TITLE_ROW}>
              <div className="flex flex-col w-full md:flex-row md:items-end md:gap-6">
                <div className="flex flex-col md:flex-1">
                  <div className={OVERTITLE}>
                    <span>{c.compliance.overtitle}</span>
                  </div>
                  <h2 className={TITLE}>{c.compliance.title}</h2>
                </div>
                <p className="mt-4 lg:mt-2 leading-[1.60] lg:text-xl [text-wrap:balance] [white-space:inherit] block font-normal md:mt-0 md:flex-1 md:self-end text-white/70">{c.compliance.subtitle}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {c.compliance.items.map((item) => (
                <article key={item.key} className="flex flex-col gap-6 rounded-2xl bg-white/5 border border-white/10 p-8 md:p-10 sm:flex-row sm:items-start">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Image src={item.logo.src} alt={item.logo.alt} width={40} height={40} quality={80} className={cn('max-h-10 w-auto object-contain', item.logo.invert && 'brightness-0 invert')} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="header5-regular text-white">{item.title}</h3>
                    <p className="body3 text-white/70 leading-relaxed">
                      {item.body}
                      <br />
                      <br />
                      {item.reportLead}{' '}
                      <Link href={item.reportLink.url} className="text-white/70 underline">
                        {item.reportLink.text}
                      </Link>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      <section className={cn(SECTION, 'bg-scale-gray-95')}>
        <div className={CONTAINER}>
          <div className="grid w-full gap-6 md:grid-cols-2">
            {c.cards.map((card) => (
              <div key={card.label} className="relative flex flex-col rounded-2xl border border-cloud-slate bg-cloud-slate overflow-hidden min-h-[600px]">
                <div className="flex flex-col gap-5 p-10">
                  <span className="detail-mono text-black/50">{card.label}</span>
                  <h2 className="header3-regular text-black text-balance">{card.title}</h2>
                  <p className="body2-regular text-black/70">{card.body}</p>
                  <FlatCta href={card.cta.url} variant="arrowOutline" theme="black" text={card.cta.text} />
                </div>
                <div className="absolute bottom-0 right-0 w-72 h-72">
                  <Image src={card.image.src} alt={card.image.alt} fill quality={85} className={card.image.className} sizes="100vw" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTAINER}>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="detail-mono text-scale-gray-60">{c.disclosure.label}</span>
            <h2 className="header2 text-black text-balance max-w-xl">{c.disclosure.title}</h2>
            <p className="body1 text-scale-gray-60 max-w-md">
              {c.disclosure.lead}{' '}
              <Link href={c.disclosure.email.url} className="underline">
                {c.disclosure.email.text}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
      </div>
      <SectionThemeWatcher />
    </div>
  )
}
