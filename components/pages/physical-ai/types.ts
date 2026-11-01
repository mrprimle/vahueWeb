import type { IconName } from './icons'

export type Cta = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor?: string }
export type Asset = { path: string; alt?: string }
export type SizedImage = { src: string; alt: string; width: number; height: number }
export type MarqueeLogoItem = { key: string; alt: string; src: string | null }
export type Feature = { icon: IconName; title: string; body: string }
export type FeatureCard = { title: string; body: string; image: SizedImage }
export type ChartSeries = { id: string; label: string[]; color: string; ceiling: number; delay: number; duration: number }

export type PhysicalAiContent = {
  meta: { title: string; description: string }
  hero: {
    headline: string
    body: string
    cta: Cta
    backdrop: Backdrop
    image: Asset
    logos: { label: string; items: MarqueeLogoItem[] }
  }
  overview: { overtitle: string; title: string; features: Feature[] }
  testimonials: {
    heading: string
    backdrop: Backdrop
    colorTheme: { tailwindClass: string; hex: string; contrastColor: string }
    items: { clientName: string; title: string; testimonial: string }[]
  }
  useCase: { overtitle: string; title: string; heading: string; paragraphs: string[]; image: SizedImage }
  embodiments: { overtitle: string; title: string; subtitle: string; cards: FeatureCard[] }
  environments: { overtitle: string; title: string; subtitle: string; cards: FeatureCard[] }
  annotations: { image: SizedImage; title: string; body: string }
  improvements: {
    title: string
    paragraphs: string[]
    chart: { ariaLabel: string; yLabel: string; xLabel: string; series: ChartSeries[] }
  }
  difference: { overtitle: string; title: string; features: Feature[] }
  prefooter: { headline: string; cta: Cta; secondaryCta: Cta; backdrop: Backdrop; image: Asset }
}
