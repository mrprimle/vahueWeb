'use client'

import { useRef, useState } from 'react'
import LabsDialog from './LabsDialog'
import { HS_COUNTRIES } from './countries'
import { BTN_BLACK, BTN_OUTLINE, CONTACT_EMAIL } from './links'
import s from './labs.module.css'

/*
 * The labs UnifiedFooter (chunk 043v05hl3en9y.js, module 627256): a row with a title button and an outline button, both
 * opening the dialog (sm:max-w-lg), then copyright + Terms/Privacy. Vahue has no newsletter and the site has no form
 * backend, so the row invites a conversation and the dialog's form opens a draft to the real address.
 */
const FOOTER_LINKS = [
  { label: 'Terms', url: '/terms/' },
  { label: 'Privacy', url: '/privacy-policy/' },
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
            Talk to Vahue
          </p>
          <p className="text-[12px] leading-[1.5] text-[#525252] m-0">Bring one busy workflow. We will measure it in a two-week Audit.</p>
        </button>
        <button type="button" onClick={() => setOpen(true)} className={`${s.btn} ${BTN_OUTLINE} shrink-0`}>
          Contact Vahue
        </button>
      </div>
      <LabsDialog open={open} onOpenChange={setOpen} title="Contact Vahue" className="sm:max-w-lg">
        <div className="px-6 pt-6 pb-6 text-[color:var(--color-ink)] overflow-y-auto flex-1 min-h-0">
          <div className="flex flex-col justify-start">
            {sent ? (
              <p className="text-[15px] leading-[1.5] m-0 mb-2">Your email app should now hold a draft to {CONTACT_EMAIL}. Send it and a person will reply.</p>
            ) : (
              <form
                ref={form}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!form.current?.reportValidity()) return
                  const data = new FormData(form.current)
                  const body = `Work email: ${data.get('email')}\nCountry: ${data.get('region')}\n`
                  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Workflow audit')}&body=${encodeURIComponent(body)}`
                  setSent(true)
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
                  <a href="/privacy-policy/" className="underline text-[#737373]">
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
          <a href="/" className="transition-colors [@media(hover:hover){&:hover}]:text-[color:var(--color-ink)] [@media(hover:hover){&:hover}]:underline [@media(hover:hover){&:hover}]:underline-offset-2">
            Vahue.
          </a>{' '}
          All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {FOOTER_LINKS.map((l) => (
            <a key={l.label} href={l.url} className="text-[12px] leading-[1.5] text-[#525252] [@media(hover:hover){&:hover}]:text-[color:var(--color-ink)] transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
