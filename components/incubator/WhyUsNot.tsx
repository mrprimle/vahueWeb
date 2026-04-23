const objections = [
  {
    quote: "I'll watch a video on YouTube",
    answer:
      "There are tons of videos about cursors on YouTube. But you've been watching them for six months now, and nothing has changed. Here, there's an environment that keeps you moving. There's a rhythm and people nearby.",
  },
  {
    quote: "I'll figure it out myself",
    answer:
      'Sure, you can figure it out yourself, but how much time will it take? Neural networks are a super-dynamic environment. We have the latest hacks and tools right now.',
  },
  {
    quote: "I'll hire a consultant",
    answer:
      "A consultant might do it. But it'll cost at least a couple of thousands of dollars, and you'll lose the skills. We offer a methodology, tools, and access to experts at a 100 times lower cost.",
  },
  {
    quote: "I'll buy a course on neural networks",
    answer:
      "You'll complete the course, but afterward, you'll need to put it into practice. Complete it and forget about it. We have a constant stream of relevant content, prompts, and tools.",
  },
]

export default function WhyUsNot() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Alternatives</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            Why us and{' '}
            <span className="text-white/55">not...</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {objections.map((o) => (
            <article
              key={o.quote}
              className="rounded-3xl border border-border-soft bg-surface p-7 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="font-display text-3xl md:text-4xl text-white/35 leading-none">
                  &ldquo;
                </span>
                <p className="text-white text-lg md:text-xl font-semibold leading-snug">
                  {o.quote}
                </p>
              </div>
              <p className="text-white/70 text-sm md:text-[15px] leading-relaxed">
                {o.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
