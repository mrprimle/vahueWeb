'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowRight } from '@/components/scale-clone/labs-shared/icons'
import { labsHref } from '@/components/scale-clone/labs-shared/links'
import s from '@/components/scale-clone/labs-shared/labs.module.css'
import LabsTooltip, { useTipProvider } from './LabsTooltip'
import EvaluateDialog from './EvaluateDialog'
import { Flag, MountainIcon, PencilRulerIcon, ShieldIcon } from './iconSvgs'
import type { LabsBrandColor, LabsLeaderboard as Board, LabsLeaderboardContent, LabsScore } from './content'

/*
 * 1:1 clone of https://labs.scale.com/leaderboard: labs' `Home` (chunk 2jo7h7vmxpuz6.js, module 218341).
 *   hero (qX) -> #leaderboards: Radix Tabs All/Agentic/Safety/Frontier, card grid (qG) -> about (qK) ->
 *   #deprecated: Radix Switch + Info tooltip, deprecated grid (br) -> [EVALUATE YOUR MODEL] (bp) + HubSpot dialog.
 * Card scores: `LeaderboardScoreEntry` (37yhmp3ou6exv.js, module 41336), top 3 per board.
 * Spec: reference-snapshots/scale-clone/labs-leaderboard.md
 */

type Tab = 'all' | 'agentic' | 'safety' | 'frontier'
const TABS: { v: Tab; label: string }[] = [
  { v: 'all', label: 'All' },
  { v: 'agentic', label: 'Agentic' },
  { v: 'safety', label: 'Safety' },
  { v: 'frontier', label: 'Frontier' },
]
const ROUTE = '/scale-clone/labs-leaderboard/'

