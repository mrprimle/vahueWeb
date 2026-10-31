import type { Metadata } from 'next'
import EnterprisePage from '@/components/scale-clone/enterprise/EnterprisePage'

export const metadata: Metadata = {
  title: 'Enterprise | Scale clone',
}

export default function Page() {
  return <EnterprisePage />
}
