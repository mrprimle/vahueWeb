'use client'

import emailjs from '@emailjs/browser'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { DISCOVERY_CALL_URL } from '@/lib/links'

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Category = 'Agentic' | 'Safety' | 'Frontier'

type Entry = {
  rank: number
  model: string
  score: string
  isNew?: boolean
}

type Benchmark = {
  id: string
  name: string
  description: string
  categories: Category[]
  entries: Entry[]
}

const benchmarks: Benchmark[] = [
  {
    id: 'hil-bench',
    name: 'HiL-Bench (Human-in-Loop Benchmark)',
    description:
      'HiL-Bench tests whether agents know when to ask for help, measuring if they recognize missing or ambiguous information and ask targeted clarifying questions instead of guessing.',
    categories: ['Agentic'],
    entries: [
      { rank: 1, model: 'Claude Opus 4.7', score: '27.67±5.32' },
      { rank: 1, model: 'Claude Opus 4.6', score: '24.33±5.16' },
      { rank: 1, model: 'GLM-5.1', score: '21.00±4.96' },
    ],
  },
  {
    id: 'swe-atlas-test-writing',
    name: 'SWE Atlas — Test Writing',
    description: "Evaluating an agent's ability to write production-grade tests",
    categories: ['Agentic'],
    entries: [
      { rank: 1, model: 'Gpt-5.4-xHigh (Codex CLI)', score: '44.36±6.04' },
      { rank: 1, model: 'Gpt-5.4-xhigh (Mini-SWE)', score: '40.00±6.00' },
      { rank: 1, model: 'Gpt-5.3-Codex-Xhigh (Codex)', score: '38.98±6.12' },
    ],
  },
  {
    id: 'swe-atlas-codebase-qna',
    name: 'SWE Atlas — Codebase QnA',
    description: 'Evaluating deep code comprehension and reasoning',
    categories: ['Agentic'],
    entries: [
      { rank: 1, model: 'Gpt 5.4 xHigh (Codex)', score: '40.80±5.10' },
      { rank: 1, model: 'Gpt 5.4 xHigh (Mini-SWE-Agent)', score: '36.30±4.90' },
      { rank: 1, model: 'Opus 4.6 (Claude Code)', score: '33.30±5.00' },
    ],
  },
  {
    id: 'mcp-atlas',
    name: 'MCP Atlas',
    description:
      'Evaluating real-world tool use through the Model Context Protocol (MCP)',
    categories: ['Agentic'],
    entries: [
      { rank: 1, model: 'Muse Spark', score: '82.20±2.30' },
      { rank: 1, model: 'claude-opus-4-7 (max)', score: '79.10±2.50' },
      { rank: 1, model: 'gemini-3.1-pro-preview (high)', score: '78.20±2.50' },
    ],
  },
  {
    id: 'swe-bench-pro-public',
    name: 'SWE-Bench Pro (Public Dataset)',
    description:
      'Evaluating long-horizon software engineering tasks in public open-source repositories',
    categories: ['Agentic'],
    entries: [
      { rank: 1, model: 'gpt-5.4 (xHigh)*', score: '59.10±3.56' },
      { rank: 1, model: 'Muse Spark*', score: '55.00±3.60', isNew: true },
      { rank: 2, model: 'claude-opus-4-6 (thinking)*', score: '51.90±3.61' },
    ],
  },
  {
    id: 'swe-bench-pro-private',
    name: 'SWE-Bench Pro (Private Dataset)',
    description:
      'Evaluating long-horizon software engineering tasks in commercial-grade private repositories',
    categories: ['Agentic'],
    entries: [
      { rank: 1, model: 'claude-opus-4-6 (thinking)*', score: '47.10±6.07' },
      { rank: 1, model: 'Muse Spark*', score: '44.70±6.05', isNew: true },
      { rank: 1, model: 'gpt-5.4(xHigh)*', score: '43.40±6.03' },
    ],
  },
  {
    id: 'scipredict',
    name: 'SciPredict',
    description: 'Forecasting scientific experiment outcomes',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'gemini-3-pro-preview', score: '25.27±1.92' },
      { rank: 1, model: 'claude-opus-4-5-20251101', score: '23.05±0.51' },
      { rank: 1, model: 'claude-opus-4-1-20250805', score: '22.22±1.48' },
    ],
  },
  {
    id: 'humanity-last-exam',
    name: "Humanity's Last Exam",
    description: 'Challenging LLMs at the frontier of human knowledge',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'gemini-3.1-pro-preview (thinking high)', score: '46.44±1.96' },
      { rank: 1, model: 'gpt-5.4-pro-2026-03-05', score: '44.32±1.95' },
      { rank: 3, model: 'Muse Spark', score: '40.56±1.92', isNew: true },
    ],
  },
  {
    id: 'humanity-last-exam-text',
    name: "Humanity's Last Exam (Text Only)",
    description: 'Challenging LLMs at the frontier of human knowledge',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'gemini-3.1-pro-preview (thinking high)', score: '47.31±2.11' },
      { rank: 1, model: 'gpt-5.4-pro-2026-03-05', score: '45.32±2.10' },
      { rank: 3, model: 'Muse Spark', score: '40.92±2.07', isNew: true },
    ],
  },
  {
    id: 'audio-multichallenge',
    name: 'AudioMultiChallenge',
    description: 'Evaluating spoken dialogue systems in multi-turn interaction',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'gemini-3-pro-preview (Thinking)*', score: '54.65±4.57' },
      { rank: 1, model: 'gemini-2.5-pro (Thinking)*', score: '46.90±4.58' },
      { rank: 2, model: 'gemini-2.5-flash (Thinking)*', score: '40.04±4.50' },
    ],
  },
  {
    id: 'audio-multichallenge-audio',
    name: 'AudioMultiChallenge — Audio Output',
    description: 'Evaluating spoken dialogue systems in multi-turn interaction',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'gemini-3.1-flash-live-preview (Thinking)', score: '36.06±4.41', isNew: true },
      { rank: 1, model: 'gpt-realtime-1.5', score: '34.73±4.38' },
      { rank: 2, model: 'gemini-3.1-flash-live-preview', score: '26.77±4.06', isNew: true },
    ],
  },
  {
    id: 'audio-multichallenge-text',
    name: 'AudioMultiChallenge — Text Output',
    description: 'Evaluating spoken dialogue systems in multi-turn interaction',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'gemini-3-pro-preview (Thinking)', score: '54.65±4.57' },
      { rank: 1, model: 'gemini-2.5-pro (Thinking)', score: '46.90±4.58' },
      { rank: 2, model: 'gemini-2.5-flash (Thinking)', score: '40.04±4.50' },
    ],
  },
  {
    id: 'prb-finance',
    name: 'Professional Reasoning Benchmark — Finance',
    description: 'Evaluating Professional Reasoning in Finance',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'claude-opus-4-6 (Non-Thinking)', score: '53.28±0.18' },
      { rank: 2, model: 'Muse Spark', score: '52.44±0.06', isNew: true },
      { rank: 3, model: 'gpt-5', score: '51.32±0.17' },
    ],
  },
  {
    id: 'prb-legal',
    name: 'Professional Reasoning Benchmark — Legal',
    description: 'Evaluating Professional Reasoning in Legal Practice',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'Muse Spark', score: '52.29±0.06', isNew: true },
      { rank: 1, model: 'claude-opus-4-6 (Non-Thinking)', score: '52.27±0.66' },
      { rank: 3, model: 'gpt-5-pro', score: '49.89±0.36' },
    ],
  },
  {
    id: 'rli',
    name: 'Remote Labor Index (RLI)',
    description:
      'Evaluating AI agents ability to perform real-world, economically valuable remote work',
    categories: ['Agentic'],
    entries: [
      { rank: 1, model: 'claude-opus-4-6 (CoWork)', score: '4.17', isNew: true },
      { rank: 2, model: 'claude-opus-4-5-20251101-thinking', score: '3.75' },
      { rank: 3, model: 'Manus_1.6 (Max)', score: '2.92', isNew: true },
    ],
  },
  {
    id: 'propensity-bench',
    name: 'PropensityBench',
    description:
      'Simulating real-world pressure to choose between safe or harmful behavior',
    categories: ['Safety'],
    entries: [
      { rank: 1, model: 'o3-2025-04-16', score: '10.50±0.60' },
      { rank: 2, model: 'claude-sonnet-4-20250514', score: '12.20±0.20' },
      { rank: 3, model: 'o4-mini-2025-04-16', score: '15.80±0.40' },
    ],
  },
  {
    id: 'vtb',
    name: 'VisualToolBench (VTB)',
    description:
      'Evaluating how LLMs can dynamically interact with and reason about visual information',
    categories: ['Agentic', 'Frontier'],
    entries: [
      { rank: 1, model: 'gpt-5.4-2026-03-05 (reasoning effort = high)', score: '29.17±0.13' },
      { rank: 1, model: 'gemini-3.1-pro-preview', score: '28.97±0.91' },
      { rank: 2, model: 'claude-opus-4-6-thinking', score: '27.52±1.45' },
    ],
  },
  {
    id: 'multinrc',
    name: 'MultiNRC',
    description: 'Multilingual Native Reasoning Evaluation Benchmark for LLMs',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'gpt-5-pro-2025-10-06', score: '65.20±1.24' },
      { rank: 1, model: 'gemini-3.1-pro-preview', score: '64.74±2.88' },
      { rank: 1, model: 'gpt-5.4-pro-2026-03-05', score: '62.27±2.92' },
    ],
  },
  {
    id: 'multichallenge',
    name: 'MultiChallenge',
    description: 'Assessing models across diverse, interdisciplinary challenges',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'Muse Spark', score: '75.52±4.05', isNew: true },
      { rank: 1, model: 'gemini-3.1-pro-preview', score: '71.37±1.74' },
      { rank: 1, model: 'gpt-5.4-pro-2026-03-05', score: '69.23±3.05' },
    ],
  },
  {
    id: 'fortress',
    name: 'Fortress',
    description: 'Frontier Risk Evaluation for National Security and Public Safety',
    categories: ['Safety'],
    entries: [
      { rank: 1, model: 'gpt-oss-120b', score: '8.24±1.93' },
      { rank: 1, model: 'claude-opus-4-5-20251101-thinking', score: '9.63±2.11' },
      { rank: 2, model: 'claude-sonnet-4-5-20250929-thinking', score: '12.80±2.36' },
    ],
  },
  {
    id: 'mask',
    name: 'MASK',
    description: 'Evaluate model honesty when pressured to lie',
    categories: ['Safety'],
    entries: [
      { rank: 1, model: 'claude-opus-4-6 (Non-Thinking)', score: '96.28±0.41' },
      { rank: 1, model: 'claude-sonnet-4-5-20250929-thinking', score: '96.13±0.57' },
      { rank: 1, model: 'Claude Sonnet 4 (Thinking)', score: '95.33±2.29' },
    ],
  },
  {
    id: 'enigmaeval',
    name: 'EnigmaEval',
    description: 'Evaluating model performance on complex, multi-step reasoning tasks',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'gpt-5.4-pro-2026-03-05', score: '23.82±2.43', isNew: true },
      { rank: 1, model: 'gemini-3.1-pro-preview', score: '19.76±2.27', isNew: true },
      { rank: 2, model: 'gpt-5-pro-2025-10-06', score: '18.75±2.22' },
    ],
  },
  {
    id: 'vista',
    name: 'VISTA',
    description: 'Vision-Language Understanding benchmark for multimodal models',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'Gemini 2.5 Pro Experimental (March 2025)', score: '54.65±1.46' },
      { rank: 1, model: 'gemini-2.5-pro-preview-06-05', score: '54.63±0.55' },
      { rank: 1, model: 'gpt-5.4-pro-2026-03-05', score: '53.89±2.02', isNew: true },
    ],
  },
  {
    id: 'tutorbench',
    name: 'TutorBench',
    description:
      'Evaluating model performance on common tutoring tasks for high school and AP-level subjects',
    categories: ['Frontier'],
    entries: [
      { rank: 1, model: 'Muse Spark', score: '68.55±0.95', isNew: true },
      { rank: 1, model: 'gpt-5.4-pro-2026-03-05', score: '56.62±1.02' },
      { rank: 1, model: 'gemini-2.5-pro-preview-06-05', score: '55.65±1.11' },
    ],
  },
]

