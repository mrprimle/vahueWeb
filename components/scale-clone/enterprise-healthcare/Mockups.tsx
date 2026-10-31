'use client'

import { useEffect, useRef, useState } from 'react'
import s from './healthcare.module.css'
import {
  MdAssignment,
  MdCallMerge,
  MdCheckCircle,
  MdDescription,
  MdErrorOutline,
  MdExpandMore,
  MdHistory,
  MdImage,
  MdListAlt,
  MdOpenInNew,
  MdPerson,
  MdPlace,
  MdSchedule,
  MdScience,
  MdThumbUp,
} from './icons'

/*
 * The three TabbedPanel mockups (chunk 0sni47mcvnqwg.js): OrderGuidanceMockup (module 453596),
 * SchedulingEngineMockup (218184) and CustomAgentsMockup (69472). Plain React state + CSS transitions on
 * scale.com (no GSAP); timings copied from the bundle. All demo data below is placeholder (TODO: Vahue copy).
 */

const reduced = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const D = s.detail
const G10 = 'text-[#212121]'
const G30 = 'text-[#575757]'

function AppBar({ org, product, avatar }: { org: string; product: string; avatar?: { initials: string; bg: string } }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#f2f2f2] px-5 py-3">
      <span className="flex size-5 items-center justify-center rounded bg-[#212121] text-[10px] font-medium leading-[15px] text-white">A</span>
      <span className={`${D} font-medium ${G10}`}>{org}</span>
      <span className="h-3 w-px bg-[#eaeaea]" />
      <span className={`${D} ${G30}`}>{product}</span>
      {avatar ? (
        <span className="ml-auto flex size-5 items-center justify-center rounded-full text-[9px] font-medium text-white" style={{ background: avatar.bg }}>
          {avatar.initials}
        </span>
      ) : null}
    </div>
  )
}

function Title({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 pt-4">
      <p className={`${s.header5} ${G10}`}>{title}</p>
      <p className={`${D} ${G30}`}>{sub}</p>
    </div>
  )
}

/* ---------------------------------------------------------------- Order guidance */
// Sequence: when 30% visible, step = 0 and +1 every 450ms up to 10 (5 chips, then 5 fields), hold 3200ms, loop.
const chips = [
  { key: 'chart', label: 'Patient Chart', Icon: MdAssignment },
  { key: 'labs', label: 'Lab Results', Icon: MdScience },
  { key: 'imaging', label: 'Imaging Studies', Icon: MdImage },
  { key: 'visits', label: 'Visit History', Icon: MdHistory },
  { key: 'problems', label: 'Problem List', Icon: MdListAlt },
]
const STEPS = chips.length + 5
const field = (on: boolean) => `transition-all duration-500 ease-out ${on ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`

