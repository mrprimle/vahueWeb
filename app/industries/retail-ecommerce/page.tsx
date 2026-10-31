import type { Metadata } from 'next'
import EnterpriseIndustryPage from '@/components/industry/enterprise/EnterpriseIndustryPage'
import { retailConfig } from '@/components/industry/enterprise/retail-ecommerce'

export const metadata: Metadata = {
  title: 'AI for Retail & eCommerce',
  description:
    'AI agents for the order-status inbox, product data and SKU matching, and customer support, inside the tools your team already uses, with review queues and a full audit log.',
  openGraph: {
    title: 'AI for Retail & eCommerce | Vahue',
    description: 'Orders, product data and support run by agents in your own tools, reviewed by your team and logged.',
    url: 'https://vahue.ai/industries/retail-ecommerce',
  },
  alternates: {
    canonical: 'https://vahue.ai/industries/retail-ecommerce',
    types: {
      'text/markdown': '/llms/industries-retail-ecommerce.md',
    },
  },
}

export default function Page() {
  return <EnterpriseIndustryPage config={retailConfig} />
}
