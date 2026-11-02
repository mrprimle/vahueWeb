'use client'

// labs.scale.com module 627256 (UnifiedFooter). Class strings verbatim.
import Link from 'next/link'
import { useState } from 'react'
import { LabsButton } from './LabsButton'
import { LabsNewsletterDialog } from './LabsNewsletterDialog'
import type { LabsChromeContent } from './types'

export function LabsFooter({ content }: { content: LabsChromeContent }) {
  const [open, setOpen] = useState(false)
  const f = content.footer
  return (
    <footer className="w-full border-t border-hairline bg-white">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 border-b border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button type="button" onClick={() => setOpen(true)} className="text-left group">
          <p className="text-sm font-sans font-medium text-ink uppercase tracking-wider mb-1 group-hover:underline underline-offset-2">{f.title}</p>
          <p className="text-xs font-sans text-neutral-600">{f.blurb}</p>
        </button>
        <LabsButton variant="outline" onClick={() => setOpen(true)} className="shrink-0">
          {f.subscribe}
        </LabsButton>
      </div>
      <LabsNewsletterDialog open={open} onOpenChange={setOpen} content={content.newsletter} />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-sans text-neutral-600">
          {f.copyrightPrefix}{' '}
          <Link href={f.copyrightEntity.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink hover:underline hover:underline-offset-2 decoration-from-font">
            {f.copyrightEntity.label}
          </Link>{' '}
          {f.copyrightSuffix}
        </p>
        <div className="flex items-center gap-4">
          {f.links.map((l) => (
            <Link key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-xs font-sans text-neutral-600 hover:text-ink transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
