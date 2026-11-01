// labs.scale.com is its own site. Its top-level pages are cloned under /scale-clone/labs*; everything else
// (paper/post/leaderboard detail pages) links to the live site.
export const LABS_ORIGIN = 'https://labs.scale.com'

export const LABS_ROUTES: Record<string, string> = {
  '/': '/scale-clone/labs/',
  '/papers': '/scale-clone/labs-papers/',
  '/blog': '/scale-clone/labs-blog/',
  '/leaderboard': '/scale-clone/labs-leaderboard/',
  '/jobs': '/scale-clone/labs-jobs/',
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
  if (p === '/scale-clone/labs') return '/'
  if (p.startsWith('/scale-clone/labs-papers')) return '/papers'
  if (p.startsWith('/scale-clone/labs-blog')) return '/blog'
  if (p.startsWith('/scale-clone/labs-leaderboard')) return '/leaderboard'
  if (p.startsWith('/scale-clone/labs-jobs')) return '/jobs'
  return null
}

/** shadcn Button `outline` variant as labs overrides it (components/ui/button). Combine with s.btn. */
export const BTN_OUTLINE =
  'border border-[color:var(--color-ink)] bg-transparent text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-white text-[12px] leading-[1.5] uppercase tracking-[0.05em] rounded-none h-10 px-4 py-2'
/** size="icon" */
export const BTN_ICON =
  'border bg-transparent text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-white text-[12px] leading-[1.5] uppercase tracking-[0.05em] rounded-none h-10 w-10 border-[#d4d4d4]'
/** variant="black" (HubSpot dialog submit) */
export const BTN_BLACK =
  'bg-[color:var(--color-ink)] text-white text-[12px] leading-[1.5] uppercase tracking-[0.05em] rounded-none hover:opacity-75 transition-opacity h-10 px-4 py-2 w-fit'
