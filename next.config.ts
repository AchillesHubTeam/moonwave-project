import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["mongoose"],
  experimental: {
    serverExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
