import type { Metadata } from 'next'
import CareersPage from '@/components/scale-clone/careers/CareersPage'
import { scaleCareersContent } from '@/components/scale-clone/careers/content'

export const metadata: Metadata = {
  title: 'Careers | Scale clone',
}

// 1:1 clone of scale.com/careers with Scale's own copy and a static job-board snapshot. Spec: reference-snapshots/scale-clone/careers.md
export default function ScaleCareersPage() {
  return <CareersPage content={scaleCareersContent} />
}
