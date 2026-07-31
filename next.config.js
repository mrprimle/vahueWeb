const { withBotId } = require('botid/next/config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = withBotId(nextConfig)
