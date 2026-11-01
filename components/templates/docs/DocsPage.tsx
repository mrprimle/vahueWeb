'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import type { DocsContent } from './content'
import DocsSidebar from './DocsSidebar'
import DocsSearch from './DocsSearch'
import DocsThemeMenu from './DocsThemeMenu'
import DocsMobileNav from './DocsMobileNav'
import DocsLogo from './DocsLogo'
import { AssistantDrawer, AssistantSheet, FloatingAsk, SHEET_W, type ChatMessage } from './DocsAssistant'
import { Icon, MagnifyingGlass } from './icons'
import { readThemePref, resolveHref, THEME_BOOT_SCRIPT, THEME_KEY, type ThemePref } from './links'
import s from './docs.module.css'

/*
 * 1:1 clone of the scale.com/docs landing: a Mintlify ("mint" theme) site proxied at scale.com/docs
 * (canonical https://api-reference.scale.com/docs). Static snapshot of the landing page only; navigation into the
 * rest of the docs tree goes to the live site. Spec: reference-snapshots/scale-clone/docs.md
 */

const MOBILE_MQ = '(max-width: 1024px)'

function useMedia(q: string) {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mq = matchMedia(q)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

export default function DocsPage({ content }: { content: DocsContent }) {
  // Theme preference (light default, as Scale's docs.json `appearance.default`). Lazy-read so the client's first
  // render already matches what the boot script painted.
  const [pref, setPref] = useState<ThemePref>(() => (typeof window === 'undefined' ? 'light' : readThemePref()))
  const [systemDark, setSystemDark] = useState(() => typeof window !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches)
  const theme = pref === 'system' ? (systemDark ? 'dark' : 'light') : pref

  const [searchOpen, setSearchOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [sheetW, setSheetW] = useState(SHEET_W)
  const [navOpen, setNavOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [opaque, setOpaque] = useState(false)
  const [activeToc, setActiveToc] = useState(content.toc[0]?.id ?? '')
  const isMobile = useMedia(MOBILE_MQ)
  const replyTimer = useRef(0)

  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const on = () => setSystemDark(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const changePref = useCallback((p: ThemePref) => {
    setPref(p)
    try {
      localStorage.setItem(THEME_KEY, p)
    } catch {}
  }, [])

  const send = useCallback(
    (q: string) => {
      setAssistantOpen(true)
      setSearchOpen(false)
      if (!q) return
      setMessages((m) => [...m, { role: 'user', text: q }])
      window.clearTimeout(replyTimer.current)
      replyTimer.current = window.setTimeout(() => setMessages((m) => [...m, { role: 'assistant', text: content.assistant.offlineReply }]), 600)
    },
    [content.assistant.offlineReply],
  )

  // ⌘K / Ctrl+K toggles search, ⌘I / Ctrl+I toggles the assistant (Mintlify's global hotkeys).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return
      const k = e.key.toLowerCase()
      if (k === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      } else if (k === 'i') {
        e.preventDefault()
        setSearchOpen(false)
        setAssistantOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Navbar opacity (data-is-opaque) + TOC scroll-spy: the active entry is the last heading above the sticky header.
  useEffect(() => {
    const onScroll = () => {
      setOpaque(window.scrollY > 0)
      let current = content.toc[0]?.id ?? ''
      for (const t of content.toc) {
        const el = document.getElementById(t.id)
        if (el && el.getBoundingClientRect().top <= 160) current = t.id
      }
      // A short last section can't reach the sticky header, so the page bottom marks it active.
      const last = content.toc[content.toc.length - 1]
      if (last && content.toc.length > 1 && window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = last.id
      setActiveToc(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [content.toc])

  const scrollToId = (id: string, copy = false) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', '#' + id)
    if (copy) navigator.clipboard?.writeText(window.location.href).catch(() => {})
  }

  const home = content.homeHref ?? resolveHref(content, content.localPrefix.from)

  return (
    <div className={s.root} data-theme={theme} data-theme-preference={pref} style={content.fontFamily ? ({ '--font': content.fontFamily } as CSSProperties) : undefined} suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      <a href="#content-area" className={s.skip}>
        Skip to main content
      </a>
      <div className={s.shell}>
        {!isMobile && (
          <AssistantSheet
            content={content}
            open={assistantOpen}
            maximized={maximized}
            width={sheetW}
            onWidth={setSheetW}
            onClose={() => setAssistantOpen(false)}
            onToggleMax={() => setMaximized((v) => !v)}
            messages={messages}
            onSend={send}
          />
        )}
        <div className={s.mainCol}>
          <header id="navbar" className={s.navbar}>
            <div className={s.navbarBg} data-is-opaque={opaque} />
            <div className={s.navbarMax}>
              <div className={s.navRow}>
                <div className={s.navRowInner}>
                  <div className={s.navLeft}>
                    <a href={home} className={s.logoLink}>
                      <span className={s.srOnly}>{content.siteName} home page</span>
                      <DocsLogo content={content} />
                    </a>
                  </div>
                  <div className={s.navCenter}>
                    <button type="button" id="search-bar-entry" aria-label="Open search" className={s.searchEntry} onClick={() => setSearchOpen(true)}>
                      <div className={s.searchEntryLeft}>
                        <Icon name="Search" className={s.searchEntryIcon} />
                        <div className={s.truncate}>Search...</div>
                      </div>
                      <span className={s.kbd}>⌘K</span>
                    </button>
                    <button type="button" id="assistant-entry" aria-label="Toggle assistant panel" className={s.assistantEntry} onClick={() => setAssistantOpen((v) => !v)}>
                      <Icon name="Sparkle" className={s.searchEntryIcon} />
                      <span className={s.assistantEntryLabel}>Ask Assistant</span>
                      <span className={s.kbd}>⌘I</span>
                    </button>
                  </div>
                  <div className={s.navRight}>
                    <DocsThemeMenu pref={pref} onChange={changePref} />
                  </div>
                  <div className={s.navMobileBtns}>
                    <button type="button" id="search-bar-entry-mobile" aria-label="Open search" className={s.mobileSearchBtn} onClick={() => setSearchOpen(true)}>
                      <span className={s.srOnly}>Search...</span>
                      <MagnifyingGlass className={s.mobileSearchIcon} />
                    </button>
                    <button
                      type="button"
                      id="assistant-entry-mobile"
                      aria-label="Toggle assistant panel"
                      className={s.mobileAssistBtn}
                      data-open={assistantOpen || undefined}
                      onClick={() => setAssistantOpen((v) => !v)}
                    >
                      <Icon name="Sparkle" className={s.mobileAssistIcon} />
                    </button>
                  </div>
                </div>
              </div>
              <button type="button" className={s.mobileCrumbRow} onClick={() => setNavOpen(true)}>
                <div className={s.mobileMenuIcon}>
                  <span className={s.srOnly}>Navigation</span>
                  <Icon name="Menu" strokeWidth={2} className={s.menuIcon} />
                </div>
                <div className={s.mobileCrumb}>
                  <div className={s.mobileCrumbTitle}>{content.mobileTitle}</div>
                </div>
              </button>
              <div className={s.tabsRow}>
                <div className={s.navTabs}>
                  {content.tabs.map((t) => (
                    <a
                      key={t.label}
                      href={resolveHref(content, t.href)}
                      className={s.navTab}
                      data-active={t.active || undefined}
                      aria-current={t.active ? 'location' : undefined}
                    >
                      {t.label}
                      <div className={s.navTabLine} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <div className={s.container}>
            <DocsSidebar content={content} />
            <main id="content-container" className={s.contentContainer}>
              <div className={s.contentRow}>
                <div id="content-side-layout" className={s.sideLayout} data-sheet-open={(assistantOpen && !isMobile) || undefined}>
                  <div id="table-of-contents-layout" className={s.tocLayout}>
                    <div id="table-of-contents" className={s.toc}>
                      <nav>
                        <h2 className={s.tocTitle}>
                          <button type="button" className={s.tocTitleBtn} aria-describedby="toc-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <Icon name="TableOfContents" strokeWidth={2} className={s.tocIcon} />
                            <span>On this page</span>
                          </button>
                        </h2>
                        <span id="toc-back-to-top" className={s.srOnly}>
                          Back to top
                        </span>
                        <ul id="table-of-contents-content" className={s.tocList}>
                          {content.toc.map((t) => (
                            <li key={t.id} className={s.tocItem} data-active={activeToc === t.id || undefined} style={{ paddingLeft: Math.max(0, t.depth - 2) * 15 }}>
                              <a
                                href={'#' + t.id}
                                className={s.tocLink}
                                data-active={activeToc === t.id || undefined}
                                aria-current={activeToc === t.id ? 'location' : undefined}
                                onClick={(e) => {
                                  e.preventDefault()
                                  scrollToId(t.id)
                                }}
                              >
                                {t.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>

                <div id="content-area" className={s.contentArea}>
                  <header id="header" className={s.pageHeader}>
                    <div className={s.pageTitleRow}>
                      <h1 id="page-title" className={s.pageTitle}>
                        {content.page.title}
                      </h1>
                    </div>
                    <div className={s.pageDesc}>
                      <p>{content.page.description}</p>
                    </div>
                  </header>

                  <div id="content" className={s.mdx}>
                    <h1 id={content.page.heading.id} className={s.mdxH1}>
                      <div className={s.anchorPos}>
                        <a
                          href={'#' + content.page.heading.id}
                          className={s.anchor}
                          aria-label="Navigate to header"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToId(content.page.heading.id, true)
                          }}
                        >
                          ​
                          <div className={s.anchorBox}>
                            <Icon name="Link" strokeWidth={2} className={s.anchorIcon} />
                          </div>
                        </a>
                      </div>
                      <span className={s.mdxH1Text} onClick={() => scrollToId(content.page.heading.id, true)}>
                        {content.page.heading.text}
                      </span>
                    </h1>
                    <span className={s.mdxP}>{content.page.body}</span>
                    <div className={s.cardGroup}>
                      {content.page.cards.map((c) => {
                        const href = resolveHref(content, c.href)
                        return (
                          <div
                            key={c.title}
                            role="link"
                            className={s.card}
                            onClick={(e) => {
                              if ((e.target as HTMLElement).closest('a')) return
                              window.location.href = href
                            }}
                          >
                            <div className={s.cardInner}>
                              <a href={href} className={s.cardLink}>
                                <div>
                                  <h2 className={s.cardTitle}>{c.title}</h2>
                                  <div className={s.cardBody}>
                                    <span>{c.body}</span>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {content.page.sections?.map((sec) => {
                      const H = sec.level === 2 ? 'h2' : 'h3'
                      return (
                        <div key={sec.id}>
                          <H id={sec.id} className={sec.level === 2 ? s.mdxH2 : s.mdxH3}>
                            <div className={s.anchorPos}>
                              <a
                                href={'#' + sec.id}
                                className={s.anchor}
                                aria-label="Navigate to header"
                                onClick={(e) => {
                                  e.preventDefault()
                                  scrollToId(sec.id, true)
                                }}
                              >
                                ​
                                <div className={s.anchorBox}>
                                  <Icon name="Link" strokeWidth={2} className={s.anchorIcon} />
                                </div>
                              </a>
                            </div>
                            <span className={s.mdxH1Text} onClick={() => scrollToId(sec.id, true)}>
                              {sec.title}
                            </span>
                          </H>
                          {sec.body?.map((b) => (
                            <p key={b} className={s.mdxP}>
                              {b}
                            </p>
                          ))}
                          {sec.items && (
                            <ul className={s.mdxUl}>
                              {sec.items.map((it) => (
                                <li key={it.text}>
                                  {it.label && <strong className={s.mdxStrong}>{it.label}: </strong>}
                                  {it.text}
                                </li>
                              ))}
                            </ul>
                          )}
                          {sec.link && (
                            <p className={s.mdxP}>
                              <a href={resolveHref(content, sec.link.href)} className={s.mdxLink}>
                                {sec.link.label}
                              </a>
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {content.next && (
                    <nav id="pagination" aria-label="Pagination" className={s.pagination}>
                      <a href={resolveHref(content, content.next.href)} aria-label={`Next: ${content.next.title}`} className={s.pageNext}>
                        <div className={s.pageNextTitle}>{content.next.title}</div>
                        <svg viewBox="0 0 3 6" aria-hidden="true" className={s.pageNextChevron}>
                          <path d="M3 0L0 3L3 6" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </nav>
                  )}

                  <FloatingAsk content={content} hidden={assistantOpen} onSubmit={send} />

                  <footer id="footer" className={s.footer} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <DocsSearch content={content} open={searchOpen} onClose={() => setSearchOpen(false)} onAsk={send} />
      {isMobile && <AssistantDrawer content={content} open={assistantOpen} onClose={() => setAssistantOpen(false)} messages={messages} onSend={send} />}
      <DocsMobileNav content={content} open={navOpen} onClose={() => setNavOpen(false)} pref={pref} onPref={changePref} />
    </div>
  )
}
