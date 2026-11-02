'use client'

// labs.scale.com module 385368 with HubSpot form 066ee34e. Static snapshot: same fields, same validation copy, nothing is sent anywhere.
import Link from 'next/link'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { LabsButton } from '@/components/site/labs/LabsButton'
import { LabsDialog } from '@/components/site/labs/LabsDialog'
import newsletter from '@/components/site/labs/LabsNewsletterDialog.module.css'
import type { LabsChromeContent } from '@/components/site/labs/types'
import styles from './EvaluateDialog.module.css'
import type { LeaderboardContent } from './types'

type Field = 'firstname' | 'lastname' | 'company' | 'jobtitle' | 'email' | 'region' | 'message'
const FIELDS: Field[] = ['firstname', 'lastname', 'company', 'jobtitle', 'email', 'region', 'message']

export function EvaluateDialog({ label, content, chrome }: { label: string; content: LeaderboardContent['evaluate']['form']; chrome: LabsChromeContent['newsletter'] }) {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Record<Field, string>>({ firstname: '', lastname: '', company: '', jobtitle: '', email: '', region: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [sent, setSent] = useState(false)
  const submitButton = useRef<HTMLButtonElement>(null)

  // Radix focuses the first tabbable on open. On Scale the form is still loading then, so that is Submit.
  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => submitButton.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [open])

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    const next: Partial<Record<Field, string>> = {}
    for (const f of FIELDS) if (!values[f].trim()) next[f] = chrome.required
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = chrome.invalidEmail
    setErrors(next)
    if (!Object.keys(next).length) setSent(true)
  }

  const bind = (f: Field) => ({
    name: f,
    required: true,
    value: values[f],
    onChange: (e: { target: { value: string } }) => setValues((v) => ({ ...v, [f]: e.target.value })),
  })
  const error = (f: Field) => (errors[f] ? <span className={f === 'email' ? `${styles.error} ${styles.errorEmail}` : styles.error}>{errors[f]}</span> : null)
  const input = (f: Field, placeholder: string, autoComplete: string, type = 'text') => (
    <div className={styles.field}>
      <input {...bind(f)} type={type} placeholder={placeholder} aria-label={placeholder} autoComplete={autoComplete} inputMode={type === 'email' ? 'email' : 'text'} className={newsletter.input} />
      {error(f)}
    </div>
  )

  return (
    <div>
      <LabsButton variant="black" onClick={() => setOpen(true)}>
        {label}
      </LabsButton>
      <LabsDialog open={open} onOpenChange={setOpen} title={content.title} closeLabel={chrome.close} className="sm:max-w-2xl">
        <div className="px-6 pt-6 pb-6 text-ink overflow-y-auto flex-1 min-h-0">
          {sent ? (
            <p className="text-sm font-sans text-neutral-600">{chrome.thanks}</p>
          ) : (
            <div className="flex flex-col justify-start">
              <form noValidate onSubmit={submit} className={styles.form}>
                <div className={styles.row}>
                  {input('firstname', content.firstName, 'given-name')}
                  {input('lastname', content.lastName, 'family-name')}
                </div>
                <div className={styles.row}>
                  {input('company', content.company, 'organization')}
                  {input('jobtitle', content.jobTitle, 'organization-title')}
                </div>
                <div className={styles.single}>{input('email', chrome.emailPlaceholder, 'email', 'email')}</div>
                <div className={styles.single}>
                  <div className={styles.field}>
                    <select {...bind('region')} aria-label={chrome.countryPlaceholder} className={newsletter.select}>
                      <option disabled value="">
                        {chrome.countryPlaceholder}
                      </option>
                      {chrome.countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {error('region')}
                  </div>
                </div>
                <div className={styles.single}>
                  <div className={styles.field}>
                    <textarea {...bind('message')} placeholder={content.message} aria-label={content.message} className={styles.textarea} />
                    {error('message')}
                  </div>
                </div>
                <p className={styles.legal}>
                  {content.legalBefore}{' '}
                  <Link href={content.legalLink.href}>{content.legalLink.label}</Link>
                  {content.legalAfter}
                </p>
              </form>
              <LabsButton ref={submitButton} variant="black" className="w-fit" onClick={() => submit()}>
                {chrome.submit}
              </LabsButton>
            </div>
          )}
        </div>
      </LabsDialog>
    </div>
  )
}
