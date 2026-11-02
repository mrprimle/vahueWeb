// Scale module 187078, function `l`: http(s) opens a new tab, anything else is a next/link.
import Link from 'next/link'
import type { ReactNode } from 'react'

export function EventLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
