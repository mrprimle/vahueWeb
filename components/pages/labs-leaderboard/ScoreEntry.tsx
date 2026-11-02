'use client'

// labs.scale.com module 41336 (LeaderboardScoreEntry), the `expandNames: false` branch the cards use. Class strings verbatim.
import { CircleAlert } from 'lucide-react'
import { cn } from '@/components/site/lib/cn'
import { LabsTooltip } from './LabsTooltip'
import type { LeaderboardContent, LeaderboardScore } from './types'

const INK = 'var(--color-ink)'
const FADED = 'var(--color-neutral-300)'

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border py-0.5 font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-[hsl(0_0%_7%)] focus:ring-offset-2 border-transparent bg-neutral-200 text-neutral-600 text-[10px] tracking-widest uppercase leading-none px-2 max-sm:px-1 max-sm:tracking-wider">
      {children}
    </span>
  )
}

export function ScoreEntry({ entry: e, labels }: { entry: LeaderboardScore; labels: LeaderboardContent['card'] }) {
  const max = e.maxScore ?? 100
  const dep = e.deprecated
  const whisker = dep ? FADED : INK
  const low = Math.max(0, ((e.score - e.ci) / max) * 100).toFixed(2)
  const high = Math.min(100, ((e.score + e.ci) / max) * 100).toFixed(2)
  const plain = e.message || dep
  const name = plain ? (
    <p data-model-name="true" title={e.model} className={cn('text-xs font-mono min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', dep ? 'text-neutral-300' : 'text-neutral-600')}>
      {e.model}
    </p>
  ) : (
    <LabsTooltip delayDuration={300} sideOffset={5} content={<p>{e.model}</p>}>
      {(props) => (
        <p {...(props as object)} data-model-name="true" className="text-xs font-mono overflow-hidden text-ellipsis whitespace-nowrap min-w-0 text-ink">
          {e.model}
        </p>
      )}
    </LabsTooltip>
  )
  const badge = e.isNew ? <Badge>{labels.newBadge}</Badge> : null

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 w-8">
        {!dep && e.rank <= 3 ? (
          <span className={cn('inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-mono font-medium', e.rank === 1 && 'bg-ink text-white', e.rank === 2 && 'bg-neutral-600 text-white', e.rank === 3 && 'bg-neutral-400 text-white')}>{e.rank}</span>
        ) : (
          <span className={cn('text-sm font-mono tabular-nums', dep ? 'text-neutral-300' : 'text-neutral-400')}>{e.rank}</span>
        )}
      </div>
      <div className="flex flex-col justify-between grow overflow-hidden">
        <div className="flex items-center align-bottom pb-0.5 gap-x-2 max-sm:flex-wrap h-[22px] max-sm:h-auto">
          {e.message ? (
            <LabsTooltip
              delayDuration={0}
              sideOffset={5}
              className="max-w-[calc(100vw-2rem)] w-[400px] z-50"
              content={<p>{e.message}</p>}
              onTriggerClick={(ev, open) => {
                ev.preventDefault()
                ev.stopPropagation()
                open()
              }}
            >
              {(props) => (
                <button {...(props as object)} type="button" className="overflow-hidden text-left cursor-pointer text-neutral-600 touch-manipulation">
                  <div className="flex items-center gap-2">
                    {name}
                    {badge}
                    <CircleAlert className="shrink-0 inline-block w-4 h-4 mt-0.5" />
                  </div>
                </button>
              )}
            </LabsTooltip>
          ) : (
            <>
              {name}
              {badge}
            </>
          )}
          <p className="ml-auto text-xs font-mono text-nowrap space-x-1.5 max-sm:basis-full max-sm:text-right">
            <span className={dep ? 'text-neutral-300' : 'text-ink'}>{e.score.toFixed(2)}</span>
            {e.ci !== 0 ? (
              <span className={dep ? 'text-neutral-300' : 'text-neutral-600'}>
                ±{e.ci.toFixed(2)}
              </span>
            ) : null}
          </p>
        </div>
        <LabsTooltip
          delayDuration={300}
          content={
            <>
              {dep ? <p className="mb-2 font-semibold text-neutral-300">{labels.deprecated}</p> : null}
              <p>
                {labels.score} {e.score}
              </p>
              {e.ci !== 0 ? (
                <>
                  <p>± {e.ci}</p>
                  <p>
                    {labels.range} {(e.score - e.ci).toFixed(2)} {labels.to} {(e.score + e.ci).toFixed(2)}
                  </p>
                </>
              ) : null}
            </>
          }
        >
          {(props) => (
            <button {...(props as object)} className="w-full">
              <div className="relative h-4 overflow-hidden bg-neutral-100 rounded-sm">
                <div className="absolute top-0 left-0 h-full transition-all duration-1000 rounded-r-sm" style={{ width: `${((e.score / max) * 100).toFixed(2)}%`, backgroundColor: e.color, opacity: dep ? 0.4 : 1 }} />
                {e.ci !== 0 ? (
                  <>
                    <div className="absolute top-1/2 h-0.5" style={{ left: `${low}%`, width: `${Math.min(100, ((2 * e.ci) / max) * 100).toFixed(2)}%`, transform: 'translateY(-50%)', backgroundColor: whisker }} />
                    <div className="absolute h-2 w-0.5" style={{ left: `${low}%`, top: '50%', transform: 'translateY(-50%)', backgroundColor: whisker }} />
                    <div className="absolute h-2 w-0.5" style={{ left: `${high}%`, top: '50%', transform: 'translateY(-50%)', backgroundColor: whisker }} />
                  </>
                ) : null}
              </div>
            </button>
          )}
        </LabsTooltip>
      </div>
    </div>
  )
}
