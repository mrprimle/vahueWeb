'use client'

// Scale module 69472. Strings come from content; the reveal and classes are Scale's.
import { useEffect, useRef, useState } from 'react'
import { Icon } from './icons'
import type { CustomAgentsData } from './types'

const ROW = 'grid grid-cols-[1.2fr_1.6fr_1.1fr_0.7fr_0.9fr_0.6fr] gap-2'
const SEGMENT = { done: 'bg-[#33845C]', stalled: 'bg-[#A6353E]', todo: 'bg-scale-gray-90' }
const TONE = { red: 'text-[#A6353E]', amber: 'text-[#C07C1A]', gray: 'text-scale-gray-30' }
const RISK = { high: 'bg-[#A6353E]/10 text-[#A6353E]', medium: 'bg-[#C07C1A]/10 text-[#C07C1A]', ontrack: 'bg-[#33845C]/10 text-[#33845C]' }
const STAT_LABEL = ['text-[#79648C]', 'text-[#A8927C]', 'text-scale-gray-30', 'text-scale-gray-30']
const STAT_BOX = ['border-[#79648C]/30 bg-[#79648C]/5', 'border-scale-gray-95', 'border-scale-gray-95', 'border-scale-gray-95']

function Segments({ segments }: { segments: ('done' | 'stalled' | 'todo')[] }) {
  return (
    <div className="flex h-1 gap-0.5">
      {segments.map((s, i) => (
        <div key={i} className={`h-full flex-1 rounded-sm ${SEGMENT[s]}`} />
      ))}
    </div>
  )
}

