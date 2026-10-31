import type { Metadata } from 'next'
import OperationsPage from '@/components/operations/OperationsPage'

const description =
  'How Vahue works: a two-week audit records the baseline, a pilot proves one workflow on your data, then we run the agents monthly with review queues, approvals, an audit log and a report against the baseline.'

export const metadata: Metadata = {
  title: 'How we operate',
  description,
  openGraph: {
    title: 'How we operate | Vahue',
    description: 'Audit, pilot, then operate: AI agents on your busiest workflows, run and measured by Vahue every month.',
    url: 'https://vahue.ai/operations/',
  },
  alternates: { canonical: 'https://vahue.ai/operations/' },
}

export default function Page() {
  return <OperationsPage />
}
