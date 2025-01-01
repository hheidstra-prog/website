import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    //domains: ["cdn.sanity.io"], // Add Sanity's CDN domain
    remotePatterns: [
      {
        protocol: "https", // Protocol used by Sanity
        hostname: "cdn.sanity.io", // Sanity's CDN domain
        pathname: "/**", // Allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
