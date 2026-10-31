'use client'

import { useEffect, useState } from 'react'
import s from './styles.module.css'

/*
 * scale.com LogoCarousel (chunk 01xb85jkvr5_y, module 236943), on Vahue dark.
 * Items chunked in groups of 4. Desktop (md+): groups stacked absolutely in a 64px row, justify-between;
 * the active group is opacity-100 with delay-300, the rest opacity-0, transition-opacity 700ms.
 * A setTimeout of 4500ms advances the index (re-armed on every change). Mobile: one horizontal
 * overflow-x list (gap-10, px-6, no scrollbar) of every item.
 * Brand rule: no customer logos. The rotating groups are the names of the systems the agents work in.
 */

const Name = ({ name }: { name: string }) => (
  <span className="whitespace-nowrap font-display text-[22px] font-medium leading-[28px] tracking-[-0.01em] text-white/55">
    {name}
  </span>
)

type Props = {
  names: string[]
  line: string
  link?: { label: string; href: string }
}

export default function LogoCarousel({ names, line, link }: Props) {
  const groups: string[][] = []
  for (let i = 0; i < names.length; i += 4) groups.push(names.slice(i, i + 4))
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (groups.length <= 1) return
    const id = setTimeout(() => setActive((a) => (a + 1) % groups.length), 4500)
    return () => clearTimeout(id)
  }, [active, groups.length])

  return (
    <div>
      <p className={`${s.bodyBase} mx-auto mb-10 w-full max-w-[698px] text-balance px-4 text-center font-display text-white/70`}>
        {line}
        {link ? (
          <>
            {' '}
            <a href={link.href} className="whitespace-nowrap text-white underline-offset-2 hover:underline">
              {link.label} →
            </a>
          </>
        ) : null}
      </p>
      <ul className="sr-only">
        {names.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <div className="relative hidden h-16 md:block" aria-hidden="true">
        {groups.map((g, gi) => (
          <ul
            key={gi}
            className={`absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between gap-8 transition-opacity duration-700 ${
              gi === active ? 'opacity-100 delay-300' : 'opacity-0'
            }`}
          >
            {g.map((n) => (
              <li key={n} className="flex items-center justify-center">
                <Name name={n} />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <ul className={`${s.noScrollbar} flex items-center gap-10 overflow-x-auto px-6 md:hidden`} aria-hidden="true">
        {names.map((n) => (
          <li key={n} className="shrink-0">
            <Name name={n} />
          </li>
        ))}
      </ul>
    </div>
  )
}
