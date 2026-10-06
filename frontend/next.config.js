/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.BUILD_TARGET === 'electron' ? 'export' : undefined,
  assetPrefix: process.env.BUILD_TARGET === 'electron' ? '.' : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;


