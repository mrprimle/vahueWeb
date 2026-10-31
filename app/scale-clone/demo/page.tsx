import type { Metadata } from 'next'
import DemoPage from '@/components/scale-clone/demo/DemoPage'
import { scaleDemoContent } from '@/components/scale-clone/demo/content'

export const metadata: Metadata = {
  title: 'Contact us | Scale clone',
}

// 1:1 clone of scale.com/demo with Scale's own copy. The form validates client-side only and never submits anywhere.
// Spec: reference-snapshots/scale-clone/demo.md
export default function DemoClonePage() {
  return <DemoPage content={scaleDemoContent} />
}
