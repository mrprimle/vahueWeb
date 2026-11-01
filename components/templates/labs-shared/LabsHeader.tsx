'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { MenuIcon, SearchIcon, XIcon } from './icons'
import { labsHref, labsSection } from './links'
import LabsSearch, { type LabsSearchItem } from './LabsSearch'
import s from './labs.module.css'

/*
 * The labs UnifiedHeader (chunk 2bejownx-dgf7.js, module 595877): sticky, h-14, white/70 + backdrop-blur-xl,
 * hairline bottom border; bracketed nav links with an active state; search button (+ Cmd/Ctrl+K on document keydown)
 * opening the search modal; below md a search + menu toggle and an in-flow mobile nav panel.
 */
const NAV = [
  { href: '/papers', label: '[PAPERS]' },
  { href: '/blog', label: '[BLOG]' },
  { href: '/leaderboard', label: '[LEADERBOARDS]' },
] as const

function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer items-center gap-1.5 px-2 py-1.5 text-[#525252] transition-colors [@media(hover:hover){&:hover}]:text-[color:var(--color-ink)]"
      aria-label="Search"
    >
      <SearchIcon className="w-4 h-4" />
      <span className={`${s.mono} text-[12px] leading-[1.5] hidden sm:inline`}>⌘K</span>
    </button>
  )
}

export default function LabsHeader({ searchItems }: { searchItems?: LabsSearchItem[] }) {
  const section = labsSection(usePathname())
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearch(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])
  const onSearch = useCallback((v: boolean) => setSearch(v), [])

  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-xl border-b border-[color:var(--color-hairline)]">
      <div className="flex items-center justify-between px-6 h-14">
        <Link href={labsHref('/')} className="flex items-center gap-2 transition-opacity [@media(hover:hover){&:hover}]:opacity-80">
          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" className="shrink-0">
            <circle cx="7" cy="7" r="7" fill="currentColor" />
          </svg>
          <span className="text-[20px] leading-[1.2] font-bold tracking-[-0.025em] text-[color:var(--color-ink)]">vahue.ai</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) =>
            section === n.href ? (
              <span key={n.href} aria-current="page" className="text-[12px] leading-[1.5] tracking-[0.025em] px-1.5 py-1 text-[color:var(--color-ink)] bg-[#f5f5f5] cursor-default">
                {n.label}
              </span>
            ) : (
              <Link
                key={n.href}
                href={labsHref(n.href)}
                className="text-[12px] leading-[1.5] tracking-[0.025em] transition-colors px-1.5 py-1 text-[#525252] [@media(hover:hover){&:hover}]:text-[color:var(--color-ink)] [@media(hover:hover){&:hover}]:bg-[#f5f5f5]"
              >
                {n.label}
              </Link>
            ),
          )}
          <SearchButton onClick={() => setSearch(true)} />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <SearchButton onClick={() => setSearch(true)} />
          <button className="p-2 -m-2 text-[#525252] [@media(hover:hover){&:hover}]:text-[color:var(--color-ink)]" onClick={() => setMenu(!menu)} aria-label="Toggle mobile menu">
            {menu ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <LabsSearch open={search} onOpenChange={onSearch} items={searchItems} />
      {menu && (
        <div className="md:hidden border-t border-[color:var(--color-hairline)] bg-white">
          <nav className="px-6 py-4">
            <div className="flex flex-col gap-3">
              {NAV.map((n) =>
                section === n.href ? (
                  <span key={n.href} aria-current="page" className="text-[12px] leading-[1.5] tracking-[0.025em] text-[color:var(--color-ink)] font-medium cursor-default">
                    {n.label}
                  </span>
                ) : (
                  <Link
                    key={n.href}
                    href={labsHref(n.href)}
                    onClick={() => setMenu(false)}
                    className="text-[12px] leading-[1.5] tracking-[0.025em] transition-colors text-[#525252] [@media(hover:hover){&:hover}]:text-[color:var(--color-ink)]"
                  >
                    {n.label}
                  </Link>
                ),
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
