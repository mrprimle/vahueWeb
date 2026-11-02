import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  agentRules: false,
  devIndicators: false,
  turbopack: { root: path.resolve(__dirname) },
  // Parked non-site folders in this checkout must not be scanned as routes or tracing roots.
  outputFileTracingRoot: path.resolve(__dirname),
  // Scale's client config lists qualities [100,85,80,75], and q=60 returns 400 there. /_next/image answers AVIF, then WebP, by Accept.
  images: { dangerouslyAllowSVG: true, contentDispositionType: 'attachment', qualities: [75, 80, 85, 100], formats: ['image/avif', 'image/webp'] },
}

export default nextConfig
