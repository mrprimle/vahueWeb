export type IconKey = 'wq' | 'bB' | 'w9' | 'AH' | 'hd' | 'I3' | 'B5' | 'Wm' | 'ZM' | 'en' | 'Yr' | 'be' | 'lF' | 'yN' | 'kk' | 'St' | 'bZ' | 'b'

export type CardCopy = { key: string; icon: IconKey; iconColor: string; title: string; description?: string }

export type CtaLink = { text: string; url: string }
export type Backdrop = { tailwindClass: string; contrastColor: string }

export type EvaluationModelDevelopersContent = {
  meta: { title: string; description: string }
  hero: { headline: string; body: string; cta: CtaLink; backdrop: Backdrop; image: { path: string } }
  challenges: { overtitle: string; title: string; cards: CardCopy[] }
  why: { overtitle: string; title: string; subtitle: string; cards: CardCopy[] }
  risks: { overtitle: string; title: string; subtitle: string; cards: CardCopy[] }
  experts: { overtitle: string; title: string; subtitle: string; taxonomy: { src: string; alt: string }; cards: CardCopy[] }
  testimonials: { heading: string; backdrop: Backdrop; items: { clientName: string; title: string; testimonial: string }[] }
  resources: { overtitle: string; title: string; items: { href: string; category: string; title: string; image: string }[] }
  prefooter: { headline: string; cta: CtaLink; backdrop: Backdrop; image: { path: string } }
}
