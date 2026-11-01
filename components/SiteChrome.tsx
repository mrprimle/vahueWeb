'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// /docs and /labs* bring their own header and footer (components/templates/docs, labs-shared), so the site's are hidden there.
const OWN_CHROME = /^\/(docs|labs)(\/|$)/

export default function SiteChrome({ children }: { children: ReactNode }) {
  return OWN_CHROME.test(usePathname() ?? '') ? null : <>{children}</>
}
