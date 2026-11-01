'use client'

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import s from '@/components/templates/enterprise-healthcare/healthcare.module.css'
import {
  MdAssignment,
  MdCheckCircle,
  MdDescription,
  MdErrorOutline,
  MdListAlt,
  MdPerson,
  MdThumbUp,
} from '@/components/templates/enterprise-healthcare/icons'

/*
 * Vahue mock UIs for the three TabbedPanel tabs, one per healthcare workflow. They reuse the clone's three
 * motion patterns (components/templates/enterprise-healthcare/Mockups.tsx), plain React state + CSS:
 *   SummaryMockup   = OrderGuidance sequence: when 30% visible, step +1 every 450ms (sources, then lines),
 *                     hold 3200ms, loop
 *   IntakeMockup    = CustomAgents intro: two windows enter 700ms ease-out from translate-y-2 / -4, the
 *                     second 150ms later, then the field checks run on the same 450ms sequence
 *   FindingsMockup  = SchedulingEngine rotation: every 4s while 30% visible, fade out 300ms, next item 220ms later
 * All demo content is illustrative (no patient data, no figures). Reduced motion shows the final state.
 * Colours: the clone's light mockup palette (white window, #212121 / #575757 text, #f2f2f2 rules, #193A29 accent).
 */

const reduced = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const D = s.detail
const T1 = 'text-[#212121]'
const T2 = 'text-[#575757]'
const BORDER = 'border-[#f2f2f2]'
const ON = 'border-[#193A29]/30 bg-[#193A29]/5 text-[#193A29]'

function AppBar({ product }: { product: string }) {
  return (
    <div className={`flex items-center gap-3 border-b ${BORDER} px-5 py-3`}>
      <span className="flex size-5 items-center justify-center rounded bg-[#212121] text-[10px] font-medium leading-[15px] text-white">V</span>
      <span className={`${D} font-medium ${T1}`}>Vahue</span>
      <span className="h-3 w-px bg-[#eaeaea]" />
      <span className={`${D} ${T2}`}>{product}</span>
      <span className={`${D} ml-auto flex items-center gap-1.5 ${T2}`}>
        <span className="size-1.5 rounded-full bg-[#33845C]" />
        Live
      </span>
    </div>
  )
}

function Title({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 pt-4">
      <p className={`${s.header5} ${T1}`}>{title}</p>
      <p className={`${D} ${T2}`}>{sub}</p>
    </div>
  )
}

const Pill = ({ children, strong }: { children: ReactNode; strong?: boolean }) => (
  <span
    className={`${D} inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 !text-[10px] font-medium uppercase tracking-[0.04em] ${
      strong ? 'bg-[#193A29] text-white' : 'bg-[#f2f2f2] text-[#575757]'
    }`}
  >
    {children}
  </span>
)

/* Step sequence shared by the summary and intake mockups. */
function useStepLoop(ref: RefObject<HTMLElement | null>, total: number, startDelay = 0) {
  const [step, setStep] = useState(total)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    let interval: ReturnType<typeof setInterval> | null = null
    let timeout: ReturnType<typeof setTimeout> | null = null
    const run = () => {
      let n = 0
      setStep(0)
      interval = setInterval(() => {
        n += 1
        setStep(n)
        if (n >= total) {
          if (interval) clearInterval(interval)
          timeout = setTimeout(run, 3200)
        }
      }, 450)
    }
    const stop = () => {
      if (interval) clearInterval(interval)
      if (timeout) clearTimeout(timeout)
      interval = null
      timeout = null
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return stop()
        if (interval || timeout) return
        setStep(0)
        timeout = setTimeout(run, startDelay)
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      stop()
      io.disconnect()
    }
  }, [ref, total, startDelay])
  return step
}

const field = (on: boolean) => `transition-all duration-500 ease-out ${on ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`

/* ---------------------------------------------------------------- Clinical and trial document summaries */
const sources = ['Protocol v2', 'Amendment v3', 'Site list', 'Consent form v4', 'Monitoring plan']
const summary = [
  { label: 'What changed', text: 'The visit 4 window is wider, and a new safety lab is added at visit 6.', cite: '§6.2 · p. 31' },
  { label: 'Who is affected', text: 'All active sites, and participants who have passed visit 3.', cite: '§1.4 · p. 6' },
  { label: 'Action for sites', text: 'Re-consent participants on consent form v4 at their next visit.', cite: '§10.1 · p. 58' },
  { label: 'Open question', text: 'The lab manual still shows the old window. Sent to the study lead.', cite: null },
]
const SUMMARY_STEPS = sources.length + summary.length + 1

