'use client'

import Reveal, { Eyebrow, useInView } from './Reveal'

const tools = ['Pabau', 'WhatsApp', 'Instagram', 'Google Calendar', 'Stripe', 'HubSpot', 'Gmail', 'Website chat', 'Phone line']

/** Light band: the tools we connect to, as a slow marquee of word chips (no third-party logos). */
export function StackStrip() {
  const row = [...tools, ...tools]
  return (
    <section className="home-light border-t border-[#e3e6ea] bg-white pb-24 pt-20 text-[#17191c] md:pb-28">
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Works with your stack</Eyebrow>
            <h2 className="text-[2rem] font-medium leading-[1.1] tracking-[-0.025em] md:text-4xl">Keep the tools you already pay for.</h2>
          </div>
          <p className="max-w-md text-[16px] leading-relaxed text-[#4a505a]">
            We connect to your booking system, inbox and channels, and write every result back where your team already works.
          </p>
        </Reveal>
      </div>
      <div className="home-marquee mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul className="home-marquee-track flex w-max gap-3">
          {row.map((t, i) => (
            <li
              key={`${t}-${i}`}
              aria-hidden={i >= tools.length}
              className="whitespace-nowrap rounded-full border border-[#e3e6ea] bg-[#f5f6f7] px-5 py-2.5 text-[15px] text-[#2a2e35]"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const replaced = ['Website agency', 'Chatbot tool', 'Call recording', 'CRM & booking', 'SEO agency']

/** Dark band: one number, with what it means and how it was counted. */
export function ResultStat() {
  const { ref, inView } = useInView<HTMLDivElement>('0px 0px -25% 0px')
  return (
    <section className="bg-[#08090b] py-28 text-white md:py-40">
      <div ref={ref} className="mx-auto grid max-w-wide gap-14 px-6 md:grid-cols-[1.2fr_1fr] md:items-end md:px-8">
        <div>
          <Eyebrow dark>The result</Eyebrow>
          <p
            className={`font-display text-[8rem] font-light leading-[0.9] tracking-[-0.05em] transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[13rem] ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            5<span className="mx-4 text-white/25">→</span>1
          </p>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-white/70">
            A London clinic replaced five separate vendors with one Vahue system, run by one team.
          </p>
        </div>
        <div>
          <ul className="space-y-3">
            {replaced.map((r, i) => (
              <li key={r} className="flex items-center justify-between border-b border-white/10 pb-3 text-[16px]">
                <span
                  className="relative text-white/55"
                  style={{ transition: `color 500ms ${600 + i * 160}ms` }}
                >
                  {r}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 h-px bg-white/60"
                    style={{ width: inView ? '100%' : '0%', transition: `width 500ms ease ${600 + i * 160}ms` }}
                  />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/35">replaced</span>
              </li>
            ))}
            <li className="flex items-center justify-between pt-2 text-[16px]">
              <span className="text-white">Vahue Practice Front Office System</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#BBDEF2]">live</span>
            </li>
          </ul>
          <p className="mt-8 text-[13px] leading-relaxed text-white/40">
            Clinic named with permission only. Reply-time and booking-rate figures are being measured and will be published with the case study.
          </p>
        </div>
      </div>
    </section>
  )
}
