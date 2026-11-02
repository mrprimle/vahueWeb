'use client'

// Scale's /legal/* layout: a document list on the left (a scrolling row of pills on phones) and the document on the right.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '@/components/site/lib/cn'

const DOCUMENTS = [
  { label: 'Cookie Policy', href: '/legal/cookie' },
  { label: 'Data Processing Terms', href: '/legal/data-processing' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Use', href: '/legal/terms' },
]

const PROSE = `prose max-w-none
  prose-headings:font-aeonik prose-headings:font-normal prose-headings:tracking-normal prose-headings:text-black
  prose-h2:mt-14 prose-h2:border-t prose-h2:border-scale-gray-90 prose-h2:pt-10 prose-h2:text-3xl
  prose-h3:mt-12 prose-h3:text-2xl prose-h4:text-xl
  prose-p:text-scale-gray-30 prose-p:leading-8 prose-p:my-5
  prose-a:text-black prose-a:underline prose-a:decoration-scale-gray-80 prose-a:underline-offset-4 hover:prose-a:decoration-black
  prose-strong:font-medium prose-strong:text-black
  prose-li:text-scale-gray-30 prose-li:leading-8 prose-li:marker:text-scale-gray-60
  prose-ul:my-6 prose-ol:my-6`

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="bg-white border-b border-scale-gray-90 py-28 lg:py-36">
      <div className="grid-layout-mobile md:grid-layout-desktop">
        <aside className="col-span-full md:col-start-2 md:col-span-2">
          <p className="detail-mono text-scale-gray-60 mb-5">Legal</p>
          <nav aria-label="Legal documents" className="flex gap-2 overflow-x-auto pb-2 md:sticky md:top-28 md:max-h-[calc(100vh-8rem)] md:flex-col md:gap-0 md:overflow-y-auto md:pb-0">
            {DOCUMENTS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                aria-current={pathname === d.href ? 'page' : undefined}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 body3 no-underline transition-colors md:rounded-none md:border-0 md:border-l-2 md:px-4 md:py-2.5',
                  pathname === d.href
                    ? 'bg-scale-gray-95 text-black md:bg-transparent md:border-l-black'
                    : 'text-scale-gray-60 hover:text-black md:border-l-scale-gray-90 md:hover:text-black md:hover:border-l-scale-gray-30',
                )}
              >
                {d.label}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="col-span-full md:col-start-5 md:col-span-7 min-w-0">
          <div className="mb-10 border-b border-scale-gray-90 pb-8 lg:mb-12 lg:pb-10">
            <p className="detail-mono text-scale-gray-60 mb-4">Vahue</p>
            <h1 className="header2 text-black text-balance">{title}</h1>
          </div>
          <div className={PROSE}>{children}</div>
        </article>
      </div>
    </div>
  )
}
