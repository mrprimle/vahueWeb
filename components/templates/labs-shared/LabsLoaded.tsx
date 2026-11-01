'use client'

import { useEffect } from 'react'

/*
 * labs' ThemeProvider (chunk 2ri_cj1i8zivb.js) adds `loaded` to <html> 100ms after mount; its global CSS then sets
 *   @media (prefers-reduced-motion: no-preference) { html.loaded * { transition: background-color .2s ease-in-out,
 *     border-color .2s ease-in-out, color .2s ease-in-out } }
 * which (higher specificity) replaces every utility transition on the page: hover colours ease over 200ms, while
 * opacity/transform utilities (paper preview crossfade, arrow nudges) switch instantly. Mirrored with a scoped
 * html class (removed on unmount so other clone routes are unaffected); the rule lives in labs.module.css.
 */
export default function LabsLoaded() {
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.classList.add('labs-loaded'), 100)
    return () => {
      clearTimeout(t)
      document.documentElement.classList.remove('labs-loaded')
    }
  }, [])
  return null
}
