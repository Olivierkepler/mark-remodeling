import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "holh1uldewromppp.public.blob.vercel-storage.com",
      },
    ],
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
    ],
  },

  // ✅ Keep Turbopack ON
  turbopack: {
    resolveExtensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".mjs",
      ".cjs",
    ],
  },

  // ❌ Removed Webpack config — not needed and breaks Turbopack
};

export default nextConfig;
