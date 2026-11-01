import type { Metadata } from 'next'
import DocsPage from '@/components/scale-clone/docs/DocsPage'
import { scaleDocsContent } from '@/components/scale-clone/docs/content'

export const metadata: Metadata = {
  title: 'Getting Started with Scale - Scale Documentation | Scale clone',
}

// 1:1 clone of the scale.com/docs landing (Mintlify site; canonical https://api-reference.scale.com/docs), static
// snapshot with Scale's own copy. Spec: reference-snapshots/scale-clone/docs.md
export default function Page() {
  return <DocsPage content={scaleDocsContent} />
}
