import type { Metadata } from 'next'
import GuidesPage from '@/components/scale-clone/guides/GuidesPage'

export const metadata: Metadata = {
  title: 'Guides | Scale clone',
}

// Structural clone of scale.com/guides. Spec: reference-snapshots/scale-clone/guides.md
export default function Page() {
  return <GuidesPage />
}
