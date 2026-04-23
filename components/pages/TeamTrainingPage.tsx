'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { DISCOVERY_CALL_URL } from '@/lib/links'
import ClientsStrip from '@/components/main/ClientsStrip'
import ContactContainer from '@/components/engineering/ContactContainer'

/* ───────────────────────── ICONS ───────────────────────── */

const DiagnosticsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9v9z" />
      <path d="M21 12A9 9 0 0 0 12 3v9z" opacity=".55" />
    </g>
  </svg>
)

// talent.svg — same icon used for AI-Native Engineering in the navbar
const WorkshopsIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
    <path d="M8 15H7a4 4 0 0 0-4 4v2" />
    <circle cx="10" cy="7" r="4" />
  </svg>
)

const SkillsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </g>
  </svg>
)

const ExecutiveIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </g>
  </svg>
)

const AdvisorIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </g>
  </svg>
)

// Same as Navbar CommunityIcon (community.svg) — used for AI Incubator
const CommunityIcon = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
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

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M7 17L17 7M17 7H7M17 7v10"
    />
  </svg>
)

/* ───────────────────────── 1. HERO ───────────────────────── */

const heroStats = [
  { value: '100+', label: 'Specialists trained' },
  { value: '9.4/10', label: 'Avg. participant satisfaction' },
  { value: '96%', label: 'Use AI tools within 7 days' },
]

