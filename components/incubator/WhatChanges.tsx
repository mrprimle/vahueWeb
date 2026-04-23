const willStop = [
  'Read endless articles about AI and wait for something to happen.',
  'Fear of being left behind by the industry.',
  'Feeling lonely during the neural network revolution.',
  'Stalling for months without progress.',
  'Depend on expensive developers and consultants.',
]

const willStart = [
  'Vibcode like crazy.',
  'Create products 10 times faster with AI.',
  'Be part of a community of people who do the same.',
  'Speak confidently about AI in interviews and meetings.',
  'Test ideas in days, not months.',
  'Have the methodology and tools at hand.',
]

export default function WhatChanges() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Outcomes</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            What will <span className="text-white/55">change?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <article className="rounded-3xl border border-border-soft bg-surface p-7 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border-mid">
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-white">
                You will stop
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {willStop.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-white/70 text-[15px] leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/35 flex-shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>

          <article
            className="relative rounded-3xl border border-border-mid overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                background:
                  'radial-gradient(80% 90% at 100% 0%, rgba(132,52,233,0.18) 0%, rgba(3,137,244,0.10) 45%, transparent 80%)',
              }}
            />
            <div className="relative bg-surface p-7 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-bg">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-white">
                  You will start
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {willStart.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-white/85 text-[15px] leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
