import Image from 'next/image'

const pressLogos = [
  { src: '/img/forbes.svg', alt: 'Forbes' },
  { src: '/img/therecursive.svg', alt: 'The Recursive' },
  { src: '/img/svt.svg', alt: 'SVT' },
  { src: '/img/breakit.svg', alt: 'Breakit' },
  { src: '/img/techeu.svg', alt: 'Tech EU' },
]

export default function Press() {
  return (
    <section className="relative py-14 md:py-16 border-y border-border-soft">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center mb-8">
          <p className="eyebrow">As seen in</p>
        </div>

        {/* Desktop row */}
        <div className="hidden md:flex items-center justify-between gap-6">
          {pressLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={480}
              height={160}
              className="h-20 lg:h-24 w-auto opacity-60 hover:opacity-90 transition-opacity brightness-0 invert"
            />
          ))}
        </div>

        {/* Mobile 2-2-1 grid */}
        <div className="md:hidden grid grid-cols-2 gap-6 items-center">
          {pressLogos.slice(0, 4).map((logo, i) => (
            <div
              key={logo.alt}
              className={`flex items-center ${
                i % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={400}
                height={120}
                className="h-16 w-auto opacity-60 brightness-0 invert"
              />
            </div>
          ))}
          <div className="col-span-2 flex items-center justify-center">
            <Image
              src={pressLogos[4].src}
              alt={pressLogos[4].alt}
              width={400}
              height={120}
              className="h-16 w-auto opacity-60 brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
