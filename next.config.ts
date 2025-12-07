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

  // ✔ Keep Turbopack enabled
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

  // ❌ Removed Webpack block — not needed and breaks Turbopack
};

export default nextConfig;
