const leftProblem = {
  title: 'AI skill gap',
  description: "You can't keep up with updates, use cases, and risks anymore. There's more context than attention. Every new tool widens the gap between where you are and where you could be.",
}

const rightProblems = [
  {
    title: 'Hiring takes forever',
    description: "When you need niche expertise for a 6-month project, you don't spend 4 months recruiting, onboarding, and hoping they work out. You bring in specialists who deliver from day one.",
  },
  {
    title: 'Scaling the team up and down is a nightmare',
    description: "When a new feature needs to ship fast, you don't overload your core team until they burn out. You augment strategically to keep velocity without sacrificing quality.",
  },
  {
    title: 'Delivery speed is killing your time-to-market',
    description: "When you spot a market opportunity, you don't let it pass because \"we don't have the headcount.\" You move fast with the right augmented expertise.",
  },
  {
    title: 'Fake developers',
    description: "Fake CVs, AI-assisted interviews, multiple jobs, ghost workers. You can't afford another \"senior\" who disappears when it's time to deliver. It's not about more people — it's about the right people.",
  },
]

export default function Problems() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-[#fafafa]">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        {/* Desktop layout: 2 rows */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {/* Row 1: Title + 2 cards */}
          <div className="flex items-start pt-4 pl-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] leading-relaxed tracking-tight">
              Aren&apos;t these tech talent and software outsourcing challenges <span className="gradient-text-animated">familiar?</span>
            </h2>
          </div>
          {rightProblems.slice(0, 2).map((problem, index) => (
            <div
              key={index}
              className="group border border-[#F4F5F6] rounded-[32px] p-3 bg-[#F4F5F680]"
            >
              <div className="bg-white rounded-[24px] p-6 h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg md:text-xl font-semibold text-[#1d1d1f] mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-[#86868b] text-[15px] md:text-base leading-relaxed font-normal">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}

          {/* Row 2: Left card + 2 more cards */}
          <div className="group border border-[#F4F5F6] rounded-[32px] p-3 bg-[#F4F5F680]">
            <div className="bg-white rounded-[24px] p-6 h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
              <h3 className="text-lg md:text-xl font-semibold text-[#1d1d1f] mb-3 leading-snug">
                {leftProblem.title}
              </h3>
              <p className="text-[#86868b] text-[15px] md:text-base leading-relaxed font-normal">
                {leftProblem.description}
              </p>
            </div>
          </div>
          {rightProblems.slice(2, 4).map((problem, index) => (
            <div
              key={index + 2}
              className="group border border-[#F4F5F6] rounded-[32px] p-3 bg-[#F4F5F680]"
            >
              <div className="bg-white rounded-[24px] p-6 h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg md:text-xl font-semibold text-[#1d1d1f] mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-[#86868b] text-[15px] md:text-base leading-relaxed font-normal">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet layout */}
        <div className="lg:hidden">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] leading-relaxed tracking-tight mb-8">
            Aren&apos;t these tech talent and software outsourcing challenges <span className="gradient-text-animated">familiar?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rightProblems.map((problem, index) => (
              <div
                key={index}
                className="group border border-[#F4F5F6] rounded-[32px] p-3 bg-[#F4F5F680]"
              >
                <div className="bg-white rounded-[24px] p-6 h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
                  <h3 className="text-lg md:text-xl font-semibold text-[#1d1d1f] mb-3 leading-snug">
                    {problem.title}
                  </h3>
                  <p className="text-[#86868b] text-[15px] md:text-base leading-relaxed font-normal">
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="group border border-[#F4F5F6] rounded-[32px] p-3 bg-[#F4F5F680]">
              <div className="bg-white rounded-[24px] p-6 h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg md:text-xl font-semibold text-[#1d1d1f] mb-3 leading-snug">
                  {leftProblem.title}
                </h3>
                <p className="text-[#86868b] text-[15px] md:text-base leading-relaxed font-normal">
                  {leftProblem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
