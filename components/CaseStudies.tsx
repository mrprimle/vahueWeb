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
      'OpenAI API, LangChain, Pinecone, Next.js, Vercel, PostgreSQL, Redis, Clawbot',
  },
]

export default function CaseStudies() {
  return (
    <section id="cases" className="bg-white scroll-mt-20">
      {/* Dark section with rounded top */}
      <div className="section-dark-top py-16 md:py-24 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16">
            Case studies
          </h2>

          {/* Case Study Cards — Glassmorphism */}
          <div className="flex flex-col gap-8">
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="card-glass"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
                  {/* Left: Client */}
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
                      Client
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {cs.client}
                    </h3>
                  </div>

                  {/* Right: Details */}
                  <div>
                    {/* Objective */}
                    <div className="mb-8">
                      <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
                        Objective
                      </p>
                      <p className="text-white/70 text-base leading-relaxed">
                        {cs.objective}
                      </p>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                      <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
                        Results
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cs.results.map((result, index) => (
                          <div
                            key={index}
                            className="border-t border-white/10 pt-4"
                          >
                            <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                              {result.value}
                            </p>
                            <p className="text-white/40 text-sm leading-relaxed">
                              {result.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stack */}
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
                        Stack
                      </p>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {cs.stack}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
