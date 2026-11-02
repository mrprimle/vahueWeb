'use client'

// labs.scale.com home sections: BlogSection 274580, ResearchSection 408028 (chunk 10l5gu25zzpir.js) and the server-rendered
// leaderboards and jobs slices (flight payload of /). Class strings verbatim.
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HeroGrid } from '@/components/site/labs/HeroGrid'
import { LabsButton } from '@/components/site/labs/LabsButton'
import { LabsLogo } from '@/components/site/labs/LabsLogo'
import type { LabsLogoContent } from '@/components/site/labs/types'
import type { LabsHomeContent } from './types'

const SECTION_HEADING = 'text-xs font-sans font-medium text-ink mb-2 tracking-wide uppercase'
const COL = 'text-xs font-sans text-ink font-semibold flex items-center gap-1.5 uppercase'
const COL_NARROW = 'text-xs font-sans text-ink font-semibold flex items-center gap-1 uppercase'

function Dot() {
  return <span className="w-1 h-1 bg-ink rounded-full inline-block shrink-0" />
}

function ViewMore({ label, href, className }: { label: string; href: string; className?: string }) {
  return (
    <LabsButton variant="outline" asChild className={className}>
      <Link href={href}>
        {label} <ArrowRight className="w-3 h-3" />
      </Link>
    </LabsButton>
  )
}

export function HeroSection({ content, logo }: { content: LabsHomeContent['hero']; logo: LabsLogoContent }) {
  return (
    <section className="w-full border-b border-hairline relative overflow-hidden">
      <HeroGrid />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 md:pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="mb-20 md:mb-28 lg:mb-36">
          <LabsLogo logo={logo} width={834} height={115} className="w-full max-w-[834px] h-auto" />
        </div>
        <div className="max-w-[640px]">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans font-semibold text-ink mb-6 text-balance">{content.title}</h1>
          <p className="text-sm leading-[1.8] text-neutral-600 font-sans">{content.body}</p>
        </div>
      </div>
    </section>
  )
}

export function LeaderboardsSection({ content }: { content: LabsHomeContent['leaderboards'] }) {
  return (
    <section className="w-full border-b border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">
        <div>
          <div className="mb-6">
            <h2 className={SECTION_HEADING}>{content.heading}</h2>
            <p className="text-xs font-sans text-neutral-600 leading-[1.7]">{content.blurb}</p>
          </div>
          <div>
            {content.items.map((item) => (
              <Link key={item.name} href={item.href} className="flex items-center py-2.5 border-t border-neutral-200 first:border-t-neutral-300 hover:bg-neutral-50 transition-colors -mx-2 px-2 rounded-sm">
                <span className="text-xs font-sans font-medium text-ink truncate">{item.name}</span>
                <ArrowRight className="w-3 h-3 ml-auto text-neutral-400 shrink-0" />
              </Link>
            ))}
          </div>
          <ViewMore label={content.more.label} href={content.more.href} className="mt-5" />
        </div>
      </div>
    </section>
  )
}

