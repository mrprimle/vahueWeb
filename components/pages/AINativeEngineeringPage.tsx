'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DISCOVERY_CALL_URL } from '@/lib/links'
import ContactContainer from '@/components/engineering/ContactContainer'

/* ───────────────────────── 1. HERO ───────────────────────── */

const heroProblems = [
  {
    title: 'Classic development is slow & expensive',
    body: 'Long discovery, hand-coded everything, then weeks of rework. Calendars and burn-rates keep growing.',
  },
  {
    title: 'AI alone is fast, but unreliable',
    body: 'Hallucinations, context loss, snippets that break the codebase. Velocity without confidence is just risk.',
  },
  {
    title: 'Without senior orchestration, quality suffers',
    body: 'No specs, no review, no guardrails. Architecture drifts, security gaps appear, tech debt explodes.',
  },
]

function EngineeringHero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="relative bg-bg overflow-hidden">
      <div className="absolute inset-0 hero-texture opacity-50" />

      <div className="relative z-10 w-full max-w-wide mx-auto px-6 md:px-8 pt-28 md:pt-36 pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`font-display text-[2.7rem] font-light leading-none md:leading-tight xl:leading-[80px] lg:text-6xl xl:text-7xl -tracking-[0.01em] text-balance text-white ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transition:
                'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: mounted ? '120ms' : '0ms',
            }}
          >
            Ship your product{' '}
            <span className="text-[#BBDEF2]">10× faster</span>
            <br className="hidden md:block" /> with{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AI
            </span>{' '}
            — without losing senior control.
          </h1>

          <p
            className={`mt-6 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              transition: 'opacity 800ms ease, transform 800ms ease',
              transitionDelay: mounted ? '240ms' : '0ms',
            }}
          >
            AI-Native engineering that pairs top-tier AI for speed with senior engineers
            for architecture, quality and security — in one integrated flow.
          </p>

          <div
            className={`mt-10 flex flex-wrap items-center justify-center gap-3 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              transition: 'opacity 800ms ease, transform 800ms ease',
              transitionDelay: mounted ? '360ms' : '0ms',
            }}
          >
            <Link
              href={DISCOVERY_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white text-bg font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Book a Discovery Call
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Problem cards */}
        <div
          className={`mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'opacity 900ms ease, transform 900ms ease',
            transitionDelay: mounted ? '480ms' : '0ms',
          }}
        >
          {heroProblems.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border border-border-soft bg-surface p-6 md:p-7 backdrop-blur-sm"
            >
              <div className="w-9 h-9 rounded-full border border-border-mid flex items-center justify-center text-white/70 mb-5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white leading-snug mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Solution stripe */}
        <div className="relative mt-10 md:mt-12 rounded-3xl border border-border-soft overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background:
                'radial-gradient(80% 80% at 0% 0%, rgba(132,52,233,0.18) 0%, transparent 70%)',
            }}
          />
          <div className="relative bg-surface px-6 md:px-10 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-white text-base md:text-lg leading-snug max-w-3xl">
              <span className="text-white/55">Our solution: </span>
              Top-tier AI for speed{' '}
              <span className="text-white/55">+ </span>
              senior control
              <span className="text-white/55"> — in one integrated flow.</span>
            </p>
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/55 whitespace-nowrap">
              AI native SDLC
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 2. OUTCOMES ───────────────────────── */

const outcomeStats = [
  { value: '5–10×', label: 'Faster Delivery' },
  { value: '40–60%', label: 'Lower Costs' },
  { value: '80%', label: 'Less Bugs' },
]

const outcomePillars = [
  {
    title: 'Fully functional apps',
    body: 'Production-ready software for market launch — not click-through demos or proof-of-concepts.',
  },
  {
    title: 'Enterprise-level reliability & security',
    body: 'Senior architecture, security gates, and review built into every PR. Auditable from day one.',
  },
  {
    title: 'Stable architecture, tests, CI/CD',
    body: 'Clean codebases with test coverage, observability and pipelines that survive your next quarter.',
  },
]

function Outcomes() {
  return (
    <section id="outcomes" className="bg-bg scroll-mt-20">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow mb-4">Outcomes</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
            AI-Assisted Software Development{' '}
            <span className="text-white/55">with</span>{' '}
            <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
              Human Senior Oversight
            </span>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6">
          {outcomeStats.map((s, idx) => (
            <div
              key={s.label}
              className="relative rounded-3xl border border-border-soft overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                  background: `radial-gradient(80% 80% at ${
                    idx === 0 ? '0% 0%' : idx === 1 ? '100% 0%' : '50% 100%'
                  }, rgba(132,52,233,0.18) 0%, transparent 70%)`,
                }}
              />
              <div className="relative bg-surface p-7 md:p-9">
                <p className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-none text-white tracking-tight mb-3">
                  {s.value}
                </p>
                <p className="text-white/70 text-sm md:text-base font-medium">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {outcomePillars.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border border-border-soft bg-surface p-6 md:p-7"
            >
              <div className="w-9 h-9 rounded-full bg-[#b99dff]/15 border border-[#b99dff]/25 flex items-center justify-center text-[#b99dff] mb-5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white leading-snug mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-8 rounded-3xl border border-border-mid bg-white/[0.03] px-6 md:px-10 py-6 md:py-7 flex items-center justify-center text-center">
          <p className="font-display text-lg md:text-2xl font-semibold text-white leading-snug">
            Real, Live, Production-Grade Products{' '}
            <span className="text-white/55">— not demos or POCs.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 3. SDLC COMPARISON ───────────────────────── */

const typicalAI = [
  'A developer copies a snippet into chat',
  'Gets code back',
  'Manually pastes and rewires it',
  'Context drifts, bugs sneak in',
  'No consistent specs, no repeatable flow',
  'Most of the “saved time” returns as rework',
  'Quality depends on who prompted',
]

const vahueSDLC = [
  'AI is initialised inside the repo and operates with full project context',
  'Specs are written as Markdown using BMAD or Spec-Kit for execution-ready clarity, avoiding being prompt-dependent',
  'AI turns specs into ready-to-release features: code, tests, docs as PRs',
  'CI, test suites and security gates run on every change',
  'Senior dev approves architecture and every line before merge and release',
]

function SDLCComparison() {
  return (
    <section className="bg-bg">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow mb-4">Method</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
            Not “AI helper”.{' '}
            <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
              AI-Native SDLC.
            </span>
          </h2>
          <p className="mt-5 text-white/60 text-base md:text-lg">
            How AI usage looks in most teams today vs. how it works inside Vahue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Typical AI usage */}
          <div className="rounded-3xl border border-border-soft bg-surface p-7 md:p-9">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                Typical AI usage
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-border-soft text-[10px] font-mono uppercase tracking-widest text-white/50">
                Today
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white/85 mb-6 leading-snug">
              Prompt-dependent. Context drifts.
            </h3>
            <ul className="space-y-3">
              {typicalAI.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm md:text-[15px] text-white/65 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/25 flex-shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vahue SDLC */}
          <div className="relative rounded-3xl border border-border-soft overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background:
                  'radial-gradient(80% 80% at 100% 0%, rgba(132,52,233,0.18) 0%, transparent 70%)',
              }}
            />
            <div className="relative bg-surface p-7 md:p-9">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#b99dff]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b99dff]" />
                  Vahue AI SDLC
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#b99dff]/15 border border-[#b99dff]/25 text-[10px] font-mono uppercase tracking-widest text-[#b99dff]">
                  Repeatable
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 leading-snug">
                Spec-driven. Senior-approved. Repeatable.
              </h3>
              <ul className="space-y-3">
                {vahueSDLC.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-sm md:text-[15px] text-white/80 leading-relaxed"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 text-[#b99dff] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-white/65 text-base md:text-lg max-w-3xl mx-auto">
          Not “prompting”. It&apos;s{' '}
          <span className="text-white">
            ticket-to-feature release automation
          </span>{' '}
          with senior control.
        </p>
      </div>
    </section>
  )
}

/* ───────────────────────── 4. HUMAN-IN-THE-LOOP ───────────────────────── */

const humanLoop = [
  'Seniors craft precise prompts and maintain critical context.',
  'Thoroughly review AI output and integrate results into the codebase.',
  '80–90% of the development process is AI-accelerated in practice.',
  '10–20% involves classic senior coding and fine-tuning by hand.',
  'Humans retain ultimate ownership of architecture, quality and security.',
]

function HumanInTheLoop() {
  return (
    <section className="bg-bg">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">Human-in-the-loop reality</p>
            <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white mb-6">
              <span className="text-white">AI gives speed.</span>
              <br />
              <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
                Seniors make it production-grade.
              </span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              Every stage stays under senior orchestration. AI does the volume,
              humans own the judgment.
            </p>
          </div>

          <div className="rounded-3xl border border-border-soft bg-surface p-2 md:p-3">
            <ul className="divide-y divide-border-soft">
              {humanLoop.map((line, i) => (
                <li key={line} className="flex items-start gap-5 px-5 md:px-7 py-5 md:py-6">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/40 pt-1.5 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-white/85 text-sm md:text-base leading-relaxed">
                    {line}
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

/* ───────────────────────── 5. HOLISTIC APPROACH ───────────────────────── */

// Insurance icon (from /img/nav/Insurance.svg) — used for Advisory
const AdvisoryIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.0834 1.5L7.54999 1.5C5.86984 1.5 5.02976 1.5 4.38802 1.82698C3.82354 2.1146 3.36459 2.57355 3.07697 3.13804C2.74999 3.77978 2.75 4.61987 2.75001 6.30006C2.75002 8.28149 2.75003 9.71849 2.75004 11.6999C2.75005 13.3801 2.75005 14.2202 3.07703 14.862C3.36466 15.4265 3.82359 15.8854 4.38808 16.173C5.02982 16.5 5.8699 16.5 7.55006 16.5H10.45C12.1301 16.5 12.9702 16.5 13.612 16.173C14.1764 15.8854 14.6354 15.4265 14.923 14.862C15.25 14.2202 15.25 13.3802 15.25 11.7L15.25 5.78571M11.0834 1.5L11.0834 4.45238C11.0834 4.91909 11.0834 5.15245 11.1742 5.33071C11.2541 5.48751 11.3816 5.61499 11.5384 5.69489C11.7166 5.78571 11.95 5.78571 12.4167 5.78571L15.25 5.78571M11.0834 1.5L13.1667 3.64286L15.25 5.78571" />
      <path d="M6.25 9.875H11.75" />
      <path d="M6.25 12.7502H11.75" />
    </g>
  </svg>
)

// Guides icon (from /img/nav/guides.svg) — used for End-to-End Product Development
const ProductDevIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
      <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" strokeLinejoin="round" />
      <rect x="8" y="8" width="4.5" height="4.5" rx="2.25" strokeLinejoin="round" />
      <path d="M2.5 8v1A2.5 2.5 0 0 0 5 11.5h1M11.5 6V5A2.5 2.5 0 0 0 9 2.5H8" />
    </g>
  </svg>
)

// Community icon (from /img/nav/community.svg) — used for Team Augmentation
const TeamAugmentationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g fill="currentColor">
      <path d="M18.3059 22.2455C18.5323 22.3644 18.7967 22.3644 19.0231 22.2455C20.2193 21.6168 23.9977 19.3375 23.9977 15.6312C24.0036 14.0035 22.6995 12.6778 21.0823 12.668C20.1093 12.6805 19.2049 13.1746 18.6644 13.9889C18.1239 13.1746 17.2195 12.6805 16.2465 12.668C14.6293 12.6778 13.3252 14.0035 13.3311 15.6312C13.3311 19.3375 17.1096 21.6167 18.3059 22.2455Z" />
      <path d="M12.5819 12.3243C11.5841 11.9006 10.4861 11.666 9.33248 11.666C6.08038 11.666 3.27009 13.5291 1.89876 16.2413C1.07298 17.8745 1.96984 19.7957 3.61778 20.368C5.0753 20.8741 7.02314 21.334 9.33248 21.334C10.8433 21.334 12.1996 21.1371 13.3651 20.8592C12.3491 19.6524 11.4444 18.0284 11.3408 16.0112C11.3303 15.8064 11.3239 15.5497 11.3429 15.2745C11.4207 14.1475 11.8745 13.1209 12.5819 12.3243Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.66699 6.33396C5.66699 4.30838 7.30877 2.6673 9.33366 2.6673C11.3586 2.6673 13.0003 4.30838 13.0003 6.33396C13.0003 8.35955 11.3586 10.0006 9.33366 10.0006C7.30877 10.0006 5.66699 8.35955 5.66699 6.33396Z"
      />
      <path d="M14.0664 9.4504C14.6276 9.79922 15.29 10.0006 15.9993 10.0006C18.0243 10.0006 19.666 8.35955 19.666 6.33396C19.666 4.30838 18.0243 2.6673 15.9993 2.6673C15.29 2.6673 14.6276 2.86871 14.0664 3.21751C14.6561 4.11152 14.9993 5.18254 14.9993 6.33396C14.9993 7.48538 14.6561 8.5564 14.0664 9.4504Z" />
    </g>
  </svg>
)

// Graduation Cap icon (from /img/nav/graduation-cap.svg) — used for Team Training
const TeamTrainingIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </g>
  </svg>
)

const holisticPillars = [
  {
    title: 'Advisory',
    body: 'Roadmaps, architectural direction, and AI strategy to align tech bets with business outcomes.',
    Icon: AdvisoryIcon,
  },
  {
    title: 'End-to-End Product Development',
    body: 'AI-accelerated delivery from discovery to release — owned by senior engineers, not hand-offs.',
    Icon: ProductDevIcon,
  },
  {
    title: 'Team Augmentation',
    body: 'Senior AI-native specialists embedded in your team — owning a stage and the AI workflow inside it.',
    Icon: TeamAugmentationIcon,
  },
  {
    title: 'Team Training',
    body: 'Hands-on enablement that gets your existing team productive with AI in days, not quarters.',
    Icon: TeamTrainingIcon,
  },
]

function HolisticApproach() {
  return (
    <section className="bg-bg">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start mb-12 md:mb-16">
          <div>
            <p className="eyebrow mb-4">Engagement</p>
            <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
              Our Holistic Approach{' '}
              <span className="text-white/55">to Enterprise AI Solutions</span>
            </h2>
          </div>
          <p className="text-white/65 text-base md:text-lg leading-relaxed lg:pt-3">
            Accelerate your development with AI-assisted delivery, streamline
            your workflows, and build long-term confidence in AI. We tailor
            every engagement to your goals — with flexibility, focus on
            security and a people-first attitude.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {holisticPillars.map((p) => (
            <div
              key={p.title}
              className="group rounded-3xl border border-border-soft bg-surface p-7 md:p-8 hover:border-border-mid transition-colors flex flex-col min-h-[220px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#b99dff] flex-shrink-0">
                  <p.Icon />
                </span>
                <h3 className="font-display text-lg md:text-xl font-semibold text-white leading-snug">
                  {p.title}
                </h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 7. EXAMPLE TECH STACK ───────────────────────── */

const techStacks = [
  {
    title: 'Tooling for AI-Assisted Engineering',
    items: [
      'MLflow', 'DVC', 'Weights & Biases', 'Kubeflow',
      'Vector DBs (FAISS, Milvus, Pinecone)', 'LangSmith', 'RAG pipelines',
      'GitHub Copilot', 'JetBrains AI Assistant', 'Sourcegraph Cody',
    ],
  },
  {
    title: 'AI & ML Frameworks',
    items: [
      'PyTorch', 'TensorFlow', 'scikit-learn', 'Keras', 'XGBoost',
      'Hugging Face Transformers', 'LangChain', 'OpenAI API',
      'Anthropic Claude', 'Llama', 'Ollama', 'OpenCV', 'YOLO',
      'Vision Transformers (ViT)',
    ],
  },
  {
    title: 'Data & Integration',
    items: ['Chroma', 'Pinecone', 'Weaviate', 'Faiss', 'Qdrant'],
  },
  {
    title: 'Infrastructure & Security',
    items: [
      'AWS AI & HPC Infrastructure',
      'Azure AI Infrastructure',
      'DigitalOcean',
      'On-prem / local LLM deployment',
      'GDPR-ready',
    ],
  },
]

function ExampleTechStack() {
  return (
    <section className="bg-bg">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start mb-12 md:mb-16">
          <div>
            <p className="eyebrow mb-4">Tech</p>
            <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
              Example{' '}
              <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
                Tech Stack
              </span>
            </h2>
          </div>
          <p className="text-white/65 text-base md:text-lg leading-relaxed lg:pt-3">
            We maintain expertise across a broad range of technologies. A
            typical project combines industry-standard tools — and our
            adaptable approach lets us pick the optimal stack for every
            engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {techStacks.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-border-soft bg-surface p-7 md:p-9"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/55 mb-5">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-border-soft text-xs md:text-[13px] text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 7. CASE STUDIES ───────────────────────── */

const caseStudies = [
  {
    eyebrow: 'TRASTRA.com — Fintech',
    title: 'Unlocking 5× Value',
    intro:
      'A high-growth fintech needed a production-ready payment gateway module within a strict budget and timeline.',
    metrics: [
      { value: '$120,000', label: 'Traditional project value', sub: 'Equivalent scope and complexity with conventional development.' },
      { value: '$27,000', label: 'AI-assisted cost', sub: 'Same scope delivered using our AI-accelerated senior team.' },
      { value: '5×', label: 'Cost reduction', sub: 'No quality trade-off — same production-grade quality and security.' },
    ],
    accent:
      'radial-gradient(80% 80% at 0% 0%, rgba(132,52,233,0.18) 0%, transparent 70%)',
  },
  {
    eyebrow: 'O.XYZ (ofoundation.com)',
    title: '2× lower cost, 3× higher speed',
    intro:
      'O.XYZ wanted to cut monthly burn and ship features much faster — without losing stability.',
    metrics: [
      { value: '$65,000', label: 'Previous monthly spend', sub: 'Legacy development team cost.' },
      { value: '$27,000', label: 'AI-assisted monthly spend', sub: 'New cost with our AI-orchestrated senior team.' },
      { value: '3×', label: 'Velocity boost', sub: 'More features shipped per month at roughly 2× lower spend.' },
    ],
    accent:
      'radial-gradient(80% 80% at 100% 0%, rgba(132,52,233,0.18) 0%, transparent 70%)',
  },
]

function CaseStudiesSection() {
  return (
    <section className="bg-bg">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow mb-4">Proof</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
            Numbers from{' '}
            <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
              real engagements
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {caseStudies.map((c) => (
            <div
              key={c.title}
              className="relative rounded-3xl border border-border-soft overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{ background: c.accent }}
              />
              <div className="relative bg-surface p-7 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 mb-8">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-[#b99dff] mb-3">
                      {c.eyebrow}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight">
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed lg:pt-2">
                    {c.intro}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 pt-6 border-t border-border-soft">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-none mb-2">
                        {m.value}
                      </p>
                      <p className="text-white/85 text-sm md:text-base font-medium mb-1">
                        {m.label}
                      </p>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {m.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── PAGE EXPORT ───────────────────────── */

export default function AINativeEngineeringPage() {
  return (
    <>
      <EngineeringHero />
      <Outcomes />
      <SDLCComparison />
      <HumanInTheLoop />
      <HolisticApproach />
      <ExampleTechStack />
      <CaseStudiesSection />
      <ContactContainer extraMargin />
    </>
  )
}
