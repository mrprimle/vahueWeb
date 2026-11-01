import type { DocsContent } from './content'

/** Maps a live-site href (`/docs/...`) to this clone (the snapshotted landing) or to the live docs site. */
export function resolveHref(content: Pick<DocsContent, 'linkBase' | 'localPrefix'>, href: string) {
  if (/^https?:\/\//.test(href)) return href
  const { from, to } = content.localPrefix
  if (href === from || href.startsWith(from + '#') || href.startsWith(from + '?')) return to + href.slice(from.length)
  return content.linkBase + href
}

export const isLocal = (href: string) => href.startsWith('/') && !href.startsWith('//')

export type ThemePref = 'light' | 'dark' | 'system'

/** Mintlify persists the preference in localStorage under `isDarkMode` ('light' | 'dark' | 'system'). */
export const THEME_KEY = 'isDarkMode'

export function readThemePref(): ThemePref {
  try {
    const v = localStorage.getItem(THEME_KEY)
    if (v === 'true') return 'dark'
    if (v === 'false') return 'light'
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {}
  return 'light'
}

/** Same logic as Mintlify's head script, applied to the clone root before first paint (no theme flash). */
export const THEME_BOOT_SCRIPT = `(function(){var r=document.currentScript&&document.currentScript.parentElement;if(!r)return;var p=null;try{p=localStorage.getItem("${THEME_KEY}")}catch(e){}if(p==='true')p='dark';else if(p==='false')p='light';if(p!=='light'&&p!=='dark'&&p!=='system')p='light';var t=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;r.setAttribute('data-theme',t);r.setAttribute('data-theme-preference',p)})();`
