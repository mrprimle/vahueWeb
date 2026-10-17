'use client'

import { useEffect, useState } from 'react'
import ContactContainer from '@/components/engineering/ContactContainer'

const rotatingValues = [
  'agentic back-office',
  'AI-assisted SDLC',
  'customer ops automation',
  'trusted GenAI for BFSI',
  'eval-hardened AI features',
  'multi-agent workflows',
  'AI-native engineering pods',
  'role-based AI training',
]

const TYPE_DELAY = 60
const DELETE_DELAY = 32
const HOLD_DELAY = 1400

export default function ContactDynamic() {
  const [valueIndex, setValueIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isHolding, setIsHolding] = useState(false)

  useEffect(() => {
    const currentValue = rotatingValues[valueIndex]

    if (isHolding) {
      const t = setTimeout(() => {
        setIsHolding(false)
        setIsDeleting(true)
      }, HOLD_DELAY)
      return () => clearTimeout(t)
    }

    if (!isDeleting && subIndex === currentValue.length) {
      setIsHolding(true)
      return
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false)
      setValueIndex((i) => (i + 1) % rotatingValues.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((s) => s + (isDeleting ? -1 : 1))
      },
      isDeleting ? DELETE_DELAY : TYPE_DELAY
    )
    return () => clearTimeout(timeout)
  }, [subIndex, isDeleting, isHolding, valueIndex])

  const typed = rotatingValues[valueIndex].slice(0, subIndex)

  return (
    <section id="contact" className="relative scroll-mt-20">
      {/* Intro with typewriter */}
      <div className="max-w-shell mx-auto px-6 pt-12 md:pt-24 pb-8 md:pb-12">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Contact</p>
          {/* data-no-reveal: the typewriter rewrites this heading, so it can't be line-split */}
          <h2 data-no-reveal className="font-display text-section font-light">
            We&apos;re here to deliver
            <br />
            <span className="typewriter-caret bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
              {typed || '\u00A0'}
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">
            Tell us where you are and what you&apos;re trying to ship. We reply
            within 24 hours with a diagnosis, a shortlist of quick wins, and
            the smallest next step we&apos;d recommend.
          </p>
        </div>
      </div>

      <ContactContainer />
    </section>
  )
}
