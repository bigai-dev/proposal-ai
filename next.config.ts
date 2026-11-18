import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Turbopack's on-disk dev cache can go stale after restarts and serve
    // random 404s (known Next 16 issue). In-memory only is fine for dev.
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
