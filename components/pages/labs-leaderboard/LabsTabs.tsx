'use client'

// labs.scale.com module 795322 over @radix-ui/react-tabs and react-roving-focus (chunk 37yhmp3ou6exv.js). Same behaviour without the dependency:
// mousedown and focus both select, Enter and Space select, arrows loop, Up and Down do nothing, Home and End jump, Shift+Tab leaves the list.
// `value` is held by the parent. Class strings verbatim, with ring-offset-white and ring-[hsl(0_0%_7%)] for the background and ring tokens.
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

const LIST = 'inline-flex md:h-10 items-center justify-center text-muted-foreground rounded-md p-1 bg-neutral-100 border border-hairline'
const TRIGGER =
  'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 font-medium ring-offset-white transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[hsl(0_0%_7%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-sm data-[state=active]:shadow-xs font-sans text-xs text-neutral-600 data-[state=active]:bg-ink data-[state=active]:text-white'
const PANEL = 'ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[hsl(0_0%_7%)] focus-visible:ring-offset-2'

export type LabsTab = { value: string; label: string; onClick?: () => void; panel: ReactNode }

const MOVES: Record<string, 'prev' | 'next' | 'first' | 'last'> = { ArrowLeft: 'prev', ArrowRight: 'next', PageUp: 'first', Home: 'first', PageDown: 'last', End: 'last' }

export function LabsTabs({ tabs, defaultValue }: { tabs: LabsTab[]; defaultValue: string }) {
  const [value, setValue] = useState(defaultValue)
  const [stop, setStop] = useState<string | null>(null)
  const [tabbingBack, setTabbingBack] = useState(false)
  const baseId = useId()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const mouseFocus = useRef(false)
  const firstFrame = useRef(true)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      firstFrame.current = false
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === ' ' || e.key === 'Enter') setValue(tabs[index].value)
    if (e.key === 'Tab' && e.shiftKey) {
      setTabbingBack(true)
      return
    }
    if (e.target !== e.currentTarget) return
    const move = MOVES[e.key]
    if (!move || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
    e.preventDefault()
    const n = tabs.length
    const next = move === 'first' ? 0 : move === 'last' ? n - 1 : move === 'next' ? (index + 1) % n : (index - 1 + n) % n
    setTimeout(() => buttons.current[next]?.focus())
  }

  return (
    <div dir="ltr" data-orientation="horizontal">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6">
        <div
          role="tablist"
          aria-orientation="horizontal"
          data-orientation="horizontal"
          className={LIST}
          tabIndex={tabbingBack ? -1 : 0}
          style={{ outline: 'none' }}
          onMouseDown={() => {
            mouseFocus.current = true
          }}
          onFocus={(e) => {
            const fromKeyboard = !mouseFocus.current
            if (e.target === e.currentTarget && fromKeyboard && !tabbingBack) {
              const active = tabs.findIndex((t) => t.value === value)
              buttons.current[active]?.focus()
            }
            mouseFocus.current = false
          }}
          onBlur={() => setTabbingBack(false)}
        >
          {tabs.map((t, i) => {
            const selected = t.value === value
            return (
              <button
                key={t.value}
                ref={(node) => {
                  buttons.current[i] = node
                }}
                type="button"
                role="tab"
                id={`${baseId}-trigger-${t.value}`}
                aria-selected={selected}
                aria-controls={`${baseId}-content-${t.value}`}
                data-state={selected ? 'active' : 'inactive'}
                data-orientation="horizontal"
                tabIndex={stop === t.value ? 0 : -1}
                className={TRIGGER}
                onClick={t.onClick}
                onMouseDown={(e) => {
                  setStop(t.value)
                  if (e.button === 0 && !e.ctrlKey) setValue(t.value)
                  else e.preventDefault()
                }}
                onFocus={() => {
                  setStop(t.value)
                  if (!selected) setValue(t.value)
                }}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>
      {tabs.map((t) => {
        const selected = t.value === value
        return (
          <div
            key={t.value}
            role="tabpanel"
            id={`${baseId}-content-${t.value}`}
            aria-labelledby={`${baseId}-trigger-${t.value}`}
            data-state={selected ? 'active' : 'inactive'}
            data-orientation="horizontal"
            hidden={!selected}
            tabIndex={0}
            className={PANEL}
            style={selected && firstFrame.current ? { animationDuration: '0s' } : undefined}
          >
            {selected ? t.panel : null}
          </div>
        )
      })}
    </div>
  )
}
