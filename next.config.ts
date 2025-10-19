import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "blindsdesigns.com",
      },
      {
        protocol: "https",
        hostname: "www.curtarra.com",
      },
      {
        protocol: "https",
        hostname: "waclighting.com",
      },
      {
        protocol: "https",
        hostname: "www.forestgroup.com",
      },
      {
        protocol: "https",
        hostname: "www.thespruce.com",
      },
      {
        protocol: "https",
        hostname: "www.theshadestore.com",
      },
      {
        protocol: "https",
        hostname: "shopdecorator.com",
      },
      {
        protocol: "https",
        hostname: "www.glamour-decorating.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
