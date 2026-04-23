'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const IdeationIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-4 12.8c.7.6 1 1.4 1 2.2V18h6v-1c0-.8.3-1.6 1-2.2A7 7 0 0 0 12 2Z" />
  </svg>
)

const ExperienceIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 5v2" />
    <path d="M12 17v2" />
    <path d="M5 12h2" />
    <path d="M17 12h2" />
    <path d="M7.05 7.05l1.4 1.4" />
    <path d="M15.55 15.55l1.4 1.4" />
    <path d="M7.05 16.95l1.4-1.4" />
    <path d="M15.55 8.45l1.4-1.4" />
  </svg>
)

const DeliveryIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14 4l-1 6 6-1-9 11 1-6-6 1 9-11Z" />
  </svg>
)

const InfraIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="6" rx="1" />
    <rect x="3" y="14" width="18" height="6" rx="1" />
    <path d="M7 7h.01" />
    <path d="M7 17h.01" />
    <path d="M11 7h6" />
    <path d="M11 17h6" />
  </svg>
)

const ArrowRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
)

export default function InsideHub() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [sectionHeight, setSectionHeight] = useState<string>('220vh')
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const measure = () => {
      const tr = trackRef.current
      if (!tr) return
      const isMobile = window.innerWidth < 768
      setEnabled(!isMobile)
      if (isMobile) {
        setSectionHeight('auto')
        tr.style.transform = 'translateX(0)'
        return
      }
      const dist = Math.max(0, tr.scrollWidth - window.innerWidth)
      setSectionHeight(`calc(100vh + ${dist}px)`)
    }
    measure()

    const onScroll = () => {
      if (!enabled) return
      const sec = sectionRef.current
      const tr = trackRef.current
      if (!sec || !tr) return
      const rect = sec.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const passed = Math.min(Math.max(-rect.top, 0), total)
      const pr = total > 0 ? passed / total : 0
      const maxX = Math.max(0, tr.scrollWidth - window.innerWidth)
      tr.style.transform = `translateX(${-pr * maxX}px)`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => {
      measure()
      onScroll()
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [enabled])

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg"
      style={{ height: sectionHeight }}
      aria-label="Inside Vahue AI Hub"
    >
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col">
        {/* Title */}
        <div className="pt-16 md:pt-24 pb-12 md:pb-20 text-center px-6">
          <p className="eyebrow mb-4">Inside Vahue AI Hub</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white max-w-4xl mx-auto">
            The engine behind{' '}
            <span className="text-white/55">enterprise AI</span>
          </h2>
        </div>

        {/* Horizontal track (desktop) / vertical stack (mobile) */}
        <div className="flex-1 relative md:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-12 px-6 md:px-12 py-8 md:py-0 w-full md:w-max will-change-transform"
          >
            {/* 1. Brand block */}
            <BrandBlock />

            <Connector />

            {/* 2. 4 pillars */}
            <PillarsCluster />

            <Connector />

            {/* 3. Platform reveal */}
            <PlatformWord />

            <Connector />

            {/* 4. Agent cards */}
            <AgentsCluster />

            <Connector />

            {/* 5. Knowledge Engine */}
            <KnowledgeEngine />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Track segments ───────────────────────── */

function BrandBlock() {
  return (
    <Segment width="w-full md:w-[340px]">
      <div className="relative rounded-3xl overflow-hidden h-[280px] md:h-[320px] flex flex-col justify-end p-7 border border-border-mid bg-surface">
        <div
          className="absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(3,137,244,0.55) 0%, rgba(132,52,233,0.30) 60%, transparent 80%)',
          }}
        />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/55 mb-3">
            Platform
          </p>
          <p className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight">
            Vahue AI Hub
          </p>
          <p className="text-white/65 text-sm mt-3 leading-relaxed">
            Driving end-to-end AI value — from idea to impact.
          </p>
        </div>
      </div>
    </Segment>
  )
}

function PillarsCluster() {
  const pillars = [
    {
      title: 'AI Ideation',
      body: 'Spot the opportunities, prioritize the bets, and scope what to build first.',
      Icon: IdeationIcon,
    },
    {
      title: 'AI Experience',
      body: 'Design conversational, agentic experiences people actually adopt.',
      Icon: ExperienceIcon,
    },
    {
      title: 'AI Delivery',
      body: 'Ship features with evals, guardrails, and CI you can trust in production.',
      Icon: DeliveryIcon,
    },
    {
      title: 'AI Infrastructure',
      body: 'Models, vector stores, MCP servers, observability — the rails AI runs on.',
      Icon: InfraIcon,
    },
  ]
  return (
    <Segment width="w-full md:w-[680px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {pillars.map((p) => (
          <PillarCard key={p.title} title={p.title} body={p.body} Icon={p.Icon} />
        ))}
      </div>
    </Segment>
  )
}

