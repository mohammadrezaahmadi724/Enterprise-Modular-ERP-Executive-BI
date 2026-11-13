import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/db-erp-bi-risk', '@repo/db-alerts', '@tremor/react'],
  output: 'standalone',
  allowedDevOrigins: ['http://127.0.0.1:3001', 'http://localhost:3001'],
  async redirects() {
    const marketing = process.env.NEXT_PUBLIC_MARKETING_URL ?? 'http://127.0.0.1:3003';
    return [
      { source: '/checkout', destination: `${marketing}/checkout/plans`, permanent: false },
      { source: '/checkout/:path*', destination: `${marketing}/checkout/:path*`, permanent: false },
    ];
  },
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';
    return [{ source: '/api-proxy/:path*', destination: `${target}/:path*` }];
  },
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
