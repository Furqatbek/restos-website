/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      // Native .node binaries must be loaded by Node at runtime, not bundled by webpack
      config.externals = [
        ...config.externals,
        '@resvg/resvg-js',
        'better-sqlite3',
      ];
    }
    return config;
  },
};
module.exports = nextConfig;
