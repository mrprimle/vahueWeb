'use client'

// Mintlify's docs chrome as Scale runs it: index-B2TY3ua1.js and base-ui in initial-vendor-qAl-_E2i.js.
// Everything here is local: no search API, no assistant API, no analytics calls.
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { type CSSProperties, type ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Logo } from '@/components/site/Logo'
import { DocsAssistantDrawer, DocsAssistantRail, useAssistant } from './DocsAssistant'
import { MenuIcon, SearchIcon, SearchSolid, SparkleIcon, TableOfContentsIcon } from './DocsIcons'
import { DocsMobileNav } from './DocsMobileNav'
import { allPages, resolvePage, type ResolvedPage } from './DocsNav'
import { DocsSearch } from './DocsSearch'
import { DocsSidebar } from './DocsSidebar'
import { DocsThemeMenu, type ThemePreference, useDocsTheme } from './DocsTheme'
import type { DocsContent } from './content.types'

const THEME_BOOT = `(function(){var r=document.currentScript.parentElement,p=null;try{p=localStorage.getItem('isDarkMode')}catch(e){}if(p==='true')p='dark';else if(p==='false')p='light';if(p!=='light'&&p!=='dark'&&p!=='system')p='light';var m=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;r.setAttribute('data-mode',m)})()`

export function DocsLogo({ content }: { content: DocsContent }) {
  return (
    <Link href="/" className="docs-logo">
      <span className="docs-sr">
        {content.siteName} {content.ui.homeSuffix}
      </span>
      {content.logo.kind === 'image' ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="only-light" src={content.logo.light} alt="light logo" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="only-dark" src={content.logo.dark} alt="dark logo" />
        </>
      ) : (
        <span className="docs-logo-word">
          <Logo />
        </span>
      )}
    </Link>
  )
}

function useActionKey() {
  const [key, setKey] = useState('⌘')
  useEffect(() => {
    if (!/mac|iphone|ipad/i.test(navigator.platform)) setKey('Ctrl+')
  }, [])
  return key
}

