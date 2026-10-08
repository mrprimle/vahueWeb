'use client'

import Reveal, { Eyebrow, useInView } from './Reveal'

const vendors = [
  { name: 'Website agency', y: 60, broken: null },
  { name: 'Chatbot tool', y: 130, broken: 'slow reply' },
  { name: 'Call recording', y: 200, broken: null },
  { name: 'CRM & booking', y: 270, broken: 'retyped data' },
  { name: 'SEO agency', y: 340, broken: 'no follow-up' },
]

const outcomes = [
  { name: 'Every enquiry answered', y: 120 },
  { name: 'Booked into one calendar', y: 200 },
  { name: 'One record per client', y: 280 },
]

const CX = 520
const CY = 200

export default function ContextArc() {
  const { ref, inView } = useInView<HTMLDivElement>('0px 0px -20% 0px')

  return (
    <section className="home-light border-t border-[#e3e6ea] bg-[#f5f6f7] py-24 text-[#17191c] md:py-32">
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <Reveal>
            <Eyebrow>Why the current way breaks</Eyebrow>
            <h2 className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] md:text-5xl">
              Five vendors. Nobody owns the whole path.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-xl text-lg leading-relaxed text-[#4a505a]">
              Each tool does its part. The enquiry still falls between them: the bot can&apos;t book, the booking system
              doesn&apos;t see the conversation, and nobody follows up. We replace the gaps with one system that
              owns the journey from first message to repeat visit.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-14 overflow-x-auto rounded-2xl border border-[#e3e6ea] bg-white p-4 md:p-8">
          <svg viewBox="0 0 1000 400" role="img" aria-label="Five separate vendors converge into one Vahue system" className="min-w-[720px] w-full">
            <g fill="none" strokeWidth="1.25">
              {vendors.map((v, i) => {
                const d = `M226 ${v.y} C 360 ${v.y}, 380 ${CY}, ${CX - 92} ${CY}`
                return (
                  <path
                    key={v.name}
                    d={d}
                    pathLength={1}
                    stroke={v.broken ? '#c9a48a' : '#c3c8cf'}
                    strokeDasharray={v.broken ? '0.012 0.01' : '1'}
                    style={{
                      strokeDashoffset: inView || v.broken ? 0 : 1,
                      transition: `stroke-dashoffset 1200ms cubic-bezier(0.22,1,0.36,1) ${i * 110}ms, opacity 600ms ${i * 110}ms`,
                      opacity: inView ? 1 : 0,
                    }}
                  />
                )
              })}
              {outcomes.map((o, i) => (
                <path
                  key={o.name}
                  d={`M${CX + 92} ${CY} C 650 ${CY}, 660 ${o.y}, 760 ${o.y}`}
                  pathLength={1}
                  stroke="#3b54c5"
                  strokeDasharray="1"
                  style={{
                    strokeDashoffset: inView ? 0 : 1,
                    transition: `stroke-dashoffset 1000ms cubic-bezier(0.22,1,0.36,1) ${700 + i * 120}ms`,
                  }}
                />
              ))}
            </g>

            {vendors.map((v) => (
              <g key={v.name}>
                <rect x="24" y={v.y - 20} width="202" height="40" rx="10" fill="#fff" stroke="#d6dade" />
                <text x="44" y={v.y + 5} fontSize="15" fill="#17191c">
                  {v.name}
                </text>
                {v.broken && (
                  <text x="240" y={v.y - 9} fontSize="12.5" fill="#b4541a">
                    {v.broken}
                  </text>
                )}
              </g>
            ))}

            <g>
              <rect x={CX - 92} y={CY - 44} width="184" height="88" rx="16" fill="#3b54c5" fillOpacity="0.08" stroke="#3b54c5" strokeWidth="1.5" />
              <text x={CX} y={CY - 6} textAnchor="middle" fontSize="16" fontWeight="600" fill="#17191c">
                One Vahue system
              </text>
              <text x={CX} y={CY + 18} textAnchor="middle" fontSize="12.5" fill="#4a505a">
                owned end to end
              </text>
            </g>

            {outcomes.map((o, i) => (
              <g
                key={o.name}
                style={{ opacity: inView ? 1 : 0, transition: `opacity 600ms ease ${1100 + i * 120}ms` }}
              >
                <rect x="760" y={o.y - 20} width="216" height="40" rx="10" fill="#fff" stroke="#3b54c5" strokeOpacity="0.5" />
                <text x="780" y={o.y + 5} fontSize="15" fill="#17191c">
                  {o.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}
