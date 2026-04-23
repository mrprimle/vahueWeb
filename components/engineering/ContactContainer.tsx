'use client'

import { useState, useCallback, useEffect, ChangeEvent, FormEvent, useRef } from 'react'
import Link from 'next/link'
import emailjs from '@emailjs/browser'

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const interestOptions = [
  'CONSULTING',
  'PROJECT-BASED DEVELOPMENT',
  'TRAINING',
  'TEAM EXTENSIONS',
  'OTHER',
]

interface ContactContainerProps {
  extraMargin?: boolean
}

export default function ContactContainer({ extraMargin }: ContactContainerProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [headcount, setHeadcount] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const closeSuccessModal = useCallback(() => setIsSubmitted(false), [])

  useEffect(() => {
    if (isSubmitted) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSubmitted])

  useEffect(() => {
    if (!isSubmitted) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSuccessModal()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isSubmitted, closeSuccessModal])

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.length < 100) {
      setName(newValue)
    }
  }, [])

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const isValid = emailRegexp.test(newValue)
    setIsEmailValid(isValid || newValue === '')
    if (newValue.length < 100) {
      setEmail(newValue)
    }
  }, [])

  const handleCompanyChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.length < 100) {
      setCompany(newValue)
    }
  }, [])

  const handleHeadcountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.length < 20) {
      setHeadcount(newValue)
    }
  }, [])

  const handleMessageChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (newValue.length < 1000) {
      setMessage(newValue)
    }
  }, [])

  const toggleInterest = useCallback((interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValid = emailRegexp.test(email)

    setIsEmailValid(isValid)

    if (isValid && name !== '' && email !== '') {
      setIsSubmitting(true)
      try {
        const EMAIL_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID
        const EMAIL_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID
        const EMAIL_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY

        if (EMAIL_SERVICE_ID && EMAIL_TEMPLATE_ID && EMAIL_PUBLIC_KEY && formRef.current) {
          await emailjs.sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, formRef.current, {
            publicKey: EMAIL_PUBLIC_KEY,
          })
        }

        setName('')
        setEmail('')
        setCompany('')
        setHeadcount('')
        setInterests([])
        setMessage('')
        setIsSubmitted(true)
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('Something went wrong. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      alert(
        'Please fill in your name and a valid email address.'
      )
    }
  }

  const isDisabled = name === '' || email === '' || !isEmailValid

  return (
    <section className={`bg-bg ${extraMargin ? 'pt-20' : ''}`}>
      <div className="max-w-wide mx-auto px-6 md:px-8 pb-20 md:pb-28">
        <div className="relative rounded-3xl border border-border-mid overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-80"
            style={{
              background:
                'radial-gradient(90% 80% at 0% 0%, rgba(3,137,244,0.14) 0%, rgba(132,52,233,0.08) 40%, transparent 75%)',
            }}
          />
          <div className="relative bg-surface p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left: Title */}
              <div className="flex flex-col justify-start">
                <p className="eyebrow mb-4">Get more ROI from AI. Get Vahue.</p>
                <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-5">
                  Let&apos;s talk
                  <br />
                  <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
                    possibilities.
                  </span>
                </h2>
              </div>

              {/* Right: Form */}
              <div>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block eyebrow mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Adam Sandler"
                    className="w-full bg-transparent border-b border-white/20 text-white text-xl py-2 placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                {/* Your Email */}
                <div>
                  <label className="block eyebrow mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="e.g. email@gmail.com"
                    className={`w-full bg-transparent border-b text-white text-xl py-2 placeholder:text-white/40 focus:outline-none transition-colors ${
                      !isEmailValid && email !== ''
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-white/20 focus:border-white/50'
                    }`}
                  />
                  {!isEmailValid && email !== '' && (
                    <p className="text-red-400 text-sm mt-2">Please enter a valid email address</p>
                  )}
                </div>

                {/* Company Headcount */}
                <div>
                  <label className="block eyebrow mb-2">Company Headcount</label>
                  <input
                    type="text"
                    name="headcount"
                    value={headcount}
                    onChange={handleHeadcountChange}
                    placeholder="e.g. 200"
                    className="w-full bg-transparent border-b border-white/20 text-white text-xl py-2 placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block eyebrow mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={company}
                    onChange={handleCompanyChange}
                    placeholder="Vahue"
                    className="w-full bg-transparent border-b border-white/20 text-white text-xl py-2 placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                {/* Hidden field for EmailJS template */}
                <input 
                  type="hidden" 
                  name="other info" 
                  value={`Headcount: ${headcount || 'Not specified'}\nInterests: ${interests.length > 0 ? interests.join(', ') : 'Not specified'}\nMessage: ${message || 'No message'}`} 
                />

                {/* I'm interested in... */}
                <div>
                  <label className="block eyebrow mb-4">I&apos;m interested in</label>
                  <div className="flex flex-wrap gap-3">
                    {interestOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleInterest(option)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-colors border ${
                          interests.includes(option)
                            ? 'bg-white text-bg border-white'
                            : 'bg-transparent border-border-mid text-white/75 hover:border-border-strong hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block eyebrow mb-2">Message</label>
                  <textarea
                    name="message"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Details, any important info"
                    rows={2}
                    className="w-full bg-transparent border-b border-white/20 text-white text-xl py-2 placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isDisabled || isSubmitting}
                  className={`group w-full flex items-center justify-center gap-3 py-3.5 rounded-full font-medium text-sm uppercase tracking-wider transition-all ${
                    isDisabled || isSubmitting
                      ? 'bg-white/30 text-bg/60 cursor-not-allowed'
                      : 'bg-white text-bg hover:bg-white/90'
                  }`}
                >
                  <span>{isSubmitting ? 'Submitting…' : 'Submit'}</span>
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

                {/* Privacy Policy */}
                <p className="text-white/55 text-xs">
                  By proceeding, I agree with the collection and processing of
                  my personal data as described in the{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-white underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSubmitted && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeSuccessModal}
          />

          <div className="relative w-full max-w-md rounded-2xl bg-surface border border-border-mid shadow-2xl shadow-black/60 p-7 md:p-8">
            <button
              type="button"
              onClick={closeSuccessModal}
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

            <div className="py-6">
              <p className="eyebrow mb-2">Message received</p>
              <h3
                id="contact-success-title"
                className="text-2xl font-semibold text-white mb-3"
              >
                Thanks for reaching out
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Thanks for taking the first step toward our partnership. One of
                our consultants will be in touch within 24 hours.
              </p>
              <button
                type="button"
                onClick={closeSuccessModal}
                className="mt-6 w-full py-3 rounded-full bg-white text-bg font-medium text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
