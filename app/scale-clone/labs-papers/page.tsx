import type { Metadata } from 'next'
import LabsShell from '@/components/scale-clone/labs-shared/LabsShell'
import LabsPapers from '@/components/scale-clone/labs-papers/LabsPapers'
import { LABS_PAPERS } from '@/components/scale-clone/labs-papers/content'

export const metadata: Metadata = {
  title: 'Papers | Scale Labs | Scale clone',
}

// 1:1 clone of https://labs.scale.com/papers (labs' ResearchTable) with Scale's own copy, static snapshot of the
// 88-paper list. Labs chrome from components/scale-clone/labs-shared (no Lenis: labs runs it on "/" only).
// Spec: reference-snapshots/scale-clone/labs-papers.md
// Static stand-in for the Inkeep index (rows mimic Inkeep's "[PAPERS] / title | Scale Labs / snippet").
const searchItems = LABS_PAPERS.papers.map((p) => ({
  kind: '[PAPERS]',
  title: `${p.title} | Scale Labs`,
  href: `/papers/${p.slug}`,
  snippet: `${p.categories.join(', ')} ${p.date} ${p.title} ${p.authors}`,
}))

export default function ScaleLabsPapersPage() {
  return (
    <LabsShell searchItems={searchItems}>
      <LabsPapers content={LABS_PAPERS} />
    </LabsShell>
  )
}
