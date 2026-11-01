'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// Clone routes whose source page is not a scale.com marketing page bring their own chrome
// (e.g. /docs is a Mintlify site with its own navbar, native scroll and no Scale footer).
// labs.scale.com is a separate site with its own header/footer (components/scale-clone/labs-shared/LabsShell).
const OWN_CHROME = [
  '/scale-clone/docs',
  '/scale-clone/labs',
  '/scale-clone/labs-papers',
  '/scale-clone/labs-leaderboard',
  '/scale-clone/labs-blog',
  '/scale-clone/labs-jobs',
]

export const hasOwnChrome = (pathname: string | null) =>
  !!pathname && OWN_CHROME.some((p) => pathname === p || pathname.startsWith(p + '/'))

// Renders the shared Scale chrome (header, footer, Lenis) except on routes that bring their own.
export default function CloneChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (hasOwnChrome(pathname)) return null
  return <>{children}</>
}
