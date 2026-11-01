export type Cta = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor?: string }
export type Asset = { path: string; alt?: string }
export type SizedImage = { src: string; alt: string; width: number; height: number; blurDataURL?: string }
export type LogoItem = { alt: string; width: number; height: number; src?: string }
export type ChecklistItem = { title: string; description: string }
export type Phase = { title: string; subtitle: string; image: { src: string; alt: string }; video: string }
export type IconFeature = { icon: 'flame' | 'gauge' | 'bolt'; title: string; subtitle: string }
export type Resource = { id: string; overtitle: string; title: string; image: { src: string; alt?: string }; link: string }

export type DataTabsContent = {
  panelTitle: string
  panelSubtitle: string
  description: string
  cta: { text: string; href: string }
  titles: [string, string, string, string, string]
  /** First tab: an image that swaps to an iframe on mouse over (Scale module 583338, LoadOnHoverIframe). */
  frame: { src: string; placeholder: SizedImage }
  image: SizedImage
  map: SizedImage
  /** Inner markup of the 649 x 402 Text tab artwork. Items with id color-ECA6FA, -E7FE53, -DBC6FC, -B2FCD2 are revealed in that order. */
  textArtwork: string
  audio: {
    prompt: string
    fileName: string
    time: string
    run: string
    code: string
    result: string
    src: string
  }
}

export type AutomotiveContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: Cta; backdrop: Backdrop; image: Asset }
  logos: LogoItem[]
  overview: { title: string; subtitle: string; features: ChecklistItem[]; image: SizedImage }
  stack: { overtitle: string; title: string; tabs: DataTabsContent }
  phases: { title: string; subtitle: string; items: Phase[] }
  why: { overtitle: string; title: string; subtitle: string; features: IconFeature[] }
  resources: { overtitle: string; title: string; items: Resource[] }
  foundation: {
    title: string
    overtitle: string
    heading: string
    body: string
    link: { text: string; href: string }
    image: SizedImage
  }
  prefooter: { headline: string; cta: Cta; secondaryCta: Cta; backdrop: Backdrop; image: Asset }
}
