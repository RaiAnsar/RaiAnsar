import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Static export for maximum performance
  output: 'export',

  // Optimize images for static export
  images: {
    unoptimized: true,
  },

  // Clean URLs
  trailingSlash: true,

  // Tree-shake framer-motion to reduce initial bundle size
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  // Turbopack configuration - set correct project root
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
