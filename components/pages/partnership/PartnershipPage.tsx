// The page body as Scale's route renders it (RSC payload): 243385, server-rendered `PartnershipList` header and card row, 995634.
// Scale has no page-specific client module here: the only motion is the CSS on the "Learn more" row.
import Link from 'next/link'
import { LogoTile } from '@/components/site/shared/LogoMarquee'
import { ResponsiveImage } from '@/components/site/shared/ResponsiveImage'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { cn } from '@/components/site/lib/cn'
import type { PartnerCard, PartnershipContent } from './types'

const CONTAINER = 'mx-auto w-full max-w-[1472px] ps-6 pe-6'

function Card({ card }: { card: PartnerCard }) {
  return (
    <Link
      href={card.url}
      className="flex h-[486px] flex-col gap-[82px] rounded-2xl p-10 md:grow md:basis-[calc((100%-0.5rem)/2)] lg:basis-[calc((100%-0.5rem)/2)]"
      style={{ backgroundColor: card.color }}
    >
      <div className="relative flex size-[86px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black">
        <div className={cn('relative h-[36px] w-[55px]', card.logo.invert && '[filter:brightness(0)_invert(1)]')}>
          {card.logo.path ? (
            <ResponsiveImage asset={{ path: card.logo.path, alt: card.logo.alt }} alt={card.logo.alt} fill objectContain noBackground sizes="55px" />
          ) : (
            <LogoTile label={card.logo.alt} className="h-full w-full text-white" />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <h3 className="header4-regular text-black">{card.title}</h3>
        <div className="flex flex-col gap-8 text-black">
          <p className="body2-regular text-black/60 line-clamp-2">{card.body}</p>
          <span className="group inline-flex items-center gap-1 transition-colors duration-300 text-inherit hover:opacity-70 text-sm" aria-label={card.cta} aria-disabled="true">
            <span className="font-medium">{card.cta}</span>
            <span className="transition-transform duration-300 ease-out inline-block arrow font-unicode group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export function PartnershipPage({ content: c }: { content: PartnershipContent }) {
  return (
    <div className="relative overflow-x-hidden">
      <PageThemeSetter theme="light" />
      <div className="CMSSliceRenderer relative rootPageRenderer">
        <section className="PartnershipList py-20 md:py-[120px]">
          <div className={CONTAINER}>
            <div className="flex flex-col gap-8 md:flex-row md:gap-10">
              <h1 className="header2 text-balance text-black md:flex-1">{c.hero.title}</h1>
              <p className="body1 text-pretty text-scale-gray-30 md:w-[480px]">{c.hero.body}</p>
            </div>
          </div>
        </section>
        <section className="pb-20">
          <div className={CONTAINER}>
            <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
              {c.cards.map((card) => (
                <Card key={card.key} card={card} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <SectionThemeWatcher />
    </div>
  )
}
