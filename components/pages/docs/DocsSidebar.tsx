'use client'

// Sidebar and its Base UI ScrollArea. On Scale a group row toggles open with no height animation and the chevron
// turns in .15s. Clicking a closed group also opens its first page (seen on /docs: the second click lands on
// /docs/pro-or-manage-account).
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronRightIcon } from './DocsIcons'
import type { ResolvedPage } from './DocsNav'
import type { DocsContent, DocsGroupNode, DocsPageNode } from './content.types'

function PageRow({ node, active, child, tag }: { node: DocsPageNode; active: boolean; child?: boolean; tag: string }) {
  return (
    <li data-title={node.title} id={node.href}>
      <Link href={node.href} className={`docs-row${child ? ' docs-row-child' : ''}`} data-active={active} aria-current={active ? 'page' : undefined}>
        <span className="docs-row-label">
          <span>{node.title}</span>
          {node.placeholder && !node.quietTag ? <span className="docs-tag">{tag}</span> : null}
        </span>
      </Link>
    </li>
  )
}

function GroupRow({ node, activeHref, tag }: { node: DocsGroupNode; activeHref: string; tag: string }) {
  const router = useRouter()
  const hasActive = node.items.some((i) => i.href === activeHref)
  const [open, setOpen] = useState(true)
  useEffect(() => {
    if (hasActive) setOpen(true)
  }, [hasActive])
  return (
    <li data-title={node.title}>
      <button
        type="button"
        className="docs-row docs-row-group"
        aria-expanded={open}
        onClick={() => {
          if (open) setOpen(false)
          else {
            setOpen(true)
            if (node.items[0] && !hasActive) router.push(node.items[0].href)
          }
        }}
      >
        <span className="docs-row-label">{node.title}</span>
        <span className="docs-row-chev">
          <ChevronRightIcon strokeWidth={2} preserveAspectRatio="xMidYMid meet" />
        </span>
      </button>
      {open ? (
        <ul className="docs-nav-sub">
          {node.items.map((item) => (
            <PageRow key={item.href} node={item} active={item.href === activeHref} child tag={tag} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function DocsNavTree({ content, page, fade = true }: { content: DocsContent; page: ResolvedPage; fade?: boolean }) {
  const tab = content.tabs[page.tabIndex]
  return (
    <div className="docs-nav">
      {fade ? <div className="docs-nav-fade" /> : null}
      <div id="navigation-items">
        {tab.sections.map((section, s) => (
          <div key={`${section.title ?? 'top'}-${s}`} className={section.title && s > 0 ? 'docs-nav-section' : undefined}>
            {section.title ? (
              <div className="docs-nav-section-head sidebar-group-header">
                <h3 className="sidebar-title">
                  <span>{section.title}</span>
                </h3>
              </div>
            ) : null}
            <ul className="docs-nav-list">
              {section.items.map((item) =>
                item.kind === 'page' ? (
                  <PageRow key={item.href} node={item} active={item.href === page.href} tag={content.ui.placeholderTag} />
                ) : (
                  <GroupRow key={item.title} node={item} activeHref={page.href} tag={content.ui.placeholderTag} />
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DocsSidebar({ content, page }: { content: DocsContent; page: ResolvedPage }) {
  const root = useRef<HTMLDivElement>(null)
  const view = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState({ top: 0, height: 0, overflow: false })
  const [hovering, setHovering] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = view.current
    if (!el) return
    const measure = () => {
      const trackLength = el.clientHeight - 30
      const ratio = el.clientHeight / el.scrollHeight
      const height = Math.max(trackLength * ratio, 16)
      const max = el.scrollHeight - el.clientHeight
      const top = max > 0 ? (el.scrollTop / max) * (trackLength - height) : 0
      setMetrics({ top, height, overflow: max > 0 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    const onScroll = () => {
      measure()
      setScrolling(true)
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
      scrollTimer.current = setTimeout(() => setScrolling(false), 500)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', onScroll)
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
    }
  }, [])

  // Scale's inline script brings the active row into the sidebar's view on load.
  useEffect(() => {
    const el = view.current?.querySelector<HTMLElement>('[aria-current="page"]')
    const box = view.current
    if (!el || !box) return
    const a = el.getBoundingClientRect()
    const b = box.getBoundingClientRect()
    if (a.bottom > b.bottom - 40 || a.top < b.top + 30) box.scrollTop += a.top - b.top - b.height / 2
  }, [page.href])

  const dragThumb = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = view.current
    if (!el) return
    e.preventDefault()
    const startY = e.clientY
    const startTop = el.scrollTop
    const track = el.clientHeight - 30 - metrics.height
    const max = el.scrollHeight - el.clientHeight
    const move = (ev: PointerEvent) => {
      if (track > 0) el.scrollTop = startTop + ((ev.clientY - startY) / track) * max
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <nav aria-label="Pages" className="docs-sidebar" id="sidebar">
      <div ref={root} className="docs-scroll" id="sidebar-content" onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
        <div ref={view} className="docs-scroll-view" tabIndex={0}>
          <DocsNavTree content={content} page={page} />
        </div>
        {metrics.overflow ? (
          <div className="docs-scrollbar" data-hovering={hovering} data-scrolling={scrolling}>
            <div className="docs-scrollbar-thumb" onPointerDown={dragThumb} style={{ height: metrics.height, transform: `translateY(${metrics.top}px)`, alignSelf: 'flex-start' }} />
          </div>
        ) : null}
      </div>
    </nav>
  )
}
