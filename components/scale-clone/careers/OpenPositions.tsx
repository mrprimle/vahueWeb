'use client'

import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DepartmentIcon } from './icons'
import type { CareersContent, CareersJob, CareersPositionsLabels } from './content'
import s from './careers.module.css'

/*
 * scale.com/careers "Open positions": FilterPosition + FilterDropdown + CollapsibleDepartmentListings, ported from
 * chunk 2hf-m2wen5p-4.js module 442707 (the live page fetches api.greenhouse.io/v1/boards/scaleai/{jobs,offices,
 * departments} client-side through module 165311; the clone renders `positions.jobs`, a static snapshot).
 *
 * Data rules (same as Scale):
 *   - every job is split into one row per office (`location` split on ";")
 *   - department = "External Department" metadata, else departments[0]; groups sorted by name (localeCompare),
 *     rows by title (localeCompare, stable)
 *   - filters: department (with Scale's Communications/Marketing -> "Marketing and Communications" and
 *     Enterprise EPD -> "Product and Design" aliases), location (row location includes the option), search
 *     (title contains the query, only from 3 characters)
 *   - every filter change scrolls the FilterPosition root into view (scrollIntoView smooth)
 * UI:
 *   - sticky filter bar: top 0, z 10, bg white/90 + backdrop-blur 8px, pt-2 pb-6
 *   - dropdowns are a Radix DropdownMenu (modal): opens on pointerdown, align start, sideOffset 6, 288px
 *     (calc(100vw - 2rem) under 640px), max-h 60vh, follows the trigger while the page scrolls; body gets
 *     pointer-events none + react-remove-scroll (data-scroll-locked) while open, but Lenis still scrolls the page on
 *     wheel (measured on scale.com: +320px for a 400px wheel with the menu open); an outside click only closes the menu
 *     (it doesn't reach the element under it) and focuses the trigger, a right-click closes without refocusing;
 *     choosing a checkbox item toggles it and closes the menu (Radix default), focus returns to the trigger;
 *     keys: trigger Enter/Space toggle, ArrowDown opens; menu ArrowUp/Down (no loop), Home/PageUp, End/PageDown,
 *     typeahead (1s buffer), Escape closes, Tab does nothing; items have no keyboard highlight style;
 *     onOpenChange -> 120ms debounce -> rAF -> lenis.resize + ScrollTrigger.refresh
 *   - department rows: button px-6 py-5, hover bg gray-95; panel `grid` rows 0fr <-> 1fr, `transition-all 300ms
 *     ease-out`; chevron rotates 180deg (300ms ease-out); transitionend -> 50ms debounce -> refresh
 *   - Expand all / Collapse all: sets every group, refresh 340ms later
 *   - position row: link pl-8 md:pl-16 pr-6 py-4, border-top gray-90, hover bg gray-90 + title black;
 *     "Apply →" button opens the Greenhouse URL in a new tab (preventDefault on the row link)
 */

const DEFAULT_LABELS: CareersPositionsLabels = {
  search: 'Search positions…',
  allDepartments: 'All Departments',
  allLocations: 'All Locations',
  departmentsCount: 'Departments',
  locationsCount: 'Locations',
  role: 'role',
  roles: 'roles',
  department: 'department',
  departments: 'departments',
  across: 'across',
  expandAll: 'Expand all',
  collapseAll: 'Collapse all',
  expandedOf: 'of',
  expanded: 'expanded',
  showing: 'Showing',
  matching: 'matching',
  inDept: 'dept',
  inDepts: 'depts',
  location: 'location',
  locations: 'locations',
  clearFilters: 'Clear filters ×',
  noMatch: 'No roles match your criteria.',
  noneFound: 'No positions match your filters.',
  apply: 'Apply →',
}

type Row = CareersJob & { office: string }

/*
 * Scale: rAF -> lenis.resize() + ScrollTrigger.refresh(). A refresh restores the recorded scroll position, which cancels a
 * native smooth scroll in flight (the filter's scrollIntoView), so the clone waits until scrolling has been idle for 120ms.
 */
const refreshScroll = () => {
  let last = performance.now()
  const onScroll = () => (last = performance.now())
  addEventListener('scroll', onScroll, { passive: true })
  const check = () => {
    if (performance.now() - last < 120) return void setTimeout(check, 60)
    removeEventListener('scroll', onScroll)
    requestAnimationFrame(() => {
      ;(window as unknown as { __lenis?: { resize: () => void } }).__lenis?.resize()
      ScrollTrigger.refresh()
    })
  }
  setTimeout(check, 60)
}

