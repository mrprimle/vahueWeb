export type SecurityIcon = 'lock' | 'shield' | 'public'
export type CtaLink = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor: string }
export type Commitment = { key: string; icon: SecurityIcon; color: string; title: string; description: string }
export type Certification = { key: string; logo: { src: string; alt: string; invert: boolean }; title: string; body: string; reportLead: string; reportLink: CtaLink }
export type SplitCard = { label: string; title: string; body: string; cta: CtaLink; image: { src: string; alt: string; className: string } }

export type SecurityContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; backdrop: Backdrop; image: { path: string } }
  commitment: { overtitle: string; title: string; items: Commitment[] }
  compliance: { overtitle: string; title: string; subtitle: string; items: Certification[] }
  cards: [SplitCard, SplitCard]
  disclosure: { label: string; title: string; lead: string; email: CtaLink }
  prefooter: { headline: string; cta: CtaLink; backdrop: Backdrop; image: { path: string } }
}
