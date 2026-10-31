'use client'

import { Fragment, useRef, useState, type ReactNode } from 'react'
import { MdArrowForward } from '@/components/scale-clone/enterprise-healthcare/icons'
import { useRevealText } from '@/components/scale-clone/enterprise-healthcare/useRevealText'
import s from '@/components/scale-clone/enterprise-healthcare/healthcare.module.css'

/*
 * Vahue dark copy of the clone's TabbedPanel (components/scale-clone/enterprise-healthcare/TabbedPanel.tsx):
 * click-to-switch tabs, no auto-advance, the panel re-renders and the new mockup mounts with its own intro.
 * Headline = HeadlineWithCta (AnimatedText, IntersectionObserver rootMargin -15%, delay 0.5).
 * Colours: #f2f2f2 / #eaeaea surfaces -> white/[0.06] and white/[0.04] on the page background.
 */

export type TabItem = { label: string; color: string; title: string; body: string; cta?: { label: string; href: string }; mockup: ReactNode }

export default function TabbedPanel({ heading: headline, items: tabs }: { heading: string; items: TabItem[] }) {
  const [active, setActive] = useState(0)
  const heading = useRef<HTMLHeadingElement>(null)
  useRevealText(heading)
  const tab = tabs[active]

  return (
    <section className="scroll-mt-28 bg-bg pb-10 pt-20">
      <div className="px-6">
        <div className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-6 py-6">
            <h2 ref={heading} className={`${s.header3} ${s.pending} w-full text-center font-display font-normal text-white`}>
              {headline}
            </h2>
          </div>
          <div className="flex w-full flex-col items-center gap-6">
            <div className={`flex max-w-full items-center gap-1 overflow-x-auto rounded-lg border border-border-mid ${s.noScrollbar}`} role="tablist">
              {tabs.map((t, i) => {
                const on = i === active
                return (
                  <button
                    key={t.label}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className={`${s.body2} flex min-h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg px-5 font-display font-medium text-white transition-colors ${
                      on ? 'bg-white/[0.08]' : 'bg-transparent'
                    }`}
                  >
                    <span aria-hidden="true" className="size-[9px] shrink-0 rounded-[2px]" style={{ backgroundColor: t.color }} />
                    <span className={on ? 'opacity-100' : 'opacity-50'}>{t.label}</span>
                  </button>
                )
              })}
            </div>
            <div className="flex w-full flex-col items-center overflow-hidden rounded-2xl border border-border-soft bg-white/[0.04] lg:flex-row" role="tabpanel">
              <div className="flex shrink-0 flex-col gap-10 p-8 lg:w-1/2 lg:p-16">
                <div className="flex flex-col gap-6">
                  <p className={`${s.header3} font-display text-white`}>{tab.title}</p>
                </div>
                <p className="font-display text-[16px] leading-[24px] tracking-[-0.01em] text-white/70" style={{ textWrap: 'pretty' }}>
                  {tab.body}
                </p>
                {tab.cta ? (
                  <a href={tab.cta.href} className={`${s.body1} flex items-center gap-2 font-display text-white transition-opacity hover:opacity-70`}>
                    {tab.cta.label}
                    <MdArrowForward size={20} />
                  </a>
                ) : null}
              </div>
              <div className="flex w-full shrink-0 items-center justify-center self-stretch p-8 lg:w-1/2 lg:justify-start lg:pr-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border-mid font-display lg:aspect-square lg:rounded-r-none lg:border-r-0">
                  <Fragment key={active}>{tab.mockup}</Fragment>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