/*
 * Scale calls root.scrollIntoView({ behavior: 'smooth' }) on every filter change (measured: 5252 -> 6000 in ~450ms, native
 * smooth scroll, not Lenis). The clone does the same. Here the filter also changes the page height, and the ScrollTrigger
 * refresh that follows (useRefreshOnPageGrow 150ms) restores the recorded scroll position, which cancels a native smooth
 * scroll mid-way. So for 1.5s a refresh that leaves the root short of its target re-issues the scroll from there.
 */
let pendingScroll: (() => void) | null = null
function smoothScrollIntoView(el: HTMLElement) {
  pendingScroll?.()
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const go = () => el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  go()
  if (reduced) return
  const again = () => {
    const arrived = Math.abs(el.getBoundingClientRect().top) < 1 || scrollY >= document.documentElement.scrollHeight - innerHeight - 1
    if (arrived) stop()
    else requestAnimationFrame(go)
  }
  const stop = () => {
    clearTimeout(t)
    ScrollTrigger.removeEventListener('refresh', again)
    removeEventListener('wheel', stop)
    removeEventListener('touchstart', stop)
    pendingScroll = null
  }
  const t = setTimeout(stop, 1500)
  ScrollTrigger.addEventListener('refresh', again)
  addEventListener('wheel', stop, { passive: true })
  addEventListener('touchstart', stop, { passive: true })
  pendingScroll = stop
}

const flagKey = (location = '') => {
  const t = location.trim()
  return t ? t.split(/,\s*/).pop()?.trim() || t : ''
}

/* ---------- FilterDropdown (Radix DropdownMenu with CheckboxItems) ---------- */

