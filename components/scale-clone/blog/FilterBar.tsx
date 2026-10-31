'use client'

import { useEffect, useRef, useState } from 'react'
import { CATEGORIES } from './posts'
import s from './blog.module.css'

/*
 * scale.com/blog tag bar (module 507457, function n).
 * < 768px: horizontal rail of every tag (no scrollbar, active pill scrolled into view) + round search button.
 * >= 768px: "All" + first 5 tags inline, the rest in a "More" dropdown (w-52 panel, closes on outside mousedown),
 * then a 224px search button with a ⌘K hint.
 * Pill: px-3 py-1.5 rounded-full detail-mono; active bg-black text-white; idle #f2f2f2 / #575757, hover #eaeaea.
 */

export const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" aria-hidden="true">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`text-base transition-transform ${open ? 'rotate-180' : ''}`}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    aria-hidden="true"
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
)

const pill = (on: boolean) =>
  `${s.detailMono} shrink-0 rounded-full px-3 py-1.5 font-mono transition-colors focus:outline-none ${
    on ? 'bg-black text-white' : 'bg-[#f2f2f2] text-[#575757] hover:bg-[#eaeaea]'
  }`

type Props = { active: string; onSelect: (slug: string) => void; onSearchOpen: () => void }

export default function FilterBar({ active, onSelect, onSearchOpen }: Props) {
  const [open, setOpen] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const inline = CATEGORIES.slice(0, 5)
  const more = CATEGORIES.slice(5)
  const moreActive = more.some((c) => c.slug === active)

  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const el = rail.current?.querySelector('[aria-current]')
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
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
          <button type="button" className={pill(!active)} aria-current={active ? undefined : 'page'} onClick={() => onSelect('')}>
            All
          </button>
          {CATEGORIES.map((c) => (
            // TODO: Vahue copy
            <button
              key={c.slug}
              type="button"
              className={pill(active === c.slug)}
              aria-current={active === c.slug ? 'page' : undefined}
              onClick={() => onSelect(c.slug)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onSearchOpen}
          className="flex shrink-0 items-center rounded-full bg-[#f2f2f2] px-3 py-1.5 text-[#575757] focus:outline-none"
          aria-label="Search"
        >
          <SearchIcon className="text-base" />
        </button>
      </div>

      {/* desktop row */}
      <div className="hidden gap-3 md:flex md:flex-row md:items-center md:gap-4">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <button type="button" className={pill(!active)} aria-pressed={!active} onClick={() => onSelect('')}>
            All
          </button>
          {inline.map((c) => (
            <button key={c.slug} type="button" className={pill(active === c.slug)} aria-pressed={active === c.slug} onClick={() => onSelect(c.slug)}>
              {c.name}
            </button>
          ))}
          {more.length > 0 && (
            <div ref={menu} className="relative">
              <button type="button" onClick={() => setOpen((o) => !o)} className={pill(moreActive)} aria-expanded={open}>
                <span className="flex items-center gap-1">
                  {moreActive ? more.find((c) => c.slug === active)?.name : 'More'}
                  <Chevron open={open} />
                </span>
              </button>
              {open && (
                <div className="absolute left-0 top-full z-50 mt-1.5 w-52 overflow-hidden rounded-xl border border-[#c7c7c7] bg-white py-1 shadow-lg">
                  {more.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => {
                        onSelect(c.slug)
                        setOpen(false)
                      }}
                      className={`${s.detailMono} flex w-full items-center justify-between px-4 py-2.5 text-left font-mono transition-colors ${
                        active === c.slug ? 'bg-[#f2f2f2] text-black' : 'text-[#575757] hover:bg-[#f2f2f2] hover:text-black'
                      }`}
                    >
                      {c.name}
                      {active === c.slug && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onSearchOpen}
          className={`${s.detailMono} flex w-56 shrink-0 items-center gap-2 rounded-xl border border-[#c7c7c7] bg-white py-2 pl-3 pr-4 text-left font-mono text-[#929292] transition-colors hover:border-[#575757] hover:text-black focus:outline-none`}
        >
          <SearchIcon className="shrink-0 text-lg" />
          <span className="flex-1">Search...</span>
          <span className="rounded bg-[#f2f2f2] px-1.5 py-0.5 text-xs text-[#929292]">⌘K</span>
        </button>
      </div>
    </div>
  )
}
