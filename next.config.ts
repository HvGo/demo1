import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['admin.datans.work'],
  },
  output: 'standalone',
};

export default nextConfig;