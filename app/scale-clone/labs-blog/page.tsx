import type { Metadata } from 'next'
import LabsShell from '@/components/scale-clone/labs-shared/LabsShell'
import LabsBlog from '@/components/scale-clone/labs-blog/LabsBlog'
import { LABS_BLOG } from '@/components/scale-clone/labs-blog/content'

export const metadata: Metadata = {
  title: 'Blog | Scale Labs | Scale clone',
}

// 1:1 clone of https://labs.scale.com/blog (labs' BlogList) with Scale's own copy, static snapshot of the
// 28-post list. Labs chrome from components/scale-clone/labs-shared (no Lenis: labs runs it on "/" only).
// Spec: reference-snapshots/scale-clone/labs-blog.md
// Static stand-in for the Inkeep index (rows mimic Inkeep's "[BLOG] / title | Scale Labs / snippet").
const searchItems = LABS_BLOG.posts.map((p) => ({
  kind: '[BLOG]',
  title: `${p.title} | Scale Labs`,
  href: p.slug ? `/blog/${p.slug}` : '/blog',
  snippet: `${p.categories.join(', ')} ${p.intro ?? ''}`.trim(),
}))

export default function ScaleLabsBlogPage() {
  return (
    <LabsShell searchItems={searchItems}>
      <LabsBlog content={LABS_BLOG} />
    </LabsShell>
  )
}
