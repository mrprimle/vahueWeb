import type { Metadata } from 'next'
import TeamTrainingPage from '@/components/pages/TeamTrainingPage'

export const metadata: Metadata = {
  title: 'AI Team Training | Vahue',
  description:
    'Hands-on AI training programs that get your entire team using AI tools within 7 days. Workshops, multi-week programs, and leadership advisory.',
}

export default function Page() {
  return <TeamTrainingPage />
}
