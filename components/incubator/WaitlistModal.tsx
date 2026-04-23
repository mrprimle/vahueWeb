'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import emailjs from '@emailjs/browser'

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type WaitlistModalProps = {
  open: boolean
  onClose: () => void
  context?: string
}

export default function WaitlistModal({
  open,
  onClose,
  context = 'Vahue Incubator waitlist',
}: WaitlistModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setIsSubmitted(false)
      setName('')
      setEmail('')
      setRole('')
      setIsEmailValid(true)
    }
  }, [open])

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (v.length < 100) setName(v)
  }, [])

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setIsEmailValid(emailRegexp.test(v) || v === '')
    if (v.length < 100) setEmail(v)
  }, [])

  const handleRoleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (v.length < 120) setRole(v)
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValid = emailRegexp.test(email)
    setIsEmailValid(isValid)

    if (!isValid || name === '' || email === '') {
      alert('Please fill in your name and a valid email address.')
      return
    }

    setIsSubmitting(true)
    try {
      const EMAIL_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID
      const EMAIL_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID
      const EMAIL_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY

      if (
        EMAIL_SERVICE_ID &&
        EMAIL_TEMPLATE_ID &&
        EMAIL_PUBLIC_KEY &&
        formRef.current
      ) {
        await emailjs.sendForm(
          EMAIL_SERVICE_ID,
          EMAIL_TEMPLATE_ID,
          formRef.current,
          { publicKey: EMAIL_PUBLIC_KEY }
        )
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = name === '' || email === '' || !isEmailValid

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl bg-surface border border-border-mid shadow-2xl shadow-black/60 p-7 md:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {isSubmitted ? (
          <div className="py-6">
            <h3
              id="waitlist-title"
              className="text-2xl font-semibold text-white mb-3"
            >
              You&apos;re on the list
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Thanks for joining the <strong>Vahue Incubator</strong> waitlist.
              We&apos;ll email you with launch details and your first-month
              discount.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full py-3 rounded-full bg-white text-bg font-medium text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow mb-2">Join the waitlist</p>
            <h3
              id="waitlist-title"
              className="text-2xl font-semibold text-white mb-1"
            >
              Vahue Incubator
            </h3>
            <p className="text-white/55 text-sm mb-6">
              First members get a discount, priority access to Vahue Pilot, and
              a vote on what the community ships next.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block eyebrow mb-2">Full name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Adam Sandler"
                  className="w-full bg-transparent border-b border-white/20 text-white text-lg py-2 placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              <div>
                <label className="block eyebrow mb-2">Your email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="e.g. email@gmail.com"
                  className={`w-full bg-transparent border-b text-white text-lg py-2 placeholder:text-white/40 focus:outline-none transition-colors ${
                    !isEmailValid && email !== ''
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-white/20 focus:border-white/50'
                  }`}
                />
                {!isEmailValid && email !== '' && (
                  <p className="text-red-400 text-sm mt-2">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <div>
                <label className="block eyebrow mb-2">
                  Role / company (optional)
                </label>
                <input
                  type="text"
                  name="role"
                  value={role}
                  onChange={handleRoleChange}
                  placeholder="e.g. Founder at Acme"
                  className="w-full bg-transparent border-b border-white/20 text-white text-lg py-2 placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              <input
                type="hidden"
                name="other info"
                value={`Waitlist signup: ${context}`}
              />

              <button
                type="submit"
                disabled={isDisabled || isSubmitting}
                className={`group w-full flex items-center justify-center gap-3 py-3.5 rounded-full font-medium text-sm uppercase tracking-wider transition-all ${
                  isDisabled || isSubmitting
                    ? 'bg-white/30 text-bg/60 cursor-not-allowed'
                    : 'bg-white text-bg hover:bg-white/90'
                }`}
              >
                <span>{isSubmitting ? 'Joining…' : 'Join the waitlist'}</span>
                {!isSubmitting && (
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDisabled ? '' : 'group-hover:translate-x-1'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
