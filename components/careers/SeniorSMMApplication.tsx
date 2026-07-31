'use client'

import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react'
import { uploadPresigned } from '@vercel/blob/client'
import {
  ArrowUpRight,
  Check,
  FileArrowUp,
  FileText,
  X,
} from '@phosphor-icons/react'
import emailjs from '@emailjs/browser'

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const maxCvSize = 5 * 1024 * 1024
const cvMimeTypes: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

function validateCv(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  const expectedMimeType = cvMimeTypes[extension]

  if (!expectedMimeType || (file.type && file.type !== expectedMimeType)) {
    return 'Please attach a PDF, DOC, or DOCX file.'
  }

  if (file.size > maxCvSize) {
    return 'Your CV must be 5 MB or smaller.'
  }

  return ''
}

function formatFileSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function SeniorSMMApplication() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submissionStage, setSubmissionStage] = useState<
    'idle' | 'uploading' | 'sending'
  >('idle')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const emailDetailsRef = useRef<HTMLInputElement>(null)
  const uploadedCvRef = useRef<{
    fingerprint: string
    privateLink: string
    expiresAt: string
  } | null>(null)

  const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const nextEmail = event.target.value.slice(0, 100)
    setEmail(nextEmail)
    setIsEmailValid(nextEmail === '' || emailRegexp.test(nextEmail))
  }, [])

  const handleCvChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null
    setSubmitError('')
    uploadedCvRef.current = null

    if (!nextFile) {
      setCvFile(null)
      return
    }

    const validationError = validateCv(nextFile)
    if (validationError) {
      event.target.value = ''
      setCvFile(null)
      setSubmitError(validationError)
      return
    }

    setCvFile(nextFile)
  }

  const clearCv = () => {
    if (fileInputRef.current) fileInputRef.current.value = ''
    uploadedCvRef.current = null
    setCvFile(null)
    setUploadProgress(0)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const hasValidEmail = emailRegexp.test(email)
    setIsEmailValid(hasValidEmail)
    setSubmitError('')

    if (!name.trim() || !hasValidEmail || !cvFile) {
      setSubmitError('Please add your name, a valid email, and attach your CV.')
      return
    }

    const cvValidationError = validateCv(cvFile)
    if (cvValidationError) {
      setSubmitError(cvValidationError)
      return
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey || !formRef.current) {
      setSubmitError('The application form is temporarily unavailable. Please try again later.')
      return
    }

    setIsSubmitting(true)

    try {
      const fingerprint = `${cvFile.name}:${cvFile.size}:${cvFile.lastModified}`
      let uploadedCv = uploadedCvRef.current

      if (!uploadedCv || uploadedCv.fingerprint !== fingerprint) {
        setSubmissionStage('uploading')
        setUploadProgress(0)

        const extension = cvFile.name.split('.').pop()?.toLowerCase() ?? 'pdf'
        const pathname = `careers/senior-smm/${crypto.randomUUID()}.${extension}`
        const blob = await uploadPresigned(pathname, cvFile, {
          access: 'private',
          handleUploadUrl: '/api/careers/cv/upload',
          contentType: cvFile.type || cvMimeTypes[extension],
          onUploadProgress: ({ percentage }) => {
            setUploadProgress(Math.round(percentage))
          },
        })

        const linkResponse = await fetch('/api/careers/cv/link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pathname: blob.pathname }),
        })
        const linkResult = (await linkResponse.json()) as {
          url?: string
          expiresAt?: string
          error?: string
        }

        if (!linkResponse.ok || !linkResult.url || !linkResult.expiresAt) {
          throw new Error(linkResult.error || 'Could not create a private CV link.')
        }

        uploadedCv = {
          fingerprint,
          privateLink: linkResult.url,
          expiresAt: linkResult.expiresAt,
        }
        uploadedCvRef.current = uploadedCv
      }

      if (!emailDetailsRef.current) {
        throw new Error('Application form is not ready.')
      }

      emailDetailsRef.current.value = [
        'Job: Senior SMM',
        `Phone: ${phone || 'Not provided'}`,
        `Portfolio: ${portfolio || 'Not provided'}`,
        `Private CV: ${uploadedCv.privateLink}`,
        `CV link expires: ${new Date(uploadedCv.expiresAt).toLocaleString('en-GB')}`,
      ].join('\n')

      setSubmissionStage('sending')
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      })
      setName('')
      setEmail('')
      setPhone('')
      setPortfolio('')
      clearCv()
      setMessage('')
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting career application:', error)
      setSubmitError('We could not send your application. Please try again.')
    } finally {
      setIsSubmitting(false)
      setSubmissionStage('idle')
    }
  }

  if (isSubmitted) {
    return (
      <section
        id="apply"
        className="scroll-mt-28 rounded-[32px] bg-[#111214] px-6 py-16 text-center text-white md:px-12 md:py-20"
        aria-live="polite"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-[#111214]">
          <Check size={24} weight="bold" aria-hidden="true" />
        </span>
        <h2 className="mt-7 text-3xl font-semibold text-white md:text-5xl">
          Application received
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/60">
          Thank you for applying for Senior SMM. Our team will review your
          details and contact you if your experience matches the role.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-8 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#111214]"
        >
          Send another application
        </button>
      </section>
    )
  }

  return (
    <section
      id="apply"
      className="scroll-mt-28 overflow-hidden rounded-[32px] bg-[#111214] text-white"
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-white/10 p-7 md:p-12 lg:border-b-0 lg:border-r">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/40">
            Apply
          </p>
          <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[0.98] text-white md:text-6xl">
            Join us as Senior SMM
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
            Share your experience, CV, and a link to your recent work. We will
            get back to suitable candidates with the next steps.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid gap-x-6 gap-y-7 p-7 md:grid-cols-2 md:p-12"
        >
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              Full name
            </span>
            <input
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value.slice(0, 100))}
              autoComplete="name"
              required
              placeholder="Your name"
              className="min-h-12 border-b border-white/20 bg-transparent py-3 text-lg text-white outline-none transition-colors placeholder:text-white/30 focus:border-white"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              required
              aria-invalid={!isEmailValid}
              placeholder="you@example.com"
              className={`min-h-12 border-b bg-transparent py-3 text-lg text-white outline-none transition-colors placeholder:text-white/30 ${
                isEmailValid
                  ? 'border-white/20 focus:border-white'
                  : 'border-red-400 focus:border-red-400'
              }`}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              Phone
            </span>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value.slice(0, 40))}
              autoComplete="tel"
              placeholder="+44..."
              className="min-h-12 border-b border-white/20 bg-transparent py-3 text-lg text-white outline-none transition-colors placeholder:text-white/30 focus:border-white"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              Portfolio or LinkedIn
            </span>
            <input
              type="url"
              name="portfolio"
              value={portfolio}
              onChange={(event) => setPortfolio(event.target.value.slice(0, 500))}
              placeholder="https://... (optional)"
              className="min-h-12 border-b border-white/20 bg-transparent py-3 text-lg text-white outline-none transition-colors placeholder:text-white/30 focus:border-white"
            />
          </label>

          <div className="grid gap-3 md:col-span-2">
            <div className="flex items-end justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
                CV
              </span>
              <span className="text-xs text-white/35">PDF, DOC, DOCX · max 5 MB</span>
            </div>

            {cvFile ? (
              <div className="flex min-h-20 items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-[#111214]">
                  <FileText size={22} weight="duotone" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{cvFile.name}</p>
                  <p className="mt-1 text-xs text-white/40">{formatFileSize(cvFile.size)}</p>
                  {submissionStage === 'uploading' && (
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white transition-[width] duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={clearCv}
                  disabled={isSubmitting}
                  aria-label="Remove CV"
                  className="grid size-9 shrink-0 place-items-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <X size={18} weight="bold" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <label className="group flex min-h-24 cursor-pointer items-center justify-center gap-4 rounded-2xl border border-dashed border-white/20 bg-white/[0.025] px-5 py-5 text-center transition-colors hover:border-white/45 hover:bg-white/[0.06]">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-white/65 transition-colors group-hover:bg-white group-hover:text-[#111214]">
                  <FileArrowUp size={21} weight="duotone" aria-hidden="true" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-semibold text-white">
                    Attach your CV
                  </span>
                  <span className="mt-1 block text-xs text-white/40">
                    Choose a document from your device
                  </span>
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleCvChange}
                  className="sr-only"
                />
              </label>
            )}
          </div>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
              A few words about you
            </span>
            <textarea
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value.slice(0, 1600))}
              rows={4}
              placeholder="Relevant experience, availability, and anything else we should know"
              className="resize-none border-b border-white/20 bg-transparent py-3 text-lg leading-relaxed text-white outline-none transition-colors placeholder:text-white/30 focus:border-white"
            />
          </label>

          <input type="hidden" name="company" value="Senior SMM applicant" />
          <input type="hidden" name="headcount" value="Career application" />
          <input
            ref={emailDetailsRef}
            type="hidden"
            name="other info"
            defaultValue=""
          />

          {submitError && (
            <p
              role="alert"
              className="rounded-xl border border-red-300/25 bg-red-300/10 px-4 py-3 text-sm text-red-100 md:col-span-2"
            >
              {submitError}
            </p>
          )}

          <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md text-xs leading-relaxed text-white/40">
              By submitting, you agree that Vahue may use your information to
              review and respond to your application.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex min-w-[210px] shrink-0 items-center justify-between gap-5 whitespace-nowrap rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-[#111214] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-55"
            >
              <span>
                {submissionStage === 'uploading'
                  ? `Uploading ${uploadProgress}%`
                  : submissionStage === 'sending'
                    ? 'Sending...'
                    : 'Send application'}
              </span>
              {!isSubmitting && (
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
