'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import ScrollReveal from '@/components/templates/labs-shared/ScrollReveal'
import WgslGridBg from '@/components/templates/labs-shared/WgslGridBg'
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from '@/components/templates/labs-shared/icons'
import { BTN_ICON, BTN_OUTLINE, labsHref } from '@/components/templates/labs-shared/links'
import s from '@/components/templates/labs-shared/labs.module.css'
import type { LabsHomeContent } from './content'

/*
 * Labs home layout (app/(home)/page). Sections, in order:
 *   Hero (WgslGridBg + logo + H1/body) · [LEADERBOARDS] · [PAPERS] (ResearchSection, hover-to-preview) ·
 *   [BLOG] (BlogSection carousel) · [Jobs]; each section below the hero wrapped in ScrollReveal.
 * Spec: reference-snapshots/scale-clone/labs.md
 */
const H2 = 'text-[12px] leading-[1.5] font-medium text-[color:var(--color-ink)] mb-2 tracking-[0.025em] uppercase m-0'
const INTRO = 'text-[12px] text-[#525252] leading-[1.7] m-0'
const WRAP = 'mx-auto max-w-[1400px] px-6 lg:px-10'

function Dot() {
  return <span className="w-1 h-1 bg-[color:var(--color-ink)] rounded-full inline-block shrink-0" />
}

function Hero({ c }: { c: LabsHomeContent['hero'] }) {
  return (
    <section className="w-full border-b border-[color:var(--color-hairline)] relative overflow-hidden">
      <WgslGridBg />
      <div className={`relative z-10 ${WRAP} pt-16 md:pt-24 lg:pt-32 pb-16 lg:pb-24`}>
        <div className="mb-20 md:mb-28 lg:mb-36">
          {c.logo}
        </div>
        <div className="max-w-[640px]">
          <h1 className="text-[24px] leading-[1.5] md:text-[30px] md:leading-[1.5] lg:text-[36px] lg:leading-[1.25] font-semibold tracking-normal text-[color:var(--color-ink)] mb-6 mt-0 [text-wrap:balance]">
            {c.title}
          </h1>
          <p className="text-[14px] leading-[1.8] text-[#525252] m-0">{c.body}</p>
        </div>
      </div>
    </section>
  )
}

