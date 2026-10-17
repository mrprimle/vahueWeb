'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { DISCOVERY_CALL_URL } from '@/lib/links'
import Reveal from '@/components/motion/Reveal'
import { createHubScene } from './hubScene'

export default function EnterpriseHero() {
  const hubHost = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hubHost.current) return
    const hub = createHubScene(hubHost.current)
    return () => hub.destroy()
  }, [])

  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="absolute inset-0 hero-texture opacity-40" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-var(--header-height,72px))] max-w-shell grid-cols-12 items-center gap-2 px-6 py-24 max-md:py-12">
        <div className="col-span-12 lg:col-span-7">
          <Reveal as="h1" variant="rise" className="font-display text-hero font-light text-balance text-white">
            The AI core of{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Vahue&rsquo;s digital DNA
            </span>
          </Reveal>

          <Reveal as="p" variant="words" delay={0.2} className="mt-8 max-w-xl text-base leading-normal text-white/70 md:text-lg">
            Vahue AI Hub is our enterprise platform — pre-configured, secure, and fully customized agents that turn
            complex business challenges into production-ready AI solutions.
          </Reveal>

          <Reveal variant="block" delay={0.4} className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={DISCOVERY_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-bg transition-[background-color,transform] duration-300 ease-out hover:bg-white/90 active:scale-[0.97]"
            >
              Discover your next AI breakthrough
              <svg className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
            <Link href="/platform" className="btn-outline inline-flex items-center rounded-full px-6 py-3.5 text-sm font-medium text-white">
              How the hub works
            </Link>
          </Reveal>
        </div>

        {/* Drag to spin; follows the cursor slightly */}
        <div className="relative col-span-12 h-[min(640px,70vh)] lg:col-span-5 max-lg:h-[420px]">
          <div ref={hubHost} className="absolute inset-0" aria-hidden="true" />
          <p className="pointer-events-none absolute bottom-0 right-0 font-mono text-[11px] uppercase tracking-[0.05em] text-white/55">
            Drag to explore
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
    </section>
  )
}
