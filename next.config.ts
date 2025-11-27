import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack - use stable Webpack
  experimental: {
    // turbo option removed as it is not valid in this version
  },
};

export default nextConfig;
