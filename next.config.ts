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
      "plus.unsplash.com"
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        canvas: "canvas",
      });
    }
    return config;
  },
};

export default nextConfig;





