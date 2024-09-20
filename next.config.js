/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.staging.mygateway.xyz',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'api.mygateway.xyz',
      },
      {
        protocol: 'https',
        hostname: 'node.mygateway.xyz',
      },
      {
        protocol: 'https',
        hostname: 'arweave.net',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'cdn.mygateway.xyz',
      },
      {
        protocol: 'https',
        hostname: 'staging.cdn.mygateway.xyz',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'gateway-1.ghost.io',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  ...(process.env.NODE_ENV !== 'development' && {
    redirects: async () => {
      return [
        {
          source: '/dev',
          destination: '/',
          permanent: true,
        },
      ];
    },
  }),
};

module.exports = nextConfig;
