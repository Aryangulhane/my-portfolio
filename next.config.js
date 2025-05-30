/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: 'krdza9oy',
    NEXT_PUBLIC_SANITY_DATASET: 'production',
    SANITY_STUDIO_PROJECT_ID: 'krdza9oy',
    SANITY_STUDIO_DATASET: 'production'
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sanity/vision': false,
    }
    return config
  },
};

module.exports = nextConfig;