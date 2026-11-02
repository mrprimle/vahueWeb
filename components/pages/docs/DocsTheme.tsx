'use client'

// Theme preference: `isDarkMode` in localStorage (light, dark or system), as Mintlify stores it. Light by default.
// Trigger and menu: Base UI Menu on Scale, side bottom, align end, 2.5px offset.
import { type RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronRightIcon, ThemeDarkIcon, ThemeLightIcon, ThemeSystemIcon } from './DocsIcons'
import type { DocsContent } from './content.types'

export type ThemePreference = 'system' | 'light' | 'dark'

const readStored = (): ThemePreference => {
  try {
    const raw = localStorage.getItem('isDarkMode')
    if (raw === 'true' || raw === 'dark') return 'dark'
    if (raw === 'false' || raw === 'light') return 'light'
    if (raw === 'system') return 'system'
  } catch {
    /* private window */
  }
  return 'light'
}

const systemMode = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

export function useDocsTheme(rootRef: RefObject<HTMLDivElement | null>) {
  const [preference, setPreferenceState] = useState<ThemePreference>('light')
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  useLayoutEffect(() => {
    const p = readStored()
    setPreferenceState(p)
    setMode(p === 'system' ? systemMode() : p)
  }, [])

  useLayoutEffect(() => {
    rootRef.current?.setAttribute('data-mode', mode)
  }, [mode, rootRef])

  useEffect(() => {
    if (preference !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const on = () => setMode(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [preference])

  const setPreference = useCallback((p: ThemePreference) => {
    setPreferenceState(p)
    setMode(p === 'system' ? systemMode() : p)
    try {
      localStorage.setItem('isDarkMode', p)
    } catch {
      /* private window */
    }
  }, [])

  return { preference, mode, setPreference }
}

export const THEME_ICONS = { system: ThemeSystemIcon, light: ThemeLightIcon, dark: ThemeDarkIcon }

const OPTIONS: ThemePreference[] = ['system', 'light', 'dark']

export function DocsThemeMenu({
  content,
  preference,
  onChange,
}: {
  content: DocsContent
  preference: ThemePreference
  onChange: (p: ThemePreference) => void
}) {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ right: 0, top: 0 })
  const [highlight, setHighlight] = useState<number>(-1)
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const [portal, setPortal] = useState<HTMLElement | null>(null)

  const show = () => {
    const box = trigger.current?.getBoundingClientRect()
    if (box) setPosition({ right: window.innerWidth - box.right, top: box.bottom + 2.5 })
    setHighlight(-1)
    setPortal(trigger.current?.closest<HTMLElement>('.docs-root') ?? document.body)
    setMounted(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
  }
  const hide = useCallback(() => {
    setOpen(false)
    setTimeout(() => setMounted(false), 100)
  }, [])

  useEffect(() => {
    if (!mounted) return
    menu.current?.focus()
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (menu.current?.contains(t) || trigger.current?.contains(t)) return
      hide()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [mounted, hide])

  const choose = (p: ThemePreference) => {
    onChange(p)
    hide()
    trigger.current?.focus()
  }

  const labels = { system: content.ui.themeSystem, light: content.ui.themeLight, dark: content.ui.themeDark }
  const Icon = THEME_ICONS[preference]

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="docs-theme-trigger"
        id="theme-preference-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change theme preference"
        onClick={() => (mounted ? hide() : show())}
      >
        <Icon />
      </button>
      {mounted && portal
        ? createPortal(
            <div
              ref={menu}
              role="menu"
              tabIndex={-1}
              id="theme-preference-menu-content"
              aria-labelledby="theme-preference-menu-trigger"
              className="docs-menu"
              data-state={open ? 'open' : 'closed'}
              style={{ right: position.right, top: position.top }}
              onMouseLeave={() => setHighlight(-1)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault()
                  hide()
                  trigger.current?.focus()
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setHighlight((h) => (h + 1) % OPTIONS.length)
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setHighlight((h) => (h <= 0 ? OPTIONS.length - 1 : h - 1))
                } else if ((e.key === 'Enter' || e.key === ' ') && highlight >= 0) {
                  e.preventDefault()
                  choose(OPTIONS[highlight])
                }
              }}
            >
              {OPTIONS.map((p, i) => {
                const ItemIcon = THEME_ICONS[p]
                const active = p === preference
                return (
                  <div
                    key={p}
                    role="menuitem"
                    tabIndex={-1}
                    id={`theme-preference-menu-item-${p}`}
                    className="docs-menu-item"
                    data-active={active}
                    data-highlighted={i === highlight && !active}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => choose(p)}
                  >
                    <span>
                      <ItemIcon />
                      <span>{labels[p]}</span>
                    </span>
                    <span className="docs-sr">Switch to {p} theme</span>
                    {active ? <CheckIcon /> : null}
                  </div>
                )
              })}
            </div>,
            portal,
          )
        : null}
    </>
  )
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3.5 9.5L7.5 13.5L14.5 4.5" />
    </svg>
  )
}

export { ChevronRightIcon }
