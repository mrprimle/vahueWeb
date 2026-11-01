'use client'

import { useRef, useState } from 'react'
import LabsDialog from '@/components/templates/labs-shared/LabsDialog'
import { HS_COUNTRIES } from '@/components/templates/labs-shared/countries'
import { BTN_BLACK } from '@/components/templates/labs-shared/links'
import s from '@/components/templates/labs-shared/labs.module.css'
import type { LabsLeaderboardCopy } from './content'

/*
 * Contact dialog behind the section's button. DialogContent `w-[calc(100vw-2rem)] sm:max-w-2xl`, title from copy. Fields:
 * first/last name, company/job title (two columns), work email, country, details textarea, then the privacy line. The
 * site has no form backend, so a valid form opens a draft to copy.email in the visitor's email app; nothing is posted.
 */
export default function EvaluateDialog({ open, onOpenChange, copy }: { open: boolean; onOpenChange: (v: boolean) => void; copy: LabsLeaderboardCopy['evaluate'] }) {
  const [sent, setSent] = useState(false)
  const form = useRef<HTMLFormElement>(null)
  return (
    <LabsDialog open={open} onOpenChange={onOpenChange} title={copy.dialogTitle} className="sm:max-w-2xl">
      <div className="px-6 pt-6 pb-6 text-[color:var(--color-ink)] overflow-y-auto flex-1 min-h-0">
        <div className="flex flex-col justify-start">
          {sent ? (
            <p className="text-[15px] leading-[1.5] m-0 mb-2">{copy.success}</p>
          ) : (
            <form
              ref={form}
              noValidate
              onSubmit={(e) => {
                e.preventDefault()
                if (!form.current?.reportValidity()) return
                const d = new FormData(form.current)
                const body = ['firstname', 'lastname', 'company', 'jobtitle', 'email', 'region', 'message'].map((k) => d.get(k)).join('\n')
                window.location.href = `mailto:${copy.email}?subject=${encodeURIComponent(copy.dialogTitle)}&body=${encodeURIComponent(body)}`
                setSent(true)
              }}
              className="flex flex-col mb-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8 mb-8">
                <input name="firstname" required placeholder="First name*" autoComplete="given-name" className={s.hsInput} />
                <input name="lastname" required placeholder="Last name*" autoComplete="family-name" className={s.hsInput} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8 mb-8">
                <input name="company" required placeholder="Company name*" autoComplete="organization" className={s.hsInput} />
                <input name="jobtitle" required placeholder="Job title*" autoComplete="organization-title" className={s.hsInput} />
              </div>
              <input name="email" type="email" required placeholder="Work email*" autoComplete="email" className={`${s.hsInput} mb-6`} />
              <select name="region" required defaultValue="" className={`${s.hsInput} ${s.hsSelect} mb-6`}>
                <option disabled value="">
                  Country*
                </option>
                {HS_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <textarea name="message" required placeholder={copy.messagePlaceholder} className={`${s.hsInput} !h-[65px] py-3 resize-y mb-6 block`} />
              <p className="text-[14px] leading-[1.5] text-[#737373] m-0">
                By submitting this form, your information will be processed in accordance with our{' '}
                <a href={copy.privacyHref} className="text-[color:var(--color-ink)] no-underline">
                  <strong>Privacy Policy</strong>
                </a>
                .
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
  )
}
