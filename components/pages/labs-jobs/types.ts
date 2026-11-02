import type { LabsJob } from '@/components/pages/labs/types'

export type LabsJobsContent = {
  meta: { title: string; description: string }
  heading: string
  blurb: string
  columns: { date: string; position: string; location: string }
  items: LabsJob[]
}
