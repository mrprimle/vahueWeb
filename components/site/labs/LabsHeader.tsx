'use client'

// labs.scale.com module 595877 (UnifiedHeader). Class strings verbatim. Inkeep's modal is replaced by LabsSearch (static index).
import { Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { LabsLogo } from './LabsLogo'
import { LabsSearch } from './LabsSearch'
import type { LabsChromeContent, LabsSearchEntry } from './types'

function SearchButton({ label, shortcut, onClick }: { label: string; shortcut: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex cursor-pointer items-center gap-1.5 px-2 py-1.5 text-neutral-600 transition-colors hover:text-ink" aria-label={label}>
      <Search className="w-4 h-4" />
      <span className="text-xs font-mono hidden sm:inline">{shortcut}</span>
    </button>
  )
}

export function LabsHeader({ content, searchIndex }: { content: LabsChromeContent; searchIndex: LabsSearchEntry[] }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const openSearch = useCallback(() => setSearchOpen(true), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const items = [content.nav.papers, content.nav.blog, content.nav.leaderboard].map((n) => ({ ...n, isActive: !!pathname?.startsWith(n.href) }))

  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-xl border-b border-hairline">
      <div className="flex items-center justify-between px-6 h-14">
        <Link href={content.homeHref} className="flex items-center transition-opacity hover:opacity-80">
          <LabsLogo logo={content.logo} width={140} height={19} />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {items.map((n) =>
            n.isActive ? (
              <span key={n.href} aria-current="page" className="text-xs font-sans tracking-wide px-1.5 py-1 text-ink bg-neutral-100 cursor-default">
                {n.label}
              </span>
            ) : (
              <Link key={n.href} className="text-xs font-sans tracking-wide transition-colors px-1.5 py-1 text-neutral-600 hover:text-ink hover:bg-neutral-100" href={n.href}>
                {n.label}
              </Link>
            ),
          )}
          <SearchButton label={content.searchLabel} shortcut={content.shortcut} onClick={openSearch} />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <SearchButton label={content.searchLabel} shortcut={content.shortcut} onClick={openSearch} />
          <button className="p-2 -m-2 text-neutral-600 hover:text-ink" onClick={() => setMenuOpen(!menuOpen)} aria-label={content.mobileMenuLabel}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <LabsSearch open={searchOpen} onOpenChange={setSearchOpen} content={content.search} index={searchIndex} />
      {menuOpen ? (
        <div className="md:hidden border-t border-hairline bg-white">
          <nav className="px-6 py-4">
            <div className="flex flex-col gap-3">
              {items.map((n) =>
                n.isActive ? (
                  <span key={n.href} aria-current="page" className="text-xs font-sans tracking-wide text-ink font-medium cursor-default">
                    {n.label}
                  </span>
                ) : (
                  <Link key={n.href} className="text-xs font-sans tracking-wide transition-colors text-neutral-600 hover:text-ink" href={n.href} onClick={() => setMenuOpen(false)}>
                    {n.label}
                  </Link>
                ),
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
