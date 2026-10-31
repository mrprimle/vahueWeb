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
 * scale.com (no GSAP); timings, markup and demo data transcribed from the bundle.
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
const INDICATION =
  'Urgent wide excisional biopsy with sentinel lymph node mapping for: (1) 6-week history of a rapidly enlarging, irregular pigmented lesion on the back with color variation, now 14mm (ABCDE-positive: Asymmetry, Border irregularity, Color variation, Diameter, Evolving); (2) 12 lb unintentional weight loss over 10 weeks; (3) new ulceration and intermittent bleeding from the lesion (2 weeks); (4) new palpable satellite nodule adjacent to the primary lesion; (5) regional ultrasound showing a 1.8 cm left axillary lymph node with loss of normal fatty hilum — radiologist recommends histopathological correlation; (6) LDH elevated at 285 U/L; (7) Strong family history — father melanoma age 55, maternal uncle melanoma age 62. Prior incomplete shave biopsy (community clinic, 2022) — insufficient depth, Breslow staging not possible. Tertiary dermatologic oncology center required for wide excision with sentinel lymph node biopsy given anatomical/staging complexity.'
const DIAGNOSES =
  'L98.9 — Disorder of the skin and subcutaneous tissue, unspecified (evolving pigmented lesion); R59.0 — Localized enlarged lymph nodes; R63.4 — Abnormal weight loss; Z80.8 — Family history of malignant neoplasm of other organs (melanoma); D48.5 — Neoplasm of uncertain behavior, skin (rule out — biopsy pending); R79.89 — Other specified abnormal findings of blood chemistry (elevated LDH); N18.3 — Chronic kidney disease, Stage 3a (eGFR 58); E11.9 — Type 2 diabetes mellitus without complications (newly diagnosed).'
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

  return (
    <div ref={ref} aria-hidden="true" className="relative flex h-full w-full flex-col overflow-hidden bg-white text-left">
      <AppBar org="ACME Health" product="CAM Suite" />
      <Title title="Order Guidance" sub="Review clinical order with AI-powered assistance" />
      <div className="mx-5 mt-4 flex flex-col gap-2 rounded-lg border border-[#f2f2f2] p-3">
        <p className={`${D} font-medium ${G10}`}>James Okonkwo</p>
        <p className={`${D} ${G30}`}>MRN DERM-2024-0089 · DOB 1961-11-04 · 62 Male · Medicare Advantage</p>
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className={`${D} font-medium ${G10}`}>EPIC EHR</span>
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
          <span className={`${s.detailMono} font-mono ${G30}`}>order_3</span>
        </div>
        <div className="grid grid-cols-2 gap-3 px-3">
          <div className={field(shown > 0)}>
            <p className={`${D} ${G30}`}>PROCEDURE</p>
            <p className={`${D} font-medium ${G10}`}>Wide Excisional Biopsy (Urgent) — Complete with Sentinel Lymph Node Mapping</p>
          </div>
          <div className={field(shown > 1)}>
            <p className={`${D} ${G30}`}>ORDERING PROVIDER</p>
            <p className={`${D} font-medium ${G10}`}>Dr. Rachel Torres, MD — Primary Care</p>
          </div>
        </div>
        <div className={`px-3 ${field(shown > 2)}`}>
          <p className={`${D} ${G30}`}>REQUESTED WINDOW</p>
          <p className={`${D} ${G10}`}>Within 5 days — URGENT (regional lymphadenopathy + elevated LDH + worsening systemic symptoms)</p>
        </div>
        <div className={`overflow-hidden px-3 ${field(shown > 3)}`}>
          <p className={`${D} ${G30}`}>INDICATION</p>
          <p className={`${D} ${G30}`} style={{ textWrap: 'pretty' }}>
            {INDICATION}
          </p>
        </div>
        <div className={`overflow-hidden px-3 pb-3 ${field(shown > 4)}`}>
          <p className={`${D} ${G30}`}>DIAGNOSES (ICD-10)</p>
          <p className={`${D} ${G30}`} style={{ textWrap: 'pretty' }}>
            {DIAGNOSES}
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
    clinician: 'Dr. Sarah Chen, MD',
    specialty: 'Dermatology — Skin Cancer Screening & Excisions',
    room: 'Procedure Room A',
    description:
      "This slot is on Tuesday, July 28 at 9:00 AM with Dr. Sarah Chen, who specializes in skin cancer screening and excisions, in a suitable room, and fits the patient's morning preference.",
    step: 'The requested scheduling window is within 4 weeks, so we prioritized the earliest dermatology opening.',
  },
  {
    day: 'WED',
    date: '7/29',
    time: '09:00',
    duration: '45m',
    clinician: 'Dr. Priya Nair, MD',
    specialty: 'Dermatology — General Consult',
    room: 'Procedure Room C',
    description:
      'This slot is on Wednesday, July 29 at 9:00 AM with Dr. Priya Nair, whose schedule has an open procedure window that meets the requested five-day turnaround.',
    step: "Dr. Chen's calendar had no earlier match, so we surfaced the next specialist with an open procedure room.",
  },
  {
    day: 'THU',
    date: '7/30',
    time: '08:30',
    duration: '45m',
    clinician: 'Dr. Sarah Chen, MD',
    specialty: 'Dermatology — Skin Cancer Screening & Excisions',
    room: 'Procedure Room A',
    description:
      'This slot is on Thursday, July 30 at 8:30 AM with Dr. Sarah Chen, keeping continuity of care with the same clinician and room as the prior visit.',
    step: 'Continuity of care outweighed earliness, so we matched the patient back to their original clinician and room.',
  },
]
type Slot = { time: string; duration: string; clinician: string; room: string; occupied?: boolean }
const slots: Record<string, Slot[]> = {
  MON: [
    { time: '07:00', duration: '60m', clinician: 'Dr. Webb', room: 'Endoscopy Suite A', occupied: true },
    { time: '07:30', duration: '45m', clinician: 'Dr. Chen', room: 'Procedure Room C', occupied: true },
    { time: '08:00', duration: '45m', clinician: 'Dr. Marcus Webb', room: 'Procedure Room A' },
    { time: '11:00', duration: '30m', clinician: 'Dr. Nair', room: 'Procedure Room C', occupied: true },
  ],
  TUE: [
    { time: '09:00', duration: '45m', clinician: 'Dr. Sarah Chen', room: 'Procedure Room A' },
    { time: '10:00', duration: '45m', clinician: 'Dr. Sarah Chen', room: 'Procedure Room A' },
    { time: '15:00', duration: '45m', clinician: 'Dr. Chen', room: 'Sedation Room B', occupied: true },
    { time: '15:30', duration: '30m', clinician: 'Dr. Nair', room: 'Procedure Room C', occupied: true },
  ],
  WED: [
    { time: '09:00', duration: '45m', clinician: 'Dr. Priya Nair', room: 'Procedure Room C' },
    { time: '13:00', duration: '45m', clinician: 'Dr. Marcus Webb', room: 'Procedure Room A' },
    { time: '14:00', duration: '30m', clinician: 'Dr. Nair', room: 'Procedure Room C', occupied: true },
    { time: '14:30', duration: '60m', clinician: 'Dr. Webb', room: 'Endoscopy Suite A', occupied: true },
  ],
  THU: [
    { time: '07:00', duration: '60m', clinician: 'Dr. Webb', room: 'Endoscopy Suite A', occupied: true },
    { time: '07:30', duration: '45m', clinician: 'Dr. Chen', room: 'Procedure Room C', occupied: true },
    { time: '08:30', duration: '45m', clinician: 'Dr. Sarah Chen', room: 'Procedure Room A' },
    { time: '11:00', duration: '30m', clinician: 'Dr. Nair', room: 'Procedure Room C', occupied: true },
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

  return (
    <div ref={ref} aria-hidden="true" className="relative flex h-full w-full flex-col overflow-hidden bg-white text-left">
      <AppBar org="ACME" product="CAM Suite" />
      <Title title="Scheduling Engine" sub="Intelligent slot recommendation and one-click booking" />
      <p className={`${D} px-5 pt-3 ${G30}`}>Robert Tanaka · Excisional Biopsy — Nevus</p>
      <div className="mt-4 grid flex-1 grid-cols-1 gap-3 overflow-hidden px-5 pb-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className={`${fade} flex flex-col gap-3 rounded-lg border border-[#f2f2f2] p-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#79648C]">
              <MdThumbUp size={14} />
              <span className={`${D} font-medium ${G10}`}>Agent Recommendation</span>
            </div>
            <span className={`${D} rounded bg-[#f2f2f2] px-2 py-0.5 !text-[10px] font-medium ${G30}`}>SGP AGENT</span>
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
                <span className={`${D} rounded bg-[#f2f2f2] px-2 py-0.5 !text-[10px] font-medium ${G30}`}>SGP TRACING</span>
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
  { name: 'Angela Rivera', mrn: 'MRN-118204 · 58F', finding: '14 mm solid nodule, right upper lobe — Lung-RADS 4A', study: 'CT chest w/ contrast · 2026-03-12', followUp: 'Repeat CT chest at 3 months', interval: 'interval: 3 months', due: '2026-06-12', late: '74 days late', tone: 'red', segs: ['done', 'stalled', 'todo', 'todo'], note: 'stalled: never ordered', risk: 'high' },
  { name: 'Marcus Bell', mrn: 'MRN-155902 · 64M', finding: 'Thyroid nodule 1.8 cm with punctate calcification — TI-RADS 4', study: 'US neck · 2026-05-02', followUp: 'US-guided fine needle aspiration', interval: 'interval: 3 months', due: '2026-08-05', late: '20 days late', tone: 'red', segs: ['done', 'stalled', 'todo', 'todo'], note: 'stalled: order expired', risk: 'high' },
  { name: 'Daniel Whitfield', mrn: 'MRN-097331 · 71M', finding: 'Indeterminate 2.4 cm left adrenal mass, 18 HU', study: 'CT abdomen · 2026-01-28', followUp: 'Adrenal-protocol CT at 6 months', interval: 'interval: 6 months', due: '2026-07-30', late: '26 days late', tone: 'amber', segs: ['done', 'done', 'stalled', 'todo'], note: 'stalled: no-show, not rebooked', risk: 'medium' },
  { name: 'Priya Raman', mrn: 'MRN-204118 · 69F', finding: '3.1 cm infrarenal abdominal aortic aneurysm', study: 'CT abdomen · 2025-08-14', followUp: 'Ultrasound surveillance at 12 months', interval: 'interval: 12 months', due: '2026-08-18', late: '7 days late', tone: 'amber', segs: ['done', 'done', 'todo', 'todo'], note: 'awaiting scheduling', risk: 'medium' },
  { name: 'Susan Okafor', mrn: 'MRN-133870 · 55F', finding: 'Hepatic lesion 1.9 cm — LI-RADS 3, indeterminate', study: 'CT abdomen · 2026-06-02', followUp: 'MRI abdomen with hepatocyte agent', interval: 'interval: 3 months', due: '2026-09-02', late: '8 days out', tone: 'gray', segs: ['done', 'done', 'done', 'todo'], note: 'booked 2026-08-29', risk: 'ontrack' },
  { name: 'Tomas Lindqvist', mrn: 'MRN-166245 · 62M', finding: 'Incidental 1.2 cm pancreatic cystic lesion, side-branch IPMN', study: 'MRI abdomen · 2025-11-14', followUp: 'MRCP surveillance at 12 months', interval: 'interval: 12 months', due: '2026-11-14', late: '81 days out', tone: 'gray', segs: ['done', 'done', 'todo', 'todo'], note: 'on schedule', risk: 'ontrack' },
]
const loopCheck: { label: string; seg: Seg; note: string }[] = [
  { label: 'Reported', seg: 'done', note: '2026-03-12 · signed by radiology, released to chart' },
  { label: 'Ordered', seg: 'stalled', note: 'no order was ever generated' },
  { label: 'Scheduled', seg: 'todo', note: '—' },
  { label: 'Completed', seg: 'todo', note: '—' },
]
const traceSteps = [
  { n: 1, title: 'Read', body: 'Parsed all 9,610 signed reports and their addenda, isolating sentences that create a follow-up obligation rather than merely describing a finding.' },
  { n: 2, title: 'Normalise', body: 'Resolved each recommendation into a modality, an interval and an absolute due date — turning phrasing like "in 3 months" into 2026-06-12.' },
  { n: 3, title: 'Join', body: 'Matched every obligation against the order, scheduling and results feeds to find where the loop actually broke, instead of assuming it closed.' },
  { n: 4, title: 'Rank', body: 'Ordered the open loops by the malignancy risk of the finding class, then by how far past the specified interval they now are.' },
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

  return (
    <div ref={ref} aria-hidden="true" className="relative h-full w-full overflow-hidden">
      <div
        className={`absolute left-[8%] top-[11%] z-10 flex h-[60%] w-[90%] flex-col overflow-hidden rounded-lg border border-[#eaeaea] bg-white transition-all duration-700 ease-out ${
          on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <AppBar org="ACME Health" product="Inpatient Deterioration" avatar={{ initials: 'JT', bg: '#193A29' }} />
        <Title title="Deterioration Alert Agent Dashboard" sub="Review escalating signals, the case against it, and the action bundle." />
        <div className="mx-5 mt-4 flex flex-col gap-1 rounded-md border border-[#a8927c]/30 bg-[#a8927c]/10 p-3">
          <div className="flex items-center justify-between">
            <p className={`${D} font-medium ${G10}`}>Marcus Ferreira · MRN-330914 · 68M · Bed 7W-12</p>
          </div>
          <p className={`${D} flex items-center gap-1 font-medium text-[#79648C]`}>
            <MdErrorOutline size={13} />
            ESCALATION RECOMMENDED — fired 10:31 · unacknowledged for 14 minutes
          </p>
          <p className={`${D} ${G30}`}>POD 2 laparoscopic right hemicolectomy · no known drug allergies · full code</p>
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
            <p className={`${D} ${G30}`}>Serum lactate 4.1 mmol/L and still climbing (sepsis threshold 2.0).</p>
          </div>
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <p className={`${D} font-medium ${G10}`}>3-hour sepsis bundle — clock started 10:31</p>
            {['Blood cultures ×2 drawn before antibiotics', 'Broad-spectrum antibiotics within 1 hour'].map((t) => (
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
        <AppBar org="ACME Health" product="Radiology Safety Net" avatar={{ initials: 'RS', bg: '#273252' }} />
        <p className={`${s.header5} px-5 pt-4 ${G10}`}>Oncology Follow-Up Agent</p>
        <div className="mt-4 grid grid-cols-4 gap-2 px-5">
          {[
            ['OVERDUE AND MALIGNANT-RISK', '66', 'Lung-RADS 4, TI-RADS 4–5, LI-RADS 4+', 'border-[#79648C]/30 bg-[#79648C]/5', 'text-[#79648C]'],
            ['OVERDUE', '172', 'past the interval the report specified', 'border-[#f2f2f2]', 'text-[#A8927C]'],
            ['LOOPS CLOSED', '1,046', 'imaging completed or clinically cancelled', 'border-[#f2f2f2]', G30],
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
          <div className="mx-3 my-2 flex flex-col gap-2 rounded-md border border-[#f2f2f2] bg-[#f2f2f2]/40 p-2.5">
            <div className="flex items-start gap-1.5 rounded border border-[#f2f2f2] bg-white p-2">
              <span className="mt-0.5 h-full w-0.5 shrink-0 rounded-full bg-[#A6353E]" />
              <div className="flex flex-col gap-0.5">
                <p className={`${D} font-medium ${G30}`}>VERBATIM — IMPRESSION, ITEM 3</p>
                <p className={`${D} ${G10}`} style={{ textWrap: 'pretty' }}>
                  New 14 mm solid nodule in the right upper lobe, not present on the 2024 comparison study. Given size and documented interval growth this is Lung-RADS 4A; recommend repeat CT chest in 3 months, with PET-CT or tissue sampling if it persists or enlarges.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded border border-[#f2f2f2] bg-white p-2">
                <p className={`${D} font-medium ${G30}`}>NORMALISED</p>
                <p className={`${D} ${G10}`}>Solid pulmonary nodule · 14 mm · right upper lobe · Lung-RADS 4A</p>
                <p className={`${D} ${G30}`}>SNOMED 427359005 · LOINC 24627-2</p>
              </div>
              <div className="rounded border border-[#f2f2f2] bg-white p-2">
                <p className={`${D} font-medium ${G30}`}>OBLIGATION</p>
                <p className={`${D} ${G10}`}>CT chest without contrast, 3-month interval — due 2026-06-12</p>
                <p className={`${D} ${G30}`}>extracted at 0.94 confidence · human-reviewed 2026-03-13</p>
              </div>
            </div>
            <div className="rounded border border-[#f2f2f2] bg-white p-2">
              <p className={`${D} font-medium ${G30}`}>LOOP CHECK</p>
              <div className="mt-1.5 grid grid-cols-4 gap-2">
                {loopCheck.map((l) => (
                  <div key={l.label} className="flex flex-col gap-1">
                    <div className={`h-1 rounded-sm ${segColor[l.seg]}`} />
                    <p className={`${D} font-medium ${G10}`}>{l.label}</p>
                    <p className={`${D} ${G30}`}>{l.note}</p>
                  </div>
                ))}
              </div>
              <p className={`${D} mt-1.5 ${G10}`} style={{ textWrap: 'pretty' }}>
                The report was signed and filed correctly. Nothing downstream of it happened — no order, no task, no owner. The loop has been open for 74 days.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`${D} rounded-full bg-[#193A29] px-3 py-1.5 font-medium text-white`}>Place the CT order now</span>
              <span className={`${D} rounded-full border border-[#eaeaea] bg-white px-3 py-1.5 font-medium ${G10}`}>Page Dr. L. Menon</span>
              <span className={`${D} rounded-full border border-[#eaeaea] bg-white px-3 py-1.5 font-medium ${G10}`}>Assign to nurse navigator</span>
              <span className={`${D} ${G30}`}>Mark clinically cancelled</span>
            </div>
          </div>
        </div>
        <div className="mx-5 mb-4 mt-3 shrink-0 rounded-md border border-[#79648C]/35 bg-white p-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="size-1.5 shrink-0 rounded-full bg-[#79648C]" />
            <p className={`${D} font-medium text-[#79648C]`}>How the loop was reconstructed</p>
            <p className={`${D} ${G30}`}>run 2026-08-25 06:00 · 9,610 reports · 41s</p>
            <span className={`${D} rounded border border-[#79648C]/30 bg-[#79648C]/10 px-1.5 py-0.5 font-medium text-[#79648C]`}>SGP TRACING</span>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {traceSteps.map((t) => (
              <div key={t.n} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className={`${D} flex size-4 shrink-0 items-center justify-center rounded-full bg-[#79648C]/15 !text-[10px] font-medium text-[#79648C]`}>{t.n}</span>
                  <p className={`${D} font-medium ${G10}`}>{t.title}</p>
                </div>
                <p className={`${D} ${G30}`} style={{ textWrap: 'pretty' }}>
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