/* ---------- brand colour (module 371198 getProviderKeyFromModelOrOrg + 41336 fallback) ---------- */
const BRAND = [
  ['anthropic', '#E27553'], ['openai', '#65C2B9'], ['google', '#598DD2'], ['amazon', '#E09A3B'], ['moonshot', '#A37CAD'],
  ['alibaba', '#E072AF'], ['meta', '#6FCBEF'], ['xai', '#817EAD'], ['zai', '#D1B745'], ['mistral', '#FF6F00'],
  ['minimax', '#8D86E8'], ['microsoft', '#D95358'], ['deepseek', '#E39CAB'], ['xiaomi', '#BD836F'], ['liquid', '#A69E66'],
  ['manus', '#62A16E'], ['thinkingmachines', '#9ACD32'], ['nvidia', '#76B900'],
] as const
const SECONDARY: Record<string, string> = {
  anthropic: '#75A4B5', openai: '#D97D7C', google: '#9AB896', amazon: '#EDCCA3', moonshot: '#817EAD', alibaba: '#D1B4C6',
  meta: '#C7A678', xai: '#A9A7C4', zai: '#DDB5EB', mistral: '#8FB6EB', minimax: '#D1B745', microsoft: '#A69E66',
  deepseek: '#BD836F', xiaomi: '#A69E66', liquid: '#C7A678', manus: '#9AB896', thinkingmachines: '#B8E066', nvidia: '#A5D159',
}
const CODES: Record<string, string> = Object.fromEntries(BRAND.flatMap(([c, col]) => [[c, col], [`${c}2`, SECONDARY[c]]]))
const ALIAS: Record<string, string> = {
  openai: 'openai', chatgpt: 'openai', anthropic: 'anthropic', claude: 'anthropic', google: 'google', googledeepmind: 'google',
  gemini: 'google', amazon: 'amazon', amazonnova: 'amazon', moonshot: 'moonshot', moonshotai: 'moonshot', kimi: 'moonshot',
  qwen: 'alibaba', alibaba: 'alibaba', alibabaqwen: 'alibaba', meta: 'meta', llama: 'meta', zai: 'zai', xai: 'xai',
  mistral: 'mistral', mistralai: 'mistral', minimax: 'minimax', microsoft: 'microsoft', microsoftphi: 'microsoft',
  phi: 'microsoft', deepseek: 'deepseek', deepseekai: 'deepseek', xiaomi: 'xiaomi', xiaomimimo: 'xiaomi', mimo: 'xiaomi',
  liquidlfm2audio: 'liquid', liquid: 'liquid', manus: 'manus', voxtral: 'mistral', thinkingmachines: 'thinkingmachines',
  thinkingmachineslab: 'thinkingmachines', tml: 'thinkingmachines', nvidia: 'nvidia', nemotron: 'nvidia',
}
function providerKey(v?: string): string | null {
  const t = (v || '').toLowerCase().replace(/[^a-z0-9]+/g, '')
  if (!t) return null
  return ALIAS[t] ?? (CODES[t] ? t : null)
}
function orgFromModel(model: string): string {
  const t = model.toLowerCase()
  if (t.includes('nemotron') || t.includes('nvidia')) return 'NVIDIA'
  if (t.includes('claude')) return 'Anthropic'
  if (t.includes('gpt') || t.includes('whisper') || t.includes('realtime') || t.startsWith('o1') || t.startsWith('o3') || t.startsWith('o4')) return 'OpenAI'
  if (t.includes('gemini') || t.includes('gemma') || t.includes('imagen')) return 'Google'
  if (t.includes('llama') || t.includes('meta')) return 'Meta'
  if (t.includes('voxtral') || t.includes('mistral') || t.includes('mixtral') || t.includes('codestral')) return 'Mistral AI'
  if (t.includes('command')) return 'Cohere'
  if (t.includes('deepseek')) return 'DeepSeek'
  if (t.includes('grok')) return 'xAI'
  if (t.includes('phi')) return 'Microsoft (Phi)'
  if (t.includes('qwen')) return 'Alibaba'
  if (t.includes('kimi')) return 'Moonshot'
  if (t.includes('nova') || t.includes('titan')) return 'Amazon'
  if (t.includes('minimax')) return 'MiniMax'
  if (t.includes('mimo')) return 'Xiaomi'
  if (t.startsWith('tml') || t.includes('thinkingmachines')) return 'Thinking Machines'
  return model.split('-')[0] || ''
}
function barColor(company: string, model: string, colorConfig: LabsBrandColor[]) {
  const key = providerKey(company) ?? (model ? providerKey(orgFromModel(model)) : null) ?? company
  const hit = colorConfig.find((c) => c.code === key)?.color
  if (hit) return hit
  const sum = [...company].reduce((a, ch) => a + ch.charCodeAt(0), 0)
  return BRAND[sum % BRAND.length][1]
}

/* ---------- small pieces ---------- */
const CircleAlert = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`lucide lucide-circle-alert ${className ?? ''}`}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
)
const InfoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`lucide lucide-info ${className ?? ''}`}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
)

const MONO = s.mono

/* contamination wrapper `u` in module 41336: controlled tooltip, delay 0, click opens (and blocks the card link).
   Its children are the model name AND the NEW badge, so with a message both sit inside the button. */
function Contamination({ message, children }: { message: string; children: ReactNode }) {
  const provider = useTipProvider()
  const [open, setOpen] = useState(false)
  if (!message) return <>{children}</>
  return (
    <LabsTooltip provider={provider} delay={0} sideOffset={5} open={open} onOpenChange={setOpen} contentClassName="max-w-[calc(100vw-2rem)] w-[400px]" content={<p className="m-0">{message}</p>}>
      {({ ref, onClick, ...p }) => (
        <button
          type="button"
          ref={ref as React.Ref<HTMLButtonElement>}
          {...p}
          className="overflow-hidden text-left cursor-pointer text-[#525252] touch-manipulation bg-transparent border-0 p-0"
          onClick={(e) => {
            onClick()
            e.preventDefault()
            e.stopPropagation()
            setOpen(true)
          }}
        >
          <div className="flex items-center gap-2">
            {children}
            <CircleAlert className="shrink-0 inline-block w-4 h-4 mt-0.5" />
          </div>
        </button>
      )}
    </LabsTooltip>
  )
}

