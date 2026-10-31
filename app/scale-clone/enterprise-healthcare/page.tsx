import type { Metadata } from 'next'
import HealthcarePage from '@/components/scale-clone/enterprise-healthcare/HealthcarePage'
import { scaleHealthcareContent } from '@/components/scale-clone/enterprise-healthcare/content'

export const metadata: Metadata = {
  title: 'Healthcare | Scale clone',
}

// 1:1 clone of scale.com/enterprise/healthcare with Scale's own copy. Spec: reference-snapshots/scale-clone/enterprise-healthcare.md
export default function EnterpriseHealthcarePage() {
  return <HealthcarePage content={scaleHealthcareContent} />
}
