export type Cta = { text: string; url: string; smoothScrollTargetId?: string }

/** One entry of Scale's Greenhouse board, reduced to the fields module 442707 reads. `location` keeps Greenhouse's `;` separated list. */
export type CareersJob = {
  id: number
  title: string
  location: string
  department: string
  /** Row link (`/careers/<id>` on Scale). */
  href: string
  /** "Apply" opens this in a new tab (Greenhouse on Scale). */
  applyUrl: string
}

export type BoardStrings = {
  searchPlaceholder: string
  searchAria: string
  clearSearchAria: string
  allDepartments: string
  departmentsCount: string
  allLocations: string
  locationsCount: string
  loading: string
  showing: string
  role: string
  roles: string
  matching: string
  inDepartment: string
  inDepartments: string
  location: string
  locations: string
  noRolesCriteria: string
  noPositionsFound: string
  noPositionsFilters: string
  noPositionsAvailable: string
  clearFilters: string
  clearFiltersArrow: string
  across: string
  department: string
  departments: string
  expandAll: string
  collapseAll: string
  of: string
  expanded: string
  apply: string
  applyAria: string
  positionsSuffix: string
}

export type CareersContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: Cta; image: string }
  news: {
    overtitle: string
    title: string
    cta: string
    items: { key: string; label: string; title: string; href: string; bgClass: string }[]
  }
  mission: {
    overtitle: string
    title: string
    lead: string
    body: string
    products: string
    engine: { before: string; firstLink: { text: string; href: string }; middle: string; secondLink: { text: string; href: string }; after: string }
    platform: string
  }
  credos: {
    overtitle: string
    title: string
    subtitle: string
    items: { title: string; description: string; image: string }[]
  }
  benefits: {
    overtitle: string
    title: string
    subtitle: string
    items: { title: string; description: string; image: string }[]
  }
  openRoles: { overtitle: string; title: string; board: BoardStrings; jobs: CareersJob[] }
  university: { headline: string; cta: Cta; image: string }
}
