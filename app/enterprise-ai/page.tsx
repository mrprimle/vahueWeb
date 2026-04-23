import type { Metadata } from 'next'
import EnterpriseHero from '@/components/enterprise-ai/EnterpriseHero'
import InsideHub from '@/components/enterprise-ai/InsideHub'
import Agents from '@/components/enterprise-ai/Agents'
import WhatPowers from '@/components/enterprise-ai/WhatPowers'
import WhyHub from '@/components/enterprise-ai/WhyHub'
import Ecosystem from '@/components/enterprise-ai/Ecosystem'
import Results from '@/components/enterprise-ai/Results'
import BlogSection from '@/components/engineering/BlogSection'
import ContactDynamic from '@/components/main/ContactDynamic'

export const metadata: Metadata = {
  title: 'Enterprise AI | Vahue',
  description:
    'Vahue AI Hub — our enterprise AI platform of pre-configured, secure, and fully customized agents that turn complex business challenges into production-ready AI solutions.',
}

export default function Page() {
  return (
    <>
      <EnterpriseHero />
      <InsideHub />
      <WhatPowers />
      <WhyHub />
      <Ecosystem />
      <Agents />
      <Results />
      <BlogSection />
      <ContactDynamic />
    </>
  )
}
