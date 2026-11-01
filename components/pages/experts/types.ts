export type Cta = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor?: string }
export type DomainLogo = { src: string; alt: string; width: number; height: number }
export type Domain = {
  label: string
  key: string
  color: string
  whoTheyAre: string
  skills: string
  projectType: string
  peerReviewedPublications?: string
  logos: DomainLogo[]
}
export type ExpertCardKey = 'academic' | 'industry' | 'worldwide' | 'domain'
export type ExpertCard = { key: ExpertCardKey; title: string; description: string; hoveredColor: string }
export type ExpertsContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: Cta; backdrop: Backdrop; video: { url: string }; poster: string }
  cardGrid: { heading: string; cards: ExpertCard[] }
  domains: {
    headline: string
    labels: { who: string; expertise: string; projectType: string; publications: string }
    items: Domain[]
  }
  testimonials: {
    heading: string
    backdrop: Backdrop
    colorTheme: { tailwindClass: string; hex: string; contrastColor: string }
    items: { _key: string; clientName: string; title: string; testimonial: string; logo?: string }[]
  }
  resources: { heading: string; posts: { _key: string; title: string; category: string; image: string; url: string }[] }
  prefooter: { headline: string; body: string; cta: Cta; backdrop: Backdrop; image: string }
}
