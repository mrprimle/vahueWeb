export type IconKey = 'bv' | 'dz' | 'nz' | 'ba' | 'y4' | 'kb' | 'wc'

export type RlEnvironmentsContent = {
  meta: { title: string; description: string }
  hero: {
    headline: string
    body: string
    cta: { text: string; url: string }
    backdrop: { tailwindClass: string; contrastColor: string }
    video: { url: string }
    image: { path: string }
  }
  features: {
    overtitle: string
    title: string
    cards: { key: string; icon: IconKey; iconColor: string; title: string; description: string }[]
  }
  overview: {
    overtitle: string
    title: string
    cards: { title: string; subtitle: string; image: { src: string; alt: string } }[]
  }
  capabilities: {
    overtitle: string
    title: string
    items: { title: string; description: string; textSide: 'left' | 'right'; image: { src: string; alt: string; width: number; height: number } }[]
  }
  pillars: {
    overtitle: string
    heading: string
    subtitle: string
    video: { url: string }
    cards: { key: string; icon: IconKey; iconColor: string; headline: string; subtitle: string }[]
  }
  prefooter: {
    headline: string
    cta: { text: string; url: string }
    backdrop: { tailwindClass: string; contrastColor: string }
    image: { path: string }
  }
}
