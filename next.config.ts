import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "src/styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'cdn.dummyjson.com*',
      },
    ],
  },
};

export default nextConfig;
