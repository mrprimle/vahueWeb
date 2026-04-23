import type { Metadata } from 'next'
import SegmentLanding from '@/components/segments/SegmentLanding'
import { retailEcommerceContent } from '@/components/segments/content/retail-ecommerce'

export const metadata: Metadata = {
  title: 'AI for Retail & eCommerce | Vahue',
  description:
    'Agent-ready catalog, inventory, and stores — plus merchandising, search, CX, and edge intelligence copilots that scale commerce without rebuilding the stack.',
  openGraph: {
    title: 'AI for Retail & eCommerce | Vahue',
    description:
      'Make your commerce stack AI-agent ready and ship merchandising, CX, pricing, and store copilots that move revenue.',
    url: 'https://vahue.ai/industries/retail-ecommerce',
  },
}

export default function Page() {
  return <SegmentLanding content={retailEcommerceContent} />
}
