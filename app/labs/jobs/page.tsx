import type { Metadata } from 'next'
import { contentScale as content } from '@/components/pages/labs-jobs/content.scale'
import { JobsPage } from '@/components/pages/labs-jobs/JobsPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <JobsPage content={content} />
}
