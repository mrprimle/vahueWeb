import type { Metadata } from 'next'
import { LegalPage } from '@/components/pages/legal/LegalPage'

export const metadata: Metadata = { title: 'Data Processing Terms', alternates: { canonical: '/legal/data-processing' } }

// The old site has no data processing text and this one isn't ours to write. Mike supplies it.
export default function Page() {
  return (
    <LegalPage title="Data Processing Terms">
      <p>
        This page is being updated. For our data processing terms, contact <a href="mailto:human@vahue.ai">human@vahue.ai</a>.
      </p>
    </LegalPage>
  )
}
