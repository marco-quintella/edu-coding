import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    // serverActions: true, // default true in 16
  },
};

export default nextConfig;