function Leaderboards({ c }: { c: LabsHomeContent['leaderboards'] }) {
  return (
    <section className="w-full border-b border-[color:var(--color-hairline)]">
      <div className={`${WRAP} py-14`}>
        <div>
          <div className="mb-6">
            <h2 className={H2}>{c.title}</h2>
            <p className={INTRO}>{c.intro}</p>
          </div>
          <div>
            {c.items.map((l, i) => (
              <Link
                key={l.href}
                href={labsHref(l.href)}
                className={`flex items-center py-2.5 border-t ${i === 0 ? 'border-t-[#d4d4d4]' : 'border-[#e5e5e5]'} [@media(hover:hover){&:hover}]:bg-[#fafafa] transition-colors -mx-2 px-2`}
              >
                <span className="text-[12px] leading-[1.5] font-medium text-[color:var(--color-ink)] truncate">{l.name}</span>
                {l.value && <span className={`${s.mono} ml-auto pl-3 text-[12px] leading-[1.5] text-[#737373] shrink-0`}>{l.value}</span>}
                <ArrowRight className={`w-3 h-3 ${l.value ? 'ml-3' : 'ml-auto'} text-[#a3a3a3] shrink-0`} />
              </Link>
            ))}
          </div>
          <Link href={labsHref(c.more)} className={`${s.btn} ${BTN_OUTLINE} mt-5`}>
            View more <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Papers({ c }: { c: LabsHomeContent['papers'] }) {
  const items = c.items.slice(0, 6)
  const [active, setActive] = useState(0)
  const cur = items[active] || items[0]
  const head = 'text-[12px] leading-[1.5] text-[color:var(--color-ink)] font-semibold flex items-center uppercase'
  return (
    <section className="w-full overflow-x-hidden border-b border-[color:var(--color-hairline)]">
      <div className={`${WRAP} py-14`}>
        <div className="mb-10">
          <h2 className={H2}>{c.title}</h2>
          <p className={`${INTRO} max-w-[640px]`}>{c.intro}</p>
        </div>
        <div className="flex items-start gap-8 overflow-x-hidden">
          <div className="flex-1 min-w-0 overflow-x-hidden">
            <div className="hidden md:grid grid-cols-[100px_minmax(0,1fr)_100px_minmax(0,1fr)_28px] gap-x-3 pb-3 border-b border-[color:var(--color-ink)]">
              {['Date', 'Title', 'Category', 'Authors'].map((h) => (
                <span key={h} className={`${head} gap-1.5`}>
                  <Dot /> {h}
                </span>
              ))}
              <span />
            </div>
            <div className="grid grid-cols-[70px_1fr_28px] gap-x-3 pb-3 border-b border-[color:var(--color-ink)] md:hidden">
              {['Date', 'Title'].map((h) => (
                <span key={h} className={`${head} gap-1`}>
                  <Dot /> {h}
                </span>
              ))}
              <span />
            </div>
            <div className="hidden md:block">
              {items.map((p, i) => (
                <Link
                  key={p.href}
                  href={labsHref(p.href)}
                  onMouseEnter={() => setActive(i)}
                  className="grid min-w-0 grid-cols-[100px_minmax(0,1fr)_100px_minmax(0,1fr)_28px] gap-x-3 py-3.5 border-b border-[#e5e5e5] [@media(hover:hover){&:hover}]:bg-[#fafafa] transition-colors group"
                >
                  <span className={`${s.mono} min-w-0 text-[12px] leading-[1.5] text-[#737373]`}>{p.date}</span>
                  <span className="min-w-0 truncate text-[14px] leading-[1.5] text-[color:var(--color-ink)] font-medium">{p.title}</span>
                  <span className="min-w-0 truncate text-[12px] leading-[1.5] text-[#737373]">{p.categories}</span>
                  <span className="min-w-0 truncate text-[12px] leading-[1.5] text-[#737373]">{p.authors}</span>
                  <span className="flex items-center justify-end">
                    <ArrowRight className="w-3.5 h-3.5 text-[#737373]" />
                  </span>
                </Link>
              ))}
            </div>
            {items.map((p) => (
              <Link
                key={`m-${p.href}`}
                href={labsHref(p.href)}
                className="grid grid-cols-[70px_1fr_28px] gap-x-3 py-3.5 border-b border-[#e5e5e5] [@media(hover:hover){&:hover}]:bg-[#fafafa] transition-colors group md:hidden"
              >
                <span className={`${s.mono} text-[12px] leading-[1.5] text-[#737373]`}>{p.date}</span>
                <div className="min-w-0">
                  <span className="text-[12px] leading-[1.5] text-[color:var(--color-ink)] font-medium truncate block">{p.title}</span>
                  <span className="text-[12px] leading-[1.5] text-[#737373]">{p.categories}</span>
                </div>
                <span className="flex items-center justify-end">
                  <ArrowRight className="w-3 h-3 text-[#737373]" />
                </span>
              </Link>
            ))}
            <Link href={labsHref(c.more)} className={`${s.btn} ${BTN_OUTLINE} mt-5`}>
              View more <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="hidden xl:flex xl:flex-col xl:items-start xl:justify-start w-[280px] shrink-0 self-start relative">
            <div className="w-full flex flex-col items-start justify-start">
              <div className="w-full aspect-square bg-white overflow-hidden relative border border-[#e5e5e5]">
                {items.map((p, i) =>
                  p.image ? (
                    <div key={p.href} className="absolute inset-0 transition-opacity duration-300 ease-in-out" style={{ opacity: +(active === i) }}>
                      <div className="absolute inset-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-contain object-center" />
                      </div>
                    </div>
                  ) : (
                    <div key={p.href} className="absolute inset-0 w-full h-full bg-[#e5e5e5] flex items-center justify-center transition-opacity duration-300 ease-in-out" style={{ opacity: +(active === i) }}>
                      <span className="text-[12px] text-[color:var(--color-ink-faint)]">No image</span>
                    </div>
                  ),
                )}
              </div>
              {cur && (
                <div className="mt-3">
                  <p className="text-[12px] leading-[1.5] font-medium text-[color:var(--color-ink)] mb-1 mt-0">{cur.title}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Blog({ c }: { c: LabsHomeContent['blog'] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [canPrev, setPrev] = useState(false)
  const [canNext, setNext] = useState(true)
  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setPrev(el.scrollLeft > 4)
    setNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])
  // labs BlogSection: step = first card's offsetWidth (|| 300) + the 24px gap, native smooth scrollBy.
  const go = (dir: 'left' | 'right') => {
    const el = ref.current
    if (!el) return
    const w = el.querySelector('a')?.offsetWidth || 300
    el.scrollBy({ left: dir === 'left' ? -(w + 24) : w + 24, behavior: 'smooth' })
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
    <section id="blog" className="w-full border-b border-[color:var(--color-hairline)]">
      <div className={`${WRAP} py-14`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={H2}>{c.title}</h2>
            <p className={INTRO}>{c.intro}</p>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => go('left')} disabled={!canPrev} aria-label="Previous" className={`${s.btn} ${BTN_ICON}`}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => go('right')} disabled={!canNext} aria-label="Next" className={`${s.btn} ${BTN_ICON}`}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div ref={ref} data-blog-carousel="true" className={`${s.noScrollbar} flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4`}>
          {c.posts.map((p) => (
            <Link key={p.href} href={labsHref(p.href)} className="group shrink-0 w-[280px] md:w-[320px] lg:w-[340px] snap-start">
              <div className="flex items-center gap-2.5">
                {p.category && (
                  <span className="text-[12px] leading-[1.5] text-[color:var(--color-ink)] border border-[color:var(--color-hairline)] px-2 py-0.5 uppercase tracking-[0.05em]">
                    {p.category}
                  </span>
                )}
                <span className={`${s.mono} text-[12px] leading-[1.5] text-[color:var(--color-ink-faint)] tracking-[0.05em] uppercase`}>{p.date}</span>
              </div>
              <h3 className="text-[14px] font-medium text-[color:var(--color-ink)] tracking-normal mt-1.5 mb-0 leading-[1.375] line-clamp-2 [@media(hover:hover){.group:hover_&}]:underline underline-offset-2 decoration-[color:var(--color-ink-faint)]">
                {p.title}
              </h3>
              <p className="text-[12px] text-[#737373] mt-2 mb-0 leading-[1.625] line-clamp-2">{p.intro}</p>
            </Link>
          ))}
          <Link href={labsHref('/blog')} className="group shrink-0 w-[180px] snap-start flex flex-col justify-center border-l border-[#d4d4d4] pl-6">
            <span className="text-[12px] leading-[1.5] text-[#525252] [@media(hover:hover){.group:hover_&}]:text-[color:var(--color-ink)] tracking-[0.05em] uppercase transition-colors">View all</span>
            <span className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[14px] leading-[1.5] font-medium text-[color:var(--color-ink)]">All posts</span>
              <ArrowRight className="w-3.5 h-3.5 text-[color:var(--color-ink)] [@media(hover:hover){.group:hover_&}]:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function Jobs({ c }: { c: LabsHomeContent['jobs'] }) {
  const head = 'text-[12px] leading-[1.5] text-[color:var(--color-ink)] font-semibold items-center uppercase'
  return (
    <section className="w-full">
      <div className={`${WRAP} py-14`}>
        <h2 className={`${H2} !mb-10`}>{c.title}</h2>
        <div className="grid grid-cols-[1fr_24px] md:grid-cols-[100px_1fr_1fr_24px] gap-x-3 md:gap-x-4 pb-3 border-b border-[color:var(--color-ink)]">
          <span className={`hidden md:flex ${head} gap-1.5`}>
            <Dot /> Date
          </span>
          <span className={`flex ${head} gap-1 md:gap-1.5`}>
            <Dot /> Position
          </span>
          <span className={`hidden md:flex ${head} gap-1.5`}>
            <Dot /> Location
          </span>
          <span />
        </div>
        {c.items.map((j) => (
          <a
            key={j.href}
            href={j.href}
            className="grid grid-cols-[1fr_24px] md:grid-cols-[100px_1fr_1fr_24px] gap-x-3 md:gap-x-4 py-3 border-b border-[#e5e5e5] [@media(hover:hover){&:hover}]:bg-[#fafafa] transition-colors cursor-pointer group"
          >
            <span className={`${s.mono} hidden md:block text-[12px] leading-[1.5] text-[#737373]`}>{j.date}</span>
            <div>
              <span className="text-[12px] leading-[1.5] text-[color:var(--color-ink)] font-medium uppercase block">{j.title}</span>
              <span className="text-[12px] leading-[1.5] text-[#737373] mt-0.5 block md:hidden">
                {j.location} · <span className={s.mono}>{j.date}</span>
              </span>
            </div>
            <span className="hidden md:block text-[12px] leading-[1.5] text-[#737373] uppercase">{j.location}</span>
            <span className="flex items-center justify-end">
              <ArrowDown className="w-3.5 h-3.5 text-[#737373] [@media(hover:hover){.group:hover_&}]:translate-y-0.5 transition-transform" />
            </span>
          </a>
        ))}
        <div className="mt-8">
          <Link href={labsHref(c.more)} className={`${s.btn} ${BTN_OUTLINE}`}>
            View more <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function LabsHome({ content }: { content: LabsHomeContent }) {
  return (
    <>
      <Hero c={content.hero} />
      <ScrollReveal>
        <Leaderboards c={content.leaderboards} />
      </ScrollReveal>
      <ScrollReveal>
        <Papers c={content.papers} />
      </ScrollReveal>
      <ScrollReveal>
        <Blog c={content.blog} />
      </ScrollReveal>
      <ScrollReveal>
        <Jobs c={content.jobs} />
      </ScrollReveal>
    </>
  )
}
