import type { ReactNode } from 'react'

type StageGain = { stage: string; percent: number }

const stageGains: StageGain[] = [
  { stage: 'Planning', percent: 30 },
  { stage: 'Analysis', percent: 50 },
  { stage: 'Design', percent: 30 },
  { stage: 'Implementation', percent: 25 },
  { stage: 'Testing', percent: 45 },
]

type Direction = 'up' | 'down'

type ImpactMetric = {
  value: string
  label: string
  direction: Direction
}

type ImpactGroup = {
  category: string
  items: ImpactMetric[]
}

const breakthroughImpact: ImpactGroup[] = [
  {
    category: 'Experience',
    items: [{ value: '93%', label: 'Satisfaction', direction: 'up' }],
  },
  {
    category: 'Output Quality',
    items: [
      { value: '45%', label: 'Code Review', direction: 'down' },
      { value: '50%', label: 'Acceptance Rate', direction: 'up' },
    ],
  },
  {
    category: 'Delivery Speed',
    items: [
      { value: '35%', label: 'Shorter Discovery', direction: 'down' },
      { value: '40%', label: 'Shorter SDLC', direction: 'down' },
    ],
  },
  {
    category: 'Engineering & Test',
    items: [
      { value: '55%', label: 'Code Refactoring', direction: 'up' },
      { value: '70%', label: 'Unit Testing', direction: 'up' },
    ],
  },
]

function DirectionArrow({ direction }: { direction: Direction }) {
  const isUp = direction === 'up'
  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
        isUp
          ? 'bg-[#b99dff]/15 text-[#b99dff]'
          : 'bg-[#5eead4]/15 text-[#5eead4]'
      }`}
      aria-label={isUp ? 'Increase' : 'Decrease'}
    >
      <svg
        className="w-3 h-3"
        viewBox="0 0 12 12"
        fill="currentColor"
        aria-hidden="true"
      >
        {isUp ? (
          <path d="M6 2L11 9H1z" />
        ) : (
          <path d="M6 10L1 3h10z" />
        )}
      </svg>
    </span>
  )
}

function Card({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="relative rounded-3xl border border-border-soft overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(80% 80% at 0% 0%, rgba(132,52,233,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="relative bg-surface p-7 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-start">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight">
            {label}
          </h3>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function Results() {
  return (
    <section className="bg-bg">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow mb-4">Proof</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
            Results that speak volumes.
            <br />
            <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
              Proof you can measure.
            </span>
          </h2>
          <p className="mt-5 text-white/65 text-base md:text-lg leading-relaxed">
            Vahue AI Hub drives real impact for our clients — delivering
            measurable results, accelerating growth, and transforming the way
            they work.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Stage-Wise Efficiency Gains */}
          <Card label="Stage-Wise Efficiency Gains">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {stageGains.map((s) => (
                <div key={s.stage}>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white/55 mb-2">
                    {s.stage}
                  </p>
                  <p className="font-display text-3xl md:text-4xl font-semibold text-white leading-none mb-4 tracking-tight">
                    {s.percent}%
                  </p>
                  <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#8434e9] to-[#b99dff]"
                      style={{ width: `${s.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Breakthrough Impact */}
          <Card label="Breakthrough Impact">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {breakthroughImpact.map((group) => (
                <div key={group.category}>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white/55 mb-3">
                    {group.category}
                  </p>
                  <div
                    className={
                      group.items.length > 1
                        ? 'grid grid-cols-2 sm:grid-cols-1 gap-3'
                        : 'flex flex-col gap-3'
                    }
                  >
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-border-soft bg-white/[0.02] px-5 py-4 flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="font-display text-2xl md:text-3xl font-semibold text-white leading-none tracking-tight">
                            {item.value}
                          </p>
                          <p className="mt-2 text-white/60 text-[13px] leading-snug">
                            {item.label}
                          </p>
                        </div>
                        <DirectionArrow direction={item.direction} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
