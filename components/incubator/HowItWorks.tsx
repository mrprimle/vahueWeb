const steps = [
  {
    number: '01',
    title: 'Join the community',
    body: 'Pay for a subscription and gain access to tools, a knowledge base, and chat.',
  },
  {
    number: '02',
    title: 'Connect to the rhythm',
    body: 'Weekly events with practitioners. Q&A with Mike twice a month. Chat with like-minded people.',
  },
  {
    number: '03',
    title: 'Apply it to your tasks',
    body: 'Use Vahue Pilot for your product or work tasks. Get feedback from the community.',
  },
  {
    number: '04',
    title: 'See the result',
    body: 'You create faster. You understand how to apply AI specifically. You keep up with the industry.',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Process</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            How does this <span className="text-white/55">work</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <article
              key={s.number}
              className="rounded-3xl border border-border-soft bg-surface p-6 md:p-7 flex flex-col h-full"
            >
              <p className="font-display text-3xl md:text-4xl font-semibold gradient-text-scale mb-6 leading-none">
                {s.number}
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-tight">
                {s.title}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
