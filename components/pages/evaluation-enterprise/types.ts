import type { AlternatingRow } from '@/components/site/shared/AlternatingImageRows'
import type { ChecklistImage } from '@/components/site/shared/ChecklistWithMedia'

export type CtaLink = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor: string }
export type ChallengeIcon = 'performance' | 'roi' | 'costs'

export type EvaluationEnterpriseContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: CtaLink; secondaryCta: CtaLink; backdrop: Backdrop; image: { path: string } }
  challenge: { overtitle: string; title: string; subtitle: string; items: { icon: ChallengeIcon; title: string; subtitle: string }[] }
  solution: { overtitle: string; title: string; subtitle: string; features: { title: string; description: string }[]; image: ChecklistImage }
  how: { overtitle: string; title: string; subtitle: string; items: AlternatingRow[] }
  prefooter: { headline: string; cta: CtaLink; secondaryCta: CtaLink; backdrop: Backdrop; image: { path: string } }
}
