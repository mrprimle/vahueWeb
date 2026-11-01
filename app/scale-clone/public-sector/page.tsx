import type { Metadata } from 'next'
import PublicSectorPage from '@/components/scale-clone/public-sector/PublicSectorPage'
import { scalePublicSectorContent } from '@/components/scale-clone/public-sector/content'

export const metadata: Metadata = {
  title: 'US Public Sector | Scale clone',
}

// 1:1 clone of scale.com/public-sector with Scale's own copy. Spec: reference-snapshots/scale-clone/public-sector.md
export default function ScalePublicSectorPage() {
  return <PublicSectorPage content={scalePublicSectorContent} />
}
