'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// The Scale clone routes bring their own header and footer, so the site chrome steps aside there.
export default function HideUnderClone({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/scale-clone')) return null
  return <>{children}</>
}
