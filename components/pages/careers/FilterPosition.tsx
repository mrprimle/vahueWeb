'use client'

// Scale module 442707 (FilterPosition, CollapsibleDepartmentListings, the multi-select dropdown) with 165311 (Greenhouse fetch) and 242648 (flags).
// The board is a static snapshot: `fetchJobs` resolves the jobs the page was given and never touches the network, so the loading branch still runs once.
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useLenis } from 'lenis/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/components/site/lib/cn'
import { ScrollTrigger } from '@/components/site/lib/gsap'
import { DEPARTMENT_ICON_PATHS } from './icons'
import type { BoardStrings, CareersJob } from './types'

const US = '/careers/flags/united-states-of-america.svg'
// Module 242648 `e`, the entries this board's locations reach. Unknown token: the earth icon, as on Scale.
const FLAGS: Record<string, string> = {
  'United States': US,
  TX: US,
  CA: US,
  NY: US,
  DC: US,
  MO: US,
  WA: US,
  HI: US,
  CO: US,
  FL: US,
  Mexico: '/careers/flags/mexico.svg',
  MX: '/careers/flags/mexico.svg',
  Canada: '/careers/flags/canada.svg',
  'United Kingdom': '/careers/flags/united-kingdom.svg',
  UK: '/careers/flags/united-kingdom.svg',
  Qatar: '/careers/flags/qatar.svg',
  'Saudi Arabia': '/careers/flags/saudi-arabia.svg',
  UAE: '/careers/flags/united-arab-emirates.svg',
  India: '/careers/flags/india.svg',
}
const flagFor = (name = '') => {
  const trimmed = name.trim()
  const token = trimmed ? trimmed.split(/,\s*/).pop()?.trim() || trimmed : ''
  return FLAGS[token] ?? '/careers/earth.svg'
}

// Module 442707 `ra`. Names that aren't here take the default icon. The last three are ours (filled board).
const DEPARTMENT_ICONS: Record<string, string> = {
  'Data Science and Analytics': 'DataScience',
  Engineering: 'Engineering',
  Finance: 'CFO',
  'Human Frontier Collective': 'HumanFrontier',
  IT: 'IT',
  Legal: 'Legal',
  'Marketing and Communications': 'Marketing',
  Operations: 'Operations',
  People: 'People',
  'Product and Design': 'Product',
  'Public Sector': 'Federal',
  Research: 'Research',
  Sales: 'Sales',
  University: 'University',
  'Expert Network': 'HumanFrontier',
  'Regulated Industries': 'Federal',
  'Early Careers': 'University',
}

function DepartmentIcon({ name, size = 18 }: { name: string; size?: number }) {
  const paths = DEPARTMENT_ICON_PATHS[DEPARTMENT_ICONS[name] ?? 'Default'] ?? DEPARTMENT_ICON_PATHS.Default
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height={size} width={size} xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z" />
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

const ChevronIcon = memo(function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={cn('transition-transform duration-300 ease-out', isOpen ? 'rotate-180' : 'rotate-0')} aria-hidden>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
})

