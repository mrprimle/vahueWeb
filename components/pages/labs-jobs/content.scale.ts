// Scale's original strings for labs.scale.com/jobs, read from the page's HTML on 2026-11-02. All 11 rows on the live page.
import type { LabsJobsContent } from './types'

const GH = 'https://job-boards.greenhouse.io/scaleai/jobs'
const DATE = '10.22.2026'
const THREE = 'San Francisco, CA; Seattle, WA; New York, NY'
const TWO = 'San Francisco, CA; New York, NY'

export const contentScale: LabsJobsContent = {
  meta: {
    title: 'Jobs - Scale Labs | Scale Labs',
    description: 'Open research positions at Scale Labs. Join our team advancing AI evaluation, safety, and benchmarking.',
  },
  heading: '[Jobs]',
  blurb: 'Open research positions at Scale Labs. Join us in advancing AI through rigorous evaluation and research.',
  columns: { date: 'Date', position: 'Position', location: 'Location' },
  items: [
    { title: 'Machine Learning Research Scientist, Evaluations', location: THREE, date: DATE, href: `${GH}/4728014005` },
    { title: 'Machine Learning Research Scientist, Post-Training', location: THREE, date: DATE, href: `${GH}/4528009005` },
    { title: 'ML Research Engineer, ML Systems', location: THREE, date: DATE, href: `${GH}/4534631005` },
    { title: 'Research Scientist, Agent Robustness', location: TWO, date: DATE, href: `${GH}/4675684005` },
    { title: 'Research Scientist, AI Controls and Monitoring', location: TWO, date: DATE, href: `${GH}/4675694005` },
    { title: 'Research Scientist, Frontier Risk Evaluations', location: TWO, date: DATE, href: `${GH}/4677657005` },
    { title: 'Research Scientist, Safety Post Training', location: TWO, date: DATE, href: `${GH}/4696595005` },
    { title: 'Senior Manager, Research Scientist', location: TWO, date: DATE, href: `${GH}/4718431005` },
    { title: 'Senior / Staff Machine Learning Research Scientist, Agents', location: THREE, date: DATE, href: `${GH}/4488520005` },
    { title: 'Tech Lead Manager- MLRE, ML Systems', location: TWO, date: DATE, href: `${GH}/4618046005` },
    { title: 'VP, Research', location: TWO, date: DATE, href: `${GH}/4611448005` },
  ],
}
