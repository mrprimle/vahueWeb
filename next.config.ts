import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  agentRules: false,
  turbopack: { root: path.resolve(__dirname) },
  // Parked non-site folders in this checkout must not be scanned as routes or tracing roots.
  outputFileTracingRoot: path.resolve(__dirname),
  images: { dangerouslyAllowSVG: true, contentDispositionType: 'attachment' },
}

export default nextConfig
