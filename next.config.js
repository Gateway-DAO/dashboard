const routes = require('./src/constants/routes');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
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
    ],
  },
  async redirects() {
    return [
      {
        source: '/dashboard/user',
        destination: routes.dashboardUserReceivedAssets,
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: routes.dashboardUserReceivedAssets,
        permanent: true,
      },
      {
        source: '/dashboard/org',
        destination: routes.dashboardUserReceivedAssets,
        permanent: true,
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
