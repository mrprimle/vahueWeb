import WaitlistButton from './WaitlistButton'

type Plan = {
  name: string
  tag?: string
  badge?: string
  description: string
  price: string
  cadence?: string
  ctaContext: string
  features: string[]
  highlight?: boolean
  preFeatures?: string
}

const plans: Plan[] = [
  {
    name: 'Builder',
    description: 'Full access to the community and tools',
    price: '£39',
    cadence: '/ month',
    ctaContext: 'Pricing — Builder',
    features: [
      'Vahue Pilot — an AI CPO trained on the proprietary method, with playbooks from real AI automation projects shipped inside high-performance product teams',
      '1,500 credits per month for Vahue Pilot',
      'A database of prompts and guides from community members',
      'Access to the Vahue AI Playbook (ebook)',
      'Weekly events with experts',
      'Q&A with Mike (2 times/month)',
      'General community chat',
      'Offline meetings once a month in London and other cities',
    ],
  },
  {
    name: 'Founder',
    badge: 'Premium',
    description: 'For those who want more access to Mike',
    price: 'Will be announced at launch',
    ctaContext: 'Pricing — Founder',
    preFeatures: 'Everything from Builder, plus:',
    features: [
      '7,500 credits per month for Vahue Pilot — enough for daily heavy use',
      'Founder-only calls (twice a month) — analysis of your cases',
      'Quick diagnostics: collect data → Mike diagnoses',
      '+1 guest: you can bring a partner / co-founder to the call',
      '20% discount on Vahue’s flagship AI Transformation course',
      '30% discount on the Vahue Practitioner certificate (£140 instead of £200)',
    ],
    highlight: true,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Pricing</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            Tariffs
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`relative rounded-3xl border overflow-hidden flex flex-col ${
        plan.highlight ? 'border-border-mid' : 'border-border-soft'
      }`}
    >
      {plan.highlight && (
        <div
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background:
              'radial-gradient(80% 80% at 100% 0%, rgba(132,52,233,0.18) 0%, rgba(3,137,244,0.10) 50%, transparent 80%)',
          }}
        />
      )}
      <div className="relative bg-surface p-7 md:p-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/55">
            {plan.tag ?? 'Plan'}
          </p>
          {plan.badge && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-bg text-[11px] font-mono uppercase tracking-widest">
              {plan.badge}
            </span>
          )}
        </div>

        <h3 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight mb-2">
          {plan.name}
        </h3>
        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
          {plan.description}
        </p>

        <div className="flex items-baseline gap-2 mb-6">
          <span className="font-display text-3xl md:text-4xl font-semibold text-white">
            {plan.price}
          </span>
          {plan.cadence && (
            <span className="text-white/55 text-sm">{plan.cadence}</span>
          )}
        </div>

        {plan.preFeatures && (
          <p className="text-white/80 text-sm font-medium mb-4">
            {plan.preFeatures}
          </p>
        )}

        <ul className="flex flex-col gap-3 mb-8">
          {plan.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 text-white/75 text-sm leading-relaxed"
            >
              <svg
                className="mt-0.5 w-4 h-4 text-white/55 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <WaitlistButton
            context={plan.ctaContext}
            variant={plan.highlight ? 'primary' : 'secondary'}
          >
            Join the waiting list
          </WaitlistButton>
        </div>
      </div>
    </article>
  )
}
