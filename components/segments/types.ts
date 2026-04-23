export type SegmentMicroJob = {
  key: string
  title: string
  oneLiner: string
  deliverables: string[]
  outcome: string
}

export type SegmentAha = {
  title: string
  body: string
}

export type SegmentValue = {
  metric: string
  label: string
}

export type SegmentCompetitor = {
  name: string
  blurb: string
}

export type SegmentBarrier = {
  objection: string
  response: string
}

export type SegmentContent = {
  slug: string
  eyebrow: string
  code: string
  title: string
  oneLiner: string
  heroIntro: string
  coreJob: {
    title: string
    body: string
    bullets: string[]
    ctaLabel: string
  }
  ahas: SegmentAha[]
  values: SegmentValue[]
  triggers: string[]
  emotions: string[]
  pains: string[]
  microJobs: SegmentMicroJob[]
  pointB: {
    emotions: string[]
    snapshot: string
    bigJobs: string[]
  }
  barriers: SegmentBarrier[]
  competitors: SegmentCompetitor[]
}
