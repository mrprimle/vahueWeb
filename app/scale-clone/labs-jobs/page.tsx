import type { Metadata } from 'next'
import LabsShell from '@/components/scale-clone/labs-shared/LabsShell'
import LabsJobs from '@/components/scale-clone/labs-jobs/LabsJobs'
import { LABS_JOBS } from '@/components/scale-clone/labs-jobs/content'

export const metadata: Metadata = {
  title: 'Jobs - Scale Labs | Scale Labs | Scale clone',
  description: 'Open research positions at Scale Labs. Join our team advancing AI evaluation, safety, and benchmarking.',
}

// 1:1 clone of https://labs.scale.com/jobs (labs' `JobsList`, module 163195) with Scale's own copy and a static
// snapshot of the Greenhouse job list (captured 2026-11-01). Rows open the live Greenhouse postings in a new tab.
// Labs chrome from components/scale-clone/labs-shared (no Lenis: labs runs it on "/" only).
// Spec: reference-snapshots/scale-clone/labs-jobs.md
// Static stand-in for the Inkeep index ("[JOBS] / title | Scale Labs / location").
const searchItems = LABS_JOBS.greenhouseJobs.map((j) => ({
  kind: '[JOBS]',
  title: `${j.title} | Scale Labs`,
  href: j.absolute_url,
  snippet: `${j.location.name} Research`,
}))

export default function ScaleLabsJobsPage() {
  return (
    <LabsShell searchItems={searchItems}>
      <LabsJobs content={LABS_JOBS} />
    </LabsShell>
  )
}
