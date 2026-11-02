'use client'

// Left drawer below 1024: Base UI Drawer on Scale, id mobile-nav. Slides in .45s `cubic-bezier(.32,.72,0,1)`, out .4s,
// backdrop black at 40% scaled by the swipe. Theme pill, tab dropdown, then the same tree as the sidebar.
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronRightIcon, CloseIcon } from './DocsIcons'
import type { ResolvedPage } from './DocsNav'
import { DocsLogo } from './DocsShell'
import { DocsNavTree } from './DocsSidebar'
import { CheckIcon, THEME_ICONS, type ThemePreference } from './DocsTheme'
import type { DocsContent } from './content.types'

const OPTIONS: ThemePreference[] = ['system', 'light', 'dark']

export function DocsMobileNav({
  open,
  onClose,
  content,
  page,
  preference,
  onTheme,
}: {
  open: boolean
  onClose: () => void
  content: DocsContent
  page: ResolvedPage
  preference: ThemePreference
  onTheme: (p: ThemePreference) => void
}) {
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const [drag, setDrag] = useState(0)
  const [tabsOpen, setTabsOpen] = useState(false)
  const start = useRef<{ x: number; t: number } | null>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
      const html = document.documentElement
      const prev = html.style.overflow
      html.style.overflow = 'hidden'
      return () => {
        cancelAnimationFrame(raf)
        html.style.overflow = prev
      }
    }
    setShown(false)
    setTabsOpen(false)
    const t = setTimeout(() => setMounted(false), 400)
    return () => clearTimeout(t)
  }, [open])

  if (!mounted) return null
  const width = panel.current?.offsetWidth ?? 375
  const progress = Math.min(1, drag / Math.max(1, width - 45))
  const tab = content.tabs[page.tabIndex]
  const portalTarget = document.querySelector('.docs-root') ?? document.body
  return createPortal(
    <div
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          if (tabsOpen) setTabsOpen(false)
          else onClose()
        }
      }}
    >
      <div className="docs-drawer-backdrop" data-state={shown ? 'open' : 'closed'} data-swiping={drag > 0} style={{ '--swipe': progress } as React.CSSProperties} />
      <div className="docs-drawer-layer" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div
          ref={panel}
          id="mobile-nav"
          role="dialog"
          aria-label={content.ui.navigation}
          tabIndex={-1}
          className="docs-mobile-nav"
          data-state={shown ? 'open' : 'closed'}
          data-swiping={drag > 0}
          style={drag > 0 ? { transform: `translateX(${-drag}px)` } : undefined}
          onPointerDown={(e) => {
            if (e.pointerType === 'mouse') return
            start.current = { x: e.clientX, t: performance.now() }
          }}
          onPointerMove={(e) => {
            if (start.current) setDrag(Math.max(0, start.current.x - e.clientX))
          }}
          onPointerUp={(e) => {
            if (!start.current) return
            const dx = start.current.x - e.clientX
            const v = dx / Math.max(1, performance.now() - start.current.t)
            start.current = null
            setDrag(0)
            if (dx > (width - 45) / 2 || v > 0.5) onClose()
          }}
          onPointerCancel={() => {
            start.current = null
            setDrag(0)
          }}
        >
          <button type="button" className="docs-mobile-close" aria-label="Close navigation" onClick={onClose}>
            <CloseIcon strokeWidth={2} />
          </button>
          <div className="docs-mobile-scroll">
            <div className="docs-mobile-view" tabIndex={0}>
              <div className="docs-mobile-top">
                <DocsLogo content={content} />
                <div role="group" aria-label="Theme preference" className="docs-pill">
                  {OPTIONS.map((p) => {
                    const Icon = THEME_ICONS[p]
                    return (
                      <button key={p} type="button" aria-label={`Switch to ${p} theme`} aria-pressed={p === preference} onClick={() => onTheme(p)}>
                        <Icon />
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="docs-mobile-tabs">
                <button type="button" className="docs-mobile-tabs-trigger" aria-haspopup="menu" aria-expanded={tabsOpen} onClick={() => setTabsOpen((v) => !v)}>
                  <span>{tab.label}</span>
                  <ChevronRightIcon strokeWidth={2} />
                </button>
                {tabsOpen ? (
                  <div role="menu" className="docs-mobile-tabs-menu">
                    {content.tabs.map((t, i) => (
                      <Link key={t.label} href={t.href} data-active={i === page.tabIndex} aria-current={i === page.tabIndex ? 'location' : undefined} onClick={onClose}>
                        {t.label}
                        {i === page.tabIndex ? <CheckIcon /> : null}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
              <DocsNavTree content={content} page={page} fade={false} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalTarget,
  )
}