export function ResearchSection({ content }: { content: LabsHomeContent['papers'] }) {
  const items = content.items.slice(0, 6)
  const [active, setActive] = useState(0)
  const current = items[active] || items[0]
  const c = content.columns
  return (
    <section className="w-full overflow-x-hidden border-b border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">
        <div className="mb-10">
          <h2 className={SECTION_HEADING}>{content.heading}</h2>
          <p className="text-xs font-sans text-neutral-600 leading-[1.7] max-w-[640px]">{content.blurb}</p>
        </div>
        <div className="flex items-start gap-8 overflow-x-hidden">
          <div className="flex-1 min-w-0 overflow-x-hidden">
            <div className="hidden md:grid grid-cols-[100px_minmax(0,1fr)_100px_minmax(0,1fr)_28px] gap-x-3 pb-3 border-b border-ink">
              <span className={COL}>
                <Dot /> {c.date}
              </span>
              <span className={COL}>
                <Dot /> {c.title}
              </span>
              <span className={COL}>
                <Dot /> {c.category}
              </span>
              <span className={COL}>
                <Dot /> {c.authors}
              </span>
              <span />
            </div>
            <div className="grid grid-cols-[70px_1fr_28px] gap-x-3 pb-3 border-b border-ink md:hidden">
              <span className={COL_NARROW}>
                <Dot /> {c.date}
              </span>
              <span className={COL_NARROW}>
                <Dot /> {c.title}
              </span>
              <span />
            </div>
            <div className="hidden md:block">
              {items.map((p, i) => (
                <Link key={p.title} href={p.href} onMouseEnter={() => setActive(i)} className="grid min-w-0 grid-cols-[100px_minmax(0,1fr)_100px_minmax(0,1fr)_28px] gap-x-3 py-3.5 border-b border-neutral-200 hover:bg-neutral-50 transition-colors group">
                  <span className="min-w-0 text-xs font-mono text-neutral-500">{p.date}</span>
                  <span className="min-w-0 truncate text-sm font-sans text-ink font-medium">{p.title}</span>
                  <span className="min-w-0 truncate text-xs font-sans text-neutral-500">{p.categories.join(', ')}</span>
                  <span className="min-w-0 truncate text-xs font-sans text-neutral-500">{p.authors}</span>
                  <span className="flex items-center justify-end">
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                  </span>
                </Link>
              ))}
            </div>
            {items.map((p) => (
              <Link key={`m-${p.title}`} href={p.href} className="grid grid-cols-[70px_1fr_28px] gap-x-3 py-3.5 border-b border-neutral-200 hover:bg-neutral-50 transition-colors group md:hidden">
                <span className="text-xs font-mono text-neutral-500">{p.date}</span>
                <div className="min-w-0">
                  <span className="text-xs font-sans text-ink font-medium truncate block">{p.title}</span>
                  <span className="text-xs font-sans text-neutral-500">{p.categories.join(', ')}</span>
                </div>
                <span className="flex items-center justify-end">
                  <ArrowRight className="w-3 h-3 text-neutral-500" />
                </span>
              </Link>
            ))}
            <ViewMore label={content.more.label} href={content.more.href} className="mt-5" />
          </div>
          <div className="hidden xl:flex xl:flex-col xl:items-start xl:justify-start w-[280px] shrink-0 self-start relative">
            <div className="w-full flex flex-col items-start justify-start">
              <div className="w-full aspect-square bg-white overflow-hidden relative border border-neutral-200">
                {items.map((p, i) =>
                  p.image ? (
                    <div key={p.title} className="absolute inset-0 transition-opacity duration-300 ease-in-out" style={{ opacity: +(active === i) }}>
                      <div className="absolute inset-6">
                        <Image src={p.image} alt={p.title} fill sizes="280px" unoptimized={p.image.endsWith('.svg')} className="object-contain object-center" />
                      </div>
                    </div>
                  ) : (
                    <div key={p.title} className="absolute inset-0 w-full h-full bg-neutral-200 flex items-center justify-center transition-opacity duration-300 ease-in-out" style={{ opacity: +(active === i) }}>
                      <span className="text-xs font-sans text-ink-faint">{content.noImage}</span>
                    </div>
                  ),
                )}
              </div>
              {current ? (
                <div className="mt-3">
                  <p className="text-xs font-sans font-medium text-ink mb-1">{current.title}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function BlogSection({ content }: { content: LabsHomeContent['blog'] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])
  const scroll = (direction: 'left' | 'right') => {
    const el = ref.current
    if (!el) return
    const width = el.querySelector('a')?.offsetWidth || 300
    el.scrollBy({ left: direction === 'left' ? -(width + 24) : width + 24, behavior: 'smooth' })
  }
  useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])
  return (
    <section id="blog" className="w-full border-b border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={SECTION_HEADING}>{content.heading}</h2>
            <p className="text-xs font-sans text-neutral-600 leading-[1.7]">{content.blurb}</p>
          </div>
          <div className="flex items-center gap-1">
            <LabsButton variant="outline" size="icon" onClick={() => scroll('left')} disabled={!canPrev} aria-label={content.previous} className="border-neutral-300">
              <ChevronLeft className="w-4 h-4" />
            </LabsButton>
            <LabsButton variant="outline" size="icon" onClick={() => scroll('right')} disabled={!canNext} aria-label={content.next} className="border-neutral-300">
              <ChevronRight className="w-4 h-4" />
            </LabsButton>
          </div>
        </div>
        <div ref={ref} data-blog-carousel className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{'[data-blog-carousel]::-webkit-scrollbar { display: none; }'}</style>
          {content.items.map((post) => (
            <Link key={post.title} href={post.href} className="group shrink-0 w-[280px] md:w-[320px] lg:w-[340px] snap-start">
              <div className="flex items-center gap-2.5">
                {post.category ? <span className="text-xs font-sans text-ink border border-hairline px-2 py-0.5 uppercase tracking-wider">{post.category}</span> : null}
                <span className="text-xs font-mono text-ink-faint tracking-wider uppercase">{post.date}</span>
              </div>
              <h3 className="text-sm font-sans font-medium text-ink mt-1.5 leading-snug line-clamp-2 group-hover:underline underline-offset-2 decoration-ink-faint">{post.title}</h3>
              <p className="text-xs font-sans text-neutral-500 mt-2 leading-relaxed line-clamp-2">{post.intro}</p>
            </Link>
          ))}
          <Link href={content.allHref} className="group shrink-0 w-[180px] snap-start flex flex-col justify-center border-l border-neutral-300 pl-6">
            <span className="text-xs font-sans text-neutral-600 group-hover:text-ink tracking-wider uppercase transition-colors">{content.viewAll}</span>
            <span className="flex items-center gap-1.5 mt-1.5">
              <span className="text-sm font-sans font-medium text-ink">{content.allPosts}</span>
              <ArrowRight className="w-3.5 h-3.5 text-ink group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function JobsSection({ content }: { content: LabsHomeContent['jobs'] }) {
  const c = content.columns
  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">
        <h2 className="text-xs font-sans font-medium text-ink mb-10 tracking-wide uppercase">{content.heading}</h2>
        <div className="grid grid-cols-[1fr_24px] md:grid-cols-[100px_1fr_1fr_24px] gap-x-3 md:gap-x-4 pb-3 border-b border-ink">
          <span className="hidden md:flex text-xs font-sans text-ink font-semibold items-center gap-1.5 uppercase">
            <Dot /> {c.date}
          </span>
          <span className="text-xs font-sans text-ink font-semibold flex items-center gap-1 md:gap-1.5 uppercase">
            <Dot /> {c.position}
          </span>
          <span className="hidden md:flex text-xs font-sans text-ink font-semibold items-center gap-1.5 uppercase">
            <Dot /> {c.location}
          </span>
          <span />
        </div>
        {content.items.map((job) => (
          <Link key={job.title} href={job.href} target="_blank" rel="noopener noreferrer" className="grid grid-cols-[1fr_24px] md:grid-cols-[100px_1fr_1fr_24px] gap-x-3 md:gap-x-4 py-3 border-b border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer group">
            <span className="hidden md:block text-xs font-mono text-neutral-500">{job.date}</span>
            <div>
              <span className="text-xs font-sans text-ink font-medium uppercase block">{job.title}</span>
              <span className="text-xs font-sans text-neutral-500 mt-0.5 block md:hidden">
                {job.location} · <span className="font-mono">{job.date}</span>
              </span>
            </div>
            <span className="hidden md:block text-xs font-sans text-neutral-500 uppercase">{job.location}</span>
            <span className="flex items-center justify-end">
              <ArrowDown className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </Link>
        ))}
        <div className="mt-8">
          <ViewMore label={content.more.label} href={content.more.href} />
        </div>
      </div>
    </section>
  )
}
