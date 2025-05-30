/** @type {import('next').NextConfig} */
const nextConfig = {
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
      '@portabletext/editor': false,
      '@portabletext/editor/plugins': false,
    }
    return config
  },
};

module.exports = nextConfig;