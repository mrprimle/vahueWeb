export type AboutIcon = 'storage' | 'barChart' | 'autoAwesome' | 'psychology' | 'people' | 'trendingUp' | 'badge' | 'rocket'

export type AboutContent = {
  meta: { title: string; description: string }
  hero: { headline: string; image: string }
  mission: { headline: string; subtitle: string }
  headquarters: { image: string; alt: string; caption: string }
  trustedBy: { overtitle: string; title: string; logos: { alt: string; width: number; height: number; src?: string }[] }
  whatWeDo: { heading: string; cards: { icon: AboutIcon; title: string; description: string }[] }
  glance: { heading: string; cards: { icon: AboutIcon; label: string; stat: string; description?: string }[] }
  offices: { src: string; alt: string }[]
  news: {
    heading: string
    posts: { key: string; title: string; category: string; image: string; alt?: string; url: string; overlay?: boolean; gradient?: boolean; openInNewTab?: boolean }[]
  }
  careers: { headline: string; cta: { text: string; url: string }; image: string }
}
