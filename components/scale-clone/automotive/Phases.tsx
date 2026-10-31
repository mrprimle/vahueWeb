'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ASSET, CONTAINER, SectionHeader } from './Sections'
import { Play } from './icons'
import s from './automotive.module.css'

/*
 * "Phases" = Scale's Features block (numbers, 3 columns from lg; xl gap 40/56).
 * Each card is a 3:2 image with a 64px play button (bg black/40 -> /60, 150ms) that opens a modal
 * (w 95vw / md 80vw / lg 70vw, max-w 7xl, radius 16, bg white/15 + backdrop-blur-xl) holding a 16:9 video.
 * Scale streams Mux HLS; the clone shows the poster frame until Vahue video exists.
 */

// TODO: Vahue copy + videos
const PHASES = [
  {
    title: 'Starting Phase',
    image: `${ASSET}/phase-base.webp`,
    body: 'Placeholder copy about gathering and labelling a first set to unlock early results. The platform lets you sample at random or add filters (for example, night time only) to match the spread of cases you plan for in production.',
  },
  {
    title: 'Growth Phase',
    image: `${ASSET}/phase-improvement.webp`,
    body: 'Placeholder copy about making sure fresh inputs keep pushing the system and lift results as far as possible. For this, the engine offers both automatic (model-led) and hand-picked sorting methods for every new batch of inputs.',
  },
  {
    title: 'Focus Phase',
    image: `${ASSET}/phase-target.webp`,
    body: 'Placeholder copy about finding and sorting inputs for specific cases with plain-language search and auto tags, then labelling them and lifting results on exactly those cases. The engine closes the loop by checking your system against the scenario tests your team relies on before release.',
  },
]

function VideoModal({ open, onClose, poster }: { open: boolean; onClose: () => void; poster: string }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="relative w-[95vw] max-w-7xl overflow-hidden rounded-2xl bg-white/[15%] p-2 backdrop-blur-xl md:w-[80vw] lg:w-[70vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white"
        >
          ✕
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          {/* TODO: Vahue video (Scale streams a Mux HLS clip here) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>,
    document.body,
  )
}

function PhaseMedia({ image }: { image: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <VideoModal open={open} onClose={() => setOpen(false)} poster={image} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play video"
          className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/40 transition-colors duration-150 hover:bg-black/60"
        >
          <Play />
        </button>
      </div>
    </div>
  )
}

export default function Phases() {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader title="Stages of System Development" sub="Placeholder line about partnering at each step of building inside the engine." />
      <div className="mt-10">
        <div className="relative grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14">
          {PHASES.map((p, i) => (
            <div key={p.title}>
              <div className={s.feature}>
                <PhaseMedia image={p.image} />
              </div>
              {/* TODO: Vahue copy */}
              <p className="relative ml-11 mt-8 font-display text-[24px] leading-[1.5] tracking-[-0.01em] text-black lg:mt-12">
                <span
                  className={`${s.number} absolute -left-10 top-[7px] flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white/[0.09] text-[12px] leading-[1.5] tracking-[-0.02em] text-black`}
                >
                  {i + 1}
                </span>
                {p.title}
              </p>
              <p className="relative ml-11 mt-3 text-[16px] leading-[1.65] tracking-[-0.01em] text-black/70">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
