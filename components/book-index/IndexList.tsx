import Link from 'next/link'
import type { ReactNode } from 'react'
import s from './book-index.module.css'

/*
 * Text index under the book grid. Not part of the Scale template: it keeps the crawlable copy the
 * previous index pages rendered (grouping, summaries, dates) that does not fit on a book cover.
 * Same container and type scale as the hero; dark hairline rows.
 */

export type IndexGroup = {
  heading: string
  items: { href: string; title: string; meta: string; summary: string }[]
}

type Props = {
  overtitle: string
  title: string
  groups: IndexGroup[]
  footnote?: ReactNode
}

export default function IndexList({ overtitle, title, groups, footnote }: Props) {
  return (
    <section className="pb-20 md:pb-24">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="border-t border-border-mid pt-12 md:pt-16">
          <div className={`${s.overtitle} font-mono text-white/50`}>{overtitle}</div>
          <h2 className={`${s.sectionTitle} max-w-3xl font-display font-normal text-white`}>{title}</h2>
          <div className="mt-10 flex flex-col gap-12 md:mt-14">
            {groups.map((group) => (
              <div key={group.heading} className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-8">
                <h3 className={`${s.detailMono} pt-1 font-mono text-white/50`}>{group.heading}</h3>
                <ul className="flex flex-col">
                  {group.items.map((item) => (
                    <li key={item.href} className="border-b border-border-soft first:border-t">
                      <Link
                        href={item.href}
                        className="group grid grid-cols-1 gap-2 py-6 transition-colors md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8"
                      >
                        <div className="flex flex-col gap-2">
                          <span className="font-display text-xl leading-snug text-white transition-colors group-hover:text-white/70">
                            {item.title}
                          </span>
                          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">{item.meta}</span>
                        </div>
                        <p className="text-[15px] leading-relaxed text-white/60">{item.summary}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {footnote ? <div className="mt-10 max-w-3xl text-xs leading-relaxed text-white/40">{footnote}</div> : null}
        </div>
      </div>
    </section>
  )
}
