import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  //? Muestra cada fetch con el estado de caché
  logging: {
    fetches: { fullUrl: true },
  },
};

export default nextConfig;
