'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { categoryHref, type BlogContent } from './content'
import s from './blog.module.css'

/*
 * scale.com/blog tag bar (module 507457, function n). Pills are Next Links: "All" -> /blog, tags -> /blog/category/<slug>.
 * < 768px: rail of every tag (overflow-x auto, no scrollbar) + round search button. The active pill carries
 *   aria-current="page"; on mount and on every category change the rail's first [aria-current] is scrolled into view
 *   ({ block: "nearest", inline: "center", behavior: "smooth" }).
 * >= 768px: "All" + first 5 tags, the rest in a "More" button + panel (w-52, mt-1.5, closes on document mousedown
 *   outside its wrapper; the button toggles; picking an item closes it), then a 224px search button with a ⌘K hint.
 * Pill: px-3 py-1.5 rounded-full detail-mono, transition-colors 150ms; active bg-black/white;
 *   idle gray-95 #F2F2F2 / gray-30 #575757, hover gray-90 #EAEAEA. focus:outline-none.
 */

export const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" aria-hidden="true">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)

const Chevron = ({ open }: { open: boolean }) => (
  <svg className={`${s.chevron} text-base ${open ? s.chevronOpen : ''}`} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" aria-hidden="true">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
)

const pill = (on: boolean) =>
  `${s.detailMono} ${s.ease} shrink-0 rounded-full px-3 py-1.5 font-mono transition-colors focus:outline-none ${s.noOutline} ${
    on ? 'bg-black text-white' : `bg-[#f2f2f2] text-[#575757] ${s.hoverGray90}`
  }`

type Props = { content: BlogContent; activeCategory: string; onSearchOpen: () => void }

export default function FilterBar({ content, activeCategory: active, onSearchOpen }: Props) {
  const { tags, labels, hrefs } = content
  const [open, setOpen] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const inline = tags.slice(0, 5)
  const more = tags.slice(5)
  const moreActive = more.some((c) => c.slug === active)

  useEffect(() => {
    rail.current?.querySelector('[aria-current]')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [active])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (menu.current && !menu.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div className="flex flex-col gap-3">
      {/* mobile rail */}
      <div className="-mx-4 flex items-center gap-2 px-4 md:hidden">
        <div ref={rail} className={`${s.rail} flex flex-1 items-center gap-2 overflow-x-auto pb-0.5`}>
          <Link href={hrefs.all} className={pill(!active)} aria-current={active ? undefined : 'page'}>
            {labels.all}
          </Link>
          {tags.map((c) => (
            <Link key={c.id} href={categoryHref(content, c.slug)} className={pill(active === c.slug)} aria-current={active === c.slug ? 'page' : undefined}>
              {c.name}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={onSearchOpen}
          className={`${s.ease} flex shrink-0 items-center rounded-full bg-[#f2f2f2] px-3 py-1.5 text-[#575757] focus:outline-none ${s.noOutline}`}
          aria-label={labels.searchAria}
        >
          <SearchIcon className="text-base" />
        </button>
      </div>

      {/* desktop row */}
      <div className="hidden gap-3 md:flex md:flex-row md:items-center md:gap-4">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <Link href={hrefs.all} className={pill(!active)}>
            {labels.all}
          </Link>
          {inline.map((c) => (
            <Link key={c.id} href={categoryHref(content, c.slug)} className={pill(active === c.slug)}>
              {c.name}
            </Link>
          ))}
          {more.length > 0 && (
            <div ref={menu} className="relative">
              <button type="button" onClick={() => setOpen((o) => !o)} className={pill(moreActive)}>
                <span className="flex items-center gap-1">
                  {moreActive ? tags.find((c) => c.slug === active)?.name : labels.more}
                  <Chevron open={open} />
                </span>
              </button>
              {open && (
                <div className="absolute left-0 top-full z-50 mt-1.5 w-52 overflow-hidden rounded-xl border border-[#c7c7c7] bg-white py-1 shadow-lg">
                  {more.map((c) => (
                    <Link
                      key={c.id}
                      href={categoryHref(content, c.slug)}
                      onClick={() => setOpen(false)}
                      className={`${s.detailMono} ${s.ease} ${s.focusRing} flex items-center justify-between px-4 py-2.5 font-mono transition-colors ${
                        active === c.slug ? 'bg-[#f2f2f2] text-black' : `text-[#575757] ${s.hoverItem}`
                      }`}
                    >
                      {c.name}
                      {active === c.slug && <span>✓</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onSearchOpen}
          className={`${s.detailMono} ${s.ease} ${s.hoverSearch} flex w-56 shrink-0 items-center gap-2 rounded-xl border border-[#c7c7c7] bg-white py-2 pl-3 pr-4 text-left font-mono text-[#929292] transition-colors focus:outline-none ${s.noOutline}`}
        >
          <SearchIcon className="shrink-0 text-lg" />
          <span className="flex-1">{labels.searchButton}</span>
          <span className={`${s.kbd} rounded bg-[#f2f2f2] px-1.5 py-0.5 text-[#929292]`}>{labels.searchShortcut}</span>
        </button>
      </div>
    </div>
  )
}
