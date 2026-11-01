'use client'

// Scale module 453596. Strings come from content; timers and classes are Scale's.
import { useEffect, useRef, useState } from 'react'
import { Icon } from './icons'
import type { OrderGuidanceData } from './types'

const reveal = (on: boolean) => `transition-all duration-500 ease-out ${on ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`

export function OrderGuidanceMockup({ data: d }: { data: OrderGuidanceData }) {
  const total = d.sources.length + 5
  const root = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(total)
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let interval: ReturnType<typeof setInterval> | null = null
    let pause: ReturnType<typeof setTimeout> | null = null
    const run = () => {
      let n = 0
      setStep(0)
      interval = setInterval(() => {
        setStep((n += 1))
        if (n >= total) {
          if (interval) clearInterval(interval)
          pause = setTimeout(run, 3200)
        }
      }, 450)
    }
    const stop = () => {
      if (interval) clearInterval(interval)
      if (pause) clearTimeout(pause)
      interval = null
      pause = null
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? run() : stop()), { threshold: 0.3 })
    io.observe(el)
    return () => {
      stop()
      io.disconnect()
    }
  }, [total])
  const loaded = Math.min(step, d.sources.length)
  const field = Math.max(0, step - d.sources.length)
  return (
    <div ref={root} className="OrderGuidanceMockup relative flex h-full w-full flex-col overflow-hidden bg-white text-left" aria-hidden="true">
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
      <div className="mx-5 mt-4 flex flex-col gap-2 rounded-lg border border-scale-gray-95 p-3">
        <p className="detail-regular font-medium text-scale-gray-10">{d.person}</p>
        <p className="detail-regular text-scale-gray-30">{d.personMeta}</p>
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="detail-regular font-medium text-scale-gray-10">{d.system}</span>
          {d.sources.map(({ key, label, icon }, i) => {
            const on = i < loaded
            return (
              <span key={key} className={`detail-regular flex items-center gap-1 rounded border px-1.5 py-0.5 transition-colors duration-400 ease-out ${on ? 'border-[#193A29]/30 bg-[#193A29]/5 text-[#193A29]' : 'border-scale-gray-90 text-scale-gray-30'}`}>
                {on ? <Icon name="check" size={11} aria-hidden /> : <Icon name={icon} size={11} aria-hidden />}
                {label}
                {on ? null : <Icon name="lock" size={9} aria-hidden />}
              </span>
            )
          })}
        </div>
      </div>
      <div className="mx-5 mt-3 flex flex-1 flex-col gap-2 overflow-hidden rounded-lg border border-scale-gray-95">
        <div className="flex items-center justify-between border-b border-scale-gray-95 p-3">
          <span className="detail-regular flex items-center gap-1.5 font-medium text-scale-gray-10">
            <Icon name="referral" size={13} aria-hidden />
            {d.recordLabel}
          </span>
          <span className="detail-mono text-scale-gray-30">{d.recordId}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 px-3">
          <div className={reveal(field > 0)}>
            <p className="detail-regular text-scale-gray-30">{d.fields.first[0]}</p>
            <p className="detail-regular font-medium text-scale-gray-10">{d.fields.first[1]}</p>
          </div>
          <div className={reveal(field > 1)}>
            <p className="detail-regular text-scale-gray-30">{d.fields.second[0]}</p>
            <p className="detail-regular font-medium text-scale-gray-10">{d.fields.second[1]}</p>
          </div>
        </div>
        <div className={`px-3 ${reveal(field > 2)}`}>
          <p className="detail-regular text-scale-gray-30">{d.fields.window[0]}</p>
          <p className="detail-regular text-scale-gray-10">{d.fields.window[1]}</p>
        </div>
        <div className={`overflow-hidden px-3 ${reveal(field > 3)}`}>
          <p className="detail-regular text-scale-gray-30">{d.fields.indication[0]}</p>
          <p className="detail-regular text-pretty text-scale-gray-30">{d.fields.indication[1]}</p>
        </div>
        <div className={`overflow-hidden px-3 pb-3 ${reveal(field > 4)}`}>
          <p className="detail-regular text-scale-gray-30">{d.fields.codes[0]}</p>
          <p className="detail-regular text-pretty text-scale-gray-30">{d.fields.codes[1]}</p>
        </div>
      </div>
    </div>
  )
}
