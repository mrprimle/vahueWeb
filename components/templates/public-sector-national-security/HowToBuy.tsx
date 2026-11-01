'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import FlatCta from './FlatCta'
import { createAnimatedText, prefersReducedMotion } from './motion'
import { retroEnter } from './scroll'
import type { HowToBuyContent, HowToBuyItem } from './content'
import s from './ns.module.css'

/*
 * scale.com NatSecHowToBuy (chunk 0sni47mcvnqwg.js, module 109486). bg scale-gray-80, py-16 / md:py-28, Container
 * (858675: max-w-[1472px] ps-6 pe-6). Left: heading (AnimatedText h2 header3-regular) + body (body2) + FlatCta arrow
 * (theme none, bg-foundry-tan text-white); right (lg: 600px): accordion; below: the 1477/360 photo (2/1, object-right
 * on phones).
 *   heading   useScrollTrigger(heading block, "top 85%", retroactive) -> animateIn(.1)
 *   accordion one open item at a time, the first with an answer open by default; clicking the open one closes it.
 *             Panel height tweens to its measured scrollHeight (ResizeObserver) / 0: .5s power2.out, overwrite auto.
 *             Question header6 gray-20 -> black on hover (200ms ease-out); the plus' vertical bar rotate 90 -> 0 when
 *             open (300ms ease-out). Buttons: aria-expanded / aria-controls, region panels (REA ev_6991c08f…:
 *             HubSpot mousedown + React click only).
 */

function rich(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  )
}

function Item({ item, open, onToggle, id }: { item: HowToBuyItem; open: boolean; onToggle: () => void; id: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [h, setH] = useState(0)
  const has = !!item.answer

  useLayoutEffect(() => {
    const el = inner.current
    if (!el) return
    const ro = new ResizeObserver(() => setH(el.scrollHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!wrap.current) return
    if (prefersReducedMotion()) gsap.set(wrap.current, { height: open ? h : 0 })
    else gsap.to(wrap.current, { height: open ? h : 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
  }, [open, h])

  return (
    <li className="border-b border-black/80">
      <button
        type="button"
        id={`${id}-button`}
        aria-expanded={has && open}
        aria-controls={`${id}-panel`}
        aria-disabled={has ? undefined : 'true'}
        disabled={!has}
        onClick={has ? onToggle : undefined}
        className={`group flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${has ? 'cursor-pointer' : ''}`}
      >
        <span className={`${s.header6} text-[var(--ns-gray-20)] transition-colors duration-200 ease-out ${has ? 'group-hover:text-black' : ''}`}>{item.question}</span>
        <span aria-hidden="true" className="relative flex size-4 shrink-0 items-center justify-center">
          <span className="absolute h-px w-4 bg-current" />
          <span className={`absolute h-px w-4 origin-center bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? 'rotate-0' : 'rotate-90'}`} />
        </span>
      </button>
      <div ref={wrap} className="h-0 overflow-clip">
        <div ref={inner} id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} className="pb-3 text-[var(--ns-gray-10)]">
          {has ? <p className={s.body2}>{item.answer}</p> : null}
        </div>
      </div>
    </li>
  )
}

export default function HowToBuy({ content }: { content: HowToBuyContent }) {
  const head = useRef<HTMLDivElement>(null)
  const h2 = useRef<HTMLHeadingElement>(null)
  const uid = useId()
  const [open, setOpen] = useState<number | null>(() => {
    const i = content.items.findIndex((x) => !!x.answer)
    return i >= 0 ? i : null
  })

  useEffect(() => {
    if (!h2.current || !head.current) return
    const t = createAnimatedText(h2.current)
    if (prefersReducedMotion()) return () => t.revert()
    const off = retroEnter(head.current, 'top 85%', () => t.animateIn({ delay: 0.1 }))
    return () => {
      off()
      t.revert()
    }
  }, [])

  return (
    <section className="NatSecHowToBuy w-full bg-[var(--ns-gray-80)] py-16 text-black md:py-28">
      <div className="mx-auto w-full max-w-[1472px] pe-6 ps-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="flex min-w-0 flex-col items-start gap-10 lg:flex-1">
            <div ref={head} className="flex flex-col gap-6">
              <h2 ref={h2} className={`${s.header3} ${s.pending} text-balance text-black`}>
                {content.heading}
              </h2>
              <div className="max-w-[486px]" style={{ textWrap: 'pretty' }}>
                <p className={s.body2}>{rich(content.body)}</p>
              </div>
            </div>
            <FlatCta href={content.cta.href} variant="arrow" theme="tan" staticShape>
              {content.cta.label}
            </FlatCta>
          </div>
          <div className="min-w-0 lg:w-[600px] lg:shrink-0">
            <ul className="m-0 flex list-none flex-col p-0">
              {content.items.map((item, i) => (
                <Item key={item.question} item={item} id={`${uid}-${i}`} open={open === i} onToggle={() => setOpen((o) => (o === i ? null : i))} />
              ))}
            </ul>
          </div>
        </div>
        <div className="relative mt-20 aspect-[1477/360] w-full overflow-hidden rounded-2xl max-md:aspect-[2/1]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.image} alt={content.imageAlt} className="absolute inset-0 h-full w-full object-cover max-md:object-right" />
        </div>
      </div>
    </section>
  )
}
