'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon, type IconName } from './icons'
import type { ThemePref } from './links'
import { usePresence } from './usePresence'
import s from './docs.module.css'

export const THEME_OPTIONS: { value: ThemePref; label: string; icon: IconName }[] = [
  { value: 'system', label: 'System', icon: 'ThemeSystem' },
  { value: 'light', label: 'Light', icon: 'ThemeLight' },
  { value: 'dark', label: 'Dark', icon: 'ThemeDark' },
]

/*
 * Navbar theme preference menu (Base UI Menu, side bottom / align end). Popup: 100ms ease-out scale .95 + fade.
 * The trigger shows the current preference's icon; all three are rendered and toggled by the root's
 * [data-theme-preference] so SSR and the boot script agree.
 */
export default function DocsThemeMenu({ pref, onChange }: { pref: ThemePref; onChange: (p: ThemePref) => void }) {
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(-1)
  const { mounted, attrs } = usePresence(open, 100)
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!menu.current?.contains(e.target as Node) && !trigger.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    menu.current?.focus()
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open, mounted])

  const close = (refocus = true) => {
    setOpen(false)
    setHi(-1)
    if (refocus) trigger.current?.focus()
  }
  const choose = (v: ThemePref) => {
    onChange(v)
    close()
  }

  return (
    <div className={s.themeWrap}>
      <button
        ref={trigger}
        type="button"
        id="theme-preference-menu-trigger"
        aria-label="Change theme preference"
        aria-haspopup="menu"
        aria-expanded={open}
        className={s.themeTrigger}
        onClick={(e) => {
          setOpen((v) => !v)
          // keyboard activation (Enter / Space -> click with detail 0) highlights the first item, as Base UI does
          setHi(e.detail === 0 ? 0 : -1)
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
            setHi(0)
          }
        }}
      >
        {THEME_OPTIONS.map((o) => (
          <span key={o.value} className={s.themeTriggerIcon} data-pref={o.value}>
            <Icon name={o.icon} />
          </span>
        ))}
      </button>
      {mounted && (
        <div
          ref={menu}
          role="menu"
          tabIndex={-1}
          id="theme-preference-menu-content"
          aria-labelledby="theme-preference-menu-trigger"
          className={s.themeMenu}
          {...attrs}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Tab') close(e.key === 'Escape')
            else if (e.key === 'ArrowDown') {
              e.preventDefault()
              setHi((h) => (h + 1) % 3)
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setHi((h) => (h + 2) % 3)
            } else if ((e.key === 'Enter' || e.key === ' ') && hi >= 0) {
              e.preventDefault()
              choose(THEME_OPTIONS[hi].value)
            }
          }}
        >
          {THEME_OPTIONS.map((o, i) => (
            <div
              key={o.value}
              role="menuitem"
              tabIndex={-1}
              className={s.themeItem}
              data-active={pref === o.value || undefined}
              data-highlighted={hi === i || undefined}
              onMouseMove={() => setHi(i)}
              onMouseLeave={() => setHi(-1)}
              onClick={() => choose(o.value)}
            >
              <div className={s.themeItemLabel}>
                <Icon name={o.icon} className={s.themeItemIcon} />
                <span>{o.label}</span>
              </div>
              <span className={s.srOnly}>Switch to {o.value} theme</span>
              <Icon name="Check" strokeWidth={2.5} className={s.themeCheck} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/** Mobile-drawer variant: a 3-way pill switch (System / Light / Dark) with a sliding thumb. */
export function ThemePill({ pref, onChange }: { pref: ThemePref; onChange: (p: ThemePref) => void }) {
  const idx = THEME_OPTIONS.findIndex((o) => o.value === pref)
  return (
    <div role="group" aria-label="Theme preference" className={s.themePill}>
      <span className={s.themePillThumb} style={{ transform: `translateX(${idx * 100}%)` }} aria-hidden="true" />
      {THEME_OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-label={`Switch to ${o.value} theme`}
          aria-pressed={pref === o.value}
          className={s.themePillBtn}
          onClick={() => onChange(o.value)}
        >
          <Icon name={o.icon} />
        </button>
      ))}
    </div>
  )
}
