import type { Metadata } from 'next'
import { content } from '@/components/pages/public-sector-national-security/content'
import { NationalSecurityPage } from '@/components/pages/public-sector-national-security/NationalSecurityPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <NationalSecurityPage content={content} />
}
