import Hero from './Hero'
import PullApart from './PullApart'
import Bridge from './Bridge'
import BlogCarousel from './BlogCarousel'
import LogoCloud from './LogoCloud'
import Stats from './Stats'
import Testimonials from './Testimonials'
import FullBleedMedia from './FullBleedMedia'
import { BuiltToBeTrusted, Pillars, PoweredBy, Race } from './Sections'
import { prefooter, testimonials } from './content'

// Body of scale.com/enterprise, top to bottom. Spec: reference-snapshots/scale-clone/enterprise.md
export default function EnterprisePage() {
  return (
    <main className="bg-white font-display tracking-[-0.01em] text-black">
      <div className="relative overflow-x-hidden">
        {/* 1. Hero: DOM node graph, pointer parallax, pinned under the next section */}
        <Hero />
        {/* 2. Pull-apart: pinned three.js scene, 450vh */}
        <PullApart />
        {/* 3. Bridge: evergreen inset panel with transparent video */}
        <Bridge />
        {/* 4. Blog carousel: Embla with 3D perspective */}
        <BlogCarousel />
        {/* 5. Logo cloud: drag-to-rotate WebGL sphere */}
        <LogoCloud />
        {/* 6. Results: scroll-scrubbed stat cards */}
        <Stats />
        {/* 7. Testimonials (cloud slate) */}
        <Testimonials heading={testimonials.heading} items={testimonials.items} />
        {/* 8. The race is on: two columns + video */}
        <Race />
        {/* 9. Three pillars */}
        <Pillars />
        {/* 10. Powered by the platform */}
        <PoweredBy />
        {/* 11. Built to be trusted */}
        <BuiltToBeTrusted />
        {/* 12. Prefooter (FullBleedMediaSection, startPercentage 10) */}
        <div className="h-16 w-full bg-white" />
        <FullBleedMedia
          wrapperClassName=""
          backdropClassName="bg-white"
          startPercentage={10}
          image={prefooter.image}
          headline={prefooter.headline}
          primary={prefooter.cta}
        />
        <div className="h-8 w-full bg-white" />
      </div>
    </main>
  )
}
