import type { Metadata } from 'next'
import DonovanPage from '@/components/scale-clone/donovan/DonovanPage'

export const metadata: Metadata = {
  title: 'Operator | Scale clone',
}

export default function Page() {
  return <DonovanPage />
}
