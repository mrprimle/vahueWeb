import type { Metadata } from 'next'
import { content } from '@/components/pages/enterprise-insurance/content.scale'
import { EnterpriseInsurancePage } from '@/components/pages/enterprise-insurance/EnterpriseInsurancePage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <EnterpriseInsurancePage content={content} />
}
