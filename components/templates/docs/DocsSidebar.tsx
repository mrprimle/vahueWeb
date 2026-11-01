'use client'

import { useRef, useState } from 'react'
import type { DocsContent, NavEntry } from './content'
import { Icon } from './icons'
import { resolveHref } from './links'
import s from './docs.module.css'

type Props = { content: DocsContent; onNavigate?: () => void }

// Mintlify sidebar (#navigation-items): an active first page, h3 group headers, and collapsible nested groups
// (button + rotate-90 chevron, 75ms transform). Shared by the desktop sidebar and the mobile drawer.
export function NavItems({ content, onNavigate }: Props) {
  return (
    <div id="navigation-items">
      {content.sidebar.map((section, i) =>
        section.title ? (
          <div key={i} className={s.sideSection}>
            <div className={s.sideHeader}>
              <h3 className={s.sideTitle}>
                <span>{section.title}</span>
              </h3>
            </div>
            <ul className={s.sideList}>
              {section.pages.map((e, j) => (
                <Entry key={j} entry={e} depth={0} content={content} onNavigate={onNavigate} />
              ))}
            </ul>
          </div>
        ) : (
          <ul key={i} className={s.sideList}>
            {section.pages.map((e, j) => (
              <Entry key={j} entry={e} depth={0} content={content} onNavigate={onNavigate} />
            ))}
          </ul>
        ),
      )}
    </div>
  )
}

function Entry({ entry, depth, content, onNavigate }: { entry: NavEntry; depth: number } & Props) {
  const [open, setOpen] = useState(entry.kind === 'group' ? entry.expanded !== false : false)
  const pad = { paddingLeft: depth ? 26.25 + (depth - 1) * 11.25 : 15 }
  if (entry.kind === 'group') {
    return (
      <li className={s.sideGroup}>
        <button type="button" className={s.sideItem} style={pad} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <div>
            <span>{entry.title}</span>
          </div>
          <div className={s.sideChevronWrap}>
            <Icon name="ChevronRight" strokeWidth={2} className={s.sideChevron} data-open={open || undefined} />
          </div>
        </button>
        {open && (
          <ul className={s.sideList}>
            {entry.pages.map((e, j) => (
              <Entry key={j} entry={e} depth={depth + 1} content={content} onNavigate={onNavigate} />
            ))}
          </ul>
        )}
      </li>
    )
  }
  const active = entry.href === content.activeHref
  return (
    <li id={entry.href} className={s.sideLi} data-active={active || undefined}>
      <a
        href={resolveHref(content, entry.href)}
        className={s.sideItem}
        style={pad}
        data-active={active || undefined}
        aria-current={active ? 'page' : undefined}
        onClick={onNavigate}
      >
        <div className={s.sideItemText}>
          <span>{entry.title}</span>
        </div>
      </a>
    </li>
  )
}

// Desktop sidebar: sticky under the navbar, its own scroll area with a 32px top fade and a hover/scroll scrollbar.
export default function DocsSidebar({ content }: Props) {
  const [scrolling, setScrolling] = useState(false)
  const timer = useRef(0)
  return (
    <nav aria-label="Pages" id="sidebar" className={s.sidebar}>
      <div
        className={s.sideScroll}
        data-scrolling={scrolling || undefined}
        onScroll={() => {
          setScrolling(true)
          window.clearTimeout(timer.current)
          timer.current = window.setTimeout(() => setScrolling(false), 500)
        }}
      >
        <div className={s.sideInner}>
          <div className={s.sideFade} />
          <NavItems content={content} />
        </div>
      </div>
    </nav>
  )
}
