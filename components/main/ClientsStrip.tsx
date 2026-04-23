'use client'

import Image from 'next/image'

const companies = [
  { name: 'Shopify', logo: '/img/shopify.svg' },
  { name: 'Audi', logo: '/img/audi-logo.svg' },
  { name: 'Deloitte', logo: '/img/deloitte.svg' },
  { name: 'Leafworks', logo: '/img/leafworks.svg' },
  { name: 'Tracesafe', logo: '/img/tracesafe.svg' },
  { name: 'Carmen', logo: '/img/carmen.svg' },
  { name: 'BringLiesel', logo: '/img/bringliesel.svg' },
  { name: 'Quilk', logo: '/img/quilk.svg' },
]

export default function ClientsStrip() {
  return (
    <section className="relative px-6 md:px-8 pb-16 md:pb-20">
      <div className="max-w-wide mx-auto">
        <div className="flex items-center justify-center mb-6">
          <p className="eyebrow">Trusted by teams at</p>
        </div>
        <div className="rounded-3xl border border-border-soft bg-surface p-6 md:p-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-6 md:gap-8 items-center justify-items-center">
            {companies.map((company, idx) => (
              <div
                key={company.name}
                className={`flex items-center justify-center ${
                  idx >= 3 ? 'hidden sm:flex' : ''
                }`}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={120}
                  height={40}
                  className="h-7 md:h-8 w-auto brightness-0 invert opacity-40 hover:opacity-70 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
