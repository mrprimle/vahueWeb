'use client'

import { useEffect, useState } from 'react'
import s from './styles.module.css'

/*
 * scale.com LogoCarousel (chunk 01xb85jkvr5_y, module 236943), 1:1 from the enterprise-insurance clone
 * (components/scale-clone/enterprise-insurance/LogoCarousel.tsx), Scale's colours.
 * Logos chunked in groups of 4 (Scale: 7 logos, 4 + 3). Desktop (md+): groups stacked absolutely in a 64px row,
 * justify-between; the active group is opacity-100 with delay-300, the rest opacity-0, transition-opacity 700ms.
 * A setTimeout of 4500ms advances the index (re-armed on every change). Mobile: one horizontal overflow-x list
 * (gap-10, px-6, no scrollbar) of every logo.
 * Brand rule: no logo images. Each slot is a text tile with the client's name, at the clone's tile height and
 * minimum width (so the row and strip heights hold).
 */

// The clone's rendered tile sizes (Scale's 7 logos at 1440).
const SIZES = [
  { w: 56, h: 56 },
  { w: 70, h: 37 },
  { w: 82, h: 26 },
  { w: 64, h: 37 },
  { w: 168, h: 28 },
  { w: 242, h: 44 },
  { w: 150, h: 28 },
]

const Tile = ({ name, w, h, inline = false }: { name: string; w: number; h: number; inline?: boolean }) => (
  <span
    className={`${inline ? 'inline-flex' : 'flex'} items-center justify-center whitespace-nowrap font-display text-[20px] font-medium leading-none tracking-[-0.02em] text-black/60`}
    style={{ minWidth: w, height: h }}
  >
    {name}
  </span>
)

type Props = {
  /** Seven client names, in slot order (4 + 3). */
  names: string[]
  line: string
  link: { label: string; href: string }
}

export default function LogoCarousel({ names, line, link }: Props) {
  const logos = SIZES.map((size, i) => ({ ...size, name: names[i % names.length] }))
  const groups: (typeof logos)[] = []
  for (let i = 0; i < logos.length; i += 4) groups.push(logos.slice(i, i + 4))
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (groups.length <= 1) return
    const id = setTimeout(() => setActive((a) => (a + 1) % groups.length), 4500)
    return () => clearTimeout(id)
  }, [active, groups.length])

  return (
    <div>
      <p className={`${s.bodyBase} mx-auto mb-10 w-full max-w-[698px] text-balance px-4 text-center font-display text-black/70`}>
        {line}{' '}
        <a href={link.href} className="whitespace-nowrap underline-offset-2 hover:underline">
          {link.label} →
        </a>
      </p>
      <div className="relative hidden h-16 md:block">
        {groups.map((g, gi) => (
          <ul
            key={gi}
            aria-hidden={gi !== active}
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
        {logos.map((l, i) => (
          <li key={i} className="shrink-0">
            <Tile {...l} inline />
          </li>
        ))}
      </ul>
    </div>
  )
}
