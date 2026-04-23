import type { ReactElement, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const PdlcIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h2" />
    <path d="M9 17h6" />
    <path d="M13 8.5l1.5 2-1.5 2" />
  </svg>
)

const SpeedIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2.5" />
    <path d="M9 2h6" />
  </svg>
)

const IpIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 13h2" />
    <path d="M9 16h6" />
  </svg>
)

const ExperienceFirstIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M3 8h18" />
    <path d="M9 13l2 2 4-4" />
  </svg>
)

const pillars = [
  {
    Icon: PdlcIcon,
    title: 'Drives the AI PDLC and the creation of AI solutions',
    body: 'Vahue AI Hub doesn\u2019t sit on the sidelines of development. It actively orchestrates the full AI software lifecycle — guiding everything from ideation and design to training, deployment, and continuous improvement, so AI is built to work in the real world.',
  },
  {
    Icon: SpeedIcon,
    title: 'Accelerates delivery across the entire lifecycle',
    body: 'With pre-engineered workflows, agents, and automation baked in, AI Hub removes friction at every stage. Teams move faster from concept to production without sacrificing governance, quality, or security.',
  },
  {
    Icon: IpIcon,
    title: 'Proprietary IP driving competitive advantage',
    body: 'At the heart of Vahue AI Hub is a growing library of agents, knowledge engines, and technical building blocks — IP that turns every solution from a generic implementation into a distinct, compounding capability.',
  },
  {
    Icon: ExperienceFirstIcon,
    title: 'Experience-first approach to AI applications',
    body: 'AI Hub is built around how people actually use AI. By taking an experience-first approach, every application is intuitive, trusted, and embedded into real workflows — driving adoption, not just deployment.',
  },
]

export default function WhatPowers() {
  return (
    <section className="relative bg-bg py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="eyebrow mb-4">Capabilities</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            What powers <span className="text-white/55">Vahue AI Hub?</span>
          </h2>
          <p className="text-white/65 text-base md:text-lg leading-relaxed mt-6">
            Vahue AI Hub turns AI ambition into business reality through four
            tightly connected pillars that shape how every solution is built,
            delivered, and scaled.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map((p) => (
            <PillarCard
              key={p.title}
              Icon={p.Icon}
              title={p.title}
              body={p.body}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PillarCard({
  Icon,
  title,
  body,
}: {
  Icon: (p: IconProps) => ReactElement
  title: string
  body: string
}) {
  return (
    <article className="relative rounded-3xl border border-border-soft bg-surface p-6 md:p-7 overflow-hidden h-full flex flex-col">
      <div
        className="absolute -top-16 -left-16 w-44 h-44 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(3,137,244,0.55) 0%, rgba(132,52,233,0.35) 60%, transparent 80%)',
        }}
      />
      <div className="relative">
        <span className="inline-flex w-11 h-11 rounded-full border border-border-mid bg-white/[0.04] text-white items-center justify-center mb-6">
          <Icon className="w-5 h-5" />
        </span>
        <h3 className="text-white text-lg md:text-xl font-semibold leading-snug mb-3">
          {title}
        </h3>
        <p className="text-white/65 text-sm leading-relaxed">{body}</p>
      </div>
    </article>
  )
}
