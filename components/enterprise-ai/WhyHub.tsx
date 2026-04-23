type Reason = {
  number: string
  title: string
  body: string
}

const reasons: Reason[] = [
  {
    number: '01',
    title: 'Flexible and future-proof architecture',
    body: 'All agents are technology-agnostic — capable of adopting your preferred LLMs and evolving with the fast-changing market.',
  },
  {
    number: '02',
    title: 'Data privacy and security',
    body: 'Agents are deployed directly into your environment, giving you full control over your data and your security posture.',
  },
  {
    number: '03',
    title: 'Built for your organization, owned by you',
    body: 'You own the code and have complete freedom to customize and optimize it to meet your organization\u2019s unique needs.',
  },
  {
    number: '04',
    title: 'Faster, smarter product development end-to-end — not just faster code generation',
    body: 'AI Hub addresses bottlenecks and accelerates delivery across the entire PDLC, not only the IDE.',
  },
]

export default function WhyHub() {
  return (
    <section className="relative bg-bg py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start mb-12 md:mb-16">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">Why Vahue AI Hub</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
              A platform built to{' '}
              <span className="text-white/55">ship, not to demo.</span>
            </h2>
            <p className="text-white/65 text-base md:text-lg leading-relaxed mt-6 max-w-md">
              Most enterprise AI platforms hand you a toolbox. Vahue AI Hub
              hands you a runway — and runs alongside your team until your
              first features land in production.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {reasons.map((r) => (
              <article
                key={r.number}
                className="group relative rounded-3xl border border-border-soft bg-surface p-6 md:p-7 overflow-hidden h-full"
              >
                <div
                  className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full opacity-25 blur-3xl pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(132,52,233,0.55) 0%, rgba(3,137,244,0.35) 60%, transparent 80%)',
                  }}
                />
                <div className="relative">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-5">
                    {r.number}
                  </p>
                  <h3 className="text-white text-lg md:text-xl font-semibold leading-snug mb-3">
                    {r.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {r.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
