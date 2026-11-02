import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DocsShell } from '@/components/pages/docs/DocsShell'
import { content } from '@/components/pages/docs/content.scale'
import '@/components/pages/docs/docs.css'

export const metadata: Metadata = {
  title: `${content.landing.title} - ${content.siteName}`,
  description: content.landing.lead,
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsShell content={content}>{children}</DocsShell>
}
