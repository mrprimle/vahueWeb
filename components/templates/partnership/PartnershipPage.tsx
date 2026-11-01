import type { CSSProperties } from 'react'
import Link from 'next/link'
import type { PartnerItem, PartnershipContent } from './content'
import s from './partnership.module.css'

/**
 * scale.com/partnership layout: a single PartnershipList CMS slice (0sni47mcvnqwg.js), server-rendered, no motion.
 *   section.PartnershipList py-20 md:py-[120px] > container (max-w-[1472px] ps-6 pe-6)
 *     > flex-col gap-8 / md:flex-row md:gap-10: h1 header2 (md:flex-1) + p body1 gray-30 (md:w-[480px])
 *   section pb-20 > container > flex-col gap-2 / md:flex-row md:flex-wrap > one next/link card per item.
 * Cards: h-[486px] flex-col gap-[82px] rounded-2xl p-10, md:grow md:basis-[calc((100%-0.5rem)/2)] + lg basis by row
 * size, background cycled from cardColors. The only hover is on the "Learn more" TextLink span (theme inherit).
 * Spec: reference-snapshots/scale-clone/partnership.md
 *
 * Theme: --pts-bg page, --pts-fg title, --pts-muted lede (gray-30), --pts-tile logo tile, --pts-card-fg card text.
 */

// Scale `ed`: lg basis by the number of cards in the row.
const LG_BASIS: Record<number, string> = {
  1: 'lg:basis-full',
  2: 'lg:basis-[calc((100%-0.5rem)/2)]',
  3: 'lg:basis-[calc((100%-1rem)/3)]',
}

// Scale: rows of at most 3, items spread evenly (ceil(n/3) rows), each card tagged with its row's size.
function rowSizes(n: number): number[] {
  if (n <= 0) return []
  const rows = Math.ceil(n / 3)
  const base = Math.floor(n / rows)
  return Array.from({ length: rows }, (_, i) => base + (i < n % rows ? 1 : 0)).flatMap((k) => Array(k).fill(k))
}

const isExternal = (href: string) => /^https?:\/\//.test(href)

function PartnerCard({
  item,
  href,
  color,
  perRow,
  linkLabel,
}: {
  item: PartnerItem
  href: string
  color: string
  perRow: number
  linkLabel: string
}) {
  const className = `${s.card} flex h-[486px] flex-col gap-[82px] rounded-2xl p-10 md:grow md:basis-[calc((100%-0.5rem)/2)] ${LG_BASIS[perRow] ?? ''}`
  const body = (
    <>
      {item.logo ? (
        <div className="relative flex size-[86px] shrink-0 items-center justify-center overflow-hidden rounded-lg" style={{ background: 'var(--pts-tile)' }}>
          <div className="relative h-[36px] w-[55px]" style={item.logo.mono ? { filter: 'brightness(0) invert(1)' } : undefined}>
            {item.logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.logo.src} alt={item.logo.alt ?? ''} className="absolute inset-0 h-full w-full object-contain" loading="lazy" decoding="async" />
            ) : (
              <div aria-hidden="true" className="absolute inset-0 rounded-[3px] bg-white/20" />
            )}
          </div>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-8">
        <h3 className={s.cardTitle}>{item.title}</h3>
        <div className="flex flex-col gap-8" style={{ color: 'var(--pts-card-fg)' }}>
          <p className={s.cardBody}>{item.description}</p>
          {/* TextLink without href: a span with aria-disabled, hover only on the span itself */}
          <span className={s.textLink} aria-label={linkLabel} aria-disabled="true">
            <span>{linkLabel}</span>
            <span className={s.arrow} aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </div>
    </>
  )
  return isExternal(href) ? (
    <a href={href} className={className} style={{ backgroundColor: color }}>
      {body}
    </a>
  ) : (
    <Link href={href} className={className} style={{ backgroundColor: color }}>
      {body}
    </Link>
  )
}

export default function PartnershipPage({
  content,
  theme,
}: {
  content: PartnershipContent
  theme?: Record<`--pts-${string}`, string>
}) {
  const { title, description, items, hrefBase, hrefSuffix = '', cardColors, linkLabel, emptyLabel } = content
  const perRow = rowSizes(items.length)
  return (
    <main className={`${s.root} PartnershipPage font-display`} style={theme as CSSProperties | undefined}>
      <div className="CMSSliceRenderer rootPageRenderer relative">
        <section className="PartnershipList py-20 md:py-[120px]">
          <div className="mx-auto w-full max-w-[1472px] pe-6 ps-6">
            <div className="flex flex-col gap-8 md:flex-row md:gap-10">
              <h1 className={`${s.title} md:flex-1`}>{title}</h1>
              <p className={`${s.lede} md:w-[480px]`}>{description}</p>
            </div>
          </div>
        </section>
        <section className="pb-20">
          <div className="mx-auto w-full max-w-[1472px] pe-6 ps-6">
            {items.length === 0 ? (
              <p className="py-12 text-center text-black/40">{emptyLabel}</p>
            ) : (
              <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
                {items.map((item, i) => (
                  <PartnerCard
                    key={item.slug}
                    item={item}
                    href={item.href ?? `${hrefBase}/${item.slug}${hrefSuffix}`}
                    color={cardColors[i % cardColors.length]}
                    perRow={perRow[i]}
                    linkLabel={linkLabel}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