export function CustomAgentsMockup({ data }: { data: CustomAgentsData }) {
  const { alert: a, followUp: f } = data
  const root = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={root} className="CustomAgentsMockup relative h-full w-full overflow-hidden" aria-hidden="true">
      <div className={`absolute left-[8%] top-[11%] z-10 flex h-[60%] w-[90%] flex-col overflow-hidden rounded-lg border border-scale-gray-90 bg-white transition-all duration-700 ease-out ${shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
        <div className="flex items-center gap-3 border-b border-scale-gray-95 px-5 py-3">
          <span className="flex size-5 items-center justify-center rounded bg-scale-gray-10 text-[10px] font-medium text-white">A</span>
          <span className="detail-regular font-medium text-scale-gray-10">{a.brand}</span>
          <span className="h-3 w-px bg-scale-gray-90" />
          <span className="detail-regular text-scale-gray-30">{a.suite}</span>
          <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-[#193A29] text-[9px] font-medium text-white">{a.initials}</span>
        </div>
        <div className="flex flex-col gap-1 px-5 pt-4">
          <p className="header5-regular text-scale-gray-10">{a.title}</p>
          <p className="detail-regular text-scale-gray-30">{a.subtitle}</p>
        </div>
        <div className="mx-5 mt-4 flex flex-col gap-1 rounded-md border border-[#a8927c]/30 bg-[#a8927c]/10 p-3">
          <div className="flex items-center justify-between">
            <p className="detail-regular font-medium text-scale-gray-10">{a.person}</p>
          </div>
          <p className="detail-regular flex items-center gap-1 font-medium text-[#79648C]">
            <Icon name="alert" size={13} aria-hidden />
            {a.status}
          </p>
          <p className="detail-regular text-scale-gray-30">{a.note}</p>
        </div>
        <div className="mt-4 grid flex-1 grid-cols-2 gap-3 overflow-hidden px-5 pb-5">
          <div className="flex flex-col gap-2 overflow-hidden">
            <p className="detail-regular font-medium text-scale-gray-10">{a.matrixTitle}</p>
            <div className="flex items-end gap-2 border-b border-scale-gray-95 pb-1">
              {a.bars.map((b) => (
                <div key={b.time} className="flex flex-1 flex-col items-center gap-1">
                  <span className="detail-regular text-scale-gray-30">{b.value}</span>
                  <div className={`w-full rounded-t ${b.value >= 4 ? 'bg-[#79648C]' : 'bg-scale-gray-90'}`} style={{ height: `${12 * b.value}px` }} />
                  <span className="detail-regular text-scale-gray-30">{b.time}</span>
                </div>
              ))}
            </div>
            <p className="detail-regular text-scale-gray-30">{a.barNote}</p>
          </div>
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <p className="detail-regular font-medium text-scale-gray-10">{a.bundleTitle}</p>
            {a.bundle.map((line) => (
              <p key={line} className="detail-regular flex items-center gap-1.5 text-scale-gray-30">
                <Icon name="check" size={12} className="text-[#193A29]" aria-hidden />
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={`absolute left-[40%] top-[38%] z-20 flex h-[60%] w-[90%] flex-col overflow-hidden rounded-lg border border-scale-gray-90 bg-white transition-all delay-150 duration-700 ease-out ${shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="flex items-center gap-3 border-b border-scale-gray-95 px-5 py-3">
          <span className="flex size-5 items-center justify-center rounded bg-scale-gray-10 text-[10px] font-medium text-white">A</span>
          <span className="detail-regular font-medium text-scale-gray-10">{f.brand}</span>
          <span className="h-3 w-px bg-scale-gray-90" />
          <span className="detail-regular text-scale-gray-30">{f.suite}</span>
          <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-[#273252] text-[9px] font-medium text-white">{f.initials}</span>
        </div>
        <p className="header5-regular px-5 pt-4 text-scale-gray-10">{f.title}</p>
        <div className="mt-4 grid grid-cols-4 gap-2 px-5">
          {f.stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col rounded-md border p-2 ${STAT_BOX[i]}`}>
              <span className={`detail-regular font-medium ${STAT_LABEL[i]}`}>{s.label}</span>
              <span className="header5-regular text-scale-gray-10">{s.value}</span>
              <span className="detail-regular text-scale-gray-30">{s.note}</span>
            </div>
          ))}
        </div>
        <div className="mx-5 mt-4 shrink-0 overflow-hidden rounded-md border border-scale-gray-95">
          <div className={`${ROW} border-b border-scale-gray-95 bg-scale-gray-95/40 px-3 py-1.5`}>
            {f.columns.map((c) => (
              <span key={c} className="detail-regular text-scale-gray-30">
                {c}
              </span>
            ))}
          </div>
          {f.rows.map((r) => (
            <div key={r.id} className={`${ROW} border-b border-scale-gray-95 px-3 py-2 last:border-b-0`}>
              <div>
                <p className="detail-regular font-medium text-scale-gray-10">{r.name}</p>
                <p className="detail-regular text-scale-gray-30">{r.id}</p>
              </div>
              <div>
                <p className="detail-regular text-scale-gray-10">{r.finding}</p>
                <p className="detail-regular text-scale-gray-30">{r.study}</p>
              </div>
              <div>
                <p className="detail-regular text-scale-gray-10">{r.followUp}</p>
                <p className="detail-regular text-scale-gray-30">{r.interval}</p>
              </div>
              <div>
                <p className="detail-regular text-scale-gray-10">{r.due}</p>
                <p className={`detail-regular ${TONE[r.latenessTone]}`}>{r.lateness}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Segments segments={r.segments} />
                <p className="detail-regular text-scale-gray-30">{r.statusNote}</p>
              </div>
              <div>
                <span className={`detail-regular rounded-full px-1.5 py-0.5 font-medium ${RISK[r.risk]}`}>{f.riskLabels[r.risk]}</span>
              </div>
            </div>
          ))}
          <div className="mx-3 my-2 flex flex-col gap-2 rounded-md border border-scale-gray-95 bg-scale-gray-95/40 p-2.5">
            <div className="flex items-start gap-1.5 rounded border border-scale-gray-95 bg-white p-2">
              <span className="mt-0.5 h-full w-0.5 shrink-0 rounded-full bg-[#A6353E]" />
              <div className="flex flex-col gap-0.5">
                <p className="detail-regular font-medium text-scale-gray-30">{f.verbatimLabel}</p>
                <p className="detail-regular text-pretty text-scale-gray-10">{f.verbatim}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded border border-scale-gray-95 bg-white p-2">
                <p className="detail-regular font-medium text-scale-gray-30">{f.normalisedLabel}</p>
                <p className="detail-regular text-scale-gray-10">{f.normalised}</p>
                <p className="detail-regular text-scale-gray-30">{f.normalisedCodes}</p>
              </div>
              <div className="rounded border border-scale-gray-95 bg-white p-2">
                <p className="detail-regular font-medium text-scale-gray-30">{f.obligationLabel}</p>
                <p className="detail-regular text-scale-gray-10">{f.obligation}</p>
                <p className="detail-regular text-scale-gray-30">{f.obligationNote}</p>
              </div>
            </div>
            <div className="rounded border border-scale-gray-95 bg-white p-2">
              <p className="detail-regular font-medium text-scale-gray-30">{f.loopLabel}</p>
              <div className="mt-1.5 grid grid-cols-4 gap-2">
                {f.loop.map((l) => (
                  <div key={l.label} className="flex flex-col gap-1">
                    <div className={`h-1 rounded-sm ${SEGMENT[l.segment]}`} />
                    <p className="detail-regular font-medium text-scale-gray-10">{l.label}</p>
                    <p className="detail-regular text-scale-gray-30">{l.note}</p>
                  </div>
                ))}
              </div>
              <p className="detail-regular mt-1.5 text-pretty text-scale-gray-10">{f.loopNote}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" tabIndex={-1} className="detail-regular rounded-full bg-[#193A29] px-3 py-1.5 font-medium text-white">
                {f.actions[0]}
              </button>
              <button type="button" tabIndex={-1} className="detail-regular rounded-full border border-scale-gray-90 bg-white px-3 py-1.5 font-medium text-scale-gray-10">
                {f.actions[1]}
              </button>
              <button type="button" tabIndex={-1} className="detail-regular rounded-full border border-scale-gray-90 bg-white px-3 py-1.5 font-medium text-scale-gray-10">
                {f.actions[2]}
              </button>
              <span className="detail-regular text-scale-gray-30">{f.actions[3]}</span>
            </div>
          </div>
        </div>
        <div className="mx-5 mb-4 mt-3 shrink-0 rounded-md border border-[#79648C]/35 bg-white p-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="size-1.5 shrink-0 rounded-full bg-[#79648C]" />
            <p className="detail-regular font-medium text-[#79648C]">{f.traceTitle}</p>
            <p className="detail-regular text-scale-gray-30">{f.traceMeta}</p>
            <span className="detail-regular rounded border border-[#79648C]/30 bg-[#79648C]/10 px-1.5 py-0.5 font-medium text-[#79648C]">{f.traceBadge}</span>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {f.trace.map((t) => (
              <div key={t.n} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="detail-regular flex size-4 shrink-0 items-center justify-center rounded-full bg-[#79648C]/15 text-[10px] font-medium text-[#79648C]">{t.n}</span>
                  <p className="detail-regular font-medium text-scale-gray-10">{t.title}</p>
                </div>
                <p className="detail-regular text-pretty text-scale-gray-30">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
