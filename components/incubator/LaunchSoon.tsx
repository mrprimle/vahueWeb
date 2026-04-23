import WaitlistButton from './WaitlistButton'

const perks = [
  'Discount for the first month',
  'Priority access to Vahue Pilot',
  'The ability to influence what will happen in the community',
]

export default function LaunchSoon() {
  return (
    <section id="waitlist" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <article className="relative rounded-3xl border border-border-mid overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-90"
            style={{
              background:
                'radial-gradient(70% 90% at 0% 0%, rgba(3,137,244,0.20) 0%, rgba(132,52,233,0.14) 45%, transparent 80%)',
            }}
          />
          <div className="relative bg-surface p-7 md:p-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <p className="eyebrow mb-4">Launching soon</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white mb-5">
                We&apos;re getting the community ready{' '}
                <span className="text-white/55">for launch.</span>
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                The first participants will receive:
              </p>

              <ul className="flex flex-col gap-3 mb-10">
                {perks.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-white/85 text-[15px] leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <p className="text-white/55 text-sm leading-relaxed max-w-md">
                Click the button and we&apos;ll add you to the waitlist.
                We&apos;ll email you with launch details and your first-month
                discount.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end">
              <WaitlistButton context="Launch CTA" size="lg" />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
