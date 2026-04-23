type PilotCapability = {
  title: string
  body: string
  meta?: string
}

const pilotCapabilities: PilotCapability[] = [
  {
    title: 'Test the idea',
    body: 'Segments · Competitors · Risks · Validation Plan',
    meta: '~15 min',
  },
  {
    title: 'Launch a product',
    body: 'PRD · Positioning · Launch Strategy',
    meta: '~1 hour',
  },
  {
    title: 'Diagnose the product',
    body: 'Funnel Diagnostics · Metrics Analysis · Growth Plan',
    meta: '~20 min',
  },
  {
    title: 'Answers to product questions',
    body: 'Through the prism of the Vahue Method and AI-native delivery playbooks',
  },
  {
    title: 'Feedback on solutions',
    body: 'Expert evaluation of your ideas and strategies',
  },
  {
    title: 'Texts for landing pages and offers',
    body: 'Copywriting based on methodology',
  },
]

const expertContributions = [
  {
    title: 'Speak at the event',
    body: 'Share your case and gain recognition from 1000+ participants',
  },
  {
    title: 'Share a prompt or case study',
    body: 'Your name will be visible to all community members',
  },
  {
    title: 'Boost your personal brand',
    body: 'Establish yourself as an AI expert in products',
  },
  {
    title: 'Find partners and clients',
    body: 'The community sees your expertise',
  },
]

const communityBenefits = [
  { title: 'Chat with people who are also mastering AI', body: '' },
  { title: 'Networking and exchange of experience', body: '' },
  { title: 'Offline meetings in London and other cities', body: '' },
  { title: 'Mutual support and accountability', body: '' },
]

export default function WhatYouGet() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Inside the community</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            What will <span className="text-white/55">you get?</span>
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {/* 01 — Vahue Pilot (full-width feature card with sub-grid) */}
          <article className="group relative rounded-3xl border border-border-mid overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                background:
                  'radial-gradient(90% 80% at 0% 0%, rgba(3,137,244,0.14) 0%, rgba(132,52,233,0.10) 45%, transparent 75%)',
              }}
            />
            <div className="relative bg-surface p-7 md:p-10">
              <div className="flex items-baseline justify-between mb-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/45">
                  01 · Tooling
                </p>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/45">
                  Available 24/7
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3 leading-tight">
                Vahue Pilot
              </h3>
              <p className="text-white/70 text-[15px] md:text-base leading-relaxed max-w-3xl mb-8">
                AI CPO trained on the Vahue Method and on real AI
                automation playbooks shipped inside high-performance product
                teams. Describe your idea, problem, or task and receive a
                structured analysis with a specific action plan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {pilotCapabilities.map((cap) => (
                  <div
                    key={cap.title}
                    className="rounded-2xl border border-border-soft bg-white/[0.02] p-5 transition-colors hover:border-border-mid"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-white font-semibold text-base leading-tight">
                        {cap.title}
                      </p>
                      {cap.meta && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/45 whitespace-nowrap">
                          {cap.meta}
                        </span>
                      )}
                    </div>
                    <p className="text-white/60 text-[13px] leading-relaxed">
                      {cap.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* 02 — Weekly events */}
          <FeatureCard
            number="02"
            category="Live"
            title="Weekly events with practices"
            body="Every week, a live stream with an expert who's already creating AI products. Only real case studies from practitioners. No fluff or bullshit."
          />

          {/* 03 — Q&A with Mike */}
          <FeatureCard
            number="03"
            category="Q&A"
            title="Q&A with Mike Doroshenko"
            body="Twice a month — a live analysis of your cases and questions. From an ex-Meta product leader who built AI automations inside high-performance teams."
          />

          {/* 04 — Community of like-minded people */}
          <article className="relative rounded-3xl border border-border-soft bg-surface p-7 md:p-10 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background:
                  'radial-gradient(70% 80% at 100% 0%, rgba(132,52,233,0.10) 0%, transparent 65%)',
              }}
            />
            <div className="relative">
              <ListHeader
                number="04"
                title="A community of like-minded people"
                description="You're not alone in this transition. You'll have a brotherly shoulder to lean on and help you overcome the difficulties."
              />
              <ListGrid items={communityBenefits} />
            </div>
          </article>

          {/* 05 — Become an expert */}
          <article className="relative rounded-3xl border border-border-soft bg-surface p-7 md:p-10 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background:
                  'radial-gradient(70% 80% at 0% 100%, rgba(3,137,244,0.10) 0%, transparent 65%)',
              }}
            />
            <div className="relative">
              <ListHeader
                number="05"
                title="Become an expert in the community"
                description="Cases, prompts, and materials are not created solely by the team — community members also contribute."
              />
              <ListGrid items={expertContributions} />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function ListHeader({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <>
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-mono text-[11px] uppercase tracking-widest text-white/45">
          {number}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mb-7 md:mb-8 max-w-3xl">
        {description}
      </p>
    </>
  )
}

function ListGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-border-soft bg-white/[0.02] p-5 md:p-6 transition-colors hover:border-border-mid"
        >
          <p className="text-white font-semibold text-[15px] md:text-base leading-snug">
            {item.title}
          </p>
          {item.body && (
            <p className="text-white/55 text-[13px] md:text-sm leading-relaxed mt-2">
              {item.body}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function FeatureCard({
  number,
  category,
  title,
  body,
}: {
  number: string
  category: string
  title: string
  body: string
}) {
  return (
    <article className="relative rounded-3xl border border-border-soft bg-surface p-7 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-12">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-3">
            {number} · {category}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight">
            {title}
          </h3>
        </div>
        <p className="text-white/75 text-[15px] md:text-base leading-relaxed lg:self-end">
          {body}
        </p>
      </div>
    </article>
  )
}
