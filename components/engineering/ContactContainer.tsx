'use client'

import { useState, useCallback, ChangeEvent, FormEvent, useRef } from 'react'
import Link from 'next/link'
import emailjs from '@emailjs/browser'

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const interestOptions = ['HIRING A TEAM', 'OUTSOURCING A PROJECT', 'AI/ML', 'OTHER']

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
  const formRef = useRef<HTMLFormElement>(null)

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
        alert(
          'Thank you for taking the first step for our partnership! Our consultant will be in touch with you in 24 hours.'
        )
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
    <section className={`bg-white ${extraMargin ? 'pt-20' : ''}`}>
      <div className="bg-[#0d0d0d] rounded-t-[2.5rem] md:rounded-t-[3rem]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Title */}
            <div className="flex flex-col justify-start">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#E8F751] uppercase leading-tight mb-6 italic">
                Thrilled to meet you!
              </h2>
              <p className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
                Let&apos;s talk possibilities
              </p>
            </div>

            {/* Right: Form */}
            <div>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Full Name</label>
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
                  <label className="block text-white/60 text-sm mb-2">Your Email</label>
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
                  <label className="block text-white/60 text-sm mb-2">Company Headcount</label>
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
                  <label className="block text-white/60 text-sm mb-2">Company Name</label>
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
                  <label className="block text-white/60 text-sm mb-4">I&apos;m interested in ...</label>
                  <div className="flex flex-wrap gap-3">
                    {interestOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleInterest(option)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                          interests.includes(option)
                            ? 'bg-white text-[#0d0d0d] border-white'
                            : 'bg-transparent border-white/30 text-white hover:border-white/60'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Message</label>
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
                  className={`group w-full flex items-center justify-center gap-3 py-4 rounded-full font-semibold text-lg transition-all ${
                    isDisabled || isSubmitting
                      ? 'bg-[#4ADE80]/50 text-[#0d0d0d]/50 cursor-not-allowed'
                      : 'bg-[#4ADE80] text-[#0d0d0d] hover:bg-[#22C55E]'
                  }`}
                >
                  <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}</span>
                  {!isSubmitting && (
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isDisabled ? '' : 'group-hover:translate-x-1'
                      }`} 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  )}
                </button>

                {/* Privacy Policy */}
                <p className="text-white/50 text-sm">
                  By proceeding, I agree with the collection and processing of my personal data as described in the{' '}
                  <Link href="/privacy-policy" className="text-[#4ADE80] hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
