'use client'

// labs.scale.com/leaderboard, module 218341 `Home` (chunk 2jo7h7vmxpuz6.js). Chrome comes from app/labs/layout.tsx. No reveal or smooth scroll here: both are home-only on Scale.
// Scale's lucide `Icon` branch never renders (forwardRef objects fail its `typeof === 'function'` check), so only the language boards show a flag.
import { ArrowRight, Info, Mountain, PencilRuler, Shield } from 'lucide-react'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { LabsButton } from '@/components/site/labs/LabsButton'
import type { LabsChromeContent } from '@/components/site/labs/types'
import { EvaluateDialog } from './EvaluateDialog'
import { LabsTabs } from './LabsTabs'
import { LabsTooltip } from './LabsTooltip'
import { ScoreEntry } from './ScoreEntry'
import type { LeaderboardContent, LeaderboardItem } from './types'

const FEATURE_ICONS = [Mountain, PencilRuler, Shield]
const GRID = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'

function Card({ item, labels }: { item: LeaderboardItem; labels: LeaderboardContent['card'] }) {
  return (
    <Link
      href={item.href}
      className={`border border-hairline p-6 flex flex-col justify-between transition-all duration-300
      bg-white hover:bg-neutral-100 group relative overflow-hidden`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex gap-2 mb-2">
            {item.flag ? <img src={`/labs-leaderboard/flags/${item.flag}.svg`} alt="" className="w-5 h-5 mt-0.5 overflow-hidden rounded grayscale" /> : null}
            <h3 className="text-sm font-sans font-medium text-ink transition-colors">{item.name}</h3>
          </div>
          <p className="text-xs font-sans text-neutral-600 leading-relaxed">{item.description}</p>
        </div>
        <div>
          {item.scores.length ? (
            <div className="flex flex-col gap-3 mt-4 mb-4">
              {item.scores.slice(0, 3).map((score) => (
                <div key={score.model} className="transition-opacity duration-300 border-hairline">
                  <ScoreEntry entry={score} labels={labels} />
                </div>
              ))}
            </div>
          ) : null}
          <span className="text-xs font-sans text-neutral-600 group-hover:text-ink group-hover:underline underline-offset-2 transition-colors">
            {labels.viewFull} <span style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>{labels.arrow}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function Hero({ content }: { content: LeaderboardContent['hero'] }) {
  const [first, second] = content.stats
  return (
    <section className="w-full border-b border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-20 lg:py-24">
        <h2 className="text-xs font-sans font-medium text-ink tracking-wide uppercase mb-10">{content.heading}</h2>
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter text-ink mb-6 text-balance font-sans">{content.title}</h1>
            <p className="text-xs font-sans text-neutral-600 leading-[1.8] max-w-lg mb-8">{content.body}</p>
            <LabsButton variant="black" onClick={() => document.getElementById('leaderboards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              {content.cta}
              <ArrowRight className="w-3.5 h-3.5" />
            </LabsButton>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-[320px] shrink-0 flex flex-row lg:flex-col gap-8">
            <div>
              <span className="text-xs font-sans text-ink-faint tracking-wide uppercase block mb-2">{first.label}</span>
              <span className="text-3xl font-light text-ink tracking-tight">{first.value}</span>
              <p className="text-xs font-sans text-neutral-600 leading-[1.7] mt-2">{first.body}</p>
            </div>
            <div className="border-l lg:border-l-0 lg:border-t border-hairline pl-8 lg:pl-0 lg:pt-8">
              <span className="text-xs font-sans text-ink-faint tracking-wide uppercase block mb-2">{second.label}</span>
              <span className="text-3xl font-light text-ink tracking-tight">{second.value}</span>
              <p className="text-xs font-sans text-neutral-600 leading-[1.7] mt-2">{second.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Panel({ id, className, items, labels }: { id: string; className: string; items: LeaderboardItem[]; labels: LeaderboardContent['card'] }): ReactNode {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className={GRID}>
          {items.map((item) => (
            <Card key={item.key} item={item} labels={labels} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function LeaderboardPage({ content, chrome, category }: { content: LeaderboardContent; chrome: LabsChromeContent; category?: string }) {
  const [showDeprecated, setShowDeprecated] = useState(false)
  const active = content.items.filter((i) => !i.deprecated)
  const deprecated = content.items.filter((i) => i.deprecated)
  const write = (value: string) => () => window.history.replaceState({ category: value }, '', value === 'all' ? content.baseHref : `${content.baseHref}?category=${value}`)
  const panelClass = 'w-full scroll-m-16'
  const tabs = [
    { value: 'all', label: content.tabs.all, onClick: write('all'), panel: <Panel id="all" className={`${panelClass} pb-16`} items={active} labels={content.card} /> },
    ...(['agentic', 'safety', 'frontier'] as const).map((value) => ({
      value,
      label: content.tabs[value],
      onClick: write(value),
      panel: <Panel id={value} className={panelClass} items={active.filter((i) => i.category === value)} labels={content.card} />,
    })),
  ]

  return (
    <div className="text-xs bg-white text-ink relative">
      <Hero content={content.hero} />
      <div id="leaderboards" className="scroll-mt-20">
        <div className="border-t border-neutral-200" />
        <LabsTabs tabs={tabs} defaultValue={category && ['agentic', 'safety', 'frontier'].includes(category) ? category : 'all'} />
      </div>
      <section className="w-full py-16 border-t border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid w-full gap-8 md:grid-cols-3">
            {content.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <div key={f.title}>
                  <Icon className="w-5 h-5 mb-4 text-neutral-600" />
                  <h2 className="mb-3 text-sm font-sans font-medium text-ink tracking-wide">{f.title}</h2>
                  <p className="text-xs font-sans leading-relaxed text-neutral-600">{f.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section id="deprecated" className="w-full py-8">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-center justify-center w-full gap-2">
            <button
              type="button"
              role="switch"
              id="show-deprecated"
              aria-checked={showDeprecated}
              data-state={showDeprecated ? 'checked' : 'unchecked'}
              value="on"
              onClick={() => setShowDeprecated((v) => !v)}
              className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[hsl(0_0%_7%)] focus-visible:ring-offset-2 focus-visible:ring-offset-white data-[state=checked]:bg-[rgb(24,24,27)] data-[state=unchecked]:bg-[hsl(0_0%_85%)]"
            >
              <span data-state={showDeprecated ? 'checked' : 'unchecked'} className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
            </button>
            <label htmlFor="show-deprecated" className="font-medium text-xs font-sans text-neutral-600 cursor-pointer">
              {content.deprecated.label}
            </label>
            <LabsTooltip
              sideOffset={5}
              className="max-w-[calc(100vw-2rem)] w-[400px] z-50"
              content={<p className="text-sm text-balance">{content.deprecated.info}</p>}
              onTriggerClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              {(props) => (
                <button {...(props as object)} type="button" className="flex items-center" aria-label={content.deprecated.infoLabel}>
                  <Info className="w-4 h-4 text-neutral-600 hover:text-ink" />
                </button>
              )}
            </LabsTooltip>
          </div>
          {showDeprecated ? (
            <div className={`${GRID} mt-12`}>
              {deprecated.map((item) => (
                <Card key={item.key} item={item} labels={content.card} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
      <section className="w-full py-16 border-t border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="border border-hairline p-8 flex flex-col items-center">
            <h2 className="mb-4 text-sm font-sans font-medium text-ink tracking-wide">{content.evaluate.heading}</h2>
            <p className="max-w-3xl mx-auto mb-6 text-xs font-sans leading-relaxed text-center text-neutral-600">
              {content.evaluate.bodyBefore}{' '}
              <a href={`mailto:${content.evaluate.email}`} className="text-ink underline transition-colors hover:text-neutral-600">
                {content.evaluate.email}
              </a>
              {content.evaluate.bodyAfter}
            </p>
            <div className="flex items-center">
              <EvaluateDialog label={content.evaluate.cta} content={content.evaluate.form} chrome={chrome.newsletter} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
