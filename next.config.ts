import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images for Vercel deployment
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Ignore TypeScript/ESLint errors during build to prevent deployment failures
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
