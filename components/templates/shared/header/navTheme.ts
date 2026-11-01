// How a clone page tells the shared header which chrome theme to use.
//
// scale.com keeps a page-level theme ("light" | "dark") that swaps every --nav-* colour (header bar,
// dropdown, CTAs). Pages flip it from their own scroll logic (the homepage hero turns the header dark
// after 350px; dark-hero pages such as /public-sector/national-security start dark).
//
// Two ways to drive it here (Vahue's <html> already carries data-theme="dark", so it is never read):
// 1. Declarative: put data-nav-theme="dark" | "light" on any element. The header samples the element
//    under its bottom edge on every scroll frame and uses the closest data-nav-theme ancestor.
// 2. Imperative: setScaleNavTheme('dark') forces a theme until setScaleNavTheme(null) releases it
//    (call it from a ScrollTrigger onEnter/onLeaveBack, like Scale's setPageThemeImmediate).
export type NavTheme = 'light' | 'dark'

export const NAV_THEME_EVENT = 'templates:nav-theme'

export function setScaleNavTheme(theme: NavTheme | null) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<NavTheme | null>(NAV_THEME_EVENT, { detail: theme }))
}
