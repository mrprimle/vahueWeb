// Scale's own strings for https://scale.com/about, from the page's RSC payload on 2026-11-01.
import type { AboutContent } from './types'

const A = '/about'

export const content: AboutContent = {
  meta: {
    title: 'About Us | Reliable AI for Critical Decisions | Scale AI',
    description: 'Scale AI powers leading AI labs, enterprises, and governments with data, evaluations, and full-stack AI systems. Learn about our mission and impact.',
  },
  hero: { headline: 'About', image: `${A}/hero.webp` },
  mission: {
    headline: "Our mission is to develop reliable AI systems for the world's most important decisions.",
    subtitle: "We provide high-quality data and full-stack technologies that power the world's leading models and enable enterprises and governments to build, deploy, and oversee AI applications that deliver real impact.",
  },
  headquarters: { image: `${A}/headquarters.webp`, alt: 'Scale headquarters in San Francisco', caption: 'Headquarters: San Francisco, CA' },
  trustedBy: {
    overtitle: 'Trusted by',
    title: "Powering the world's leading AI",
    logos: [
      { alt: 'Meta', width: 100, height: 20 },
      { alt: 'Cohere', width: 108, height: 18 },
      { alt: 'Cisco', width: 72, height: 37 },
      { alt: 'TIME', width: 60, height: 24 },
    ],
  },
  whatWeDo: {
    heading: 'What we do',
    cards: [
      { icon: 'storage', title: 'Data at Scale', description: "High-quality training data, annotations, and RLHF to power the world's most advanced AI models." },
      { icon: 'barChart', title: 'Evaluations', description: 'Rigorous model evaluations and red-teaming to measure, benchmark, and improve AI performance.' },
      { icon: 'autoAwesome', title: 'Applied AI', description: 'Full-stack AI systems that help enterprises and governments build, deploy, and oversee reliable AI.' },
    ],
  },
  glance: {
    heading: 'Scale at a glance',
    cards: [
      { icon: 'psychology', label: 'AI Decisions', stat: '15B', description: 'Human decisions to train AI models.' },
      { icon: 'people', label: 'Contributors', stat: '$1B', description: 'Paid to contributors globally.' },
      { icon: 'trendingUp', label: 'Valuation', stat: '$29B' },
      { icon: 'badge', label: 'Employees', stat: '1,000+' },
      { icon: 'rocket', label: 'Founded', stat: '2016' },
    ],
  },
  offices: [1, 2, 3, 4, 5].map((i) => ({ src: `${A}/office-${i}.webp`, alt: 'Scale office' })),
  news: {
    heading: 'Scale In The News',
    posts: [
      { key: 'news-cnbc-francis-desouza', overlay: true, gradient: true, title: 'Scale AI CEO Francis deSouza: We are headed for a multi-model world', category: 'CNBC', image: `${A}/news-cnbc.webp`, alt: 'Scale AI CEO Francis deSouza on CNBC Squawk Box', url: 'https://www.cnbc.com/video/2026/09/03/scale-ai-ceo-francis-desouza-we-are-headed-for-a-multi-model-world.html' },
      { key: 'news-axios-ceo', overlay: true, gradient: true, title: 'Scale AI hires Google Cloud COO Francis deSouza as new CEO', category: 'Axios', image: `${A}/news-axios.webp`, alt: 'Portrait of Francis deSouza', url: 'https://www.axios.com/2026/07/30/scale-ai-google-cloud-coo-francis-desouza' },
      { key: 'news-cnn-mayo-clinic', title: 'One of the world’s most prominent hospitals is testing how AI can revolutionize health care', category: 'CNN', image: `${A}/news-cnn.webp`, alt: 'Mayo Clinic building in Rochester, Minnesota', url: 'https://www.cnn.com/2026/07/16/tech/mayo-clinic-ai-healthcare' },
      { key: 'news-bloomberg', gradient: true, title: 'Scale AI Names Google Cloud Executive Francis deSouza as New CEO', category: 'Bloomberg', image: `${A}/news-bloomberg.webp`, alt: 'Francis deSouza speaking at the HumanX conference', url: 'https://www.bloomberg.com/news/articles/2026-07-30/scale-ai-names-google-cloud-executive-francis-desouza-as-new-ceo?srnd=undefined' },
      { key: 'news-2', title: "Scale's CEO says AI-related layoffs are often theater", category: 'Semafor', image: `${A}/news-semafor.webp`, url: 'https://www.semafor.com/article/04/16/2026/scale-ai-ceo-jason-droege-says-ai-related-layoffs-are-often-theater' },
    ],
  },
  careers: { headline: 'Join us. Shape the future of AI.', cta: { text: 'View Open Roles', url: '/careers' }, image: `${A}/prefooter.webp` },
}
