'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal, { Eyebrow } from './Reveal'

type Scenario = {
  id: string
  channel: string
  ask: string
  reply: string
  effects: { label: string; detail: string; human?: boolean }[]
}

const scenarios: Scenario[] = [
  {
    id: 'price',
    channel: 'Instagram',
    ask: 'Hi! How much is lip filler, and do you have anything this Saturday?',
    reply:
      'Hi Sophie! Lip filler starts from £250. Saturday has 11:00 or 14:30 free with Dr Patel. Shall I hold 11:00? A £30 deposit secures it.',
    effects: [
      { label: 'Slot held', detail: 'Sat 11:00 · Dr Patel' },
      { label: 'Deposit link sent', detail: '£30 · expires in 2 h' },
      { label: 'New client record', detail: 'Source: Instagram' },
    ],
  },
  {
    id: 'move',
    channel: 'WhatsApp',
    ask: "Can I move tomorrow's appointment to next week? Something came up.",
    reply:
      'No problem, James. Next week I can do Tuesday 17:15 or Thursday 09:30. Your deposit carries over. Which suits you?',
    effects: [
      { label: 'Booking moved', detail: 'Tue 17:15 · same treatment' },
      { label: 'Reminder rescheduled', detail: '24 h before' },
      { label: 'Record updated', detail: 'Reason: client request' },
    ],
  },
  {
    id: 'clinical',
    channel: 'Web chat',
    ask: "I'm on blood thinners. Is Botox safe for me?",
    reply:
      "That's an important question for our clinician, not me. I've passed it to Dr Patel, who will message you today. Nothing is booked until she's spoken with you.",
    effects: [
      { label: 'Handed to a human', detail: 'Priority · clinician', human: true },
      { label: 'No medical advice given', detail: 'Policy: clinical questions', human: true },
      { label: 'Note added to record', detail: 'Visible to the clinic only' },
    ],
  },
]

export default function TryIt() {
  const [idx, setIdx] = useState(0)
  const [stage, setStage] = useState(3) // 0 ask, 1 typing, 2 reply, 3 effects
  const timers = useRef<number[]>([])

  const play = (i: number) => {
    timers.current.forEach(clearTimeout)
    setIdx(i)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStage(3)
      return
    }
    setStage(0)
    timers.current = [
      window.setTimeout(() => setStage(1), 450),
      window.setTimeout(() => setStage(2), 1500),
      window.setTimeout(() => setStage(3), 2100),
    ]
  }

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const s = scenarios[idx]

  return (
    <section className="home-light bg-white py-24 text-[#17191c] md:py-32">
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <Reveal>
            <Eyebrow>Try it</Eyebrow>
            <h2 className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] md:text-5xl">
              Pick a message. Watch what happens next.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-lg text-lg leading-relaxed text-[#4a505a]">
              A demo with sample data, not a live system. It shows the three things that matter: a fast, correct reply, a
              real booking, and a person stepping in when they should.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-[#e3e6ea]">
            <div className="flex flex-wrap gap-2 border-b border-[#e3e6ea] bg-[#f5f6f7] p-3">
              {scenarios.map((sc, i) => (
                <button
                  key={sc.id}
                  onClick={() => play(i)}
                  aria-pressed={i === idx}
                  className={`rounded-lg px-3.5 py-2 text-[13px] transition-colors ${
                    i === idx ? 'bg-white text-[#17191c] shadow-[0_1px_2px_rgba(17,18,20,0.08)]' : 'text-[#6a707a] hover:text-[#17191c]'
                  }`}
                >
                  {sc.id === 'price' ? 'Price + availability' : sc.id === 'move' ? 'Reschedule' : 'Clinical question'}
                </button>
              ))}
              <span className="ml-auto self-center pr-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#9aa1ab]">Demo · sample data</span>
            </div>

            <div className="grid md:grid-cols-[1.25fr_1fr]">
              <div className="min-h-[340px] space-y-4 p-6 md:border-r md:border-[#e3e6ea] md:p-8" aria-live="polite">
                <p className="text-xs text-[#6a707a]">{s.channel}</p>
                <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-[#f2f4f6] px-4 py-3 text-[15px] leading-relaxed">{s.ask}</div>
                {stage === 1 && (
                  <div className="ml-auto flex w-16 items-center justify-center gap-1 rounded-2xl rounded-tr-md bg-[#3b54c5]/10 py-3" aria-label="Typing">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#3b54c5]/60" style={{ animationDelay: `${d * 120}ms` }} />
                    ))}
                  </div>
                )}
                {stage >= 2 && (
                  <div className="ml-auto max-w-[85%] animate-[homeFade_400ms_ease-out] rounded-2xl rounded-tr-md bg-[#3b54c5] px-4 py-3 text-[15px] leading-relaxed text-white">
                    {s.reply}
                  </div>
                )}
              </div>

              <div className="bg-[#fafbfb] p-6 md:p-8">
                <p className="mb-4 text-xs text-[#6a707a]">What happened in your systems</p>
                <ul className="space-y-3">
                  {s.effects.map((e, i) => (
                    <li
                      key={e.label}
                      className={`flex items-start gap-3 rounded-xl border bg-white px-4 py-3 transition-[opacity,transform] duration-500 ${
                        e.human ? 'border-[#b4541a]/40' : 'border-[#e3e6ea]'
                      } ${stage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                      style={{ transitionDelay: `${i * 120}ms` }}
                    >
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${e.human ? 'bg-[#b4541a]' : 'bg-[#3b54c5]'}`} />
                      <span>
                        <span className="block text-[14px] font-medium">{e.label}</span>
                        <span className="block text-[13px] text-[#6a707a]">{e.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
