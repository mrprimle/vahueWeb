import type { Metadata } from 'next'
import AboutPage from '@/components/scale-clone/about/AboutPage'
import { scaleAboutContent } from '@/components/scale-clone/about/content'

export const metadata: Metadata = {
  title: 'About | Scale clone',
}

// 1:1 clone of scale.com/about with Scale's own copy. Spec: reference-snapshots/scale-clone/about.md
export default function ScaleAboutPage() {
  return <AboutPage content={scaleAboutContent} />
}
