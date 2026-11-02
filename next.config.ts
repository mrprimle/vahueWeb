import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // The site launched on Scale's paths; old links keep working.
  async redirects() {
    return [
      { source: '/public-sector/national-security', destination: '/solutions/regulated-industries', permanent: true },
      { source: '/evaluation/model-developers', destination: '/services/evals-and-guardrails', permanent: true },
      { source: '/public-sector-data-engine', destination: '/services/sales-and-booking', permanent: true },
      { source: '/generative-ai-data-engine', destination: '/services/back-office-sync', permanent: true },
      { source: '/evaluation/public-sector', destination: '/services/production-rescue', permanent: true },
      { source: '/evaluation/enterprise', destination: '/services/ai-strategy-and-audit', permanent: true },
      { source: '/global-public-sector', destination: '/solutions/professional-services', permanent: true },
      { source: '/genai-portfolio', destination: '/services/knowledge-agents', permanent: true },
      { source: '/rlenvironments', destination: '/services/ai-product-engineering', permanent: true },
      { source: '/public-sector', destination: '/solutions/scale-ups', permanent: true },
      { source: '/physical-ai', destination: '/services/document-intake', permanent: true },
      { source: '/data-engine', destination: '/services/context-and-integrations', permanent: true },
      { source: '/automotive', destination: '/services/scoring-and-decisions', permanent: true },
      { source: '/donovan', destination: '/services/support-and-voice', permanent: true },
      { source: '/experts', destination: '/services/embedded-specialists', permanent: true },
    ]
  },
  agentRules: false,
  devIndicators: false,
  turbopack: { root: path.resolve(__dirname) },
  // Parked non-site folders in this checkout must not be scanned as routes or tracing roots.
  outputFileTracingRoot: path.resolve(__dirname),
  // Scale's client config lists qualities [100,85,80,75], and q=60 returns 400 there. /_next/image answers AVIF, then WebP, by Accept.
  images: { dangerouslyAllowSVG: true, contentDispositionType: 'attachment', qualities: [75, 80, 85, 100], formats: ['image/avif', 'image/webp'] },
}

export default nextConfig
