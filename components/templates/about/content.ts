import type { ReactNode } from 'react'

/*
 * Content contract for the scale.com/about layout. AboutPage renders every section from this object, so another page
 * can reuse the layout + motion with its own copy (and restyle it through the --abt-* variables, see AboutPage.tsx).
 * `scaleAboutContent` is Scale's own copy, read from the page's RSC payload on 2026-11-01, so the clone lines up with
 * scale.com in side-by-side QA. Plain data only (icons are names), so a server page can pass it.
 */

export type AboutIcon =
  | 'MdStorage'
  | 'MdBarChart'
  | 'MdAutoAwesome'
  | 'MdPsychology'
  | 'MdPeople'
  | 'MdTrendingUp'
  | 'MdBadge'
  | 'MdRocketLaunch'

export type AboutCta = { label: string; href: string }

export type AboutFullBleed = {
  headline: string
  body?: string
  image?: string
  imageAlt?: string
  /** ResponsiveImage background-color behind the image. */
  imageBg?: string
  /** Replaces the image (own visual); it gets the same 1.25 -> 1 scroll scale. */
  media?: ReactNode
  cta?: AboutCta
}

export type AboutLogo = { name: string; width: number; height: number; src?: string }

export type AboutNewsPost = {
  title: string
  /** Category chip label (the outlet). */
  category: string
  href: string
  image?: string
  imageAlt?: string
  /** variantOverride "overlay" (desktop only; phones always use the caption layout). */
  overlay?: boolean
  /** imageGradientOverlay */
  gradient?: boolean
}

export type AboutContent = {
  hero: AboutFullBleed
  mission: { headline: string; body: string }
  headquarters: { image: string; alt: string; width: number; height: number; caption: string }
  trusted: { overtitle: string; title: string; logos: AboutLogo[] }
  pillars: { heading: string; cards: { icon: AboutIcon; title: string; body: string }[] }
  stats: {
    heading: string
    /** 3 + 2 fluid grid. `value` is the big number, `body` the optional grey line under it. */
    cards: { icon: AboutIcon; label: string; value: string; body?: string }[]
  }
  gallery: { src: string; alt: string }[]
  news: { heading: string; posts: AboutNewsPost[] }
  prefooter: AboutFullBleed
}

const A = '/templates/about'

export const scaleAboutContent: AboutContent = {
  hero: { headline: 'About', image: `${A}/hero.webp`, imageBg: '#193A29' },
  mission: {
    headline: "Our mission is to develop reliable AI systems for the world's most important decisions.",
    body: "We provide high-quality data and full-stack technologies that power the world's leading models and enable enterprises and governments to build, deploy, and oversee AI applications that deliver real impact.",
  },
  headquarters: {
    image: `${A}/headquarters.webp`,
    alt: 'Scale headquarters in San Francisco',
    width: 1216,
    height: 689,
    caption: 'Headquarters: San Francisco, CA',
  },
  trusted: {
    overtitle: 'Trusted by',
    title: "Powering the world's leading AI",
    // customer logo boxes as served (width x height); the marks themselves are not shipped (neutral tiles)
    logos: [
      { name: 'Meta', width: 100, height: 20 },
      { name: 'Cohere', width: 108, height: 18 },
      { name: 'Cisco', width: 72, height: 37 },
      { name: 'TIME', width: 60, height: 24 },
    ],
  },
  pillars: {
    heading: 'What we do',
    cards: [
      { icon: 'MdStorage', title: 'Data at Scale', body: "High-quality training data, annotations, and RLHF to power the world's most advanced AI models." },
      { icon: 'MdBarChart', title: 'Evaluations', body: 'Rigorous model evaluations and red-teaming to measure, benchmark, and improve AI performance.' },
      { icon: 'MdAutoAwesome', title: 'Applied AI', body: 'Full-stack AI systems that help enterprises and governments build, deploy, and oversee reliable AI.' },
    ],
  },
  stats: {
    heading: 'Scale at a glance',
    cards: [
      { icon: 'MdPsychology', label: 'AI Decisions', value: '15B', body: 'Human decisions to train AI models.' },
      { icon: 'MdPeople', label: 'Contributors', value: '$1B', body: 'Paid to contributors globally.' },
      { icon: 'MdTrendingUp', label: 'Valuation', value: '$29B' },
      { icon: 'MdBadge', label: 'Employees', value: '1,000+' },
      { icon: 'MdRocketLaunch', label: 'Founded', value: '2016' },
    ],
  },
  gallery: [1, 2, 3, 4, 5].map((i) => ({ src: `${A}/office-${i}.webp`, alt: 'Scale office' })),
  news: {
    heading: 'Scale In The News',
    posts: [
      {
        title: 'Scale AI CEO Francis deSouza: We are headed for a multi-model world',
        category: 'CNBC',
        href: 'https://www.cnbc.com/video/2026/09/03/scale-ai-ceo-francis-desouza-we-are-headed-for-a-multi-model-world.html',
        image: `${A}/news-cnbc.webp`,
        imageAlt: 'Scale AI CEO Francis deSouza on CNBC Squawk Box',
        overlay: true,
        gradient: true,
      },
      {
        title: 'Scale AI hires Google Cloud COO Francis deSouza as new CEO',
        category: 'Axios',
        href: 'https://www.axios.com/2026/07/30/scale-ai-google-cloud-coo-francis-desouza',
        image: `${A}/news-axios.webp`,
        imageAlt: 'Portrait of Francis deSouza',
        overlay: true,
        gradient: true,
      },
      {
        title: 'One of the world’s most prominent hospitals is testing how AI can revolutionize health care',
        category: 'CNN',
        href: 'https://www.cnn.com/2026/07/16/tech/mayo-clinic-ai-healthcare',
        image: `${A}/news-cnn.webp`,
        imageAlt: 'Mayo Clinic building in Rochester, Minnesota',
      },
      {
        title: 'Scale AI Names Google Cloud Executive Francis deSouza as New CEO',
        category: 'Bloomberg',
        href: 'https://www.bloomberg.com/news/articles/2026-07-30/scale-ai-names-google-cloud-executive-francis-desouza-as-new-ceo?srnd=undefined',
        image: `${A}/news-bloomberg.webp`,
        imageAlt: 'Francis deSouza speaking at the HumanX conference',
        gradient: true,
      },
      {
        title: "Scale's CEO says AI-related layoffs are often theater",
        category: 'Semafor',
        href: 'https://www.semafor.com/article/04/16/2026/scale-ai-ceo-jason-droege-says-ai-related-layoffs-are-often-theater',
        image: `${A}/news-semafor.webp`,
      },
    ],
  },
  prefooter: {
    headline: 'Join us. Shape the future of AI.',
    image: `${A}/prefooter.webp`,
    imageBg: '#193A29',
    cta: { label: 'View Open Roles', href: '/careers/' },
  },
}
