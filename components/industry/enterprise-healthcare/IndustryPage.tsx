import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import HealthcarePage from '@/components/scale-clone/enterprise-healthcare/HealthcarePage'
import { healthcareContent } from './content'

/**
 * /industries/healthcare-life-sciences: the scale.com/enterprise/healthcare clone's own HealthcarePage
 * (components/scale-clone/enterprise-healthcare, spec reference-snapshots/scale-clone/enterprise-healthcare.md)
 * with Vahue content (./content.tsx). Strict parity: every section in Scale's order and Scale's own colours; only
 * the copy, own mock UIs and text tiles differ. Fonts and logo are Vahue's.
 */
export default function IndustryPage() {
  return (
    // The site navbar is sticky (88px; light on this route, see Navbar.tsx): pull the page up under it so the hero
    // card sits where Scale's does under its overlay header.
    <div className="-mt-[88px] bg-white text-black">
      <SmoothScroll />
      <HealthcarePage as="div" content={healthcareContent} />
    </div>
  )
}
