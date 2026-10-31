import type { Metadata } from 'next'
import PhysicalAiPage from '@/components/scale-clone/physical-ai/PhysicalAiPage'

export const metadata: Metadata = {
  title: 'Physical AI | Scale clone',
}

export default function Page() {
  return <PhysicalAiPage />
}