function FilterDropdown({
  options,
  allOption,
  value,
  onValueChange,
}: {
  options: { label: string; value: string }[]
  allOption: string
  value: string[]
  onValueChange: (v: string[]) => void
}) {
  const [selected, setSelected] = useState<string[]>(value)
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ left: number; top: number; maxH: number; side: 'bottom' | 'top' } | null>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const keyboardOpen = useRef(false)
  // Radix typeahead: a 1s search buffer
  const search = useRef('')
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  // last real pointer position over the menu: boundary events Chrome fires when a keyboard move scrolls the menu under
  // a resting pointer carry the same coordinates, and on scale.com they don't take focus off the keyboard item
  const lastPointer = useRef({ x: -1, y: -1 })
  // Radix portals to <body>; the clone portals into the page root so the --car-* theme variables still apply
  const [portal, setPortal] = useState<HTMLElement | null>(null)
  useEffect(() => setPortal(trigger.current?.closest<HTMLElement>('[data-careers-root]') ?? document.body), [])

  // Scale: useEffect(() => { JSON.stringify(l) !== JSON.stringify(u) && d(l) }, [l])
  const valueKey = JSON.stringify(value)
  useEffect(() => {
    setSelected((cur) => (JSON.stringify(cur) === valueKey ? cur : value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(
    () => () => {
      clearTimeout(refreshTimer.current)
      clearTimeout(searchTimer.current)
    },
    [],
  )

  const setOpenState = useCallback((next: boolean, focusTrigger = false) => {
    setOpen(next)
    // onOpenChange: 120ms debounce, then rAF -> lenis.resize + ScrollTrigger.refresh
    clearTimeout(refreshTimer.current)
    refreshTimer.current = setTimeout(refreshScroll, 120)
    // Radix onCloseAutoFocus runs from the FocusScope unmount (a macrotask), after the outside mousedown
    if (!next && focusTrigger) setTimeout(() => trigger.current?.focus({ preventScroll: true }), 0)
  }, [])

  const toggle = useCallback(
    (v: string) => {
      const next = selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]
      setSelected(next)
      onValueChange(next)
    },
    [selected, onValueChange],
  )

  // Radix CheckboxItem: onCheckedChange (toggle) first, then the default onSelect closes the menu.
  const pick = useCallback(
    (v: string) => {
      toggle(v)
      setOpenState(false, true)
    },
    [setOpenState, toggle],
  )

  // Floating position: side bottom, align start, sideOffset 6; flips to top when it fits better there. Like floating-ui's
  // autoUpdate it follows the trigger when the page scrolls (Lenis still scrolls it while the menu is open).
  const place = useCallback(() => {
    const t = trigger.current
    if (!t) return
    const r = t.getBoundingClientRect()
    const vh = innerHeight
    const below = vh - r.bottom - 6
    const above = r.top - 6
    const want = Math.min(0.6 * vh, menu.current?.scrollHeight ?? 0.6 * vh)
    const side = below < want && above > below ? 'top' : 'bottom'
    setPos({ left: r.left, top: side === 'bottom' ? r.bottom + 6 : r.top - 6, maxH: 0.6 * vh, side })
  }, [])

  useLayoutEffect(() => {
    if (!open) return
    place()
    const body = document.body
    const prev = { pe: body.style.pointerEvents, ov: body.style.overflow }
    // DismissableLayer disableOutsidePointerEvents + react-remove-scroll (body overflow hidden, data-scroll-locked)
    body.style.pointerEvents = 'none'
    body.style.overflow = 'hidden'
    body.setAttribute('data-scroll-locked', '1')
    // react-remove-scroll blocks touch scrolling outside the menu (Lenis syncTouch would otherwise move the page);
    // wheel is left to Lenis, which keeps scrolling the page on scale.com
    const block = (e: Event) => {
      if (menu.current?.contains(e.target as Node)) return
      e.stopPropagation()
      e.preventDefault()
    }
    // pointerdown outside: close; a left click refocuses the trigger, a right / ctrl click doesn't (Radix modal menu).
    // body pointer-events stay none until the menu unmounts, so the click never reaches the element under it.
    const down = (e: PointerEvent) => {
      if (menu.current?.contains(e.target as Node) || trigger.current?.contains(e.target as Node)) return
      const secondary = e.button === 2 || (e.button === 0 && e.ctrlKey)
      setOpenState(false, !secondary)
    }
    // Chrome still dispatches the mousedown / click of that press to the element under the pointer once the body
    // accepts pointer events again; Radix's menu swallows it. Eat the rest of this press.
    let swallow = false
    const markDown = (e: PointerEvent) => {
      if (!menu.current?.contains(e.target as Node) && !trigger.current?.contains(e.target as Node)) swallow = true
    }
    window.addEventListener('touchmove', block, { capture: true, passive: false })
    document.addEventListener('pointerdown', markDown, true)
    document.addEventListener('pointerdown', down, true)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, { passive: true })
    requestAnimationFrame(() => {
      const first = menu.current?.querySelector<HTMLElement>('[role="menuitemcheckbox"]')
      if (menu.current && document.activeElement === trigger.current && first && keyboardOpen.current) first.focus()
      else menu.current?.focus({ preventScroll: true })
    })
    return () => {
      body.style.pointerEvents = prev.pe
      body.style.overflow = prev.ov
      body.removeAttribute('data-scroll-locked')
      window.removeEventListener('touchmove', block, true)
      document.removeEventListener('pointerdown', markDown, true)
      document.removeEventListener('pointerdown', down, true)
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place)
      if (swallow) {
        const eat = (e: Event) => {
          e.preventDefault()
          e.stopPropagation()
        }
        const done = () => {
          document.removeEventListener('mousedown', eat, true)
          document.removeEventListener('mouseup', eat, true)
          document.removeEventListener('click', eat, true)
          removeEventListener('pointerup', later, true)
        }
        const later = () => setTimeout(done, 0)
        document.addEventListener('mousedown', eat, true)
        document.addEventListener('mouseup', eat, true)
        document.addEventListener('click', eat, true)
        addEventListener('pointerup', later, true)
        setTimeout(done, 1000)
      }
    }
  }, [open, place, setOpenState])

  const items = () => [...(menu.current?.querySelectorAll<HTMLElement>('[role="menuitemcheckbox"]') ?? [])]

  // Radix typeahead (getNextMatch): repeated chars cycle through items starting with that char; otherwise match the
  // buffer from the current item onwards (wrapping); a single char skips the current item.
  const typeahead = (key: string) => {
    const buf = search.current + key
    search.current = buf
    clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => (search.current = ''), 1000)
    const list = items()
    const values = list.map((e) => (e.textContent || '').trim())
    const current = values[list.indexOf(document.activeElement as HTMLElement)]
    const repeated = buf.length > 1 && [...buf].every((c) => c === buf[0])
    const q = (repeated ? buf[0] : buf).toLowerCase()
    const from = Math.max(current ? values.indexOf(current) : -1, 0)
    let wrapped = values.map((_, i) => values[(from + i) % values.length])
    if (q.length === 1) wrapped = wrapped.filter((v) => v !== current)
    const next = wrapped.find((v) => v.toLowerCase().startsWith(q))
    if (next && next !== current) setTimeout(() => list[values.indexOf(next)]?.focus())
  }

  const onMenuKey = (e: KeyboardEvent) => {
    const list = items()
    const i = list.indexOf(document.activeElement as HTMLElement)
    const onContent = e.target === menu.current
    const mod = e.ctrlKey || e.altKey || e.metaKey
    if (e.key === 'Tab') return void e.preventDefault()
    if (e.key === 'Escape') {
      e.preventDefault()
      return void setOpenState(false, true)
    }
    if (!mod && e.key.length === 1 && !(e.key === ' ' && !search.current)) {
      typeahead(e.key)
      if (e.key === ' ') e.preventDefault()
      return
    }
    const first = ['ArrowDown', 'PageUp', 'Home'].includes(e.key)
    const last = ['ArrowUp', 'PageDown', 'End'].includes(e.key)
    if (!first && !last) return
    e.preventDefault()
    // RovingFocusGroup moves focus in a setTimeout (a key pressed right after lands on the previous item)
    const to = (el?: HTMLElement) => setTimeout(() => el?.focus())
    if (onContent || i < 0) return void to(first ? list[0] : list[list.length - 1])
    if (e.shiftKey || mod) return
    if (e.key === 'ArrowDown') to(list[Math.min(list.length - 1, i + 1)])
    else if (e.key === 'ArrowUp') to(list[Math.max(0, i - 1)])
    else if (first) to(list[0])
    else to(list[list.length - 1])
  }

  const active = selected.length > 0

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        data-state={open ? 'open' : 'closed'}
        onPointerDown={(e) => {
          if (e.button !== 0 || e.ctrlKey) return
          keyboardOpen.current = false
          setOpenState(!open)
          if (!open) e.preventDefault()
        }}
        onKeyDown={(e) => {
          // Radix trigger: Enter / Space toggle, ArrowDown only opens
          if (e.key === 'Enter' || e.key === ' ') {
            keyboardOpen.current = true
            setOpenState(!open, open)
          } else if (e.key === 'ArrowDown') {
            keyboardOpen.current = true
            if (!open) setOpenState(true)
          }
          if (['Enter', ' ', 'ArrowDown'].includes(e.key)) e.preventDefault()
        }}
        className={`${s.trigger} ${s.tc} ${s.body3} ${active ? s.triggerActive : ''} flex w-full items-center justify-between gap-2 py-2.5 pl-4 pr-3 font-display focus:outline-none sm:w-56`}
      >
        <span className="truncate">{allOption}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && portal
        ? createPortal(
            <div
              ref={menu}
              role="menu"
              tabIndex={-1}
              data-state="open"
              data-side={pos?.side ?? 'bottom'}
              data-lenis-prevent
              onKeyDown={onMenuKey}
              className={`${s.menu} fixed z-[60] w-[calc(100vw-2rem)] overflow-y-auto font-display outline-none sm:w-72`}
              style={{
                pointerEvents: 'auto',
                left: pos?.left ?? 0,
                top: pos?.side === 'top' ? undefined : pos?.top ?? 0,
                bottom: pos?.side === 'top' ? innerHeight - (pos?.top ?? 0) : undefined,
                maxHeight: pos?.maxH,
                visibility: pos ? 'visible' : 'hidden',
              }}
            >
              {options.map(({ label, value: v }) => {
                const checked = selected.includes(v)
                return (
                  <div
                    key={v}
                    role="menuitemcheckbox"
                    aria-checked={checked}
                    tabIndex={-1}
                    data-state={checked ? 'checked' : 'unchecked'}
                    onPointerMove={(e) => {
                      if (e.pointerType !== 'mouse') return
                      lastPointer.current = { x: e.clientX, y: e.clientY }
                      if (document.activeElement !== e.currentTarget) (e.currentTarget as HTMLElement).focus({ preventScroll: true })
                    }}
                    onPointerLeave={(e) => {
                      // Radix onItemLeave: focus goes back to the content
                      if (e.pointerType !== 'mouse') return
                      if (e.clientX === lastPointer.current.x && e.clientY === lastPointer.current.y) return
                      menu.current?.focus({ preventScroll: true })
                    }}
                    onFocus={(e) => e.currentTarget.setAttribute('data-highlighted', '')}
                    onBlur={(e) => e.currentTarget.removeAttribute('data-highlighted')}
                    onClick={() => pick(v)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || (e.key === ' ' && !search.current)) {
                        e.preventDefault()
                        e.stopPropagation()
                        pick(v)
                      }
                    }}
                    className={`${s.menuItem} ${s.tc} flex cursor-pointer items-center gap-3 px-4 py-3`}
                  >
                    <span className={`${s.check} ${checked ? s.checkOn : ''} ${s.tc} flex h-4 w-4 flex-shrink-0 items-center justify-center`}>
                      {checked ? (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                          <path d="M1 4L3.5 6.5L9 1" stroke="var(--car-active-fg,#fff)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </span>
                    <span className={`${s.body3} text-[color:var(--car-fg-2,#212121)]`}>{label}</span>
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

/* ---------- CollapsibleDepartmentListings ---------- */

const Chevron = memo(function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={s.chevron} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} aria-hidden="true">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
})

const PositionItem = memo(function PositionItem({
  row,
  href,
  flag,
  applyLabel,
}: {
  row: Row
  href: string
  flag: string
  applyLabel: string
}) {
  return (
    <a
      href={href}
      aria-label={`${row.title} — ${row.office}`}
      className={`${s.row} ${s.tc} ${s.focusUa} group flex flex-col justify-between gap-3 py-4 pl-8 pr-6 sm:flex-row sm:items-center md:pl-16`}
    >
      <span className={`${s.body2} ${s.rowTitle} ${s.tc} text-[color:var(--car-fg-2,#212121)]`}>{row.title}</span>
      <div className="flex shrink-0 flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex items-center gap-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flag} width={20} height={14} alt="" aria-hidden="true" className="h-3.5 w-5" />
          <span className={`${s.detailMono} font-mono text-[color:var(--car-muted,#929292)]`}>{row.office}</span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            window.open(row.applyUrl, '_blank', 'noopener,noreferrer')
          }}
          className={`${s.detailMono} ${s.apply} ${s.tc} whitespace-nowrap font-mono`}
          aria-label={`Apply for ${row.title}`}
        >
          {applyLabel}
        </button>
      </div>
    </a>
  )
})

const DepartmentSection = memo(function DepartmentSection({
  name,
  rows,
  isOpen,
  onToggle,
  onLayoutTransitionEnd,
  hrefFor,
  flagFor,
  labels,
}: {
  name: string
  rows: Row[]
  isOpen: boolean
  onToggle: () => void
  onLayoutTransitionEnd: () => void
  hrefFor: (r: Row) => string
  flagFor: (r: Row) => string
  labels: CareersPositionsLabels
}) {
  const id = useMemo(() => `department-${name.replace(/\s+/g, '-').toLowerCase()}`, [name])
  const n = rows.length
  return (
    <div className="border-b border-[color:var(--car-line,#eaeaea)] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={id}
        className={`${s.deptBtn} ${s.tc} flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none`}
      >
        <div className="flex flex-1 items-center gap-3">
          <span className="shrink-0 text-[color:var(--car-muted,#929292)]">
            <DepartmentIcon name={name} />
          </span>
          <div>
            <h3 className={`${s.header6} font-display font-normal text-[color:var(--car-fg-2,#212121)]`}>{name}</h3>
            <p className={`${s.detailMono} mt-0.5 font-mono text-[color:var(--car-muted,#929292)]`}>
              {n} {n === 1 ? labels.role : labels.roles}
            </p>
          </div>
        </div>
        <span className="ml-4 shrink-0 text-[color:var(--car-muted,#929292)]">
          <Chevron isOpen={isOpen} />
        </span>
      </button>
      <div
        className={s.collapse}
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget) onLayoutTransitionEnd()
        }}
      >
        <div className="overflow-hidden">
          <div id={id} role="region" aria-label={`${name} positions`} className="bg-[var(--car-card,#f2f2f2)]">
            {rows.map((r, i) => (
              <PositionItem key={`${r.id}-${i}`} row={r} href={hrefFor(r)} flag={flagFor(r)} applyLabel={labels.apply} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

function CollapsibleDepartmentListings({
  rows,
  initialExpanded,
  hrefFor,
  flagFor,
  labels,
}: {
  rows: Row[]
  initialExpanded: string[]
  hrefFor: (r: Row) => string
  flagFor: (r: Row) => string
  labels: CareersPositionsLabels
}) {
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const allTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const refresh = useCallback(() => {
    clearTimeout(refreshTimer.current)
    refreshTimer.current = setTimeout(refreshScroll, 50)
  }, [])
  useEffect(
    () => () => {
      clearTimeout(refreshTimer.current)
      clearTimeout(allTimer.current)
    },
    [],
  )
  const [open, setOpen] = useState(() => new Set(initialExpanded))

  const groups = useMemo(() => {
    const by: Record<string, Row[]> = {}
    rows.forEach((r) => {
      ;(by[r.department] ||= []).push(r)
    })
    return Object.entries(by)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, list]) => ({ name, rows: [...list].sort((a, b) => a.title.localeCompare(b.title)) }))
  }, [rows])
  const names = useMemo(() => groups.map((g) => g.name), [groups])

  const toggle = useCallback((name: string) => {
    setOpen((cur) => {
      const next = new Set(cur)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])
  const setAll = useCallback(
    (on: boolean) => {
      setOpen(on ? new Set(names) : new Set())
      clearTimeout(allTimer.current)
      allTimer.current = setTimeout(refresh, 340)
    },
    [names, refresh],
  )

  const total = rows.length
  const depts = groups.length
  const expanded = open.size
  const all = expanded === depts

  if (depts === 0)
    return (
      <div className="w-full py-12 text-center">
        <p className={`${s.body2} text-[color:var(--car-muted,#929292)]`}>No positions found matching your criteria.</p>
      </div>
    )

  return (
    <div className="mt-2 w-full">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className={`${s.detailMono} font-mono text-[color:var(--car-muted,#929292)]`}>
          <span className="text-[color:var(--car-fg-2,#212121)]">{total}</span> {total === 1 ? labels.role : labels.roles} {labels.across}{' '}
          <span className="text-[color:var(--car-fg-2,#212121)]">{depts}</span> {depts === 1 ? labels.department : labels.departments}
        </p>
        {depts > 1 ? (
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setAll(!all)} className={`${s.detailMono} ${s.textBtn} ${s.tc} font-mono`}>
              {all ? labels.collapseAll : labels.expandAll}
            </button>
            {expanded > 0 ? (
              <span className={`${s.detailMono} font-mono text-[color:var(--car-muted,#929292)]`}>
                {expanded} {labels.expandedOf} {depts} {labels.expanded}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="border-t border-[color:var(--car-line,#eaeaea)]">
        {groups.map((g) => (
          <DepartmentSection
            key={g.name}
            name={g.name}
            rows={g.rows}
            isOpen={open.has(g.name)}
            onToggle={() => toggle(g.name)}
            onLayoutTransitionEnd={refresh}
            hrefFor={hrefFor}
            flagFor={flagFor}
            labels={labels}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------- FilterPosition ---------- */

const EMPTY: string[] = []

export default function OpenPositions({ positions }: { positions: CareersContent['positions'] }) {
  const { jobs, jobBaseHref, flags, flagFallback, departmentLabels = {}, scaleLabelQuirk = false } = positions
  const labels = useMemo(() => ({ ...DEFAULT_LABELS, ...positions.labels }), [positions.labels])
  const root = useRef<HTMLDivElement>(null)

  const [search, setSearch] = useState('')
  const [depts, setDepts] = useState<string[]>([])
  const [locs, setLocs] = useState<string[]>([])

  const departments = useMemo(() => [...new Set(jobs.map((j) => j.department))].sort((a, b) => a.localeCompare(b)), [jobs])
  const locations = useMemo(() => [...new Set(jobs.flatMap((j) => j.location.split(';').map((l) => l.trim())))].sort(), [jobs])

  const filtered = useMemo<Row[]>(
    () =>
      jobs
        .flatMap((j) => j.location.split(';').map((o) => ({ ...j, office: o.trim() })))
        .filter((r) => {
          const d =
            depts.length === 0 ||
            depts.some(
              (x) =>
                x === r.department ||
                ((x === 'Communications' || x === 'Marketing') && r.department === 'Marketing and Communications') ||
                (x === 'Enterprise EPD' && r.department === 'Product and Design'),
            )
          const l = locs.length === 0 || locs.some((x) => r.office.includes(x.trim()))
          const q = search.length < 3 || r.title.toLowerCase().includes(search.toLowerCase())
          return d && l && q
        }),
    [jobs, depts, locs, search],
  )

  const scrollToRoot = useCallback(() => root.current && smoothScrollIntoView(root.current), [])
  const onDepts = useCallback((v: string[]) => (setDepts(v), scrollToRoot()), [scrollToRoot])
  const onLocs = useCallback((v: string[]) => (setLocs(v), scrollToRoot()), [scrollToRoot])
  const onSearch = useCallback((v: string) => (setSearch(v), scrollToRoot()), [scrollToRoot])
  const clearAll = useCallback(() => {
    setSearch('')
    setDepts([])
    setLocs([])
    scrollToRoot()
  }, [scrollToRoot])

  // Scale: D = customSelectedDepartments || selected (customSelected* is [] on /careers, see content.tsx)
  const shownDepts = scaleLabelQuirk ? EMPTY : depts
  const shownLocs = scaleLabelQuirk ? EMPTY : locs
  const hasFilters = depts.length > 0 || locs.length > 0 || search.length > 0
  const count = filtered.length

  const hrefFor = useCallback((r: Row) => r.href ?? `${jobBaseHref}/${r.id}`, [jobBaseHref])
  const flagFor = useCallback((r: Row) => flags[flagKey(r.office)] ?? flagFallback, [flags, flagFallback])
  const deptOptions = useMemo(() => departments.map((d) => ({ label: departmentLabels[d] || d, value: d })), [departments, departmentLabels])
  const locOptions = useMemo(() => locations.map((l) => ({ label: departmentLabels[l] || l, value: l })), [locations, departmentLabels])

  return (
    <div ref={root} className="w-full">
      <div className={`${s.sticky} pb-6 pt-2`}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <input
              type="text"
              placeholder={labels.search}
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && onSearch('')}
              className={`${s.field} ${s.body3} ${s.tc} w-full py-2.5 pl-4 pr-9 font-display sm:w-64`}
              aria-label="Search job positions"
            />
            {search ? (
              <button
                type="button"
                onClick={() => onSearch('')}
                className={`${s.textBtn} ${s.tc} absolute right-3 top-1/2 -translate-y-1/2`}
                aria-label="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            ) : null}
          </div>
          <FilterDropdown
            value={shownDepts}
            allOption={shownDepts.length > 0 ? `${labels.departmentsCount} (${shownDepts.length})` : labels.allDepartments}
            onValueChange={onDepts}
            options={deptOptions}
          />
          <FilterDropdown
            value={shownLocs}
            allOption={shownLocs.length > 0 ? `${labels.locationsCount} (${shownLocs.length})` : labels.allLocations}
            onValueChange={onLocs}
            options={locOptions}
          />
        </div>
        {hasFilters ? (
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className={`${s.detailMono} font-mono text-[color:var(--car-muted,#929292)]`}>
              {count > 0 ? (
                <>
                  {labels.showing} <span className="text-[color:var(--car-fg-2,#212121)]">{count}</span> {count === 1 ? labels.role : labels.roles}
                  {search.length >= 3 && ` ${labels.matching} "${search}"`}
                  {shownDepts.length > 0 && ` in ${shownDepts.length} ${shownDepts.length === 1 ? labels.inDept : labels.inDepts}`}
                  {shownLocs.length > 0 && `, ${shownLocs.length} ${shownLocs.length === 1 ? labels.location : labels.locations}`}
                </>
              ) : (
                labels.noMatch
              )}
            </p>
            <button type="button" onClick={clearAll} className={`${s.detailMono} ${s.textBtn} ${s.tc} font-mono`}>
              {labels.clearFilters}
            </button>
          </div>
        ) : null}
      </div>
      {count > 0 ? (
        <CollapsibleDepartmentListings
          rows={filtered}
          initialExpanded={shownDepts.length <= 2 ? shownDepts : EMPTY}
          hrefFor={hrefFor}
          flagFor={flagFor}
          labels={labels}
        />
      ) : (
        <div className="py-16 text-center">
          <p className={`${s.body2} mb-4 text-[color:var(--car-muted,#929292)]`}>{hasFilters ? labels.noneFound : 'No positions available at the moment.'}</p>
          {hasFilters ? (
            <button type="button" onClick={clearAll} className={`${s.detailMono} ${s.textBtn} ${s.tc} font-mono`}>
              Clear filters →
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}
