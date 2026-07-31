import type { Metadata } from 'next'
import CareersExperience from '@/components/careers/CareersExperience'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Vahue and do meaningful work with an AI-native team built around ownership, growth, and respect.',
}

export default function CareersPage() {
  return <CareersExperience />
}
