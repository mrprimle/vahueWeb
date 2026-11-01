// Static snapshot of https://labs.scale.com/jobs, captured 2026-11-01 from the RSC payload: the server passes
// `JobsList` (chunk 0yqh0pl17sga4.js, module 163195) a `greenhouseJobs` prop, the Greenhouse job-board API rows for
// the Research department, in server order. Only the fields JobsList renders are kept (id, title, location.name,
// updated_at, absolute_url). Rows link to the live Greenhouse postings. No runtime API calls.
// Re-capture: decode self.__next_f on the live page and read the `$L17` (JobsList) props.

export type LabsJob = {
  id: number
  title: string
  updated_at: string
  location: { name: string }
  absolute_url: string
}

export type LabsJobsContent = {
  capturedAt: string
  title: string
  intro: string
  empty: string
  greenhouseJobs: LabsJob[]
  /** JobsList's built-in fallback (`n`), rendered by labs only when greenhouseJobs is empty. */
  fallbackJobs: LabsJob[]
}

export const LABS_JOBS: LabsJobsContent = {
  capturedAt: '2026-11-01',
  title: '[Jobs]',
  intro: 'Open research positions at Scale Labs. Join us in advancing AI through rigorous evaluation and research.',
  empty: 'No open positions at the moment. Check back soon.',
  greenhouseJobs: [
    { id: 4728014005, title: 'Machine Learning Research Scientist, Evaluations', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; Seattle, WA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4728014005' },
    { id: 4528009005, title: 'Machine Learning Research Scientist, Post-Training', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; Seattle, WA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4528009005' },
    { id: 4534631005, title: 'ML Research Engineer, ML Systems', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; Seattle, WA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4534631005' },
    { id: 4675684005, title: 'Research Scientist, Agent Robustness', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4675684005' },
    { id: 4675694005, title: 'Research Scientist, AI Controls and Monitoring', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4675694005' },
    { id: 4677657005, title: 'Research Scientist, Frontier Risk Evaluations', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4677657005' },
    { id: 4696595005, title: 'Research Scientist, Safety Post Training', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4696595005' },
    { id: 4718431005, title: 'Senior Manager, Research Scientist', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4718431005' },
    { id: 4488520005, title: 'Senior / Staff Machine Learning Research Scientist, Agents', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; Seattle, WA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4488520005' },
    { id: 4618046005, title: 'Tech Lead Manager- MLRE, ML Systems', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4618046005' },
    { id: 4611448005, title: 'VP, Research', updated_at: '2026-10-22T14:10:38-04:00', location: { name: 'San Francisco, CA; New York, NY' }, absolute_url: 'https://job-boards.greenhouse.io/scaleai/jobs/4611448005' },
  ],
  fallbackJobs: [
    { id: 1, title: 'Audio Multichallenge', updated_at: '2025-12-22T00:00:00Z', location: { name: 'America' }, absolute_url: '#' },
    { id: 2, title: 'PropensityBench', updated_at: '2025-06-17T00:00:00Z', location: { name: 'London' }, absolute_url: '#' },
    { id: 3, title: 'Professional Reasoning Benchmark', updated_at: '2025-06-15T00:00:00Z', location: { name: 'America' }, absolute_url: '#' },
    { id: 4, title: 'Multimodal Safety Evaluation', updated_at: '2025-05-10T00:00:00Z', location: { name: 'San Francisco' }, absolute_url: '#' },
    { id: 5, title: 'Language Model Alignment', updated_at: '2025-04-28T00:00:00Z', location: { name: 'New York' }, absolute_url: '#' },
    { id: 6, title: 'Frontier Model Benchmarking', updated_at: '2025-03-20T00:00:00Z', location: { name: 'Remote' }, absolute_url: '#' },
  ],
}
