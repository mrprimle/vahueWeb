import type { Metadata } from 'next'
import GlobalPublicSectorPage from '@/components/scale-clone/global-public-sector/GlobalPublicSectorPage'

export const metadata: Metadata = {
  title: 'AI for the Global Public Sector (Scale clone)',
}

// Clone of scale.com/global-public-sector. Spec: reference-snapshots/scale-clone/global-public-sector.md
export default function Page() {
  return <GlobalPublicSectorPage />
}
