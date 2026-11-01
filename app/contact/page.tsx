import type { Metadata } from 'next'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import ContactPage from '@/components/contact/ContactPage'

const PAGE_URL = 'https://vahue.ai/contact/'
const DESCRIPTION =
  'Tell Vahue which workflow has outgrown your team. Book an intro call to scope a two-week audit, then a pilot on your own data and agents we run for you.'

export const metadata: Metadata = {
  title: 'Contact',
  description: DESCRIPTION,
  openGraph: { title: 'Contact | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Contact page on the layout of the scale.com/demo clone (scale.com/demo, spec in
// reference-snapshots/scale-clone/demo.md), with Vahue copy and the Vahue dark palette.
export default function Page() {
  return (
    <>
      <SmoothScroll />
      <ContactPage />
    </>
  )
}
