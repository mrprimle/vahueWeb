'use client'

// Scale module 970272 (LogoCloud) with react-fast-marquee (922998) on phones. Carousel branch not ported: no page sets it yet.
// A logo with no `src` draws a neutral tile at the same box.
import Image from 'next/image'
import { Children, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { useThemeStore } from '../lib/themeStore'

export type CloudLogo = { alt: string; width: number; height: number; src?: string }

const MARQUEE_CSS = `.rfm-marquee-container{overflow-x:hidden;display:flex;flex-direction:row;position:relative;width:var(--width);transform:var(--transform)}.rfm-marquee-container:hover div{animation-play-state:var(--pause-on-hover)}.rfm-marquee-container:active div{animation-play-state:var(--pause-on-click)}.rfm-marquee{flex:0 0 auto;min-width:var(--min-width);z-index:1;display:flex;flex-direction:row;align-items:center;animation:scroll var(--duration) linear var(--delay) var(--iteration-count);animation-play-state:var(--play);animation-delay:var(--delay);animation-direction:var(--direction)}@keyframes scroll{0%{transform:translateX(0%)}100%{transform:translateX(-100%)}}.rfm-initial-child-container{flex:0 0 auto;display:flex;min-width:auto;flex-direction:row;align-items:center}.rfm-child{transform:var(--transform)}`

/** Module 922998 with its defaults: left, speed 50px/s, no autoFill, no gradient. */
function Marquee({ children, speed = 50 }: { children: ReactNode; speed?: number }) {
  const [containerWidth, setContainerWidth] = useState(0)
  const [marqueeWidth, setMarqueeWidth] = useState(0)
  const [mounted, setMounted] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const marquee = useRef<HTMLDivElement>(null)
  const measure = useCallback(() => {
    if (!marquee.current || !container.current) return
    setContainerWidth(container.current.getBoundingClientRect().width)
    setMarqueeWidth(marquee.current.getBoundingClientRect().width)
  }, [])
  useEffect(() => {
    if (!mounted || !marquee.current || !container.current) return
    measure()
    const ro = new ResizeObserver(() => measure())
    ro.observe(container.current)
    ro.observe(marquee.current)
    return () => ro.disconnect()
  }, [measure, mounted])
  useEffect(() => measure(), [measure, children])
  useEffect(() => setMounted(true), [])
  const duration = useMemo(() => (marqueeWidth < containerWidth ? containerWidth / speed : marqueeWidth / speed), [containerWidth, marqueeWidth, speed])
  if (!mounted) return null
  const containerStyle = { '--pause-on-hover': 'running', '--pause-on-click': 'running', '--width': '100%', '--transform': 'none' } as CSSProperties
  const marqueeStyle = { '--play': 'running', '--direction': 'normal', '--duration': `${duration}s`, '--delay': '0s', '--iteration-count': 'infinite', '--min-width': '100%' } as CSSProperties
  const childStyle = { '--transform': 'none' } as CSSProperties
  const kids = Children.map(children, (c) => (
    <div style={childStyle} className="rfm-child">
      {c}
    </div>
  ))
  return (
    <div ref={container} style={containerStyle} className="rfm-marquee-container">
      <style href="rfm-marquee" precedence="low">
        {MARQUEE_CSS}
      </style>
      <div className="rfm-marquee" style={marqueeStyle}>
        <div className="rfm-initial-child-container" ref={marquee}>
          {kids}
        </div>
      </div>
      <div className="rfm-marquee" style={marqueeStyle}>
        {kids}
      </div>
    </div>
  )
}

function LogoItem({ logo, className, theme }: { logo: CloudLogo; className?: string; theme: string }) {
  return (
    <li className={cn(className, 'flex flex-col items-center justify-center gap-3 ml-12 md:ml-0')}>
      <div className="relative">
        {logo.src ? (
          <Image width={logo.width} height={logo.height} className={`brightness-0 ${theme === 'dark' ? 'invert' : ''}`} src={logo.src} alt={logo.alt} priority style={{ width: logo.width, height: logo.height }} />
        ) : (
          <span className="flex items-center justify-center rounded-sm border border-current text-[10px] opacity-60" style={{ width: logo.width, height: logo.height }}>
            Logo
          </span>
        )}
      </div>
    </li>
  )
}

export function LogoCloud({ logos, copy, link }: { logos: CloudLogo[]; copy?: string; link?: { title: string; href: string } }) {
  const theme = useThemeStore((s) => s.pageTheme)
  const n = logos.length
  let perRow = Math.ceil(Math.sqrt(n))
  if (n < 6) perRow = n
  if (n === 6) perRow = 6
  if (n === 7 || n === 8) perRow = 4
  if (n >= 9) perRow = 5
  return (
    <div>
      {copy ? (
        <p className={`w-full mb-12 text-base text-center text-balance ${theme === 'dark' ? 'text-silver' : 'text-gray-700'} max-w-[698px] px-4 mx-auto`}>
          <span className="mr-2">{copy}</span>
          {link ? (
            <span className="inline">
              <a className="group inline-flex items-center gap-1 transition-colors duration-300 text-link text-base" aria-label={link.title} target="_self" href={link.href}>
                <span className="font-medium">{link.title}</span>
                <span className="transition-transform duration-300 ease-out inline-block arrow font-unicode group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </a>
            </span>
          ) : null}
        </p>
      ) : null}
      <div className="hidden md:block">
        <ul
          className={cn('items-center md:gap-y-16 sm:min-h-[52px] gap-8 flex', n < 4 ? 'justify-around' : 'justify-between', n > 6 && 'grid', n < 7 && 'container')}
          style={{ gridTemplateColumns: `repeat(${2 * perRow}, minmax(0, 1fr))` }}
        >
          {logos.slice(0, 32).map((logo, i) => (
            <LogoItem key={i} logo={logo} theme={theme} className={cn(i === perRow && n < 10 && n % 2 !== 0 ? 'col-start-2' : '', 'col-span-2')} />
          ))}
        </ul>
      </div>
      <div className="md:hidden">
        <Marquee>
          {logos.slice(0, 32).map((logo, i) => (
            <LogoItem key={i} logo={logo} theme={theme} />
          ))}
        </Marquee>
      </div>
    </div>
  )
}
