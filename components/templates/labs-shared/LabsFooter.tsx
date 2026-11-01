'use client'

import { useRef, useState } from 'react'
import LabsDialog from './LabsDialog'
import { HS_COUNTRIES } from './countries'
import { BTN_BLACK, BTN_OUTLINE } from './links'
import s from './labs.module.css'

/*
 * labs.scale.com UnifiedFooter (chunk 043v05hl3en9y.js, module 627256): newsletter row (title button + outline
 * "Subscribe to newsletter", both open the dialog), then copyright + Terms/Privacy. The dialog wraps a HubSpot form
 * (portal 4823527, form e0060b3b-d3cc-4193-b24c-9ca1a4adc1ce, sm:max-w-lg). Static clone: the form validates
 * but never posts.
 */
const FOOTER_LINKS = [
  { label: 'Terms', url: 'https://scale.com/legal/terms' },
  { label: 'Privacy', url: 'https://scale.com/legal/privacy' },
]

export default function LabsFooter({ year = 2026 }: { year?: number }) {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const form = useRef<HTMLFormElement>(null)

  return (
    <footer className="w-full border-t border-[color:var(--color-hairline)] bg-white">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 border-b border-[#e5e5e5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button type="button" onClick={() => setOpen(true)} className="text-left group">
          <p className="text-[14px] leading-[1.5] font-medium text-[color:var(--color-ink)] uppercase tracking-[0.05em] mb-1 m-0 [@media(hover:hover){.group:hover_&}]:underline underline-offset-2">
            Scale Labs Newsletter
          </p>
          <p className="text-[12px] leading-[1.5] text-[#525252] m-0">Research, benchmarks, and insights — delivered to your inbox.</p>
        </button>
        <button type="button" onClick={() => setOpen(true)} className={`${s.btn} ${BTN_OUTLINE} shrink-0`}>
          Subscribe to newsletter
        </button>
      </div>
      <LabsDialog open={open} onOpenChange={setOpen} title="Subscribe to Scale Labs" className="sm:max-w-lg">
        <div className="px-6 pt-6 pb-6 text-[color:var(--color-ink)] overflow-y-auto flex-1 min-h-0">
          <div className="flex flex-col justify-start">
            {sent ? (
              <p className="text-[15px] leading-[1.5] m-0 mb-2">Thanks for subscribing! (static clone: nothing was sent)</p>
            ) : (
              <form
                ref={form}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault()
                  if (form.current?.reportValidity()) setSent(true)
                }}
                className="flex flex-col gap-4 mb-8"
              >
                <input name="email" type="email" required placeholder="Work email*" autoComplete="email" className={s.hsInput} />
                <select name="region" required defaultValue="" className={`${s.hsInput} ${s.hsSelect}`}>
                  <option disabled value="">
                    Country*
                  </option>
                  {HS_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <p className="text-[14px] leading-[1.5] text-[#737373] m-0">
                  By submitting this form, your information will be processed in accordance with our{' '}
                  <a href="https://scale.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="underline text-[#737373]">
                    Privacy Policy.
                  </a>
                </p>
                <button type="submit" hidden />
              </form>
            )}
            {!sent && (
              <button type="button" className={`${s.btn} ${BTN_BLACK}`} onClick={() => form.current?.requestSubmit()}>
                Submit →
              </button>
            )}
          </div>
        </div>
      </LabsDialog>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] leading-[1.5] text-[#525252] m-0">
          Copyright {year}{' '}
          <a href="https://scale.com/" target="_blank" rel="noopener noreferrer" className="transition-colors [@media(hover:hover){&:hover}]:text-[color:var(--color-ink)] [@media(hover:hover){&:hover}]:underline [@media(hover:hover){&:hover}]:underline-offset-2">
            Scale Inc.
          </a>{' '}
          All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {FOOTER_LINKS.map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="text-[12px] leading-[1.5] text-[#525252] [@media(hover:hover){&:hover}]:text-[color:var(--color-ink)] transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
