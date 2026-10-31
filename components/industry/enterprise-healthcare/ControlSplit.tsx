'use client'

import { useRef } from 'react'
import { useRevealText } from '@/components/scale-clone/enterprise-healthcare/useRevealText'
import s from '@/components/scale-clone/enterprise-healthcare/healthcare.module.css'

/*
 * Vahue dark copy of the clone's TextImageSplit (components/scale-clone/enterprise-healthcare/TrustSplit.tsx):
 * same layout (copy left, fixed-width block right at clamp(320px, 38vw, 580px)) and headline/body reveal
 * (AnimatedText, IntersectionObserver -15%, delays 0.5 / 1). The certification-badge grid becomes a grid of
 * Vahue's control features (no third-party marks).
 */

export default function ControlSplit({ headline, body, items }: { headline: string; body: string; items: { title: string; body: string }[] }) {
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)
  useRevealText(h)
  useRevealText(p, { delay: 1 })

  return (
    <section className="border-y border-border-soft bg-white/[0.02] py-20 text-white">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
          <div className="flex flex-1 flex-col items-start gap-6 py-6">
            <h2 ref={h} className={`${s.header2} ${s.pending} w-full text-left font-display font-normal text-white`}>
              {headline}
            </h2>
            <div ref={p} className={`${s.splitBody} ${s.pending} w-full text-left font-display text-white/70`} style={{ textWrap: 'pretty' }}>
              {body}
            </div>
          </div>
          <div className="relative w-full shrink-0 md:w-[clamp(320px,38vw,580px)]">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
              {items.map((f) => (
                <li key={f.title} className="flex flex-col gap-2 rounded-xl border border-border-soft bg-[#0b0b0b] p-5">
                  <p className="font-display text-[16px] leading-[1.35] tracking-[-0.01em] text-white">{f.title}</p>
                  <p className="font-display text-[14px] leading-[1.5] tracking-[-0.01em] text-white/60">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
