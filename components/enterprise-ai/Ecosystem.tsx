import type { SVGProps } from 'react'

const stats = [
  { value: '150+', label: 'Models supported' },
  { value: '25+', label: 'Providers supported' },
  { value: '15+', label: 'Unique endpoints' },
  { value: '180+', label: 'Provider-endpoint combinations' },
]

export default function Ecosystem() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="relative rounded-3xl border border-border-mid overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(120% 120% at 100% 100%, rgba(132,52,233,0.16) 0%, transparent 60%)',
            }}
          />
          <div className="absolute inset-0 hero-texture opacity-40 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center p-7 md:p-12 lg:p-16">
            {/* Thread-circle ring + center copy */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(132,52,233,0.35) 0%, rgba(3,137,244,0.18) 55%, transparent 80%)',
                  }}
                />
                <ThreadCircles className="absolute inset-0 w-full h-full text-white/45" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-10">
                  <div>
                    <p className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight">
                      A proven AI ecosystem at scale
                    </p>
                    <p className="text-white/65 text-[13px] md:text-sm leading-relaxed mt-3">
                      Vahue AI Hub supports a broad and continuously expanding
                      AI ecosystem across models, providers, and endpoints.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 md:gap-y-10 gap-x-8 md:gap-x-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-5xl md:text-6xl font-semibold text-white leading-none tracking-tight">
                    {s.value}
                  </p>
                  <div className="hairline mt-4 mb-3 max-w-[220px]" />
                  <p className="text-white/65 text-sm md:text-base">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 3 thin "thread" rings — slightly imperfect, hand-drawn feel */
function ThreadCircles(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M100 18
           C 152 14, 184 56, 182 100
           C 184 148, 148 184, 100 182
           C 50 184, 14 146, 18 100
           C 16 54, 50 22, 100 18 Z"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
      <path
        d="M100 26
           C 146 22, 178 60, 174 102
           C 176 146, 144 174, 100 176
           C 56 178, 24 144, 26 100
           C 22 58, 56 26, 100 26 Z"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.45"
        fill="none"
        transform="rotate(-7 100 100)"
      />
      <path
        d="M100 12
           C 156 10, 190 50, 188 100
           C 192 152, 152 190, 100 188
           C 46 192, 8 152, 12 100
           C 10 48, 48 12, 100 12 Z"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.35"
        fill="none"
        transform="rotate(11 100 100)"
      />
    </svg>
  )
}
