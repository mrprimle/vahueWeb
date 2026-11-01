import type { Metadata } from 'next'
import NationalSecurityPage from '@/components/scale-clone/public-sector-national-security/NationalSecurityPage'

export const metadata: Metadata = {
  title: 'Scale for National Security & Homeland Defense (Scale clone)',
}

// Clone of scale.com/public-sector/national-security. Spec: reference-snapshots/scale-clone/public-sector-national-security.md
export default function Page() {
  return <NationalSecurityPage />
}