function PillarCard({
  title,
  body,
  Icon,
}: {
  title: string
  body: string
  Icon: (p: IconProps) => ReactNode
}) {
  return (
    <div className="relative rounded-2xl border border-border-soft bg-surface p-5 md:p-6 h-[150px] md:h-[160px] overflow-hidden">
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(132,52,233,0.45) 0%, rgba(3,137,244,0.25) 60%, transparent 80%)',
        }}
      />
      <div className="relative flex items-start gap-3">
        <span className="w-10 h-10 rounded-full border border-border-mid bg-white/[0.04] flex items-center justify-center text-white shrink-0">
          <Icon className="w-5 h-5" />
        </span>
        <div>
          <p className="text-white font-semibold text-sm md:text-base leading-snug">
            {title}
          </p>
          <p className="text-white/60 text-[12px] md:text-[13px] leading-relaxed mt-1.5">
            {body}
          </p>
        </div>
      </div>
    </div>
  )
}

function PlatformWord() {
  return (
    <Segment width="w-full md:w-[380px]">
      <div className="relative flex flex-col items-center justify-center text-center h-[280px] md:h-[320px]">
        <ThreadCircles
          className="absolute inset-0 w-full h-full text-white/35"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-none tracking-tight">
            <span
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AI HUB
            </span>
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/55 mt-3">
            Platform
          </p>
        </div>
      </div>
    </Segment>
  )
}

/** 3 thin "thread" rings — slightly imperfect, hand-drawn feel */
function ThreadCircles(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      {/* Thread 1 — slight lean right */}
      <path
        d="M100 18
           C 152 14, 184 56, 182 100
           C 184 148, 148 184, 100 182
           C 50 184, 14 146, 18 100
           C 16 54, 50 22, 100 18 Z"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
      {/* Thread 2 — slightly tighter and tilted */}
      <path
        d="M100 26
           C 146 22, 178 60, 174 102
           C 176 146, 144 174, 100 176
           C 56 178, 24 144, 26 100
           C 22 58, 56 26, 100 26 Z"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.4"
        fill="none"
        transform="rotate(-7 100 100)"
      />
      {/* Thread 3 — wobblier outer ring */}
      <path
        d="M100 12
           C 156 10, 190 50, 188 100
           C 192 152, 152 190, 100 188
           C 46 192, 8 152, 12 100
           C 10 48, 48 12, 100 12 Z"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.3"
        fill="none"
        transform="rotate(11 100 100)"
      />
    </svg>
  )
}

function AgentsCluster() {
  const agents = [
    {
      tabKey: 'technical',
      tag: 'Technical Agents',
      title: 'Accelerate the entire product lifecycle',
      body: 'AI Knowledge Engine · MCP Accelerator · Eval & guardrail tooling',
    },
    {
      tabKey: 'horizontal',
      tag: 'Horizontal Agents',
      title: 'Solve problems across the enterprise',
      body: 'Supply chain · IT · Finance · HR · Customer Experience',
    },
    {
      tabKey: 'vertical',
      tag: 'Vertical Agents',
      title: 'Solve specific industry problems',
      body: 'Banking · Healthcare · Retail · Consumer · BFSI',
    },
  ]
  return (
    <Segment width="w-full md:w-[700px]">
      <div className="grid grid-cols-1 gap-4">
        {agents.map((a) => (
          <a
            key={a.tag}
            href={`#agents-${a.tabKey}`}
            className="group relative rounded-2xl border border-border-soft bg-surface p-5 md:p-6 text-left overflow-hidden transition-colors duration-200 hover:border-border-mid"
          >
            <div
              className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-25 blur-3xl pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
              style={{
                background:
                  'radial-gradient(circle, rgba(132,52,233,0.45) 0%, rgba(3,137,244,0.25) 60%, transparent 80%)',
              }}
            />
            <div className="relative flex items-center justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/55 mb-1.5">
                  {a.tag}
                </p>
                <p className="text-white text-base md:text-lg font-semibold leading-snug">
                  {a.title}
                </p>
                <p className="text-white/65 text-[13px] mt-1.5">{a.body}</p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/55 inline-flex items-center gap-1.5 shrink-0 transition-colors duration-200 group-hover:text-white">
                Explore
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </Segment>
  )
}

function KnowledgeEngine() {
  const items = [
    'Domain Knowledge',
    'Prompting Methods',
    'Agent Optimization Methods',
    'Security',
  ]
  return (
    <Segment width="w-full md:w-[560px]">
      <div className="relative rounded-3xl border border-border-mid bg-surface p-7 md:p-10 overflow-hidden md:h-[360px] flex flex-col justify-center">
        <div
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(132,52,233,0.50) 0%, rgba(132,52,233,0.20) 55%, transparent 80%)',
          }}
        />
        <div className="relative">
          <p className="eyebrow mb-4">Foundation</p>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight mb-7">
            Built on Vahue&rsquo;s proprietary{' '}
            <span className="text-white/55">knowledge engine</span>
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
            {items.map((it) => (
              <li
                key={it}
                className="flex items-center gap-2.5 text-white/85 text-sm md:text-base"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8b8ff]" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Segment>
  )
}

/* ───────────────────────── Helpers ───────────────────────── */

function Segment({
  width,
  children,
}: {
  width: string
  children: ReactNode
}) {
  return <div className={`shrink-0 ${width}`}>{children}</div>
}

function Connector() {
  return (
    <div className="hidden md:flex shrink-0 items-center justify-center text-white/35">
      <svg
        width="80"
        height="20"
        viewBox="0 0 80 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 10 H70"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <path
          d="M64 4 L72 10 L64 16"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