function ScoreEntry({ e, colorConfig }: { e: LabsScore; colorConfig: LabsBrandColor[] }) {
  const nameTip = useTipProvider()
  const barTip = useTipProvider()
  if (e.model === 'Unknown model') return null
  const h = e.rank
  const x = e.maxScore ?? 100
  const v = e.deprecated
  const ci = e.confidenceInterval_upper
  const ink = v ? 'var(--color-neutral-300, #d4d4d4)' : 'var(--color-ink)'
  const nameCls = `${MONO} text-[12px] leading-[1.5] min-w-0 m-0`
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 w-8">
        {!v && h <= 3 ? (
          <span
            className={`${MONO} inline-flex items-center justify-center w-8 h-8 rounded-full text-[12px] leading-[1.5] font-medium text-white ${h === 1 ? 'bg-[color:var(--color-ink)]' : h === 2 ? 'bg-[#525252]' : 'bg-[#a3a3a3]'}`}
          >
            {h}
          </span>
        ) : (
          <span className={`${MONO} text-[14px] leading-[1.5] tabular-nums ${v ? 'text-[#d4d4d4]' : 'text-[#a3a3a3]'}`}>{h}</span>
        )}
      </div>
      <div className="flex flex-col justify-between grow overflow-hidden">
        <div className="flex items-center align-bottom pb-0.5 gap-x-2 max-sm:flex-wrap h-[22px] max-sm:h-auto">
          <Contamination message={e.contaminationMessage}>
            {e.contaminationMessage || v ? (
              <p data-model-name="" className={`${nameCls} overflow-hidden text-ellipsis whitespace-nowrap ${v ? 'text-[#d4d4d4]' : 'text-[#525252]'}`} title={e.model}>
                {e.model}
              </p>
            ) : (
              <LabsTooltip provider={nameTip} delay={300} sideOffset={5} content={<p className="m-0">{e.model}</p>}>
                {({ ref, ...p }) => (
                  <p ref={ref as React.Ref<HTMLParagraphElement>} {...p} data-model-name="" className={`${nameCls} overflow-hidden text-ellipsis whitespace-nowrap text-[color:var(--color-ink)]`}>
                    {e.model}
                  </p>
                )}
              </LabsTooltip>
            )}
            {e.isNew ? (
              <span className="inline-flex items-center rounded-full border border-solid border-transparent py-0.5 font-semibold bg-[#e5e5e5] text-[#525252] text-[10px] tracking-[0.1em] uppercase leading-none px-2 max-sm:px-1 max-sm:tracking-[0.05em]">
                NEW
              </span>
            ) : null}
          </Contamination>
          <p className={`${MONO} ml-auto text-[12px] leading-[1.5] whitespace-nowrap space-x-1.5 max-sm:basis-full max-sm:text-right m-0`}>
            <span className={v ? 'text-[#d4d4d4]' : 'text-[color:var(--color-ink)]'}>{e.score.toFixed(2)}</span>
            {ci !== 0 && <span className={v ? 'text-[#d4d4d4]' : 'text-[#525252]'}>±{ci.toFixed(2)}</span>}
          </p>
        </div>
        <LabsTooltip
          provider={barTip}
          delay={300}
          content={
            <>
              {v && <p className="mb-2 mt-0 font-semibold text-[#d4d4d4]">Deprecated</p>}
              <p className="m-0">Score: {e.score}</p>
              {ci !== 0 && (
                <>
                  <p className="m-0">± {ci}</p>
                  <p className="m-0">
                    Range: {(e.score - ci).toFixed(2)} to {(e.score + ci).toFixed(2)}
                  </p>
                </>
              )}
            </>
          }
        >
          {({ ref, ...p }) => (
            <button ref={ref as React.Ref<HTMLButtonElement>} {...p} type="button" className="w-full block bg-transparent border-0 p-0 cursor-pointer">
              <div className="relative h-4 overflow-hidden bg-[#f5f5f5]">
                <div
                  className="absolute top-0 left-0 h-full"
                  style={{ width: `${((e.score / x) * 100).toFixed(2)}%`, backgroundColor: barColor(e.company, e.model, colorConfig), opacity: v ? 0.4 : 1 }}
                />
                {ci !== 0 && (
                  <>
                    <div
                      className="absolute top-1/2 h-0.5"
                      style={{ left: `${Math.max(0, ((e.score - ci) / x) * 100).toFixed(2)}%`, width: `${Math.min(100, ((2 * ci) / x) * 100).toFixed(2)}%`, transform: 'translateY(-50%)', backgroundColor: ink }}
                    />
                    <div className="absolute h-2 w-0.5" style={{ left: `${Math.max(0, ((e.score - ci) / x) * 100).toFixed(2)}%`, top: '50%', transform: 'translateY(-50%)', backgroundColor: ink }} />
                    <div className="absolute h-2 w-0.5" style={{ left: `${Math.min(100, ((e.score + ci) / x) * 100).toFixed(2)}%`, top: '50%', transform: 'translateY(-50%)', backgroundColor: ink }} />
                  </>
                )}
              </div>
            </button>
          )}
        </LabsTooltip>
      </div>
    </div>
  )
}

