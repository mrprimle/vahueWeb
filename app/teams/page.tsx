import type { Metadata } from 'next'
import TeamsPage from '@/components/pages/TeamsPage'

export const metadata: Metadata = {
  title: 'AI Training for Teams',
  description:
    'AI programs, consulting, and strategy sessions for teams ready to bring AI into their everyday work.',
}

export default function Teams() {
  return <TeamsPage />
}
