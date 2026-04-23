type RecognizeGroup = {
  title: string
  bullets: string[]
  accent: string
}

const groups: RecognizeGroup[] = [
  {
    title: 'Are you a product manager working full time?',
    bullets: [
      'The manager set a goal to implement AI, but I have no idea what to do.',
      "Everyone around me is vibing like crazy, and I'm being stupid.",
      'Fear of missing out on a unique opportunity to ride the wave of a powerful neural network trend.',
    ],
    accent:
      'radial-gradient(80% 100% at 0% 0%, rgba(3,137,244,0.18) 0%, transparent 60%)',
  },
  {
    title: 'Are you a founder?',
    bullets: [
      'You were told that you can make the first version of a product without any developers at all.',
      'Is it difficult to attract investment, and investors demand traction?',
      'Savings are dwindling — you need to decide: look for a job or try again.',
    ],
    accent:
      'radial-gradient(80% 100% at 100% 0%, rgba(132,52,233,0.20) 0%, transparent 60%)',
  },
  {
    title: 'Want to launch your product while working full time?',
    bullets: [
      'Your colleague launched a product and quit, and you want to do the same?',
      'Are you burned out? Is everyone around you acting crazy and your ideas not being accepted?',
      'Your boss refused to give you a promotion, and you realized that further growth would be difficult.',
    ],
    accent:
      'radial-gradient(80% 100% at 50% 100%, rgba(3,137,244,0.14) 0%, transparent 60%)',
  },
]

export default function RecognizeYourself() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Pain points</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            Do you recognize{' '}
            <span className="text-white/55">yourself?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {groups.map((g) => (
            <article
              key={g.title}
              className="relative rounded-3xl border border-border-mid bg-[#0e0e1a] p-7 md:p-8 overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-90"
                style={{ background: g.accent }}
              />
              <div className="relative flex flex-col h-full">
                <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight mb-6">
                  {g.title}
                </h3>
                <ul className="flex flex-col gap-4">
                  {g.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/80 text-sm md:text-[15px] leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/45 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
