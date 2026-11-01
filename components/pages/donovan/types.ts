import type { TabItem } from '@/components/site/shared/TabsWithImages'
import type { FeatureIconName } from './featureIcons'
import type { FoundationIconName } from './foundationIcons'
import type { MockCopy } from './Mocks'

export type Cta = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor?: string }
export type Asset = { path: string; alt?: string }
export type Logo = { alt: string; width: number; height: number; src?: string }
export type Heading = { overtitle: string; title: string; subtitle: string }
export type Feature = { icon: FeatureIconName; title: string; subtitle: string }
export type MockCard = { title: string; body: string; mock: MockCopy }

export type DonovanContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: Cta; backdrop: Backdrop; image: Asset }
  logos: Logo[]
  overview: Heading & { cards: [MockCard, MockCard, MockCard] }
  foundation: Heading & { top: { icon: FoundationIconName; label: string }[]; bottom: { icon: FoundationIconName; label: string }[] }
  tabs: TabItem[]
  overmatch: Heading & { features: Feature[] }
  trusted: Heading & { features: Feature[] }
  prefooter: { headline: string; cta: Cta; secondaryCta: Cta; backdrop: Backdrop; image: Asset }
}
