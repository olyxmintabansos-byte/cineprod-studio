import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/cineprod-studio',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
