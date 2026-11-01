import type { BlogPreviewPost } from '@/components/site/shared/BlogPreview'
import type { ImageAsset } from '@/components/site/shared/ResponsiveImage'
import type { RichBlock } from '@/components/site/shared/RichText'
import type { IconName } from './icons'

export type Logo = { alt: string; src?: string }
export type Cta = { text: string; url: string }

export type OrderGuidanceData = {
  brand: string
  suite: string
  title: string
  subtitle: string
  person: string
  personMeta: string
  system: string
  sources: { key: string; label: string; icon: IconName }[]
  recordLabel: string
  recordId: string
  fields: { first: [string, string]; second: [string, string]; window: [string, string]; indication: [string, string]; codes: [string, string] }
}

export type SchedulingData = {
  brand: string
  suite: string
  title: string
  subtitle: string
  person: string
  recommendationLabel: string
  agentBadge: string
  dayNames: Record<string, string>
  yearPrefix: string
  bookLabel: string
  recommenderLabel: string
  stepsCount: string
  tracingBadge: string
  stepPrefix: string
  calendarTitle: string
  calendarHint: string
  recommendations: { day: string; date: string; time: string; duration: string; clinician: string; specialty: string; room: string; description: string; step: string }[]
  days: { key: string; label: string; slots: { time: string; duration: string; clinician: string; room: string; occupied?: boolean }[] }[]
}

export type CustomAgentsData = {
  alert: {
    brand: string
    suite: string
    initials: string
    title: string
    subtitle: string
    person: string
    status: string
    note: string
    matrixTitle: string
    bars: { time: string; value: number }[]
    barNote: string
    bundleTitle: string
    bundle: string[]
  }
  followUp: {
    brand: string
    suite: string
    initials: string
    title: string
    stats: { label: string; value: string; note: string }[]
    columns: [string, string, string, string, string, string]
    rows: {
      name: string
      id: string
      finding: string
      study: string
      followUp: string
      interval: string
      due: string
      lateness: string
      latenessTone: 'red' | 'amber' | 'gray'
      segments: ('done' | 'stalled' | 'todo')[]
      statusNote: string
      risk: 'high' | 'medium' | 'ontrack'
    }[]
    riskLabels: { high: string; medium: string; ontrack: string }
    verbatimLabel: string
    verbatim: string
    normalisedLabel: string
    normalised: string
    normalisedCodes: string
    obligationLabel: string
    obligation: string
    obligationNote: string
    loopLabel: string
    loop: { label: string; segment: 'done' | 'stalled' | 'todo'; note: string }[]
    loopNote: string
    actions: [string, string, string, string]
    traceTitle: string
    traceMeta: string
    traceBadge: string
    trace: { n: number; title: string; body: string }[]
  }
}

export type EnterpriseHealthcareContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; backdrop: { tailwindClass: string; contrastColor: string }; image: ImageAsset; imageColor: string; logosLabel: string; logos: Logo[] }
  workflows: {
    heading: string
    tabs: { key: string; label: string; title: string; body: string; cta: Cta; color: string; image: ImageAsset }[]
    orderGuidance: OrderGuidanceData
    scheduling: SchedulingData
    customAgents: CustomAgentsData
  }
  testimonial: { clientName: string; title: string; quote: string; metricValue: string; metricLabel: string; logo: Logo }
  reliability: { heading: string; cards: { key: string; title: string; description: string }[]; layers: { key: string; src: string }[] }
  strategy: { heading: RichBlock[]; category: string; posts: BlogPreviewPost[] }
  trust: { headline: string; subtitle: string; badges: { key: string; alt: string; path: string; width: number }[] }
  prefooter: { headline: string; cta: Cta; backdrop: { tailwindClass: string; contrastColor: string }; image: ImageAsset; imageColor: string }
}