function boardHref(b: Board) {
  const h = `/leaderboard/${b.id}`
  return labsHref(b.tabKey ? `${h}?tab=${b.tabKey}` : h)
}

/* card qG */
function Card({ item, colorConfig }: { item: Board; colorConfig: LabsBrandColor[] }) {
  return (
    <a href={boardHref(item)} className="border border-solid border-[color:var(--color-hairline)] p-6 flex flex-col justify-between bg-white [@media(hover:hover){&:hover}]:bg-[#f5f5f5] group relative overflow-hidden no-underline text-inherit">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex gap-2 mb-2">
            {/* labs: e.Icon is dropped because lucide icons are forwardRef objects and labs keeps it only when typeof === "function" && e.Flag (country flag, grayscale) */}
            {item.icon && <Flag code={item.icon} className="w-5 h-5 mt-0.5 overflow-hidden rounded-[4px] grayscale" />}
            <h3 className="text-[14px] leading-[1.5] tracking-normal font-medium text-[color:var(--color-ink)] m-0">{item.name}</h3>
          </div>
          <p className="text-[12px] text-[#525252] leading-[1.625] m-0">{item.description}</p>
        </div>
        <div>
          {item.scores.length > 0 && (
            <div className="flex flex-col gap-3 mt-4 mb-4">
              {item.scores.slice(0, 3).map((e) => (
                <div key={e.model}>
                  <ScoreEntry e={e} colorConfig={colorConfig} />
                </div>
              ))}
            </div>
          )}
          <span className="text-[12px] leading-[1.5] text-[#525252] [@media(hover:hover){.group:hover_&}]:text-[color:var(--color-ink)] [@media(hover:hover){.group:hover_&}]:underline underline-offset-2">
            View Full Ranking <span style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>→</span>
          </span>
        </div>
      </div>
    </a>
  )
}

const GRID = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
const WRAP = 'mx-auto max-w-[1400px] px-6 lg:px-10'
const H2 = 'mb-3 mt-0 text-[14px] leading-[1.5] font-medium text-[color:var(--color-ink)] tracking-[0.025em]'
const P = 'text-[12px] leading-[1.625] text-[#525252] m-0'

