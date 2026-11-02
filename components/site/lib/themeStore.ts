'use client'

import { useCallback } from 'react'
import { create } from 'zustand'

export type PageTheme = 'light' | 'dark'

// Scale module 397256: setPageTheme waits 50ms, the Immediate variant does not.
let pending: ReturnType<typeof setTimeout> | null = null

type ThemeState = {
  pageTheme: PageTheme
  setPageThemeImmediate: (theme: PageTheme) => void
  setPageTheme: (theme: PageTheme) => void
  resetPageTheme: (theme?: PageTheme) => void
}

export const useThemeStore = create<ThemeState>((set) => {
  const delayed = (theme: PageTheme) => {
    if (pending) clearTimeout(pending)
    pending = setTimeout(() => {
      pending = null
      set({ pageTheme: theme })
      document.documentElement.setAttribute('data-theme', theme)
    }, 50)
  }
  return {
    pageTheme: 'light',
    setPageThemeImmediate: (theme) => {
      set({ pageTheme: theme })
      document.documentElement.setAttribute('data-theme', theme)
    },
    setPageTheme: delayed,
    resetPageTheme: (theme = 'light') => delayed(theme),
  }
})

/** Scale module 816332. */
export function useTheme() {
  const setTheme = useThemeStore((s) => s.setPageTheme)
  const resetTheme = useThemeStore((s) => s.resetPageTheme)
  const setSectionTheme = useCallback((el: Element | null, theme: PageTheme) => {
    el?.setAttribute('data-theme', theme)
  }, [])
  return { setTheme, resetTheme, setSectionTheme }
}

/** Scale `ep()` in module 474053: the route's default theme. Add dark-first routes here. */
export function routeTheme(pathname: string | null): PageTheme {
  return pathname === '/services/knowledge-agents' || pathname?.startsWith('/services/knowledge-agents/') || pathname === '/solutions/regulated-industries' ? 'dark' : 'light'
}
