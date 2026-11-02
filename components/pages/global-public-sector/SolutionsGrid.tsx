'use client'

// Scale module 297990 (AISolutionsGrid). A table from `md`, a list with "See all" below it. Rows and lines reveal once.
import Link from 'next/link'
import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/components/site/lib/gsap'
import { cn } from '@/components/site/lib/cn'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'
import { AnimatedText, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import type { GlobalPublicSectorContent } from './types'

// A chip looks the same with or without a link; Vahue's chips open the service that does the job.
function Chip({ href, className, children }: { href?: string; className: string; children: string }) {
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  )
}

export function SolutionsGrid({ content: c }: { content: GlobalPublicSectorContent['solutions'] }) {
  const [expanded, setExpanded] = useState(false)
  const categories = c.categories
  const section = useRef<HTMLElement>(null)
  const lines = useRef<(HTMLSpanElement | null)[]>([])
  const labels = useRef<(AnimatedTextHandle | null)[]>([])
  const fired = useRef(false)
  useLayoutEffect(() => {
    lines.current = lines.current.slice(0, categories.length)
    labels.current = labels.current.slice(0, categories.length)
  }, [categories.length])
  useInViewTrigger(section, {
    onEnter: () => {
      if (fired.current) return
      fired.current = true
      const targets = lines.current.filter(Boolean)
      if (targets.length) gsap.fromTo(targets, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', stagger: 0.12, duration: 1.2, ease: 'power2.out' })
      // Scale also passes ease: 'power2.out', which module 947153 ignores.
      labels.current.forEach((l, i) => {
        l?.animateIn?.({ duration: 1.1, delay: 0.08 * i })
      })
    },
  })
  const visible = expanded ? categories : categories.slice(0, 4)
  return (
    <section ref={section} className="py-20">
      <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
        <div className="flex flex-col justify-center mb-10 md:mb-20 md:mt-12 items-center mx-auto max-w-3xl text-center !max-w-none !mb-12">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h3 className="font-aeonik leading-snug lg:leading-[1.25] text-3xl md:text-4.5xl lg:text-5xl [text-wrap:balance] text-black">{c.title}</h3>
            </div>
          </div>
        </div>
        <div className="hidden md:block" role="table" aria-label={c.ariaLabel}>
          <div className="grid-layout-desktop mb-6" role="row">
            <p className="col-span-3 body2-regular text-scale-gray-30" role="columnheader">
              {c.categoryHeader}
            </p>
            <p className="col-span-9 col-start-4 body2-regular text-scale-gray-30" role="columnheader">
              {c.solutionsHeader}
            </p>
          </div>
          {categories.map(({ name, color, href, solutions }, i) => (
            <div key={name} className={cn('grid-layout-desktop relative py-6', i % 2 === 0 ? 'bg-white' : 'bg-scale-gray-95')} role="row">
              <span
                ref={(el) => {
                  lines.current[i] = el
                }}
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 right-0 block h-px origin-left scale-x-0 bg-scale-gray-80 will-change-transform"
              />
              <div className="col-span-3 flex items-center gap-3 pl-4" role="cell">
                <span aria-hidden className="inline-block shrink-0 rounded-full" style={{ width: 8, height: 8, backgroundColor: color }} />
                <AnimatedText
                  ref={(el) => {
                    labels.current[i] = el
                  }}
                  tagName="p"
                  type="lines"
                  mask="lines"
                  className="body1 text-scale-gray-10"
                >
                  {name}
                </AnimatedText>
              </div>
              <div className="col-span-9 col-start-4 flex flex-wrap items-center gap-2 pr-4" role="cell">
                {solutions.length === 0 ? (
                  <span className="body2-regular italic text-scale-gray-60">{c.comingSoon}</span>
                ) : (
                  solutions.map((title) => (
                    <Chip key={title} href={href} className="rounded-lg border border-scale-gray-80 bg-scale-gray-95 px-4 py-2 text-sm text-scale-gray-30">
                      {title}
                    </Chip>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:hidden">
          <div className="divide-y divide-scale-gray-80">
            {visible.map(({ name, color, href, solutions }, i) => (
              <div key={name} className={cn('px-4 py-5', i % 2 === 0 ? 'bg-white' : 'bg-scale-gray-95')}>
                <div className="flex items-center gap-2 mb-3">
                  <span aria-hidden className="inline-block shrink-0 rounded-full" style={{ width: 7, height: 7, backgroundColor: color }} />
                  <span className="body2-regular text-scale-gray-10">{name}</span>
                </div>
                {solutions.length === 0 ? (
                  <span className="body2-regular italic text-scale-gray-60">{c.comingSoon}</span>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {solutions.map((title) => (
                      <Chip key={title} href={href} className="rounded-md border border-scale-gray-80 px-3 py-1 text-sm text-scale-gray-30">
                        {title}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {categories.length > 4 ? (
            <button onClick={() => setExpanded((v) => !v)} className="mx-auto mt-6 flex items-center gap-2 text-sm text-scale-gray-30 transition-colors hover:text-scale-gray-10">
              {expanded ? c.showLess : c.seeAll.replace('{n}', String(categories.length))}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
