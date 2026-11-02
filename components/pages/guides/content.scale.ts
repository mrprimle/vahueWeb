// Scale's own strings for https://scale.com/guides, read from the page's RSC payload on 2026-11-02.
import type { GuidesContent } from './types'

const A = '/guides'

export const content: GuidesContent = {
  meta: {
    title: 'Expert AI Guides for Success | Scale AI',
    description: "Discover comprehensive resources and expert insights with Scale's Guides. Enhance your knowledge and skills with our expertly curated content.",
  },
  intro: {
    overtitle: 'Resources',
    title: 'Guides',
    body: 'Building AI is difficult, so we have created these guides to help you deliver more business value from your AI investments more quickly.',
  },
  books: [
    { key: 'data-labeling-annotation-guide', href: '/guides/data-labeling-annotation-guide', background: '#212121', number: '01', title: 'Data Labeling: The Authoritative Guide' },
    { key: 'diffusion-models-guide', href: '/guides/diffusion-models-guide', background: '#193A29', number: '02', title: 'Diffusion Models: A Practical Guide' },
    { key: 'model-training-building', href: '/guides/model-training-building', background: '#273252', number: '03', title: 'Training and Building Machine Learning Models' },
    { key: 'ai-for-ecommerce', href: '/guides/ai-for-ecommerce', background: '#79648C', number: '04', title: 'Guide to AI for eCommerce' },
    { key: 'computer-vision', href: '/guides/computer-vision', background: '#A8927C', number: '05', title: 'Guide to Computer Vision Applications' },
    { key: 'large-language-models', href: '/guides/large-language-models', background: '#212121', number: '06', title: 'Guide to Large Language Models' },
    { key: 'generative-ai', href: '/guides/generative-ai', background: '#193A29', number: '07', title: 'Generative AI for the Enterprise: From Experimentation to Production' },
    { key: 'ai-for-insurance', href: '/guides/ai-for-insurance', background: '#273252', number: '08', title: 'Guide to AI for Insurance' },
    { key: 'ai-in-finance', href: '/guides/ai-in-finance', background: '#79648C', number: '09', title: 'Guide to AI in Finance' },
    { key: 'test-and-evaluation-vision', href: '/guides/test-and-evaluation-vision', background: '#A8927C', number: '10', title: 'Test and Evaluation Vision' },
    { key: 'guide-to-ai-for-the-intelligence-community', href: '/guides/guide-to-ai-for-the-intelligence-community', background: '#212121', number: '11', title: 'Guide to AI for the Intelligence Community' },
    { key: 'build-vs-buy', href: '/guides/build-vs-buy', background: '#193A29', number: '12', title: 'Enterprise Guide: Build vs. Buy' },
  ],
  prefooter: {
    headline: 'Start building better AI today.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#ffffff' },
    image: { path: `${A}/prefooter.webp` },
  },
}
