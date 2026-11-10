import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/db-erp-bi-risk', '@repo/db-alerts', '@tremor/react'],
  output: 'standalone',
  webpack: (config) => {
    config.resolve ??= {};
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
      '.mjs': ['.mts', '.mjs'],
    };
    return config;
  },
};

export default nextConfig;
