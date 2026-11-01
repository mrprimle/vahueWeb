import type { Metadata } from 'next'
import VahueHomePage from '@/components/home/VahueHomePage'
import { POSITIONING } from '@/lib/automation-content'

const PAGE_URL = 'https://vahue.ai/'

export const metadata: Metadata = {
  title: { absolute: `${POSITIONING.line} | Vahue` },
  description: POSITIONING.promise,
  openGraph: { title: `${POSITIONING.line} | Vahue`, description: POSITIONING.promise, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com homepage layout (components/templates/home). JSON-LD comes from app/layout.tsx.
export default function Home() {
  return <VahueHomePage />
}
