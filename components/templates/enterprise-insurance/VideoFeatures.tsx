'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import s from './insurance.module.css'

/*
 * scale.com "Features" slice with video cards (chunk 17ea4hx823ss4, module 450359).
 * Grid: 1 col, gap 56 -> md 2 cols gap 24 -> lg 2 cols gap 56 (<= 2 features).
 * Card: .feature (radius 12) > 3:2 image, rounded-lg, centred 64px play button bg-black/40 -> hover /60.
 * Play click (React onClick, REA listener map: `click` on the button) opens a Modal (module 582844):
 * overlay #060606/70, panel w-[95vw] md:80vw lg:70vw max-w-7xl rounded-2xl bg-white/15 backdrop-blur-xl,
 * 24px close button, Esc closes, body scroll locked, click outside [data-modal] closes; content is an
 * aspect-video Wistia iframe with autoplay. The clone shows an empty 16:9 placeholder instead.
 * Modal CSS module (it_l1W_*): overlay fades in 0.35s ease-out; the dialog layer starts at opacity 0 and plays
 * showUp (scale 1.1 -> 1, opacity 0 -> 1) 0.35s ease-out after 0.55s (it also sets color #000, text-align left).
 * The panel's form__wrapper__modal comes from the forms module, which has no ::after glow (measured: none).
 * With a visible close button and no title the content has no pt-4 (panel measured 1008x589 on both).
 * Title mt-8 lg:mt-12 24/36; description mt-3 16/26.4 text-black/70.
 */

export type VideoFeature = { image: string; title: string; body: string }

function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = open ? 'hidden' : ''
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('keydown', key)
      document.body.style.overflow = ''
    }
  }, [open, onClose])
  if (!open) return null
  return createPortal(
    <>
      <div className={`${s.modalOverlay} fixed inset-0 h-screen w-screen bg-[#060606]/70`} style={{ zIndex: 60 }} />
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
            className={`relative flex w-[95vw] max-w-7xl flex-col rounded-2xl bg-white/[15%] pb-8 backdrop-blur-xl sm:min-h-[auto] sm:pb-0 md:w-[80vw] md:text-center lg:w-[70vw]`}
          >
            <div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >
                <svg className="h-[10px] w-[10px]" fill="none" viewBox="0 0 10 10" aria-hidden="true">
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
              {/* TODO: Vahue video embed */}
              <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-neutral-950 font-mono text-xs uppercase tracking-[1px] text-white/50">
                Video placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}

function Card({ f }: { f: VideoFeature }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className={s.feature}>
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={f.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <Modal open={open} onClose={() => setOpen(false)} />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              aria-label="Play video"
              onClick={() => setOpen(true)}
              className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/40 transition-colors hover:bg-black/60"
            >
              <svg width={24} height={24} viewBox="0 0 60 60" aria-hidden="true">
                <path
                  fill="#FFF"
                  d="M48.79 26.129l-33-19.508C13.104 5.035 9 6.574 9 10.492V49.5c0 3.516 3.816 5.637 6.79 3.871l33-19.5c2.94-1.734 2.952-6.008 0-7.742z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* TODO: Vahue copy */}
      <p className={`${s.featureTitle} relative font-display text-black`}>{f.title}</p>
      {/* TODO: Vahue copy */}
      <p className={`${s.bodyBase} relative mt-3 font-display text-black/70`}>{f.body}</p>
    </div>
  )
}

export default function VideoFeatures({ items }: { items: VideoFeature[] }) {
  return (
    <div className="relative grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-14">
      {items.map((f, i) => (
        <Card key={i} f={f} />
      ))}
    </div>
  )
}
