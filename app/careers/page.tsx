import type { Metadata } from 'next'
import VahueCareersPage from '@/components/careers/VahueCareersPage'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Vahue and do meaningful work with an AI-native team built around ownership, growth, and respect.',
}

// Built on the scale.com/careers clone (components/templates/careers) in Scale's own colours.
export default function CareersPage() {
  return <VahueCareersPage />
}
