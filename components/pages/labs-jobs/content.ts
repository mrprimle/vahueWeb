// Copy for /labs/jobs. Keep first: Scale's string stays unless it is false for Vahue, brand words swap, the rest changes by a few words.
// Same shape and counts as content.scale.ts, static snapshot with Scale's 11 rows. The first six rows match the [Jobs] slice on /labs.
// The heading and title follow the site menu's name for this route (components/site/content.ts). PLACEHOLDER lines are for Mike: roles, date, locations, link.
import type { LabsJobsContent } from './types'

const LINK = '/careers#open-roles' // PLACEHOLDER: no job detail pages or applicant system yet; rows open the careers board
const JOB_DATE = '10.22.2026' // PLACEHOLDER
const THREE_CITIES = 'City, Country; City, Country; City, Country' // PLACEHOLDER
const TWO_CITIES = 'City, Country; City, Country' // PLACEHOLDER

export const content: LabsJobsContent = {
  meta: {
    title: 'Research Careers - Vahue Labs | Vahue Labs',
    description: 'Open research positions at Vahue Labs. Join our team advancing AI evaluation, safety, and benchmarking.',
  },
  heading: '[Research Careers]',
  blurb: 'Open research positions at Vahue Labs. Join us in advancing AI through rigorous evaluation and research.',
  columns: { date: 'Date', position: 'Position', location: 'Location' },
  items: [
    { title: 'Machine Learning Research Scientist, Evaluations', location: THREE_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
    { title: 'Machine Learning Research Scientist, Agent Baselines', location: THREE_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
    { title: 'ML Research Engineer, ML Systems', location: THREE_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
    { title: 'Research Scientist, Agent Robustness', location: TWO_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
    { title: 'Research Scientist, AI Controls and Monitoring', location: TWO_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
    { title: 'Research Scientist, Workflow Risk Evaluations', location: TWO_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
    { title: 'Research Scientist, Safety and Oversight', location: TWO_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
    { title: 'Senior Manager, Research Scientist', location: TWO_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
    { title: 'Senior / Staff Machine Learning Research Scientist, Agents', location: THREE_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
    { title: 'Tech Lead Manager- MLRE, ML Systems', location: TWO_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
    { title: 'VP, Research', location: TWO_CITIES, date: JOB_DATE, href: LINK }, // PLACEHOLDER
  ],
}
