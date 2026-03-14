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
    <section className="bg-white">
      {/* White content area that will show rounded corners of dark section below */}
      <div className="py-10 md:py-14 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          {/* Mobile: Grid layout 2-2-1 */}
          <div className="md:hidden grid grid-cols-2 gap-6">
            {/* Row 1: 2 icons */}
            <div className="flex items-center justify-start">
              <Image
                src={pressLogos[0].src}
                alt={pressLogos[0].alt}
                width={240}
                height={80}
                className="w-full max-w-[160px] h-auto"
              />
            </div>
            <div className="flex items-center justify-end">
              <Image
                src={pressLogos[1].src}
                alt={pressLogos[1].alt}
                width={240}
                height={80}
                className="w-full max-w-[180px] h-auto"
              />
            </div>
            {/* Row 2: 2 icons */}
            <div className="flex items-center justify-start">
              <Image
                src={pressLogos[2].src}
                alt={pressLogos[2].alt}
                width={240}
                height={80}
                className="w-full max-w-[120px] h-auto"
              />
            </div>
            <div className="flex items-center justify-end">
              <Image
                src={pressLogos[3].src}
                alt={pressLogos[3].alt}
                width={240}
                height={80}
                className="w-full max-w-[160px] h-auto"
              />
            </div>
            {/* Row 3: 1 icon centered */}
            <div className="col-span-2 flex items-center justify-center">
              <Image
                src={pressLogos[4].src}
                alt={pressLogos[4].alt}
                width={240}
                height={80}
                className="w-full max-w-[120px] h-auto"
              />
            </div>
          </div>

          {/* Desktop: Single row */}
          <div className="hidden md:flex items-center justify-between">
            {pressLogos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt={logo.alt}
                width={240}
                height={80}
                className="h-16 lg:h-20 w-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
