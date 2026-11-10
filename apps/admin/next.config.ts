import type { NextConfig } from 'next';

const backend = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  async rewrites() {
    return [{ source: '/api-proxy/:path*', destination: `${backend}/:path*` }];
  },
  transpilePackages: ['@repo/ui', '@repo/db-alerts'],
  webpack: (config) => {
    config.resolve ??= {};
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
    };
    return config;
  },
};

export default nextConfig;
