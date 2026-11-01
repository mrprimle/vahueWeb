'use client'

// Scale module 966098 (chunk 058pnujclak3f.js). One row is always open. Scale hard-codes the CTA; `ctaText` carries it.
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { gsap } from '../lib/gsap'
import { useMediaQuery } from '../lib/useMediaQuery'
import { ClipScrollSection } from './ClipScrollSection'
import { FlatCta } from './FlatCta'
import { RichText, type RichBlock } from './RichText'

export type FaqItem = { question?: string; answer?: RichBlock[]; includeCta?: boolean }

function Row({ item, index, answerId, questionId, setActive, active, ctaText, ctaHref }: { item: FaqItem; index: number; answerId: string; questionId: string; setActive: (i: number) => void; active: number; ctaText: string; ctaHref: string }) {
  const hasAnswer = Array.isArray(item.answer) && item.answer.length > 0
  const body = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(index === 0)
  const [height, setHeight] = useState(0)
  useLayoutEffect(() => {
    if (!body.current) return
    const ro = new ResizeObserver(() => {
      setHeight(body.current!.scrollHeight)
    })
    ro.observe(body.current)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    setOpen(active === index)
  }, [active, index])
  useEffect(() => {
    gsap.to(body.current, { height: open ? height : 0, duration: 0.5 })
  }, [open, height])
  return (
    <li className="border-b border-[#01010160] last:border-b-0">
      <div className="grid px-0 py-6 gap-y-0 md:py-6 grid-layout-mobile md:grid-layout-desktop items-center md:items-start md:gap-y-0">
        <button
          type="button"
          className="p-0 grid items-center md:items-start h-full grid-cols-8 row-start-1 gap-0 text-left bg-transparent border-none shadow-none cursor-pointer col-span-full md:grid-cols-12"
          onClick={() => {
            if (active !== index) setActive(index)
          }}
          aria-expanded={open}
          aria-controls={answerId}
          id={questionId}
        >
          <div aria-hidden className="flex items-center justify-start md:justify-center h-8 col-start-1 select-none">
            <div className={cn('w-4 h-[2px] bg-black origin-center absolute transition-all duration-300 scale-x-[1.2]', open ? '' : 'rotate-90')} />
            <div className="w-4 h-[2px] bg-black origin-center absolute scale-x-[1.2]" />
          </div>
          <h5 className="col-span-6 col-start-3 leading-snug text-left text-black md:col-start-5 md:col-span-3 font-bold md:font-medium header5 md:header5-medium">{item.question || `Question ${index + 1}`}</h5>
        </button>
        <div ref={body} className="col-span-6 col-start-3 row-start-2 overflow-clip md:col-start-9 md:col-span-3 md:row-start-1">
          <div id={answerId} role="region" aria-labelledby={questionId} aria-hidden={!open} className="flex flex-col gap-4">
            {hasAnswer ? (
              <div className="text-black max-w-none max-sm:text-sm">
                <RichText value={item.answer!} />
              </div>
            ) : null}
            {item.includeCta ? <FlatCta className="block! mb-3" href={ctaHref} text={ctaText} variant="border" theme="black" /> : null}
          </div>
        </div>
      </div>
    </li>
  )
}

export function Faqs({ heading, anchorId, backdrop, faqs = [], className, ctaText = 'Talk to an expert', ctaHref = '/demo' }: { heading?: string; anchorId?: string; backdrop?: 'light' | 'dark'; faqs?: FaqItem[]; className?: string; ctaText?: string; ctaHref?: string }) {
  const list = Array.isArray(faqs) ? faqs.filter(Boolean) : []
  const [active, setActive] = useState(0)
  const id = useId()
  const phone = useMediaQuery('(max-width: 768px)')
  if (list.length === 0 && !heading?.trim()) return null
  return (
    <ClipScrollSection backdropColor={backdrop === 'light' ? 'white' : 'black'} startPercentage={8} startScale={0.9} className="grid-layout-mobile md:grid-layout-desktop" borderRadius={phone ? 0.5 : 1} clipContainerClassName="col-span-full" progressOffset={0.4}>
      <section id={anchorId?.trim() || undefined} className={cn('Faqs relative scroll-mt-28 rounded-l-lg md:rounded-2xl bg-scale-gray-95 px-0 pt-6 text-black', className)}>
        <div className="w-full grid-layout-mobile md:grid-layout-desktop gap-y-10 md:gap-y-12">
          {heading?.trim() ? <h2 className="text-black header2 col-span-full text-balance">{heading}</h2> : null}
          {list.length > 0 ? (
            <ul className="flex flex-col gap-0 p-0 list-none border-t col-span-full border-[#01010160]">
              {list.map((item, i) => (
                <Row key={i} item={item} index={i} answerId={`${id}-answer-${i}`} questionId={`${id}-question-${i}`} setActive={setActive} active={active} ctaText={ctaText} ctaHref={ctaHref} />
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </ClipScrollSection>
  )
}
