type Persona = {
  number: string
  question: string
  quote: string
  outcome: string
}

const personas: Persona[] = [
  {
    number: '01',
    question:
      'Are you a product designer and want to master neural networks for product creation?',
    quote:
      'AI is changing the way product managers work. My colleagues are already using cursors for data analysis and prototyping, but I\'m still learning. There are so many courses, articles, and tools — I don\'t know where to start.',
    outcome:
      "You'll systematically master AI for product work — you'll have the tools, case studies, and environment to keep up with the industry and strengthen your career.",
  },
  {
    number: '02',
    question:
      'Are you a founder who wants to test hypotheses quickly and cheaply?',
    quote:
      "I've failed at several startups. I've wasted money and years of my life. Now I have a new idea, but I'm afraid of repeating my past mistakes. My loved ones no longer believe in my startups.",
    outcome:
      'Have a systematic methodology, tools, and environment for streamlined product launches — test hypotheses quickly and avoid being left alone.',
  },
  {
    number: '03',
    question:
      'Do you want your own product while continuing to work full time?',
    quote:
      "I work 40–50 hours a week. I'm exhausted in the evenings. I'm burned out. I've been dreaming of creating my own product for three years now, but I don't have any developer friends I could work with.",
    outcome:
      'Develop a product with neural networks in parallel with your work — have a rhythm, methodology, and support environment to achieve results without burnout.',
  },
]

const alsoFor = [
  {
    title: 'Business owners',
    body: 'Automate your processes at 10 times less cost.',
  },
  {
    title: 'Consultants',
    body: 'Master neural networks and implement them in consulting.',
  },
  {
    title: 'Corporate innovators',
    body: 'Gather AI implementation cases and demonstrate quick wins to management.',
  },
  {
    title: 'Digital marketers',
    body: 'Learn to test growth hypotheses and create funnels without development.',
  },
]

export default function CommunityFor() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Audience</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            Who is this community{' '}
            <span className="text-white/55">for?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {personas.map((p) => (
            <article
              key={p.number}
              className="relative rounded-3xl border border-border-soft bg-surface p-7 md:p-8 flex flex-col"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-6">
                {p.number}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight mb-6">
                {p.question}
              </h3>

              <blockquote className="relative pl-5 border-l-2 border-white/15 mb-6">
                <p className="text-white/65 text-[14px] md:text-[15px] italic leading-relaxed">
                  “{p.quote}”
                </p>
              </blockquote>

              <div className="mt-auto pt-4 border-t border-border-soft">
                <p className="eyebrow mb-2">What tasks will you solve</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  {p.outcome}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <div className="rounded-3xl border border-border-soft bg-surface p-7 md:p-10 lg:p-12">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-8 md:mb-10">
              Also for whom might it be valuable
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-6 md:gap-y-7">
              {alsoFor.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 text-[15px] md:text-base leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/55 flex-shrink-0" />
                  <p className="text-white/75">
                    <span className="font-semibold text-white">
                      {item.title}
                    </span>
                    <span className="text-white/55"> — </span>
                    <span>{item.body}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
