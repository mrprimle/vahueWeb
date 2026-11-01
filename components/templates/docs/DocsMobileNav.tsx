'use client'

import { useEffect, useRef, useState } from 'react'
import type { DocsContent } from './content'
import { NavItems } from './DocsSidebar'
import { ThemePill } from './DocsThemeMenu'
import { Icon } from './icons'
import { resolveHref, type ThemePref } from './links'
import { usePresence } from './usePresence'
import s from './docs.module.css'

/*
 * Mobile navigation (Base UI Drawer, swipe direction left): 85dvw clamped to 19-22rem, 3rem bleed, slides in over
 * 450ms cubic-bezier(0.32,0.72,0,1) with a black/40 backdrop whose opacity follows the swipe. Holds the logo, the
 * theme pill, a tab switcher menu and the full sidebar. Swipe left past 25% (or a fast flick) / Escape / backdrop
 * click closes it.
 */
export default function DocsMobileNav({
  content,
  open,
  onClose,
  pref,
  onPref,
}: {
  content: DocsContent
  open: boolean
  onClose: () => void
  pref: ThemePref
  onPref: (p: ThemePref) => void
}) {
  const { mounted, attrs } = usePresence(open, 400)
  const [dx, setDx] = useState(0)
  const [tabsOpen, setTabsOpen] = useState(false)
  const drag = useRef<{ x: number; y: number; t: number; locked?: boolean } | null>(null)
  const panel = useRef<HTMLDivElement>(null)
  const swiped = useRef(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const html = document.documentElement
    const overflow = html.style.overflow
    html.style.overflow = 'hidden'
    panel.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      html.style.overflow = overflow
    }
  }, [open, mounted, onClose])

  if (!mounted) return null
  const w = panel.current?.offsetWidth ?? 1
  const progress = Math.min(1, -dx / w)
  const active = content.tabs.find((t) => t.active) ?? content.tabs[0]

  return (
    <div className={s.drawerRoot}>
      <div className={s.drawerBackdrop} {...attrs} style={{ ['--swipe' as string]: progress }} onClick={onClose} />
      <div className={s.drawerLeftPos}>
        <div
          ref={panel}
          id="mobile-nav"
          role="dialog"
          aria-label="Navigation"
          tabIndex={-1}
          className={s.drawerLeft}
          data-swiping={drag.current?.locked ? '' : undefined}
          style={{ ['--dx' as string]: `${dx}px` }}
          {...attrs}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={(e) => {
            // a swipe that ends over a link must not follow it
            if (swiped.current) {
              e.preventDefault()
              e.stopPropagation()
              swiped.current = false
            }
          }}
          onPointerDown={(e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return
            drag.current = { x: e.clientX, y: e.clientY, t: performance.now() }
          }}
          onPointerMove={(e) => {
            const d = drag.current
            if (!d) return
            const mx = e.clientX - d.x
            if (!d.locked) {
              if (Math.abs(mx) > 8 && Math.abs(mx) > Math.abs(e.clientY - d.y)) d.locked = true
              else return
            }
            setDx(Math.min(0, mx))
          }}
          onPointerUp={(e) => {
            const d = drag.current
            drag.current = null
            if (!d?.locked) return
            swiped.current = true
            window.setTimeout(() => (swiped.current = false), 0)
            const v = (d.x - e.clientX) / Math.max(1, performance.now() - d.t)
            if (-dx > w * 0.25 || v > 0.5) onClose()
            setDx(0)
          }}
          onPointerCancel={() => {
            drag.current = null
            setDx(0)
          }}
        >
          <button type="button" aria-label="Close navigation" className={s.drawerClose} onClick={onClose}>
            <Icon name="Close" className={s.drawerCloseIcon} />
          </button>
          <div className={s.drawerScroll}>
            <div className={s.drawerTop}>
              <a href={resolveHref(content, content.localPrefix.from)} className={s.logoLink}>
                <span className={s.srOnly}>{content.siteName} home page</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={`${s.logoImg} ${s.logoLight} ${s.logoDrawer}`} src={content.logo.light} alt={`light ${content.logo.alt}`} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={`${s.logoImg} ${s.logoDark} ${s.logoDrawer}`} src={content.logo.dark} alt={`dark ${content.logo.alt}`} />
              </a>
              <ThemePill pref={pref} onChange={onPref} />
            </div>
            <div className={s.drawerNav}>
              <div className={s.drawerTabs}>
                <button type="button" aria-haspopup="menu" aria-expanded={tabsOpen} className={s.drawerTabBtn} onClick={() => setTabsOpen((v) => !v)}>
                  <span>{active.label}</span>
                  <Icon name="ChevronRight" strokeWidth={2} className={s.drawerTabChevron} data-open={tabsOpen || undefined} />
                </button>
                {tabsOpen && (
                  <div role="menu" className={s.drawerTabMenu}>
                    {content.tabs.map((t) => (
                      <a key={t.label} role="menuitem" href={resolveHref(content, t.href)} className={s.drawerTabItem} data-active={t.active || undefined} onClick={() => setTabsOpen(false)}>
                        <span>{t.label}</span>
                        {t.active && <Icon name="Check" strokeWidth={2.5} className={s.drawerTabCheck} />}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <NavItems content={content} onNavigate={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
