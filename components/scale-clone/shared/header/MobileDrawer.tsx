'use client'

import { forwardRef } from 'react'
import FlatCta from './FlatCta'
import { ChevronRight, FeaturedCard, MenuColumn } from './MenuBlocks'
import { GET_STARTED_HREF, LOGIN_HREF, NAV_CATEGORIES } from './navData'
import s from './header.module.css'

// Mobile drawer below the header bar (Scale's `ew` branch): a 200%-wide track that slides between the
// category list and the chosen category (500ms cubic-bezier(.32,.72,0,1)), a full panel background
// and a floating Log In / Get Started bar. The open/close tweens live in ScaleHeader.
type Props = {
  activeKey: string | null
  onSelect: (key: string) => void
  onNavigate: () => void
  bgRef: React.Ref<HTMLDivElement>
  listRef: React.Ref<HTMLUListElement>
  ctaRef: React.Ref<HTMLDivElement>
}

const scrollPad = 'pb-[calc(72px+max(1.5rem,env(safe-area-inset-bottom)))]'

const MobileDrawer = forwardRef<HTMLDivElement, Props>(function MobileDrawer(
  { activeKey, onSelect, onNavigate, bgRef, listRef, ctaRef },
  ref,
) {
  const active = NAV_CATEGORIES.find((c) => c.key === activeKey) ?? null
  return (
    <div ref={ref} className="relative flex min-h-0 flex-1 flex-col bg-transparent md:hidden">
      <div ref={bgRef} className="absolute inset-0 z-[65] h-full w-full bg-[var(--nav-panel-background)]" />
      <div className="relative z-[70] flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-hidden">
          <div
            className={`flex h-full w-[200%] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              active ? '-translate-x-1/2' : 'translate-x-0'
            }`}
          >
            <div className="flex h-full min-h-0 w-1/2 flex-col" inert={active != null}>
              <nav
                className={`min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-1 ${scrollPad}`}
                aria-label="Main"
                data-lenis-prevent
              >
                <ul ref={listRef} className="flex flex-col">
                  {NAV_CATEGORIES.map((c) => (
                    <li key={c.key}>
                      <button
                        type="button"
                        onClick={() => onSelect(c.key)}
                        className={`${s.navLinkMobile} flex w-full items-center justify-between gap-3 py-4 text-[var(--nav-text)]`}
                      >
                        <span>{c.name}</span>
                        <ChevronRight className="size-5 w-[40px] shrink-0 opacity-60" />
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex h-full min-h-0 w-1/2 flex-col" inert={active == null}>
              <div className={`min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-2 ${scrollPad}`} data-lenis-prevent>
                {active && (
                  <div className="w-full text-[var(--nav-text)]">
                    <div className="flex flex-col gap-6 pb-4 pt-2">
                      <MenuColumn blocks={active.leftColumn} mobileDrawer onNavigate={onNavigate} />
                      <MenuColumn blocks={active.rightColumn} mobileDrawer onNavigate={onNavigate} />
                      {active.featuredPosts?.length ? (
                        <div className="flex flex-col gap-4">
                          {active.featuredPosts.slice(0, 2).map((c, i) => (
                            <FeaturedCard key={i} card={c} />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          ref={ctaRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2"
        >
          <div className="flex gap-2 rounded-[12px] bg-[var(--nav-mobile-cta-wrapper-bg)] p-2">
            <FlatCta
              href={LOGIN_HREF}
              label="Log In"
              className="pointer-events-auto !h-12 !w-auto min-h-0 min-w-0 flex-1 justify-center rounded-[6px] border border-[var(--nav-drawer-login-border)] !px-3 py-2.5 text-[var(--nav-drawer-login-text)]"
              innerClassName="px-0 py-0"
              labelClassName="!font-semibold"
            />
            <FlatCta
              href={GET_STARTED_HREF}
              label="Get Started"
              className="pointer-events-auto !h-12 !w-auto min-h-0 min-w-0 flex-1 justify-center rounded-[6px] bg-[var(--nav-drawer-demo-bg)] !px-3 py-2.5 text-[var(--nav-drawer-demo-text)]"
              innerClassName="px-0 py-0"
              labelClassName="!font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default MobileDrawer
