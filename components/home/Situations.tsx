'use client'

import Link from 'next/link'
import { useRef, useState, type KeyboardEvent, type ReactElement } from 'react'
import Reveal, { Eyebrow } from './Reveal'

type Tab = {
  id: string
  label: string
  trigger: string
  signs: string[]
  cta: { text: string; href: string }
}

const tabs: Tab[] = [
  {
    id: 'practices',
    label: 'Clinics & practices',
    trigger: 'Enquiries pile up across Instagram, WhatsApp and the phone.',
    signs: [
      'The same price and availability questions, all day',
      'Replies slow down at peak times and stop after hours',
      'Bookings, notes and follow-ups live in different tools',
    ],
    cta: { text: 'See how the front office system works', href: '#how-it-works' },
  },
  {
    id: 'experts',
    label: 'Expert teams',
    trigger: "The documents arrived. The case still isn't ready.",
    signs: [
      'Reviewers chase missing forms before they can decide',
      'Every fact has to be checked against its source by hand',
      'More cases means hiring more experts',
    ],
    cta: { text: 'Talk to us about case preparation', href: '/contact/' },
  },
  {
    id: 'product',
    label: 'Product teams',
    trigger: "The prototype works. Production doesn't.",
    signs: [
      'No evaluation set, so nobody knows if a change made it better',
      'Latency and cost per user are above budget',
      'The deadline is closer than your next senior hire',
    ],
    cta: { text: 'Meet the embedded engineers', href: '/ai-native-engineering/' },
  },
]

const ink = 'text-[#17191c]'

function PracticeArt() {
  const rows = [
    { ch: 'Instagram', msg: 'How much is lip filler?', wait: '14 min', warn: false },
    { ch: 'WhatsApp', msg: 'Any slots Saturday?', wait: '1 h 10', warn: true },
    { ch: 'Web chat', msg: 'Do you treat rosacea?', wait: 'after hours', warn: true },
    { ch: 'Phone', msg: 'Missed call', wait: 'no reply', warn: true },
  ]
  return (
    <div className="rounded-xl border border-[#e3e6ea] bg-white p-4 shadow-[0_1px_0_rgba(17,18,20,0.04)]">
      <div className="mb-3 flex items-center justify-between text-xs text-[#6a707a]">
        <span>Unanswered enquiries</span>
        <span className="font-mono">4</span>
      </div>
      <ul className="divide-y divide-[#eef0f2]">
        {rows.map((r) => (
          <li key={r.ch} className="flex items-center gap-3 py-2.5 text-[13px]">
            <span className="w-20 shrink-0 rounded-md bg-[#f2f4f6] px-2 py-1 text-center text-[11px] text-[#4a505a]">{r.ch}</span>
            <span className={`flex-1 truncate ${ink}`}>{r.msg}</span>
            <span className={`font-mono text-[11px] ${r.warn ? 'text-[#b4541a]' : 'text-[#6a707a]'}`}>{r.wait}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExpertArt() {
  const rows = [
    { f: 'Claim form', s: 'Received', ok: true },
    { f: 'Policy number', s: 'Mismatch with form', ok: false },
    { f: 'Photos of damage', s: 'Received', ok: true },
    { f: 'Signed declaration', s: 'Missing', ok: false },
  ]
  return (
    <div className="rounded-xl border border-[#e3e6ea] bg-white p-4">
      <div className="mb-3 flex items-center justify-between text-xs text-[#6a707a]">
        <span>Case #4821 · ready for review?</span>
        <span className="font-mono text-[#b4541a]">2 gaps</span>
      </div>
      <ul className="divide-y divide-[#eef0f2]">
        {rows.map((r) => (
          <li key={r.f} className="flex items-center gap-3 py-2.5 text-[13px]">
            <span className={`h-2 w-2 shrink-0 rounded-full ${r.ok ? 'bg-[#9aa1ab]' : 'bg-[#b4541a]'}`} />
            <span className={`flex-1 ${ink}`}>{r.f}</span>
            <span className={`text-[12px] ${r.ok ? 'text-[#6a707a]' : 'text-[#b4541a]'}`}>{r.s}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProductArt() {
  const steps = [
    { n: 'Prototype', s: 'done' },
    { n: 'Evaluation set', s: 'missing' },
    { n: 'Monitoring', s: 'missing' },
    { n: 'Production', s: 'blocked' },
  ]
  return (
    <div className="rounded-xl border border-[#e3e6ea] bg-white p-4">
      <div className="mb-4 text-xs text-[#6a707a]">Path to production</div>
      <ol className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <li key={s.n} className="flex items-center gap-3 text-[13px]">
            <span className="font-mono text-[11px] text-[#9aa1ab]">0{i + 1}</span>
            <span className="flex-1 rounded-lg border border-[#eef0f2] px-3 py-2">
              <span className={ink}>{s.n}</span>
            </span>
            <span className={`w-16 text-right text-[12px] ${s.s === 'done' ? 'text-[#6a707a]' : 'text-[#b4541a]'}`}>{s.s}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

const art: Record<string, () => ReactElement> = { practices: PracticeArt, experts: ExpertArt, product: ProductArt }

export default function Situations() {
  const [active, setActive] = useState(0)
  const btns = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (active + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length
    setActive(next)
    btns.current[next]?.focus()
  }

  const tab = tabs[active]
  const Art = art[tab.id]

  return (
    <section data-nav-theme="light" className="home-light bg-white py-24 text-[#17191c] md:py-32">
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <Reveal>
          <Eyebrow>Where are you today?</Eyebrow>
          <h2 className="max-w-3xl text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] md:text-5xl">
            Three situations we hear every week.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div role="tablist" aria-label="Situations" onKeyDown={onKey} className="grid grid-cols-1 border-y border-[#e3e6ea] sm:grid-cols-3">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  btns.current[i] = el
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative px-1 py-5 text-left text-[15px] transition-colors sm:px-5 ${
                  i === active ? 'text-[#17191c]' : 'text-[#7a808a] hover:text-[#17191c]'
                } ${i > 0 ? 'sm:border-l sm:border-[#e3e6ea]' : ''}`}
              >
                <span className="font-mono text-[11px] text-[#9aa1ab]">0{i + 1}</span>
                <span className="ml-3 font-medium">{t.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-[#3b54c5] transition-transform duration-500 ${
                    i === active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            ))}
          </div>

          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            className="grid items-center gap-10 pt-12 md:grid-cols-2 md:gap-16 animate-[homeFade_500ms_ease-out]"
          >
            <div>
              <h3 className="text-2xl font-medium leading-snug tracking-[-0.015em] md:text-3xl">{tab.trigger}</h3>
              <ul className="mt-6 space-y-3">
                {tab.signs.map((s) => (
                  <li key={s} className="flex gap-3 text-[16px] text-[#4a505a]">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9aa1ab]" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link href={tab.cta.href} className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-[#3b54c5] hover:underline">
                {tab.cta.text}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="rounded-2xl bg-[#f5f6f7] p-6 md:p-10">
              <Art />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
