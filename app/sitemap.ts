import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE = 'https://vahue.ai'

// Static routes with their relative change frequency and priority.
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',                                        priority: 1.0,  changeFrequency: 'weekly'  },
  { path: '/ai-native-engineering',                  priority: 0.9,  changeFrequency: 'weekly'  },
  { path: '/enterprise-ai',                          priority: 0.9,  changeFrequency: 'weekly'  },
  { path: '/team-training',                          priority: 0.9,  changeFrequency: 'weekly'  },
  { path: '/strategy',                               priority: 0.9,  changeFrequency: 'weekly'  },
  { path: '/ai-seo',                                 priority: 0.8,  changeFrequency: 'weekly'  },
  { path: '/automations',                            priority: 0.8,  changeFrequency: 'weekly'  },
  { path: '/vahue-incubator',                        priority: 0.8,  changeFrequency: 'monthly' },
  // Industry pages
  { path: '/industries/banking-financial-services',  priority: 0.75, changeFrequency: 'monthly' },
  { path: '/industries/insurance',                   priority: 0.75, changeFrequency: 'monthly' },
  { path: '/industries/healthcare-life-sciences',    priority: 0.75, changeFrequency: 'monthly' },
  { path: '/industries/retail-ecommerce',            priority: 0.75, changeFrequency: 'monthly' },
  // Horizontal segment pages (re-uses the bfsi / ops / cs routes)
  { path: '/bfsi',                                   priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/operations',                             priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/customer-support',                       priority: 0.7,  changeFrequency: 'monthly' },
  // Content & community
  { path: '/blog',                                   priority: 0.7,  changeFrequency: 'daily'   },
  { path: '/blog/trumps-ai-order-decoded',           priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/case-studies',                           priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/guides',                                 priority: 0.65, changeFrequency: 'weekly'  },
  { path: '/marketplace',                            priority: 0.65, changeFrequency: 'weekly'  },
  { path: '/events',                                 priority: 0.6,  changeFrequency: 'weekly'  },
  { path: '/contact',                                priority: 0.6,  changeFrequency: 'monthly' },
  // AI-readable mirrors (important for AI crawler discoverability)
  { path: '/llms.txt',                               priority: 0.9,  changeFrequency: 'weekly'  },
  { path: '/llms/home.md',                           priority: 0.85, changeFrequency: 'weekly'  },
  { path: '/llms/ai-native-engineering.md',          priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/llms/enterprise-ai.md',                  priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/llms/team-training.md',                  priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/llms/ai-strategy.md',                    priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/llms/ai-seo.md',                         priority: 0.75, changeFrequency: 'monthly' },
  { path: '/llms/vahue-incubator.md',                priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/llms/industries-banking-financial-services.md', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/llms/industries-insurance.md',           priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/llms/industries-healthcare-life-sciences.md', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/llms/industries-retail-ecommerce.md',    priority: 0.7,  changeFrequency: 'monthly' },
  // Static JSON-LD schema files for AI crawlers
  { path: '/schemas/organization.json',              priority: 0.6,  changeFrequency: 'monthly' },
  { path: '/schemas/services.json',                  priority: 0.6,  changeFrequency: 'monthly' },
  { path: '/schemas/faq.json',                       priority: 0.5,  changeFrequency: 'monthly' },
  { path: '/schemas/reviews.json',                   priority: 0.5,  changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
