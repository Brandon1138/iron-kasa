/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // App Router is the default in Next 15+
  eslint: {
    // Temporarily ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
});
