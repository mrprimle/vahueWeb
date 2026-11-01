'use client'

// Scale module 591798 (TabbedPanel), chunk 0sni47mcvnqwg.js. No animation between tabs: the panel swaps on click.
// `anchorId` goes through Scale's slug helper (247984) on Scale; here it is used as given.
import { useState, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { HeadlineWithCta, type HeadlineWithCtaProps } from './HeadlineWithCta'
import { ResponsiveImage, type ImageAsset } from './ResponsiveImage'
import { RichText, type RichBlock } from './RichText'

export type TabbedPanelTab = {
  _key?: string
  label: string
  /** A tab without a title is disabled, as on Scale. */
  title?: string
  eyebrow?: string
  body?: RichBlock[]
  ctaText?: string
  ctaUrl?: string
  indicatorColor?: { hex: string }
  mediaNode?: ReactNode
  image?: ImageAsset
}

function Arrow() {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  )
}

export function TabbedPanel({ heading, anchorId, tabs = [], className }: { heading?: Pick<HeadlineWithCtaProps, 'headline' | 'subtitle'>; anchorId?: string; tabs?: TabbedPanelTab[]; className?: string }) {
  const [active, setActive] = useState(() => tabs.findIndex((t) => !!t.title))
  const tab = tabs[active]
  return (
    <section id={anchorId?.trim() || undefined} className={cn('TabbedPanel scroll-mt-28 bg-white pt-20 pb-10', className)}>
      <div className="grid-layout-mobile md:grid-layout-desktop">
        <div className="col-span-full flex flex-col items-center gap-16">
          {heading ? <HeadlineWithCta padding={false} {...heading} align="center" width="w-full" headerClass="header3-regular text-balance" /> : null}
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="border border-scale-gray-95 rounded-lg flex gap-1 items-center max-w-full overflow-x-auto no-scrollbar">
              {tabs.map((t, i) => {
                const on = i === active
                const enabled = !!t.title
                return (
                  <button
                    key={t._key ?? t.label}
                    type="button"
                    disabled={!enabled}
                    onClick={() => enabled && setActive(i)}
                    className={cn(
                      'flex items-center gap-2 px-5 min-h-10 rounded-lg body2-regular font-medium whitespace-nowrap transition-colors text-scale-gray-10',
                      on ? 'bg-scale-gray-95' : 'bg-transparent',
                      enabled ? 'cursor-pointer' : 'cursor-default',
                    )}
                  >
                    <span aria-hidden className="size-[9px] rounded-[2px] shrink-0" style={{ backgroundColor: t.indicatorColor?.hex ?? '#839cb2' }} />
                    <span className={on ? 'opacity-100' : 'opacity-50'}>{t.label}</span>
                  </button>
                )
              })}
            </div>
            {tab?.title ? (
              <div className="bg-scale-gray-90 rounded-2xl w-full flex flex-col lg:flex-row items-center overflow-hidden">
                <div className={cn('flex flex-col gap-10 p-8 lg:p-16 shrink-0', tab.mediaNode || tab.image ? 'lg:w-1/2' : 'w-full')}>
                  <div className="flex flex-col gap-6">
                    {tab.eyebrow ? (
                      <div className="flex items-center gap-3">
                        <span aria-hidden className="size-[11px] bg-scale-gray-30 rotate-45 shrink-0" />
                        <p className="detail-mono uppercase text-scale-gray-30">{tab.eyebrow}</p>
                      </div>
                    ) : null}
                    <p className="header3-regular text-scale-gray-10 text-balance">{tab.title}</p>
                  </div>
                  {/* Scale passes a className too, but without an animated ref its RichText renders the bare blocks and drops it. */}
                  {tab.body ? <RichText value={tab.body} /> : null}
                  {tab.ctaText ? (
                    <a href={tab.ctaUrl || '#'} className="flex items-center gap-2 body1 text-scale-gray-10 hover:opacity-70 transition-opacity">
                      {tab.ctaText}
                      <Arrow />
                    </a>
                  ) : null}
                </div>
                {tab.mediaNode || tab.image ? (
                  <div className="w-full lg:w-1/2 self-stretch shrink-0 p-8 lg:pr-0 flex items-center justify-center lg:justify-start">
                    <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-lg lg:rounded-r-none overflow-hidden">
                      {tab.mediaNode ?? (tab.image ? <ResponsiveImage asset={tab.image} fill noBackground sizes="(max-width: 1023px) 100vw, 50vw" className="[&_img]:object-cover" /> : null)}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
