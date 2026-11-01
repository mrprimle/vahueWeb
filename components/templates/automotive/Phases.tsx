'use client'

import { useCallback, useEffect, useState } from 'react'
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

/*
 * Scale's Modal (chunk 2vj2iettvig10.js, module 582844), as the Features block opens it:
 *  - while open: document.body.style.overflow = 'hidden' (reset to '' on close); document keydown Escape closes
 *  - a click anywhere outside [data-modal] closes (the dialog layer covers the viewport)
 *  - overlay bg #060606/70, CSS fadeIn 0.35s ease-out; dialog layer opacity 0 -> showUp (opacity 0 -> 1,
 *    scale 1.1 -> 1) 0.35s ease-out after 0.55s; no exit animation (unmounts on close)
 *  - panel w 95vw / md 80vw / lg 70vw, max-w 7xl, radius 16, bg white/15 + backdrop-blur-xl, inset ring;
 *    24px white/20 close chip in flow above a px-4 pb-4 body holding the 16:9 video
 */
function VideoModal({ open, onClose, poster }: { open: boolean; onClose: () => void; poster: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = open ? 'hidden' : ''
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return createPortal(
    <>
      <div data-qa="modal-overlay" className={`${s.modalOverlay} fixed inset-0 h-screen w-screen bg-[#060606]/70`} style={{ zIndex: 60 }} />
      <div
        className={`${s.modal} fixed inset-0 h-screen w-full overflow-y-scroll outline-none`}
        style={{ zIndex: 60 }}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest('[data-modal]')) onClose()
        }}
      >
        <div className="relative z-40 flex min-h-screen items-center justify-center sm:py-6">
          <div
            data-modal
            className={`${s.modalPanel} relative flex w-[95vw] max-w-7xl flex-col rounded-2xl bg-white/[15%] pb-8 backdrop-blur-xl sm:min-h-[auto] sm:pb-0 md:w-[80vw] md:text-center lg:w-[70vw]`}
          >
            <div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >
                <svg aria-hidden="true" className="h-[10px] w-[10px]" fill="none" viewBox="0 0 10 10">
                  <path
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.817 9.823a.625.625 0 0 1-.885 0L4.995 5.886 1.061 9.82a.626.626 0 0 1-.884-.884L4.11 5.002.177 1.069a.625.625 0 1 1 .885-.885l3.933 3.933L8.931.18a.625.625 0 0 1 .885.885L5.88 5.002l3.937 3.937a.625.625 0 0 1 0 .885Z"
                  />
                </svg>
              </button>
            </div>
            <div className="h-auto overflow-hidden px-4 pb-4 text-white/70">
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                {/* TODO: Vahue video (Scale streams a Mux HLS clip here, autoPlay) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={poster} alt="" className="h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}

function PhaseMedia({ image }: { image: string }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <VideoModal open={open} onClose={close} poster={image} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play video"
          className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/40 transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-black/60"
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
