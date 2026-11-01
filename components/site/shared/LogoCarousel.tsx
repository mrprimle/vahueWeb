'use client'

// Scale module 236943 (LogoCarousel). From `md`: pages of 4 logos, cross-fading every 4.5s. Below `md`: one row with native horizontal scroll.
// A logo with no `src` draws a neutral tile at the same box.
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useThemeStore } from '../lib/themeStore'

export type CarouselLogo = { alt: string; width: number; height: number; src?: string }

function LogoItem({ logo, dark, priority }: { logo: CarouselLogo; dark: boolean; priority?: boolean }) {
  if (!logo.src) {
    return (
      <span className="flex items-center justify-center rounded-sm border border-current text-[10px] opacity-60" style={{ width: logo.width, height: logo.height }}>
        Logo
      </span>
    )
  }
  return <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className={`brightness-0 ${dark ? 'invert' : ''}`} priority={priority} />
}

export function LogoCarousel({ logos, copy, href, linkText }: { logos: CarouselLogo[]; copy: string; href: string; linkText: string }) {
  const dark = useThemeStore((s) => s.pageTheme) === 'dark'
  const pages: CarouselLogo[][] = []
  for (let i = 0; i < logos.length; i += 4) pages.push(logos.slice(i, i + 4))
  const [page, setPage] = useState(0)
  useEffect(() => {
    if (pages.length <= 1) return
    const t = setTimeout(() => setPage((p) => (p + 1) % pages.length), 4500)
    return () => clearTimeout(t)
  }, [page, pages.length])
  return (
    <div>
      <p className={`w-full mb-10 text-base text-center text-balance ${dark ? 'text-white/70' : 'text-black/70'} max-w-[698px] px-4 mx-auto`}>
        {copy}{' '}
        <Link href={href} target="_blank" className="hover:underline underline-offset-2 whitespace-nowrap">
          {linkText}
        </Link>
      </p>
      <div className="relative hidden h-16 md:block">
        {pages.map((items, i) => (
          <ul key={i} className={`absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between gap-8 transition-opacity duration-700 ${i === page ? 'opacity-100 delay-300' : 'opacity-0'}`}>
            {items.map((logo, j) => (
              <li key={j} className="flex items-center justify-center">
                <LogoItem logo={logo} dark={dark} priority />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <ul className="flex items-center gap-10 px-6 overflow-x-auto md:hidden scrollbar-none">
        {logos.map((logo, i) => (
          <li key={i} className="flex-shrink-0">
            <LogoItem logo={logo} dark={dark} />
          </li>
        ))}
      </ul>
    </div>
  )
}
