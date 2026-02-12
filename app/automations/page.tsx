import type { Metadata } from 'next'
import AutomationsPage from '@/components/pages/AutomationsPage'

export const metadata: Metadata = {
  title: 'Custom AI Automations',
  description:
    'End-to-end AI solutions tailored to your business needs. Custom AI automations that drive real results.',
}

export default function Automations() {
  return <AutomationsPage />
}