export function SummaryMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const step = useStepLoop(ref, SUMMARY_STEPS)
  const read = Math.min(step, sources.length)
  const shown = Math.max(0, step - sources.length)

  return (
    <div ref={ref} aria-hidden="true" className="relative flex h-full w-full flex-col overflow-hidden bg-white text-left">
      <AppBar product="Document summaries" />
      <Title title="Amendment summary" sub="Draft for the study team · every line cites its page" />
      <div className={`mx-5 mt-4 flex flex-col gap-2 rounded-lg border ${BORDER} p-3`}>
        <p className={`${D} font-medium ${T1}`}>Sources</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {sources.map((label, i) => {
            const on = i < read
            return (
              <span
                key={label}
                className={`${D} flex items-center gap-1 rounded border px-1.5 py-0.5 transition-colors duration-[400ms] ease-out ${
                  on ? ON : 'border-[#eaeaea] text-[#575757]'
                }`}
              >
                {on ? <MdCheckCircle size={11} /> : <MdDescription size={11} />}
                {label}
              </span>
            )
          })}
        </div>
      </div>
      <div className={`mx-5 mb-5 mt-3 flex flex-1 flex-col gap-3 overflow-hidden rounded-lg border ${BORDER}`}>
        <div className={`flex items-center justify-between border-b ${BORDER} p-3`}>
          <span className={`${D} flex items-center gap-1.5 font-medium ${T1}`}>
            <MdListAlt size={13} />
            Summary draft
          </span>
          <span className={`${s.detailMono} font-mono ${T2}`}>draft_12</span>
        </div>
        {summary.map((row, i) => (
          <div key={row.label} className={`px-3 ${field(shown > i)}`}>
            <div className="flex items-center justify-between gap-2">
              <p className={`${D} uppercase tracking-[0.04em] ${T2}`}>{row.label}</p>
              {row.cite ? <span className={`${D} font-mono !text-[10px] ${T2}`}>{row.cite}</span> : <Pill>Needs review</Pill>}
            </div>
            <p className={`${D} mt-0.5 ${T1}`} style={{ textWrap: 'pretty' }}>
              {row.text}
            </p>
          </div>
        ))}
        <div className={`mt-auto flex items-center gap-2 border-t ${BORDER} p-3 ${field(shown > summary.length)}`}>
          <span className={`${D} rounded-md bg-[#193A29] px-3 py-1.5 font-medium text-white`}>Approve</span>
          <span className={`${D} rounded-md border border-[#eaeaea] px-3 py-1.5 text-[#575757]`}>Send back</span>
          <span className={`${D} ml-auto ${T2}`}>Reviewer: study lead</span>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- Clinical documentation (intake) */
const fields = [
  { label: 'Document type', value: 'Referral letter' },
  { label: 'Referring practice', value: 'Northside Family Practice' },
  { label: 'Requested service', value: 'Dermatology consult' },
  { label: 'Priority', value: 'Routine' },
  { label: 'Patient ID', value: '•••• •••• 4821', note: 'masked' },
  { label: 'Letter date', value: 'Unclear on scan', review: true },
]
const stages = ['Receive', 'Extract', 'Check', 'Post']

export function IntakeMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const step = useStepLoop(ref, fields.length + 1, 850)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) {
      setEntered(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setEntered(true)
        io.disconnect()
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const stage = step >= fields.length + 1 ? 3 : step >= fields.length ? 2 : step > 0 ? 1 : 0
  const win = (second: boolean, from: string) =>
    `transition-all duration-700 ease-out ${second ? 'delay-150' : ''} ${entered ? 'translate-y-0 opacity-100' : `${from} opacity-0`}`

  return (
    <div ref={ref} aria-hidden="true" className="relative flex h-full w-full flex-col overflow-hidden bg-white text-left">
      <AppBar product="Document intake" />
      <Title title="Referral letter" sub="Read from the source page · unsure fields go to a person" />
      <div className="mx-5 mt-4 flex items-center gap-1">
        {stages.map((st, i) => (
          <span
            key={st}
            className={`${D} flex-1 rounded border px-2 py-1 text-center transition-colors duration-500 ${
              i <= stage ? ON : 'border-[#eaeaea] text-[#575757]'
            }`}
          >
            {st}
          </span>
        ))}
      </div>
      <div className="mx-5 mb-5 mt-3 grid flex-1 grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 overflow-hidden">
        <div className={`flex flex-col gap-2 rounded-lg border ${BORDER} bg-[#f9fafb] p-3 ${win(false, 'translate-y-2')}`}>
          <span className={`${D} flex items-center gap-1.5 font-medium ${T1}`}>
            <MdAssignment size={13} />
            Source
          </span>
          <span className="mt-1 h-2 w-2/3 rounded-sm bg-[#d4d4d4]" />
          {[92, 80, 96, 70, 88, 60, 84, 76, 90, 52].map((w, i) => (
            <span key={i} className="h-1.5 rounded-sm bg-[#eaeaea]" style={{ width: `${w}%` }} />
          ))}
          <span className="mt-auto h-6 w-1/2 rounded-sm border border-dashed border-[#d4d4d4]" />
        </div>
        <div className={`flex flex-col overflow-hidden rounded-lg border ${BORDER} ${win(true, '-translate-y-4')}`}>
          <div className={`flex items-center justify-between border-b ${BORDER} p-3`}>
            <span className={`${D} font-medium ${T1}`}>Record</span>
            <span className={`${s.detailMono} font-mono ${T2}`}>EHR</span>
          </div>
          {fields.map((f, i) => {
            const on = step > i
            return (
              <div key={f.label} className={`flex items-center gap-2 border-b ${BORDER} px-3 py-2 last:border-b-0`}>
                <div className="min-w-0 flex-1">
                  <p className={`${D} ${T2}`}>{f.label}</p>
                  <p className={`${D} truncate font-medium ${T1} ${field(on)}`}>{f.value}</p>
                </div>
                <span className={field(on)}>
                  {f.review ? (
                    <Pill>Review</Pill>
                  ) : f.note ? (
                    <Pill>{f.note}</Pill>
                  ) : (
                    <MdCheckCircle size={13} className="text-[#33845C]" />
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- Audit finding classification */
const findings = [
  {
    id: 'F-031',
    text: 'Temperature log for the sample fridge is missing two days in March.',
    category: 'Storage and equipment',
    severity: 'Minor',
    owner: 'Site quality lead',
    clear: true,
    reason: 'Matches earlier missing-log findings, all rated minor.',
  },
  {
    id: 'F-032',
    text: 'Consent form v3 was used after v4 had been approved.',
    category: 'Informed consent',
    severity: 'Major',
    owner: 'Study lead',
    clear: true,
    reason: 'Out-of-date consent versions were rated major in past audits.',
  },
  {
    id: 'F-033',
    text: 'One coordinator’s training record is signed but not dated.',
    category: 'Training records',
    severity: 'Minor or major',
    owner: 'Reviewer',
    clear: false,
    reason: 'Past decisions are split on undated records, so a person decides.',
  },
]

export function FindingsMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const [vis, setVis] = useState(true)
  const f = findings[i]

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    let interval: ReturnType<typeof setInterval> | null = null
    let timeout: ReturnType<typeof setTimeout> | null = null
    const stop = () => {
      if (interval) clearInterval(interval)
      if (timeout) clearTimeout(timeout)
      interval = null
      timeout = null
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return stop()
        if (interval) return
        interval = setInterval(() => {
          setVis(false)
          timeout = setTimeout(() => {
            setI((n) => (n + 1) % findings.length)
            setVis(true)
          }, 220)
        }, 4000)
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      stop()
      io.disconnect()
    }
  }, [])

  const fade = `transition-all duration-300 ease-out ${vis ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`
  const facts = [
    { k: 'Category', v: f.category },
    { k: 'Severity', v: f.severity },
    { k: 'Route to', v: f.owner },
  ]

  return (
    <div ref={ref} aria-hidden="true" className="relative flex h-full w-full flex-col overflow-hidden bg-white text-left">
      <AppBar product="Audit findings" />
      <Title title="Finding classification" sub="Learned from past decisions · borderline cases go to a reviewer" />
      <div className="mx-5 mb-5 mt-4 grid flex-1 grid-cols-1 gap-3 overflow-hidden lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className={`flex flex-col gap-3 rounded-lg border ${BORDER} p-3`}>
          <div className={`${fade} flex flex-col gap-3`}>
            <div className="flex items-center justify-between">
              <span className={`${D} font-mono ${T2}`}>{f.id}</span>
              {f.clear ? <Pill>Clear</Pill> : <Pill strong>Borderline</Pill>}
            </div>
            <p className={`${D} font-medium ${T1}`} style={{ textWrap: 'pretty' }}>
              {f.text}
            </p>
            <div className={`grid grid-cols-3 gap-2 rounded-md border ${BORDER} p-2`}>
              {facts.map((x) => (
                <div key={x.k} className="min-w-0">
                  <p className={`${D} ${T2}`}>{x.k}</p>
                  <p className={`${D} font-medium ${T1}`}>{x.v}</p>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2">
              {f.clear ? <MdThumbUp size={13} className="mt-px shrink-0 text-[#33845C]" /> : <MdErrorOutline size={13} className="mt-px shrink-0 text-[#A6353E]" />}
              <p className={`${D} ${T2}`} style={{ textWrap: 'pretty' }}>
                <span className={`font-medium ${T1}`}>Why: </span>
                {f.reason}
              </p>
            </div>
          </div>
          <span className={`${D} mt-auto flex items-center justify-center gap-2 rounded-full py-2.5 font-medium ${f.clear ? 'bg-[#193A29] text-white' : 'border border-[#193A29] text-[#193A29]'}`}>
            {f.clear ? <MdCheckCircle size={14} /> : <MdPerson size={14} />}
            {f.clear ? 'Route finding' : 'Send to reviewer'}
          </span>
        </div>
        <div className={`hidden flex-col overflow-hidden rounded-lg border ${BORDER} lg:flex`}>
          <div className={`border-b ${BORDER} p-3`}>
            <span className={`${D} font-medium ${T1}`}>Queue</span>
          </div>
          {findings.map((x, n) => (
            <div
              key={x.id}
              className={`flex flex-col gap-1 border-b ${BORDER} p-3 transition-colors duration-500 ease-out last:border-b-0 ${n === i ? 'bg-[#f2f2f2]' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className={`${D} font-mono ${T2}`}>{x.id}</span>
                <span className={`${D} ${n === i ? T1 : T2}`}>{x.clear ? x.severity : 'To reviewer'}</span>
              </div>
              <p className={`${D} truncate ${n === i ? T1 : T2}`}>{x.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
