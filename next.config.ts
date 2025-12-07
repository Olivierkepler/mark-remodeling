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

  // ✅ Keep Turbopack ON and configure it properly
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

    // 👇 Equivalent to your Webpack externals for Turbopack
    // moduleOptions: {
    //   externalModules: ["canvas"],
    // },
  },

  // ❌ REMOVE Webpack customization (Turbopack does not support it)
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.externals.push({ canvas: "canvas" });
  //   }
  //   return config;
  // },
};

export default nextConfig;