function TeamsHero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="relative bg-bg overflow-hidden">
      <div className="absolute inset-0 hero-texture opacity-50" />

      <div className="relative z-10 w-full max-w-wide mx-auto px-6 md:px-8 pt-28 md:pt-36 pb-20 md:pb-24">
        <div className="max-w-4xl">
          <p className="eyebrow mb-6">Services · Team Training</p>

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
            Your entire team using{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AI in 7 days
            </span>
            <br className="hidden md:block" />— not in 7 quarters.
          </h1>

          <p
            className={`mt-6 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              transition: 'opacity 800ms ease, transform 800ms ease',
              transitionDelay: mounted ? '240ms' : '0ms',
            }}
          >
            96% of our training participants start using AI tools within 7 days.
            Not because we lecture — because we build. Every program is hands-on,
            role-specific, and designed around your actual workflows.
          </p>

          <div
            className={`mt-10 flex flex-wrap items-center gap-3 ${
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
              Book a Training Consultation
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon />
              </span>
            </Link>
            <a
              href="#programs"
              className="btn-outline text-xs uppercase tracking-widest font-mono"
            >
              See programs
            </a>
          </div>
        </div>

        {/* Hero stats strip */}
        <div
          className={`mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transition: 'opacity 900ms ease, transform 900ms ease',
            transitionDelay: mounted ? '480ms' : '0ms',
          }}
        >
          {heroStats.map((s, idx) => (
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
              <div className="relative bg-surface p-6 md:p-7">
                <p className="font-display text-4xl md:text-5xl font-semibold leading-none text-white tracking-tight mb-3">
                  {s.value}
                </p>
                <p className="text-white/70 text-sm md:text-base font-medium">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 2. BENEFITS ───────────────────────── */

const benefits = [
  {
    title: 'From overwhelmed to confident',
    body: 'Your team stops drowning in AI noise and starts using the right tools for the right tasks.',
  },
  {
    title: 'From hours to minutes',
    body: 'Routine work that takes hours collapses to minutes. Reports, research, emails, data analysis.',
  },
  {
    title: 'From resistance to enthusiasm',
    body: 'When people see AI working on their actual tasks, adoption happens naturally.',
  },
  {
    title: 'From scattered tools to unified workflow',
    body: 'One coherent AI workflow instead of 15 disconnected experiments.',
  },
]

function Benefits() {
  return (
    <section id="benefits" className="bg-bg scroll-mt-20">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow mb-4">Outcomes</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
            What changes when your team becomes{' '}
            <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
              AI-fluent
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl border border-border-soft bg-surface p-7 md:p-8 hover:border-border-mid transition-colors flex flex-col min-h-[220px]"
            >
              <div className="w-9 h-9 rounded-full bg-[#b99dff]/15 border border-[#b99dff]/25 flex items-center justify-center text-[#b99dff] mb-5">
                <CheckIcon />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white leading-snug mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 3. PROGRAMS ───────────────────────── */

type Program = {
  title: string
  body: string
  bullets: string[]
  Icon: () => React.JSX.Element
  meta: string
  link?: { href: string; label: string; description: string }
}

const programs: Program[] = [
  {
    title: 'AI Diagnostics',
    body: 'Quick audit of tasks, teams, and processes.',
    bullets: [
      'Up to 30% increase in process efficiency',
      'Faster pilot launch and implementation',
      'Tailored AI roadmap for your business',
    ],
    Icon: DiagnosticsIcon,
    meta: '2–3 weeks',
  },
  {
    title: 'Intro AI Workshops',
    body: 'Immersive sessions on GenAI tools and business use cases.',
    bullets: [
      'Clear explanations + guided practice',
      'Learn from real-world examples',
      'Understand how to apply AI to your tasks',
    ],
    Icon: WorkshopsIcon,
    meta: '1–2 days',
  },
  {
    title: 'AI Skills for Teams',
    body: 'Practical training to integrate AI into everyday workflows.',
    bullets: [
      'Build AI literacy across roles and teams',
      'Learn prompt design and automation',
      'Develop a shared AI culture in your company',
    ],
    Icon: SkillsIcon,
    meta: '4–6 weeks',
  },
  {
    title: 'Executive AI Consulting',
    body: '1:1 strategic AI sessions for C-level leaders and decision-makers.',
    bullets: [
      'Identify and prioritize high-impact AI opportunities',
      'Align AI strategy with business objectives',
      'Accelerate implementation across departments',
    ],
    Icon: ExecutiveIcon,
    meta: '1:1',
    link: {
      href: '/vahue-incubator',
      label: 'Join the AI Incubator',
      description: 'a community for founders & execs already working AI-native',
    },
  },
  {
    title: 'AI Advisor for CEO and Top Teams',
    body: 'Individual AI navigation track: from strategies to simulations and real-time solutions.',
    bullets: [
      'The top team speaks a single AI “language” and makes decisions faster',
      'Managers have a set of proven tools for analysis, planning, and people management',
      'The company receives a list of real scenarios for using AI in business',
      'The CEO receives personal support for strategic decisions',
    ],
    Icon: AdvisorIcon,
    meta: 'Ongoing',
  },
]

function Programs() {
  return (
    <section id="programs" className="bg-bg scroll-mt-20">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start mb-12 md:mb-16">
          <div>
            <p className="eyebrow mb-4">Programs</p>
            <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
              Five ways to bring AI{' '}
              <span className="text-white/55">into your team</span>
            </h2>
          </div>
          <p className="text-white/65 text-base md:text-lg leading-relaxed lg:pt-3">
            Every engagement is built around your real workflows — not generic
            curricula. Pick a single workshop or stack programs into a full
            transformation track.
          </p>
        </div>

        <ProgramsScroller />
      </div>
    </section>
  )
}

function ProgramsScroller() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = () => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setAtStart(scrollLeft <= 1)
    setAtEnd(scrollLeft >= scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    updateEdges()
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => updateEdges()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateEdges)
    }
  }, [])

  return (
    <div className="relative -mx-6 md:mx-0">
      {/* Edge fades — mobile only, hint at horizontal scroll */}
      <div
        className={`md:hidden pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-bg to-transparent z-10 transition-opacity duration-200 ${
          atStart ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div
        className={`md:hidden pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent z-10 transition-opacity duration-200 ${
          atEnd ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div
        ref={scrollRef}
        className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 overflow-x-auto md:overflow-visible scrollbar-hide snap-x md:snap-none snap-mandatory px-6 md:px-0 pb-2 md:pb-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {programs.map((p) => (
          <article
            key={p.title}
            className="group flex-shrink-0 w-[300px] md:w-auto snap-start rounded-3xl border border-border-soft bg-surface p-7 md:p-8 hover:border-border-mid transition-colors flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="text-[#b99dff]">
                <p.Icon />
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-border-soft text-[10px] font-mono uppercase tracking-widest text-white/55 whitespace-nowrap">
                {p.meta}
              </span>
            </div>

            <h3 className="font-display text-lg md:text-xl font-semibold text-white leading-snug mb-3">
              {p.title}
            </h3>
            <p className="text-sm text-white/65 leading-relaxed mb-6">
              {p.body}
            </p>

            <ul className="mt-auto space-y-2.5 pt-5 border-t border-border-soft">
              {p.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-white/75 leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#b99dff] flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {p.link && (
              <Link href={p.link.href} className="mt-5 group/link block">
                <span className="inline-flex items-center gap-2 text-[#dcc9ff] text-sm font-semibold hover:text-white transition-colors">
                  {p.link.label}
                  <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                    <ArrowIcon />
                  </span>
                </span>
                <span className="block text-xs text-white/55 leading-relaxed mt-1">
                  {p.link.description}
                </span>
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── 4. METHOD ───────────────────────── */

const methodSteps = [
  {
    title: 'Diagnose',
    body: 'Audit your team’s AI readiness, current tools, and the biggest opportunities.',
  },
  {
    title: 'Design',
    body: 'A custom program tailored to your roles, workflows, and industry.',
  },
  {
    title: 'Deliver',
    body: '80% hands-on practice on your real tasks. No abstract theory.',
  },
  {
    title: 'Deploy',
    body: 'Prompt libraries, agents and templates your team keeps forever.',
  },
  {
    title: 'Measure',
    body: 'Track adoption, time saved, and ROI. Adjust and iterate.',
  },
]

function Method() {
  return (
    <section id="method" className="bg-bg scroll-mt-20">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="font-mono text-[11px] uppercase tracking-widest mb-4 gradient-text-animated">
            The Vahue AI Fluency Method
          </p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
            How we get your team{' '}
            <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
              there
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {methodSteps.map((s, i) => (
            <article
              key={s.title}
              className="rounded-3xl border border-border-soft bg-surface p-6 md:p-7 flex flex-col h-full"
            >
              <p className="font-display text-3xl md:text-4xl font-semibold gradient-text-scale mb-6 leading-none">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2 leading-tight">
                {s.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 5. WHY VAHUE — typography blocks ───────────────────────── */

const whyItems = [
  {
    title: 'Not theory. Practice.',
    body: '80% of every session is hands-on with your real documents, emails, and workflows. Your team leaves with work already done — not slides to review later.',
  },
  {
    title: 'Founder-led',
    body: 'Mike personally designs and leads programs. No junior trainers, no layers, no account managers translating your needs.',
  },
  {
    title: 'Measurable results',
    body: '96% of participants use AI daily within 7 days. We track adoption, time saved and tooling depth — and report back.',
  },
  {
    title: 'Beyond the workshop',
    body: 'You keep the prompt libraries, agent templates, and ongoing support. The habits stick after we’re gone.',
  },
]

function WhyVahue() {
  return (
    <section id="why-us" className="bg-bg scroll-mt-20">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start mb-14 md:mb-20">
          <div>
            <p className="eyebrow mb-4">Why Vahue</p>
            <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
              Why teams pick us{' '}
              <span className="text-white/55">over generic courses</span>
            </h2>
          </div>
          <p className="text-white/65 text-base md:text-lg leading-relaxed lg:pt-3">
            Generic AI courses teach tools. We embed AI into the way your team
            already works — and make sure the habits stick after we’re gone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 md:gap-y-14 max-w-5xl">
          {whyItems.map((w) => (
            <div key={w.title}>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-white leading-tight mb-3">
                {w.title}
              </h3>
              <p className="text-white/65 text-sm md:text-base leading-relaxed">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 6. CASE STUDY ───────────────────────── */

const caseMetrics = [
  { v: '85%', l: 'Daily AI usage', s: 'Of employees use AI tools every day in their workflows.' },
  { v: '70%', l: 'Routine resolved', s: 'Of routine queries handled by the GPT assistant in the first 2 weeks.' },
  { v: '5 min', l: 'Faster response', s: 'Average response time dropped from 1 hour to 5 minutes.' },
  { v: '52', l: 'Prompts shipped', s: 'Ready-to-use prompts for finance, presale, legal, and HR.' },
  { v: '12', l: 'AI agents deployed', s: 'For quality, sales, finance, and executive dashboards.' },
  { v: '100%', l: 'Compliance reviewed', s: 'All prompts reviewed for data security compliance.' },
]

const caseStack = [
  'ChatGPT Enterprise',
  'n8n',
  'Cursor',
  'RAGDB (vector DB)',
  'Power BI + Bloomberg GPT',
  'Miro',
  'Whisper / Coqui',
]

function CaseStudy() {
  return (
    <section id="case-study" className="bg-bg scroll-mt-20">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow mb-4">Proof</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
            Numbers from a{' '}
            <span className="bg-gradient-to-r from-white to-[#b99dff] bg-clip-text text-transparent">
              real engagement
            </span>
          </h2>
        </div>

        <div className="relative rounded-3xl border border-border-soft overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background:
                'radial-gradient(80% 80% at 0% 0%, rgba(132,52,233,0.18) 0%, transparent 70%)',
            }}
          />
          <div className="relative bg-surface p-7 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 mb-10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#b99dff] mb-3">
                  Wealth Management — Financial Services
                </p>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight">
                  AI integrated into everyday work, across every role.
                </h3>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed lg:pt-2">
                The objective was to embed AI tools into daily work across all
                roles and lift overall productivity — without compromising data
                security or compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pt-8 border-t border-border-soft">
              {caseMetrics.map((m) => (
                <div key={m.l}>
                  <p className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-none mb-2 tracking-tight">
                    {m.v}
                  </p>
                  <p className="text-white/85 text-sm md:text-base font-medium mb-1">
                    {m.l}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">{m.s}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-border-soft">
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/55 mb-4">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {caseStack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-border-soft text-xs md:text-[13px] text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 7. TEAM ───────────────────────── */

function OurTeam() {
  return (
    <section id="team" className="bg-bg">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Who runs it</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
            Founder-led, expert-backed.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
          <article className="relative rounded-3xl border border-border-soft overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-70"
              style={{
                background:
                  'radial-gradient(70% 80% at 0% 0%, rgba(3,137,244,0.14) 0%, rgba(132,52,233,0.10) 45%, transparent 75%)',
              }}
            />
            <div className="relative bg-surface p-7 md:p-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-center">
              <div className="relative w-[200px] h-[260px] md:w-[220px] md:h-[280px] rounded-2xl overflow-hidden border border-border-mid">
                <Image
                  src="/img/mikecut.avif"
                  alt="Mike Doroshenko"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-1">
                  Mike Doroshenko
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#b99dff] mb-5">
                  Founder · Product Strategist · AI Consultant
                </p>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  10+ years in digital product strategy and AI transformation.
                  Author of corporate training programs used by leading
                  companies across financial services, retail, and tech.
                </p>
              </div>
            </div>
          </article>

          <article className="relative rounded-3xl border border-border-soft overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background:
                  'radial-gradient(80% 80% at 100% 100%, rgba(132,52,233,0.18) 0%, transparent 70%)',
              }}
            />
            <div className="relative bg-surface p-7 md:p-10 flex flex-col justify-center h-full">
              <span className="text-[#b99dff] mb-6">
                <CommunityIcon size={36} />
              </span>
              <p className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight mb-3">
                Backed by 30+ experts
              </p>
              <p className="text-white/65 text-sm md:text-base leading-relaxed">
                From McKinsey, Google, and top tech companies — brought in for
                role-specific deep dives whenever your program needs them.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 8. BOOKING CTA ───────────────────────── */

function BookingCTA() {
  return (
    <section className="relative bg-bg overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 60% at 50% 50%, rgba(132,52,233,0.16) 0%, rgba(3,137,244,0.08) 45%, transparent 80%)',
        }}
      />
      <div className="relative z-10 w-full max-w-wide mx-auto px-6 md:px-8 py-24 md:py-36 text-center">
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] -tracking-[0.01em] text-balance text-white/80 max-w-4xl mx-auto">
          The future of your team{' '}
          <span className="text-white">starts here.</span>
        </h2>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={DISCOVERY_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white text-bg font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors"
          >
            Talk to the founder
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowIcon />
            </span>
          </Link>

          <Link
            href="/vahue-incubator"
            className="group inline-flex items-center gap-3 text-white/80 hover:text-white font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full border border-border-mid hover:border-border-strong hover:bg-white/5 transition-colors"
          >
            AI Incubator
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 9. FAQ ───────────────────────── */

const faqItems = [
  {
    q: 'How is Vahue different from agencies or large consulting firms?',
    a: 'We combine deep AI expertise with hands-on implementation. Unlike large firms, we work directly with your team — not through layers of consultants. Every program is practical, not theoretical.',
  },
  {
    q: 'What kinds of problems do you solve?',
    a: 'We help teams automate routine tasks, build AI-powered workflows, improve decision-making with data, and grow internal AI competency across all departments.',
  },
  {
    q: 'Can your programs be adapted to my industry?',
    a: 'Always. We customize every program based on your industry, team structure, and specific business challenges — using your real documents and workflows.',
  },
  {
    q: 'How much time will the training take for my team?',
    a: 'It depends on the format. A workshop is 1–2 days; a full training program runs 4–6 weeks. We design schedules that minimize disruption.',
  },
  {
    q: 'How do you measure results?',
    a: 'We track AI adoption rates, time savings, productivity improvements, and participant satisfaction. Every program ships with clear KPIs and a post-training assessment.',
  },
  {
    q: 'Is it safe for company data?',
    a: 'Yes. We follow strict data security protocols and teach best practices for using AI tools safely. All prompts and workflows are reviewed for compliance.',
  },
  {
    q: 'Who will I work with directly?',
    a: 'You’ll work directly with our founder and senior AI strategists. No junior consultants or account managers in the room.',
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-bg scroll-mt-20">
      <div className="w-full max-w-3xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center mb-12 md:mb-16">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="text-display font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white">
            Frequently asked questions
          </h2>
        </div>

        <div className="rounded-3xl border border-border-soft bg-surface divide-y divide-border-soft overflow-hidden">
          {faqItems.map((item, index) => {
            const open = openIndex === index
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left group"
                  aria-expanded={open}
                >
                  <span className="text-base md:text-lg font-medium text-white group-hover:text-white/90 transition-colors">
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border border-border-mid flex items-center justify-center text-white/70 transition-transform duration-300 ${
                      open ? 'rotate-45 border-[#b99dff]/40 text-[#b99dff]' : ''
                    }`}
                  >
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out px-6 md:px-8 ${
                    open
                      ? 'grid-rows-[1fr] opacity-100 pb-6'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-white/65 text-sm md:text-base leading-relaxed pr-10">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── PAGE EXPORT ───────────────────────── */

export default function TeamTrainingPage() {
  return (
    <>
      <TeamsHero />
      <ClientsStrip />
      <Benefits />
      <Programs />
      <Method />
      <WhyVahue />
      <CaseStudy />
      <OurTeam />
      <BookingCTA />
      <ContactContainer />
      <FAQ />
    </>
  )
}
