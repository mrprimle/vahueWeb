import type { Metadata } from 'next'
import PartnershipPage from '@/components/scale-clone/partnership/PartnershipPage'
import { scalePartnershipContent } from '@/components/scale-clone/partnership/content'

export const metadata: Metadata = {
  title: 'Scale Partners | Scale clone',
}

// 1:1 clone of scale.com/partnership with Scale's own copy. Spec: reference-snapshots/scale-clone/partnership.md
export default function ScalePartnershipPage() {
  return <PartnershipPage content={scalePartnershipContent} />
}
