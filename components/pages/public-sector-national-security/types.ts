// Shape shared by content.scale.ts (Scale's strings) and content.ts (rendered copy).
import type { BlogCategory, BlogPreviewPost } from '@/components/site/shared/BlogPreview'
import type { HeadlineCta } from '@/components/site/shared/HeadlineWithCta'
import type { ImageAsset } from '@/components/site/shared/ResponsiveImage'
import type { RichBlock } from '@/components/site/shared/RichText'
import type { SteppedVideoStep } from '@/components/site/shared/stepped-video/SteppedVideo'

export type NatSecIcon = 'MdAlarm' | 'MdShowChart' | 'Md3P' | 'MdAttachMoney' | 'MdDynamicFeed' | 'MdEnhancedEncryption' | 'MdCheck' | 'MdUpload' | 'MdShield' | 'MdHub'
export type Logo = { key: string; alt: string; src?: string; width: number }
export type Cta = { text: string; url: string }

export type NationalSecurityContent = {
  meta: { title: string; description: string }
  hero: { headline: string; subtitle: RichBlock[]; trustedBy: string; image: ImageAsset; logos: Logo[] }
  challenges: { counterLabel: string; headline: string; body: RichBlock[]; image: ImageAsset; steps: SteppedVideoStep[] }
  stats: { heading: string; background: ImageAsset; items: { icon: NatSecIcon; label: string; value: string; description: string }[] }
  trust: { heading: string; cards: { icon: NatSecIcon; title: string; description: RichBlock[] }[] }
  missionTitle: { headline: string; subtitle: RichBlock[]; cta: HeadlineCta[] }
  mission: { steps: SteppedVideoStep[] }
  customers: { heading: string; posts: { title: string; url: string; image: string; category: BlogCategory }[] }
  howToBuy: { heading: string; body: RichBlock[]; cta: Cta; image: ImageAsset; items: { key: string; question: string; answer: RichBlock[] }[] }
  resources: { heading: RichBlock[]; posts: BlogPreviewPost[] }
  prefooter: { headline: string; cta: { text: string; url: string }; image: ImageAsset }
}
