import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "bucket-production-d1d9.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
