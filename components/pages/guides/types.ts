export type GuideBook = { key: string; href: string; background: string; number: string; title: string }

export type GuidesContent = {
  meta: { title: string; description: string }
  intro: { overtitle: string; title: string; body: string }
  books: GuideBook[]
  prefooter: {
    headline: string
    cta: { text: string; url: string }
    backdrop: { tailwindClass: string; contrastColor: string }
    image: { path: string }
  }
}
