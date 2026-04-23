const happening = [
  'AI is changing the way we create products — what used to take months is now done in days.',
  'Those who master AI now will gain an advantage for years to come.',
  'The window of opportunity is open — but it will close when AI becomes the norm for everyone.',
]

const comparison = [
  { now: 'AI skills = competitive advantage', later: 'AI skills = basic requirement' },
  { now: 'Few experts — easy to stand out', later: 'Too many experts — hard to stand out' },
  {
    now: 'Early adopters get clients, positions, opportunities',
    later: 'Latecomers catch up with the rest',
  },
]

const youGet = [
  {
    title: 'For your career',
    body: "you'll become the expert that employers and clients are looking for.",
  },
  {
    title: 'For the product',
    body: 'you will create it 10 times faster than your competitors.',
  },
  {
    title: 'For yourself',
    body: "don't be left behind while the world changes.",
  },
]

export default function NeuralChange() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white max-w-4xl mb-14 md:mb-20">
          Neural networks are changing everything.{' '}
          <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
            Right now.
          </span>
        </h2>

        {/* What's happening */}
        <div className="mb-14 md:mb-20">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-7">
            What&apos;s happening
          </h3>
          <ul className="flex flex-col gap-4 max-w-4xl">
            {happening.map((line) => (
              <li
                key={line}
                className="text-white/75 text-[15px] md:text-base leading-relaxed"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* Why it's important to act now — table */}
        <div className="mb-14 md:mb-20">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-7">
            Why it&apos;s important to act now
          </h3>

          <div className="rounded-2xl border border-border-soft overflow-hidden">
            <div className="grid grid-cols-2 bg-white/[0.04] border-b border-border-soft">
              <div className="px-5 md:px-7 py-4 font-mono text-[11px] uppercase tracking-widest text-white/55">
                Now
              </div>
              <div className="px-5 md:px-7 py-4 font-mono text-[11px] uppercase tracking-widest text-white/55 border-l border-border-soft">
                In 2–3 years
              </div>
            </div>
            <div className="divide-y divide-border-soft">
              {comparison.map((row) => (
                <div key={row.now} className="grid grid-cols-2">
                  <p className="px-5 md:px-7 py-5 text-white/85 text-sm md:text-[15px] leading-relaxed">
                    {row.now}
                  </p>
                  <p className="px-5 md:px-7 py-5 text-white/60 text-sm md:text-[15px] leading-relaxed border-l border-border-soft">
                    {row.later}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What you get in Vahue Incubator */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-7">
            What you get in Vahue Incubator
          </h3>
          <ul className="flex flex-col gap-4 max-w-4xl">
            {youGet.map((item) => (
              <li
                key={item.title}
                className="text-[15px] md:text-base leading-relaxed"
              >
                <span className="font-semibold text-white">{item.title}</span>
                <span className="text-white/55"> — </span>
                <span className="text-white/75">{item.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
