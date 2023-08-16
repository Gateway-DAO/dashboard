const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/user',
        permanent: true,
      }
    ];
  },
};

module.exports = nextTranslate(nextConfig);
