'use client'

import Link from 'next/link'
import type { NavBlock, NavCard, NavLink } from './navData'
import s from './header.module.css'

// Column renderer shared by the desktop dropdown and the mobile drawer (Scale's `S`/`C` components).
// Consecutive links are wrapped in a group (pb-6 / md:pb-3); sub-headers sit above them.

const reveal = (i: number | null) =>
  i == null ? {} : { 'data-menu-text-reveal': 'true', 'data-stagger-index': String(i) }

export function ChevronRight({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

type ColumnProps = {
  blocks: NavBlock[]
  staggerStart?: number
  mobileDrawer?: boolean
  onHoverLink?: (l: NavLink) => void
  onNavigate?: () => void
}

export function MenuColumn({ blocks, staggerStart, mobileDrawer = false, onHoverLink, onNavigate }: ColumnProps) {
  if (!blocks.length) return null
  let idx = typeof staggerStart === 'number' ? staggerStart : null
  const next = () => (idx == null || mobileDrawer ? null : idx++)

  const groups: Array<{ type: 'links'; items: NavLink[] } | { type: 'text'; text: string }> = []
  let run: NavLink[] = []
  for (const b of blocks) {
    if (b.kind === 'link') run.push(b)
    else {
      if (run.length) {
        groups.push({ type: 'links', items: run })
        run = []
      }
      groups.push({ type: 'text', text: b.text })
    }
  }
  if (run.length) groups.push({ type: 'links', items: run })

  const gap = mobileDrawer ? '' : 'gap-y-0 md:gap-y-1'
  return (
    <div className={`flex min-w-0 flex-col ${gap} ${mobileDrawer ? '[&>*:last-child]:pb-0' : ''}`}>
      {groups.map((g, gi) =>
        g.type === 'text' ? (
          <p
            key={`t${gi}`}
            className={`${s.subheader} pb-3 md:pb-2 ${idx != null && !mobileDrawer ? 'will-change-transform' : ''}`}
            {...reveal(next())}
          >
            {g.text}
          </p>
        ) : (
          <div key={`l${gi}`} className={`flex min-w-0 flex-col pb-6 md:pb-3 ${gap}`}>
            {g.items.map((l) =>
              mobileDrawer ? (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onNavigate}
                  className="group relative flex !w-full items-center justify-between gap-3 py-1 text-[var(--nav-text)] transition-colors focus:outline-1"
                >
                  <span className={`${s.navLink} min-w-0 flex-1`}>{l.name}</span>
                  <ChevronRight className="size-5 w-[40px] shrink-0 opacity-60" />
                </Link>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onNavigate}
                  onMouseEnter={() => onHoverLink?.(l)}
                  onFocus={() => onHoverLink?.(l)}
                  className="group relative block w-max px-1 py-1 transition-colors focus:outline-1 md:px-0 md:py-0.5"
                >
                  <span className="flex flex-col will-change-transform" {...reveal(next())}>
                    <span
                      className={`${s.navLink} text-[var(--nav-text)] transition-colors duration-200 group-hover:text-[#775893]`}
                    >
                      {l.name}
                    </span>
                  </span>
                </Link>
              ),
            )}
          </div>
        ),
      )}
    </div>
  )
}

export function FeaturedCard({ card, staggerIndex = null }: { card: NavCard; staggerIndex?: number | null }) {
  return (
    <a
      href={card.href}
      className={`group relative flex w-full min-w-0 flex-1 flex-col gap-2 overflow-hidden rounded-xl border border-[var(--nav-card-background)] bg-[var(--nav-card-background)] p-3 transition-colors focus:outline-1 ${
        staggerIndex != null ? 'will-change-transform' : ''
      }`}
      {...reveal(staggerIndex)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      {/* TODO: Vahue copy */}
      <p className="line-clamp-2 text-sm font-medium leading-[1.5] tracking-[-0.01em] text-[var(--nav-text)] group-hover:underline">
        {card.title}
      </p>
    </a>
  )
}

export const countBlocks = (blocks: NavBlock[]) => blocks.length
