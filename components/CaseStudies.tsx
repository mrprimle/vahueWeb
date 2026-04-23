const caseStudies = [
  {
    id: 'wealth-management',
    client: 'Wealth Management Company',
    objective:
      'The goal was to integrate AI tools into everyday work across all roles and increase overall productivity.',
    results: [
      { value: '85%', description: 'of employees use AI tools daily in workflows' },
      { value: '70%', description: 'of routine queries resolved via GPT assistant within the first 2 weeks' },
      { value: '5 min', description: 'Average response time reduced from 1 hour to 5 minutes' },
      { value: '52', description: 'ready-to-use prompts created for key scenarios (finance, presale, legal, HR)' },
      { value: '12', description: 'AI agents deployed for quality, sales, finance, and executive dashboards' },
      { value: '100%', description: 'prompts reviewed for data security compliance' },
    ],
    stack:
      'ChatGPT Enterprise, n8n, Cursor, RAGDB (vector database), Power BI + Bloomberg GPT, Miro, Whisper / Coqui',
  },
  {
    id: 'e-commerce',
    client: 'E-Commerce Platform',
    objective:
      'Automate customer support and optimize product recommendation systems using AI.',
    results: [
      { value: '60%', description: 'reduction in customer support tickets' },
      { value: '3x', description: 'increase in product recommendation conversion rate' },
      { value: '24/7', description: 'Automated support coverage with AI chatbot' },
      { value: '8', description: 'custom AI workflows deployed across departments' },
      { value: '40%', description: 'faster content generation for marketing campaigns' },
      { value: '95%', description: 'customer satisfaction score with AI-assisted support' },
    ],
    stack:
      'Anthropic API, LangChain, Pinecone, Next.js, Vercel, PostgreSQL, Redis, NanoClaw',
  },
]

export default function CaseStudies() {
  return (
    <section id="cases" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Case studies</p>
            <h2 className="text-display font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              Where ideas become impact.
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/55 max-w-md">
            Behind every system we ship is a team that moved from uncertainty
            to measurable outcomes. A few recent ones.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {caseStudies.map((cs, idx) => (
            <div
              key={cs.id}
              className="relative rounded-3xl border border-border-soft bg-surface p-7 md:p-10 overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                  background:
                    idx % 2 === 0
                      ? 'radial-gradient(70% 80% at 100% 0%, rgba(3,137,244,0.14) 0%, transparent 65%)'
                      : 'radial-gradient(70% 80% at 0% 100%, rgba(132,52,233,0.14) 0%, transparent 65%)',
                }}
              />
              <div className="relative grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-3">
                    Case {String(idx + 1).padStart(2, '0')} · Client
                  </p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
                    {cs.client}
                  </h3>
                </div>

                <div>
                  <div className="mb-8">
                    <p className="eyebrow mb-3">Objective</p>
                    <p className="text-white/80 text-[15px] md:text-base leading-relaxed">
                      {cs.objective}
                    </p>
                  </div>

                  <div className="mb-8">
                    <p className="eyebrow mb-4">Results</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cs.results.map((result, index) => (
                        <div
                          key={index}
                          className="border-t border-border-mid pt-4"
                        >
                          <p className="text-2xl md:text-3xl font-display font-semibold gradient-text-scale leading-none mb-2">
                            {result.value}
                          </p>
                          <p className="text-white/65 text-sm leading-relaxed">
                            {result.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="eyebrow mb-3">Stack</p>
                    <p className="text-white/65 text-sm leading-relaxed">
                      {cs.stack}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