/* Radix Tabs: automatic activation, roving focus with loop, Home/End, mouse-down selects */
function TabList({ value, onChange, tabs }: { value: Tab; onChange: (t: Tab, fromClick: boolean) => void; tabs: typeof TABS }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const key = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
    const n = tabs.length
    const to = { ArrowLeft: (i - 1 + n) % n, ArrowUp: (i - 1 + n) % n, ArrowRight: (i + 1) % n, ArrowDown: (i + 1) % n, Home: 0, PageUp: 0, End: n - 1, PageDown: n - 1 }[e.key]
    if (to === undefined) return
    e.preventDefault()
    setTimeout(() => refs.current[to]?.focus())
  }
  return (
    <div role="tablist" aria-orientation="horizontal" data-orientation="horizontal" className="inline-flex md:h-10 items-center justify-center text-[#71717a] p-1 bg-[#f5f5f5] border border-solid border-[color:var(--color-hairline)]" style={{ outline: 'none' }}>
      {tabs.map((t, i) => {
        const on = value === t.v
        return (
          <button
            key={t.v}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`lb-trigger-${t.v}`}
            aria-controls={`lb-content-${t.v}`}
            aria-selected={on}
            data-state={on ? 'active' : 'inactive'}
            tabIndex={on ? 0 : -1}
            onMouseDown={(e) => {
              if (e.button === 0 && !e.ctrlKey) onChange(t.v, false)
              else e.preventDefault()
            }}
            onFocus={() => !on && onChange(t.v, false)}
            onKeyDown={(e) => key(e, i)}
            onClick={() => onChange(t.v, true)}
            className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-[12px] leading-[1.5] font-medium border-0 cursor-pointer focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_#18181b] ${
              on ? 'bg-[color:var(--color-ink)] text-white shadow-[0_1px_2px_0_#0000000d]' : 'bg-transparent text-[#525252]'
            }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

function Switch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      id="show-deprecated"
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      value="on"
      onClick={onChange}
      className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-solid border-transparent p-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_#18181b] ${checked ? 'bg-[#18181b]' : 'bg-[#d9d9d9]'}`}
    >
      <span
        data-state={checked ? 'checked' : 'unchecked'}
        className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_10px_15px_-3px_#0000001a,0_4px_6px_-4px_#0000001a] ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  )
}

export default function LabsLeaderboard({ content }: { content: LabsLeaderboardContent }) {
  const { categories, colorConfig } = content
  const active = categories.filter((e) => !e.isSinglePage && !e.deprecated)
  const deprecated = categories.filter((e) => !e.isSinglePage && e.deprecated)
  const tabs = TABS.filter((t) => (t.v === 'all' ? active.length > 0 : active.some((e) => e.category === t.v)))
  const [tab, setTab] = useState<Tab>('all')
  const [showDep, setShowDep] = useState(false)
  const [evalOpen, setEvalOpen] = useState(false)
  const infoTip = useTipProvider()

  // labs reads ?category= on the server (Tabs defaultValue); the static clone reads it once on mount.
  useEffect(() => {
    const c = new URLSearchParams(location.search).get('category') || ''
    if (c === 'agentic' || c === 'safety' || c === 'frontier') setTab(c)
  }, [])

  const onTab = (t: Tab, fromClick: boolean) => {
    setTab(t)
    // TabsTrigger onClick: history.replaceState({category}, "", buildUrlWithCategory("", t))
    if (fromClick) window.history.replaceState({ ...window.history.state, category: t }, '', t === 'all' ? ROUTE : `${ROUTE}?category=${t}`)
  }

  const shown = tab === 'all' ? active : active.filter((e) => e.category === tab)

  return (
    <div className="text-[12px] leading-[1.5] text-[color:var(--color-ink)] relative">
      {/* hero qX */}
      <section className="w-full border-b border-solid border-[color:var(--color-hairline)] border-x-0 border-t-0">
        <div className={`${WRAP} py-16 md:py-20 lg:py-24`}>
          <h2 className="text-[12px] leading-[1.5] font-medium text-[color:var(--color-ink)] tracking-[0.025em] uppercase mb-10 mt-0">[LEADERBOARDS]</h2>
          <div className="flex flex-col lg:flex-row lg:gap-20">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-[36px] leading-[1.25] sm:text-[48px] md:text-[60px] font-light tracking-[-0.05em] text-[color:var(--color-ink)] mb-6 mt-0 [text-wrap:balance]">testing the limits of AI.</h1>
              <p className="text-[12px] text-[#525252] leading-[1.8] max-w-lg mb-8 mt-0">Benchmarks for frontier, agentic, and safety capabilities</p>
              <button
                type="button"
                onClick={() => document.getElementById('leaderboards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className={`${s.btn} bg-[color:var(--color-ink)] text-white text-[12px] leading-[1.5] uppercase tracking-[0.05em] rounded-none [@media(hover:hover){&:hover}]:opacity-75 h-10 px-4 py-2 border-0 cursor-pointer`}
              >
                Start Exploring
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-[320px] shrink-0 flex flex-row lg:flex-col gap-8">
              <div>
                <span className="text-[12px] leading-[1.5] text-[color:var(--color-ink-faint)] tracking-[0.025em] uppercase block mb-2">Benchmarks</span>
                <span className="text-[30px] leading-[1.5] font-light text-[color:var(--color-ink)] tracking-[-0.025em]">20+</span>
                <p className="text-[12px] text-[#525252] leading-[1.7] mt-2 mb-0">Including benchmarks on agentic coding, frontier reasoning, and safety alignment.</p>
              </div>
              <div className="border-solid border-0 border-l lg:border-l-0 lg:border-t border-[color:var(--color-hairline)] pl-8 lg:pl-0 lg:pt-8">
                <span className="text-[12px] leading-[1.5] text-[color:var(--color-ink-faint)] tracking-[0.025em] uppercase block mb-2">Models evaluated</span>
                <span className="text-[30px] leading-[1.5] font-light text-[color:var(--color-ink)] tracking-[-0.025em]">100+</span>
                <p className="text-[12px] text-[#525252] leading-[1.7] mt-2 mb-0">From leading AI labs including OpenAI, Anthropic, Google, Meta, and open-source contributors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* tabs + grid */}
      <div id="leaderboards" className="scroll-mt-20">
        <div className="border-0 border-t border-solid border-[#e5e5e5]" />
        <div dir="ltr" data-orientation="horizontal">
          <div className={`${WRAP} py-6`}>
            <TabList value={tab} onChange={onTab} tabs={tabs} />
          </div>
          <div data-state="active" data-orientation="horizontal" role="tabpanel" aria-labelledby={`lb-trigger-${tab}`} id={`lb-content-${tab}`} tabIndex={0} className="focus-visible:outline-none">
            <section id={tab} className={`w-full scroll-m-16 ${tab === 'all' ? 'pb-16' : ''}`}>
              <div className={WRAP}>
                <div className={GRID}>
                  {shown.map((e) => (
                    <Card key={e.tabKey ? `${e.id}-${e.tabKey}` : e.id} item={e} colorConfig={colorConfig} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* about qK */}
      <section className="w-full py-16 border-0 border-t border-solid border-[color:var(--color-hairline)]">
        <div className={WRAP}>
          <div className="grid w-full gap-8 md:grid-cols-3">
            <div>
              <MountainIcon className="w-5 h-5 mb-4 text-[#525252] block" />
              <h2 className={H2}>Frontier AI Model Evaluations &amp; Benchmarks</h2>
              <p className={P}>We conduct high-complexity evaluations to expose model failures, prevent benchmark saturation, and push model capabilities--while continuously evaluating the latest frontier models.</p>
            </div>
            <div>
              <PencilRulerIcon className="w-5 h-5 mb-4 text-[#525252] block" />
              <h2 className={H2}>Scaling with Human Expertise</h2>
              <p className={P}>Humans design complex evaluations and define precise criteria to assess models, while LLMs scale evaluations--ensuring efficiency and alignment with human judgment.</p>
            </div>
            <div>
              <ShieldIcon className="w-5 h-5 mb-4 text-[#525252] block" />
              <h2 className={H2}>Robust Datasets for Reliable AI Benchmarks</h2>
              <p className={P}>Our leaderboards are built on carefully curated evaluation sets, combining private datasets to prevent overfitting and open-source datasets for broad benchmarking and comparability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* deprecated br */}
      <section id="deprecated" className="w-full py-8">
        <div className={WRAP}>
          <div className="flex items-center justify-center w-full gap-2">
            <Switch checked={showDep} onChange={() => setShowDep((v) => !v)} />
            <label
              htmlFor="show-deprecated"
              className="font-medium text-[12px] leading-[1.5] text-[#525252] cursor-pointer"
              onMouseDown={(e) => {
                if (!(e.target as HTMLElement).closest('button, input, select, textarea') && e.detail > 1) e.preventDefault()
              }}
            >
              Show Deprecated Leaderboards
            </label>
            <LabsTooltip
              provider={infoTip}
              sideOffset={5}
              contentClassName="max-w-[calc(100vw-2rem)] w-[400px]"
              content={<p className="m-0 text-[14px] [text-wrap:balance]">As models advance, benchmarks must evolve. We&apos;re retiring the saturated legacy leaderboards and introducing new benchmarks targeting complex reasoning, robustness, and emerging AI capabilities.</p>}
            >
              {({ ref, onClick, ...p }) => (
                <button
                  ref={ref as React.Ref<HTMLButtonElement>}
                  {...p}
                  type="button"
                  aria-label="Information about deprecated leaderboards"
                  className="flex items-center bg-transparent border-0 p-0 cursor-pointer"
                  onClick={(e) => {
                    onClick()
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <InfoIcon className="w-4 h-4 text-[#525252] [@media(hover:hover){&:hover}]:text-[color:var(--color-ink)]" />
                </button>
              )}
            </LabsTooltip>
          </div>
          {showDep && (
            <div className={`${GRID} mt-12`}>
              {deprecated.map((e) => (
                <Card key={e.tabKey ? `${e.id}-${e.tabKey}` : e.id} item={e} colorConfig={colorConfig} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* evaluate bp */}
      <section className="w-full py-16 border-0 border-t border-solid border-[color:var(--color-hairline)]">
        <div className={WRAP}>
          <div className="border border-solid border-[color:var(--color-hairline)] p-8 flex flex-col items-center">
            <h2 className="mb-4 mt-0 text-[14px] leading-[1.5] font-medium text-[color:var(--color-ink)] tracking-[0.025em]">[EVALUATE YOUR MODEL]</h2>
            <p className="max-w-3xl mx-auto mb-6 mt-0 text-[12px] leading-[1.625] text-center text-[#525252]">
              If you&apos;d like to add your model to this leaderboard or a future version, please contact{' '}
              <a href="mailto:leaderboards@scale.com" className="text-[color:var(--color-ink)] underline [@media(hover:hover){&:hover}]:text-[#525252]">
                leaderboards@scale.com
              </a>
              . To ensure leaderboard integrity, we require that models can only be featured the FIRST TIME when an organization encounters the prompts.
            </p>
            <div className="flex items-center">
              <div>
                <button
                  type="button"
                  onClick={() => setEvalOpen(true)}
                  className={`${s.btn} bg-[color:var(--color-ink)] text-white text-[12px] leading-[1.5] uppercase tracking-[0.05em] rounded-none [@media(hover:hover){&:hover}]:opacity-75 h-10 px-4 py-2 border-0 cursor-pointer`}
                >
                  Evaluate your Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EvaluateDialog open={evalOpen} onOpenChange={setEvalOpen} />
    </div>
  )
}
