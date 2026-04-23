import Image from 'next/image'

const credentials = [
  'Led AI automation programs at Meta inside high-performance product teams',
  'Creator of Vahue Pilot and the Vahue Method for AI-native product delivery',
  '10+ years in digital product strategy and AI transformation',
]

const proofPoints = [
  { value: '60%', label: 'cycle-time reduction across automated product workflows' },
  { value: '20k+', label: 'engineering hours/year saved through agentic automations' },
  { value: '100+', label: 'PMs and engineers trained on AI-native delivery' },
  { value: '9.4/10', label: 'avg. rating across Vahue’s AI workshops' },
]

export default function Founder() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Behind the community</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            Who is behind <span className="text-white/55">this?</span>
          </h2>
        </div>

        <article className="relative rounded-3xl border border-border-mid overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-80"
            style={{
              background:
                'radial-gradient(70% 90% at 0% 0%, rgba(132,52,233,0.16) 0%, rgba(3,137,244,0.08) 45%, transparent 75%)',
            }}
          />
          <div className="relative bg-surface p-7 md:p-10 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-14">
            <div className="flex flex-col items-start">
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-3xl overflow-hidden border border-border-mid bg-white/[0.04] mb-6">
                <Image
                  src="/img/mikecut.avif"
                  alt="Mike Doroshenko — Founder of Vahue"
                  fill
                  sizes="(min-width: 768px) 13rem, 10rem"
                  className="object-cover object-top"
                />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight mb-2">
                Mike Doroshenko
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/55">
                Founder · ex-Meta
              </p>
            </div>

            <div className="lg:pt-2">
              <ul className="flex flex-col gap-4 mb-8">
                {credentials.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-white/85 text-base md:text-lg leading-relaxed"
                  >
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white/55 flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {proofPoints.map((p) => (
                  <div
                    key={p.label}
                    className="border-l border-border-mid pl-4"
                  >
                    <p className="text-2xl md:text-3xl font-display font-semibold gradient-text-scale leading-none mb-2">
                      {p.value}
                    </p>
                    <p className="text-white/55 text-xs leading-snug">
                      {p.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border-soft bg-white/[0.02] p-6">
                <p className="text-white/80 text-sm md:text-[15px] leading-relaxed">
                  Mike is actively involved in the community: Q&amp;A twice a
                  month, active participation in chats, and finding experts for
                  events.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
