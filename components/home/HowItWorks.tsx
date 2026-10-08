'use client'

import Reveal, { Eyebrow, useScrollProgress } from './Reveal'

const steps = [
  { name: 'Enquiry arrives', line: 'Instagram, WhatsApp, web chat or a phone call. Answered in minutes, day and night.' },
  { name: 'Qualify', line: 'Asks the questions your front desk would. Anything clinical or sensitive goes to a person.' },
  { name: 'Book', line: 'Offers live slots, holds the time and takes a deposit, so the visit is real.' },
  { name: 'One client record', line: 'Conversation, notes and consent land in your booking system. Nothing retyped.' },
  { name: 'Follow up', line: 'Aftercare, rebooking prompts, lapsed-client reminders and review requests.' },
  { name: "Owner's numbers", line: 'Each week: enquiries, reply time, bookings, no-shows and revenue by channel.' },
]

/** A tilted plane drawn in CSS. Active plane lifts and lights up. */
function Plane({ i, active, label }: { i: number; active: number; label: string }) {
  const state = i < active ? 'past' : i === active ? 'now' : 'next'
  const lift = state === 'now' ? -24 : 0
  const y = (i - (steps.length - 1) / 2) * 66 + lift
  return (
    <div
      className="absolute left-1/2 top-1/2 h-[210px] w-[340px] -ml-[170px] -mt-[105px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ transform: `translate3d(0, ${y}px, 0) rotateX(58deg) rotateZ(-38deg)`, zIndex: 20 - i }}
    >
      <div
        className={`h-full w-full rounded-[22px] border transition-[background-color,border-color,box-shadow] duration-500 ${
          state === 'now'
            ? 'border-[#BBDEF2]/70 bg-[#17242c] shadow-[0_0_60px_rgba(187,222,242,0.18)]'
            : state === 'past'
              ? 'border-white/15 bg-[#121417]'
              : 'border-white/10 bg-[#0d0f12]'
        }`}
      >
        <div className="flex h-full flex-col justify-between p-5">
          <span className={`font-mono text-[11px] ${state === 'now' ? 'text-[#BBDEF2]' : 'text-white/35'}`}>0{i + 1}</span>
          <span className={`font-display text-xl ${state === 'now' ? 'text-white' : 'text-white/40'}`}>{label}</span>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>()
  const active = Math.min(steps.length - 1, Math.floor(progress * steps.length))

  return (
    <section id="how-it-works" className="scroll-mt-16 bg-[#08090b] text-white">
      {/* Desktop: pinned stack driven by scroll */}
      <div ref={ref} className="relative hidden md:block" style={{ height: `${steps.length * 70 + 40}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-wide grid-cols-[0.9fr_1.1fr] items-center gap-10 px-8">
            <div>
              <Eyebrow dark>How it works</Eyebrow>
              <h2 className="font-display text-5xl font-light leading-[1.05] tracking-[-0.02em] xl:text-6xl">
                From first message to repeat visit, one system.
              </h2>
              <ol className="mt-12 space-y-1">
                {steps.map((s, i) => (
                  <li key={s.name} className={`border-l py-3 pl-5 transition-colors duration-500 ${i === active ? 'border-[#BBDEF2]' : 'border-white/10'}`}>
                    <p className={`text-[17px] transition-colors duration-500 ${i === active ? 'text-white' : 'text-white/40'}`}>
                      <span className="mr-3 font-mono text-[12px] text-white/35">0{i + 1}</span>
                      {s.name}
                    </p>
                    <p
                      className={`overflow-hidden text-[15px] leading-relaxed text-white/60 transition-[max-height,opacity,margin] duration-500 ${
                        i === active ? 'mt-2 max-h-24 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {s.line}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative h-[640px] [perspective:1800px]">
              <div className="absolute inset-0 [transform-style:preserve-3d]">
                {steps.map((s, i) => (
                  <Plane key={s.name} i={i} active={active} label={s.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and reduced space: a plain sequence */}
      <div className="px-6 py-24 md:hidden">
        <Reveal>
          <Eyebrow dark>How it works</Eyebrow>
          <h2 className="font-display text-[2.4rem] font-light leading-[1.05] tracking-[-0.02em]">
            From first message to repeat visit, one system.
          </h2>
        </Reveal>
        <ol className="mt-10 space-y-6">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 60} className="border-l border-white/15 pl-5">
              <p className="text-[17px]">
                <span className="mr-3 font-mono text-[12px] text-[#BBDEF2]">0{i + 1}</span>
                {s.name}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{s.line}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
