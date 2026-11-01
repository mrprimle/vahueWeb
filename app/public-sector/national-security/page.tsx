import type { Metadata } from 'next'
import VahueNationalSecurityPage from '@/components/public-sector/VahueNationalSecurityPage'

const PAGE_URL = 'https://vahue.ai/public-sector/national-security/'
const DESCRIPTION =
  'Governed AI agents on sensitive data in your own environment: in your VPC or on-premises, with review queues, approvals, role-based access and a full audit log.'

export const metadata: Metadata = {
  title: 'Governed Agents for Sensitive Data',
  description: DESCRIPTION,
  openGraph: { title: 'Governed Agents for Sensitive Data | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/public-sector/national-security layout (components/templates/public-sector-national-security) in Scale's own colours.
export default function NationalSecurityRoute() {
  return <VahueNationalSecurityPage />
}
