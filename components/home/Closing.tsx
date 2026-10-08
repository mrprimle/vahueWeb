'use client'

import Image from 'next/image'
import Link from 'next/link'
import { DISCOVERY_CALL_URL } from '@/lib/links'
import Reveal, { Eyebrow, useScrollProgress } from './Reveal'

/* ---------- 9. Client story (light, serif, words light up as you scroll) ---------- */

const QUOTE =
  '[Approved quote from the clinic owner goes here: one or two sentences, in their words, on what changed after moving the front office to one system.]'

export function ClientStory() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>()
  const words = QUOTE.split(' ')
  const lit = Math.round(Math.min(1, progress * 1.6) * words.length)
  return (
    <section data-nav-theme="light" className="home-light bg-[#f5f6f7] text-[#17191c]">
      <div ref={ref} className="relative h-[160vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <Eyebrow>Client story</Eyebrow>
            <blockquote className="font-serif text-[2rem] leading-[1.25] tracking-[-0.01em] md:text-[3.25rem]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              {words.map((w, i) => (
                <span key={i} className="transition-colors duration-300" style={{ color: i < lit ? '#17191c' : '#c3c8cf' }}>
                  {w}{' '}
                </span>
              ))}
            </blockquote>
            <p className="mt-10 text-[15px] text-[#4a505a]">[Name], [Role] · London clinic</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 10. How we engage (dark, numbered sequence) ---------- */

const stages = [
  { n: '01', name: 'Diagnostic', time: '2 weeks · fixed fee', get: 'The workflow worth fixing, its cost today, the access needed', decide: 'Go or stop, with a stated reason' },
  { n: '02', name: 'Pilot', time: '4–6 weeks', get: 'The system running alongside your team on real enquiries or cases', decide: 'Whether it meets the numbers agreed up front' },
  { n: '03', name: 'Production', time: 'Go-live', get: 'Integrated, monitored, your team trained, every action logged', decide: 'Sign-off against the agreed criteria' },
  { n: '04', name: 'Managed operations', time: 'Monthly', get: 'Accuracy checks, updates, cost control and a monthly report', decide: 'Renew on results, not hours' },
]

const otherWays = [
  { name: 'AI-Native Engineers', line: 'Extend your team with engineers who ship with AI every day.', href: '/ai-native-engineering/' },
  { name: 'Team training', line: 'Workshops that teach your team to use AI well in its own domain.', href: '/team-training/' },
  { name: 'Enterprise AI', line: 'Agents on your data, tools and permissions, run as one platform.', href: '/enterprise-ai/' },
  { name: 'AI Incubator', line: 'Take an AI product idea from first test to a working product.', href: '/vahue-incubator/' },
]

