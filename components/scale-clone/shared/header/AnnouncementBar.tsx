'use client'

import { forwardRef } from 'react'

// scale.com's announcement strip: in normal flow above the fixed header (which sits at
// top: var(--announcement-offset)). Evergreen #193a29, 14px/1.375 white text, centred, dismissible
// (max-height 160px -> 0 and opacity 1 -> 0 over 300ms ease-out).
type Props = { open: boolean; onDismiss: () => void }

const AnnouncementBar = forwardRef<HTMLDivElement, Props>(function AnnouncementBar({ open, onDismiss }, ref) {
  return (
    <div
      ref={ref}
      role="region"
      aria-label="Announcement"
      className={`relative z-30 w-full overflow-hidden bg-[#193a29] text-white transition-all duration-300 ease-out ${
        open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1472px] items-center justify-center gap-3 py-2.5 pe-6 ps-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm leading-[1.375]">
          <svg viewBox="0 0 1024 1024" className="h-4 w-4 shrink-0 fill-current" aria-hidden="true" focusable="false">
            <circle cx="512" cy="512" r="400" />
          </svg>
          {/* TODO: Vahue copy */}
          <span>Vahue Partners With Placeholder Lab to Bring Research to Teams</span>
          <a className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline" href="#">
            Learn more
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
            </svg>
          </a>
        </div>
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={onDismiss}
        className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  )
})

export default AnnouncementBar
