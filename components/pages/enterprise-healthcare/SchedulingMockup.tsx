'use client'

// Scale module 218184. Strings come from content; timers and classes are Scale's.
import { useEffect, useRef, useState } from 'react'
import { Icon } from './icons'
import type { SchedulingData } from './types'

export function SchedulingMockup({ data: d }: { data: SchedulingData }) {
  const root = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(true)
  const count = d.recommendations.length
  const rec = d.recommendations[index]
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let interval: ReturnType<typeof setInterval> | null = null
    let swap: ReturnType<typeof setTimeout> | null = null
    const stop = () => {
      if (interval) clearInterval(interval)
      interval = null
      if (swap) clearTimeout(swap)
      swap = null
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return stop()
        if (interval) return
        interval = setInterval(() => {
          setShown(false)
          swap = setTimeout(() => {
            setIndex((i) => (i + 1) % count)
            setShown(true)
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
  }, [count])
  const fade = `transition-all duration-300 ease-out ${shown ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`
  return (
    <div ref={root} className="SchedulingEngineMockup relative flex h-full w-full flex-col overflow-hidden bg-white text-left" aria-hidden="true">
      <div className="flex items-center gap-3 border-b border-scale-gray-95 px-5 py-3">
        <span className="flex size-5 items-center justify-center rounded bg-scale-gray-10 text-[10px] font-medium text-white">A</span>
        <span className="detail-regular font-medium text-scale-gray-10">{d.brand}</span>
        <span className="h-3 w-px bg-scale-gray-90" />
        <span className="detail-regular text-scale-gray-30">{d.suite}</span>
      </div>
      <div className="flex flex-col gap-1 px-5 pt-4">
        <p className="header5-regular text-scale-gray-10">{d.title}</p>
        <p className="detail-regular text-scale-gray-30">{d.subtitle}</p>
      </div>
      <p className="detail-regular px-5 pt-3 text-scale-gray-30">{d.person}</p>
      <div className="mt-4 grid flex-1 grid-cols-1 gap-3 overflow-hidden px-5 pb-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className={`${fade} flex flex-col gap-3 rounded-lg border border-scale-gray-95 p-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#79648C]">
              <Icon name="spark" size={14} aria-hidden />
              <span className="detail-regular font-medium text-scale-gray-10">{d.recommendationLabel}</span>
            </div>
            <span className="detail-regular rounded bg-scale-gray-95 px-2 py-0.5 text-[10px] font-medium text-scale-gray-30">{d.agentBadge}</span>
          </div>
          <div className="rounded-md border border-scale-gray-95 p-3">
            <div className="flex items-center justify-between">
              <span className="detail-regular font-medium text-scale-gray-10">
                {d.dayNames[rec.day]}, {d.yearPrefix}
                {rec.date.replace('7/', '07-')}
              </span>
              <span className="detail-regular font-medium text-[#193A29]">{rec.time}</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-scale-gray-10">
              <Icon name="person" size={13} aria-hidden />
              <span className="detail-regular font-medium">{rec.clinician}</span>
            </div>
            <p className="detail-regular pl-[19px] text-scale-gray-30">{rec.specialty}</p>
            <div className="mt-2 flex items-center justify-between text-scale-gray-30">
              <span className="detail-regular flex items-center gap-1.5">
                <Icon name="room" size={13} aria-hidden />
                {rec.room}
              </span>
              <span className="detail-regular flex items-center gap-1.5">
                <Icon name="clock" size={13} aria-hidden />
                {rec.duration}
              </span>
            </div>
          </div>
          <p className="detail-regular text-pretty text-scale-gray-30">{rec.description}</p>
          <button type="button" tabIndex={-1} className="detail-regular flex items-center justify-center gap-2 rounded-full bg-[#193A29] py-2.5 font-medium text-white">
            <Icon name="check" size={14} aria-hidden />
            {d.bookLabel}
          </button>
          <div className="flex flex-1 flex-col gap-2 overflow-hidden rounded-md border border-scale-gray-95">
            <div className="flex items-center justify-between border-b border-scale-gray-95 p-2.5">
              <div className="flex items-center gap-2 text-[#79648C]">
                <Icon name="merge" size={14} aria-hidden />
                <span className="detail-regular font-medium text-scale-gray-10">{d.recommenderLabel}</span>
                <span className="detail-regular text-scale-gray-30">{d.stepsCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="detail-regular rounded bg-scale-gray-95 px-2 py-0.5 text-[10px] font-medium text-scale-gray-30">{d.tracingBadge}</span>
                <Icon name="chevron" size={14} className="text-scale-gray-30" aria-hidden />
              </div>
            </div>
            <div className={`${fade} flex items-start gap-2 px-2.5 pb-2.5`}>
              <span className="detail-regular flex size-4 shrink-0 items-center justify-center rounded-full bg-scale-gray-95 text-[10px] font-medium text-scale-gray-10">1</span>
              <p className="detail-regular text-pretty text-scale-gray-30">
                <span className="font-medium text-scale-gray-10">{d.stepPrefix}</span>
                {rec.step}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
          <p className="detail-regular font-medium text-scale-gray-10">{d.calendarTitle}</p>
          <p className="detail-regular text-scale-gray-30">{d.calendarHint}</p>
          <div className="grid flex-1 grid-cols-4 gap-1.5 overflow-hidden">
            {d.days.map(({ key, label, slots }) => (
              <div key={key} className={`flex flex-col gap-1 rounded-md transition-colors duration-500 ease-out ${key === rec.day ? 'bg-scale-gray-95' : ''}`}>
                <div className="detail-regular flex flex-col items-center py-1 font-medium text-scale-gray-10">
                  <span>{key}</span>
                  <span>{label}</span>
                </div>
                {slots.map((slot) => {
                  const picked = key === rec.day && slot.time === rec.time && !slot.occupied
                  return (
                    <div key={slot.time} className={`rounded-md border p-1.5 transition-colors duration-500 ease-out ${picked ? 'border-[#193A29] bg-[#193A29] text-white' : slot.occupied ? 'border-transparent text-scale-gray-60 opacity-50' : 'border-scale-gray-95 text-scale-gray-10'}`}>
                      <div className="flex items-center justify-between">
                        <span className="detail-regular font-medium">{slot.time}</span>
                        {picked ? <Icon name="spark" size={11} aria-hidden /> : null}
                      </div>
                      <p className="detail-regular truncate opacity-80">{slot.clinician}</p>
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
