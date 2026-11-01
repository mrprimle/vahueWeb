'use client'

import { useEffect, useState } from 'react'
import s from './insurance.module.css'

/*
 * scale.com LogoCarousel (chunk 01xb85jkvr5_y, module 236943).
 * Logos chunked in groups of 4. Desktop (md+): groups stacked absolutely in a 64px row, justify-between;
 * the active group is opacity-100 with delay-300, the rest opacity-0, transition-opacity 700ms.
 * A setTimeout of 4500ms advances the index (re-armed on every change). Mobile: one horizontal
 * overflow-x list (gap-10, px-6, no scrollbar) of every logo.
 * Brand rule: customer logos are replaced with same-size neutral placeholder tiles.
 */

// Rendered sizes of Scale's 7 logos at 1440 (group 1 measured, group 2 read from the screenshot): groups of 4 + 3.
// TODO: Vahue customer logos
const LOGOS = [
  { w: 56, h: 56 },
  { w: 70, h: 37 },
  { w: 82, h: 26 },
  { w: 64, h: 37 },
  { w: 168, h: 28 },
  { w: 242, h: 44 },
  { w: 150, h: 28 },
]

// Desktop li is flex (tile sits tight); the mobile li holds an inline <img> on Scale, so the line box adds
// a few px under each logo. inline-block tiles reproduce that.
const Tile = ({ w, h, inline = false }: { w: number; h: number; inline?: boolean }) => (
  <span
    aria-hidden="true"
    className={`${inline ? 'inline-block' : 'block'} rounded-[4px] bg-black/[0.12]`}
    style={{ width: w, height: h }}
  />
)

export default function LogoCarousel() {
  const groups: (typeof LOGOS)[] = []
  for (let i = 0; i < LOGOS.length; i += 4) groups.push(LOGOS.slice(i, i + 4))
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (groups.length <= 1) return
    const id = setTimeout(() => setActive((a) => (a + 1) % groups.length), 4500)
    return () => clearTimeout(id)
  }, [active, groups.length])

  return (
    <div>
      {/* TODO: Vahue copy */}
      <p className={`${s.bodyBase} mx-auto mb-10 w-full max-w-[698px] text-balance px-4 text-center font-display text-black/70`}>
        Placeholder line about the teams that rely on us.{' '}
        <a href="#" className="whitespace-nowrap underline-offset-2 hover:underline">
          Placeholder link →
        </a>
      </p>
      <div className="relative hidden h-16 md:block">
        {groups.map((g, gi) => (
          <ul
            key={gi}
            className={`absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between gap-8 transition-opacity duration-700 ${
              gi === active ? 'opacity-100 delay-300' : 'opacity-0'
            }`}
          >
            {g.map((l, li) => (
              <li key={li} className="flex items-center justify-center">
                <Tile {...l} />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <ul className={`${s.noScrollbar} flex items-center gap-10 overflow-x-auto px-6 md:hidden`}>
        {LOGOS.map((l, i) => (
          <li key={i} className="shrink-0">
            <Tile {...l} inline />
          </li>
        ))}
      </ul>
    </div>
  )
}