/** applyNavbarTransition: opaque past 50px of window scroll. */
function useOpaqueNavbar() {
  const [opaque, setOpaque] = useState(false)
  useEffect(() => {
    const on = () => setOpaque(window.scrollY > 50)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return opaque
}

/** measureScrollMarginTop: anchors clear the top chrome plus 40px at lg and up. */
function useScrollMargin(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const measure = () => {
      const nav = root.querySelector<HTMLElement>('.docs-navbar')
      const bottom = nav ? nav.getBoundingClientRect().bottom : 0
      root.style.setProperty('--scroll-mt', `${bottom + (window.innerWidth >= 1024 ? 40 : 40.5)}px`)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [rootRef])
}

export function DocsShell({ content, children }: { content: DocsContent; children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const rootRef = useRef<HTMLDivElement>(null)
  const page = useMemo<ResolvedPage>(() => resolvePage(content, pathname), [content, pathname])
  const pages = useMemo(() => allPages(content), [content])
  const actionKey = useActionKey()
  const opaque = useOpaqueNavbar()
  useScrollMargin(rootRef)

  const theme = useDocsTheme(rootRef)
  const assistant = useAssistant(content)
  const [searchOpen, setSearchOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  // Mintlify gives <html> its own background and no overscroll; the site base stays untouched elsewhere.
  useLayoutEffect(() => {
    const html = document.documentElement
    const previous = { bg: html.style.background, os: html.style.overscrollBehaviorY }
    html.style.overscrollBehaviorY = 'none'
    html.style.background = theme.mode === 'dark' ? 'rgb(9 11 16)' : 'rgb(255 255 255)'
    return () => {
      html.style.background = previous.bg
      html.style.overscrollBehaviorY = previous.os
    }
  }, [theme.mode])

  // Keyboard: Cmd or Ctrl plus K toggles search, plus I toggles the assistant.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.shiftKey || e.altKey) return
      const key = e.key.toLowerCase()
      if (key === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      } else if (key === 'i') {
        e.preventDefault()
        assistant.toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [assistant])

  // Route change: Mintlify keeps the chrome and starts the page at the top, unless a hash is asked for.
  const lastPath = useRef(pathname)
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname
      if (!window.location.hash) window.scrollTo(0, 0)
      setNavOpen(false)
    }
  }, [pathname])

  const openSearch = useCallback(() => setSearchOpen(true), [])

  return (
    <div
      ref={rootRef}
      className="docs-root"
      data-mode="light"
      data-assistant={assistant.open && assistant.isDesktop ? 'open' : 'closed'}
      style={assistant.open && assistant.isDesktop ? ({ '--assistant-sheet-width': `${assistant.width}px` } as CSSProperties) : undefined}
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      <a href="#content-area" className="docs-skip">
        {content.ui.skipToContent}
      </a>
      <div className="docs-frame">
        <DocsAssistantRail content={content} assistant={assistant} />
        <div className="docs-frame-main">
          <header id="navbar" className="docs-navbar">
            <div className="docs-navbar-fill" id="navbar-transition" data-is-opaque={String(opaque)} />
            <div className="docs-navbar-inner">
              <div className="docs-navbar-row">
                <div className="docs-navbar-line">
                  <div className="docs-navbar-col">
                    <DocsLogo content={content} />
                  </div>
                  <div className="docs-navbar-col docs-navbar-col-center">
                    <button type="button" className="docs-entry docs-entry-search" id="search-bar-entry" aria-label="Open search" onClick={openSearch}>
                      <span>
                        <SearchIcon />
                        <span>{content.ui.searchTrigger}</span>
                      </span>
                      <span className="docs-hint">{actionKey}K</span>
                    </button>
                    <button
                      type="button"
                      className="docs-entry docs-entry-ask"
                      id="assistant-entry"
                      aria-label="Toggle assistant panel"
                      onClick={() => assistant.toggle()}
                    >
                      <SparkleIcon />
                      <span>{content.ui.askAssistant}</span>
                      <span className="docs-hint">{actionKey}I</span>
                    </button>
                  </div>
                  <div className="docs-navbar-col docs-navbar-col-right">
                    <DocsThemeMenu content={content} preference={theme.preference} onChange={theme.setPreference} />
                  </div>
                  <div className="docs-navbar-mobile">
                    <button type="button" className="docs-mobile-search" id="search-bar-entry-mobile" aria-label="Open search" onClick={openSearch}>
                      <span className="docs-sr">{content.ui.searchTrigger}</span>
                      <SearchSolid />
                    </button>
                    <button
                      type="button"
                      className="docs-mobile-ask"
                      id="assistant-entry-mobile"
                      aria-label="Toggle assistant panel"
                      data-open={assistant.open}
                      onClick={() => assistant.toggle()}
                    >
                      <SparkleIcon />
                    </button>
                  </div>
                </div>
              </div>
              <button type="button" className="docs-navbar-page" onClick={() => setNavOpen(true)}>
                <span className="docs-sr">{content.ui.navigation}</span>
                <MenuIcon strokeWidth={2} />
                <span className="title">{page.title}</span>
              </button>
              <div className="docs-tabs-row">
                <div className="docs-tabs">
                  {content.tabs.map((tab, i) => (
                    <Link key={tab.label} href={tab.href} className="docs-tab" data-active={i === page.tabIndex} aria-current={i === page.tabIndex ? 'location' : undefined}>
                      {tab.label}
                      <i />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <div className="docs-body">
            <DocsSidebar content={content} page={page} />
            <main className="docs-content-column" id="content-container">
              <div className="docs-content-row">
                <div className="docs-side" id="content-side-layout">
                  <div className="docs-toc">
                    <div className="docs-toc-inner" id="table-of-contents">
                      <nav aria-label={content.ui.onThisPage}>
                        <h2 className="docs-toc-title">
                          <button
                            type="button"
                            title={content.ui.backToTop}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          >
                            <TableOfContentsIcon strokeWidth={2} />
                            <span>{content.ui.onThisPage}</span>
                          </button>
                        </h2>
                        <a className="docs-toc-item" href={`#${page.anchor}`} data-active="true">
                          {page.heading}
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
                <div className="docs-content" id="content-area">
                  {children}
                  <DocsAssistantBarSlot content={content} assistant={assistant} pathname={pathname} />
                  <footer id="footer" className="docs-footer" />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <DocsSearch
        open={searchOpen}
        content={content}
        pages={pages}
        onClose={() => setSearchOpen(false)}
        onNavigate={(href) => {
          setSearchOpen(false)
          router.push(href)
        }}
        onAsk={(query) => {
          setSearchOpen(false)
          assistant.ask(query)
        }}
      />
      <DocsMobileNav
        open={navOpen}
        onClose={() => setNavOpen(false)}
        content={content}
        page={page}
        preference={theme.preference as ThemePreference}
        onTheme={theme.setPreference}
      />
      <DocsAssistantDrawer content={content} assistant={assistant} />
    </div>
  )
}

function DocsAssistantBarSlot({ content, assistant, pathname }: { content: DocsContent; assistant: ReturnType<typeof useAssistant>; pathname: string }) {
  const [away, setAway] = useState<boolean | null>(null)
  const [animate, setAnimate] = useState(false)
  const [value, setValue] = useState('')

  // WO: an IntersectionObserver on footer#footer. The first report has no transition, later ones .3s.
  useLayoutEffect(() => {
    const footer = document.getElementById('footer')
    if (!footer) return
    let first = true
    setAnimate(false)
    const io = new IntersectionObserver((entries) => {
      const e = entries.at(0)
      if (!e) return
      setAway(e.isIntersecting)
      if (first) first = false
      else setAnimate(true)
    })
    io.observe(footer)
    return () => io.disconnect()
  }, [pathname])

  const send = () => {
    const text = value.trim()
    if (!text) return
    setValue('')
    assistant.ask(text)
  }

  const hidden = assistant.open && assistant.isDesktop
  return (
    <div className="docs-bar" data-assistant-bar="" data-hidden={hidden} aria-hidden={hidden || undefined} inert={hidden || undefined}>
      <div className="docs-bar-inner" data-animate={animate} data-away={away === true}>
        <div className="docs-bar-pad">
          <div className="docs-input">
            <div className="docs-input-row">
              <textarea
                aria-label={content.ui.assistantPlaceholder}
                autoComplete="off"
                placeholder={content.ui.assistantPlaceholder}
                rows={2}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault()
                    send()
                  }
                }}
              />
              <button type="button" className="docs-send" aria-label="Send message" disabled={!value.trim()} onClick={send}>
                <SendArrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SendArrow() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9.0 1.5754L8.9999 16.4171" />
      <path d="M2.2563 8.319L8.9999 1.5754L15.7435 8.3191" />
    </svg>
  )
}
