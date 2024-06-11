const routes = require('./src/constants/routes');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.staging.mygateway.xyz',
      'doepp2nssa64p.cloudfront.net',
      'ddm747vh67170.cloudfront.net',
      'd14yyawlqn6zgz.cloudfront.net',
      'api.mygateway.xyz',
      'node.mygateway.xyz',
      'arweave.net',
      'localhost',
      'doepp2nssa64p.cloudfront.net',
      'cdn.mygateway.xyz',
      'staging.cdn.mygateway.xyz',
      'i.postimg.cc',
      'cdn.shopify.com',
      'static.ghost.org',
      'images.unsplash.com',
      'gateway-1.ghost.io',
    ],
  },
  async redirects() {
    return [
      {
        source: '/dashboard/user',
        destination: routes.dashboard.user.myAssets,
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: routes.dashboard.user.myAssets,
        permanent: true,
      },
      {
        source: '/dashboard/org',
        destination: routes.dashboard.user.myAssets,
        permanent: true,
      },
      {
        source: '/loyalty/:id',
        destination: 'https://tryodyssey.xyz/loyalty/:id',
        permanent: true,
        basePath: false,
      },
      {
        source: '/credential/:id',
        destination: 'https://tryodyssey.xyz/credential/:id',
        permanent: true,
        basePath: false,
      },
      {
        source: '/protocol/credentials/:id/show',
        destination: 'https://www.tryodyssey.xyz/protocol/credentials/:id/show',
        permanent: true,
        basePath: false,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = nextConfig;
