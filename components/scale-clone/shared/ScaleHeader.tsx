'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import AnnouncementBar from './header/AnnouncementBar'
import DesktopMenuPanel from './header/DesktopMenuPanel'
import FlatCta from './header/FlatCta'
import MobileDrawer from './header/MobileDrawer'
import VahueLogo from './header/VahueLogo'
import { GET_STARTED_HREF, LOGIN_HREF, NAV_CATEGORIES, type NavCategory } from './header/navData'
import { NAV_THEME_EVENT, type NavTheme } from './header/navTheme'
import s from './header/header.module.css'

// scale.com shared header, rebuilt from their nav chunk (see reference-snapshots/scale-clone/shared-chrome.md).
// - Fixed bar at top: var(--announcement-offset); 88px desktop (py-6 + 40px row), 70px mobile.
// - Desktop: hover a trigger opens its dropdown instantly (click toggles once motion has settled);
//   leaving the bar+panel or mousedown outside closes. Other triggers fade to 30% opacity.
// - Dropdown backdrop: --nav-dropdown-background + 16px blur, extends up behind the bar,
//   scaleY 0 -> 1 over 1s expo.out (delay .1) on every open/switch, scaleY -> 0 .5s expo.out on close.
// - Hide on scroll: the bar follows the scroll delta up to -max(height, 90px) and back; pointer-enter
//   tweens it home. Pinned while any menu is open.
// - Mobile (<768px): burger -> full-height drawer with a drill-down list (not an accordion).
export default function ScaleHeader() {
  const pathname = usePathname()

  // Desktop dropdown state (Scale: z / B / T)
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [panelMounted, setPanelMounted] = useState(false)
  const [atRest, setAtRest] = useState(true)
  const lastCategory = useRef<NavCategory | null>(null)
  const current = openKey ? NAV_CATEGORIES.find((c) => c.key === openKey) ?? null : null
  if (current) lastCategory.current = current
  const shownCategory = current ?? lastCategory.current
  const renderPanel = !!shownCategory && (openKey != null || panelMounted)

  // Mobile drawer state (Scale: Y / W / J)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [drawerMounted, setDrawerMounted] = useState(false)
  const [drawerKey, setDrawerKey] = useState<string | null>(null)
  const drawerActive = mobileOpen || drawerMounted

  const [annOpen, setAnnOpen] = useState(true)
  const [theme, setTheme] = useState<NavTheme>('light')
  const forcedTheme = useRef<NavTheme | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)
  const annRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const deskBgRef = useRef<HTMLDivElement>(null)
  const mobBgRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const ctaBarRef = useRef<HTMLDivElement>(null)
  const mobileDemoRef = useRef<HTMLAnchorElement>(null)
  const barY = useRef(0)
  const pointerTween = useRef(false)
  const prevMobileOpen = useRef(false)
  const prevListOpen = useRef(false)
  const prevDrawerKey = useRef<string | null>(null)

  const setVar = (name: string, value: string | null) => {
    if (value == null) document.documentElement.style.removeProperty(name)
    else document.documentElement.style.setProperty(name, value)
  }

  const resetAll = useCallback(() => {
    setOpenKey(null)
    setPanelMounted(false)
    setMobileOpen(false)
    setDrawerMounted(false)
    setDrawerKey(null)
    barY.current = 0
    if (barRef.current) gsap.set(barRef.current, { y: 0 })
    setVar('--header-y', '0')
  }, [])

  useLayoutEffect(() => {
    resetAll()
  }, [pathname, resetAll])

  useLayoutEffect(() => {
    if (openKey != null) setPanelMounted(true)
  }, [openKey])
  useEffect(() => {
    setAtRest(false)
  }, [openKey])
  const onPanelClosed = useCallback(() => {
    setPanelMounted(false)
    setAtRest(true)
  }, [])
  const onMotionRest = useCallback(() => setAtRest(true), [])

  // Dropdown / drawer backdrop grow (Scale's `eu` effect).
  const lastBarH = useRef(88)
  useLayoutEffect(() => {
    const bg = deskBgRef.current
    if (!bg) return
    if (openKey != null) {
      const h = barRef.current?.offsetHeight ?? 88
      lastBarH.current = h
      gsap.killTweensOf(bg)
      gsap.set(bg, { height: `calc(100% + ${h}px)`, y: -h, scaleY: 0, transformOrigin: '50% 0%' })
      gsap.to(bg, { scaleY: 1, duration: 1, delay: 0.1, y: -h, ease: 'expo.out' })
    } else {
      gsap.to(bg, { transformOrigin: '50% 0%', scaleY: 0, duration: 0.5, y: -lastBarH.current, ease: 'expo.out' })
    }
  }, [openKey, renderPanel])

  // Mobile: mount drawer, fill sheet + CTA bar, list stagger, header CTA fade, panel backdrop.
  useLayoutEffect(() => {
    if (mobileOpen) setDrawerMounted(true)
  }, [mobileOpen])

  useLayoutEffect(() => {
    if (!drawerActive) {
      prevMobileOpen.current = mobileOpen
      return
    }
    const fill = fillRef.current
    const cta = ctaBarRef.current
    const bg = mobBgRef.current
    const opening = mobileOpen && !prevMobileOpen.current
    const closing = !mobileOpen && prevMobileOpen.current
    if (opening) {
      if (fill) {
        gsap.killTweensOf(fill)
        gsap.set(fill, { opacity: 1, transformOrigin: '50% 0%', scaleY: 0.001, force3D: true })
        gsap.to(fill, { scaleY: 1, duration: 0.36, ease: 'power2.out', force3D: true })
      }
      if (cta) gsap.fromTo(cta, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.36, delay: 0.25, ease: 'power2.out' })
      if (bg) {
        const h = barRef.current?.offsetHeight ?? 70
        gsap.killTweensOf(bg)
        gsap.set(bg, { height: `calc(100% + ${h}px)`, y: -h, scaleY: 0, transformOrigin: '50% 0%' })
        gsap.to(bg, { scaleY: 1, duration: 1, delay: 0.1, y: -h, ease: 'expo.out' })
      }
    } else if (closing) {
      if (cta) gsap.to(cta, { yPercent: 100, opacity: 0, duration: 0.36, ease: 'power2.out' })
      if (bg) gsap.to(bg, { transformOrigin: '50% 0%', scaleY: 0, duration: 0.5, ease: 'expo.out' })
      if (fill) {
        gsap.killTweensOf(fill)
        gsap.set(fill, { transformOrigin: '50% 0%' })
        gsap.to(fill, { scaleY: 0.001, duration: 0.52, ease: 'power2.in', force3D: true, onComplete: () => setDrawerMounted(false) })
      } else setDrawerMounted(false)
    }
    prevMobileOpen.current = mobileOpen
  }, [mobileOpen, drawerActive])

  useLayoutEffect(() => {
    const ul = listRef.current
    if (!drawerActive || !ul) {
      prevListOpen.current = mobileOpen
      prevDrawerKey.current = drawerKey
      return
    }
    const items = Array.from(ul.querySelectorAll(':scope > li'))
    const closing = prevListOpen.current && !mobileOpen
    const toCategory = drawerKey != null && prevDrawerKey.current == null
    const backToList = drawerKey == null && prevDrawerKey.current != null
    const opening = mobileOpen && !prevListOpen.current
    if (closing || toCategory || opening || backToList) gsap.killTweensOf(items)
    if (closing) gsap.to(items, { opacity: 0, duration: 0.22, ease: 'power2.in' })
    else if (toCategory) gsap.to(items, { opacity: 0, duration: 0.18, ease: 'power2.in' })
    else if (opening || backToList) {
      gsap.set(items, { opacity: 0, y: 6 })
      gsap.to(items, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', stagger: { each: 0.048, from: 'start' } })
    }
    prevListOpen.current = mobileOpen
    prevDrawerKey.current = drawerKey
  }, [drawerActive, mobileOpen, drawerKey])

  useLayoutEffect(() => {
    const el = mobileDemoRef.current
    if (!el) return
    gsap.killTweensOf(el)
    if (mobileOpen)
      gsap.to(el, { opacity: 0, duration: 0.26, ease: 'power3.out', onComplete: () => el.classList.add('pointer-events-none') })
    else gsap.to(el, { opacity: 1, duration: 0.26, ease: 'power3.in', onStart: () => el.classList.remove('pointer-events-none') })
    return () => {
      gsap.killTweensOf(el)
    }
  }, [mobileOpen])

  // --header-height for pages that offset content by the bar.
  useEffect(() => {
    const update = () => {
      const h = barRef.current?.offsetHeight
      if (h) setVar('--header-height', `${h}px`)
    }
    update()
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
      setVar('--header-height', null)
      setVar('--header-y', null)
      setVar('--announcement-offset', null)
    }
  }, [])

  // Theme: forced via setScaleNavTheme(), else the closest [data-nav-theme] under the bar's bottom edge.
  const sampleTheme = useCallback(() => {
    if (forcedTheme.current) {
      setTheme(forcedTheme.current)
      return
    }
    const bar = barRef.current
    const root = rootRef.current
    if (!bar || !root) return
    const r = bar.getBoundingClientRect()
    const y = Math.min(window.innerHeight - 1, Math.max(1, r.bottom + 1))
    const stack = document.elementsFromPoint(window.innerWidth / 2, y)
    const below = stack.find((el) => !root.contains(el))
    const owner = below?.closest<HTMLElement>('[data-nav-theme]')
    const t = owner?.dataset.navTheme === 'dark' ? 'dark' : 'light'
    setTheme(t)
  }, [])

  useEffect(() => {
    const onForce = (e: Event) => {
      forcedTheme.current = (e as CustomEvent<NavTheme | null>).detail ?? null
      sampleTheme()
    }
    window.addEventListener(NAV_THEME_EVENT, onForce)
    const t1 = window.setTimeout(sampleTheme, 50)
    const t2 = window.setTimeout(sampleTheme, 600)
    return () => {
      window.removeEventListener(NAV_THEME_EVENT, onForce)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [sampleTheme, pathname])

  // Announcement offset + hide-on-scroll + theme sampling, one rAF per scroll.
  const menusOpen = openKey != null || mobileOpen || drawerMounted
  useEffect(() => {
    const bar = barRef.current
    const header = headerRef.current
    if (!bar || !header) return
    let last = window.scrollY
    let raf = 0
    const applyY = () => {
      if (!barRef.current) return
      gsap.set(barRef.current, { y: barY.current })
      setVar('--header-y', String(barY.current))
    }
    const applyOffset = () => {
      const ann = annRef.current
      const off = ann ? Math.max(0, ann.getBoundingClientRect().bottom) : 0
      setVar('--announcement-offset', `${off}px`)
    }
    const maxHide = () => -Math.max(bar.offsetHeight || 0, 90)
    const onScroll = () => {
      applyOffset()
      const cur = window.scrollY
      const d = cur - last
      last = cur
      if (!menusOpen && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (cur <= 0 && !pointerTween.current) {
          barY.current = 0
          applyY()
        } else {
          let next = barY.current
          if (d > 0) next = Math.max(maxHide(), next - d)
          else if (d < 0) next = Math.min(0, next - d)
          if (!pointerTween.current) {
            barY.current = Math.ceil(next)
            applyY()
          }
        }
      }
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0
          sampleTheme()
        })
    }
    const onResize = () => {
      barY.current = Math.max(maxHide(), Math.min(0, barY.current))
      applyY()
      applyOffset()
    }
    if (menusOpen) {
      barY.current = 0
      applyY()
    }
    applyOffset()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    const ro = new ResizeObserver(applyOffset)
    if (annRef.current) ro.observe(annRef.current)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [menusOpen, sampleTheme])

  const onPointerEnter = () => {
    const bar = barRef.current
    if (!bar || barY.current === 0) return
    pointerTween.current = true
    gsap.to(bar, {
      y: 0,
      snap: 'y',
      onUpdate: () => setVar('--header-y', String(Math.ceil(Number(gsap.getProperty(bar, 'y'))))),
      onComplete: () => {
        barY.current = 0
        pointerTween.current = false
      },
    })
  }

  // Close the desktop dropdown on mousedown outside the header.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenKey(null)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const drawerTitle = NAV_CATEGORIES.find((c) => c.key === drawerKey)?.name

  return (
    <div ref={rootRef} className={s.theme} data-nav-theme={theme}>
      <AnnouncementBar ref={annRef} open={annOpen} onDismiss={() => setAnnOpen(false)} />
      {drawerActive && (
        <div
          ref={fillRef}
          aria-hidden="true"
          className="fixed inset-0 z-40 origin-top bg-[var(--nav-background)] transition-colors duration-300 ease-out md:hidden"
        />
      )}
      <header
        ref={headerRef}
        onPointerEnter={onPointerEnter}
        className={`fixed left-0 right-0 z-50 transition-colors duration-300 ${
          drawerActive
            ? 'bottom-0 top-0 flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden md:top-[var(--announcement-offset,0px)] md:block md:h-auto md:max-h-none md:overflow-visible'
            : 'top-[var(--announcement-offset,0px)]'
        }`}
      >
        <div
          ref={barRef}
          onMouseLeave={() => setOpenKey(null)}
          className={`relative shrink-0 transition-colors delay-[20ms] duration-200 ${
            drawerActive
              ? 'z-[90] text-[var(--nav-text)] max-md:bg-transparent md:bg-[var(--nav-background)]'
              : 'bg-[var(--nav-background)] text-[var(--nav-text)]'
          }`}
        >
          <div className="relative z-[100] py-[15px] md:py-6">
            {drawerActive && drawerTitle ? (
              <div className="pointer-events-none absolute inset-y-0 left-1/2 z-40 flex w-screen max-w-[100vw] -translate-x-1/2 items-center justify-center md:hidden">
                <p className="w-full max-w-none text-balance whitespace-normal px-6 text-center text-base font-medium leading-[1.375] tracking-[-0.01em] text-[var(--nav-text)]">
                  {drawerTitle}
                </p>
              </div>
            ) : null}
            <div className={s.barRow}>
              <div className="relative z-20 col-span-1 flex min-w-0 shrink-0 items-center self-center text-[var(--nav-text)]">
                {drawerActive ? (
                  <div className="relative z-[26] min-w-0 flex-1 overflow-hidden md:hidden">
                    <div
                      className={`flex w-[200%] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        drawerKey ? '-translate-x-1/2' : 'translate-x-0'
                      }`}
                    >
                      <div className="flex w-1/2 shrink-0 items-center justify-start">
                        <Link href="/scale-clone" aria-label="Home" className="relative w-max">
                          <VahueLogo />
                        </Link>
                      </div>
                      <div className="flex w-1/2 shrink-0 items-center justify-start">
                        <button
                          type="button"
                          className="-ml-1 inline-flex rounded-lg p-2"
                          aria-label="Back to categories"
                          onClick={() => setDrawerKey(null)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[18px] shrink-0" aria-hidden="true">
                            <path d="m15 18-6-6 6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className={drawerActive ? 'hidden min-w-0 md:block' : 'block'}>
                  <Link href="/scale-clone" aria-label="Home" className="relative flex w-max">
                    <VahueLogo />
                  </Link>
                </div>
              </div>

              <nav
                aria-label="Main"
                className={`relative z-20 hidden min-w-0 flex-1 items-center justify-start gap-3 md:col-span-7 md:col-start-3 md:flex md:gap-5 md:overflow-x-auto lg:col-span-8 lg:col-start-2 lg:gap-7 lg:overflow-x-visible ${s.noScrollbar}`}
              >
                {NAV_CATEGORIES.map((c) => {
                  const isOpen = openKey === c.key
                  return (
                    <div
                      key={c.key}
                      onMouseEnter={() => setOpenKey(c.key)}
                      className={`relative transition-opacity duration-200 ease-out ${openKey != null && !isOpen ? 'opacity-30' : ''}`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={() => (isOpen ? atRest && setOpenKey(null) : setOpenKey(c.key))}
                        className={`${s.headerLink} inline-flex h-10 shrink-0 items-center rounded-none border-0 bg-transparent px-0 text-[var(--nav-text)] shadow-none outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2`}
                      >
                        <span>{c.name}</span>
                      </button>
                    </div>
                  )
                })}
              </nav>

              <div className="relative z-20 col-span-3 col-start-10 flex justify-end gap-2 self-center md:ml-auto md:shrink-0 md:gap-3">
                <div className="hidden shrink-0 items-center gap-2 md:flex md:gap-3">
                  <FlatCta
                    href={LOGIN_HREF}
                    label="Log In"
                    className="!h-10 shrink-0 whitespace-nowrap rounded-[8px] border border-[var(--nav-login-cta-border)] bg-[var(--nav-login-cta-bg)] text-[var(--nav-login-cta-text)] transition-colors duration-300"
                  />
                  <FlatCta
                    href={GET_STARTED_HREF}
                    label="Get Started"
                    className="!h-10 shrink-0 whitespace-nowrap rounded-[8px] bg-[var(--nav-demo-desktop-cta-bg)] text-[var(--nav-demo-desktop-cta-text)] transition-colors duration-300"
                  />
                </div>
                <div className="flex shrink-0 md:hidden">
                  <FlatCta
                    ref={mobileDemoRef}
                    href={GET_STARTED_HREF}
                    label="Get Started"
                    className="!h-10 rounded-md border-0 bg-[var(--nav-mobile-demo-cta-bg)] px-6 text-[var(--nav-mobile-demo-cta-text)] transition-colors duration-300"
                  />
                </div>
                <button
                  type="button"
                  aria-expanded={mobileOpen}
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                  onClick={() => {
                    setOpenKey(null)
                    setMobileOpen((o) => {
                      if (o) setDrawerKey(null)
                      return !o
                    })
                  }}
                  className={`inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-[var(--nav-text)] transition-colors md:hidden ${
                    drawerActive && mobileOpen ? 'bg-[var(--nav-mobile-close-background)]' : 'bg-[var(--nav-ctas-background)]'
                  }`}
                >
                  {mobileOpen ? (
                    <svg className="size-[18px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  ) : (
                    <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="7" y="10" width="10" height="2" rx="0.5" />
                      <rect x="7" y="14" width="10" height="2" rx="0.5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {renderPanel && shownCategory ? (
            <div className="absolute left-0 right-0 top-full z-[60] hidden w-full md:block">
              <div
                ref={deskBgRef}
                className="absolute inset-0 z-[65] h-full w-full bg-[var(--nav-dropdown-background)] shadow-[0_18px_60px_-20px_var(--nav-shadow)] backdrop-blur-lg"
                style={{ transform: 'scaleY(0)', transformOrigin: '50% 0%' }}
              />
              <div className="relative z-[70]">
                <DesktopMenuPanel
                  category={shownCategory}
                  openKey={openKey}
                  isOpen={openKey != null}
                  onClosed={onPanelClosed}
                  onMotionRest={onMotionRest}
                  onNavigate={resetAll}
                />
              </div>
            </div>
          ) : null}
        </div>

        {drawerActive ? (
          <MobileDrawer
            activeKey={drawerKey}
            onSelect={setDrawerKey}
            onNavigate={resetAll}
            bgRef={mobBgRef}
            listRef={listRef}
            ctaRef={ctaBarRef}
          />
        ) : null}
      </header>
    </div>
  )
}