export function OrderGuidanceMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(STEPS)

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
        if (n >= STEPS) {
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
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? run() : stop()), { threshold: 0.3 })
    io.observe(el)
    return () => {
      stop()
      io.disconnect()
    }
  }, [])

  const checked = Math.min(step, chips.length)
  const shown = Math.max(0, step - chips.length)

  // TODO: Vahue copy (placeholder demo record)
  return (
    <div ref={ref} aria-hidden="true" className="relative flex h-full w-full flex-col overflow-hidden bg-white text-left">
      <AppBar org="Placeholder Health" product="Suite" />
      <Title title="Order Guidance" sub="Review a placeholder order with assisted checks" />
      <div className="mx-5 mt-4 flex flex-col gap-2 rounded-lg border border-[#f2f2f2] p-3">
        <p className={`${D} font-medium ${G10}`}>Patient Placeholder</p>
        <p className={`${D} ${G30}`}>MRN 0000-0000-0000 · DOB 1900-01-01 · 60 Male · Placeholder Plan</p>
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className={`${D} font-medium ${G10}`}>EHR</span>
          {chips.map(({ key, label, Icon }, i) => {
            const on = i < checked
            return (
              <span
                key={key}
                className={`${D} flex items-center gap-1 rounded border px-1.5 py-0.5 transition-colors duration-[400ms] ease-out ${
                  on ? 'border-[#193A29]/30 bg-[#193A29]/5 text-[#193A29]' : 'border-[#eaeaea] text-[#575757]'
                }`}
              >
                {on ? <MdCheckCircle size={11} /> : <Icon size={11} />}
                {label}
                {on ? null : <MdOpenInNew size={9} />}
              </span>
            )
          })}
        </div>
      </div>
      <div className="mx-5 mt-3 flex flex-1 flex-col gap-2 overflow-hidden rounded-lg border border-[#f2f2f2]">
        <div className="flex items-center justify-between border-b border-[#f2f2f2] p-3">
          <span className={`${D} flex items-center gap-1.5 font-medium ${G10}`}>
            <MdDescription size={13} />
            Referral Order
          </span>
          <span className={`${s.detailMono} font-mono ${G30}`}>order_0</span>
        </div>
        <div className="grid grid-cols-2 gap-3 px-3">
          <div className={field(shown > 0)}>
            <p className={`${D} ${G30}`}>PROCEDURE</p>
            <p className={`${D} font-medium ${G10}`}>Placeholder procedure name (Urgent) — complete with a secondary placeholder step</p>
          </div>
          <div className={field(shown > 1)}>
            <p className={`${D} ${G30}`}>ORDERING PROVIDER</p>
            <p className={`${D} font-medium ${G10}`}>Dr. Placeholder Name, MD — Primary Care</p>
          </div>
        </div>
        <div className={`px-3 ${field(shown > 2)}`}>
          <p className={`${D} ${G30}`}>REQUESTED WINDOW</p>
          <p className={`${D} ${G10}`}>Within 5 days — URGENT (placeholder reason one + placeholder reason two + reason three)</p>
        </div>
        <div className={`overflow-hidden px-3 ${field(shown > 3)}`}>
          <p className={`${D} ${G30}`}>INDICATION</p>
          <p className={`${D} ${G30}`} style={{ textWrap: 'pretty' }}>
            Placeholder indication text for the referral order: (1) a first placeholder finding described over several
            weeks with a measured change in size and character; (2) a second placeholder finding with a duration; (3) a
            third placeholder observation over two weeks; (4) a fourth placeholder finding adjacent to the first; (5) an
            imaging result that recommends further correlation by a specialist; (6) a lab value outside its reference
            range; (7) relevant family history with two placeholder entries. A prior incomplete procedure at a
            community clinic was insufficient for staging. A tertiary center is required given the anatomical and
            staging complexity of the case, so the order is routed for a specialist review placeholder.
          </p>
        </div>
        <div className={`overflow-hidden px-3 pb-3 ${field(shown > 4)}`}>
          <p className={`${D} ${G30}`}>DIAGNOSES (CODES)</p>
          <p className={`${D} ${G30}`} style={{ textWrap: 'pretty' }}>
            X00.0 — Placeholder diagnosis one, unspecified (evolving finding); X00.1 — Placeholder diagnosis two; X00.2 —
            Placeholder diagnosis three; X00.3 — Family history placeholder (two entries); X00.4 — Placeholder neoplasm
            of uncertain behavior (rule out — pending); X00.5 — Other specified abnormal placeholder findings (elevated
            value); X00.6 — Chronic placeholder condition, stage 3a; X00.7 — Placeholder condition without
            complications (newly diagnosed).
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- Scheduling engine */
// Every 4s while 30% visible: content fades out (300ms, -translate-y-1), 220ms later the next slot fades in.
const recs = [
  {
    day: 'TUE',
    date: '7/28',
    time: '09:00',
    duration: '45m',
    clinician: 'Dr. Placeholder A, MD',
    specialty: 'Specialty — Placeholder Screening & Procedures',
    room: 'Procedure Room A',
    description:
      'This slot is on Tuesday, July 28 at 9:00 AM with Dr. Placeholder A, who specializes in the requested procedure, in a suitable room, and fits the morning preference.',
    step: 'The requested scheduling window is within 4 weeks, so we prioritized the earliest specialist opening.',
  },
  {
    day: 'WED',
    date: '7/29',
    time: '09:00',
    duration: '45m',
    clinician: 'Dr. Placeholder B, MD',
    specialty: 'Specialty — General Consult',
    room: 'Procedure Room C',
    description:
      'This slot is on Wednesday, July 29 at 9:00 AM with Dr. Placeholder B, whose schedule has an open procedure window that meets the requested five-day turnaround.',
    step: "Dr. Placeholder A's calendar had no earlier match, so we surfaced the next specialist with an open procedure room.",
  },
  {
    day: 'THU',
    date: '7/30',
    time: '08:30',
    duration: '45m',
    clinician: 'Dr. Placeholder A, MD',
    specialty: 'Specialty — Placeholder Screening & Procedures',
    room: 'Procedure Room A',
    description:
      'This slot is on Thursday, July 30 at 8:30 AM with Dr. Placeholder A, keeping continuity of care with the same clinician and room as the prior visit.',
    step: 'Continuity of care outweighed earliness, so we matched the patient back to their original clinician and room.',
  },
]
type Slot = { time: string; clinician: string; occupied?: boolean }
const slots: Record<string, Slot[]> = {
  MON: [
    { time: '07:00', clinician: 'Dr. Quinn', occupied: true },
    { time: '07:30', clinician: 'Dr. Avery', occupied: true },
    { time: '08:00', clinician: 'Dr. Placeholder C' },
    { time: '11:00', clinician: 'Dr. Blake', occupied: true },
  ],
  TUE: [
    { time: '09:00', clinician: 'Dr. Placeholder A' },
    { time: '10:00', clinician: 'Dr. Placeholder A' },
    { time: '15:00', clinician: 'Dr. Avery', occupied: true },
    { time: '15:30', clinician: 'Dr. Blake', occupied: true },
  ],
  WED: [
    { time: '09:00', clinician: 'Dr. Placeholder B' },
    { time: '13:00', clinician: 'Dr. Placeholder C' },
    { time: '14:00', clinician: 'Dr. Blake', occupied: true },
    { time: '14:30', clinician: 'Dr. Quinn', occupied: true },
  ],
  THU: [
    { time: '07:00', clinician: 'Dr. Quinn', occupied: true },
    { time: '07:30', clinician: 'Dr. Avery', occupied: true },
    { time: '08:30', clinician: 'Dr. Placeholder A' },
    { time: '11:00', clinician: 'Dr. Blake', occupied: true },
  ],
}
const days = [
  { key: 'MON', label: '7/27' },
  { key: 'TUE', label: '7/28' },
  { key: 'WED', label: '7/29' },
  { key: 'THU', label: '7/30' },
]
const dayName: Record<string, string> = { MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday', THU: 'Thursday' }

export function SchedulingMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const [vis, setVis] = useState(true)
  const r = recs[i]

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
            setI((n) => (n + 1) % recs.length)
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

  // TODO: Vahue copy (placeholder demo record)
  return (
    <div ref={ref} aria-hidden="true" className="relative flex h-full w-full flex-col overflow-hidden bg-white text-left">
      <AppBar org="Placeholder" product="Suite" />
      <Title title="Scheduling Engine" sub="Placeholder slot recommendation and one-click booking" />
      <p className={`${D} px-5 pt-3 ${G30}`}>Patient Placeholder · Placeholder Procedure — Type</p>
      <div className="mt-4 grid flex-1 grid-cols-1 gap-3 overflow-hidden px-5 pb-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className={`${fade} flex flex-col gap-3 rounded-lg border border-[#f2f2f2] p-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#79648C]">
              <MdThumbUp size={14} />
              <span className={`${D} font-medium ${G10}`}>Agent Recommendation</span>
            </div>
            <span className={`${D} rounded bg-[#f2f2f2] px-2 py-0.5 !text-[10px] font-medium ${G30}`}>AGENT</span>
          </div>
          <div className="rounded-md border border-[#f2f2f2] p-3">
            <div className="flex items-center justify-between">
              <span className={`${D} font-medium ${G10}`}>
                {dayName[r.day]}, 2026-{r.date.replace('7/', '07-')}
              </span>
              <span className={`${D} font-medium text-[#193A29]`}>{r.time}</span>
            </div>
            <div className={`mt-2 flex items-center gap-1.5 ${G10}`}>
              <MdPerson size={13} />
              <span className={`${D} font-medium`}>{r.clinician}</span>
            </div>
            <p className={`${D} pl-[19px] ${G30}`}>{r.specialty}</p>
            <div className={`mt-2 flex items-center justify-between ${G30}`}>
              <span className={`${D} flex items-center gap-1.5`}>
                <MdPlace size={13} />
                {r.room}
              </span>
              <span className={`${D} flex items-center gap-1.5`}>
                <MdSchedule size={13} />
                {r.duration}
              </span>
            </div>
          </div>
          <p className={`${D} ${G30}`} style={{ textWrap: 'pretty' }}>
            {r.description}
          </p>
          <span className={`${D} flex items-center justify-center gap-2 rounded-full bg-[#193A29] py-2.5 font-medium text-white`}>
            <MdCheckCircle size={14} />
            Book This Slot
          </span>
          <div className="flex flex-1 flex-col gap-2 overflow-hidden rounded-md border border-[#f2f2f2]">
            <div className="flex items-center justify-between border-b border-[#f2f2f2] p-2.5">
              <div className="flex items-center gap-2 text-[#79648C]">
                <MdCallMerge size={14} />
                <span className={`${D} font-medium ${G10}`}>Slot Recommender</span>
                <span className={`${D} ${G30}`}>(4 steps)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`${D} rounded bg-[#f2f2f2] px-2 py-0.5 !text-[10px] font-medium ${G30}`}>TRACING</span>
                <MdExpandMore size={14} className={G30} />
              </div>
            </div>
            <div className={`${fade} flex items-start gap-2 px-2.5 pb-2.5`}>
              <span className={`${D} flex size-4 shrink-0 items-center justify-center rounded-full bg-[#f2f2f2] !text-[10px] font-medium ${G10}`}>1</span>
              <p className={`${D} ${G30}`} style={{ textWrap: 'pretty' }}>
                <span className={`font-medium ${G10}`}>Step 1: </span>
                {r.step}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
          <p className={`${D} font-medium ${G10}`}>SCHEDULING CALENDAR — 12 OPEN SLOTS ACROSS 9 DAYS</p>
          <p className={`${D} ${G30}`}>Click any open slot to select it</p>
          <div className="grid flex-1 grid-cols-4 gap-1.5 overflow-hidden">
            {days.map(({ key, label }) => (
              <div key={key} className={`flex flex-col gap-1 rounded-md transition-colors duration-500 ease-out ${key === r.day ? 'bg-[#f2f2f2]' : ''}`}>
                <div className={`${D} flex flex-col items-center py-1 font-medium ${G10}`}>
                  <span>{key}</span>
                  <span>{label}</span>
                </div>
                {slots[key].map((sl) => {
                  const on = key === r.day && sl.time === r.time && !sl.occupied
                  return (
                    <div
                      key={sl.time}
                      className={`rounded-md border p-1.5 transition-colors duration-500 ease-out ${
                        on
                          ? 'border-[#193A29] bg-[#193A29] text-white'
                          : sl.occupied
                            ? 'border-transparent text-[#929292] opacity-50'
                            : 'border-[#f2f2f2] text-[#212121]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`${D} font-medium`}>{sl.time}</span>
                        {on ? <MdThumbUp size={11} /> : null}
                      </div>
                      <p className={`${D} truncate opacity-80`}>{sl.clinician}</p>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- Custom agents */
// Two stacked windows; on first 30% visibility: 700ms ease-out from translate-y-2 / -4 + opacity 0, second delayed 150ms.
const bars = [
  { time: '22:40', value: 1.4 },
  { time: '04:10', value: 1.8 },
  { time: '08:20', value: 2.9 },
  { time: '10:15', value: 4.1 },
]
const segColor = { done: 'bg-[#33845C]', stalled: 'bg-[#A6353E]', todo: 'bg-[#eaeaea]' } as const
type Seg = keyof typeof segColor
const tone = { red: 'text-[#A6353E]', amber: 'text-[#C07C1A]', gray: 'text-[#575757]' } as const
const risk = {
  high: ['bg-[#A6353E]/10 text-[#A6353E]', 'HIGH'],
  medium: ['bg-[#C07C1A]/10 text-[#C07C1A]', 'MEDIUM'],
  ontrack: ['bg-[#33845C]/10 text-[#33845C]', 'ON TRACK'],
} as const
const rows: {
  name: string
  mrn: string
  finding: string
  study: string
  followUp: string
  interval: string
  due: string
  late: string
  tone: keyof typeof tone
  segs: Seg[]
  note: string
  risk: keyof typeof risk
}[] = [
  { name: 'Patient One', mrn: 'MRN-000001 · 58F', finding: '14 mm placeholder finding, location A — category 4A', study: 'Study type A · 2026-03-12', followUp: 'Repeat study at 3 months', interval: 'interval: 3 months', due: '2026-06-12', late: '74 days late', tone: 'red', segs: ['done', 'stalled', 'todo', 'todo'], note: 'stalled: never ordered', risk: 'high' },
  { name: 'Patient Two', mrn: 'MRN-000002 · 64M', finding: 'Placeholder finding 1.8 cm with a secondary feature — category 4', study: 'Study type B · 2026-05-02', followUp: 'Guided placeholder procedure', interval: 'interval: 3 months', due: '2026-08-05', late: '20 days late', tone: 'red', segs: ['done', 'stalled', 'todo', 'todo'], note: 'stalled: order expired', risk: 'high' },
  { name: 'Patient Three', mrn: 'MRN-000003 · 71M', finding: 'Indeterminate 2.4 cm placeholder mass, value 18', study: 'Study type C · 2026-01-28', followUp: 'Protocol study at 6 months', interval: 'interval: 6 months', due: '2026-07-30', late: '26 days late', tone: 'amber', segs: ['done', 'done', 'stalled', 'todo'], note: 'stalled: no-show, not rebooked', risk: 'medium' },
  { name: 'Patient Four', mrn: 'MRN-000004 · 69F', finding: '3.1 cm placeholder finding, location D', study: 'Study type C · 2025-08-14', followUp: 'Surveillance study at 12 months', interval: 'interval: 12 months', due: '2026-08-18', late: '7 days late', tone: 'amber', segs: ['done', 'done', 'todo', 'todo'], note: 'awaiting scheduling', risk: 'medium' },
  { name: 'Patient Five', mrn: 'MRN-000005 · 55F', finding: 'Placeholder lesion 1.9 cm — category 3, indeterminate', study: 'Study type C · 2026-06-02', followUp: 'Follow-up study with agent', interval: 'interval: 3 months', due: '2026-09-02', late: '8 days out', tone: 'gray', segs: ['done', 'done', 'done', 'todo'], note: 'booked 2026-08-29', risk: 'ontrack' },
  { name: 'Patient Six', mrn: 'MRN-000006 · 62M', finding: 'Incidental 1.2 cm placeholder cystic finding, subtype B', study: 'Study type D · 2025-11-14', followUp: 'Surveillance at 12 months', interval: 'interval: 12 months', due: '2026-11-14', late: '81 days out', tone: 'gray', segs: ['done', 'done', 'todo', 'todo'], note: 'on schedule', risk: 'ontrack' },
]
const cols = 'grid grid-cols-[1.2fr_1.6fr_1.1fr_0.7fr_0.9fr_0.6fr] gap-2'

function Segs({ segs }: { segs: Seg[] }) {
  return (
    <div className="flex h-1 gap-0.5">
      {segs.map((sg, i) => (
        <div key={i} className={`h-full flex-1 rounded-sm ${segColor[sg]}`} />
      ))}
    </div>
  )
}

export function CustomAgentsMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) {
      setOn(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // TODO: Vahue copy (placeholder demo data)
  return (
    <div ref={ref} aria-hidden="true" className="relative h-full w-full overflow-hidden">
      <div
        className={`absolute left-[8%] top-[11%] z-10 flex h-[60%] w-[90%] flex-col overflow-hidden rounded-lg border border-[#eaeaea] bg-white transition-all duration-700 ease-out ${
          on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <AppBar org="Placeholder Health" product="Inpatient Monitoring" avatar={{ initials: 'AB', bg: '#193A29' }} />
        <Title title="Placeholder Alert Agent Dashboard" sub="Review escalating signals, the case against it, and the action bundle." />
        <div className="mx-5 mt-4 flex flex-col gap-1 rounded-md border border-[#a8927c]/30 bg-[#a8927c]/10 p-3">
          <div className="flex items-center justify-between">
            <p className={`${D} font-medium ${G10}`}>Patient Placeholder · MRN-000000 · 68M · Bed 0W-00</p>
          </div>
          <p className={`${D} flex items-center gap-1 font-medium text-[#79648C]`}>
            <MdErrorOutline size={13} />
            ESCALATION RECOMMENDED — fired 10:31 · unacknowledged for 14 minutes
          </p>
          <p className={`${D} ${G30}`}>Placeholder procedure context · no known allergies · full code placeholder</p>
        </div>
        <div className="mt-4 grid flex-1 grid-cols-2 gap-3 overflow-hidden px-5 pb-5">
          <div className="flex flex-col gap-2 overflow-hidden">
            <p className={`${D} font-medium ${G10}`}>Escalation Matrix — 5 signals, all within 6 hours</p>
            <div className="flex items-end gap-2 border-b border-[#f2f2f2] pb-1">
              {bars.map((b) => (
                <div key={b.time} className="flex flex-1 flex-col items-center gap-1">
                  <span className={`${D} ${G30}`}>{b.value}</span>
                  <div className={`w-full rounded-t ${b.value >= 4 ? 'bg-[#79648C]' : 'bg-[#eaeaea]'}`} style={{ height: 12 * b.value }} />
                  <span className={`${D} ${G30}`}>{b.time}</span>
                </div>
              ))}
            </div>
            <p className={`${D} ${G30}`}>Placeholder lab value 4.1 and still climbing (threshold 2.0).</p>
          </div>
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <p className={`${D} font-medium ${G10}`}>3-hour action bundle — clock started 10:31</p>
            {['Placeholder action one completed first', 'Placeholder action two within 1 hour'].map((t) => (
              <p key={t} className={`${D} flex items-center gap-1.5 ${G30}`}>
                <MdCheckCircle size={12} className="text-[#193A29]" />
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`absolute left-[40%] top-[38%] z-20 flex h-[60%] w-[90%] flex-col overflow-hidden rounded-lg border border-[#eaeaea] bg-white transition-all delay-150 duration-700 ease-out ${
          on ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <AppBar org="Placeholder Health" product="Safety Net" avatar={{ initials: 'CD', bg: '#273252' }} />
        <p className={`${s.header5} px-5 pt-4 ${G10}`}>Placeholder Follow-Up Agent</p>
        <div className="mt-4 grid grid-cols-4 gap-2 px-5">
          {[
            ['OVERDUE AND HIGH-RISK', '66', 'Category 4, category 4–5, category 4+', 'border-[#79648C]/30 bg-[#79648C]/5', 'text-[#79648C]'],
            ['OVERDUE', '172', 'past the interval the report specified', 'border-[#f2f2f2]', 'text-[#A8927C]'],
            ['LOOPS CLOSED', '1,046', 'follow-up completed or clinically cancelled', 'border-[#f2f2f2]', G30],
            ['RECOMMENDATIONS FOUND', '1,284', 'extracted from 9,610 reports, last 90 days', 'border-[#f2f2f2]', G30],
          ].map(([label, value, sub, box, color]) => (
            <div key={label} className={`flex flex-col rounded-md border p-2 ${box}`}>
              <span className={`${D} font-medium ${color}`}>{label}</span>
              <span className={`${s.header5} ${G10}`}>{value}</span>
              <span className={`${D} ${G30}`}>{sub}</span>
            </div>
          ))}
        </div>
        <div className="mx-5 mt-4 shrink-0 overflow-hidden rounded-md border border-[#f2f2f2]">
          <div className={`${cols} border-b border-[#f2f2f2] bg-[#f2f2f2]/40 px-3 py-1.5`}>
            {['PATIENT', 'INCIDENTAL FINDING', 'RECOMMENDED FOLLOW-UP', 'DUE', 'LOOP STATE', 'RISK'].map((h) => (
              <span key={h} className={`${D} ${G30}`}>
                {h}
              </span>
            ))}
          </div>
          {rows.map((r) => (
            <div key={r.mrn} className={`${cols} border-b border-[#f2f2f2] px-3 py-2 last:border-b-0`}>
              <div>
                <p className={`${D} font-medium ${G10}`}>{r.name}</p>
                <p className={`${D} ${G30}`}>{r.mrn}</p>
              </div>
              <div>
                <p className={`${D} ${G10}`}>{r.finding}</p>
                <p className={`${D} ${G30}`}>{r.study}</p>
              </div>
              <div>
                <p className={`${D} ${G10}`}>{r.followUp}</p>
                <p className={`${D} ${G30}`}>{r.interval}</p>
              </div>
              <div>
                <p className={`${D} ${G10}`}>{r.due}</p>
                <p className={`${D} ${tone[r.tone]}`}>{r.late}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Segs segs={r.segs} />
                <p className={`${D} ${G30}`}>{r.note}</p>
              </div>
              <div>
                <span className={`${D} rounded-full px-1.5 py-0.5 font-medium ${risk[r.risk][0]}`}>{risk[r.risk][1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
