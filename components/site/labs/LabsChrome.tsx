'use client'

// labs.scale.com root layout: `min-h-screen bg-white text-ink`, UnifiedHeader, <main>, UnifiedFooter, AppProviders (Lenis on home, `html.loaded`).
import { useEffect, type ReactNode } from 'react'
import { cn } from '@/components/site/lib/cn'
import { LabsFooter } from './LabsFooter'
import { LabsHeader } from './LabsHeader'
import { LabsLenis } from './LabsLenis'
import type { LabsChromeContent, LabsSearchEntry } from './types'

export function LabsChrome({ content, searchIndex, className, children }: { content: LabsChromeContent; searchIndex: LabsSearchEntry[]; className?: string; children: ReactNode }) {
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.classList.add('labs-loaded'), 100)
    return () => {
      clearTimeout(t)
      document.documentElement.classList.remove('labs-loaded')
    }
  }, [])
  return (
    <div className={cn('labs-root min-h-screen bg-white text-ink', className)}>
      <LabsLenis />
      <LabsHeader content={content} searchIndex={searchIndex} />
      <main>{children}</main>
      <LabsFooter content={content} />
    </div>
  )
}
