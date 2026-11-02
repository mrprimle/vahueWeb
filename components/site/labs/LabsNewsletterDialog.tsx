'use client'

// labs.scale.com module 385368 with its HubSpot embed. Static snapshot: same fields, same validation copy, nothing is sent anywhere.
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { LabsButton } from './LabsButton'
import { LabsDialog } from './LabsDialog'
import styles from './LabsNewsletterDialog.module.css'
import type { LabsChromeContent } from './types'

export function LabsNewsletterDialog({ open, onOpenChange, content }: { open: boolean; onOpenChange: (open: boolean) => void; content: LabsChromeContent['newsletter'] }) {
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [errors, setErrors] = useState<{ email?: string; country?: string }>({})
  const [sent, setSent] = useState(false)

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    const next: typeof errors = {}
    if (!email.trim()) next.email = content.required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = content.invalidEmail
    if (!country) next.country = content.required
    setErrors(next)
    if (!next.email && !next.country) setSent(true)
  }

  return (
    <LabsDialog open={open} onOpenChange={onOpenChange} title={content.title} closeLabel={content.close} className="sm:max-w-lg">
      <div className="px-6 pt-6 pb-6 text-ink overflow-y-auto flex-1 min-h-0">
        {sent ? (
          <p className="text-sm font-sans text-neutral-600">{content.thanks}</p>
        ) : (
          <div className="flex flex-col justify-start">
            <form noValidate onSubmit={submit} className={styles.form}>
              <div className={styles.field}>
                <input type="email" name="email" required autoComplete="email" inputMode="email" placeholder={content.emailPlaceholder} aria-label={content.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
                {errors.email ? <span className={styles.error}>{errors.email}</span> : null}
              </div>
              <div className={styles.field}>
                <select name="region" required aria-label={content.countryPlaceholder} value={country} onChange={(e) => setCountry(e.target.value)} className={styles.select}>
                  <option disabled value="">
                    {content.countryPlaceholder}
                  </option>
                  {content.countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.country ? <span className={styles.error}>{errors.country}</span> : null}
              </div>
              <p className={styles.legal}>
                {content.legalBefore}{' '}
                <strong>
                  <Link href={content.legalLink.href}>{content.legalLink.label}</Link>
                </strong>
              </p>
            </form>
            <LabsButton variant="black" className="w-fit" onClick={() => submit()}>
              {content.submit}
            </LabsButton>
          </div>
        )}
      </div>
    </LabsDialog>
  )
}
