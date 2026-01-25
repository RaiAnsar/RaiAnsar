import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for maximum performance
  output: 'export',

  // Optimize images for static export
  images: {
    unoptimized: true,
  },

  // Clean URLs
  trailingSlash: true,

  // Turbopack for faster builds
  experimental: {
    // Enable optimizations
  },
};

export default nextConfig;