function MultiSelect({ options, allOption, onValueChange, value }: { options: string[]; allOption: string; onValueChange: (next: string[]) => void; value: string[] }) {
  const lenis = useLenis()
  const timer = useRef(0)
  const refresh = useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      timer.current = 0
      requestAnimationFrame(() => {
        lenis?.resize()
        ScrollTrigger.refresh()
      })
    }, 120)
  }, [lenis])
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const [selected, setSelected] = useState(value)
  // Scale's dependency is `value` by reference, so "Clear filters" doesn't reach this state on Scale either: see the spec.
  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(selected)) setSelected(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const toggle = useCallback(
    (item: string) => {
      setSelected((current) => {
        const next = current.includes(item) ? current.filter((v) => v !== item) : [...current, item]
        queueMicrotask(() => onValueChange(next))
        return next
      })
    },
    [onValueChange],
  )
  const active = selected.length > 0
  return (
    <DropdownMenu.Root onOpenChange={() => refresh()}>
      <DropdownMenu.Trigger
        className={cn(
          'flex items-center justify-between gap-2 pl-4 pr-3 py-2.5 rounded-xl border body3 transition-colors focus:outline-none',
          'w-full sm:w-56',
          active ? 'bg-scale-gray-10 border-scale-gray-10 text-white' : 'bg-scale-gray-95 border-scale-gray-90 text-scale-gray-60 hover:border-scale-gray-30 hover:text-scale-gray-30',
        )}
      >
        <span className="truncate">{allOption}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white border border-scale-gray-90 rounded-xl shadow-lg z-50 max-h-[60vh] overflow-y-auto w-[calc(100vw-2rem)] sm:w-72" align="start" sideOffset={6}>
          {options.map((option) => (
            <DropdownMenu.CheckboxItem
              key={option}
              className="flex items-center gap-3 px-4 py-3 border-b border-scale-gray-95 last:border-none cursor-pointer hover:bg-scale-gray-95 transition-colors focus:outline-none"
              checked={selected.includes(option)}
              onCheckedChange={() => toggle(option)}
            >
              <span className={cn('flex-shrink-0 w-4 h-4 rounded border transition-colors flex items-center justify-center', selected.includes(option) ? 'bg-scale-gray-10 border-scale-gray-10' : 'border-scale-gray-60')}>
                <DropdownMenu.ItemIndicator>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </DropdownMenu.ItemIndicator>
              </span>
              <span className="body3 text-scale-gray-10">{option}</span>
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const PositionItem = memo(function PositionItem({ position, s }: { position: CareersJob; s: BoardStrings }) {
  return (
    <Link href={position.href} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-8 md:pl-16 pr-6 py-4 border-t border-scale-gray-90 hover:bg-scale-gray-90 transition-colors" aria-label={`${position.title} — ${position.location}`}>
      <span className="body2-regular text-scale-gray-10 group-hover:text-black transition-colors">{position.title}</span>
      <div className="flex flex-col items-start gap-2 shrink-0 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex items-center gap-1.5">
          <Image src={flagFor(position.location)} width={20} height={14} alt="" aria-hidden className="w-5 h-3.5" />
          <span className="detail-mono text-scale-gray-60">{position.location}</span>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            window.open(position.applyUrl, '_blank', 'noopener,noreferrer')
          }}
          className="detail-mono text-scale-gray-30 hover:text-scale-gray-10 transition-colors whitespace-nowrap"
          aria-label={`${s.applyAria} ${position.title}`}
        >
          {s.apply}
        </button>
      </div>
    </Link>
  )
})

const DepartmentSection = memo(function DepartmentSection({ departmentName, positions, isOpen, onToggle, onLayoutTransitionEnd, s }: { departmentName: string; positions: CareersJob[]; isOpen: boolean; onToggle: () => void; onLayoutTransitionEnd?: () => void; s: BoardStrings }) {
  const id = useMemo(() => `department-${departmentName.replace(/\s+/g, '-').toLowerCase()}`, [departmentName])
  const count = positions.length
  return (
    <div className="border-b border-scale-gray-90 last:border-b-0">
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-scale-gray-95 transition-colors focus:outline-none" aria-expanded={isOpen} aria-controls={id}>
        <div className="flex items-center gap-3 flex-1">
          <span className="text-scale-gray-60 shrink-0">
            <DepartmentIcon name={departmentName} />
          </span>
          <div>
            <h3 className="header6 text-scale-gray-10">{departmentName}</h3>
            <p className="detail-mono text-scale-gray-60 mt-0.5">
              {count} {count === 1 ? s.role : s.roles}
            </p>
          </div>
        </div>
        <span className="text-scale-gray-60 ml-4 shrink-0">
          <ChevronIcon isOpen={isOpen} />
        </span>
      </button>
      <div
        className={cn('grid transition-all duration-300 ease-out', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget) onLayoutTransitionEnd?.()
        }}
      >
        <div className="overflow-hidden">
          <div id={id} className="bg-scale-gray-95" role="region" aria-label={`${departmentName} ${s.positionsSuffix}`}>
            {positions.map((position, index) => (
              <PositionItem key={`${position.id}-${index}`} position={position} s={s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

const CollapsibleDepartmentListings = memo(function CollapsibleDepartmentListings({ positions, className, initialExpandedDepartments = [], s }: { positions: CareersJob[]; className?: string; initialExpandedDepartments?: string[]; s: BoardStrings }) {
  const lenis = useLenis()
  const refreshTimer = useRef(0)
  const allTimer = useRef(0)
  const refresh = useCallback(() => {
    window.clearTimeout(refreshTimer.current)
    refreshTimer.current = window.setTimeout(() => {
      refreshTimer.current = 0
      requestAnimationFrame(() => {
        lenis?.resize()
        ScrollTrigger.refresh()
      })
    }, 50)
  }, [lenis])
  useEffect(
    () => () => {
      window.clearTimeout(refreshTimer.current)
      refreshTimer.current = 0
      window.clearTimeout(allTimer.current)
      allTimer.current = 0
    },
    [],
  )
  const [open, setOpen] = useState(() => new Set(initialExpandedDepartments))
  const groups = useMemo(() => {
    const byName: Record<string, CareersJob[]> = {}
    positions.forEach((position) => {
      const name = position.department
      if (name) (byName[name] ||= []).push(position)
    })
    return Object.entries(byName)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, list]) => ({ name, positions: list.sort((a, b) => a.title.localeCompare(b.title)), count: list.length }))
  }, [positions])
  const names = useMemo(() => groups.map((group) => group.name), [groups])
  const toggle = useCallback((name: string) => {
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])
  const expandAll = useCallback(() => {
    setOpen(new Set(names))
    window.clearTimeout(allTimer.current)
    allTimer.current = window.setTimeout(() => {
      allTimer.current = 0
      refresh()
    }, 340)
  }, [names, refresh])
  const collapseAll = useCallback(() => {
    setOpen(new Set())
    window.clearTimeout(allTimer.current)
    allTimer.current = window.setTimeout(() => {
      allTimer.current = 0
      refresh()
    }, 340)
  }, [refresh])
  const total = positions.length
  const groupCount = groups.length
  const openCount = open.size
  const allOpen = openCount === groupCount
  if (groupCount === 0) {
    return (
      <div className={cn('w-full text-center py-12', className)}>
        <p className="body2-regular text-scale-gray-60">{s.noPositionsFound}</p>
      </div>
    )
  }
  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <p className="detail-mono text-scale-gray-60">
          <span className="text-scale-gray-10">{total}</span> {total === 1 ? s.role : s.roles} {s.across} <span className="text-scale-gray-10">{groupCount}</span> {groupCount === 1 ? s.department : s.departments}
        </p>
        {groupCount > 1 ? (
          <div className="flex items-center gap-4">
            <button type="button" onClick={allOpen ? collapseAll : expandAll} className="detail-mono text-scale-gray-60 hover:text-scale-gray-10 transition-colors">
              {allOpen ? s.collapseAll : s.expandAll}
            </button>
            {openCount > 0 ? (
              <span className="detail-mono text-scale-gray-60">
                {openCount} {s.of} {groupCount} {s.expanded}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="border-t border-scale-gray-90">
        {groups.map((group) => (
          <DepartmentSection key={group.name} departmentName={group.name} positions={group.positions} isOpen={open.has(group.name)} onToggle={() => toggle(group.name)} onLayoutTransitionEnd={refresh} s={s} />
        ))}
      </div>
    </div>
  )
})

/** Module 161843, the part this board reads: `?department=` from the URL, updated on popstate. */
function useUrlSearch() {
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  useEffect(() => {
    const read = () => setSearch(window.location.search)
    read()
    window.addEventListener('popstate', read)
    return () => window.removeEventListener('popstate', read)
  }, [pathname])
  return search
}

// Scale's payload passes these two as `[]`, which stays truthy: the trigger labels and the "in N depts" text therefore never change there. Kept.
const NONE: string[] = []

export function FilterPosition({ jobs, className, s }: { jobs: CareersJob[]; className?: string; s: BoardStrings }) {
  const root = useRef<HTMLDivElement>(null)
  const search = useUrlSearch()
  const [listings, setListings] = useState<CareersJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState<{ searchString: string; selectedDepartments: string[]; selectedLocations: string[] }>({ searchString: '', selectedDepartments: [], selectedLocations: [] })

  useEffect(() => {
    let live = true
    void Promise.resolve(jobs).then((list) => {
      if (!live) return
      setListings(list)
      setIsLoading(false)
    })
    return () => {
      live = false
    }
  }, [jobs])

  useEffect(() => {
    const department = new URLSearchParams(search).get('department')
    setState((current) => ({ ...current, selectedDepartments: department ? [decodeURIComponent(department)] : [] }))
  }, [search])

  const departmentOptions = useMemo(() => [...new Set(listings.map((job) => job.department))].filter(Boolean).sort((a, b) => a.localeCompare(b)), [listings])
  const locationOptions = useMemo(() => [...new Set(listings.flatMap((job) => job.location.split(';').map((name) => name.trim())))].sort(), [listings])
  const { searchString, selectedDepartments, selectedLocations } = state
  const filtered = useMemo(
    () =>
      listings
        .flatMap((job) => job.location.split(';').map((name) => ({ ...job, location: name.trim() })))
        .filter((job) => {
          const inDepartment =
            selectedDepartments.length === 0 ||
            selectedDepartments.some((name) => name === job.department || ((name === 'Communications' || name === 'Marketing') && job.department === 'Marketing and Communications') || (name === 'Enterprise EPD' && job.department === 'Product and Design'))
          const inLocation = selectedLocations.length === 0 || selectedLocations.some((name) => job.location.includes(name.trim()))
          const inSearch = searchString.length < 3 || job.title?.toLowerCase().includes(searchString.toLowerCase())
          return inDepartment && inLocation && inSearch
        }),
    [listings, selectedDepartments, selectedLocations, searchString],
  )
  const hasActiveFilters = selectedDepartments.length > 0 || selectedLocations.length > 0 || searchString.length > 0
  const total = filtered.length

  const scrollToBoard = () => root.current?.scrollIntoView({ behavior: 'smooth' })
  const onDepartments = useCallback((next: string[]) => {
    setState((current) => ({ ...current, selectedDepartments: next }))
    root.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  const onLocations = useCallback((next: string[]) => {
    setState((current) => ({ ...current, selectedLocations: next }))
    root.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  const onSearch = (next: string) => {
    setState((current) => ({ ...current, searchString: next }))
    scrollToBoard()
  }
  const onClear = () => {
    setState({ searchString: '', selectedDepartments: [], selectedLocations: [] })
    scrollToBoard()
  }
  const shownDepartments = NONE
  const shownLocations = NONE

  if (isLoading) {
    return (
      <div className={cn('w-full', className)} ref={root}>
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-scale-gray-90 border-t-scale-gray-30 rounded-full animate-spin" />
          <span className="ml-3 detail-mono text-scale-gray-60">{s.loading}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)} ref={root}>
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm pb-6 pt-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder={s.searchPlaceholder}
              value={searchString}
              onChange={({ target: { value } }) => onSearch(value)}
              onKeyDown={({ key }) => {
                if (key === 'Escape') onSearch('')
              }}
              className={cn('w-full sm:w-64 pl-4 pr-9 py-2.5 rounded-xl border body3', 'bg-scale-gray-95 border-scale-gray-90 text-scale-gray-10', 'placeholder:text-scale-gray-60', 'focus:outline-none focus:border-scale-gray-30 transition-colors')}
              aria-label={s.searchAria}
            />
            {searchString ? (
              <button type="button" onClick={() => onSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-scale-gray-60 hover:text-scale-gray-10 transition-colors" aria-label={s.clearSearchAria}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            ) : null}
          </div>
          <MultiSelect value={shownDepartments} allOption={shownDepartments.length > 0 ? `${s.departmentsCount} (${shownDepartments.length})` : s.allDepartments} onValueChange={onDepartments} options={departmentOptions} />
          <MultiSelect value={shownLocations} allOption={shownLocations.length > 0 ? `${s.locationsCount} (${shownLocations.length})` : s.allLocations} onValueChange={onLocations} options={locationOptions} />
        </div>
        {hasActiveFilters ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
            <p className="detail-mono text-scale-gray-60">
              {total > 0 ? (
                <>
                  {s.showing} <span className="text-scale-gray-10">{total}</span> {total === 1 ? s.role : s.roles}
                  {searchString.length >= 3 && ` ${s.matching} "${searchString}"`}
                  {shownDepartments.length > 0 && ` ${shownDepartments.length === 1 ? s.inDepartment : s.inDepartments.replace('{n}', String(shownDepartments.length))}`}
                  {shownLocations.length > 0 && `, ${shownLocations.length} ${shownLocations.length === 1 ? s.location : s.locations}`}
                </>
              ) : (
                s.noRolesCriteria
              )}
            </p>
            <button type="button" onClick={onClear} className="detail-mono text-scale-gray-60 hover:text-scale-gray-10 transition-colors">
              {s.clearFilters}
            </button>
          </div>
        ) : null}
      </div>
      {total > 0 ? (
        <CollapsibleDepartmentListings positions={filtered} className="mt-2" initialExpandedDepartments={shownDepartments.length <= 2 ? shownDepartments : []} s={s} />
      ) : (
        <div className="py-16 text-center">
          <p className="body2-regular text-scale-gray-60 mb-4">{hasActiveFilters ? s.noPositionsFilters : s.noPositionsAvailable}</p>
          {hasActiveFilters ? (
            <button onClick={onClear} className="detail-mono text-scale-gray-30 hover:text-scale-gray-10 transition-colors">
              {s.clearFiltersArrow}
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}
