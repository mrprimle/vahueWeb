// labs.scale.com is its own site. Its top-level pages are cloned under /labs*; everything else
// (paper/post/leaderboard detail pages) links to the live site.
export const LABS_ORIGIN = 'https://labs.scale.com'

export const LABS_ROUTES: Record<string, string> = {
  '/': '/labs/',
  '/papers': '/labs-papers/',
  '/blog': '/labs-blog/',
  '/leaderboard': '/labs-leaderboard/',
  '/jobs': '/labs-jobs/',
}

/** Map a labs.scale.com href to the clone route when one exists, else the absolute live URL. */
export function labsHref(href: string): string {
  if (/^https?:\/\//.test(href)) return href
  return LABS_ROUTES[href] ?? LABS_ORIGIN + href
}

/** Which labs section a clone pathname belongs to (for the header's active state). */
export function labsSection(pathname: string | null): '/' | '/papers' | '/blog' | '/leaderboard' | '/jobs' | null {
  if (!pathname) return null
  const p = pathname.replace(/\/$/, '')
  if (p === '/labs') return '/'
  if (p.startsWith('/labs-papers')) return '/papers'
  if (p.startsWith('/labs-blog')) return '/blog'
  if (p.startsWith('/labs-leaderboard')) return '/leaderboard'
  if (p.startsWith('/labs-jobs')) return '/jobs'
  return null
}

/** shadcn Button `outline` variant as labs overrides it (components/ui/button). Combine with s.btn. */
export const BTN_OUTLINE =
  'border border-[color:var(--color-ink)] bg-transparent text-[color:var(--color-ink)] [@media(hover:hover){&:hover}]:bg-[color:var(--color-ink)] [@media(hover:hover){&:hover}]:text-white text-[12px] leading-[1.5] uppercase tracking-[0.05em] rounded-none h-10 px-4 py-2'
/** size="icon" */
export const BTN_ICON =
  'border bg-transparent text-[color:var(--color-ink)] [@media(hover:hover){&:hover}]:bg-[color:var(--color-ink)] [@media(hover:hover){&:hover}]:text-white text-[12px] leading-[1.5] uppercase tracking-[0.05em] rounded-none h-10 w-10 border-[#d4d4d4]'
/** variant="black" (HubSpot dialog submit) */
export const BTN_BLACK =
  'bg-[color:var(--color-ink)] text-white text-[12px] leading-[1.5] uppercase tracking-[0.05em] rounded-none [@media(hover:hover){&:hover}]:opacity-75 transition-opacity h-10 px-4 py-2 w-fit'