export function Engage() {
  return (
    <section id="engage" className="scroll-mt-24 bg-[#101112] py-24 text-white md:py-32">
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <Reveal>
          <Eyebrow dark>How we engage</Eyebrow>
          <h2 className="max-w-3xl font-display text-[2.4rem] font-light leading-[1.05] tracking-[-0.02em] md:text-6xl">
            Small first step. Clear decision at every stage.
          </h2>
        </Reveal>
        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-4">
          {stages.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 110} className="flex flex-col bg-[#101112] p-7">
              <span className="font-display text-6xl font-light text-white/20">{s.n}</span>
              <span className="mt-8 font-display text-2xl">{s.name}</span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#BBDEF2]/80">{s.time}</span>
              <span className="mt-6 text-[13px] uppercase tracking-[0.08em] text-white/35">You get</span>
              <span className="mt-1 text-[15px] leading-relaxed text-white/75">{s.get}</span>
              <span className="mt-5 text-[13px] uppercase tracking-[0.08em] text-white/35">You decide</span>
              <span className="mt-1 text-[15px] leading-relaxed text-white/75">{s.decide}</span>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-14 border-t border-white/10 pt-8">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">Other ways to work with us</p>
          <ul className="grid gap-px overflow-hidden rounded-[10px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {otherWays.map((w) => (
              <li key={w.href} className="bg-[#101112]">
                <Link href={w.href} className="group flex h-full flex-col gap-2 p-6 transition-colors hover:bg-white/[0.04]">
                  <span className="flex items-center justify-between font-display text-xl">
                    {w.name}
                    <span aria-hidden className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white">&rarr;</span>
                  </span>
                  <span className="text-[14px] leading-relaxed text-white/60">{w.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- 11. Concerns (light, fine-ruled spec sheet) ---------- */

const concerns = [
  { q: 'Who owns it?', a: 'You own your data, your workflows and the custom code we write for you. Third-party models and tools stay under their own licences.' },
  { q: 'What does the AI decide on its own?', a: 'Only what you approve in writing. Clinical, financial and anything unusual goes to a person, every time.' },
  { q: 'Can we see what it did?', a: 'Every message, booking and hand-off is logged with who or what did it and when.' },
  { q: 'Do we have to change our tools?', a: 'No. We connect to the booking system, inbox and channels you already use.' },
  { q: 'What about patient and client data?', a: 'We sign a data processing agreement before touching any data, and keep access to what the workflow needs.' },
  { q: 'What if we stop working together?', a: 'You keep the system, the records and the documentation. We hand over cleanly.' },
]

export function Concerns() {
  return (
    <section data-nav-theme="light" className="home-light bg-white py-24 text-[#17191c] md:py-32">
      <div className="mx-auto grid max-w-wide gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <Reveal>
          <Eyebrow>Your concerns, answered</Eyebrow>
          <h2 className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] md:text-5xl">The questions owners ask before they say yes.</h2>
        </Reveal>
        <dl className="border-t border-[#e3e6ea]">
          {concerns.map((c, i) => (
            <Reveal key={c.q} delay={i * 60} className="grid gap-2 border-b border-[#e3e6ea] py-6 md:grid-cols-[0.8fr_1.2fr] md:gap-8">
              <dt className="text-[16px] font-medium">{c.q}</dt>
              <dd className="text-[16px] leading-relaxed text-[#4a505a]">{c.a}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ---------- 12. For product teams (dark, terminal card) ---------- */

const termLines = [
  { t: '$ run eval --suite intake --model current', c: 'text-white/80' },
  { t: '  412 cases · accuracy 91.3% · p95 latency 1.8 s · £0.004 / case', c: 'text-white/55' },
  { t: '$ run eval --suite intake --model candidate', c: 'text-white/80' },
  { t: '  412 cases · accuracy 94.1% · p95 latency 1.1 s · £0.002 / case', c: 'text-[#BBDEF2]' },
  { t: '  ✓ passes the bar agreed for release', c: 'text-[#BBDEF2]' },
]

export function ProductTeams() {
  return (
    <section className="border-t border-white/10 bg-[#101112] py-24 text-white md:py-32">
      <div className="mx-auto grid max-w-wide grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:px-8 [&>*]:min-w-0">
        <Reveal>
          <Eyebrow dark>For product teams</Eyebrow>
          <h2 className="font-display text-[2.4rem] font-light leading-[1.05] tracking-[-0.02em] md:text-5xl">
            Embedded AI engineers, measured against your bar.
          </h2>
          <ul className="mt-8 space-y-3 text-[16px] text-white/70">
            <li>Senior engineers inside your team within two weeks</li>
            <li>An evaluation set and monitoring built in from day one</li>
            <li>A handover pack your own team can maintain</li>
          </ul>
          <Link href="/ai-native-engineering/" className="mt-10 inline-flex items-center gap-2 rounded-[10px] border border-white/20 px-5 py-3 text-[14px] transition-colors hover:border-white/50">
            Embedded AI Engineers <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <Reveal delay={150}>
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#050608] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-[11px] text-white/35">example evaluation run</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7">
              {termLines.map((l) => (
                <div key={l.t} className={l.c}>
                  {l.t}
                </div>
              ))}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- 13. Who's behind it (light) ---------- */

export function Founder() {
  return (
    <section data-nav-theme="light" className="home-light bg-[#f5f6f7] py-24 text-[#17191c] md:py-32">
      <div className="mx-auto grid max-w-wide items-center gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <Reveal>
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-[#e3e6ea]">
            <Image src="/img/mikecut.avif" alt="Mike Doroshenko, founder of Vahue" fill className="object-cover object-top" sizes="(min-width: 768px) 384px, 100vw" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow>Who&apos;s behind it</Eyebrow>
          <h2 className="text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] md:text-5xl">You work with the people who build it.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4a505a]">
            Vahue was founded in 2019 by Mike Doroshenko, a product strategist and AI consultant with 10+ years of building digital
            products. A small senior team designs, ships and runs every system. No hand-off to juniors after the sale.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/case-studies/" className="rounded-[10px] bg-[#17191c] px-5 py-3 text-[14px] text-white transition-colors hover:bg-black">
              See our work
            </Link>
            <a href="https://clutch.co/profile/vahue" target="_blank" rel="noopener noreferrer" className="rounded-[10px] border border-[#c3c8cf] px-5 py-3 text-[14px] transition-colors hover:border-[#17191c]">
              Reviews on Clutch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- 14. Final call to action (dark) ---------- */

export function FinalCta() {
  return (
    <section className="bg-[#101112] py-28 text-white md:py-40">
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <Reveal>
          <h2 className="max-w-4xl font-display text-[2.75rem] font-light leading-[1.02] tracking-[-0.02em] md:text-7xl">
            Bring one workflow. Leave with a plan.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            A 20-minute call. You leave knowing which workflow is worth fixing first, what it costs you today, and whether
            we&apos;re the right team for it.
          </p>
          <a
            href={DISCOVERY_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-[10px] bg-white px-7 py-4 text-[15px] font-medium text-[#101112] transition-colors hover:bg-white/90"
          >
            Book a 20-minute workflow review <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