const FILTERS: { id: 'All' | Category; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'Agentic', label: 'Agentic' },
  { id: 'Safety', label: 'Safety' },
  { id: 'Frontier', label: 'Frontier' },
]

function parseScore(score: string): number {
  const match = score.match(/-?\d+(\.\d+)?/)
  return match ? parseFloat(match[0]) : 0
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] font-medium text-white/80 flex-shrink-0">
      {rank}
    </span>
  )
}

function BenchmarkEntry({
  entry,
  widthPct,
}: {
  entry: Entry
  widthPct: number
}) {
  return (
    <div className="rounded-xl bg-black/40 border border-white/5 p-3 md:p-3.5">
      <div className="flex items-center gap-3">
        <RankBadge rank={entry.rank} />
        <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
          <p className="text-[13px] md:text-sm text-white truncate max-w-full">
            {entry.model}
          </p>
          {entry.isNew && (
            <span className="inline-flex items-center rounded-full bg-white text-bg font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5">
              New
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-white/80"
            style={{ width: `${widthPct}%` }}
          />
        </div>
        <p className="font-mono text-[11px] text-white/75 tabular-nums whitespace-nowrap">
          {entry.score}
        </p>
      </div>
    </div>
  )
}

function BenchmarkCard({ benchmark }: { benchmark: Benchmark }) {
  const max = Math.max(...benchmark.entries.map((e) => parseScore(e.score)), 1)

  return (
    <article className="flex flex-col rounded-2xl border border-border-soft bg-white/[0.02] p-5 md:p-6">
      <header className="mb-4">
        <h3 className="font-display text-base md:text-lg font-medium text-white leading-snug text-balance">
          {benchmark.name}
        </h3>
        <p className="mt-2 text-[13px] text-white/55 leading-relaxed">
          {benchmark.description}
        </p>
      </header>

      <div className="flex flex-col gap-2.5 flex-1">
        {benchmark.entries.map((entry, idx) => {
          const value = parseScore(entry.score)
          const widthPct = Math.max(
            12,
            Math.min(100, (value / max) * 100),
          )
          return (
            <BenchmarkEntry
              key={`${benchmark.id}-${idx}`}
              entry={entry}
              widthPct={widthPct}
            />
          )
        })}
      </div>
    </article>
  )
}

export default function LeaderBoardPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | Category>('All')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return benchmarks
    return benchmarks.filter((b) => b.categories.includes(activeFilter))
  }, [activeFilter])

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!emailRegexp.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }

    setError(null)
    setSubmitting(true)
    try {
      const EMAIL_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID
      const EMAIL_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID
      const EMAIL_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY

      if (
        EMAIL_SERVICE_ID &&
        EMAIL_TEMPLATE_ID &&
        EMAIL_PUBLIC_KEY &&
        formRef.current
      ) {
        await emailjs.sendForm(
          EMAIL_SERVICE_ID,
          EMAIL_TEMPLATE_ID,
          formRef.current,
          { publicKey: EMAIL_PUBLIC_KEY },
        )
      }

      setSubscribed(true)
      setEmail('')
    } catch (err) {
      console.error('Newsletter subscription failed:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="bg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg">
        <div className="absolute inset-0 hero-texture opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

        <div className="relative z-10 w-full max-w-wide mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-16 md:pb-20">
          <p className="eyebrow mb-6">Leaderboards</p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
            <div>
              <h1 className="font-display text-[2.7rem] font-light leading-none md:leading-tight xl:leading-[80px] lg:text-6xl xl:text-7xl -tracking-[0.01em] text-balance text-white max-w-2xl">
                testing the limits of{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  AI
                </span>
                .
              </h1>
              <p className="mt-6 text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
                Benchmarks for frontier, agentic, and safety capabilities.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#leaderboards"
                  className="group inline-flex items-center gap-2 bg-white text-bg font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors"
                >
                  Start Exploring
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              <div className="rounded-2xl border border-border-soft bg-white/[0.02] p-6 md:p-7">
                <p className="eyebrow mb-3">Benchmarks</p>
                <p className="font-display text-4xl md:text-5xl font-light text-white leading-none">
                  20+
                </p>
                <p className="mt-3 text-white/60 text-sm leading-relaxed">
                  Including benchmarks on agentic coding, frontier reasoning,
                  and safety alignment.
                </p>
              </div>

              <div className="rounded-2xl border border-border-soft bg-white/[0.02] p-6 md:p-7">
                <p className="eyebrow mb-3">Models evaluated</p>
                <p className="font-display text-4xl md:text-5xl font-light text-white leading-none">
                  100+
                </p>
                <p className="mt-3 text-white/60 text-sm leading-relaxed">
                  From leading AI labs including OpenAI, Anthropic, Google,
                  Meta, and open-source contributors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="hairline" />
      </div>

      {/* Leaderboards */}
      <section
        id="leaderboards"
        className="w-full max-w-wide mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-20 md:pb-24 scroll-mt-24"
      >
        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-8 md:mb-10">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`inline-flex items-center px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  isActive
                    ? 'bg-white text-bg'
                    : 'bg-white/5 border border-white/10 text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
          <span className="ml-auto text-xs text-white/45 hidden md:inline-block">
            {filtered.length} benchmark{filtered.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((benchmark) => (
            <BenchmarkCard key={benchmark.id} benchmark={benchmark} />
          ))}
        </div>
      </section>

      {/* Benefits / methodology */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-20 md:pb-28">
        <div className="hairline mb-14 md:mb-16" />

        <div className="mb-10 md:mb-12 max-w-3xl">
          <p className="eyebrow mb-4">Methodology</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white leading-[1.1] text-balance">
            Frontier AI model evaluations &amp; benchmarks.
          </h2>
          <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
            We conduct high-complexity evaluations to expose model failures,
            prevent benchmark saturation, and push model capabilities — while
            continuously evaluating the latest frontier models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <div className="rounded-2xl border border-border-soft bg-white/[0.02] p-6 md:p-8">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
              <svg
                className="w-5 h-5 text-white/85"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <h3 className="font-display text-lg md:text-xl font-medium text-white leading-snug mb-3">
              Scaling with human expertise
            </h3>
            <p className="text-white/65 text-sm md:text-[15px] leading-relaxed">
              Humans design complex evaluations and define precise criteria to
              assess models, while LLMs scale evaluations — ensuring
              efficiency and alignment with human judgment.
            </p>
          </div>

          <div className="rounded-2xl border border-border-soft bg-white/[0.02] p-6 md:p-8">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
              <svg
                className="w-5 h-5 text-white/85"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>
            <h3 className="font-display text-lg md:text-xl font-medium text-white leading-snug mb-3">
              Robust datasets for reliable benchmarks
            </h3>
            <p className="text-white/65 text-sm md:text-[15px] leading-relaxed">
              Our leaderboards are built on carefully curated evaluation sets,
              combining private datasets to prevent overfitting with
              open-source datasets for broad benchmarking and comparability.
            </p>
          </div>

          <div className="rounded-2xl border border-border-soft bg-white/[0.02] p-6 md:p-8">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
              <svg
                className="w-5 h-5 text-white/85"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                />
              </svg>
            </div>
            <h3 className="font-display text-lg md:text-xl font-medium text-white leading-snug mb-3">
              Continuously evaluating frontier models
            </h3>
            <p className="text-white/65 text-sm md:text-[15px] leading-relaxed">
              We continuously evaluate the latest releases from every major
              lab, so the leaderboards stay current with the state of the
              art — not frozen snapshots.
            </p>
          </div>
        </div>

      </section>

      {/* Evaluate your model CTA */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-20 md:pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border-soft bg-white/[0.03] p-8 md:p-12 lg:p-14">
          <div className="absolute inset-0 hero-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">Evaluate your model</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-white text-balance">
                Want your model on the{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  leaderboard
                </span>
                ?
              </h2>
              <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
                If you&apos;d like to add your model to this leaderboard or a
                future version, get in touch. To ensure leaderboard integrity,
                models can only be featured the first time an organization
                encounters the prompts.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href={DISCOVERY_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-bg font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors"
              >
                Evaluate your Model
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </Link>
              <a
                href="mailto:human@vahue.ai?subject=Leaderboard%20submission"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                Or email human@vahue.ai
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-28 md:pb-32">
        <div className="max-w-xl mx-auto text-center">
          <p className="eyebrow mb-4">Vahue leaderboard newsletter</p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white leading-tight mb-4">
            Research, benchmarks, and insights — delivered to your inbox.
          </h2>

          <form
            ref={formRef}
            onSubmit={handleSubscribe}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting || subscribed}
              className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/30 focus:bg-white/[0.07] transition-colors disabled:opacity-70"
            />
            <input type="hidden" name="name" value="Leaderboard newsletter subscriber" />
            <input
              type="hidden"
              name="other info"
              value="Newsletter signup from /leader-board — Research, benchmarks, and insights subscription."
            />
            <button
              type="submit"
              disabled={submitting || subscribed}
              className="inline-flex items-center justify-center gap-2 bg-white text-bg font-medium text-sm px-6 py-3 rounded-full hover:bg-white/90 disabled:opacity-60 disabled:cursor-default transition-colors"
            >
              {subscribed
                ? 'Subscribed ✓'
                : submitting
                  ? 'Subscribing…'
                  : 'Subscribe'}
            </button>
          </form>

          {subscribed && (
            <p className="mt-4 text-xs text-white/55">
              Thanks — we&apos;ll be in touch.
            </p>
          )}

          {error && !subscribed && (
            <p className="mt-4 text-xs text-red-400/90">{error}</p>
          )}
        </div>
      </section>
    </main>
  )
}
